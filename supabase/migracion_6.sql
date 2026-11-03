-- ============================================================
-- OPO BOMBERO ZGZ · MIGRACIÓN 6 · avisos con fuente y correcciones
-- · El usuario puede proponer la respuesta correcta y decir de dónde lo saca
--   (ley y artículo, manual y página, enlace al BOE/BOA…).
-- · El revisor contesta cada aviso; el usuario ve el estado en «Mis avisos»
--   y recibe «Tu aviso ha servido» cuando se resuelve.
-- · Registro público (para usuarios con sesión) de las correcciones del banco.
-- · banco_preguntas.editada_at: las preguntas corregidas a mano no las pisa
--   scripts/importar-banco.mjs.
-- Ejecutar en Supabase > SQL Editor. No borra nada; se puede repetir.
-- ============================================================

-- ---------- 1. avisos: columnas nuevas ----------
alter table public.reportes_preguntas
  add column if not exists opcion_propuesta int check (opcion_propuesta between 0 and 2),
  add column if not exists fuente_tipo text check (fuente_tipo in ('norma', 'manual', 'web_oficial', 'otra')),
  add column if not exists fuente_ref text check (char_length(fuente_ref) <= 200),
  add column if not exists fuente_url text check (fuente_url ~ '^https://' and char_length(fuente_url) <= 500),
  add column if not exists respuesta_revisor text check (char_length(respuesta_revisor) <= 500),
  add column if not exists resuelto_at timestamptz,
  add column if not exists visto_at timestamptz;

-- nuevo motivo: «La explicación está cortada o no cuadra»
alter table public.reportes_preguntas drop constraint if exists reportes_preguntas_motivo_check;
alter table public.reportes_preguntas add constraint reportes_preguntas_motivo_check
  check (motivo in ('no_se_entiende', 'respuesta_incorrecta', 'errata', 'explicacion', 'otro'));

-- Desde la app (roles anon/authenticated) el usuario no puede escribir los campos del revisor.
-- Si vuelve a enviar un aviso ya resuelto, es un aviso nuevo: se limpia la respuesta anterior.
create or replace function public.reportes_proteger_campos_revisor()
returns trigger language plpgsql as $$
begin
  if current_user in ('anon', 'authenticated') then
    new.respuesta_revisor := null;
    new.resuelto_at := null;
    new.visto_at := null;
    new.estado := 'pendiente';
    new.updated_at := now();
    if tg_op = 'UPDATE' then
      new.created_at := old.created_at;
    end if;
  end if;
  return new;
end $$;
drop trigger if exists reportes_proteger_campos_revisor on public.reportes_preguntas;
create trigger reportes_proteger_campos_revisor
  before insert or update on public.reportes_preguntas
  for each row execute function public.reportes_proteger_campos_revisor();

-- El usuario marca como vistos SUS avisos ya resueltos (la política de update solo deja tocar pendientes).
create or replace function public.marcar_avisos_vistos(ids uuid[])
returns void language sql security definer set search_path = public as $$
  update public.reportes_preguntas
     set visto_at = now()
   where id = any(ids)
     and user_id = auth.uid()
     and estado in ('corregida', 'descartada')
     and visto_at is null;
$$;
revoke all on function public.marcar_avisos_vistos(uuid[]) from public, anon;
grant execute on function public.marcar_avisos_vistos(uuid[]) to authenticated;

-- ---------- 2. registro de correcciones ----------
create table if not exists public.correcciones (
  id uuid primary key default gen_random_uuid(),
  pregunta_id text not null references public.banco_preguntas(id) on delete cascade,
  campo text not null check (campo in ('pregunta', 'opciones', 'correcta', 'explicacion')),
  antes jsonb,
  despues jsonb,
  fuente_ref text,
  created_at timestamptz not null default now()
);
create index if not exists idx_correcciones_pregunta on public.correcciones(pregunta_id);
create index if not exists idx_correcciones_fecha on public.correcciones(created_at desc);
alter table public.correcciones enable row level security;
do $$ begin
  create policy "correcciones lectura autenticados" on public.correcciones
    for select to authenticated using (true);
exception when duplicate_object then null; end $$;
-- (sin políticas de escritura: solo las crea resolver_pregunta desde el SQL Editor)

-- ---------- 3. preguntas corregidas a mano ----------
alter table public.banco_preguntas add column if not exists editada_at timestamptz;

-- ---------- 4. resolver los avisos de una pregunta (SOLO desde el SQL Editor) ----------
-- · p_estado: 'revisada' (en revisión), 'corregida' o 'descartada' (se queda como está)
-- · p_respuesta: la frase que verá el usuario. Obligatoria al corregir o descartar.
-- · p_cambios (opcional, al corregir): jsonb con lo que cambia en la pregunta, p. ej.
--     '{"correcta": 1, "explicacion": "Art. 35.2 Ley 31/1995: de 51 a 100 trabajadores, 3 delegados."}'
--   claves válidas: pregunta, opciones (array de 3 textos), correcta (0, 1 o 2), explicacion
-- · p_fuente (opcional): referencia que se guarda en el registro de correcciones
-- Resuelve todos los avisos abiertos de esa pregunta (de todos los usuarios) y, si cambia la
-- respuesta correcta, borra el «fallo» de quienes la fallaron con la respuesta antigua.
create or replace function public.resolver_pregunta(
  p_pregunta_id text, p_estado text, p_respuesta text,
  p_cambios jsonb default null, p_fuente text default null
) returns text language plpgsql security definer set search_path = public as $$
declare
  q public.banco_preguntas;
  k text;
  n_avisos int;
  n_progreso int := 0;
begin
  if p_estado not in ('revisada', 'corregida', 'descartada') then
    raise exception 'p_estado debe ser revisada, corregida o descartada';
  end if;
  if p_estado in ('corregida', 'descartada') and coalesce(trim(p_respuesta), '') = '' then
    raise exception 'Escribe una respuesta para el usuario (p_respuesta): nunca se resuelve un aviso sin una frase';
  end if;
  select * into q from public.banco_preguntas where id = p_pregunta_id;
  if not found then raise exception 'No existe la pregunta %', p_pregunta_id; end if;

  if p_cambios is not null and p_estado <> 'corregida' then
    raise exception 'Solo se pueden aplicar cambios con p_estado = corregida';
  end if;

  if p_cambios is not null then
    for k in select jsonb_object_keys(p_cambios) loop
      if k not in ('pregunta', 'opciones', 'correcta', 'explicacion') then
        raise exception 'Clave no válida en p_cambios: %', k;
      end if;
    end loop;
    if p_cambios ? 'opciones' and jsonb_array_length(p_cambios->'opciones') <> 3 then
      raise exception 'opciones tiene que tener 3 textos';
    end if;
    if p_cambios ? 'correcta' and (p_cambios->>'correcta')::int not between 0 and 2 then
      raise exception 'correcta tiene que ser 0, 1 o 2';
    end if;

    if p_cambios ? 'pregunta' then
      insert into public.correcciones(pregunta_id, campo, antes, despues, fuente_ref)
      values (p_pregunta_id, 'pregunta', to_jsonb(q.pregunta), p_cambios->'pregunta', p_fuente);
    end if;
    if p_cambios ? 'opciones' then
      insert into public.correcciones(pregunta_id, campo, antes, despues, fuente_ref)
      values (p_pregunta_id, 'opciones', q.opciones, p_cambios->'opciones', p_fuente);
    end if;
    if p_cambios ? 'correcta' then
      insert into public.correcciones(pregunta_id, campo, antes, despues, fuente_ref)
      values (p_pregunta_id, 'correcta', to_jsonb(q.correcta), p_cambios->'correcta', p_fuente);
    end if;
    if p_cambios ? 'explicacion' then
      insert into public.correcciones(pregunta_id, campo, antes, despues, fuente_ref)
      values (p_pregunta_id, 'explicacion', to_jsonb(q.explicacion), p_cambios->'explicacion', p_fuente);
    end if;

    update public.banco_preguntas set
      pregunta    = coalesce(p_cambios->>'pregunta', pregunta),
      opciones    = coalesce(p_cambios->'opciones', opciones),
      correcta    = coalesce((p_cambios->>'correcta')::int, correcta),
      explicacion = case when p_cambios ? 'explicacion' then p_cambios->>'explicacion' else explicacion end,
      editada_at  = now()
    where id = p_pregunta_id;

    -- quien la falló con la respuesta antigua: la pregunta vuelve a «no vista»
    if p_cambios ? 'correcta' and (p_cambios->>'correcta')::int <> q.correcta then
      delete from public.progreso where pregunta_id = p_pregunta_id and ultimo_resultado = false;
      get diagnostics n_progreso = row_count;
    end if;
  end if;

  update public.reportes_preguntas set
    estado = p_estado,
    respuesta_revisor = nullif(trim(p_respuesta), ''),
    resuelto_at = case when p_estado in ('corregida', 'descartada') then now() else null end,
    visto_at = null,
    updated_at = now()
  where pregunta_id = p_pregunta_id and estado in ('pendiente', 'revisada');
  get diagnostics n_avisos = row_count;

  return format('%s: %s aviso(s) → %s%s', p_pregunta_id, n_avisos, p_estado,
    case when n_progreso > 0 then format(' · %s fallo(s) anulados', n_progreso) else '' end);
end $$;
revoke all on function public.resolver_pregunta(text, text, text, jsonb, text) from public, anon, authenticated;

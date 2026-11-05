-- ============================================================
-- OPO BOMBERO ZGZ · MIGRACIÓN 8 · señalar preguntas del callejero
-- · Las preguntas del callejero no están en banco_preguntas: se generan en la app a partir del
--   Anexo III. Su aviso se guarda con el id «callejero:<tipo>:<item>» y con la pregunta tal como
--   la vio el usuario (contexto), porque las opciones cambian en cada test.
-- · Se quita la clave ajena reportes_preguntas → banco_preguntas y la sustituye un trigger que
--   comprueba lo mismo para las preguntas del banco (y borra los avisos si se borra la pregunta).
-- · resolver_callejero(id, estado, frase, anular_fallos): como resolver_pregunta, pero el arreglo
--   se hace en src/data/callejero.json, no en la base de datos.
-- No borra nada; se puede repetir.
-- ============================================================

-- 1. contexto de la pregunta (solo callejero)
alter table public.reportes_preguntas
  add column if not exists contexto jsonb;
alter table public.reportes_preguntas drop constraint if exists reportes_preguntas_contexto_check;
alter table public.reportes_preguntas add constraint reportes_preguntas_contexto_check
  check (contexto is null or (jsonb_typeof(contexto) = 'object' and pg_column_size(contexto) <= 4000));

-- 2. fuera la clave ajena a banco_preguntas
do $$
declare c text;
begin
  for c in
    select conname from pg_constraint
     where conrelid = 'public.reportes_preguntas'::regclass and contype = 'f'
       and conkey = array[(select attnum from pg_attribute
                            where attrelid = 'public.reportes_preguntas'::regclass and attname = 'pregunta_id')]::smallint[]
  loop
    execute format('alter table public.reportes_preguntas drop constraint %I', c);
  end loop;
end $$;

-- 3. lo que hacía la clave ajena, ahora con hueco para el callejero
create or replace function public.reportes_validar_pregunta()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.pregunta_id like 'callejero:%' then
    if char_length(new.pregunta_id) > 120 then
      raise exception 'Id de pregunta del callejero demasiado largo';
    end if;
    if new.contexto is null then
      raise exception 'Falta la pregunta del callejero (contexto)';
    end if;
  else
    if not exists (select 1 from public.banco_preguntas where id = new.pregunta_id) then
      raise exception 'No existe la pregunta %', new.pregunta_id using errcode = '23503';
    end if;
    new.contexto := null;
  end if;
  return new;
end $$;
drop trigger if exists reportes_validar_pregunta on public.reportes_preguntas;
create trigger reportes_validar_pregunta
  before insert or update of pregunta_id, contexto on public.reportes_preguntas
  for each row execute function public.reportes_validar_pregunta();

create or replace function public.banco_borrar_avisos()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  delete from public.reportes_preguntas where pregunta_id = old.id;
  return old;
end $$;
drop trigger if exists banco_borrar_avisos on public.banco_preguntas;
create trigger banco_borrar_avisos
  after delete on public.banco_preguntas
  for each row execute function public.banco_borrar_avisos();

-- 4. resolver avisos del callejero (desde el SQL Editor, como resolver_pregunta)
--    p_anular_fallos = true cuando la pregunta generada estaba mal: a quien la falló se le borra el fallo.
create or replace function public.resolver_callejero(
  p_pregunta_id text, p_estado text, p_respuesta text, p_anular_fallos boolean default false
) returns text language plpgsql security definer set search_path = public as $$
declare
  n_avisos int;
  n_progreso int := 0;
begin
  if p_pregunta_id not like 'callejero:%' then
    raise exception 'Esto es para avisos del callejero (id «callejero:…»). Para el banco, usa resolver_pregunta';
  end if;
  if p_estado not in ('revisada', 'corregida', 'descartada') then
    raise exception 'p_estado debe ser revisada, corregida o descartada';
  end if;
  if p_estado in ('corregida', 'descartada') and coalesce(trim(p_respuesta), '') = '' then
    raise exception 'Escribe una respuesta para el usuario (p_respuesta): nunca se resuelve un aviso sin una frase';
  end if;
  if p_anular_fallos and p_estado <> 'corregida' then
    raise exception 'Solo se anulan fallos con p_estado = corregida';
  end if;

  if p_anular_fallos then
    delete from public.progreso_callejero
     where pregunta_id = substr(p_pregunta_id, length('callejero:') + 1) and ultimo_resultado = false;
    get diagnostics n_progreso = row_count;
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
revoke all on function public.resolver_callejero(text, text, text, boolean) from public, anon, authenticated;

select 'avisos del callejero listos: clave ajena ' ||
  case when exists (select 1 from pg_constraint where conrelid = 'public.reportes_preguntas'::regclass and contype = 'f'
                     and conname = 'reportes_preguntas_pregunta_id_fkey') then 'SIGUE' else 'quitada' end ||
  ', triggers ' || (select count(*) from pg_trigger where tgname in ('reportes_validar_pregunta', 'banco_borrar_avisos')) || ' de 2' as resultado;

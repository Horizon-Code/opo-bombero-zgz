-- ============================================================
-- OPO BOMBERO ZGZ · MIGRACIÓN 5 · preguntas señaladas
-- Botón «Señalar pregunta»: cada usuario puede avisar de que una
-- pregunta no se entiende, tiene la respuesta mal o una errata.
-- Ejecutar en Supabase > SQL Editor. No toca nada de lo anterior.
-- ============================================================

create table if not exists public.reportes_preguntas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  pregunta_id text not null references public.banco_preguntas(id) on delete cascade,
  motivo text not null check (motivo in ('no_se_entiende', 'respuesta_incorrecta', 'errata', 'otro')),
  comentario text check (char_length(comentario) <= 1000),
  estado text not null default 'pendiente' check (estado in ('pendiente', 'revisada', 'corregida', 'descartada')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, pregunta_id)     -- un aviso por persona y pregunta; si repite, se actualiza
);
create index if not exists idx_reportes_pregunta on public.reportes_preguntas(pregunta_id);
create index if not exists idx_reportes_estado on public.reportes_preguntas(estado);

alter table public.reportes_preguntas enable row level security;
-- Cada usuario ve y crea solo sus avisos. Si vuelve a señalar una pregunta, su aviso
-- se actualiza y vuelve a 'pendiente'. Los demás estados solo los pone el administrador
-- desde el SQL Editor (que no pasa por estas reglas).
do $$ begin
  create policy "reportes propios lectura" on public.reportes_preguntas
    for select to authenticated using (auth.uid() = user_id);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "reportes propios alta" on public.reportes_preguntas
    for insert to authenticated with check (auth.uid() = user_id and estado = 'pendiente');
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "reportes propios cambio" on public.reportes_preguntas
    for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id and estado = 'pendiente');
exception when duplicate_object then null; end $$;

-- ------------------------------------------------------------
-- PARA REVISAR (en el SQL Editor, no desde la app):
--
-- Preguntas más señaladas, con su texto:
--   select r.pregunta_id, count(*) as avisos,
--          string_agg(distinct r.motivo, ', ') as motivos,
--          b.tema, b.pregunta, b.opciones, b.correcta
--   from public.reportes_preguntas r
--   join public.banco_preguntas b on b.id = r.pregunta_id
--   where r.estado = 'pendiente'
--   group by r.pregunta_id, b.tema, b.pregunta, b.opciones, b.correcta
--   order by avisos desc, r.pregunta_id;
--
-- Comentarios de una pregunta:
--   select motivo, comentario, created_at from public.reportes_preguntas
--   where pregunta_id = 'C086-0098' order by created_at;
--
-- Marcar como corregida:
--   update public.reportes_preguntas set estado = 'corregida', updated_at = now()
--   where pregunta_id = 'C086-0098';

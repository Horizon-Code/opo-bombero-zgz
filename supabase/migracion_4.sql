-- ============================================================
-- OPO BOMBERO ZGZ · MIGRACIÓN 4 · banco fijo de preguntas
-- El temario ya no lo pega cada usuario ni lo genera la IA:
-- hay un banco común (27.425 preguntas del corpus oficial) y
-- cada usuario guarda solo su progreso por pregunta.
-- Ejecutar en Supabase > SQL Editor. No borra nada de lo anterior
-- (las tablas temas, subtemas, preguntas y uso_api dejan de usarse;
--  al final hay un bloque comentado para eliminarlas si quieres).
-- ============================================================

-- Banco común: lo carga scripts/importar-banco.mjs con la service role key.
create table if not exists public.banco_preguntas (
  id text primary key,              -- p. ej. "C071-0001"
  tema int not null,
  nodo text not null,               -- "28.1"
  bloque text not null,             -- "T28-28.1-b01" o "C-…-b03"
  tambien_en int[] not null default '{}',
  tipo text not null,               -- directa | negativa | combinada | cifra | supuesto
  dificultad int not null,          -- 1-3
  pregunta text not null,
  opciones jsonb not null,          -- ["a","b","c"]
  correcta int not null,            -- 0-2
  explicacion text,
  cita text                         -- fragmento literal del temario
);
create index if not exists idx_banco_tema on public.banco_preguntas(tema);
create index if not exists idx_banco_bloque on public.banco_preguntas(bloque);

alter table public.banco_preguntas enable row level security;
do $$ begin
  -- solo usuarios con sesión pueden leerlo; nadie puede escribir desde la app
  create policy "banco lectura autenticados" on public.banco_preguntas
    for select to authenticated using (true);
exception when duplicate_object then null; end $$;

-- Progreso de cada usuario en cada pregunta del banco
create table if not exists public.progreso (
  user_id uuid not null references auth.users(id) on delete cascade,
  pregunta_id text not null references public.banco_preguntas(id) on delete cascade,
  bloque text not null,             -- copia para agregar sin cruzar con el banco
  vistas int not null default 0,
  aciertos int not null default 0,
  ultimo_resultado boolean,         -- true = acertada la última vez
  ultima_fecha date,
  primary key (user_id, pregunta_id)
);
create index if not exists idx_progreso_user on public.progreso(user_id);

alter table public.progreso enable row level security;
do $$ begin
  create policy "own progreso" on public.progreso
    for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
exception when duplicate_object then null; end $$;

-- Resultados: datos del examen real (en blanco y nota con penalización)
alter table public.resultados add column if not exists fallos int;
alter table public.resultados add column if not exists blancos int;
alter table public.resultados add column if not exists nota numeric;

-- ------------------------------------------------------------
-- OPCIONAL, cuando compruebes que todo va bien: borrar lo de la IA
-- drop table if exists public.preguntas;
-- drop table if exists public.subtemas;
-- drop table if exists public.temas;
-- drop table if exists public.uso_api;
-- drop function if exists public.incrementar_uso_api();

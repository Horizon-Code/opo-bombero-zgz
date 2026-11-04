-- ============================================================
-- OPO BOMBERO ZGZ · MIGRACIÓN 7 · callejero y arreglo de resultados
-- · progreso_callejero: avance de cada usuario en las preguntas del callejero
--   (Anexo III). Las preguntas se generan en la app; aquí solo se guarda el resultado.
-- · resultados.origen: la app ya lo enviaba ('test', 'repaso', 'simulacro', 'callejero')
--   pero la columna no existía en producción (la migración 3 no llegó a aplicarse),
--   así que los resultados de los tests no se guardaban.
-- Ejecutar en Supabase > SQL Editor. No borra nada; se puede repetir.
-- ============================================================

alter table public.resultados
  add column if not exists origen text not null default 'test';

create table if not exists public.progreso_callejero (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  pregunta_id text not null check (char_length(pregunta_id) <= 40),   -- «tipo:item», p. ej. entrada:c012
  vistas integer not null default 0,
  aciertos integer not null default 0,
  ultimo_resultado boolean,
  ultima_fecha date,
  primary key (user_id, pregunta_id)
);
alter table public.progreso_callejero enable row level security;
do $$ begin
  create policy "progreso callejero propio" on public.progreso_callejero
    for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
exception when duplicate_object then null; end $$;

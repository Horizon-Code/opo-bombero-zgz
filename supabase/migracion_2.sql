-- ============================================================
-- OPO BOMBERO ZGZ · MIGRACIÓN 2 (subtemas + banco de preguntas)
-- Ejecutar en Supabase > SQL Editor. No borra nada de lo anterior.
-- ============================================================

-- Mapa de subtemas de cada tema (se genera una vez al subir el tema)
create table if not exists public.subtemas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  tema_id uuid not null references public.temas(id) on delete cascade,
  etiqueta text not null,        -- ej. "Título Preliminar · valores superiores (art. 1)"
  orden int not null default 0,
  created_at timestamptz default now()
);

-- Banco de preguntas generadas (ya no se tiran)
create table if not exists public.preguntas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  tema_id uuid not null references public.temas(id) on delete cascade,
  subtema text,                  -- etiqueta asignada por la IA (texto libre, casado con subtemas)
  enunciado text not null,
  opciones jsonb not null,       -- ["a","b","c","d"]
  correcta int not null,         -- 0-3
  explicacion text,
  modelo text,                   -- con qué modelo se generó
  -- estado de repaso por pregunta
  veces_vista int not null default 0,
  veces_acierto int not null default 0,
  ultimo_resultado boolean,      -- true=acertada la última vez
  ultima_fecha date,
  created_at timestamptz default now()
);

create index if not exists idx_preguntas_tema on public.preguntas(user_id, tema_id);
create index if not exists idx_subtemas_tema on public.subtemas(user_id, tema_id);

alter table public.subtemas enable row level security;
alter table public.preguntas enable row level security;

do $$ begin
  create policy "own subtemas" on public.subtemas
    for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "own preguntas" on public.preguntas
    for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
exception when duplicate_object then null; end $$;

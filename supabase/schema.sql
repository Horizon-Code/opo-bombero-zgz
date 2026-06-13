-- ============================================================
-- OPO BOMBERO ZGZ · esquema de base de datos (Supabase / Postgres)
-- Ejecutar en: Supabase Dashboard > SQL Editor > New query
-- ============================================================

-- Temas del temario (cada usuario sube los suyos)
create table public.temas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  nombre text not null,
  contenido text not null,
  created_at timestamptz default now()
);

-- Resultados de tests
create table public.resultados (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  fecha date not null default current_date,
  preguntas int not null,
  aciertos int not null,
  por_tema jsonb not null default '{}'::jsonb,
  created_at timestamptz default now()
);

-- Marcas físicas
create table public.marcas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  prueba text not null,
  valor numeric not null,
  fecha date not null default current_date
);

-- Objetivos por prueba (editable por usuario)
create table public.objetivos (
  user_id uuid not null references auth.users(id) on delete cascade,
  prueba text not null,
  valor numeric not null,
  primary key (user_id, prueba)
);

-- Diario de hábitos (una fila por usuario y día)
create table public.diario (
  user_id uuid not null references auth.users(id) on delete cascade,
  fecha date not null,
  entreno text,
  estudio numeric,
  sueno numeric,
  peso numeric,
  creatina boolean default false,
  notas text,
  primary key (user_id, fecha)
);

-- ============================================================
-- Row Level Security: cada usuario solo ve y toca sus datos
-- ============================================================
alter table public.temas enable row level security;
alter table public.resultados enable row level security;
alter table public.marcas enable row level security;
alter table public.objetivos enable row level security;
alter table public.diario enable row level security;

create policy "own temas" on public.temas
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own resultados" on public.resultados
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own marcas" on public.marcas
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own objetivos" on public.objetivos
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own diario" on public.diario
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Límite diario de generación de tests (control de coste de la API)
create table public.uso_api (
  user_id uuid not null references auth.users(id) on delete cascade,
  dia date not null default current_date,
  llamadas int not null default 0,
  primary key (user_id, dia)
);
alter table public.uso_api enable row level security;
create policy "own uso" on public.uso_api
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

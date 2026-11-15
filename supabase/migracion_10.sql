-- ============================================================
-- OPO BOMBERO ZGZ · MIGRACIÓN 10 · plan de pruebas físicas
-- Tres tablas nuevas para la pestaña de físicas (diseño: claude/fisicas-entrenos-diseno.md):
-- · fis_perfil: lo que el alumno contesta en el alta (sexo, soga, días, molestias).
-- · fis_estado: el estado del motor por prueba (niveles, referencias, rachas) en jsonb.
-- · fis_sesiones: cada sesión registrada, con lo que se prescribió y el estado anterior
--   (para poder deshacer el último registro).
-- Los tests de marca se siguen guardando en public.marcas (r1500, nat, cuerda, dom, dom10,
-- nat400, nat200). RLS: cada usuario solo ve y toca lo suyo. No toca políticas existentes.
-- No borra nada; se puede repetir.
-- ============================================================

create table if not exists public.fis_perfil (
  user_id uuid primary key references auth.users(id) on delete cascade,
  sexo text not null check (sexo in ('H', 'M')),
  soga boolean not null default false,
  dia_soga smallint check (dia_soga between 0 and 6),
  dias smallint not null default 6 check (dias between 3 and 6),
  impacto boolean not null default false,
  procesado_hasta date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.fis_estado (
  user_id uuid not null references auth.users(id) on delete cascade,
  prueba text not null check (prueba in ('cuerda', 'nat', 'r1500')),
  datos jsonb not null check (jsonb_typeof(datos) = 'object' and pg_column_size(datos) <= 8000),
  updated_at timestamptz not null default now(),
  primary key (user_id, prueba)
);

create table if not exists public.fis_sesiones (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  fecha date not null default current_date,
  semana date not null,
  prueba text not null check (prueba in ('cuerda', 'nat', 'r1500')),
  tipo text not null check (tipo in ('A', 'B', 'T')),
  nivel smallint,
  modo text check (modo in ('tiempos', 'sensacion', 'hecho', 'test')),
  series jsonb,
  resultado text check (resultado in ('SUPERADO', 'CUMPLIDO', 'FALLADO', 'TEST')),
  estado_antes jsonb,
  created_at timestamptz not null default now(),
  unique (user_id, semana, prueba, tipo)
);
create index if not exists fis_sesiones_user_fecha on public.fis_sesiones (user_id, fecha);

alter table public.fis_perfil enable row level security;
alter table public.fis_estado enable row level security;
alter table public.fis_sesiones enable row level security;

drop policy if exists "own fis_perfil" on public.fis_perfil;
create policy "own fis_perfil" on public.fis_perfil
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "own fis_estado" on public.fis_estado;
create policy "own fis_estado" on public.fis_estado
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "own fis_sesiones" on public.fis_sesiones;
create policy "own fis_sesiones" on public.fis_sesiones
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

select 'migración 10 aplicada: fis_perfil, fis_estado y fis_sesiones' as resultado;

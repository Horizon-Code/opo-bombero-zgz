-- ============================================================
-- OPO BOMBERO ZGZ · MIGRACIÓN 3
-- 1) Separar repasos de tests en las estadísticas
-- 2) Incremento atómico del contador de uso de la API
-- Ejecutar en Supabase > SQL Editor. No borra nada de lo anterior.
-- ============================================================

-- 1) Los repasos de fallos ya no contaminan la media de tests:
--    cada resultado lleva su origen ('test' | 'repaso').
alter table public.resultados
  add column if not exists origen text not null default 'test';

-- 2) Incremento atómico de llamadas (evita perder incrementos
--    con peticiones concurrentes; sustituye al read-then-upsert).
create or replace function public.incrementar_uso_api()
returns int
language plpgsql
security definer
set search_path = public
as $$
declare
  v_llamadas int;
begin
  if auth.uid() is null then
    raise exception 'No autenticado';
  end if;
  insert into public.uso_api (user_id, dia, llamadas)
  values (auth.uid(), current_date, 1)
  on conflict (user_id, dia)
  do update set llamadas = uso_api.llamadas + 1
  returning llamadas into v_llamadas;
  return v_llamadas;
end;
$$;

revoke all on function public.incrementar_uso_api() from public;
grant execute on function public.incrementar_uso_api() to authenticated;

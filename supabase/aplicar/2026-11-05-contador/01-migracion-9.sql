-- ============================================================
-- OPO BOMBERO ZGZ · MIGRACIÓN 9 · contador público de correcciones
-- La landing enseña cuántas preguntas se han corregido y la fecha de la última.
-- El registro completo solo lo ven los usuarios con sesión; esto da solo los dos números.
-- No borra nada; se puede repetir.
-- ============================================================
create or replace function public.contador_correcciones()
returns table (preguntas bigint, ultima timestamptz)
language sql stable security definer set search_path = public as $$
  select count(distinct pregunta_id), max(created_at)
    from public.correcciones
   where antes is distinct from despues;
$$;
revoke all on function public.contador_correcciones() from public;
grant execute on function public.contador_correcciones() to anon, authenticated;

select 'contador de correcciones: ' || preguntas || ' preguntas corregidas, la última el ' || to_char(ultima, 'DD/MM/YYYY') as resultado
  from public.contador_correcciones();

select 'preguntas de los temas 12 y 13 en el banco: ' || count(*) || ' (antes 128 + 91 = 219)' as resultado from public.banco_preguntas where tema in (12, 13);

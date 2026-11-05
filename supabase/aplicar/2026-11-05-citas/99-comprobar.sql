-- Comprobación: cuántas citas siguen acabando cortadas (antes: 1.875).
select 'citas que siguen acabando en : , ; - o preposición: ' || count(*) as resultado
from public.banco_preguntas
where cita ~ '[:,;\-–]\s*$' or cita ~* '\m(de|del|la|el|los|las|y|o|en|a|por|para|con|que|al|su|sus|un|una|art|arts|núm|apdo)\.?\s*$';

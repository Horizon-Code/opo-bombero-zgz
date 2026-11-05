# Revisar avisos y corregir preguntas

Los usuarios señalan preguntas con «⚑ Señalar esta pregunta»: eligen el motivo, pueden proponer la respuesta
correcta y decir de dónde lo sacan (ley y artículo, manual y página, enlace). Tú revisas desde
**Supabase → SQL Editor** (necesita la `supabase/migracion_6.sql` aplicada).

Estados que ve el usuario en «Mis avisos»:

| `estado` en la BD | Lo que ve | Cuándo |
|---|---|---|
| `pendiente` | Enviado | Recién enviado |
| `revisada` | En revisión | Lo estás comprobando |
| `corregida` | Corregida | Has cambiado la pregunta |
| `descartada` | Se queda como está | La pregunta estaba bien |

**Nunca se resuelve un aviso sin una frase** para el usuario: la función no te deja.

## 1. Ver la cola (una vez a la semana)
```sql
select r.pregunta_id, count(*) as avisos,
       string_agg(distinct r.motivo, ', ') as motivos,
       string_agg(distinct coalesce(r.fuente_ref, ''), ' | ') filter (where r.fuente_ref is not null) as fuentes,
       max(r.opcion_propuesta) as propone,
       b.tema, b.pregunta, b.opciones, b.correcta, b.explicacion
from public.reportes_preguntas r
join public.banco_preguntas b on b.id = r.pregunta_id
where r.estado in ('pendiente', 'revisada')
group by r.pregunta_id, b.tema, b.pregunta, b.opciones, b.correcta, b.explicacion
order by count(*) desc, bool_or(r.fuente_ref is not null) desc, min(r.created_at);
```
Comentarios de una pregunta:
```sql
select motivo, opcion_propuesta, fuente_tipo, fuente_ref, fuente_url, comentario, created_at
from public.reportes_preguntas where pregunta_id = 'C086-0098' order by created_at;
```

## 2. Resolver: `resolver_pregunta(id, estado, frase, cambios, fuente)`
Resuelve **todos** los avisos abiertos de esa pregunta (de todos los usuarios), guarda el cambio en el
registro de correcciones y, al entrar en la app, cada uno ve «Tu aviso ha servido» o «Revisamos tu aviso».

```sql
-- Marcar como «En revisión» (opcional)
select resolver_pregunta('C086-0098', 'revisada', 'Lo estamos comprobando con la Ley 31/1995.');

-- Corregir la respuesta y la explicación (0 = a, 1 = b, 2 = c)
select resolver_pregunta(
  'C086-0098', 'corregida',
  'Tenías razón: el art. 35.2 dice 3 delegados de 51 a 100 trabajadores. Corregidas la respuesta y la explicación.',
  '{"correcta": 1, "explicacion": "Art. 35.2 de la Ley 31/1995: de 51 a 100 trabajadores, 3 Delegados de Prevención."}',
  'Ley 31/1995, art. 35.2'
);

-- Corregir solo una explicación cortada
select resolver_pregunta('C001-0169', 'corregida', 'La explicación salía cortada; ya está completa.',
  '{"explicacion": "Correcta. La dignidad de la persona es fundamento del orden político (art. 10.1), no valor superior. Los valores superiores son libertad, justicia, igualdad y pluralismo político (art. 1.1)."}');

-- La pregunta está bien: se queda como está (explica por qué)
select resolver_pregunta('C029-0031', 'descartada',
  'La respuesta es correcta según el manual de IVASPE (tomo 2, pág. 143). Hemos revisado el enunciado y no hay error.');
```
Claves válidas en `cambios`: `pregunta`, `opciones` (array de 3 textos), `correcta` (0, 1 o 2), `explicacion`.

Al cambiar `correcta`, a quien falló esa pregunta con la respuesta antigua se le borra ese fallo
(la pregunta le vuelve a salir como no vista).

Plantillas de frase:
- Corregida: *«Tenías razón: [fuente] dice X. Corregida la respuesta y la explicación.»*
- Se queda como está: *«La respuesta es correcta según [fuente]. Hemos aclarado el enunciado para que no confunda.»*
- Normativa: *«Según la convocatoria entra la redacción anterior a la reforma, así que la dejamos.»*

### Avisos del callejero
Las preguntas del callejero no están en el banco: la app las genera con el Anexo III. Su aviso llega con el id
`callejero:<tipo>:<item>` (p. ej. `callejero:entrada:c012`) y con la pregunta tal como la vio el usuario en `contexto`.
```sql
select pregunta_id, motivo, contexto->>'pregunta' as pregunta, contexto->'opciones' as opciones,
       contexto->>'correcta' as correcta, fuente_ref, comentario, created_at
from public.reportes_preguntas where pregunta_id like 'callejero:%' and estado in ('pendiente', 'revisada')
order by created_at;
```
El arreglo se hace en `src/data/callejero.json` (o en el generador, `src/lib/callejero.js`), y luego:
```sql
-- Corregida: el cuarto parámetro (true) borra el fallo a quien la falló con el dato malo
select resolver_callejero('callejero:entrada:c012', 'corregida', 'Tenías razón: en el Anexo III la entrada es …. Corregido.', true);
-- Se queda como está
select resolver_callejero('callejero:entrada:c012', 'descartada', 'El Anexo III dice exactamente eso: entrada por ….');
```

## 3. Ojo con el import
Cada pregunta corregida con `resolver_pregunta` queda marcada (`banco_preguntas.editada_at`) y
`scripts/importar-banco.mjs` **no la sobrescribe**. Lleva también la corrección al corpus
(`corpus-bombero/banco`) para que no se pierda si algún día se rehace el banco. Cuando el corpus ya
esté al día y quieras que mande otra vez:
```sql
update public.banco_preguntas set editada_at = null where id = 'C086-0098';
```

## 4. Detectar preguntas sospechosas sin esperar avisos
Preguntas que fallan hasta los usuarios que van bien (≥ 75 % de acierto global). Revisa las 10 primeras cada semana:
```sql
with buenos as (
  select user_id from public.progreso group by user_id
  having sum(vistas) >= 100 and sum(aciertos)::numeric / sum(vistas) >= 0.75
)
select p.pregunta_id, count(*) as la_vieron, sum(p.vistas) as respuestas,
       round(100.0 * sum(p.aciertos) / sum(p.vistas)) as acierto_pct,
       b.tema, b.pregunta, b.opciones, b.correcta
from public.progreso p
join buenos using (user_id)
join public.banco_preguntas b on b.id = p.pregunta_id
group by p.pregunta_id, b.tema, b.pregunta, b.opciones, b.correcta
having sum(p.vistas) >= 3 and sum(p.aciertos)::numeric / sum(p.vistas) < 0.4
order by acierto_pct, respuestas desc
limit 10;
```
Con pocos usuarios salen falsos positivos (preguntas difíciles de verdad): es una lista para mirar, no para corregir a ciegas.

## 5. Métricas (mensual)
```sql
select
  count(*) filter (where created_at >= date_trunc('month', now())) as avisos_mes,
  count(distinct user_id) filter (where created_at >= date_trunc('month', now())) as usuarios_que_avisan,
  round(100.0 * count(*) filter (where fuente_ref is not null or fuente_url is not null) / nullif(count(*), 0)) as pct_con_fuente,
  count(*) filter (where estado in ('pendiente', 'revisada')) as abiertos,
  round(100.0 * count(*) filter (where estado = 'corregida') / nullif(count(*) filter (where estado in ('corregida', 'descartada')), 0)) as pct_aceptados,
  percentile_cont(0.5) within group (order by extract(epoch from resuelto_at - created_at) / 86400)
    filter (where resuelto_at is not null) as mediana_dias_resolver,
  round(100.0 * count(*) filter (where visto_at is not null) / nullif(count(*) filter (where resuelto_at is not null), 0)) as pct_resueltos_vistos
from public.reportes_preguntas;

-- preguntas corregidas este mes
select count(distinct pregunta_id) from public.correcciones where created_at >= date_trunc('month', now());
```
Objetivos iniciales: ≥ 2 usuarios (además de ti) avisando al mes, ≥ 50 % de avisos con fuente, mediana ≤ 7 días, < 20 abiertos.

## 6. Cambios masivos: `supabase/aplicar/`
Para cambios de datos que no caben en el editor SQL (cientos o miles de filas), se deja el `.sql` en
`supabase/aplicar/<fecha>-<qué>/` y se hace push: el workflow «Aplicar SQL en Supabase» ejecuta en orden
cada fichero **nuevo** del push, cada uno en su transacción, y en el log solo salen los recuentos que
devuelva el propio fichero. Los ficheros deben llevar guardas en el `WHERE` para poder repetirse sin daño.
Ejemplo: `2026-11-05-citas/` amplió 1.845 citas cortadas con el texto literal del corpus (`corpus-bombero/banco-v4`).

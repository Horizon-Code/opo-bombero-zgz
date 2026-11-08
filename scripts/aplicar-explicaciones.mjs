// Aplica explicaciones reescritas al banco y genera una versión nueva.
// Las reescrituras llegan como ficheros JSON { "<id>": "<explicación>" }
// (uno por lote). Antes de aplicar cada una se valida que sea una explicación
// de verdad: longitud, que no calque la opción ni la cita, que contraste con
// las opciones falsas, que no cite «el manual» y que no contradiga la letra
// correcta. Las que no pasan se dejan como estaban y se listan en rechazadas.csv.
//
// Uso: node scripts/aplicar-explicaciones.mjs <banco origen> <carpeta reescrituras> <banco destino>
//   Escribe en destino: tema-NN.json (mismos ids y campos), cambios.csv,
//   rechazadas.csv y LEEME.md. No toca el banco de origen.
import fs from "node:fs";
import path from "node:path";
import { leerBanco, motivos, palabras, contenido } from "./auditar-explicaciones.mjs";

const [origen, reescrituras, destino] = process.argv.slice(2);
if (!origen || !reescrituras || !destino) {
  console.error("Uso: node scripts/aplicar-explicaciones.mjs <banco origen> <carpeta reescrituras> <banco destino>");
  process.exit(1);
}

export const MIN = 100, MAX = 450;
const LETRAS = ["a", "b", "c", "d"];
const RE_PROHIBIDO = /\b(el manual|del manual|un manual|el temario|del temario|la academia|de academia|el texto|del texto|la fuente|el pdf|la escuela|como dice la cita|la cita|la respuesta correcta es|la opci[oó]n correcta es|la figura|la imagen|el esquema|el bloque|del bloque)\b/i;

// Devuelve el motivo de rechazo o null si la explicación nueva vale.
export function rechazo(q, nueva) {
  const e = String(nueva || "").trim();
  if (!e) return "vacia";
  if (e.length < MIN) return `corta (${e.length})`;
  if (e.length > MAX) return `larga (${e.length})`;
  if (/\n/.test(e) || /^[-*•]/.test(e) || /\*\*/.test(e)) return "formato";
  if (RE_PROHIBIDO.test(e)) return "prohibido";
  const pe = palabras(e);
  if (contenido(pe, palabras(q.opciones[q.correcta])) >= 0.85) return "eco-opcion";
  const pc = palabras(q.cita);
  if (pc.length && contenido(pe, pc) >= 0.9 && pe.length <= pc.length + 3) return "eco-cita";
  // tiene que contrastar: nombrar alguna opción falsa por su letra o por su contenido
  const falsas = q.opciones.map((o, i) => (i === q.correcta ? null : { o, l: LETRAS[i] })).filter(Boolean);
  const menciona = falsas.some(({ o, l }) => new RegExp(`\\b${l}\\)`, "i").test(e) || contenido(palabras(o), pe) >= 0.5);
  if (!menciona && !/\b(las otras dos|las otras|las dem[aá]s|ninguna de las otras|el resto)\b/i.test(e)) return "sin-contraste";
  // no debe afirmar que la correcta falla
  const lc = LETRAS[q.correcta];
  if (new RegExp(`\\bla ${lc}\\)\\s+(es|resulta|queda)\\s+(falsa|incorrecta|err[oó]nea)`, "i").test(e) && q.tipo !== "negativa") return "contradice-letra";
  const cursor = motivos({ ...q, explicacion: e }).filter((m) => m !== "sin-contraste");
  if (cursor.length) return cursor.join("|");
  return null;
}

const nuevas = {};
for (const f of fs.readdirSync(reescrituras).filter((x) => /^[A-Z]\d+\.json$/.test(x)).sort()) {
  let obj;
  try { obj = JSON.parse(fs.readFileSync(path.join(reescrituras, f), "utf8")); }
  catch (e) { console.error(`${f}: JSON inválido (${e.message})`); continue; }
  for (const [id, e] of Object.entries(obj)) nuevas[id] = { e, lote: f };
}

fs.mkdirSync(destino, { recursive: true });
const esc = (s) => `"${String(s ?? "").replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;
const cambios = [["id", "tema", "lote", "explicacion_antes", "explicacion_ahora"]];
const rechazadas = [["id", "tema", "lote", "motivo", "pregunta", "correcta", "propuesta"]];
let total = 0, aplicadas = 0, sinPropuesta = 0, flojasAntes = 0, flojasDespues = 0;
for (const { fichero, preguntas } of leerBanco(origen)) {
  const salida = preguntas.map((q) => {
    total++;
    const floja = motivos(q).length > 0;
    if (floja) flojasAntes++;
    const prop = nuevas[q.id];
    if (!prop) { if (floja) sinPropuesta++; if (floja) flojasDespues++; return q; }
    const motivo = rechazo(q, prop.e);
    if (motivo) {
      rechazadas.push([q.id, q.tema, prop.lote, motivo, q.pregunta, q.opciones[q.correcta], prop.e]);
      if (floja) flojasDespues++;
      return q;
    }
    aplicadas++;
    cambios.push([q.id, q.tema, prop.lote, q.explicacion, prop.e.trim()]);
    return { ...q, explicacion: prop.e.trim() };
  });
  fs.writeFileSync(path.join(destino, fichero), JSON.stringify(salida, null, 1));
}
fs.writeFileSync(path.join(destino, "cambios.csv"), "﻿" + cambios.map((r) => r.map(esc).join(";")).join("\r\n"));
fs.writeFileSync(path.join(destino, "rechazadas.csv"), "﻿" + rechazadas.map((r) => r.map(esc).join(";")).join("\r\n"));
const pct = (a, b) => `${Math.round((100 * a) / b)} %`;
const resumen = [
  `${total} preguntas · ${Object.keys(nuevas).length} propuestas · ${aplicadas} aplicadas · ${rechazadas.length - 1} rechazadas · ${sinPropuesta} flojas sin propuesta`,
  `explicaciones flojas: antes ${flojasAntes} (${pct(flojasAntes, total)}) → después ${flojasDespues} (${pct(flojasDespues, total)})`,
];
console.log(resumen.join("\n"));
const hoy = new Date().toLocaleDateString("es-ES");
fs.writeFileSync(path.join(destino, "LEEME.md"), `# Banco v3 · explicaciones reescritas · ${hoy}

Mismo banco que la versión anterior (mismos \`id\`, enunciados, opciones y citas): solo cambia el campo \`explicacion\`.
El progreso de los usuarios se conserva.

Criterio: la explicación no repite la opción correcta ni la cita (que el alumno ya ve debajo); sitúa el dato
(norma, función, magnitud) y dice por qué fallan las otras dos opciones, nombrándolas por su letra.

- ${resumen[0]}
- ${resumen[1]}
- \`cambios.csv\`: cada explicación cambiada, antes y después (separado por «;», se abre en Excel).
- \`rechazadas.csv\`: propuestas que no pasaron la validación automática y se dejaron como estaban, con el motivo.

Comprobación: \`node scripts/auditar-explicaciones.mjs <esta carpeta>\`.
Carga en Supabase: \`SUPABASE_SERVICE_ROLE_KEY=... node scripts/importar-banco.mjs <esta carpeta>\` (upsert por id; no hace falta regenerar la estructura).
`);

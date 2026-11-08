// Audita las explicaciones del banco: detecta las que no explican nada
// (repiten la opción correcta o la cita, son muy cortas o no dicen por qué
// fallan las otras opciones). No toca el banco: solo informa.
//
// Uso: node scripts/auditar-explicaciones.mjs <carpeta banco> [salida.csv]
//   Imprime un resumen por tema y, si se indica, vuelca el detalle en CSV
//   (separado por «;», se abre en Excel) con un motivo por pregunta.
//
// Criterios (una explicación es «floja» si cumple cualquiera):
//   eco-opcion    casi todas sus palabras están en la opción correcta
//   eco-cita      casi todas sus palabras están en la cita y no es más larga
//   corta         menos de 60 caracteres
//   sin-contraste no menciona ninguna opción falsa ni usa fórmulas de
//                 contraste («no», «en cambio», «la a)», «confunde»…)
//   fuente        cita «el manual», «el temario», «la academia», «la cita»…
import fs from "node:fs";
import path from "node:path";

export const MIN_LARGO = 60;

const quitarTildes = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
export const palabras = (s) => quitarTildes(String(s || "").toLowerCase()).replace(/[^a-z0-9ñ ]+/g, " ").split(/\s+/).filter(Boolean);

// fracción de palabras de `a` que también están en `b`
export function contenido(a, b) {
  const A = new Set(a), B = new Set(b);
  if (!A.size) return 0;
  let n = 0;
  for (const w of A) if (B.has(w)) n++;
  return n / A.size;
}

const RE_CONTRASTE = /\b(no|ni|nunca|tampoco|en cambio|frente a|a diferencia|mientras|incorrect\w*|err[oó]ne\w*|confund\w*|la otra|las otras|otras opciones|opci[oó]n|descart\w*|falla\w*|falso|falsa|exclu\w*|limita|reduce|mezcla|cambia|invierte|corresponde a|pertenece a|es de|se refiere a|solo|únicamente|unicamente)\b/i;
const RE_FUENTE = /\b(el manual|del manual|un manual|el temario|del temario|la academia|de academia|el texto|del texto|la fuente|seg[uú]n el texto|seg[uú]n la fuente|la escuela|el pdf|la figura|la imagen|el esquema|como dice la cita|la cita)\b/i;
const LETRAS = ["a", "b", "c", "d"];

// Devuelve la lista de motivos por los que la explicación es floja ([] si está bien).
export function motivos(q) {
  const e = String(q.explicacion || "").trim();
  if (!e) return ["vacia"];
  const m = [];
  const pe = palabras(e);
  const correcta = q.opciones[q.correcta] || "";
  if (contenido(pe, palabras(correcta)) >= 0.85) m.push("eco-opcion");
  const pc = palabras(q.cita);
  if (pc.length && contenido(pe, pc) >= 0.9 && pe.length <= pc.length + 3) m.push("eco-cita");
  if (e.length < MIN_LARGO) m.push("corta");
  const falsas = q.opciones.map((o, i) => (i === q.correcta ? null : { o, l: LETRAS[i] })).filter(Boolean);
  const mencionaFalsa = falsas.some(({ o, l }) => contenido(palabras(o), pe) >= 0.5 || new RegExp(`\\b${l}\\)`, "i").test(e));
  if (!mencionaFalsa && !RE_CONTRASTE.test(e)) m.push("sin-contraste");
  if (RE_FUENTE.test(e)) m.push("fuente");
  return m;
}

export function leerBanco(dir) {
  const ficheros = fs.readdirSync(dir).filter((f) => /^tema-\d\d\.json$/.test(f)).sort();
  if (!ficheros.length) throw new Error(`No hay tema-NN.json en ${dir}`);
  return ficheros.map((f) => ({ fichero: f, preguntas: JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) }));
}

const esc = (s) => `"${String(s ?? "").replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;

if (process.argv[1] && path.resolve(process.argv[1]) === new URL(import.meta.url).pathname) {
  const dir = process.argv[2];
  if (!dir) { console.error("Uso: node scripts/auditar-explicaciones.mjs <carpeta banco> [salida.csv]"); process.exit(1); }
  const salida = process.argv[3];
  const filas = [];
  const porTema = {};
  const porMotivo = {};
  let total = 0, flojas = 0;
  for (const { preguntas } of leerBanco(dir)) {
    for (const q of preguntas) {
      total++;
      const t = (porTema[q.tema] ||= { n: 0, flojas: 0 });
      t.n++;
      const m = motivos(q);
      if (!m.length) continue;
      flojas++; t.flojas++;
      for (const x of m) porMotivo[x] = (porMotivo[x] || 0) + 1;
      filas.push([q.id, q.tema, q.nodo, q.tipo, m.join(" | "), q.pregunta, q.opciones[q.correcta], q.explicacion, q.cita]);
    }
  }
  const pct = (a, b) => `${Math.round((100 * a) / b)} %`;
  console.log(`${total} preguntas · ${flojas} explicaciones flojas (${pct(flojas, total)})`);
  for (const [k, v] of Object.entries(porMotivo).sort((a, b) => b[1] - a[1])) console.log(`  ${k.padEnd(14)} ${String(v).padStart(6)}  ${pct(v, total)}`);
  console.log("por tema:");
  for (const n of Object.keys(porTema).map(Number).sort((a, b) => a - b)) {
    const t = porTema[n];
    console.log(`  tema ${String(n).padStart(2)}  ${String(t.n).padStart(5)}  flojas ${String(t.flojas).padStart(5)}  ${pct(t.flojas, t.n)}`);
  }
  if (salida) {
    const cab = ["id", "tema", "nodo", "tipo", "motivos", "pregunta", "correcta", "explicacion", "cita"];
    fs.writeFileSync(salida, "﻿" + [cab, ...filas].map((r) => r.map(esc).join(";")).join("\r\n"));
    console.log(`detalle en ${salida}`);
  }
}

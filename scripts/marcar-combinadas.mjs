// Genera src/data/combinadas.json: las preguntas con opción combinada
// («a) y b) son correctas», «Ninguna es correcta», «Todas son correctas»…),
// separadas según la combinada sea la respuesta buena o no.
// La app lo usa para que en los tests la combinada no sea casi siempre la buena
// (en el banco lo es en el 73 % de los casos, y eso se aprende y se aprovecha para adivinar).
//
// Uso: node scripts/marcar-combinadas.mjs <carpeta banco>   (tema-NN.json)
import fs from "node:fs";
import path from "node:path";

const dir = process.argv[2];
if (!dir) { console.error("Uso: node scripts/marcar-combinadas.mjs <carpeta banco>"); process.exit(1); }
export const COMBINADA = /^\s*((las respuestas )?a\) y b\) son (correctas|ciertas|verdaderas)|las dos (anteriores|respuestas) son correctas|ninguna( de las (anteriores|respuestas|opciones))?( es correcta)?|todas( las (anteriores|respuestas|opciones))? son (correctas|ciertas))\s*\.?\s*$/i;

const correcta = [], otra = [];
for (const f of fs.readdirSync(dir).filter((x) => /^tema-\d\d\.json$/.test(x)).sort()) {
  for (const q of JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"))) {
    const i = q.opciones.findIndex((o) => COMBINADA.test(o));
    if (i < 0) continue;
    (i === q.correcta ? correcta : otra).push(q.id);
  }
}
const dest = path.join(path.dirname(new URL(import.meta.url).pathname), "..", "src", "data", "combinadas.json");
fs.writeFileSync(dest, JSON.stringify({ correcta, otra }));
const pct = Math.round((100 * correcta.length) / (correcta.length + otra.length));
console.log(`combinadas.json: ${correcta.length + otra.length} preguntas con opción combinada; la combinada es la buena en ${correcta.length} (${pct} %) → ${dest}`);

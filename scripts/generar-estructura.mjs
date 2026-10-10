// Genera src/data/estructura.json: el árbol tema → nodo → bloque con los ids
// de las preguntas de cada bloque. La app lo usa para pintar las bolitas y
// elegir preguntas sin tener que descargar el banco entero.
//
// Uso: node scripts/generar-estructura.mjs <carpeta corpus-bombero>
//   (lee <corpus>/temas, <corpus>/compartidos.json y <corpus>/banco/tema-NN.json)
import fs from "node:fs";
import path from "node:path";

const corpus = process.argv[2];
if (!corpus) { console.error("Uso: node scripts/generar-estructura.mjs <carpeta corpus-bombero>"); process.exit(1); }
const bancoDir = process.argv[3] || path.join(corpus, "banco");
const leer = (f) => JSON.parse(fs.readFileSync(f, "utf8"));

// títulos de bloques y epígrafes de nodos
const tituloBloque = {};
const temasCorpus = {};
for (const parte of ["parte-1-legislacion", "parte-2-tecnico"]) {
  for (const f of fs.readdirSync(path.join(corpus, "temas", parte)).filter((x) => /^tema-\d\d\.json$/.test(x))) {
    const t = leer(path.join(corpus, "temas", parte, f));
    temasCorpus[t.tema.numero] = t;
    for (const n of t.nodos) for (const b of n.bloques || []) if (b.id) tituloBloque[b.id] = b.titulo || b.ancla || "";
  }
}
const comp = leer(path.join(corpus, "compartidos.json"));
const normaCompartido = {};
for (const [clave, e] of Object.entries(comp.entradas)) {
  normaCompartido[clave] = e.norma || e.titulo || clave;
  for (const b of e.bloques || []) if (b.id) tituloBloque[b.id] = b.titulo || b.ancla || "";
}

// preguntas del banco agrupadas por tema/nodo/bloque
const porBloque = new Map(); // bloque_id -> {tema, nodo, ids[]}
const compartidoEn = new Map(); // tema -> Set(bloque_id) de otros temas titulares
let total = 0;
for (const f of fs.readdirSync(bancoDir).filter((x) => /^tema-\d\d\.json$/.test(x)).sort()) {
  for (const q of leer(path.join(bancoDir, f))) {
    total++;
    if (!porBloque.has(q.bloque_id)) porBloque.set(q.bloque_id, { tema: q.tema, nodo: q.nodo, ids: [] });
    porBloque.get(q.bloque_id).ids.push(q.id);
    for (const t of q.tambien_en || []) {
      if (t === q.tema) continue;
      if (!compartidoEn.has(t)) compartidoEn.set(t, new Set());
      compartidoEn.get(t).add(q.bloque_id);
    }
  }
}

const bloqueInfo = (id) => {
  const fuente = id.startsWith("C-")
    ? normaCompartido[Object.keys(normaCompartido).find((k) => id.startsWith(`C-${k}-`))] || null
    : null;
  return { id, titulo: tituloBloque[id] || id, ...(fuente ? { compartido: fuente } : {}), ids: porBloque.get(id).ids };
};

const temas = [];
for (const num of Object.keys(temasCorpus).map(Number).sort((a, b) => a - b)) {
  const t = temasCorpus[num];
  const nodos = [];
  for (const n of t.nodos) {
    const bloques = [...porBloque.entries()]
      .filter(([, v]) => v.tema === num && v.nodo === n.id)
      .map(([id]) => id)
      .sort((a, b) => (a.startsWith("C-") - b.startsWith("C-")) || a.localeCompare(b, "es", { numeric: true }))
      .map(bloqueInfo);
    if (bloques.length) nodos.push({ id: n.id, epigrafe: n.epigrafe, bloques });
  }
  const compartidos = [...(compartidoEn.get(num) || [])].sort().map((id) => ({ id, deTema: porBloque.get(id).tema }));
  temas.push({ n: num, titulo: t.tema.titulo, parte: num <= 8 ? 1 : 2, nodos, compartidos });
}

const out = { generado: new Date().toISOString().slice(0, 10), total, temas };
const dest = path.join(path.dirname(new URL(import.meta.url).pathname), "..", "src", "data", "estructura.json");
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, JSON.stringify(out));
console.log(`estructura.json: ${temas.length} temas, ${porBloque.size} bloques, ${total} preguntas → ${dest}`);

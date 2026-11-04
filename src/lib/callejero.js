// Callejero de la prueba de conocimiento del Municipio (Anexo III de las bases de 2026).
// Las preguntas no se guardan en ningún sitio: se generan en el momento a partir de la tabla
// oficial CALLE / ENTRADA / SALIDA y de la lista de polígonos, con 3 opciones como el examen.
import datos from "../data/callejero.json";

export const CALLES = datos.calles;        // [{ id, calle, entrada, salida }]
export const POLIGONOS = datos.poligonos;  // [{ id, nombre, situacion }]
export const FUENTE = datos.fuente;
export const NO_TIENE = "NO TIENE";

// Comparar nombres sin acentos, mayúsculas ni signos («ATARÉS, JOSÉ» = «ATARÉS JOSÉ»)
export const norm = (s) =>
  String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase().replace(/[^A-Z0-9Ñ]+/g, " ").trim();

const barajar = (a, rnd = Math.random) => { const x = [...a]; for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; } return x; };
const unicos = (arr) => { const vistos = new Set(); return arr.filter((x) => { const k = norm(x); if (!k || vistos.has(k)) return false; vistos.add(k); return true; }); };

// ---- índices ----
const filasPorCalle = new Map(); // nombre normalizado → filas (hay calles con dos tramos, p. ej. MAYOR o HISPANIDAD)
for (const c of CALLES) { const k = norm(c.calle); if (!filasPorCalle.has(k)) filasPorCalle.set(k, []); filasPorCalle.get(k).push(c); }

// Grafo «está cerca de»: cada calle con su entrada y su salida. Los distractores salen de los
// vecinos (misma zona de la ciudad), que es lo que hace dudar de verdad; si no hay bastantes, del total.
const vecinos = new Map();
const unir = (a, b) => {
  if (!a || !b || a === NO_TIENE || b === NO_TIENE) return;
  const ka = norm(a), kb = norm(b);
  if (ka === kb) return;
  if (!vecinos.has(ka)) vecinos.set(ka, new Map());
  if (!vecinos.has(kb)) vecinos.set(kb, new Map());
  vecinos.get(ka).set(kb, b); vecinos.get(kb).set(ka, a);
};
for (const c of CALLES) { unir(c.calle, c.entrada); unir(c.calle, c.salida); unir(c.entrada, c.salida); }
const TODOS_LOS_NOMBRES = unicos(CALLES.flatMap((c) => [c.calle, c.entrada, c.salida]).filter((x) => x !== NO_TIENE));

function cercanos(nombre, profundidad = 2) {
  const inicio = norm(nombre), vistos = new Set([inicio]), out = [];
  let frontera = [inicio];
  for (let d = 0; d < profundidad; d++) {
    const sig = [];
    for (const k of frontera) for (const [kv, v] of vecinos.get(k) || []) if (!vistos.has(kv)) { vistos.add(kv); out.push(v); sig.push(kv); }
    frontera = sig;
  }
  return out;
}

// Dos opciones incorrectas que no sean ninguna respuesta válida, preferiblemente de la zona
function distractores(validas, cerca, pool, rnd) {
  const prohibidas = new Set(validas.map(norm));
  const ok = (x) => x && x !== NO_TIENE && !prohibidas.has(norm(x));
  const elegidas = unicos(barajar(cerca.filter(ok), rnd)).slice(0, 2);
  if (elegidas.length < 2) {
    const ya = new Set(elegidas.map(norm));
    elegidas.push(...unicos(barajar(pool.filter((x) => ok(x) && !ya.has(norm(x))), rnd)).slice(0, 2 - elegidas.length));
  }
  return elegidas;
}

function montar({ id, item, tipo, enunciado, correcta, malas, explicacion, rnd }) {
  if (malas.length < 2) return null;
  const opciones = barajar([correcta, ...malas], rnd);
  return { id, item, tipo, pregunta: enunciado, opciones, correcta: opciones.indexOf(correcta), explicacion, tema: "Callejero", etiqueta: ETIQUETA[tipo] };
}

const ETIQUETA = {
  entrada: "Callejero · Entrada de la calle",
  salida: "Callejero · Salida de la calle",
  tramo: "Callejero · Qué calle va de… a…",
  poligono: "Polígonos industriales · Situación",
  poligono_inv: "Polígonos industriales · Cuál está ahí",
};
const explicaCalle = (c) => `Anexo III: ${c.calle} — entrada: ${c.entrada} · salida: ${c.salida === NO_TIENE ? "no tiene" : c.salida}.`;

// ---- generadores por tipo (cada uno devuelve null si la pregunta saldría ambigua) ----
const GEN = {
  entrada(c, rnd) {
    const validas = filasPorCalle.get(norm(c.calle)).map((f) => f.entrada); // si la calle tiene dos tramos, ninguna entrada suya puede ser distractor
    if (validas.some((v) => norm(v) === norm(c.calle))) return null;       // «MAYOR entra por MAYOR»: no se pregunta
    return montar({
      id: `entrada:${c.id}`, item: c.id, tipo: "entrada", rnd,
      enunciado: `¿Cuál es la entrada de la calle ${c.calle}?`,
      correcta: c.entrada, malas: distractores([...validas, c.calle, c.salida], cercanos(c.calle), TODOS_LOS_NOMBRES, rnd),
      explicacion: explicaCalle(c),
    });
  },
  salida(c, rnd) {
    if (c.salida === NO_TIENE) return null;
    const validas = filasPorCalle.get(norm(c.calle)).map((f) => f.salida);
    if (validas.some((v) => norm(v) === norm(c.calle))) return null;
    return montar({
      id: `salida:${c.id}`, item: c.id, tipo: "salida", rnd,
      enunciado: `¿Cuál es la salida de la calle ${c.calle}?`,
      correcta: c.salida, malas: distractores([...validas, c.calle, c.entrada], cercanos(c.calle), TODOS_LOS_NOMBRES, rnd),
      explicacion: explicaCalle(c),
    });
  },
  tramo(c, rnd) {
    if (c.salida === NO_TIENE || norm(c.entrada) === norm(c.salida)) return null;
    // todas las calles que van entre esas dos (en cualquier sentido) son válidas: ninguna puede ser distractor
    const validas = CALLES.filter((x) => {
      const e = norm(x.entrada), s = norm(x.salida), a = norm(c.entrada), b = norm(c.salida);
      return (e === a && s === b) || (e === b && s === a);
    }).map((x) => x.calle);
    if (unicos(validas).length > 1) return null; // dos calles distintas unen lo mismo: pregunta ambigua
    const cerca = [...cercanos(c.entrada, 1), ...cercanos(c.salida, 1)].filter((x) => filasPorCalle.has(norm(x)));
    return montar({
      id: `tramo:${c.id}`, item: c.id, tipo: "tramo", rnd,
      enunciado: `¿Qué calle tiene la entrada por ${c.entrada} y la salida por ${c.salida}?`,
      correcta: c.calle, malas: distractores([...validas, c.entrada, c.salida], cerca, CALLES.map((x) => x.calle), rnd),
      explicacion: explicaCalle(c),
    });
  },
  poligono(p, rnd) {
    const otras = POLIGONOS.map((x) => x.situacion);
    // mismo tipo de vía primero (otra carretera y km), para que no se adivine por la forma
    const via = norm(p.situacion).split(" ")[0];
    const cerca = otras.filter((s) => norm(s).split(" ")[0] === via);
    return montar({
      id: `poligono:${p.id}`, item: p.id, tipo: "poligono", rnd,
      enunciado: `¿Dónde está ${p.nombre}?`,
      correcta: p.situacion, malas: distractores([p.situacion], cerca, otras, rnd),
      explicacion: `Anexo III: ${p.nombre} — ${p.situacion}.`,
    });
  },
  poligono_inv(p, rnd) {
    // varios polígonos comparten situación (Malpica por calles, Empresarium e Insider…): ninguno de ellos puede ser distractor
    const mismos = POLIGONOS.filter((x) => norm(x.situacion) === norm(p.situacion)).map((x) => x.nombre);
    const base = (n) => norm(n).split(" ")[0]; // MALPICA, EUROPA, RUISEÑORES…: tampoco otra calle o fase del mismo polígono
    const libres = POLIGONOS.filter((x) => !mismos.some((m) => base(m) === base(x.nombre)));
    const via = (x) => norm(x.situacion).split(" ")[0];
    const cerca = libres.filter((x) => via(x) === via(p)).map((x) => x.nombre); // otros de la misma carretera o tipo de vía
    return montar({
      id: `poligono_inv:${p.id}`, item: p.id, tipo: "poligono_inv", rnd,
      enunciado: `¿Qué polígono está en ${p.situacion}?`,
      correcta: p.nombre, malas: distractores(mismos, cerca, libres.map((x) => x.nombre), rnd),
      explicacion: `Anexo III: ${p.nombre} — ${p.situacion}.`,
    });
  },
};

export const TIPOS_CALLE = ["entrada", "salida", "tramo"];
export const TIPOS_POLIGONO = ["poligono", "poligono_inv"];
export const itemPorId = Object.fromEntries([...CALLES, ...POLIGONOS].map((x) => [x.id, x]));

// Todas las preguntas posibles (para validar y para las estadísticas)
export function todasLasPreguntas(rnd = Math.random) {
  const out = [];
  for (const c of CALLES) for (const t of TIPOS_CALLE) { const q = GEN[t](c, rnd); if (q) out.push(q); }
  for (const p of POLIGONOS) for (const t of TIPOS_POLIGONO) { const q = GEN[t](p, rnd); if (q) out.push(q); }
  return out;
}

// ---- progreso: por pregunta (id «tipo:item») ----
// progreso: { [id]: { vistas, aciertos, ultimo_resultado, ultima_fecha } }
function peso(p, criterio) {
  if (criterio === "azar") return 1;
  if (!p || !p.vistas) return criterio === "falladas" ? 0 : 4;
  if (p.ultimo_resultado === false) return criterio === "nuevas" ? 0 : 6;
  if (criterio !== "inteligente") return 0;
  return p.aciertos < p.vistas ? 2 : 1;
}

// Elige n preguntas de los tipos pedidos, sin repetir calle o polígono en el mismo test
export function elegirPreguntas({ n = 20, tipos = [...TIPOS_CALLE, ...TIPOS_POLIGONO], criterio = "inteligente", progreso = {} }) {
  const candidatas = todasLasPreguntas().filter((q) => tipos.includes(q.tipo));
  const puntuadas = candidatas
    .map((q) => ({ q, w: peso(progreso[q.id], criterio) }))
    .filter((x) => x.w > 0)
    .map((x) => ({ q: x.q, k: Math.pow(Math.random(), 1 / x.w) }))
    .sort((a, b) => b.k - a.k);
  const items = new Set(), out = [];
  for (const { q } of puntuadas) {
    if (out.length >= n) break;
    if (items.has(q.item)) continue;
    items.add(q.item); out.push(q);
  }
  return barajar(out);
}

// Simulacro con el formato previsto de la prueba: 50 preguntas, 3 opciones, 30 minutos.
// Reparto aproximado: 40 de calles y 10 de polígonos.
export function simulacroCallejero(progreso = {}) {
  const calles = elegirPreguntas({ n: 40, tipos: TIPOS_CALLE, criterio: "azar", progreso });
  const pols = elegirPreguntas({ n: 10, tipos: TIPOS_POLIGONO, criterio: "azar", progreso });
  return barajar([...calles, ...pols]);
}

// Estado de dominio: una calle está dominada si la última vez acertó todas las preguntas suyas que ha visto
export function estadoItems(progreso) {
  const porItem = {};
  for (const [id, p] of Object.entries(progreso)) {
    const item = id.split(":")[1];
    const s = (porItem[item] ||= { vistas: 0, aciertos: 0, fallada: false });
    s.vistas += p.vistas; s.aciertos += p.aciertos;
    if (p.ultimo_resultado === false) s.fallada = true;
  }
  return porItem;
}

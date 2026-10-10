// Lógica del banco fijo: estructura del temario, progreso por tema/nodo/bloque
// (las «bolitas») y selección de preguntas para cada tipo de test.
import estructura from "../data/estructura.json";

export { estructura };
export const TOTAL_PREGUNTAS = estructura.total;

// ---- índices ----
export const bloquePorId = {};
export const temaPorNumero = {};
for (const t of estructura.temas) {
  temaPorNumero[t.n] = t;
  for (const n of t.nodos) for (const b of n.bloques) bloquePorId[b.id] = { ...b, tema: t.n, nodo: n.id };
}
// bloques que cuentan para un tema: los suyos + los compartidos que su enunciado también pide
export const bloquesDeTema = (n) => {
  const t = temaPorNumero[n];
  return [...t.nodos.flatMap((x) => x.bloques.map((b) => b.id)), ...t.compartidos.map((c) => c.id)];
};
export const bloquesDeNodo = (temaN, nodoId) =>
  temaPorNumero[temaN].nodos.find((x) => x.id === nodoId).bloques.map((b) => b.id);

// ---- estadísticas ----
const vacio = () => ({ total: 0, vistas: 0, dominadas: 0, intentos: 0, aciertos: 0, falladas: 0 });
const sumar = (a, b) => { for (const k in a) a[k] += b[k]; return a; };

// progreso: { [pregunta_id]: { vistas, aciertos, ultimo_resultado } }
export function statsBloques(progreso) {
  const out = {};
  for (const [id, b] of Object.entries(bloquePorId)) {
    const s = vacio();
    s.total = b.ids.length;
    for (const q of b.ids) {
      const p = progreso[q];
      if (!p || !p.vistas) continue;
      s.vistas++; s.intentos += p.vistas; s.aciertos += p.aciertos;
      if (p.ultimo_resultado) s.dominadas++; else s.falladas++;
    }
    out[id] = s;
  }
  return out;
}
export const statsDe = (bloqueIds, sb) => bloqueIds.reduce((acc, id) => sumar(acc, sb[id] || vacio()), vacio());

// Estado de una bolita.
// · porcentaje = dominio: preguntas cuya ÚLTIMA respuesta fue correcta / total del ámbito
// · color = cómo vas en lo que ya has visto (acierto en tus intentos)
export function estado(s) {
  const pct = s.total ? Math.round((100 * s.dominadas) / s.total) : 0;
  if (!s.vistas) return { pct, color: "gris", acierto: null };
  const acierto = Math.round((100 * s.aciertos) / s.intentos);
  return { pct, acierto, color: acierto >= 80 ? "verde" : acierto >= 60 ? "ambar" : "rojo" };
}

// ---- selección de preguntas ----
const barajar = (a) => { const x = [...a]; for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; } return x; };

export const idsDeBloques = (bloqueIds) => [...new Set(bloqueIds.flatMap((id) => bloquePorId[id]?.ids || []))];

function peso(p, criterio) {
  if (criterio === "azar") return 1;
  if (!p || !p.vistas) return criterio === "falladas" ? 0 : 4;          // nunca vista
  if (p.ultimo_resultado === false) return criterio === "nuevas" ? 0 : 6; // fallada la última vez
  if (criterio !== "inteligente") return 0;
  return p.aciertos < p.vistas ? 2 : 1;                                  // acertada (más si alguna vez la fallaste)
}

// Muestreo ponderado sin reemplazo (Efraimidis-Spirakis)
function muestrear(ids, n, criterio, progreso) {
  return ids
    .map((id) => ({ id, w: peso(progreso[id], criterio) }))
    .filter((x) => x.w > 0)
    .map((x) => ({ id: x.id, k: Math.pow(Math.random(), 1 / x.w) }))
    .sort((a, b) => b.k - a.k)
    .slice(0, n)
    .map((x) => x.id);
}

// grupos: [[ids de un tema], [ids de otro tema], …] → reparte n a partes iguales entre grupos
export function elegir(grupos, n, criterio, progreso) {
  const gs = grupos.filter((g) => g.length);
  if (!gs.length) return [];
  if (gs.length === 1) return barajar(muestrear(gs[0], n, criterio, progreso));
  const orden = barajar(gs.map((_, i) => i));
  const cupo = gs.map(() => 0);
  for (let i = 0; i < n; i++) cupo[orden[i % gs.length]]++;
  let elegidos = gs.flatMap((g, i) => muestrear(g, cupo[i], criterio, progreso));
  if (elegidos.length < n) { // algún grupo se quedó corto: rellena con el resto
    const ya = new Set(elegidos);
    elegidos = elegidos.concat(muestrear(gs.flat().filter((id) => !ya.has(id)), n - elegidos.length, criterio, progreso));
  }
  return barajar(elegidos);
}

// Simulacro con el formato del examen: 20 preguntas de la Parte I (temas 1-8) y 80 de la Parte II (9-40)
export function simulacro(progreso) {
  // solo los bloques propios de cada tema, para que los 40 temas salgan representados
  const propios = (t) => t.nodos.flatMap((x) => x.bloques.map((b) => b.id));
  const grupo = (desde, hasta) => estructura.temas.filter((t) => t.n >= desde && t.n <= hasta).map((t) => idsDeBloques(propios(t)));
  const p1 = elegir(grupo(1, 8), 20, "azar", progreso);
  const p2 = elegir(grupo(9, 40), 80, "azar", progreso);
  return [...p1, ...p2];
}

// ---- corrección con el baremo del examen: +0,10 acierto, −0,025 fallo, 0 en blanco ----
export function corregir(preguntas, respuestas) {
  let aciertos = 0, fallos = 0, blancos = 0;
  const porTema = {};
  preguntas.forEach((q, i) => {
    const r = respuestas[i];
    const t = (porTema[q.tema] ||= { ok: 0, total: 0 });
    t.total++;
    if (r == null) blancos++;
    else if (r === q.correcta) { aciertos++; t.ok++; }
    else fallos++;
  });
  const n = preguntas.length || 1;
  const nota = Math.max(0, ((aciertos - fallos / 4) / n) * 10); // sobre 10, equivale a +0,10/−0,025 en 100 preguntas
  return { aciertos, fallos, blancos, nota: Math.round(nota * 100) / 100, porTema };
}

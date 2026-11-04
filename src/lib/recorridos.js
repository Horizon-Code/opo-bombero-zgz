// Recorridos entre los parques de bomberos y puntos clave, comprobados uno a uno en Google Maps
// (modo coche). De cada recorrido salen varias preguntas: el recorrido completo, el siguiente paso,
// el último tramo y el paso que no forma parte de él. Todas las respuestas correctas son pasos
// verificados; las incorrectas son pasos o recorridos verificados de OTRO trayecto.
import datos from "../data/recorridos.json";

export const RECORRIDOS = datos.recorridos; // [{ id, desde, hasta, pasos[], estado, alcance, maps, original }]
export const FUENTE_RECORRIDOS = datos.fuente;
export const TIPOS_RECORRIDO = ["rec_completo", "rec_siguiente", "rec_ultimo", "rec_intruso"];

const ETIQUETA = {
  rec_completo: "Recorridos · Recorrido más adecuado",
  rec_siguiente: "Recorridos · Siguiente paso",
  rec_ultimo: "Recorridos · Llegada",
  rec_intruso: "Recorridos · El paso que sobra",
};

const k = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9ñ]+/g, " ").trim();
const barajar = (a, rnd) => { const x = [...a]; for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; } return x; };
const flecha = (pasos) => pasos.join(" → ");
// Pasos de llegada genéricos («hospital a la derecha»): no sirven como respuesta ni como distractor
const LLEGADA = /^(hospital|destino|estaci[oó]n) a la (derecha|izquierda)$/i;
const util = (p) => !LLEGADA.test(p);
const ARTICULO = [[/^(Estadio|Hospital|Pabellón|Aeropuerto)\b/, "al "], [/^(Estación|Casa)\b/, "a la "]];
const de = (r) => `del ${r.desde} ${(ARTICULO.find(([re]) => re.test(r.hasta)) || [, "a "])[1]}${r.hasta}`;

function nota(r) {
  const partes = [`Recorrido comprobado en Google Maps (coche): ${flecha(r.pasos)}.`];
  if (r.original) partes.push(`Se usa esta alternativa por un corte de tráfico; la propuesta original era ${flecha(r.original)}. En el examen no suelen contar los cortes puntuales.`);
  if (/aparcamiento/i.test(r.estado || "")) partes.push("El trayecto en vehículo llega hasta el aparcamiento; el último tramo es a pie.");
  return partes.join(" ");
}

// Nombres propios de un paso («Ramón», «Pignatelli», «Europa»…): dos pasos que comparten calle
// pero cambian la maniobra («derecha a Ramón Pignatelli» / «recto por Ramón Pignatelli») harían dudar
// sin ser claramente incorrectos, así que nunca se ponen juntos.
const NO_NOMBRES = new Set(["salida", "ramal", "rotonda", "glorieta", "plaza", "calle", "avenida", "paseo", "camino", "carretera", "derecha", "izquierda", "recto", "hospital", "destino", "estacion", "dirección", "direccion"]);
const nombres = (p) => new Set(String(p).split(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9-]+/).filter((w) => /^[A-ZÁÉÍÓÚÑ0-9]/.test(w) && w.length >= 4 && !NO_NOMBRES.has(k(w))).map(k));
const comparten = (a, b) => { const nb = nombres(b); for (const x of nombres(a)) if (nb.has(x)) return true; return false; };

// Dos opciones incorrectas: textos distintos de cualquier respuesta válida y sin calles en común con ellas
function malas(validas, candidatas, rnd, n = 2, evitar = validas) {
  const prohibidas = new Set(validas.map(k));
  const out = [], vistas = new Set();
  for (const c of barajar(candidatas, rnd)) {
    const kc = k(c);
    if (!kc || prohibidas.has(kc) || vistas.has(kc)) continue;
    if (evitar.some((v) => comparten(v, c)) || out.some((o) => comparten(o, c))) continue;
    vistas.add(kc); out.push(c);
    if (out.length === n) break;
  }
  return out;
}

function montar({ id, item, tipo, pregunta, correcta, incorrectas, explicacion, rnd, recorrido }) {
  if (incorrectas.length < 2) return null;
  const opciones = barajar([correcta, ...incorrectas], rnd);
  return { id, item, tipo, pregunta, opciones, correcta: opciones.indexOf(correcta), explicacion, tema: "Callejero", etiqueta: ETIQUETA[tipo], recorrido: recorrido.id };
}

const todosLosPasos = RECORRIDOS.flatMap((r) => r.pasos.filter(util));

const GEN = {
  // Recorrido completo: las incorrectas son recorridos verificados con el mismo origen u otro destino
  rec_completo(r, rnd) {
    const mismoOrigen = RECORRIDOS.filter((x) => x.desde === r.desde && x.hasta !== r.hasta).map((x) => flecha(x.pasos));
    const mismoDestino = RECORRIDOS.filter((x) => x.hasta === r.hasta && x.desde !== r.desde).map((x) => flecha(x.pasos));
    const inc = [...malas([flecha(r.pasos)], mismoOrigen, rnd, 1, []), ...malas([flecha(r.pasos)], mismoDestino, rnd, 1, [])];
    return [montar({
      id: `rec_completo:${r.id}`, item: `rec-${r.id}`, tipo: "rec_completo", rnd, recorrido: r,
      pregunta: `Señale el recorrido más adecuado ${de(r)}.`,
      correcta: flecha(r.pasos), incorrectas: inc, explicacion: nota(r),
    })].filter(Boolean);
  },
  // Siguiente paso: una pregunta por cada paso del recorrido
  rec_siguiente(r, rnd) {
    const out = [];
    for (let i = 0; i < r.pasos.length - 1; i++) {
      const sig = r.pasos[i + 1];
      if (!util(sig)) continue;
      // incorrectas: pasos de otros recorridos, mejor del mismo parque (hacen dudar), nunca uno de este recorrido
      const otrosMismoParque = RECORRIDOS.filter((x) => x.id !== r.id && x.desde === r.desde).flatMap((x) => x.pasos.filter(util));
      const prohibidos = r.pasos.slice(i + 1);
      let inc = malas(prohibidos, otrosMismoParque, rnd, 2, [sig]);
      if (inc.length < 2) inc = [...inc, ...malas([...prohibidos, ...inc], todosLosPasos, rnd, 2 - inc.length, [sig, ...inc])];
      const q = montar({
        id: `rec_siguiente:${r.id}:${i}`, item: `rec-${r.id}-${i}`, tipo: "rec_siguiente", rnd, recorrido: r,
        pregunta: `En el recorrido ${de(r)}, después de «${r.pasos[i]}», ¿cuál es el siguiente paso?`,
        correcta: sig, incorrectas: inc, explicacion: nota(r),
      });
      if (q) out.push(q);
    }
    return out;
  },
  // Llegada: el último tramo útil del recorrido
  rec_ultimo(r, rnd) {
    const utiles = r.pasos.filter(util);
    const ultimo = utiles[utiles.length - 1];
    const otrosFinales = RECORRIDOS.filter((x) => x.hasta !== r.hasta).map((x) => x.pasos.filter(util).slice(-1)[0]);
    const iguales = RECORRIDOS.filter((x) => x.hasta === r.hasta).map((x) => x.pasos.filter(util).slice(-1)[0]);
    return [montar({
      id: `rec_ultimo:${r.id}`, item: `rec-${r.id}-fin`, tipo: "rec_ultimo", rnd, recorrido: r,
      pregunta: `En el recorrido ${de(r)}, ¿cuál es el último tramo antes de llegar?`,
      correcta: ultimo, incorrectas: malas([...iguales, ...r.pasos], otrosFinales, rnd, 2, [ultimo]), explicacion: nota(r),
    })].filter(Boolean);
  },
  // El paso que sobra: dos pasos del recorrido y uno de otro trayecto que no está en este
  rec_intruso(r, rnd) {
    const propios = barajar([...new Map(r.pasos.slice(1).filter(util).map((p) => [k(p), p])).values()], rnd).slice(0, 2);
    if (propios.length < 2) return [];
    const [intruso] = malas(r.pasos, RECORRIDOS.filter((x) => x.id !== r.id).flatMap((x) => x.pasos.filter(util)), rnd, 1, r.pasos);
    if (!intruso) return [];
    const q = montar({
      id: `rec_intruso:${r.id}`, item: `rec-${r.id}-intruso`, tipo: "rec_intruso", rnd, recorrido: r,
      pregunta: `¿Cuál de estos pasos NO forma parte del recorrido ${de(r)}?`,
      correcta: intruso, incorrectas: propios, explicacion: nota(r),
    });
    return q ? [q] : [];
  },
};

export function preguntasRecorridos(rnd = Math.random, tipos = TIPOS_RECORRIDO) {
  const out = [];
  for (const r of RECORRIDOS) for (const t of tipos) if (GEN[t]) out.push(...GEN[t](r, rnd));
  return out;
}

/* ============================================================
   Motor de entrenamiento de las pruebas físicas (cuerda, natación 100 m y 1.500 m).
   Diseño: claude/fisicas-entrenos-diseno.md (proyecto). Todo son funciones puras,
   sin red ni fechas implícitas: quien llama pasa «hoy» y el perfil.

   Estado por prueba (lo que se guarda en fis_estado.datos):
   {
     prueba, marca, fechaTest,            // último test real (segundos, AAAA-MM-DD)
     ref: { A, B }, ajuste: { A, B },     // referencia de ritmos y cuánto se ha movido desde el test
     nivel: { A, B }, racha: { A: [], B: [] }, sinDatos: { A, B },
     ultimaSubida: { A, B }, ultimaActividad, aplazadoHasta,
     base, mantenimiento, estancado,
     dominadas: { max, en10, fecha }      // solo cuerda
   }
   ============================================================ */
import { baremoDe, puntosBaremo } from "./baremo.js";

/* ---------- constantes con nombre (punto 9 del diseño) ---------- */
export const CONFIG = {
  MEJORA_OBJETIVO: 0.97,      // se entrena a un ritmo un 3 % mejor que la referencia
  TOLERANCIA_SERIE: 0.02,     // una serie vale si va como mucho un 2 % más lenta
  UMBRAL_CUMPLIDO: 0.8,       // 80 % de las series dentro → cumplido
  MEDIA_SOBRADA: 0.97,        // media un 3 % mejor que el objetivo → «sobrada»
  APRIETE_TIEMPOS: 0.985,     // dos superados con tiempos y sobrados → referencia −1,5 %
  APRIETE_SENSACION: 0.99,    // dos «sobrado» seguidos → referencia −1 %
  RELAJE: 1.015,              // dos fallos seguidos → referencia +1,5 %
  TOPE_APRIETE: 0.94,         // como mucho un 6 % entre dos tests
  TOPE_SIN_DATOS: 2,          // niveles que se pueden subir solo con «Hecho»
  SEMANAS_TEST: 8,
  SEMANAS_TEST_FIJO: 12,
  SEMANAS_INACTIVIDAD: 4,
  DIAS_DOMINADAS: 28,
  DIAS_SUBIDA_IMPACTO: 14,    // con molestias, carrera A sube como mucho cada dos semanas
  NIVEL_MAX: 7,
  NIVEL_MAX_FUERZA: 30,
  NIVEL_MANTENIMIENTO: 4,
  CARRERA_B_MAX_IMPACTO: 3,
  TEST_MEJORA_GRANDE: 0.05,
  TEST_MEJORA: 0.02,
  TEST_MARGEN_REF: 0.01,
  NAT_BASE_LIMITE: 120,       // por encima de 2:00 en el 100 → nivel 0
};

export const PRUEBAS_FIS = ["cuerda", "nat", "r1500"];
export const NOMBRE = { cuerda: "Cuerda", nat: "Natación", r1500: "Carrera" };
export const NOMBRE_LARGO = { cuerda: "Cuerda lisa 6 m", nat: "Natación 100 m", r1500: "Carrera 1.500 m" };
export const DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
export const RESULTADO = { SUPERADO: "SUPERADO", CUMPLIDO: "CUMPLIDO", FALLADO: "FALLADO", NO_HECHO: "NO_HECHO" };

/* ---------- fechas (cadenas AAAA-MM-DD, sin husos) ---------- */
const aFecha = (s) => { const [y, m, d] = String(s).split("-").map(Number); return new Date(Date.UTC(y, m - 1, d)); };
const aTexto = (dt) => dt.toISOString().slice(0, 10);
export const sumarDias = (s, n) => { const dt = aFecha(s); dt.setUTCDate(dt.getUTCDate() + n); return aTexto(dt); };
export const diasEntre = (a, b) => Math.round((aFecha(b) - aFecha(a)) / 86400000);
export const lunesDe = (s) => { const dt = aFecha(s); const dow = (dt.getUTCDay() + 6) % 7; return sumarDias(s, -dow); };
export const diaSemana = (s) => (aFecha(s).getUTCDay() + 6) % 7; // 0 = lunes

/* ---------- formato ---------- */
export function fmtSeg(s) {
  if (s == null || !Number.isFinite(s)) return "—";
  if (s < 60) return `${(Math.round(s * 10) / 10).toFixed(1).replace(".", ",")} s`;
  const r = Math.round(s);
  return `${Math.floor(r / 60)}:${String(r % 60).padStart(2, "0")}`;
}
const pct = (x) => `${(Math.round(x * 1000) / 10).toFixed(1).replace(".", ",")} %`;

/* ---------- baremo ---------- */
export function marcasBaremo(prueba, sexo) {
  const b = baremoDe(sexo)[prueba];
  return b ? { diez: b.tabla[0][0], maximo: b.maxApto, inclusive: b.inclusive } : null;
}
// Situación respecto al baremo: puntos, si está en el 10 y la barra de avance (0-1).
export function situacionBaremo(prueba, marca, sexo) {
  const m = marcasBaremo(prueba, sexo);
  if (!m || marca == null) return null;
  const puntos = puntosBaremo(prueba, marca, sexo);
  const enDiez = puntos === 10;
  const avance = Math.max(0, Math.min(1, (m.maximo - marca) / (m.maximo - m.diez)));
  return { puntos, apto: puntos > 0, enDiez, falta: enDiez ? 0 : Math.max(0, marca - m.diez), avance, ...m };
}

/* ---------- tablas de sesiones (puntos 3, 4 y 5 del diseño) ---------- */
const CARRERA_A = [null,
  { bloques: [[6, 300]], rec: "1:30 andando o trote" },
  { bloques: [[5, 400]], rec: "1:30" },
  { bloques: [[6, 400]], rec: "1:15" },
  { bloques: [[4, 500], [1, 300]], rec: "1:30" },
  { bloques: [[3, 600], [2, 300]], rec: "1:45" },
  { bloques: [[2, 800], [2, 400]], rec: "2:00" },
  { bloques: [[1, 1000], [1, 500], [2, 300]], rec: "2:00", nota: "El 1.000 + 500 es un simulacro partido de la prueba." },
];
const CARRERA_B = [null,
  "20 min suave",
  "25 min suave",
  "30 min suave",
  "30 min: 10 suave + 2 × 6 min tempo (2 min trote entre medias) + el resto suave",
  "35 min: 10 suave + 3 × 6 min tempo (2 min trote) + el resto suave",
  "35 min: 10 suave + 2 × 10 min tempo (3 min trote) + el resto suave",
  "40 min: 10 suave + 20 min tempo seguidos + 10 suave",
];
const NAT_A = [null, 8, 10, 12, 14, 16, 20, 24]; // series de 25, descanso 20 s
const NAT_B = [null,
  { bloques: [[6, 100]], rec: "20 s" },
  { bloques: [[8, 100]], rec: "20 s" },
  { bloques: [[10, 100]], rec: "15 s" },
  { bloques: [[5, 200]], rec: "30 s" },
  { bloques: [[12, 100]], rec: "15 s" },
  { bloques: [[6, 200]], rec: "30 s" },
  { bloques: [[3, 400]], rec: "45 s" },
];
const CUERDA_B_SOGA = [null,
  { t: "5 × media cuerda (3 m): salida sentado y brazada larga", rec: "2:00" },
  { t: "6 × 3 m + 1 × 6 m", rec: "2:00 / 3:00" },
  { t: "3 × 6 m + 3 × 3 m", rec: "3:00 / 2:00" },
  { t: "4 × 6 m", rec: "3:00" },
  { t: "5 × 6 m", rec: "3:00" },
  { t: "3 × 6 m a tope + 2 × (6 m, bajar controlado, 3 m)", rec: "4:00" },
  { t: "Simulacro: 2 intentos a tope como en el examen + 3 × 6 m", rec: "5:00 / 3:00" },
];
const CUERDA_B_BARRA = [null,
  { t: "5 × 3 dominadas explosivas (pecho a la barra) + 3 × 20 s colgado de toalla", rec: "2:00" },
  { t: "6 × 3 explosivas + 3 series de dominadas con toalla (tu máximo menos 2)", rec: "2:00" },
  { t: "5 × 4 explosivas + 4 series con toalla", rec: "2:00" },
  { t: "6 × 4 explosivas + 4 series con toalla, una mano más alta que la otra, alternando", rec: "2:00" },
  { t: "4 × (dominadas máximas en 10 s) + 4 series con toalla asimétrica", rec: "2:30" },
  { t: "5 × (máximas en 10 s) + 3 × 5 explosivas con un 5 % de tu peso de lastre", rec: "2:30" },
  { t: "3 × (máximas en 15 s) + 3 × (máximas en 10 s) + 3 series con toalla", rec: "3:00" },
];

const CALENTAMIENTO = {
  r1500: "10-15 min de trote suave, movilidad y 4 progresivos de 80 m.",
  nat: "200-300 m suaves + 4 × 25 de técnica.",
  cuerda: "Movilidad de hombros y muñecas, 2 × 5 dominadas fáciles y 2 × 15 s colgado.",
};
const VUELTA = {
  r1500: "5-10 min de trote.",
  nat: "100-200 m suaves.",
  cuerda: "Estiramientos de dorsal, antebrazo y hombro.",
};
const ESFUERZO_SUAVE = "Suave: puedes hablar con frases completas todo el rato.";
const ESFUERZO_TEMPO = "Tempo: «cómodamente duro»; puedes decir frases cortas, no mantener una conversación.";

const BOTONES = {
  ritmo: { sobrado: "Llegué sobrado", justo: "Llegué justo", no: "No llegué" },
  completar: { sobrado: "Todas completas y sobrado", justo: "Todas completas", no: "Alguna sin completar" },
};

/* ---------- ritmos (punto 3 y 4) ---------- */
export function ritmos(prueba, ref, refB = null) {
  const k = CONFIG.MEJORA_OBJETIVO;
  if (prueba === "r1500" && ref) return { por100: (ref * k) / 15, serie: (d) => ((ref * k) / 15) * (d / 100) };
  if (prueba === "nat" && ref) {
    const r = { por25: (ref * k) / 4 };
    if (refB) r.critico = { por100: refB, rapido: refB / 1.02, lento: refB / 0.98 };
    return r;
  }
  return {};
}
export const ritmoCritico = (t400, t200) => (t400 && t200 && t400 > t200 ? (t400 - t200) / 2 : null);

/* ---------- estado inicial ---------- */
export function estadoInicial(prueba, { marca = null, fecha = null, t400 = null, t200 = null, dominadas = null, sexo = "H" } = {}) {
  const e = {
    prueba, marca: null, fechaTest: null,
    ref: { A: null, B: null }, ajuste: { A: 1, B: 1 },
    nivel: { A: 1, B: 1 }, racha: { A: [], B: [] }, sinDatos: { A: 0, B: 0 },
    ultimaSubida: { A: null, B: null }, ultimaActividad: null, aplazadoHasta: null,
    base: false, mantenimiento: false, estancado: false,
    dominadas: { max: null, en10: null, fecha: null },
  };
  if (prueba === "cuerda" && dominadas != null) e.dominadas = { max: dominadas, en10: null, fecha };
  if (marca == null) return e;
  return aplicarTest(e, { marca, fecha, t400, t200, sexo }).estado;
}

/* ---------- cuerda A: ramas por dominadas estrictas (punto 5) ---------- */
export function ramaCuerda(d) {
  if (d == null || d < 5) return 1;
  if (d < 10) return 2;
  if (d < 15) return 3;
  return 4;
}
function sesionCuerdaA(paso, d) {
  const rama = ramaCuerda(d);
  const p = Math.max(0, paso - 1);
  if (rama === 1) return { principal: [`5 × ${Math.min(5, 3 + p)} negativas de 5 s`, "4 × 8 remo invertido", "3 × 20 s colgado"], rec: "2:00", nota: "Cuando llegues a 5 dominadas estrictas, actualízalas y pasarás a la siguiente rama." };
  if (rama === 2) return { principal: [`5 × ${Math.ceil(0.6 * d) + p} dominadas estrictas`, "3 × 8 remo", "3 × 30 s colgado"], rec: "2:00" };
  if (rama === 3) return { principal: [`5 × 5 dominadas con ${String(5 + 2.5 * p).replace(".", ",")} kg de lastre`, "3 bloqueos de 10 s a 90°"], rec: "2:30" };
  return { principal: [`5 × 3 dominadas con ${String(10 + 2.5 * p).replace(".", ",")} kg de lastre (si no te deja hacer 4, baja la carga)`, "3 × 5 explosivas sin lastre"], rec: "3:00" };
}

/* ---------- sesión concreta (punto 3, 4 y 5) ---------- */
export function sesion(prueba, tipo, estado, perfil = {}) {
  const n = tipo === "A" || tipo === "B" ? estado.nivel[tipo] : null;
  const s = {
    prueba, tipo, nivel: n, titulo: "", calentamiento: CALENTAMIENTO[prueba], principal: [], recuperacion: null,
    vuelta: VUELTA[prueba], series: [], registro: "sensacion", botones: BOTONES.ritmo, notas: [],
  };

  if (tipo === "T") return sesionTest(prueba, estado, perfil);

  if (prueba === "r1500") {
    if (tipo === "A") {
      const t = CARRERA_A[n]; const rt = ritmos("r1500", estado.ref.A);
      s.titulo = `Carrera A · series · nivel ${n}`;
      s.recuperacion = t.rec;
      for (const [reps, d] of t.bloques) {
        s.principal.push(`${reps} × ${d.toLocaleString("es-ES")} m${rt.serie ? ` en ${fmtSeg(rt.serie(d))}` : ""}`);
        for (let i = 0; i < reps; i++) s.series.push({ etiqueta: `${d.toLocaleString("es-ES")} m`, objetivo: rt.serie ? rt.serie(d) : null });
      }
      s.registro = rt.serie ? "tiempos" : "sensacion";
      if (t.nota) s.notas.push(t.nota);
    } else {
      const nB = perfil.impacto ? Math.min(n, CONFIG.CARRERA_B_MAX_IMPACTO) : n;
      s.titulo = `Carrera B · resistencia · nivel ${nB}`;
      s.principal.push(CARRERA_B[nB]);
      s.notas.push(ESFUERZO_SUAVE);
      if (nB >= 4) s.notas.push(ESFUERZO_TEMPO);
      if (perfil.impacto && n > CONFIG.CARRERA_B_MAX_IMPACTO) s.notas.push("Con molestias de impacto, el tiempo que falta hasta tu nivel lo haces en bici o elíptica a la misma sensación.");
    }
    return s;
  }

  if (prueba === "nat") {
    if (estado.base) {
      s.titulo = tipo === "A" ? "Natación A · base" : "Natación B · base";
      s.principal.push(tipo === "A" ? "8 × 25 suaves cuidando la técnica" : "6 × 50 cómodos");
      s.recuperacion = "30 s";
      s.notas.push("Pasas al nivel 1 cuando hagas el 100 seguido por debajo de 2:00.");
      return s;
    }
    if (tipo === "A") {
      const reps = NAT_A[n]; const rt = ritmos("nat", estado.ref.A);
      s.titulo = `Natación A · ritmo de prueba · nivel ${n}`;
      s.principal.push(`${reps} × 25${rt.por25 ? ` en ${fmtSeg(rt.por25)}` : ""}`);
      s.recuperacion = "20 s";
      for (let i = 0; i < reps; i++) s.series.push({ etiqueta: "25 m", objetivo: rt.por25 ?? null });
      s.registro = rt.por25 ? "tiempos" : "sensacion";
      s.notas.push("Si te pasas del tiempo en una serie, descansa una serie entera y sigue. Al segundo fallo, la sesión se acaba ahí.");
    } else {
      const t = NAT_B[n]; const rt = ritmos("nat", estado.ref.A, estado.ref.B);
      s.titulo = `Natación B · resistencia · nivel ${n}`;
      s.recuperacion = t.rec;
      for (const [reps, d] of t.bloques) {
        const obj = rt.critico ? rt.critico.por100 * (d / 100) : null;
        s.principal.push(`${reps} × ${d}${obj ? ` en ${fmtSeg(obj)}` : ""}`);
        for (let i = 0; i < reps; i++) s.series.push({ etiqueta: `${d} m`, objetivo: obj });
      }
      if (rt.critico) {
        s.registro = "tiempos";
        s.notas.push(`Tu ritmo crítico: ${fmtSeg(rt.critico.rapido)}-${fmtSeg(rt.critico.lento)} cada 100.`);
      } else {
        s.notas.push("Sin los tests de 400 y 200 no hay ritmo exacto: nada «cómodamente duro», pudiendo decir frases cortas entre series.");
        s.notas.push("Con los dos tests tendrías tu ritmo exacto cada 100.");
      }
    }
    return s;
  }

  // cuerda
  s.botones = BOTONES.completar;
  if (tipo === "A") {
    const c = sesionCuerdaA(n, estado.dominadas?.max);
    s.titulo = `Cuerda A · fuerza · paso ${n}`;
    s.principal = c.principal; s.recuperacion = c.rec;
    if (c.nota) s.notas.push(c.nota);
  } else if (perfil.soga) {
    const t = CUERDA_B_SOGA[n];
    s.titulo = `Cuerda B · soga · nivel ${n}`;
    s.principal.push(t.t); s.recuperacion = t.rec;
    s.notas.push("Todas las subidas como en el examen: salida sentado, una mano en la cuerda y sin pies hasta que las dos manos pasen de 1,8 m.");
    if (estado.marca != null && estado.marca < 8) s.notas.push("Para acercarte al 10, sube solo a brazo: los pies frenan.");
  } else {
    const t = CUERDA_B_BARRA[n];
    s.titulo = `Cuerda B · potencia en barra · nivel ${n}`;
    s.principal.push(t.t); s.recuperacion = t.rec;
  }
  s.notas.push("En cuerda no hay tiempo objetivo por subida: cuenta completar las series. El tiempo se mide en el test.");
  return s;
}

function sesionTest(prueba, estado, perfil) {
  const s = { prueba, tipo: "T", nivel: null, calentamiento: CALENTAMIENTO[prueba], vuelta: VUELTA[prueba], principal: [], series: [], registro: "test", notas: [], recuperacion: null };
  if (prueba === "r1500") { s.titulo = "Test · 1.500 m"; s.principal.push("1.500 m a tope, en pista y con salida de pie."); }
  if (prueba === "nat") {
    s.titulo = "Test · 100 m libre";
    s.principal.push("100 m libre a tope.");
    s.notas.push("Opcional: el mismo día, 400 m y 200 m a tope con 10 min suaves entre medias. Con ellos tendrás tu ritmo crítico.");
  }
  if (prueba === "cuerda") {
    s.titulo = perfil.soga ? "Test · cuerda 6 m" : "Medición de soga";
    s.principal.push(perfil.soga ? "2 intentos como en el examen; apunta el mejor." : "Ve a un sitio con soga: 2 intentos como en el examen y apunta el mejor.");
  }
  return s;
}

// Resumen de una línea del bloque principal (para «La semana que viene: …»)
export const resumenSesion = (s) => s.principal.join(" + ");

/* ---------- calificar una sesión (punto 6.1) ---------- */
export function calificar(ses, registro) {
  const modo = registro?.modo;
  if (modo === "sensacion") {
    const r = { sobrado: RESULTADO.SUPERADO, justo: RESULTADO.CUMPLIDO, no: RESULTADO.FALLADO }[registro.valor];
    if (!r) throw new Error("Sensación no válida");
    return { resultado: r, modo };
  }
  if (modo === "hecho") return { resultado: RESULTADO.CUMPLIDO, modo };
  if (modo === "tiempos") {
    const objs = ses.series.map((x) => x.objetivo);
    if (!objs.length || objs.some((o) => o == null)) throw new Error("Esta sesión no tiene tiempos objetivo");
    const ts = objs.map((_, i) => { const v = Number(registro.tiempos?.[i]); return Number.isFinite(v) && v > 0 ? v : null; });
    const dentro = ts.filter((t, i) => t != null && t <= objs[i] * (1 + CONFIG.TOLERANCIA_SERIE)).length;
    const hechas = ts.filter((t) => t != null);
    const media = hechas.length ? hechas.reduce((a, b) => a + b, 0) / hechas.length : null;
    const mediaObj = objs.reduce((a, b) => a + b, 0) / objs.length;
    // Comparación en proporción para mezclar series de distinta distancia
    const ratio = hechas.length ? ts.reduce((a, t, i) => (t != null ? a + t / objs[i] : a), 0) / hechas.length : null;
    const total = objs.length;
    let resultado;
    if (dentro === total && ratio <= 1) resultado = RESULTADO.SUPERADO;
    else if (dentro / total >= CONFIG.UMBRAL_CUMPLIDO) resultado = RESULTADO.CUMPLIDO;
    else resultado = RESULTADO.FALLADO;
    const sobrada = resultado === RESULTADO.SUPERADO && ratio <= CONFIG.MEDIA_SOBRADA;
    return { resultado, modo, dentro, total, media, mediaObj, ratio, sobrada };
  }
  throw new Error("Modo de registro no válido");
}

/* ---------- qué tipos mueven la referencia ---------- */
const mueveRef = (estado, tipo) =>
  (estado.prueba === "r1500" && tipo === "A") ||
  (estado.prueba === "nat" && tipo === "A") ||
  (estado.prueba === "nat" && tipo === "B" && estado.ref.B != null);

const clonar = (e) => JSON.parse(JSON.stringify(e));

/* ---------- siguiente semana (punto 6.2) ---------- */
export function siguienteEstado(estado, tipo, cal, { perfil = {}, fecha } = {}) {
  const e = clonar(estado);
  const n = e.nivel[tipo];
  const racha = e.racha[tipo];
  const prev = racha.length ? racha[racha.length - 1] : null;
  const prevLibre = prev && !prev.consumido ? prev : null;
  const res = cal.resultado;
  const max = e.prueba === "cuerda" && tipo === "A" ? CONFIG.NIVEL_MAX_FUERZA : CONFIG.NIVEL_MAX;
  const eventos = [];
  let nuevo = n;
  let factor = 1;

  if (res === RESULTADO.SUPERADO) nuevo = n + 1;
  if (res === RESULTADO.CUMPLIDO && prev && prev.r === RESULTADO.CUMPLIDO && prev.n === n) nuevo = n + 1;
  if (res === RESULTADO.FALLADO && prev && prev.r === RESULTADO.FALLADO) { nuevo = n - 1; factor = CONFIG.RELAJE; }
  if (res === RESULTADO.NO_HECHO && prev && prev.r === RESULTADO.NO_HECHO) nuevo = n - 1;

  let consumido = false;
  if (res === RESULTADO.SUPERADO && prevLibre && prevLibre.r === RESULTADO.SUPERADO) {
    if (cal.modo === "tiempos" && cal.sobrada && prevLibre.sobrada) { factor = CONFIG.APRIETE_TIEMPOS; consumido = true; }
    else if (cal.modo === "sensacion" && prevLibre.modo === "sensacion") { factor = CONFIG.APRIETE_SENSACION; consumido = true; }
  }
  if (nuevo > max) {
    nuevo = max;
    if (res === RESULTADO.SUPERADO) factor = Math.min(factor, CONFIG.APRIETE_TIEMPOS);
  }

  // Solo «Hecho»: como mucho TOPE_SIN_DATOS niveles sin dar un dato
  if (cal.modo === "hecho") {
    if (nuevo > n) {
      if (e.sinDatos[tipo] >= CONFIG.TOPE_SIN_DATOS) { nuevo = n; eventos.push("pideDato"); }
      else e.sinDatos[tipo] += 1;
    }
  } else if (cal.modo === "sensacion" || cal.modo === "tiempos") e.sinDatos[tipo] = 0;

  // Molestias de impacto
  if (perfil.impacto && e.prueba === "r1500") {
    if (tipo === "B") nuevo = Math.min(nuevo, CONFIG.CARRERA_B_MAX_IMPACTO);
    if (tipo === "A" && nuevo > n && e.ultimaSubida.A && fecha && diasEntre(e.ultimaSubida.A, fecha) < CONFIG.DIAS_SUBIDA_IMPACTO) nuevo = n;
  }

  // Mantenimiento (ya en el 10)
  if (e.mantenimiento) { nuevo = CONFIG.NIVEL_MANTENIMIENTO; if (factor < 1) factor = 1; }

  nuevo = Math.max(1, nuevo);
  if (nuevo > n && fecha) e.ultimaSubida[tipo] = fecha;
  e.nivel[tipo] = nuevo;

  // Referencia
  if (factor !== 1 && mueveRef(e, tipo) && e.ref[tipo] != null) {
    const base = e.ref[tipo] / e.ajuste[tipo];
    let aj = e.ajuste[tipo] * factor;
    if (aj <= CONFIG.TOPE_APRIETE + 1e-9) { aj = CONFIG.TOPE_APRIETE; eventos.push("adelantarTest"); }
    e.ajuste[tipo] = aj;
    e.ref[tipo] = base * aj;
    eventos.push(factor < 1 ? "aprieta" : "relaja");
  }

  racha.push({ r: res, n, modo: cal.modo, sobrada: !!cal.sobrada, consumido });
  if (racha.length > 6) racha.splice(0, racha.length - 6);
  if (res !== RESULTADO.NO_HECHO && fecha) e.ultimaActividad = fecha;
  e.estancado = e.estancado && res !== RESULTADO.SUPERADO;

  const etiqueta = { SUPERADO: "Superado", CUMPLIDO: "Cumplido", FALLADO: "No llegaste", NO_HECHO: "Sin hacer" }[res];
  const proxima = sesion(e.prueba, tipo, e, perfil);
  let mensaje = `${etiqueta}. La semana que viene: ${resumenSesion(proxima)}.`;
  if (eventos.includes("pideDato")) mensaje += " Para seguir subiendo, dinos cómo te fue o haz un test.";
  if (eventos.includes("adelantarTest")) mensaje += " Vas muy por delante de tu marca: mídete.";
  return { estado: e, mensaje, eventos };
}

/* ---------- aplicar un test (punto 6.3) ---------- */
export function aplicarTest(estado, { marca, fecha, t400 = null, t200 = null, sexo = "H" }) {
  const e = clonar(estado);
  const anterior = e.marca;
  const refAntes = { A: e.ref.A, B: e.ref.B };
  const cssNuevo = e.prueba === "nat" ? ritmoCritico(t400, t200) : null;
  const eventos = [];

  e.marca = marca; e.fechaTest = fecha; e.aplazadoHasta = null;
  if (fecha) e.ultimaActividad = fecha;
  if (e.prueba !== "cuerda") { e.ref.A = marca; e.ajuste.A = 1; }
  if (cssNuevo) { e.ref.B = cssNuevo; e.ajuste.B = 1; }

  const delta = (antes, ahora, refPrevia) => {
    const mejora = (antes - ahora) / antes;
    let d = mejora >= CONFIG.TEST_MEJORA_GRANDE ? -2 : mejora >= CONFIG.TEST_MEJORA ? -1 : mejora > -CONFIG.TEST_MEJORA ? 0 : -1;
    if (d < 0 && mejora > 0 && refPrevia != null && refPrevia <= ahora * (1 + CONFIG.TEST_MARGEN_REF)) d = 0;
    return { mejora, d };
  };

  let mejora = null;
  if (anterior != null) {
    const a = delta(anterior, marca, refAntes.A);
    mejora = a.mejora;
    if (e.prueba !== "cuerda") e.nivel.A = Math.max(1, e.nivel.A + a.d);
    e.estancado = Math.abs(a.mejora) < CONFIG.TEST_MEJORA;
    if (e.estancado) eventos.push("estancado");
  }
  if (cssNuevo && refAntes.B != null) {
    const b = delta(refAntes.B, cssNuevo, null);
    e.nivel.B = Math.max(1, e.nivel.B + b.d);
  }

  if (e.prueba === "nat") {
    const eraBase = e.base;
    e.base = marca > CONFIG.NAT_BASE_LIMITE;
    if (eraBase && !e.base) { e.nivel.A = 1; e.nivel.B = 1; eventos.push("saleDeBase"); }
  }
  e.mantenimiento = puntosBaremo(e.prueba, marca, sexo) === 10;
  if (e.mantenimiento) { e.nivel.A = CONFIG.NIVEL_MANTENIMIENTO; e.nivel.B = CONFIG.NIVEL_MANTENIMIENTO; eventos.push("mantenimiento"); }

  e.racha = { A: [], B: [] };
  e.sinDatos = { A: 0, B: 0 };

  let mensaje = anterior == null ? `Marca de salida: ${fmtSeg(marca)}.` : mejora > 0 ? `Mejoras un ${pct(mejora)}.` : mejora < 0 ? `Empeoras un ${pct(-mejora)}.` : "Igual que la última vez.";
  if (e.estancado) mensaje += " Dos tests casi iguales: esta prueba se ha estancado.";
  if (e.mantenimiento) mensaje += " Estás en el 10: pasas a mantenimiento.";
  return { estado: e, mensaje, eventos, mejora };
}

/* ---------- ¿toca test? (punto 6.3) ---------- */
export function tocaTest(estado, hoy) {
  if (estado.marca == null) return { toca: true, tipo: "inicial", motivo: "Aún no tenemos tu marca." };
  const adel =
    estado.ajuste.A <= CONFIG.TOPE_APRIETE + 1e-9 || estado.ajuste.B <= CONFIG.TOPE_APRIETE + 1e-9
      ? "Vas muy por delante de tu marca: mídete."
      : estado.ultimaActividad && diasEntre(estado.ultimaActividad, hoy) >= CONFIG.SEMANAS_INACTIVIDAD * 7
        ? "Llevas cuatro semanas sin entrenar esta prueba: mídete antes de seguir."
        : ["A", "B"].some((t) => estado.sinDatos[t] >= CONFIG.TOPE_SIN_DATOS && estado.racha[t].slice(-1)[0]?.modo === "hecho")
          ? "Dinos cómo te fue o haz un test para seguir subiendo."
          : null;
  if (adel) return { toca: true, tipo: "adelantado", motivo: adel };
  const semanas = estado.fechaTest ? diasEntre(estado.fechaTest, hoy) / 7 : Infinity;
  if (semanas >= CONFIG.SEMANAS_TEST_FIJO) return { toca: true, tipo: "fijo", motivo: "Llevas 3 meses sin medirte: no sabemos si estás mejorando." };
  if (semanas >= CONFIG.SEMANAS_TEST && !(estado.aplazadoHasta && hoy < estado.aplazadoHasta)) return { toca: true, tipo: "propuesto", motivo: "Te toca test." };
  return { toca: false, tipo: null, motivo: null, semanas };
}
export const aplazarTest = (estado, hoy) => ({ ...clonar(estado), aplazadoHasta: sumarDias(lunesDe(hoy), 7) });

export const tocaDominadas = (estadoCuerda, hoy) =>
  !estadoCuerda.dominadas?.fecha || diasEntre(estadoCuerda.dominadas.fecha, hoy) >= CONFIG.DIAS_DOMINADAS;

/* ---------- diagnóstico velocidad / resistencia (punto 6.4) ---------- */
export function diagnostico(estado) {
  if (estado.prueba === "cuerda" || estado.base) return null;
  const d = estado.nivel.A - estado.nivel.B;
  if (d >= 2) return { rezagado: "B", texto: "Vas bien de velocidad, te falta resistencia." };
  if (d <= -2) return { rezagado: "A", texto: "Tienes fondo, te falta velocidad." };
  return null;
}

/* ---------- semana tipo (punto 7) ---------- */
const PLANTILLAS = {
  6: { 0: [["cuerda", "A"]], 1: [["nat", "A"]], 2: [["r1500", "B"]], 3: [["cuerda", "B"]], 4: [["nat", "B"]], 5: [["r1500", "A"]] },
  5: { 0: [["cuerda", "A"], ["nat", "A"]], 1: [["r1500", "B"]], 3: [["cuerda", "B"]], 4: [["nat", "B"]], 5: [["r1500", "A"]] },
  4: { 0: [["cuerda", "A"], ["nat", "A"]], 1: [["r1500", "A"]], 3: [["cuerda", "B"], ["nat", "B"]], 5: [["r1500", "B"]] },
};

// Comprueba las reglas: nada de carrera en días seguidos y 48 h entre cuerda A y B.
export function semanaValida(dias) {
  const diasDe = (p, t) => Object.keys(dias).filter((d) => dias[d].some(([pp, tt]) => pp === p && (!t || tt === t))).map(Number);
  const carrera = diasDe("r1500").sort((a, b) => a - b);
  for (let i = 1; i < carrera.length; i++) if (carrera[i] - carrera[i - 1] < 2) return false;
  if (carrera.length >= 2 && carrera[0] + 7 - carrera[carrera.length - 1] < 2) return false;
  const [ca] = diasDe("cuerda", "A"); const [cb] = diasDe("cuerda", "B");
  if (ca != null && cb != null) { const dd = Math.abs(ca - cb); if (Math.min(dd, 7 - dd) < 2) return false; }
  return true;
}

const copiaDias = (d) => Object.fromEntries(Object.entries(d).map(([k, v]) => [k, v.map((x) => [...x])]));
const buscar = (dias, p, t) => Number(Object.keys(dias).find((d) => dias[d].some(([pp, tt]) => pp === p && tt === t)));

export function planSemana(perfil, estados, hoy) {
  const avisos = [];
  const numDias = Math.max(3, Math.min(6, perfil.dias || 6));
  let dias;

  if (numDias === 3) {
    // Se cae la B de la prueba más cerca de su 10 (más puntos; sin marca, la que tenga menos dato no se quita)
    const puntos = PRUEBAS_FIS.map((p) => [p, estados[p]?.marca != null ? puntosBaremo(p, estados[p].marca, perfil.sexo) : -1]);
    puntos.sort((a, b) => b[1] - a[1]);
    const quitada = puntos[0][1] >= 0 ? puntos[0][0] : "nat";
    const bs = ["cuerda", "nat", "r1500"].filter((p) => p !== quitada && p !== "r1500");
    const segundaB = bs.includes("cuerda") ? "cuerda" : "nat";
    const resto = ["cuerda", "nat", "r1500"].filter((p) => p !== quitada && p !== segundaB);
    dias = { 0: [["cuerda", "A"], ["nat", "A"]], 2: [["r1500", "A"], [segundaB, "B"]], 4: resto.map((p) => [p, "B"]) };
    avisos.push("Con 3 días avanzarás más despacio; si puedes, añade un cuarto.");
  } else dias = copiaDias(PLANTILLAS[numDias]);

  // Día de soga
  if (perfil.soga && perfil.diaSoga != null) {
    const dB = buscar(dias, "cuerda", "B");
    if (dB !== perfil.diaSoga) {
      const intento = copiaDias(dias);
      const destino = intento[perfil.diaSoga] || [];
      intento[perfil.diaSoga] = intento[dB];
      if (destino.length) intento[dB] = destino; else delete intento[dB];
      if (semanaValida(intento)) dias = intento;
      else {
        const solo = copiaDias(dias);
        solo[dB] = solo[dB].filter(([p, t]) => !(p === "cuerda" && t === "B"));
        if (!solo[dB].length) delete solo[dB];
        solo[perfil.diaSoga] = [...(solo[perfil.diaSoga] || []), ["cuerda", "B"]];
        if (semanaValida(solo)) dias = solo;
        else avisos.push(`Tu día de soga no encaja con el resto de la semana: haz la cuerda B el ${DIAS[dB].toLowerCase()} o cambia el día.`);
      }
    }
  }

  // Diagnóstico: la sesión rezagada pasa a ser la primera de esa prueba
  const extras = [];
  for (const p of ["nat", "r1500"]) {
    const dg = estados[p] && diagnostico(estados[p]);
    if (!dg) continue;
    const dA = buscar(dias, p, "A"); const dBp = buscar(dias, p, "B");
    if (Number.isFinite(dA) && Number.isFinite(dBp)) {
      const primero = Math.min(dA, dBp);
      const dRez = dg.rezagado === "A" ? dA : dBp;
      if (dRez !== primero) {
        // Intercambio de días entre la A y la B de esa prueba
        const fix = copiaDias(dias);
        fix[dA] = fix[dA].map(([pp, tt]) => (pp === p && tt === "A" ? [pp, "B"] : [pp, tt]));
        fix[dBp] = fix[dBp].map(([pp, tt]) => (pp === p && tt === "B" ? [pp, "A"] : [pp, tt]));
        if (semanaValida(fix)) dias = fix;
      }
    }
    if (numDias < 6) {
      const libre = [0, 1, 2, 3, 4, 5].find((d) => !dias[d] && semanaValida({ ...copiaDias(dias), [d]: [[p, dg.rezagado]] }));
      if (libre != null) extras.push({ dia: libre, prueba: p, tipo: dg.rezagado, motivo: dg.texto });
    }
  }

  // Sesiones concretas, con semana de test
  const tests = Object.fromEntries(PRUEBAS_FIS.map((p) => [p, estados[p] ? tocaTest(estados[p], hoy) : { toca: true, tipo: "inicial" }]));
  const out = Object.keys(dias).map(Number).sort((a, b) => a - b).map((d) => ({
    dia: d, nombre: DIAS[d],
    sesiones: dias[d].map(([p, t]) => {
      const e = estados[p];
      const tt = tests[p];
      if (tt.toca && t === "A") return { prueba: p, tipo: "T", test: tt, sesion: sesion(p, "T", e || estadoInicial(p), perfil) };
      if (!e || e.marca == null) return { prueba: p, tipo: t, bloqueada: true, sesion: null };
      if (tt.toca && t === "B") {
        const suave = clonar(e); suave.nivel.B = Math.max(1, e.nivel.B - 1);
        const s = sesion(p, "B", suave, perfil);
        s.notas.unshift("Semana de test: un nivel por debajo para llegar fresco.");
        return { prueba: p, tipo: "B", sesion: s, nivelSemana: suave.nivel.B };
      }
      return { prueba: p, tipo: t, sesion: sesion(p, t, e, perfil) };
    }),
  }));
  return { dias: out, avisos, extras, tests };
}

/* ---------- semanas sin registrar → NO HECHO (punto 6.2) ---------- */
// Devuelve los estados tras aplicar «sin hacer» a cada sesión prevista y no registrada
// en las semanas completas entre `desde` (lunes ya procesado) y la semana de `hoy`.
export function aplicarSemanasSinHacer(perfil, estados, registros, desde, hoy) {
  const lunesHoy = lunesDe(hoy);
  let lunes = desde ? sumarDias(desde, 7) : null;
  const nuevos = clonar(estados);
  if (!lunes) return { estados: nuevos, procesadoHasta: sumarDias(lunesHoy, -7) };
  while (lunes < lunesHoy) {
    const plan = planSemana(perfil, nuevos, lunes);
    for (const d of plan.dias) for (const s of d.sesiones) {
      if (!s.sesion || s.tipo === "T") continue;
      const hecho = registros.some((r) => r.semana === lunes && r.prueba === s.prueba && r.tipo === s.tipo);
      if (!hecho && nuevos[s.prueba]?.marca != null) nuevos[s.prueba] = siguienteEstado(nuevos[s.prueba], s.tipo, { resultado: RESULTADO.NO_HECHO, modo: null }, { perfil, fecha: lunes }).estado;
    }
    lunes = sumarDias(lunes, 7);
  }
  return { estados: nuevos, procesadoHasta: sumarDias(lunesHoy, -7) };
}

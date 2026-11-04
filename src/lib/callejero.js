// Callejero de la prueba de conocimiento del Municipio (Anexo III de las bases de 2026).
// Las preguntas no se guardan en ningún sitio: se generan en el momento a partir de la tabla
// oficial CALLE / ENTRADA / SALIDA y de la lista de polígonos, con 3 opciones como el examen.
import datos from "../data/callejero.json";

export const CALLES = datos.calles;        // [{ id, calle, entrada, salida }]
export const POLIGONOS = datos.poligonos;  // [{ id, nombre, situacion }]
export const FUENTE = datos.fuente;
export const NO_TIENE = "NO TIENE";

// El Anexo usa el formato de nomenclátor («MINA, LA», «SERVET, MIGUEL»). Para leer y preguntar se usa
// el nombre natural («La Mina», «Miguel Servet»), con las abreviaturas desarrolladas (ver datos.nombres).
const NOMBRES = datos.nombres || {};
export const txt = (s) => NOMBRES[s] || s;
// dentro de una frase: «la calle del Tercer Milenio», «entrada por de las Damas» → en minúscula
const f = (s) => txt(s).replace(/^(De|Del) /, (m) => m.toLowerCase());
// en mitad de una frase: «en la calle de las Damas» (en vez de «en De las Damas»); G, al empezar una frase
const g = (s) => (/^(De|Del) /.test(txt(s)) ? `la calle ${f(s)}` : txt(s));
const G = (s) => { const t = g(s); return t.charAt(0).toUpperCase() + t.slice(1); };

// Comparar nombres sin acentos, mayúsculas ni signos («ATARÉS, JOSÉ» = «ATARÉS JOSÉ»)
export const norm = (s) =>
  String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase().replace(/[^A-Z0-9Ñ]+/g, " ").trim();

const barajar = (a, rnd = Math.random) => { const x = [...a]; for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; } return x; };
// clave de comparación: el nombre natural normalizado (así «ATARÉS JOSÉ» y «ATARÉS, JOSÉ» son la misma calle)
const cacheClave = new Map();
const clave = (s) => { let k = cacheClave.get(s); if (k === undefined) { k = norm(txt(s)); cacheClave.set(s, k); } return k; };
const unicos = (arr) => { const vistos = new Set(); return arr.filter((x) => { const k = clave(x); if (!k || vistos.has(k)) return false; vistos.add(k); return true; }); };

// ---- índices ----
const filasPorCalle = new Map(); // nombre normalizado → filas (hay calles con dos tramos, p. ej. MAYOR o HISPANIDAD)
for (const c of CALLES) { const k = clave(c.calle); if (!filasPorCalle.has(k)) filasPorCalle.set(k, []); filasPorCalle.get(k).push(c); }

// Grafo «está cerca de»: cada calle con su entrada y su salida. Los distractores salen de los
// vecinos (misma zona de la ciudad), que es lo que hace dudar de verdad; si no hay bastantes, del total.
const vecinos = new Map();
const unir = (a, b) => {
  if (!a || !b || a === NO_TIENE || b === NO_TIENE) return;
  const ka = clave(a), kb = clave(b);
  if (ka === kb) return;
  if (!vecinos.has(ka)) vecinos.set(ka, new Map());
  if (!vecinos.has(kb)) vecinos.set(kb, new Map());
  vecinos.get(ka).set(kb, b); vecinos.get(kb).set(ka, a);
};
for (const c of CALLES) { unir(c.calle, c.entrada); unir(c.calle, c.salida); unir(c.entrada, c.salida); }
const TODOS_LOS_NOMBRES = unicos(CALLES.flatMap((c) => [c.calle, c.entrada, c.salida]).filter((x) => x !== NO_TIENE));

const cacheCercanos = new Map();
function cercanos(nombre, profundidad = 2) {
  const ck = `${profundidad}|${nombre}`;
  if (cacheCercanos.has(ck)) return cacheCercanos.get(ck);
  const inicio = clave(nombre), vistos = new Set([inicio]), out = [];
  let frontera = [inicio];
  for (let d = 0; d < profundidad; d++) {
    const sig = [];
    for (const k of frontera) for (const [kv, v] of vecinos.get(k) || []) if (!vistos.has(kv)) { vistos.add(kv); out.push(v); sig.push(kv); }
    frontera = sig;
  }
  cacheCercanos.set(ck, out);
  return out;
}

// Dos opciones incorrectas que no sean ninguna respuesta válida, preferiblemente de la zona
function distractores(validas, cerca, pool, rnd) {
  const prohibidas = new Set(validas.map(clave));
  const ok = (x) => x && x !== NO_TIENE && !prohibidas.has(clave(x));
  const elegidas = unicos(barajar(cerca.filter(ok), rnd)).slice(0, 2);
  if (elegidas.length < 2) {
    const ya = new Set(elegidas.map(clave));
    elegidas.push(...unicos(barajar(pool.filter((x) => ok(x) && !ya.has(clave(x))), rnd)).slice(0, 2 - elegidas.length));
  }
  return elegidas;
}

function montar({ id, item, tipo, enunciado, correcta, malas, explicacion, rnd }) {
  if (malas.length < 2) return null;
  const opciones = barajar([correcta, ...malas], rnd).map(txt);
  return { id, item, tipo, pregunta: enunciado, opciones, correcta: opciones.indexOf(txt(correcta)), explicacion, tema: "Callejero", etiqueta: ETIQUETA[tipo] };
}

const ETIQUETA = {
  entrada: "Callejero · Entrada de la calle",
  salida: "Callejero · Salida de la calle",
  tramo: "Callejero · Qué calle va de… a…",
  poligono: "Polígonos industriales · Situación",
  poligono_inv: "Polígonos industriales · Cuál está ahí",
  conecta: "Callejero · Calles que dan a…",
  intrusa: "Callejero · La que no encaja",
  cadena: "Callejero · Encadenar calles",
  enlace: "Callejero · Unir calles",
  ruta: "Callejero · Ruta entre calles",
};
const explicaCalle = (c) => `Anexo III: calle ${f(c.calle)} — entrada por ${g(c.entrada)}${c.salida === NO_TIENE ? ", sin salida" : ` y salida por ${g(c.salida)}`}. En el Anexo aparece como «${c.calle}».`;

// ---- generadores por tipo (cada uno devuelve null si la pregunta saldría ambigua) ----
const GEN = {
  entrada(c, rnd) {
    const validas = filasPorCalle.get(clave(c.calle)).map((f) => f.entrada); // si la calle tiene dos tramos, ninguna entrada suya puede ser distractor
    if (validas.some((v) => clave(v) === clave(c.calle))) return null;       // «MAYOR entra por MAYOR»: no se pregunta
    return montar({
      id: `entrada:${c.id}`, item: c.id, tipo: "entrada", rnd,
      enunciado: `¿Cuál es la entrada de la calle ${f(c.calle)}?`,
      correcta: c.entrada, malas: distractores([...validas, c.calle, c.salida], cercanos(c.calle), TODOS_LOS_NOMBRES, rnd),
      explicacion: explicaCalle(c),
    });
  },
  salida(c, rnd) {
    if (c.salida === NO_TIENE) return null;
    const validas = filasPorCalle.get(clave(c.calle)).map((f) => f.salida);
    if (validas.some((v) => clave(v) === clave(c.calle))) return null;
    return montar({
      id: `salida:${c.id}`, item: c.id, tipo: "salida", rnd,
      enunciado: `¿Cuál es la salida de la calle ${f(c.calle)}?`,
      correcta: c.salida, malas: distractores([...validas, c.calle, c.entrada], cercanos(c.calle), TODOS_LOS_NOMBRES, rnd),
      explicacion: explicaCalle(c),
    });
  },
  tramo(c, rnd) {
    if (c.salida === NO_TIENE || clave(c.entrada) === clave(c.salida)) return null;
    // todas las calles que van entre esas dos (en cualquier sentido) son válidas: ninguna puede ser distractor
    const validas = CALLES.filter((x) => {
      const e = clave(x.entrada), s = clave(x.salida), a = clave(c.entrada), b = clave(c.salida);
      return (e === a && s === b) || (e === b && s === a);
    }).map((x) => x.calle);
    if (unicos(validas).length > 1) return null; // dos calles distintas unen lo mismo: pregunta ambigua
    const cerca = [...cercanos(c.entrada, 1), ...cercanos(c.salida, 1)].filter((x) => filasPorCalle.has(clave(x)));
    return montar({
      id: `tramo:${c.id}`, item: c.id, tipo: "tramo", rnd,
      enunciado: `¿Qué calle tiene la entrada por ${g(c.entrada)} y la salida por ${g(c.salida)}?`,
      correcta: c.calle, malas: distractores([...validas, c.entrada, c.salida], cerca, CALLES.map((x) => x.calle), rnd),
      explicacion: explicaCalle(c),
    });
  },
  poligono(p, rnd) {
    const otras = POLIGONOS.map((x) => x.situacionTxt);
    // mismo tipo de vía primero (otra carretera y km), para que no se adivine por la forma
    const via = (t) => norm(t).split(" ")[0];
    const cerca = otras.filter((t) => via(t) === via(p.situacionTxt));
    return montar({
      id: `poligono:${p.id}`, item: p.id, tipo: "poligono", rnd,
      enunciado: `¿Dónde está el ${p.nombreTxt}?`,
      correcta: p.situacionTxt, malas: distractores([p.situacionTxt], cerca, otras, rnd),
      explicacion: `Anexo III: ${p.nombreTxt} — ${p.situacionTxt}. En el Anexo aparece como «${p.nombre}».`,
    });
  },
  poligono_inv(p, rnd) {
    // varios polígonos comparten situación (Malpica por calles, Empresarium e Insider…): ninguno de ellos puede ser distractor
    const mismos = POLIGONOS.filter((x) => norm(x.situacionTxt) === norm(p.situacionTxt)).map((x) => x.nombreTxt);
    const base = (t) => norm(t).replace(/^(POLIGONO|PARQUE)( INDUSTRIAL| EMPRESARIAL| TECNOLOGICO)? /, "").split(" ")[0]; // Malpica, Europa, Ruiseñores…: tampoco otra calle o fase del mismo
    const libres = POLIGONOS.filter((x) => !mismos.some((m) => base(m) === base(x.nombreTxt)));
    const via = (x) => norm(x.situacionTxt).split(" ")[0];
    const cerca = libres.filter((x) => via(x) === via(p)).map((x) => x.nombreTxt); // otros de la misma carretera o tipo de vía
    return montar({
      id: `poligono_inv:${p.id}`, item: p.id, tipo: "poligono_inv", rnd,
      enunciado: `¿Qué polígono está en ${p.situacionTxt}?`,
      correcta: p.nombreTxt, malas: distractores(mismos, cerca, libres.map((x) => x.nombreTxt), rnd),
      explicacion: `Anexo III: ${p.nombreTxt} — ${p.situacionTxt}. En el Anexo aparece como «${p.nombre}».`,
    });
  },
};

// ---- relaciones entre calles (para conectar, encadenar y unir) ----
// «x toca y» = en la tabla, la entrada o la salida de x es y. Solo sabemos dónde EMPIEZA y ACABA cada calle,
// no sus cruces intermedios ni los sentidos de circulación: las rutas son de extremo a extremo.
const toca = (fila, y) => clave(fila.entrada) === clave(y) || clave(fila.salida) === clave(y);
const filas = (x) => filasPorCalle.get(clave(x)) || [];
const enTabla = (x) => filasPorCalle.has(clave(x));
const unidas = (x, y) => clave(x) !== clave(y) && (filas(x).some((r) => toca(r, y)) || filas(y).some((r) => toca(r, x)));
function relacion(x, y) { // texto para la explicación
  const r = filas(x).find((r) => toca(r, y));
  if (r) return `${g(x)} tiene su ${clave(r.entrada) === clave(y) ? "entrada" : "salida"} en ${g(y)}`;
  const r2 = filas(y).find((r) => toca(r, x));
  return `${g(y)} tiene su ${clave(r2.entrada) === clave(x) ? "entrada" : "salida"} en ${g(x)}`;
}
const NOMBRES_TABLA = unicos(CALLES.map((c) => c.calle));
const vecinasEnTabla = new Map(NOMBRES_TABLA.map((x) => [clave(x), NOMBRES_TABLA.filter((y) => unidas(x, y))]));
const vecinas = (x) => vecinasEnTabla.get(clave(x)) || [];

// Calles a las que llegan muchas otras (Hispanidad, Madrid, Coso…): las que más se preguntan
const llegan = new Map();
for (const c of CALLES) for (const e of [c.entrada, c.salida]) {
  if (e === NO_TIENE || clave(e) === clave(c.calle)) continue;
  if (!llegan.has(clave(e))) llegan.set(clave(e), { nombre: e, calles: [] });
  const l = llegan.get(clave(e)).calles;
  if (!l.some((x) => clave(x) === clave(c.calle))) l.push(c.calle);
}
const HUBS = [...llegan.values()].filter((h) => h.calles.length >= 3).sort((a, b) => b.calles.length - a.calles.length);
// Calles cerca de un hub que NO empiezan ni acaban en él (ni son sus propios extremos)
const cacheNoLlegan = new Map();
function noLlegan(h) {
  if (cacheNoLlegan.has(h.nombre)) return cacheNoLlegan.get(h.nombre);
  const prohibidas = new Set([clave(h.nombre), ...h.calles.map(clave), ...filas(h.nombre).flatMap((r) => [clave(r.entrada), clave(r.salida)])]);
  const ok = (x) => enTabla(x) && !prohibidas.has(clave(x)) && !filas(x).some((r) => toca(r, h.nombre));
  const cerca = unicos(h.calles.flatMap((x) => vecinas(x))).filter(ok);
  const res = cerca.length >= 2 ? cerca : unicos([...cerca, ...NOMBRES_TABLA.filter(ok)]);
  cacheNoLlegan.set(h.nombre, res);
  return res;
}
const slug = (s) => clave(s).toLowerCase().replace(/ /g, "-").slice(0, 24);

const GEN_REL = {
  // ¿Cuál de estas calles empieza o termina en H?  (una pregunta por cada calle que llega al hub)
  conecta(h, rnd) {
    return h.calles.map((x) => montar({
      id: `conecta:${slug(h.nombre)}:${slug(x)}`, item: `h-${slug(h.nombre)}`, tipo: "conecta", rnd,
      enunciado: `¿Cuál de estas calles tiene su entrada o su salida en ${g(h.nombre)}?`,
      correcta: x, malas: barajar(noLlegan(h), rnd).slice(0, 2),
      explicacion: `Según el Anexo III, ${relacion(x, h.nombre)}. Las otras dos no empiezan ni acaban en ${g(h.nombre)}.`,
    })).filter(Boolean).map((q) => ({ ...q, meta: { hub: h.nombre } }));
  },
  // ¿Cuál NO llega a H?
  intrusa(h, rnd) {
    const [a, b] = barajar(h.calles, rnd);
    const [x] = barajar(noLlegan(h), rnd);
    if (!x || !b) return [];
    const q = montar({
      id: `intrusa:${slug(h.nombre)}`, item: `h-${slug(h.nombre)}`, tipo: "intrusa", rnd,
      enunciado: `¿Cuál de estas calles NO tiene ni su entrada ni su salida en ${g(h.nombre)}?`,
      correcta: x, malas: [a, b],
      explicacion: `${G(a)} y ${g(b)} sí: ${relacion(a, h.nombre)}; ${relacion(b, h.nombre)}. ${G(x)} no empieza ni acaba en ${g(h.nombre)}.`,
    });
    return q ? [{ ...q, meta: { hub: h.nombre } }] : [];
  },
};

// Encadenar: sales de A por su salida, que es la calle B; sigues por B hasta su salida. ¿Dónde llegas?
function cadena(a, rnd) {
  if (a.salida === NO_TIENE || filas(a.calle).length > 1) return null;
  const fb = filas(a.salida);
  if (fb.length !== 1) return null;                     // B tiene que estar en la tabla y ser un solo tramo
  const b = fb[0];
  if (b.salida === NO_TIENE || [a.calle, b.calle].some((x) => clave(x) === clave(b.salida))) return null;
  const cerca = unicos([b.entrada, ...cercanos(b.salida, 1), ...cercanos(b.calle, 1)]);
  return montar({
    id: `cadena:${a.id}`, item: a.id, tipo: "cadena", rnd,
    enunciado: `Recorres ${g(a.calle)} hasta su salida, que da a ${g(b.calle)}. Sigues por ${g(b.calle)} hasta su salida. ¿A qué calle llegas?`,
    correcta: b.salida, malas: distractores([b.salida, a.calle, b.calle], cerca, TODOS_LOS_NOMBRES, rnd),
    explicacion: `Anexo III: ${g(a.calle)} tiene la salida en ${g(b.calle)}, y ${g(b.calle)} va de ${g(b.entrada)} a ${g(b.salida)}.`,
  });
}

// Unir: dos calles que no se tocan y una tercera que las enlaza (A — B — D)
function enlaces() {
  const out = [];
  for (const a of NOMBRES_TABLA) {
    const va = vecinas(a);
    const dist2 = unicos(va.flatMap((b) => vecinas(b))).filter((d) => clave(d) !== clave(a) && !unidas(a, d));
    if (!dist2.length) continue;
    const d = dist2.sort((x, y) => clave(x).localeCompare(clave(y)))[0]; // destino fijo para que el id sea estable
    const puentes = va.filter((b) => unidas(b, d));
    out.push({ a, d, puentes });
  }
  return out;
}
const ENLACES = enlaces();
function enlace({ a, d, puentes }, rnd) {
  const b = barajar(puentes, rnd)[0];
  const cerca = unicos([...vecinas(a), ...vecinas(d), ...cercanos(a, 2)]).filter(enTabla);
  // incorrectas: calles que NO tocan a la vez A y D (si tocan una, mejor: hacen dudar)
  const malas = distractores([...puentes, a, d], cerca, NOMBRES_TABLA, rnd).filter((x) => !(unidas(a, x) && unidas(x, d)));
  const q = montar({
    id: `enlace:${slug(a)}:${slug(d)}`, item: `e-${slug(a)}`, tipo: "enlace", rnd,
    enunciado: `${G(a)} y ${g(d)} no se tocan. ¿Qué calle las une?`,
    correcta: b, malas,
    explicacion: `Según el Anexo III: ${relacion(a, b)}, y ${relacion(b, d)}.`,
  });
  return q && { ...q, meta: { a, d } };
}
// Ruta de 4 calles: A → B → C → D. Las incorrectas se rompen en algún tramo.
const flecha = (xs) => xs.map(txt).join(" → ");
const valida = (xs) => xs.every((x, i) => i === 0 || unidas(xs[i - 1], x));
function rutas() {
  const out = [];
  for (const a of NOMBRES_TABLA) {
    // BFS hasta distancia 3
    const prev = new Map([[clave(a), null]]), nivel = new Map([[clave(a), 0]]), cola = [a];
    while (cola.length) {
      const x = cola.shift();
      if (nivel.get(clave(x)) === 3) continue;
      for (const y of vecinas(x)) if (!prev.has(clave(y))) { prev.set(clave(y), x); nivel.set(clave(y), nivel.get(clave(x)) + 1); cola.push(y); }
    }
    const d3 = NOMBRES_TABLA.filter((y) => nivel.get(clave(y)) === 3).sort((x, y) => clave(x).localeCompare(clave(y)));
    if (!d3.length) continue;
    const d = d3[0], camino = [d];
    while (prev.get(clave(camino[0]))) camino.unshift(prev.get(clave(camino[0])));
    out.push(camino); // [A, B, C, D]
  }
  return out;
}
const RUTAS = rutas();
function ruta(camino, rnd) {
  const [a, b, c, d] = camino;
  const cerca = unicos([...vecinas(b), ...vecinas(c), ...cercanos(b, 1), ...cercanos(c, 1)]).filter(enTabla);
  const rotas = [];
  for (const x of barajar(cerca, rnd)) {
    if (rotas.length >= 2) break;
    for (const cand of barajar([[a, x, c, d], [a, b, x, d]], rnd)) {
      if (new Set(cand.map(clave)).size < 4 || valida(cand)) continue;   // tiene que romperse en algún tramo
      if (rotas.some((r) => flecha(r) === flecha(cand))) continue;
      rotas.push(cand); break;
    }
  }
  if (rotas.length < 2) return null;
  const roto = (xs) => { const i = xs.findIndex((x, k) => k > 0 && !unidas(xs[k - 1], x)); return `${g(xs[i - 1])} y ${g(xs[i])} no se tocan`; };
  const opciones = barajar([camino, ...rotas], rnd);
  return {
    id: `ruta:${slug(a)}:${slug(d)}`, item: `r-${slug(a)}`, tipo: "ruta",
    pregunta: `¿Qué secuencia de calles lleva de ${g(a)} a ${g(d)}, pasando de una a otra por sus extremos?`,
    opciones: opciones.map(flecha), correcta: opciones.indexOf(camino),
    explicacion: `Según el Anexo III: ${relacion(a, b)}; ${relacion(b, c)}; ${relacion(c, d)}. En las otras, ${rotas.map(roto).join("; en la otra, ")}.`,
    tema: "Callejero", etiqueta: ETIQUETA.ruta,
  };
}

export const TIPOS_CALLE = ["entrada", "salida", "tramo"];
export const TIPOS_RELACION = ["conecta", "intrusa", "cadena", "enlace", "ruta"];
export const TIPOS_POLIGONO = ["poligono", "poligono_inv"];
export const itemPorId = Object.fromEntries([...CALLES, ...POLIGONOS].map((x) => [x.id, x]));

// Todas las preguntas posibles (para validar y para las estadísticas)
export function todasLasPreguntas(rnd = Math.random, tipos = null) {
  const quiero = (t) => !tipos || tipos.includes(t);
  const out = [];
  for (const c of CALLES) for (const t of TIPOS_CALLE) if (quiero(t)) { const q = GEN[t](c, rnd); if (q) out.push(q); }
  for (const p of POLIGONOS) for (const t of TIPOS_POLIGONO) if (quiero(t)) { const q = GEN[t](p, rnd); if (q) out.push(q); }
  for (const h of HUBS) {
    if (quiero("conecta")) out.push(...GEN_REL.conecta(h, rnd));
    if (quiero("intrusa")) out.push(...GEN_REL.intrusa(h, rnd));
  }
  if (quiero("cadena")) for (const c of CALLES) { const q = cadena(c, rnd); if (q) out.push(q); }
  if (quiero("enlace")) for (const e of ENLACES) { const q = enlace(e, rnd); if (q) out.push(q); }
  if (quiero("ruta")) for (const r of RUTAS) { const q = ruta(r, rnd); if (q) out.push(q); }
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
export function elegirPreguntas({ n = 20, tipos = [...TIPOS_CALLE, ...TIPOS_RELACION, ...TIPOS_POLIGONO], criterio = "inteligente", progreso = {} }) {
  const candidatas = todasLasPreguntas(Math.random, tipos);
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
// Reparto aproximado: 25 de calles, 15 de relaciones entre calles y 10 de polígonos.
export function simulacroCallejero(progreso = {}) {
  const calles = elegirPreguntas({ n: 25, tipos: TIPOS_CALLE, criterio: "azar", progreso });
  const rel = elegirPreguntas({ n: 15, tipos: TIPOS_RELACION, criterio: "azar", progreso }).filter((q) => !calles.some((c) => c.item === q.item));
  const pols = elegirPreguntas({ n: 10, tipos: TIPOS_POLIGONO, criterio: "azar", progreso });
  return barajar([...calles, ...rel, ...pols]);
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

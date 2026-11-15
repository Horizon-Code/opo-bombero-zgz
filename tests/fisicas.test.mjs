// Tests del motor de físicas. Ejecutar con: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  CONFIG, RESULTADO, ritmos, ritmoCritico, estadoInicial, sesion, calificar, siguienteEstado,
  aplicarTest, tocaTest, aplazarTest, diagnostico, planSemana, semanaValida, situacionBaremo,
  lunesDe, aplicarSemanasSinHacer, fmtSeg,
} from "../src/lib/fisicas.js";
import { puntosBaremo } from "../src/lib/baremo.js";

const cerca = (a, b, tol = 0.05) => assert.ok(Math.abs(a - b) <= tol, `${a} no está cerca de ${b}`);
const HOY = "2026-11-16"; // lunes
const conMarca = (p, marca, extra = {}) => estadoInicial(p, { marca, fecha: HOY, ...extra });
const sup = (modo = "sensacion", sobrada = false) => ({ resultado: RESULTADO.SUPERADO, modo, sobrada });
const cum = (modo = "sensacion") => ({ resultado: RESULTADO.CUMPLIDO, modo });
const fal = () => ({ resultado: RESULTADO.FALLADO, modo: "sensacion" });
const nh = () => ({ resultado: RESULTADO.NO_HECHO, modo: null });
const paso = (e, tipo, cal, opts = {}) => siguienteEstado(e, tipo, cal, { fecha: HOY, ...opts }).estado;

/* ---------- baremo ---------- */
test("baremo: tablas oficiales de hombres y mujeres", () => {
  assert.equal(puntosBaremo("r1500", 310, "H"), 5.75);
  assert.equal(puntosBaremo("r1500", 310, "M"), 9.75);
  assert.equal(puntosBaremo("r1500", 309.99, "M"), 10);
  assert.equal(puntosBaremo("nat", 59.99, "H"), 10);
  assert.equal(puntosBaremo("nat", 60, "H"), 9.75);
  assert.equal(puntosBaremo("cuerda", 8.5, "M"), 10);
  assert.equal(puntosBaremo("cuerda", 11.01, "H"), 0);
});
test("situación respecto al baremo", () => {
  const s = situacionBaremo("r1500", 330, "H");
  assert.equal(s.puntos, 5.25);
  assert.equal(s.enDiez, false);
  cerca(s.falta, 62, 0.001);
  cerca(s.avance, 20 / 82, 0.001);
});

/* ---------- ritmos: ejemplos del documento ---------- */
test("carrera: T = 5:30 → 400 en 1:25 y 300 en 1:04", () => {
  const r = ritmos("r1500", 330);
  assert.equal(fmtSeg(r.serie(400)), "1:25");
  assert.equal(fmtSeg(r.serie(300)), "1:04");
});
test("natación A: T = 1:30 → cada 25 en 21,8 s", () => {
  assert.equal(fmtSeg(ritmos("nat", 90).por25), "21,8 s");
});
test("natación B: 400 en 7:00 y 200 en 3:20 → 1:50 cada 100", () => {
  assert.equal(ritmoCritico(420, 200), 110);
  assert.equal(ritmoCritico(200, 420), null);
});

/* ---------- sesiones ---------- */
test("sesión de carrera A con tiempos por serie", () => {
  const s = sesion("r1500", "A", conMarca("r1500", 330));
  assert.equal(s.registro, "tiempos");
  assert.equal(s.series.length, 6);
  assert.equal(s.principal[0], "6 × 300 m en 1:04");
});
test("carrera B por esfuerzo y tope de nivel con molestias", () => {
  const e = conMarca("r1500", 330); e.nivel.B = 6;
  const s = sesion("r1500", "B", e, { impacto: true });
  assert.equal(s.registro, "sensacion");
  assert.match(s.titulo, /nivel 3/);
  assert.ok(s.notas.some((n) => /bici o elíptica/.test(n)));
});
test("natación B sin tests: por esfuerzo; con tests: tiempos", () => {
  const sin = sesion("nat", "B", conMarca("nat", 90));
  assert.equal(sin.registro, "sensacion");
  const con = sesion("nat", "B", conMarca("nat", 90, { t400: 420, t200: 200 }));
  assert.equal(con.registro, "tiempos");
  assert.equal(con.series[0].objetivo, 110);
});
test("natación por encima de 2:00 → nivel base", () => {
  const e = conMarca("nat", 125);
  assert.equal(e.base, true);
  assert.match(sesion("nat", "A", e).titulo, /base/);
});
test("cuerda: sin tiempo objetivo, soga o barra según perfil", () => {
  const e = estadoInicial("cuerda", { marca: 10, fecha: HOY, dominadas: 7 });
  assert.match(sesion("cuerda", "B", e, { soga: true }).titulo, /soga/);
  assert.match(sesion("cuerda", "B", e, { soga: false }).titulo, /barra/);
  assert.equal(sesion("cuerda", "B", e, {}).series.length, 0);
  assert.match(sesion("cuerda", "A", e).principal[0], /5 × 5 dominadas estrictas/); // ceil(0,6 × 7) = 5
});

/* ---------- 6.1 calificar ---------- */
test("calificar con tiempos: superado, cumplido, fallado y sobrado", () => {
  const s = sesion("nat", "A", conMarca("nat", 90)); // 8 × 25 en 21,825 s
  const obj = s.series[0].objetivo;
  const todas = (t) => Array(8).fill(t);
  assert.equal(calificar(s, { modo: "tiempos", tiempos: todas(obj) }).resultado, RESULTADO.SUPERADO);
  assert.equal(calificar(s, { modo: "tiempos", tiempos: todas(obj) }).sobrada, false);
  assert.equal(calificar(s, { modo: "tiempos", tiempos: todas(obj * 0.96) }).sobrada, true);
  // dentro de la tolerancia del 2 % pero media peor que el objetivo → cumplido
  assert.equal(calificar(s, { modo: "tiempos", tiempos: todas(obj * 1.015) }).resultado, RESULTADO.CUMPLIDO);
  // 7 de 8 dentro (87,5 %) → cumplido
  assert.equal(calificar(s, { modo: "tiempos", tiempos: [...todas(obj).slice(0, 7), obj * 1.1] }).resultado, RESULTADO.CUMPLIDO);
  // 6 de 8 (75 %) → fallado; series sin apuntar cuentan como no hechas
  assert.equal(calificar(s, { modo: "tiempos", tiempos: todas(obj).slice(0, 6) }).resultado, RESULTADO.FALLADO);
});
test("calificar con sensación y con «Hecho»", () => {
  const s = sesion("r1500", "B", conMarca("r1500", 330));
  assert.equal(calificar(s, { modo: "sensacion", valor: "sobrado" }).resultado, RESULTADO.SUPERADO);
  assert.equal(calificar(s, { modo: "sensacion", valor: "justo" }).resultado, RESULTADO.CUMPLIDO);
  assert.equal(calificar(s, { modo: "sensacion", valor: "no" }).resultado, RESULTADO.FALLADO);
  assert.equal(calificar(s, { modo: "hecho" }).resultado, RESULTADO.CUMPLIDO);
  assert.throws(() => calificar(s, { modo: "tiempos", tiempos: [1] }));
});

/* ---------- 6.2 qué pasa la semana siguiente ---------- */
test("superado → sube 1", () => {
  assert.equal(paso(conMarca("r1500", 330), "A", sup()).nivel.A, 2);
});
test("cumplido la primera vez → repite; la segunda en el mismo nivel → sube", () => {
  let e = conMarca("r1500", 330);
  e = paso(e, "A", cum()); assert.equal(e.nivel.A, 1);
  e = paso(e, "A", cum()); assert.equal(e.nivel.A, 2);
});
test("fallado una vez → repite; dos seguidas → baja y relaja un 1,5 %", () => {
  let e = conMarca("r1500", 330); e.nivel.A = 3;
  e = paso(e, "A", fal()); assert.equal(e.nivel.A, 3); assert.equal(e.ref.A, 330);
  e = paso(e, "A", fal()); assert.equal(e.nivel.A, 2); cerca(e.ref.A, 330 * 1.015, 1e-9);
});
test("dos superados con tiempos y sobrados → aprieta un 1,5 %", () => {
  let e = conMarca("r1500", 330);
  e = paso(e, "A", sup("tiempos", true));
  e = paso(e, "A", sup("tiempos", true));
  cerca(e.ref.A, 330 * 0.985, 1e-9);
  // el siguiente superado sobrado no vuelve a apretar solo: hacen falta dos nuevos
  e = paso(e, "A", sup("tiempos", true));
  cerca(e.ref.A, 330 * 0.985, 1e-9);
});
test("dos «sobrado» seguidos con sensación → aprieta un 1 %", () => {
  let e = conMarca("nat", 90);
  e = paso(e, "A", sup()); e = paso(e, "A", sup());
  cerca(e.ref.A, 90 * 0.99, 1e-9);
});
test("superado en nivel 7 → se queda y aprieta un 1,5 %", () => {
  const e = conMarca("r1500", 330); e.nivel.A = 7;
  const n = paso(e, "A", sup("tiempos"));
  assert.equal(n.nivel.A, 7); cerca(n.ref.A, 330 * 0.985, 1e-9);
});
test("no hecho una semana → igual; dos seguidas → baja", () => {
  let e = conMarca("r1500", 330); e.nivel.B = 3;
  e = paso(e, "B", nh()); assert.equal(e.nivel.B, 3);
  e = paso(e, "B", nh()); assert.equal(e.nivel.B, 2);
});
test("cuatro semanas sin actividad → pide test", () => {
  const e = conMarca("r1500", 330);
  assert.equal(tocaTest(e, "2026-12-14").toca, true);
  assert.equal(tocaTest(e, "2026-12-14").tipo, "adelantado");
});
test("tope: nunca más de un nivel por semana y mínimo 1", () => {
  const e = conMarca("r1500", 330);
  assert.equal(paso(e, "A", fal()).nivel.A, 1);
  const f = paso(paso(e, "A", fal()), "A", fal());
  assert.equal(f.nivel.A, 1);
});
test("tope del 6 % entre tests → adelanta el test", () => {
  let e = conMarca("r1500", 330); e.nivel.A = 7;
  let ev = [];
  for (let i = 0; i < 6; i++) { const r = siguienteEstado(e, "A", sup("tiempos"), { fecha: HOY }); e = r.estado; ev = ev.concat(r.eventos); }
  assert.equal(e.ajuste.A, CONFIG.TOPE_APRIETE);
  cerca(e.ref.A, 330 * 0.94, 1e-9);
  assert.ok(ev.includes("adelantarTest"));
  assert.equal(tocaTest(e, HOY).tipo, "adelantado");
});
test("solo «Hecho»: como mucho 2 niveles sin datos", () => {
  let e = conMarca("r1500", 330);
  for (let i = 0; i < 8; i++) e = paso(e, "B", cum("hecho"));
  assert.equal(e.nivel.B, 3);
  const r = siguienteEstado(e, "B", cum("hecho"), { fecha: HOY });
  assert.equal(r.estado.nivel.B, 3);
  // con un dato de sensación vuelve a poder subir
  const s = paso(e, "B", sup());
  assert.equal(s.nivel.B, 4);
  assert.equal(s.sinDatos.B, 0);
  assert.equal(tocaTest(e, HOY).tipo, "adelantado");
});
test("carrera A con molestias: como mucho un nivel cada dos semanas", () => {
  let e = conMarca("r1500", 330);
  e = paso(e, "A", sup(), { perfil: { impacto: true }, fecha: "2026-11-16" });
  assert.equal(e.nivel.A, 2);
  e = paso(e, "A", sup(), { perfil: { impacto: true }, fecha: "2026-11-23" });
  assert.equal(e.nivel.A, 2);
  e = paso(e, "A", sup(), { perfil: { impacto: true }, fecha: "2026-11-30" });
  assert.equal(e.nivel.A, 3);
});
test("cuerda: el nivel se mueve, la referencia no existe", () => {
  let e = estadoInicial("cuerda", { marca: 10, fecha: HOY, dominadas: 7 });
  e = paso(e, "B", sup()); e = paso(e, "B", sup());
  assert.equal(e.nivel.B, 3);
  assert.equal(e.ref.A, null);
});
test("el mensaje anuncia la sesión de la semana que viene", () => {
  const r = siguienteEstado(conMarca("nat", 90), "A", sup(), { fecha: HOY });
  assert.match(r.mensaje, /^Superado\. La semana que viene: 10 × 25 en 21,8 s\./);
});

/* ---------- 6.3 test ---------- */
const conNiveles = (p, m, a, b) => { const e = conMarca(p, m); e.nivel.A = a; e.nivel.B = b; return e; };
test("test: mejora ≥ 5 % → bajan 2", () => {
  const e = aplicarTest(conNiveles("r1500", 330, 5, 5), { marca: 312, fecha: HOY }).estado;
  assert.equal(e.nivel.A, 3); assert.equal(e.ref.A, 312); assert.equal(e.ajuste.A, 1);
});
test("test: mejora entre 2 % y 5 % → baja 1", () => {
  assert.equal(aplicarTest(conNiveles("r1500", 330, 5, 5), { marca: 320, fecha: HOY }).estado.nivel.A, 4);
});
test("test: entre −2 % y +2 % → se quedan y estancado", () => {
  const r = aplicarTest(conNiveles("r1500", 330, 5, 5), { marca: 327, fecha: HOY });
  assert.equal(r.estado.nivel.A, 5); assert.equal(r.estado.estancado, true);
});
test("test: empeora más del 2 % → baja 1", () => {
  assert.equal(aplicarTest(conNiveles("r1500", 330, 5, 5), { marca: 340, fecha: HOY }).estado.nivel.A, 4);
});
test("test: si la referencia ya iba a ese ritmo, los niveles no bajan", () => {
  const e = conNiveles("r1500", 330, 5, 5); e.ref.A = 314; e.ajuste.A = 314 / 330;
  assert.equal(aplicarTest(e, { marca: 312, fecha: HOY }).estado.nivel.A, 5);
});
test("test: en el 10 → mantenimiento en nivel 4", () => {
  const e = aplicarTest(conNiveles("r1500", 330, 6, 6), { marca: 267, fecha: HOY, sexo: "H" }).estado;
  assert.equal(e.mantenimiento, true); assert.equal(e.nivel.A, 4); assert.equal(e.nivel.B, 4);
  assert.equal(paso(e, "A", sup()).nivel.A, 4);
});
test("test de natación: sale de base y fija el ritmo crítico", () => {
  const r = aplicarTest(conMarca("nat", 125), { marca: 115, fecha: HOY, t400: 480, t200: 230 });
  assert.equal(r.estado.base, false); assert.equal(r.estado.nivel.A, 1); assert.equal(r.estado.ref.B, 125);
});
test("cuándo toca test: 8 semanas propuesto, aplazable, 12 fijo", () => {
  const e = conMarca("r1500", 330); e.ultimaActividad = "2027-01-11";
  assert.equal(tocaTest(e, "2027-01-04").toca, false);
  assert.equal(tocaTest(e, "2027-01-11").tipo, "propuesto");
  const ap = aplazarTest(e, "2027-01-11");
  assert.equal(tocaTest(ap, "2027-01-11").toca, false);
  assert.equal(tocaTest(ap, "2027-01-18").tipo, "propuesto");
  ap.ultimaActividad = "2027-02-08";
  assert.equal(tocaTest(ap, "2027-02-08").tipo, "fijo");
  assert.equal(tocaTest(estadoInicial("r1500"), HOY).tipo, "inicial");
});

/* ---------- 6.4 diagnóstico ---------- */
test("diagnóstico de velocidad y resistencia", () => {
  assert.equal(diagnostico(conNiveles("nat", 90, 5, 3)).rezagado, "B");
  assert.equal(diagnostico(conNiveles("nat", 90, 2, 4)).rezagado, "A");
  assert.equal(diagnostico(conNiveles("nat", 90, 3, 4)), null);
});

/* ---------- 7 semana tipo ---------- */
const todos = (o = {}) => ({ cuerda: estadoInicial("cuerda", { marca: 10, fecha: HOY, dominadas: 7 }), nat: conMarca("nat", 90), r1500: conMarca("r1500", 330), ...o });
const cuenta = (plan) => plan.dias.reduce((a, d) => a + d.sesiones.length, 0);
test("semana de 6, 5 y 4 días: seis sesiones y reglas cumplidas", () => {
  for (const dias of [6, 5, 4]) {
    const p = planSemana({ dias }, todos(), HOY);
    assert.equal(cuenta(p), 6, `con ${dias} días`);
    assert.equal(p.dias.length, dias);
  }
});
test("semana de 3 días: cinco sesiones, aviso y se cae la B de la prueba más cerca del 10", () => {
  const p = planSemana({ dias: 3, sexo: "H" }, todos({ nat: conMarca("nat", 61) }), HOY);
  assert.equal(cuenta(p), 5);
  assert.ok(p.avisos.some((a) => /3 días/.test(a)));
  assert.ok(!p.dias.some((d) => d.sesiones.some((s) => s.prueba === "nat" && s.tipo === "B")));
});
test("reglas: nada de carrera en días seguidos ni cuerda A y B a menos de 48 h", () => {
  assert.equal(semanaValida({ 0: [["r1500", "A"]], 1: [["r1500", "B"]] }), false);
  assert.equal(semanaValida({ 0: [["cuerda", "A"]], 1: [["cuerda", "B"]] }), false);
  assert.equal(semanaValida({ 0: [["cuerda", "A"]], 3: [["cuerda", "B"]] }), true);
});
test("día de soga: la cuerda B se mueve a ese día si encaja", () => {
  const p = planSemana({ dias: 6, soga: true, diaSoga: 4 }, todos(), HOY);
  const v = p.dias.find((d) => d.dia === 4);
  assert.ok(v.sesiones.some((s) => s.prueba === "cuerda" && s.tipo === "B"));
});
test("semana de test: la A pasa a test y la B baja un nivel", () => {
  const e = todos(); e.r1500.fechaTest = "2026-09-21"; e.r1500.ultimaActividad = HOY; e.r1500.nivel.B = 4;
  const p = planSemana({ dias: 6 }, e, HOY);
  const ses = p.dias.flatMap((d) => d.sesiones).filter((s) => s.prueba === "r1500");
  assert.ok(ses.some((s) => s.tipo === "T"));
  assert.equal(ses.find((s) => s.tipo === "B").nivelSemana, 3);
});
test("sin marca: la primera semana es de test y la B queda bloqueada", () => {
  const p = planSemana({ dias: 6 }, { cuerda: estadoInicial("cuerda"), nat: estadoInicial("nat"), r1500: estadoInicial("r1500") }, HOY);
  const ses = p.dias.flatMap((d) => d.sesiones);
  assert.equal(ses.filter((s) => s.tipo === "T").length, 3);
  assert.ok(ses.filter((s) => s.tipo === "B").every((s) => s.bloqueada));
});
test("diagnóstico: sesión extra opcional si hay día libre", () => {
  const p = planSemana({ dias: 4 }, todos({ nat: conNiveles("nat", 90, 5, 2) }), HOY);
  assert.ok(p.extras.some((x) => x.prueba === "nat" && x.tipo === "B"));
});

/* ---------- semanas sin registrar ---------- */
test("semanas completas sin registrar cuentan como no hechas", () => {
  const e = todos(); e.r1500.nivel.B = 3;
  const lunes = lunesDe(HOY);
  const r = aplicarSemanasSinHacer({ dias: 6 }, e, [], "2026-11-02", lunes); // semana del 9 sin nada
  assert.equal(r.estados.r1500.nivel.B, 3);
  const r2 = aplicarSemanasSinHacer({ dias: 6 }, e, [], "2026-10-26", lunes); // dos semanas
  assert.equal(r2.estados.r1500.nivel.B, 2);
  assert.equal(r2.procesadoHasta, "2026-11-09");
});

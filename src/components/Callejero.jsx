"use client";
// Pestaña «Callejero»: la segunda prueba del primer ejercicio (conocimiento del Municipio de Zaragoza).
// Las preguntas salen del Anexo III de las bases (368 calles con entrada y salida, 52 polígonos).
import React, { useState, useMemo, useRef } from "react";
import { C, FONT_DISPLAY, FONT_BODY, Card, H2, StripeBar, Vacio, Leyenda, inputStyle, btnStyle, hoy, COLOR_ESTADO } from "./ui";
import { Quiz, Resultado } from "./Temario";
import { addResultado, guardarProgresoCallejero } from "../lib/supabase";
import { corregir } from "../lib/banco";
import {
  CALLES, POLIGONOS, NO_TIENE, TIPOS_CALLE, TIPOS_POLIGONO, norm, txt,
  elegirPreguntas, simulacroCallejero, estadoItems, todasLasPreguntas,
} from "../lib/callejero";

const fmtN = (n) => n.toLocaleString("es-ES");
const TOTAL_PREGUNTAS = todasLasPreguntas().length;
const CRITERIOS = [
  ["inteligente", "Inteligente (falladas y no vistas primero)"],
  ["nuevas", "Solo no vistas"],
  ["falladas", "Solo falladas"],
  ["azar", "Al azar"],
];
const QUE = {
  calles: { tipos: TIPOS_CALLE, titulo: "Calles" },
  poligonos: { tipos: TIPOS_POLIGONO, titulo: "Polígonos" },
  todo: { tipos: [...TIPOS_CALLE, ...TIPOS_POLIGONO], titulo: "Calles y polígonos" },
};

// color de un elemento de la tabla según cómo va
function colorItem(s) {
  if (!s || !s.vistas) return COLOR_ESTADO.gris;
  if (s.fallada) return COLOR_ESTADO.rojo;
  return s.aciertos / s.vistas >= 0.8 ? COLOR_ESTADO.verde : COLOR_ESTADO.ambar;
}
const Punto = ({ s }) => (
  <span title={!s?.vistas ? "Sin practicar" : s.fallada ? "Fallada la última vez" : `Acierto ${Math.round((100 * s.aciertos) / s.vistas)} %`}
    style={{ width: 10, height: 10, borderRadius: "50%", background: colorItem(s), display: "inline-block", flexShrink: 0 }} />
);

export function Callejero({ user, progreso, setProgreso, resultados, setResultados }) {
  const [quiz, setQuiz] = useState(null);
  const [n, setN] = useState(20);
  const [que, setQue] = useState("calles");
  const [criterio, setCriterio] = useState("inteligente");
  const [modo, setModo] = useState("practica");
  const [aviso, setAviso] = useState("");
  const [buscar, setBuscar] = useState("");
  const [verTabla, setVerTabla] = useState("calles");
  const progresoRef = useRef(progreso);
  progresoRef.current = progreso;

  const porItem = useMemo(() => estadoItems(progreso), [progreso]);
  const vistas = Object.values(progreso).filter((p) => p.vistas).length;
  const dominadas = Object.values(progreso).filter((p) => p.ultimo_resultado).length;
  const falladas = Object.entries(progreso).filter(([, p]) => p.ultimo_resultado === false).length;
  const callesDominadas = CALLES.filter((c) => porItem[c.id]?.vistas && !porItem[c.id].fallada).length;
  const polDominados = POLIGONOS.filter((p) => porItem[p.id]?.vistas && !porItem[p.id].fallada).length;

  function empezar(preguntas, { titulo, modo: m = modo, limite = m === "examen" ? preguntas.length * 36 : null }) {
    setAviso("");
    if (!preguntas.length) { setAviso("No hay preguntas que cumplan ese criterio. Prueba con «Inteligente» o «Al azar»."); return; }
    setQuiz({ titulo, modo: m, limite, origen: "callejero", preguntas, inicio: Date.now() });
    window.scrollTo({ top: 0 });
  }
  const test = () => empezar(elegirPreguntas({ n, tipos: QUE[que].tipos, criterio, progreso }), { titulo: `Callejero · ${QUE[que].titulo} · ${n} preguntas` });
  const simulacro = () => empezar(simulacroCallejero(progreso), { titulo: "Simulacro de callejero · 50 preguntas · 30 minutos", modo: "examen", limite: 30 * 60 });
  const repasar = () => empezar(elegirPreguntas({ n, criterio: "falladas", progreso }), { titulo: `Callejero · repaso de falladas`, modo: "practica" });

  function registrar(pares) {
    const prev = progresoRef.current;
    const filas = pares.map(({ q, r }) => {
      const p = prev[q.id] || { vistas: 0, aciertos: 0 };
      const ok = r === q.correcta;
      return { pregunta_id: q.id, vistas: p.vistas + 1, aciertos: p.aciertos + (ok ? 1 : 0), ultimo_resultado: ok, ultima_fecha: hoy() };
    });
    const nuevo = { ...prev };
    for (const f of filas) nuevo[f.pregunta_id] = f;
    progresoRef.current = nuevo;
    setProgreso(nuevo);
    guardarProgresoCallejero(filas, user.id);
  }

  async function terminar(respuestas) {
    const res = corregir(quiz.preguntas, respuestas);
    if (quiz.modo === "examen") registrar(quiz.preguntas.map((q, i) => ({ q, r: respuestas[i] })));
    const fila = { fecha: hoy(), preguntas: quiz.preguntas.length, aciertos: res.aciertos, fallos: res.fallos, blancos: res.blancos, nota: res.nota, por_tema: {}, origen: "callejero" };
    const r = await addResultado(fila, user.id);
    if (r) setResultados([...resultados, r]);
    setQuiz({ ...quiz, respuestas, resultado: res, guardado: !!r });
  }

  if (quiz && !quiz.resultado)
    return <Quiz quiz={quiz} senalar={null} onRespuesta={(q, r) => registrar([{ q, r }])} onTerminar={terminar} onSalir={() => setQuiz(null)} />;
  if (quiz && quiz.resultado)
    return (
      <Resultado quiz={quiz} senalar={null} onVolver={() => setQuiz(null)}
        onRepetir={(ids) => empezar(quiz.preguntas.filter((q) => ids.includes(q.id)), { titulo: "Callejero · repaso de lo fallado", modo: "practica" })} />
    );

  const historial = resultados.filter((r) => r.origen === "callejero").slice(-5).reverse();
  const q = norm(buscar);
  const callesFiltradas = q ? CALLES.filter((c) => norm([c.calle, c.entrada, c.salida].flatMap((x) => [x, txt(x)]).join(" ")).includes(q)) : CALLES;
  const polFiltrados = q ? POLIGONOS.filter((p) => norm(`${p.nombre} ${p.situacion} ${p.nombreTxt} ${p.situacionTxt}`).includes(q)) : POLIGONOS;
  const th = { textAlign: "left", fontFamily: FONT_DISPLAY, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", fontSize: 13, padding: "6px 8px", borderBottom: `2px solid ${C.ink}`, position: "sticky", top: 0, background: C.panel };
  const anexo = { fontSize: 11, fontWeight: 400, color: C.inkSoft, letterSpacing: 0.3 }; // cómo aparece en el Anexo III
  const td = { padding: "6px 8px", borderBottom: `1px solid ${C.line}`, fontSize: 13, verticalAlign: "top" };

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <Card>
        <H2>Prueba de callejero</H2>
        <p style={{ fontSize: 14, margin: "0 0 10px", color: C.inkSoft }}>
          Es la <strong style={{ color: C.ink }}>segunda prueba del primer ejercicio</strong>, justo después del test del temario. Entra el
          <strong style={{ color: C.ink }}> Anexo III</strong> de las bases: {CALLES.length} calles con su entrada y su salida, y {POLIGONOS.length} polígonos industriales.
          Formato previsto: 50 preguntas, 3 opciones, 30 minutos.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <select value={que} onChange={(e) => setQue(e.target.value)} style={inputStyle} aria-label="Qué practicar">
            <option value="calles">Calles (entrada, salida, tramo)</option>
            <option value="poligonos">Polígonos industriales</option>
            <option value="todo">Calles y polígonos</option>
          </select>
          <select value={n} onChange={(e) => setN(+e.target.value)} style={inputStyle} aria-label="Número de preguntas">
            {[10, 20, 30, 50].map((x) => <option key={x} value={x}>{x} preguntas</option>)}
          </select>
          <select value={criterio} onChange={(e) => setCriterio(e.target.value)} style={inputStyle} aria-label="Qué preguntas">
            {CRITERIOS.map(([v, t]) => <option key={v} value={v}>{t}</option>)}
          </select>
          <select value={modo} onChange={(e) => setModo(e.target.value)} style={inputStyle} aria-label="Modo">
            <option value="practica">Práctica (corrige cada pregunta)</option>
            <option value="examen">Examen (corrige al final)</option>
          </select>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
          <button onClick={test} style={btnStyle()}>Empezar test</button>
          <button onClick={simulacro} style={btnStyle(C.steel)}>Simulacro · 50 en 30 min</button>
          <button onClick={repasar} disabled={!falladas} style={{ ...btnStyle("transparent", C.red), border: `2px solid ${C.red}`, opacity: falladas ? 1 : 0.45 }}>
            Repasar falladas ({fmtN(falladas)})
          </button>
        </div>
        {aviso && <p style={{ color: C.red, fontSize: 14, margin: "10px 0 0" }}>{aviso}</p>}
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 }}>
        {[
          { label: "Calles dominadas", value: `${callesDominadas} / ${CALLES.length}`, pct: (100 * callesDominadas) / CALLES.length, color: C.red },
          { label: "Polígonos dominados", value: `${polDominados} / ${POLIGONOS.length}`, pct: (100 * polDominados) / POLIGONOS.length, color: C.steel },
          { label: "Preguntas practicadas", value: `${fmtN(vistas)} / ${fmtN(TOTAL_PREGUNTAS)}`, pct: (100 * vistas) / TOTAL_PREGUNTAS, color: C.ink },
        ].map((s) => (
          <Card key={s.label} style={{ padding: 14, borderTop: `4px solid ${s.color}` }}>
            <div style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: C.inkSoft }}>{s.label}</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 30, lineHeight: 1.1, margin: "2px 0 8px" }}>{s.value}</div>
            <StripeBar pct={s.pct} color={s.color} />
          </Card>
        ))}
      </div>

      {historial.length > 0 && (
        <Card>
          <H2>Últimos tests de callejero</H2>
          {historial.map((r) => (
            <div key={r.id} style={{ display: "flex", gap: 10, fontSize: 14, padding: "5px 0", borderBottom: `1px solid ${C.line}` }}>
              <span style={{ color: C.inkSoft, minWidth: 70 }}>{String(r.fecha).split("-").reverse().join("/")}</span>
              <span style={{ flex: 1 }}>{r.aciertos} de {r.preguntas} · {r.fallos} fallos</span>
              <strong>{String(r.nota).replace(".", ",")}</strong>
            </div>
          ))}
        </Card>
      )}

      <Card>
        <H2>Estudiar el Anexo III</H2>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 10 }}>
          {[["calles", `Calles (${CALLES.length})`], ["poligonos", `Polígonos (${POLIGONOS.length})`]].map(([id, t]) => (
            <button key={id} onClick={() => setVerTabla(id)} aria-pressed={verTabla === id}
              style={{ padding: "6px 14px", borderRadius: 4, fontFamily: FONT_DISPLAY, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", fontSize: 14, border: `2px solid ${C.ink}`, background: verTabla === id ? C.ink : "transparent", color: verTabla === id ? C.yellow : C.ink }}>
              {t}
            </button>
          ))}
          <input value={buscar} onChange={(e) => setBuscar(e.target.value)} placeholder="Buscar calle o polígono…" aria-label="Buscar en el Anexo III"
            style={{ ...inputStyle, flex: "1 1 200px" }} />
        </div>
        <div style={{ display: "flex", gap: 14, fontSize: 11, color: C.inkSoft, marginBottom: 8, flexWrap: "wrap" }}>
          <Leyenda color={COLOR_ESTADO.verde} t="dominada" />
          <Leyenda color={COLOR_ESTADO.ambar} t="la vas aprendiendo" />
          <Leyenda color={COLOR_ESTADO.rojo} t="fallada la última vez" />
          <Leyenda color={COLOR_ESTADO.gris} t="sin practicar" />
        </div>
        <div style={{ maxHeight: 460, overflowY: "auto", border: `1px solid ${C.line}`, borderRadius: 4 }}>
          {verTabla === "calles" ? (
            callesFiltradas.length === 0 ? <div style={{ padding: 10 }}><Vacio texto="Ninguna calle coincide con la búsqueda." /></div> : (
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONT_BODY }}>
                <thead><tr><th style={th}>Calle</th><th style={th}>Entrada</th><th style={th}>Salida</th></tr></thead>
                <tbody>
                  {callesFiltradas.map((c) => (
                    <tr key={c.id}>
                      <td style={{ ...td, fontWeight: 600 }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Punto s={porItem[c.id]} />{txt(c.calle)}</span>
                        <div style={{ ...anexo, marginLeft: 16 }}>{c.calle}</div>
                      </td>
                      <td style={td}>{txt(c.entrada)}</td>
                      <td style={{ ...td, color: c.salida === NO_TIENE ? C.inkSoft : C.ink }}>{txt(c.salida)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          ) : (
            polFiltrados.length === 0 ? <div style={{ padding: 10 }}><Vacio texto="Ningún polígono coincide con la búsqueda." /></div> : (
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONT_BODY }}>
                <thead><tr><th style={th}>Polígono</th><th style={th}>Situación</th></tr></thead>
                <tbody>
                  {polFiltrados.map((p) => (
                    <tr key={p.id}>
                      <td style={{ ...td, fontWeight: 600 }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Punto s={porItem[p.id]} />{p.nombreTxt}</span>
                        <div style={{ ...anexo, marginLeft: 16 }}>{p.nombre}</div>
                      </td>
                      <td style={td}>{p.situacionTxt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}
        </div>
        <p style={{ fontSize: 12, color: C.inkSoft, margin: "8px 0 0" }}>
          Fuente: Anexo III de las bases de Bombera/o Conductor/a del Ayuntamiento de Zaragoza (BOPZ núm. 170, de 27/07/2026). Los nombres se muestran en su forma
          natural («La Mina», «Miguel Servet»); debajo, en gris, cómo aparecen en el Anexo. El orden es el del Anexo.
        </p>
      </Card>
    </div>
  );
}

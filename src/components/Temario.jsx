"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { C, FONT_DISPLAY, FONT_BODY, Card, H2, StripeBar, Vacio, Leyenda, inputStyle, btnStyle, hoy, Bolita, COLOR_ESTADO } from "./ui";
import {
  estructura, TOTAL_PREGUNTAS, temaPorNumero, bloquePorId, bloquesDeTema, bloquesDeNodo,
  statsBloques, statsDe, estado, idsDeBloques, elegir, simulacro, corregir,
} from "../lib/banco";
import { getPreguntasPorIds, guardarProgreso, addResultado } from "../lib/supabase";

const fmtN = (n) => n.toLocaleString("es-ES");
const LETRAS = "abc";
const CRITERIOS = [
  ["inteligente", "Inteligente (falladas y no vistas primero)"],
  ["nuevas", "Solo no vistas"],
  ["falladas", "Solo falladas"],
  ["azar", "Al azar"],
];

/* ============ TEMARIO Y TESTS ============ */
export function Temario({ user, progreso, setProgreso, resultados, setResultados }) {
  const [quiz, setQuiz] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [abiertos, setAbiertos] = useState(() => new Set());
  const [sel, setSel] = useState(() => new Set());
  const [n, setN] = useState(20);
  const [criterio, setCriterio] = useState("inteligente");
  const [modo, setModo] = useState("practica");

  const sb = useMemo(() => statsBloques(progreso), [progreso]);
  const progresoRef = useRef(progreso);
  progresoRef.current = progreso;

  const toggle = (set, setter, k) => { const x = new Set(set); x.has(k) ? x.delete(k) : x.add(k); setter(x); };

  // ---- arrancar un test a partir de una lista de ids ----
  // en modo examen, 48 s por pregunta (los 80 minutos del examen real para 100)
  async function empezar(ids, { titulo, modo: m = modo, limite = m === "examen" ? ids.length * 48 : null, origen = "test" }) {
    setError("");
    if (!ids.length) { setError("No hay preguntas que cumplan ese criterio en lo que has elegido."); return; }
    setCargando(true);
    try {
      const preguntas = await getPreguntasPorIds(ids);
      if (!preguntas.length) throw new Error("vacío");
      setQuiz({ titulo, modo: m, limite, origen, preguntas, inicio: Date.now() });
      window.scrollTo({ top: 0 });
    } catch (e) {
      console.error(e);
      setError("No se pudieron cargar las preguntas. ¿Está cargado el banco en Supabase (migración 4 + scripts/importar-banco.mjs)?");
    }
    setCargando(false);
  }

  const testDeBloques = (bloques, titulo, cantidad = n) =>
    empezar(elegir([idsDeBloques(bloques)], cantidad, criterio, progreso), { titulo });

  const testDeTemas = (temas, titulo) =>
    empezar(elegir(temas.map((t) => idsDeBloques(bloquesDeTema(t))), n, criterio, progreso), { titulo });

  const aleatorio = () =>
    testDeTemas(estructura.temas.map((t) => t.n), `Aleatorio · ${n} preguntas de todo el temario`);

  const lanzarSimulacro = () =>
    empezar(simulacro(progreso), { titulo: "Simulacro oficial · 100 preguntas · 80 minutos", modo: "examen", limite: 80 * 60, origen: "simulacro" });

  const totalFalladas = useMemo(() => Object.values(progreso).filter((p) => p.ultimo_resultado === false).length, [progreso]);
  const repasarFalladas = () => {
    const ids = Object.entries(progreso).filter(([, p]) => p.ultimo_resultado === false).map(([id]) => id);
    empezar(elegir([ids], n, "azar", progreso), { titulo: `Repaso de falladas · ${Math.min(n, ids.length)} preguntas`, origen: "repaso" });
  };

  // ---- guardar el resultado de cada respuesta en el progreso ----
  function registrar(pares) {
    const prev = progresoRef.current;
    const filas = pares.map(({ q, r }) => {
      const p = prev[q.id] || { vistas: 0, aciertos: 0 };
      const ok = r === q.correcta;
      return { pregunta_id: q.id, bloque: q.bloque, vistas: p.vistas + 1, aciertos: p.aciertos + (ok ? 1 : 0), ultimo_resultado: ok, ultima_fecha: hoy() };
    });
    const nuevo = { ...prev };
    for (const f of filas) nuevo[f.pregunta_id] = f;
    progresoRef.current = nuevo;
    setProgreso(nuevo);
    guardarProgreso(filas, user.id);
  }

  async function terminar(respuestas) {
    const res = corregir(quiz.preguntas, respuestas);
    if (quiz.modo === "examen") registrar(quiz.preguntas.map((q, i) => ({ q, r: respuestas[i] })));
    const fila = {
      fecha: hoy(), preguntas: quiz.preguntas.length, aciertos: res.aciertos, fallos: res.fallos, blancos: res.blancos,
      nota: res.nota, por_tema: res.porTema, origen: quiz.origen,
    };
    const r = await addResultado(fila, user.id);
    if (r) setResultados([...resultados, r]);
    setQuiz({ ...quiz, respuestas, resultado: res, guardado: !!r });
  }

  // ====== test en curso / resultado ======
  if (quiz && !quiz.resultado)
    return <Quiz quiz={quiz} onRespuesta={(q, r) => registrar([{ q, r }])} onTerminar={terminar} onSalir={() => setQuiz(null)} />;
  if (quiz && quiz.resultado)
    return (
      <Resultado quiz={quiz} onVolver={() => setQuiz(null)}
        onRepetir={(ids) => empezar(ids, { titulo: "Repaso de lo fallado en el test anterior", modo: "practica", origen: "repaso" })} />
    );

  // ====== pantalla principal ======
  const global = statsDe(Object.keys(bloquePorId), sb);
  const eg = estado(global);
  const selLista = [...sel].sort((a, b) => a - b);

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <Card>
        <H2>Hacer un test</H2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <select value={n} onChange={(e) => setN(+e.target.value)} style={inputStyle} aria-label="Número de preguntas">
            {[10, 20, 30, 50, 100].map((x) => <option key={x} value={x}>{x} preguntas</option>)}
          </select>
          <select value={criterio} onChange={(e) => setCriterio(e.target.value)} style={inputStyle} aria-label="Qué preguntas">
            {CRITERIOS.map(([v, t]) => <option key={v} value={v}>{t}</option>)}
          </select>
          <select value={modo} onChange={(e) => setModo(e.target.value)} style={inputStyle} aria-label="Modo">
            <option value="practica">Práctica (corrige cada pregunta)</option>
            <option value="examen">Examen (corrige al final, con penalización)</option>
          </select>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginTop: 12 }}>
          <button disabled={cargando || !sel.size} onClick={() => testDeTemas(selLista, `${selLista.length === 1 ? "Tema" : "Temas"} ${selLista.join(", ")} · ${n} preguntas`)}
            style={{ ...btnStyle(), opacity: cargando || !sel.size ? 0.45 : 1 }}>
            Test de {sel.size ? `${sel.size} tema${sel.size > 1 ? "s" : ""}` : "los temas marcados"}
          </button>
          <button disabled={cargando} onClick={aleatorio} style={{ ...btnStyle(C.ink, C.yellow), opacity: cargando ? 0.6 : 1 }}>Aleatorio</button>
          <button disabled={cargando} onClick={lanzarSimulacro} style={{ ...btnStyle(C.steel), opacity: cargando ? 0.6 : 1 }}>Simulacro oficial</button>
          <button disabled={cargando || !totalFalladas} onClick={repasarFalladas} style={{ ...btnStyle("transparent", C.red), border: `2px solid ${C.red}`, opacity: cargando || !totalFalladas ? 0.45 : 1 }}>
            Repasar falladas ({fmtN(totalFalladas)})
          </button>
        </div>
        <p style={{ fontSize: 12, color: C.inkSoft, margin: "10px 0 0" }}>
          Marca uno o varios temas en la lista de abajo, o usa «Test» en cualquier tema, subtema o apartado. El simulacro reproduce el examen:
          20 preguntas de la Parte I y 80 de la Parte II, 80 minutos, +0,10 por acierto, −0,025 por fallo y 0 en blanco.
        </p>
        {cargando && <p style={{ fontSize: 14, color: C.steel, margin: "10px 0 0" }}>Preparando el test…</p>}
        {error && <p style={{ color: C.red, fontSize: 14, margin: "10px 0 0" }}>{error}</p>}
      </Card>

      <Card>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <Bolita e={eg} size={30} />
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 26, lineHeight: 1 }}>{eg.pct} % del temario dominado</div>
            <div style={{ fontSize: 13, color: C.inkSoft, marginTop: 4 }}>
              {fmtN(global.vistas)} de {fmtN(TOTAL_PREGUNTAS)} preguntas vistas · {fmtN(global.dominadas)} acertadas la última vez
              {eg.acierto != null && ` · acierto medio ${eg.acierto} %`}
            </div>
          </div>
        </div>
        <div style={{ marginTop: 10 }}><StripeBar pct={(100 * global.vistas) / TOTAL_PREGUNTAS} color={C.steel} /></div>
        <div style={{ display: "flex", gap: 14, fontSize: 11, color: C.inkSoft, marginTop: 10, flexWrap: "wrap" }}>
          <span>Bolita: el relleno es lo que dominas; el color, tu acierto en lo visto →</span>
          <Leyenda color={COLOR_ESTADO.verde} t="≥ 80 %" />
          <Leyenda color={COLOR_ESTADO.ambar} t="60-79 %" />
          <Leyenda color={COLOR_ESTADO.rojo} t="< 60 %" />
          <Leyenda color={COLOR_ESTADO.gris} t="sin empezar" />
        </div>
      </Card>

      {[1, 2].map((parte) => {
        const temas = estructura.temas.filter((t) => t.parte === parte);
        const sp = statsDe(temas.flatMap((t) => t.nodos.flatMap((x) => x.bloques.map((b) => b.id))), sb);
        const ep = estado(sp);
        const todosSel = temas.every((t) => sel.has(t.n));
        return (
          <Card key={parte} style={{ padding: "14px 14px 6px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
              <Bolita e={ep} size={20} />
              <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 20, letterSpacing: 1, textTransform: "uppercase", margin: 0, flex: 1 }}>
                Parte {parte === 1 ? "I · Legislación" : "II · Técnico"} <span style={{ color: C.inkSoft, fontWeight: 600 }}>· {ep.pct} %</span>
              </h2>
              <button onClick={() => { const x = new Set(sel); temas.forEach((t) => (todosSel ? x.delete(t.n) : x.add(t.n))); setSel(x); }}
                style={{ ...btnStyle("transparent", C.inkSoft), border: `1px solid ${C.line}`, padding: "4px 10px", fontSize: 12 }}>
                {todosSel ? "Desmarcar todos" : "Marcar todos"}
              </button>
            </div>
            {temas.map((t) => (
              <FilaTema key={t.n} t={t} sb={sb} abiertos={abiertos} toggleAbierto={(k) => toggle(abiertos, setAbiertos, k)}
                marcado={sel.has(t.n)} toggleMarcado={() => toggle(sel, setSel, t.n)} cargando={cargando}
                onTest={testDeBloques} />
            ))}
          </Card>
        );
      })}
    </div>
  );
}

/* ---- filas del árbol ---- */
function Fila({ nivel, e, s, titulo, sub, abierto, onAbrir, onTest, cargando, extra }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0 8px " + nivel * 22 + "px", borderTop: `1px solid ${C.line}` }}>
      {extra}
      <Bolita e={e} size={nivel === 0 ? 18 : 14} />
      <button onClick={onAbrir} disabled={!onAbrir} aria-expanded={onAbrir ? !!abierto : undefined}
        style={{ flex: 1, minWidth: 0, textAlign: "left", background: "none", border: "none", padding: 0, color: C.ink, fontFamily: FONT_BODY, cursor: onAbrir ? "pointer" : "default" }}>
        <div style={{ fontSize: nivel === 0 ? 15 : 14, fontWeight: nivel === 0 ? 600 : 500, lineHeight: 1.3 }}>
          {onAbrir && <span style={{ display: "inline-block", width: 14, color: C.inkSoft }}>{abierto ? "▾" : "▸"}</span>}
          {titulo}
        </div>
        <div style={{ fontSize: 12, color: C.inkSoft, marginTop: 2, paddingLeft: onAbrir ? 14 : 0 }}>
          {sub ? sub + " · " : ""}{fmtN(s.vistas)}/{fmtN(s.total)} vistas{e.acierto != null ? ` · acierto ${e.acierto} %` : ""}
        </div>
      </button>
      <strong style={{ fontFamily: FONT_DISPLAY, fontSize: 18, minWidth: 46, textAlign: "right", color: e.color === "gris" ? C.inkSoft : C.ink }}>{e.pct} %</strong>
      <button onClick={onTest} disabled={cargando} style={{ ...btnStyle(C.ink, C.yellow), padding: "4px 10px", fontSize: 12, opacity: cargando ? 0.5 : 1 }}>Test</button>
    </div>
  );
}

function FilaTema({ t, sb, abiertos, toggleAbierto, marcado, toggleMarcado, cargando, onTest }) {
  const k = `t${t.n}`;
  const bl = bloquesDeTema(t.n);
  const s = statsDe(bl, sb);
  const abierto = abiertos.has(k);
  return (
    <div>
      <Fila nivel={0} e={estado(s)} s={s} titulo={`Tema ${t.n} · ${t.titulo}`} abierto={abierto} onAbrir={() => toggleAbierto(k)}
        cargando={cargando} onTest={() => onTest(bl, `Tema ${t.n} · ${t.titulo}`)}
        extra={<input type="checkbox" checked={marcado} onChange={toggleMarcado} aria-label={`Marcar tema ${t.n}`} style={{ width: 18, height: 18, flexShrink: 0 }} />} />
      {abierto && (
        <>
          {t.nodos.map((nd) => {
            const kn = `n${t.n}-${nd.id}`;
            const bn = bloquesDeNodo(t.n, nd.id);
            const sn = statsDe(bn, sb);
            const an = abiertos.has(kn);
            return (
              <div key={nd.id}>
                <Fila nivel={1} e={estado(sn)} s={sn} titulo={`${nd.id} · ${nd.epigrafe}`} abierto={an} onAbrir={() => toggleAbierto(kn)}
                  cargando={cargando} onTest={() => onTest(bn, `${nd.id} · ${nd.epigrafe}`)} />
                {an && nd.bloques.map((b) => {
                  const s3 = sb[b.id];
                  return <Fila key={b.id} nivel={2} e={estado(s3)} s={s3} titulo={b.titulo} sub={b.compartido ? `compartido · ${b.compartido}` : null}
                    cargando={cargando} onTest={() => onTest([b.id], b.titulo, Math.min(20, b.ids.length))} />;
                })}
              </div>
            );
          })}
          {t.compartidos.length > 0 && (() => {
            const kc = `c${t.n}`;
            const bc = t.compartidos.map((c) => c.id);
            const sc = statsDe(bc, sb);
            const ac = abiertos.has(kc);
            const temasOrigen = [...new Set(t.compartidos.map((c) => c.deTema))].join(", ");
            return (
              <div>
                <Fila nivel={1} e={estado(sc)} s={sc} titulo="Contenido compartido con otros temas" sub={`se estudia en el tema ${temasOrigen}`}
                  abierto={ac} onAbrir={() => toggleAbierto(kc)} cargando={cargando} onTest={() => onTest(bc, `Tema ${t.n} · contenido compartido`)} />
                {ac && t.compartidos.map((c) => {
                  const b = bloquePorId[c.id];
                  return <Fila key={c.id} nivel={2} e={estado(sb[c.id])} s={sb[c.id]} titulo={b.titulo} sub={`del tema ${c.deTema}`}
                    cargando={cargando} onTest={() => onTest([c.id], b.titulo, Math.min(20, b.ids.length))} />;
                })}
              </div>
            );
          })()}
        </>
      )}
    </div>
  );
}

/* ============ TEST EN CURSO ============ */
const fmtReloj = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

function Quiz({ quiz, onRespuesta, onTerminar, onSalir }) {
  const examen = quiz.modo === "examen";
  const total = quiz.preguntas.length;
  const [idx, setIdx] = useState(0);
  const [resp, setResp] = useState(() => Array(total).fill(undefined)); // undefined = sin contestar; null = en blanco (práctica)
  const [mostrado, setMostrado] = useState(false);
  const [confirmar, setConfirmar] = useState(false);
  const [restante, setRestante] = useState(quiz.limite);
  const respRef = useRef(resp);
  respRef.current = resp;
  const terminado = useRef(false);

  const entregar = () => {
    if (terminado.current) return;
    terminado.current = true;
    onTerminar(respRef.current.map((r) => (r === undefined ? null : r)));
  };

  useEffect(() => {
    if (!quiz.limite) return;
    const t = setInterval(() => {
      const quedan = Math.max(0, quiz.limite - Math.floor((Date.now() - quiz.inicio) / 1000));
      setRestante(quedan);
      if (quedan === 0) { clearInterval(t); entregar(); }
    }, 1000);
    return () => clearInterval(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const q = quiz.preguntas[idx];
  const elegida = resp[idx];

  const marcar = (i) => {
    if (examen) { const r = [...resp]; r[idx] = r[idx] === i ? undefined : i; setResp(r); return; }
    if (mostrado) return;
    const r = [...resp]; r[idx] = i; setResp(r); setMostrado(true);
    onRespuesta(q, i);
  };
  const siguiente = () => {
    if (idx + 1 >= total) { entregar(); return; }
    setIdx(idx + 1); setMostrado(false);
  };

  const contestadas = resp.filter((r) => r !== undefined && r !== null).length;
  const aciertosPractica = resp.filter((r, i) => r != null && r === quiz.preguntas[i].correcta).length;
  const b = bloquePorId[q.bloque];

  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", marginBottom: 8, fontSize: 13, color: C.inkSoft }}>
        <span style={{ fontWeight: 600, color: C.ink }}>{quiz.titulo}</span>
        <span>
          Pregunta {idx + 1} de {total} · {examen ? `contestadas ${contestadas}` : `aciertos ${aciertosPractica}`}
          {restante != null && <strong style={{ marginLeft: 10, color: restante < 300 ? C.red : C.ink, fontFamily: FONT_DISPLAY, fontSize: 18 }}>⏱ {fmtReloj(restante)}</strong>}
        </span>
      </div>
      <StripeBar pct={(100 * (examen ? contestadas : idx)) / total} color={C.steel} />
      <div style={{ marginTop: 12, fontSize: 11, letterSpacing: 0.5, textTransform: "uppercase", color: C.steel, fontWeight: 600 }}>
        Tema {q.tema} · {q.nodo}{b ? ` · ${b.titulo}` : ""}
      </div>
      <h3 style={{ fontSize: 17, margin: "6px 0 12px", lineHeight: 1.4 }}>{q.pregunta}</h3>
      <div style={{ display: "grid", gap: 8 }}>
        {q.opciones.map((op, i) => {
          let bg = "#fff", bd = C.line;
          if (examen && elegida === i) { bg = "#E8EFF2"; bd = C.steel; }
          if (!examen && mostrado) {
            if (i === q.correcta) { bg = "#E6F2EA"; bd = C.green; }
            else if (i === elegida) { bg = "#FBE9E7"; bd = C.red; }
          }
          return (
            <button key={i} onClick={() => marcar(i)} aria-pressed={elegida === i}
              style={{ textAlign: "left", padding: "11px 14px", border: `2px solid ${bd}`, borderRadius: 5, background: bg, fontSize: 15, lineHeight: 1.35, color: C.ink, fontFamily: FONT_BODY }}>
              <strong style={{ fontFamily: FONT_DISPLAY, marginRight: 8 }}>{LETRAS[i]})</strong>{op}
            </button>
          );
        })}
      </div>

      {!examen && !mostrado && (
        <button onClick={() => { const r = [...resp]; r[idx] = null; setResp(r); setMostrado(true); onRespuesta(q, null); }}
          style={{ ...btnStyle("transparent", C.inkSoft), border: `1px solid ${C.line}`, marginTop: 10, fontSize: 13, padding: "6px 12px" }}>
          No lo sé (en blanco)
        </button>
      )}
      {!examen && mostrado && (
        <div style={{ marginTop: 14 }}>
          <div style={{ background: "#F4F6F7", borderLeft: `4px solid ${elegida === q.correcta ? C.green : C.red}`, padding: "10px 12px", fontSize: 14 }}>
            <strong>{elegida === q.correcta ? "Correcta." : elegida == null ? `En blanco. Era la ${LETRAS[q.correcta]}).` : `Incorrecta. Era la ${LETRAS[q.correcta]}).`}</strong> {q.explicacion}
            {q.cita && <div style={{ marginTop: 8, fontSize: 13, color: C.inkSoft, fontStyle: "italic" }}>Temario: «{q.cita}»</div>}
          </div>
          <button onClick={siguiente} style={{ ...btnStyle(), marginTop: 12 }}>{idx + 1 >= total ? "Ver resultado" : "Siguiente"}</button>
        </div>
      )}

      {examen && (
        <>
          <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
            <button onClick={() => setIdx(Math.max(0, idx - 1))} disabled={idx === 0} style={{ ...btnStyle(C.steel), opacity: idx === 0 ? 0.4 : 1 }}>← Anterior</button>
            <button onClick={() => setIdx(Math.min(total - 1, idx + 1))} disabled={idx + 1 >= total} style={{ ...btnStyle(C.steel), opacity: idx + 1 >= total ? 0.4 : 1 }}>Siguiente →</button>
            <span style={{ flex: 1 }} />
            <button onClick={() => setConfirmar(true)} style={btnStyle()}>Entregar</button>
          </div>
          {confirmar && (
            <div style={{ marginTop: 12, padding: 12, background: "#FFF6DB", border: `1px solid ${C.yellow}`, borderRadius: 5, fontSize: 14 }}>
              Vas a entregar con {total - contestadas} pregunta{total - contestadas === 1 ? "" : "s"} en blanco. ¿Entregar ya?
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button onClick={entregar} style={btnStyle()}>Sí, entregar</button>
                <button onClick={() => setConfirmar(false)} style={{ ...btnStyle("transparent", C.inkSoft), border: `1px solid ${C.line}` }}>Seguir</button>
              </div>
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(34px, 1fr))", gap: 4, marginTop: 14 }}>
            {quiz.preguntas.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} aria-label={`Ir a la pregunta ${i + 1}`}
                style={{ padding: "5px 0", fontSize: 12, borderRadius: 3, border: `1px solid ${i === idx ? C.ink : C.line}`, background: resp[i] != null ? C.steel : "#fff", color: resp[i] != null ? "#fff" : C.ink, fontWeight: i === idx ? 700 : 400 }}>
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}

      <button onClick={onSalir} style={{ ...btnStyle("transparent", C.inkSoft), border: `1px solid ${C.line}`, marginTop: 14, fontSize: 12, padding: "6px 12px" }}>
        Abandonar {examen ? "(no se guarda)" : "(lo contestado ya cuenta)"}
      </button>
    </Card>
  );
}

/* ============ RESULTADO ============ */
function Resultado({ quiz, onVolver, onRepetir }) {
  const { aciertos, fallos, blancos, nota, porTema } = quiz.resultado;
  const total = quiz.preguntas.length;
  const examen100 = total === 100;
  const fallidas = quiz.preguntas.map((q, i) => ({ q, r: quiz.respuestas[i] })).filter(({ q, r }) => r !== q.correcta);
  const color = nota >= 8 ? C.green : nota >= 5 ? C.yellow : C.red;
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <Card style={{ textAlign: "center", borderTop: `6px solid ${color}` }}>
        <div style={{ fontSize: 13, color: C.inkSoft }}>{quiz.titulo}</div>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 64, lineHeight: 1.1 }}>{nota.toFixed(2).replace(".", ",")}</div>
        <div style={{ fontSize: 13, color: C.inkSoft, marginBottom: 8 }}>
          nota sobre 10 con penalización (−¼ de acierto por fallo){examen100 ? ` · ${(aciertos * 0.1 - fallos * 0.025).toFixed(3).replace(".", ",")} puntos de 10 en el baremo del examen` : ""}
        </div>
        <p style={{ fontSize: 16, margin: "4px 0 6px" }}>
          <strong style={{ color: C.green }}>{aciertos} aciertos</strong> · <strong style={{ color: C.red }}>{fallos} fallos</strong> · {blancos} en blanco
        </p>
        <p style={{ fontSize: 12, color: C.inkSoft, margin: "0 0 14px" }}>{quiz.guardado ? "Guardado en tu historial." : "Progreso guardado; el resumen del test no se pudo guardar."}</p>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
          {fallidas.length > 0 && <button onClick={() => onRepetir(fallidas.map(({ q }) => q.id))} style={btnStyle(C.steel)}>Repasar las {fallidas.length} falladas</button>}
          <button onClick={onVolver} style={btnStyle()}>Volver al temario</button>
        </div>
      </Card>

      {Object.keys(porTema).length > 1 && (
        <Card>
          <H2>Por tema</H2>
          {Object.entries(porTema).sort((a, b) => a[0] - b[0]).map(([t, v]) => (
            <div key={t} style={{ display: "grid", gridTemplateColumns: "1fr 120px 60px", gap: 10, alignItems: "center", fontSize: 14, padding: "4px 0" }}>
              <span>Tema {t} · {temaPorNumero[t]?.titulo}</span>
              <StripeBar pct={(100 * v.ok) / v.total} color={v.ok / v.total >= 0.8 ? C.green : v.ok / v.total >= 0.6 ? C.yellow : C.red} />
              <span style={{ textAlign: "right", color: C.inkSoft }}>{v.ok}/{v.total}</span>
            </div>
          ))}
        </Card>
      )}

      {quiz.modo === "examen" && fallidas.length > 0 && (
        <Card>
          <H2>Revisión de fallos y en blanco</H2>
          {fallidas.map(({ q, r }) => (
            <div key={q.id} style={{ borderTop: `1px solid ${C.line}`, padding: "10px 0", fontSize: 14 }}>
              <div style={{ fontSize: 11, color: C.steel, fontWeight: 600, textTransform: "uppercase" }}>Tema {q.tema} · {q.nodo}</div>
              <div style={{ fontWeight: 600, margin: "4px 0" }}>{q.pregunta}</div>
              {r != null && <div style={{ color: C.red }}>Tu respuesta: {LETRAS[r]}) {q.opciones[r]}</div>}
              <div style={{ color: C.green }}>Correcta: {LETRAS[q.correcta]}) {q.opciones[q.correcta]}</div>
              <div style={{ color: C.inkSoft, marginTop: 4 }}>{q.explicacion}</div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

/* ============ para el Panel ============ */
export function useEstadoTemas(progreso) {
  return useMemo(() => {
    const sb = statsBloques(progreso);
    return estructura.temas.map((t) => {
      const s = statsDe(bloquesDeTema(t.n), sb);
      return { n: t.n, titulo: t.titulo, s, e: estado(s) };
    });
  }, [progreso]);
}

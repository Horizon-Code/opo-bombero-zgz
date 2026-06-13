"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, CartesianGrid, ReferenceLine, Cell,
} from "recharts";
import {
  supabase, loginGoogle, logout,
  getTemas, addTema as dbAddTema, delTema as dbDelTema,
  getResultados, addResultado,
  getMarcas, addMarca, delMarca, getObjetivos, setObjetivo as dbSetObjetivo,
  getDiario, upsertDiario,
} from "../lib/supabase";

/* ============================================================
   OPO BOMBERO ZGZ — multiusuario (Supabase + Google login)
   ============================================================ */

const C = {
  bg: "#EEF0F1", panel: "#FFFFFF", ink: "#16191D", inkSoft: "#5A6168",
  line: "#D6DADD", red: "#D7372C", yellow: "#F5B700", steel: "#2E5E73", green: "#2E7D4F",
};
const FONT_DISPLAY = "'Saira Condensed', 'Arial Narrow', sans-serif";
const FONT_BODY = "'Barlow', system-ui, sans-serif";
const hazard = (h = 8) => ({
  height: h,
  background: `repeating-linear-gradient(135deg, ${C.yellow} 0 14px, ${C.ink} 14px 28px)`,
});

const fmtTime = (s) => {
  if (s == null || isNaN(s)) return "—";
  const m = Math.floor(s / 60);
  const sec = (s % 60).toFixed(s % 60 % 1 ? 1 : 0);
  return m > 0 ? `${m}:${String(sec).padStart(2, "0")}` : `${sec}s`;
};
const parseTime = (str) => {
  if (!str) return null;
  const t = String(str).trim().replace(",", ".");
  if (t.includes(":")) {
    const [m, s] = t.split(":");
    const v = parseInt(m, 10) * 60 + parseFloat(s || 0);
    return isNaN(v) ? null : v;
  }
  const v = parseFloat(t);
  return isNaN(v) ? null : v;
};
const hoy = () => new Date().toISOString().slice(0, 10);
const fmtFecha = (d) => { const [y, m, day] = String(d).split("-"); return `${day}/${m}/${y.slice(2)}`; };

const PRUEBAS = [
  { id: "r1500", nombre: "1.500 m", tipo: "tiempo", mejor: "menor", defObj: 315, hint: "mm:ss" },
  { id: "v100", nombre: "100 m lisos", tipo: "tiempo", mejor: "menor", defObj: 14, hint: "segundos" },
  { id: "nat", nombre: "Natación 100 m", tipo: "tiempo", mejor: "menor", defObj: 95, hint: "mm:ss" },
  { id: "dom", nombre: "Dominadas", tipo: "reps", mejor: "mayor", defObj: 10, hint: "repeticiones" },
  { id: "cuerda", nombre: "Cuerda 6 m", tipo: "tiempo", mejor: "menor", defObj: 12, hint: "segundos" },
  { id: "press", nombre: "Press banca 45 kg", tipo: "reps", mejor: "mayor", defObj: 20, hint: "repeticiones" },
];
const TIPOS_ENTRENO = ["Fuerza A", "Fuerza B", "Carrera", "Series", "Natación", "Circuito / cuerda", "Activo suave", "Descanso"];

/* ============================================================ */
export default function App() {
  const [user, setUser] = useState(undefined); // undefined = comprobando
  const [tab, setTab] = useState("panel");
  const [ready, setReady] = useState(false);

  const [temas, setTemas] = useState([]);
  const [resultados, setResultados] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [objetivos, setObjetivos] = useState({});
  const [diario, setDiario] = useState({});

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user || null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user || null));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [t, r, m, o, d] = await Promise.all([getTemas(), getResultados(), getMarcas(), getObjetivos(), getDiario()]);
      setTemas(t); setResultados(r); setMarcas(m); setObjetivos(o); setDiario(d);
      setReady(true);
    })();
  }, [user]);

  const statsTema = useMemo(() => {
    const map = {};
    temas.forEach((t) => (map[t.id] = { ok: 0, total: 0, tests: 0 }));
    resultados.forEach((r) => {
      Object.entries(r.por_tema || {}).forEach(([tid, v]) => {
        if (!map[tid]) map[tid] = { ok: 0, total: 0, tests: 0 };
        map[tid].ok += v.ok; map[tid].total += v.total; map[tid].tests += 1;
      });
    });
    return map;
  }, [temas, resultados]);

  /* ---- pantalla de login ---- */
  if (user === undefined) return <Centro texto="Comprobando sesión…" />;
  if (user === null)
    return (
      <div style={{ minHeight: "100vh", background: C.ink, fontFamily: FONT_BODY, display: "flex", flexDirection: "column" }}>
        <div style={hazard(10)} />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ textAlign: "center", maxWidth: 440 }}>
            <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 52, letterSpacing: 2, textTransform: "uppercase", color: "#fff", margin: 0, lineHeight: 1 }}>
              <span style={{ color: C.red }}>Opo</span> Bombero<br /><span style={{ color: C.yellow }}>Zaragoza</span>
            </h1>
            <p style={{ color: "#9AA3AA", fontSize: 16, margin: "16px 0 28px" }}>
              Entreno, estudio, marcas y tests con IA.<br />Tu parte de servicio diario hasta la plaza.
            </p>
            <button
              onClick={loginGoogle}
              style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fff", color: C.ink, border: "none", borderRadius: 6, padding: "13px 26px", fontSize: 16, fontWeight: 600, fontFamily: FONT_BODY, cursor: "pointer" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.94l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.16-3.16A11 11 0 0 0 12 1 11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z"/></svg>
              Entrar con Google
            </button>
          </div>
        </div>
        <div style={hazard(10)} />
      </div>
    );
  if (!ready) return <Centro texto="Cargando tu parte de servicio…" />;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: FONT_BODY, color: C.ink }}>
      <style>{`
        button { cursor: pointer; }
        input:focus, select:focus, textarea:focus, button:focus-visible { outline: 2px solid ${C.steel}; outline-offset: 1px; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      `}</style>
      <header style={{ background: C.ink, color: "#fff", padding: "14px 20px 10px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 30, letterSpacing: 1.5, textTransform: "uppercase", margin: 0 }}>
            <span style={{ color: C.red }}>Opo</span> Bombero <span style={{ color: C.yellow }}>ZGZ</span>
          </h1>
          <span style={{ fontSize: 12, color: "#9AA3AA", flex: 1 }}>PARTE DE SERVICIO · {fmtFecha(hoy())}</span>
          <span style={{ fontSize: 13, color: "#C8CED3" }}>{user.user_metadata?.name || user.email}</span>
          <button onClick={logout} style={{ background: "transparent", color: "#9AA3AA", border: "1px solid #3A4046", borderRadius: 4, padding: "4px 12px", fontSize: 12 }}>Salir</button>
        </div>
      </header>
      <div style={hazard(8)} />
      <nav style={{ maxWidth: 1000, margin: "0 auto", display: "flex", gap: 6, padding: "14px 16px 0", flexWrap: "wrap" }}>
        {[["panel", "Panel"], ["tests", "Temario y tests"], ["fisico", "Marcas físicas"], ["diario", "Diario"]].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)}
            style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 16, letterSpacing: 1, textTransform: "uppercase", padding: "8px 18px", border: `2px solid ${C.ink}`, background: tab === id ? C.ink : "transparent", color: tab === id ? C.yellow : C.ink, borderRadius: 4 }}>
            {label}
          </button>
        ))}
      </nav>
      <main style={{ maxWidth: 1000, margin: "0 auto", padding: "18px 16px 60px" }}>
        {tab === "panel" && <Panel temas={temas} statsTema={statsTema} resultados={resultados} marcas={marcas} objetivos={objetivos} diario={diario} />}
        {tab === "tests" && <Tests user={user} temas={temas} setTemas={setTemas} resultados={resultados} setResultados={setResultados} statsTema={statsTema} />}
        {tab === "fisico" && <Fisico user={user} marcas={marcas} setMarcas={setMarcas} objetivos={objetivos} setObjetivos={setObjetivos} />}
        {tab === "diario" && <Diario user={user} diario={diario} setDiario={setDiario} />}
      </main>
    </div>
  );
}

/* ============ base ============ */
function Centro({ texto }) {
  return <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT_BODY, color: C.inkSoft }}>{texto}</div>;
}
function Card({ children, style }) {
  return <section style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 6, padding: 18, ...style }}>{children}</section>;
}
function H2({ children }) {
  return (
    <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 20, letterSpacing: 1, textTransform: "uppercase", margin: "0 0 12px", display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ width: 14, height: 14, background: C.red, display: "inline-block" }} />{children}
    </h2>
  );
}
function StripeBar({ pct, color = C.red }) {
  const p = Math.max(0, Math.min(100, pct || 0));
  return (
    <div style={{ background: "#E3E6E8", borderRadius: 3, height: 14, overflow: "hidden", border: `1px solid ${C.line}` }}>
      <div style={{ width: `${p}%`, height: "100%", background: `repeating-linear-gradient(135deg, ${color} 0 10px, ${C.ink} 10px 20px)`, transition: "width .3s" }} />
    </div>
  );
}
function Vacio({ texto }) {
  return <p style={{ color: C.inkSoft, fontSize: 14, margin: 0, padding: "6px 0" }}>{texto}</p>;
}
const inputStyle = { padding: "8px 10px", border: `1px solid ${C.line}`, borderRadius: 4, fontSize: 14, background: "#fff", color: C.ink, fontFamily: FONT_BODY };
const btnStyle = (bg = C.red, fg = "#fff") => ({
  fontFamily: FONT_DISPLAY, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase",
  background: bg, color: fg, border: "none", borderRadius: 4, padding: "9px 18px", fontSize: 15,
});

/* ============ PANEL ============ */
function Panel({ temas, statsTema, resultados, marcas, objetivos, diario }) {
  const last7 = [...Array(7)].map((_, i) => { const d = new Date(); d.setDate(d.getDate() - i); return d.toISOString().slice(0, 10); });
  const entrenosSemana = last7.filter((d) => diario[d]?.entreno && diario[d].entreno !== "Descanso").length;
  const horasEstudio = last7.reduce((a, d) => a + (parseFloat(diario[d]?.estudio) || 0), 0);
  const suenos = last7.map((d) => parseFloat(diario[d]?.sueno)).filter((v) => !isNaN(v));
  const mediaSueno = suenos.length ? suenos.reduce((a, b) => a + b, 0) / suenos.length : null;

  let racha = 0;
  for (let i = 0; i <= 400; i++) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const e = diario[d.toISOString().slice(0, 10)];
    if (e && (e.entreno || parseFloat(e.estudio) > 0)) racha++;
    else if (i === 0) continue;
    else break;
  }

  const conDatos = temas
    .map((t) => ({ ...t, s: statsTema[t.id] }))
    .filter((t) => t.s && t.s.total > 0)
    .map((t) => ({ ...t, pct: Math.round((t.s.ok / t.s.total) * 100) }))
    .sort((a, b) => a.pct - b.pct);

  const resumenMarcas = PRUEBAS.map((p) => {
    const entries = marcas.filter((e) => e.prueba === p.id).sort((a, b) => String(a.fecha).localeCompare(String(b.fecha)));
    const last = entries[entries.length - 1];
    const obj = objetivos[p.id] ?? p.defObj;
    const pct = last ? (p.mejor === "mayor" ? (Number(last.valor) / obj) * 100 : (obj / Number(last.valor)) * 100) : null;
    return { ...p, last, obj, pct };
  });

  const mediaGlobal = (() => {
    let ok = 0, tot = 0;
    resultados.forEach((r) => { ok += r.aciertos; tot += r.preguntas; });
    return tot ? Math.round((ok / tot) * 100) : null;
  })();

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 }}>
        {[
          { label: "Racha activa", value: `${racha} d`, color: C.red },
          { label: "Entrenos / 7 días", value: `${entrenosSemana} / 6`, color: C.steel },
          { label: "Estudio / 7 días", value: `${horasEstudio.toFixed(1)} h`, color: C.steel },
          { label: "Sueño medio", value: mediaSueno ? `${mediaSueno.toFixed(1)} h` : "—", color: mediaSueno && mediaSueno < 7 ? C.red : C.green },
          { label: "Media tests", value: mediaGlobal != null ? `${mediaGlobal}%` : "—", color: C.ink },
        ].map((s) => (
          <Card key={s.label} style={{ padding: 14, borderTop: `4px solid ${s.color}` }}>
            <div style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: C.inkSoft }}>{s.label}</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 34, lineHeight: 1.1 }}>{s.value}</div>
          </Card>
        ))}
      </div>

      <Card>
        <H2>Estado de las pruebas físicas</H2>
        {marcas.length === 0 ? (
          <Vacio texto="Aún no hay marcas registradas. Ve a «Marcas físicas» y apunta tu primer test de cada prueba: esa será tu línea de salida." />
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {resumenMarcas.filter((p) => p.last).map((p) => (
              <div key={p.id} style={{ display: "grid", gridTemplateColumns: "150px 1fr 130px", gap: 10, alignItems: "center" }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{p.nombre}</div>
                <StripeBar pct={p.pct} color={p.pct >= 100 ? C.green : p.pct >= 80 ? C.yellow : C.red} />
                <div style={{ fontSize: 13, color: C.inkSoft, textAlign: "right" }}>
                  {p.tipo === "tiempo" ? fmtTime(Number(p.last.valor)) : Number(p.last.valor)} / obj. {p.tipo === "tiempo" ? fmtTime(p.obj) : p.obj}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
        <Card>
          <H2>Temas que piden refuerzo</H2>
          {conDatos.length === 0 ? (
            <Vacio texto="Sin tests todavía. Sube tu primer tema en «Temario y tests» y genera un examen para empezar a medir." />
          ) : (
            conDatos.slice(0, 5).map((t) => (
              <div key={t.id} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${C.line}`, fontSize: 14 }}>
                <span>{t.nombre}</span>
                <strong style={{ color: t.pct < 60 ? C.red : t.pct < 80 ? "#B07F00" : C.green }}>{t.pct}%</strong>
              </div>
            ))
          )}
        </Card>
        <Card>
          <H2>Evolución global en tests</H2>
          {resultados.length < 2 ? (
            <Vacio texto="Con dos o más tests hechos verás aquí tu curva de progreso." />
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={resultados.map((r, i) => ({ n: i + 1, pct: Math.round((r.aciertos / r.preguntas) * 100) }))}>
                <CartesianGrid stroke={C.line} strokeDasharray="3 3" />
                <XAxis dataKey="n" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v) => `${v}%`} labelFormatter={(l) => `Test ${l}`} />
                <ReferenceLine y={80} stroke={C.green} strokeDasharray="4 4" />
                <Line type="monotone" dataKey="pct" stroke={C.red} strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>
    </div>
  );
}

/* ============ TEMARIO Y TESTS ============ */
function Tests({ user, temas, setTemas, resultados, setResultados, statsTema }) {
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoContenido, setNuevoContenido] = useState("");
  const [verTema, setVerTema] = useState(null);
  const [selTema, setSelTema] = useState("");
  const [nPreg, setNPreg] = useState(10);
  const [generando, setGenerando] = useState(false);
  const [error, setError] = useState("");
  const [quiz, setQuiz] = useState(null);

  const addTema = async () => {
    if (!nuevoNombre.trim() || !nuevoContenido.trim()) return;
    const t = await dbAddTema(nuevoNombre.trim(), nuevoContenido, user.id);
    if (t) { setTemas([...temas, t]); setNuevoNombre(""); setNuevoContenido(""); }
  };
  const delTema = async (id) => { await dbDelTema(id); setTemas(temas.filter((t) => t.id !== id)); };

  async function generar() {
    setError("");
    const pool = selTema === "MIX" ? temas : temas.filter((t) => t.id === selTema);
    if (pool.length === 0) { setError("Selecciona un tema (o sube uno primero)."); return; }
    setGenerando(true);
    try {
      const resp = await fetch("/api/generate-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ temas: pool.map(({ id, nombre, contenido }) => ({ id, nombre, contenido })), nPreguntas: nPreg }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "error");
      setQuiz({ preguntas: data.preguntas, idx: 0, respuestas: [], mostrado: false });
    } catch (e) {
      setError(e.message === "error" ? "No se pudo generar el test. Inténtalo de nuevo." : e.message);
    }
    setGenerando(false);
  }

  function responder(i) {
    if (quiz.mostrado) return;
    setQuiz({ ...quiz, respuestas: [...quiz.respuestas, i], mostrado: true });
  }
  async function siguiente() {
    if (quiz.idx + 1 >= quiz.preguntas.length) {
      const por_tema = {};
      quiz.preguntas.forEach((p, i) => {
        const tid = p.tema_id || selTema;
        if (!por_tema[tid]) por_tema[tid] = { ok: 0, total: 0 };
        por_tema[tid].total++;
        if (quiz.respuestas[i] === p.correcta) por_tema[tid].ok++;
      });
      const aciertos = quiz.preguntas.filter((p, i) => quiz.respuestas[i] === p.correcta).length;
      const r = await addResultado({ fecha: hoy(), preguntas: quiz.preguntas.length, aciertos, por_tema }, user.id);
      if (r) setResultados([...resultados, r]);
      setQuiz({ ...quiz, terminado: true, aciertos });
    } else {
      setQuiz({ ...quiz, idx: quiz.idx + 1, mostrado: false });
    }
  }

  const barData = temas
    .map((t) => {
      const s = statsTema[t.id];
      return s && s.total > 0 ? { nombre: t.nombre.length > 14 ? t.nombre.slice(0, 13) + "…" : t.nombre, pct: Math.round((s.ok / s.total) * 100) } : null;
    })
    .filter(Boolean);

  if (quiz && !quiz.terminado) {
    const p = quiz.preguntas[quiz.idx];
    const elegida = quiz.respuestas[quiz.idx];
    return (
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 13, color: C.inkSoft }}>
          <span>Pregunta {quiz.idx + 1} de {quiz.preguntas.length}</span>
          <span>Aciertos: {quiz.preguntas.slice(0, quiz.idx).filter((q, i) => quiz.respuestas[i] === q.correcta).length}</span>
        </div>
        <StripeBar pct={(quiz.idx / quiz.preguntas.length) * 100} color={C.steel} />
        <h3 style={{ fontSize: 17, margin: "16px 0 12px", lineHeight: 1.4 }}>{p.pregunta}</h3>
        <div style={{ display: "grid", gap: 8 }}>
          {p.opciones.map((op, i) => {
            let bg = "#fff", bd = C.line;
            if (quiz.mostrado) {
              if (i === p.correcta) { bg = "#E6F2EA"; bd = C.green; }
              else if (i === elegida) { bg = "#FBE9E7"; bd = C.red; }
            }
            return (
              <button key={i} onClick={() => responder(i)}
                style={{ textAlign: "left", padding: "11px 14px", border: `2px solid ${bd}`, borderRadius: 5, background: bg, fontSize: 15, lineHeight: 1.35, color: C.ink, fontFamily: FONT_BODY }}>
                <strong style={{ fontFamily: FONT_DISPLAY, marginRight: 8 }}>{"ABCD"[i]}</strong>{op}
              </button>
            );
          })}
        </div>
        {quiz.mostrado && (
          <div style={{ marginTop: 14 }}>
            <p style={{ background: "#F4F6F7", borderLeft: `4px solid ${C.steel}`, padding: "10px 12px", fontSize: 14, margin: "0 0 12px" }}>{p.explicacion}</p>
            <button onClick={siguiente} style={btnStyle()}>{quiz.idx + 1 >= quiz.preguntas.length ? "Ver resultado" : "Siguiente"}</button>
          </div>
        )}
        <button onClick={() => setQuiz(null)} style={{ ...btnStyle("transparent", C.inkSoft), border: `1px solid ${C.line}`, marginTop: 14, fontSize: 12, padding: "6px 12px" }}>
          Abandonar test
        </button>
      </Card>
    );
  }

  if (quiz && quiz.terminado) {
    const pct = Math.round((quiz.aciertos / quiz.preguntas.length) * 100);
    return (
      <Card style={{ textAlign: "center", borderTop: `6px solid ${pct >= 80 ? C.green : pct >= 60 ? C.yellow : C.red}` }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 64 }}>{pct}%</div>
        <p style={{ fontSize: 16, margin: "4px 0 18px" }}>{quiz.aciertos} de {quiz.preguntas.length} aciertos · resultado guardado en tus estadísticas</p>
        <button onClick={() => setQuiz(null)} style={btnStyle()}>Volver al temario</button>
      </Card>
    );
  }

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <Card>
        <H2>Generar test</H2>
        {temas.length === 0 ? (
          <Vacio texto="Primero sube al menos un tema más abajo. Cuando tengas el temario oficial, pega el contenido de cada tema y la aplicación generará exámenes de él." />
        ) : (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <select value={selTema} onChange={(e) => setSelTema(e.target.value)} style={{ ...inputStyle, minWidth: 220 }}>
              <option value="">Elige tema…</option>
              <option value="MIX">EXAMEN MIXTO (todos los temas)</option>
              {temas.map((t) => <option key={t.id} value={t.id}>{t.nombre}</option>)}
            </select>
            <select value={nPreg} onChange={(e) => setNPreg(+e.target.value)} style={inputStyle}>
              {[5, 10, 15, 20].map((n) => <option key={n} value={n}>{n} preguntas</option>)}
            </select>
            <button onClick={generar} disabled={generando} style={{ ...btnStyle(), opacity: generando ? 0.6 : 1 }}>
              {generando ? "Generando…" : "Generar test"}
            </button>
          </div>
        )}
        {error && <p style={{ color: C.red, fontSize: 14, marginTop: 10 }}>{error}</p>}
      </Card>

      {barData.length > 0 && (
        <Card>
          <H2>Rendimiento por tema</H2>
          <ResponsiveContainer width="100%" height={Math.max(160, barData.length * 42)}>
            <BarChart data={barData} layout="vertical" margin={{ left: 10, right: 30 }}>
              <CartesianGrid stroke={C.line} strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="nombre" width={120} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v) => `${v}%`} />
              <ReferenceLine x={80} stroke={C.green} strokeDasharray="4 4" />
              <Bar dataKey="pct" radius={[0, 3, 3, 0]}>
                {barData.map((d, i) => <Cell key={i} fill={d.pct >= 80 ? C.green : d.pct >= 60 ? C.yellow : C.red} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}

      <Card>
        <H2>Mi temario ({temas.length} temas)</H2>
        {temas.map((t) => {
          const s = statsTema[t.id];
          const pct = s && s.total ? Math.round((s.ok / s.total) * 100) : null;
          return (
            <div key={t.id} style={{ borderBottom: `1px solid ${C.line}`, padding: "10px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <strong style={{ fontSize: 15 }}>{t.nombre}</strong>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: C.inkSoft }}>
                    {s && s.total ? `${s.tests} tests · ${pct}% acierto` : "sin tests aún"} · {(t.contenido.length / 1000).toFixed(1)}k caracteres
                  </span>
                  <button onClick={() => setVerTema(verTema === t.id ? null : t.id)} style={{ ...btnStyle(C.steel), padding: "4px 10px", fontSize: 12 }}>
                    {verTema === t.id ? "Cerrar" : "Ver"}
                  </button>
                  <button onClick={() => delTema(t.id)} style={{ ...btnStyle("transparent", C.red), border: `1px solid ${C.red}`, padding: "4px 10px", fontSize: 12 }}>
                    Borrar
                  </button>
                </div>
              </div>
              {verTema === t.id && (
                <p style={{ fontSize: 13, color: C.inkSoft, maxHeight: 160, overflow: "auto", background: "#F7F8F9", padding: 10, borderRadius: 4, whiteSpace: "pre-wrap" }}>
                  {t.contenido.slice(0, 3000)}{t.contenido.length > 3000 ? "…" : ""}
                </p>
              )}
            </div>
          );
        })}
        <div style={{ marginTop: 14, display: "grid", gap: 8 }}>
          <input value={nuevoNombre} onChange={(e) => setNuevoNombre(e.target.value)} placeholder="Nombre del tema (ej. Química del fuego)" style={inputStyle} />
          <textarea value={nuevoContenido} onChange={(e) => setNuevoContenido(e.target.value)} placeholder="Pega aquí el contenido del tema (texto del temario oficial, apuntes, resúmenes…)" rows={5} style={{ ...inputStyle, resize: "vertical" }} />
          <button onClick={addTema} style={{ ...btnStyle(C.ink, C.yellow), justifySelf: "start" }}>Añadir tema</button>
        </div>
      </Card>
    </div>
  );
}

/* ============ MARCAS FÍSICAS ============ */
function Fisico({ user, marcas, setMarcas, objetivos, setObjetivos }) {
  const [prueba, setPrueba] = useState(PRUEBAS[0].id);
  const [valor, setValor] = useState("");
  const [fecha, setFecha] = useState(hoy());
  const [editObj, setEditObj] = useState("");

  const cfg = PRUEBAS.find((p) => p.id === prueba);
  const obj = objetivos[prueba] ?? cfg.defObj;
  const entries = marcas.filter((e) => e.prueba === prueba).sort((a, b) => String(a.fecha).localeCompare(String(b.fecha)));

  const add = async () => {
    const v = cfg.tipo === "tiempo" ? parseTime(valor) : parseFloat(valor);
    if (v == null || isNaN(v) || v <= 0) return;
    const m = await addMarca({ prueba, valor: v, fecha }, user.id);
    if (m) { setMarcas([...marcas, m]); setValor(""); }
  };
  const del = async (id) => { await delMarca(id); setMarcas(marcas.filter((e) => e.id !== id)); };
  const cambiarObjetivo = async () => {
    const v = cfg.tipo === "tiempo" ? parseTime(editObj) : parseFloat(editObj);
    if (v == null || isNaN(v) || v <= 0) return;
    await dbSetObjetivo(prueba, v, user.id);
    setObjetivos({ ...objetivos, [prueba]: v });
    setEditObj("");
  };

  const chartData = entries.map((e) => ({ fecha: fmtFecha(e.fecha), valor: Number(e.valor) }));

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <Card>
        <H2>Registrar marca</H2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <select value={prueba} onChange={(e) => setPrueba(e.target.value)} style={inputStyle}>
            {PRUEBAS.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
          </select>
          <input value={valor} onChange={(e) => setValor(e.target.value)} placeholder={cfg.hint} style={{ ...inputStyle, width: 130 }} />
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} style={inputStyle} />
          <button onClick={add} style={btnStyle()}>Guardar</button>
        </div>
        <div style={{ marginTop: 12, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", fontSize: 14 }}>
          <span style={{ color: C.inkSoft }}>
            Objetivo actual: <strong style={{ color: C.ink }}>{cfg.tipo === "tiempo" ? fmtTime(obj) : obj}</strong>{" "}
            ({cfg.mejor === "menor" ? "menos es mejor" : "más es mejor"})
          </span>
          <input value={editObj} onChange={(e) => setEditObj(e.target.value)} placeholder="Nuevo objetivo" style={{ ...inputStyle, width: 130 }} />
          <button onClick={cambiarObjetivo} style={{ ...btnStyle(C.steel), padding: "6px 12px", fontSize: 13 }}>Cambiar objetivo</button>
        </div>
        <p style={{ fontSize: 12, color: C.inkSoft, marginTop: 8 }}>
          Los objetivos por defecto son orientativos. Cuando se publiquen las bases en el BOPZ, ajústalos a las marcas oficiales con margen por encima.
        </p>
      </Card>

      <Card>
        <H2>Progreso · {cfg.nombre}</H2>
        {entries.length < 2 ? (
          <Vacio texto="Registra al menos dos marcas de esta prueba para ver tu curva." />
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData}>
              <CartesianGrid stroke={C.line} strokeDasharray="3 3" />
              <XAxis dataKey="fecha" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={["auto", "auto"]} tickFormatter={(v) => (cfg.tipo === "tiempo" ? fmtTime(v) : v)} width={55} />
              <Tooltip formatter={(v) => (cfg.tipo === "tiempo" ? fmtTime(v) : v)} />
              <ReferenceLine y={obj} stroke={C.green} strokeDasharray="5 4" label={{ value: "objetivo", fontSize: 11, fill: C.green }} />
              <Line type="monotone" dataKey="valor" stroke={C.red} strokeWidth={2.5} dot={{ r: 3.5 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
        {entries.length > 0 && (
          <div style={{ marginTop: 10 }}>
            {entries.slice().reverse().slice(0, 6).map((e) => (
              <div key={e.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "5px 0", borderBottom: `1px solid ${C.line}` }}>
                <span>{fmtFecha(e.fecha)} — <strong>{cfg.tipo === "tiempo" ? fmtTime(Number(e.valor)) : Number(e.valor)}</strong></span>
                <button onClick={() => del(e.id)} style={{ background: "none", border: "none", color: C.red, fontSize: 12 }}>borrar</button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

/* ============ DIARIO ============ */
function Diario({ user, diario, setDiario }) {
  const [fecha, setFecha] = useState(hoy());
  const e = diario[fecha] || {};

  const set = (campo, valor) => {
    const nuevo = { ...e, [campo]: valor };
    setDiario({ ...diario, [fecha]: nuevo });
    // guardado optimista con upsert
    upsertDiario(fecha, {
      entreno: nuevo.entreno || null,
      estudio: nuevo.estudio === "" || nuevo.estudio == null ? null : parseFloat(nuevo.estudio),
      sueno: nuevo.sueno === "" || nuevo.sueno == null ? null : parseFloat(nuevo.sueno),
      peso: nuevo.peso === "" || nuevo.peso == null ? null : parseFloat(nuevo.peso),
      creatina: !!nuevo.creatina,
      notas: nuevo.notas || null,
    }, user.id);
  };

  const ultimos = Object.keys(diario).sort().reverse().slice(0, 7);
  const pesos = Object.entries(diario)
    .filter(([, v]) => parseFloat(v.peso))
    .map(([f, v]) => ({ fecha: fmtFecha(f), peso: parseFloat(v.peso), raw: f }))
    .sort((a, b) => a.raw.localeCompare(b.raw));

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <Card>
        <H2>Parte del día</H2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 12 }}>
          <label style={{ display: "grid", gap: 4, fontSize: 13, fontWeight: 600 }}>
            Fecha
            <input type="date" value={fecha} onChange={(ev) => setFecha(ev.target.value)} style={inputStyle} />
          </label>
          <label style={{ display: "grid", gap: 4, fontSize: 13, fontWeight: 600 }}>
            Entreno realizado
            <select value={e.entreno || ""} onChange={(ev) => set("entreno", ev.target.value)} style={inputStyle}>
              <option value="">— sin registrar —</option>
              {TIPOS_ENTRENO.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </label>
          <label style={{ display: "grid", gap: 4, fontSize: 13, fontWeight: 600 }}>
            Horas de estudio
            <input type="number" step="0.5" min="0" value={e.estudio ?? ""} onChange={(ev) => set("estudio", ev.target.value)} style={inputStyle} placeholder="2.5" />
          </label>
          <label style={{ display: "grid", gap: 4, fontSize: 13, fontWeight: 600 }}>
            Horas de sueño
            <input type="number" step="0.5" min="0" value={e.sueno ?? ""} onChange={(ev) => set("sueno", ev.target.value)} style={inputStyle} placeholder="7.5" />
          </label>
          <label style={{ display: "grid", gap: 4, fontSize: 13, fontWeight: 600 }}>
            Peso (kg)
            <input type="number" step="0.1" min="0" value={e.peso ?? ""} onChange={(ev) => set("peso", ev.target.value)} style={inputStyle} placeholder="78.4" />
          </label>
          <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13, fontWeight: 600, marginTop: 18 }}>
            <input type="checkbox" checked={!!e.creatina} onChange={(ev) => set("creatina", ev.target.checked)} style={{ width: 18, height: 18 }} />
            Creatina tomada (5 g)
          </label>
        </div>
        <label style={{ display: "grid", gap: 4, fontSize: 13, fontWeight: 600, marginTop: 12 }}>
          Notas (sensaciones, dolores, qué tema estudiaste…)
          <textarea rows={2} value={e.notas || ""} onChange={(ev) => set("notas", ev.target.value)} style={{ ...inputStyle, resize: "vertical" }} />
        </label>
        <p style={{ fontSize: 12, color: C.inkSoft, marginTop: 8 }}>Se guarda automáticamente al editar.</p>
      </Card>

      {pesos.length >= 2 && (
        <Card>
          <H2>Evolución del peso</H2>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={pesos}>
              <CartesianGrid stroke={C.line} strokeDasharray="3 3" />
              <XAxis dataKey="fecha" tick={{ fontSize: 11 }} />
              <YAxis domain={["auto", "auto"]} tick={{ fontSize: 11 }} width={40} />
              <Tooltip />
              <Line type="monotone" dataKey="peso" stroke={C.steel} strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      )}

      <Card>
        <H2>Últimos partes</H2>
        {ultimos.length === 0 ? (
          <Vacio texto="Aún no hay días registrados." />
        ) : (
          ultimos.map((f) => {
            const d = diario[f];
            return (
              <div key={f} style={{ display: "flex", gap: 12, flexWrap: "wrap", fontSize: 13.5, padding: "7px 0", borderBottom: `1px solid ${C.line}` }}>
                <strong style={{ minWidth: 70 }}>{fmtFecha(f)}</strong>
                <span style={{ color: d.entreno && d.entreno !== "Descanso" ? C.ink : C.inkSoft }}>🏋 {d.entreno || "—"}</span>
                <span>📚 {d.estudio || 0} h</span>
                <span style={{ color: parseFloat(d.sueno) < 7 ? C.red : C.ink }}>😴 {d.sueno || "—"} h</span>
                {d.peso && <span>⚖ {d.peso} kg</span>}
                {d.creatina && <span style={{ color: C.green }}>✓ creatina</span>}
              </div>
            );
          })
        )}
      </Card>
    </div>
  );
}

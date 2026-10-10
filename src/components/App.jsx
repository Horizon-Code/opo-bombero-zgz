"use client";
import React, { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, ReferenceLine,
} from "recharts";
import {
  supabase, loginGoogle, logout,
  getResultados,
  getMarcas, addMarca, delMarca, getObjetivos, setObjetivo as dbSetObjetivo,
  getDiario, upsertDiario, getProgreso,
} from "../lib/supabase";
import { Temario, useEstadoTemas } from "./Temario";
import { C, FONT_DISPLAY, FONT_BODY, hazard, hoy, fmtFecha, fechaLocal, Centro, Card, H2, StripeBar, Vacio, Bolita, inputStyle, btnStyle } from "./ui";
import { puntosBaremo, fmtPuntos, notaFisicaProyectada, BAREMO } from "../lib/baremo";

/* ============================================================
   OPO BOMBERO ZGZ — multiusuario (Supabase + Google login)
   ============================================================ */

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
// Objetivos por defecto alineados al plan v2 y al baremo oficial (Anexo III)
const PRUEBAS = [
  { id: "r1500", nombre: "1.500 m", tipo: "tiempo", mejor: "menor", defObj: 268, hint: "mm:ss" }, // 4:28 = 10 pts
  { id: "cuerda", nombre: "Cuerda 6 m", tipo: "tiempo", mejor: "menor", defObj: 6, hint: "segundos" }, // 8 pts
  { id: "nat", nombre: "Natación 100 m", tipo: "tiempo", mejor: "menor", defObj: 76, hint: "mm:ss" }, // 1:16 ≈ 7,5 pts
  { id: "agi", nombre: "Agilidad (conos y vallas)", tipo: "tiempo", mejor: "menor", defObj: 8.2, hint: "segundos" }, // 10 pts
  { id: "v100", nombre: "100 m lisos (entreno)", tipo: "tiempo", mejor: "menor", defObj: 14, hint: "segundos" },
  { id: "dom", nombre: "Dominadas", tipo: "reps", mejor: "mayor", defObj: 10, hint: "repeticiones" },
  { id: "press", nombre: "Press banca 45 kg", tipo: "reps", mejor: "mayor", defObj: 20, hint: "repeticiones" },
];
// Semana tipo del plan v2
const TIPOS_ENTRENO = [
  "Carrera calidad (VO2/ritmo)", "Series umbral", "Fuerza tracción + cuerda",
  "Fuerza pierna + core", "Natación", "Combinado sábado", "Bici Z2",
  "Descanso activo", "Descanso",
];

/* ============================================================ */
export default function App() {
  const [user, setUser] = useState(undefined); // undefined = comprobando
  const [tab, setTab] = useState("panel");
  const [ready, setReady] = useState(false);

  const [resultados, setResultados] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [objetivos, setObjetivos] = useState({});
  const [diario, setDiario] = useState({});
  const [progreso, setProgreso] = useState({});

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user || null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user || null));
    return () => sub.subscription.unsubscribe();
  }, []);

  const [errorCarga, setErrorCarga] = useState(false);
  const [intentoCarga, setIntentoCarga] = useState(0);

  useEffect(() => {
    if (!user) return;
    let cancelado = false;
    (async () => {
      try {
        setErrorCarga(false);
        const [r, m, o, d, pg] = await Promise.all([getResultados(), getMarcas(), getObjetivos(), getDiario(), getProgreso()]);
        if (cancelado) return;
        setResultados(r); setMarcas(m); setObjetivos(o); setDiario(d); setProgreso(pg);
        setReady(true);
      } catch (e) {
        console.error("Carga inicial:", e);
        if (!cancelado) setErrorCarga(true);
      }
    })();
    return () => { cancelado = true; };
  }, [user, intentoCarga]);

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
              Entreno, estudio, marcas y el temario oficial en 27.425 preguntas.<br />Tu parte de servicio diario hasta la plaza.
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
  if (errorCarga)
    return (
      <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT_BODY, padding: 20 }}>
        <div style={{ textAlign: "center", maxWidth: 420 }}>
          <p style={{ color: C.red, fontWeight: 700, fontSize: 17, margin: "0 0 6px" }}>No se pudo cargar tus datos</p>
          <p style={{ color: C.inkSoft, fontSize: 14, margin: "0 0 16px" }}>
            Suele pasar cuando el proyecto de Supabase (plan gratuito) se ha pausado por inactividad.
            Entra en el dashboard de Supabase, pulsa «Restore», espera ~1 min y reintenta.
          </p>
          <button onClick={() => setIntentoCarga((n) => n + 1)} style={btnStyle()}>Reintentar</button>
        </div>
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
        {tab === "panel" && <Panel progreso={progreso} resultados={resultados} marcas={marcas} objetivos={objetivos} diario={diario} irATemario={() => setTab("tests")} />}
        {tab === "tests" && <Temario user={user} progreso={progreso} setProgreso={setProgreso} resultados={resultados} setResultados={setResultados} />}
        {tab === "fisico" && <Fisico user={user} marcas={marcas} setMarcas={setMarcas} objetivos={objetivos} setObjetivos={setObjetivos} />}
        {tab === "diario" && <Diario user={user} diario={diario} setDiario={setDiario} />}
      </main>
    </div>
  );
}

/* ============ PANEL ============ */
function Panel({ progreso, resultados, marcas, objetivos, diario, irATemario }) {
  const last7 = [...Array(7)].map((_, i) => fechaLocal(-i));
  const entrenosSemana = last7.filter((d) => diario[d]?.entreno && !diario[d].entreno.startsWith("Descanso")).length;
  const horasEstudio = last7.reduce((a, d) => a + (parseFloat(diario[d]?.estudio) || 0), 0);
  const suenos = last7.map((d) => parseFloat(diario[d]?.sueno)).filter((v) => !isNaN(v));
  const mediaSueno = suenos.length ? suenos.reduce((a, b) => a + b, 0) / suenos.length : null;

  let racha = 0;
  for (let i = 0; i <= 400; i++) {
    const e = diario[fechaLocal(-i)];
    if (e && (e.entreno || parseFloat(e.estudio) > 0)) racha++;
    else if (i === 0) continue;
    else break;
  }

  // Temas empezados con peor acierto: los que piden refuerzo
  const estadoTemas = useEstadoTemas(progreso);
  const conDatos = estadoTemas.filter((t) => t.s.vistas > 0).sort((a, b) => a.e.acierto - b.e.acierto || a.e.pct - b.e.pct);
  const sinEmpezar = estadoTemas.filter((t) => t.s.vistas === 0).length;

  const resumenMarcas = PRUEBAS.map((p) => {
    const entries = marcas.filter((e) => e.prueba === p.id).sort((a, b) => String(a.fecha).localeCompare(String(b.fecha)));
    const last = entries[entries.length - 1];
    const obj = objetivos[p.id] ?? p.defObj;
    const pct = last ? (p.mejor === "mayor" ? (Number(last.valor) / obj) * 100 : (obj / Number(last.valor)) * 100) : null;
    return { ...p, last, obj, pct };
  });

  const soloTests = resultados.filter((r) => r.origen !== "repaso");
  const mediaGlobal = (() => {
    let ok = 0, tot = 0;
    soloTests.forEach((r) => { ok += r.aciertos; tot += r.preguntas; });
    return tot ? Math.round((ok / tot) * 100) : null;
  })();

  // Nota física proyectada según baremo oficial (mejor marca de cada prueba oficial)
  const notaFisica = notaFisicaProyectada(marcas);

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 }}>
        {[
          { label: "Racha activa", value: `${racha} d`, color: C.red },
          { label: "Entrenos / 7 días", value: `${entrenosSemana} / 6`, color: C.steel },
          { label: "Estudio / 7 días", value: `${horasEstudio.toFixed(1)} h`, color: C.steel },
          { label: "Sueño medio", value: mediaSueno ? `${mediaSueno.toFixed(1)} h` : "—", color: mediaSueno && mediaSueno < 7 ? C.red : C.green },
          { label: "Media tests", value: mediaGlobal != null ? `${mediaGlobal}%` : "—", color: C.ink },
          { label: `Nota física (${notaFisica.pruebasConDatos}/4 pruebas)`, value: notaFisica.media != null ? notaFisica.media.toFixed(2).replace(".", ",") : "—", color: notaFisica.algunNoApto ? C.red : notaFisica.media >= 8 ? C.green : C.steel },
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
                  {(() => { const pts = puntosBaremo(p.id, Number(p.last.valor)); const f = fmtPuntos(pts); return f ? <strong style={{ color: pts === 0 ? C.red : pts >= 8 ? C.green : C.ink, marginLeft: 6 }}>· {f}</strong> : null; })()}
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
            <Vacio texto="Sin tests todavía. Ve a «Temario y tests» y haz tu primer test: las bolitas de cada tema se irán coloreando." />
          ) : (
            <>
              {conDatos.slice(0, 5).map((t) => (
                <div key={t.n} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: `1px solid ${C.line}`, fontSize: 14 }}>
                  <Bolita e={t.e} />
                  <span style={{ flex: 1 }}>Tema {t.n} · {t.titulo}</span>
                  <span style={{ color: C.inkSoft, fontSize: 12 }}>acierto {t.e.acierto} %</span>
                  <strong>{t.e.pct} %</strong>
                </div>
              ))}
              {sinEmpezar > 0 && <p style={{ fontSize: 12, color: C.inkSoft, margin: "8px 0 0" }}>{sinEmpezar} tema{sinEmpezar > 1 ? "s" : ""} sin empezar.</p>}
            </>
          )}
          <button onClick={irATemario} style={{ ...btnStyle(C.ink, C.yellow), marginTop: 10, fontSize: 13, padding: "6px 12px" }}>Ir al temario</button>
        </Card>
        <Card>
          <H2>Evolución global en tests</H2>
          {soloTests.length < 2 ? (
            <Vacio texto="Con dos o más tests hechos verás aquí tu curva de progreso." />
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={soloTests.map((r, i) => ({ n: i + 1, pct: Math.round((r.aciertos / r.preguntas) * 100) }))}>
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
        {(() => {
          // Calculadora de baremo en vivo: puntos de la marca que se está escribiendo
          if (!BAREMO[prueba]) return null;
          const v = cfg.tipo === "tiempo" ? parseTime(valor) : parseFloat(valor);
          if (v == null || isNaN(v) || v <= 0) return (
            <p style={{ fontSize: 12, color: C.inkSoft, marginTop: 8 }}>Prueba oficial con baremo: escribe una marca y verás sus puntos (5–10) según el Anexo III.</p>
          );
          const pts = puntosBaremo(prueba, v);
          return (
            <p style={{ fontSize: 14, marginTop: 8, fontWeight: 600, color: pts === 0 ? C.red : pts >= 8 ? C.green : C.ink }}>
              {cfg.tipo === "tiempo" ? fmtTime(v) : v} en el baremo oficial = {fmtPuntos(pts)}
              {pts === 0 && " (fuera del tiempo máximo)"}
            </p>
          );
        })()}
        <p style={{ fontSize: 12, color: C.inkSoft, marginTop: 8 }}>
          Objetivos por defecto alineados al baremo oficial de la última convocatoria. Cuando salgan nuevas bases en el BOPZ, revisa el Anexo III.
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
                <span>
                  {fmtFecha(e.fecha)} — <strong>{cfg.tipo === "tiempo" ? fmtTime(Number(e.valor)) : Number(e.valor)}</strong>
                  {(() => { const f = fmtPuntos(puntosBaremo(prueba, Number(e.valor))); return f ? <span style={{ color: C.inkSoft, marginLeft: 6 }}>· {f}</span> : null; })()}
                </span>
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
  const timerRef = React.useRef(null);

  // Guardado con debounce: la UI se actualiza al instante, pero solo se
  // escribe en Supabase 800ms después de la última pulsación (antes: 1 upsert/tecla)
  const set = (campo, valor) => {
    const nuevo = { ...e, [campo]: valor };
    setDiario({ ...diario, [fecha]: nuevo });
    const fechaCaptura = fecha;
    const payload = {
      entreno: nuevo.entreno || null,
      estudio: nuevo.estudio === "" || nuevo.estudio == null ? null : parseFloat(nuevo.estudio),
      sueno: nuevo.sueno === "" || nuevo.sueno == null ? null : parseFloat(nuevo.sueno),
      peso: nuevo.peso === "" || nuevo.peso == null ? null : parseFloat(nuevo.peso),
      creatina: !!nuevo.creatina,
      notas: nuevo.notas || null,
    };
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => upsertDiario(fechaCaptura, payload, user.id), 800);
    // Nota: no se cancela el timer al desmontar a propósito — así el último
    // guardado pendiente siempre llega a Supabase aunque cambies de pestaña.
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

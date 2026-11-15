"use client";
import React, { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, ReferenceLine,
} from "recharts";
import {
  supabase, logout,
  getResultados,
  getMarcas,
  getProgreso, getMisAvisos, getProgresoCallejero,
} from "../lib/supabase";
import { Callejero } from "./Callejero";
import { AvisosResueltos } from "./Avisos";
import { Temario, useEstadoTemas } from "./Temario";
import { Insignia, Marca } from "./Insignia";
import EntrarConGoogle from "./EntrarConGoogle";
import Fisicas from "./Fisicas";
import { statsBloques, statsDe, bloquePorId, TOTAL_PREGUNTAS } from "../lib/banco";
import { C, FONT_DISPLAY, FONT_BODY, hazard, hoy, fmtFecha, fechaLocal, Centro, Card, H2, StripeBar, Vacio, Bolita, inputStyle, btnStyle } from "./ui";

/* ============================================================
   OPO BOMBERO ZGZ — multiusuario (Supabase + Google login)
   ============================================================ */

/* ============================================================ */
export default function App() {
  const [user, setUser] = useState(undefined); // undefined = comprobando
  const [tab, setTab] = useState("panel");
  const [ready, setReady] = useState(false);

  const [resultados, setResultados] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [progreso, setProgreso] = useState({});
  const [progresoCallejero, setProgresoCallejero] = useState({});
  const [avisos, setAvisos] = useState([]);           // avisos del usuario sobre preguntas (los suyos)
  const [vistaTests, setVistaTests] = useState("temario"); // "temario" | "avisos"
  const onAviso = (fila) => setAvisos((as) => [fila, ...as.filter((a) => a.pregunta_id !== fila.pregunta_id)]);
  const onVistos = (ids) => setAvisos((as) => as.map((a) => (ids.includes(a.id) ? { ...a, visto_at: new Date().toISOString() } : a)));
  const verMisAvisos = () => { setTab("tests"); setVistaTests("avisos"); window.scrollTo({ top: 0 }); };

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user || null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user || null));
    return () => sub.subscription.unsubscribe();
  }, []);

  // Tras entrar con Google la URL trae ?code=… (código de un solo uso del login).
  // Cuando ya hay sesión se quita, para que la dirección quede limpia y al recargar no se intente reutilizar.
  useEffect(() => {
    if (!user) return;
    const url = new URL(window.location.href);
    if (!url.searchParams.has("code")) return;
    url.searchParams.delete("code");
    window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
  }, [user]);

  const [errorCarga, setErrorCarga] = useState(false);
  const [intentoCarga, setIntentoCarga] = useState(0);

  useEffect(() => {
    if (!user) return;
    let cancelado = false;
    (async () => {
      try {
        setErrorCarga(false);
        const [r, m, pg] = await Promise.all([getResultados(), getMarcas(), getProgreso()]);
        if (cancelado) return;
        setResultados(r); setMarcas(m); setProgreso(pg);
        setReady(true);
        getMisAvisos().then((a) => { if (!cancelado) setAvisos(a); }); // no bloquea la carga si falla
        getProgresoCallejero().then((p) => { if (!cancelado) setProgresoCallejero(p); });
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
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}><Insignia size={180} /></div>
            <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 52, letterSpacing: 2, textTransform: "uppercase", color: "#fff", margin: 0, lineHeight: 1 }}>
              Opo <span style={{ color: C.red }}>Bomberos</span><br /><span style={{ color: C.yellow }}>Zaragoza</span>
            </h1>
            <p style={{ color: "#9AA3AA", fontSize: 16, margin: "16px 0 28px" }}>
              El temario oficial en {TOTAL_PREGUNTAS.toLocaleString("es-ES")} preguntas, con tu avance tema a tema.<br />Tu parte de servicio diario hasta la plaza.
            </p>
            <EntrarConGoogle />
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
        html { scrollbar-gutter: stable; }
      `}</style>
      <header style={{ background: C.ink, color: "#fff", padding: "14px 20px 10px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#fff" }}>
            <Marca size={38} />
            <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 30, letterSpacing: 1.5, textTransform: "uppercase" }}>
              Opo <span style={{ color: C.red }}>Bomberos</span> <span style={{ color: C.yellow }}>ZGZ</span>
            </span>
          </a>
          <span style={{ fontSize: 12, color: "#9AA3AA", flex: 1 }}>PARTE DE SERVICIO · {fmtFecha(hoy())}</span>
          <span style={{ fontSize: 13, color: "#C8CED3" }}>{user.user_metadata?.name || user.email}</span>
          <button onClick={logout} style={{ background: "transparent", color: "#9AA3AA", border: "1px solid #3A4046", borderRadius: 4, padding: "4px 12px", fontSize: 12 }}>Salir</button>
        </div>
      </header>
      <div style={hazard(8)} />
      <nav style={{ maxWidth: 1000, margin: "0 auto", display: "flex", gap: 6, padding: "14px 16px 0", flexWrap: "wrap" }}>
        {[["panel", "Panel"], ["tests", "Temario y tests"], ["callejero", "Callejero"], ["fisico", "Pruebas físicas"]].map(([id, label]) => (
          <button key={id} onClick={() => { setTab(id); if (id === "tests") setVistaTests("temario"); }}
            style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 16, letterSpacing: 1, textTransform: "uppercase", padding: "8px 18px", border: `2px solid ${C.ink}`, background: tab === id ? C.ink : "transparent", color: tab === id ? C.yellow : C.ink, borderRadius: 4 }}>
            {label}
          </button>
        ))}
      </nav>
      <main style={{ maxWidth: 1000, margin: "0 auto", padding: "18px 16px 60px" }}>
        <AvisosRevision />
        {tab === "panel" && (
          <Panel progreso={progreso} resultados={resultados} irATemario={() => setTab("tests")}
            avisosResueltos={<AvisosResueltos avisos={avisos} onVer={verMisAvisos} onVistos={onVistos} />} />
        )}
        {tab === "tests" && (
          <Temario user={user} progreso={progreso} setProgreso={setProgreso} resultados={resultados} setResultados={setResultados}
            avisos={avisos} onAviso={onAviso} onVistos={onVistos} vista={vistaTests} setVista={setVistaTests} />
        )}
        {tab === "callejero" && (
          <Callejero user={user} progreso={progresoCallejero} setProgreso={setProgresoCallejero} resultados={resultados} setResultados={setResultados}
            avisos={avisos} onAviso={onAviso} />
        )}
        {tab === "fisico" && <Fisicas user={user} marcas={marcas} setMarcas={setMarcas} />}
      </main>
    </div>
  );
}

/* ============ PANEL ============ */
function Panel({ progreso, resultados, irATemario, avisosResueltos }) {
  // Todo sale de lo que ya registra la app: tests hechos y progreso por pregunta (nada a mano)
  const diasConEstudio = new Set([
    ...resultados.map((r) => String(r.fecha)),
    ...Object.values(progreso).map((p) => String(p.ultima_fecha)),
  ]);
  let racha = 0;
  for (let i = 0; i <= 400; i++) {
    if (diasConEstudio.has(fechaLocal(-i))) racha++;
    else if (i === 0) continue; // hoy aún no has estudiado: la racha de ayer sigue viva
    else break;
  }
  const hace7 = fechaLocal(-6);
  const preguntasSemana = Object.values(progreso).filter((p) => p.ultima_fecha && String(p.ultima_fecha) >= hace7).length;
  const sg = statsDe(Object.keys(bloquePorId), statsBloques(progreso));
  const pctDominado = sg.total ? (100 * sg.dominadas) / sg.total : 0;

  // Temas empezados con peor acierto: los que piden refuerzo
  const estadoTemas = useEstadoTemas(progreso);
  const conDatos = estadoTemas.filter((t) => t.s.vistas > 0).sort((a, b) => a.e.acierto - b.e.acierto || a.e.pct - b.e.pct);
  const sinEmpezar = estadoTemas.filter((t) => t.s.vistas === 0).length;

  const soloTests = resultados.filter((r) => r.origen !== "repaso" && r.origen !== "callejero"); // la media es del temario
  const mediaGlobal = (() => {
    let ok = 0, tot = 0;
    soloTests.forEach((r) => { ok += r.aciertos; tot += r.preguntas; });
    return tot ? Math.round((ok / tot) * 100) : null;
  })();

  return (
    <div style={{ display: "grid", gap: 14 }}>
      {avisosResueltos}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 }}>
        {[
          { label: "Racha de estudio", value: `${racha} d`, color: C.red },
          { label: "Preguntas / 7 días", value: preguntasSemana.toLocaleString("es-ES"), color: C.steel },
          { label: "Temario dominado", value: `${pctDominado.toFixed(pctDominado < 10 ? 1 : 0).replace(".", ",")} %`, color: C.steel },
          { label: "Media tests", value: mediaGlobal != null ? `${mediaGlobal}%` : "—", color: C.ink },
        ].map((s) => (
          <Card key={s.label} style={{ padding: 14, borderTop: `4px solid ${s.color}` }}>
            <div style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: C.inkSoft }}>{s.label}</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 34, lineHeight: 1.1 }}>{s.value}</div>
          </Card>
        ))}
      </div>

      <AvisoCamiseta />

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


/* ============ AVISO DE LA CAMISETA (Panel) ============ */
// Se puede ocultar; se recuerda en este navegador.
/* ============ AVISOS · revisión de respuestas (noviembre 2026) ============ */
// Dos avisos independientes, cada uno con su propio cierre:
// · «Revisamos las respuestas»: informa de que el banco está cambiando (hasta el 30/11/2026).
// · «Ayúdanos a mejorarlas»: pide señalar las preguntas dudosas con la fuente (sin fecha de fin).
// En escritorio salen uno al lado del otro; en móvil, uno debajo del otro.
const AVISOS_REVISION = [
  {
    clave: "avisoRevision202611Oculto",
    hasta: "2026-11-30",
    acento: C.yellow,
    titulo: <>Este mes revisamos <span style={{ color: C.red }}>las respuestas</span></>,
    texto: "Estamos corrigiendo preguntas y explicaciones del banco. Puede que alguna cambie mientras estudias; tu progreso no se pierde.",
  },
  {
    clave: "avisoAyudaSenalarOculto",
    hasta: null,
    acento: C.steel,
    titulo: <>Ayúdanos a <span style={{ color: C.steel }}>mejorar las respuestas</span></>,
    texto: "Si una pregunta te parece mal, pulsa «⚑\u00A0Señalar esta pregunta» al corregirla y dinos dónde lo has leído (ley y artículo, o manual y página). Leemos todos los avisos.",
  },
];

function AvisosRevision() {
  const [visibles, setVisibles] = useState([]);
  useEffect(() => {
    const leer = (k) => { try { return localStorage.getItem(k) === "1"; } catch { return false; } };
    setVisibles(AVISOS_REVISION.filter((a) => (!a.hasta || hoy() <= a.hasta) && !leer(a.clave)).map((a) => a.clave));
  }, []);
  if (!visibles.length) return null;
  const ocultar = (clave) => {
    setVisibles((v) => v.filter((k) => k !== clave));
    try { localStorage.setItem(clave, "1"); } catch {}
  };
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 10, marginBottom: 14 }}>
      {AVISOS_REVISION.filter((a) => visibles.includes(a.clave)).map((a) => (
        <section key={a.clave} role="status" style={{ background: C.panel, border: `1px solid ${C.line}`, borderLeft: `6px solid ${a.acento}`, borderRadius: 6, padding: "12px 12px 12px 16px", display: "flex", alignItems: "flex-start", gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 18, letterSpacing: 0.5, textTransform: "uppercase", lineHeight: 1.1 }}>{a.titulo}</div>
            <div style={{ fontSize: 14, color: C.inkSoft, marginTop: 4 }}>{a.texto}</div>
          </div>
          <button type="button" onClick={() => ocultar(a.clave)} aria-label="Ocultar este aviso" style={{ minWidth: 44, minHeight: 44, flexShrink: 0, background: "transparent", border: `1px solid ${C.line}`, borderRadius: 6, color: C.inkSoft, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </section>
      ))}
    </div>
  );
}

function AvisoCamiseta() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    try { setVisible(localStorage.getItem("avisoCamisetaOculto") !== "1"); } catch { setVisible(true); }
  }, []);
  if (!visible) return null;
  const ocultar = () => {
    setVisible(false);
    try { localStorage.setItem("avisoCamisetaOculto", "1"); } catch {}
  };
  return (
    <section aria-label="Camiseta Opo Bomberos" style={{ background: C.ink, color: "#fff", borderRadius: 6, overflow: "hidden", display: "flex", alignItems: "stretch", flexWrap: "wrap" }}>
      <div aria-hidden="true" style={{ width: 10, flex: "0 0 10px", background: `repeating-linear-gradient(135deg, ${C.yellow} 0 10px, ${C.ink} 10px 20px)` }} />
      <img src="/camiseta/camiseta-gris.webp" alt="Camiseta Opo Bomberos, delante y detrás" width="140" height="140" style={{ width: 140, height: 140, objectFit: "cover", display: "block", background: C.bg }} />
      <div style={{ flex: "1 1 280px", minWidth: 0, padding: "16px 20px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px 20px" }}>
        <div style={{ flex: "1 1 260px", minWidth: 0 }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 24, textTransform: "uppercase", lineHeight: 1 }}>
            Ya está la <span style={{ color: C.yellow }}>camiseta</span> de Opo Bomberos
          </div>
          <div style={{ fontSize: 14, color: "#C8CED3", marginTop: 6 }}>La insignia delante y Zaragoza detrás, en 6 colores. Para entrenar las físicas o para el día del examen.</div>
        </div>
        <a href="/#camiseta" style={{ display: "inline-flex", alignItems: "center", minHeight: 44, padding: "0 18px", borderRadius: 6, background: C.red, color: "#fff", textDecoration: "none", fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 18, letterSpacing: 1, textTransform: "uppercase" }}>Verla</a>
        <button type="button" onClick={ocultar} aria-label="Ocultar este aviso" style={{ minWidth: 44, minHeight: 44, background: "transparent", border: "1px solid #3A4046", borderRadius: 6, color: "#C8CED3", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>
    </section>
  );
}

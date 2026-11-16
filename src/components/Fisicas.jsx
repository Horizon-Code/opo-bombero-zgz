"use client";
// Pestaña de pruebas físicas: alta, «Esta semana», registrar y progreso.
// Toda la lógica de entrenamiento está en src/lib/fisicas.js; aquí solo se pinta y se guarda.
import React, { useEffect, useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from "recharts";
import { getFisicas, guardarPerfilFis, guardarEstadosFis, addSesionFis, deshacerSesionFis, addMarca, delMarca } from "../lib/supabase";
import * as F from "../lib/fisicas";
import { C, FONT_DISPLAY, hoy, fmtFecha, Card, H2, StripeBar, Vacio, inputStyle, btnStyle } from "./ui";

/* ---------- utilidades ---------- */
// «1:25», «1:25,4», «21,8», «85» → segundos
const leerTiempo = (txt) => {
  const t = String(txt ?? "").trim().replace(",", ".");
  if (!t) return null;
  if (t.includes(":")) {
    const [m, s] = t.split(":");
    const v = Number(m) * 60 + Number(s || 0);
    return Number.isFinite(v) && v > 0 ? v : null;
  }
  const v = Number(t);
  return Number.isFinite(v) && v > 0 ? v : null;
};
const fmtPts = (p) => p.toFixed(2).replace(".", ",");
const perfilMotor = (p) => ({ sexo: p.sexo, soga: p.soga, diaSoga: p.dia_soga, dias: p.dias, impacto: p.impacto });
const soloPerfil = (p) => ({ sexo: p.sexo, soga: p.soga, dia_soga: p.dia_soga, dias: p.dias, impacto: p.impacto, procesado_hasta: p.procesado_hasta });
const ultimaMarca = (marcas, prueba) => marcas.filter((m) => m.prueba === prueba).sort((a, b) => String(a.fecha).localeCompare(String(b.fecha))).slice(-1)[0] || null;
const HINT = { r1500: "mm:ss, p. ej. 5:30", nat: "mm:ss, p. ej. 1:30", cuerda: "segundos, p. ej. 9,5" };
const COLOR = { cuerda: C.yellow, nat: C.steel, r1500: C.red };

const chip = (activo) => ({
  fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 14, letterSpacing: 1, textTransform: "uppercase",
  padding: "6px 14px", border: `2px solid ${C.ink}`, borderRadius: 4,
  background: activo ? C.ink : "transparent", color: activo ? C.yellow : C.ink,
});
const etiqueta = { display: "grid", gap: 4, fontSize: 13, color: C.inkSoft };
const aviso = (color) => ({ background: `${color}14`, borderLeft: `4px solid ${color}`, padding: "10px 12px", borderRadius: 4, fontSize: 14, lineHeight: 1.45 });

/* ============================================================ */
export default function Fisicas({ user, marcas, setMarcas }) {
  const HOY = hoy();
  const LUNES = F.lunesDe(HOY);
  const [datos, setDatos] = useState(null);
  const [vista, setVista] = useState("semana");
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    let cancelado = false;
    (async () => {
      const d = await getFisicas();
      if (!d.error && d.perfil) {
        // Semanas completas sin registrar → «sin hacer» (punto 6.2)
        const r = F.aplicarSemanasSinHacer(perfilMotor(d.perfil), d.estados, d.sesiones, d.perfil.procesado_hasta, HOY);
        if (r.procesadoHasta !== d.perfil.procesado_hasta) {
          try {
            await guardarEstadosFis(r.estados, user.id);
            d.perfil = await guardarPerfilFis({ ...soloPerfil(d.perfil), procesado_hasta: r.procesadoHasta }, user.id);
            d.estados = r.estados;
          } catch (e) { console.error("Semanas sin hacer:", e); }
        }
      }
      if (!cancelado) setDatos(d);
    })();
    return () => { cancelado = true; };
  }, [user.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!datos) return <Card><Vacio texto="Cargando tu plan de físicas…" /></Card>;
  if (datos.error)
    return (
      <Card>
        <H2>Pruebas físicas</H2>
        <p style={{ margin: 0, fontSize: 14, color: C.inkSoft }}>
          Falta preparar la base de datos para el plan de físicas (migración 10). Si eres el administrador, ejecuta
          <code> supabase/migracion_10.sql</code> en el SQL Editor de Supabase y recarga.
        </p>
      </Card>
    );
  if (!datos.perfil)
    return <Alta user={user} marcas={marcas} setMarcas={setMarcas} onListo={(d) => { setDatos(d); setMensaje("Plan creado. Esta es tu semana."); }} HOY={HOY} LUNES={LUNES} />;

  const perfil = perfilMotor(datos.perfil);
  const actualizar = (cambios) => setDatos((d) => ({ ...d, ...cambios }));

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {[["semana", "Esta semana"], ["progreso", "Progreso"], ["ajustes", "Ajustes"]].map(([id, t]) => (
          <button key={id} onClick={() => setVista(id)} style={chip(vista === id)}>{t}</button>
        ))}
      </div>
      {mensaje && (
        <div role="status" style={{ ...aviso(C.green), display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ flex: 1 }}>{mensaje}</span>
          <button onClick={() => setMensaje(null)} aria-label="Cerrar" style={{ border: "none", background: "transparent", fontSize: 18, lineHeight: 1, color: C.inkSoft }}>×</button>
        </div>
      )}
      {vista === "semana" && (
        <Semana user={user} perfil={perfil} datos={datos} actualizar={actualizar} marcas={marcas} setMarcas={setMarcas} setMensaje={setMensaje} HOY={HOY} LUNES={LUNES} />
      )}
      {vista === "progreso" && <Progreso perfil={perfil} estados={datos.estados} marcas={marcas} />}
      {vista === "ajustes" && (
        <Ajustes user={user} perfilFila={datos.perfil} onGuardado={(p) => { actualizar({ perfil: p }); setMensaje("Ajustes guardados."); setVista("semana"); }} />
      )}
      <p style={{ fontSize: 12, color: C.inkSoft, margin: "4px 0 0" }}>
        El plan es orientativo. Si tienes dolor o una lesión, para y consulta con un profesional.
      </p>
    </div>
  );
}

/* ============ ALTA (punto 8.1) ============ */
function Alta({ user, marcas, setMarcas, onListo, HOY, LUNES }) {
  const previa = (p) => ultimaMarca(marcas, p);
  const fmtPrevia = (p) => { const m = previa(p); if (!m) return ""; return p === "cuerda" || p === "dom" ? String(m.valor).replace(".", ",") : F.fmtSeg(Number(m.valor)); };
  const [f, setF] = useState({
    sexo: "", r1500: fmtPrevia("r1500"), nat: fmtPrevia("nat"), cuerda: fmtPrevia("cuerda"), t400: "", t200: "",
    soga: null, diaSoga: "", dominadas: fmtPrevia("dom"), dias: 6, impacto: false,
  });
  const [error, setError] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e?.target ? (e.target.type === "checkbox" ? e.target.checked : e.target.value) : e }));

  const guardar = async () => {
    setError(null);
    if (!f.sexo) return setError("Elige si eres hombre o mujer: define tu marca del 10.");
    if (f.soga === null) return setError("Dinos si tienes acceso a una soga.");
    if (f.soga && f.diaSoga === "") return setError("Elige qué día tienes la soga.");
    const dom = f.dominadas === "" ? null : Number(String(f.dominadas).replace(",", "."));
    if (dom == null || !Number.isFinite(dom) || dom < 0) return setError("Apunta tus dominadas estrictas máximas (pon 0 si aún no haces ninguna).");
    const valores = {};
    for (const p of ["r1500", "nat", "cuerda"]) {
      if (!String(f[p]).trim()) continue;
      const v = leerTiempo(f[p]);
      if (v == null) return setError(`Revisa la marca de ${F.NOMBRE[p].toLowerCase()} (${HINT[p]}).`);
      // Si es la misma marca que ya tenías apuntada, se respeta su fecha
      const m = previa(p);
      valores[p] = { valor: v, fecha: m && fmtPrevia(p) === String(f[p]).trim() ? m.fecha : HOY, nueva: !(m && fmtPrevia(p) === String(f[p]).trim()) };
    }
    const t400 = leerTiempo(f.t400); const t200 = leerTiempo(f.t200);
    if ((f.t400 || f.t200) && !F.ritmoCritico(t400, t200)) return setError("Revisa los tiempos de 400 y 200 (el de 400 tiene que ser mayor).");

    setGuardando(true);
    try {
      const estados = {
        r1500: F.estadoInicial("r1500", { marca: valores.r1500?.valor ?? null, fecha: valores.r1500?.fecha, sexo: f.sexo }),
        nat: F.estadoInicial("nat", { marca: valores.nat?.valor ?? null, fecha: valores.nat?.fecha, t400, t200, sexo: f.sexo }),
        cuerda: F.estadoInicial("cuerda", { marca: valores.cuerda?.valor ?? null, fecha: valores.cuerda?.fecha, dominadas: dom, sexo: f.sexo }),
      };
      estados.cuerda.dominadas = { max: dom, en10: null, fecha: HOY };
      for (const p of ["r1500", "nat", "cuerda"]) estados[p].ultimaActividad = HOY; // el plan empieza hoy
      const nuevas = [];
      for (const p of ["r1500", "nat", "cuerda"]) if (valores[p]?.nueva) nuevas.push({ prueba: p, valor: valores[p].valor, fecha: HOY });
      if (t400 && t200) nuevas.push({ prueba: "nat400", valor: t400, fecha: HOY }, { prueba: "nat200", valor: t200, fecha: HOY });
      if (!previa("dom") || Number(previa("dom").valor) !== dom) nuevas.push({ prueba: "dom", valor: dom, fecha: HOY });
      const filas = [];
      for (const m of nuevas) { const r = await addMarca(m, user.id); if (r) filas.push(r); }
      if (filas.length) setMarcas((ms) => [...ms, ...filas]);
      await guardarEstadosFis(estados, user.id);
      const perfil = await guardarPerfilFis({
        sexo: f.sexo, soga: !!f.soga, dia_soga: f.soga ? Number(f.diaSoga) : null, dias: Number(f.dias), impacto: !!f.impacto,
        procesado_hasta: F.sumarDias(LUNES, -7),
      }, user.id);
      onListo({ perfil, estados, sesiones: [] });
    } catch (e) {
      console.error("Alta físicas:", e);
      setError("No se pudo guardar. Inténtalo otra vez en un momento.");
    } finally { setGuardando(false); }
  };

  return (
    <Card>
      <H2>Tu plan de físicas</H2>
      <p style={{ margin: "0 0 16px", fontSize: 14, color: C.inkSoft, lineHeight: 1.5 }}>
        Cinco preguntas y te damos dos entrenos por prueba cada semana, con tus tiempos ya calculados. El objetivo es siempre el 10.
      </p>
      <div style={{ display: "grid", gap: 18 }}>
        <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
          <legend style={{ fontWeight: 600, marginBottom: 8 }}>1. ¿Hombre o mujer?</legend>
          <div style={{ display: "flex", gap: 8 }}>
            {[["H", "Hombre"], ["M", "Mujer"]].map(([v, t]) => <button key={v} type="button" onClick={() => set("sexo")(v)} style={chip(f.sexo === v)} aria-pressed={f.sexo === v}>{t}</button>)}
          </div>
          <div style={{ fontSize: 12, color: C.inkSoft, marginTop: 6 }}>Las marcas del 10 son distintas para hombres y mujeres.</div>
        </fieldset>

        <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
          <legend style={{ fontWeight: 600, marginBottom: 8 }}>2. Tu marca actual en cada prueba</legend>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 10 }}>
            {["cuerda", "nat", "r1500"].map((p) => (
              <label key={p} style={etiqueta}>{F.NOMBRE_LARGO[p]}
                <input value={f[p]} onChange={set(p)} placeholder={HINT[p]} inputMode="decimal" style={{ ...inputStyle, width: "100%", boxSizing: "border-box" }} />
              </label>
            ))}
          </div>
          <div style={{ fontSize: 12, color: C.inkSoft, marginTop: 6 }}>Si no la sabes, déjala en blanco: tu primera semana de esa prueba será de test.</div>
          <details style={{ marginTop: 10 }}>
            <summary style={{ fontSize: 13, cursor: "pointer" }}>Opcional: tus tiempos de 400 y 200 nadando</summary>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 10, marginTop: 8 }}>
              <label style={etiqueta}>400 m a tope<input value={f.t400} onChange={set("t400")} placeholder="p. ej. 7:00" style={inputStyle} /></label>
              <label style={etiqueta}>200 m a tope<input value={f.t200} onChange={set("t200")} placeholder="p. ej. 3:20" style={inputStyle} /></label>
            </div>
            <div style={{ fontSize: 12, color: C.inkSoft, marginTop: 6 }}>Con ellos calculamos tu ritmo crítico y la sesión de resistencia de natación lleva tiempos exactos. Sin ellos, se nada por esfuerzo.</div>
          </details>
        </fieldset>

        <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
          <legend style={{ fontWeight: 600, marginBottom: 8 }}>3. ¿Tienes acceso a una soga?</legend>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <button type="button" onClick={() => set("soga")(true)} style={chip(f.soga === true)} aria-pressed={f.soga === true}>Sí</button>
            <button type="button" onClick={() => set("soga")(false)} style={chip(f.soga === false)} aria-pressed={f.soga === false}>No</button>
            {f.soga && (
              <select value={f.diaSoga} onChange={set("diaSoga")} style={inputStyle} aria-label="Día de soga">
                <option value="">¿Qué día?</option>
                {F.DIAS.slice(0, 6).map((d, i) => <option key={d} value={i}>{d}</option>)}
              </select>
            )}
          </div>
          {f.soga === false && <div style={{ fontSize: 12, color: C.inkSoft, marginTop: 6 }}>Sin problema: entrenarás en barra y cada 8 semanas te pediremos que vayas a medir la soga a algún sitio.</div>}
        </fieldset>

        <label style={{ ...etiqueta, maxWidth: 260 }}>
          <span style={{ fontWeight: 600, color: C.ink, fontSize: 15 }}>4. Dominadas estrictas máximas</span>
          <input value={f.dominadas} onChange={set("dominadas")} inputMode="numeric" placeholder="p. ej. 8" style={inputStyle} />
        </label>

        <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
          <legend style={{ fontWeight: 600, marginBottom: 8 }}>5. ¿Cuántos días por semana puedes entrenar?</legend>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[3, 4, 5, 6].map((n) => <button key={n} type="button" onClick={() => set("dias")(n)} style={chip(Number(f.dias) === n)} aria-pressed={Number(f.dias) === n}>{n}</button>)}
          </div>
          <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 14, marginTop: 10 }}>
            <input type="checkbox" checked={f.impacto} onChange={set("impacto")} /> Tengo molestias de impacto (rodilla, lumbar)
          </label>
        </fieldset>

        {error && <div role="alert" style={aviso(C.red)}>{error}</div>}
        <div><button onClick={guardar} disabled={guardando} style={btnStyle()}>{guardando ? "Guardando…" : "Crear mi plan"}</button></div>
      </div>
    </Card>
  );
}

/* ============ ESTA SEMANA (punto 8.2) ============ */
function Semana({ user, perfil, datos, actualizar, marcas, setMarcas, setMensaje, HOY, LUNES }) {
  const { estados, sesiones } = datos;
  const plan = useMemo(() => F.planSemana(perfil, estados, HOY), [perfil, estados, HOY]);
  const [abierta, setAbierta] = useState(null);
  const deSemana = sesiones.filter((s) => s.semana === LUNES);
  const registroDe = (prueba, tipo) =>
    deSemana.find((r) => r.prueba === prueba && (r.tipo === tipo || (tipo !== "B" && (r.tipo === "A" || r.tipo === "T"))));

  const guardarEstado = async (prueba, nuevo) => {
    const estadosNuevos = { ...estados, [prueba]: nuevo };
    await guardarEstadosFis({ [prueba]: nuevo }, user.id);
    actualizar({ estados: estadosNuevos });
  };

  const registrar = async (item, registro) => {
    const { prueba } = item;
    const antes = estados[prueba] || F.estadoInicial(prueba);
    let nuevo; let msg; let fila;
    if (item.tipo === "T") {
      const r = F.aplicarTest(antes, { marca: registro.marca, fecha: HOY, t400: registro.t400, t200: registro.t200, sexo: perfil.sexo });
      nuevo = r.estado; msg = r.mensaje;
      const filasMarca = [];
      const add = async (p, v) => { const m = await addMarca({ prueba: p, valor: v, fecha: HOY }, user.id); if (m) filasMarca.push(m); };
      await add(prueba, registro.marca);
      if (registro.t400 && registro.t200) { await add("nat400", registro.t400); await add("nat200", registro.t200); }
      if (filasMarca.length) setMarcas((ms) => [...ms, ...filasMarca]);
      fila = { tipo: "T", nivel: null, modo: "test", resultado: "TEST", series: { marca: registro.marca, t400: registro.t400 || null, t200: registro.t200 || null, marcaIds: filasMarca.map((m) => m.id) } };
    } else {
      const cal = F.calificar(item.sesion, registro);
      const r = F.siguienteEstado(antes, item.tipo, cal, { perfil, fecha: HOY });
      nuevo = r.estado; msg = r.mensaje;
      fila = { tipo: item.tipo, nivel: item.nivelSemana ?? item.sesion.nivel, modo: registro.modo, resultado: cal.resultado, series: registro.modo === "tiempos" ? { tiempos: registro.tiempos } : registro.modo === "sensacion" ? { valor: registro.valor } : null };
    }
    const guardada = await addSesionFis({ ...fila, prueba, fecha: HOY, semana: LUNES, estado_antes: antes }, user.id);
    await guardarEstadosFis({ [prueba]: nuevo }, user.id);
    actualizar({ estados: { ...estados, [prueba]: nuevo }, sesiones: [...sesiones, guardada] });
    setAbierta(null);
    setMensaje(msg);
  };

  const deshacer = async (reg) => {
    const { estado_antes: antes } = await deshacerSesionFis(reg.id);
    for (const id of reg.series?.marcaIds || []) await delMarca(id);
    if (reg.series?.marcaIds?.length) setMarcas((ms) => ms.filter((m) => !reg.series.marcaIds.includes(m.id)));
    await guardarEstadosFis({ [reg.prueba]: antes }, user.id);
    actualizar({ estados: { ...estados, [reg.prueba]: antes }, sesiones: sesiones.filter((s) => s.id !== reg.id) });
    setMensaje("Registro deshecho.");
  };
  const ultimaDePrueba = (prueba) => sesiones.filter((s) => s.prueba === prueba).slice(-1)[0];

  // Avisos (punto 8.5)
  const avisos = [...plan.avisos.map((t) => ({ t, color: C.yellow }))];
  for (const p of F.PRUEBAS_FIS) {
    const tt = plan.tests[p];
    const e = estados[p];
    if (tt.tipo === "fijo") avisos.push({ t: p === "cuerda" && !perfil.soga ? "Llevas 3 meses sin medir la soga: no sabemos si estás mejorando." : `${F.NOMBRE[p]}: ${tt.motivo}`, color: C.red });
    else if (tt.tipo === "adelantado") avisos.push({ t: `${F.NOMBRE[p]}: ${tt.motivo}`, color: C.red });
    else if (tt.tipo === "propuesto") avisos.push({ t: p === "cuerda" && !perfil.soga ? "Te toca medir la soga esta semana." : `${F.NOMBRE[p]}: te toca test esta semana.`, color: C.yellow, aplazar: p });
    if (e?.estancado) avisos.push({ t: `${F.NOMBRE[p]}: el último test salió casi igual que el anterior. La sesión que más te cuesta va primero esta semana.`, color: C.yellow });
    const dg = e && F.diagnostico(e);
    if (dg) avisos.push({ t: `${F.NOMBRE[p]}: ${dg.texto}`, color: C.steel });
  }
  const aplazar = async (p) => { await guardarEstado(p, F.aplazarTest(estados[p], HOY)); setMensaje(`Test de ${F.NOMBRE[p].toLowerCase()} aplazado una semana.`); };

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
        {F.PRUEBAS_FIS.map((p) => <TarjetaPrueba key={p} prueba={p} estado={estados[p]} perfil={perfil} />)}
      </div>

      {F.tocaDominadas(estados.cuerda || F.estadoInicial("cuerda"), HOY) && (
        <Dominadas user={user} estado={estados.cuerda || F.estadoInicial("cuerda")} setMarcas={setMarcas} HOY={HOY}
          onGuardado={async (nuevo) => { await guardarEstado("cuerda", nuevo); setMensaje("Dominadas actualizadas."); }} />
      )}

      {avisos.length > 0 && (
        <div style={{ display: "grid", gap: 8 }}>
          {avisos.map((a, i) => (
            <div key={i} style={{ ...aviso(a.color), display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ flex: 1, minWidth: 200 }}>{a.t}</span>
              {a.aplazar && <button onClick={() => aplazar(a.aplazar)} style={{ ...btnStyle("transparent", C.ink), border: `1px solid ${C.ink}`, padding: "4px 10px", fontSize: 13 }}>Aplazar una semana</button>}
            </div>
          ))}
        </div>
      )}

      <Card>
        <H2>Esta semana</H2>
        <div style={{ display: "grid", gap: 10 }}>
          {plan.dias.map((d) => (
            <div key={d.dia} style={{ display: "grid", gap: 6 }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 15, letterSpacing: 1, textTransform: "uppercase", color: C.inkSoft }}>{d.nombre}</div>
              {d.sesiones.map((item) => {
                const reg = registroDe(item.prueba, item.tipo);
                const clave = `${d.dia}-${item.prueba}-${item.tipo}`;
                return (
                  <FilaSesion key={clave} item={item} reg={reg} abierta={abierta === clave} perfil={perfil}
                    onToggle={() => setAbierta(abierta === clave ? null : clave)}
                    onRegistrar={(r) => registrar(item, r)}
                    puedeDeshacer={reg && ultimaDePrueba(item.prueba)?.id === reg.id}
                    onDeshacer={() => deshacer(reg)} />
                );
              })}
            </div>
          ))}
          {plan.extras.map((x, i) => (
            <div key={`extra-${i}`} style={{ ...aviso(C.steel), fontSize: 13 }}>
              <strong>Opcional, {F.DIAS[x.dia].toLowerCase()}:</strong> repite la sesión {x.tipo} de {F.NOMBRE[x.prueba].toLowerCase()}. {x.motivo}
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

function TarjetaPrueba({ prueba, estado, perfil }) {
  const m = F.marcasBaremo(prueba, perfil.sexo);
  const s = estado?.marca != null ? F.situacionBaremo(prueba, estado.marca, perfil.sexo) : null;
  const ref = estado?.ref?.A;
  const semanas = estado?.fechaTest ? Math.floor(F.diasEntre(estado.fechaTest, hoy()) / 7) : null;
  return (
    <Card style={{ padding: 14, borderTop: `4px solid ${COLOR[prueba]}` }}>
      <div style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: C.inkSoft }}>{F.NOMBRE_LARGO[prueba]}</div>
      {s ? (
        <>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 32, lineHeight: 1.1 }}>{F.fmtSeg(estado.marca)}</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: s.enDiez ? C.green : s.apto ? C.ink : C.red }}>
              {s.apto ? `${fmtPts(s.puntos)} pts` : "No apto todavía"}
            </span>
          </div>
          <div style={{ fontSize: 12, color: C.inkSoft, margin: "2px 0 8px" }}>
            {fmtFecha(estado.fechaTest)}{semanas != null ? ` · hace ${semanas} sem.` : ""} · el 10: {F.fmtSeg(m.diez)}
          </div>
          <StripeBar pct={s.avance * 100} color={s.enDiez ? C.green : s.apto ? C.yellow : C.red} />
          <div style={{ fontSize: 12, color: C.inkSoft, marginTop: 6 }}>
            {s.enDiez ? "En el 10: mantenimiento." : `Te faltan ${F.fmtSeg(s.falta)} para el 10.`}
          </div>
          {ref && prueba !== "cuerda" && Math.abs(ref - estado.marca) / estado.marca > 0.005 && (
            <div style={{ fontSize: 12, color: C.steel, marginTop: 4 }}>Entrenas a ritmo de {F.fmtSeg(ref)}.</div>
          )}
        </>
      ) : (
        <div style={{ fontSize: 14, color: C.inkSoft, marginTop: 6 }}>Sin marca todavía: esta semana toca test. El 10: {F.fmtSeg(m.diez)}.</div>
      )}
    </Card>
  );
}

function FilaSesion({ item, reg, abierta, onToggle, onRegistrar, puedeDeshacer, onDeshacer, perfil }) {
  const { sesion: s } = item;
  const estado = reg ? (reg.resultado === "TEST" ? "Test hecho" : { SUPERADO: "Superado", CUMPLIDO: "Cumplido", FALLADO: "No llegaste" }[reg.resultado]) : item.bloqueada ? "Bloqueada" : "Pendiente";
  const colorEstado = reg ? (reg.resultado === "FALLADO" ? C.red : C.green) : C.inkSoft;
  // Si lo registrado esta semana en este hueco es de otro tipo (la A hecha y luego tocó test, o al revés), se enseña lo registrado
  const otro = reg && reg.tipo !== item.tipo;
  const titulo = otro
    ? (reg.tipo === "T" ? `Test de ${F.NOMBRE[item.prueba].toLowerCase()}` : `${F.NOMBRE[item.prueba]} ${reg.tipo} · nivel ${reg.nivel}`)
    : item.bloqueada ? `${F.NOMBRE[item.prueba]} ${item.tipo}` : s.titulo;
  return (
    <div style={{ border: `1px solid ${C.line}`, borderLeft: `4px solid ${COLOR[item.prueba]}`, borderRadius: 4, background: "#fff" }}>
      <button onClick={onToggle} aria-expanded={abierta} disabled={item.bloqueada}
        style={{ width: "100%", textAlign: "left", background: "transparent", border: "none", padding: "10px 12px", display: "flex", gap: 10, alignItems: "center", color: C.ink, fontSize: 14 }}>
        <span style={{ flex: 1 }}>
          <span style={{ fontWeight: 600 }}>{titulo}</span>
          <span style={{ display: "block", color: C.inkSoft, fontSize: 13, marginTop: 2 }}>
            {otro ? "Ya registrado esta semana." : item.bloqueada ? `Haz primero el test de ${F.NOMBRE[item.prueba].toLowerCase()}.` : `${s.principal.join(" + ")}${s.recuperacion ? ` · descanso ${s.recuperacion}` : ""}`}
          </span>
        </span>
        <span style={{ fontSize: 12, fontWeight: 600, color: colorEstado, whiteSpace: "nowrap" }}>{estado}</span>
      </button>
      {abierta && !item.bloqueada && (
        <div style={{ padding: "0 12px 12px", display: "grid", gap: 10, fontSize: 14, lineHeight: 1.5 }}>
          {!otro && (
            <>
              <div><strong>Calentamiento:</strong> {s.calentamiento}</div>
              <div><strong>Bloque principal:</strong> {s.principal.join(" + ")}{s.recuperacion ? `, con ${s.recuperacion} de descanso` : ""}.</div>
              <div><strong>Vuelta a la calma:</strong> {s.vuelta}</div>
              {s.notas.length > 0 && <ul style={{ margin: 0, paddingLeft: 18, color: C.inkSoft, fontSize: 13 }}>{s.notas.map((n, i) => <li key={i}>{n}</li>)}</ul>}
            </>
          )}
          {reg ? (
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ color: C.inkSoft, fontSize: 13 }}>Registrado el {fmtFecha(reg.fecha)}.</span>
              {puedeDeshacer && <button onClick={onDeshacer} style={{ ...btnStyle("transparent", C.ink), border: `1px solid ${C.ink}`, padding: "4px 10px", fontSize: 13 }}>Deshacer</button>}
            </div>
          ) : item.tipo === "T" ? (
            <RegistrarTest prueba={item.prueba} perfil={perfil} onGuardar={onRegistrar} />
          ) : (
            <Registrar sesion={s} onGuardar={onRegistrar} />
          )}
        </div>
      )}
    </div>
  );
}

/* ============ REGISTRAR (punto 8.3) ============ */
function Registrar({ sesion: s, onGuardar }) {
  const conTiempos = s.registro === "tiempos";
  const [modo, setModo] = useState(conTiempos ? "tiempos" : "sensacion");
  const [tiempos, setTiempos] = useState(() => s.series.map(() => ""));
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);
  const enviar = async (registro) => {
    setGuardando(true); setError(null);
    try { await onGuardar(registro); } catch (e) { console.error(e); setError("No se pudo guardar. Inténtalo otra vez."); setGuardando(false); }
  };
  return (
    <div style={{ borderTop: `1px dashed ${C.line}`, paddingTop: 10, display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {conTiempos && <button onClick={() => setModo("tiempos")} style={chip(modo === "tiempos")}>Apuntar tiempos</button>}
        <button onClick={() => setModo("sensacion")} style={chip(modo === "sensacion")}>{s.prueba === "cuerda" ? "Cómo fue" : "Solo sensación"}</button>
        <button onClick={() => setModo("hecho")} style={chip(modo === "hecho")}>Hecho</button>
      </div>
      {modo === "tiempos" && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(92px, 1fr))", gap: 6 }}>
            {s.series.map((x, i) => (
              <label key={i} style={{ ...etiqueta, fontSize: 11 }}>
                {i + 1}. {x.etiqueta} · {F.fmtSeg(x.objetivo)}
                <input value={tiempos[i]} inputMode="decimal" aria-label={`Serie ${i + 1}`}
                  onChange={(e) => setTiempos((t) => t.map((v, j) => (j === i ? e.target.value : v)))} style={{ ...inputStyle, padding: "6px 8px", width: "100%", boxSizing: "border-box", minWidth: 0 }} />
              </label>
            ))}
          </div>
          <div style={{ fontSize: 12, color: C.inkSoft }}>Deja en blanco las series que no hiciste.</div>
          <div><button disabled={guardando} onClick={() => enviar({ modo: "tiempos", tiempos: tiempos.map(leerTiempo) })} style={btnStyle()}>Guardar</button></div>
        </>
      )}
      {modo === "sensacion" && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[["sobrado", C.green], ["justo", C.steel], ["no", C.red]].map(([v, col]) => (
            <button key={v} disabled={guardando} onClick={() => enviar({ modo: "sensacion", valor: v })} style={btnStyle(col)}>{s.botones[v]}</button>
          ))}
        </div>
      )}
      {modo === "hecho" && <div><button disabled={guardando} onClick={() => enviar({ modo: "hecho" })} style={btnStyle(C.ink)}>Hecho, sin más</button></div>}
      {error && <div role="alert" style={aviso(C.red)}>{error}</div>}
    </div>
  );
}

function RegistrarTest({ prueba, perfil, onGuardar }) {
  const [v, setV] = useState({ marca: "", t400: "", t200: "" });
  const [error, setError] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const enviar = async () => {
    setError(null);
    const marca = leerTiempo(v.marca);
    if (!marca) return setError(`Apunta tu tiempo (${HINT[prueba]}).`);
    const t400 = leerTiempo(v.t400); const t200 = leerTiempo(v.t200);
    if ((v.t400 || v.t200) && !F.ritmoCritico(t400, t200)) return setError("Revisa los tiempos de 400 y 200 (el de 400 tiene que ser mayor).");
    setGuardando(true);
    try { await onGuardar({ marca, t400, t200 }); } catch (e) { console.error(e); setError("No se pudo guardar. Inténtalo otra vez."); setGuardando(false); }
  };
  return (
    <div style={{ borderTop: `1px dashed ${C.line}`, paddingTop: 10, display: "grid", gap: 10 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 8 }}>
        <label style={etiqueta}>{prueba === "cuerda" ? "Mejor intento" : "Tu tiempo"}
          <input value={v.marca} onChange={(e) => setV({ ...v, marca: e.target.value })} placeholder={HINT[prueba]} inputMode="decimal" style={{ ...inputStyle, width: "100%", boxSizing: "border-box" }} />
        </label>
        {prueba === "nat" && (
          <>
            <label style={etiqueta}>400 m (opcional)<input value={v.t400} onChange={(e) => setV({ ...v, t400: e.target.value })} placeholder="p. ej. 7:00" style={inputStyle} /></label>
            <label style={etiqueta}>200 m (opcional)<input value={v.t200} onChange={(e) => setV({ ...v, t200: e.target.value })} placeholder="p. ej. 3:20" style={inputStyle} /></label>
          </>
        )}
      </div>
      {prueba === "cuerda" && !perfil.soga && <div style={{ fontSize: 12, color: C.inkSoft }}>Si esta semana no puedes ir a un sitio con soga, aplázalo desde el aviso de arriba.</div>}
      {error && <div role="alert" style={aviso(C.red)}>{error}</div>}
      <div><button disabled={guardando} onClick={enviar} style={btnStyle()}>{guardando ? "Guardando…" : "Guardar test"}</button></div>
    </div>
  );
}

function Dominadas({ user, estado, setMarcas, onGuardado, HOY }) {
  const [v, setV] = useState({ max: "", en10: "" });
  const [error, setError] = useState(null);
  const guardar = async () => {
    const max = Number(v.max); const en10 = v.en10 === "" ? null : Number(v.en10);
    if (!Number.isFinite(max) || max < 0 || v.max === "") return setError("Apunta tus dominadas estrictas máximas.");
    try {
      const filas = [await addMarca({ prueba: "dom", valor: max, fecha: HOY }, user.id)];
      if (en10 != null && Number.isFinite(en10)) filas.push(await addMarca({ prueba: "dom10", valor: en10, fecha: HOY }, user.id));
      setMarcas((ms) => [...ms, ...filas.filter(Boolean)]);
      await onGuardado({ ...estado, dominadas: { max, en10, fecha: HOY } });
    } catch (e) { console.error(e); setError("No se pudo guardar."); }
  };
  return (
    <Card style={{ padding: 14 }}>
      <div style={{ fontWeight: 600, marginBottom: 6 }}>Actualiza tus dominadas (cada 4 semanas)</div>
      <div style={{ fontSize: 13, color: C.inkSoft, marginBottom: 10 }}>Con ellas se ajusta tu sesión de fuerza de cuerda{estado.dominadas?.max != null ? ` (la última vez: ${estado.dominadas.max})` : ""}.</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "flex-end" }}>
        <label style={etiqueta}>Máximas estrictas<input value={v.max} onChange={(e) => setV({ ...v, max: e.target.value })} inputMode="numeric" style={{ ...inputStyle, width: 120 }} /></label>
        <label style={etiqueta}>En 10 s (opcional)<input value={v.en10} onChange={(e) => setV({ ...v, en10: e.target.value })} inputMode="numeric" style={{ ...inputStyle, width: 120 }} /></label>
        <button onClick={guardar} style={btnStyle(C.ink)}>Guardar</button>
      </div>
      {error && <div role="alert" style={{ ...aviso(C.red), marginTop: 8 }}>{error}</div>}
    </Card>
  );
}

/* ============ PROGRESO (punto 8.4) ============ */
function Progreso({ perfil, estados, marcas }) {
  const serie = (p) => marcas.filter((m) => m.prueba === p).sort((a, b) => String(a.fecha).localeCompare(String(b.fecha))).map((m) => ({ fecha: fmtFecha(m.fecha), valor: Number(m.valor) }));
  return (
    <div style={{ display: "grid", gap: 14 }}>
      {F.PRUEBAS_FIS.map((p) => {
        const datos = serie(p);
        const mb = F.marcasBaremo(p, perfil.sexo);
        const e = estados[p];
        const dg = e && F.diagnostico(e);
        return (
          <Card key={p}>
            <H2>{F.NOMBRE_LARGO[p]}</H2>
            {datos.length < 2 ? (
              <Vacio texto={datos.length ? "Con el próximo test verás tu curva." : "Aún no hay tests de esta prueba."} />
            ) : (
              <div style={{ height: 220 }}>
                <ResponsiveContainer>
                  <LineChart data={datos} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
                    <CartesianGrid stroke={C.line} strokeDasharray="3 3" />
                    <XAxis dataKey="fecha" tick={{ fontSize: 11 }} />
                    <YAxis reversed domain={["auto", "auto"]} tickFormatter={(v) => F.fmtSeg(v)} tick={{ fontSize: 11 }} width={56} />
                    <Tooltip formatter={(v) => F.fmtSeg(v)} />
                    <ReferenceLine y={mb.diez} stroke={C.green} strokeDasharray="4 4" label={{ value: "10", fontSize: 11, fill: C.green }} />
                    <ReferenceLine y={mb.maximo} stroke={C.red} strokeDasharray="4 4" label={{ value: "máx.", fontSize: 11, fill: C.red }} />
                    <Line type="monotone" dataKey="valor" stroke={COLOR[p] === C.yellow ? C.ink : COLOR[p]} strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
            {e && e.marca != null && !e.base && (
              <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
                {["A", "B"].map((t) => {
                  const max = p === "cuerda" && t === "A" ? null : F.CONFIG.NIVEL_MAX;
                  return (
                    <div key={t} style={{ display: "grid", gridTemplateColumns: "150px 1fr 60px", gap: 10, alignItems: "center", fontSize: 13 }}>
                      <span>{p === "cuerda" ? (t === "A" ? "Fuerza (paso)" : "Específico") : t === "A" ? "A · velocidad" : "B · resistencia"}</span>
                      {max ? <StripeBar pct={(e.nivel[t] / max) * 100} color={COLOR[p]} /> : <span />}
                      <span style={{ textAlign: "right", fontWeight: 600 }}>{max ? `${e.nivel[t]} / ${max}` : e.nivel[t]}</span>
                    </div>
                  );
                })}
                {dg && <div style={{ fontSize: 14, color: C.steel }}>{dg.texto}</div>}
              </div>
            )}
            {p === "cuerda" && !perfil.soga && <CurvaDominadas marcas={marcas} />}
          </Card>
        );
      })}
    </div>
  );
}

function CurvaDominadas({ marcas }) {
  const fechas = [...new Set(marcas.filter((m) => m.prueba === "dom" || m.prueba === "dom10").map((m) => m.fecha))].sort();
  const datos = fechas.map((f) => ({
    fecha: fmtFecha(f),
    max: marcas.find((m) => m.prueba === "dom" && m.fecha === f)?.valor ?? null,
    en10: marcas.find((m) => m.prueba === "dom10" && m.fecha === f)?.valor ?? null,
  }));
  if (datos.length < 2) return <div style={{ fontSize: 13, color: C.inkSoft, marginTop: 12 }}>Sin soga, tu avance se sigue con las dominadas máximas y en 10 s: verás la curva cuando las actualices.</div>;
  return (
    <div style={{ height: 180, marginTop: 14 }}>
      <div style={{ fontSize: 13, color: C.inkSoft, marginBottom: 4 }}>Dominadas máximas y en 10 s</div>
      <ResponsiveContainer>
        <LineChart data={datos} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
          <CartesianGrid stroke={C.line} strokeDasharray="3 3" />
          <XAxis dataKey="fecha" tick={{ fontSize: 11 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 11 }} width={32} />
          <Tooltip />
          <Line type="monotone" dataKey="max" name="Máximas" stroke={C.ink} strokeWidth={2} connectNulls />
          <Line type="monotone" dataKey="en10" name="En 10 s" stroke={C.steel} strokeWidth={2} connectNulls />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ============ AJUSTES ============ */
function Ajustes({ user, perfilFila, onGuardado }) {
  const [f, setF] = useState({ ...perfilFila, dia_soga: perfilFila.dia_soga ?? "" });
  const [error, setError] = useState(null);
  const guardar = async () => {
    if (f.soga && f.dia_soga === "") return setError("Elige qué día tienes la soga.");
    try {
      const p = await guardarPerfilFis({ ...soloPerfil(f), dia_soga: f.soga ? Number(f.dia_soga) : null, dias: Number(f.dias) }, user.id);
      onGuardado(p);
    } catch (e) { console.error(e); setError("No se pudo guardar."); }
  };
  return (
    <Card>
      <H2>Ajustes del plan</H2>
      <div style={{ display: "grid", gap: 14 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 14, minWidth: 130 }}>Sexo</span>
          {[["H", "Hombre"], ["M", "Mujer"]].map(([v, t]) => <button key={v} onClick={() => setF({ ...f, sexo: v })} style={chip(f.sexo === v)}>{t}</button>)}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 14, minWidth: 130 }}>Acceso a soga</span>
          <button onClick={() => setF({ ...f, soga: true })} style={chip(f.soga)}>Sí</button>
          <button onClick={() => setF({ ...f, soga: false })} style={chip(!f.soga)}>No</button>
          {f.soga && (
            <select value={f.dia_soga} onChange={(e) => setF({ ...f, dia_soga: e.target.value })} style={inputStyle} aria-label="Día de soga">
              <option value="">¿Qué día?</option>
              {F.DIAS.slice(0, 6).map((d, i) => <option key={d} value={i}>{d}</option>)}
            </select>
          )}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 14, minWidth: 130 }}>Días por semana</span>
          {[3, 4, 5, 6].map((n) => <button key={n} onClick={() => setF({ ...f, dias: n })} style={chip(Number(f.dias) === n)}>{n}</button>)}
        </div>
        <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 14 }}>
          <input type="checkbox" checked={!!f.impacto} onChange={(e) => setF({ ...f, impacto: e.target.checked })} /> Tengo molestias de impacto (rodilla, lumbar)
        </label>
        {error && <div role="alert" style={aviso(C.red)}>{error}</div>}
        <div><button onClick={guardar} style={btnStyle()}>Guardar</button></div>
      </div>
    </Card>
  );
}
export { Alta, Semana, Progreso, Ajustes };

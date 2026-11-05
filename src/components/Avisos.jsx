"use client";
// Avisos de los usuarios sobre preguntas del banco:
// · SenalarPregunta: formulario «⚑ Señalar esta pregunta» (motivo, respuesta propuesta y fuente)
// · MisAvisos: estado de cada aviso, contador, insignia de Revisor y correcciones recientes
// · AvisosResueltos: «Tu aviso ha servido» en el Panel cuando el revisor resuelve un aviso
// Vocabulario fijo: el usuario «señala» y envía un «aviso»; estados Enviado → En revisión → Corregida / Se queda como está.
import React, { useState, useEffect, useMemo } from "react";
import { C, FONT_DISPLAY, FONT_BODY, Card, H2, Vacio, inputStyle, btnStyle } from "./ui";
import { Marca } from "./Insignia";
import { reportarPregunta, getPreguntasPorIds, getCorrecciones, marcarAvisosVistos } from "../lib/supabase";

const LETRAS = "abc";
export const CORRECCIONES_PARA_REVISOR = 3;

export const ESTADO_AVISO = {
  pendiente: { etiqueta: "Enviado", bg: "#C2C8CD", fg: C.ink, texto: "Lo revisamos cada semana." },
  revisada: { etiqueta: "En revisión", bg: C.yellow, fg: C.ink, texto: "Estamos comprobando la fuente." },
  corregida: { etiqueta: "Corregida", bg: C.green, fg: "#fff", texto: "Corregida para todos." },
  descartada: { etiqueta: "Se queda como está", bg: C.steel, fg: "#fff", texto: "La revisamos y se queda como está." },
};
// Las preguntas del callejero se generan en la app (no están en el banco): su aviso va con el id
// «callejero:<id>» y con la pregunta tal como la vio el usuario (las opciones cambian en cada test).
export const PREFIJO_CALLEJERO = "callejero:";
export const esCallejero = (id) => typeof id === "string" && id.startsWith(PREFIJO_CALLEJERO);
export const idAviso = (q) => (q.tema === "Callejero" ? PREFIJO_CALLEJERO + q.id : q.id);
const contextoDe = (q) => ({ pregunta: q.pregunta, opciones: q.opciones, correcta: q.correcta, explicacion: q.explicacion, etiqueta: q.etiqueta || null });
// La pregunta de un aviso: la del banco o, si es del callejero, la que se guardó con el aviso
const preguntaDeAviso = (a, preguntas) =>
  esCallejero(a.pregunta_id) ? (a.contexto ? { ...a.contexto, id: a.pregunta_id, tema: "Callejero" } : null) : preguntas[a.pregunta_id];
const deDonde = (p) => (p ? (p.tema === "Callejero" ? " del callejero" : ` del tema ${p.tema}`) : "");
const idsDelBanco = (ids) => ids.filter((id) => !esCallejero(id));
export const resuelto = (a) => a.estado === "corregida" || a.estado === "descartada";
export const abierto = (a) => a.estado === "pendiente" || a.estado === "revisada";

const MOTIVOS = [
  ["no_se_entiende", "No se entiende"],
  ["respuesta_incorrecta", "La respuesta correcta está mal"],
  ["errata", "Tiene una errata o un dato desactualizado"],
  ["explicacion", "La explicación está cortada o no cuadra"],
  ["otro", "Otra cosa"],
];
const MOTIVO_TEXTO = Object.fromEntries(MOTIVOS);

const FUENTES_CALLEJERO = [
  ["norma", "Anexo III de las bases (BOPZ 170, 27/07/2026)", "Anexo III: la calle … tiene entrada por … y salida por …"],
  ["web_oficial", "Web oficial", "Callejero del Ayuntamiento de Zaragoza"],
  ["otra", "Otra fuente", "Dónde lo has visto"],
];
const FUENTES = [
  ["norma", "Ley o norma (BOE, BOA, BOPZ)", "Ley 31/1995, art. 35.2"],
  ["manual", "Manual del temario", "IVASPE, tomo 2, pág. 143"],
  ["web_oficial", "Web oficial", "Ayuntamiento de Zaragoza, ordenanza de…"],
  ["otra", "Otra fuente", "Dónde lo has leído"],
];

const fmtDia = (iso) => (iso ? new Date(iso).toLocaleDateString("es-ES", { day: "numeric", month: "short" }) : "");

export function ChipEstado({ estado }) {
  const e = ESTADO_AVISO[estado] || ESTADO_AVISO.pendiente;
  return (
    <span style={{ display: "inline-block", background: e.bg, color: e.fg, fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 12, letterSpacing: 0.8, textTransform: "uppercase", padding: "2px 8px", borderRadius: 3, lineHeight: 1.4 }}>
      {e.etiqueta}
    </span>
  );
}

/* ============ SEÑALAR UNA PREGUNTA ============ */
// revelar = false en un examen en curso: no se puede indicar cuál es «la de ahora» sin destapar la respuesta.
export function SenalarPregunta({ q, revelar = true, user, aviso, onAviso }) {
  const cj = q.tema === "Callejero";
  const fuentes = cj ? FUENTES_CALLEJERO : FUENTES;
  const [abiertoF, setAbiertoF] = useState(false);
  const [motivo, setMotivo] = useState("");
  const [opcion, setOpcion] = useState(null);
  const [fuenteTipo, setFuenteTipo] = useState("norma");
  const [fuenteRef, setFuenteRef] = useState("");
  const [fuenteUrl, setFuenteUrl] = useState("");
  const [comentario, setComentario] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [msg, setMsg] = useState(null); // { ok, texto }

  const abrir = () => {
    // si ya la había señalado, el formulario se abre con lo que envió
    setMotivo(aviso?.motivo || "");
    setOpcion(aviso?.opcion_propuesta ?? null);
    setFuenteTipo(aviso?.fuente_tipo || "norma");
    setFuenteRef(aviso?.fuente_ref || "");
    setFuenteUrl(aviso?.fuente_url || "");
    setComentario(aviso?.comentario || "");
    setMsg(null);
    setAbiertoF(true);
  };

  const enviar = async () => {
    if (enviando) return;
    if (!motivo) { setMsg({ ok: false, texto: "Elige qué le pasa a la pregunta antes de enviar." }); return; }
    const url = fuenteUrl.trim();
    if (url && !/^https:\/\//i.test(url)) { setMsg({ ok: false, texto: "El enlace tiene que empezar por https://" }); return; }
    setEnviando(true); setMsg(null);
    try {
      const fila = await reportarPregunta(
        { preguntaId: idAviso(q), motivo, comentario, opcionPropuesta: opcion, fuenteTipo, fuenteRef, fuenteUrl: url, contexto: cj ? contextoDe(q) : null },
        user.id
      );
      onAviso?.(fila);
      setAbiertoF(false);
      setMsg({ ok: true });
    } catch (e) {
      console.error("reportarPregunta:", e);
      setMsg({ ok: false, texto: "No se pudo enviar el aviso. Inténtalo de nuevo en un momento." });
    }
    setEnviando(false);
  };

  const etiqueta = { fontSize: 14, display: "flex", alignItems: "center", gap: 8, padding: "4px 0", cursor: "pointer" };
  const sub = { fontWeight: 600, fontSize: 14, margin: "12px 0 6px" };
  const placeholderRef = (fuentes.find((f) => f[0] === fuenteTipo) || fuentes[0])[2];

  return (
    <div style={{ marginTop: 10 }}>
      {!abiertoF && (
        <button onClick={abrir} aria-expanded={false}
          style={{ background: "none", border: "none", padding: "4px 0", fontSize: 13, fontFamily: FONT_BODY, color: aviso ? C.steel : C.inkSoft, textDecoration: "underline", textUnderlineOffset: 3 }}>
          ⚑ {aviso ? `Ya la señalaste · ${ESTADO_AVISO[aviso.estado]?.etiqueta || "Enviado"} · cambiar el aviso` : "Señalar esta pregunta"}
        </button>
      )}
      {msg?.ok && (
        <div role="status" style={{ marginTop: 4, padding: "10px 12px", background: "#E6F2EA", borderLeft: `4px solid ${C.green}`, borderRadius: 4, fontSize: 14 }}>
          <strong style={{ color: C.green }}>✓ Aviso enviado.</strong> Lo revisamos cada semana. Verás en qué estado está en «Mis avisos» y te avisaremos al entrar en la app cuando esté resuelto.
        </div>
      )}
      {abiertoF && (
        <div style={{ marginTop: 4, padding: 12, background: "#F4F6F7", border: `1px solid ${C.line}`, borderRadius: 5 }}>
          <fieldset style={{ border: "none", margin: 0, padding: 0 }}>
            <legend style={{ fontWeight: 600, fontSize: 14, marginBottom: 4, padding: 0 }}>¿Qué le pasa a esta pregunta?</legend>
            {MOTIVOS.map(([v, t]) => (
              <label key={v} style={etiqueta}>
                <input type="radio" name={`motivo-${q.id}`} value={v} checked={motivo === v} onChange={() => { setMotivo(v); setMsg(null); }} style={{ width: 16, height: 16, margin: 0 }} />
                {t}
              </label>
            ))}
          </fieldset>

          {motivo === "respuesta_incorrecta" && (
            <fieldset style={{ border: "none", margin: 0, padding: 0 }}>
              <legend style={{ ...sub, padding: 0 }}>¿Cuál crees que es la correcta?</legend>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                {[0, 1, 2].map((i) => {
                  const actual = revelar && i === q.correcta;
                  const sel = opcion === i;
                  return (
                    <button key={i} type="button" disabled={actual} aria-pressed={sel} onClick={() => setOpcion(sel ? null : i)}
                      style={{ padding: "8px 4px", borderRadius: 4, border: `2px solid ${sel ? C.green : C.line}`, background: actual ? "#E3E6E8" : sel ? "#E6F2EA" : "#fff", color: actual ? C.inkSoft : C.ink, fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 17, cursor: actual ? "not-allowed" : "pointer", lineHeight: 1.1 }}>
                      {LETRAS[i]})
                      {actual && <span style={{ display: "block", fontFamily: FONT_BODY, fontWeight: 400, fontSize: 11 }}>la de ahora</span>}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}

          <div style={sub}>¿Dónde lo has visto? <span style={{ fontWeight: 400, color: C.inkSoft }}>(opcional, pero nos ayuda mucho)</span></div>
          <div style={{ display: "grid", gap: 6 }}>
            <select value={fuenteTipo} onChange={(e) => setFuenteTipo(e.target.value)} aria-label="Tipo de fuente" style={inputStyle}>
              {fuentes.map(([v, t]) => <option key={v} value={v}>{t}</option>)}
            </select>
            <input value={fuenteRef} onChange={(e) => setFuenteRef(e.target.value)} maxLength={200} aria-label="Referencia" placeholder={placeholderRef} style={inputStyle} />
            <input value={fuenteUrl} onChange={(e) => setFuenteUrl(e.target.value)} maxLength={500} aria-label="Enlace (opcional)" placeholder={cj ? "Enlace (opcional): https://www.zaragoza.es/…" : "Enlace (opcional): https://www.boe.es/…"} inputMode="url" style={inputStyle} />
          </div>
          <p style={{ fontSize: 13, margin: "6px 0 0", padding: "8px 10px", background: "#FFF6DB", border: `1px solid ${C.yellow}`, borderRadius: 4 }}>
            {cj
              ? "No hace falta que subas nada: dinos qué pone el Anexo III para esa calle o polígono y lo comprobamos."
              : "No hace falta que subas nada: con la ley y el artículo, o el manual y la página, lo comprobamos."}
          </p>

          <textarea value={comentario} onChange={(e) => setComentario(e.target.value)} maxLength={1000} rows={3}
            aria-label="Comentario (opcional)" placeholder="Cuéntanos qué has visto (opcional)"
            style={{ ...inputStyle, width: "100%", boxSizing: "border-box", marginTop: 10, resize: "vertical" }} />
          <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
            <button onClick={enviar} disabled={enviando} style={{ ...btnStyle(), padding: "6px 14px", fontSize: 13, opacity: enviando ? 0.6 : 1 }}>
              {enviando ? "Enviando…" : "Enviar aviso"}
            </button>
            <button onClick={() => { setAbiertoF(false); setMsg(null); }} style={{ ...btnStyle("transparent", C.inkSoft), border: `1px solid ${C.line}`, padding: "6px 14px", fontSize: 13 }}>Cancelar</button>
          </div>
          {msg && !msg.ok && <p role="alert" style={{ fontSize: 13, margin: "8px 0 0", color: C.red }}>{msg.texto}</p>}
          <p style={{ fontSize: 11, color: C.inkSoft, margin: "8px 0 0" }}>
            Tu aviso solo lo ve quien revisa el banco. Si sirve para corregir la pregunta, el cambio se aplica para todos.
          </p>
        </div>
      )}
    </div>
  );
}

/* ============ qué cambió en una pregunta ============ */
function textoOpcion(opciones, i) {
  return i == null || !opciones ? "" : `${LETRAS[i]}) ${opciones[i] ?? ""}`;
}
// Antes / ahora a partir del registro de correcciones de una pregunta
function AntesAhora({ correcciones, pregunta }) {
  if (!correcciones?.length) return null;
  const porCampo = Object.fromEntries([...correcciones].reverse().map((c) => [c.campo, c])); // la más reciente gana
  const filas = [];
  const opcionesAntes = porCampo.opciones?.antes || pregunta?.opciones;
  const opcionesAhora = pregunta?.opciones || porCampo.opciones?.despues;
  if (porCampo.correcta) filas.push(["Respuesta", textoOpcion(opcionesAntes, porCampo.correcta.antes), textoOpcion(opcionesAhora, porCampo.correcta.despues)]);
  if (porCampo.pregunta) filas.push(["Enunciado", porCampo.pregunta.antes, porCampo.pregunta.despues]);
  if (porCampo.opciones && !porCampo.correcta) filas.push(["Opciones", (porCampo.opciones.antes || []).join(" · "), (porCampo.opciones.despues || []).join(" · ")]);
  if (porCampo.explicacion) filas.push(["Explicación", porCampo.explicacion.antes, porCampo.explicacion.despues]);
  const fuente = correcciones.find((c) => c.fuente_ref)?.fuente_ref;
  return (
    <div style={{ border: `1px solid ${C.line}`, borderRadius: 4, overflow: "hidden", fontSize: 13, marginTop: 8 }}>
      {filas.map(([campo, antes, ahora]) => (
        <div key={campo}>
          <div style={{ display: "flex", gap: 8, padding: "6px 10px", background: "#FBE9E7" }}>
            <span style={{ fontWeight: 700, color: C.red, fontSize: 11, textTransform: "uppercase", minWidth: 52 }}>Antes</span>
            <span style={{ textDecoration: "line-through", color: C.inkSoft }}>{campo === "Respuesta" ? antes : String(antes ?? "—")}</span>
          </div>
          <div style={{ display: "flex", gap: 8, padding: "6px 10px", background: "#E6F2EA" }}>
            <span style={{ fontWeight: 700, color: C.green, fontSize: 11, textTransform: "uppercase", minWidth: 52 }}>Ahora</span>
            <span><strong>{campo}: </strong>{String(ahora ?? "—")}</span>
          </div>
        </div>
      ))}
      {fuente && <div style={{ padding: "6px 10px", color: C.inkSoft, fontSize: 12 }}>Fuente: {fuente}</div>}
    </div>
  );
}

/* ============ TU AVISO HA SERVIDO (Panel) ============ */
export function AvisosResueltos({ avisos, onVer, onVistos }) {
  const nuevos = useMemo(() => avisos.filter((a) => resuelto(a) && !a.visto_at && a.resuelto_at), [avisos]);
  const [preguntas, setPreguntas] = useState({});
  const [correcciones, setCorrecciones] = useState({});
  const clave = nuevos.map((a) => a.id).join(",");
  useEffect(() => {
    if (!nuevos.length || nuevos.length > 2) return;
    const ids = idsDelBanco(nuevos.map((a) => a.pregunta_id));
    if (!ids.length) return;
    getPreguntasPorIds(ids).then((ps) => setPreguntas(Object.fromEntries(ps.map((p) => [p.id, p])))).catch(() => {});
    getCorrecciones({ preguntaIds: ids }).then((cs) => {
      const m = {};
      cs.forEach((c) => (m[c.pregunta_id] ||= []).push(c));
      setCorrecciones(m);
    });
  }, [clave]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!nuevos.length) return null;
  const entendido = (lista) => {
    const ids = lista.map((a) => a.id);
    marcarAvisosVistos(ids);
    onVistos?.(ids);
  };
  const botones = (lista) => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
      <button onClick={() => { entendido(lista); onVer?.(); }} style={btnStyle(C.steel)}>Ver en Mis avisos</button>
      <button onClick={() => entendido(lista)} style={{ ...btnStyle("transparent", C.ink), border: `1px solid ${C.line}` }}>Entendido</button>
    </div>
  );

  if (nuevos.length > 2) {
    const corregidas = nuevos.filter((a) => a.estado === "corregida").length;
    return (
      <Card style={{ borderTop: `6px solid ${C.green}` }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 24, textTransform: "uppercase", lineHeight: 1.1, color: C.green }}>✓ {nuevos.length} avisos tuyos resueltos</div>
        <p style={{ fontSize: 14, margin: "6px 0 0" }}>
          {corregidas > 0 ? `${corregidas} pregunta${corregidas > 1 ? "s" : ""} corregida${corregidas > 1 ? "s" : ""} gracias a ti. ` : ""}Mira la respuesta del revisor en cada una.
        </p>
        {botones(nuevos)}
      </Card>
    );
  }

  return (
    <>
      {nuevos.map((a) => {
        const p = preguntaDeAviso(a, preguntas);
        const corr = correcciones[a.pregunta_id];
        const ok = a.estado === "corregida";
        const cambioRespuesta = corr?.some((c) => c.campo === "correcta");
        return (
          <Card key={a.id} style={{ borderTop: `6px solid ${ok ? C.green : C.steel}` }}>
            <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 24, textTransform: "uppercase", lineHeight: 1.1, color: ok ? C.green : C.steel }}>
              {ok ? "✓ Tu aviso ha servido" : "Revisamos tu aviso"}
            </div>
            <p style={{ fontSize: 14, margin: "6px 0 0" }}>
              {ok
                ? <>Corregida la pregunta <strong>{a.pregunta_id}</strong>{deDonde(p)}. Ahora está bien para todos los opositores.</>
                : <>La pregunta <strong>{a.pregunta_id}</strong>{deDonde(p)} se queda como está.</>}
            </p>
            {p && <div style={{ fontWeight: 600, fontSize: 14, marginTop: 8 }}>{p.pregunta}</div>}
            {ok && <AntesAhora correcciones={corr} pregunta={p} />}
            {a.respuesta_revisor && (
              <div style={{ marginTop: 8, paddingLeft: 10, borderLeft: `3px solid ${C.line}`, fontSize: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.inkSoft }}>Revisión</div>
                <em>«{a.respuesta_revisor}»</em>
              </div>
            )}
            {ok && cambioRespuesta && <p style={{ fontSize: 12, color: C.inkSoft, margin: "8px 0 0" }}>Si la fallaste con la respuesta antigua, ya no te cuenta como fallada.</p>}
            {botones([a])}
          </Card>
        );
      })}
    </>
  );
}

/* ============ MIS AVISOS ============ */
const FILTROS = [
  ["todos", "Todos", () => true],
  ["abiertos", "Abiertos", abierto],
  ["corregida", "Corregidas", (a) => a.estado === "corregida"],
  ["descartada", "Se quedan como están", (a) => a.estado === "descartada"],
];
const CAMPO_TEXTO = { correcta: "respuesta correcta", explicacion: "explicación", pregunta: "enunciado", opciones: "opciones" };

export function MisAvisos({ avisos, onVolver, onRepasar, onVistos, cargando }) {
  const [filtro, setFiltro] = useState("todos");
  const [preguntas, setPreguntas] = useState({});
  const [correcciones, setCorrecciones] = useState({});
  const [recientes, setRecientes] = useState(null);
  const [abiertoId, setAbiertoId] = useState(null);

  const clave = avisos.map((a) => a.pregunta_id).join(",");
  useEffect(() => {
    const ids = idsDelBanco([...new Set(avisos.map((a) => a.pregunta_id))]);
    if (ids.length) {
      getPreguntasPorIds(ids.slice(0, 300)).then((ps) => setPreguntas(Object.fromEntries(ps.map((p) => [p.id, p])))).catch(() => {});
      const resueltos = idsDelBanco(avisos.filter((a) => a.estado === "corregida").map((a) => a.pregunta_id));
      if (resueltos.length) getCorrecciones({ preguntaIds: resueltos }).then((cs) => {
        const m = {};
        cs.forEach((c) => (m[c.pregunta_id] ||= []).push(c));
        setCorrecciones(m);
      });
    }
    // al entrar aquí, los resueltos quedan vistos
    const sinVer = avisos.filter((a) => resuelto(a) && !a.visto_at && a.resuelto_at).map((a) => a.id);
    if (sinVer.length) { marcarAvisosVistos(sinVer); onVistos?.(sinVer); }
  }, [clave]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { getCorrecciones({ limite: 15 }).then(setRecientes); }, []);

  const corregidas = avisos.filter((a) => a.estado === "corregida").length;
  const faltan = Math.max(0, CORRECCIONES_PARA_REVISOR - corregidas);
  const lista = avisos.filter(FILTROS.find((f) => f[0] === filtro)[2]);
  const contar = (fn) => avisos.filter(fn).length;

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div>
        <button onClick={onVolver} style={{ background: "none", border: "none", padding: 0, color: C.steel, fontSize: 14, fontFamily: FONT_BODY, textDecoration: "underline", textUnderlineOffset: 3 }}>
          ‹ Volver al temario
        </button>
      </div>

      <Card>
        <H2>Mis avisos</H2>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 52, lineHeight: 1, color: C.green }}>{corregidas}</div>
          <div style={{ flex: 1, minWidth: 180 }}>
            <div style={{ fontWeight: 700, fontSize: 16 }}>pregunta{corregidas === 1 ? "" : "s"} mejorada{corregidas === 1 ? "" : "s"} gracias a ti</div>
            <div style={{ fontSize: 13, color: C.inkSoft }}>de {avisos.length} aviso{avisos.length === 1 ? "" : "s"} enviado{avisos.length === 1 ? "" : "s"} · las correcciones valen para todos</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.line}`, fontSize: 14 }}>
          <span style={{ opacity: faltan ? 0.35 : 1, filter: faltan ? "grayscale(1)" : "none", display: "inline-flex" }}><Marca size={36} /></span>
          {faltan
            ? <span>Te falta{faltan > 1 ? "n" : ""} <strong>{faltan} {faltan > 1 ? "correcciones aceptadas" : "corrección aceptada"}</strong> para la insignia de <strong>Revisor</strong>.</span>
            : <span><strong>Insignia de Revisor conseguida.</strong> <span style={{ color: C.inkSoft }}>Por {CORRECCIONES_PARA_REVISOR} o más correcciones aceptadas.</span></span>}
        </div>
      </Card>

      <Card>
        {avisos.length === 0 ? (
          <>
            <Vacio texto="Aún no has señalado ninguna pregunta. Cuando una te parezca mal, pulsa «⚑ Señalar esta pregunta» en el test (también en el callejero) y aparecerá aquí." />
            <button onClick={onVolver} style={{ ...btnStyle(), marginTop: 10 }}>Hacer un test</button>
          </>
        ) : (
          <>
            <div role="group" aria-label="Filtrar avisos" style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 6 }}>
              {FILTROS.map(([id, t, fn]) => (
                <button key={id} onClick={() => setFiltro(id)} aria-pressed={filtro === id}
                  style={{ padding: "5px 12px", borderRadius: 14, fontSize: 13, fontFamily: FONT_BODY, border: `1px solid ${filtro === id ? C.ink : C.line}`, background: filtro === id ? C.ink : "#fff", color: filtro === id ? "#fff" : C.ink }}>
                  {t} {contar(fn)}
                </button>
              ))}
            </div>
            {lista.length === 0 && <Vacio texto="No hay avisos en este grupo." />}
            {lista.map((a) => {
              const p = preguntaDeAviso(a, preguntas);
              const cj = esCallejero(a.pregunta_id);
              const e = ESTADO_AVISO[a.estado] || ESTADO_AVISO.pendiente;
              const ver = abiertoId === a.id;
              return (
                <div key={a.id} style={{ borderTop: `1px solid ${C.line}`, padding: "12px 0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", fontSize: 12, color: C.inkSoft }}>
                    <ChipEstado estado={a.estado} />
                    <span>{cj ? "Callejero · " : p ? `Tema ${p.tema} · ` : ""}{cj ? p?.etiqueta?.replace(/^Callejero · /, "") || "pregunta" : a.pregunta_id} · {fmtDia(a.updated_at || a.created_at)}</span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, margin: "6px 0 2px", display: "-webkit-box", WebkitLineClamp: ver ? "unset" : 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {p ? p.pregunta : "…"}
                  </div>
                  <div style={{ fontSize: 12, color: C.inkSoft }}>
                    Tu aviso: {MOTIVO_TEXTO[a.motivo] || a.motivo}
                    {a.opcion_propuesta != null && ` · propones la ${LETRAS[a.opcion_propuesta]})`}
                    {a.fuente_ref && ` · ${a.fuente_ref}`}
                  </div>
                  {a.respuesta_revisor
                    ? <div style={{ fontSize: 13, marginTop: 6, paddingLeft: 10, borderLeft: `3px solid ${e.bg}` }}><em>«{a.respuesta_revisor}»</em></div>
                    : <div style={{ fontSize: 13, marginTop: 6, color: C.inkSoft }}>{e.texto}</div>}
                  {resuelto(a) && p && !cj && (
                    <div style={{ display: "flex", gap: 12, marginTop: 6, flexWrap: "wrap" }}>
                      <button onClick={() => setAbiertoId(ver ? null : a.id)} aria-expanded={ver}
                        style={{ background: "none", border: "none", padding: 0, fontSize: 13, fontFamily: FONT_BODY, color: C.red, textDecoration: "underline", textUnderlineOffset: 3 }}>
                        {ver ? "Ocultar" : "Ver cómo ha quedado"}
                      </button>
                      <button onClick={() => onRepasar?.([a.pregunta_id])} disabled={cargando}
                        style={{ background: "none", border: "none", padding: 0, fontSize: 13, fontFamily: FONT_BODY, color: C.steel, textDecoration: "underline", textUnderlineOffset: 3 }}>
                        Repasarla
                      </button>
                    </div>
                  )}
                  {ver && p && !cj && (
                    <div style={{ marginTop: 8, fontSize: 14 }}>
                      {p.opciones.map((op, i) => (
                        <div key={i} style={{ padding: "3px 0", color: i === p.correcta ? C.green : C.ink, fontWeight: i === p.correcta ? 700 : 400 }}>
                          {LETRAS[i]}) {op}{i === p.correcta ? " ✓" : ""}
                        </div>
                      ))}
                      {p.explicacion && <div style={{ color: C.inkSoft, marginTop: 4 }}>{p.explicacion}</div>}
                      <AntesAhora correcciones={correcciones[a.pregunta_id]} pregunta={p} />
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}
      </Card>

      <Card>
        <H2>Correcciones recientes</H2>
        <p style={{ fontSize: 13, color: C.inkSoft, margin: "0 0 8px" }}>Lo último que se ha corregido en el banco, venga de tus avisos o de los de otros opositores.</p>
        {recientes === null ? <Vacio texto="Cargando…" /> : recientes.length === 0 ? <Vacio texto="Todavía no hay correcciones registradas." /> : (
          recientes.map((c) => (
            <div key={c.id} style={{ display: "flex", gap: 10, fontSize: 13, padding: "6px 0", borderTop: `1px solid ${C.line}` }}>
              <span style={{ color: C.inkSoft, minWidth: 54 }}>{fmtDia(c.created_at)}</span>
              <span style={{ flex: 1 }}>
                <strong>{c.pregunta_id}</strong> · corregida la {CAMPO_TEXTO[c.campo] || c.campo}
                {c.campo === "correcta" && ` (antes la ${LETRAS[c.antes]}, ahora la ${LETRAS[c.despues]})`}
                {c.fuente_ref && <span style={{ color: C.inkSoft }}> · {c.fuente_ref}</span>}
              </span>
            </div>
          ))
        )}
      </Card>
    </div>
  );
}

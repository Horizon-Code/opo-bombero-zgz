"use client";
import { createBrowserClient } from "@supabase/ssr";

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

/* ---------- auth ---------- */
export async function loginGoogle() {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: typeof window !== "undefined" ? `${window.location.origin}/app` : undefined },
  });
}
// Entrada con el botón de Google (Google Identity Services). Google entrega un
// token de identidad en esta misma página y se lo pasamos a Supabase: la ventana
// de Google muestra nuestro dominio y no el de Supabase.
export async function loginGoogleConToken(token, nonce) {
  const { error } = await supabase.auth.signInWithIdToken({ provider: "google", token, nonce });
  if (error) throw error;
}
export async function logout() {
  await supabase.auth.signOut();
}

/* ---------- resultados ---------- */
export const getResultados = async () =>
  (await supabase.from("resultados").select("*").order("created_at")).data || [];
export const addResultado = async (r, userId) =>
  (await supabase.from("resultados").insert({ ...r, user_id: userId }).select().single()).data;

/* ---------- marcas y objetivos ---------- */
export const getMarcas = async () =>
  (await supabase.from("marcas").select("*").order("fecha")).data || [];
export const addMarca = async (m, userId) =>
  (await supabase.from("marcas").insert({ ...m, user_id: userId }).select().single()).data;
export const delMarca = async (id) => supabase.from("marcas").delete().eq("id", id);
export const getObjetivos = async () => {
  const rows = (await supabase.from("objetivos").select("*")).data || [];
  return Object.fromEntries(rows.map((r) => [r.prueba, Number(r.valor)]));
};
export const setObjetivo = async (prueba, valor, userId) =>
  supabase.from("objetivos").upsert({ user_id: userId, prueba, valor });

/* ---------- diario: la tabla sigue en la base de datos, la app ya no la usa ---------- */

/* ---------- banco común de preguntas ---------- */
// Trae las preguntas pedidas por id (en tandas para no pasarse de longitud de URL)
export const getPreguntasPorIds = async (ids) => {
  const out = [];
  for (let i = 0; i < ids.length; i += 150) {
    const { data, error } = await supabase.from("banco_preguntas")
      .select("id,tema,nodo,bloque,tipo,dificultad,pregunta,opciones,correcta,explicacion,cita")
      .in("id", ids.slice(i, i + 150));
    if (error) throw error;
    out.push(...(data || []));
  }
  const orden = new Map(ids.map((id, i) => [id, i]));
  return out.sort((a, b) => orden.get(a.id) - orden.get(b.id));
};

/* ---------- progreso del usuario por pregunta ---------- */
// Supabase devuelve como mucho 1.000 filas por petición: se pagina.
export const getProgreso = async () => {
  const filas = [];
  for (let desde = 0; ; desde += 1000) {
    const { data, error } = await supabase.from("progreso")
      .select("pregunta_id,bloque,vistas,aciertos,ultimo_resultado,ultima_fecha")
      .order("pregunta_id").range(desde, desde + 999);
    if (error) throw error;
    filas.push(...(data || []));
    if (!data || data.length < 1000) break;
  }
  return Object.fromEntries(filas.map((r) => [r.pregunta_id, r]));
};
/* ---------- avisos: preguntas señaladas por el usuario ---------- */
// Un aviso por persona y pregunta: si la vuelve a señalar, se actualiza y queda pendiente otra vez
// (un trigger de la migración 6 limpia la respuesta del revisor anterior).
export const reportarPregunta = async ({ preguntaId, motivo, comentario, opcionPropuesta, fuenteTipo, fuenteRef, fuenteUrl, contexto = null }, userId) => {
  const limpio = (t, max) => (t?.trim() ? t.trim().slice(0, max) : null);
  const base = {
    user_id: userId, pregunta_id: preguntaId, motivo,
    comentario: limpio(comentario, 1000),
    estado: "pendiente", updated_at: new Date().toISOString(),
  };
  const conFuente = {
    ...base,
    opcion_propuesta: motivo === "respuesta_incorrecta" && opcionPropuesta != null ? opcionPropuesta : null,
    fuente_tipo: limpio(fuenteRef, 200) || limpio(fuenteUrl, 500) ? fuenteTipo || "otra" : null,
    fuente_ref: limpio(fuenteRef, 200),
    fuente_url: limpio(fuenteUrl, 500),
    contexto,                         // solo callejero: la pregunta tal como se vio (migración 8)
  };
  const tabla = supabase.from("reportes_preguntas");
  let { data, error } = await tabla.upsert(conFuente, { onConflict: "user_id,pregunta_id" }).select(CAMPOS_AVISO).single();
  // Sin la migración 6 (columnas nuevas) se guarda lo básico, como antes
  if (error && /column|schema cache|violates check/i.test(error.message || "")) {
    const extra = [
      conFuente.opcion_propuesta != null && `Propone la ${"abc"[conFuente.opcion_propuesta]})`,
      conFuente.fuente_ref && `Fuente: ${conFuente.fuente_ref}`,
      conFuente.fuente_url,
    ].filter(Boolean).join(" · ");
    const comentarioPlano = [base.comentario, extra].filter(Boolean).join("\n").slice(0, 1000) || null;
    ({ data, error } = await supabase.from("reportes_preguntas")
      .upsert({ ...base, motivo: motivo === "explicacion" ? "otro" : motivo, comentario: comentarioPlano }, { onConflict: "user_id,pregunta_id" })
      .select("id,pregunta_id,motivo,comentario,estado,created_at,updated_at").single());
  }
  if (error) throw error;
  return data;
};
const CAMPOS_AVISO =
  "id,pregunta_id,contexto,motivo,comentario,opcion_propuesta,fuente_tipo,fuente_ref,fuente_url,estado,respuesta_revisor,resuelto_at,visto_at,created_at,updated_at";
// Todos los avisos del usuario (RLS: solo los suyos). Si la migración 6 no está aplicada, cae a lo básico.
export const getMisAvisos = async () => {
  let { data, error } = await supabase.from("reportes_preguntas").select(CAMPOS_AVISO).order("created_at", { ascending: false });
  if (error) {
    ({ data, error } = await supabase.from("reportes_preguntas").select("id,pregunta_id,motivo,comentario,estado,created_at,updated_at").order("created_at", { ascending: false }));
  }
  if (error) { console.error("getMisAvisos:", error); return []; }
  return data || [];
};
export const marcarAvisosVistos = async (ids) => {
  if (!ids.length) return;
  const { error } = await supabase.rpc("marcar_avisos_vistos", { ids });
  if (error) console.error("marcarAvisosVistos:", error);
};
// Registro de correcciones del banco (lectura para cualquier usuario con sesión)
export const getCorrecciones = async ({ preguntaIds, limite = 30 } = {}) => {
  let q = supabase.from("correcciones").select("id,pregunta_id,campo,antes,despues,fuente_ref,created_at").order("created_at", { ascending: false });
  if (preguntaIds) q = q.in("pregunta_id", preguntaIds.slice(0, 150));
  else q = q.limit(limite);
  const { data, error } = await q;
  if (error) { console.error("getCorrecciones:", error); return []; }
  return data || [];
};

export const guardarProgreso = async (filas, userId) => {
  if (!filas.length) return;
  const { error } = await supabase.from("progreso").upsert(filas.map((f) => ({ ...f, user_id: userId })));
  if (error) console.error("guardarProgreso:", error);
};

/* ---------- progreso del callejero (migración 7) ---------- */
export const getProgresoCallejero = async () => {
  const filas = [];
  for (let desde = 0; ; desde += 1000) {
    const { data, error } = await supabase.from("progreso_callejero")
      .select("pregunta_id,vistas,aciertos,ultimo_resultado,ultima_fecha")
      .order("pregunta_id").range(desde, desde + 999);
    if (error) { console.error("getProgresoCallejero:", error); break; }
    filas.push(...(data || []));
    if (!data || data.length < 1000) break;
  }
  return Object.fromEntries(filas.map((r) => [r.pregunta_id, r]));
};
export const guardarProgresoCallejero = async (filas, userId) => {
  if (!filas.length) return;
  const { error } = await supabase.from("progreso_callejero").upsert(filas.map((f) => ({ ...f, user_id: userId })));
  if (error) console.error("guardarProgresoCallejero:", error);
};

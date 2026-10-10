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
    options: { redirectTo: typeof window !== "undefined" ? window.location.origin : undefined },
  });
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
export const guardarProgreso = async (filas, userId) => {
  if (!filas.length) return;
  const { error } = await supabase.from("progreso").upsert(filas.map((f) => ({ ...f, user_id: userId })));
  if (error) console.error("guardarProgreso:", error);
};

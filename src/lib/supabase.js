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

/* ---------- temas ---------- */
export const getTemas = async () =>
  (await supabase.from("temas").select("id,nombre,contenido,created_at").order("created_at")).data || [];
export const addTema = async (nombre, contenido, userId) =>
  (await supabase.from("temas").insert({ nombre, contenido, user_id: userId }).select().single()).data;
export const delTema = async (id) => supabase.from("temas").delete().eq("id", id);

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

/* ---------- diario ---------- */
export const getDiario = async () => {
  const rows = (await supabase.from("diario").select("*")).data || [];
  return Object.fromEntries(rows.map((r) => [r.fecha, r]));
};
export const upsertDiario = async (fecha, campos, userId) =>
  supabase.from("diario").upsert({ user_id: userId, fecha, ...campos });

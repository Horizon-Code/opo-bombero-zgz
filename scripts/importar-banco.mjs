// Sube el banco de preguntas (corpus-bombero/banco/tema-NN.json) a la tabla
// public.banco_preguntas de Supabase. Se puede repetir: hace upsert por id,
// salvo en las preguntas corregidas a mano desde Supabase (editada_at), que no se tocan.
//
// Uso (desde la raíz del repo, después de ejecutar supabase/migracion_4.sql):
//   SUPABASE_SERVICE_ROLE_KEY=eyJ... node scripts/importar-banco.mjs <carpeta banco>
// La URL se lee de NEXT_PUBLIC_SUPABASE_URL (o de .env.local).
// La service role key está en Supabase > Project Settings > API. No la subas a git
// ni la pongas en Vercel: solo hace falta en tu máquina para esta carga.
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const dir = process.argv[2];
if (!dir) { console.error("Uso: node scripts/importar-banco.mjs <carpeta banco>"); process.exit(1); }

// lee .env.local si existe (sin dependencias)
if (fs.existsSync(".env.local")) {
  for (const l of fs.readFileSync(".env.local", "utf8").split(/\r?\n/)) {
    const m = l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) { console.error("Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY"); process.exit(1); }
const sb = createClient(url, key, { auth: { persistSession: false } });

const ficheros = fs.readdirSync(dir).filter((f) => /^tema-\d\d\.json$/.test(f)).sort();
if (!ficheros.length) { console.error(`No hay tema-NN.json en ${dir}`); process.exit(1); }

// Preguntas corregidas a mano en Supabase (resolver_pregunta, migración 6): NO se pisan.
// Para que el corpus mande otra vez sobre una de ellas: update banco_preguntas set editada_at = null where id = '…';
const editadas = new Set();
for (let desde = 0; ; desde += 1000) {
  const { data, error } = await sb.from("banco_preguntas").select("id").not("editada_at", "is", null).range(desde, desde + 999);
  if (error) {
    if (/editada_at/.test(error.message)) break; // sin migración 6: no hay preguntas editadas
    console.error(`Leyendo preguntas editadas: ${error.message}`); process.exit(1);
  }
  data.forEach((r) => editadas.add(r.id));
  if (data.length < 1000) break;
}
if (editadas.size) console.log(`Se respetan ${editadas.size} preguntas corregidas a mano (no se sobrescriben).`);

let total = 0, saltadas = 0;
for (const f of ficheros) {
  const todas = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
  const filas = todas.filter((q) => !editadas.has(q.id)).map((q) => ({
    id: q.id, tema: q.tema, nodo: q.nodo, bloque: q.bloque_id, tambien_en: q.tambien_en || [],
    tipo: q.tipo, dificultad: q.dificultad, pregunta: q.pregunta, opciones: q.opciones,
    correcta: q.correcta, explicacion: q.explicacion || null, cita: q.cita || null,
  }));
  for (let i = 0; i < filas.length; i += 500) {
    const { error } = await sb.from("banco_preguntas").upsert(filas.slice(i, i + 500));
    if (error) { console.error(`${f}: ${error.message}`); process.exit(1); }
  }
  total += filas.length;
  saltadas += todas.length - filas.length;
  console.log(`${f}: ${filas.length}${todas.length > filas.length ? ` (${todas.length - filas.length} corregidas a mano, sin tocar)` : ""}`);
}
const { count } = await sb.from("banco_preguntas").select("id", { count: "exact", head: true });
console.log(`Subidas ${total} preguntas${saltadas ? ` (+${saltadas} corregidas a mano sin tocar)` : ""}. En la tabla hay ${count}.`);

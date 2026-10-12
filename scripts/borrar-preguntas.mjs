// Borra de Supabase las preguntas que se han quitado del banco.
// Lee un JSON con [{ "id": "C001-0015", "motivo": "…" }, …] (el eliminadas.json del banco)
// y las borra de public.banco_preguntas. El progreso de esas preguntas se borra solo
// (la tabla progreso tiene «on delete cascade»).
//
// Uso (desde la raíz del repo):
//   node scripts/borrar-preguntas.mjs <ruta a eliminadas.json>
//   node scripts/borrar-preguntas.mjs <ruta a eliminadas.json> --si   ← borra de verdad
// Sin «--si» solo cuenta cuántas hay en la tabla, sin tocar nada.
// Necesita SUPABASE_SERVICE_ROLE_KEY y NEXT_PUBLIC_SUPABASE_URL (en .env.local).
import fs from "node:fs";
import { createClient } from "@supabase/supabase-js";

const fichero = process.argv[2];
const borrar = process.argv.includes("--si");
if (!fichero) { console.error("Uso: node scripts/borrar-preguntas.mjs <eliminadas.json> [--si]"); process.exit(1); }

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

const ids = [...new Set(JSON.parse(fs.readFileSync(fichero, "utf8")).map((e) => e.id))];
let enTabla = 0;
for (let i = 0; i < ids.length; i += 200) {
  const { count, error } = await sb.from("banco_preguntas").select("id", { count: "exact", head: true }).in("id", ids.slice(i, i + 200));
  if (error) { console.error(error.message); process.exit(1); }
  enTabla += count;
}
console.log(`${ids.length} ids en el archivo; ${enTabla} siguen en la tabla.`);
if (!borrar) { console.log("No se ha borrado nada. Repite con --si para borrarlas."); process.exit(0); }
for (let i = 0; i < ids.length; i += 200) {
  const { error } = await sb.from("banco_preguntas").delete().in("id", ids.slice(i, i + 200));
  if (error) { console.error(error.message); process.exit(1); }
}
const { count } = await sb.from("banco_preguntas").select("id", { count: "exact", head: true });
console.log(`Borradas. En la tabla quedan ${count} preguntas.`);

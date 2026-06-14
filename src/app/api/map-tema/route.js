import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const MODELO = "claude-sonnet-4-6";

export async function POST(req) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (l) => l.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  );
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { temaId, nombre, contenido } = await req.json();
  if (!temaId || !contenido) return NextResponse.json({ error: "Faltan datos" }, { status: 400 });

  const prompt = `Eres un experto en oposiciones. Lee el siguiente tema ("${nombre}") y extrae su ÍNDICE de subtemas o apartados evaluables: los bloques de contenido concretos sobre los que se podría preguntar en un examen tipo test. Devuelve entre 8 y 25 subtemas, cada uno con una etiqueta breve y clara (máx. 8 palabras), en el orden en que aparecen.

Responde SOLO con un array JSON de strings, sin markdown ni texto adicional. Ejemplo de formato:
["Antecedentes constitucionales","Proceso constituyente 1978","Título Preliminar: valores superiores","La Corona: sucesión"]

TEMA:
${String(contenido).slice(0, 30000)}`;

  try {
    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: MODELO, max_tokens: 1500, messages: [{ role: "user", content: prompt }] }),
    });
    if (!resp.ok) return NextResponse.json({ error: "Error generando el mapa de subtemas" }, { status: 502 });
    const data = await resp.json();
    const texto = (data.content || []).map((c) => c.text || "").join("\n").replace(/```json|```/g, "").trim();
    const lista = JSON.parse(texto.slice(texto.indexOf("["), texto.lastIndexOf("]") + 1));

    // limpiar subtemas previos de este tema y reinsertar
    await supabase.from("subtemas").delete().eq("tema_id", temaId);
    const filas = lista.slice(0, 25).map((etiqueta, i) => ({ user_id: user.id, tema_id: temaId, etiqueta: String(etiqueta).slice(0, 120), orden: i }));
    const { data: insertadas } = await supabase.from("subtemas").insert(filas).select();
    return NextResponse.json({ subtemas: insertadas || [] });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "No se pudo mapear el tema" }, { status: 500 });
  }
}

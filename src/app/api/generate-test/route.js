import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const LIMITE_DIARIO = 20; // tests por usuario y día (control de coste)

export async function POST(req) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (list) => list.forEach(({ name, value, options }) => cookieStore.set(name, value, options)),
      },
    }
  );

  // 1) Solo usuarios autenticados
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  // 2) Límite diario por usuario
  const hoy = new Date().toISOString().slice(0, 10);
  const { data: uso } = await supabase.from("uso_api").select("llamadas").eq("user_id", user.id).eq("dia", hoy).maybeSingle();
  if ((uso?.llamadas || 0) >= LIMITE_DIARIO) {
    return NextResponse.json({ error: `Has alcanzado el límite de ${LIMITE_DIARIO} tests hoy. Vuelve mañana.` }, { status: 429 });
  }

  // 3) Generar con la API de Anthropic (clave solo en el servidor)
  const { temas, nPreguntas } = await req.json();
  if (!Array.isArray(temas) || temas.length === 0) {
    return NextResponse.json({ error: "Faltan temas" }, { status: 400 });
  }
  const n = Math.min(Math.max(parseInt(nPreguntas) || 10, 3), 25);
  const mixto = temas.length > 1;
  const bloque = temas
    .map((t) => `[TEMA_ID: ${t.id}] [TEMA: ${t.nombre}]\n${String(t.contenido).slice(0, mixto ? 7000 : 30000)}`)
    .join("\n\n----\n\n");

  const prompt = `Eres un generador de exámenes oficiales para la oposición de bombero del Ayuntamiento de Zaragoza. A partir del contenido proporcionado, genera exactamente ${n} preguntas tipo test con 4 opciones, dificultad de oposición real (incluye preguntas de detalle fino y distractores plausibles). ${mixto ? "Reparte las preguntas entre los distintos temas proporcionados." : ""}

Responde SOLO con un array JSON válido, sin markdown, sin backticks y sin texto adicional, con este formato exacto:
[{"pregunta":"...","opciones":["...","...","...","..."],"correcta":0,"explicacion":"...","tema_id":"..."}]
Donde "correcta" es el índice (0-3) de la opción correcta y "tema_id" es el TEMA_ID del que procede la pregunta.

CONTENIDO:
${bloque}`;

  try {
    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 4000,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (!resp.ok) {
      const detail = await resp.text();
      console.error("Anthropic API:", resp.status, detail);
      return NextResponse.json({ error: "Error del generador. Inténtalo de nuevo." }, { status: 502 });
    }
    const data = await resp.json();
    const texto = (data.content || []).map((c) => c.text || "").join("\n");
    const limpio = texto.replace(/```json|```/g, "").trim();
    const preguntas = JSON.parse(limpio.slice(limpio.indexOf("["), limpio.lastIndexOf("]") + 1));

    // 4) Registrar uso
    await supabase.from("uso_api").upsert({ user_id: user.id, dia: hoy, llamadas: (uso?.llamadas || 0) + 1 });

    return NextResponse.json({ preguntas });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "No se pudo generar el test. Prueba con menos preguntas o un tema más corto." }, { status: 500 });
  }
}

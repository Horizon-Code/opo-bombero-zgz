import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const LIMITE_DIARIO = 20;
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

  const hoy = new Date().toISOString().slice(0, 10);
  const { data: uso } = await supabase.from("uso_api").select("llamadas").eq("user_id", user.id).eq("dia", hoy).maybeSingle();
  if ((uso?.llamadas || 0) >= LIMITE_DIARIO) {
    return NextResponse.json({ error: `Has alcanzado el limite de ${LIMITE_DIARIO} tests hoy. Vuelve manana.` }, { status: 429 });
  }

  // modo: "normal" | "huecos" | "nota" ; objetivos: lista de etiquetas de subtema a cubrir
  const { temas, nPreguntas, subtemasPorTema, modo, objetivos, evitarEnunciados } = await req.json();
  if (!Array.isArray(temas) || temas.length === 0) return NextResponse.json({ error: "Faltan temas" }, { status: 400 });
  const n = Math.min(Math.max(parseInt(nPreguntas) || 10, 3), 25);
  const mixto = temas.length > 1;

  const bloque = temas
    .map((t) => {
      const subs = (subtemasPorTema?.[t.id] || []).map((s) => `- ${s}`).join("\n");
      return `[TEMA_ID: ${t.id}] [TEMA: ${t.nombre}]\nSUBTEMAS DISPONIBLES PARA ETIQUETAR:\n${subs || "(sin mapa; etiqueta libremente)"}\n\nCONTENIDO:\n${String(t.contenido).slice(0, mixto ? 7000 : 30000)}`;
    })
    .join("\n\n----\n\n");

  // instruccion segun modo
  let foco = "";
  if (modo === "huecos" && Array.isArray(objetivos) && objetivos.length) {
    foco = `\nIMPORTANTE: concentra TODAS las preguntas EXCLUSIVAMENTE en estos subtemas que aun no se han trabajado: ${objetivos.map((o) => `"${o}"`).join(", ")}. No preguntes de otros apartados.`;
  } else if (modo === "nota") {
    foco = `\nIMPORTANTE: este tema ya se domina a nivel basico. Genera preguntas de DIFICULTAD ALTA "para nota": matices, excepciones, plazos y cifras exactas, supuestos limite, distinciones finas entre conceptos parecidos y combinaciones de varios apartados. Evita las preguntas faciles o de definicion directa.`;
  } else if (!mixto) {
    foco = `\nReparte las preguntas entre DISTINTOS subtemas para cubrir el tema de forma amplia.`;
  } else {
    foco = `\nReparte entre los temas.`;
  }

  const evitar = Array.isArray(evitarEnunciados) && evitarEnunciados.length
    ? `\nNO repitas ni parafrasees estas preguntas que ya existen (genera distintas):\n${evitarEnunciados.slice(0, 40).map((e) => `- ${String(e).slice(0, 120)}`).join("\n")}`
    : "";

  const prompt = `Eres un generador de examenes oficiales para la oposicion de bombero del Ayuntamiento de Zaragoza. Genera exactamente ${n} preguntas tipo test con 4 opciones, dificultad de oposicion real (detalle fino, distractores plausibles).${foco}${evitar}

Cada pregunta DEBE llevar el campo "subtema" con la etiqueta EXACTA de uno de los SUBTEMAS DISPONIBLES de su tema (copiala literalmente). Si no encaja en ninguno, usa la mas cercana.

Responde SOLO con un array JSON valido, sin markdown ni texto adicional, con este formato exacto:
[{"pregunta":"...","opciones":["...","...","...","..."],"correcta":0,"explicacion":"...","tema_id":"...","subtema":"..."}]

${bloque}`;

  try {
    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: MODELO, max_tokens: 4000, messages: [{ role: "user", content: prompt }] }),
    });
    if (!resp.ok) {
      console.error("Anthropic:", resp.status, await resp.text());
      return NextResponse.json({ error: "Error del generador. Intentalo de nuevo." }, { status: 502 });
    }
    const data = await resp.json();
    const texto = (data.content || []).map((c) => c.text || "").join("\n").replace(/```json|```/g, "").trim();
    const preguntas = JSON.parse(texto.slice(texto.indexOf("["), texto.lastIndexOf("]") + 1));

    await supabase.from("uso_api").upsert({ user_id: user.id, dia: hoy, llamadas: (uso?.llamadas || 0) + 1 });
    return NextResponse.json({ preguntas, modelo: MODELO, modo: modo || "normal" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "No se pudo generar el test. Prueba con menos preguntas." }, { status: 500 });
  }
}

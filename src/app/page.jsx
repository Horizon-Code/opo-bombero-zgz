// Landing pública (se renderiza en el servidor: Google ve todo el contenido)
import React from "react";
import s from "./landing.module.css";
import estructura from "../data/estructura.json";
import { Cabecera, Pie } from "../components/Publica";
import Camiseta from "../components/Camiseta";
import { SITE } from "../lib/site";
import { todasLasPreguntas, CALLES, POLIGONOS } from "../lib/callejero";
import datos from "../data/landing.json";
import AsiEstudias from "../components/landing/AsiEstudias";
import Demo from "../components/landing/Demo";
import Recorridos from "../components/landing/Recorridos";
import ExploradorTemario from "../components/landing/ExploradorTemario";
import { K, DISPLAY, titulo, kicker, btnRojo } from "../components/landing/estilos";

// el contador de correcciones se refresca cada hora
export const revalidate = 3600;

const TITULOS = {
  35: "Código Técnico de la Edificación",
  37: "Reglamento de la Agrupación de Voluntarios de Protección Civil del SCIS de Zaragoza",
  39: "Servicios de Prevención, Extinción de Incendios y Salvamento de Aragón: Ley 1/2013",
  40: "Servicios de Prevención, Extinción de Incendios y Salvamento de Aragón: Decretos 158/2014 y 159/2014",
};
const miles = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const temas = estructura.temas.map((t) => ({
  n: t.n,
  parte: t.parte,
  titulo: TITULOS[t.n] || t.titulo,
  preguntas: t.nodos.reduce((a, n) => a + n.bloques.reduce((b, x) => b + x.ids.length, 0), 0),
  subtemas: t.nodos.map((n) => n.epigrafe),
  ej: datos.ejemplos[t.n] || null,
}));
const TOTAL = miles(estructura.total);
const N_CALLEJERO = todasLasPreguntas(() => 0.5).length;
const CALLEJERO = miles(N_CALLEJERO);
const TODAS = miles(estructura.total + N_CALLEJERO);

const FAQ = [
  ["¿Cuánto cuesta?", "Nada. Todo es gratis, también el callejero y los simulacros. Solo necesitas una cuenta de Google para guardar tu avance."],
  ["¿Las preguntas están hechas con inteligencia artificial?", "Sí, y lo contamos. La IA nos permite cubrir los 40 temas enteros, pero cada pregunta está atada a una frase concreta de la norma o del manual, que ves al corregir. Si algo no cuadra, lo señalas con un botón y lo revisamos."],
  ["¿De dónde salen las preguntas?", "Del temario oficial: las leyes y normas que cita el Anexo I de la convocatoria, los temas de la Escuela de Bomberos de Zaragoza y los manuales técnicos de referencia. Cada pregunta lleva la frase exacta del texto en la que se basa."],
  ["¿Entra el callejero?", `Sí. Las ${CALLES.length} calles del Anexo III con su entrada y su salida y los ${POLIGONOS.length} polígonos industriales: ${CALLEJERO} preguntas y un simulacro de 50 preguntas en 30 minutos.`],
  ["¿Cómo es el examen tipo test?", "Preguntas con tres opciones y una sola correcta. Cada acierto suma 0,10, cada fallo resta 0,025 y las preguntas en blanco no puntúan. El simulacro de la aplicación reproduce ese formato con 100 preguntas en 75 minutos, como en las convocatorias de 2019 y 2022."],
  ["¿Cuántos temas tiene la oposición de bombero de Zaragoza?", "40 temas: 8 de legislación (Parte I) y 32 técnicos (Parte II), según el Anexo I de la convocatoria publicada en el BOPZ núm. 170, de 27 de julio de 2026."],
  ["¿Es una web oficial?", "No. Es un proyecto independiente, sin relación con el Ayuntamiento de Zaragoza. Las bases y las fechas oficiales se publican en el Boletín Oficial de la Provincia de Zaragoza y en la sede electrónica del Ayuntamiento."],
  ["¿Se guarda mi progreso si cambio de dispositivo?", "Sí. Tu avance se guarda en tu cuenta: puedes hacer un test en el móvil y verlo en el ordenador."],
  ["¿Cómo consigo la camiseta de Opo Bomberos?", "Elige el color y la talla en la sección «La camiseta del opositor» y pulsa «¿La quieres? Escríbeme»: se abre tu correo con el pedido ya escrito. Te contesto con el precio, la disponibilidad y la entrega en Zaragoza o el envío."],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": `${SITE}/#web`, url: SITE, name: "Opo Bomberos Zaragoza", inLanguage: "es-ES" },
    {
      "@type": "WebApplication",
      name: "Opo Bomberos Zaragoza",
      url: `${SITE}/app`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      inLanguage: "es-ES",
      description: `Tests de la oposición de Bombero-Conductor del Ayuntamiento de Zaragoza: ${TOTAL} preguntas de los 40 temas, simulacros y avance por tema.`,
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    },
  ],
};

function ListaTemas({ parte }) {
  return (
    <ol className={s.temas}>
      {temas.filter((t) => t.parte === parte).map((t) => (
        <li key={t.n} className={s.tema}>
          <span className={s.temaN}>{t.n}</span>
          <span className={s.temaT}>{t.titulo}</span>
          <span className={s.temaQ}>{miles(t.preguntas)} preg.</span>
        </li>
      ))}
    </ol>
  );
}

// Cuántas preguntas se han corregido por avisos y cuándo fue la última (migración 9)
async function contadorCorrecciones() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  try {
    const r = await fetch(`${url}/rest/v1/rpc/contador_correcciones`, {
      method: "POST", body: "{}",
      headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      next: { revalidate: 3600 },
    });
    if (!r.ok) return null;
    const [f] = await r.json();
    return f && f.preguntas > 0 ? { n: Number(f.preguntas), ultima: f.ultima } : null;
  } catch {
    return null;
  }
}
const fecha = (iso) => new Date(iso).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Madrid" });

const fila = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12, alignItems: "center", background: "#22262B", borderRadius: 8, padding: "16px 20px" };
const filaP = { fontSize: 18, fontWeight: 700, lineHeight: 1.3 };
const filaR = { fontSize: 16, lineHeight: 1.45, color: "#D5D9DD" };
const aqui = <strong style={{ color: K.amarillo }}>Aquí:</strong>;
const tarjeta = { background: "#fff", border: `1px solid ${K.linea}`, borderRadius: 6 };
const franja = { height: 10, background: `repeating-linear-gradient(135deg, ${K.rojo} 0 14px, ${K.amarillo} 14px 28px)` };


export default async function Landing() {
  const corr = await contadorCorrecciones();
  const sec = { maxWidth: 1200, margin: "0 auto", boxSizing: "border-box" };
  return (
    <div className={s.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Cabecera enLanding />
      <main>
        {/* ====== portada con pregunta de prueba ====== */}
        <section id="inicio" aria-labelledby="titulo" style={{ background: K.tinta, color: "#fff", padding: "40px 24px 64px" }}>
          <div style={{ ...sec, display: "flex", flexWrap: "wrap", gap: 48, alignItems: "center" }}>
            <div style={{ flex: "1 1 420px", minWidth: 0, display: "flex", flexDirection: "column", gap: 18 }}>
              <p style={kicker(K.amarillo)}>Bombero-Conductor · Ayuntamiento de Zaragoza · Convocatoria 2026</p>
              <h1 id="titulo" style={{ margin: 0, fontFamily: DISPLAY, fontWeight: 900, fontSize: "clamp(40px, 6vw, 64px)", lineHeight: 0.95, textTransform: "uppercase" }}>Tests de la oposición de bombero de Zaragoza</h1>
              <p style={{ margin: 0, fontSize: 20, lineHeight: 1.5, color: "#D5D9DD" }}>
                <strong style={{ color: "#fff" }}>{TOTAL} preguntas</strong> de los 40 temas y <strong style={{ color: "#fff" }}>{CALLEJERO} de callejero</strong>, con el formato del examen real. Cada pregunta enseña la frase del temario de la que sale. <strong style={{ color: K.amarillo }}>Gratis.</strong>
              </p>
              <div className={s.ctas}>
                <a href="/app" className={s.btnRed}>Empieza con Google</a>
                <a href="#temario" className={s.btnGhost}>Ver el temario</a>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: "#AEB5BD" }}>Proyecto independiente. No es una web del Ayuntamiento de Zaragoza ni de su Servicio contra Incendios.</p>
            </div>
            <Demo demos={datos.demos} total={TODAS} />
          </div>
        </section>

        {/* ====== cifras ====== */}
        <section aria-label="Cifras" style={{ ...sec, margin: "-28px auto 0", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
            {[
              [TOTAL, "preguntas de los 40 temas", K.rojo],
              [CALLEJERO, "preguntas de callejero", K.amarillo],
              ["100 / 75′", "simulacro: preguntas y minutos", K.azul],
              ["0 €", "todo incluido, también el callejero", K.verde],
            ].map(([v, t, c]) => (
              <div key={t} style={{ ...tarjeta, borderTop: `5px solid ${c}`, padding: "16px 18px" }}>
                <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 34, lineHeight: 1.05 }}>{v}</div>
                <div style={{ fontSize: 14, color: K.gris, marginTop: 4 }}>{t}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ====== cinco preguntas antes de fiarte de un test ====== */}
        <section aria-labelledby="h-decides" style={{ ...sec, padding: "64px 24px 0" }}>
          <div style={{ background: K.tinta, color: "#fff", borderRadius: 10, overflow: "hidden" }}>
            <div aria-hidden="true" style={franja} />
            <div style={{ padding: "32px clamp(18px, 4vw, 28px)", display: "flex", flexDirection: "column", gap: 22 }}>
              <p style={kicker(K.amarillo)}>Antes de fiarte de un test, hazle cinco preguntas</p>
              <h2 id="h-decides" style={{ ...titulo(32, 48), fontWeight: 900, lineHeight: 0.95, maxWidth: 960 }}>Cinco cosas que puedes comprobar en cualquier web de tests. También en esta.</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={fila}><div style={filaP}>1. ¿Puedo ver una pregunta antes de registrarme o pagar?</div><div style={filaR}>{aqui} sí, arriba tienes una, y otra, y otra.</div></div>
                <div style={fila}><div style={filaP}>2. ¿Cada pregunta dice de qué frase oficial sale?</div><div style={filaR}>{aqui} sí, las {TOTAL}. La ves al corregir. En el examen no puntúa lo que alguien recuerda: puntúa lo que dice la norma.</div></div>
                <div style={fila}><div style={filaP}>3. ¿Está hecho sobre las bases de 2026?</div><div style={filaR}>{aqui} sí. Los 40 temas del Anexo I y el callejero del Anexo III del BOPZ núm. 170, de 27 de julio de 2026.</div></div>
                <div style={fila}><div style={filaP}>4. ¿Qué pasa cuando encuentro un error?</div><div style={filaR}>{aqui} lo señalas con un botón, también en el callejero. Lo revisamos, se corrige para todos, te avisamos y queda en el registro de correcciones, con fecha.</div></div>
                <div style={fila}><div style={filaP}>5. ¿Lo han medido con un examen de verdad?</div><div style={filaR}>{aqui} sí. De las 100 preguntas del examen oficial de 2022, 99 se pueden preparar con este banco. La que falta trata de un tema que ya no entra en 2026.</div></div>
              </div>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.5, color: "#D5D9DD", maxWidth: 900 }}>Si otra web te responde a las cinco, úsala: nos alegramos. Si no te responde, ya sabes qué preguntarle.</p>
              <div style={{ background: "#fff", color: K.tinta, borderRadius: 8, padding: "22px 24px", display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", borderLeft: `8px solid ${K.rojo}` }}>
                <div style={{ flex: "1 1 400px", minWidth: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  <h3 style={{ ...titulo(26, 30) }}>Sí, hay errores. Y aquí están.</h3>
                  <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: K.tinta2 }}>Con {TOTAL} preguntas, decir «ninguna tiene errores» sería mentirte, y eso no lo hace nadie que use IA ni nadie que no la use. Lo que sí te prometemos: cada aviso se revisa, lo que está mal se corrige para todos, se avisa a quien lo señaló y queda en el registro de correcciones que ves dentro de la app. Es la diferencia entre pedirte confianza y dártela.</p>
                </div>
                {corr && (
                  <div style={{ flex: "0 1 220px", display: "flex", flexDirection: "column", gap: 4, textAlign: "center", border: `2px solid ${K.linea}`, borderRadius: 8, padding: 16 }}>
                    <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 44, lineHeight: 1 }}>{corr.n}</div>
                    <div style={{ fontSize: 14, color: K.gris }}>pregunta{corr.n === 1 ? "" : "s"} corregida{corr.n === 1 ? "" : "s"} por avisos</div>
                    <div style={{ fontSize: 13, color: K.gris }}>la última, el {fecha(corr.ultima)}</div>
                    <a href="/app" style={{ fontSize: 14, fontWeight: 700, color: K.azul }}>Ver el registro →</a>
                  </div>
                )}
              </div>
              <p style={{ ...titulo(22, 28), lineHeight: 1.1 }}>Transparencia y servicio a la comunidad. <span style={{ color: K.amarillo }}>Tú decides.</span></p>
            </div>
          </div>
        </section>

        {/* ====== la IA y cómo se estudia ====== */}
        <section id="como-funciona" aria-labelledby="h-como" style={{ ...sec, padding: "72px 24px 24px", display: "flex", flexDirection: "column", gap: 24 }}>
          <p style={kicker(K.rojo)}>Inteligencia artificial al servicio de los futuros bomberos</p>
          <h2 id="h-como" style={titulo(32, 44)}>Lo que una persona tardaría años, la IA lo hace en semanas</h2>
          <p style={{ margin: 0, maxWidth: 860, fontSize: 18, lineHeight: 1.55, color: K.tinta2 }}>Somos expertos en inteligencia artificial y la usamos para lo que mejor sabe hacer: leer las normas y los manuales de los 40 temas sin saltarse una línea y convertir cada dato que puede caer en una pregunta. Por eso hay {TOTAL} y no unos cientos. Y como cada pregunta va atada a la frase oficial de la que sale, puedes comprobarla tú mismo.</p>
          <AsiEstudias />
        </section>

        {/* ====== callejero ====== */}
        <section id="callejero" aria-labelledby="h-call" style={{ background: K.tinta, color: "#fff", marginTop: 56, padding: "64px 24px" }}>
          <div style={{ ...sec, display: "flex", flexDirection: "column", gap: 24 }}>
            <p style={kicker(K.amarillo)}>Segunda prueba del primer ejercicio</p>
            <h2 id="h-call" style={titulo(34, 48)}>El callejero, también gratis</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
              {[[CALLES.length, "calles del Anexo III con entrada y salida"], [POLIGONOS.length, "polígonos industriales"], [CALLEJERO, "preguntas de callejero"], ["50 / 30′", "simulacro: preguntas y minutos"]].map(([v, t]) => (
                <div key={t} style={{ border: "1px solid #3A4048", borderRadius: 6, padding: "14px 16px" }}>
                  <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 36 }}>{v}</div>
                  <div style={{ fontSize: 14, color: "#C9CED4" }}>{t}</div>
                </div>
              ))}
            </div>
            <Recorridos recorridos={datos.recorridos} />
          </div>
        </section>

        {/* ====== temario ====== */}
        <section id="temario" aria-labelledby="h-temario" style={{ ...sec, padding: "72px 24px 24px", display: "flex", flexDirection: "column", gap: 18 }}>
          <h2 id="h-temario" style={titulo(32, 44)}>Temario de la oposición: los 40 temas</h2>
          <p style={{ margin: 0, maxWidth: 860, fontSize: 17, lineHeight: 1.55, color: K.tinta2 }}>El temario del Anexo I de la convocatoria de Bombero-Conductor del Ayuntamiento de Zaragoza (BOPZ núm. 170, de 27 de julio de 2026). Pulsa un tema para ver sus apartados, cuántas preguntas tiene y una de ejemplo.</p>
          <div style={{ display: "flex", gap: 18, fontSize: 14, fontWeight: 600, flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><span style={{ width: 14, height: 14, background: K.azul, display: "inline-block" }} />Parte I · Legislación (1 a 8)</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><span style={{ width: 14, height: 14, background: K.rojo, display: "inline-block" }} />Parte II · Técnico (9 a 40)</span>
          </div>
          <ExploradorTemario temas={temas} />
          <details className={s.faq} style={{ marginTop: 8 }}>
            <summary>Ver la lista completa de los 40 temas</summary>
            <h3 className={`${s.display} ${s.h3}`}>Parte I · Legislación (temas 1 a 8)</h3>
            <ListaTemas parte={1} />
            <h3 className={`${s.display} ${s.h3}`}>Parte II · Técnico (temas 9 a 40)</h3>
            <ListaTemas parte={2} />
          </details>
        </section>

        {/* ====== simulacro ====== */}
        <section id="simulacro" aria-labelledby="h-sim" style={{ ...sec, padding: "56px 24px 24px" }}>
          <div style={{ ...tarjeta, borderRadius: 10, overflow: "hidden" }}>
            <div aria-hidden="true" style={franja} />
            <div style={{ padding: 28, display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center" }}>
              <div style={{ flex: "1 1 400px", minWidth: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                <h2 id="h-sim" style={titulo(32, 44)}>Simulacro con el formato del examen</h2>
                <p style={{ margin: 0, fontSize: 17, lineHeight: 1.55, color: K.tinta2 }}>20 preguntas de la Parte I (legislación) y 80 de la Parte II (técnico), repartidas entre los 40 temas. 75 minutos de reloj, tres opciones por pregunta y la misma penalización del examen: +0,10 por acierto, −0,025 por fallo y 0 en blanco.</p>
                <a href="/app" style={{ ...btnRojo, alignSelf: "flex-start" }}>Hacer un simulacro</a>
              </div>
              <div style={{ flex: "0 1 360px", minWidth: 0, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
                {[["20", "Parte I"], ["80", "Parte II"], ["75′", "de reloj"], ["−¼", "por fallo"]].map(([v, t]) => (
                  <div key={t} style={{ background: K.tinta, color: "#fff", borderRadius: 6, padding: "12px 8px", textAlign: "center" }}>
                    <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 36, lineHeight: 1 }}>{v}</div>
                    <div style={{ fontSize: 12, color: "#C9CED4", textTransform: "uppercase", letterSpacing: 1 }}>{t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ====== pruebas físicas ====== */}
        <section aria-labelledby="h-fisicas" style={{ ...sec, padding: "56px 24px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "8px 16px" }}>
            <h2 id="h-fisicas" style={titulo(32, 44)}>Pruebas físicas</h2>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", background: K.amarillo, padding: "4px 10px", borderRadius: 3 }}>Próximamente</span>
          </div>
          <p style={{ margin: 0, maxWidth: 860, fontSize: 17, lineHeight: 1.55, color: K.tinta2 }}>Un plan de entrenamiento con un único objetivo: el 10 en cada prueba. La aplicación te dirá qué entrenar cada día y qué tiempos deberías hacer.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
            {[["Carrera 1.500 m", <>El 10: menos de <strong>4:28</strong></>, K.rojo], ["Natación 100 m", <>El 10: menos de <strong>1:00</strong></>, K.azul], ["Cuerda lisa 6 m", <>El 10: <strong>5,00 s</strong> o menos</>, K.amarillo]].map(([t, x, c]) => (
              <div key={t} style={{ ...tarjeta, borderTop: `5px solid ${c}`, padding: "16px 18px" }}><h3 style={{ margin: "0 0 4px", fontSize: 18 }}>{t}</h3><p style={{ margin: 0, fontSize: 15 }}>{x}</p></div>
            ))}
          </div>
        </section>

        <section id="camiseta" aria-labelledby="h-camiseta" className={`${s.wrap} ${s.section}`}>
          <Camiseta />
        </section>

        <section id="preguntas-frecuentes" aria-labelledby="h-faq" className={`${s.wrap} ${s.section}`}>
          <h2 id="h-faq" className={`${s.display} ${s.h2}`} style={{ marginBottom: 20 }}>Preguntas frecuentes</h2>
          <div className={s.faq}>
            {FAQ.map(([q, a], i) => (
              <details key={q} open={i === 0}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Pie />
    </div>
  );
}

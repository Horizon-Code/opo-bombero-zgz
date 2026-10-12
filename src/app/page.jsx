// Landing pública (se renderiza en el servidor: Google ve todo el contenido)
import React from "react";
import s from "./landing.module.css";
import estructura from "../data/estructura.json";
import { Insignia } from "../components/Insignia";
import { Cabecera, Pie } from "../components/Publica";
import Camiseta from "../components/Camiseta";
import { SITE } from "../lib/site";

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
}));
const TOTAL = miles(estructura.total);

const FAQ = [
  ["¿Cuánto cuesta?", "De momento es gratis. Solo necesitas una cuenta de Google para guardar tu avance."],
  ["¿De dónde salen las preguntas?", "Del temario oficial: las leyes y normas que cita el Anexo I de la convocatoria, los temas de la Escuela de Bomberos de Zaragoza y los manuales técnicos de referencia. Cada pregunta lleva la frase exacta del texto en la que se basa."],
  ["¿Cómo es el examen tipo test?", "Preguntas con tres opciones y una sola correcta. Cada acierto suma 0,10, cada fallo resta 0,025 y las preguntas en blanco no puntúan. El simulacro de la aplicación reproduce ese formato con 100 preguntas en 80 minutos."],
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

export default function Landing() {
  return (
    <div className={s.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Cabecera enLanding />
      <main>
        <section aria-labelledby="titulo" className={s.hero}>
          <div className={`${s.wrap} ${s.heroIn}`}>
            <div className={s.heroText}>
              <p className={s.kicker}>Bombero-Conductor · Ayuntamiento de Zaragoza · Convocatoria 2026</p>
              <h1 id="titulo" className={`${s.display} ${s.h1}`}>Tests de la oposición de bombero de Zaragoza</h1>
              <p className={s.lead}><strong>{TOTAL} preguntas</strong> de los 40 temas del temario oficial, con el formato del examen real. Mira tu avance tema a tema y haz simulacros de 100 preguntas en 80 minutos.</p>
              <div className={s.ctas}>
                <a href="/app" className={s.btnRed}>Empieza con Google</a>
                <a href="#temario" className={s.btnGhost}>Ver el temario</a>
              </div>
              <p className={s.note}>Proyecto independiente. No es una web del Ayuntamiento de Zaragoza ni de su Servicio contra Incendios.</p>
            </div>
            <div className={s.heroBadge}><Insignia size={340} /></div>
          </div>
        </section>

        <section aria-label="Cifras" className={s.stats}>
          <div className={`${s.wrap} ${s.statsIn}`}>
            <div className={s.stat} style={{ borderColor: "#D7372C" }}><div className={s.statNum}>{TOTAL}</div><div className={s.statTxt}>preguntas tipo test</div></div>
            <div className={s.stat} style={{ borderColor: "#2E5E73" }}><div className={s.statNum}>40 temas</div><div className={s.statTxt}>todo el Anexo I de la convocatoria</div></div>
            <div className={s.stat} style={{ borderColor: "#F5B700" }}><div className={s.statNum}>100 / 80′</div><div className={s.statTxt}>simulacro: preguntas y minutos</div></div>
            <div className={s.stat} style={{ borderColor: "#2E7D4F" }}><div className={s.statNum}>3 opciones</div><div className={s.statTxt}>+0,10 acierto · −0,025 fallo</div></div>
          </div>
        </section>

        <section id="como-funciona" aria-labelledby="h-como" className={`${s.wrap} ${s.section}`}>
          <h2 id="h-como" className={`${s.display} ${s.h2}`}>Cómo funciona</h2>
          <p className={s.intro}>Un banco de preguntas fijo, sacado línea a línea del temario oficial, para que sepas exactamente qué dominas y qué no.</p>
          <div className={s.cards}>
            <div className={s.card}><div className={s.step}>01</div><h3>Elige qué estudiar</h3><p>Un tema, varios, un subtema concreto o todo el temario al azar. Primero salen las que fallaste y las que nunca has visto.</p></div>
            <div className={s.card}><div className={s.step}>02</div><h3>Responde y aprende</h3><p>Cada pregunta se corrige al momento con su explicación y la frase exacta del temario de la que sale.</p></div>
            <div className={s.card}><div className={s.step}>03</div><h3>Mira tu avance</h3><p>Cada tema, subtema y apartado tiene su bolita de color y su porcentaje. Sabes de un vistazo dónde reforzar.</p></div>
          </div>
        </section>

        <section id="simulacro" aria-labelledby="h-sim" className={`${s.wrap} ${s.section}`}>
          <div className={s.sim}>
            <div aria-hidden="true" className={s.stripe} />
            <div className={s.simIn}>
              <div className={s.simText}>
                <h2 id="h-sim" className={`${s.display} ${s.h2}`}>Simulacro con el formato del examen</h2>
                <p>20 preguntas de la Parte I (legislación) y 80 de la Parte II (técnico), repartidas entre los 40 temas. 80 minutos de reloj, tres opciones por pregunta y la misma penalización del examen: +0,10 por acierto, −0,025 por fallo y 0 en blanco.</p>
              </div>
              <div className={s.simGrid}>
                <div className={s.simBox}><div className={s.simNum}>20</div><div className={s.simLbl}>Parte I</div></div>
                <div className={s.simBox}><div className={s.simNum}>80</div><div className={s.simLbl}>Parte II</div></div>
                <div className={s.simBox}><div className={s.simNum}>80′</div><div className={s.simLbl}>de reloj</div></div>
                <div className={s.simBox}><div className={s.simNum}>−¼</div><div className={s.simLbl}>por fallo</div></div>
              </div>
            </div>
          </div>
        </section>

        <section id="temario" aria-labelledby="h-temario" className={`${s.wrap} ${s.section}`}>
          <h2 id="h-temario" className={`${s.display} ${s.h2}`}>Temario de la oposición: los 40 temas</h2>
          <p className={s.intro}>El temario del Anexo I de la convocatoria de Bombero-Conductor del Ayuntamiento de Zaragoza (BOPZ núm. 170, de 27 de julio de 2026), con las preguntas que tiene cada tema.</p>
          <h3 className={`${s.display} ${s.h3}`}>Parte I · Legislación (temas 1 a 8)</h3>
          <ListaTemas parte={1} />
          <h3 className={`${s.display} ${s.h3}`}>Parte II · Técnico (temas 9 a 40)</h3>
          <ListaTemas parte={2} />
        </section>

        <section aria-labelledby="h-fisicas" className={`${s.wrap} ${s.section}`}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "8px 16px", marginBottom: 8 }}>
            <h2 id="h-fisicas" className={`${s.display} ${s.h2}`} style={{ margin: 0 }}>Pruebas físicas</h2>
            <span className={s.tag}>Próximamente</span>
          </div>
          <p className={s.intro}>Un plan de entrenamiento con un único objetivo: el 10 en cada prueba. La aplicación te dirá qué entrenar cada día y qué tiempos deberías hacer.</p>
          <div className={s.cards}>
            <div className={s.prueba} style={{ borderTopColor: "#D7372C" }}><h3>Carrera 1.500 m</h3><p>El 10: menos de <strong>4:28</strong></p></div>
            <div className={s.prueba} style={{ borderTopColor: "#2E5E73" }}><h3>Natación 100 m</h3><p>El 10: menos de <strong>1:00</strong></p></div>
            <div className={s.prueba} style={{ borderTopColor: "#F5B700" }}><h3>Cuerda lisa 6 m</h3><p>El 10: <strong>5,00 s</strong> o menos</p></div>
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

import React from "react";
import PaginaInfo, { aviso } from "../../components/PaginaInfo";
import { TEMAS, miles } from "../../lib/temario";
import { TOTAL_TXT } from "../../lib/site";
import { FUENTES } from "../../lib/paginas";
import { K } from "../../components/landing/estilos";

const RUTA = "/temario";

export const metadata = {
  title: { absolute: "Temario Bombero Zaragoza 2026: los 40 temas" },
  description: "Temario de la oposición de Bombero-Conductor de Zaragoza 2026: los 40 temas del Anexo I, con sus apartados y las preguntas de test de cada uno.",
  alternates: { canonical: RUTA },
};

function Parte({ parte, titulo }) {
  return (
    <>
      <h2>{titulo}</h2>
      {TEMAS.filter((t) => t.parte === parte).map((t) => (
        <section key={t.n} aria-labelledby={`t${t.n}`} style={{ background: "#fff", border: `1px solid ${K.linea}`, borderLeft: `5px solid ${parte === 1 ? K.azul : K.rojo}`, borderRadius: 6, padding: "14px 18px", margin: "10px 0" }}>
          <h3 id={`t${t.n}`} style={{ margin: "0 0 6px", fontSize: 18 }}>Tema {t.n}. {t.titulo}</h3>
          <p style={{ margin: "0 0 6px", fontSize: 14, color: K.gris }}>{miles(t.preguntas)} preguntas en la aplicación</p>
          {t.apartados.length > 1 && (
            <ul style={{ margin: 0, fontSize: 15 }}>
              {t.apartados.map((a) => <li key={a.epigrafe}>{a.epigrafe}</li>)}
            </ul>
          )}
        </section>
      ))}
    </>
  );
}

export default function Temario() {
  const p1 = TEMAS.filter((t) => t.parte === 1).length;
  const p2 = TEMAS.length - p1;
  return (
    <PaginaInfo
      ruta={RUTA}
      titulo="Temario de bombero de Zaragoza: los 40 temas"
      entradilla={`El temario de la oposición de Bombero/a-Conductor/a del Ayuntamiento de Zaragoza tiene 40 temas: ${p1} de legislación y ${p2} técnicos. Aquí los tienes todos, con sus apartados.`}
    >
      <p>Es el Anexo I de las <a href={FUENTES.bases} rel="noopener">bases específicas de la convocatoria de 2026</a> (BOPZ núm. 170, de 27 de julio de 2026). De aquí salen las 100 preguntas del primer test del examen.</p>

      <h2>Cómo se reparte</h2>
      <ul>
        <li><strong>Parte I, legislación (temas 1 a 8):</strong> Constitución, Estatuto de Autonomía de Aragón, procedimiento administrativo, régimen local, presupuestos, empleo público, Seguridad Social y prevención de riesgos laborales.</li>
        <li><strong>Parte II, técnico (temas 9 a 40):</strong> seguridad en la conducción, mecánica, vehículos del servicio, incendios, materiales, primeros auxilios, Código Técnico de la Edificación, protección civil y normativa de bomberos de Aragón.</li>
      </ul>
      <p style={aviso}>La Parte II pesa mucho más: en la convocatoria de 2019 fueron 80 de las 100 preguntas. Pero la Parte I es más corta y más fija, así que es donde antes se gana nota. Más detalles en <a href="/examen">cómo es el examen</a>.</p>
      <p>En la aplicación hay {TOTAL_TXT} preguntas repartidas entre los 40 temas. Cada una dice de qué frase de la norma o del manual sale, para que puedas comprobarla.</p>

      <Parte parte={1} titulo="Parte I · Legislación (temas 1 a 8)" />
      <Parte parte={2} titulo="Parte II · Técnico (temas 9 a 40)" />

      <h2>Cómo estudiarlo</h2>
      <ul>
        <li><strong>Primero una vuelta entera</strong>, aunque sea rápida. El test pregunta de los 40 temas y un tema sin tocar son preguntas regaladas.</li>
        <li><strong>Test desde el primer día.</strong> Hacer preguntas no es solo para comprobar: es la forma más eficaz de memorizar.</li>
        <li><strong>Cuidado con las cifras.</strong> Plazos, porcentajes y medidas son preguntas fáciles de hacer y fáciles de fallar.</li>
        <li><strong>Mide tu avance por temas</strong> para saber dónde fallas, no solo tu nota media.</li>
      </ul>
    </PaginaInfo>
  );
}

import React from "react";
import PaginaInfo, { tabla, th, td, aviso } from "../../components/PaginaInfo";
import { SITE, ACTUALIZADO } from "../../lib/site";
import { FUENTES } from "../../lib/paginas";

const RUTA = "/convocatoria-2026";
const TITULO = "Oposiciones bombero Zaragoza 2026: convocatoria";

export const metadata = {
  title: { absolute: "Oposiciones Bombero Zaragoza 2026: 37 plazas" },
  description: "Convocatoria 2026 de Bombero-Conductor del Ayuntamiento de Zaragoza: 37 plazas, fechas, plazo y en qué punto está el proceso, con enlaces oficiales.",
  alternates: { canonical: RUTA },
};

const articulo = {
  "@type": "Article",
  headline: TITULO,
  inLanguage: "es-ES",
  dateModified: ACTUALIZADO[RUTA],
  mainEntityOfPage: `${SITE}${RUTA}`,
  author: { "@type": "Organization", name: "Opo Bomberos Zaragoza", url: SITE },
};

export default function Convocatoria() {
  return (
    <PaginaInfo
      ruta={RUTA}
      titulo={TITULO}
      entradilla="El Ayuntamiento de Zaragoza ha convocado 37 plazas de Bombero/a-Conductor/a. Aquí tienes los datos de la convocatoria, las fechas que ya se conocen y lo que falta por publicar, siempre con el enlace al documento oficial."
      jsonLdExtra={[articulo]}
    >
      <h2>En qué punto está</h2>
      <p style={aviso}>
        <strong>El plazo para apuntarse ya ha terminado</strong> (fue del 15 de septiembre al 5 de octubre de 2026). A fecha de esta página, el Ayuntamiento todavía no ha publicado la lista provisional de personas admitidas y excluidas. Es el siguiente paso, y lo actualizaremos aquí en cuanto salga.
      </p>

      <h2>La convocatoria en cifras</h2>
      <table style={tabla}>
        <tbody>
          <tr><th style={th} scope="row">Plazas</th><td style={td}><strong>37</strong> de Bombero/a-Conductor/a, grupo C1</td></tr>
          <tr><th style={th} scope="row">Reparto</th><td style={td}>32 de turno libre ordinario, 3 de ampliación del mismo turno, 1 reservada a víctimas del terrorismo y 1 reservada a mujeres víctimas de violencia de género</td></tr>
          <tr><th style={th} scope="row">De dónde salen</th><td style={td}>Ofertas de empleo público de 2025 y 2026, acumuladas</td></tr>
          <tr><th style={th} scope="row">Sistema</th><td style={td}>Oposición, y después un curso de formación selectivo y obligatorio</td></tr>
          <tr><th style={th} scope="row">Bases</th><td style={td}>Boletín Oficial de la Provincia de Zaragoza (BOPZ) núm. 170, de 27 de julio de 2026, rectificadas el 4 de septiembre de 2026</td></tr>
          <tr><th style={th} scope="row">Extracto en el BOE</th><td style={td}>BOE núm. 227, de 14 de septiembre de 2026</td></tr>
          <tr><th style={th} scope="row">Plazo de instancias</th><td style={td}>Del 15 de septiembre al 5 de octubre de 2026, ambos incluidos (cerrado)</td></tr>
        </tbody>
      </table>

      <h2>Fechas clave</h2>
      <table style={tabla}>
        <thead><tr><th style={th}>Fecha</th><th style={th}>Qué pasó</th></tr></thead>
        <tbody>
          <tr><td style={td}>27 jul 2026</td><td style={td}>Se publican las bases específicas en el BOPZ.</td></tr>
          <tr><td style={td}>4 sep 2026</td><td style={td}>Se rectifican las bases. El cambio afecta a los permisos de conducir: lo tienes explicado en <a href="/requisitos">requisitos</a>.</td></tr>
          <tr><td style={td}>14 sep 2026</td><td style={td}>Sale el extracto en el BOE y se abre el plazo al día siguiente.</td></tr>
          <tr><td style={td}>5 oct 2026</td><td style={td}>Último día para presentar la instancia.</td></tr>
          <tr><td style={td}>Pendiente</td><td style={td}>Lista provisional de admitidos y excluidos, y nombre de los vocales del tribunal.</td></tr>
          <tr><td style={td}>Pendiente</td><td style={td}>Lista definitiva y fecha, hora y lugar del primer ejercicio.</td></tr>
        </tbody>
      </table>

      <h2>Qué viene ahora</h2>
      <p>Con el plazo cerrado, el orden habitual en los procesos del Ayuntamiento es este:</p>
      <ol>
        <li><strong>Lista provisional de admitidos y excluidos.</strong> Si apareces como excluido, tendrás un plazo para corregir lo que falte. Revísala en cuanto salga.</li>
        <li><strong>Tribunal.</strong> Las bases ya dicen quién lo preside y quién hace de secretaria; los vocales se publican más adelante en el BOPZ.</li>
        <li><strong>Lista definitiva</strong> y, normalmente con ella o poco después, la fecha del primer ejercicio.</li>
        <li><strong>Primer ejercicio:</strong> el test de 100 preguntas del temario y, justo después, el de 50 preguntas de callejero. Los detalles están en <a href="/examen">cómo es el examen</a>.</li>
      </ol>
      <p>Las bases fijan que, desde el primer ejercicio, el proceso no puede durar más de seis meses. Al segundo ejercicio pasan como máximo 201 personas: 191 del turno libre ordinario, 5 del turno de víctimas del terrorismo y 5 del de víctimas de violencia de género.</p>

      <h2>Cuántas plazas hay y cuánta gente se presenta</h2>
      <p>Son 37 plazas. El número de inscritos no se sabe hasta que sale la lista de admitidos. Como referencia, en la convocatoria de 2019 (56 plazas, ampliadas a 62) se apuntaron 646 personas, según <a href="https://www.zaragoza.es/sede/servicio/noticia/230772" rel="noopener">contó el propio Ayuntamiento</a>.</p>

      <h2>Qué hacer mientras tanto</h2>
      <ul>
        <li><strong>Estudia el temario entero.</strong> El test tiene 100 preguntas de los 40 temas, con penalización por fallo. Mira <a href="/temario">los 40 temas</a>.</li>
        <li><strong>No dejes el callejero para el final.</strong> Es una prueba aparte con nota mínima propia, el mismo día del test. Tienes todas las calles en <a href="/callejero">el callejero</a>.</li>
        <li><strong>Entrena las físicas con las marcas oficiales.</strong> Con la <a href="/pruebas-fisicas">calculadora</a> sabes si hoy pasarías cada prueba.</li>
      </ul>

      <h2>Dónde seguir la convocatoria</h2>
      <p>Todo lo oficial sale en la ficha del proceso en la web del Ayuntamiento y en el BOPZ. Esta página es un resumen independiente: ante cualquier duda, manda lo que diga el documento oficial.</p>
      <ul>
        <li><a href={FUENTES.ficha} rel="noopener">Ficha de la convocatoria en zaragoza.es</a> (anuncios, listas y fechas)</li>
        <li><a href={FUENTES.bases} rel="noopener">Bases específicas (PDF)</a></li>
        <li><a href={FUENTES.rectificacion} rel="noopener">Rectificación de las bases (4 de septiembre de 2026)</a></li>
        <li><a href={FUENTES.basesGenerales} rel="noopener">Bases generales de turno libre (PDF)</a>, donde está la estructura del examen</li>
      </ul>
    </PaginaInfo>
  );
}

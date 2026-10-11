import React from "react";
import { PaginaTexto } from "../../components/Publica";

export const metadata = {
  title: "Fuentes y licencias",
  description: "De dónde salen las preguntas de Opo Bomberos Zaragoza y con qué licencias se usan.",
  alternates: { canonical: "/fuentes" },
};

export default function Fuentes() {
  return (
    <PaginaTexto>
      <h1>Fuentes y licencias</h1>
      <p>Las preguntas de Opo Bomberos Zaragoza se han elaborado a partir del temario del Anexo I de la convocatoria de Bombero-Conductor del Ayuntamiento de Zaragoza (BOPZ núm. 170, de 27 de julio de 2026). Cada pregunta indica la frase del texto de origen en la que se basa.</p>

      <h2>Normativa</h2>
      <p>Leyes, reglamentos y ordenanzas publicados en el Boletín Oficial del Estado (BOE), el Boletín Oficial de Aragón (BOA) y el Boletín Oficial de la Provincia de Zaragoza (BOPZ). Los textos legales no están sujetos a propiedad intelectual (art. 13 de la Ley de Propiedad Intelectual).</p>

      <h2>Manuales técnicos</h2>
      <ul>
        <li><strong>CEIS Guadalajara y Grupo Tragsa</strong>, manuales de bomberos. Licencia <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es" rel="license noopener">Creative Commons BY-NC-SA 4.0</a>. Las preguntas derivadas de estos manuales se ofrecen bajo la misma licencia, sin uso comercial.</li>
        <li><strong>IVASPE</strong> (Instituto Valenciano de Seguridad Pública y Emergencias), manuales de bomberos.</li>
        <li><strong>Academia Vasca de Policía y Emergencias</strong> (Arkaute), manuales de bomberos.</li>
        <li><strong>Escuela de Bomberos del Ayuntamiento de Zaragoza</strong>, temas publicados para la preparación de la oposición.</li>
      </ul>

      <h2>Retirada o corrección</h2>
      <p>Si eres titular de alguno de estos contenidos y quieres que se retire, se cite de otra forma o se corrija algo, escríbenos a <a href="mailto:rubenpasamarsanchez@gmail.com">rubenpasamarsanchez@gmail.com</a> y lo atenderemos.</p>

      <h2>Sin relación oficial</h2>
      <p>Opo Bomberos Zaragoza es un proyecto independiente. No tiene relación con el Ayuntamiento de Zaragoza, su Servicio contra Incendios, de Salvamento y Protección Civil, ni con los autores de los manuales citados, que no han revisado ni respaldan este proyecto.</p>
    </PaginaTexto>
  );
}

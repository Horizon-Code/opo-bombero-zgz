import React from "react";
import PaginaInfo, { aviso } from "../../components/PaginaInfo";
import { FUENTES } from "../../lib/paginas";

const RUTA = "/requisitos";

export const metadata = {
  title: { absolute: "Requisitos Bombero Zaragoza 2026: permisos y más" },
  description: "Requisitos de la oposición de Bombero-Conductor de Zaragoza 2026: edad, titulación, permisos C, E y ADR, y cuándo hay que tenerlos.",
  alternates: { canonical: RUTA },
};

export default function Requisitos() {
  return (
    <PaginaInfo
      ruta={RUTA}
      titulo="Requisitos para ser bombero en Zaragoza"
      entradilla="Qué hace falta para presentarse a la oposición de Bombero/a-Conductor/a del Ayuntamiento de Zaragoza, según las bases de la convocatoria de 2026. Repásalos con la lista de comprobación del final."
    >
      <p>Los requisitos están en la base segunda de las <a href={FUENTES.bases} rel="noopener">bases específicas</a> (BOPZ núm. 170, de 27 de julio de 2026), con la <a href={FUENTES.rectificacion} rel="noopener">rectificación del 4 de septiembre de 2026</a>.</p>

      <h2>Requisitos generales</h2>
      <ul>
        <li><strong>Nacionalidad:</strong> española o de otro país de la Unión Europea. También pueden presentarse los cónyuges y algunos familiares, en los casos que prevé la ley.</li>
        <li><strong>Edad:</strong> tener 18 años cumplidos y no haber llegado a la edad de jubilación forzosa. No hay edad máxima aparte de esa.</li>
        <li><strong>Titulación:</strong> bachiller, técnico (FP de grado medio) o equivalente, o estar en condiciones de obtenerlo. Si tu título es extranjero, necesitas la homologación y la traducción jurada.</li>
        <li><strong>Salud:</strong> no tener ninguna enfermedad ni limitación del cuadro de exclusiones médicas de las bases generales (base 9.5).</li>
        <li><strong>No estar inhabilitado</strong> ni haber sido separado del servicio público por expediente disciplinario.</li>
        <li><strong>Haber pagado la tasa</strong> de examen al presentar la instancia, salvo exención.</li>
      </ul>

      <h2>Permisos de conducir</h2>
      <p>Es lo que más gente deja fuera, porque se tarda en sacar. Las bases piden:</p>
      <ul>
        <li><strong>Permiso de clase C</strong> (camión).</li>
        <li><strong>Permiso de clase E</strong> (remolque).</li>
        <li><strong>Autorización ADR</strong> para materias peligrosas, en la modalidad de <strong>cisterna</strong> tras la rectificación de las bases.</li>
      </ul>
      <p style={aviso}>
        Tras la rectificación del 4 de septiembre, el permiso <strong>E</strong> y el <strong>ADR cisterna</strong> se pueden acreditar al terminar el curso de formación. El permiso <strong>C</strong>, en cambio, hay que tenerlo ya: se acredita con una copia compulsada o cotejada. Compruébalo en el texto de la rectificación, porque es el punto que más dudas genera.
      </p>

      <h2>Turnos de reserva</h2>
      <p>De las 37 plazas, una está reservada a víctimas del terrorismo y otra a mujeres víctimas de violencia de género. Para esos turnos hay que tener reconocida esa condición, además de los requisitos generales.</p>

      <h2>Cuándo hay que cumplirlos</h2>
      <p>Los requisitos se tienen que cumplir <strong>el último día del plazo de instancias</strong> (en 2026, el 5 de octubre) y mantenerse hasta la toma de posesión, salvo los permisos que la rectificación deja acreditar al final del curso.</p>

      <h2>Lista de comprobación</h2>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {[
          "Tengo 18 años o más.",
          "Tengo el título de bachiller o de técnico, o estoy en condiciones de obtenerlo.",
          "Tengo el permiso C.",
          "Tengo o voy a sacar el permiso E y el ADR cisterna antes de acabar el curso de formación.",
          "No tengo ninguna de las exclusiones médicas de las bases.",
          "Presenté la instancia y pagué la tasa dentro de plazo.",
        ].map((t) => (
          <li key={t} style={{ padding: "6px 0" }}><span aria-hidden="true">☐ </span>{t}</li>
        ))}
      </ul>

      <h2>Y si este año no llegas</h2>
      <p>Si te falta algún permiso, aprovecha para sacarlo ya: el Ayuntamiento convoca plazas de bombero cada pocos años. Mientras tanto, el temario, el callejero y las físicas se pueden ir preparando.</p>
    </PaginaInfo>
  );
}

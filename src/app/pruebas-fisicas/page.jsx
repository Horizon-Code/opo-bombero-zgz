import React from "react";
import PaginaInfo, { tabla, th, td, aviso } from "../../components/PaginaInfo";
import CalculadoraFisicas from "../../components/CalculadoraFisicas";
import { FUENTES } from "../../lib/paginas";

const RUTA = "/pruebas-fisicas";

export const metadata = {
  title: { absolute: "Pruebas físicas Bombero Zaragoza: marcas 2026" },
  description: "Marcas oficiales de las pruebas físicas de bombero en Zaragoza: cuerda, natación, 1.500 m y agilidad, para el 5 y el 10. Con calculadora.",
  alternates: { canonical: RUTA },
};

const FILAS = [
  ["Cuerda lisa 6 m", "11,00 s", "5,00 s", "8,50 s"],
  ["Natación 100 m libre", "1:38", "1:00", "1:10"],
  ["Carrera 1.500 m", "5:50", "4:28", "5:10"],
  ["Circuito de agilidad", "12,80 s", "8,20 s", "9,30 s"],
];

export default function PruebasFisicas() {
  return (
    <PaginaInfo
      ruta={RUTA}
      titulo="Pruebas físicas de bombero en Zaragoza"
      entradilla="El tercer ejercicio de la oposición son cuatro pruebas físicas. Aquí tienes las marcas oficiales para aprobar y para el 10, cómo se hace cada prueba y una calculadora para saber dónde estás hoy."
    >
      <p>Las marcas y las normas salen de la base 9.4.C de las <a href={FUENTES.basesGenerales} rel="noopener">bases generales de turno libre del Ayuntamiento de Zaragoza</a>, que son las que aplica la convocatoria de 2026.</p>

      <h2>Las marcas</h2>
      <table style={tabla}>
        <thead>
          <tr><th style={th}>Prueba</th><th style={th}>Máximo para pasar (5)</th><th style={th}>El 10, hombres</th><th style={th}>El 10, mujeres</th></tr>
        </thead>
        <tbody>
          {FILAS.map(([p, a, h, m]) => (
            <tr key={p}><td style={td}><strong>{p}</strong></td><td style={td}>{a}</td><td style={td}>{h} o menos</td><td style={td}>{m} o menos</td></tr>
          ))}
        </tbody>
      </table>
      <p>La marca para pasar es la misma para hombres y mujeres. Lo que cambia es la marca del 10.</p>

      <h2>Calcula tu nota</h2>
      <CalculadoraFisicas />

      <h2>Cómo se puntúa</h2>
      <ul>
        <li>Las cuatro pruebas se hacen seguidas, con <strong>al menos 15 minutos</strong> de recuperación entre una y otra.</li>
        <li>Cada prueba se puntúa de <strong>5 a 10</strong> si la pasas. Si no llegas a la marca mínima en una, quedas eliminado y no haces las siguientes.</li>
        <li>La nota del ejercicio es la <strong>media de las cuatro</strong>. Se suma a la del teórico, así que cada décima cuenta para el orden final.</li>
      </ul>

      <h2>Cada prueba, paso a paso</h2>

      <h3>1. Cuerda lisa de 6 metros</h3>
      <p>Empiezas sentado, con al menos una mano en la cuerda. Tienes que llegar a 6 metros y hacer sonar la campana en <strong>11 segundos o menos</strong>. No puedes ayudarte con los pies hasta que las dos manos pasen de 1,8 metros. Si tocas el suelo con los pies o no suena la campana, es nulo. Tienes <strong>dos intentos</strong>.</p>

      <h3>2. Natación: 100 metros estilo libre</h3>
      <p>Un solo intento, máximo <strong>1:38</strong>. Te eliminan si te agarras a la corchera o al borde, si tocas el fondo o si usas aletas, tubo, palas o bañadores de los que deslizan más.</p>

      <h3>3. Carrera de 1.500 metros</h3>
      <p>Salida de pie, un solo intento, máximo <strong>5:50</strong>.</p>

      <h3>4. Circuito de agilidad</h3>
      <p>Un recorrido de conos y vallas. Sales con «listo» y «ya», y el tiempo para cuando tocas el suelo después de la última valla. Máximo <strong>12,80 segundos</strong>. Tienes un intento, y otro más solo si el primero es nulo. Es nulo si cambias el recorrido, tiras un elemento o te apoyas en él.</p>

      <p style={aviso}>
        Para hacer las pruebas necesitas un <strong>certificado médico</strong> firmado por un médico colegiado, de <strong>menos de tres meses</strong>, que diga que puedes hacerlas. Sin él no te dejan hacer el ejercicio. Puede haber control antidopaje, y negarse cuenta como positivo.
      </p>

      <h2>Después: las pruebas de capacidad de trabajo</h2>
      <p>No son físicas en sentido estricto, pero también se entrenan. Son el cuarto ejercicio, y es apto o no apto: trabajo en altura en la torre de maniobras (máximo 60 segundos), un recorrido a oscuras por espacios confinados, y el incendio de piso, con chaleco de unos 20 kg, pesas rusas de 24, 28 y 32 kg, y subida al séptimo piso con 10 kg en cada mano en menos de 1:35. Lo tienes explicado en <a href="/examen">cómo es el examen</a>.</p>

      <h2>Cómo entrenarlas</h2>
      <ul>
        <li><strong>Mide tus marcas desde el principio</strong> y apúntalas: saber cuánto te falta para el 5 y para el 10 te dice dónde poner el esfuerzo.</li>
        <li><strong>Entrena como será el día del examen:</strong> las cuatro pruebas seguidas, con 15 minutos entre ellas.</li>
        <li><strong>La cuerda y la agilidad son técnica.</strong> Se mejora mucho con repeticiones bien hechas, mejor si alguien te corrige.</li>
        <li><strong>Hazte el certificado médico con tiempo</strong>, pero no demasiado pronto: tiene que tener menos de tres meses el día de la prueba.</li>
      </ul>
    </PaginaInfo>
  );
}

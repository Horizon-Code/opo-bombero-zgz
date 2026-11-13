import React from "react";
import PaginaInfo, { tabla, th, td, aviso } from "../../components/PaginaInfo";
import { FUENTES } from "../../lib/paginas";

const RUTA = "/examen";

export const metadata = {
  title: { absolute: "Examen Bombero Zaragoza: ejercicios y nota" },
  description: "Cómo es el examen de Bombero-Conductor de Zaragoza: test de 100 preguntas, callejero, psicotécnico, físicas y capacidad de trabajo, con su nota.",
  alternates: { canonical: RUTA },
};

export default function Examen() {
  return (
    <PaginaInfo
      ruta={RUTA}
      titulo="Cómo es el examen de bombero de Zaragoza"
      entradilla="La oposición de Bombero/a-Conductor/a tiene cuatro ejercicios. Todos son obligatorios y eliminatorios: si suspendes uno, te quedas fuera. Te explicamos cada uno, en orden, y cómo se puntúa."
    >
      <p>Todo lo que hay en esta página sale de la base 9.4.C de las <a href={FUENTES.basesGenerales} rel="noopener">bases generales de turno libre del Ayuntamiento de Zaragoza</a>, que son las que rigen la convocatoria de 2026 según sus <a href={FUENTES.bases} rel="noopener">bases específicas</a>.</p>

      <h2>Resumen</h2>
      <table style={tabla}>
        <thead><tr><th style={th}>Ejercicio</th><th style={th}>Qué es</th><th style={th}>Nota</th></tr></thead>
        <tbody>
          <tr><td style={td}><strong>1.º Teórico</strong></td><td style={td}>Test del temario (100 preguntas) y test de callejero (50 preguntas), el mismo día</td><td style={td}>0 a 15, mínimo 7,5</td></tr>
          <tr><td style={td}><strong>2.º Psicotécnico</strong></td><td style={td}>Aptitudes y personalidad</td><td style={td}>Apto / no apto</td></tr>
          <tr><td style={td}><strong>3.º Pruebas físicas</strong></td><td style={td}>Cuerda, natación, 1.500 m y agilidad</td><td style={td}>0 a 10, mínimo 5 en cada prueba</td></tr>
          <tr><td style={td}><strong>4.º Capacidad de trabajo</strong></td><td style={td}>Altura, espacios confinados e incendio de piso</td><td style={td}>Apto / no apto</td></tr>
        </tbody>
      </table>
      <p>La oposición vale como máximo 25 puntos: 15 del primer ejercicio y 10 de las pruebas físicas. El psicotécnico y la capacidad de trabajo solo dicen si sigues o no.</p>

      <h2>Primer ejercicio: el teórico</h2>
      <p>Son dos tests seguidos, el mismo día. El segundo empieza justo al acabar el primero, y cada uno tiene su propia nota mínima.</p>

      <h3>Primera prueba: test del temario</h3>
      <ul>
        <li><strong>100 preguntas</strong> con tres opciones y una sola correcta, más 12 de reserva por si se anula alguna.</li>
        <li><strong>75 minutos.</strong></li>
        <li>Cada acierto suma <strong>0,10</strong>. Cada fallo resta <strong>0,025</strong> (la cuarta parte de un acierto). En blanco no resta.</li>
        <li>Se puntúa de 0 a 10 y hay que sacar <strong>al menos un 5</strong>. Si no llegas, no te corrigen el callejero.</li>
      </ul>
      <p>Un ejemplo de las propias bases: con 60 aciertos y 20 fallos sacas 6,00 − 0,50 = <strong>5,50</strong>.</p>
      <p>Las preguntas salen de los <a href="/temario">40 temas del Anexo I</a>. En la convocatoria de 2019 el reparto fue de 20 preguntas de la Parte I (legislación) y 80 de la Parte II (técnico), según el <a href="https://www.zaragoza.es/cont/paginas/oferta/archivos/1091cuestionarioprimeraprueba.pdf" rel="noopener">cuestionario publicado</a>.</p>

      <h3>Segunda prueba: callejero</h3>
      <ul>
        <li><strong>50 preguntas</strong> con tres opciones, más 5 de reserva.</li>
        <li><strong>30 minutos.</strong></li>
        <li>Mismo sistema: +0,10 por acierto, −0,025 por fallo, en blanco no resta.</li>
        <li>Se puntúa de 0 a 5 y hay que sacar <strong>al menos 2,5</strong>.</li>
      </ul>
      <p>Pregunta por la situación de calles y polígonos, y por recorridos y sentidos de circulación. Lo tienes todo en <a href="/callejero">el callejero</a>.</p>

      <p style={aviso}>La nota del primer ejercicio es la suma de las dos pruebas (máximo 15, mínimo 7,5). Además hay nota de corte: al segundo ejercicio pasan como máximo 201 personas.</p>

      <h2>Segundo ejercicio: psicotécnico</h2>
      <p>Mide la capacidad intelectual (razonamiento abstracto y aptitud verbal) y rasgos de personalidad: estabilidad emocional, iniciativa, responsabilidad, sociabilidad y colaboración, y posibles tendencias desadaptativas. Hay que superar todos los factores. El perfil y los criterios se publican antes de la prueba. Es apto o no apto.</p>

      <h2>Tercer ejercicio: pruebas físicas</h2>
      <p>Cuatro pruebas seguidas, con al menos 15 minutos de descanso entre una y otra. Si suspendes una, quedas eliminado. Cada prueba se puntúa de 5 a 10 si la pasas, y la nota del ejercicio es la media de las cuatro.</p>
      <ol>
        <li>Subir una cuerda lisa de 6 metros (máximo 11 segundos).</li>
        <li>100 metros nadando a estilo libre (máximo 1:38).</li>
        <li>1.500 metros corriendo (máximo 5:50).</li>
        <li>Circuito de agilidad (máximo 12,8 segundos).</li>
      </ol>
      <p>Hace falta un certificado médico de menos de tres meses. Las marcas para el 5 y para el 10, separadas por sexo, están en <a href="/pruebas-fisicas">pruebas físicas</a>, con una calculadora.</p>

      <h2>Cuarto ejercicio: capacidad de trabajo</h2>
      <p>Tres pruebas prácticas. Hay que ser apto en las tres.</p>
      <ul>
        <li><strong>Trabajo en altura.</strong> Desde el balcón del séptimo piso de la torre de maniobras del Parque n.º 1, bajar por una escala, pasar a otra y volver a subir. Máximo 60 segundos.</li>
        <li><strong>Espacios confinados.</strong> Un recorrido a oscuras por dos niveles de módulos, con el tiempo que fije el tribunal.</li>
        <li><strong>Incendio de piso.</strong> Con un chaleco de unos 20 kg, mover pesas rusas de 24, 28 y 32 kg entre estanterías, y luego subir al séptimo piso con una mancuerna de 10 kg en cada mano en menos de 1:35, y bajar en menos de 2:00.</li>
      </ul>

      <h2>Reconocimiento médico</h2>
      <p>Las bases incluyen un cuadro de exclusiones médicas (base 9.5): vista, oído, corazón y tensión, aparato respiratorio, fuerza de agarre y otras. Por ejemplo, excluye una tensión por encima de 155/95 o una fuerza de agarre de menos de 30 kg en cualquiera de las manos. Si tienes dudas sobre algo, léelo en las bases antes de nada.</p>

      <h2>Y después: el curso de formación</h2>
      <p>Quien aprueba la oposición hace un curso selectivo y obligatorio (prevención, comunicaciones, incendios, salvamento, vehículos, materiales, régimen interior y conocimiento del territorio). Se puntúa de 0 a 10 y hay que sacar al menos un 5. La nota final mezcla la de la oposición y la del curso.</p>

      <h2>Cómo prepararlo aquí</h2>
      <p>El simulacro de la aplicación reproduce el primer ejercicio: 100 preguntas en 75 minutos con la misma penalización y, aparte, el callejero de 50 preguntas en 30 minutos. Al acabar ves tu nota con el mismo cálculo que usará el tribunal.</p>
    </PaginaInfo>
  );
}

import React from "react";
import { PaginaTexto } from "../../components/Publica";

export const metadata = {
  title: "Política de privacidad",
  description: "Qué datos guarda Opo Bomberos Zaragoza, para qué y cómo ejercer tus derechos.",
  alternates: { canonical: "/privacidad" },
};

export default function Privacidad() {
  return (
    <PaginaTexto>
      <h1>Política de privacidad</h1>

      <h2>Responsable</h2>
      <p>Rubén Pasamar Sánchez. Contacto: <a href="mailto:rubenpasamarsanchez@gmail.com">rubenpasamarsanchez@gmail.com</a>.</p>

      <h2>Qué datos guardamos</h2>
      <ul>
        <li>Los que facilita Google al iniciar sesión: nombre, dirección de correo e imagen de perfil.</li>
        <li>Tu actividad en la aplicación: respuestas a las preguntas, resultados de los tests y fechas.</li>
      </ul>

      <h2>Para qué</h2>
      <p>Solo para prestarte el servicio: guardar tu avance, mostrarte tus estadísticas y que puedas usarlo desde cualquier dispositivo. No enviamos publicidad ni vendemos ni cedemos tus datos.</p>

      <h2>Base legal</h2>
      <p>La ejecución del servicio que solicitas al registrarte (art. 6.1.b del Reglamento General de Protección de Datos).</p>

      <h2>Quién más interviene</h2>
      <ul>
        <li><strong>Supabase</strong>: base de datos y autenticación.</li>
        <li><strong>Vercel</strong>: alojamiento de la web.</li>
        <li><strong>Google</strong>: inicio de sesión.</li>
      </ul>
      <p>Actúan como encargados del tratamiento y pueden tratar datos fuera del Espacio Económico Europeo con las garantías que exige el RGPD.</p>

      <h2>Cuánto tiempo</h2>
      <p>Mientras mantengas tu cuenta. Si pides que la borremos, eliminamos tus datos en un plazo máximo de 30 días.</p>

      <h2>Tus derechos</h2>
      <p>Puedes pedir acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a <a href="mailto:rubenpasamarsanchez@gmail.com">rubenpasamarsanchez@gmail.com</a>. Si no quedas conforme, puedes reclamar ante la <a href="https://www.aepd.es" rel="noopener">Agencia Española de Protección de Datos</a>.</p>

      <h2>Cookies</h2>
      <p>Solo usamos las cookies técnicas imprescindibles para mantener tu sesión iniciada. No usamos cookies de analítica ni de publicidad.</p>
    </PaginaTexto>
  );
}

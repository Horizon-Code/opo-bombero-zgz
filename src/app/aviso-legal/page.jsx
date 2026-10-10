import React from "react";
import { PaginaTexto } from "../../components/Publica";

export const metadata = {
  title: "Aviso legal",
  description: "Titular y condiciones de uso de Opo Bomberos Zaragoza.",
  alternates: { canonical: "/aviso-legal" },
};

export default function AvisoLegal() {
  return (
    <PaginaTexto>
      <h1>Aviso legal</h1>

      <h2>Titular</h2>
      <p>[NOMBRE Y APELLIDOS], NIF [NIF], con domicilio a efectos de notificaciones en [DIRECCIÓN]. Contacto: <a href="mailto:[EMAIL DE CONTACTO]">[EMAIL DE CONTACTO]</a>.</p>

      <h2>Objeto</h2>
      <p>Opo Bomberos Zaragoza es una herramienta de estudio para preparar la oposición de Bombero-Conductor del Ayuntamiento de Zaragoza. Es un proyecto independiente, sin relación con el Ayuntamiento ni con su Servicio contra Incendios, de Salvamento y Protección Civil.</p>

      <h2>Contenido</h2>
      <p>Las preguntas se elaboran a partir del temario oficial y de las fuentes indicadas en <a href="/fuentes">Fuentes y licencias</a>. Se revisan con cuidado, pero pueden contener errores o quedar desactualizadas si cambia la normativa. La información oficial de la convocatoria es la publicada en el BOPZ y en la sede electrónica del Ayuntamiento de Zaragoza.</p>

      <h2>Propiedad intelectual</h2>
      <p>El diseño, el logotipo y la aplicación son del titular. Los contenidos derivados de manuales con licencia Creative Commons conservan esa licencia, como se indica en <a href="/fuentes">Fuentes y licencias</a>.</p>

      <h2>Uso</h2>
      <p>El acceso es personal. No está permitido copiar de forma masiva el banco de preguntas ni usarlo con fines comerciales.</p>
    </PaginaTexto>
  );
}

// Cabecera y pie de las páginas públicas (landing y páginas legales)
import React from "react";
import s from "../app/landing.module.css";
import { Marca } from "./Insignia";

export function Cabecera({ enLanding = false }) {
  const ancla = (id) => (enLanding ? `#${id}` : `/#${id}`);
  return (
    <header className={s.header}>
      <nav aria-label="Principal" className={`${s.wrap} ${s.nav}`}>
        <a href="/" className={s.brand}>
          <Marca size={44} />
          <span>Opo <span style={{ color: "#E8473B" }}>Bomberos</span> <span style={{ color: "#F5B700" }}>ZGZ</span></span>
        </a>
        <div className={s.navLinks}>
          <a href={ancla("como-funciona")}>Cómo funciona</a>
          <a href={ancla("simulacro")}>Simulacro</a>
          <a href={ancla("temario")}>Temario</a>
          <a href={ancla("camiseta")}>Camiseta</a>
          <a href={ancla("preguntas-frecuentes")}>Preguntas frecuentes</a>
        </div>
        <a href="/app" className={s.btnLight}>Entrar</a>
      </nav>
      <div aria-hidden="true" className={s.stripe} />
    </header>
  );
}

export function Pie() {
  return (
    <footer className={s.footer}>
      <div aria-hidden="true" className={s.stripe} />
      <div className={`${s.wrap} ${s.footIn}`}>
        <div className={s.footText}>
          <div className={s.brand} style={{ fontSize: 22 }}>
            <Marca size={36} />
            <span>Opo <span style={{ color: "#E8473B" }}>Bomberos</span> <span style={{ color: "#F5B700" }}>Zaragoza</span></span>
          </div>
          <p>Proyecto independiente para preparar la oposición de Bombero-Conductor del Ayuntamiento de Zaragoza. Sin relación con el Ayuntamiento ni con su Servicio contra Incendios.</p>
          <p style={{ color: "#9AA3AA", fontSize: 13 }}>Parte del contenido se basa en manuales del CEIS Guadalajara y Grupo Tragsa (licencia CC BY-NC-SA 4.0), del IVASPE y de la Escuela de Bomberos de Zaragoza, y en normativa publicada en el BOE, el BOA y el BOPZ. Detalle en «Fuentes y licencias».</p>
        </div>
        <nav aria-label="Legal" className={s.footNav}>
          <a href="/#camiseta">La camiseta</a>
          <a href="/fuentes">Fuentes y licencias</a>
          <a href="/privacidad">Política de privacidad</a>
          <a href="/aviso-legal">Aviso legal</a>
          <a href="mailto:rubenpasamarsanchez@gmail.com">Contacto</a>
        </nav>
      </div>
    </footer>
  );
}

// Página de texto (fuentes, privacidad, aviso legal)
export function PaginaTexto({ children }) {
  return (
    <div className={s.page}>
      <Cabecera />
      <main className={`${s.wrap} ${s.legal}`}>{children}</main>
      <Pie />
    </div>
  );
}

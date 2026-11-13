// Plantilla de las páginas de información: migas de pan, título, fecha de actualización,
// contenido, botón a la app y bloque «Sigue por aquí» con el resto de páginas.
import React from "react";
import s from "../app/landing.module.css";
import { Cabecera, Pie } from "./Publica";
import { SITE, ACTUALIZADO } from "../lib/site";
import { PAGINAS_INFO } from "../lib/paginas";
import { K, DISPLAY, btnRojo } from "./landing/estilos";

const fecha = (iso) =>
  new Date(iso).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Madrid" });

export default function PaginaInfo({ ruta, titulo, entradilla, jsonLdExtra = [], children }) {
  const actual = PAGINAS_INFO.find((p) => p.ruta === ruta);
  const otras = PAGINAS_INFO.filter((p) => p.ruta !== ruta);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: actual?.corto || titulo, item: `${SITE}${ruta}` },
        ],
      },
      ...jsonLdExtra,
    ],
  };
  return (
    <div className={s.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Cabecera />
      <main className={`${s.wrap} ${s.legal}`} style={{ maxWidth: 900 }}>
        <nav aria-label="Migas de pan" style={{ fontSize: 14, marginBottom: 16, color: K.gris }}>
          <a href="/">Inicio</a> <span aria-hidden="true">›</span> <span>{actual?.corto || titulo}</span>
        </nav>
        <h1>{titulo}</h1>
        {entradilla && <p style={{ fontSize: 19, lineHeight: 1.55, color: K.tinta2, marginTop: 0 }}>{entradilla}</p>}
        <p style={{ fontSize: 14, color: K.gris }}>Última actualización: {fecha(ACTUALIZADO[ruta])}</p>

        {children}

        <div style={{ marginTop: 40, background: K.tinta, color: "#fff", borderRadius: 8, padding: "24px 24px", display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ margin: 0, color: "#fff", fontSize: 18, fontWeight: 600, flex: "1 1 320px" }}>Practica con tests de los 40 temas, el callejero y simulacros con el formato del examen. Gratis.</p>
          <a href="/app" style={btnRojo}>Entrar a practicar</a>
        </div>

        <section aria-labelledby="h-sigue" style={{ marginTop: 40 }}>
          <h2 id="h-sigue" style={{ fontFamily: DISPLAY, textTransform: "uppercase", fontSize: 28 }}>Sigue por aquí</h2>
          <ul style={{ listStyle: "none", padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
            {otras.map((p) => (
              <li key={p.ruta} style={{ background: "#fff", border: `1px solid ${K.linea}`, borderRadius: 6, padding: "14px 16px" }}>
                <a href={p.ruta} style={{ fontWeight: 700, fontSize: 17 }}>{p.corto}</a>
                <div style={{ fontSize: 14, color: K.gris, marginTop: 4 }}>{p.texto}</div>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Pie />
    </div>
  );
}

// Estilos de tabla reutilizables en las páginas
export const tabla = { width: "100%", borderCollapse: "collapse", background: "#fff", fontSize: 15, margin: "12px 0" };
export const th = { textAlign: "left", padding: "10px 12px", borderBottom: `2px solid ${K.tinta}`, background: "#F6F7F8" };
export const td = { padding: "10px 12px", borderBottom: `1px solid ${K.linea}`, verticalAlign: "top" };
export const aviso = { background: "#FFF6D6", borderLeft: `5px solid ${K.amarillo}`, padding: "12px 16px", borderRadius: 4, fontSize: 15, lineHeight: 1.55 };

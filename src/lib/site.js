import estructura from "../data/estructura.json";

// Dirección pública de la web (canonical, sitemap, Open Graph)
export const SITE = "https://oposicionbomberoszaragoza.com";

// Número de preguntas del banco, con punto de miles. Sale de la estructura,
// así que se actualiza solo cada vez que cambia el banco.
export const TOTAL_PREGUNTAS = estructura.total;
export const TOTAL_TXT = String(estructura.total).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// Última modificación real de cada página pública (para el sitemap).
// Cambia la fecha de una ruta cuando cambie su contenido.
export const ACTUALIZADO = {
  "/": "2026-11-13",
  "/fuentes": "2026-11-05",
  "/privacidad": "2026-10-12",
  "/aviso-legal": "2026-10-12",
  "/convocatoria-2026": "2026-11-13",
  "/temario": "2026-11-13",
  "/examen": "2026-11-13",
  "/callejero": "2026-11-13",
  "/pruebas-fisicas": "2026-11-13",
  "/requisitos": "2026-11-13",
};

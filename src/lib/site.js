import estructura from "../data/estructura.json";

// Dirección pública de la web (canonical, sitemap, Open Graph)
export const SITE = "https://oposicionbomberoszaragoza.com";

// Número de preguntas del banco, con punto de miles. Sale de la estructura,
// así que se actualiza solo cada vez que cambia el banco.
export const TOTAL_PREGUNTAS = estructura.total;
export const TOTAL_TXT = String(estructura.total).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

import { TOTAL_TXT } from "../lib/site";

export default function manifest() {
  return {
    name: "Opo Bomberos Zaragoza",
    short_name: "Opo Bomberos",
    description: `Tests de la oposición de Bombero-Conductor de Zaragoza: ${TOTAL_TXT} preguntas y tu avance tema a tema.`,
    start_url: "/app",
    display: "standalone",
    background_color: "#16191D",
    theme_color: "#16191D",
    lang: "es",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}

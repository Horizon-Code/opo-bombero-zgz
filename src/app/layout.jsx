import { SITE, TOTAL_TXT } from "../lib/site";
// Fuentes servidas desde el propio dominio (sin pedirlas a Google en cada visita)
import "@fontsource/saira-condensed/latin-600.css";
import "@fontsource/saira-condensed/latin-700.css";
import "@fontsource/saira-condensed/latin-800.css";
import "@fontsource/saira-condensed/latin-900.css";
import "@fontsource/barlow/latin-400.css";
import "@fontsource/barlow/latin-500.css";
import "@fontsource/barlow/latin-600.css";
import "@fontsource/barlow/latin-700.css";

const TITULO = `Tests gratis Oposición Bombero Zaragoza 2026`;
const DESCRIPCION = `Prepara gratis la oposición de Bombero-Conductor de Zaragoza (37 plazas): ${TOTAL_TXT} preguntas de los 40 temas, callejero, simulacros y tu avance.`;

export const metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: TITULO,
    template: "%s · Opo Bomberos Zaragoza",
  },
  description: DESCRIPCION,
  applicationName: "Opo Bomberos Zaragoza",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: "Opo Bomberos Zaragoza",
    title: TITULO,
    description: DESCRIPCION,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Opo Bomberos Zaragoza · tests de la oposición" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRIPCION,
    images: ["/og.png"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }, { url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport = { themeColor: "#16191D" };

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}

import { SITE, TOTAL_TXT } from "../lib/site";

export const metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: `Tests Oposición Bombero Zaragoza 2026 · ${TOTAL_TXT} preguntas`,
    template: "%s · Opo Bomberos Zaragoza",
  },
  description:
    `Prepara la oposición de Bombero-Conductor del Ayuntamiento de Zaragoza con ${TOTAL_TXT} preguntas de los 40 temas, simulacros de examen y tu avance tema a tema.`,
  applicationName: "Opo Bomberos Zaragoza",
  keywords: [
    "oposiciones bomberos Zaragoza", "oposición bombero Zaragoza", "test bombero Zaragoza",
    "bombero-conductor Zaragoza", "temario bombero Zaragoza", "simulacro examen bombero",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: "Opo Bomberos Zaragoza",
    title: `Tests Oposición Bombero Zaragoza 2026 · ${TOTAL_TXT} preguntas`,
    description:
      `Los 40 temas del temario oficial en ${TOTAL_TXT} preguntas tipo test, con simulacros de 100 preguntas en 80 minutos y tu avance tema a tema.`,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Opo Bomberos Zaragoza · tests de la oposición" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tests Oposición Bombero Zaragoza 2026",
    description: `${TOTAL_TXT} preguntas de los 40 temas, simulacros y tu avance tema a tema.`,
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@600;700;800;900&family=Barlow:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}

import { SITE } from "../lib/site";

export default function sitemap() {
  const hoy = new Date();
  return [
    { url: `${SITE}/`, lastModified: hoy, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/fuentes`, lastModified: hoy, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE}/privacidad`, lastModified: hoy, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE}/aviso-legal`, lastModified: hoy, changeFrequency: "yearly", priority: 0.2 },
  ];
}

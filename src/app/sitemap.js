import { SITE, ACTUALIZADO } from "../lib/site";

const PAGINAS = [
  { ruta: "/", changeFrequency: "weekly", priority: 1 },
  { ruta: "/fuentes", changeFrequency: "monthly", priority: 0.4 },
  { ruta: "/privacidad", changeFrequency: "yearly", priority: 0.2 },
  { ruta: "/aviso-legal", changeFrequency: "yearly", priority: 0.2 },
];

export default function sitemap() {
  return PAGINAS.map(({ ruta, ...resto }) => ({
    url: `${SITE}${ruta}`,
    lastModified: new Date(ACTUALIZADO[ruta]),
    ...resto,
  }));
}

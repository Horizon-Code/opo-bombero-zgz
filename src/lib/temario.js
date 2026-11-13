// Los 40 temas con su título completo, nº de preguntas y apartados (sale de estructura.json)
import estructura from "../data/estructura.json";

// títulos que en estructura.json van abreviados
const TITULOS = {
  35: "Código Técnico de la Edificación",
  37: "Reglamento de la Agrupación de Voluntarios de Protección Civil del SCIS de Zaragoza",
  39: "Servicios de Prevención, Extinción de Incendios y Salvamento de Aragón: Ley 1/2013",
  40: "Servicios de Prevención, Extinción de Incendios y Salvamento de Aragón: Decretos 158/2014 y 159/2014",
};

export const miles = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const TEMAS = estructura.temas.map((t) => ({
  n: t.n,
  parte: t.parte,
  titulo: TITULOS[t.n] || t.titulo,
  preguntas: t.nodos.reduce((a, n) => a + n.bloques.reduce((b, x) => b + x.ids.length, 0), 0),
  apartados: t.nodos.map((n) => ({
    epigrafe: n.epigrafe,
    preguntas: n.bloques.reduce((b, x) => b + x.ids.length, 0),
  })),
}));

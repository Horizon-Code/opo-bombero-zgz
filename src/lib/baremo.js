/* ============================================================
   Baremo oficial · Bomberos Ayuntamiento de Zaragoza (hombres)
   Fuente: Anexo III de las bases de la convocatoria.
   Cada tabla: pares [umbral, puntos] en orden ascendente de umbral.
   - inclusive: true  → puntúa si valor <= umbral ("inferior o igual a")
   - inclusive: false → puntúa si valor <  umbral ("inferior a")
   Valores en segundos. Si el valor supera el máximo → 0 (NO APTO).
   ============================================================ */

export const BAREMO = {
  // Carrera 1.500 m — máximo 5'50" (350 s)
  r1500: {
    inclusive: false,
    maxApto: 350,
    tabla: [
      [268, 10.0], [270, 9.75], [273, 9.5], [275, 9.25], [277, 9.0],
      [280, 8.75], [282, 8.5], [285, 8.25], [288, 8.0], [291, 7.75],
      [294, 7.5], [297, 7.25], [300, 7.0], [303, 6.75], [305, 6.5],
      [307, 6.25], [310, 6.0], [320, 5.75], [330, 5.5], [340, 5.25],
      [350, 5.0],
    ],
  },
  // Natación 100 m libre — máximo 1'38" (98 s)
  nat: {
    inclusive: false,
    maxApto: 98,
    tabla: [
      [60, 10.0], [62, 9.75], [63, 9.5], [65, 9.25], [66, 9.0],
      [67, 8.75], [69, 8.5], [71, 8.25], [73, 8.0], [74, 7.75],
      [76, 7.5], [78, 7.25], [80, 7.0], [82, 6.75], [83, 6.5],
      [85, 6.25], [86, 6.0], [89, 5.75], [92, 5.5], [95, 5.25],
      [98, 5.0],
    ],
  },
  // Cuerda lisa 6 m — máximo 11"00 (tabla "inferior o igual")
  cuerda: {
    inclusive: true,
    maxApto: 11,
    tabla: [
      [5.0, 10.0], [5.13, 9.75], [5.25, 9.5], [5.37, 9.25], [5.5, 9.0],
      [5.63, 8.75], [5.75, 8.5], [5.87, 8.25], [6.0, 8.0], [6.25, 7.75],
      [6.5, 7.5], [6.75, 7.25], [7.0, 7.0], [7.25, 6.75], [7.5, 6.5],
      [7.75, 6.25], [8.0, 6.0], [8.75, 5.75], [9.5, 5.5], [10.25, 5.25],
      [11.0, 5.0],
    ],
  },
  // Agilidad (conos y vallas) — máximo 12"80
  agi: {
    inclusive: false,
    maxApto: 12.8,
    tabla: [
      [8.2, 10.0], [8.35, 9.75], [8.5, 9.5], [8.7, 9.25], [8.85, 9.0],
      [9.0, 8.75], [9.15, 8.5], [9.35, 8.25], [9.5, 8.0], [9.65, 7.75],
      [9.8, 7.5], [10.0, 7.25], [10.15, 7.0], [10.3, 6.75], [10.45, 6.5],
      [10.65, 6.25], [10.8, 6.0], [11.3, 5.75], [11.8, 5.5], [12.3, 5.25],
      [12.8, 5.0],
    ],
  },
};

/**
 * Puntos del baremo oficial para una marca.
 * @returns {number|null} 5.00–10.00, 0 si NO APTO, null si la prueba no tiene baremo.
 */
export function puntosBaremo(pruebaId, valor) {
  const b = BAREMO[pruebaId];
  if (!b || valor == null || isNaN(valor)) return null;
  const v = Number(valor);
  for (const [umbral, puntos] of b.tabla) {
    if (b.inclusive ? v <= umbral : v < umbral) return puntos;
  }
  return 0; // fuera del tiempo máximo → NO APTO
}

/** Formatea puntos para mostrar: "7,50 pts" | "NO APTO" | null */
export function fmtPuntos(pts) {
  if (pts == null) return null;
  if (pts === 0) return "NO APTO";
  return `${pts.toFixed(2).replace(".", ",")} pts`;
}

/**
 * Nota física proyectada: media de los puntos de la MEJOR marca registrada
 * en cada prueba oficial con baremo. Si alguna prueba con marcas está en
 * NO APTO, la media se devuelve igualmente pero con aviso.
 * @param {Array<{prueba:string, valor:number}>} marcas
 * @returns {{media:number|null, detalle:Array<{prueba:string, mejor:number, pts:number}>, algunNoApto:boolean, pruebasConDatos:number}}
 */
export function notaFisicaProyectada(marcas) {
  const detalle = [];
  let algunNoApto = false;
  for (const pruebaId of Object.keys(BAREMO)) {
    const valores = marcas.filter((m) => m.prueba === pruebaId).map((m) => Number(m.valor)).filter((v) => !isNaN(v));
    if (!valores.length) continue;
    const mejor = Math.min(...valores); // todas las pruebas oficiales son "menor es mejor"
    const pts = puntosBaremo(pruebaId, mejor);
    if (pts === 0) algunNoApto = true;
    detalle.push({ prueba: pruebaId, mejor, pts });
  }
  const media = detalle.length ? detalle.reduce((a, d) => a + d.pts, 0) / detalle.length : null;
  return { media, detalle, algunNoApto, pruebasConDatos: detalle.length };
}

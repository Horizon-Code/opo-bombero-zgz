// Identidad visual: cruz de bombero, Basílica del Pilar y el Ebro.
// Dibujo propio; no reproduce ningún emblema oficial.
import React from "react";

// Silueta del Pilar en una caja de 200 × 130 (base en y = 130)
const PILAR =
  "M10 96h180v34H10z M10 50h16v46H10z M11.5 34h13v16h-13z M13 22h10v12H13z M15.5 14h5v8h-5z M15 14.5a3 3.5 0 0 1 6 0z M17 12h2V2h-2z " +
  "M174 50h16v46h-16z M175.5 34h13v16h-13z M177 22h10v12h-10z M179.5 14h5v8h-5z M179 14.5a3 3.5 0 0 1 6 0z M181 12h2V2h-2z " +
  "M86 80h28v16H86z M85 80.5a15 17 0 0 1 30 0z M96.5 52h7v11h-7z M96 52.5a4 4 0 0 1 8 0z M99.2 49h1.6V36h-1.6z M96 40.4h8v2h-8z " +
  "M35 90h10v6H35z M34 90.5a6 7 0 0 1 12 0z M38.5 77h3v7h-3z M39.2 77v-9h1.6v9z M67 90h10v6H67z M66 90.5a6 7 0 0 1 12 0z M70.5 77h3v7h-3z M71.2 77v-9h1.6v9z " +
  "M123 90h10v6h-10z M122 90.5a6 7 0 0 1 12 0z M126.5 77h3v7h-3z M127.2 77v-9h1.6v9z M155 90h10v6h-10z M154 90.5a6 7 0 0 1 12 0z M158.5 77h3v7h-3z M159.2 77v-9h1.6v9z " +
  "M50.5 84h11v12h-11z M49 84.5a7 8 0 0 1 14 0z M54.3 70h3.4v7h-3.4z M55.2 70V58h1.6v12z M138.5 84h11v12h-11z M137 84.5a7 8 0 0 1 14 0z M142.3 70h3.4v7h-3.4z M143.2 70V58h1.6v12z";
const VENTANAS =
  "M34 106a2.2 2.2 0 1 0 4.4 0a2.2 2.2 0 1 0-4.4 0z M62 106a2.2 2.2 0 1 0 4.4 0a2.2 2.2 0 1 0-4.4 0z M133.6 106a2.2 2.2 0 1 0 4.4 0a2.2 2.2 0 1 0-4.4 0z M161.6 106a2.2 2.2 0 1 0 4.4 0a2.2 2.2 0 1 0-4.4 0z " +
  "M96 106a4 4 0 1 0 8 0a4 4 0 1 0-8 0z M94.5 130v-10a5.5 5.5 0 0 1 11 0v10z M16 58h4v13h-4z M180 58h4v13h-4z M15 37h6v10h-6z M179 37h6v10h-6z";
const BRAZO_GRANDE = "M100 100 L85 36 Q100 44 115 36 Z";
const BRAZO_MARCA = "M100 100 L80 6 Q100 20 120 6 Z";

const NEGRO = "#16191D", ROJO = "#D7372C", AMARILLO = "#F5B700", EBRO = "#5B9BB5";

function Cruz({ d, stroke, sw }) {
  return (
    <g fill={ROJO} stroke={stroke} strokeWidth={sw} strokeLinejoin="round">
      {[0, 90, 180, 270].map((r) => <path key={r} d={d} transform={`rotate(${r} 100 100)`} />)}
    </g>
  );
}

// Insignia completa con el texto en el anillo
export function Insignia({ size = 200, title = "Opo Bomberos Zaragoza" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" role="img" aria-label={title}>
      <defs>
        <path id="ob-arco-sup" d="M24 100a76 76 0 0 1 152 0" />
        <path id="ob-arco-inf" d="M17 100a83 83 0 0 0 166 0" />
      </defs>
      <circle cx="100" cy="100" r="97" fill={NEGRO} stroke={AMARILLO} strokeWidth="2.5" />
      <circle cx="100" cy="100" r="68" fill="none" stroke={AMARILLO} strokeWidth="1.2" />
      <text fontFamily="'Saira Condensed', 'Arial Narrow', sans-serif" fontWeight="800" fontSize="16" letterSpacing="3" fill="#FFFFFF" textAnchor="middle">
        <textPath href="#ob-arco-sup" startOffset="50%">OPO · BOMBEROS</textPath>
      </text>
      <text fontFamily="'Saira Condensed', 'Arial Narrow', sans-serif" fontWeight="800" fontSize="16" letterSpacing="5" fill={AMARILLO} textAnchor="middle">
        <textPath href="#ob-arco-inf" startOffset="50%">ZARAGOZA</textPath>
      </text>
      <circle cx="31" cy="100" r="2.6" fill={ROJO} />
      <circle cx="169" cy="100" r="2.6" fill={ROJO} />
      <Cruz d={BRAZO_GRANDE} stroke={AMARILLO} sw="1.6" />
      <circle cx="100" cy="100" r="36" fill={NEGRO} stroke={AMARILLO} strokeWidth="1.8" />
      <g transform="translate(71 74) scale(0.29)">
        <path fill={AMARILLO} d={PILAR} />
        <path fill={NEGRO} d={VENTANAS} />
      </g>
      <path d="M84 117.5q4-2.6 8 0t8 0 8 0 8 0" fill="none" stroke={EBRO} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M90 122.5q4-2.6 8 0t8 0 8 0" fill="none" stroke={EBRO} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

// Marca sin texto (cabeceras, iconos)
export function Marca({ size = 40, claro = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" aria-hidden="true">
      <Cruz d={BRAZO_MARCA} stroke={claro ? NEGRO : AMARILLO} sw="4" />
      <circle cx="100" cy="100" r="55" fill={NEGRO} stroke={claro ? NEGRO : AMARILLO} strokeWidth="4" />
      <g transform="translate(53 66) scale(0.47)">
        <path fill={AMARILLO} d={PILAR} />
        <path fill={NEGRO} d={VENTANAS} />
      </g>
      <path d="M74 138q6.5-4 13 0t13 0 13 0 13 0" fill="none" stroke={EBRO} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

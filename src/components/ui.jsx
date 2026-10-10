"use client";
import React from "react";

export const C = {
  bg: "#EEF0F1", panel: "#FFFFFF", ink: "#16191D", inkSoft: "#5A6168",
  line: "#D6DADD", red: "#D7372C", yellow: "#F5B700", steel: "#2E5E73", green: "#2E7D4F",
};
export const FONT_DISPLAY = "'Saira Condensed', 'Arial Narrow', sans-serif";
export const FONT_BODY = "'Barlow', system-ui, sans-serif";
export const hazard = (h = 8) => ({
  height: h,
  background: `repeating-linear-gradient(135deg, ${C.yellow} 0 14px, ${C.ink} 14px 28px)`,
});

// Fecha LOCAL (no UTC): entre las 00:00 y la madrugada, toISOString() devolvía el día anterior
export const hoy = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
export const fmtFecha = (d) => { const [y, m, day] = String(d).split("-"); return `${day}/${m}/${y.slice(2)}`; };

/* ============ base ============ */
export function Centro({ texto }) {
  return <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT_BODY, color: C.inkSoft }}>{texto}</div>;
}
export function Card({ children, style }) {
  return <section style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 6, padding: 18, ...style }}>{children}</section>;
}
export function H2({ children }) {
  return (
    <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 20, letterSpacing: 1, textTransform: "uppercase", margin: "0 0 12px", display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ width: 14, height: 14, background: C.red, display: "inline-block" }} />{children}
    </h2>
  );
}
export function StripeBar({ pct, color = C.red }) {
  const p = Math.max(0, Math.min(100, pct || 0));
  return (
    <div style={{ background: "#E3E6E8", borderRadius: 3, height: 14, overflow: "hidden", border: `1px solid ${C.line}` }}>
      <div style={{ width: `${p}%`, height: "100%", background: `repeating-linear-gradient(135deg, ${color} 0 10px, ${C.ink} 10px 20px)`, transition: "width .3s" }} />
    </div>
  );
}
export function Vacio({ texto }) {
  return <p style={{ color: C.inkSoft, fontSize: 14, margin: 0, padding: "6px 0" }}>{texto}</p>;
}
export const inputStyle = { padding: "8px 10px", border: `1px solid ${C.line}`, borderRadius: 4, fontSize: 14, background: "#fff", color: C.ink, fontFamily: FONT_BODY };
export const btnStyle = (bg = C.red, fg = "#fff") => ({
  fontFamily: FONT_DISPLAY, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase",
  background: bg, color: fg, border: "none", borderRadius: 4, padding: "9px 18px", fontSize: 15,
});

export function Leyenda({ color, t }) {
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><span style={{ width: 9, height: 9, borderRadius: 2, background: color }} />{t}</span>;
}


// Fecha local desplazada n días (toISOString da la fecha UTC y de madrugada se va al día anterior)
export const fechaLocal = (dias = 0) => {
  const d = new Date(); d.setDate(d.getDate() + dias);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export const COLOR_ESTADO = { gris: "#C2C8CD", rojo: "#D7372C", ambar: "#F5B700", verde: "#2E7D4F" };

// Bolita de progreso: el color es cómo vas en lo visto; el anillo, cuánto del ámbito dominas
export function Bolita({ e, size = 16 }) {
  const col = COLOR_ESTADO[e.color];
  return (
    <span
      title={e.color === "gris" ? "Sin empezar" : `Dominio ${e.pct} % · acierto ${e.acierto} %`}
      style={{
        width: size, height: size, borderRadius: "50%", flexShrink: 0, display: "inline-block",
        background: `conic-gradient(${col} ${e.pct * 3.6}deg, ${col}44 0deg)`,
        boxShadow: `inset 0 0 0 ${Math.max(2, size / 6)}px ${col}`,
      }}
    />
  );
}

"use client";
// Calculadora de pruebas físicas: con tu marca te dice si pasas (5), si llegas al 10 o si te quedas fuera.
// Solo usa las marcas del 5 y del 10 de las bases; los tramos intermedios no se inventan.
import React, { useState } from "react";
import { K } from "./landing/estilos";

export const PRUEBAS = [
  { id: "cuerda", nombre: "Cuerda lisa 6 m", unidad: "seg", paso: "0.01", corte: 11.0, diez: { H: 5.0, M: 8.5 } },
  { id: "natacion", nombre: "Natación 100 m", unidad: "min:seg", corte: 98.0, diez: { H: 60.0, M: 70.0 } },
  { id: "carrera", nombre: "Carrera 1.500 m", unidad: "min:seg", corte: 350.0, diez: { H: 268.0, M: 310.0 } },
  { id: "agilidad", nombre: "Circuito de agilidad", unidad: "seg", paso: "0.01", corte: 12.8, diez: { H: 8.2, M: 9.3 } },
];

// «1:38», «1:38,5», «98», «11,2» → segundos
const leer = (txt) => {
  const t = String(txt).trim().replace(",", ".");
  if (!t) return null;
  if (t.includes(":")) {
    const [m, sg] = t.split(":");
    const v = Number(m) * 60 + Number(sg);
    return Number.isFinite(v) ? v : null;
  }
  const v = Number(t);
  return Number.isFinite(v) ? v : null;
};
export const verTiempo = (s) => {
  if (s < 60) return `${s.toFixed(2).replace(".", ",")} s`;
  const m = Math.floor(s / 60);
  const r = s - m * 60;
  return `${m}:${String(Math.floor(r)).padStart(2, "0")}`;
};

export default function CalculadoraFisicas() {
  const [sexo, setSexo] = useState("H");
  const [marcas, setMarcas] = useState({});
  const campo = { width: "100%", boxSizing: "border-box", minHeight: 44, fontSize: 17, padding: "8px 10px", border: `1px solid ${K.linea}`, borderRadius: 4 };

  return (
    <div style={{ background: "#fff", border: `1px solid ${K.linea}`, borderRadius: 8, padding: 20, margin: "16px 0" }}>
      <fieldset style={{ border: 0, padding: 0, margin: "0 0 16px", display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
        <legend style={{ fontWeight: 700, marginBottom: 8 }}>Tus marcas se comparan con las de</legend>
        {[["H", "Hombres"], ["M", "Mujeres"]].map(([v, t]) => (
          <label key={v} style={{ display: "inline-flex", gap: 6, alignItems: "center", fontSize: 16, minHeight: 44 }}>
            <input type="radio" name="sexo" value={v} checked={sexo === v} onChange={() => setSexo(v)} /> {t}
          </label>
        ))}
      </fieldset>
      <div style={{ display: "grid", gap: 14 }}>
        {PRUEBAS.map((p) => {
          const s = leer(marcas[p.id] || "");
          let res = null;
          if (s !== null && s > 0) {
            if (s > p.corte) res = { t: "No pasas: te pasas del tiempo máximo", c: K.rojo };
            else if (s <= p.diez[sexo]) res = { t: "Tienes el 10", c: K.verde };
            else {
              const falta = s - p.diez[sexo];
              res = { t: `Pasas (entre 5 y 10). Para el 10 te faltan ${falta.toFixed(2).replace(".", ",")} s`, c: K.azul };
            }
          }
          return (
            <div key={p.id} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10, alignItems: "center" }}>
              <label htmlFor={`m-${p.id}`} style={{ fontWeight: 700 }}>
                {p.nombre}
                <span style={{ display: "block", fontWeight: 400, fontSize: 13, color: K.gris }}>
                  Máximo {verTiempo(p.corte)} · el 10: {verTiempo(p.diez[sexo])} o menos
                </span>
              </label>
              <input id={`m-${p.id}`} inputMode="decimal" placeholder={p.unidad === "min:seg" ? "p. ej. 1:25" : "p. ej. 9,5"} value={marcas[p.id] || ""} onChange={(e) => setMarcas({ ...marcas, [p.id]: e.target.value })} style={campo} />
              <div aria-live="polite" style={{ fontWeight: 700, color: res?.c || K.gris, fontSize: 15 }}>{res ? res.t : "Escribe tu marca"}</div>
            </div>
          );
        })}
      </div>
      <p style={{ fontSize: 13, color: K.gris, margin: "16px 0 0" }}>
        La calculadora solo usa las marcas del 5 y del 10. Los tramos intermedios están en las tablas de las bases. Los tiempos de natación y carrera se escriben como minutos:segundos.
      </p>
    </div>
  );
}

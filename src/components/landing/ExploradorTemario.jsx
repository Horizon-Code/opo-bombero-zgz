"use client";
// Los 40 temas: pulsa uno para ver sus apartados, cuántas preguntas tiene y una de ejemplo
import React, { useState } from "react";
import { K, DISPLAY, BODY } from "./estilos";

const miles = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export default function ExploradorTemario({ temas, inicial = 12 }) {
  const [sel, setSel] = useState(inicial);
  const [ver, setVer] = useState(false);
  const t = temas.find((x) => x.n === sel) || temas[0];
  const color = t.parte === 1 ? K.azul : K.rojo;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-start" }}>
      <div style={{ flex: "1 1 480px", minWidth: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(72px, 1fr))", gap: 8 }}>
        {temas.map((x) => {
          const on = x.n === sel;
          const base = x.parte === 1 ? K.azul : K.rojo;
          return (
            <button key={x.n} type="button" aria-pressed={on} aria-label={`Tema ${x.n}: ${x.titulo}`} onClick={() => { setSel(x.n); setVer(false); }}
              style={{ minHeight: 68, borderRadius: 6, border: `2px solid ${base}`, background: on ? base : "#fff", color: on ? "#fff" : K.tinta, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, fontFamily: BODY }}>
              <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 26, lineHeight: 1 }}>{x.n}</span>
              <span style={{ fontSize: 12, fontWeight: 600 }}>{miles(x.preguntas)}</span>
            </button>
          );
        })}
      </div>
      <article aria-live="polite" style={{ flex: "1 1 360px", minWidth: 0, background: "#fff", border: `1px solid ${K.linea}`, borderTop: `6px solid ${color}`, borderRadius: 6, padding: 22, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: K.gris }}>
          Tema {t.n} · {t.parte === 1 ? "Parte I" : "Parte II"} · {miles(t.preguntas)} preguntas
        </div>
        <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700, lineHeight: 1.25 }}>{t.titulo}</h3>
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 15, lineHeight: 1.55, color: K.tinta2 }}>
          {t.subtemas.map((s) => <li key={s}>{s}</li>)}
        </ul>
        {t.ej && (
          <div style={{ background: "#F4F5F6", borderRadius: 6, padding: 14, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: K.azul }}>Pregunta de ejemplo</div>
            <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.4 }}>{t.ej[0]}</div>
            {ver
              ? <div style={{ fontSize: 15, color: K.verdeOsc, fontWeight: 600 }}>✓ {t.ej[1]}</div>
              : <button type="button" onClick={() => setVer(true)}
                  style={{ alignSelf: "flex-start", minHeight: 44, padding: "0 14px", background: "transparent", border: `2px solid ${K.azul}`, borderRadius: 4, color: K.azul, fontFamily: BODY, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                  Ver la respuesta
                </button>}
          </div>
        )}
      </article>
    </div>
  );
}

"use client";
// «Pruébalo ya»: preguntas reales del banco, sin registrarse
import React, { useState } from "react";
import { K, BODY, btnRojo } from "./estilos";

export default function Demo({ demos, total }) {
  const [i, setI] = useState(0);
  const [el, setEl] = useState(null);
  const d = demos[i % demos.length];
  return (
    <section aria-labelledby="h-demo" style={{ flex: "1 1 400px", minWidth: 0, background: "#fff", color: K.tinta, borderRadius: 10, padding: 24, display: "flex", flexDirection: "column", gap: 12, boxShadow: "0 18px 40px rgba(0,0,0,0.35)", borderTop: `6px solid ${K.amarillo}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: K.azul }}>Pruébalo ya · {d.etiqueta}</span>
        <span style={{ fontSize: 13, color: K.gris }}>Sin registrarte</span>
      </div>
      <h2 id="h-demo" style={{ margin: 0, fontSize: 21, fontWeight: 700, lineHeight: 1.3 }}>{d.pregunta}</h2>
      {d.opciones.map((texto, j) => {
        let borde = K.linea, fondo = "#fff";
        if (el != null) {
          if (j === d.correcta) { borde = K.verde; fondo = "#EAF4EE"; }
          else if (j === el) { borde = K.rojo; fondo = "#FBEAE8"; }
        }
        return (
          <button key={j} type="button" onClick={() => el == null && setEl(j)} aria-pressed={el === j}
            style={{ textAlign: "left", minHeight: 52, fontFamily: BODY, fontSize: 16, lineHeight: 1.35, padding: "12px 16px", borderRadius: 6, cursor: el == null ? "pointer" : "default", border: `2px solid ${borde}`, background: fondo, color: K.tinta }}>
            <strong>{"abc"[j]})</strong> {texto}{el != null && j === d.correcta ? " ✓" : ""}
          </button>
        );
      })}
      {el != null && (
        <div role="status" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: "#F4F5F6", borderRadius: 6, padding: "12px 14px", fontSize: 15, lineHeight: 1.45, color: K.tinta2 }}>
            <strong>{el === d.correcta ? "¡Correcta!" : "No es esa."}</strong> {d.explicacion}
            <div style={{ marginTop: 8, fontSize: 13, color: K.gris }}>Sale de: «{d.cita}»{d.fuente ? <> · {d.fuente}</> : null}</div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <a href="/app" style={{ ...btnRojo, flex: "1 1 220px" }}>Sigue con {total} más</a>
            <button type="button" onClick={() => { setI(i + 1); setEl(null); }}
              style={{ minHeight: 48, padding: "0 16px", background: "transparent", border: `2px solid ${K.azul}`, borderRadius: 4, color: K.azul, fontFamily: BODY, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              Otra pregunta
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

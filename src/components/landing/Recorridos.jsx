"use client";
// «Prueba un recorrido»: rutas en coche desde los cuatro parques, comprobadas en Google Maps
import React, { useEffect, useState } from "react";
import { K, DISPLAY, BODY } from "./estilos";

export default function Recorridos({ recorridos }) {
  const parques = [...new Set(recorridos.map((r) => r.desde))];
  const destinos = [...new Set(recorridos.map((r) => r.hasta))];
  const [desde, setDesde] = useState(parques[0]);
  const [hasta, setHasta] = useState(destinos[0]);
  const r = recorridos.find((x) => x.desde === desde && x.hasta === hasta) || recorridos[0];
  const [vis, setVis] = useState(r.pasos.length); // en el servidor y sin JS: la ruta entera

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setVis(r.pasos.length); return; }
    setVis(1);
    const t = setInterval(() => setVis((v) => { if (v + 1 >= r.pasos.length) clearInterval(t); return Math.min(v + 1, r.pasos.length); }), 400);
    return () => clearInterval(t);
  }, [desde, hasta]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ background: "#fff", color: K.tinta, borderRadius: 10, padding: 24, display: "flex", flexWrap: "wrap", gap: 28 }}>
      <div style={{ flex: "1 1 300px", minWidth: 0, display: "flex", flexDirection: "column", gap: 14 }}>
        <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>Prueba un recorrido</h3>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: K.gris }}>Rutas en coche desde los parques de bomberos, comprobadas en Google Maps. Elige el parque y el destino.</p>
        <div role="group" aria-label="Parque de salida" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {parques.map((p) => {
            const on = p === desde;
            return (
              <button key={p} type="button" aria-pressed={on} onClick={() => setDesde(p)}
                style={{ minHeight: 44, padding: "0 14px", borderRadius: 4, border: `2px solid ${K.tinta}`, background: on ? K.tinta : "#fff", color: on ? K.amarillo : K.tinta, fontFamily: DISPLAY, fontWeight: 800, fontSize: 16, textTransform: "uppercase", cursor: "pointer" }}>
                {p.replace("Parque nº ", "Parque ")}
              </button>
            );
          })}
        </div>
        <div role="group" aria-label="Destino" style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {destinos.map((d) => {
            const on = d === hasta;
            return (
              <button key={d} type="button" aria-pressed={on} onClick={() => setHasta(d)}
                style={{ minHeight: 40, padding: "0 12px", borderRadius: 20, border: `1px solid ${on ? K.azul : "#AEB5BD"}`, background: on ? K.azul : "#fff", color: on ? "#fff" : K.tinta, fontFamily: BODY, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                {d.replace("Hospital ", "H. ")}
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ flex: "1 1 380px", minWidth: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 22, textTransform: "uppercase" }}>{r.desde} → {r.hasta}</div>
        <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
          {r.pasos.slice(0, vis).map((txt, i) => (
            <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 15, lineHeight: 1.4 }}>
              <span style={{ flex: "none", width: 26, height: 26, borderRadius: "50%", background: i === r.pasos.length - 1 ? K.rojo : K.azul, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13 }}>{i + 1}</span>
              <span style={{ paddingTop: 3 }}>{txt}</span>
            </li>
          ))}
        </ol>
        {vis >= r.pasos.length && (
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
            <a href={r.maps} target="_blank" rel="noopener noreferrer" style={{ fontSize: 15, fontWeight: 700, color: K.azul }}>Abrir en Google Maps ↗</a>
            <a href="/app" style={{ fontSize: 15, fontWeight: 700, color: K.rojoOsc }}>Practicar el callejero →</a>
          </div>
        )}
      </div>
    </div>
  );
}

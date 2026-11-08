// «Así estudias»: una pregunta de la app en un móvil, con sus partes numeradas
import React from "react";
import { K, DISPLAY, titulo, kicker, btnRojo } from "./estilos";
import css from "../../app/landing.module.css";

const NOTAS_IZQ = [
  [1, "Tú eliges el tema", "O todo al azar, o el callejero. Las que fallaste vuelven antes."],
  [2, "Sabes si aciertas al momento", "Y si fallas, ves cuál era."],
];
const NOTAS_DER = [
  [3, "Entiendes el porqué", "Por qué es esa y por qué no las otras. Así no la vuelves a fallar."],
  [4, "Ves de qué ley sale", "Ley y artículo exactos. Si algo no cuadra, lo avisas con un botón."],
];

const bola = (size, font) => ({
  display: "inline-flex", width: size, height: size, flex: "none", borderRadius: "50%", background: K.azul, color: "#fff",
  alignItems: "center", justifyContent: "center", fontFamily: DISPLAY, fontWeight: 800, fontSize: font,
});

function Nota({ n, t, d, derecha }) {
  return (
    <div className={derecha ? css.notaIzq : undefined} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span aria-hidden="true" style={bola(36, 20)}>{n}</span>
      <strong style={{ fontSize: 20 }}>{t}</strong>
      <span style={{ fontSize: 16, lineHeight: 1.5, color: K.gris }}>{d}</span>
    </div>
  );
}

const boton = (top, h, lado) => (
  <span aria-hidden="true" style={{ position: "absolute", [lado]: -6, top, width: 3, height: h, borderRadius: 2, background: "#3A4047" }} />
);

const opcion = { background: "#fff", border: `2px solid ${K.linea}`, borderRadius: 10, padding: "12px 14px", fontSize: 15, color: K.gris };

export default function AsiEstudias() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48, alignItems: "center", marginTop: 56 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center", textAlign: "center", maxWidth: 720 }}>
        <p style={kicker(K.rojo)}>Así estudias</p>
        <h3 style={titulo(32, 48)}>Una pregunta, todo lo que necesitas</h3>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: 40, width: "100%" }}>
        <div style={{ flex: "1 1 260px", minWidth: 0, maxWidth: 320, display: "flex", flexDirection: "column", gap: 56 }}>
          {NOTAS_IZQ.map(([n, t, d]) => <Nota key={n} n={n} t={t} d={d} derecha />)}
        </div>

        <figure aria-label="Una pregunta de la app, con sus partes numeradas" style={{ margin: 0, position: "relative", flex: "none", width: 312, height: 600, background: "#0F1113", color: K.tinta, borderRadius: 54, padding: 10, boxSizing: "border-box", boxShadow: "0 0 0 2px #3A4047, 0 0 0 4px #1C1F23, 0 30px 60px rgba(0,0,0,0.25)" }}>
          {boton(122, 28, "left")}{boton(176, 54, "left")}{boton(242, 54, "left")}{boton(196, 86, "right")}
          <div style={{ position: "relative", height: "100%", background: K.fondo, borderRadius: 44, overflow: "hidden", paddingTop: 46, boxSizing: "border-box" }}>
            <span aria-hidden="true" style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: 100, height: 29, borderRadius: 15, background: "#000" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px" }}>
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "#fff", background: K.azul, borderRadius: 999, padding: "5px 10px" }}>1 · Tema 7</span>
              <span style={{ fontSize: 13, color: K.gris }}>7 de 20</span>
            </div>
            <div style={{ padding: "10px 20px 22px", display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 700, lineHeight: 1.3 }}>Fallece el padre de un bombero, que vivía en otra localidad. ¿Cuántos días le corresponden?</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#EAF4EE", border: `2px solid ${K.verde}`, borderRadius: 10, padding: "12px 14px", fontSize: 15, fontWeight: 600 }}>
                <span style={{ flex: 1 }}>a) Cinco días hábiles</span>
                <span aria-hidden="true" style={bola(24, 14)}>2</span>
              </div>
              <div style={opcion}>b) Tres días hábiles</div>
              <div style={opcion}>c) Cuatro días hábiles</div>
              <div style={{ background: "#fff", borderRadius: 10, padding: 14, display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span aria-hidden="true" style={bola(24, 14)}>3</span>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: K.tinta2 }}>Padre = primer grado, y vivía fuera: cinco días. Tres serían en la misma localidad.</p>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 12, color: K.gris, padding: "0 2px" }}>
                <span aria-hidden="true" style={bola(24, 14)}>4</span>
                Sale de: TREBEP, art. 48.a)
              </div>
            </div>
            <span aria-hidden="true" style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", width: 120, height: 5, borderRadius: 3, background: K.tinta, opacity: 0.85 }} />
          </div>
        </figure>

        <div style={{ flex: "1 1 260px", minWidth: 0, maxWidth: 320, display: "flex", flexDirection: "column", gap: 56 }}>
          {NOTAS_DER.map(([n, t, d]) => <Nota key={n} n={n} t={t} d={d} />)}
        </div>
      </div>

      <a href="/app" style={{ ...btnRojo, minHeight: 52, padding: "0 28px" }}>Empieza a estudiar</a>
    </div>
  );
}

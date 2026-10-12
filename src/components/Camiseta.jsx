"use client";
// Sección «La camiseta del opositor» de la landing.
// Se elige color y talla, y el botón abre el correo con el pedido ya escrito.
// Para cambiar colores, tallas o el correo: las constantes de aquí abajo.
import React, { useState } from "react";
import s from "../app/landing.module.css";

export const CORREO_PEDIDOS = "rubenpasamarsanchez@gmail.com";
const COLORES = [
  ["Negro parque", "#16191D"],
  ["Gris vigoré", "#A9ABAE"],
  ["Crema", "#F5F1E6"],
  ["Arena", "#D6C9A7"],
  ["Azul marino", "#1E3A5F"],
  ["Burdeos", "#7A1F2B"],
];
const TALLAS = ["S", "M", "L", "XL", "XXL"];
const FOTOS = {
  gris: { src: "/camiseta/camiseta-gris.webp", w: 900, h: 1125, alt: "Camiseta gris vigoré: delante, la insignia de Opo Bomberos en el pecho; detrás, Zaragoza, el Pilar sobre el Ebro y el lema «Salvar y proteger»" },
  colores: { src: "/camiseta/camiseta-colores.webp", w: 1000, h: 859, alt: "La camiseta en seis colores: negro parque, gris vigoré, crema, arena, azul marino y burdeos" },
};

export default function Camiseta() {
  const [color, setColor] = useState("Gris vigoré");
  const [talla, setTalla] = useState("M");
  const [foto, setFoto] = useState("gris");

  const asunto = `Quiero la camiseta Opo Bomberos · ${color} · talla ${talla}`;
  const cuerpo = `Hola, Rubén:\n\nMe gustaría la camiseta de Opo Bomberos Zaragoza en color ${color}, talla ${talla}.\n\nNombre:\nRecogida en Zaragoza o envío (dirección):\n\nGracias.`;
  const mailto = `mailto:${CORREO_PEDIDOS}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
  const f = FOTOS[foto];

  return (
    <div className={s.camiseta}>
      <div aria-hidden="true" className={s.stripe} />
      <div className={s.camIn}>
        <div className={s.camFila}>
          <div className={s.camFotos}>
            <img src={f.src} width={f.w} height={f.h} alt={f.alt} className={s.camFoto} loading="lazy" />
            <div role="group" aria-label="Fotos de la camiseta" className={s.camMinis}>
              {Object.entries(FOTOS).map(([k, v]) => (
                <button key={k} type="button" onClick={() => setFoto(k)} aria-pressed={foto === k}
                  aria-label={k === "gris" ? "Ver delante y detrás" : "Ver los seis colores"} className={s.camMini}>
                  <img src={v.src} alt="" width="76" height="76" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          <div className={s.camFicha}>
            <div className={s.camEtiquetas}>
              <span className={s.tag}>Primera tirada</span>
              <span className={s.camSub}>Ropa Opo Bomberos · 100 % algodón · 6 colores</span>
            </div>
            <h2 id="h-camiseta" className={`${s.display} ${s.camTitulo}`}>
              La camiseta del <span style={{ color: "#F5B700" }}>opositor</span>
            </h2>
            <p className={s.camTexto}>
              Delante, la insignia de Opo Bomberos en el pecho. Detrás, Zaragoza: el Pilar sobre el Ebro y el lema
              «Salvar y proteger». Para entrenar las físicas o para ir a por la plaza.
            </p>

            <fieldset className={s.camGrupo}>
              <legend className={s.camLeyenda}>Color · <strong>{color}</strong></legend>
              <div className={s.camOpciones}>
                {COLORES.map(([n, hex]) => (
                  <button key={n} type="button" title={n} aria-label={n} aria-pressed={color === n}
                    onClick={() => { setColor(n); setFoto(n === "Gris vigoré" ? "gris" : "colores"); }}
                    className={s.camColor} style={{ background: hex }} />
                ))}
              </div>
            </fieldset>

            <fieldset className={s.camGrupo}>
              <legend className={s.camLeyenda}>Talla</legend>
              <div className={s.camOpciones}>
                {TALLAS.map((t) => (
                  <button key={t} type="button" aria-pressed={talla === t} onClick={() => setTalla(t)} className={s.camTalla}>{t}</button>
                ))}
              </div>
            </fieldset>

            <div className={s.camPedido}>
              <a href={mailto} className={s.btnRed}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
                ¿La quieres? Escríbeme
              </a>
              <p className={s.camResumen}>Tu pedido: <strong>{color} · talla {talla}</strong></p>
              <p className={s.camNota}>
                Se abre tu correo con el pedido ya escrito y te contesto con el precio, la disponibilidad y la entrega.
                Si lo prefieres, escribe tú a <a href={`mailto:${CORREO_PEDIDOS}`}>{CORREO_PEDIDOS}</a> con el color, la talla
                y si la recoges en Zaragoza o necesitas envío.
              </p>
            </div>
          </div>
        </div>

        <ol className={s.camPasos}>
          <li><span>01</span><div><strong>Elige color y talla</strong><p>Si dudas de la talla, dime tu altura y te recomiendo una.</p></div></li>
          <li><span>02</span><div><strong>Escríbeme</strong><p>Un correo con tu pedido y cómo quieres recibirla.</p></div></li>
          <li><span>03</span><div><strong>Te confirmo</strong><p>Precio, pago y entrega en Zaragoza o envío.</p></div></li>
        </ol>
        <p className={s.camLegal}>Opo Bomberos Zaragoza es un proyecto independiente: la camiseta no es ropa oficial del Ayuntamiento de Zaragoza ni de su Servicio contra Incendios.</p>
      </div>
    </div>
  );
}

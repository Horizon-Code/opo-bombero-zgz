"use client";
// Botón «Continuar con Google».
// Con NEXT_PUBLIC_GOOGLE_CLIENT_ID usa el botón oficial de Google (Google Identity
// Services): la ventana de Google muestra oposicionbomberoszaragoza.com y no la
// dirección larga de Supabase. Si falta esa variable o el script de Google no carga,
// usa el login de siempre (redirección a través de Supabase).
import React, { useEffect, useRef, useState } from "react";
import { loginGoogle, loginGoogleConToken } from "../lib/supabase";

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

const hex = (buf) => Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
// Nonce de un solo uso: a Google se le pasa el hash y a Supabase el valor original
async function crearNonce() {
  const raw = hex(crypto.getRandomValues(new Uint8Array(32)));
  const hashed = hex(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw)));
  return { raw, hashed };
}

let cargaScript = null;
function cargarGoogle() {
  if (window.google?.accounts?.id) return Promise.resolve();
  if (!cargaScript) {
    cargaScript = new Promise((ok, ko) => {
      const s = document.createElement("script");
      s.src = "https://accounts.google.com/gsi/client";
      s.async = true;
      s.onload = ok;
      s.onerror = () => { cargaScript = null; ko(new Error("No cargó el script de Google")); };
      document.head.appendChild(s);
    });
  }
  return cargaScript;
}

export default function EntrarConGoogle() {
  const caja = useRef(null);
  const [modo, setModo] = useState(CLIENT_ID ? "cargando" : "redireccion"); // cargando | boton | redireccion
  const [error, setError] = useState("");

  useEffect(() => {
    if (!CLIENT_ID) return;
    let vivo = true;
    // si en 6 s no aparece el botón de Google, se ofrece el de siempre
    const plazo = setTimeout(() => { if (vivo) setModo((m) => (m === "cargando" ? "redireccion" : m)); }, 6000);
    (async () => {
      try {
        await cargarGoogle();
        const { raw, hashed } = await crearNonce();
        if (!vivo) return;
        window.google.accounts.id.initialize({
          client_id: CLIENT_ID,
          nonce: hashed,
          ux_mode: "popup",
          itp_support: true,
          use_fedcm_for_prompt: true,
          callback: async ({ credential }) => {
            setError("");
            try {
              await loginGoogleConToken(credential, raw);
            } catch (e) {
              console.error("Login con Google:", e);
              setError("No se pudo iniciar sesión con Google. Inténtalo de nuevo.");
            }
          },
        });
        window.google.accounts.id.renderButton(caja.current, {
          type: "standard", theme: "outline", size: "large", shape: "rectangular",
          text: "continue_with", logo_alignment: "left", locale: "es", width: 280,
        });
        if (vivo) setModo("boton");
      } catch (e) {
        console.error(e);
        if (vivo) setModo("redireccion");
      }
    })();
    return () => { vivo = false; clearTimeout(plazo); };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <div ref={caja} style={{ minHeight: modo === "redireccion" ? 0 : 44, display: modo === "redireccion" ? "none" : "block" }} />
      {modo === "redireccion" && (
        <button
          onClick={loginGoogle}
          style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fff", color: "#16191D", border: "none", borderRadius: 6, padding: "13px 26px", fontSize: 16, fontWeight: 600, fontFamily: "inherit", cursor: "pointer" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.94l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.16-3.16A11 11 0 0 0 12 1 11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z"/></svg>
          Entrar con Google
        </button>
      )}
      {error && <p role="alert" style={{ color: "#F28B82", fontSize: 14, margin: 0 }}>{error}</p>}
    </div>
  );
}

// Estilos compartidos de la landing (colores y tipografías de la marca)
export const K = {
  tinta: "#16191D", tinta2: "#2B3138", gris: "#4A525C", linea: "#D5D9DD", fondo: "#EEF0F1",
  rojo: "#D7372C", rojoOsc: "#B42318", amarillo: "#F5B700", azul: "#2E5E73", verde: "#2E7D4F", verdeOsc: "#1E5A38",
};
export const DISPLAY = "'Saira Condensed', 'Arial Narrow', sans-serif";
export const BODY = "Barlow, system-ui, sans-serif";
export const titulo = (min, max) => ({ margin: 0, fontFamily: DISPLAY, fontWeight: 800, fontSize: `clamp(${min}px, 5vw, ${max}px)`, lineHeight: 1, textTransform: "uppercase" });
export const kicker = (color) => ({ margin: 0, fontSize: 14, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color });
export const btnRojo = { display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 48, background: K.rojo, color: "#fff", textDecoration: "none", fontFamily: DISPLAY, fontWeight: 800, fontSize: 18, letterSpacing: 1, textTransform: "uppercase", borderRadius: 4, padding: "0 18px" };

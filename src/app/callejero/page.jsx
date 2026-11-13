import React from "react";
import PaginaInfo, { tabla, th, td, aviso } from "../../components/PaginaInfo";
import Recorridos from "../../components/landing/Recorridos";
import { CALLES, POLIGONOS, txt } from "../../lib/callejero";
import datos from "../../data/landing.json";
import { FUENTES } from "../../lib/paginas";

const RUTA = "/callejero";

export const metadata = {
  title: { absolute: "Callejero Bomberos Zaragoza: las 368 calles" },
  description: "Prueba de callejero de bombero de Zaragoza 2026: cómo es, las 368 calles del Anexo III con su entrada y salida y los 52 polígonos industriales.",
  alternates: { canonical: RUTA },
};

// Calles que más veces aparecen como entrada o salida de otras: las que conviene dominar primero
const frecuentes = (() => {
  const m = new Map();
  for (const c of CALLES) for (const k of [c.entrada, c.salida]) if (k && k !== "NO TIENE") m.set(k, (m.get(k) || 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
})();

const orden = (a, b) => txt(a.calle).localeCompare(txt(b.calle), "es");
const conSalida = (s) => (s === "NO TIENE" ? "no tiene" : txt(s));

export default function Callejero() {
  return (
    <PaginaInfo
      ruta={RUTA}
      titulo="Callejero de bomberos de Zaragoza"
      entradilla={`El callejero es la segunda prueba del primer ejercicio: 50 preguntas en 30 minutos, justo después del test del temario. Aquí tienes cómo es y la lista oficial completa: ${CALLES.length} calles con su entrada y su salida y ${POLIGONOS.length} polígonos industriales.`}
    >
      <h2>Cómo es la prueba</h2>
      <ul>
        <li><strong>50 preguntas</strong> tipo test con tres opciones, más 5 de reserva.</li>
        <li><strong>30 minutos</strong>, el mismo día que el test de 100 preguntas y justo después.</li>
        <li>+0,10 por acierto, −0,025 por fallo, en blanco no resta. Se puntúa de 0 a 5 y hay que sacar <strong>al menos 2,5</strong>.</li>
        <li>Pregunta por dónde están calles, polígonos y puntos clave de la ciudad (parques de bomberos, hospitales, aeropuerto, estación Intermodal, Romareda, pabellón Príncipe Felipe, Casa Consistorial), y por recorridos y sentidos de circulación.</li>
      </ul>
      <p>Así lo fija la base 9.4.C de las <a href={FUENTES.basesGenerales} rel="noopener">bases generales</a>. La lista de calles y polígonos es el Anexo III de las <a href={FUENTES.bases} rel="noopener">bases específicas de 2026</a>.</p>
      <p style={aviso}>Tiene nota mínima propia. Puedes bordar el test del temario y quedarte fuera por el callejero, así que entrénalo desde el principio, no la última semana.</p>

      <h2>Por dónde empezar</h2>
      <p>Hay calles que aparecen una y otra vez como entrada o salida de otras. Si las dominas, el resto se ordena alrededor:</p>
      <ol>
        {frecuentes.map(([c, n]) => (
          <li key={c}><strong>{txt(c)}</strong>: aparece en {n} calles</li>
        ))}
      </ol>

      <h2>Prueba un recorrido</h2>
      <p>Rutas en coche desde los cuatro parques de bomberos, comprobadas en Google Maps.</p>
      <div style={{ background: "#16191D", color: "#fff", borderRadius: 8, padding: 20 }}>
        <Recorridos recorridos={datos.recorridos} />
      </div>

      <h2>Las {CALLES.length} calles del Anexo III</h2>
      <p>Cada calle con la calle por la que empieza (entrada) y por la que acaba (salida), tal como vienen en las bases.</p>
      <details>
        <summary style={{ fontWeight: 700, fontSize: 17, cursor: "pointer" }}>Ver las {CALLES.length} calles</summary>
        <table style={tabla}>
          <thead><tr><th style={th}>Calle</th><th style={th}>Entrada</th><th style={th}>Salida</th></tr></thead>
          <tbody>
            {[...CALLES].sort(orden).map((c) => (
              <tr key={c.id}><td style={td}>{txt(c.calle)}</td><td style={td}>{conSalida(c.entrada)}</td><td style={td}>{conSalida(c.salida)}</td></tr>
            ))}
          </tbody>
        </table>
      </details>

      <h2>Los {POLIGONOS.length} polígonos industriales</h2>
      <details>
        <summary style={{ fontWeight: 700, fontSize: 17, cursor: "pointer" }}>Ver los {POLIGONOS.length} polígonos</summary>
        <table style={tabla}>
          <thead><tr><th style={th}>Polígono</th><th style={th}>Dónde está</th></tr></thead>
          <tbody>
            {[...POLIGONOS].sort((a, b) => (a.nombreTxt || a.nombre).localeCompare(b.nombreTxt || b.nombre, "es")).map((p) => (
              <tr key={p.id}><td style={td}>{p.nombreTxt || p.nombre}</td><td style={td}>{p.situacionTxt || p.situacion}</td></tr>
            ))}
          </tbody>
        </table>
      </details>

      <h2>Cómo estudiarlo</h2>
      <ul>
        <li><strong>Por zonas, no por orden alfabético.</strong> Aprende cada calle junto a las que la cruzan: así las respuestas falsas, que suelen ser calles cercanas, dejan de confundirte.</li>
        <li><strong>Con un mapa delante.</strong> Ubica cada calle al menos una vez; luego repasa con preguntas.</li>
        <li><strong>Con el reloj.</strong> Son 36 segundos por pregunta. Practica con tiempo para no quedarte sin acabar.</li>
      </ul>
      <p>En la aplicación tienes preguntas de todas las calles y polígonos del Anexo III, con tres opciones como en el examen, y un simulacro de 50 preguntas en 30 minutos.</p>
    </PaginaInfo>
  );
}

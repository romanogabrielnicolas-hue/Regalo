import { useEffect, useRef, useState } from "react";
import { Sparkles, Stars } from "lucide-react";
import { CONSTELACION } from "../../data/content";
import NeonButton from "../ui/NeonButton";
import Reveal from "../ui/Reveal";

// Forma de corazón (coordenadas dentro de un lienzo de 320 x 240).
const ESTRELLAS = [
  { x: 160, y: 34 },
  { x: 111, y: 49 },
  { x: 70, y: 43 },
  { x: 43, y: 75 },
  { x: 51, y: 111 },
  { x: 83, y: 148 },
  { x: 122, y: 181 },
  { x: 160, y: 211 },
  { x: 198, y: 181 },
  { x: 237, y: 148 },
  { x: 269, y: 111 },
  { x: 277, y: 75 },
  { x: 250, y: 43 },
  { x: 209, y: 49 },
];

const CONEXIONES = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7],
  [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 0],
  [1, 4], [4, 7], [7, 10], [10, 13], [0, 7],
];

const CONTORNO = ESTRELLAS.map((e) => `${e.x},${e.y}`).join(" ");

// Estrellitas decorativas del fondo (fijas para que no cambien en cada render).
const POLVO = Array.from({ length: 34 }, (_, i) => ({
  x: (i * 97 + 13) % 320,
  y: (i * 61 + 29) % 240,
  r: 0.5 + ((i * 7) % 5) * 0.22,
  d: (i % 7) * 0.5,
}));

export default function Constellation() {
  const [seleccionadas, setSeleccionadas] = useState([]);
  const completa = seleccionadas.length >= CONSTELACION.estrellasNecesarias;
  const eraCompleta = useRef(false);

  useEffect(() => {
    if (completa && !eraCompleta.current) navigator.vibrate?.([20, 40, 20, 40, 60]);
    eraCompleta.current = completa;
  }, [completa]);

  function tocar(indice) {
    navigator.vibrate?.(10);
    setSeleccionadas((actuales) =>
      actuales.includes(indice) ? actuales.filter((n) => n !== indice) : [...actuales, indice],
    );
  }

  return (
    <section className="constelacion seccion" id="constelacion">
      <Reveal className="encabezado-seccion">
        <p className="eyebrow">
          <Stars size={16} /> {CONSTELACION.eyebrow}
        </p>
        <h2>
          {CONSTELACION.tituloInicio} <span className="texto-neon">{CONSTELACION.tituloResaltado}</span>
        </h2>
        <p className="encabezado-texto">{CONSTELACION.texto}</p>
      </Reveal>

      <Reveal className={`constelacion-escena${completa ? " constelacion-completa" : ""}`} delay={150}>
        <div className="constelacion-resplandor" />

        <svg
          className="constelacion-svg"
          viewBox="0 0 320 240"
          role="group"
          aria-label="Constelación interactiva. Seleccioná cinco estrellas."
        >
          {POLVO.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={p.r}
              className="polvo"
              style={{ animationDelay: `${p.d}s` }}
            />
          ))}

          <polygon points={CONTORNO} className="constelacion-relleno" />

          {CONEXIONES.map(([a, b], i) => {
            const A = ESTRELLAS[a];
            const B = ESTRELLAS[b];
            const encendida = completa || (seleccionadas.includes(a) && seleccionadas.includes(b));
            return (
              <g key={i}>
                <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} className="linea-base" />
                <line
                  x1={A.x}
                  y1={A.y}
                  x2={B.x}
                  y2={B.y}
                  pathLength="1"
                  className={encendida ? "linea-luz encendida" : "linea-luz"}
                />
              </g>
            );
          })}

          {ESTRELLAS.map((e, i) => {
            const activa = seleccionadas.includes(i);
            return (
              <g
                key={i}
                className={`estrella${activa ? " estrella-activa" : ""}`}
                role="button"
                tabIndex={0}
                aria-label={`Estrella ${i + 1}${activa ? ", seleccionada" : ""}`}
                aria-pressed={activa}
                onClick={() => tocar(i)}
                onKeyDown={(ev) => {
                  if (ev.key === "Enter" || ev.key === " ") {
                    ev.preventDefault();
                    tocar(i);
                  }
                }}
              >
                <circle cx={e.x} cy={e.y} r="18" className="estrella-area" />
                <circle cx={e.x} cy={e.y} r="8" className="estrella-halo" />
                <circle cx={e.x} cy={e.y} r="3.4" className="estrella-punto" />
              </g>
            );
          })}

          {completa && (
            <g className="constelacion-nombre">
              <text x="160" y="126" textAnchor="middle" className="nombre-texto">
                JULI
              </text>
              <text x="160" y="146" textAnchor="middle" className="nombre-corazon">
                ♡
              </text>
            </g>
          )}
        </svg>
      </Reveal>

      <p className="constelacion-mensaje" aria-live="polite">
        {completa
          ? CONSTELACION.completa
          : `Estrellas descubiertas: ${seleccionadas.length} de ${CONSTELACION.estrellasNecesarias}`}
      </p>

      {completa ? (
        <NeonButton onClick={() => setSeleccionadas([])} icono={<Sparkles size={17} />}>
          {CONSTELACION.boton}
        </NeonButton>
      ) : (
        <p className="constelacion-pista">{CONSTELACION.pista}</p>
      )}
    </section>
  );
}

import { useId, useRef, useState } from "react";
import { Sparkles } from "lucide-react";

const RAYOS = Array.from({ length: 9 }, (_, i) => i);

/**
 * Corazón holográfico: núcleo con brillo iridiscente, órbitas, piso de cuadrícula y
 * partículas. En escritorio se inclina con el mouse; en el celular flota solo.
 * Al tocarlo suelta una explosión de corazoncitos.
 */
export default function HoloHeart() {
  const id = useId();
  const escenaRef = useRef(null);
  const [explosiones, setExplosiones] = useState([]);

  function inclinar(e) {
    if (e.pointerType !== "mouse") return;
    const el = escenaRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${x * 22}deg`);
    el.style.setProperty("--rx", `${-y * 18}deg`);
  }

  function enderezar() {
    const el = escenaRef.current;
    if (!el) return;
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
  }

  function explotar() {
    const nueva = Date.now() + Math.random();
    setExplosiones((lista) => [...lista.slice(-2), nueva]);
    window.setTimeout(() => setExplosiones((lista) => lista.filter((x) => x !== nueva)), 1100);
    navigator.vibrate?.(14);
  }

  return (
    <div
      ref={escenaRef}
      className="holo-escena"
      onPointerMove={inclinar}
      onPointerLeave={enderezar}
    >
      <div className="holo-resplandor" />
      <div className="holo-piso" />
      <div className="holo-orbita holo-orbita-1" />
      <div className="holo-orbita holo-orbita-2" />
      <div className="holo-orbita holo-orbita-3" />

      <button
        type="button"
        className="holo-nucleo"
        onClick={explotar}
        aria-label="Corazón holográfico. Tocalo para ver corazones."
      >
        <svg viewBox="0 0 100 92" className="holo-svg" aria-hidden="true">
          <defs>
            <linearGradient id={`${id}-base`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffc2ec" />
              <stop offset="0.45" stopColor="#ff4fc0" />
              <stop offset="1" stopColor="#8c4dff" />
            </linearGradient>
            <linearGradient id={`${id}-brillo`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset="0.5" stopColor="#fff" stopOpacity="0.75" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <pattern id={`${id}-lineas`} width="4" height="4" patternUnits="userSpaceOnUse">
              <rect width="4" height="1.2" fill="#fff" opacity="0.16" />
            </pattern>
            <clipPath id={`${id}-clip`}>
              <path d="M50 88S6 60 6 30C6 14 17 5 29 5c9 0 16 5 21 13C55 10 62 5 71 5c12 0 23 9 23 25 0 30-44 58-44 58z" />
            </clipPath>
          </defs>
          <path
            d="M50 88S6 60 6 30C6 14 17 5 29 5c9 0 16 5 21 13C55 10 62 5 71 5c12 0 23 9 23 25 0 30-44 58-44 58z"
            fill={`url(#${id}-base)`}
          />
          <g clipPath={`url(#${id}-clip)`}>
            <rect width="100" height="92" fill={`url(#${id}-lineas)`} />
            <rect className="holo-barrido" x="-40" y="-10" width="36" height="120" fill={`url(#${id}-brillo)`} />
            <ellipse cx="32" cy="24" rx="16" ry="8" fill="#fff" opacity="0.22" transform="rotate(-28 32 24)" />
          </g>
        </svg>
      </button>

      <Sparkles className="holo-estrella holo-estrella-1" />
      <Sparkles className="holo-estrella holo-estrella-2" />
      <span className="holo-punto holo-punto-1" />
      <span className="holo-punto holo-punto-2" />
      <span className="holo-punto holo-punto-3" />

      {explosiones.map((n) => (
        <span className="holo-explosion" key={n} aria-hidden="true">
          {RAYOS.map((i) => (
            <i key={i} style={{ "--a": `${i * 40}deg`, "--r": `${70 + (i % 3) * 26}px` }}>
              {i % 2 ? "♡" : "♥"}
            </i>
          ))}
        </span>
      ))}
    </div>
  );
}

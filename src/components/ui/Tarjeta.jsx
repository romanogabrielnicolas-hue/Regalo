import { useRef } from "react";

/**
 * Tarjeta de vidrio con luz que sigue al puntero (estilo Magic Card / Card Spotlight).
 * En pantallas táctiles no hace nada extra: solo se ve el vidrio y el borde.
 */
export default function Tarjeta({ as: Etiqueta = "div", className = "", children, ...resto }) {
  const ref = useRef(null);

  function mover(e) {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <Etiqueta ref={ref} className={`tarjeta ${className}`.trim()} onPointerMove={mover} {...resto}>
      {children}
    </Etiqueta>
  );
}

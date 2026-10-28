import { useEffect } from "react";

let bloqueos = 0;
let scrollGuardado = 0;

/**
 * Bloquea el scroll de la página mientras hay un modal abierto.
 * Usa position:fixed porque `overflow:hidden` solo no alcanza en iPhone (Safari).
 * Es seguro con varios modales a la vez (cuenta los bloqueos).
 */
export function useBodyScrollLock(activo) {
  useEffect(() => {
    if (!activo) return undefined;

    if (bloqueos === 0) {
      scrollGuardado = window.scrollY;
      const b = document.body.style;
      b.position = "fixed";
      b.top = `-${scrollGuardado}px`;
      b.left = "0";
      b.right = "0";
      b.width = "100%";
    }
    bloqueos += 1;

    return () => {
      bloqueos -= 1;
      if (bloqueos === 0) {
        const b = document.body.style;
        b.position = "";
        b.top = "";
        b.left = "";
        b.right = "";
        b.width = "";
        // "instant" evita que el scroll-behavior:smooth global anime la restauración
        window.scrollTo({ top: scrollGuardado, behavior: "instant" });
      }
    };
  }, [activo]);
}

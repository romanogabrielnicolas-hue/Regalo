import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/** true si el dispositivo pidió menos animaciones (accesibilidad / ahorro de batería). */
export function useReducedMotion() {
  const [reducido, setReducido] = useState(
    () => typeof window !== "undefined" && window.matchMedia(QUERY).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const alCambiar = () => setReducido(mq.matches);
    mq.addEventListener("change", alCambiar);
    return () => mq.removeEventListener("change", alCambiar);
  }, []);

  return reducido;
}

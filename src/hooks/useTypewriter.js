import { useEffect, useState } from "react";

/**
 * Escribe `texto` letra por letra cuando `activo` es true.
 * Devuelve { escrito, terminado }. Con `instantaneo` muestra todo de una vez.
 */
export function useTypewriter(
  texto,
  { activo = true, velocidad = 55, retraso = 0, instantaneo = false } = {},
) {
  const [cantidad, setCantidad] = useState(0);

  useEffect(() => {
    if (!activo) {
      setCantidad(0);
      return undefined;
    }
    if (instantaneo) {
      setCantidad(texto.length);
      return undefined;
    }

    setCantidad(0);
    let intervalo;
    const inicio = window.setTimeout(() => {
      intervalo = window.setInterval(() => {
        setCantidad((n) => {
          if (n + 1 >= texto.length) window.clearInterval(intervalo);
          return Math.min(n + 1, texto.length);
        });
      }, velocidad);
    }, retraso);

    return () => {
      window.clearTimeout(inicio);
      window.clearInterval(intervalo);
    };
  }, [texto, activo, velocidad, retraso, instantaneo]);

  return { escrito: texto.slice(0, cantidad), terminado: cantidad >= texto.length };
}

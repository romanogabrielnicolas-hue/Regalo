import { useEffect, useRef, useState } from "react";

/** true cuando el elemento entra en pantalla. `once` lo deja en true para siempre. */
export function useInView({ once = true, margen = "0px 0px -8% 0px" } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }
    const obs = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisible(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { rootMargin: margen, threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once, margen]);

  return [ref, visible];
}

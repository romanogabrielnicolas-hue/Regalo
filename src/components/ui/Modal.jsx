import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";

const FOCUSABLES =
  'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Ventana modal accesible:
 *  - se cierra con Esc, con el botón ✕ o tocando el fondo
 *  - bloquea el scroll de la página (también en iPhone)
 *  - atrapa el foco del teclado y lo devuelve al botón que la abrió
 *  - en celulares se muestra como hoja que sube desde abajo, respetando las zonas seguras
 */
export default function Modal({
  abierto,
  onCerrar,
  etiqueta,
  etiquetaCerrar = "Cerrar",
  className = "",
  scrollRef,
  children,
}) {
  const [montado, setMontado] = useState(abierto);
  const [cerrando, setCerrando] = useState(false);
  const ventanaRef = useRef(null);
  const anteriorRef = useRef(null);

  useBodyScrollLock(montado);

  useEffect(() => {
    if (abierto) {
      setMontado(true);
      setCerrando(false);
      anteriorRef.current = document.activeElement;
      return undefined;
    }
    if (!montado) return undefined;
    setCerrando(true);
    const id = window.setTimeout(() => {
      setMontado(false);
      setCerrando(false);
      // Devuelve el foco solo si otro modal (p. ej. carta → sorpresa) no lo tomó antes.
      const foco = document.activeElement;
      const libre = !foco || foco === document.body || ventanaRef.current?.contains(foco);
      if (libre) anteriorRef.current?.focus?.({ preventScroll: true });
    }, 260);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [abierto]);

  useEffect(() => {
    if (montado && abierto) {
      const id = window.requestAnimationFrame(() => {
        ventanaRef.current?.querySelector(".modal-cerrar")?.focus({ preventScroll: true });
      });
      return () => window.cancelAnimationFrame(id);
    }
    return undefined;
  }, [montado, abierto]);

  const alTeclear = useCallback(
    (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCerrar();
        return;
      }
      if (e.key !== "Tab") return;
      const lista = ventanaRef.current?.querySelectorAll(FOCUSABLES);
      if (!lista || lista.length === 0) return;
      const primero = lista[0];
      const ultimo = lista[lista.length - 1];
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    },
    [onCerrar],
  );

  if (!montado) return null;

  return createPortal(
    <div
      className={`modal-capa${cerrando ? " cerrando" : ""}`}
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onCerrar();
      }}
      onKeyDown={alTeclear}
    >
      <section
        ref={ventanaRef}
        className={`modal-ventana ${className}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-label={etiqueta}
      >
        <button type="button" className="modal-cerrar" onClick={onCerrar} aria-label={etiquetaCerrar}>
          <X size={20} />
        </button>
        <div className="modal-scroll" ref={scrollRef}>
          {children}
        </div>
      </section>
    </div>,
    document.body,
  );
}

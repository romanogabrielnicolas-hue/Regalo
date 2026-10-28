import { useEffect, useRef, useState } from "react";
import { SORPRESA } from "../../data/content";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useTypewriter } from "../../hooks/useTypewriter";
import HeartIcon from "../ui/HeartIcon";
import Modal from "../ui/Modal";
import PukaGaru from "./PukaGaru";

const CHISPAS = Array.from({ length: 10 }, (_, i) => i);

/**
 * La sorpresa en dos tiempos:
 *  1) un regalo luminoso que ella toca para abrir
 *  2) la revelación: foto, Puka y Garu, mensaje escrito en vivo y firma.
 */
export default function SurpriseModal({ abierto, onCerrar }) {
  const reducido = useReducedMotion();
  const [fase, setFase] = useState("caja"); // "caja" | "abriendo" | "abierta"
  const [saltar, setSaltar] = useState(false);
  const scrollRef = useRef(null);
  const mensajeRef = useRef(null);
  const usuarioDesplazo = useRef(false);
  const temporizador = useRef(0);

  const revelada = fase === "abierta";
  const instantaneo = saltar || reducido;
  const mensaje = useTypewriter(SORPRESA.mensaje, {
    activo: revelada,
    velocidad: 45,
    retraso: 2800,
    instantaneo,
  });
  const firma = useTypewriter(SORPRESA.firma, {
    activo: revelada && mensaje.terminado,
    velocidad: 75,
    instantaneo,
  });

  // Cada vez que se abre la sorpresa, vuelve a empezar desde el regalo.
  useEffect(() => {
    if (abierto) {
      setFase("caja");
      setSaltar(false);
      usuarioDesplazo.current = false;
    }
    return () => window.clearTimeout(temporizador.current);
  }, [abierto]);

  // Cuando empieza a escribirse el mensaje, lo acerca a la vista (salvo que ella ya esté desplazando).
  useEffect(() => {
    if (!revelada) return undefined;
    const cont = scrollRef.current;
    const marcar = () => {
      usuarioDesplazo.current = true;
    };
    cont?.addEventListener("wheel", marcar, { passive: true });
    cont?.addEventListener("touchmove", marcar, { passive: true });

    const id = window.setTimeout(() => {
      if (!usuarioDesplazo.current) {
        mensajeRef.current?.scrollIntoView({ behavior: reducido ? "auto" : "smooth", block: "center" });
      }
    }, 2700);

    return () => {
      window.clearTimeout(id);
      cont?.removeEventListener("wheel", marcar);
      cont?.removeEventListener("touchmove", marcar);
    };
  }, [revelada, reducido]);

  function abrirRegalo() {
    if (fase !== "caja") return;
    setFase("abriendo");
    navigator.vibrate?.([30, 40, 70]);
    temporizador.current = window.setTimeout(() => setFase("abierta"), reducido ? 120 : 1150);
  }

  return (
    <Modal
      abierto={abierto}
      onCerrar={onCerrar}
      etiqueta="Sorpresa para Juli"
      etiquetaCerrar="Cerrar sorpresa"
      className="modal-sorpresa"
      scrollRef={scrollRef}
    >
      {!revelada && (
        <div className={`regalo-escena fase-${fase}`}>
          <p className="eyebrow centrado">{SORPRESA.cajaTitulo}</p>

          <button type="button" className="regalo" onClick={abrirRegalo} aria-label="Abrir el regalo">
            <span className="regalo-luz" aria-hidden="true" />
            <span className="regalo-tapa" aria-hidden="true">
              <span className="regalo-lazo">
                <HeartIcon size={44} />
              </span>
            </span>
            <span className="regalo-caja" aria-hidden="true">
              <span className="regalo-cinta" />
            </span>
            <span className="regalo-chispas" aria-hidden="true">
              {CHISPAS.map((i) => (
                <i key={i} style={{ "--a": `${i * 36}deg` }}>
                  {i % 2 ? "✦" : "♥"}
                </i>
              ))}
            </span>
          </button>

          <p className="regalo-pista">{SORPRESA.cajaPista}</p>
        </div>
      )}

      {revelada && (
        <div className="sorpresa">
          <div className="sorpresa-lluvia" aria-hidden="true">
            {Array.from({ length: 18 }, (_, i) => (
              <span key={i} style={{ "--i": i, "--left": `${i * 5.5}%` }}>
                {i % 2 === 0 ? "♥" : "✧"}
              </span>
            ))}
          </div>

          <div className="sorpresa-sello" aria-hidden="true">
            <HeartIcon size={40} />
          </div>

          <p className="eyebrow centrado s-item" style={{ "--i": 0 }}>
            {SORPRESA.eyebrow}
          </p>
          <h2 className="s-item" style={{ "--i": 1 }}>
            {SORPRESA.titulo}
          </h2>

          <div className="foto-juli-marco s-item" style={{ "--i": 2 }}>
            <img
              className="foto-juli"
              src={SORPRESA.fotoSrc}
              alt={SORPRESA.fotoAlt}
              decoding="async"
              onError={(e) => {
                e.currentTarget.parentElement.style.display = "none";
              }}
            />
          </div>

          <div className="s-item" style={{ "--i": 3 }}>
            <PukaGaru />
          </div>

          <p
            className="texto-carta texto-revelado"
            ref={mensajeRef}
            onClick={() => setSaltar(true)}
            title="Tocá para ver el mensaje completo"
          >
            <span className="solo-lectores">{SORPRESA.mensaje}</span>
            {/* El texto fantasma reserva el alto final para que la pantalla no "salte" al escribir */}
            <span className="texto-fantasma" aria-hidden="true">
              {SORPRESA.mensaje}
            </span>
            <span className="texto-escrito" aria-hidden="true">
              {mensaje.escrito}
              {!mensaje.terminado && <span className="cursor-escritura">▍</span>}
            </span>
          </p>

          <div className={`firma-romantica${mensaje.terminado ? " visible" : ""}`}>
            <p className="firma-para-vos">{SORPRESA.despedida}</p>
            <h3 className="firma-nombre">
              <span className="solo-lectores">{SORPRESA.firma}</span>
              <span aria-hidden="true">
                {firma.escrito}
                {firma.terminado ? (
                  <span className="firma-corazon"> ♥</span>
                ) : (
                  mensaje.terminado && <span className="cursor-escritura">▍</span>
                )}
              </span>
            </h3>
            <p className="firma-final">{SORPRESA.cierre}</p>
          </div>
        </div>
      )}
    </Modal>
  );
}

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { GALERIA } from "../../data/content";
import Modal from "../ui/Modal";
import Reveal from "../ui/Reveal";
import NeonButton from "../ui/NeonButton";

/**
 * Galería de recuerdos: carrusel horizontal con "scroll-snap" nativo (se desliza con el
 * dedo de forma fluida en Android e iPhone). Cada foto se puede abrir en pantalla grande.
 */
export default function Gallery() {
  const { fotos } = GALERIA;
  const scrollerRef = useRef(null);
  const slidesRef = useRef([]);
  const [activa, setActiva] = useState(0);
  const [abierta, setAbierta] = useState(null);

  // Detecta qué foto está centrada para resaltarla y marcar el punto correcto.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || typeof IntersectionObserver === "undefined") return undefined;
    const obs = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((en) => {
          if (en.isIntersecting) setActiva(Number(en.target.dataset.indice));
        });
      },
      { root: scroller, threshold: 0.6 },
    );
    slidesRef.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [fotos.length]);

  function irA(indice) {
    const i = Math.max(0, Math.min(fotos.length - 1, indice));
    slidesRef.current[i]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }

  const foto = abierta !== null ? fotos[abierta] : null;

  return (
    <section className="galeria seccion" id="recuerdos">
      <Reveal className="encabezado-seccion">
        <p className="eyebrow">
          <Sparkles size={15} /> {GALERIA.eyebrow}
        </p>
        <h2>{GALERIA.titulo}</h2>
        <p className="encabezado-texto">{GALERIA.texto}</p>
      </Reveal>

      <Reveal className="galeria-carrusel" delay={150}>
        <div
          className="galeria-scroller"
          ref={scrollerRef}
          role="region"
          aria-label="Galería de recuerdos"
          tabIndex={0}
        >
          {fotos.map((f, i) => (
            <figure
              key={f.src}
              className="galeria-slide"
              data-indice={i}
              data-activa={i === activa}
              ref={(el) => {
                slidesRef.current[i] = el;
              }}
            >
              <button
                type="button"
                className="galeria-foto-boton"
                onClick={() => setAbierta(i)}
                aria-label={`Ver en grande: ${f.titulo}`}
              >
                <span className="galeria-marco">
                  <img
                    src={f.src}
                    alt={f.alt}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    draggable="false"
                    style={{ objectPosition: f.posicion }}
                  />
                  <span className="galeria-brillo" aria-hidden="true" />
                </span>
                <figcaption>
                  <strong>{f.titulo}</strong>
                  <span>{f.detalle}</span>
                </figcaption>
              </button>
            </figure>
          ))}
        </div>

        {fotos.length > 1 && (
          <div className="galeria-controles">
            <NeonButton
              variante="icono"
              onClick={() => irA(activa - 1)}
              disabled={activa === 0}
              aria-label="Foto anterior"
            >
              <ChevronLeft size={20} />
            </NeonButton>

            <div className="galeria-puntos" role="tablist" aria-label="Elegir foto">
              {fotos.map((f, i) => (
                <button
                  type="button"
                  key={f.src}
                  role="tab"
                  aria-selected={i === activa}
                  aria-label={`Foto ${i + 1} de ${fotos.length}`}
                  className={i === activa ? "punto activo" : "punto"}
                  onClick={() => irA(i)}
                />
              ))}
            </div>

            <NeonButton
              variante="icono"
              onClick={() => irA(activa + 1)}
              disabled={activa === fotos.length - 1}
              aria-label="Foto siguiente"
            >
              <ChevronRight size={20} />
            </NeonButton>
          </div>
        )}
      </Reveal>

      <Modal
        abierto={abierta !== null}
        onCerrar={() => setAbierta(null)}
        etiqueta={foto ? foto.titulo : "Foto"}
        etiquetaCerrar="Cerrar foto"
        className="modal-foto"
      >
        {foto && (
          <div className="foto-grande">
            <img src={foto.src} alt={foto.alt} decoding="async" />
            <p className="foto-grande-titulo">{foto.titulo}</p>
            <p className="foto-grande-detalle">{foto.detalle}</p>
          </div>
        )}
      </Modal>
    </section>
  );
}

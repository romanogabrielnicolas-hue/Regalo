import { useEffect, useRef } from "react";
import { Heart, Pause, Play } from "lucide-react";
import NeonButton from "../ui/NeonButton";

/** Barra superior fija: marca, estado, botón de música y línea de progreso del scroll. */
export default function TopBar({ musicaActiva, onMusica, onInicio }) {
  const progresoRef = useRef(null);

  useEffect(() => {
    let pendiente = false;
    const actualizar = () => {
      pendiente = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      progresoRef.current?.style.setProperty("--p", String(p));
    };
    const alScroll = () => {
      if (!pendiente) {
        pendiente = true;
        window.requestAnimationFrame(actualizar);
      }
    };
    actualizar();
    window.addEventListener("scroll", alScroll, { passive: true });
    window.addEventListener("resize", alScroll);
    return () => {
      window.removeEventListener("scroll", alScroll);
      window.removeEventListener("resize", alScroll);
    };
  }, []);

  return (
    <header className="barra-superior">
      <a
        className="marca"
        href="#inicio"
        onClick={(e) => {
          e.preventDefault();
          onInicio();
        }}
      >
        <Heart fill="currentColor" size={19} />
        TE QUIERO<span>JULI</span>
      </a>

      <div className="estado">
        <span className="estado-punto" />
        UN UNIVERSO PARA VOS
      </div>

      <NeonButton
        variante="icono"
        onClick={onMusica}
        aria-label={musicaActiva ? "Pausar música" : "Reproducir música"}
        title={musicaActiva ? "Pausar música" : "Reproducir música"}
      >
        {musicaActiva ? <Pause size={18} /> : <Play size={18} />}
      </NeonButton>

      <span className="barra-progreso-scroll" ref={progresoRef} aria-hidden="true" />
    </header>
  );
}

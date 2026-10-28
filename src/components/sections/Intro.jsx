import { Sparkles } from "lucide-react";
import { INTRO } from "../../data/content";
import HeartIcon from "../ui/HeartIcon";
import NeonButton from "../ui/NeonButton";
import TextoPalabras from "../ui/TextoPalabras";

/** Pantalla inicial: portal luminoso con el nombre de Juli y el botón para entrar. */
export default function Intro({ onEntrar, saliendo }) {
  return (
    <section className={`intro${saliendo ? " intro-saliendo" : ""}`}>
      <div className="intro-portal" aria-hidden="true">
        <span className="portal-anillo portal-anillo-1" />
        <span className="portal-anillo portal-anillo-2" />
        <span className="portal-anillo portal-anillo-3" />
        <span className="portal-luz" />
        <HeartIcon className="portal-corazon" size={64} />
      </div>

      <p className="eyebrow intro-item" style={{ "--i": 0 }}>
        <Sparkles size={15} /> {INTRO.eyebrow}
      </p>

      <h1 className="intro-titulo">
        <TextoPalabras texto={INTRO.tituloLinea1} inmediato retraso={250} className="intro-linea" />
        <span className="texto-neon intro-nombre">{INTRO.tituloNombre}</span>
      </h1>

      <p className="intro-texto intro-item" style={{ "--i": 3 }}>
        {INTRO.texto}
      </p>

      <div className="intro-item" style={{ "--i": 4 }}>
        <NeonButton onClick={onEntrar} icono={<Sparkles size={18} />} disabled={saliendo}>
          {INTRO.boton}
        </NeonButton>
      </div>

      <p className="intro-nota intro-item" style={{ "--i": 5 }}>
        {INTRO.nota}
      </p>
    </section>
  );
}

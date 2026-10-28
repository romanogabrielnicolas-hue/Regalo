import { Heart, Mail, Sparkles, Stars } from "lucide-react";
import { HERO } from "../../data/content";
import HoloHeart from "./HoloHeart";
import NeonButton from "../ui/NeonButton";
import Reveal from "../ui/Reveal";
import TextoPalabras from "../ui/TextoPalabras";

export default function Hero({ onCarta, onSorpresa }) {
  return (
    <section className="hero seccion" id="inicio">
      <div className="hero-texto">
        <Reveal as="p" className="eyebrow">
          <Stars size={16} /> {HERO.eyebrow}
        </Reveal>

        <h1 className="hero-titulo">
          <TextoPalabras texto={HERO.titulo} inmediato retraso={200} />
          <TextoPalabras texto={HERO.tituloResaltado} inmediato retraso={650} className="texto-neon" />
        </h1>

        <Reveal as="p" className="descripcion" delay={500}>
          {HERO.descripcion}
        </Reveal>

        <Reveal className="acciones" delay={650}>
          <NeonButton onClick={onCarta} icono={null}>
            <Mail size={18} /> {HERO.botonCarta}
          </NeonButton>
          <NeonButton variante="secundario" onClick={onSorpresa} icono={<Heart size={17} />}>
            {HERO.botonSorpresa}
          </NeonButton>
        </Reveal>

        <Reveal className="mini-dedicatoria" delay={800}>
          <Heart fill="currentColor" size={16} />
          <span>{HERO.miniDedicatoria}</span>
        </Reveal>
      </div>

      <div className="hero-visual">
        <div className="etiqueta-holo">
          <span className="estado-punto" />
          {HERO.etiquetaHolo}
        </div>

        <HoloHeart />

        <div className="frecuencia">
          <Sparkles size={15} />
          <span>{HERO.frecuencia}</span>
        </div>
      </div>
    </section>
  );
}

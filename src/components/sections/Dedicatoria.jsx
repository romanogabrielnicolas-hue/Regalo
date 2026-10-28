import { Mail, Sparkles } from "lucide-react";
import { DEDICATORIA } from "../../data/content";
import Reveal from "../ui/Reveal";
import Tarjeta from "../ui/Tarjeta";
import NeonButton from "../ui/NeonButton";

export default function Dedicatoria({ onCarta }) {
  return (
    <Reveal as="section" className="seccion dedicatoria-seccion" id="mensaje">
      <Tarjeta className="dedicatoria">
        <div className="dedicatoria-icono">
          <Sparkles size={24} />
        </div>

        <div className="dedicatoria-texto">
          <p className="eyebrow">{DEDICATORIA.eyebrow}</p>
          <h2>{DEDICATORIA.titulo}</h2>
          <p>{DEDICATORIA.texto}</p>
        </div>

        <NeonButton variante="icono" className="dedicatoria-boton" onClick={onCarta} aria-label="Leer carta">
          <Mail size={19} />
        </NeonButton>
      </Tarjeta>
    </Reveal>
  );
}

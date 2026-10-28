import { Sparkles } from "lucide-react";
import { CARTA } from "../../data/content";
import HeartIcon from "../ui/HeartIcon";
import Modal from "../ui/Modal";
import NeonButton from "../ui/NeonButton";

/** La carta: un sobre que se abre y el texto que va apareciendo párrafo por párrafo. */
export default function LetterModal({ abierto, onCerrar, onSorpresa }) {
  return (
    <Modal
      abierto={abierto}
      onCerrar={onCerrar}
      etiqueta="Carta para Juli"
      etiquetaCerrar="Cerrar carta"
      className="modal-carta"
    >
      <div className="carta">
        <div className="carta-sobre" aria-hidden="true">
          <span className="carta-solapa" />
          <span className="carta-sello">
            <HeartIcon size={30} />
          </span>
        </div>

        <p className="eyebrow centrado carta-item" style={{ "--i": 0 }}>
          {CARTA.eyebrow}
        </p>
        <h2 className="carta-item" style={{ "--i": 1 }}>
          {CARTA.titulo} <span className="texto-neon">♡</span>
        </h2>
        <div className="linea-romantica carta-item" style={{ "--i": 2 }} aria-hidden="true">
          ✧ ─── ♡ ─── ✧
        </div>

        {CARTA.parrafos.map((texto, i) => (
          <p
            key={i}
            className={`texto-carta carta-item${i === CARTA.parrafos.length - 1 ? " cierre-emotivo" : ""}`}
            style={{ "--i": 3 + i * 1.6 }}
          >
            {texto}
          </p>
        ))}

        <p className="firma-carta carta-item" style={{ "--i": 3 + CARTA.parrafos.length * 1.6 }}>
          {CARTA.despedida}
          <span className="firma-gabi">{CARTA.firma}</span>
        </p>

        <div className="carta-item" style={{ "--i": 4 + CARTA.parrafos.length * 1.6 }}>
          <NeonButton className="boton-completo" onClick={onSorpresa} icono={<Sparkles size={17} />}>
            {CARTA.boton}
          </NeonButton>
        </div>
      </div>
    </Modal>
  );
}

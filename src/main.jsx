import { createRoot } from "react-dom/client";
import { useEffect, useRef, useState } from "react";
import {
  Heart,
  Sparkles,
  Mail,
  X,
  Music2,
  Pause,
  Play,
  Stars,
} from "lucide-react";
import "./style.css";

function Particulas() {
  return (
    <div className="particulas" aria-hidden="true">
      {Array.from({ length: 42 }, (_, i) => (
        <span
          key={i}
          style={{
            "--x": `${(i * 47 + 5) % 100}%`,
            "--delay": `${(i % 9) * -1.1}s`,
            "--duration": `${7 + (i % 7)}s`,
            "--size": `${10 + (i % 12)}px`,
          }}
        >
          {i % 3 === 0 ? "♥" : i % 3 === 1 ? "✦" : "✧"}
        </span>
      ))}
    </div>
  );
}

export default function App() {
  const [cartaAbierta, setCartaAbierta] = useState(false);
  const [sorpresa, setSorpresa] = useState(false);
  const [musicaActiva, setMusicaActiva] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  async function alternarMusica() {
    const audio = audioRef.current;
    if (!audio) return;

    if (musicaActiva) {
      audio.pause();
      setMusicaActiva(false);
      return;
    }

    try {
      await audio.play();
      setMusicaActiva(true);
    } catch {
      setMusicaActiva(false);
      alert(
        "No se pudo reproducir la música. Revisá que exista public/musica.mp3.",
      );
    }
  }

  return (
    <main className="pagina">
      <div className="fondo-luz luz-rosa" />
      <div className="fondo-luz luz-violeta" />
      <Particulas />

      <audio
        ref={audioRef}
        src="/musica.mp3"
        loop
        preload="none"
        onEnded={() => setMusicaActiva(false)}
        onPause={() => setMusicaActiva(false)}
        onPlay={() => setMusicaActiva(true)}
      />

      <button
        className="boton-musica"
        onClick={alternarMusica}
        aria-label={musicaActiva ? "Pausar música" : "Reproducir música"}
      >
        {musicaActiva ? <Pause size={18} /> : <Play size={18} />}
        <Music2 size={18} />
        <span>{musicaActiva ? "Pausar música" : "Reproducir música"}</span>
      </button>

      <section className="tarjeta">
        <div className="destello-superior">
          <Stars size={17} />
          <span>UN PEQUEÑO UNIVERSO PARA VOS</span>
          <Stars size={17} />
        </div>

        <p className="etiqueta">
          <Sparkles size={16} /> HECHO CON MUCHO CARIÑO
        </p>

        <div className="corazon-escena" aria-label="Un corazón brillante">
          <div className="aura aura-externa" />
          <div className="aura aura-interna" />
          <div className="aro aro-uno" />
          <div className="aro aro-dos" />
          <Heart className="corazon-3d" fill="currentColor" strokeWidth={1.1} />
          <Sparkles className="brillo brillo-uno" />
          <Sparkles className="brillo brillo-dos" />
          <span className="destello-punto punto-uno" />
          <span className="destello-punto punto-dos" />
        </div>

        <p className="introduccion">Hay algo que quiero que sepas...</p>

        <h1>
          Juli, sos la más
          <span> hermosa del mundo</span>
        </h1>

        <div className="separador">
          <span />
          <Heart size={15} fill="currentColor" />
          <span />
        </div>

        <p className="descripcion">
          Si pudiera regalarte algo en este mundo, te regalaría la capacidad de
          verte a través de mis ojos. Así sabrías lo especial que sos. 💗
        </p>

        <button
          className="boton boton-principal"
          onClick={() => setCartaAbierta(true)}
        >
          <Mail size={19} />
          Abrí tu cartita
          <Sparkles size={17} />
        </button>

        <p className="pista">Preparé algo especial para vos ✨</p>

        {cartaAbierta && (
          <div className="capa" onClick={() => setCartaAbierta(false)}>
            <section
              className="carta"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Carta para Juli"
            >
              <button
                className="cerrar"
                aria-label="Cerrar carta"
                onClick={() => setCartaAbierta(false)}
              >
                <X size={20} />
              </button>

              <div className="sello-carta">
                <Heart size={29} fill="currentColor" />
              </div>

              <p className="carta-etiqueta">UNA CARTITA PARA VOS</p>
              <h2>Para vos, Juli 💌</h2>

              <div className="linea-decorativa">✧ ── ♡ ── ✧</div>

              <p>
                Quería regalarte este pequeño rincón para recordarte lo
                increíble que sos. Ojalá nunca te falten motivos para sonreír,
                sueños que te hagan feliz y personas que te recuerden lo mucho
                que valés.
              </p>

              <p>
                No hace falta una fecha especial para decirle a alguien que hace
                el mundo un poquito más lindo. Y vos tenés esa magia especial.
                ✨
              </p>

              <p className="firma">Con mucho cariño Gabi alias-Cabezon ❤️</p>

              <button
                className="boton boton-principal"
                onClick={() => {
                  setCartaAbierta(false);
                  setSorpresa(true);
                }}
              >
                Ver mi sorpresa <Sparkles size={18} />
              </button>
            </section>
          </div>
        )}

        {sorpresa && (
          <div className="capa" onClick={() => setSorpresa(false)}>
            <section
              className="sorpresa"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Sorpresa para Juli"
            >
              <button
                className="cerrar"
                aria-label="Cerrar sorpresa"
                onClick={() => setSorpresa(false)}
              >
                <X size={20} />
              </button>

              <div className="sorpresa-brillos">
                <Sparkles />
                <Heart fill="currentColor" />
                <Sparkles />
              </div>

              <img
                className="foto-juli"
                src="/juli.jpg"
                alt="Una foto especial de Juli"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />

              <p className="carta-etiqueta">ESTO ES PARA VOS</p>
              <h2>¡Nunca dejes de brillar, Juli!</h2>
              <p>
                Sos una persona única y merecés cosas hermosas. Que la vida te
                regale tantas sonrisas como lo feliz que me haces sentir tu a
                mi. 💖
              </p>

              <div className="corazones-finales">♡ ♥ ♡</div>
            </section>
          </div>
        )}

        <footer className="pie">
          <span>Hecho con cariño para Juli </span>
          <Heart size={14} fill="currentColor" />
          <span className="pie-destello">✧</span>
        </footer>
      </section>

      <p className="frase-final">Un detalle pequeño, con un cariño enorme.</p>
    </main>
  );
}
createRoot(document.getElementById("root")).render(<App />);

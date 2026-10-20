import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Heart,
  Sparkles,
  Mail,
  X,
  Music2,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Stars,
  Volume2,
} from "lucide-react";
import "./style.css";

const CANCION = "Hecha Pa Mi";
const ARTISTA = "Grupo Frontera";

function Particulas() {
  return (
    <div className="particulas" aria-hidden="true">
      {Array.from({ length: 42 }, (_, i) => (
        <span
          key={i}
          className={i % 3 === 0 ? "particula-corazon" : "particula-estrella"}
          style={{
            "--x": `${(i * 43 + 7) % 100}%`,
            "--delay": `${-(i % 14) * 1.1}s`,
            "--duration": `${9 + (i % 8)}s`,
            "--size": `${10 + (i % 13)}px`,
            "--desvio": `${((i % 5) - 2) * 18}px`,
          }}
        >
          {i % 3 === 0 ? "♥" : i % 3 === 1 ? "✧" : "✦"}
        </span>
      ))}
    </div>
  );
}

function CorazonHolografico() {
  return (
    <div className="holo-scene" aria-label="Corazón holográfico">
      <div className="holo-glow" />
      <div className="holo-grid" />
      <div className="orbita orbita-uno" />
      <div className="orbita orbita-dos" />
      <div className="orbita orbita-tres" />

      <div className="nucleo">
        <Heart className="holo-heart" fill="currentColor" />
      </div>

      <Sparkles className="holo-star estrella-uno" />
      <Sparkles className="holo-star estrella-dos" />
      <span className="holo-dot punto-uno" />
      <span className="holo-dot punto-dos" />
      <span className="holo-dot punto-tres" />
    </div>
  );
}

function formatoTiempo(segundos) {
  if (!Number.isFinite(segundos)) return "0:00";

  const minutos = Math.floor(segundos / 60);
  const resto = Math.floor(segundos % 60);

  return `${minutos}:${String(resto).padStart(2, "0")}`;
}

function App() {
  const audioRef = useRef(null);

  const [iniciada, setIniciada] = useState(false);
  const [cartaAbierta, setCartaAbierta] = useState(false);
  const [sorpresa, setSorpresa] = useState(false);
  const [musicaActiva, setMusicaActiva] = useState(false);
  const [tiempoActual, setTiempoActual] = useState(0);
  const [duracion, setDuracion] = useState(0);
  const [volumen, setVolumen] = useState(0.75);
  const [errorMusica, setErrorMusica] = useState(false);
  const [mensajeSorpresa, setMensajeSorpresa] = useState("");
  const [firmaSorpresa, setFirmaSorpresa] = useState("");

  useEffect(() => {
    if (!sorpresa) {
      setMensajeSorpresa("");
      setFirmaSorpresa("");
      return;
    }

    const mensaje =
      "Que nunca te falten cosas lindas, abrazos sinceros, sueños por cumplir y motivos para ser feliz. Este detalle es pequeño, pero está hecho pensando en vos. ❤️";
    const firma = "GABI, TE QUIERO NEGRA";
    let indiceMensaje = 0;
    let indiceFirma = 0;
    let intervaloFirma;

    setMensajeSorpresa("");
    setFirmaSorpresa("");

    const intervaloMensaje = window.setInterval(() => {
      indiceMensaje += 1;
      setMensajeSorpresa(mensaje.slice(0, indiceMensaje));

      if (indiceMensaje >= mensaje.length) {
        window.clearInterval(intervaloMensaje);

        intervaloFirma = window.setInterval(() => {
          indiceFirma += 1;
          setFirmaSorpresa(firma.slice(0, indiceFirma));

          if (indiceFirma >= firma.length) {
            window.clearInterval(intervaloFirma);
          }
        }, 70);
      }
    }, 70);

    return () => {
      window.clearInterval(intervaloMensaje);
      if (intervaloFirma) window.clearInterval(intervaloFirma);
    };
  }, [sorpresa]);

  async function alternarMusica() {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      setErrorMusica(false);
      await audio.play();
    } catch {
      setMusicaActiva(false);
      setErrorMusica(true);
    }
  }

  function cambiarTiempo(e) {
    const nuevoTiempo = Number(e.target.value);
    setTiempoActual(nuevoTiempo);

    if (audioRef.current) {
      audioRef.current.currentTime = nuevoTiempo;
    }
  }

  function cambiarVolumen(e) {
    const nuevoVolumen = Number(e.target.value);
    setVolumen(nuevoVolumen);

    if (audioRef.current) {
      audioRef.current.volume = nuevoVolumen;
    }
  }

  function saltar(cantidad) {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration)) return;

    audio.currentTime = Math.max(
      0,
      Math.min(audio.duration, audio.currentTime + cantidad),
    );
  }

  return (
    <main className="juli-app">
      <div className="nebula nebula-uno" />
      <div className="nebula nebula-dos" />
      <div className="nebula nebula-tres" />
      <Particulas />

      <audio
        ref={audioRef}
        src="/musica.mp3"
        loop
        preload="metadata"
        onPlay={() => {
          setMusicaActiva(true);
          setErrorMusica(false);
        }}
        onPause={() => setMusicaActiva(false)}
        onTimeUpdate={(e) => setTiempoActual(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => {
          setDuracion(
            Number.isFinite(e.currentTarget.duration)
              ? e.currentTarget.duration
              : 0,
          );
          e.currentTarget.volume = volumen;
        }}
        onDurationChange={(e) => {
          setDuracion(
            Number.isFinite(e.currentTarget.duration)
              ? e.currentTarget.duration
              : 0,
          );
        }}
        onEnded={() => {
          setMusicaActiva(false);
          setTiempoActual(0);
        }}
        onError={() => setErrorMusica(true)}
      />

      {!iniciada ? (
        <section className="bienvenida">
          <div className="bienvenida-halo">
            <div className="bienvenida-corazon">
              <Heart fill="currentColor" size={38} />
            </div>
          </div>

          <p className="eyebrow">
            <Sparkles size={15} /> UN UNIVERSO CREADO PARA VOS
          </p>

          <h1>
            Para vos,
            <span className="texto-neon"> Juli ♡</span>
          </h1>

          <p className="bienvenida-texto">
            Entre tantas estrellas, quería crear un lugarcito que tuviera tu
            nombre. Esta pequeña sorpresa es solamente para vos.
          </p>

          <button className="boton-neon" onClick={() => setIniciada(true)}>
            Entrar a nuestro universo <Sparkles size={18} />
          </button>

          <p className="nota-inicial">UNA PEQUEÑA SORPRESA HECHA CON CARIÑO</p>
        </section>
      ) : (
        <>
          <header className="barra-superior">
            <a
              className="marca"
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                setCartaAbierta(false);
                setSorpresa(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <Heart fill="currentColor" size={19} />
              TE QUIERO<span>JULI</span>
            </a>

            <div className="estado">
              <span className="estado-punto" />
              UN UNIVERSO PARA VOS
            </div>

            <button
              className="boton-icono"
              onClick={alternarMusica}
              aria-label={musicaActiva ? "Pausar música" : "Reproducir música"}
              title={musicaActiva ? "Pausar música" : "Reproducir música"}
            >
              {musicaActiva ? <Pause size={18} /> : <Play size={18} />}
            </button>
          </header>

          <section className="hero" id="inicio">
            <div className="hero-texto">
              <p className="eyebrow">
                <Stars size={16} /> HECHO ESPECIALMENTE PARA VOS
              </p>

              <h1>
                El universo es inmenso,
                <span> pero vos sos mi parte favorita.</span>
              </h1>

              <p className="descripcion">
                Hay personas que hacen que los días sean más lindos sin siquiera
                intentarlo. Este pequeño mundo digital lleva tu nombre porque
                quería regalarte algo diferente. 💗
              </p>

              <div className="acciones">
                <button
                  className="boton-neon"
                  onClick={() => setCartaAbierta(true)}
                >
                  <Mail size={18} /> Abrir mi cartita
                </button>

                <button
                  className="boton-secundario"
                  onClick={() => setSorpresa(true)}
                >
                  Una sorpresa para vos <Heart size={17} />
                </button>
              </div>

              <div className="mini-dedicatoria">
                <Heart fill="currentColor" size={16} />
                <span>Un detalle pequeño, con un cariño enorme.</span>
              </div>
            </div>

            <div className="hero-visual">
              <div className="etiqueta-holo">
                <span className="estado-punto" />
                CORAZÓN CONECTADO
              </div>

              <CorazonHolografico />

              <div className="frecuencia">
                <Sparkles size={15} />
                <span>FRECUENCIA: CARIÑO INFINITO</span>
              </div>
            </div>
          </section>

          <section className="reproductor">
            <div className="reproductor-caratula">
              <div className="disco">
                <div className="disco-centro">
                  <Heart fill="currentColor" size={23} />
                </div>
              </div>
              <span className="ecualizador" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
              </span>
            </div>

            <div className="reproductor-contenido">
              <p className="eyebrow">
                <Music2 size={14} /> LO QUE ME RECUEDA A TI
              </p>

              <h2>{CANCION}</h2>
              <p className="artista">{ARTISTA}</p>

              <div className="progreso-fila">
                <span>{formatoTiempo(tiempoActual)}</span>
                <input
                  className="barra-progreso"
                  type="range"
                  min="0"
                  max={duracion || 1}
                  step="0.1"
                  value={Math.min(tiempoActual, duracion || 1)}
                  onChange={cambiarTiempo}
                  aria-label="Posición de la canción"
                  style={{
                    "--progreso": `${
                      duracion ? (tiempoActual / duracion) * 100 : 0
                    }%`,
                  }}
                />
                <span>{formatoTiempo(duracion)}</span>
              </div>

              <div className="controles-musica">
                <button
                  className="control-secundario"
                  onClick={() => saltar(-10)}
                  aria-label="Retroceder diez segundos"
                  title="Retroceder 10 segundos"
                >
                  <SkipBack size={18} />
                </button>

                <button
                  className="control-play"
                  onClick={alternarMusica}
                  aria-label={
                    musicaActiva ? "Pausar canción" : "Reproducir canción"
                  }
                >
                  {musicaActiva ? (
                    <Pause size={21} fill="currentColor" />
                  ) : (
                    <Play size={21} fill="currentColor" />
                  )}
                </button>

                <button
                  className="control-secundario"
                  onClick={() => saltar(10)}
                  aria-label="Avanzar diez segundos"
                  title="Avanzar 10 segundos"
                >
                  <SkipForward size={18} />
                </button>

                <div className="control-volumen">
                  <Volume2 size={16} />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volumen}
                    onChange={cambiarVolumen}
                    aria-label="Volumen"
                  />
                </div>
              </div>

              {errorMusica && (
                <p className="error-musica" role="status">
                  No se pudo cargar la canción. Revisá que exista
                  public/musica.mp3 y que sea un audio válido.
                </p>
              )}
            </div>
          </section>

          <section className="dedicatoria-panel">
            <div className="dedicatoria-icono">
              <Sparkles size={24} />
            </div>

            <div className="dedicatoria-texto">
              <p className="eyebrow">UN MENSAJITO PARA VOS</p>
              <h2>Hay personas que son pura magia.</h2>
              <p>
                Y después estás vos, Juli. Ojalá nunca te falten motivos para
                sonreír, sueños que te emocionen y personas que te recuerden lo
                valiosa que sos. ✨
              </p>
            </div>

            <button
              className="boton-icono boton-flecha"
              onClick={() => setCartaAbierta(true)}
              aria-label="Leer carta"
            >
              <Mail size={19} />
            </button>
          </section>

          <footer className="footer">
            Hecho con <Heart size={13} fill="currentColor" /> mucho cariño para
            Juli.
          </footer>
        </>
      )}

      {cartaAbierta && (
        <div className="modal-capa" onClick={() => setCartaAbierta(false)}>
          <section
            className="modal-ventana"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Carta para Juli"
          >
            <button
              className="modal-cerrar"
              onClick={() => setCartaAbierta(false)}
              aria-label="Cerrar carta"
            >
              <X size={20} />
            </button>

            <div className="modal-corazon">
              <Heart fill="currentColor" size={29} />
            </div>

            <p className="eyebrow centrado">UNA CARTA PARA VOS</p>
            <h2>
              Para vos, Juli <span>♡</span>
            </h2>
            <div className="linea-romantica">✧ ─── ♡ ─── ✧</div>

            <p className="texto-carta">
              Quería regalarte algo distinto, algo que no fuera solamente una
              imagen o unas palabras. Por eso hice este pequeño universo para
              vos, con la ilusión de sacarte una sonrisa.
            </p>

            <p className="texto-carta">
              Ojalá pudieras verte un ratito a través de los ojos de las
              personas que te aprecian. Quizás así entenderías lo especial que
              sos y toda la luz que podés transmitir con algo tan simple como
              una sonrisa.
            </p>

            <p className="firma-carta">Con mucho cariño, para vos. 💗</p>

            <button
              className="boton-neon boton-completo"
              onClick={() => {
                setCartaAbierta(false);
                setSorpresa(true);
              }}
            >
              Descubrir la sorpresa <Sparkles size={17} />
            </button>
          </section>
        </div>
      )}

      {sorpresa && (
        <div className="modal-capa" onClick={() => setSorpresa(false)}>
          <section
            className="modal-ventana modal-sorpresa"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Sorpresa para Juli"
          >
            <button
              className="modal-cerrar"
              onClick={() => setSorpresa(false)}
              aria-label="Cerrar sorpresa"
            >
              <X size={20} />
            </button>

            <div className="corazones-sorpresa" aria-hidden="true">
              {Array.from({ length: 18 }, (_, i) => (
                <span key={i} style={{ "--i": i, "--left": `${i * 5.5}%` }}>
                  {i % 2 === 0 ? "♥" : "✧"}
                </span>
              ))}
            </div>

            <div className="modal-corazon">
              <Heart fill="currentColor" size={31} />
            </div>

            <p className="eyebrow centrado">SORPRESA DESBLOQUEADA</p>
            <h2>¡Nunca dejes de brillar, Juli!</h2>

            <img
              className="foto-juli"
              src="/juli.jpg"
              alt="Una foto especial de Juli"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />

            <p className="texto-carta texto-revelado" aria-live="polite">
              {mensajeSorpresa}
              {mensajeSorpresa.length > 0 && mensajeSorpresa.length < 157 && (
                <span className="cursor-escritura" aria-hidden="true">
                  ▍
                </span>
              )}
            </p>

            <div className="firma-romantica">
              <p className="firma-para-vos">Con todo mi cariño,</p>

              <h3 className="firma-nombre">
                {firmaSorpresa
                  .replace("Con todo mi cariño, ", "")
                  .replace(" ❤️", "")}
                {firmaSorpresa.length >= 29 && <span> ♥</span>}
                {firmaSorpresa.length < 29 && (
                  <span className="cursor-escritura" aria-hidden="true">
                    ▍
                  </span>
                )}
              </h3>

              <p className="firma-final">
                Hecho especialmente para vos, Juli ✨
              </p>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);

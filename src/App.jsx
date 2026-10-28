import { useCallback, useEffect, useRef, useState } from "react";
import { CANCION, MUSICA_AL_ENTRAR } from "./data/content";
import { useAudioPlayer } from "./hooks/useAudioPlayer";
import { useReducedMotion } from "./hooks/useReducedMotion";
import Aurora from "./components/background/Aurora";
import Starfield from "./components/background/Starfield";
import Intro from "./components/sections/Intro";
import TopBar from "./components/sections/TopBar";
import Hero from "./components/sections/Hero";
import Gallery from "./components/sections/Gallery";
import Constellation from "./components/sections/Constellation";
import MusicPlayer from "./components/sections/MusicPlayer";
import Dedicatoria from "./components/sections/Dedicatoria";
import Footer from "./components/sections/Footer";
import LetterModal from "./components/modals/LetterModal";
import SurpriseModal from "./components/modals/SurpriseModal";

const DURACION_SALTO = 1300; // ms del "viaje" cinematográfico entre la intro y el universo

export default function App() {
  const reducido = useReducedMotion();
  const [fase, setFase] = useState("intro"); // "intro" | "salto" | "universo"
  const [cartaAbierta, setCartaAbierta] = useState(false);
  const [sorpresaAbierta, setSorpresaAbierta] = useState(false);
  const temporizador = useRef(0);

  const player = useAudioPlayer({
    src: CANCION.archivo,
    titulo: CANCION.titulo,
    artista: CANCION.artista,
  });

  useEffect(() => () => window.clearTimeout(temporizador.current), []);

  const entrar = useCallback(() => {
    if (fase !== "intro") return;
    // play() tiene que ejecutarse dentro del toque del usuario (regla de iPhone/Android)
    if (MUSICA_AL_ENTRAR) player.play();

    const terminar = () => {
      setFase("universo");
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    if (reducido) {
      terminar();
      return;
    }
    setFase("salto");
    temporizador.current = window.setTimeout(terminar, DURACION_SALTO);
  }, [fase, player, reducido]);

  const irAlInicio = useCallback(() => {
    setCartaAbierta(false);
    setSorpresaAbierta(false);
    window.scrollTo({ top: 0, behavior: reducido ? "auto" : "smooth" });
  }, [reducido]);

  const enIntro = fase !== "universo";

  return (
    <main className={`app${enIntro ? " app-intro" : ""}`}>
      <Aurora />
      <Starfield warp={fase === "salto"} />
      <div
        className={`destello-salto${fase === "salto" ? " entra" : fase === "universo" ? " sale" : ""}`}
        aria-hidden="true"
      />

      {enIntro ? (
        <Intro onEntrar={entrar} saliendo={fase === "salto"} />
      ) : (
        <div className="universo">
          <TopBar musicaActiva={player.playing} onMusica={player.toggle} onInicio={irAlInicio} />
          <Hero onCarta={() => setCartaAbierta(true)} onSorpresa={() => setSorpresaAbierta(true)} />
          <Gallery />
          <Constellation />
          <MusicPlayer player={player} />
          <Dedicatoria onCarta={() => setCartaAbierta(true)} />
          <Footer />
        </div>
      )}

      <LetterModal
        abierto={cartaAbierta}
        onCerrar={() => setCartaAbierta(false)}
        onSorpresa={() => {
          setCartaAbierta(false);
          setSorpresaAbierta(true);
        }}
      />
      <SurpriseModal abierto={sorpresaAbierta} onCerrar={() => setSorpresaAbierta(false)} />
    </main>
  );
}

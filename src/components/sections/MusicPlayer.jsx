import { Heart, Music2, Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { CANCION, REPRODUCTOR } from "../../data/content";
import { formatoTiempo, useAudioProgress } from "../../hooks/useAudioPlayer";
import Reveal from "../ui/Reveal";
import Tarjeta from "../ui/Tarjeta";

/**
 * Reproductor: portada tipo disco de vinilo, barra de progreso, ±10 s y volumen.
 * (Debe montarse después de que el hook de audio creó el <audio>, lo cual ocurre
 * porque este componente solo se muestra al entrar al universo.)
 */
export default function MusicPlayer({ player }) {
  const { audioRef, playing, error, volume, volumeSupported, toggle, seek, skip, setVolume } = player;
  const { actual, duracion } = useAudioProgress(audioRef, true);
  const porcentaje = duracion ? (actual / duracion) * 100 : 0;

  return (
    <Reveal as="section" className="seccion reproductor-seccion" id="musica">
      <Tarjeta className={`reproductor${playing ? " musica-activa" : ""}`}>
        <div className="portada-wrap">
          <div className="disco" aria-hidden="true">
            <span className="disco-surcos" />
            <span className="disco-centro">
              <Heart fill="currentColor" size={14} />
            </span>
          </div>

          <div className="portada">
            <span className="portada-etiqueta">{REPRODUCTOR.etiquetaPortada}</span>
            <div className="portada-luna" />
            <div className="portada-corazon">
              <Heart fill="currentColor" size={43} />
            </div>
            <div className="portada-destellos" aria-hidden="true">
              ✦　·　✧　·　✦
            </div>
            <div className="portada-titulos">
              <span>{REPRODUCTOR.portadaSub}</span>
              <h3>{REPRODUCTOR.portadaTitulo}</h3>
              <p>{REPRODUCTOR.portadaFirma}</p>
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
            <Music2 size={14} /> {REPRODUCTOR.eyebrow}
          </p>
          <h2>{CANCION.titulo}</h2>
          <p className="artista">{CANCION.artista}</p>

          <div className="progreso-fila">
            <span>{formatoTiempo(actual)}</span>
            <input
              className="rango"
              type="range"
              min="0"
              max={duracion || 1}
              step="0.1"
              value={Math.min(actual, duracion || 1)}
              onChange={(e) => seek(Number(e.target.value))}
              aria-label="Posición de la canción"
              style={{ "--progreso": `${porcentaje}%` }}
            />
            <span>{formatoTiempo(duracion)}</span>
          </div>

          <div className="controles-musica">
            <button
              type="button"
              className="control-secundario"
              onClick={() => skip(-10)}
              aria-label="Retroceder diez segundos"
              title="Retroceder 10 segundos"
            >
              <SkipBack size={18} />
            </button>

            <button
              type="button"
              className="control-play"
              onClick={toggle}
              aria-label={playing ? "Pausar canción" : "Reproducir canción"}
            >
              {playing ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}
            </button>

            <button
              type="button"
              className="control-secundario"
              onClick={() => skip(10)}
              aria-label="Avanzar diez segundos"
              title="Avanzar 10 segundos"
            >
              <SkipForward size={18} />
            </button>

            {volumeSupported && (
              <div className="control-volumen">
                <Volume2 size={16} />
                <input
                  className="rango rango-volumen"
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  aria-label="Volumen"
                  style={{ "--progreso": `${volume * 100}%` }}
                />
              </div>
            )}
          </div>

          {error && (
            <p className="error-musica" role="status">
              {REPRODUCTOR.error}
            </p>
          )}
        </div>
      </Tarjeta>
    </Reveal>
  );
}

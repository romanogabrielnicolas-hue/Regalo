import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Reproductor de audio desacoplado de la interfaz.
 * - Crea un único <audio> y lo expone en `audioRef` (para leer el progreso).
 * - `play()` debe llamarse dentro de un toque del usuario (regla de iPhone/Android).
 * - `volumeSupported` es false en iPhone: Safari ignora `audio.volume` (el volumen
 *   se controla con los botones físicos), así que la UI oculta el control.
 */
export function useAudioPlayer({ src, titulo, artista, volumenInicial = 0.75 }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  const [volume, setVolumeState] = useState(volumenInicial);
  const [volumeSupported, setVolumeSupported] = useState(true);

  useEffect(() => {
    const audio = new Audio();
    audio.src = src;
    audio.loop = true;
    audio.preload = "metadata";
    audio.setAttribute("playsinline", "");
    audioRef.current = audio;

    // ¿Se puede cambiar el volumen por código? (iPhone: no)
    audio.volume = 0.5;
    const soportado = audio.volume === 0.5;
    setVolumeSupported(soportado);
    if (soportado) audio.volume = volumenInicial;

    const onPlay = () => {
      setPlaying(true);
      setError(false);
    };
    const onPause = () => setPlaying(false);
    const onError = () => setError(true);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);

    return () => {
      audio.pause();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
      audio.removeAttribute("src");
      audio.load();
      audioRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      setError(false);
      await audio.play();
    } catch {
      setPlaying(false);
      setError(true);
    }
  }, []);

  const pause = useCallback(() => audioRef.current?.pause(), []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) play();
    else audio.pause();
  }, [play]);

  const seek = useCallback((segundos) => {
    const audio = audioRef.current;
    if (audio && Number.isFinite(segundos)) audio.currentTime = segundos;
  }, []);

  const skip = useCallback((delta) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration)) return;
    audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + delta));
  }, []);

  const setVolume = useCallback((valor) => {
    setVolumeState(valor);
    if (audioRef.current) audioRef.current.volume = valor;
  }, []);

  // Controles en la pantalla de bloqueo / notificación del celular.
  useEffect(() => {
    if (!("mediaSession" in navigator)) return undefined;
    const ms = navigator.mediaSession;
    try {
      ms.metadata = new window.MediaMetadata({
        title: titulo,
        artist: artista,
        artwork: [{ src: "/julia.jpg", sizes: "1400x790", type: "image/jpeg" }],
      });
      ms.setActionHandler("play", play);
      ms.setActionHandler("pause", pause);
      ms.setActionHandler("seekbackward", () => skip(-10));
      ms.setActionHandler("seekforward", () => skip(10));
    } catch {
      /* algunos navegadores no soportan todas las acciones */
    }
    return () => {
      try {
        ["play", "pause", "seekbackward", "seekforward"].forEach((a) =>
          ms.setActionHandler(a, null),
        );
      } catch {
        /* nada */
      }
    };
  }, [titulo, artista, play, pause, skip]);

  return { audioRef, playing, error, volume, volumeSupported, play, pause, toggle, seek, skip, setVolume };
}

/** Progreso de la canción. Vive aparte para que solo el reproductor se re-renderice. */
export function useAudioProgress(audioRef, activo) {
  const [estado, setEstado] = useState({ actual: 0, duracion: 0 });

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const leer = () =>
      setEstado({
        actual: audio.currentTime || 0,
        duracion: Number.isFinite(audio.duration) ? audio.duration : 0,
      });

    leer();
    const eventos = ["timeupdate", "loadedmetadata", "durationchange", "seeked"];
    eventos.forEach((e) => audio.addEventListener(e, leer));
    return () => eventos.forEach((e) => audio.removeEventListener(e, leer));
  }, [audioRef, activo]);

  return estado;
}

export function formatoTiempo(segundos) {
  if (!Number.isFinite(segundos) || segundos < 0) return "0:00";
  const m = Math.floor(segundos / 60);
  const s = Math.floor(segundos % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

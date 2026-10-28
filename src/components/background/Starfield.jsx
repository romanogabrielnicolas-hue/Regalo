import { useEffect, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

/**
 * Campo de estrellas + corazones luminosos + estrellas fugaces en un solo <canvas>.
 * Inspirado en los fondos de partículas de React Bits / Magic UI, pero sin dependencias.
 *
 * Rendimiento: un único canvas, corazones prerenderizados (sprites), DPR limitado,
 * cantidad adaptada al tamaño de pantalla, tope de FPS en celulares y pausa
 * automática cuando la pestaña no está visible.
 *
 * Props:
 *  - warp: true activa el "salto al hiperespacio" (estrellas que salen disparadas).
 */

const COLORES_ESTRELLA = ["#fff4fb", "#d9c2ff", "#ffb3e6"];
const COLORES_CORAZON = ["#ff6ec7", "#ff9bdc", "#c79bff"];

const aleatorio = (a, b) => a + Math.random() * (b - a);

function crearSpriteCorazon(color) {
  const tam = 72;
  const c = document.createElement("canvas");
  c.width = tam;
  c.height = tam;
  const g = c.getContext("2d");
  const s = tam * 0.2;
  const cx = tam / 2;
  const cy = tam / 2 + s * 0.15;

  g.beginPath();
  g.moveTo(cx, cy + s * 1.35);
  g.bezierCurveTo(cx - s * 2.9, cy - s * 0.3, cx - s * 1.4, cy - s * 2.3, cx, cy - s * 0.7);
  g.bezierCurveTo(cx + s * 1.4, cy - s * 2.3, cx + s * 2.9, cy - s * 0.3, cx, cy + s * 1.35);
  g.closePath();

  g.shadowColor = color;
  g.shadowBlur = 16;
  g.fillStyle = color;
  g.fill();
  g.shadowBlur = 6;
  g.fillStyle = "#ffffff55";
  g.fill();
  return c;
}

export default function Starfield({ warp = false }) {
  const canvasRef = useRef(null);
  const warpRef = useRef(warp);
  const reducido = useReducedMotion();

  useEffect(() => {
    warpRef.current = warp;
  }, [warp]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const sprites = COLORES_CORAZON.map(crearSpriteCorazon);

    let w = 0;
    let h = 0;
    let dpr = 1;
    let estrellas = [];
    let corazones = [];
    let meteoro = null;
    let proximoMeteoro = 2.5;
    let warpAmt = 0;
    let hubWarp = false;
    let scrollY = window.scrollY;
    let raf = 0;
    let ultimo = 0;
    let t = 0;

    const nuevaEstrella = () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: aleatorio(0.25, 1),
      tw: Math.random() * 6.28,
      c: COLORES_ESTRELLA[(Math.random() * 3) | 0],
    });

    const nuevoCorazon = (abajo = false) => ({
      x: Math.random() * w,
      y: abajo ? h + 40 : Math.random() * h,
      tam: aleatorio(11, 26),
      vel: aleatorio(12, 34),
      amp: aleatorio(8, 22),
      fase: Math.random() * 6.28,
      sprite: sprites[(Math.random() * sprites.length) | 0],
      alfa: aleatorio(0.35, 0.8),
    });

    function preparar() {
      const chico = window.innerWidth < 640;
      dpr = Math.min(window.devicePixelRatio || 1, chico ? 1.5 : 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cantEstrellas = Math.max(55, Math.min(170, Math.round((w * h) / 9500)));
      const cantCorazones = chico ? 8 : 15;
      estrellas = Array.from({ length: cantEstrellas }, nuevaEstrella);
      corazones = Array.from({ length: cantCorazones }, () => nuevoCorazon());
    }

    function dibujarEstrella(e, y, alfa) {
      const r = e.z * 1.35;
      ctx.globalAlpha = alfa;
      ctx.fillStyle = e.c;
      if (r < 0.75) {
        ctx.fillRect(e.x, y, 1.2, 1.2);
        return;
      }
      ctx.beginPath();
      ctx.arc(e.x, y, r, 0, 6.283);
      ctx.fill();
      if (e.z > 0.88) {
        // destello en cruz para las estrellas más cercanas
        ctx.globalAlpha = alfa * 0.55;
        ctx.fillRect(e.x - r * 3.2, y - 0.4, r * 6.4, 0.8);
        ctx.fillRect(e.x - 0.4, y - r * 3.2, 0.8, r * 6.4);
      }
    }

    function dibujarEstatico() {
      ctx.clearRect(0, 0, w, h);
      estrellas.forEach((e) => dibujarEstrella(e, e.y, 0.35 + e.z * 0.55));
      corazones.slice(0, 6).forEach((c) => {
        ctx.globalAlpha = c.alfa * 0.7;
        ctx.drawImage(c.sprite, c.x - c.tam, c.y - c.tam, c.tam * 2, c.tam * 2);
      });
      ctx.globalAlpha = 1;
    }

    function cuadro(ahora) {
      raf = requestAnimationFrame(cuadro);
      const chico = w < 640;
      const minDt = chico ? 1000 / 45 : 1000 / 62;
      if (ahora - ultimo < minDt) return;
      const dt = Math.min((ahora - ultimo) / 1000, 0.05);
      ultimo = ahora;
      t += dt;

      // transición suave del salto al hiperespacio
      const objetivo = warpRef.current ? 1 : 0;
      warpAmt += (objetivo - warpAmt) * Math.min(1, dt * (objetivo ? 3.2 : 2.2));
      if (warpAmt > 0.04) hubWarp = true;
      if (hubWarp && warpAmt < 0.02 && !warpRef.current) {
        estrellas = estrellas.map(nuevaEstrella);
        hubWarp = false;
      }

      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;

      // ── estrellas ──
      for (const e of estrellas) {
        if (warpAmt > 0.04) {
          const dx = e.x - cx || 0.001;
          const dy = e.y - cy || 0.001;
          const largo = Math.hypot(dx, dy) || 1;
          const v = (40 + 1500 * warpAmt) * e.z * dt;
          const nx = e.x + (dx / largo) * v;
          const ny = e.y + (dy / largo) * v;
          ctx.globalAlpha = 0.5 + e.z * 0.5;
          ctx.strokeStyle = e.c;
          ctx.lineWidth = Math.max(0.8, e.z * 1.6);
          ctx.beginPath();
          ctx.moveTo(e.x - (dx / largo) * v * (2 + 5 * warpAmt), e.y - (dy / largo) * v * (2 + 5 * warpAmt));
          ctx.lineTo(nx, ny);
          ctx.stroke();
          e.x = nx;
          e.y = ny;
          if (e.x < -20 || e.x > w + 20 || e.y < -20 || e.y > h + 20) {
            const ang = Math.random() * 6.283;
            const rad = aleatorio(4, 50);
            e.x = cx + Math.cos(ang) * rad;
            e.y = cy + Math.sin(ang) * rad;
          }
        } else {
          e.x -= 2.4 * e.z * dt;
          if (e.x < -4) e.x = w + 4;
          const desplazamiento = -(scrollY * e.z * 0.1);
          const y = (((e.y + desplazamiento) % h) + h) % h;
          const brillo = 0.5 + 0.5 * Math.sin(t * (0.7 + e.z) + e.tw);
          dibujarEstrella(e, y, 0.2 + brillo * 0.6 * (0.5 + e.z * 0.5));
        }
      }

      // ── corazones luminosos ──
      const atenuar = 1 - Math.min(1, warpAmt * 1.5);
      if (atenuar > 0.01) {
        for (const c of corazones) {
          c.y -= c.vel * dt;
          const x = c.x + Math.sin(t * 0.6 + c.fase) * c.amp;
          if (c.y < -c.tam * 2) Object.assign(c, nuevoCorazon(true));
          const pulso = 1 + Math.sin(t * 2 + c.fase) * 0.08;
          const lado = c.tam * 2 * pulso;
          ctx.globalAlpha = c.alfa * atenuar;
          ctx.drawImage(c.sprite, x - lado / 2, c.y - lado / 2, lado, lado);
        }
      }

      // ── estrella fugaz ocasional ──
      if (warpAmt < 0.1) {
        proximoMeteoro -= dt;
        if (!meteoro && proximoMeteoro <= 0) {
          meteoro = {
            x: aleatorio(w * 0.35, w * 1.05),
            y: aleatorio(-20, h * 0.35),
            vida: 0,
            dur: aleatorio(0.7, 1.1),
          };
          proximoMeteoro = aleatorio(4, 9);
        }
        if (meteoro) {
          meteoro.vida += dt;
          const p = meteoro.vida / meteoro.dur;
          const dist = 520 * dt;
          meteoro.x -= dist;
          meteoro.y += dist * 0.55;
          const g = ctx.createLinearGradient(meteoro.x, meteoro.y, meteoro.x + 110, meteoro.y - 60);
          g.addColorStop(0, "#ffffff");
          g.addColorStop(1, "#ff8ee000");
          ctx.globalAlpha = Math.sin(Math.min(p, 1) * Math.PI);
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(meteoro.x, meteoro.y);
          ctx.lineTo(meteoro.x + 110, meteoro.y - 60);
          ctx.stroke();
          if (p >= 1) meteoro = null;
        }
      }
      ctx.globalAlpha = 1;
    }

    function iniciar() {
      cancelAnimationFrame(raf);
      ultimo = performance.now();
      raf = requestAnimationFrame(cuadro);
    }

    preparar();
    if (reducido) dibujarEstatico();
    else iniciar();

    // Solo se recalcula si cambia el ancho o la altura cambia mucho (rotación).
    // Así la barra de direcciones de Safari/Chrome móvil no reinicia el fondo.
    let anchoPrevio = w;
    let altoPrevio = h;
    const ro = new ResizeObserver(() => {
      const nw = canvas.clientWidth;
      const nh = canvas.clientHeight;
      if (nw === anchoPrevio && Math.abs(nh - altoPrevio) < 160) return;
      anchoPrevio = nw;
      altoPrevio = nh;
      preparar();
      if (reducido) dibujarEstatico();
    });
    ro.observe(canvas);

    const alScroll = () => {
      scrollY = window.scrollY;
    };
    const alCambiarVisibilidad = () => {
      if (reducido) return;
      if (document.hidden) cancelAnimationFrame(raf);
      else iniciar();
    };
    window.addEventListener("scroll", alScroll, { passive: true });
    document.addEventListener("visibilitychange", alCambiarVisibilidad);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", alScroll);
      document.removeEventListener("visibilitychange", alCambiarVisibilidad);
    };
  }, [reducido]);

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />;
}

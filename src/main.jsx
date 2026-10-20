import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Heart, Sparkles, Stars, Mail } from "lucide-react";
import "./style.css";

function FloatingDecorations() {
  return (
    <div className="floating-decorations" aria-hidden="true">
      {Array.from({ length: 18 }, (_, i) => (
        <span
          className={`float-item float-item-${(i % 6) + 1}`}
          key={i}
          style={{
            left: `${(i * 37 + 7) % 96}%`,
            animationDelay: `${(i % 8) * -0.8}s`,
            animationDuration: `${7 + (i % 5)}s`,
          }}
        >
          {i % 3 === 0 ? "♡" : i % 3 === 1 ? "✦" : "♥"}
        </span>
      ))}
    </div>
  );
}

function App() {
  const [surpriseVisible, setSurpriseVisible] = useState(false);
  const [hearts, setHearts] = useState(0);
  const sendLove = () => {
    setSurpriseVisible((v) => !v);
    setHearts((n) => n + 1);
  };

  return (
    <main className="page">
      <FloatingDecorations />
      <section className="love-card">
        <div className="top-note">
          <Sparkles size={15} />
          <span>UN MENSAJITO PARA VOS</span>
          <Sparkles size={15} />
        </div>
        <div className="heart-stage" aria-label="Un corazón rosa animado">
          <span className="orbit orbit-one" />
          <span className="orbit orbit-two" />
          <span className="heart-glow" />
          <Heart className="big-heart" strokeWidth={0} fill="currentColor" />
          <Heart
            className="little-heart little-heart-left"
            fill="currentColor"
          />
          <Heart
            className="little-heart little-heart-right"
            fill="currentColor"
          />
          <Stars className="heart-star star-left" />
          <Sparkles className="heart-star star-right" />
        </div>
        <p className="eyebrow">Juli, nunca te olvides de esto...</p>
        <h1>
          ¡Sos la más
          <br />
          <span>hermosa</span> del mundo!
        </h1>
        <div className="heart-divider" aria-hidden="true">
          <span />
          <Heart size={16} fill="currentColor" />
          <span />
        </div>
        <p className="message">
          Tenés una luz especial que hace más lindo todo lo que te rodea. Ojalá
          hoy sonrías tanto como hacés sonreír a los demás.
        </p>
        <button className="love-button" onClick={sendLove}>
          <Mail size={19} />
          {surpriseVisible
            ? "Volver a leer la sorpresa"
            : "Tocá acá para una sorpresa"}
          <span className="button-shine" aria-hidden="true" />
        </button>
        <div
          className={`surprise-message ${surpriseVisible ? "is-visible" : ""}`}
          aria-live="polite"
        >
          <span className="surprise-emoji">💌</span>
          <p>
            No hay estrellas suficientes para competir con tu brillo, Juli.{" "}
            <strong>Sos única. ❤️</strong>
          </p>
        </div>
        <div className="signature">
          Hecho con cariño <Heart size={13} fill="currentColor" />
        </div>
      </section>
      <p className="footer-note">
        Un detalle chiquito para alguien increíble ✨
      </p>
      {hearts > 0 && (
        <div className="love-counter" aria-live="polite">
          <Heart size={14} fill="currentColor" />{" "}
          {hearts === 1
            ? "Un poquito más de amor"
            : `${hearts} dosis de cariño`}
        </div>
      )}
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

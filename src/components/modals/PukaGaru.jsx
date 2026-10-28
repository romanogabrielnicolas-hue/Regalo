import { SORPRESA } from "../../data/content";

/**
 * Escena animada de Garu y Pucca. La animación usa la hoja de 8 cuadros
 * (/pucca-garu-animacion.webp) y se mueve cuadro por cuadro con CSS.
 */
export default function PukaGaru() {
  const { puka } = SORPRESA;
  return (
    <div className="puka-escena">
      <div className="puka-aura" aria-hidden="true" />

      <div className="puka-corazones" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} style={{ "--i": i, "--delay": `${(i % 6) * 0.45}s` }}>
            {i % 3 === 0 ? "💗" : i % 3 === 1 ? "♡" : "✨"}
          </span>
        ))}
      </div>

      <div className="puka-sprite" role="img" aria-label={puka.descripcion} />
      <div className="puka-brillo" aria-hidden="true">
        ✦
      </div>

      <p className="puka-titulo">
        {puka.titulo} <span>♡</span>
      </p>
      <p className="puka-subtitulo">{puka.subtitulo}</p>
    </div>
  );
}

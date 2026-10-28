/**
 * Aurora / nebulosa de fondo (estilo "Aurora" de React Bits).
 * Solo usa gradientes y transform: casi no consume batería ni GPU.
 */
export default function Aurora() {
  return (
    <div className="aurora" aria-hidden="true">
      <span className="aurora-mancha aurora-rosa" />
      <span className="aurora-mancha aurora-violeta" />
      <span className="aurora-mancha aurora-magenta" />
      <span className="aurora-vineta" />
    </div>
  );
}

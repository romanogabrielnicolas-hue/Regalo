import { useInView } from "../../hooks/useInView";

/**
 * Texto que aparece palabra por palabra con desenfoque (estilo "Text Generate Effect"
 * de Aceternity UI). Con `inmediato` anima al montarse; si no, al entrar en pantalla.
 */
export default function TextoPalabras({
  texto,
  as: Etiqueta = "span",
  className = "",
  inmediato = false,
  retraso = 0,
  paso = 70,
}) {
  const [ref, visible] = useInView();
  const activo = inmediato || visible;
  const palabras = texto.split(" ");

  return (
    <Etiqueta ref={ref} className={`palabras${activo ? " es-visible" : ""} ${className}`.trim()} aria-label={texto}>
      {palabras.map((palabra, i) => (
        <span key={`${palabra}-${i}`} aria-hidden="true">
          <span className="palabra" style={{ "--d": `${retraso + i * paso}ms` }}>
            {palabra}
          </span>
          {i < palabras.length - 1 ? " " : ""}
        </span>
      ))}
    </Etiqueta>
  );
}

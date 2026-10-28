import { useInView } from "../../hooks/useInView";

/** Hace aparecer su contenido (fade + subida + desenfoque) cuando entra en pantalla. */
export default function Reveal({ as: Etiqueta = "div", delay = 0, className = "", children, ...resto }) {
  const [ref, visible] = useInView();
  return (
    <Etiqueta
      ref={ref}
      className={`reveal${visible ? " es-visible" : ""} ${className}`.trim()}
      style={{ "--d": `${delay}ms` }}
      {...resto}
    >
      {children}
    </Etiqueta>
  );
}

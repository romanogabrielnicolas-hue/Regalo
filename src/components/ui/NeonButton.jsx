/**
 * Botón con brillo "shimmer" y borde luminoso (estilo Magic UI Shimmer Button / Uiverse).
 * variante: "primario" | "secundario" | "icono"
 * Todos miden al menos 44px de alto para que sean fáciles de tocar en el celular.
 */
export default function NeonButton({
  variante = "primario",
  icono = null,
  className = "",
  children,
  type = "button",
  ...resto
}) {
  return (
    <button type={type} className={`btn btn-${variante} ${className}`.trim()} {...resto}>
      <span className="btn-contenido">
        {children}
        {icono}
      </span>
    </button>
  );
}

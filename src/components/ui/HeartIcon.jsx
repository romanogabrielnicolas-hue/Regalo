import { useId } from "react";

/** Corazón SVG con degradado rosa→violeta. Sirve para el logo, el sello y los adornos. */
export default function HeartIcon({ className = "", size = 24, ...resto }) {
  const id = useId();
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 60"
      role="img"
      aria-hidden="true"
      {...resto}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffb0e4" />
          <stop offset="0.55" stopColor="#ff5fc4" />
          <stop offset="1" stopColor="#a96bff" />
        </linearGradient>
      </defs>
      <path
        d="M32 57S4 39 4 19C4 9 11 3 19 3c6 0 10.5 3.2 13 8C34.5 6.2 39 3 45 3c8 0 15 6 15 16 0 20-28 38-28 38z"
        fill={`url(#${id})`}
      />
    </svg>
  );
}

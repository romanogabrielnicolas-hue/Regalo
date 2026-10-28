import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuración mínima: funciona igual en local (npm run dev) y en Vercel.
export default defineConfig({
  plugins: [react()],
  server: { host: true }, // permite abrirla desde el celular en la misma red Wi-Fi
  build: { target: "es2020", chunkSizeWarningLimit: 700 },
});

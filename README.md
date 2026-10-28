# Nuestro Universo — Para Juli ♡

Experiencia romántica hecha con **React + Vite**: intro cinematográfica con salto al hiperespacio, corazón holográfico, galería de recuerdos, constelación interactiva, reproductor con disco de vinilo, carta, regalo interactivo y la escena de Puka y Garu.

## Ejecutarla en Windows
```powershell
npm install
npm run dev
```
Abrí la dirección que muestre Vite (normalmente http://localhost:5173). Para verla en el celular, conectalo al mismo Wi-Fi y abrí la dirección "Network" que aparece en la terminal.

## Compilar y publicar en Vercel
```powershell
npm run build     # genera la carpeta dist
npm run preview   # prueba la versión compilada
```
En Vercel: importá el repositorio (o subí la carpeta). Detecta Vite solo; `vercel.json` ya trae la configuración.

## Dónde cambiar cosas
| Qué | Dónde |
|---|---|
| Todos los textos, la carta, el mensaje, la firma, la canción | `src/data/content.js` |
| Fotos de la galería | `src/data/content.js` (sección `GALERIA`) + archivos en `public/` |
| Que la música arranque al entrar | `MUSICA_AL_ENTRAR` en `src/data/content.js` |
| Colores | `src/styles/tokens.css` |

## Estructura
```
src/
  App.jsx                  # flujo: intro → salto → universo
  data/content.js          # textos y ajustes
  hooks/                   # audio, escritura en vivo, scroll lock, etc.
  components/
    background/            # Starfield (canvas), Aurora
    ui/                    # botones, tarjetas, modal, revelado
    sections/              # Intro, Hero, Gallery, Constellation, MusicPlayer…
    modals/                # Carta y Sorpresa (regalo + Puka y Garu)
  styles/                  # CSS separado por sección
public/                    # fotos, música, hoja de animación
assets-originales/         # imágenes originales sin comprimir (no se publican)
```

## Notas
- Las fuentes vienen de Google Fonts; sin conexión se usan fuentes alternativas.
- En iPhone el volumen se controla con los botones del teléfono (Safari no permite cambiarlo por código), por eso ahí se oculta el deslizador.
- Los efectos están inspirados en React Bits, Magic UI, Aceternity UI y Uiverse, pero escritos a mano en CSS/React: no hay dependencias extra.

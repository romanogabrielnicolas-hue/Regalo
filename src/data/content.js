// ─────────────────────────────────────────────────────────────
//  Todos los textos, fotos y ajustes personales viven acá.
//  Para cambiar una frase, una foto o la canción, editá solo este archivo.
// ─────────────────────────────────────────────────────────────

export const CANCION = {
  titulo: "Hecha Pa Mi",
  artista: "Grupo Frontera",
  archivo: "/musica.mp3",
};

// true: la música arranca al tocar "Entrar a nuestro universo".
// false: la música solo suena cuando ella toca play.
export const MUSICA_AL_ENTRAR = true;

export const INTRO = {
  eyebrow: "UN UNIVERSO CREADO PARA VOS",
  tituloLinea1: "Para vos,",
  tituloNombre: "Juli ♡",
  texto:
    "Entre tantas estrellas, quería crear un lugarcito que tuviera tu nombre. Esta pequeña sorpresa es solamente para vos.",
  boton: "Entrar a nuestro universo",
  nota: "UNA PEQUEÑA SORPRESA HECHA CON CARIÑO",
};

export const HERO = {
  eyebrow: "HECHO ESPECIALMENTE PARA VOS",
  titulo: "El universo es inmenso,",
  tituloResaltado: "pero vos sos mi parte favorita.",
  descripcion:
    "Hay personas que hacen que los días sean más lindos sin siquiera intentarlo. Este pequeño mundo digital lleva tu nombre porque quería regalarte algo diferente. 💗",
  botonCarta: "Abrir mi cartita",
  botonSorpresa: "Una sorpresa para vos",
  miniDedicatoria: "Un detalle pequeño, con un cariño enorme.",
  etiquetaHolo: "CORAZÓN CONECTADO",
  frecuencia: "FRECUENCIA: CARIÑO INFINITO",
};

// Galería de recuerdos: agregá o quitá objetos para cambiar las fotos.
// Los archivos van en la carpeta /public. "posicion" ajusta el recorte (CSS object-position).
export const GALERIA = {
  eyebrow: "RECUERDOS QUE BRILLAN",
  titulo: "Pequeños tesoros de nuestro universo",
  texto: "Deslizá para ver cada uno. Tocá una foto para verla grande. ✨",
  fotos: [
    {
      src: "pucca-garu.gif",
      alt: "Una flor tejida de Pucca sobre una galaxia rosa",
      titulo: "Un beso, directo al corazón",
      detalle:
        "Sin vueltas ni distancias: de mi corazón al tuyo, con un besito de Garu para su Puka.",
      posicion: "50% 50%",
    },
    {
      src: "/pacco-cartoon.gif",
      alt: "Puka y Garu abrazados bajo un corazón de luz",
      titulo: "Asi De Loco Enamorado Estoy Por Vos",
      detalle:
        "No sé qué hiciste conmigo, Juliana, pero desde que llegaste a mi vida tengo el corazón llenito de amor por vos. Y si pudiera elegir de nuevo, volvería a enamorarme de vos una y mil veces",
      posicion: "50% 50%",
    },
    {
      src: "/pucca.gif",
      alt: "Puka y Garu abrazados bajo un corazón de luz",
      titulo: "Siempre con vos",
      detalle:
        "Si pudiera, te regalaría todas las flores del mundo, Mi Negra, porque ninguna sería tan hermosa como vos. Y si con un pequeño detalle puedo sacarte una sonrisa, entonces ya soy el más feliz del universo. ",
      posicion: "50% 50%",
    },
  ],
};

export const CONSTELACION = {
  eyebrow: "UN MAPA HECHO PARA VOS",
  tituloInicio: "Hay estrellas que tienen",
  tituloResaltado: "tu nombre.",
  texto:
    "Tocá cinco estrellas para descubrir lo que el universo tiene preparado para vos. ✨",
  completa: "Encontraste tu lugar entre mis estrellas, Juli. 💗",
  pista: "Cada estrella guarda un poquito de magia.",
  boton: "Volver a descubrirla",
  estrellasNecesarias: 5,
};

export const REPRODUCTOR = {
  eyebrow: "LA CANCIÓN QUE ME RECUERDA A VOS",
  etiquetaPortada: "EDICIÓN ESPECIAL",
  portadaSub: "UNA CANCIÓN, UN RECUERDO",
  portadaTitulo: "Para Juli ♡",
  portadaFirma: "Con cariño, Gabi",
  error:
    "No se pudo cargar la canción. Revisá que exista public/musica.mp3 y que sea un audio válido.",
};

export const DEDICATORIA = {
  eyebrow: "UN MENSAJITO PARA VOS",
  titulo: "Hay personas que son pura magia.",
  texto:
    "Y después estás vos, Juli. Ojalá nunca te falten motivos para sonreír, sueños que te emocionen y personas que te recuerden lo valiosa que sos. ✨",
};

export const FOOTER = "mucho cariño para Juli.";

export const CARTA = {
  eyebrow: "UNA CARTA PARA VOS",
  titulo: "Para vos, Juli",
  parrafos: [
    "Quería regalarte algo distinto, algo que no fuera solamente una imagen o unas palabras. Por eso hice este pequeño universo para vos, con la ilusión de sacarte una sonrisa.",
    "Ojalá pudieras verte un ratito a través de los ojos de las personas que te aprecian. Quizás así entenderías lo especial que sos y toda la luz que podés transmitir con algo tan simple como una sonrisa.",
    "Y si alguna vez tenés un día difícil, quiero que recuerdes que merecés cosas lindas, momentos que te hagan feliz y personas que valoren esa forma tan tuya de brillar. Me alegra poder regalarte este pequeño universo, aunque sea a través de una pantalla. Ojalá cada vez que lo veas te saque una sonrisa. 💗",
  ],
  despedida: "Con todo mi cariño,",
  firma: "Gabi ♡",
  boton: "Descubrir la sorpresa",
};

export const SORPRESA = {
  eyebrow: "SORPRESA DESBLOQUEADA",
  titulo: "¡Nunca dejes de brillar, Juli!",
  cajaTitulo: "Tengo algo para vos",
  cajaPista: "Tocá el regalo para abrirlo",
  fotoSrc: "/juli.jpg",
  fotoAlt: "Una foto especial de Juli",
  puka: {
    titulo: "Mi Puka y mi Garu",
    subtitulo: "Mi aventura favorita siempre va a ser con vos ✨",
    descripcion:
      "Garu aparece, Pucca llega corriendo, lo abraza y le da un beso mientras flotan corazones",
  },
  mensaje:
    "Yo quiero ser tu Garu, y que vos seas mi Puka: elegirte incluso en los días difíciles, cuidarte a mi manera y hacerte sonreír una y otra mil veces. Porque mi aventura favorita siempre va a ser con vos.",
  despedida: "Con todo mi cariño,",
  firma: "GABI, TE QUIERO NEGRA",
  cierre: "Hecho especialmente para vos, Juli ✨",
};

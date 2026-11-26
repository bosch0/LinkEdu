// Colores, medidas y tipografía de LinkEdu para el vídeo
// (estilo "Estudio de producto" + "Cristal": fondo oscuro, objetos brillantes y paneles de vidrio).
import { loadFont } from "@remotion/google-fonts/Sora";

export const C = {
  marino: "#073157", // color principal de la marca
  marinoOscuro: "#041f38",
  fondo: "#020c18", // casi negro azulado
  turquesa: "#21bcaa",
  turquesaClaro: "#8ff0e3",
  naranja: "#ff9a3d",
  amarillo: "#ffd23f",
  rosa: "#ff5c8a",
  azul: "#4b94ff",
  blanco: "#ffffff",
  texto: "#cfe3f2", // texto secundario sobre fondo oscuro
};

// Tipografía del vídeo: Sora
export const { fontFamily: FUENTE } = loadFont("normal", {
  weights: ["400", "600", "700", "800"],
  subsets: ["latin", "latin-ext"],
});

// Tamaño del vídeo
export const ANCHO = 1920;
export const ALTO = 1080;

// Tamaño de la pantalla de la app dentro del panel de cristal (px)
export const APP_W = 1440;
export const APP_H = 810;
export const MARCO = 16; // grosor del marco de cristal

// Pantalla del teléfono (escena del móvil): la grabación es de 390 × 844 px, con la misma proporción
export const MOVIL_W = 370;
export const MOVIL_H = 801;

// Distancia de la cámara (perspectiva) en px
export const PERSPECTIVA = 2000;

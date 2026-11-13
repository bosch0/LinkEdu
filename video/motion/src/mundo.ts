// El "mundo" 3D del vídeo: dónde está cada pantalla y cómo se mueve la cámara.
// Todas las pantallas están en un mismo espacio y la cámara vuela de una a otra,
// así las transiciones se entienden: no hay cortes, se viaja.
import { Easing } from "remotion";
import { T } from "./tiempos";

// Posición de cada pantalla en el mundo (px) y giro en grados (ry).
// k0 = zoom al llegar, k1 = zoom mientras ocurre la acción,
// fx/fy = punto de la pantalla al que se acerca la cámara (desde su centro).
export type Estacion = {
  x: number;
  y: number;
  z: number;
  ry: number;
  k0: number;
  k1: number;
  fx: number;
  fy: number;
};

export const EST: Record<string, Estacion> = {
  intro: { x: 0, y: 0, z: 0, ry: 0, k0: 0.66, k1: 0.74, fx: 0, fy: 0 },
  inicio: { x: 3300, y: 0, z: -250, ry: -14, k0: 1.0, k1: 1.5, fx: 40, fy: -60 },
  red: { x: 6000, y: -120, z: -600, ry: 14, k0: 1.0, k1: 1.3, fx: 100, fy: 0 },
  proyectos: { x: 8700, y: 100, z: -250, ry: -14, k0: 1.0, k1: 1.15, fx: 0, fy: 0 },
  recursos: { x: 11400, y: -100, z: -600, ry: 14, k0: 1.0, k1: 1.35, fx: 0, fy: 10 },
  empleo: { x: 14100, y: 80, z: -250, ry: -14, k0: 1.0, k1: 1.25, fx: 0, fy: 30 },
  movil: { x: 16800, y: 0, z: -400, ry: 0, k0: 0.85, k1: 1.0, fx: 0, fy: 0 },
  cierre: { x: 19500, y: 0, z: -500, ry: 0, k0: 0.95, k1: 1.2, fx: 0, fy: 0 },
};

// Subimos un poco la cámara para que la pantalla quede arriba y quepa el título debajo
const SUBIDA = 45;

type Cam = { x: number; y: number; z: number; yaw: number; k: number };
type Clave = { f: number; cam: Cam; ease: (t: number) => number };

const volar = Easing.bezier(0.65, 0, 0.35, 1); // vuelo: arranca y frena suave
const suave = Easing.inOut(Easing.quad);
const lineal = (t: number) => t;

function estado(e: Estacion, k: number, giro: number, mezcla: number): Cam {
  return {
    x: e.x + e.fx * mezcla,
    y: e.y + e.fy * mezcla + SUBIDA / k,
    z: e.z,
    yaw: e.ry + giro,
    k,
  };
}

// Claves de la cámara: llegada, acercamiento a la acción y salida de cada pantalla
function construir(): Clave[] {
  const claves: Clave[] = [];
  // Introducción: tres pantallas a la vez, con un acercamiento lento
  claves.push({ f: 0, cam: { x: 0, y: 0, z: 0, yaw: 0, k: EST.intro.k0 }, ease: lineal });
  claves.push({
    f: T.intro.fin,
    cam: { x: 0, y: 0, z: 0, yaw: -3, k: EST.intro.k1 },
    ease: suave,
  });
  for (const id of ["inicio", "red", "proyectos", "recursos", "empleo", "movil"] as const) {
    const e = EST[id];
    const t = T[id];
    claves.push({ f: t.d, cam: estado(e, e.k0, 10, 0), ease: volar });
    claves.push({ f: t.d + Math.round(t.n * 0.3), cam: estado(e, e.k1, 3, 1), ease: suave });
    claves.push({ f: t.fin, cam: estado(e, e.k1 * 1.05, -3, 1.1), ease: suave });
  }
  const c = EST.cierre;
  claves.push({ f: T.cierre.d, cam: estado(c, c.k0, 0, 0), ease: volar });
  claves.push({ f: T.cierre.fin, cam: estado(c, c.k1, 0, 0), ease: suave });
  return claves;
}

const CLAVES = construir();

// Dónde está la cámara en un fotograma
export function camaraEn(f: number): Cam {
  if (f <= CLAVES[0].f) return CLAVES[0].cam;
  for (let i = 0; i < CLAVES.length - 1; i++) {
    const a = CLAVES[i];
    const b = CLAVES[i + 1];
    if (f <= b.f) {
      const t = b.ease((f - a.f) / (b.f - a.f));
      const mez = (p: number, q: number) => p + (q - p) * t;
      return {
        x: mez(a.cam.x, b.cam.x),
        y: mez(a.cam.y, b.cam.y),
        z: mez(a.cam.z, b.cam.z),
        yaw: mez(a.cam.yaw, b.cam.yaw),
        k: mez(a.cam.k, b.cam.k),
      };
    }
  }
  return CLAVES[CLAVES.length - 1].cam;
}

// ------------------------------------------------------------- objetos 3D sueltos
export type Objeto = {
  tipo: "cubo" | "esfera" | "anillo";
  color: "turquesa" | "naranja" | "amarillo" | "rosa" | "azul";
  icono: number; // qué icono lleva el cubo
  x: number;
  y: number;
  z: number;
  tam: number;
  semilla: number;
  delante: boolean; // true = va delante de las pantallas; false = detrás
};

// Número "al azar" pero siempre el mismo para el mismo valor (el vídeo sale igual cada vez)
const azar = (n: number) => {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
};

const COLORES: Objeto["color"][] = ["turquesa", "naranja", "amarillo", "rosa", "azul"];
const TIPOS: Objeto["tipo"][] = ["cubo", "esfera", "anillo", "cubo", "esfera", "cubo", "anillo", "cubo"];

// Objetos alrededor de cada pantalla: unos detrás (grandes) y otros delante (pasan volando)
function crearObjetos(): Objeto[] {
  const lista: Objeto[] = [];
  const ids = ["inicio", "red", "proyectos", "recursos", "empleo", "movil", "cierre"];
  ids.forEach((id, i) => {
    const e = EST[id];
    for (let j = 0; j < 8; j++) {
      const s = i * 20 + j;
      const detras = j < 5;
      const lado = j % 2 === 0 ? -1 : 1;
      lista.push({
        tipo: TIPOS[j],
        color: COLORES[(i + j) % 5],
        icono: (i + j) % 6,
        x: e.x + lado * (detras ? 950 + azar(s) * 500 : 1100 + azar(s) * 800),
        y: e.y + (azar(s + 5) - 0.5) * (detras ? 1000 : 1400),
        z: e.z + (detras ? -(500 + azar(s + 9) * 900) : 250 + azar(s + 3) * 450),
        tam: detras ? 200 + azar(s + 2) * 180 : 80 + azar(s + 4) * 80,
        semilla: s,
        delante: !detras,
      });
    }
    // Objetos que están entre esta pantalla y la siguiente (se ven durante el vuelo)
    const sig = EST[ids[i + 1]];
    if (sig) {
      for (let j = 0; j < 3; j++) {
        const s = i * 20 + 10 + j;
        lista.push({
          tipo: TIPOS[(j + i) % TIPOS.length],
          color: COLORES[(i + j + 2) % 5],
          icono: (i + j + 3) % 6,
          x: e.x + (sig.x - e.x) * (0.25 + 0.25 * j),
          y: (azar(s) - 0.5) * 700,
          z: Math.max(e.z, sig.z) + 150 + azar(s + 1) * 500,
          tam: 90 + azar(s + 2) * 120,
          semilla: s,
          delante: true,
        });
      }
    }
  });
  return lista;
}

// Objetos grandes que rodean las tres pantallas de la introducción
const OBJETOS_INTRO: Objeto[] = [
  { tipo: "cubo", color: "turquesa", icono: 0, x: -1250, y: -420, z: 300, tam: 190, semilla: 1, delante: true },
  { tipo: "esfera", color: "amarillo", icono: 0, x: 1250, y: -400, z: 250, tam: 230, semilla: 2, delante: true },
  { tipo: "anillo", color: "naranja", icono: 0, x: -1250, y: 430, z: 200, tam: 300, semilla: 3, delante: true },
  { tipo: "cubo", color: "rosa", icono: 1, x: 1330, y: 340, z: 300, tam: 170, semilla: 4, delante: true },
  { tipo: "esfera", color: "azul", icono: 0, x: -520, y: -470, z: 420, tam: 110, semilla: 5, delante: true },
  { tipo: "anillo", color: "turquesa", icono: 0, x: 540, y: -450, z: 320, tam: 170, semilla: 6, delante: true },
  { tipo: "cubo", color: "amarillo", icono: 2, x: -1480, y: 40, z: 380, tam: 110, semilla: 7, delante: true },
];

// Objetos grandes a los lados del logo y el lema del final
const CX = EST.cierre.x;
const CZ = EST.cierre.z;
const OBJETOS_CIERRE: Objeto[] = [
  { tipo: "esfera", color: "amarillo", icono: 0, x: CX - 900, y: -280, z: CZ + 150, tam: 300, semilla: 11, delante: true },
  { tipo: "cubo", color: "naranja", icono: 1, x: CX + 880, y: -300, z: CZ + 100, tam: 230, semilla: 12, delante: true },
  { tipo: "anillo", color: "turquesa", icono: 0, x: CX - 820, y: 300, z: CZ, tam: 380, semilla: 13, delante: true },
  { tipo: "cubo", color: "azul", icono: 3, x: CX + 840, y: 310, z: CZ + 200, tam: 200, semilla: 14, delante: true },
  { tipo: "esfera", color: "rosa", icono: 0, x: CX + 330, y: -430, z: CZ + 300, tam: 170, semilla: 15, delante: true },
  { tipo: "cubo", color: "turquesa", icono: 0, x: CX - 380, y: 440, z: CZ + 350, tam: 150, semilla: 16, delante: true },
];

export const OBJETOS = [...OBJETOS_INTRO, ...crearObjetos(), ...OBJETOS_CIERRE];

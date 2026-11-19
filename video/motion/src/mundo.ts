// El "mundo" 3D del vídeo: dónde está cada pantalla y cómo se mueve la cámara.
// Todas las pantallas están en un mismo espacio y la cámara vuela de una a otra,
// así las transiciones se entienden: no hay cortes, se viaja.
// La cámara no está nunca quieta: vuela muy rápido entre pantallas (girando un poco y alejándose
// a mitad del vuelo), se acerca a cada clic del cursor y se mueve suavemente como si fuera en la mano.
import { Easing } from "remotion";
import { CLICS, T, fotogramaDeClic, type NombreClip } from "./tiempos";

// Posición de cada pantalla en el mundo (px) y giro en grados (ry).
export type Estacion = {
  x: number;
  y: number;
  z: number;
  ry: number;
};

export const EST: Record<string, Estacion> = {
  intro: { x: 0, y: 0, z: 0, ry: 0 },
  red: { x: 2000, y: -120, z: -600, ry: 14 },
  proyectos: { x: 3900, y: 100, z: -250, ry: -14 },
  recursos: { x: 5800, y: -100, z: -600, ry: 14 },
  cierre: { x: 7700, y: 0, z: -500, ry: 0 },
};

// Subimos un poco la cámara para que la pantalla quede arriba y quepa el título debajo
const SUBIDA = 45;

// k = zoom, yaw = giro a los lados, roll = inclinación (solo durante los vuelos)
type Cam = { x: number; y: number; z: number; yaw: number; k: number; roll: number };
// vuelo: si esta clave es la llegada de un vuelo, cuánto se inclina la cámara (amp, con su signo)
// y cuánto se aleja a mitad del vuelo (alejar, de 0 a 1)
type Clave = { f: number; cam: Cam; ease: (t: number) => number; vuelo?: { amp: number; alejar: number } };

const volar = Easing.bezier(0.65, 0, 0.35, 1); // vuelo: arranca y frena
const golpe = Easing.bezier(0.5, 0, 0.15, 1); // acercamiento rápido al clic
const suave = Easing.inOut(Easing.quad);
const lineal = (t: number) => t;

// Punto de la pantalla (px desde su centro) al que corresponde un clic de la grabación (1280 × 720)
const foco = (id: NombreClip, i: number) => ({
  fx: (CLICS[id][i][1] / 1280 - 0.5) * 1440,
  fy: (CLICS[id][i][2] / 720 - 0.5) * 810,
});

const limitar = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

function estado(e: Estacion, k: number, giro: number, fx = 0, fy = 0): Cam {
  // La cámara no puede irse tanto hacia un lado que se vea el fondo vacío en vez de la pantalla.
  // La pantalla mide unos 1472 × 842 px (con el marco) y la imagen del vídeo, 1920 × 1080 px / zoom.
  // Abajo dejamos un margen de 150 px de pantalla, porque ahí va la tarjeta del título.
  if (k <= 1.25) {
    fx = 0;
    fy = 0;
  } else {
    fx = limitar(fx, -(736 - 960 / k), 736 - 960 / k);
    fy = limitar(fy, -421 + 495 / k, 421 - 435 / k);
  }
  return { x: e.x + fx, y: e.y + fy + SUBIDA / k, z: e.z, yaw: e.ry + giro, k, roll: 0 };
}

// Claves de la cámara: llegada, panorámica, un acercamiento a cada clic y salida de cada pantalla
function construir(): Clave[] {
  const claves: Clave[] = [];
  // Introducción: tres pantallas a la vez, con una vuelta lenta alrededor
  claves.push({ f: 0, cam: { x: 0, y: 0, z: 0, yaw: -6, k: 0.62, roll: 0 }, ease: lineal });
  claves.push({ f: T.intro.fin, cam: { x: 0, y: 0, z: 0, yaw: 5, k: 0.8, roll: 0 }, ease: suave });

  (["red", "proyectos", "recursos"] as const).forEach((id, idx) => {
    const e = EST[id];
    const t = T[id];
    const signo = idx % 2 === 0 ? 1 : -1; // los vuelos se inclinan hacia un lado y hacia el otro
    // Llegada tras el vuelo (el primer vuelo es el del logo: más largo y más inclinado)
    claves.push({ f: t.d, cam: estado(e, 1.0, 8 * signo), ease: volar, vuelo: { amp: (idx === 0 ? 9 : 6) * signo, alejar: idx === 0 ? 0.2 : 0.3 } });
    // Panorámica de toda la pantalla
    claves.push({ f: t.d + 16, cam: estado(e, 1.08, 2 * signo), ease: suave });
    // Un acercamiento rápido a cada clic y una pequeña deriva después
    CLICS[id].forEach((_, i) => {
      const cf = Math.round(fotogramaDeClic(id, i));
      const { fx, fy } = foco(id, i);
      claves.push({ f: cf - 10, cam: estado(e, 1.5, i % 2 === 0 ? -3 : 4, fx, fy), ease: golpe });
      claves.push({ f: cf + 22, cam: estado(e, 1.4, i % 2 === 0 ? -1 : 2, fx, fy), ease: suave });
    });
    // Salida: se aleja un poco
    claves.push({ f: t.fin, cam: estado(e, 1.12, -3 * signo), ease: suave });
  });

  const c = EST.cierre;
  claves.push({ f: T.cierre.d, cam: estado(c, 0.95, -4), ease: volar, vuelo: { amp: 5, alejar: 0.25 } });
  claves.push({ f: T.cierre.fin, cam: estado(c, 1.25, 4), ease: suave });

  // Seguridad: los fotogramas tienen que ir siempre en orden creciente
  const ordenadas = claves.sort((a, b) => a.f - b.f);
  return ordenadas.filter((c, i) => i === 0 || c.f > ordenadas[i - 1].f);
}

const CLAVES = construir();

// Dónde está la cámara en un fotograma
export function camaraEn(f: number): Cam {
  let cam: Cam = CLAVES[CLAVES.length - 1].cam;
  if (f <= CLAVES[0].f) cam = CLAVES[0].cam;
  else {
    for (let i = 0; i < CLAVES.length - 1; i++) {
      const a = CLAVES[i];
      const b = CLAVES[i + 1];
      if (f <= b.f) {
        const p = (f - a.f) / (b.f - a.f);
        const t = b.ease(p);
        const mez = (m: number, n: number) => m + (n - m) * t;
        cam = {
          x: mez(a.cam.x, b.cam.x),
          y: mez(a.cam.y, b.cam.y),
          z: mez(a.cam.z, b.cam.z),
          yaw: mez(a.cam.yaw, b.cam.yaw),
          k: mez(a.cam.k, b.cam.k),
          roll: 0,
        };
        // En un vuelo la cámara se inclina y se aleja a mitad de camino (sensación de velocidad)
        if (b.vuelo) {
          const arco = Math.sin(Math.PI * p);
          cam.roll = b.vuelo.amp * arco;
          cam.k *= 1 - b.vuelo.alejar * arco;
        }
        break;
      }
    }
  }
  // Cámara "en la mano": un balanceo suave y continuo para que nada se vea plano
  return {
    ...cam,
    x: cam.x + Math.sin(f / 41) * 14,
    y: cam.y + Math.cos(f / 33) * 9,
    yaw: cam.yaw + Math.sin(f / 57) * 1.2,
    k: cam.k * (1 + Math.sin(f / 47) * 0.01),
  };
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
  const ids = ["red", "proyectos", "recursos", "cierre"];
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

// ------------------------------------------------------------- que no se atraviesen
// Radio de la "burbuja" de cada objeto: lo más lejos que llega su borde aunque gire y flote.
//  - cubo: media diagonal (0,87 × lado), porque al girar su esquina llega más lejos
//  - esfera: se dibuja al 80 % del tamaño, así que su radio es 0,4 × tam
//  - anillo: medio tam
// Se suma lo que flotan arriba y abajo (hasta 26 px).
const FLOTA = 26;
const HUECO = 40; // separación mínima que dejamos entre dos objetos
function radio(o: Objeto) {
  const base = o.tipo === "cubo" ? o.tam * 0.87 : o.tipo === "esfera" ? o.tam * 0.4 : o.tam * 0.5;
  return base + FLOTA;
}

// Si dos objetos se tocan, los empuja en sentidos contrarios hasta que dejan de tocarse.
// Se repite varias veces porque al separar dos objetos puede que uno se acerque a otro.
// No usa números al azar de verdad, así que el vídeo sale igual en cada exportación.
function separar(lista: Objeto[]): Objeto[] {
  const objs = lista.map((o) => ({ ...o }));
  for (let vuelta = 0; vuelta < 400; vuelta++) {
    let hubo = false;
    for (let i = 0; i < objs.length; i++) {
      for (let j = i + 1; j < objs.length; j++) {
        const a = objs[i];
        const b = objs[j];
        const minimo = radio(a) + radio(b) + HUECO;
        let dx = b.x - a.x;
        let dy = b.y - a.y;
        let dz = b.z - a.z;
        const dist = Math.hypot(dx, dy, dz);
        if (dist >= minimo) continue;
        hubo = true;
        if (dist < 1) {
          // justo en el mismo sitio: los separamos hacia un lado cualquiera (pero siempre el mismo)
          dx = azar(i * 7 + j) - 0.5;
          dy = azar(i * 7 + j + 1) - 0.5;
          dz = azar(i * 7 + j + 2) - 0.5;
        }
        const largo = Math.hypot(dx, dy, dz) || 1;
        const empuje = (minimo - dist) / 2 + 1;
        a.x -= (dx / largo) * empuje;
        a.y -= (dy / largo) * empuje;
        a.z -= (dz / largo) * empuje;
        b.x += (dx / largo) * empuje;
        b.y += (dy / largo) * empuje;
        b.z += (dz / largo) * empuje;
      }
    }
    if (!hubo) break;
  }
  return objs;
}

export const OBJETOS = separar([...OBJETOS_INTRO, ...crearObjetos(), ...OBJETOS_CIERRE]);

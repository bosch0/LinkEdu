// El "mundo" 3D del vídeo: dónde está cada pantalla y cómo se mueve la cámara.
// Todas las pantallas están en un mismo espacio y la cámara vuela de una a otra,
// así las transiciones se entienden: no hay cortes, se viaja.
// La cámara no está nunca quieta: vuela muy rápido entre pantallas (girando un poco y alejándose
// a mitad del vuelo), enfoca de cerca y CENTRADO lo que se cuenta o donde se hace clic, y se mueve
// suavemente como si fuera en la mano.
import { Easing } from "remotion";
import { MOVIL_H } from "./marca";
import { ADELANTO, CLIPS, FPS, T, type NombreClip } from "./tiempos";

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
  movil: { x: 7700, y: 60, z: -250, ry: -14 },
  cierre: { x: 9600, y: 0, z: -500, ry: 0 },
};

// Subimos un poco la cámara para que lo enfocado quede algo por encima del título
const SUBIDA = 45;
// En la escena del móvil, cuántos px (de la imagen final) a la derecha del centro queda el teléfono:
// casi centrado (el título de esa escena va a la izquierda, centrado en vertical)
const MOVIL_DERECHA = 60;

// k = zoom, yaw = giro a los lados, roll = inclinación (solo durante los vuelos)
type Cam = { x: number; y: number; z: number; yaw: number; k: number; roll: number };
// vuelo: si esta clave es la llegada de un vuelo, cuánto se inclina la cámara (amp, con su signo)
// y cuánto se aleja a mitad del vuelo (alejar, de 0 a 1)
type Clave = { f: number; cam: Cam; ease: (t: number) => number; vuelo?: { amp: number; alejar: number } };

const volar = Easing.bezier(0.65, 0, 0.35, 1); // vuelo: arranca y frena
const golpe = Easing.bezier(0.5, 0, 0.15, 1); // movimiento rápido hacia el siguiente punto
const suave = Easing.inOut(Easing.quad);
const lineal = (t: number) => t;

const limitar = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

// ------------------------------------------------------------- puntos de interés
// Lo que la cámara enfoca en cada escena: [segundo de la grabación, x, y, zoom].
// x e y son píxeles de la ventana grabada (1920 × 1080 en el ordenador, 390 × 844 en el móvil).
// La cámara llega a cada punto en ese segundo, lo deja CENTRADO en la imagen y se queda ahí
// (acercándose muy despacio) hasta que toca ir al siguiente. Así solo se ve aquello de lo que se
// habla o donde se hace clic, y no toda la pantalla a la vez.
// Los clics están en CLICS (tiempos.ts): cada punto de clic llega unas décimas antes del clic.
type Punto = [number, number, number, number];
const PUNTOS: Record<NombreClip, Punto[]> = {
  red: [
    [0, 1050, 470, 1.85], // el mapa del mundo con las líneas hacia cada país
    [2.3, 852, 730, 2.6], // clic en Argentina
    [3.2, 1140, 400, 2.4], // la red en Argentina (Córdoba y Buenos Aires)
    [4.9, 1641, 139, 2.6], // clic en "Global"
    [5.6, 1000, 470, 1.9], // otra vez el mapa del mundo
    [7.0, 1100, 343, 2.6], // clic en Reino Unido
    [7.8, 1150, 540, 2.3], // la red en Reino Unido (Edimburgo y Londres)
  ],
  proyectos: [
    [0, 930, 330, 2.0], // el proyecto colaborativo: centros, fechas, participantes
    [1.8, 1458, 336, 2.6], // clic en "Abrir tablero"
    [2.7, 960, 520, 1.8], // el tablero entero
    [4.2, 726, 458, 2.7], // pasar la "Rúbrica de evaluación final" de columna
    [5.0, 900, 500, 2.3], // la tarea ya en "En curso"
    [6.15, 1088, 525, 2.7], // pasar la "Hoja de cálculo común" a "Hecho"
    [7.0, 960, 560, 2.0], // el tablero con las tareas movidas
  ],
  recursos: [
    [0, 900, 420, 2.0], // las tarjetas de recursos
    [1.9, 445, 206, 2.7], // clic en el filtro "PDF"
    [2.7, 800, 450, 2.1], // las tarjetas filtradas
    [4.05, 1416, 673, 2.6], // clic en "Leer gráficas en la prensa"
    [4.8, 960, 490, 2.4], // la vista previa del recurso
    [6.7, 1065, 721, 3.0], // clic en "Favorito"
    [7.6, 960, 600, 2.3], // ya está "En favoritos"
  ],
  movil: [
    [0, 195, 290, 2.15], // el inicio en el teléfono
    [2.9, 195, 812, 2.3], // toque en la pestaña "Mi red"
    [3.6, 195, 300, 2.15], // el mapa en el móvil
    [5.05, 195, 812, 2.3], // toque en "Proyectos"
    [5.8, 195, 290, 2.15], // el proyecto en el móvil
    [8.3, 195, 812, 2.3], // toque en "Recursos"
    [9.0, 195, 290, 2.15], // los recursos en el móvil
  ],
};

// Fotograma del vídeo en el que se ve el segundo `t` de la grabación de una escena
const fotogramaDe = (id: NombreClip, t: number) => Math.round(T[id].d - ADELANTO + (t / CLIPS[id].tasa) * FPS);

// Cámara que deja CENTRADO un punto de una pantalla (fx, fy = px desde el centro de la pantalla).
// La pantalla está girada (ry), así que el punto se gira igual para que caiga justo en el centro.
function mirar(e: Estacion, k: number, giro: number, fx: number, fy: number): Cam {
  const a = (e.ry * Math.PI) / 180;
  return { x: e.x + fx * Math.cos(a), y: e.y + fy, z: e.z - fx * Math.sin(a), yaw: e.ry + giro, k, roll: 0 };
}

// Pantallas del ordenador (1440 × 810 px): la cámara no se sale de la pantalla (no se ve el fondo),
// así que un punto muy pegado al borde queda lo más centrado posible.
function enPantalla(e: Estacion, k: number, giro: number, x = 960, y = 540): Cam {
  let fx = (x / 1920 - 0.5) * 1440;
  let fy = (y / 1080 - 0.5) * 810 + SUBIDA / k;
  fx = limitar(fx, -Math.max(0, 720 - 960 / k), Math.max(0, 720 - 960 / k));
  fy = limitar(fy, -Math.max(0, 405 - 540 / k), Math.max(0, 405 - 540 / k));
  return mirar(e, k, giro, fx, fy);
}

// Teléfono (MOVIL_W × MOVIL_H): de ancho se ve entero; de alto, la cámara sube y baja por él.
function enMovil(k: number, giro: number, y = 422): Cam {
  const borde = MOVIL_H / 2 + 16; // con el marco
  let fy = (y / 844 - 0.5) * MOVIL_H;
  fy = limitar(fy, -Math.max(0, borde - 540 / k), Math.max(0, borde - 540 / k));
  return mirar(EST.movil, k, giro, -MOVIL_DERECHA / k, fy);
}

// Claves de la cámara: llegada de cada vuelo, un punto de interés tras otro y salida
function construir(): Clave[] {
  const claves: Clave[] = [];
  // Introducción: tres pantallas a la vez, con una vuelta lenta alrededor
  claves.push({ f: 0, cam: { x: 0, y: 0, z: 0, yaw: -6, k: 0.62, roll: 0 }, ease: lineal });
  claves.push({ f: T.intro.fin, cam: { x: 0, y: 0, z: 0, yaw: 5, k: 0.8, roll: 0 }, ease: suave });

  (["red", "proyectos", "recursos", "movil"] as const).forEach((id, idx) => {
    const e = EST[id];
    const t = T[id];
    const signo = idx % 2 === 0 ? 1 : -1; // los vuelos se inclinan hacia un lado y hacia el otro
    const camara = (k: number, giro: number, x?: number, y?: number) =>
      id === "movil" ? enMovil(k, giro, y) : enPantalla(e, k, giro, x, y);
    // Llegada tras el vuelo, viendo la pantalla entera un instante (el primer vuelo es el del logo)
    claves.push({
      f: t.d,
      cam: camara(id === "movil" ? 1.2 : 1.0, 6 * signo),
      ease: volar,
      vuelo: { amp: (idx === 0 ? 9 : 6) * signo, alejar: idx === 0 ? 0.2 : 0.3 },
    });
    // Un punto de interés tras otro: llega rápido, lo centra y se queda acercándose despacio
    const puntos = PUNTOS[id];
    const MOVER = 12; // fotogramas que tarda en ir de un punto al siguiente
    puntos.forEach(([s, x, y, k], i) => {
      const giro = (i % 2 === 0 ? -2 : 2) * signo;
      const llega = Math.max(t.d + 16, fotogramaDe(id, s) + (i === 0 ? 16 : 0));
      const siguiente = i + 1 < puntos.length ? fotogramaDe(id, puntos[i + 1][0]) : t.fin;
      claves.push({ f: llega, cam: camara(k, giro, x, y), ease: i === 0 ? suave : golpe });
      claves.push({ f: Math.min(t.fin, siguiente - MOVER), cam: camara(k * 1.05, giro * 0.5, x, y), ease: lineal });
    });
  });

  const c = EST.cierre;
  claves.push({ f: T.cierre.d, cam: { x: c.x, y: c.y, z: c.z, yaw: c.ry - 4, k: 0.95, roll: 0 }, ease: volar, vuelo: { amp: 5, alejar: 0.25 } });
  claves.push({ f: T.cierre.fin, cam: { x: c.x, y: c.y, z: c.z, yaw: c.ry + 4, k: 1.25, roll: 0 }, ease: suave });

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
    // (dividido entre el zoom: con la cámara muy cerca, el mismo balanceo se notaría demasiado)
    x: cam.x + (Math.sin(f / 41) * 14) / Math.max(1, cam.k),
    y: cam.y + (Math.cos(f / 33) * 9) / Math.max(1, cam.k),
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
  delante: boolean; // solo decide en qué capa se dibuja; NINGÚN objeto se dibuja encima de una pantalla
};

// Número "al azar" pero siempre el mismo para el mismo valor (el vídeo sale igual cada vez)
const azar = (n: number) => {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
};

const COLORES: Objeto["color"][] = ["turquesa", "naranja", "amarillo", "rosa", "azul"];
const TIPOS: Objeto["tipo"][] = ["cubo", "esfera", "anillo", "cubo", "esfera", "cubo", "anillo", "cubo"];

// Objetos alrededor de cada pantalla: unos grandes y lejos, y otros más pequeños a los lados.
// Todos quedan DETRÁS del plano de las pantallas (ver detrasDePantallas más abajo).
function crearObjetos(): Objeto[] {
  const lista: Objeto[] = [];
  const ids = ["red", "proyectos", "recursos", "movil", "cierre"];
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
        z: e.z - (detras ? 500 + azar(s + 9) * 900 : 250 + azar(s + 3) * 450),
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
          z: Math.min(e.z, sig.z) - 350 - azar(s + 1) * 500,
          tam: 90 + azar(s + 2) * 120,
          semilla: s,
          delante: true,
        });
      }
    }
  });
  return lista;
}

// Objetos grandes que rodean las tres pantallas de la introducción (por detrás de ellas)
const OBJETOS_INTRO: Objeto[] = [
  { tipo: "cubo", color: "turquesa", icono: 0, x: -1250, y: -420, z: -750, tam: 190, semilla: 1, delante: true },
  { tipo: "esfera", color: "amarillo", icono: 0, x: 1250, y: -400, z: -700, tam: 230, semilla: 2, delante: true },
  { tipo: "anillo", color: "naranja", icono: 0, x: -1250, y: 430, z: -650, tam: 300, semilla: 3, delante: true },
  { tipo: "cubo", color: "rosa", icono: 1, x: 1330, y: 340, z: -750, tam: 170, semilla: 4, delante: true },
  { tipo: "esfera", color: "azul", icono: 0, x: -520, y: -470, z: -870, tam: 110, semilla: 5, delante: true },
  { tipo: "anillo", color: "turquesa", icono: 0, x: 540, y: -450, z: -770, tam: 170, semilla: 6, delante: true },
  { tipo: "cubo", color: "amarillo", icono: 2, x: -1480, y: 40, z: -830, tam: 110, semilla: 7, delante: true },
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

// Pantallas del mundo (centro y medio tamaño con el marco) para que ningún objeto quede delante.
const PANTALLAS = [
  { x: -1000, y: -30, z: -150, ancho: 383, alto: 219 }, // introducción (escala 0,52)
  { x: 0, y: 30, z: 120, ancho: 530, alto: 303 }, // introducción (escala 0,72)
  { x: 1000, y: -30, z: -150, ancho: 383, alto: 219 },
  ...(["red", "proyectos", "recursos"] as const).map((id) => ({ ...EST[id], ancho: 736, alto: 421 })),
  { ...EST.movil, ancho: 201, alto: 417 },
];
// Margen detrás del plano de la pantalla: las pantallas están giradas hasta 20°, así que sus
// bordes se acercan unos 180 px a la cámara; con este margen ningún objeto los toca.
const MARGEN_PANTALLA = 260;

// Si un objeto está a la altura de una pantalla (o cerca de sus bordes), lo manda detrás de ella.
function detrasDePantallas(o: Objeto) {
  const r = radio(o);
  for (const p of PANTALLAS) {
    const cerca = Math.abs(o.x - p.x) < p.ancho + r + 500 && Math.abs(o.y - p.y) < p.alto + r + 500;
    if (cerca) o.z = Math.min(o.z, p.z - r - MARGEN_PANTALLA);
  }
}
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
  objs.forEach(detrasDePantallas);
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
        detrasDePantallas(a);
        detrasDePantallas(b);
      }
    }
    if (!hubo) break;
  }
  objs.forEach(detrasDePantallas); // por si acaso: ninguno delante de una pantalla
  return objs;
}

export const OBJETOS = separar([...OBJETOS_INTRO, ...crearObjetos(), ...OBJETOS_CIERRE]);

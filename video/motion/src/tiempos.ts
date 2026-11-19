// Línea de tiempo del vídeo (30 fotogramas por segundo).
// El vídeo debe durar entre 30 y 35 segundos (900 a 1050 fotogramas).
// Cada escena dura lo que dura su tramo de voz en off, así la imagen siempre acompaña a lo que se dice.
// Cada escena tiene un "tramo de vuelo" (la cámara viaja de una pantalla a la siguiente, muy rápido)
// y después un "tramo de pausa" (la cámara se queda mirando la pantalla, pero se mueve y se acerca a cada clic).
export const FPS = 30;

// Voz en off: la grabé de una vez en ElevenLabs (voz Martin Osborne) y la corté en tramos
// (public/audio/voz-*.mp3), acelerados un 10 %. Aquí, lo que dura cada tramo en segundos
// (se mide con `npx remotion ffmpeg -i public/audio/voz-red.mp3`).
export const VOZ = {
  pregunta: 4.21, // "¿Y si docentes, alumnos y empresas estuvieran por fin... conectados?"
  logo: 1.36, // "Esto es LinkEdu."
  red: 7.44,
  proyectos: 7.76,
  recursos: 7.39,
  cierre: 3.03, // "LinkEdu. Conecta. Aprende. Crece."
} as const;

// Vídeos de la app grabados con scripts/grabar.mjs:
//  dur   = lo que dura la grabación en segundos
//  tasa  = velocidad de reproducción (1 = normal, 2 = el doble de rápido)
// Cada grabación tiene que durar como mínimo lo que dura su escena una vez acelerada.
export const CLIPS = {
  red: { archivo: "red.mp4", dur: 9.87, tasa: 1.3 },
  proyectos: { archivo: "proyectos.mp4", dur: 9.33, tasa: 1.2 },
  recursos: { archivo: "recursos.mp4", dur: 8.57, tasa: 1.15 },
} as const;

export type NombreClip = keyof typeof CLIPS;

// Clics del cursor en cada grabación: [segundo de la grabación, x, y]
// (x e y = posición en la ventana grabada, de 1280 × 720). Sirven para dos cosas:
// poner el sonido del clic justo en ese momento y acercar la cámara a ese punto.
// `node scripts/grabar.mjs` los escribe al terminar cada grabación.
export const CLICS: Record<NombreClip, [number, number, number][]> = {
  red: [
    [2.67, 635, 569], // país Argentina
    [5.28, 1001, 203], // botón Global
    [7.47, 780, 338], // país Reino Unido
  ],
  proyectos: [
    [2.26, 653, 484], // Abrir tablero
    [4.54, 406, 324], // pasar una tarea de columna
    [6.41, 768, 345], // pasar otra tarea
  ],
  recursos: [
    [2.31, 444, 338], // filtro PDF
    [4.59, 778, 566], // abrir la vista previa
    [7.22, 745, 541], // En favoritos
  ],
};

const aFotogramas = (segundos: number) => Math.ceil(segundos * FPS);

const VUELO = 14; // fotogramas de vuelo entre pantallas (menos de medio segundo)
const VUELO_LOGO = 45; // el vuelo donde aparece el logo es más largo
const VUELO_CIERRE = 22; // vuelo hacia el logo final
const COLA = 4; // fotogramas de margen al final de cada escena, después de la voz

export type Escena = { id: string; d: number; n: number; fin: number };

function escena(id: string, d: number, n: number): Escena {
  return { id, d, n, fin: d + n };
}

// d = fotograma donde empieza la pausa, n = cuántos fotogramas dura
const intro = escena("intro", 0, aFotogramas(VOZ.pregunta) + 6);
const red = escena("red", intro.fin + VUELO_LOGO, aFotogramas(VOZ.red) + COLA);
const proyectos = escena("proyectos", red.fin + VUELO, aFotogramas(VOZ.proyectos) + COLA);
const recursos = escena("recursos", proyectos.fin + VUELO, aFotogramas(VOZ.recursos) + COLA);
const cierre = escena("cierre", recursos.fin + VUELO_CIERRE, aFotogramas(VOZ.cierre) + 9);

export const T = { intro, red, proyectos, recursos, cierre };
export const TOTAL = cierre.fin; // unos 1018 fotogramas = 33,9 s

// El vídeo de la app empieza a moverse 10 fotogramas antes de que la cámara se pare
export const ADELANTO = 10;

// Fotograma (del vídeo final) en el que ocurre el clic número `i` de una escena
export function fotogramaDeClic(id: NombreClip, i: number) {
  return T[id].d - ADELANTO + (CLICS[id][i][0] / CLIPS[id].tasa) * FPS;
}

export { VUELO, VUELO_LOGO, VUELO_CIERRE };

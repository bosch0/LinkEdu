// Línea de tiempo del vídeo (30 fotogramas por segundo).
// Cada escena tiene un "tramo de vuelo" (la cámara viaja de una pantalla a la siguiente)
// y después un "tramo de pausa" (la cámara se queda mirando la pantalla).
export const FPS = 30;

// Vídeos de la app grabados con scripts/grabar.mjs:
//  dur   = lo que dura la grabación en segundos
//  tasa  = velocidad de reproducción (1 = normal, 2 = el doble de rápido)
export const CLIPS = {
  inicio: { archivo: "inicio.mp4", dur: 8.37, tasa: 1.8 },
  red: { archivo: "red.mp4", dur: 5.43, tasa: 1.4 },
  proyectos: { archivo: "proyectos.mp4", dur: 10.2, tasa: 2.3 },
  recursos: { archivo: "recursos.mp4", dur: 3.93, tasa: 1.2 },
  empleo: { archivo: "empleo.mp4", dur: 9.87, tasa: 2.2 },
  movil: { archivo: "movil.mp4", dur: 7.13, tasa: 1.8 },
} as const;

export type NombreClip = keyof typeof CLIPS;

// Fotogramas que dura la pausa de una escena (lo que dura su vídeo, ya acelerado)
const pausa = (c: NombreClip) => Math.floor((CLIPS[c].dur / CLIPS[c].tasa) * FPS) - 4;

const VUELO = 30; // fotogramas de vuelo entre pantallas
const VUELO_LOGO = 45; // el vuelo donde aparece el logo es más largo

export type Escena = { id: string; d: number; n: number; fin: number };

function escena(id: string, d: number, n: number): Escena {
  return { id, d, n, fin: d + n };
}

// d = fotograma donde empieza la pausa, n = cuántos fotogramas dura
const intro = escena("intro", 0, 120);
const inicio = escena("inicio", intro.fin + VUELO_LOGO, pausa("inicio"));
const red = escena("red", inicio.fin + VUELO, pausa("red"));
const proyectos = escena("proyectos", red.fin + VUELO, pausa("proyectos"));
const recursos = escena("recursos", proyectos.fin + VUELO, pausa("recursos"));
const empleo = escena("empleo", recursos.fin + VUELO, pausa("empleo"));
const movil = escena("movil", empleo.fin + VUELO, pausa("movil"));
const cierre = escena("cierre", movil.fin + VUELO_LOGO, 110);

export const T = { intro, inicio, red, proyectos, recursos, empleo, movil, cierre };
export const TOTAL = cierre.fin;

export { VUELO, VUELO_LOGO };

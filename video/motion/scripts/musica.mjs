// Compone la música de fondo del vídeo con código y la guarda en public/audio/musica.wav.
// Es electrónica moderna a 120 BPM en La menor (acordes: La m - Fa - Do - Sol, uno por compás):
// bombo, palmas, hi-hats, bajo, arpegio y un colchón de acordes (pad).
// Los instrumentos que suenan "debajo" bajan de volumen cada vez que suena el bombo
// (efecto "sidechain"), que es lo que da ese ritmo que respira.
//
// Uso (desde video/motion/):  node scripts/musica.mjs
import { mkdirSync, writeFileSync } from "node:fs";

const SR = 44100; // muestras por segundo
const BPM = 120;
const BEAT = 60 / BPM; // 0,5 s
const COMPAS = BEAT * 4; // 2 s
const DURACION = 36; // segundos
const N = Math.floor(DURACION * SR);
mkdirSync("public/audio", { recursive: true });

// Ruido "al azar" pero siempre el mismo
let semilla = 987654;
const ruido = () => {
  semilla = (semilla * 1664525 + 1013904223) >>> 0;
  return (semilla / 4294967296) * 2 - 1;
};

// Onda "sierra" suave: suma de unos pocos armónicos (así no suena áspera ni "pitada")
const sierra = (fase, armonicos = 7) => {
  let s = 0;
  for (let k = 1; k <= armonicos; k++) s += Math.sin(2 * Math.PI * fase * k) / k;
  return s * 0.6;
};

// Notas (Hz). Cada compás tiene su acorde, su nota de bajo y las notas del arpegio.
const ACORDES = [
  { bajo: 55.0, notas: [440.0, 523.25, 659.25] }, // La m
  { bajo: 43.65, notas: [349.23, 440.0, 523.25] }, // Fa
  { bajo: 65.41, notas: [523.25, 659.25, 783.99] }, // Do
  { bajo: 49.0, notas: [392.0, 493.88, 587.33] }, // Sol
];
const PATRON_ARPEGIO = [0, 2, 1, 3, 0, 2, 1, 3, 0, 2, 1, 3, 0, 2, 1, 3];

// Qué suena en cada compás (0 = empieza): [bombo y bajo, hi-hats y palmas, arpegio, pad]
// El compás 15 (segundo 30) es el golpe final: en el vídeo coincide con la entrada del logo de cierre.
// Después solo queda el colchón de acordes, que se va apagando.
const COMPAS_FINAL = 15;
function capas(compas) {
  if (compas >= COMPAS_FINAL) return { ritmo: false, hats: false, arpegio: compas === COMPAS_FINAL, pad: true }; // final
  if (compas < 2) return { ritmo: false, hats: false, arpegio: true, pad: true }; // entrada suave
  if (compas < 4) return { ritmo: true, hats: false, arpegio: true, pad: true };
  if (compas === 9 || compas === 10) return { ritmo: false, hats: true, arpegio: true, pad: true }; // pausa de bombo (respiro)
  return { ritmo: true, hats: true, arpegio: true, pad: true };
}

const salida = new Float32Array(N);
let lpArp = 0;
let lpBajo = 0;
let lpPad = 0;
let hatFiltro = 0;
let palmaFiltro = 0;

for (let i = 0; i < N; i++) {
  const t = i / SR;
  const compas = Math.floor(t / COMPAS);
  const acorde = ACORDES[compas % 4];
  const c = capas(compas);
  const tCompas = t - compas * COMPAS;
  const beat = Math.floor(tCompas / BEAT); // 0..3
  const tBeat = tCompas - beat * BEAT;
  const sixteen = Math.floor(tCompas / (BEAT / 4)); // 0..15
  const tSix = tCompas - sixteen * (BEAT / 4);

  // ---- bombo: sinusoide que baja de tono
  let bombo = 0;
  if (c.ritmo) bombo = Math.sin(2 * Math.PI * (48 * tBeat + 95 * (1 - Math.exp(-tBeat * 38)) / 38)) * Math.exp(-tBeat * 11) * 1.1;

  // "sidechain": todo lo demás baja cuando suena el bombo
  const duck = c.ritmo ? 1 - 0.65 * Math.exp(-tBeat * 9) : 1;

  // ---- palmas en los tiempos 2 y 4
  let palma = 0;
  if (c.hats && (beat === 1 || beat === 3)) {
    const r = ruido();
    palmaFiltro += (r - palmaFiltro) * 0.45;
    palma = (r - palmaFiltro) * Math.exp(-tBeat * 22) * 0.55;
  }

  // ---- hi-hat: ruido agudo en cada corchea (los de contratiempo, más fuertes)
  let hat = 0;
  if (c.hats) {
    const tOcho = tCompas % (BEAT / 2);
    const contratiempo = Math.floor(tCompas / (BEAT / 2)) % 2 === 1;
    const r = ruido();
    hatFiltro += (r - hatFiltro) * 0.7;
    hat = (r - hatFiltro) * Math.exp(-tOcho * (contratiempo ? 60 : 90)) * (contratiempo ? 0.32 : 0.16);
  }

  // ---- bajo: corcheas, con salto de octava en la última
  let bajo = 0;
  if (c.ritmo) {
    const tOcho = tCompas % (BEAT / 2);
    const idx = Math.floor(tCompas / (BEAT / 2));
    const f = idx % 4 === 3 ? acorde.bajo * 2 : acorde.bajo;
    const env = Math.min(1, tOcho * 200) * Math.exp(-tOcho * 5);
    const cruda = sierra(f * t, 5) * env;
    lpBajo += (cruda - lpBajo) * 0.09;
    bajo = lpBajo * 0.95 * duck;
  }

  // ---- arpegio: notas cortas tipo "pluck" en semicorcheas
  let arpegio = 0;
  if (c.arpegio) {
    const nota = PATRON_ARPEGIO[sixteen] === 3 ? acorde.notas[0] * 2 : acorde.notas[PATRON_ARPEGIO[sixteen]];
    const env = Math.min(1, tSix * 400) * Math.exp(-tSix * 14);
    const cruda = (sierra(nota * t, 6) + sierra(nota * 1.006 * t, 6)) * 0.5 * env;
    lpArp += (cruda - lpArp) * (0.12 + 0.25 * Math.exp(-tSix * 30)); // más brillante al principio de cada nota
    // el arpegio entra con más fuerza a partir del compás 4
    arpegio = lpArp * (compas < 4 ? 0.28 : 0.42) * (compas >= COMPAS_FINAL ? 0.7 : 1);
  }

  // ---- pad: acorde largo y suave
  let pad = 0;
  if (c.pad) {
    let s = 0;
    for (const f of acorde.notas) s += sierra(f * 0.5 * t, 4) + sierra(f * 0.5 * 1.004 * t, 4);
    lpPad += (s - lpPad) * 0.03;
    const entrada = Math.min(1, t / 2.5); // aparece poco a poco
    const cambio = Math.min(1, tCompas * 6) * 0.5 + 0.5; // pequeño "empujón" al cambiar de acorde
    pad = lpPad * 0.16 * entrada * cambio * (c.ritmo ? duck : 1);
  }

  // ---- golpe final en el último compás para cerrar
  let golpe = 0;
  if (compas === COMPAS_FINAL && tCompas < 1.8) {
    golpe = Math.sin(2 * Math.PI * (45 + 40 * Math.exp(-tCompas * 8)) * tCompas) * Math.exp(-tCompas * 2.2) * 0.9;
  }

  salida[i] = bombo + palma + hat + bajo + arpegio + pad + golpe;
}

// Limitador suave (para que no sature) y normalización
let pico = 0;
for (let i = 0; i < N; i++) {
  salida[i] = Math.tanh(salida[i] * 1.3);
  pico = Math.max(pico, Math.abs(salida[i]));
}
const datos = Buffer.alloc(N * 2);
for (let i = 0; i < N; i++) datos.writeInt16LE(Math.round((salida[i] / pico) * 0.9 * 32767), i * 2);
const cab = Buffer.alloc(44);
cab.write("RIFF", 0);
cab.writeUInt32LE(36 + datos.length, 4);
cab.write("WAVEfmt ", 8);
cab.writeUInt32LE(16, 16);
cab.writeUInt16LE(1, 20);
cab.writeUInt16LE(1, 22);
cab.writeUInt32LE(SR, 24);
cab.writeUInt32LE(SR * 2, 28);
cab.writeUInt16LE(2, 32);
cab.writeUInt16LE(16, 34);
cab.write("data", 36);
cab.writeUInt32LE(datos.length, 40);
writeFileSync("public/audio/musica.wav", Buffer.concat([cab, datos]));
console.log("✓ musica.wav", DURACION + " s,", BPM + " BPM");

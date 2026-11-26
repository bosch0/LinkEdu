// Todo el audio del vídeo: voz en off, música y efectos de sonido.
// Cada sonido va dentro de una <Sequence> para que empiece en el fotograma justo.
//
// Origen de cada sonido (ver public/audio/CREDITOS.md):
//  - voz-*.mp3: ElevenLabs (voz Martin Osborne), grabada de una vez y cortada en tramos
//  - efectos .wav: ElevenLabs Sound Effects (uno para cada acción)
//  - musica.wav: compuesta con código (scripts/musica.mjs)
import React from "react";
import { Html5Audio, Sequence, interpolate, staticFile } from "remotion";
import { CLICS, FPS, T, TOTAL, VOZ, fotogramaDeClic } from "../tiempos";

// Volúmenes de los efectos (de 0 a 1)
const VOL = { voz: 1, whoosh: 0.6, clic: 0.8, pop: 0.5, ping: 0.6, panel: 0.7, ficha: 0.8, destello: 0.6, impacto: 0.6, impactoLogo: 0.4 };

// Cuántos fotogramas pasan desde que empieza el archivo hasta su "golpe" principal.
// Se mide una vez por archivo; sirve para que el golpe caiga justo en el fotograma que queremos.
const GOLPE = { whoosh: 14, clic: 6, pop: 6, ping: 2, panel: 12, ficha: 8, destello: 21, impacto: 3 };

// Un sonido que empieza en un fotograma
const Suena: React.FC<{ archivo: string; desde: number; volumen: number; dur?: number }> = ({ archivo, desde, volumen, dur = 120 }) => (
  <Sequence from={Math.max(0, Math.round(desde))} durationInFrames={dur} layout="none">
    <Html5Audio src={staticFile(`audio/${archivo}`)} volume={volumen} />
  </Sequence>
);

// Fotograma donde empieza cada tramo de la voz en off y lo que dura
const aFot = (s: number) => Math.ceil(s * FPS);
export const VOCES = [
  { archivo: "voz-intro-pregunta.mp3", desde: 3, dur: aFot(VOZ.pregunta) },
  { archivo: "voz-intro-logo.mp3", desde: T.intro.fin + 2, dur: aFot(VOZ.logo) },
  { archivo: "voz-red.mp3", desde: T.red.d + 2, dur: aFot(VOZ.red) },
  { archivo: "voz-proyectos.mp3", desde: T.proyectos.d + 2, dur: aFot(VOZ.proyectos) },
  { archivo: "voz-recursos.mp3", desde: T.recursos.d + 2, dur: aFot(VOZ.recursos) },
  { archivo: "voz-movil.mp3", desde: T.movil.d + 2, dur: aFot(VOZ.movil) },
  { archivo: "voz-cierre.mp3", desde: T.cierre.d - 4, dur: aFot(VOZ.cierre) },
];

// Fotogramas (desde que empieza el tramo de voz) en los que empieza la segunda oración de cada escena.
// Sale de mirar dónde está el silencio entre las dos oraciones (silencedetect de ffmpeg).
export const VOZ_SEGUNDA = { red: 71, proyectos: 76, recursos: 74, movil: 60 };

// Qué efecto suena en cada clic del cursor (además del clic normal)
const EFECTO_DE_CLIC: Record<keyof typeof CLICS, ("ping" | "panel" | "ficha" | "destello" | null)[]> = {
  red: ["ping", null, "ping"], // país Argentina, botón Global, país Reino Unido
  proyectos: ["panel", "ficha", "ficha"], // abrir tablero, mover dos tareas
  recursos: [null, "panel", "destello"], // filtro, abrir vista previa, guardar en favoritos
  movil: [null, null, null], // toques en las pestañas de abajo (solo el clic)
};

// La música tiene su golpe final en el segundo GOLPE_MUSICA de la pista (COMPAS_FINAL × 2 en scripts/musica.mjs):
// lo hacemos coincidir con la entrada del logo final
const GOLPE_MUSICA = 38;
const INICIO_MUSICA = T.cierre.d - 12 - GOLPE_MUSICA * FPS;

// Volumen de la música en un fotograma del vídeo: sube al empezar, baja mientras habla la voz y se apaga al final
function volumenMusica(f: number) {
  let voz = 0;
  for (const v of VOCES) voz = Math.max(voz, interpolate(f, [v.desde - 4, v.desde + 2, v.desde + v.dur - 2, v.desde + v.dur + 10], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const base = 0.36 - 0.2 * voz;
  const entrada = interpolate(f, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const salida = interpolate(f, [TOTAL - 70, TOTAL - 4], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return base * entrada * salida;
}

export const Sonido: React.FC = () => {
  // Vuelos de cámara: [fotograma donde empieza, fotograma donde acaba]
  const vuelos = [
    [T.intro.fin, T.red.d],
    [T.red.fin, T.proyectos.d],
    [T.proyectos.fin, T.recursos.d],
    [T.recursos.fin, T.movil.d],
    [T.movil.fin, T.cierre.d],
  ];
  const escenas = ["red", "proyectos", "recursos", "movil"] as const;
  const palabrasIntro = [16, 36, 54, 84]; // mismos fotogramas que en TextoIntro
  const lema = [T.cierre.d - 12 + 36, T.cierre.d - 12 + 57, T.cierre.d - 12 + 80]; // mismos que en TextoCierre

  return (
    <>
      {/* música de fondo */}
      <Sequence from={INICIO_MUSICA} layout="none">
        <Html5Audio src={staticFile("audio/musica.wav")} volume={(fr) => volumenMusica(fr + INICIO_MUSICA)} />
      </Sequence>

      {/* voz en off */}
      {VOCES.map((v) => (
        <Suena key={v.archivo} archivo={v.archivo} desde={v.desde} volumen={VOL.voz} dur={v.dur + 10} />
      ))}

      {/* whoosh: el golpe cae a mitad de cada vuelo de cámara */}
      {vuelos.map(([a, b], i) => (
        <Suena key={`w${i}`} archivo="whoosh.wav" desde={a + (b - a) / 2 - GOLPE.whoosh} volumen={VOL.whoosh} />
      ))}

      {/* golpe suave cuando aparece el logo grande y golpe fuerte en el cierre */}
      <Suena archivo="impacto.wav" desde={T.intro.fin - 4 - GOLPE.impacto} volumen={VOL.impactoLogo} />
      <Suena archivo="impacto.wav" desde={T.cierre.d - 12 - GOLPE.impacto} volumen={VOL.impacto} dur={150} />

      {/* pop cuando sale cada palabra o título */}
      {palabrasIntro.map((f, i) => (
        <Suena key={`pi${i}`} archivo="pop.wav" desde={f - GOLPE.pop} volumen={VOL.pop} dur={30} />
      ))}
      {escenas.map((id) => (
        <React.Fragment key={`t${id}`}>
          <Suena archivo="pop.wav" desde={T[id].d + 4 - GOLPE.pop} volumen={VOL.pop} dur={30} />
          <Suena archivo="pop.wav" desde={T[id].d + 2 + VOZ_SEGUNDA[id] - GOLPE.pop} volumen={VOL.pop} dur={30} />
        </React.Fragment>
      ))}

      {/* clics del cursor y el efecto propio de cada acción (sincronizados con la grabación) */}
      {escenas.map((id) =>
        CLICS[id].map((_, i) => {
          const cf = fotogramaDeClic(id, i);
          const efecto = EFECTO_DE_CLIC[id][i];
          return (
            <React.Fragment key={`${id}${i}`}>
              <Suena archivo="clic.wav" desde={cf - GOLPE.clic} volumen={VOL.clic} dur={30} />
              {efecto && <Suena archivo={efecto === "ping" ? "ping-mapa.wav" : `${efecto}.wav`} desde={cf - GOLPE[efecto]} volumen={VOL[efecto]} dur={60} />}
            </React.Fragment>
          );
        }),
      )}

      {/* lema final: un pop por palabra y un destello en la última */}
      {lema.map((f, i) => (
        <Suena key={`b${i}`} archivo="pop.wav" desde={f - GOLPE.pop} volumen={VOL.pop} dur={30} />
      ))}
      <Suena archivo="destello.wav" desde={lema[2] - GOLPE.destello} volumen={VOL.destello} dur={90} />
    </>
  );
};

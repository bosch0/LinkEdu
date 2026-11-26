// El vídeo completo: un mundo 3D con pantallas de cristal (la app real) y objetos brillantes,
// y una cámara que vuela de una pantalla a la siguiente.
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, MOVIL_H, MOVIL_W, PERSPECTIVA } from "./marca";
import { EST, OBJETOS, camaraEn } from "./mundo";
import { T } from "./tiempos";
import { FotoApp, Pantalla, VideoApp } from "./componentes/Pantalla";
import { ObjetoSuelto, ResplandorEsfera } from "./componentes/Objetos";
import { LogoVuelo, NumeroEsquina, TextoCierre, TextoIntro, Titulo } from "./componentes/Textos";
import { Sonido, VOZ_SEGUNDA } from "./componentes/Sonido";

// Luces de color enormes al fondo del mundo (dan color al cristal)
const LUCES = Array.from({ length: 11 }, (_, i) => ({
  x: -1000 + i * 2200,
  y: i % 2 === 0 ? -350 : 350,
  color: [C.turquesa, C.azul, C.naranja, C.rosa][i % 4],
}));

// Una capa del mundo 3D. Hay varias (fondo, resplandores, objetos, pantallas...) con la MISMA cámara.
// Van separadas a propósito: si dos cosas comparten el mismo espacio 3D, el navegador las "parte"
// para ordenarlas y salen cortes y parpadeos (por eso los resplandores van en capas aparte).
const Capa: React.FC<{ transformacion: string; children: React.ReactNode }> = ({ transformacion, children }) => (
  <div style={{ position: "absolute", inset: 0, perspective: PERSPECTIVA }}>
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: 0,
        height: 0,
        transformStyle: "preserve-3d",
        transform: transformacion,
      }}
    >
      {children}
    </div>
  </div>
);

export const Video: React.FC = () => {
  const f = useCurrentFrame();
  const cam = camaraEn(f);

  // OJO: aquí NO se usa filter: blur (desenfoque de movimiento). Con un mundo 3D dentro,
  // el navegador borraba o recortaba fotogramas enteros al renderizar y el vídeo parpadeaba.

  // Acercar la cámara = mover el mundo hacia delante (eje z)
  const acercar = PERSPECTIVA * (1 - 1 / cam.k);
  // roll = inclinación de la cámara (solo durante los vuelos, para dar sensación de velocidad)
  const transformacion = `translateZ(${acercar}px) rotateZ(${cam.roll}deg) rotateY(${-cam.yaw}deg) translate3d(${-cam.x}px, ${-cam.y}px, ${-cam.z}px)`;

  // Destello blanco suave a mitad de cada vuelo (los cortes rápidos se notan más)
  const vuelos = [
    [T.intro.fin, T.red.d],
    [T.red.fin, T.proyectos.d],
    [T.proyectos.fin, T.recursos.d],
    [T.recursos.fin, T.movil.d],
    [T.movil.fin, T.cierre.d],
  ];
  const destello = Math.max(
    0,
    ...vuelos.map(([a, b]) => (f >= a && f <= b ? Math.sin((Math.PI * (f - a)) / (b - a)) * 0.2 : 0)),
  );

  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 42%, #0f4a7c 0%, ${C.marino} 42%, ${C.fondo} 100%)` }}>
      <div style={{ position: "absolute", inset: 0 }}>
        {/* CAPA 1: luces de fondo y objetos que quedan detrás de las pantallas */}
        <Capa transformacion={transformacion}>
          {LUCES.map((l, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: -900,
                top: -900,
                width: 1800,
                height: 1800,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${l.color}88 0%, ${l.color}00 65%)`,
                transform: `translate3d(${l.x}px, ${l.y}px, -2200px)`,
              }}
            />
          ))}
        </Capa>

        {/* CAPA 1b: resplandor y sombra de las esferas que quedan detrás (van aparte para que no se corten) */}
        <Capa transformacion={transformacion}>
          {OBJETOS.filter((o) => !o.delante).map((o, i) => (
            <ResplandorEsfera key={i} o={o} />
          ))}
        </Capa>

        {/* CAPA 1c: objetos que quedan detrás de las pantallas */}
        <Capa transformacion={transformacion}>
          {OBJETOS.filter((o) => !o.delante).map((o, i) => (
            <ObjetoSuelto key={i} o={o} />
          ))}
        </Capa>

        {/* CAPA 2a: resplandor y sombra de las esferas más cercanas */}
        <Capa transformacion={transformacion}>
          {OBJETOS.filter((o) => o.delante).map((o, i) => (
            <ResplandorEsfera key={i} o={o} />
          ))}
        </Capa>

        {/* CAPA 2b: objetos más cercanos (siempre por detrás de las pantallas) */}
        <Capa transformacion={transformacion}>
          {OBJETOS.filter((o) => o.delante).map((o, i) => (
            <ObjetoSuelto key={i} o={o} />
          ))}
        </Capa>
        {/* ÚLTIMA CAPA: las pantallas de cristal con la app real.
            Van las últimas a propósito: así NINGÚN objeto 3D se dibuja nunca encima de una pantalla */}
        <Capa transformacion={transformacion}>
          {/* introducción: tres perfiles de la app */}
          <Pantalla x={-1000} y={-30} z={-150} ry={20} escala={0.52} brilloColor={`${C.turquesa}99`}>
            <FotoApp archivo="perfil-docente.jpg" />
          </Pantalla>
          <Pantalla x={0} y={30} z={120} ry={0} escala={0.72} brilloColor={`${C.amarillo}99`}>
            <FotoApp archivo="perfil-alumno.jpg" />
          </Pantalla>
          <Pantalla x={1000} y={-30} z={-150} ry={-20} escala={0.52} brilloColor={`${C.naranja}99`}>
            <FotoApp archivo="perfil-empresa.jpg" />
          </Pantalla>

          {/* las tres vistas con más personalidad, con la app grabada dentro */}
          {(
            [
              ["red", C.amarillo],
              ["proyectos", C.naranja],
              ["recursos", C.rosa],
            ] as const
          ).map(([id, color]) => {
            const e = EST[id];
            return (
              <Pantalla key={id} x={e.x} y={e.y} z={e.z} ry={e.ry} brilloColor={`${color}99`}>
                <VideoApp clip={id} d={T[id].d} ancho={1440} alto={810} />
              </Pantalla>
            );
          })}

          {/* la versión móvil: un teléfono de cristal con la app grabada en el móvil */}
          <Pantalla x={EST.movil.x} y={EST.movil.y} z={EST.movil.z} ry={EST.movil.ry} brilloColor={`${C.turquesa}aa`} ancho={MOVIL_W} alto={MOVIL_H} movil>
            <VideoApp clip="movil" d={T.movil.d} ancho={MOVIL_W} alto={MOVIL_H} />
          </Pantalla>
        </Capa>

      </div>

      {/* viñeta oscura en los bordes */}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.5) 100%)", pointerEvents: "none" }} />

      {/* textos */}
      <TextoIntro fin={T.intro.fin} />
      <LogoVuelo d={T.intro.fin - 4} fin={T.red.d + 2} />
      {/* cada título cambia de frase justo cuando la voz empieza la segunda oración (ver VOZ_SEGUNDA en Sonido.tsx) */}
      <Titulo num="01" palabra="CONECTA" frase="Tu red en un mapa internacional" frase2="Docentes de otros países" cambio={T.red.d + 2 + VOZ_SEGUNDA.red} color={C.amarillo} d={T.red.d} fin={T.red.fin} />
      <Titulo num="02" palabra="COLABORA" frase="Proyectos colaborativos entre centros" frase2="Tablero, chat y habilidades validadas" cambio={T.proyectos.d + 2 + VOZ_SEGUNDA.proyectos} color={C.naranja} d={T.proyectos.d} fin={T.proyectos.fin} />
      <Titulo num="03" palabra="DESCUBRE" frase="Recursos didácticos" frase2="Fichas, presentaciones y vídeos" cambio={T.recursos.d + 2 + VOZ_SEGUNDA.recursos} color={C.rosa} d={T.recursos.d} fin={T.recursos.fin} />
      <Titulo num="04" palabra="EN TU MÓVIL" frase="Llévalo siempre contigo" frase2="Estés donde estés" cambio={T.movil.d + 2 + VOZ_SEGUNDA.movil} color={C.turquesa} d={T.movil.d} fin={T.movil.fin} lugar="izquierda" />
      <TextoCierre d={T.cierre.d - 12} fin={T.cierre.fin} />

      {/* número pequeño y discreto en la esquina inferior derecha */}
      <NumeroEsquina num="6" />

      {/* destello blanco en los vuelos */}
      <AbsoluteFill style={{ background: "#fff", opacity: destello, pointerEvents: "none" }} />

      {/* voz en off, música y efectos de sonido */}
      <Sonido />

      {/* fundido desde negro: el primer fotograma es negro del todo */}
      <AbsoluteFill
        style={{
          background: "#000",
          pointerEvents: "none",
          opacity: interpolate(f, [0, 24], [1, 0], { extrapolateRight: "clamp" }),
        }}
      />
    </AbsoluteFill>
  );
};

// El vídeo completo: un mundo 3D con pantallas de cristal (la app real) y objetos brillantes,
// y una cámara que vuela de una pantalla a la siguiente.
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, PERSPECTIVA } from "./marca";
import { EST, OBJETOS, camaraEn } from "./mundo";
import { T } from "./tiempos";
import { FotoApp, Pantalla, VideoApp } from "./componentes/Pantalla";
import { Telefono } from "./componentes/Telefono";
import { ObjetoSuelto } from "./componentes/Objetos";
import { LogoVuelo, TextoCierre, TextoIntro, Titulo } from "./componentes/Textos";

// Luces de color enormes al fondo del mundo (dan color al cristal)
const LUCES = Array.from({ length: 11 }, (_, i) => ({
  x: -1000 + i * 2200,
  y: i % 2 === 0 ? -350 : 350,
  color: [C.turquesa, C.azul, C.naranja, C.rosa][i % 4],
}));

// Una capa del mundo 3D. Hay tres (fondo, pantallas y objetos de delante) con la MISMA cámara.
// Van separadas a propósito: si las pantallas y los objetos comparten el mismo espacio 3D,
// el navegador los "parte" para ordenarlos y salen cortes y parpadeos.
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
  const transformacion = `translateZ(${acercar}px) rotateY(${-cam.yaw}deg) translate3d(${-cam.x}px, ${-cam.y}px, ${-cam.z}px)`;

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
          {OBJETOS.filter((o) => !o.delante).map((o, i) => (
            <ObjetoSuelto key={i} o={o} />
          ))}
        </Capa>

        {/* CAPA 2: las pantallas de cristal con la app real */}
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

          {/* pantallas de ordenador con la app grabada */}
          {(
            [
              ["inicio", C.turquesa],
              ["red", C.amarillo],
              ["proyectos", C.naranja],
              ["recursos", C.rosa],
              ["empleo", C.azul],
            ] as const
          ).map(([id, color]) => {
            const e = EST[id];
            return (
              <Pantalla key={id} x={e.x} y={e.y} z={e.z} ry={e.ry} brilloColor={`${color}99`}>
                <VideoApp clip={id} d={T[id].d} ancho={1440} alto={810} />
              </Pantalla>
            );
          })}

          {/* teléfonos con la versión móvil: cada uno va por una pestaña distinta */}
          <Telefono x={EST.movil.x} y={0} z={EST.movil.z} ry={0} d={T.movil.d} clip="movil" brilloColor={`${C.turquesa}99`} />
          <Telefono x={EST.movil.x - 560} y={50} z={EST.movil.z - 140} ry={16} d={T.movil.d} clip="movil" empezarEn={2.6} brilloColor={`${C.amarillo}99`} />
          <Telefono x={EST.movil.x + 560} y={50} z={EST.movil.z - 140} ry={-16} d={T.movil.d} clip="movil" empezarEn={4.4} brilloColor={`${C.naranja}99`} />
        </Capa>

        {/* CAPA 3: objetos que pasan por delante de las pantallas */}
        <Capa transformacion={transformacion}>
          {OBJETOS.filter((o) => o.delante).map((o, i) => (
            <ObjetoSuelto key={i} o={o} />
          ))}
        </Capa>
      </div>

      {/* viñeta oscura en los bordes */}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.5) 100%)", pointerEvents: "none" }} />

      {/* textos */}
      <TextoIntro fin={T.intro.fin} />
      <LogoVuelo d={T.intro.fin - 8} fin={T.inicio.d - 2} />
      <Titulo num="01" palabra="COMPARTE" frase="Publica ideas y recursos con tu claustro" color={C.turquesa} d={T.inicio.d} fin={T.inicio.fin} />
      <Titulo num="02" palabra="CONECTA" frase="Docentes de tu materia, en cualquier país" color={C.amarillo} d={T.red.d} fin={T.red.fin} />
      <Titulo num="03" palabra="COLABORA" frase="Proyectos con tablero y chat de equipo" color={C.naranja} d={T.proyectos.d} fin={T.proyectos.fin} />
      <Titulo num="04" palabra="DESCUBRE" frase="Recursos listos para usar en clase" color={C.rosa} d={T.recursos.d} fin={T.recursos.fin} />
      <Titulo num="05" palabra="TU EMPLEO" frase="Inscríbete en solo dos pasos" color={C.azul} d={T.empleo.d} fin={T.empleo.fin} />
      <Titulo num="06" palabra="EN TU MÓVIL" frase="Toda la app, siempre contigo" color={C.turquesa} d={T.movil.d} fin={T.movil.fin} />
      <TextoCierre d={T.cierre.d - 12} fin={T.cierre.fin} />

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

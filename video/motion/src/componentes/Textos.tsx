// Textos grandes que van por encima del vídeo (se entiende todo aunque no haya sonido).
import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FUENTE } from "../marca";

// Entrada con rebote suave: devuelve un número de 0 a 1
function entrada(frame: number, retraso: number, fps: number) {
  return spring({ frame: frame - retraso, fps, config: { damping: 14, stiffness: 120, mass: 0.8 } });
}

// Título de cada escena: número + palabra grande + frase corta, abajo a la izquierda.
export function Titulo({
  num,
  palabra,
  frase,
  frase2,
  cambio,
  color,
  d,
  fin,
  lugar = "abajo",
}: {
  num: string;
  palabra: string;
  frase: string;
  frase2: string; // segunda frase: sustituye a la primera cuando la voz empieza la segunda oración
  cambio: number; // fotograma en el que cambia de frase
  color: string;
  d: number; // cuándo empieza la escena
  fin: number; // cuándo termina la pausa
  // "abajo" = abajo a la izquierda; "izquierda" = a la izquierda y centrado en vertical, con el número
  // encima (en la escena del móvil, para que el teléfono pueda ir centrado y grande)
  lugar?: "abajo" | "izquierda";
}) {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = entrada(f, d + 4, fps);
  const salida = interpolate(f, [fin - 8, fin], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const visible = f >= d && f <= fin + 1;
  if (!visible) return null;
  return (
    <div
      style={{
        position: "absolute",
        ...(lugar === "abajo"
          ? { left: 224, bottom: 34, alignItems: "center", gap: 24, padding: "16px 36px 16px 16px" }
          : { left: 90, top: 540, flexDirection: "column" as const, alignItems: "flex-start", gap: 18, padding: "22px 34px 26px 22px", marginTop: -150 }),
        display: "flex",
        borderRadius: 28,
        background: "rgba(4,31,56,0.78)",
        border: "2px solid rgba(255,255,255,0.28)",
        backdropFilter: "blur(14px)",
        fontFamily: FUENTE,
        opacity: e * salida,
        transform: `translateY(${(1 - e) * 50}px)`,
        boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
      }}
    >
      <div
        style={{
          width: 88,
          height: 88,
          borderRadius: 22,
          background: color,
          color: C.marino,
          fontSize: 44,
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {num}
      </div>
      <div>
        <div style={{ fontSize: 58, lineHeight: 1.05, fontWeight: 800, color: C.blanco, letterSpacing: 1 }}>{palabra}</div>
        {/* la frase cambia (con un pequeño rebote) cuando la voz pasa a la segunda oración */}
        <div
          style={{
            marginTop: 6,
            fontSize: 30,
            lineHeight: 1.2,
            fontWeight: 600,
            color: f >= cambio ? C.blanco : C.texto,
            transform: f >= cambio ? `translateY(${(1 - entrada(f, cambio, fps)) * 18}px)` : undefined,
          }}
        >
          {f >= cambio ? frase2 : frase}
        </div>
      </div>
    </div>
  );
}

// Introducción: DOCENTES · ALUMNOS · EMPRESAS y la pregunta
export function TextoIntro({ fin }: { fin: number }) {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const palabras = [
    // cada palabra sale justo cuando la voz la dice
    { t: "DOCENTES", c: C.turquesaClaro, r: 16 },
    { t: "ALUMNOS", c: C.amarillo, r: 36 },
    { t: "EMPRESAS", c: C.naranja, r: 54 },
  ];
  const pregunta = entrada(f, 84, fps); // aparece cuando la voz dice "...por fin conectados"
  const salida = interpolate(f, [fin - 10, fin], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: FUENTE, opacity: salida }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 96, textAlign: "center" }}>
        <div
          style={{
            display: "inline-block",
            fontSize: 92,
            fontWeight: 800,
            color: C.blanco,
            lineHeight: 1.1,
            opacity: pregunta,
            transform: `translateY(${(1 - pregunta) * 40}px) scale(${0.92 + pregunta * 0.08})`,
          }}
        >
          ¿Y si estuvieran <span style={{ color: C.turquesaClaro }}>conectados</span>?
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 110, display: "flex", justifyContent: "center", gap: 70 }}>
        {palabras.map((p) => {
          const e = entrada(f, p.r, fps);
          return (
            <div
              key={p.t}
              style={{
                fontSize: 84,
                fontWeight: 800,
                color: p.c,
                opacity: e,
                transform: `translateY(${(1 - e) * 60}px) scale(${0.8 + e * 0.2})`,
                textShadow: "0 8px 30px rgba(0,0,0,0.5)",
              }}
            >
              {p.t}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Logo grande que aparece mientras la cámara viaja de la introducción a la primera pantalla
export function LogoVuelo({ d, fin }: { d: number; fin: number }) {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = entrada(f, d, fps);
  const op = interpolate(f, [d, d + 6, fin - 10, fin], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  if (f < d || f > fin) return null;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        fontFamily: FUENTE,
        opacity: op,
        background: "radial-gradient(ellipse at center, rgba(2,12,24,0.78) 0%, rgba(2,12,24,0.25) 70%)",
      }}
    >
      <Img
        src={staticFile("linkedu-completo-blanco.svg")}
        style={{ width: 820, transform: `scale(${0.8 + e * 0.2})`, filter: "drop-shadow(0 0 40px rgba(33,188,170,0.8))" }}
      />
    </div>
  );
}

// Final: logo y el lema en tres etiquetas de color
export function TextoCierre({ d, fin }: { d: number; fin: number }) {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const op = interpolate(f, [d, d + 8, fin - 4, fin], [0, 1, 1, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  if (f < d) return null;
  const lema = [
    // r = fotograma (desde que empieza el cierre) en el que la voz dice cada palabra
    { t: "CONECTA.", c: C.turquesa, r: 36 },
    { t: "APRENDE.", c: C.amarillo, r: 57 },
    { t: "CRECE.", c: C.naranja, r: 80 },
  ];
  const logo = entrada(f, d, fps);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 44,
        fontFamily: FUENTE,
        opacity: op,
        background: "radial-gradient(ellipse at center, rgba(2,12,24,0.4) 0%, rgba(2,12,24,0.05) 70%)",
      }}
    >
      <Img
        src={staticFile("linkedu-completo-blanco.svg")}
        style={{ width: 700, transform: `scale(${0.85 + logo * 0.15})`, opacity: logo, filter: "drop-shadow(0 0 40px rgba(33,188,170,0.8))" }}
      />
      <div style={{ display: "flex", gap: 28 }}>
        {lema.map((l) => {
          const e = entrada(f, d + l.r, fps);
          return (
            <div
              key={l.t}
              style={{
                padding: "14px 40px",
                borderRadius: 24,
                background: l.c,
                color: C.marino,
                fontSize: 74,
                fontWeight: 800,
                opacity: e,
                transform: `translateY(${(1 - e) * 60}px) rotate(${(1 - e) * -6}deg) scale(${0.8 + e * 0.2})`,
                boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
              }}
            >
              {l.t}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Número pequeño en la esquina inferior derecha, discreto, durante todo el vídeo
// (mismo estilo que los números de los títulos: cuadrado redondeado y Sora extra negrita).
export function NumeroEsquina({ num }: { num: string }) {
  return (
    <div
      style={{
        position: "absolute",
        right: 36,
        bottom: 32,
        width: 46,
        height: 46,
        borderRadius: 12,
        background: "rgba(4,31,56,0.45)",
        border: "1.5px solid rgba(255,255,255,0.22)",
        color: C.blanco,
        fontFamily: FUENTE,
        fontSize: 24,
        fontWeight: 800,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.4,
        pointerEvents: "none",
      }}
    >
      {num}
    </div>
  );
}

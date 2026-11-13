// Panel de cristal en 3D con la app REAL dentro (grabación de pantalla o foto fija).
import React from "react";
import { Freeze, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { APP_H, APP_W, MARCO } from "../marca";
import { CLIPS, FPS, type NombreClip } from "../tiempos";

// Cuántos fotogramas antes de que llegue la cámara se monta el vídeo (así ya está cargado)
const ANTES = 100;
// El vídeo empieza a moverse 10 fotogramas antes de que la cámara se pare
const ADELANTO = 10;

// Reproduce un vídeo de la app y, cuando termina, se queda en el último fotograma.
export function VideoApp({
  clip,
  d,
  ancho,
  alto,
  empezarEn = 0,
}: {
  clip: NombreClip;
  d: number; // fotograma donde la cámara se para delante de esta pantalla
  ancho: number;
  alto: number;
  empezarEn?: number; // segundos de la grabación por los que empezar
}) {
  return (
    <Sequence from={d - ANTES} layout="none">
      <ReproductorVideo clip={clip} ancho={ancho} alto={alto} retraso={ANTES - ADELANTO} empezarEn={empezarEn} />
    </Sequence>
  );
}

function ReproductorVideo({
  clip,
  ancho,
  alto,
  retraso,
  empezarEn,
}: {
  clip: NombreClip;
  ancho: number;
  alto: number;
  retraso: number;
  empezarEn: number;
}) {
  const f = useCurrentFrame();
  const c = CLIPS[clip];
  const saltar = Math.round(empezarEn * FPS); // fotogramas de la grabación que nos saltamos
  const ultimo = Math.floor((c.dur * FPS - saltar) / c.tasa) - 2;
  const local = Math.max(0, Math.min(f - retraso, ultimo));
  return (
    <Freeze frame={local}>
      <OffthreadVideo
        src={staticFile(`grabaciones/${c.archivo}`)}
        playbackRate={c.tasa}
        trimBefore={saltar}
        muted
        style={{ width: ancho, height: alto, display: "block" }}
      />
    </Freeze>
  );
}

// Reflejo de luz que cruza el cristal
const brillo: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  background: "linear-gradient(115deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 30%)",
};

export function Pantalla({
  x,
  y,
  z,
  ry,
  escala = 1,
  brilloColor,
  children,
}: {
  x: number;
  y: number;
  z: number;
  ry: number;
  escala?: number;
  brilloColor: string; // color de la luz que sale del cristal
  children: React.ReactNode; // lo que se ve dentro (APP_W x APP_H)
}) {
  const W = APP_W + MARCO * 2;
  const H = APP_H + MARCO * 2;
  return (
    <div
      style={{
        position: "absolute",
        left: -W / 2,
        top: -H / 2,
        width: W,
        height: H,
        transformStyle: "preserve-3d",
        transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(${ry}deg) scale(${escala})`,
      }}
    >
      {/* cristal */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: MARCO,
          boxSizing: "border-box",
          borderRadius: 38,
          background: "rgba(255,255,255,0.2)",
          border: "2px solid rgba(255,255,255,0.6)",
          backdropFilter: "blur(18px)",
          boxShadow: `0 50px 100px rgba(0,0,0,0.55), 0 0 110px ${brilloColor}`,
        }}
      >
        <div style={{ position: "relative", width: APP_W, height: APP_H, borderRadius: 24, overflow: "hidden", background: "#0b2a46" }}>
          {children}
          <div style={brillo} />
        </div>
      </div>
    </div>
  );
}

// Foto fija de la app (pantallas de perfil)
export function FotoApp({ archivo }: { archivo: string }) {
  return <Img src={staticFile(`grabaciones/${archivo}`)} style={{ width: APP_W, height: APP_H, display: "block" }} />;
}

// Teléfono de cristal en 3D con la app en versión móvil dentro (grabación real).
import React from "react";
import { VideoApp } from "./Pantalla";
import type { NombreClip } from "../tiempos";

const W = 390;
const H = 844;
const BORDE = 14;

export function Telefono({
  x,
  y,
  z,
  ry,
  d,
  clip,
  empezarEn = 0,
  brilloColor,
}: {
  x: number;
  y: number;
  z: number;
  ry: number;
  d: number;
  clip: NombreClip;
  empezarEn?: number;
  brilloColor: string;
}) {
  const TW = W + BORDE * 2;
  const TH = H + BORDE * 2;
  return (
    <div
      style={{
        position: "absolute",
        left: -TW / 2,
        top: -TH / 2,
        width: TW,
        height: TH,
        transformStyle: "preserve-3d",
        transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(${ry}deg)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: BORDE,
          boxSizing: "border-box",
          borderRadius: 66,
          background: "rgba(255,255,255,0.22)",
          border: "2px solid rgba(255,255,255,0.65)",
          backdropFilter: "blur(18px)",
          boxShadow: `0 50px 100px rgba(0,0,0,0.55), 0 0 100px ${brilloColor}`,
        }}
      >
        <div style={{ position: "relative", width: W, height: H, borderRadius: 54, overflow: "hidden", background: "#0b2a46" }}>
          <VideoApp clip={clip} d={d} ancho={W} alto={H} empezarEn={empezarEn} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: "linear-gradient(115deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 30%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

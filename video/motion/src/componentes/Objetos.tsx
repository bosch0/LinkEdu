// Objetos 3D llamativos hechos con CSS 3D: cubos con icono, esferas brillantes y anillos.
// Giran y flotan solos según el fotograma, así el vídeo se ve igual cada vez que se exporta.
import React from "react";
import { useCurrentFrame } from "remotion";
import { FiMessageCircle, FiBriefcase, FiUsers, FiBookOpen, FiMapPin, FiAward } from "react-icons/fi";
import type { Objeto } from "../mundo";

const ICONOS = [FiMessageCircle, FiBriefcase, FiUsers, FiBookOpen, FiMapPin, FiAward];

// Tonos de cada color: [frente claro, frente oscuro, lado derecho, lado izquierdo, tapa, base, brillo de la esfera]
const PALETA = {
  turquesa: ["#4fe0cf", "#21bcaa", "#159484", "#1aa595", "#9bf4e8", "#0e6f64", "#d8fff9"],
  naranja: ["#ffb866", "#ff8a1f", "#d9690b", "#e87a14", "#ffdcb0", "#9c4a05", "#fff0dc"],
  amarillo: ["#ffe27a", "#ffc414", "#d9a600", "#ecbb14", "#fff2b0", "#9a7400", "#fffbe0"],
  rosa: ["#ff8fb1", "#ff4f81", "#c23a65", "#e0457b", "#ffc6d6", "#8e1d44", "#ffe6ee"],
  azul: ["#8fbaff", "#4b94ff", "#2f66c4", "#3a7ae0", "#cfe2ff", "#1f4a94", "#eaf2ff"],
};

const cara: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "inset 0 0 0 3px rgba(255,255,255,0.22)",
};

function Cubo({ o }: { o: Objeto }) {
  const f = useCurrentFrame();
  const p = PALETA[o.color];
  const s = o.tam;
  const Icono = ICONOS[o.icono % ICONOS.length];
  const icono = <Icono size={s * 0.5} color="#ffffff" strokeWidth={2.2} />;
  const giroY = f * 0.8 + o.semilla * 57;
  const giroX = -22 + Math.sin(f / 45 + o.semilla) * 16;
  const medio = s / 2;
  return (
    <div
      style={{
        position: "absolute",
        left: -medio,
        top: -medio,
        width: s,
        height: s,
        transformStyle: "preserve-3d",
        transform: `translate3d(${o.x}px, ${o.y + Math.sin(f / 30 + o.semilla) * 22}px, ${o.z}px) rotateX(${giroX}deg) rotateY(${giroY}deg)`,
      }}
    >
      <div style={{ ...cara, background: `linear-gradient(135deg, ${p[0]}, ${p[1]})`, transform: `translateZ(${medio}px)` }}>{icono}</div>
      <div style={{ ...cara, background: p[2], transform: `rotateY(90deg) translateZ(${medio}px)` }}>{icono}</div>
      <div style={{ ...cara, background: `linear-gradient(135deg, ${p[0]}, ${p[1]})`, transform: `rotateY(180deg) translateZ(${medio}px)` }}>{icono}</div>
      <div style={{ ...cara, background: p[3], transform: `rotateY(-90deg) translateZ(${medio}px)` }}>{icono}</div>
      <div style={{ ...cara, background: p[4], transform: `rotateX(90deg) translateZ(${medio}px)` }} />
      <div style={{ ...cara, background: p[5], transform: `rotateX(-90deg) translateZ(${medio}px)` }} />
    </div>
  );
}

function Esfera({ o }: { o: Objeto }) {
  const f = useCurrentFrame();
  const p = PALETA[o.color];
  const s = o.tam * 0.8;
  return (
    <div
      style={{
        position: "absolute",
        left: -s / 2,
        top: -s / 2,
        width: s,
        height: s,
        borderRadius: "50%",
        background: `radial-gradient(circle at 32% 28%, ${p[6]} 0%, ${p[0]} 22%, ${p[1]} 58%, ${p[5]} 100%)`,
        boxShadow: `0 ${s * 0.25}px ${s * 0.3}px -${s * 0.1}px rgba(0,0,0,0.5), 0 0 ${s * 0.5}px ${p[1]}55`,
        transform: `translate3d(${o.x}px, ${o.y + Math.sin(f / 34 + o.semilla) * 26}px, ${o.z}px)`,
      }}
    />
  );
}

function Anillo({ o }: { o: Objeto }) {
  const f = useCurrentFrame();
  const p = PALETA[o.color];
  const s = o.tam;
  return (
    <div
      style={{
        position: "absolute",
        left: -s / 2,
        top: -s / 2,
        width: s,
        height: s,
        borderRadius: "50%",
        background: `conic-gradient(${p[1]}, ${p[6]}, ${p[2]}, ${p[0]}, ${p[1]})`,
        WebkitMask: "radial-gradient(circle, transparent 36%, #000 38%)",
        mask: "radial-gradient(circle, transparent 36%, #000 38%)",
        transform: `translate3d(${o.x}px, ${o.y + Math.sin(f / 40 + o.semilla) * 20}px, ${o.z}px) rotateX(${58 + Math.sin(f / 50 + o.semilla) * 14}deg) rotateY(${f * 1.2 + o.semilla * 40}deg)`,
      }}
    />
  );
}

export function ObjetoSuelto({ o }: { o: Objeto }) {
  if (o.tipo === "cubo") return <Cubo o={o} />;
  if (o.tipo === "esfera") return <Esfera o={o} />;
  return <Anillo o={o} />;
}

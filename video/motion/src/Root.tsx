import React from "react";
import { Composition } from "remotion";
import { Video } from "./Video";
import { ALTO, ANCHO } from "./marca";
import { FPS, TOTAL } from "./tiempos";

export const Root: React.FC = () => (
  <Composition id="LinkEdu" component={Video} durationInFrames={TOTAL} fps={FPS} width={ANCHO} height={ALTO} />
);

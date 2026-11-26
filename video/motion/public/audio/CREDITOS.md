# Créditos del audio

| Archivo | De dónde sale | Licencia |
|---|---|---|
| `voz-completa.mp3` | Voz en off completa, generada **de una vez** con ElevenLabs (Text to Speech, modelo `eleven_v4`, voz "Martin Osborne - Polished and Energetic") desde la cuenta de Iván el 17-11-2026 | Los términos de uso dependen del plan de la cuenta de ElevenLabs (la cuenta es gratuita). **Revisarlos antes de publicar el vídeo** |
| `voz-intro-pregunta.mp3`, `voz-intro-logo.mp3`, `voz-red.mp3`, `voz-proyectos.mp3`, `voz-recursos.mp3`, `voz-cierre.mp3` | Tramos cortados de `voz-completa.mp3` con ffmpeg (por los silencios entre frases) y acelerados un 10 % | Igual que la voz |
| `voz-movil-original.mp3` | Frase de la escena del móvil, generada **aparte** el 26-11-2026 con la misma voz ("Martin Osborne - Polished and Energetic") y modelo (`eleven_v4`), estabilidad 0 y similitud 75. Se generaron dos tomas y se eligió la 2 | Igual que la voz |
| `voz-movil.mp3` | `voz-movil-original.mp3` sin el silencio del final y acelerada un 10 % (`atempo=1.1`) | Igual que la voz |
| `whoosh.wav`, `clic.wav`, `ping-mapa.wav`, `panel.wav`, `impacto.wav`, `pop.wav`, `destello.wav`, `ficha.wav` | Generados con ElevenLabs Sound Effects (modelo v3) con una descripción para cada uno (ver abajo). Se eligió la variante 1 de cada una, se recortó el silencio inicial y se subió el volumen | Igual que la voz |
| `musica.wav` | Compuesta con código (`scripts/musica.mjs`): electrónica a 120 BPM en La menor | Propia del proyecto, sin licencia externa |

## Descripciones usadas en ElevenLabs Sound Effects

- `whoosh`: *Fast cinematic whoosh with a glassy shimmer tail, camera fly-through transition, airy and modern, tech product video*
- `clic`: *Soft crisp mouse click with a subtle tactile plastic feel, modern UI interaction, very short*
- `ping-mapa`: *Soft digital sonar ping with a gentle echo, connection established, futuristic network interface*
- `ficha`: *A paper card sliding across a board and landing with a soft tap, tactile, short*
- `panel`: *Glass panel opening pop with an airy swoosh, UI window appearing, soft and polished*
- `impacto`: *Cinematic logo reveal: soft deep boom with a bright shimmering sparkle tail, modern tech brand sting*
- `destello`: *Magical bright sparkle chime, three quick ascending glassy bell notes*
- `pop`: *Playful bubble pop with a soft whoosh, title text appearing, bouncy and short*

## Nota sobre la música

Se probó a generar la música con ElevenLabs Music (se generaron dos pistas), pero **descargarla exige
una suscripción de pago**, así que se compuso la pista con código. Si más adelante se quiere una música
más trabajada, hay dos caminos: suscribirse a ElevenLabs (y descargar una pista) o usar una pista libre
de bibliotecas como Pixabay (ver `../../../investigacion.md`). Solo habría que sustituir `musica.wav`
y ajustar `INICIO_MUSICA` en `src/componentes/Sonido.tsx`.

# Investigación: vídeo promocional de app con motion graphics

Notas de la investigación del 13 de noviembre de 2026. La mayoría de fuentes
son blogs de empresas de vídeo y de herramientas, así que son **buenas
prácticas habituales, no normas oficiales**.

## Qué hacen los vídeos buenos

1. **Estructura corta**: gancho → problema → la app en acción → llamada a la
   acción. Con unos 6 planos basta. Duración habitual: 30–90 s.
2. **Se enseña la app real.** Los gráficos en movimiento enmarcan la interfaz
   de verdad, no la sustituyen. La mezcla "grabación + motion graphics + texto"
   funciona mejor que la grabación sola.
3. **Funciona sin sonido**: muchos vídeos se ven en mute. Por eso cada escena
   lleva un título corto y textos de apoyo (callouts) alrededor de la pantalla.
4. **Se dirige la mirada**: zoom a lo pequeño que no se lee, foco (oscurecer
   todo menos un elemento), anillos que laten, cursor animado que hace clic.
5. **Sincronía con la voz**: el zoom empieza justo antes de nombrar el
   elemento y termina antes del clic.
6. **Ritmo**: 24–30 fps; ningún texto menos de 0,3 s en pantalla (mejor 1 s o
   más para frases).
7. **Una historia, varios cortes**: un vídeo largo para la web y otro corto
   para redes (más agresivo al principio).

## Qué aplicamos en LinkEdu

| Idea | Cómo lo hacemos |
|---|---|
| App real | Grabaciones de la web app en Chrome (1920×1080), sin los botones de cambio de rol |
| Zoom y foco | Componentes de Remotion que hacen zoom, oscurecen el fondo y resaltan un recuadro |
| Cursor | Cursor animado con clic (onda) sobre los botones importantes |
| Textos | Título corto por escena + callouts que salen con rebote |
| Marca | Marino `#073157`, turquesa `#21bcaa`, logos de `design/assets/logo/` |
| Sin mute | Todo el mensaje se entiende solo con los textos |

## Voz: ElevenLabs v4 (verificado en la web de ElevenLabs)

- Modelo: `eleven_v4` (calidad, para contenido producido). Existe también
  `eleven_v4_turbo` (tiempo real, para agentes; no nos hace falta).
- Soporta español (90+ idiomas) y hasta 10.000 caracteres por petición.
- **Etiquetas de audio** entre corchetes para dirigir la voz: `[warm]`,
  `[excited]`, `[whispers]`, `[long pause]`... Las pausas con `<break>` (SSML)
  **no funcionan** en v4: hay que usar etiquetas o frases.
- Endpoint: `POST https://api.elevenlabs.io/v1/text-to-speech/{voice_id}` con
  la cabecera `xi-api-key`. Campos útiles: `text`, `model_id`,
  `voice_settings` (stability, speed...), `seed`, `previous_text`/`next_text`
  (para que el tono siga igual entre escenas), `output_format`.
- La API de efectos de sonido (`POST /v1/sound-generation`) permite generar
  efectos con texto (de 0,5 a 30 s). También sirve para los efectos del vídeo.
- Pendiente de comprobar: qué plan hace falta para uso comercial y si hay
  que dar atribución. **Mirar los términos del plan antes de publicar.**

## Música y efectos

- **Efectos** (whoosh, pop, clic, impacto del logo): se pueden generar con
  ElevenLabs o bajar de bibliotecas gratuitas.
- **Música**: pista instrumental moderna, con ritmo, que no tape la voz.
- **Pixabay**: según su FAQ, música y efectos son gratis para uso comercial
  sin atribución (hay que revisar cada archivo si sale gente o marcas).
- Cuidado con las **previsualizaciones** de bibliotecas de pago (p. ej.
  TunePocket): solo valen para escuchar, no tienen licencia de uso.
- Guardar siempre en `video/motion/public/audio/` y anotar en
  `video/motion/public/audio/CREDITOS.md` de dónde sale cada archivo y su
  licencia (para la memoria del concurso).

## Mezcla de audio en Remotion

- Para proyectos nuevos Remotion recomienda `<Audio>` de `@remotion/media`
  (el `<Audio>` antiguo ahora se llama `<Html5Audio>`).
- El volumen es un número entre 0 y 1; para bajar la música mientras habla la
  voz ("ducking") se calcula el volumen según el fotograma con
  `interpolate()`.
- Cada audio va dentro de una `<Sequence>` para empezar en el fotograma justo.
- Música de fondo: sobre 0,20–0,30 de volumen; voz a 1; efectos 0,5–0,8.

## Fuentes

- [Mobile App Promo Video Playbook (Adwave)](https://adwave.com/resources/mobile-app-promo-video)
- [How to make an app promo video (ChatCut)](https://chatcut.io/blog/how-to-make-an-app-promo-video)
- [17 Best Mobile App Promo Videos (B2W)](https://b2w.tv/blog/app-demo-videos)
- [Zoom effects to guide attention (CapCut)](https://www.capcut.com/create/zoom-effects-for-tutorial-videos-guide-attention)
- [Remotion product demo (StealThis)](https://stealthis-www.pages.dev/r/remotion-product-demo)
- [Eleven v4 (ElevenLabs)](https://elevenlabs.io/v4)
- [Create speech (ElevenLabs API)](https://elevenlabs.io/docs/api-reference/text-to-speech/convert)
- [Sound effects (ElevenLabs API)](https://elevenlabs.io/docs/api-reference/text-to-sound-effects/convert)
- [Audio en Remotion](https://www.remotion.dev/docs/audio)
- [Pixabay FAQ](https://pixabay.com/service/faq/)

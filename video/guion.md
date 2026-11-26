# Guion del vídeo (unos 43 segundos)

**Formato:** 1920×1080, 30 fps, **unos 1280 fotogramas = 42,7 s** (el vídeo puede durar hasta
1 minuto) · **Idioma:** español · **Voz:** ElevenLabs `eleven_v4`, voz "Martin Osborne - Polished
and Energetic" (español peninsular), generada de una vez y cortada en tramos · **Sonido:** voz en off
casi continua + música + efectos · **Sin URL** (es para el concurso del instituto).

## Objetivo

Que el vídeo sea **muy llamativo y dinámico** (nada plano) para ganar votos en el concurso de diseño
de interfaces del instituto. Lo ve gente muy distinta (marketing, DAW, profesores, alumnos), así que:

- **Se centra en las tres vistas con más personalidad propia:** el mapa de red
  internacional, los proyectos colaborativos entre centros y el repositorio de
  recursos didácticos. **Después enseña la versión móvil** en un teléfono de cristal.
- **Se habla durante casi todo el vídeo:** la voz explica cada pantalla con dos frases.
- **Se entiende sin sonido**: cada escena tiene un título enorme con su número, y la frase de
  apoyo cambia cuando la voz pasa a la segunda oración.
- **Se ve la app real**: son grabaciones de la web app con un cursor que hace
  clic de verdad, dentro de paneles de cristal en 3D. Las de ordenador se graban en una
  **pantalla estándar de 1920 × 1080** (así la cabecera y la foto de perfil se ven como en un
  ordenador normal) y la del móvil en un teléfono de 390 × 844 tocando con el dedo.
- **Ritmo rápido:** los vuelos de cámara entre pantallas duran menos de medio segundo (se inclinan,
  se alejan a mitad de camino y llevan un destello), y dentro de cada escena la cámara se mueve
  suavemente como en la mano.
- **Se ve de cerca y centrado lo que se cuenta:** dentro de cada escena la cámara va de un punto de
  interés a otro (lo que dice la voz o donde se hace clic), lo deja en el centro y con mucho zoom.
  No se ve toda la pantalla a la vez, para no saturar.
- **Los objetos 3D nunca tapan las pantallas:** siempre quedan por detrás.

## Estilo: "Estudio de producto" + "Cristal"

(Elegido por Iván entre 5 propuestas, mezcla de la 01 y la 03.)

- **Fondo oscuro** azul marino con luces de color (turquesa, naranja, rosa).
- **Paneles de cristal** con la app dentro, en perspectiva 3D.
- **Objetos 3D llamativos** que giran y flotan: cubos con iconos, esferas
  brillantes y anillos. **No se atraviesan entre sí** y el resplandor de las
  esferas ya no se corta en cuadrado.
- **Tipografía:** Sora (negrita), con títulos grandes abajo a la izquierda.

## Escenas y voz en off

Todo el texto se generó de una vez (con una línea en blanco entre bloques) y luego se cortó en
tramos por los silencios. La frase del móvil se generó aparte (26-11-2026) con la misma voz y el
mismo modelo. Cada tramo se acelera un 10 % (filtro `atempo` de ffmpeg) para que el ritmo sea ágil.

| # | Tiempo | Qué pasa | Texto en pantalla | Voz |
|---|---|---|---|---|
| 1 | 0–4,4 s | Tres perfiles de la app (docente, alumno, empresa) entre objetos 3D | DOCENTES · ALUMNOS · EMPRESAS (cada palabra, cuando la voz la dice) · ¿Y SI ESTUVIERAN CONECTADOS? | `[excited] ¿Y si docentes, alumnos y empresas estuvieran por fin... conectados?` |
| 2 | 4,4–5,9 s | Vuelo con el logo grande (el más largo) | Logo | `Esto es LinkEdu.` |
| 3 | 5,9–13,5 s | **Mi red**: mapa del mundo; zoom a Argentina, vuelta al mapa global y zoom a Reino Unido | 01 CONECTA · "Tu red en un mapa internacional" → "Docentes de otros países" | `Explora tu red en un mapa internacional. Conecta con docentes de otros países y descubre contactos recomendados en cualquier parte del mundo.` |
| 4 | 14–21,9 s | **Proyectos**: se abre el tablero y se pasan dos tareas de columna | 02 COLABORA · "Proyectos colaborativos entre centros" → "Tablero, chat y habilidades validadas" | `Crea proyectos colaborativos entre centros. Organiza las tareas en un tablero, chatea con tu equipo y valida las habilidades de cada compañero.` |
| 5 | 22,4–29,9 s | **Recursos**: filtro por tipo, vista previa de un recurso y "Favorito" (se guarda en favoritos) | 03 DESCUBRE · "Recursos didácticos" → "Fichas, presentaciones y vídeos" | `Comparte y descubre recursos didácticos: fichas, presentaciones y vídeos creados por otros docentes, listos para usar en tu aula.` |
| 6 | 30,4–38,6 s | **Móvil**: un teléfono de cristal con la app, grande y centrado (zoom de 2×); se desliza el inicio y se navega con las pestañas de abajo (Mi red, Proyectos, Recursos) | 04 EN TU MÓVIL (a la izquierda, centrado en vertical) · "Llévalo siempre contigo" → "Estés donde estés" | `Y llévalo SIEMPRE contigo. LinkEdu también está pensado para tu móvil... para que conectes, colabores y descubras, estés donde estés.` |
| 7 | 39,3–42,7 s | Logo y el lema en tres etiquetas de color | CONECTA. APRENDE. CRECE. (cada una, cuando la voz la dice) | `[excited] LinkEdu. Conecta. Aprende. Crece.` |

Los tiempos salen de `motion/src/tiempos.ts`: cada escena dura lo que dura su tramo de voz más
unos fotogramas de margen, y los vuelos duran 14 fotogramas (el del logo, 45; el del cierre, 22).

## Música y efectos de sonido

- **Música:** electrónica a 120 BPM compuesta con código (`motion/scripts/musica.mjs`). Entra
  suave, el ritmo arranca con el primer vuelo de cámara y tiene su golpe final (segundo 38 de la
  pista) cuando entra el logo de cierre. Baja de volumen sola mientras habla la voz.
- **Efectos propios para cada acción** (ElevenLabs Sound Effects, no genéricos):
  - whoosh de cristal en cada vuelo de cámara
  - clic suave en cada clic del cursor, sincronizado con la grabación
  - ping de sónar al elegir un país en el mapa
  - ficha de papel que se desliza al mover una tarea del tablero
  - panel de cristal que se abre con el tablero y con la vista previa
  - destello al guardar en favoritos y en la última palabra del lema
  - pop cuando sale cada texto, y golpe de logo en el cierre

## Cómo se escribió la voz (guía de ElevenLabs para v4)

Siguiendo las [buenas prácticas de ElevenLabs](https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices#prompting-eleven-v4):

- No se usan pausas `<break>` (v4 no las admite): las pausas se hacen con `...`, con la puntuación y
  con líneas en blanco.
- Etiquetas de voz entre corchetes (`[excited]`) que describen el tono y no cambian las palabras.
  No se usan etiquetas de efectos (`[applause]`...).
- Las **mayúsculas** dan énfasis a una palabra (`SIEMPRE` en la frase del móvil).
- Cada frase tiene dos oraciones separadas por un punto: el silencio entre ellas sirve para cambiar
  la frase del título en el momento justo.
- Se generan varias tomas y se elige la mejor (para el móvil se generaron dos).
- Se eligió una voz cuyo carácter encaja con un vídeo dinámico (enérgica y pulida).

## Reglas

- **No deben salir los botones** que cambian entre profesor, alumno y empresa.
  El script de grabación los oculta solo (ver `motion/scripts/grabar.mjs`).
- No se promociona ninguna dirección web.
- El vídeo puede durar **hasta 1 minuto** (ahora unos 43 s). Si se cambia algo, comprobar la duración del `.mp4` final.

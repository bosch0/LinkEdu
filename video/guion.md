# Guion del vídeo (unos 34 segundos)

**Formato:** 1920×1080, 30 fps, **unos 1019 fotogramas = 33,97 s** (el vídeo debe durar entre
30 y 35 s) · **Idioma:** español · **Voz:** ElevenLabs `eleven_v4`, voz "Martin Osborne - Polished
and Energetic" (español peninsular), generada de una vez y cortada en tramos · **Sonido:** voz en off
casi continua + música + efectos · **Sin URL** (es para el concurso del instituto).

## Objetivo

Que el vídeo sea **muy llamativo y dinámico** (nada plano) para ganar votos en el concurso de diseño
de interfaces del instituto. Lo ve gente muy distinta (marketing, DAW, profesores, alumnos), así que:

- **Se centra en las tres vistas con más personalidad propia:** el mapa de red
  internacional, los proyectos colaborativos entre centros y el repositorio de
  recursos didácticos.
- **Se habla durante casi todo el vídeo:** la voz explica cada pantalla con dos frases.
- **Se entiende sin sonido**: cada escena tiene un título enorme con su número, y la frase de
  apoyo cambia cuando la voz pasa a la segunda oración.
- **Se ve la app real**: son grabaciones de la web app con un cursor que hace
  clic de verdad, dentro de paneles de cristal en 3D.
- **Ritmo rápido:** los vuelos de cámara entre pantallas duran menos de medio segundo (se inclinan,
  se alejan a mitad de camino y llevan un destello), y dentro de cada escena la cámara se acerca a
  cada clic del cursor y se mueve suavemente como en la mano.

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
tramos por los silencios. Cada tramo se acelera un 10 % (filtro `atempo` de ffmpeg) para que todo quepa en 35 s.

| # | Tiempo | Qué pasa | Texto en pantalla | Voz |
|---|---|---|---|---|
| 1 | 0–4,4 s | Tres perfiles de la app (docente, alumno, empresa) entre objetos 3D | DOCENTES · ALUMNOS · EMPRESAS (cada palabra, cuando la voz la dice) · ¿Y SI ESTUVIERAN CONECTADOS? | `[excited] ¿Y si docentes, alumnos y empresas estuvieran por fin... conectados?` |
| 2 | 4,4–5,9 s | Vuelo con el logo grande (el más largo) | Logo | `Esto es LinkEdu.` |
| 3 | 5,9–13,5 s | **Mi red**: mapa del mundo; zoom a Argentina, vuelta al mapa global y zoom a Reino Unido | 01 CONECTA · "Tu red en un mapa internacional" → "Docentes de otros países" | `Explora tu red en un mapa internacional. Conecta con docentes de otros países y descubre contactos recomendados en cualquier parte del mundo.` |
| 4 | 14–21,9 s | **Proyectos**: se abre el tablero y se pasan dos tareas de columna | 02 COLABORA · "Proyectos colaborativos entre centros" → "Tablero, chat y habilidades validadas" | `Crea proyectos colaborativos entre centros. Organiza las tareas en un tablero, chatea con tu equipo y valida las habilidades de cada compañero.` |
| 5 | 22,4–29,9 s | **Recursos**: filtro por tipo, vista previa de un recurso y "En favoritos" | 03 DESCUBRE · "Recursos didácticos" → "Fichas, presentaciones y vídeos" | `Comparte y descubre recursos didácticos: fichas, presentaciones y vídeos creados por otros docentes, listos para usar en tu aula.` |
| 6 | 30,6–34 s | Logo y el lema en tres etiquetas de color | CONECTA. APRENDE. CRECE. (cada una, cuando la voz la dice) | `[excited] LinkEdu. Conecta. Aprende. Crece.` |

Los tiempos salen de `motion/src/tiempos.ts`: cada escena dura lo que dura su tramo de voz más
unos fotogramas de margen, y los vuelos duran 14 fotogramas (el del logo, 45; el del cierre, 22).

## Música y efectos de sonido

- **Música:** electrónica a 120 BPM compuesta con código (`motion/scripts/musica.mjs`). Entra
  suave, el ritmo arranca con el primer vuelo de cámara y tiene su golpe final cuando entra el
  logo de cierre. Baja de volumen sola mientras habla la voz.
- **Efectos propios para cada acción** (ElevenLabs Sound Effects, no genéricos):
  - whoosh de cristal en cada vuelo de cámara
  - clic suave en cada clic del cursor, sincronizado con la grabación
  - ping de sónar al elegir un país en el mapa
  - ficha de papel que se desliza al mover una tarea del tablero
  - panel de cristal que se abre con el tablero y con la vista previa
  - destello al guardar en favoritos y en la última palabra del lema
  - pop cuando sale cada texto, y golpe de logo en el cierre

## Cómo se escribió la voz (guía de ElevenLabs para v4)

- No se usan pausas `<break>` (v4 no las admite): las pausas se hacen con `...` y con líneas en blanco.
- Etiquetas de voz entre corchetes (`[excited]`) que describen el tono y no cambian las palabras.
  No se usan etiquetas de efectos (`[applause]`...).
- Se eligió una voz cuyo carácter encaja con un vídeo dinámico (enérgica y pulida).

## Reglas

- **No deben salir los botones** que cambian entre profesor, alumno y empresa.
  El script de grabación los oculta solo (ver `motion/scripts/grabar.mjs`).
- No se promociona ninguna dirección web.
- El vídeo debe durar **entre 30 y 35 s**. Si se cambia algo, comprobar la duración del `.mp4` final.

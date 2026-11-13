# Guion del vídeo (unos 40 segundos)

**Formato:** 1920×1080, 30 fps · **Idioma:** español · **Voz:** ElevenLabs `eleven_v4`
(todavía sin generar) · **Sin URL** (es para el concurso del instituto).

## Objetivo

Que el vídeo sea **muy llamativo** para ganar votos en el concurso de diseño de
interfaces del instituto. Lo ve gente muy distinta (marketing, DAW, profesores,
alumnos), así que:

- **Se entiende sin sonido**: cada escena tiene un título enorme con su número.
- **Se ve la app real**: son grabaciones de la web app con un cursor que escribe
  y hace clic de verdad, dentro de paneles de cristal en 3D.
- **Las transiciones se entienden**: no hay cortes. La cámara **vuela** de una
  pantalla a la siguiente por un mismo mundo 3D (con desenfoque de movimiento).

## Estilo: "Estudio de producto" + "Cristal"

(Elegido por Iván entre 5 propuestas, mezcla de la 01 y la 03.)

- **Fondo oscuro** azul marino con luces de color (turquesa, naranja, rosa).
- **Paneles de cristal** (vidrio esmerilado con borde claro y brillo) con la app
  dentro, en perspectiva 3D.
- **Objetos 3D llamativos** que giran y flotan: cubos con iconos, esferas
  brillantes y anillos. Pasan volando cerca de la cámara en cada transición.
- **Tipografía:** Sora (negrita), con títulos grandes abajo a la izquierda.
- **Móvil:** tres teléfonos de cristal a la vez, cada uno en una pestaña distinta.

## Escenas

| # | Tiempo | Qué pasa | Texto en pantalla | Voz (borrador) |
|---|---|---|---|---|
| 1 | 0–4 s | Tres perfiles de la app (docente, alumno, empresa) entre objetos 3D | DOCENTES · ALUMNOS · EMPRESAS · ¿Y SI ESTUVIERAN CONECTADOS? | "Docentes. Alumnos. Empresas. ¿Y si estuvieran… conectados?" |
| 2 | 4–5,5 s | La cámara vuela y aparece el logo grande | LinkEdu · Red educativa conectada | "Esto es LinkEdu." |
| 3 | 5,5–10 s | **Inicio**: se escribe y se publica; aviso de publicación compartida | 01 COMPARTE | "Comparte tus ideas y recursos con todo tu claustro." |
| 4 | 11–14,7 s | **Mi red**: el mapa de México con sus ciudades | 02 CONECTA | "Conecta con docentes como tú, en cualquier parte del mundo." |
| 5 | 15,7–20 s | **Proyectos**: se crea un proyecto e invita a su equipo | 03 COLABORA | "Crea proyectos colaborativos, con tablero y chat para tu equipo." |
| 6 | 21–24,2 s | **Recursos**: vista previa de un recurso PRO | 04 DESCUBRE | "Descubre recursos listos para usar en clase." |
| 7 | 25,2–29,5 s | **Empleo**: inscripción en dos pasos | 05 TU EMPLEO | "¿Buscas trabajo? Inscríbete en solo dos pasos." |
| 8 | 30,5–34,3 s | **Móvil**: tres teléfonos con la versión responsive | 06 EN TU MÓVIL | "Y también en tu móvil, siempre contigo." |
| 9 | 35,8–39,5 s | Logo y el lema en tres etiquetas de color | CONECTA. APRENDE. CRECE. | "LinkEdu. Conecta. Aprende. Crece." |

Los tiempos salen de `motion/src/tiempos.ts` (cada escena dura lo que dura su
grabación, ya acelerada). Si cambia una grabación, hay que volver a apuntar su duración.

## Reglas

- **No deben salir los botones** que cambian entre profesor, alumno y empresa.
  El script de grabación los oculta solo (ver `motion/scripts/grabar.mjs`).
- No se promociona ninguna dirección web.

## Pendiente (se hace al final)

- **Voz** con ElevenLabs v4 (una frase por escena, para cuadrarla con la imagen).
- **Música** moderna con ritmo y **efectos** (whoosh en cada vuelo de cámara, clic
  del cursor, golpe del logo).
- Ver `investigacion.md` para la API de ElevenLabs y las licencias.

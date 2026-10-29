# LinkEdu

La red profesional de la educación. LinkEdu conecta a docentes del mismo
perfil, les ayuda a crear proyectos colaborativos y a compartir recursos, y
deja que las empresas encuentren y contraten a docentes libres.

El sistema parte de los objetos de un aula: la **pizarra** (verde, el color de
marca), el **subrayador** amarillo (lo que importa) y las líneas azules del
**cuaderno** (enlaces, información y foco). Todo se apoya en la cuadrícula del
cuaderno: pasos de 4px y una retícula de 24px.

> Primera versión, hecha sin manual de marca previo. Todavía no hay logo, set
> de iconos ni fotografía. Ver "Pendiente" al final.

## Voz y tono

- Hablamos de **tú**, como entre compañeros de claustro. Cercanos, sin
  infantilizar.
- Frases cortas. El verbo primero en botones: "Conectar", "Guardar recurso",
  "Publicar proyecto".
- Usamos las palabras del sector: *etapa* (Infantil, Primaria, ESO,
  Bachillerato, FP), *materia*, *centro*, *claustro*, *unidad didáctica*,
  *ABP*. No decimos "usuarios" ni "contenido": decimos *docentes* y
  *recursos*.
- Lenguaje inclusivo sin barras: "el profesorado", "quien imparte",
  "docentes".
- Los errores dicen qué pasa y cómo arreglarlo: "Ese correo no es de un
  centro educativo. Usa el de tu centro o regístrate como docente libre."
- Cifras en formato español: `1.248 descargas`, `3 de noviembre`, `18:30`.

## Color

| Token | Para qué |
| --- | --- |
| `paper` / `surface` / `surface-sunken` | Fondo, tarjetas y zonas hundidas |
| `ink` / `ink-muted` | Texto principal y secundario |
| `pizarra` | Marca y acción principal. Un botón `primary` por vista |
| `subrayador` | El acento. Marca **una** cosa por vista: "Disponible", "Nuevo" |
| `cuaderno` | Enlaces en texto, información y anillo `focus` |
| `pizarra-soft` / `cuaderno-soft` | Fondos de etiquetas: materia (pizarra) y etapa (cuaderno) |
| `warning` / `danger` | Plazos que cierran y errores. Solo para estados |

Reglas:

- El texto va siempre en `ink` o `ink-muted` sobre fondos neutros. Sobre
  `pizarra`, en `on-pizarra`; sobre `subrayador`, en `on-subrayador`.
- `subrayador` nunca es texto: es un fondo. Si todo está subrayado, nada lo
  está.
- `line` es decorativo. Los controles llevan `line-strong` (3:1).
- Los dos temas usan los mismos nombres de token. Nunca pongas un color a mano.

## Tipografía

- **Bricolage Grotesque** (`--font-display`) para títulos y nombres. Tiene
  carácter, pero se usa poco: estilos `display-xl`, `display-l`, `title`,
  `card-title`.
- **Atkinson Hyperlegible** (`--font-sans`) para todo el texto. Está diseñada
  para leerse bien con baja visión, y eso encaja con una red educativa
  accesible. Estilos `body-l`, `body`, `body-s`, `label`.
- **IBM Plex Mono** (`--font-mono`) solo para datos: tipo de recurso
  (`kicker`, en mayúsculas) y contadores (`stat`, cifras tabulares).
- Las tres son de Google Fonts. Carga:
  `https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Atkinson+Hyperlegible:wght@400;700&family=IBM+Plex+Mono:wght@500&display=swap`
- Texto corrido a unos 65 caracteres por línea como máximo.

## Espacio, forma y profundidad

- Escala de espacio: `space-1` 4 · `space-2` 8 · `space-3` 12 · `space-4` 16 ·
  `space-6` 24 · `space-8` 32 · `space-12` 48. La cuadrícula del cuaderno
  (fondos, portada) va a `space-6`.
- Radios: `radius-s` (8px) para controles, `radius-l` (20px) para tarjetas y
  `radius-pill` para etiquetas y avatares. Nada de esquinas rectas.
- Sombra: solo `shadow-card`, y solo en tarjetas. En oscuro la tarjeta se
  separa con el borde `line`.
- Objetivo táctil mínimo: 44px de alto en botones y campos.

## Firma: el subrayado

El gesto propio de LinkEdu es pasar el subrayador por una palabra. Se hace
con la clase `le-subrayado` (franja de `subrayador` en el 40% inferior del
texto). Úsalo en titulares de marketing y en la palabra clave de un estado
vacío, nunca en texto de interfaz.

## Iconografía

Aún no hay set propio. Mientras tanto: iconos de trazo de 2px con extremos
redondeados, a 20px junto a texto `body` y a 24px sueltos, siempre en
`currentColor`. Nunca emojis como iconos.

## Logo

Todavía no existe. Hasta que se diseñe, el nombre se escribe **LinkEdu** (con
la L y la E en mayúscula) en Bricolage Grotesque 800, color `ink`.

## Pendiente

- Logo e isotipo, y su versión monocroma.
- Set de iconos.
- Estilo de fotografía e ilustración.
- Componentes de proyecto colaborativo, oferta de empleo y publicación del
  feed.

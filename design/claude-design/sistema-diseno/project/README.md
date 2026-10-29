# LinkEdu

La red profesional de la educación. LinkEdu conecta a docentes del mismo
perfil, les ayuda a crear proyectos colaborativos y a compartir recursos, y
deja que las empresas encuentren y contraten a docentes libres.

Los colores salen del logo. El **marino** de las letras es el color de marca.
El **azul** y el **turquesa** del icono se usan para información y para
"disponible". El **naranja** y el **amarillo** son los acentos cálidos: lo
nuevo, lo destacado y el gesto del subrayado. Todo se apoya en la cuadrícula
del cuaderno: pasos de 4px y una retícula de 24px.

> Incluye voz y tono, color, tipografía, espacios, iconos, fotografía,
> ilustración, logo y 11 componentes.

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
| `marino` | Marca y acción principal. Un botón `primary` por vista |
| `azul` | Enlaces en texto, información y anillo `focus` |
| `turquesa` | "Disponible": anillo del avatar y etiqueta de estado |
| `naranja` | El acento. Marca **una** cosa por vista: "Nuevo", "Plazo abierto" |
| `amarillo` | Solo el gesto del subrayado y la portada |
| `marino-soft` / `azul-soft` | Fondos de etiquetas: materia (marino) y etapa (azul) |
| `warning` / `danger` | Plazos que cierran y errores. Solo para estados |

Reglas:

- El texto va siempre en `ink` o `ink-muted` sobre fondos neutros. Sobre
  `marino`, en `on-marino`; sobre `turquesa`, `naranja` y `amarillo`, en
  `on-acento`.
- `turquesa`, `naranja` y `amarillo` nunca son texto: son fondos. Sobre blanco
  no llegan al contraste mínimo.
- El logo usa degradados; la interfaz no. Cada token es un color plano.
- Si todo está destacado en naranja, nada lo está.
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
con la clase `le-subrayado` (franja de `amarillo` en el 40% inferior del
texto). Úsalo en titulares de marketing y en la palabra clave de un estado
vacío, nunca en texto de interfaz.

## Iconografía

LinkEdu tiene un set propio de 26 iconos (componente `Icon`; los SVG están en
`design/assets/iconos/` del repo).

- Trazo de 2px, extremos y uniones redondeados, sobre una rejilla de 24px.
  Esquinas suaves, a juego con los radios de la interfaz.
- Siempre de línea. Solo se rellena un icono para marcar que está activo
  (el corazón de "Me gusta").
- Toman el color del texto (`currentColor`). En navegación, `ink-muted` en
  reposo y `marino` cuando están activos. En datos de tarjeta, `azul`.
- Tamaños: 16px en metadatos, 20px junto a texto `body`, 24px sueltos.
- Junto a una etiqueta de texto siempre que se pueda. Un icono solo necesita
  `label` para el lector de pantalla.
- Nunca emojis como iconos.

## Fotografía

La fotografía enseña a docentes de verdad haciendo su trabajo. Es lo que
separa a LinkEdu de una web de stock.

- **Personas reales en aulas reales**: pizarras con cosas escritas, mesas en
  grupo, talleres de FP, patios. Nada de sonrisas posadas mirando a cámara
  ni de "manos sobre portátil".
- **Luz natural** de ventana, tonos ligeramente fríos que casan con el marino.
  Sin filtros de color, sin viñeteado y sin blanco y negro.
- **Diversidad sin forzarla**: edades, etapas (Infantil, FP, adultos),
  centros públicos y concertados, ciudades y pueblos.
- **Encuadre**: plano medio o detalle de manos trabajando, con aire a un lado
  para poner texto encima. Formatos 4:3 en tarjetas y 16:9 en cabeceras.
- **Tratamiento en la interfaz**: esquinas `radius-l` y nunca con borde. Si
  lleva texto encima, una capa de `marino` al 70% y el texto en `on-marino`.
- **Privacidad**: el alumnado menor no se reconoce nunca (de espaldas,
  desenfocado o fuera de plano). Toda foto necesita el permiso del centro.
- **Fotos de perfil**: cara centrada, fondo limpio, recorte circular del
  `Avatar`. Si no hay, se usan las iniciales.

## Ilustración

La ilustración se construye con las mismas formas que el logo y la portada.
Se usa en estados vacíos, en la bienvenida y en la landing, nunca para
decorar una pantalla que ya tiene contenido.

- **Formas planas y geométricas**: rectángulos con `radius-s` y `radius-l`,
  círculos y píldoras. Una pizarra es un rectángulo marino; el sol, un
  círculo naranja; un proyecto, píldoras que se tocan.
- **Solo colores del sistema**: `marino`, `azul`, `turquesa`, `naranja` y
  `amarillo` sobre `surface-sunken`. Como mucho cuatro por ilustración. Sin
  degradados, sin sombras y sin contornos.
- **Personas, si salen, sin rasgos**: siluetas de cabeza y cuerpo hechas con
  un círculo y una píldora. Nada de caras de dibujos animados.
- **La cuadrícula del cuaderno** (`space-6`) puede ir de fondo como trama de
  puntos o cruces en `marino-soft`.
- Las ilustraciones se dibujan en SVG con clases que apuntan a los tokens,
  así funcionan en tema claro y oscuro. Ejemplo: el componente `EmptyState`.

## Logo

Los archivos están en el grupo **Logos** de este sistema y en el repo, en
`design/assets/logo/`. Hay cuatro versiones, cada una en tres colores:

| Versión | Archivo | Cuándo usarla |
| --- | --- | --- |
| Horizontal | `linkedu-horizontal` | Cabecera de la web, firmas, documentos |
| Vertical | `linkedu-vertical` | Portadas, pantalla de carga, redes sociales |
| Icono | `linkedu-icono` | Favicon, icono de app, avatar de la marca |
| Texto | `linkedu-texto` | Espacios estrechos donde el icono no se lee |

- **Color** (sin sufijo): la versión principal, sobre fondos claros (`paper`,
  `surface`).
- **`-azul`**: a una tinta, azul marino `#073157`. Para fondos claros cuando
  el logo en color sobra o se imprime a una tinta.
- **`-blanco`**: a una tinta, blanco. Sobre `marino`, fotos oscuras y el tema
  oscuro.
- No cambies sus colores, no lo deformes y no le pongas sombras ni contornos.
- En el texto corrido, el nombre se escribe **LinkEdu**, con la L y la E en
  mayúscula.

## Componentes

| Grupo | Componentes |
| --- | --- |
| Acciones | `Button` |
| Etiquetas | `Tag` |
| Identidad | `Avatar`, `Icon` |
| Formularios | `Input` |
| Tarjetas | `ProfileCard` (docente), `ResourceCard` (recurso), `ProjectCard` (proyecto colaborativo), `JobCard` (oferta de empleo) |
| Feed | `PostCard` (publicación), `EmptyState` (lista vacía) |

Cada uno tiene su guía y su vista previa en `components/<Nombre>/`.

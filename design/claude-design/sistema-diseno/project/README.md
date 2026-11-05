# LinkEdu

La red profesional de la educación. LinkEdu conecta a docentes del mismo
perfil, les ayuda a crear proyectos colaborativos y a compartir recursos, y
deja que las empresas encuentren y contraten a docentes libres.

Los colores salen del logo. El **marino** de las letras es el color de marca.
El **azul** y el **turquesa** del icono se usan para información y para
"disponible". El **naranja** y el **amarillo** son los acentos cálidos: lo
nuevo, lo destacado y el gesto del subrayado. Todo se apoya en la cuadrícula
del cuaderno: pasos de 4px y una retícula de 24px.

El estilo es **plano y ordenado**: tarjetas blancas con borde fino sobre un
fondo gris azulado, sin sombras, con esquinas de 12px y algún panel en marino
para lo que importa. La referencia es la página de inicio del canvas
"LinkEdu · Diseño de la app".

> Incluye voz y tono, color, tipografía, espacios, composición de pantalla,
> iconos, fotografía, ilustración, logo y 12 componentes.

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
| `paper` | Fondo de la página, gris azulado (`#ebf0f5`) |
| `surface` / `surface-sunken` / `surface-soft` | Tarjetas y cabecera; huecos dentro de ellas (buscador, separadores); bloques dentro de una tarjeta (adjuntos) |
| `ink` / `ink-muted` | Texto principal y secundario |
| `marino` | Marca y acción principal. Un botón `primary` por vista |
| `panel` / `on-panel` / `on-panel-muted` | Paneles destacados en marino y su texto |
| `azul` | Enlaces en texto, información, iconos de recurso y anillo `focus` |
| `turquesa` | "Disponible" o "activo": anillo del avatar, etiqueta de estado, marca de proyecto |
| `naranja` | El acento. Marca **una** cosa por vista: "Nuevo", "Plazo abierto" |
| `amarillo` | El subrayado, la franja, la portada y los enlaces sobre `panel` |
| `marino-soft` / `azul-soft` | Fondos de etiquetas y botones tonales: materia (marino) y etapa o recurso (azul) |
| `warning` / `danger` | Plazos que cierran y errores. Solo para estados |

Reglas:

- El texto va siempre en `ink` o `ink-muted` sobre fondos neutros. Sobre
  `marino`, en `on-marino`; sobre `panel`, en `on-panel` y `on-panel-muted`;
  sobre `turquesa`, `naranja` y `amarillo`, en `on-acento`.
- `turquesa` y `naranja` nunca son texto: son fondos. `amarillo` solo es
  texto en un enlace sobre `panel` (7:1); sobre blanco no llega al contraste.
- Como mucho **dos paneles** por pantalla, uno por columna. Son la forma de
  destacar un bloque entero; el naranja destaca una etiqueta.
- Los puntos y barras de color de las listas (proyectos, grupos) usan los
  colores del logo para distinguir elementos, siempre junto a su nombre.
- El logo usa degradados; la interfaz no. Cada token es un color plano.
- Si todo está destacado en naranja, nada lo está.
- `line` es decorativo. Los campos de texto llevan `line-strong` (3:1).
- LinkEdu solo tiene tema claro: no hay modo oscuro. Aun así, nunca pongas un
  color a mano; usa siempre el token.

## Tipografía

- **Bricolage Grotesque** (`--font-display`) para títulos y nombres. Tiene
  carácter, pero se usa poco: estilos `display-xl`, `display-l`, `title`
  (el saludo, "Buenos días, Lucía"), `figure` (la cifra de un panel),
  `card-title` y `section-title` (títulos de bloque en las columnas).
- **Atkinson Hyperlegible** (`--font-sans`) para todo el texto. Está diseñada
  para leerse bien con baja visión, y eso encaja con una red educativa
  accesible. Estilos `body-l` (publicaciones), `body`, `body-s`, `label`.
- Las cifras del perfil (conexiones, recursos, visitas) van en Bricolage a
  20px y en `marino`, con la palabra debajo en `body-s` `ink-muted`.
- **IBM Plex Mono** (`--font-mono`) solo para datos: tipo de recurso
  (`kicker`, en mayúsculas) y contadores (`stat`, cifras tabulares).
- Las tres son de Google Fonts. Carga:
  `https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Atkinson+Hyperlegible:wght@400;700&family=IBM+Plex+Mono:wght@500&display=swap`
- Texto corrido a unos 65 caracteres por línea como máximo.

## Espacio, forma y profundidad

- Escala de espacio: `space-1` 4 · `space-2` 8 · `space-3` 12 · `space-4` 16 ·
  `space-5` 20 · `space-6` 24 · `space-8` 32 · `space-12` 48. La cuadrícula
  del cuaderno (fondos, portada) va a `space-6`.
- Tarjetas: relleno `space-5` arriba y abajo y `space-6` a los lados (en
  columnas laterales, `space-5` también a los lados); `space-3` entre bloques.
- Radios: `radius-s` (8px) para botones, adjuntos y cajas de icono;
  `radius-m` (12px) para tarjetas y paneles; `radius-l` (20px) para modales y
  el avatar grande; `radius-pill` para etiquetas, buscador, campo de publicar
  y botones redondos de icono. Nada de esquinas rectas.
- Avatares: cuadrados con el radio a un cuarto del lado (36px → 9px,
  48px → 12px, 80px → 20px). Nunca círculos.
- Profundidad: **las tarjetas son planas**. Se separan del fondo por el color
  (`surface` sobre `paper`) y el borde `line`. La única sombra,
  `shadow-pop`, es para lo que flota: menús, avisos y modales.
- Separadores dentro de una tarjeta en `surface-sunken`, más suaves que el
  borde de la tarjeta.
- Objetivo táctil mínimo: 44px de alto en botones y campos (40px en las filas
  de botones del campo de publicar).

## Composición de pantalla

La pantalla de la app tiene siempre la misma estructura (ver el canvas
"LinkEdu · Diseño de la app"):

1. **La franja** de 6px arriba del todo.
2. **Cabecera** en `surface` con borde inferior `line`: logo horizontal
   (34px de alto), buscador (`SearchField`), navegación principal y avatar
   propio. Relleno `space-3` × `space-8`.
3. **Tres columnas** sobre `paper`, separadas `space-5`, con `space-8` de
   margen lateral:
   - Izquierda (260–290px): tarjeta de perfil con banda `panel`, tus
     proyectos y un panel (tus grupos).
   - Centro (flexible, mín. 480px): campo de publicar, feed y tarjetas de
     proyecto y recursos.
   - Derecha (300–340px): docentes sugeridos, un panel (oferta de empleo) y
     próximos eventos.
4. Las tarjetas de una columna van separadas `space-4`. Las columnas se
   estiran a la misma altura: la última tarjeta de cada una crece.
5. En móvil las columnas se apilan en este orden: centro, izquierda, derecha.
6. Una pieza ancha, como un mapa, puede unir el centro y la derecha. Debajo
   vuelven las tarjetas, en filas que ocupan todo el ancho.

**Regla obligatoria: ninguna parte en blanco.** Toda pantalla queda rellena
de principio a fin, sin huecos vacíos en ninguna columna ni dentro de las
tarjetas. Si sobra sitio, no se deja aire: las filas de una lista crecen con
`flex: 1`, la última tarjeta se estira o se añade contenido útil. Las zonas
vacías de un mapa llevan trama de puntos. Vale para todas las pantallas y
todos los estados: filtros, listas cortas y resultados vacíos incluidos.

La navegación (`le-nav`) va en `label` con icono de 20px. El enlace activo
lleva `aria-current="page"`, color `marino` y una raya de 3px debajo; el resto
va en `ink-muted`.

## Firmas

**El subrayado.** El gesto propio de LinkEdu es pasar el subrayador por una
palabra. Se hace con la clase `le-subrayado` (franja de `amarillo` en el 40%
inferior del texto). Úsalo en titulares de marketing y en la palabra clave de
un estado vacío, nunca en texto de interfaz.

**La franja.** Una barra de 6px con los cinco colores del logo en proporción
4:2:2:1:1 (`marino`, `azul`, `turquesa`, `amarillo`, `naranja`). Va arriba
del todo en cada pantalla, en la portada y en documentos. Clase `le-franja`
con cinco `<span>` dentro y `aria-hidden="true"`.

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
- **Tratamiento en la interfaz**: esquinas `radius-m` dentro de tarjetas y
  `radius-l` en cabeceras, nunca con borde. Si lleva texto encima, una capa
  de `marino` al 70% y el texto en `on-marino`.
- **Privacidad**: el alumnado menor no se reconoce nunca (de espaldas,
  desenfocado o fuera de plano). Toda foto necesita el permiso del centro.
- **Fotos de perfil**: cara centrada, fondo limpio, recorte cuadrado con
  esquinas redondeadas del `Avatar`. Si no hay, se usan las iniciales.

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
  así cambian solas si se ajusta un color. Ejemplo: el componente `EmptyState`.

## Logo

Los archivos están en el grupo **Logos** de este sistema y en el repo, en
`design/assets/logo/`. Hay cinco versiones, cada una en tres colores:

| Versión | Archivo | Cuándo usarla |
| --- | --- | --- |
| Horizontal | `linkedu-horizontal` | Cabecera de la web, firmas, documentos |
| Vertical | `linkedu-vertical` | Portadas, pantalla de carga, redes sociales |
| Icono | `linkedu-icono` | Favicon, icono de app, avatar de la marca |
| Texto | `linkedu-texto` | Espacios estrechos donde el icono no se lee |
| Integrado | `linkedu-integrado` | La palabra con el icono haciendo de "e", sin icono aparte |

- **Color** (sin sufijo): la versión principal, sobre fondos claros (`paper`,
  `surface`).
- **`-azul`**: a una tinta, azul marino `#073157`. Para fondos claros cuando
  el logo en color sobra o se imprime a una tinta.
- **`-blanco`**: a una tinta, blanco. Sobre `marino`, paneles y fotos oscuras.
- No cambies sus colores, no lo deformes y no le pongas sombras ni contornos.
- En el texto corrido, el nombre se escribe **LinkEdu**, con la L y la E en
  mayúscula.

## Componentes

| Grupo | Componentes |
| --- | --- |
| Acciones | `Button` |
| Etiquetas | `Tag` |
| Identidad | `Avatar`, `Icon` |
| Formularios | `Input`, `SearchField` |
| Tarjetas | `ProfileCard` (docente), `ResourceCard` (recurso), `ProjectCard` (proyecto colaborativo), `JobCard` (oferta de empleo; `featured` la pone en panel) |
| Feed | `PostCard` (publicación), `EmptyState` (lista vacía) |

Cada uno tiene su guía y su vista previa en `components/<Nombre>/`.

Además hay clases para montar la pantalla sin componente:

| Clase | Para qué |
| --- | --- |
| `le-franja` | La franja de colores de arriba |
| `le-nav`, `le-nav__link` | Navegación principal de la cabecera |
| `le-card`, `le-card--panel` | Tarjeta blanca y panel marino para bloques propios |
| `le-section-title` | Título de bloque en las columnas |
| `le-date` (`--azul`, `--naranja`) | Caja de fecha de un evento: mes en `kicker` y día en Bricolage |
| `le-kicker`, `le-meta`, `le-stat`, `le-figure` | Textos de datos |

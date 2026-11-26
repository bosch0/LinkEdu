# Vídeo con motion graphics (Remotion)

Proyecto de [Remotion](https://www.remotion.dev/): el vídeo se programa con
código (React) y se exporta a MP4. Es el vídeo final de LinkEdu y **puede durar hasta
1 minuto** (ahora unos 43 s). Estilo **"Estudio de producto + Cristal"**: fondo oscuro,
objetos 3D brillantes y paneles de cristal con **la app real dentro**. Muestra las tres
vistas con más personalidad: mapa de red, proyectos colaborativos y recursos didácticos, y
después la **versión móvil** dentro de un teléfono de cristal.
El guion está en `../guion.md`.

## Cómo usarlo

Hace falta Node.js. Desde esta carpeta (`video/motion/`):

```bash
npm install        # solo la primera vez
npm run studio     # abre el editor en el navegador para ver y ajustar el vídeo
npm run render     # genera out/linkedu.mp4 (con voz, música y efectos)
```

## Cómo se ve la app en el vídeo

El vídeo usa **grabaciones reales de la web app** (en `public/grabaciones/`):
un cursor se mueve y hace clic de verdad. Remotion pone cada grabación dentro de
un panel de cristal en 3D.

Si la web app cambia, se vuelven a grabar:

```bash
# 1. Arranca la web app en otra terminal (carpeta web_app/):  npm start -- --port 4300
# 2. Desde esta carpeta:
node scripts/grabar.mjs                  # graba todo
node scripts/grabar.mjs red recursos     # solo esas escenas
```

El script usa el Chrome instalado, graba la pantalla en alta calidad y la
convierte a `.mp4` con el ffmpeg de Remotion. **Oculta solo los botones que
cambian entre profesor, alumno y empresa** (la insignia "Rol activo" de la cabecera y los
selectores de ejemplo de Perfil y Empleo).

- **Ordenador:** ventana de **1920 × 1080** (una pantalla estándar), grabada a 1,5× (2880 × 1620).
- **Móvil** (`movil`): ventana de 390 × 844 con pantalla táctil, grabada a 3×. Se toca con el dedo
  (sale una onda) en vez de mover un cursor.

Al terminar cada grabación el script escribe cuánto dura y dónde hay clics
(`CLICS.red = [[segundo, x, y], ...]`). Apunta esos números en `src/tiempos.ts`:

- `CLIPS`: `dur` = segundos que dura la grabación, `tasa` = velocidad de reproducción,
  `ancho` y `alto` = tamaño de la ventana grabada.
- `CLICS`: `[segundo, x, y]` de cada clic. Sirven para poner el sonido del clic justo en ese
  momento y para que la **cámara se acerque** al punto donde hace clic el cursor.

Para medir la duración de una grabación:

```bash
npx remotion ffmpeg -i public/grabaciones/red.mp4   # sale "Duration: 00:00:09.87"
```

## La duración (hasta 1 minuto)

`src/tiempos.ts` calcula cada escena a partir de **lo que dura su tramo de voz** (`VOZ`) más unos
fotogramas de margen, y los vuelos de cámara son cortos (14 fotogramas). Así la imagen siempre
acompaña a la voz. Cada grabación tiene que durar al menos lo que dura su escena una vez acelerada.

Después de renderizar, comprueba la duración:

```bash
npx remotion ffmpeg -i out/linkedu.mp4   # no debe pasar de 00:01:00
```

## Audio

Todo está en `src/componentes/Sonido.tsx` (cada sonido empieza en un fotograma exacto).
De dónde sale cada archivo, y las descripciones usadas, está en `public/audio/CREDITOS.md`.

- **Voz en off**: la voz "Martin Osborne" de ElevenLabs (`eleven_v4`). Se genera **todo el texto de
  una vez** (`voz-completa.mp3`) y se corta en tramos (`voz-*.mp3`) por los silencios con ffmpeg.
  Los textos exactos están en `../guion.md`. Si se cambia una frase hay que volver a cortar y
  apuntar lo que dura cada tramo en `VOZ` (`src/tiempos.ts`).
  Cada tramo se acelera un 10 % con `-af atempo=1.1`. La frase del móvil (`voz-movil.mp3`) se generó
  aparte con la misma voz y el mismo modelo; la toma sin recortar es `voz-movil-original.mp3`.
- **Efectos**: uno para cada acción (whoosh, clic, ping del mapa, ficha del tablero, ventana,
  destello, pop e impacto del logo), generados con ElevenLabs Sound Effects.
- **Música**: `public/audio/musica.wav`, compuesta con código (`node scripts/musica.mjs`).
  Baja sola de volumen mientras habla la voz. Su golpe final cae en el segundo 38 de la pista
  (`COMPAS_FINAL` en el script y `GOLPE_MUSICA` en `Sonido.tsx`): si cambia la duración, se
  cambian los dos y se vuelve a componer.

## Cómo funciona la cámara

Todas las pantallas están en **un mismo mundo 3D** y la cámara vuela de una a la
siguiente (así las transiciones se entienden: no hay cortes, se viaja).

- `src/mundo.ts`: dónde está cada pantalla, los movimientos de la cámara y los objetos 3D.
  La cámara vuela muy rápido entre pantallas (se inclina y se aleja a mitad del vuelo) y tiene un
  balanceo suave continuo. La función `separar()` empuja los objetos para que **no se atraviesen**.
- **Puntos de interés** (`PUNTOS` en `src/mundo.ts`): en cada escena, la cámara va de un punto a otro
  de la grabación (`[segundo, x, y, zoom]`): lo que cuenta la voz o donde se hace clic. Cada punto
  queda **centrado** y con mucho zoom (de 1,8× a 3×), así no se ve toda la pantalla a la vez. Si se
  vuelve a grabar una escena, hay que revisar sus puntos (los clics salen en la consola de `grabar.mjs`).
  En el ordenador la cámara no se sale de la pantalla, así que un botón pegado al borde queda lo
  más centrado posible. En el móvil el teléfono se ve de ancho entero y la cámara sube y baja por él
  (baja a las pestañas en cada toque).
- **Ningún objeto 3D puede quedar encima de una pantalla**: las pantallas se dibujan en la última capa
  (`Video.tsx`) y `detrasDePantallas()` manda detrás del plano de las pantallas cualquier objeto que
  esté cerca de una.
- `src/tiempos.ts`: cuándo vuela la cámara y cuánto tiempo se queda en cada pantalla.
- No se usa `filter: blur` (desenfoque de movimiento) sobre el mundo 3D: el navegador
  borraba o recortaba fotogramas enteros al renderizar y el vídeo parpadeaba.
- El resplandor y la sombra de las esferas van **en capas aparte** (`ResplandorEsfera`):
  si van en la misma capa 3D que los demás objetos, el navegador los parte y se ven
  recortados en forma de cuadrado.

## Qué hay dentro

- `scripts/grabar.mjs`: graba la app (ordenador y móvil) y hace fotos de los perfiles.
- `scripts/musica.mjs`: compone la música de fondo.
- `src/Video.tsx`: une el mundo 3D, los objetos, los textos y el sonido.
- `src/componentes/`:
  - `Pantalla`: panel de cristal con la app dentro (vídeo o foto).
  - `Objetos`: cubos con icono, esferas y anillos 3D que giran y flotan.
  - `Textos`: títulos de cada escena, introducción y cierre.
  - `Sonido`: voz en off, música y efectos.
- `src/marca.ts`: colores y tipografía (Sora).
- `public/`: logos, grabaciones y audio.

## Reglas

- El `.mp4` resultante **no se sube a git** (ya está ignorado). Guardadlo en
  OneDrive o Drive y apuntad el enlace en `../README.md`.
- Las grabaciones **no deben mostrar los botones de cambio de rol**.
- La voz y los efectos de ElevenLabs: revisar los términos del plan de la cuenta antes de publicar.

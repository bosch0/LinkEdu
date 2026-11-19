# Vídeo con motion graphics (Remotion)

Proyecto de [Remotion](https://www.remotion.dev/): el vídeo se programa con
código (React) y se exporta a MP4. Es el vídeo final de LinkEdu y **dura entre 30 y 35
segundos** (ahora unos 34 s). Estilo **"Estudio de producto + Cristal"**: fondo oscuro,
objetos 3D brillantes y paneles de cristal con **la app real dentro**. Muestra las tres
vistas con más personalidad: mapa de red, proyectos colaborativos y recursos didácticos.
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
cambian entre profesor, alumno y empresa.**

Al terminar cada grabación el script escribe cuánto dura y dónde hay clics
(`CLICS.red = [[segundo, x, y], ...]`). Apunta esos números en `src/tiempos.ts`:

- `CLIPS`: `dur` = segundos que dura la grabación, `tasa` = velocidad de reproducción.
- `CLICS`: `[segundo, x, y]` de cada clic. Sirven para poner el sonido del clic justo en ese
  momento y para que la **cámara se acerque** al punto donde hace clic el cursor.

Para medir la duración de una grabación:

```bash
npx remotion ffmpeg -i public/grabaciones/red.mp4   # sale "Duration: 00:00:09.87"
```

## La duración (30–35 segundos)

`src/tiempos.ts` calcula cada escena a partir de **lo que dura su tramo de voz** (`VOZ`) más unos
fotogramas de margen, y los vuelos de cámara son cortos (14 fotogramas). Así la imagen siempre
acompaña a la voz. Cada grabación tiene que durar al menos lo que dura su escena una vez acelerada.

Después de renderizar, comprueba la duración:

```bash
npx remotion ffmpeg -i out/linkedu.mp4   # debe salir entre 00:00:30 y 00:00:35
```

## Audio

Todo está en `src/componentes/Sonido.tsx` (cada sonido empieza en un fotograma exacto).
De dónde sale cada archivo, y las descripciones usadas, está en `public/audio/CREDITOS.md`.

- **Voz en off**: la voz "Martin Osborne" de ElevenLabs (`eleven_v4`). Se genera **todo el texto de
  una vez** (`voz-completa.mp3`) y se corta en tramos (`voz-*.mp3`) por los silencios con ffmpeg.
  Los textos exactos están en `../guion.md`. Si se cambia una frase hay que volver a cortar y
  apuntar lo que dura cada tramo en `VOZ` (`src/tiempos.ts`).
  Cada tramo se acelera un 10 % con `-af atempo=1.1`.
- **Efectos**: uno para cada acción (whoosh, clic, ping del mapa, ficha del tablero, ventana,
  destello, pop e impacto del logo), generados con ElevenLabs Sound Effects.
- **Música**: `public/audio/musica.wav`, compuesta con código (`node scripts/musica.mjs`).
  Baja sola de volumen mientras habla la voz.

## Cómo funciona la cámara

Todas las pantallas están en **un mismo mundo 3D** y la cámara vuela de una a la
siguiente (así las transiciones se entienden: no hay cortes, se viaja).

- `src/mundo.ts`: dónde está cada pantalla, los movimientos de la cámara y los objetos 3D.
  La cámara vuela muy rápido entre pantallas (se inclina y se aleja a mitad del vuelo), se
  acerca a cada clic del cursor, y tiene un balanceo suave continuo. La función `separar()` empuja
  los objetos para que **no se atraviesen**.
- `src/tiempos.ts`: cuándo vuela la cámara y cuánto tiempo se queda en cada pantalla.
- No se usa `filter: blur` (desenfoque de movimiento) sobre el mundo 3D: el navegador
  borraba o recortaba fotogramas enteros al renderizar y el vídeo parpadeaba.
- El resplandor y la sombra de las esferas van **en capas aparte** (`ResplandorEsfera`):
  si van en la misma capa 3D que los demás objetos, el navegador los parte y se ven
  recortados en forma de cuadrado.

## Qué hay dentro

- `scripts/grabar.mjs`: graba la app (escritorio) y hace fotos de los perfiles.
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

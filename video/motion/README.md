# Vídeo con motion graphics (Remotion)

Proyecto de [Remotion](https://www.remotion.dev/): el vídeo se programa con
código (React) y se exporta a MP4. Es el vídeo final de LinkEdu. Estilo
**"Estudio de producto + Cristal"**: fondo oscuro, objetos 3D brillantes y
paneles de cristal con **la app real dentro**. El guion está en `../guion.md`.

## Cómo usarlo

Hace falta Node.js. Desde esta carpeta (`video/motion/`):

```bash
npm install        # solo la primera vez
npm run studio     # abre el editor en el navegador para ver y ajustar el vídeo
npm run render     # genera out/linkedu.mp4
```

## Cómo se ve la app en el vídeo

El vídeo usa **grabaciones reales de la web app** (en `public/grabaciones/`):
un cursor se mueve, escribe y hace clic de verdad. Remotion pone cada grabación
dentro de un panel de cristal en 3D.

Si la web app cambia, se vuelven a grabar:

```bash
# 1. Arranca la web app en otra terminal (carpeta web_app/):  npm start -- --port 4300
# 2. Desde esta carpeta:
node scripts/grabar.mjs                  # graba todo
node scripts/grabar.mjs inicio empleo    # solo esas escenas
```

El script usa el Chrome instalado, graba la pantalla en alta calidad y la
convierte a `.mp4` con el ffmpeg de Remotion. **Oculta solo los botones que
cambian entre profesor, alumno y empresa.**

Después de grabar, mira cuánto dura cada vídeo y apunta ese número en
`src/tiempos.ts` (`CLIPS`: `dur` = segundos, `tasa` = velocidad de reproducción):

```bash
npx remotion ffmpeg -i public/grabaciones/inicio.mp4   # sale "Duration: 00:00:08.57"
```

## Cómo funciona la cámara

Todas las pantallas están en **un mismo mundo 3D** y la cámara vuela de una a la
siguiente (así las transiciones se entienden: no hay cortes, se viaja).

- `src/mundo.ts`: dónde está cada pantalla y la lista de movimientos de la cámara.
- `src/tiempos.ts`: cuándo vuela la cámara y cuánto tiempo se queda en cada pantalla.
- No se usa `filter: blur` (desenfoque de movimiento) sobre el mundo 3D: el navegador
  borraba o recortaba fotogramas enteros al renderizar y el vídeo parpadeaba.

## Qué hay dentro

- `scripts/grabar.mjs`: graba la app (escritorio y móvil) y hace fotos de los perfiles.
- `src/Video.tsx`: une el mundo 3D, los objetos y los textos.
- `src/componentes/`:
  - `Pantalla`: panel de cristal con la app dentro (vídeo o foto).
  - `Telefono`: teléfono de cristal con la versión móvil.
  - `Objetos`: cubos con icono, esferas y anillos 3D que giran y flotan.
  - `Textos`: títulos de cada escena, introducción, logo y cierre.
- `src/marca.ts`: colores y tipografía (Sora).
- `public/`: logos y grabaciones.

## Reglas

- El `.mp4` resultante **no se sube a git** (ya está ignorado). Guardadlo en
  OneDrive o Drive y apuntad el enlace en `../README.md`.
- Las grabaciones **no deben mostrar los botones de cambio de rol**.
- Falta por añadir el audio (voz, música y efectos): se hará al final.

# Fuente de los PDF

Aquí está el código que genera los tres PDF de `documentos/`. Si cambia algo del proyecto
(logo, colores, la app, un precio...), se edita aquí y se vuelven a generar.

## Cómo regenerarlos

Hace falta Node.js y Google Chrome (o Edge) instalado. Desde la raíz del repo:

```bash
node documentos/_fuente/generar-pdf.mjs              # los tres PDF
node documentos/_fuente/generar-pdf.mjs manual       # solo uno: manual, memoria o monetizacion
```

Cada PDF se hace en dos pasos: un script `.mjs` escribe un `.html` (que no se sube a git) y
Chrome lo imprime a PDF.

## Qué hay dentro

| Archivo | Para qué |
| --- | --- |
| `manual.mjs` | Manual de marca. Lee los logos de `design/assets/logo/` y los iconos de `design/assets/iconos/`, y calcula solo los contrastes. |
| `memoria.mjs` | Memoria final. |
| `monetizacion.mjs` | ¿Cómo monetizar? Usa solo precios que ya existen en la app. |
| `comun.mjs`, `base.css`, `documento.css` | Piezas y estilos compartidos. |
| `tipografias/` | Bricolage Grotesque, Atkinson Hyperlegible e IBM Plex Mono (Google Fonts), para que el PDF se vea igual en cualquier equipo. |
| `capturas/` | Capturas de la app (escritorio y móvil) que salen en los PDF. |

## Capturas de la app

Si la app cambia mucho, hay que rehacer las capturas: compilar (`npm run build` en `web_app/`),
servir `dist/linkedu/browser` con rutas de Angular y sacar 1440×900 de cada pantalla (y 390×844 de las de móvil),
sin los botones de demostración de cambio de perfil.

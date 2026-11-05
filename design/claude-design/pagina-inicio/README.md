# Diseño de la app de LinkEdu

Versión online (Artifact de Claude): https://claude.ai/artifact/A8JJ6qNS6oPAAjJKigt5No

Copia del canvas "LinkEdu · Diseño de la app" de Claude Design. La versión
buena es la del artifact; lo que hay en `project/` es una copia de seguridad.

- `Main.dc.html`: la pantalla de inicio, tal como está en el canvas.
- `Red.dc.html`: la pantalla "Mi red", con el mapa de contactos y los recomendados.
- `canvas.json`: el índice del canvas. No hace falta tocarlo a mano.
- `assets/`: el logo y las fotos del canvas (retratos de randomuser.me). Cada archivo se llama con su id.
  Donde el HTML pone `/_blob/<id>`, la imagen es `assets/<id>.svg` o `.jpg`.
- `ds/linkedu/`: la copia del sistema de diseño que usa el canvas.

La copia de `ds/linkedu/` es la versión 2, la antigua (todavía con tema oscuro).
La fuente del sistema es `../sistema-diseno/`.

`Main.dc.html` no se abre solo en el navegador: necesita el editor de Claude
Design. Si cambias algo, hazlo en el artifact y vuelve a copiarlo aquí.

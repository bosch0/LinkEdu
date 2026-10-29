# PostCard

Publicación del feed: un docente cuenta algo, comparte un recurso o pide ayuda.

- Cabecera: avatar, nombre, cargo y hace cuánto ("hace 2 h", "ayer").
- El texto va en `body-l`, a 65 caracteres por línea como máximo. El feed lo corta a las 5 líneas con "Ver más".
- `resource` adjunta un recurso: una caja marino con el formato (`kind`: "PDF", "PPT", "DOC"), el título y los datos (`detail`: "24 páginas · Tecnología · 4º ESO"). Va sobre `surface-soft` y al pulsarlo se abre su ficha.
- Acciones `quiet` a lo ancho, separadas por una línea `surface-sunken`: Me gusta y Comentar muestran solo la cifra (el nombre va en `aria-label`) y Compartir lleva texto. "Me gusta" rellena el corazón cuando está pulsado (`liked`).
- Ancho máximo 640px: es la columna central.

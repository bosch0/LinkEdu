# Input

Campo de texto con etiqueta siempre visible encima, ayuda opcional debajo y mensaje de error.

- La etiqueta nunca se sustituye por el placeholder.
- `hint` explica qué se espera. Si hay `error`, ocupa su lugar en color `danger` y el borde también cambia.
- El error dice qué pasa y cómo arreglarlo, sin disculpas.
- 44px de alto y texto de 16px, para que el móvil no haga zoom.
- `pill` lo hace redondo y de 48px: es el campo de publicar del feed ("Comparte un recurso o una idea con tu claustro"). En formularios, siempre rectangular.

Quien lo usa pone un `id` único y la `label`. El resto de atributos pasan al `<input>`. Para buscar, usa `SearchField`.

# Button

Botón con el verbo primero ("Conectar", "Publicar proyecto"), en minúsculas salvo la inicial.

- `primary` (marino): la acción para la que existe la vista. Solo uno por vista.
- `secondary`: acciones de apoyo. Borde `line-strong`.
- `quiet`: acciones de bajo peso dentro de tarjetas ("Ver perfil", "Guardar").
- `highlight` (naranja): solo en landing y campañas, nunca dentro de la app.
- `danger`: borrar o abandonar un proyecto. Pide confirmación en la propia vista.
- `size="s"` solo dentro de tarjetas densas. El tamaño normal mide 44px de alto.

Quien lo usa pone el texto y el `onClick`. El foco de teclado se ve con un anillo `focus`.

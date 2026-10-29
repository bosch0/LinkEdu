# Button

Botón con el verbo primero ("Conectar", "Publicar proyecto"), en minúsculas salvo la inicial.

- `primary` (marino): la acción para la que existe la vista. Solo uno por vista.
- `secondary`: acciones de apoyo ("Crear proyecto"). Fondo `surface`, borde y texto en `marino`.
- `tonal`: elegir un tipo de cosa, como los botones Recurso, Proyecto y Evento del campo de publicar. Fondo `marino-soft`.
- `quiet`: acciones de bajo peso dentro de tarjetas, en `ink-muted` (Me gusta, Comentar, "Ver perfil").
- `inverse`: el botón dentro de un panel marino ("Ver oferta"). Fondo `on-panel`, texto `panel`.
- `highlight` (naranja): solo en landing y campañas, nunca dentro de la app.
- `danger`: borrar o abandonar un proyecto. Pide confirmación en la propia vista.
- `round`: botón redondo solo con icono (Conectar en la lista de docentes). Necesita `aria-label`.
- `size="s"` (40px) solo en filas de botones densas. El tamaño normal mide 44px de alto.

Quien lo usa pone el texto y el `onClick`. El foco de teclado se ve con un anillo `focus`.

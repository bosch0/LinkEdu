# SearchField

Buscador de la cabecera: una píldora hundida en `surface-sunken` con la lupa delante.

- Va en la cabecera, entre el logo y la navegación, con un ancho de 260 a 420px.
- No lleva etiqueta visible: la lupa y el placeholder ("Buscar en LinkEdu") lo explican, y `label` da el nombre al lector de pantalla (por defecto, "Buscar").
- El foco se ve en toda la píldora con el anillo `focus`.
- Busca docentes, recursos, proyectos y ofertas a la vez. Para filtrar una lista concreta, usa `Input`.

Quien lo usa pone el `value` y el `onChange`, o el `onKeyDown` para lanzar la búsqueda. El resto de atributos pasan al `<input>`.

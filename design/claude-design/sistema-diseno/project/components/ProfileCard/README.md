# ProfileCard

Tarjeta de un docente en búsquedas, sugerencias de conexión y resultados para empresas.

- Orden fijo: avatar, nombre, cargo y etapa, centro y ciudad, etiquetas y acciones.
- El cargo dice qué enseña y a quién: "Profesora de Matemáticas · ESO y Bachillerato".
- Un docente sin centro se presenta como "Docente libre · Ciudad".
- `available` añade la etiqueta "Disponible" y el anillo del avatar.
- "Conectar" es el botón `primary`. Al pulsarlo pasa a "Conectado" (`aria-pressed`). Quien lo usa guarda el estado y lo pasa en `connected`.
- Máximo tres etiquetas de materia o metodología.

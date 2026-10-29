# JobCard

Tarjeta de una oferta de una empresa o academia que busca docentes.

- El título es el puesto: "Docente de programación para bootcamp".
- Debajo, la empresa. Su logo va en `logo`; si no hay, salen sus iniciales.
- Etiquetas: "Nuevo" en `naranja` las primeras 48 horas, después la modalidad (Remoto, Presencial, Híbrido) y las materias.
- Datos con icono: dónde (`place`), cuánto tiempo (`hours`) y cuánto se paga (`pay`). Sin salario no se publica la oferta.
- "Inscribirme" es `primary` y pasa a "Inscrito". Quien lo usa guarda el estado en `applied`.
- `featured` la convierte en panel marino (`panel`, texto `on-panel`, botón `inverse`). Es la oferta destacada de la columna derecha del inicio: una por pantalla.

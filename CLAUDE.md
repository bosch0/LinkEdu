# LinkEdu

Proyecto de Diseño de Interfaces (2º DAW). Resumen del proyecto en `proyecto.md`.
Es una app web para el sector educativo (tipo "LinkedIn de educación") que
participa en un concurso donde se valora sobre todo el diseño UI/UX.

## Equipo

- **Iván**: project manager y vídeo final.
- **Antonio**: desarrollo de la app.

Los dos usáis Claude en este repositorio. Si no está claro quién está
hablando, pregúntalo antes de escribir nada en la memoria.

## Estructura del proyecto

```
LinkEdu/
├── documentos/   Entregables escritos: manual de marca, memoria final, monetización
├── web_app/      Código de la aplicación (Antonio)
├── design/       Diseño UI/UX hecho con Claude Design y assets finales
├── video/        Guion y notas del vídeo final (Iván)
├── memoria/      Diario diario del proyecto (ver más abajo)
└── proyecto.md   Descripción y objetivos del proyecto
```

Cada carpeta tiene un `README.md` que explica qué va dentro. Pon cada archivo
nuevo en su carpeta y no mezcles código con documentos o diseño.

## Memoria del proyecto

La carpeta `memoria/diario/` guarda lo que se hace cada día. Sirve para que
Claude recuerde el estado del proyecto entre sesiones y para escribir después
la **Memoria** final del concurso.

### Al empezar una sesión

1. Haz `git pull` si hay remoto, por si el otro compañero ha subido cambios.
2. Lee las **últimas 5 entradas** de `memoria/diario/` (las de nombre más
   reciente) y haz un resumen corto de dónde se quedó el proyecto y qué
   queda pendiente.

### Al terminar una sesión

Cuando el usuario escriba `/cierre-dia` (o pida guardar lo de hoy), añade la
entrada del día siguiendo la plantilla `memoria/PLANTILLA.md`.

### Reglas del diario

- Un archivo por persona y día: `memoria/diario/AAAA-MM-DD-nombre.md`
  (por ejemplo `2026-10-29-ivan.md`). Así Iván y Antonio nunca editan el
  mismo archivo.
- Si ya existe el archivo de hoy, **añade** al final; no lo reescribas.
- Escribe en español, frases cortas y sencillas.
- Apunta solo lo que ha pasado de verdad (no inventes tareas hechas).
- No hay índice: para ver el historial basta con listar la carpeta.

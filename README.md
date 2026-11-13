# LinkEdu

LinkEdu es una app web para el sector educativo, algo así como un
"LinkedIn de la educación". Es un proyecto de **Diseño de Interfaces**
(2º DAW) que participa en un concurso donde se valora sobre todo el diseño
UI/UX.

**App en vivo:** <https://webapp-seven-drab.vercel.app>

## Qué quiere conseguir

- Conectar docentes del mismo perfil.
- Crear proyectos colaborativos.
- Compartir recursos entre docentes y alumnos.
- Que docentes libres se publiquen y las empresas puedan contratarlos.

Más detalle en [`proyecto.md`](proyecto.md).

## Equipo

| Persona | Se encarga de |
|---------|---------------|
| Iván | Gestión del proyecto y vídeo final |
| Antonio | Desarrollo de la app |

## Estructura de carpetas

```
LinkEdu/
├── documentos/   Manual de marca, memoria final, monetización
├── web_app/      Código de la aplicación
├── design/       Diseño UI/UX y assets finales
├── video/        Guion y notas del vídeo final
├── memoria/      Diario diario del proyecto
└── proyecto.md   Descripción y objetivos
```

Cada carpeta tiene su propio `README.md` con más información.

## Cómo trabajamos con Git

La rama `main` está protegida: **no se hace push directo a ella**.
Cada tarea se hace en su propia rama y se une con un Pull Request.

Resumen rápido:

1. `git switch main` y `git pull`
2. `git switch -c feature/nombre-de-la-tarea`
3. Trabajar y hacer commits
4. `git push -u origin feature/nombre-de-la-tarea`
5. Abrir un Pull Request en GitHub y pedir revisión a la otra persona

La explicación completa, paso a paso, está en [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Cómo ejecutar la app

Todavía no se ha elegido la tecnología. Cuando se decida, las instrucciones
estarán en [`web_app/README.md`](web_app/README.md).

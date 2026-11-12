# web_app

Aplicación web de LinkEdu. Es la versión programada del diseño de `../design/`.

- **Angular 22** (creado con Angular CLI, sin zone.js, con _signals_)
- **Tailwind CSS 4** para todo el diseño visual (los estilos están en los `.html`, no en archivos CSS)
- **Datos de prueba** (_mockdata_): todavía no hay backend. Todo funciona en memoria.

Responsable principal: Antonio.

## Cómo instalar y ejecutar

Hace falta Node.js (versión 20 o superior).

```bash
cd web_app
npm install          # solo la primera vez
npm start            # abre http://localhost:4200
```

Otros comandos:

```bash
npm run build        # compila la app en dist/
npm test             # ejecuta los tests (Vitest)
```

## Pantallas

| Ruta         | Pantalla  | Qué se puede hacer                                                                 |
| ------------ | --------- | ---------------------------------------------------------------------------------- |
| `/`          | Inicio    | Publicar, dar me gusta, comentar, unirse a proyectos y grupos, apuntarse a eventos |
| `/red`       | Mi red    | Mapa con zoom y arrastre, filtros, invitaciones, recomendados y lista de contactos |
| `/proyectos` | Proyectos | Crear proyectos, tablero de tareas, chat, invitaciones y validar habilidades       |
| `/recursos`  | Recursos  | Explorar, descargar, comprar, subir, editar y hacerse Premium                      |
| `/empleo`    | Empleo    | Ofertas, candidaturas en 2 pasos, clases particulares, vista de empresa            |
| `/perfil`    | Perfil    | Perfil de profesora, alumno y empresa, ofertas, publicaciones y edición            |

Las acciones importantes (inscribirse, unirse, validar, comprar) tienen un paso de confirmación,
como pide el diseño.

## Cómo está organizado

```
src/
├── index.html            Fuentes de la marca y título
├── styles.css            Tema de Tailwind: colores, fuentes y animaciones (poco CSS)
└── app/
    ├── app.*             Componente raíz (rutas + avisos)
    ├── app.routes.ts     Las rutas; cada pantalla se carga solo cuando se visita
    ├── compartido/       Piezas que se repiten (cada una con .ts, .html y .spec.ts)
    │   ├── marco         Franja de colores + cabecera con el menú
    │   ├── buscador      Buscador de la cabecera
    │   ├── icono         Los iconos de LinkEdu (SVG)
    │   ├── ventana       Ventana flotante con animación de entrada y salida
    │   ├── flujo         Ventana de "solicitar algo" en 3 pasos
    │   ├── confeti       Confeti para celebrar acciones
    │   ├── avisos-lista  Mensajes cortos en la esquina ("Guardado"...)
    │   └── avisos.ts     Servicio para lanzar esos mensajes
    ├── datos/            Datos de prueba y estado compartido
    │   ├── estado.ts     Estado que comparten varias pantallas (ej. una inscripción)
    │   └── *.ts          Datos de cada pantalla
    └── paginas/          Una carpeta por pantalla (inicio, red, proyectos, recursos, empleo, perfil)
public/
├── imagenes/             Fotos de las personas y logos de los centros
├── datos/mapa.json       Formas del mapa de "Mi red"
└── logo-linkedu.svg      Logo
```

### Cómo crear un componente nuevo

Siempre con el CLI, así se crean el `.ts`, el `.html` y el `.spec.ts` (test) juntos:

```bash
npx ng generate component compartido/nombre-del-componente
```

## Tailwind

- Los colores y las fuentes de la marca están en `src/styles.css` (bloque `@theme`), por eso
  en los `.html` se escribe `bg-marino`, `text-ink-muted`, `font-display`...
- Hay dos clases propias: `presionar` (el botón se hunde al pulsarlo) y `elevar`
  (la tarjeta se levanta al pasar el ratón).
- Solo se usan estilos en línea (`[style.left]`...) cuando el valor se calcula con datos,
  como las posiciones del mapa.

## Animaciones

Las animaciones están definidas en `styles.css` (`animate-subir`, `animate-ventana`,
`animate-pop`...) y se usan como cualquier clase de Tailwind. Las ventanas y los avisos
usan `animate.enter` y `animate.leave` de Angular para animar también cuando se cierran.
Si el sistema del usuario pide "menos movimiento", las animaciones se desactivan solas.

## Diseño de origen

La app copia el canvas de Claude Design "LinkEdu · Diseño de la app" (las 6 pantallas).
La copia de seguridad que hay en `../design/claude-design/pagina-inicio/` es más antigua y solo
tiene Inicio y Mi red. La versión buena es la del artifact enlazado en su README.

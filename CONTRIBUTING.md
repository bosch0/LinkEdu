# Cómo trabajar con Git en LinkEdu

Esta guía explica el flujo de trabajo del equipo. La idea principal:

> **Una rama nueva por cada tarea (feature), siempre desde `main`.**
> Cuando la tarea está lista, se une a `main` con un Pull Request (PR).

La rama `main` está protegida. Nadie hace `git push` directo a ella: todo
entra por Pull Request y lo revisa la otra persona.

## El dibujo

```
main ──●──────────────●──────────────●──►
        \            /  \            /
         ● ── ● ── ●     ● ── ● ── ●
        feature/login    diseno/paleta
```

Cada rama sale de `main`, se trabaja en ella y vuelve a `main`. Después se
borra. Las ramas duran poco (horas o pocos días), así casi no hay conflictos.

## Nombres de las ramas

Se usa `tipo/descripcion-corta`, en minúsculas y con guiones:

| Tipo | Para qué | Ejemplo |
|------|----------|---------|
| `feature/` | Algo nuevo en la app | `feature/pagina-login` |
| `fix/` | Arreglar un error | `fix/boton-no-responde` |
| `diseno/` | Diseño UI/UX y assets | `diseno/paleta-colores` |
| `docs/` | Documentos y memoria | `docs/manual-de-marca` |
| `video/` | Guion y vídeo | `video/guion-v1` |
| `chore/` | Configuración del repo | `chore/configuracion-repo` |

Una rama = **una sola tarea**. Si la tarea es grande, se divide en varias.

## Paso a paso

### 1. Empezar una tarea

Antes de crear la rama, asegúrate de tener `main` actualizada:

```bash
git switch main
git pull
git switch -c feature/pagina-login
```

`git switch -c` crea la rama nueva y se cambia a ella.

### 2. Trabajar y guardar cambios

```bash
git status                          # ver qué has cambiado
git add .                           # preparar los cambios
git commit -m "Añade formulario de login"
```

Haz commits pequeños y con un mensaje que diga **qué** has hecho
(en español, en presente: "Añade...", "Corrige...", "Cambia...").

### 3. Subir la rama a GitHub

La primera vez:

```bash
git push -u origin feature/pagina-login
```

Las siguientes veces basta con `git push`.

### 4. Abrir el Pull Request

1. Entra en el repositorio en GitHub. Verás un botón **Compare & pull request**.
2. Rellena la plantilla (qué cambia, por qué, cómo comprobarlo).
3. Pide a la otra persona que lo revise (**Reviewers**).

### 5. Revisión y unión

- La otra persona mira los cambios, comenta si hay algo que corregir y, si
  todo está bien, pulsa **Approve** y después **Merge**.
- Si te piden cambios, los haces en la **misma rama**, `git push`, y el PR se
  actualiza solo.
- Al unir, GitHub **borra la rama** automáticamente.

### 6. Volver a empezar

```bash
git switch main
git pull
git branch -d feature/pagina-login   # borra la rama en tu ordenador
```

Y para la siguiente tarea, vuelta al paso 1.

## Reglas de oro

- **Nunca** trabajes directamente en `main`.
- **Una rama, una tarea.** Así cada PR es fácil de revisar.
- **Actualiza `main` antes de crear una rama** nueva (`git pull`).
- **No subas** contraseñas, claves (`.env`) ni vídeos pesados. El `.gitignore`
  ya evita la mayoría, pero revisa con `git status` antes de hacer commit.
- **Mantén las ramas cortas.** Si una rama lleva muchos días abierta, se
  separa de `main` y salen conflictos.
- No toques el mismo archivo que la otra persona a la vez. Si es inevitable,
  avisaos.

## Si `main` ha cambiado mientras trabajabas

Pasa cuando la otra persona une su PR antes que tú. Trae los cambios a tu rama:

```bash
git switch feature/pagina-login
git pull origin main
```

Si Git avisa de **conflictos**, abre los archivos marcados, elige qué versión
se queda (o combina las dos), borra las marcas `<<<<<<<`, `=======`, `>>>>>>>`
y termina con:

```bash
git add .
git commit
git push
```

Si no sabes resolverlo, no pasa nada: pídelo en el grupo antes de seguir.

## El diario del proyecto

Al terminar el día se guarda lo hecho con `/cierre-dia` (ver `memoria/`).
Cada persona escribe en **su propio archivo** (`AAAA-MM-DD-nombre.md`), así
nunca hay conflictos. Esos archivos también viajan en una rama y entran por PR
como todo lo demás (por ejemplo, `docs/diario-2026-10-29`).

## Configuración del repositorio (para el dueño del repo)

En GitHub → **Settings**:

- **Branches → Add branch protection rule** para `main`:
  - Require a pull request before merging (con 1 aprobación)
  - Require conversation resolution before merging
  - Do not allow bypassing the above settings
  - Block force pushes y restrict deletions
- **General → Pull Requests**:
  - Activar *Automatically delete head branches*
  - Dejar solo un método de unión (por ejemplo, *Squash merging*)
- **Collaborators**: añadir a Antonio.
- **Code security**: activar *Secret scanning* si está disponible.

import { Directive, ElementRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { nombreDeFoto, rutaPerfilDeFoto, rutaPerfilDeNombre } from '../datos/personas';

/**
 * Base común: un elemento que, al pulsarlo, abre el perfil de una persona.
 * Para que un elemento concreto NO abra el perfil, se le pone el atributo data-sin-perfil
 * (o a un elemento que lo contenga).
 */
abstract class EnlacePerfil {
  protected el = inject<ElementRef<HTMLElement>>(ElementRef);
  private router = inject(Router);

  /** Ruta del perfil (null si no es de nadie con perfil). */
  protected abstract buscarRuta(): string | null;
  /** Nombre de la persona, para el texto de ayuda. */
  protected abstract nombre(): string;

  protected ruta() {
    if (this.el.nativeElement.closest('[data-sin-perfil]')) return null;
    return this.buscarRuta();
  }

  /** Si no está ya dentro de un botón o enlace, se puede llegar a él con el Tabulador. */
  protected propia() {
    return this.ruta() !== null && !this.el.nativeElement.parentElement?.closest('a, button');
  }

  protected abrir(e: Event) {
    const ruta = this.ruta();
    if (!ruta) return;
    // Que no se active también el botón o enlace que lo contiene
    e.preventDefault();
    e.stopPropagation();
    this.router.navigateByUrl(ruta);
  }
}

const HOST = {
  '[class.cursor-pointer]': 'ruta() !== null',
  // Subrayado al pasar el ratón (estilo en styles.css)
  '[attr.data-enlace-perfil]': 'ruta() !== null ? "" : null',
  '[attr.role]': 'propia() ? "link" : null',
  '[attr.tabindex]': 'propia() ? 0 : null',
  '[attr.title]': 'ruta() !== null ? "Ver el perfil de " + nombre() : null',
  '(click)': 'abrir($event)',
  '(keydown.enter)': 'abrir($event)',
};

/**
 * La foto de cualquier persona abre su perfil al pulsarla.
 * Se aplica sola a todas las <img>: si la foto es de alguien con perfil, se vuelve clicable;
 * si no (portadas, logos...), no cambia nada.
 */
@Directive({
  selector: 'img',
  host: { ...HOST, '[attr.aria-label]': 'propia() ? "Ver el perfil de " + nombre() : null' },
})
export class AbrePerfil extends EnlacePerfil {
  protected buscarRuta() {
    return rutaPerfilDeFoto(this.el.nativeElement.getAttribute('src'));
  }
  protected nombre() {
    return nombreDeFoto(this.el.nativeElement.getAttribute('src') ?? '');
  }
}

/**
 * El nombre de cualquier persona abre su perfil al pulsarlo.
 * Se aplica solo a los <strong> (o elementos con data-nombre) cuyo texto es el nombre de
 * alguien con perfil.
 */
@Directive({ selector: 'strong, [data-nombre]', host: HOST })
export class NombrePerfil extends EnlacePerfil {
  protected buscarRuta() {
    return rutaPerfilDeNombre(this.el.nativeElement.textContent);
  }
  protected nombre() {
    return this.el.nativeElement.textContent?.trim() ?? '';
  }
}

/** Las dos juntas, para importarlas de una vez en cada pantalla. */
export const ABRE_PERFIL = [AbrePerfil, NombrePerfil] as const;

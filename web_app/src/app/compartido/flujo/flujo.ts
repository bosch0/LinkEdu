import { Component, computed, effect, input, output, signal, untracked } from '@angular/core';
import { Confeti } from '../confeti/confeti';
import { Icono } from '../icono/icono';
import { Ventana } from '../ventana/ventana';

/** Textos y datos de una ventana de "solicitar algo en dos pasos" (unirse a un proyecto, inscribirse en una oferta...). */
export interface DatosFlujo {
  titulo: string;
  kickers: [string, string, string]; // texto pequeño de cada paso
  logo: string;
  logoEncaja: 'object-cover' | 'object-contain';
  organizacion: string;
  meta: string;
  grande: string;
  descripcion: string;
  puntos: string[];
  botonSolicitar: string;
  botonEnviar: string;
  etiquetaMensaje: string;
  ayudaMensaje: string;
  consentimiento: string;
  textoFinal: string;
}

/**
 * Ventana con 3 pasos: 1) información, 2) mensaje + confirmación, 3) "enviado".
 * El segundo paso es la confirmación: hay que marcar la casilla para poder enviar.
 */
@Component({
  selector: 'app-flujo',
  imports: [Ventana, Icono, Confeti],
  templateUrl: './flujo.html',
})
export class Flujo {
  abierta = input.required<boolean>();
  datos = input.required<DatosFlujo | null>();
  // Si ya se envió antes, la ventana se abre directamente en el paso 3
  yaEnviado = input(false);

  cerrar = output<void>();
  enviado = output<void>();

  protected paso = signal(1);
  protected mensaje = signal('');
  protected acepto = signal(false);
  protected disparo = signal(0);

  protected kicker = computed(() => this.datos()?.kickers[this.paso() - 1] ?? '');

  constructor() {
    // Cada vez que se abre la ventana, empieza de cero
    effect(() => {
      if (this.abierta()) {
        untracked(() => {
          this.paso.set(this.yaEnviado() ? 3 : 1);
          this.mensaje.set('');
          this.acepto.set(false);
        });
      }
    });
  }

  protected atras() {
    if (this.paso() === 2) this.paso.set(1);
    else this.cerrar.emit();
  }

  protected siguiente() {
    if (this.paso() === 1) {
      this.paso.set(2);
    } else if (this.paso() === 2) {
      if (!this.acepto()) return;
      this.paso.set(3);
      this.disparo.update((n) => n + 1); // ¡confeti!
      this.enviado.emit();
    } else {
      this.cerrar.emit();
    }
  }

  protected escribir(e: Event) {
    this.mensaje.set((e.target as HTMLTextAreaElement).value);
  }
}

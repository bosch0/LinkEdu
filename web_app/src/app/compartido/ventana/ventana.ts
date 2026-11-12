import { Component, input, output, signal } from '@angular/core';
import { Icono } from '../icono/icono';

/**
 * Ventana flotante (modal) con animación al abrir y al cerrar.
 *
 * Uso:
 *   <app-ventana [abierta]="ventana.abierta()" kicker="NUEVO" titulo="Crear proyecto" (cerrar)="ventana.cerrar()">
 *     ...contenido...
 *   </app-ventana>
 */
@Component({
  selector: 'app-ventana',
  imports: [Icono],
  host: { '(document:keydown.escape)': 'cerrar.emit()' },
  templateUrl: './ventana.html',
})
export class Ventana {
  abierta = input.required<boolean>();
  titulo = input.required<string>();
  kicker = input('');
  ancho = input(600);
  cerrar = output<void>();
}

/**
 * Guarda si una ventana está abierta y qué datos muestra.
 * El dato NO se borra al cerrar, así el contenido no desaparece
 * de golpe mientras la ventana hace su animación de salida.
 */
export class EstadoVentana<T> {
  abierta = signal(false);
  dato = signal<T | null>(null);

  abrir(dato: T) {
    this.dato.set(dato);
    this.abierta.set(true);
  }

  cerrar() {
    this.abierta.set(false);
  }
}

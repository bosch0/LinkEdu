import { Component, inject } from '@angular/core';
import { Avisos } from '../avisos';
import { Icono } from '../icono/icono';

/** Pinta los avisos en la esquina de la pantalla. Se pone una sola vez en app.html. */
@Component({
  selector: 'app-avisos',
  imports: [Icono],
  templateUrl: './avisos-lista.html',
})
export class AvisosLista {
  protected avisos = inject(Avisos);
}

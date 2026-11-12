import { Component, ElementRef, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { INDICE_BUSQUEDA, ResultadoBusqueda } from '../../datos/indice';
import { Icono } from '../icono/icono';

/** Buscador de la cabecera: escribe y salen personas, proyectos, recursos y ofertas. */
@Component({
  selector: 'app-buscador',
  imports: [Icono],
  host: {
    class: 'relative min-w-0 max-w-[420px] flex-[1_1_260px]',
    '(document:click)': 'clicFuera($event)',
    '(document:keydown.escape)': 'abierto.set(false)',
  },
  templateUrl: './buscador.html',
})
export class Buscador {
  private router = inject(Router);
  private elemento = inject(ElementRef);

  texto = signal('');
  abierto = signal(false);

  // Resultados que contienen el texto (sin mirar mayúsculas ni tildes)
  resultados = computed(() => {
    const q = quitaTildes(this.texto());
    if (!q) return [];
    return INDICE_BUSQUEDA.filter((r) => quitaTildes(r.titulo + ' ' + r.detalle).includes(q)).slice(
      0,
      6,
    );
  });

  escribir(e: Event) {
    this.texto.set((e.target as HTMLInputElement).value);
    this.abierto.set(true);
  }

  ir(r: ResultadoBusqueda) {
    this.router.navigateByUrl(r.ruta);
    this.texto.set('');
    this.abierto.set(false);
  }

  irAlPrimero() {
    const primero = this.resultados()[0];
    if (primero) this.ir(primero);
  }

  clicFuera(e: Event) {
    if (!this.elemento.nativeElement.contains(e.target)) this.abierto.set(false);
  }
}

function quitaTildes(t: string) {
  return t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}

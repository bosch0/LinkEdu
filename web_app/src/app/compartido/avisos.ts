import { Injectable, signal } from '@angular/core';

export interface Aviso {
  id: number;
  texto: string;
  icono: string;
  // Clases de Tailwind para el círculo del icono
  color: string;
}

/** Servicio para mostrar mensajes cortos ("Guardado", "Solicitud enviada"...). */
@Injectable({ providedIn: 'root' })
export class Avisos {
  lista = signal<Aviso[]>([]);
  private contador = 0;

  mostrar(texto: string, icono = 'check', color = 'bg-turquesa text-ink') {
    const id = ++this.contador;
    // Máximo 3 avisos a la vez
    this.lista.update((l) => [...l.slice(-2), { id, texto, icono, color }]);
    setTimeout(() => this.quitar(id), 3600);
  }

  quitar(id: number) {
    this.lista.update((l) => l.filter((a) => a.id !== id));
  }
}

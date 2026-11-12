import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AvisosLista } from './compartido/avisos-lista/avisos-lista';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AvisosLista],
  templateUrl: './app.html',
})
export class App {
  constructor() {
    // Si una foto falla al cargarse (por ejemplo, cuando el servidor está ocupado sirviendo
    // muchas imágenes a la vez), se vuelve a pedir una vez. El evento "error" de las
    // imágenes no sube por el HTML, por eso se escucha con "true" (fase de captura).
    document.addEventListener(
      'error',
      (evento) => {
        const img = evento.target;
        if (!(img instanceof HTMLImageElement) || img.dataset['reintento']) return;
        img.dataset['reintento'] = '1';
        const ruta = img.getAttribute('src') ?? '';
        setTimeout(() => img.setAttribute('src', ruta + '?reintento=1'), 400);
      },
      true,
    );
  }
}

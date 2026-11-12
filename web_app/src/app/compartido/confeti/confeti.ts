import { Component, computed, input } from '@angular/core';

const COLORES = [
  'bg-naranja',
  'bg-turquesa',
  'bg-amarillo',
  'bg-azul',
  'bg-marino',
  'bg-cielo-medio',
];

/**
 * Explosión de confeti para celebrar una acción importante.
 * Se pone dentro de un contenedor con "relative" y se dispara cambiando el número:
 *   <app-confeti [disparo]="contador()" />   (cada vez que sube el contador, salta el confeti)
 */
@Component({
  selector: 'app-confeti',
  templateUrl: './confeti.html',
})
export class Confeti {
  disparo = input(0);

  protected piezas = computed(() => {
    this.disparo(); // se vuelve a calcular en cada disparo
    return Array.from({ length: 36 }, () => {
      const angulo = Math.random() * Math.PI * 2;
      const fuerza = 90 + Math.random() * 180;
      return {
        color: COLORES[Math.floor(Math.random() * COLORES.length)],
        ancho: 6 + Math.random() * 6,
        alto: 8 + Math.random() * 8,
        dx: Math.cos(angulo) * fuerza,
        // Sube un poco y luego cae (la y positiva baja)
        dy: Math.sin(angulo) * fuerza + 120,
        giro: Math.random() * 720 - 360,
        retraso: Math.random() * 120,
      };
    });
  });
}

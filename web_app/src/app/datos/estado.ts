import { Injectable, signal } from '@angular/core';

/**
 * Estado compartido entre pantallas (en memoria, hasta que haya backend).
 * Así, si te inscribes en una oferta desde Inicio, también aparece inscrita en Empleo.
 * Cada "Record" guarda true/false por id.
 */
@Injectable({ providedIn: 'root' })
export class Estado {
  // Solicitudes de conexión enviadas (id de persona)
  conectados = signal<Record<string, boolean>>({});
  // Grupos a los que perteneces
  gruposUnidos = signal<Record<string, boolean>>({
    mat: true,
    abp: true,
    libres: true,
    rub: true,
    geo: true,
  });
  // Eventos a los que te has apuntado
  eventosApuntados = signal<Record<string, boolean>>({ sens: true });
  // Proyectos que has creado desde la pantalla de Inicio o Proyectos
  proyectosCreados = signal<{ nombre: string; visibilidad: string }[]>([]);
  // Solicitud para unirte al proyecto de ciencia ciudadana
  solicitudCiencia = signal(false);
  // Inscripción en la oferta de la Academia Pitágoras
  inscritaPitagoras = signal(false);

  /** Cambia un true/false de un Record guardado en una señal. */
  alternar(
    registro: { update: (f: (r: Record<string, boolean>) => Record<string, boolean>) => void },
    id: string,
  ) {
    registro.update((r) => ({ ...r, [id]: !r[id] }));
  }
}

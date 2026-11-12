import { OFERTAS } from './empleo';
import { PERSONAS, PROYECTOS } from './proyectos';
import { CATALOGO } from './recursos';

// Índice del buscador de la cabecera: cosas que se pueden encontrar escribiendo.
// Se construye con los datos de prueba de cada pantalla.
export interface ResultadoBusqueda {
  tipo: 'Persona' | 'Proyecto' | 'Recurso' | 'Oferta';
  titulo: string;
  detalle: string;
  icono: string;
  ruta: string;
}

export const INDICE_BUSQUEDA: ResultadoBusqueda[] = [
  ...Object.values(PERSONAS).map((p) => ({
    tipo: 'Persona' as const,
    titulo: p.nombre,
    detalle: p.cargo,
    icono: 'perfil',
    ruta: '/red',
  })),
  ...Object.values(PROYECTOS).map((p) => ({
    tipo: 'Proyecto' as const,
    titulo: p.titulo,
    detalle: p.estado + ' · ' + p.centros,
    icono: 'proyecto',
    ruta: '/proyectos',
  })),
  ...CATALOGO.map((r) => ({
    tipo: 'Recurso' as const,
    titulo: r.titulo,
    detalle: r.autor + ' · ' + r.materia,
    icono: 'recurso',
    ruta: '/recursos',
  })),
  ...Object.values(OFERTAS)
    .flat()
    .map((o) => ({
      tipo: 'Oferta' as const,
      titulo: o.titulo,
      detalle: o.empresa + ' · ' + o.lugar,
      icono: 'empleo',
      ruta: '/empleo',
    })),
];

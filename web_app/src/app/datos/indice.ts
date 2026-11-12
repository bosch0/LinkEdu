import { OFERTAS } from './empleo';
import { FOTOS } from './fotos';
import { PROYECTOS } from './proyectos';
import { DIRECTORIO, rutaPerfilDeFoto } from './personas';
import { CATALOGO } from './recursos';

// Índice del buscador de la cabecera: cosas que se pueden encontrar escribiendo.
// Se construye con los datos de prueba de cada pantalla.
export interface ResultadoBusqueda {
  tipo: 'Persona' | 'Proyecto' | 'Recurso' | 'Oferta';
  titulo: string;
  detalle: string;
  icono: string;
  ruta: string;
  foto?: string; // foto real de la persona (los demás resultados llevan icono)
}

export const INDICE_BUSQUEDA: ResultadoBusqueda[] = [
  // Todas las personas con perfil (Lucía es la usuaria; Álex es el alumno de ejemplo)
  ...[
    { nombre: 'Lucía Fernández Ortega', detalle: 'Matemáticas · Madrid', foto: FOTOS.lucia },
    { nombre: 'Álex Romero Gil', detalle: '2º de DAW · Madrid', foto: FOTOS.alex },
    ...Object.values(DIRECTORIO).map((d) => ({
      nombre: d.nombre,
      detalle: d.materia + ' · ' + d.ciudad,
      foto: d.foto,
    })),
  ].map((p) => ({
    tipo: 'Persona' as const,
    titulo: p.nombre,
    detalle: p.detalle,
    icono: 'perfil',
    foto: p.foto,
    ruta: rutaPerfilDeFoto(p.foto) ?? '/red', // abre su perfil
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

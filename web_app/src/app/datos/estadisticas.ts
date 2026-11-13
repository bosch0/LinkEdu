import { FOTOS } from './fotos';

// Datos de prueba de la pantalla "Estadísticas" (solo las ve Lucía, de su propio perfil).
// Hoy es 13 de noviembre: los 7 días son del 6 al 12 de noviembre.

export type Periodo = '7 días' | '28 días' | '90 días';
export type Metrica = 'impresiones' | 'interacciones' | 'visitas';

export interface DatosPeriodo {
  // Etiquetas del eje horizontal (una por punto de la gráfica)
  etiquetas: string[];
  // Qué es cada punto: un día o una semana
  unidad: string;
  series: Record<Metrica, number[]>;
  // Cambio frente al periodo anterior, en %
  cambio: Record<Metrica, number>;
  busquedas: number;
  cambioBusquedas: number;
  audiencia: number; // personas distintas que han visto tu contenido
}

export const PERIODOS: Periodo[] = ['7 días', '28 días', '90 días'];

export const METRICAS: { id: Metrica; texto: string; icono: string }[] = [
  { id: 'impresiones', texto: 'Impresiones', icono: 'compartir' },
  { id: 'interacciones', texto: 'Interacciones', icono: 'megusta' },
  { id: 'visitas', texto: 'Visitas al perfil', icono: 'perfil' },
];

export const ESTADISTICAS: Record<Periodo, DatosPeriodo> = {
  '7 días': {
    etiquetas: ['6 nov', '7 nov', '8 nov', '9 nov', '10 nov', '11 nov', '12 nov'],
    unidad: 'día',
    series: {
      impresiones: [1420, 1980, 2310, 2050, 2890, 1210, 980],
      interacciones: [96, 141, 170, 152, 214, 77, 58],
      visitas: [9, 14, 16, 12, 21, 8, 6],
    },
    cambio: { impresiones: 18.4, interacciones: 12.1, visitas: 34 },
    busquedas: 102,
    cambioBusquedas: 21,
    audiencia: 562,
  },
  '28 días': {
    etiquetas: ['16 oct', '23 oct', '30 oct', '6 nov'],
    unidad: 'semana',
    series: {
      impresiones: [8900, 10450, 9800, 12840],
      interacciones: [610, 720, 655, 908],
      visitas: [58, 71, 64, 86],
    },
    cambio: { impresiones: 9.7, interacciones: 6.2, visitas: 15 },
    busquedas: 388,
    cambioBusquedas: 11,
    audiencia: 1904,
  },
  '90 días': {
    etiquetas: [
      '14 ago',
      '21 ago',
      '28 ago',
      '4 sep',
      '11 sep',
      '18 sep',
      '25 sep',
      '2 oct',
      '9 oct',
      '16 oct',
      '23 oct',
      '30 oct',
      '6 nov',
    ],
    unidad: 'semana',
    series: {
      impresiones: [2100, 2350, 3900, 6200, 6900, 7400, 8200, 8100, 8800, 8900, 10450, 9800, 12840],
      interacciones: [120, 150, 260, 410, 470, 505, 560, 540, 600, 610, 720, 655, 908],
      visitas: [14, 17, 26, 41, 45, 49, 55, 52, 57, 58, 71, 64, 86],
    },
    cambio: { impresiones: 41, interacciones: 29, visitas: 52 },
    busquedas: 1140,
    cambioBusquedas: 38,
    audiencia: 5310,
  },
};

// ---------- Quién ha visto tu perfil ----------
export const VISITANTES = [
  {
    foto: FOTOS.elena,
    nombre: 'Elena Sanz Prieto',
    cargo: 'Matemáticas · IES Valle del Sol',
    cuando: 'Hace 2 h',
  },
  {
    foto: FOTOS.sergio,
    nombre: 'Sergio Blanco Ruiz',
    cargo: 'Matemáticas · Salamanca',
    cuando: 'Hace 5 h',
  },
  {
    foto: FOTOS.irene,
    nombre: 'Irene Pastor Llorente',
    cargo: 'Física y Química · Valencia',
    cuando: 'Ayer',
  },
  {
    foto: FOTOS.carmen,
    nombre: 'Carmen Luque Vega',
    cargo: 'Jefa de estudios · Sevilla',
    cuando: 'Hace 2 días',
  },
];

// Caras pequeñas de la tarjeta resumen (más personas que han visitado el perfil)
export const MAS_VISITANTES = [FOTOS.jordi, FOTOS.marta, FOTOS.andres, FOTOS.paula];

// ---------- Datos demográficos de quien ve tu contenido (en %) ----------
export const DEMOGRAFIA: Record<string, [string, number][]> = {
  Materia: [
    ['Matemáticas', 38],
    ['Tecnología', 14],
    ['Física y Química', 11],
    ['Orientación', 7],
    ['Lengua y Literatura', 6],
  ],
  Etapa: [
    ['ESO', 46],
    ['Bachillerato', 27],
    ['Formación Profesional', 14],
    ['Primaria', 8],
    ['Universidad', 5],
  ],
  Ubicación: [
    ['Madrid', 41],
    ['Barcelona', 9],
    ['Valencia', 8],
    ['Sevilla', 6],
    ['Salamanca', 5],
  ],
  'Tipo de cuenta': [
    ['Docentes', 72],
    ['Alumnos', 15],
    ['Centros y academias', 13],
  ],
};

// ---------- Apariciones en búsquedas ----------
// Qué escribieron quienes te encontraron (en % de las búsquedas)
export const TERMINOS_BUSQUEDA: [string, number][] = [
  ['Profesora de Matemáticas', 34],
  ['GeoGebra', 21],
  ['ABP Madrid', 18],
  ['Datos abiertos', 12],
  ['Estadística ESO', 9],
];

// Quién te buscó (suma 100 %). Las clases son el color de cada trozo de la barra.
export const QUIEN_BUSCA: { nombre: string; pct: number; clases: string }[] = [
  { nombre: 'Docentes', pct: 46, clases: 'bg-marino' },
  { nombre: 'Centros educativos', pct: 33, clases: 'bg-turquesa' },
  { nombre: 'Academias', pct: 21, clases: 'bg-amarillo' },
];

// ---------- Publicaciones con más alcance ----------
export const TOP_PUBLICACIONES = [
  {
    tipo: 'FICHA',
    clases: 'bg-turquesa text-ink',
    titulo: 'Estadística del mercado: fichas de campo',
    cuando: 'Hace 2 días',
    impresiones: 4820,
    interacciones: 79,
  },
  {
    tipo: 'PPT',
    clases: 'bg-azul text-white',
    titulo: 'Probabilidad con dados y cartas',
    cuando: 'Hace 2 semanas',
    impresiones: 2290,
    interacciones: 50,
  },
];

/** Número con punto de miles, como en el resto de la app: 12840 → "12.840", 1140 → "1.140". */
export function miles(n: number): string {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

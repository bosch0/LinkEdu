import { FOTOS } from './fotos';

// Datos de prueba de la pantalla "Recursos".

export type TipoRecurso = 'PDF' | 'Presentación' | 'Fichas' | 'Vídeo' | 'Juego' | 'Hoja de cálculo';

/** Recurso de otra persona (el catálogo que se explora). */
export interface Recurso {
  id: string;
  titulo: string;
  tipo: TipoRecurso;
  detalle: string;
  materia: string;
  autor: string;
  foto: string;
  coste: number; // 0 = gratis
  descargas: number;
  valoracion: string;
  pro?: boolean; // el autor tiene Premium
  estilo?: string; // diseño especial de la portada
}

/** Recurso tuyo (en "Mis recursos"). */
export interface MiRecurso {
  id: string;
  titulo: string;
  tipo: TipoRecurso;
  detalle: string;
  materia: string;
  meta: string;
  descargas: number;
  favs: number;
  privado?: boolean;
  coste?: number;
  nuevo?: boolean;
  portada?: string;
  descripcion?: string;
}

export interface Coleccion {
  id: string;
  nombre: string;
  ids: string[];
}

export const CATALOGO: Recurso[] = [
  {
    id: 'arduino',
    titulo: 'Robótica con Arduino: 6 sesiones',
    tipo: 'PDF',
    detalle: '24 PÁGS',
    materia: 'Tecnología · 4º ESO',
    autor: 'Javier Molina',
    foto: FOTOS.javier,
    coste: 0,
    descargas: 2310,
    valoracion: '4,9',
  },
  {
    id: 'probab',
    titulo: '40 problemas de probabilidad resueltos',
    tipo: 'PDF',
    detalle: '52 PÁGS',
    materia: 'Matemáticas · Bachillerato',
    autor: 'Carlos Pérez Nieto',
    foto: FOTOS.carlos,
    coste: 3.9,
    descargas: 486,
    valoracion: '4,7',
    pro: true,
  },
  {
    id: 'rubricas',
    titulo: 'Rúbricas editables para ABP',
    tipo: 'Fichas',
    detalle: '12 RÚBRICAS',
    materia: 'Orientación · ESO',
    autor: 'Paula Díez Romero',
    foto: FOTOS.paula,
    coste: 0,
    descargas: 811,
    valoracion: '4,6',
  },
  {
    id: 'escape',
    titulo: 'Escape room de ecuaciones',
    tipo: 'Juego',
    detalle: '8 RETOS',
    materia: 'Matemáticas · 2º ESO',
    autor: 'Carmen Luque Vega',
    foto: FOTOS.carmen,
    coste: 4.5,
    descargas: 302,
    valoracion: '4,9',
    pro: true,
    estilo: 'escape',
  },
  {
    id: 'lectora',
    titulo: 'Comprensión lectora: 30 fichas',
    tipo: 'Fichas',
    detalle: '30 FICHAS',
    materia: 'Lengua · Primaria',
    autor: 'Marta Ruiz Delgado',
    foto: FOTOS.marta,
    coste: 2.9,
    descargas: 1020,
    valoracion: '4,8',
    pro: true,
    estilo: 'lectora',
  },
  {
    id: 'video',
    titulo: 'Cinemática explicada en vídeo',
    tipo: 'Vídeo',
    detalle: '12 MIN',
    materia: 'Física · 1º Bachillerato',
    autor: 'Hugo Martín Rey',
    foto: FOTOS.hugo,
    coste: 0,
    descargas: 655,
    valoracion: '4,5',
  },
  {
    id: 'ine',
    titulo: 'Estadística con datos del INE',
    tipo: 'Presentación',
    detalle: '34 DIAPOS',
    materia: 'Matemáticas · 4º ESO',
    autor: 'Elena Sanz Prieto',
    foto: FOTOS.elena,
    coste: 0,
    descargas: 540,
    valoracion: '4,7',
  },
  {
    id: 'prensa',
    titulo: 'Leer gráficas en la prensa',
    tipo: 'Fichas',
    detalle: '10 FICHAS',
    materia: 'Matemáticas · ESO',
    autor: 'Nuria Gil Soler',
    foto: FOTOS.nuria,
    coste: 0,
    descargas: 728,
    valoracion: '4,6',
  },
  {
    id: 'roleplay',
    titulo: 'Role plays en inglés para Primaria',
    tipo: 'Presentación',
    detalle: '20 DIAPOS',
    materia: 'Inglés · Primaria',
    autor: 'Maite Arana Ruiz',
    foto: FOTOS.maite,
    coste: 1.9,
    descargas: 377,
    valoracion: '4,8',
    pro: true,
    estilo: 'roleplay',
  },
  {
    id: 'tabla',
    titulo: 'Tabla periódica para jugar en clase',
    tipo: 'Juego',
    detalle: '118 CARTAS',
    materia: 'Química · 3º ESO',
    autor: 'Lidia Moreno Paz',
    foto: FOTOS.lidia,
    coste: 0,
    descargas: 910,
    valoracion: '4,8',
  },
  {
    id: 'medieval',
    titulo: 'Línea del tiempo de la Edad Media',
    tipo: 'Presentación',
    detalle: '28 DIAPOS',
    materia: 'Historia · 2º ESO',
    autor: 'Andrés Vidal Ramos',
    foto: FOTOS.andres,
    coste: 2.5,
    descargas: 264,
    valoracion: '4,6',
    pro: true,
  },
  {
    id: 'microbit',
    titulo: 'Sensores y datos con micro:bit',
    tipo: 'Vídeo',
    detalle: '9 MIN',
    materia: 'Tecnología · 1º ESO',
    autor: 'Iker Etxeberria Sáez',
    foto: FOTOS.iker,
    coste: 0,
    descargas: 433,
    valoracion: '4,7',
  },
];

export const MIS_RECURSOS: MiRecurso[] = [
  {
    id: 'funciones',
    titulo: 'Funciones lineales con datos reales',
    tipo: 'PDF',
    detalle: '18 PÁGS',
    materia: 'Matemáticas · 3º ESO',
    meta: 'PDF · 18 págs · 3º ESO',
    descargas: 1248,
    favs: 96,
  },
  {
    id: 'dados',
    titulo: 'Probabilidad con dados y cartas',
    tipo: 'Presentación',
    detalle: '26 DIAPOS',
    materia: 'Matemáticas · 2º ESO',
    meta: 'Presentación · 26 diapos · 2º ESO',
    descargas: 640,
    favs: 51,
  },
  {
    id: 'campo',
    titulo: 'Estadística del mercado: fichas de campo',
    tipo: 'Fichas',
    detalle: '8 FICHAS',
    materia: 'Matemáticas · 1º ESO',
    meta: 'Fichas · 8 fichas · 1º ESO',
    descargas: 412,
    favs: 38,
  },
  {
    id: 'huerto',
    titulo: 'Geometría en el huerto escolar',
    tipo: 'PDF',
    detalle: '14 PÁGS',
    materia: 'Matemáticas · 1º ESO',
    meta: 'PDF · 14 págs · 1º ESO',
    descargas: 388,
    favs: 27,
  },
  {
    id: 'examen',
    titulo: 'Examen de funciones con solucionario',
    tipo: 'PDF',
    detalle: '6 PÁGS',
    materia: 'Matemáticas · 3º ESO',
    meta: 'PDF · 6 págs · 3º ESO',
    descargas: 302,
    favs: 22,
  },
  {
    id: 'notas',
    titulo: 'Cuaderno de notas con fórmulas',
    tipo: 'Hoja de cálculo',
    detalle: 'PLANTILLA',
    materia: 'Para docentes',
    meta: 'XLSX · plantilla',
    descargas: 214,
    favs: 19,
  },
  {
    id: 'verano',
    titulo: 'Cuaderno de verano 3º ESO',
    tipo: 'PDF',
    detalle: '40 PÁGS',
    materia: 'Matemáticas · 3º ESO',
    meta: 'PDF · 40 págs · 3º ESO',
    descargas: 118,
    favs: 9,
  },
  {
    id: 'porcent',
    titulo: 'Porcentajes en una infografía',
    tipo: 'Fichas',
    detalle: '1 LÁMINA',
    materia: 'Matemáticas · ESO',
    meta: 'Ficha · 1 lámina · ESO',
    descargas: 98,
    favs: 6,
  },
  {
    id: 'olimp',
    titulo: 'Banco de problemas de la olimpiada',
    tipo: 'PDF',
    detalle: 'BORRADOR',
    materia: 'Matemáticas · 4º ESO',
    meta: 'PDF · borrador privado',
    descargas: 0,
    favs: 0,
    privado: true,
  },
];

export const COLECCIONES: Coleccion[] = [
  { id: 'c3', nombre: 'Para 3º ESO', ids: ['ine', 'prensa', 'probab', 'arduino'] },
  { id: 'cm', nombre: 'Proyecto del mercado', ids: ['ine', 'prensa', 'rubricas'] },
  { id: 'cv', nombre: 'Repaso de verano', ids: ['lectora', 'escape', 'video', 'roleplay'] },
  { id: 'ct', nombre: 'Para la tutoría', ids: ['rubricas', 'lectora', 'video'] },
];

export const COMENTARIOS = [
  {
    id: 'c1',
    nombre: 'Rocío Campos León',
    foto: FOTOS.rocio,
    recurso: 'Funciones lineales con datos reales',
    cuando: 'hace 2 h',
    texto: 'Lo he usado con 3º y ha funcionado genial. ¿Tienes también la versión para 4º?',
  },
  {
    id: 'c2',
    nombre: 'Sergio Blanco Ruiz',
    foto: FOTOS.sergio,
    recurso: 'Geometría en el huerto escolar',
    cuando: 'ayer',
    texto: 'Gracias por compartirlo. Lo adaptamos para el huerto de Salamanca.',
  },
  {
    id: 'c3',
    nombre: 'Teresa Alonso Cano',
    foto: FOTOS.teresa,
    recurso: 'Probabilidad con dados y cartas',
    cuando: 'hace 3 días',
    texto: 'La diapositiva 12 tiene una errata en el resultado del ejercicio 4.',
  },
];

export const MAS_DESCARGADOS = [
  { id: 'arduino', semana: 214 },
  { id: 'funciones', semana: 168 },
  { id: 'lectora', semana: 131 },
  { id: 'rubricas', semana: 97 },
  { id: 'prensa', semana: 82 },
  { id: 'ine', semana: 74 },
];

export const INCLUYE: Record<TipoRecurso, string[]> = {
  PDF: ['Documento listo para imprimir', 'Soluciones al final', 'Licencia para uso en clase'],
  Presentación: ['Diapositivas editables', 'Notas para el docente', 'Actividad final incluida'],
  Fichas: ['Fichas imprimibles y editables', 'Solucionario', 'Versión adaptada para NEE'],
  Vídeo: ['Vídeo en alta calidad', 'Subtítulos en español', 'Preguntas para después'],
  Juego: ['Retos imprimibles', 'Guía para el docente', 'Pistas y soluciones'],
  'Hoja de cálculo': ['Plantilla con fórmulas', 'Instrucciones de uso', 'Ejemplo relleno'],
};

export const VENTAJAS_PREMIUM = [
  'Sube recursos de pago y cobra por ellos',
  'Recibes el 85 % de cada venta',
  'Insignia PRO en tu perfil y tus recursos',
  'Estadísticas detalladas de descargas',
];

// Clase de color de cada tipo de recurso (para la banda de la tarjeta)
export const COLOR_TIPO: Record<TipoRecurso, string> = {
  PDF: 'bg-marino',
  Presentación: 'bg-azul',
  Fichas: 'bg-verde',
  Vídeo: 'bg-[#5b3a8c]',
  Juego: 'bg-[#c2560f]',
  'Hoja de cálculo': 'bg-[#2f6b3a]',
};

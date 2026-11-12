import { FOTOS } from './fotos';
import { DatosFlujo } from '../compartido/flujo/flujo';

// ---------- Datos de prueba de la pantalla de Inicio ----------
// (Cuando haya backend, esto vendrá de una API.)
// Los colores son clases de Tailwind (bg-..., text-...).

export interface Grupo {
  id: string;
  nombre: string;
  miembros: string;
  color: string;
  novedades: number;
  descripcion: string;
}

export interface Comentario {
  foto: string;
  nombre: string;
  texto: string;
}

export interface Publicacion {
  id: string;
  foto: string;
  nombre: string;
  meta: string;
  texto: string;
  etiqueta?: { texto: string; clases: string };
  adjunto?: { tipo: string; clases: string; titulo: string; meta: string };
  estadisticas?: { n: string; etiqueta: string; fondo: string }[];
  megusta: number;
  comentarios: number;
  hilo: Comentario[];
}

export type TipoPublicacion = 'Recurso' | 'Proyecto' | 'Evento';

export const MIS_PROYECTOS = [
  { titulo: 'Matemáticas en el mercado', meta: '4 centros · activo', color: 'bg-turquesa' },
  { titulo: 'Radio escolar FP + ESO', meta: '2 centros · activo', color: 'bg-azul' },
  { titulo: 'Olimpiada de estadística', meta: 'Borrador', color: 'bg-amarillo' },
];

export const GRUPOS: Grupo[] = [
  {
    id: 'mat',
    nombre: 'Matemáticas ESO',
    miembros: '1.204',
    color: 'bg-turquesa',
    novedades: 5,
    descripcion: 'Ideas y materiales de Matemáticas para ESO',
  },
  {
    id: 'abp',
    nombre: 'ABP en Madrid',
    miembros: '386',
    color: 'bg-amarillo',
    novedades: 2,
    descripcion: 'Proyectos entre centros de la Comunidad de Madrid',
  },
  {
    id: 'libres',
    nombre: 'Docentes libres',
    miembros: '2.117',
    color: 'bg-naranja',
    novedades: 0,
    descripcion: 'Recursos abiertos con licencia libre',
  },
  {
    id: 'rub',
    nombre: 'Evaluación con rúbricas',
    miembros: '642',
    color: 'bg-cielo-medio',
    novedades: 0,
    descripcion: 'Rúbricas y evaluación formativa',
  },
  {
    id: 'geo',
    nombre: 'GeoGebra en el aula',
    miembros: '918',
    color: 'bg-azul',
    novedades: 0,
    descripcion: 'Applets y actividades listas para clase',
  },
  {
    id: 'datos',
    nombre: 'Datos abiertos en clase',
    miembros: '271',
    color: 'bg-verde',
    novedades: 0,
    descripcion: 'Estadística con datos públicos reales',
  },
  {
    id: 'fp',
    nombre: 'FP y ESO juntos',
    miembros: '455',
    color: 'bg-naranja-oscuro',
    novedades: 0,
    descripcion: 'Proyectos que mezclan FP y Secundaria',
  },
];

export const ULTIMOS_DEL_GRUPO = [
  {
    foto: FOTOS.nuria,
    nombre: 'Nuria Gil',
    cuando: 'hace 1 h',
    texto: '¿Alguien tiene un examen de funciones con datos reales para 3º?',
  },
  {
    foto: FOTOS.carlos,
    nombre: 'Carlos Pérez',
    cuando: 'hace 3 h',
    texto: 'Comparto mis 40 problemas de probabilidad resueltos, con soluciones.',
  },
  {
    foto: FOTOS.andres,
    nombre: 'Andrés López',
    cuando: 'ayer',
    texto: 'Mañana hago un directo sobre GeoGebra 3D. ¡Os espero!',
  },
];

export const RECURSOS_MATERIA = [
  {
    tipo: 'PDF',
    clases: 'bg-marino text-white',
    titulo: 'Funciones lineales con datos reales',
    meta: 'PDF · 1.248 descargas',
  },
  {
    tipo: 'PPT',
    clases: 'bg-azul text-white',
    titulo: 'Probabilidad con dados y cartas',
    meta: 'PRESENTACIÓN · 640',
  },
  {
    tipo: 'DOC',
    clases: 'bg-turquesa text-ink',
    titulo: 'Rúbrica de ABP para ESO',
    meta: 'DOC · 811 descargas',
  },
];

export const PUBLICACIONES: Publicacion[] = [
  {
    id: 'javier',
    foto: FOTOS.javier,
    nombre: 'Javier Molina',
    meta: 'Profesor de Tecnología · FP · hace 2 h',
    texto:
      'He subido la unidad didáctica de robótica con Arduino que usamos en 4º de ESO. Es libre: adáptala a tu grupo y cuéntame qué tal.',
    adjunto: {
      tipo: 'PDF',
      clases: 'bg-marino text-white',
      titulo: 'Robótica con Arduino: 6 sesiones',
      meta: '24 páginas · Tecnología · 4º ESO',
    },
    megusta: 48,
    comentarios: 12,
    hilo: [
      {
        foto: FOTOS.iker,
        nombre: 'Iker',
        texto: 'La probamos en FP la semana pasada y funcionó genial.',
      },
      { foto: FOTOS.nuria, nombre: 'Nuria', texto: '¿Sirve para 3º de ESO con algún ajuste?' },
    ],
  },
  {
    id: 'elena',
    foto: FOTOS.elena,
    nombre: 'Elena Sanz Prieto',
    meta: 'Matemáticas en el mercado · hace 5 h',
    texto:
      'Primera salida al mercado terminada: el alumnado de los cuatro centros ya ha recogido los precios de todos los puestos. La semana que viene empezamos con las gráficas.',
    etiqueta: { texto: 'Tu proyecto', clases: 'bg-verde-soft text-verde' },
    estadisticas: [
      { n: '120', etiqueta: 'alumnos participando', fondo: 'bg-azul-soft' },
      { n: '14', etiqueta: 'puestos analizados', fondo: 'bg-verde-soft' },
      { n: '4', etiqueta: 'centros conectados', fondo: 'bg-amarillo-soft' },
    ],
    megusta: 31,
    comentarios: 7,
    hilo: [
      {
        foto: FOTOS.jordi,
        nombre: 'Jordi',
        texto: 'En Barcelona vamos el jueves, os paso los datos.',
      },
      { foto: FOTOS.amparo, nombre: 'Amparo', texto: '¡Qué ganas de ver las gráficas!' },
    ],
  },
];

export const ETIQUETAS_TIPO: Record<
  TipoPublicacion,
  { clases: string; icono: string; ayuda: string }
> = {
  Recurso: {
    clases: 'bg-azul-soft text-azul',
    icono: 'recurso',
    ayuda: 'Comparte un recurso o una idea con tu claustro',
  },
  Proyecto: {
    clases: 'bg-marino-soft text-marino',
    icono: 'proyecto',
    ayuda: 'Cuenta en qué proyecto buscas centros',
  },
  Evento: {
    clases: 'bg-naranja-soft text-naranja-oscuro',
    icono: 'calendario',
    ayuda: 'Anuncia un evento, taller o reunión',
  },
};

export const DOCENTES_SUGERIDOS = [
  { id: 'marta', foto: FOTOS.marta, nombre: 'Marta Ruiz Delgado', cargo: 'Lengua · Primaria' },
  {
    id: 'carlos',
    foto: FOTOS.carlos,
    nombre: 'Carlos Pérez Nieto',
    cargo: 'Matemáticas · Bachillerato',
  },
  { id: 'nuria', foto: FOTOS.nuria, nombre: 'Nuria Gil Soler', cargo: 'Matemáticas · ESO' },
  { id: 'andres', foto: FOTOS.andres, nombre: 'Andrés López Vega', cargo: 'Matemáticas · FP' },
];

export const EVENTOS = [
  {
    id: 'sens',
    mes: 'NOV',
    dia: '14',
    titulo: 'Sensores: sesión con 3 centros',
    meta: '17:30 · En línea',
    clases: 'bg-marino text-white',
  },
  {
    id: 'web',
    mes: 'NOV',
    dia: '19',
    titulo: 'Webinar: evaluar con rúbricas',
    meta: '18:30 · En línea',
    clases: 'bg-azul text-white',
  },
  {
    id: 'mad',
    mes: 'NOV',
    dia: '26',
    titulo: 'Encuentro de docentes de Madrid',
    meta: '17:00 · Madrid',
    clases: 'bg-naranja text-ink',
  },
  {
    id: 'geo',
    mes: 'DIC',
    dia: '03',
    titulo: 'Taller de GeoGebra 3D',
    meta: '18:00 · En línea',
    clases: 'bg-turquesa text-ink',
  },
];

export const SEMANA = [
  {
    n: '64',
    texto: 'descargas',
    detalle: 'de tus recursos · +18 %',
    icono: 'descargar',
    clases: 'bg-azul-soft text-azul',
    ruta: '/recursos',
  },
  {
    n: '3',
    texto: 'validaciones nuevas',
    detalle: 'Estadística aplicada y GeoGebra',
    icono: 'check',
    clases: 'bg-verde-soft text-verde',
    ruta: '/perfil',
  },
  {
    n: '86',
    texto: 'visitas a tu perfil',
    detalle: '2 de academias y centros',
    icono: 'perfil',
    clases: 'bg-amarillo-soft text-naranja-oscuro',
    ruta: '/perfil',
  },
];

// ---------- Ventanas de "solicitar en dos pasos" ----------
export const FLUJO_CIENCIA: DatosFlujo = {
  titulo: 'Ciencia ciudadana: medimos el aire del barrio',
  kickers: ['PROYECTO COLABORATIVO', 'SOLICITUD · PASO 2 DE 2', 'SOLICITUD ENVIADA'],
  logo: FOTOS.marta,
  logoEncaja: 'object-cover',
  organizacion: 'Coordina Marta Ruiz',
  meta: '3 de 5 centros · hasta el 15 nov',
  grande: '2 plazas',
  descripcion:
    'Cada centro monta dos sensores de calidad del aire y comparte los datos en una hoja común. Tu parte sería guiar el análisis estadístico con 3º y 4º de ESO.',
  puntos: [
    'Una sesión en línea al mes con los otros centros',
    'Materiales y sensores ya preparados',
    'Validaciones de habilidades al terminar',
  ],
  botonSolicitar: 'Solicitar unirme',
  botonEnviar: 'Enviar solicitud',
  etiquetaMensaje: 'Mensaje para Marta',
  ayudaMensaje: 'Por ejemplo: qué grupos llevarías y cuándo podrías empezar.',
  consentimiento:
    'Acepto compartir mi perfil con los docentes del proyecto y aparecer como participante si me aceptan.',
  textoFinal: 'Solicitud enviada a Marta Ruiz. Te avisaremos cuando responda.',
};

export const FLUJO_PITAGORAS: DatosFlujo = {
  titulo: 'Docente de Matemáticas para refuerzo online',
  kickers: ['EMPLEO · NUEVO', 'INSCRIPCIÓN · PASO 2 DE 2', 'INSCRIPCIÓN ENVIADA'],
  logo: FOTOS.pitagoras,
  logoEncaja: 'object-contain',
  organizacion: 'Academia Pitágoras',
  meta: 'Remoto · 6 h/semana · tardes',
  grande: '28 €/h',
  descripcion:
    'Grupos de 6 alumnos de 4º de ESO, de lunes a jueves de 17:00 a 18:30. Preparas las sesiones con su banco de ejercicios y te acompaña una coordinadora el primer mes.',
  puntos: [
    'Encajas en 3 de 3 habilidades que piden',
    'Contrato por horas desde enero',
    'Material y plataforma incluidos',
  ],
  botonSolicitar: 'Inscribirme',
  botonEnviar: 'Enviar candidatura',
  etiquetaMensaje: 'Mensaje para la academia',
  ayudaMensaje: 'Cuéntales en dos frases por qué encajas.',
  consentimiento:
    'Acepto que Academia Pitágoras vea mi perfil completo y mis datos de contacto para esta oferta.',
  textoFinal: 'Candidatura enviada. Puedes seguir su estado desde Empleo.',
};

import { FOTOS } from './fotos';

// Notificaciones de Lucía (la campana de la cabecera). Datos de prueba.

export interface Notificacion {
  id: string;
  foto: string; // foto real de la persona (o logo del centro)
  esPersona: boolean;
  pre: string;
  fuerte: string; // nombre de la persona: al pulsarlo abre su perfil
  post: string;
  cuando: string;
  icono: string; // icono pequeño sobre la foto
  clases: string; // color del icono pequeño
  ruta: string; // pantalla que abre al pulsar la notificación
  nueva: boolean;
}

export const NOTIFICACIONES: Notificacion[] = [
  {
    id: 'val-elena',
    foto: FOTOS.elena,
    esPersona: true,
    pre: '',
    fuerte: 'Elena Sanz Prieto',
    post: 'ha validado tu habilidad «Aprendizaje basado en proyectos».',
    cuando: '12 min',
    icono: 'check',
    clases: 'bg-turquesa text-ink',
    ruta: '/perfil',
    nueva: true,
  },
  {
    id: 'inv-sergio',
    foto: FOTOS.sergio,
    esPersona: true,
    pre: '',
    fuerte: 'Sergio Blanco Ruiz',
    post: 'quiere conectar contigo. Tenéis 6 contactos en común.',
    cuando: '1 h',
    icono: 'conectar',
    clases: 'bg-azul text-white',
    ruta: '/red',
    nueva: true,
  },
  {
    id: 'com-jordi',
    foto: FOTOS.jordi,
    esPersona: true,
    pre: '',
    fuerte: 'Jordi Puig Ferrer',
    post: 'ha comentado tu publicación sobre las fichas de campo del mercado.',
    cuando: '3 h',
    icono: 'comentar',
    clases: 'bg-amarillo text-ink',
    ruta: '/perfil',
    nueva: true,
  },
  {
    id: 'oferta-pitagoras',
    foto: FOTOS.pitagoras,
    esPersona: false,
    pre: 'La',
    fuerte: 'Academia Pitágoras',
    post: 'ha publicado una oferta que encaja con tu perfil: profesora de refuerzo de Matemáticas.',
    cuando: '5 h',
    icono: 'empleo',
    clases: 'bg-naranja text-ink',
    ruta: '/empleo',
    nueva: false,
  },
  {
    id: 'proy-amparo',
    foto: FOTOS.amparo,
    esPersona: true,
    pre: '',
    fuerte: 'Amparo Ferrandis Gil',
    post: 'ha subido 3 tareas nuevas a «Matemáticas en el mercado».',
    cuando: 'Ayer',
    icono: 'proyecto',
    clases: 'bg-marino text-white',
    ruta: '/proyectos',
    nueva: false,
  },
  {
    id: 'rec-irene',
    foto: FOTOS.irene,
    esPersona: true,
    pre: '',
    fuerte: 'Irene Pastor Llorente',
    post: 'ha descargado tu recurso «Funciones lineales con datos reales».',
    cuando: 'Ayer',
    icono: 'descargar',
    clases: 'bg-cielo text-ink',
    ruta: '/recursos',
    nueva: false,
  },
  {
    id: 'vis-carmen',
    foto: FOTOS.carmen,
    esPersona: true,
    pre: '',
    fuerte: 'Carmen Luque Vega',
    post: 'y 85 personas más han visto tu perfil esta semana.',
    cuando: '2 d',
    icono: 'perfil',
    clases: 'bg-verde text-white',
    ruta: '/estadisticas',
    nueva: false,
  },
];

// Datos de prueba de la pantalla "Proyectos".
// "lucia" es la persona que ha iniciado sesión.

export interface PersonaProyecto {
  nombre: string;
  corto: string;
  cargo: string;
  foto: string;
}

export interface TareaProyecto {
  titulo: string;
  quien: string; // id de la persona
  vence: string;
  estado: number; // 0 = por hacer, 1 = en curso, 2 = hecha
  etiqueta: string;
}

export interface MensajeChat {
  quien: string;
  texto: string;
  hora: string;
}

export interface ReunionProyecto {
  mes: string;
  dia: string;
  titulo: string;
  meta: string;
}

export interface Proyecto {
  id: string;
  titulo: string;
  corto: string;
  visibilidad: 'Público' | 'Privado';
  estado: 'Activo' | 'Borrador' | 'Finalizado';
  color: string; // clase de Tailwind
  resumen: string;
  centros: string;
  fechas: string;
  progreso: number;
  tareasTexto: string;
  miembros: string[];
  // quién tiene qué habilidad y quién se la ha validado: validaciones[persona][habilidad] = [validadores]
  validaciones: Record<string, Record<string, string[]>>;
  frases: Record<string, { quien: string; texto: string }>;
  tareas?: TareaProyecto[];
  chat?: MensajeChat[];
  reuniones?: ReunionProyecto[];
  habilidades?: string[]; // habilidades elegidas al crear el proyecto
}

export const PERSONAS: Record<string, PersonaProyecto> = {
  lucia: {
    nombre: 'Lucía Fernández Ortega',
    corto: 'Lucía',
    cargo: 'Matemáticas · Madrid',
    foto: 'imagenes/318f5935fdaf85b36293d86ef5c3f2b6.jpg',
  },
  elena: {
    nombre: 'Elena Sanz Prieto',
    corto: 'Elena',
    cargo: 'Matemáticas · ESO · Madrid',
    foto: 'imagenes/54857d9a7b150e6e1114b2b43d4a303b.jpg',
  },
  amparo: {
    nombre: 'Amparo Ferrandis Gil',
    corto: 'Amparo',
    cargo: 'Matemáticas · ESO · Valencia',
    foto: 'imagenes/e9e83a615a697ebaca43fd0f244335f6.jpg',
  },
  jordi: {
    nombre: 'Jordi Puig Ferrer',
    corto: 'Jordi',
    cargo: 'Matemáticas · Bachillerato · Barcelona',
    foto: 'imagenes/b694740183a71b4e395586110be41fbc.jpg',
  },
  rocio: {
    nombre: 'Rocío Campos León',
    corto: 'Rocío',
    cargo: 'Matemáticas · Primaria · Sevilla',
    foto: 'imagenes/43952f64025d47ca7dc00289673ef628.jpg',
  },
  javier: {
    nombre: 'Javier Molina',
    corto: 'Javier',
    cargo: 'Tecnología · FP · Valencia',
    foto: 'imagenes/4b045af20015bcef2e4206fed41e32cc.jpg',
  },
  iker: {
    nombre: 'Iker Etxeberria Sáez',
    corto: 'Iker',
    cargo: 'Robótica · FP · Bilbao',
    foto: 'imagenes/d6d835fa202bb0e13a65410011d69267.jpg',
  },
  lidia: {
    nombre: 'Lidia Moreno Paz',
    corto: 'Lidia',
    cargo: 'Tecnología · Madrid',
    foto: 'imagenes/10af080e6758725651d1e55ec3eba00b.jpg',
  },
  nuria: {
    nombre: 'Nuria Gil Soler',
    corto: 'Nuria',
    cargo: 'Matemáticas · ESO · Santander',
    foto: 'imagenes/8904087697c797924c37a5f66f5b2ec5.jpg',
  },
  paula: {
    nombre: 'Paula Díez Romero',
    corto: 'Paula',
    cargo: 'Orientación · ESO · Madrid',
    foto: 'imagenes/b2d042b7b34e78e1d2dfd69551620005.jpg',
  },
  sergio: {
    nombre: 'Sergio Blanco Ruiz',
    corto: 'Sergio',
    cargo: 'Matemáticas · Salamanca',
    foto: 'imagenes/3aa671cddfec942dab42bd0988f07998.jpg',
  },
  hugo: {
    nombre: 'Hugo Martín Rey',
    corto: 'Hugo',
    cargo: 'Física · Bachillerato · Madrid',
    foto: 'imagenes/bc0aabedc0a35e854f57407788451189.jpg',
  },
  ane: {
    nombre: 'Ane Urrutia Goñi',
    corto: 'Ane',
    cargo: 'Matemáticas · ESO · Bilbao',
    foto: 'imagenes/83eb3576cb3a3a5860bda0988a0d3c3a.jpg',
  },
  carlos: {
    nombre: 'Carlos Pérez Nieto',
    corto: 'Carlos',
    cargo: 'Matemáticas · Bachillerato · Alicante',
    foto: 'imagenes/28657f050501adb743b2d5c79a3f7273.jpg',
  },
  marta: {
    nombre: 'Marta Ruiz Delgado',
    corto: 'Marta',
    cargo: 'Lengua · Primaria · Cádiz',
    foto: 'imagenes/a2ac8ec29daeb20c4d28dc3f35572f2b.jpg',
  },
  carmen: {
    nombre: 'Carmen Luque Vega',
    corto: 'Carmen',
    cargo: 'Matemáticas · ESO · Málaga',
    foto: 'imagenes/0a932f04265884ab181618e4fc0ddbfc.jpg',
  },
  teresa: {
    nombre: 'Teresa Alonso Cano',
    corto: 'Teresa',
    cargo: 'Matemáticas · ESO · Valladolid',
    foto: 'imagenes/9d1ce8cad01712849a89ed981286329f.jpg',
  },
  manuel: {
    nombre: 'Manuel Ortega Lara',
    corto: 'Manuel',
    cargo: 'Tecnología · ESO · Sevilla',
    foto: 'imagenes/1c61e2e8e2fd9353bbb800625d14dd91.jpg',
  },
  oscar: {
    nombre: 'Óscar Herrero Mata',
    corto: 'Óscar',
    cargo: 'Informática · FP · Valladolid',
    foto: 'imagenes/1642bf9b80fdde6c9c365cd9887ada88.jpg',
  },
};

export const PROYECTOS: Record<string, Proyecto> = {
  mercado: {
    id: 'mercado',
    titulo: 'Matemáticas en el mercado',
    corto: 'Matemáticas en el mercado',
    visibilidad: 'Público',
    estado: 'Activo',
    color: 'bg-turquesa',
    resumen:
      'Cuatro centros llevan las matemáticas al mercado de su barrio: precios, porcentajes y estadística con datos que recoge el propio alumnado.',
    centros: '4 centros · Madrid, Valencia, Barcelona y Sevilla',
    fechas: 'Sep 2026 – Feb 2027',
    progreso: 62,
    tareasTexto: '18 de 29 tareas',
    miembros: ['lucia', 'elena', 'amparo', 'jordi', 'rocio'],
    validaciones: {
      lucia: {
        'Estadística aplicada': ['elena', 'jordi', 'amparo'],
        GeoGebra: ['rocio', 'elena'],
        'Aprendizaje basado en proyectos': ['amparo'],
      },
      elena: { GeoGebra: ['jordi'], 'Evaluación con rúbricas': ['amparo', 'rocio'] },
      amparo: {
        'Aprendizaje basado en proyectos': ['elena', 'rocio'],
        'Salidas didácticas': ['jordi'],
      },
      jordi: { 'Estadística aplicada': ['amparo'], GeoGebra: [] },
      rocio: {
        'Salidas didácticas': ['elena', 'amparo'],
        'Aprendizaje basado en proyectos': ['jordi'],
      },
    },
    frases: {
      'Estadística aplicada': {
        quien: 'elena',
        texto: 'Hizo que 4º entendiera la desviación típica con los precios del mercado.',
      },
      GeoGebra: {
        quien: 'rocio',
        texto: 'Sus applets de GeoGebra los usamos en los cuatro centros.',
      },
      'Aprendizaje basado en proyectos': {
        quien: 'amparo',
        texto: 'Organizó todo el proyecto por retos semanales.',
      },
    },
    tareas: [
      {
        titulo: 'Encuesta de precios en 14 puestos',
        quien: 'rocio',
        vence: 'Hecha',
        estado: 2,
        etiqueta: 'Trabajo de campo',
      },
      {
        titulo: 'Hoja de cálculo común con los datos',
        quien: 'lucia',
        vence: '15 nov',
        estado: 1,
        etiqueta: 'Datos',
      },
      {
        titulo: 'Gráficas comparativas por ciudad',
        quien: 'jordi',
        vence: '22 nov',
        estado: 1,
        etiqueta: 'Estadística',
      },
      {
        titulo: 'Rúbrica de evaluación final',
        quien: 'elena',
        vence: '29 nov',
        estado: 0,
        etiqueta: 'Evaluación',
      },
      {
        titulo: 'Visita al mercado con familias',
        quien: 'amparo',
        vence: '4 dic',
        estado: 0,
        etiqueta: 'Salida',
      },
      {
        titulo: 'Fichas de campo para 1º ESO',
        quien: 'lucia',
        vence: 'Hecha',
        estado: 2,
        etiqueta: 'Materiales',
      },
      {
        titulo: 'Informe de resultados por centro',
        quien: 'jordi',
        vence: '11 dic',
        estado: 0,
        etiqueta: 'Datos',
      },
      {
        titulo: 'Presentación final para las familias',
        quien: 'rocio',
        vence: '18 dic',
        estado: 0,
        etiqueta: 'Difusión',
      },
    ],
    chat: [
      {
        quien: 'elena',
        texto: 'Ya he subido las rúbricas al tablero, mirad si os encajan.',
        hora: 'Ayer 18:02',
      },
      {
        quien: 'jordi',
        texto: 'Las gráficas de Barcelona estarán el viernes.',
        hora: 'Ayer 19:15',
      },
      {
        quien: 'lucia',
        texto: 'Genial. ¿Hacemos la reunión el jueves a las 17:30?',
        hora: 'Hoy 9:10',
      },
      { quien: 'rocio', texto: 'Me va bien. Llevo los datos de Sevilla.', hora: 'Hoy 9:24' },
      { quien: 'amparo', texto: 'Perfecto, yo preparo la visita con familias.', hora: 'Hoy 9:40' },
    ],
    reuniones: [
      {
        mes: 'NOV',
        dia: '14',
        titulo: 'Coordinación de datos',
        meta: 'Jueves · 17:30 · videollamada',
      },
      {
        mes: 'DIC',
        dia: '04',
        titulo: 'Visita al mercado',
        meta: 'Miércoles · 10:00 · Mercado de Chamberí',
      },
    ],
  },
  radio: {
    id: 'radio',
    titulo: 'Radio escolar FP + ESO',
    corto: 'Radio escolar',
    visibilidad: 'Público',
    estado: 'Activo',
    color: 'bg-azul',
    resumen:
      'El alumnado de FP de Sonido produce con 3º de ESO un programa mensual. Lucía coordina la sección de divulgación matemática.',
    centros: '3 centros · Madrid, Valencia y Bilbao',
    fechas: 'Oct 2026 – Jun 2027',
    progreso: 35,
    tareasTexto: '7 de 20 tareas',
    miembros: ['lucia', 'javier', 'iker', 'lidia'],
    validaciones: {
      lucia: { 'Guion radiofónico': ['javier', 'lidia'], 'Coordinación FP y ESO': ['iker'] },
      javier: { Audacity: ['iker', 'lidia'], 'Coordinación FP y ESO': ['lidia'] },
      iker: { Audacity: ['javier'], Locución: [] },
      lidia: { Locución: ['javier', 'iker'], 'Guion radiofónico': ['javier'] },
    },
    frases: {
      'Guion radiofónico': {
        quien: 'javier',
        texto: 'Escribió los guiones de divulgación más claros del programa.',
      },
      'Coordinación FP y ESO': {
        quien: 'iker',
        texto: 'Cuadró los horarios de dos etapas sin un solo choque.',
      },
    },
    tareas: [
      {
        titulo: 'Guion del programa de noviembre',
        quien: 'lucia',
        vence: '18 nov',
        estado: 1,
        etiqueta: 'Guion',
      },
      {
        titulo: 'Grabación en el estudio de FP',
        quien: 'javier',
        vence: '25 nov',
        estado: 0,
        etiqueta: 'Grabación',
      },
      {
        titulo: 'Sintonía y cortinillas',
        quien: 'iker',
        vence: 'Hecha',
        estado: 2,
        etiqueta: 'Sonido',
      },
      {
        titulo: 'Entrevista a una matemática',
        quien: 'lidia',
        vence: '2 dic',
        estado: 0,
        etiqueta: 'Contenido',
      },
      {
        titulo: 'Edición del episodio 1',
        quien: 'iker',
        vence: 'Hecha',
        estado: 2,
        etiqueta: 'Sonido',
      },
    ],
    chat: [
      {
        quien: 'javier',
        texto: 'El estudio está libre el martes 25 por la tarde.',
        hora: 'Ayer 12:30',
      },
      { quien: 'lidia', texto: '¡Tengo a la entrevistada confirmada!', hora: 'Ayer 16:05' },
      { quien: 'lucia', texto: 'Os mando el guion esta tarde.', hora: 'Hoy 8:50' },
      { quien: 'iker', texto: 'La sintonía ya está en la carpeta compartida.', hora: 'Hoy 10:12' },
    ],
    reuniones: [
      {
        mes: 'NOV',
        dia: '25',
        titulo: 'Grabación del episodio 2',
        meta: 'Martes · 16:00 · estudio de FP',
      },
      {
        mes: 'DIC',
        dia: '02',
        titulo: 'Revisión de guiones',
        meta: 'Lunes · 18:00 · videollamada',
      },
    ],
  },
  tutoria: {
    id: 'tutoria',
    titulo: 'Tutoría compartida 3º ESO',
    corto: 'Tutoría compartida',
    visibilidad: 'Privado',
    estado: 'Activo',
    color: 'bg-cielo-medio',
    resumen:
      'Espacio privado de las tutoras de 3º para coordinar sesiones de convivencia y el seguimiento con las familias.',
    centros: '1 centro · IES Ramiro de Maeztu',
    fechas: 'Curso 2026-27',
    progreso: 48,
    tareasTexto: '11 de 23 tareas',
    miembros: ['lucia', 'paula', 'nuria'],
    validaciones: {
      lucia: { 'Mediación de conflictos': ['paula'] },
      paula: { Tutoría: ['nuria'], 'Mediación de conflictos': [] },
      nuria: { Tutoría: ['paula'] },
    },
    frases: {
      'Mediación de conflictos': {
        quien: 'paula',
        texto: 'Medió en dos conflictos de grupo con mucha calma.',
      },
    },
    reuniones: [
      { mes: 'NOV', dia: '19', titulo: 'Sesión de convivencia', meta: 'Martes · 11:30 · aula 3ºB' },
      {
        mes: 'NOV',
        dia: '28',
        titulo: 'Reunión con familias',
        meta: 'Jueves · 18:00 · salón de actos',
      },
    ],
  },
  olimpiada: {
    id: 'olimpiada',
    titulo: 'Olimpiada de estadística',
    corto: 'Olimpiada de estadística',
    visibilidad: 'Privado',
    estado: 'Borrador',
    color: 'bg-amarillo',
    resumen:
      'Una olimpiada entre centros para 4º de ESO con problemas de estadística sobre datos abiertos de cada ciudad.',
    centros: '1 centro · 2 invitaciones enviadas',
    fechas: 'Prevista para abril de 2027',
    progreso: 10,
    tareasTexto: '2 de 18 tareas',
    miembros: ['lucia', 'nuria'],
    validaciones: {
      lucia: { 'Diseño de pruebas': ['nuria'] },
      nuria: { 'Hojas de cálculo': [], 'Estadística aplicada': [] },
    },
    frases: {
      'Diseño de pruebas': {
        quien: 'nuria',
        texto: 'Sus problemas tienen el nivel justo para 4º.',
      },
    },
    reuniones: [
      {
        mes: 'DIC',
        dia: '10',
        titulo: 'Banco de problemas',
        meta: 'Martes · 17:00 · videollamada',
      },
      {
        mes: 'ENE',
        dia: '15',
        titulo: 'Bases de la olimpiada',
        meta: 'Miércoles · 17:00 · videollamada',
      },
    ],
  },
  huerto: {
    id: 'huerto',
    titulo: 'Huerto matemático 2025',
    corto: 'Huerto matemático',
    visibilidad: 'Público',
    estado: 'Finalizado',
    color: 'bg-ink-faint',
    resumen:
      'Medimos, regamos y calculamos: un huerto escolar como laboratorio de geometría y proporciones para 1º de ESO.',
    centros: '2 centros · Madrid y Salamanca',
    fechas: 'Feb 2025 – Jun 2025',
    progreso: 100,
    tareasTexto: '24 de 24 tareas',
    miembros: ['lucia', 'paula', 'sergio'],
    validaciones: {
      lucia: {
        'Estadística aplicada': ['paula', 'sergio'],
        'Aprendizaje basado en proyectos': ['sergio', 'paula'],
        'Trabajo con familias': ['paula'],
      },
      paula: { 'Trabajo con familias': ['lucia', 'sergio'] },
      sergio: { 'Aprendizaje basado en proyectos': ['lucia'], 'Medida y geometría': ['paula'] },
    },
    frases: {
      'Estadística aplicada': {
        quien: 'sergio',
        texto: 'Convirtió la cosecha en un estudio estadístico completo.',
      },
      'Aprendizaje basado en proyectos': {
        quien: 'paula',
        texto: 'Cada semana un reto nuevo, y el grupo enganchado.',
      },
      'Trabajo con familias': {
        quien: 'paula',
        texto: 'Consiguió que vinieran familias todos los viernes.',
      },
    },
    reuniones: [
      {
        mes: 'JUN',
        dia: '20',
        titulo: 'Memoria final enviada',
        meta: 'Proyecto cerrado · ver resumen',
      },
      {
        mes: 'SEP',
        dia: '15',
        titulo: 'Propuesta para 2027',
        meta: 'Lunes · 17:00 · videollamada',
      },
    ],
  },
  aire: {
    id: 'aire',
    titulo: 'Ciencia ciudadana: medimos el aire del barrio',
    corto: 'Medimos el aire',
    visibilidad: 'Público',
    estado: 'Activo',
    color: 'bg-naranja',
    resumen:
      'Tres centros montan sensores de bajo coste, comparan sus datos y los publican en abierto para su barrio.',
    centros: '3 centros · Valencia, Sevilla y Valladolid',
    fechas: 'Nov 2026 – Mar 2027',
    progreso: 20,
    tareasTexto: '4 de 21 tareas',
    miembros: ['javier', 'manuel', 'oscar', 'lucia'],
    validaciones: {
      javier: { 'Sensores con Arduino': ['manuel', 'oscar'] },
      manuel: { 'Análisis de datos': ['javier'] },
      oscar: { 'Sensores con Arduino': ['javier'], 'Análisis de datos': [] },
      lucia: {},
    },
    frases: {},
  },
  escape: {
    id: 'escape',
    titulo: 'Escape room matemático',
    corto: 'Escape room',
    visibilidad: 'Público',
    estado: 'Activo',
    color: 'bg-marino-claro',
    resumen:
      'Retos de lógica y álgebra en formato escape room para 1º y 2º de ESO, con pistas que se comparten entre centros.',
    centros: '2 centros · Málaga y Valladolid',
    fechas: 'Nov 2026 – Ene 2027',
    progreso: 30,
    tareasTexto: '5 de 16 tareas',
    miembros: ['carmen', 'teresa', 'lucia'],
    validaciones: {
      carmen: { Gamificación: ['teresa'], Genially: ['teresa'] },
      teresa: { 'Resolución de problemas': ['carmen'] },
      lucia: {},
    },
    frases: {},
  },
};

// Frases que dicen otros compañeros al validar una habilidad
export const FRASES_OTROS: Record<string, string> = {
  'Evaluación con rúbricas': 'Sus rúbricas son claras y el alumnado las entiende.',
  GeoGebra: 'Preparó construcciones muy cuidadas para todos.',
  'Aprendizaje basado en proyectos': 'Sabe repartir el trabajo en retos que enganchan.',
  'Salidas didácticas': 'La salida estaba organizada al minuto.',
  'Estadística aplicada': 'Sus análisis de datos fueron la base del informe.',
  Audacity: 'Edita el sonido rapidísimo y muy limpio.',
  'Coordinación FP y ESO': 'Siempre tiene a los dos grupos coordinados.',
  Locución: 'Tiene una voz muy clara para radio.',
  'Guion radiofónico': 'Sus guiones se entienden a la primera.',
  Tutoría: 'Conoce a cada alumno y a su familia.',
  'Trabajo con familias': 'Las familias confían en ella.',
  'Medida y geometría': 'Explicó áreas midiendo el propio huerto.',
  'Sensores con Arduino': 'Montó los sensores con el alumnado en una tarde.',
  'Análisis de datos': 'Limpió y cruzó los datos de los tres centros.',
  Gamificación: 'Los retos tienen el punto justo de dificultad.',
  Genially: 'Sus pistas interactivas son una maravilla.',
  'Resolución de problemas': 'Cada problema tiene varias vías de solución.',
};

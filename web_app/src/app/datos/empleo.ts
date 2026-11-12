import { FOTOS } from './fotos';

// Datos de prueba de la pantalla "Empleo".

export type Rol = 'Profesor' | 'Alumno' | 'Empresa';
export type Modalidad = 'Presencial' | 'Remoto' | 'Híbrido';

export interface Oferta {
  id: string;
  titulo: string;
  empresa: string;
  lugar: string;
  pago: string;
  notaPago: string;
  etiquetas: string[];
  modalidad: Modalidad;
  nueva?: boolean;
  encaja: string[]; // habilidades validadas tuyas que pide la oferta
  publicada: string;
}

export interface Tutor {
  id: string;
  nombre: string;
  foto: string;
  materias: string;
  valoracion: string;
  precio: string;
  modo: string;
  habilidades: [string, number][];
  prueba: string;
  nuevo?: boolean;
}

export interface Candidato {
  id: string;
  nombre: string;
  foto: string;
  tipo: string;
  cargo: string;
  encaje: string;
  habilidades: [string, number][];
}

export interface OfertaEmpresa {
  id: string;
  titulo: string;
  meta: string;
  n: number;
  estado: string;
  pide: string[];
  personas: Candidato[];
}

export interface Anuncio {
  materias: string[];
  niveles: string[];
  precio: string;
  modo: string;
  horarios: string[];
  desc: string;
}

// Logos de los centros, academias y empresas
export const LOGOS: Record<string, string> = {
  'Colegio Valle del Sol': FOTOS.valle,
  'Colegio Alameda': FOTOS.alameda,
  'IES Sierra Norte': FOTOS.sierra,
  'Fundación Ciencia en el Aula': FOTOS.fundacion,
  'Academia Pitágoras': FOTOS.pitagoras,
  'Academia Hipatia': FOTOS.hipatia,
  'Aula Digital Ediciones': FOTOS.aula,
  'Escuela Docente Abierta': FOTOS.escuela,
  'Estudio Lumen': FOTOS.lumen,
};

export const OFERTAS: Record<'centros' | 'academias' | 'practicas', Oferta[]> = {
  centros: [
    {
      id: 'p1',
      titulo: 'Docente de Matemáticas · ESO y Bachillerato',
      empresa: 'Colegio Valle del Sol',
      lugar: 'Madrid',
      pago: '2.150 €',
      notaPago: 'al mes · 14 pagas',
      etiquetas: ['Presencial', 'Jornada completa', 'Indefinido'],
      modalidad: 'Presencial',
      nueva: true,
      encaja: ['Estadística aplicada', 'GeoGebra'],
      publicada: 'Hace 3 h · 18 candidaturas',
    },
    {
      id: 'p2',
      titulo: 'Coordinación de proyectos STEM',
      empresa: 'Fundación Ciencia en el Aula',
      lugar: 'Madrid',
      pago: '2.400 €',
      notaPago: 'al mes',
      etiquetas: ['Híbrido', 'Jornada completa'],
      modalidad: 'Híbrido',
      encaja: ['Aprendizaje basado en proyectos'],
      publicada: 'Ayer · 26 candidaturas',
    },
    {
      id: 'p3',
      titulo: 'Sustitución de Matemáticas en 3º de ESO',
      empresa: 'IES Sierra Norte',
      lugar: 'Las Rozas',
      pago: 'Tablas',
      notaPago: 'salario público · 3 meses',
      etiquetas: ['Presencial', 'Interinidad'],
      modalidad: 'Presencial',
      encaja: ['Diseño de pruebas'],
      publicada: 'Hace 2 días · 31 candidaturas',
    },
    {
      id: 'p4',
      titulo: 'Docente de Matemáticas y Tecnología',
      empresa: 'Colegio Alameda',
      lugar: 'Getafe',
      pago: '1.180 €',
      notaPago: 'al mes · media jornada',
      etiquetas: ['Presencial', 'Media jornada'],
      modalidad: 'Presencial',
      encaja: [],
      publicada: 'Hace 4 días · 9 candidaturas',
    },
    {
      id: 'p5',
      titulo: 'Refuerzo de Matemáticas por las tardes',
      empresa: 'Aula Digital Ediciones',
      lugar: 'Remoto',
      pago: '22 €',
      notaPago: 'la hora · 8 h/semana',
      etiquetas: ['Remoto', 'Por horas'],
      modalidad: 'Remoto',
      encaja: ['Estadística aplicada'],
      publicada: 'Hace 5 días · 15 candidaturas',
    },
  ],
  academias: [
    {
      id: 'a1',
      titulo: 'Docente de Matemáticas para refuerzo online',
      empresa: 'Academia Pitágoras',
      lugar: 'Remoto',
      pago: '28 €',
      notaPago: 'la hora · 6 h/semana',
      etiquetas: ['Remoto', 'Por horas', 'Tardes'],
      modalidad: 'Remoto',
      nueva: true,
      encaja: ['Estadística aplicada'],
      publicada: 'Hace 1 h · 38 candidaturas',
    },
    {
      id: 'a2',
      titulo: 'Preparación de Selectividad: Matemáticas II',
      empresa: 'Academia Hipatia',
      lugar: 'Madrid',
      pago: '24 €',
      notaPago: 'la hora · 8 h/semana',
      etiquetas: ['Presencial', 'Por horas'],
      modalidad: 'Presencial',
      encaja: [],
      publicada: 'Ayer · 14 candidaturas',
    },
    {
      id: 'a3',
      titulo: 'Formación para docentes en GeoGebra',
      empresa: 'Escuela Docente Abierta',
      lugar: 'En línea',
      pago: '450 €',
      notaPago: 'por curso de 6 sesiones',
      etiquetas: ['Remoto', 'Por proyecto'],
      modalidad: 'Remoto',
      encaja: ['GeoGebra'],
      publicada: 'Hace 3 días · 6 candidaturas',
    },
    {
      id: 'a4',
      titulo: 'Tutoría online de 4º de ESO',
      empresa: 'Aula Digital Ediciones',
      lugar: 'Remoto',
      pago: '22 €',
      notaPago: 'la hora · 10 h/semana',
      etiquetas: ['Remoto', 'Por horas'],
      modalidad: 'Remoto',
      encaja: [],
      publicada: 'Hace 5 días · 21 candidaturas',
    },
    {
      id: 'a5',
      titulo: 'Talleres de estadística en verano',
      empresa: 'Fundación Ciencia en el Aula',
      lugar: 'Madrid',
      pago: '600 €',
      notaPago: 'por taller de 2 semanas',
      etiquetas: ['Presencial', 'Julio'],
      modalidad: 'Presencial',
      encaja: ['Estadística aplicada'],
      publicada: 'Hace 6 días · 11 candidaturas',
    },
  ],
  practicas: [
    {
      id: 'f1',
      titulo: 'Prácticas de desarrollo web (FCT)',
      empresa: 'Estudio Lumen',
      lugar: 'Madrid',
      pago: '300 €',
      notaPago: 'ayuda al mes · 370 h',
      etiquetas: ['Presencial', 'Prácticas', 'Angular'],
      modalidad: 'Presencial',
      nueva: true,
      encaja: ['Angular', 'Diseño de interfaces'],
      publicada: 'Hace 5 h · 12 solicitudes',
    },
    {
      id: 'f2',
      titulo: 'Prácticas de diseño UX',
      empresa: 'Academia Pitágoras',
      lugar: 'Madrid',
      pago: '400 €',
      notaPago: 'ayuda al mes · 6 meses',
      etiquetas: ['Híbrido', 'Prácticas', 'Figma'],
      modalidad: 'Híbrido',
      encaja: ['Diseño de interfaces', 'Figma'],
      publicada: 'Ayer · 7 solicitudes',
    },
    {
      id: 'f3',
      titulo: 'Junior front-end para plataforma educativa',
      empresa: 'Aula Digital Ediciones',
      lugar: 'Remoto',
      pago: '1.450 €',
      notaPago: 'al mes · primer empleo',
      etiquetas: ['Remoto', 'Jornada completa'],
      modalidad: 'Remoto',
      encaja: ['Angular', 'Git'],
      publicada: 'Hace 3 días · 40 solicitudes',
    },
    {
      id: 'f4',
      titulo: 'Soporte TIC en colegio',
      empresa: 'Colegio Valle del Sol',
      lugar: 'Madrid',
      pago: '700 €',
      notaPago: 'al mes · media jornada',
      etiquetas: ['Presencial', 'Media jornada'],
      modalidad: 'Presencial',
      encaja: [],
      publicada: 'Hace 6 días · 9 solicitudes',
    },
    {
      id: 'f5',
      titulo: 'Prácticas de contenidos digitales',
      empresa: 'Escuela Docente Abierta',
      lugar: 'Remoto',
      pago: '250 €',
      notaPago: 'ayuda al mes · 4 meses',
      etiquetas: ['Remoto', 'Prácticas'],
      modalidad: 'Remoto',
      encaja: ['Diseño de interfaces'],
      publicada: 'Hace 1 semana · 5 solicitudes',
    },
  ],
};

export const HUECOS_CLASE: [string, string][] = [
  ['Lun 17', '17:00'],
  ['Mar 18', '18:30'],
  ['Mié 19', '16:00'],
  ['Jue 20', '19:00'],
];
export const HUECOS_ENTREVISTA: [string, string][] = [
  ['Lun 17', '10:00'],
  ['Mar 18', '12:30'],
  ['Mié 19', '17:00'],
  ['Jue 20', '9:30'],
];

export const TUTORES: Tutor[] = [
  {
    id: 't1',
    nombre: 'Adrián Castro León',
    foto: FOTOS.adrian,
    materias: 'Programación y bases de datos · FP',
    valoracion: '4,9 · 37 reseñas',
    precio: '20 €',
    modo: 'En línea',
    habilidades: [
      ['Java', 6],
      ['SQL', 5],
      ['Angular', 3],
    ],
    prueba: 'Validadas por compañeros en 3 proyectos de FP. Responde en menos de 2 horas.',
  },
  {
    id: 't2',
    nombre: 'Irene Pastor Llorente',
    foto: FOTOS.irene,
    materias: 'Matemáticas y Física · Bachillerato',
    valoracion: '4,8 · 52 reseñas',
    precio: '18 €',
    modo: 'En línea y Madrid',
    habilidades: [
      ['Cálculo', 6],
      ['Clases en línea', 4],
    ],
    prueba: 'Validadas en 4 proyectos. Primera clase de 30 minutos gratis.',
  },
  {
    id: 't3',
    nombre: 'Carlos Pérez Nieto',
    foto: FOTOS.carlos,
    materias: 'Matemáticas · Bachillerato',
    valoracion: '4,9 · 29 reseñas',
    precio: '22 €',
    modo: 'En línea',
    habilidades: [
      ['Probabilidad', 3],
      ['Estadística aplicada', 2],
    ],
    prueba:
      'Autor de «40 problemas de probabilidad resueltos», uno de los recursos PRO más vendidos.',
  },
  {
    id: 't4',
    nombre: 'Hugo Martín Rey',
    foto: FOTOS.hugo,
    materias: 'Física · Bachillerato',
    valoracion: '4,7 · 18 reseñas',
    precio: '20 €',
    modo: 'Madrid',
    habilidades: [
      ['Física experimental', 3],
      ['Vídeo educativo', 2],
    ],
    prueba: 'Autor de «Cinemática explicada en vídeo», con 655 descargas.',
  },
];
export const TUTOR_SERGIO: Tutor = {
  id: 't5',
  nombre: 'Sergio Blanco Ruiz',
  foto: FOTOS.sergio,
  materias: 'Matemáticas · ESO',
  valoracion: '4,8 · 33 reseñas',
  precio: '16 €',
  modo: 'En línea',
  habilidades: [
    ['Medida y geometría', 1],
    ['Aprendizaje basado en proyectos', 2],
  ],
  prueba: 'Validadas en el proyecto «Huerto matemático». Clases muy prácticas.',
};

export const OFERTAS_EMPRESA: OfertaEmpresa[] = [
  {
    id: 'o1',
    titulo: 'Docente de Matemáticas para refuerzo online',
    meta: 'Remoto · 28 €/hora',
    n: 38,
    estado: 'Activa',
    pide: ['Estadística aplicada', 'GeoGebra', 'Clases en línea'],
    personas: [
      {
        id: 'lucia',
        nombre: 'Lucía Fernández Ortega',
        foto: FOTOS.lucia,
        tipo: 'Profesora',
        cargo: 'Matemáticas · IES Ramiro de Maeztu · Madrid',
        encaje: '92 %',
        habilidades: [
          ['Estadística aplicada', 5],
          ['GeoGebra', 2],
        ],
      },
      {
        id: 'irene',
        nombre: 'Irene Pastor Llorente',
        foto: FOTOS.irene,
        tipo: 'Profesora',
        cargo: 'Matemáticas y Física · profesora particular',
        encaje: '88 %',
        habilidades: [
          ['Clases en línea', 4],
          ['Cálculo', 6],
        ],
      },
      {
        id: 'elena',
        nombre: 'Elena Sanz Prieto',
        foto: FOTOS.elena,
        tipo: 'Profesora',
        cargo: 'Matemáticas · ESO · Madrid',
        encaje: '84 %',
        habilidades: [
          ['GeoGebra', 1],
          ['Evaluación con rúbricas', 2],
        ],
      },
      {
        id: 'carlos',
        nombre: 'Carlos Pérez Nieto',
        foto: FOTOS.carlos,
        tipo: 'Profesor',
        cargo: 'Matemáticas · Bachillerato · Alicante',
        encaje: '79 %',
        habilidades: [['Probabilidad', 3]],
      },
    ],
  },
  {
    id: 'o2',
    titulo: 'Prácticas de diseño UX',
    meta: 'Híbrido · 400 €/mes',
    n: 7,
    estado: 'Activa',
    pide: ['Diseño de interfaces', 'Figma', 'Accesibilidad web'],
    personas: [
      {
        id: 'alex',
        nombre: 'Álex Romero Gil',
        foto: FOTOS.alex,
        tipo: 'Alumno',
        cargo: '2º DAW · CIFP Madrid Norte',
        encaje: '90 %',
        habilidades: [
          ['Diseño de interfaces', 3],
          ['Figma', 2],
        ],
      },
      {
        id: 'sofia',
        nombre: 'Sofía Navarro Gil',
        foto: FOTOS.sofia,
        tipo: 'Alumna',
        cargo: '2º DAW · CIFP Madrid Norte',
        encaje: '86 %',
        habilidades: [
          ['Figma', 3],
          ['Diseño de interfaces', 2],
        ],
      },
      {
        id: 'carla',
        nombre: 'Carla Méndez Ruiz',
        foto: FOTOS.carla,
        tipo: 'Alumna',
        cargo: '2º DAW · IES Clara Campoamor',
        encaje: '80 %',
        habilidades: [
          ['Accesibilidad web', 1],
          ['Diseño de interfaces', 2],
        ],
      },
      {
        id: 'noa',
        nombre: 'Noa Jiménez Prado',
        foto: FOTOS.noa,
        tipo: 'Alumna',
        cargo: '2º DAM · CIFP Madrid Norte',
        encaje: '74 %',
        habilidades: [['Figma', 1]],
      },
    ],
  },
  {
    id: 'o3',
    titulo: 'Preparación de Física de 2º de Bachillerato',
    meta: 'Madrid · 26 €/hora',
    n: 12,
    estado: 'Activa',
    pide: ['Física experimental', 'Preparación de Selectividad'],
    personas: [
      {
        id: 'hugo',
        nombre: 'Hugo Martín Rey',
        foto: FOTOS.hugo,
        tipo: 'Profesor',
        cargo: 'Física · Bachillerato · Madrid',
        encaje: '91 %',
        habilidades: [
          ['Física experimental', 3],
          ['Vídeo educativo', 2],
        ],
      },
      {
        id: 'irene',
        nombre: 'Irene Pastor Llorente',
        foto: FOTOS.irene,
        tipo: 'Profesora',
        cargo: 'Matemáticas y Física · profesora particular',
        encaje: '83 %',
        habilidades: [['Cálculo', 6]],
      },
      {
        id: 'oscar',
        nombre: 'Óscar Herrero Mata',
        foto: FOTOS.oscar,
        tipo: 'Profesor',
        cargo: 'Informática · FP · Valladolid',
        encaje: '61 %',
        habilidades: [['Sensores con Arduino', 1]],
      },
    ],
  },
];

// Personas con las que se puede chatear: id -> [nombre, foto]
export const PERSONAS_CHAT: Record<string, [string, string]> = {
  irene: ['Irene Pastor Llorente', FOTOS.irene],
  alex: ['Álex Romero Gil', FOTOS.alex],
  lucia: ['Lucía Fernández Ortega', FOTOS.lucia],
  elena: ['Elena Sanz Prieto', FOTOS.elena],
  carlos: ['Carlos Pérez Nieto', FOTOS.carlos],
  sofia: ['Sofía Navarro Gil', FOTOS.sofia],
  carla: ['Carla Méndez Ruiz', FOTOS.carla],
  noa: ['Noa Jiménez Prado', FOTOS.noa],
  hugo: ['Hugo Martín Rey', FOTOS.hugo],
  oscar: ['Óscar Herrero Mata', FOTOS.oscar],
  daniel: ['Daniel Ortiz Cano', FOTOS.daniel],
  marcos: ['Marcos Vidal Ortiz', FOTOS.marcos],
  adrian: ['Adrián Castro León', FOTOS.adrian],
  nuria: ['Nuria Gil Soler', FOTOS.nuria],
  javier: ['Javier Molina', FOTOS.javier],
  sergio: ['Sergio Blanco Ruiz', FOTOS.sergio],
  t1: ['Adrián Castro León', FOTOS.adrian],
  t2: ['Irene Pastor Llorente', FOTOS.irene],
  t3: ['Carlos Pérez Nieto', FOTOS.carlos],
  t4: ['Hugo Martín Rey', FOTOS.hugo],
  t5: ['Sergio Blanco Ruiz', FOTOS.sergio],
  tl: ['Lucía Fernández Ortega', FOTOS.lucia],
};

// Cómo se ve la pantalla según el tipo de cuenta
export const CUENTAS: Record<
  Rol,
  {
    nombre: string;
    cargo: string;
    foto: string;
    encaja: 'object-cover' | 'object-contain';
    insignia: string;
    insigniaClases: string;
    puedePublicar: boolean;
    fondoRegla: string;
    regla: string;
  }
> = {
  Profesor: {
    nombre: 'Lucía Fernández Ortega',
    cargo: 'Matemáticas · IES Ramiro de Maeztu',
    foto: FOTOS.lucia,
    encaja: 'object-cover',
    insignia: 'Cuenta de profesora',
    insigniaClases: 'bg-turquesa text-ink',
    puedePublicar: true,
    fondoRegla: 'bg-azul-soft',
    regla:
      'Puedes publicar tu anuncio de clases particulares. Las ofertas de empleo las publican centros y empresas.',
  },
  Alumno: {
    nombre: 'Álex Romero Gil',
    cargo: '2º DAW · CIFP Madrid Norte',
    foto: FOTOS.alex,
    encaja: 'object-cover',
    insignia: 'Cuenta de alumno',
    insigniaClases: 'bg-azul-soft text-azul',
    puedePublicar: false,
    fondoRegla: 'bg-paper',
    regla:
      'Las cuentas de alumno no publican ofertas. Puedes pedir clases a profesores y solicitar prácticas.',
  },
  Empresa: {
    nombre: 'Academia Pitágoras',
    cargo: 'Academia · Madrid y en línea',
    foto: FOTOS.pitagoras,
    encaja: 'object-contain',
    insignia: 'Cuenta de empresa',
    insigniaClases: 'bg-naranja text-ink',
    puedePublicar: true,
    fondoRegla: 'bg-azul-soft',
    regla:
      'Puedes publicar ofertas de docencia, clases particulares y prácticas, y ver a los candidatos.',
  },
};

export const HABILIDADES_OFERTA = [
  'Estadística aplicada',
  'GeoGebra',
  'Clases en línea',
  'Física experimental',
  'Preparación de Selectividad',
  'Diseño de interfaces',
  'Angular',
  'Inglés B2',
];
export const TIPOS_OFERTA = [
  {
    id: 'docencia',
    texto: 'Docencia',
    ayuda: 'Plaza en tu centro o academia. La ven los profesores.',
    alcance: 'profesores',
  },
  {
    id: 'clases',
    texto: 'Clases particulares',
    ayuda: 'Buscas profe para tus alumnos. La ven los profesores.',
    alcance: 'profesores',
  },
  {
    id: 'practicas',
    texto: 'Prácticas',
    ayuda: 'FCT o primer empleo. La ven los alumnos de FP.',
    alcance: 'alumnos',
  },
];

export const CENTROS_QUE_CONTRATAN = [
  ['Colegio Valle del Sol', 3],
  ['Academia Pitágoras', 2],
  ['Fundación Ciencia en el Aula', 2],
  ['Academia Hipatia', 2],
  ['Aula Digital Ediciones', 4],
  ['Escuela Docente Abierta', 1],
] as [string, number][];

export const COMPANEROS = [
  ['daniel', 'Prácticas en Estudio Lumen'],
  ['sofia', 'Prácticas en Aula Digital'],
  ['noa', 'Primer empleo en Academia Pitágoras'],
  ['marcos', 'Prácticas en Colegio Valle del Sol'],
  ['carla', 'Busca prácticas, como tú'],
] as [string, string][];
export const DOCENTES_CERCA = [
  ['irene', 'Matemáticas y Física · Madrid'],
  ['adrian', 'Programación · en línea'],
  ['nuria', 'Matemáticas · ESO'],
  ['javier', 'Tecnología · FP'],
  ['sergio', 'Matemáticas · Salamanca'],
] as [string, string][];

export const CONSEJOS: Record<Rol, string[]> = {
  Profesor: [
    'Pide validaciones en tus proyectos: los centros filtran por ellas.',
    'Añade un mensaje corto. Las candidaturas con mensaje reciben un 40 % más de respuestas.',
    'Sube tus recursos: los centros ven lo que compartes.',
    'Activa las alertas de empleo para enterarte el primer día.',
    'Revisa el estado de cada candidatura desde la columna izquierda.',
  ],
  Alumno: [
    'Enlaza tu proyecto final en el perfil: las empresas lo miran primero.',
    'Pide a tus compañeros que validen lo que hiciste en cada proyecto.',
    'Pregunta a quien ya está dentro: te contará cómo es el día a día.',
    'Pide una clase de prueba antes de contratar un profe.',
    'Mantén tu CV actualizado: se adjunta en un clic.',
  ],
  Empresa: [
    'Pide 2 o 3 habilidades concretas: el filtro por validaciones funciona mejor.',
    'Responde en menos de 48 horas para no perder a los mejores perfiles.',
    'Invita tú a docentes disponibles desde esta columna.',
    'Destaca la oferta en Empleo para salir la primera.',
    'Cuenta el salario: las ofertas con sueldo reciben el doble de candidaturas.',
  ],
};
export const COLORES_CONSEJO = [
  'bg-amarillo',
  'bg-turquesa',
  'bg-cielo-medio',
  'bg-naranja',
  'bg-marino-soft',
];

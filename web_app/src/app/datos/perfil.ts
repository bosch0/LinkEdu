import { FOTOS } from './fotos';

// Datos de prueba de la pantalla "Perfil" (tres perfiles de ejemplo).

export type TipoPerfil = 'Profesora' | 'Alumno' | 'Empresa';

export interface Cara {
  foto: string;
  nombre: string;
}

export interface Habilidad {
  nombre: string;
  n: number;
  por: Cara[];
  donde: string;
}

export interface ProyectoPerfil {
  titulo: string;
  color: string;
  estado: string;
  colorEstado: string;
  fechas: string;
  resumen: string;
  habilidades: string[];
  caras: Cara[];
  rol: string;
}

export interface PublicacionPerfil {
  cuando: string;
  texto: string;
  adjuntoTipo: string;
  adjuntoClases: string;
  adjuntoTitulo: string;
  adjuntoMeta: string;
  likes: number;
  comentarios: number;
}

export interface RecursoPerfil {
  tipo: string;
  clases: string;
  titulo: string;
  meta: string;
  descargas: string;
  precio: string;
}

export interface OfertaPerfil {
  tipo: string;
  titulo: string;
  meta: string;
  pago: string;
  pide: string[];
  publicada: string;
  desc: string;
  ventajas: string[];
  encaje: string;
}

export interface Perfil {
  esPersona: boolean;
  propio: boolean;
  foto: string;
  nombre: string;
  insignia: string;
  iconoInsignia: string;
  clasesInsignia: string;
  titular: string;
  lugar: string;
  org: string;
  stats: [string, string][];
  acerca: string;
  etiquetas: string[];
  tituloLinea: string;
  linea: { icono: string; titulo: string; donde: string; cuando: string; clases: string }[];
  pestanas: [string, string, string][];
  proyectos?: ProyectoPerfil[];
  tituloPrivados?: string;
  publicaciones: PublicacionPerfil[];
  recursos?: RecursoPerfil[];
  ofertas?: OfertaPerfil[];
  tituloLateral: string;
  cuentaLateral: string;
  notaLateral: string;
  habilidades: Habilidad[];
}

export const NOMBRES: Record<string, string> = {
  elena: 'Elena Sanz Prieto',
  amparo: 'Amparo Ferrandis Gil',
  jordi: 'Jordi Puig Ferrer',
  rocio: 'Rocío Campos León',
  javier: 'Javier Molina',
  iker: 'Iker Etxeberria Sáez',
  lidia: 'Lidia Moreno Paz',
  nuria: 'Nuria Gil Soler',
  paula: 'Paula Díez Romero',
  sergio: 'Sergio Blanco Ruiz',
  daniel: 'Daniel Ortiz Cano',
  sofia: 'Sofía Navarro Gil',
  carla: 'Carla Méndez Ruiz',
  noa: 'Noa Jiménez Prado',
  irene: 'Irene Pastor Llorente',
  adrian: 'Adrián Castro León',
  lucia: 'Lucía Fernández Ortega',
  alex: 'Álex Romero Gil',
  marcos: 'Marcos Vidal Ortiz',
};

const FOTO = FOTOS as Record<string, string>;
export const cara = (id: string): Cara => ({ foto: FOTO[id], nombre: NOMBRES[id] });
const caras = (ids: string[]) => ids.map(cara);
const habilidad = (nombre: string, por: string[], donde: string): Habilidad => ({
  nombre,
  n: por.length,
  por: caras(por),
  donde,
});

const TIPO: Record<string, string> = {
  PDF: 'bg-marino text-white',
  PPT: 'bg-azul text-white',
  FICHA: 'bg-turquesa text-ink',
  FIG: 'bg-naranja text-ink',
};
const recurso = (tipo: string, titulo: string, meta: string, descargas: string): RecursoPerfil => ({
  tipo,
  clases: TIPO[tipo],
  titulo,
  meta,
  descargas,
  precio: 'Gratis',
});

export const PERFILES: Record<TipoPerfil, Perfil> = {
  Profesora: {
    esPersona: true,
    propio: true,
    foto: FOTOS.lucia,
    nombre: 'Lucía Fernández Ortega',
    insignia: 'Profesora',
    iconoInsignia: 'formacion',
    clasesInsignia: 'bg-turquesa text-ink',
    titular: 'Profesora de Matemáticas en ESO y Bachillerato · Coordina proyectos entre centros',
    lugar: 'Madrid',
    org: 'IES Ramiro de Maeztu',
    stats: [
      ['214', 'conexiones'],
      ['5', 'proyectos'],
      ['9', 'recursos'],
      ['16', 'validaciones'],
    ],
    acerca:
      'Enseño Matemáticas desde 2014. Me gusta sacar las matemáticas del aula: mercados, huertos y datos abiertos. Comparto todo lo que preparo para que otros docentes lo adapten. Este curso coordino un proyecto con cuatro centros de Madrid.',
    etiquetas: ['Matemáticas', 'ESO', 'Bachillerato', 'ABP', 'GeoGebra', 'Datos abiertos'],
    tituloLinea: 'Experiencia y formación',
    linea: [
      {
        icono: 'empleo',
        titulo: 'Profesora de Matemáticas',
        donde: 'IES Ramiro de Maeztu · Madrid',
        cuando: '2019 – hoy',
        clases: 'bg-marino text-white',
      },
      {
        icono: 'empleo',
        titulo: 'Profesora interina',
        donde: 'IES Sierra Norte · Las Rozas',
        cuando: '2014 – 2019',
        clases: 'bg-marino-soft text-marino',
      },
      {
        icono: 'formacion',
        titulo: 'Máster en Formación del Profesorado',
        donde: 'Especialidad de Matemáticas',
        cuando: '2013 – 2014',
        clases: 'bg-azul-soft text-azul',
      },
      {
        icono: 'formacion',
        titulo: 'Grado en Matemáticas',
        donde: 'Universidad Complutense de Madrid',
        cuando: '2009 – 2013',
        clases: 'bg-azul-soft text-azul',
      },
    ],
    pestanas: [
      ['projects', 'Proyectos', '3 públicos'],
      ['posts', 'Publicaciones', '2'],
      ['resources', 'Recursos', '9'],
    ],
    proyectos: [
      {
        titulo: 'Matemáticas en el mercado',
        color: 'bg-turquesa',
        estado: 'Activo',
        colorEstado: 'bg-turquesa',
        fechas: 'SEP 26 – FEB 27',
        resumen:
          'Cuatro centros llevan las matemáticas al mercado del barrio con datos que recoge el alumnado.',
        habilidades: ['Estadística aplicada · 3', 'GeoGebra · 2', 'ABP · 1'],
        caras: caras(['lucia', 'elena', 'amparo', 'jordi', 'rocio']),
        rol: 'Coordinadora · 5 participantes',
      },
      {
        titulo: 'Radio escolar FP + ESO',
        color: 'bg-azul',
        estado: 'Activo',
        colorEstado: 'bg-turquesa',
        fechas: 'OCT 26 – JUN 27',
        resumen:
          'Un programa mensual hecho entre FP de Sonido y 3º de ESO. Lucía lleva la sección de divulgación.',
        habilidades: ['Guion radiofónico · 2', 'Coordinación FP y ESO · 1'],
        caras: caras(['lucia', 'javier', 'iker', 'lidia']),
        rol: 'Divulgación · 4 participantes',
      },
      {
        titulo: 'Huerto matemático 2025',
        color: 'bg-ink-faint',
        estado: 'Finalizado',
        colorEstado: 'bg-line',
        fechas: 'FEB 25 – JUN 25',
        resumen: 'Un huerto escolar como laboratorio de geometría y proporciones para 1º de ESO.',
        habilidades: ['Estadística aplicada · 2', 'ABP · 2', 'Trabajo con familias · 1'],
        caras: caras(['lucia', 'paula', 'sergio']),
        rol: 'Coordinadora · 3 participantes',
      },
    ],
    tituloPrivados: '2 proyectos privados',
    publicaciones: [
      {
        cuando: 'Hace 2 días · Matemáticas en el mercado',
        texto:
          'Primera fase terminada: 120 alumnos de cuatro centros han recogido los precios de 14 puestos durante un mes. Os dejo las fichas de campo que hemos usado, listas para imprimir.',
        adjuntoTipo: 'FICHA',
        adjuntoClases: TIPO['FICHA'],
        adjuntoTitulo: 'Estadística del mercado: fichas de campo',
        adjuntoMeta: '8 fichas · 1º ESO · 412 descargas',
        likes: 64,
        comentarios: 15,
      },
      {
        cuando: 'Hace 2 semanas',
        texto:
          'Probabilidad con dados y cartas: la presentación que uso en 2º de ESO, con los experimentos para hacer en clase y las hojas de registro.',
        adjuntoTipo: 'PPT',
        adjuntoClases: TIPO['PPT'],
        adjuntoTitulo: 'Probabilidad con dados y cartas',
        adjuntoMeta: '26 diapositivas · 2º ESO · 640 descargas',
        likes: 41,
        comentarios: 9,
      },
    ],
    recursos: [
      recurso('PDF', 'Funciones lineales con datos reales', 'PDF · 18 págs · 3º ESO', '1.248'),
      recurso('PPT', 'Probabilidad con dados y cartas', 'Presentación · 26 diapos · 2º ESO', '640'),
      recurso(
        'FICHA',
        'Estadística del mercado: fichas de campo',
        'Fichas · 8 fichas · 1º ESO',
        '412',
      ),
      recurso('PDF', 'Geometría en el huerto escolar', 'PDF · 14 págs · 1º ESO', '388'),
      recurso('PDF', 'Examen de funciones con solucionario', 'PDF · 6 págs · 3º ESO', '302'),
    ],
    tituloLateral: 'Habilidades validadas',
    cuentaLateral: '16 validaciones',
    notaLateral: 'Solo las validan compañeros que han trabajado con Lucía en un proyecto.',
    habilidades: [
      habilidad(
        'Estadística aplicada',
        ['elena', 'jordi', 'amparo', 'paula', 'sergio'],
        'En Matemáticas en el mercado y Huerto matemático 2025',
      ),
      habilidad(
        'Aprendizaje basado en proyectos',
        ['amparo', 'sergio', 'paula'],
        'En Matemáticas en el mercado y Huerto matemático 2025',
      ),
      habilidad('GeoGebra', ['rocio', 'elena'], 'En Matemáticas en el mercado'),
      habilidad('Guion radiofónico', ['javier', 'lidia'], 'En Radio escolar FP + ESO'),
      habilidad('Trabajo con familias', ['paula'], 'En Huerto matemático 2025'),
      habilidad('Coordinación FP y ESO', ['iker'], 'En Radio escolar FP + ESO'),
      habilidad('Diseño de pruebas', ['nuria'], 'En un proyecto privado'),
      habilidad('Mediación de conflictos', ['paula'], 'En un proyecto privado'),
    ],
  },
  Alumno: {
    esPersona: true,
    propio: false,
    foto: FOTOS.alex,
    nombre: 'Álex Romero Gil',
    insignia: 'Alumno',
    iconoInsignia: 'perfil',
    clasesInsignia: 'bg-azul-soft text-azul',
    titular: 'Alumno de 2º de DAW · Busca prácticas de front-end para marzo de 2027',
    lugar: 'Madrid',
    org: 'CIFP Madrid Norte',
    stats: [
      ['86', 'conexiones'],
      ['3', 'proyectos'],
      ['4', 'recursos'],
      ['12', 'validaciones'],
    ],
    acerca:
      'Estudio Desarrollo de Aplicaciones Web. Me interesa el diseño de interfaces y el front-end con Angular. Ahora preparo con mi equipo una app para un concurso de diseño.',
    etiquetas: ['Angular', 'Diseño UI', 'Prácticas'],
    tituloLinea: 'Formación y experiencia',
    linea: [
      {
        icono: 'formacion',
        titulo: 'CFGS Desarrollo de Aplicaciones Web',
        donde: 'CIFP Madrid Norte',
        cuando: '2025 – hoy',
        clases: 'bg-marino text-white',
      },
      {
        icono: 'formacion',
        titulo: 'Bachillerato tecnológico',
        donde: 'IES Ramiro de Maeztu · Madrid',
        cuando: '2023 – 2025',
        clases: 'bg-azul-soft text-azul',
      },
      {
        icono: 'empleo',
        titulo: 'Monitor de robótica',
        donde: 'Campamento de verano · Fundación Ciencia en el Aula',
        cuando: 'Verano de 2024',
        clases: 'bg-marino-soft text-marino',
      },
    ],
    pestanas: [
      ['projects', 'Proyectos', '3 públicos'],
      ['posts', 'Publicaciones', '2'],
      ['resources', 'Recursos', '4'],
    ],
    proyectos: [
      {
        titulo: 'LinkEdu: red social educativa',
        color: 'bg-naranja',
        estado: 'Activo',
        colorEstado: 'bg-turquesa',
        fechas: 'OCT 26 – DIC 26',
        resumen:
          'App web para un concurso de Diseño de Interfaces. Álex hace el front-end en Angular.',
        habilidades: ['Angular · 3', 'Diseño de interfaces · 3', 'Figma · 2', 'Git · 1'],
        caras: caras(['alex', 'daniel', 'sofia', 'carla']),
        rol: 'Front-end · 4 participantes',
      },
      {
        titulo: 'App de reservas del comedor',
        color: 'bg-ink-faint',
        estado: 'Finalizado',
        colorEstado: 'bg-line',
        fechas: 'MAR 26 – JUN 26',
        resumen: 'Proyecto de 1º de DAW: reservas del comedor del centro desde el móvil.',
        habilidades: ['Angular · 1', 'Git · 1'],
        caras: caras(['alex', 'noa', 'daniel']),
        rol: 'Desarrollo · 3 participantes',
      },
      {
        titulo: 'Web del AMPA',
        color: 'bg-ink-faint',
        estado: 'Finalizado',
        colorEstado: 'bg-line',
        fechas: 'ENE 26 – MAR 26',
        resumen: 'Web sencilla para que el AMPA del instituto publique avisos y actividades.',
        habilidades: ['Diseño de interfaces · 1', 'Accesibilidad web · 1'],
        caras: caras(['alex', 'carla']),
        rol: 'Diseño y maquetación · 2 participantes',
      },
    ],
    tituloPrivados: '1 proyecto privado',
    publicaciones: [
      {
        cuando: 'Hace 1 día · LinkEdu: red social educativa',
        texto:
          'Ya tenemos el primer prototipo navegable de nuestra app para el concurso. Comparto la plantilla de Figma que usamos para los wireframes, por si os sirve.',
        adjuntoTipo: 'FIG',
        adjuntoClases: TIPO['FIG'],
        adjuntoTitulo: 'Plantilla de Figma para wireframes',
        adjuntoMeta: 'Figma · 24 pantallas · 133 descargas',
        likes: 37,
        comentarios: 8,
      },
      {
        cuando: 'Hace 1 semana',
        texto:
          'Busco prácticas de front-end para marzo. Me gusta Angular y cuidar la accesibilidad. Si tu empresa o tu centro necesita a alguien, escríbeme.',
        adjuntoTipo: 'PDF',
        adjuntoClases: TIPO['PDF'],
        adjuntoTitulo: 'Currículum de Álex Romero',
        adjuntoMeta: 'PDF · 1 pág',
        likes: 22,
        comentarios: 5,
      },
    ],
    recursos: [
      recurso('PDF', 'Apuntes de Angular: componentes y servicios', 'PDF · 22 págs · DAW', '214'),
      recurso('FIG', 'Plantilla de Figma para wireframes', 'Figma · 24 pantallas', '133'),
      recurso('PDF', 'Chuleta de Git para clase', 'PDF · 2 págs', '98'),
      recurso('PPT', 'Accesibilidad web en 10 diapositivas', 'Presentación · DAW', '61'),
    ],
    tituloLateral: 'Habilidades validadas',
    cuentaLateral: '12 validaciones',
    notaLateral: 'Solo las validan compañeros que han trabajado con Álex en un proyecto.',
    habilidades: [
      habilidad(
        'Angular',
        ['daniel', 'sofia', 'carla', 'noa'],
        'En LinkEdu y App de reservas del comedor',
      ),
      habilidad(
        'Diseño de interfaces',
        ['sofia', 'carla', 'daniel'],
        'En LinkEdu: red social educativa',
      ),
      habilidad('Figma', ['sofia', 'carla'], 'En LinkEdu: red social educativa'),
      habilidad('Git', ['daniel', 'noa'], 'En LinkEdu y App de reservas del comedor'),
      habilidad('Accesibilidad web', ['carla'], 'En un proyecto privado'),
    ],
  },
  Empresa: {
    esPersona: false,
    propio: false,
    foto: FOTOS.pitagoras,
    nombre: 'Academia Pitágoras',
    insignia: 'Empresa',
    iconoInsignia: 'empleo',
    clasesInsignia: 'bg-naranja text-ink',
    titular: 'Academia de refuerzo escolar y preparación de Selectividad',
    lugar: 'Madrid · Chamberí y en línea',
    org: 'Academia · 11 a 50 personas',
    stats: [
      ['1.120', 'seguidores'],
      ['3', 'ofertas activas'],
      ['18', 'docentes'],
      ['2009', 'fundada'],
    ],
    acerca:
      'Ayudamos a alumnado de ESO y Bachillerato con clases en grupos pequeños y en línea. Buscamos docentes que expliquen con ejemplos reales y alumnado de FP para nuestro equipo digital.',
    etiquetas: ['Refuerzo', 'Selectividad', 'En línea'],
    tituloLinea: 'Datos de la academia',
    linea: [
      {
        icono: 'empleo',
        titulo: 'Sector',
        donde: 'Academia · educación no reglada',
        cuando: 'DESDE 2009',
        clases: 'bg-marino text-white',
      },
      {
        icono: 'ubicacion',
        titulo: 'Sedes',
        donde: 'Madrid (Chamberí) y clases en línea',
        cuando: '2 SEDES',
        clases: 'bg-marino-soft text-marino',
      },
      {
        icono: 'red',
        titulo: 'Equipo',
        donde: '18 docentes y 6 personas de gestión',
        cuando: '24 PERSONAS',
        clases: 'bg-azul-soft text-azul',
      },
      {
        icono: 'formacion',
        titulo: 'Alumnado',
        donde: 'ESO, Bachillerato y acceso a la universidad',
        cuando: '650 ALUMNOS',
        clases: 'bg-azul-soft text-azul',
      },
    ],
    pestanas: [
      ['offers', 'Ofertas', '3'],
      ['posts', 'Publicaciones', '2'],
    ],
    ofertas: [
      {
        tipo: 'DOCENCIA · NUEVA',
        titulo: 'Docente de Matemáticas para refuerzo online',
        meta: 'Remoto · 6 h/semana · tardes',
        pago: '28 €/hora',
        pide: ['Estadística aplicada', 'GeoGebra', 'Clases en línea'],
        publicada: 'Hace 1 h · 38 candidaturas',
        desc: 'Grupos de 6 alumnos de 4º de ESO, de lunes a jueves de 17:00 a 18:30. Preparas tú las sesiones con nuestro banco de ejercicios y te acompaña una coordinadora el primer mes.',
        ventajas: [
          'Contrato por horas desde enero',
          'Material y plataforma incluidos',
          'Formación inicial pagada',
        ],
        encaje: 'Encajas en 3 de 3 habilidades: tus validaciones lo respaldan',
      },
      {
        tipo: 'PRÁCTICAS',
        titulo: 'Prácticas de diseño UX',
        meta: 'Híbrido · 6 meses · para alumnado de FP',
        pago: '400 €/mes',
        pide: ['Diseño de interfaces', 'Figma', 'Accesibilidad web'],
        publicada: 'Ayer · 7 solicitudes',
        desc: 'Rediseñarás con nuestro equipo digital la plataforma de clases en línea. Dos días en la sede de Chamberí y el resto en remoto, con tutor asignado.',
        ventajas: [
          'Convenio con tu centro de FP',
          'Horario de mañana',
          'Posibilidad de contrato al acabar',
        ],
        encaje: 'Pensada para alumnado de FP: compártela con tus alumnos',
      },
      {
        tipo: 'CLASES PARTICULARES',
        titulo: 'Preparación de Física de 2º de Bachillerato',
        meta: 'Madrid · 8 h/semana',
        pago: '26 €/hora',
        pide: ['Física experimental', 'Preparación de Selectividad'],
        publicada: 'Hace 3 días · 12 candidaturas',
        desc: 'Clases individuales en la sede de Chamberí para alumnado de 2º de Bachillerato que prepara la PAU. Horario de tarde, de lunes a jueves.',
        ventajas: ['Alumnado ya asignado', 'Simulacros corregidos por el equipo', 'Pago mensual'],
        encaje: 'Encajas en 1 de 2 habilidades: Preparación de Selectividad',
      },
    ],
    publicaciones: [
      {
        cuando: 'Hace 3 días',
        texto:
          'Este curso abrimos grupos de refuerzo en línea para 4º de ESO. Buscamos docentes de Matemáticas: mira la oferta y cuéntanos cómo explicas.',
        adjuntoTipo: 'PDF',
        adjuntoClases: TIPO['PDF'],
        adjuntoTitulo: 'Cómo trabajamos en Academia Pitágoras',
        adjuntoMeta: 'PDF · 4 págs',
        likes: 29,
        comentarios: 6,
      },
      {
        cuando: 'Hace 3 semanas',
        texto:
          'Gracias a las 40 familias que vinieron a la jornada de puertas abiertas. Compartimos el calendario de simulacros de Selectividad.',
        adjuntoTipo: 'FICHA',
        adjuntoClases: TIPO['FICHA'],
        adjuntoTitulo: 'Calendario de simulacros 2027',
        adjuntoMeta: 'Ficha · 1 lámina',
        likes: 18,
        comentarios: 2,
      },
    ],
    tituloLateral: 'Su equipo en LinkEdu',
    cuentaLateral: '18 docentes',
    notaLateral:
      'Habilidades más validadas entre las personas que trabajan aquí, por compañeros de sus proyectos.',
    habilidades: [
      habilidad(
        'Clases en línea',
        ['irene', 'adrian', 'noa'],
        'Irene Pastor, Adrián Castro y 10 más',
      ),
      habilidad('Cálculo', ['irene'], 'Irene Pastor y 8 más'),
      habilidad('Java', ['adrian'], 'Adrián Castro y 2 más'),
      habilidad('Figma', ['noa'], 'Noa Jiménez, en su primer empleo'),
      habilidad('Preparación de Selectividad', ['irene', 'adrian'], 'Irene Pastor y 4 más'),
    ],
  },
};

// Número de validaciones "reales" de la empresa (la lista muestra solo algunas caras)
export const VALIDACIONES_EMPRESA: Record<string, number> = {
  'Clases en línea': 13,
  Cálculo: 9,
  Java: 6,
  Figma: 4,
  'Preparación de Selectividad': 7,
};

export const SEMILLAS_COMENTARIOS = [
  [
    {
      foto: FOTOS.elena,
      nombre: 'Elena Sanz',
      texto: '¡Qué buena idea! Me las llevo para 2º de ESO.',
    },
    {
      foto: FOTOS.jordi,
      nombre: 'Jordi Puig',
      texto: 'Nosotros lo repetimos en primavera, te cuento cómo nos va.',
    },
  ],
  [
    { foto: FOTOS.sofia, nombre: 'Sofía Navarro', texto: 'Gracias por compartirlo, muy claro.' },
    { foto: FOTOS.daniel, nombre: 'Daniel Ortiz', texto: '¿Tienes también la versión editable?' },
  ],
];

export type IconoActividad = 'val' | 'join' | 'com' | 'view' | 'job' | 'res';
export const ESTILO_ACTIVIDAD: Record<IconoActividad, [string, string]> = {
  val: ['check', 'bg-turquesa text-ink'],
  join: ['proyecto', 'bg-marino text-white'],
  com: ['comentar', 'bg-azul text-white'],
  view: ['perfil', 'bg-amarillo text-ink'],
  job: ['empleo', 'bg-naranja text-ink'],
  res: ['recurso', 'bg-azul text-white'],
};

const LOGO: Record<string, string> = FOTOS;
const act = (
  quien: string,
  tipo: IconoActividad,
  pre: string,
  fuerte: string,
  post: string,
  cuando: string,
) => {
  const esLogo = !!LOGO[quien] && LOGO[quien].endsWith('.svg');
  return {
    foto: LOGO[quien],
    encaja: esLogo ? 'object-contain' : 'object-cover',
    icono: ESTILO_ACTIVIDAD[tipo][0],
    clases: ESTILO_ACTIVIDAD[tipo][1],
    pre,
    fuerte,
    post,
    cuando,
  };
};

export const EXTRAS: Record<
  TipoPerfil,
  {
    comun?: {
      titulo: string;
      cuenta: string;
      personas: { foto: string; nombre: string; cargo: string }[];
    };
    actividad: { titulo: string; cuenta: string; items: ReturnType<typeof act>[] };
    lateral?: {
      titulo: string;
      items: { id: string; logo: string; nombre: string; meta: string }[];
    };
  }
> = {
  Profesora: {
    actividad: {
      titulo: 'Actividad reciente',
      cuenta: 'ESTA SEMANA',
      items: [
        act(
          'elena',
          'val',
          'Elena Sanz ha validado su',
          'Estadística aplicada',
          'en Matemáticas en el mercado',
          '3 h',
        ),
        act(
          'amparo',
          'join',
          'Amparo Ferrandis se ha unido a',
          'Matemáticas en el mercado',
          '',
          'Ayer',
        ),
        act(
          'javier',
          'com',
          'Javier Molina ha comentado',
          'Probabilidad con dados y cartas',
          '',
          '2 d',
        ),
      ],
    },
  },
  Alumno: {
    comun: {
      titulo: 'Contactos en común',
      cuenta: '6 CONTACTOS',
      personas: [
        {
          foto: FOTOS.daniel,
          nombre: 'Daniel Ortiz Cano',
          cargo: 'Alumno de 2º de DAW · CIFP Madrid Norte',
        },
        {
          foto: FOTOS.sofia,
          nombre: 'Sofía Navarro Gil',
          cargo: 'Alumna de 2º de DAW · CIFP Madrid Norte',
        },
        {
          foto: FOTOS.carla,
          nombre: 'Carla Méndez Ruiz',
          cargo: 'Alumna de 2º de DAW · CIFP Madrid Norte',
        },
      ],
    },
    actividad: {
      titulo: 'Actividad reciente',
      cuenta: 'ESTA SEMANA',
      items: [
        act('sofia', 'val', 'Sofía Navarro le ha validado', 'Figma', 'en LinkEdu', '5 h'),
        act(
          'pitagoras',
          'view',
          'Academia Pitágoras ha visto',
          'su perfil',
          'desde Empleo',
          'Ayer',
        ),
        act(
          'daniel',
          'com',
          'Daniel Ortiz ha comentado',
          'Plantilla de Figma para wireframes',
          '',
          '2 d',
        ),
        act(
          'carla',
          'join',
          'Carla Méndez se ha unido a',
          'LinkEdu: red social educativa',
          '',
          '4 d',
        ),
        act(
          'noa',
          'res',
          'Noa Jiménez ha descargado',
          'Apuntes de Angular: componentes y servicios',
          '',
          '5 d',
        ),
        act(
          'aula',
          'job',
          'Aula Digital Ediciones le ha propuesto',
          'Prácticas de front-end',
          '',
          '6 d',
        ),
      ],
    },
    lateral: {
      titulo: 'Empresas que buscan su perfil',
      items: [
        {
          id: 'aula',
          logo: FOTOS.aula,
          nombre: 'Aula Digital Ediciones',
          meta: 'Prácticas de front-end',
        },
        {
          id: 'pitagoras',
          logo: FOTOS.pitagoras,
          nombre: 'Academia Pitágoras',
          meta: 'Prácticas de diseño UX',
        },
        {
          id: 'lumen',
          logo: FOTOS.lumen,
          nombre: 'Lumen Formación',
          meta: 'Desarrollo web junior',
        },
        {
          id: 'escuela',
          logo: FOTOS.escuela,
          nombre: 'Escuela Docente Abierta',
          meta: 'Prácticas en su campus virtual',
        },
      ],
    },
  },
  Empresa: {
    comun: {
      titulo: 'De tu red trabajan aquí',
      cuenta: '2 CONTACTOS',
      personas: [
        {
          foto: FOTOS.irene,
          nombre: 'Irene Pastor Llorente',
          cargo: 'Profesora de Matemáticas · desde 2021',
        },
        {
          foto: FOTOS.adrian,
          nombre: 'Adrián Castro León',
          cargo: 'Profesor de Física · desde 2023',
        },
      ],
    },
    actividad: {
      titulo: 'Actividad reciente',
      cuenta: 'ESTA SEMANA',
      items: [
        act(
          'irene',
          'job',
          'Irene Pastor ha compartido',
          'Docente de Matemáticas para refuerzo online',
          '',
          '1 h',
        ),
        act(
          'noa',
          'join',
          'Noa Jiménez se ha unido al',
          'equipo digital',
          'de la academia',
          'Ayer',
        ),
        act('adrian', 'res', 'Adrián Castro ha subido', 'Simulacro de Física PAU 2027', '', '3 d'),
        act('marcos', 'view', 'Marcos Vidal ha empezado a seguir', 'la academia', '', '4 d'),
      ],
    },
    lateral: {
      titulo: 'Academias parecidas',
      items: [
        {
          id: 'hipatia',
          logo: FOTOS.hipatia,
          nombre: 'Academia Hipatia',
          meta: 'Refuerzo · Valencia',
        },
        {
          id: 'aula',
          logo: FOTOS.aula,
          nombre: 'Aula Digital Ediciones',
          meta: 'Formación en línea',
        },
        { id: 'lumen', logo: FOTOS.lumen, nombre: 'Lumen Formación', meta: 'Oposiciones · Madrid' },
        {
          id: 'escuela',
          logo: FOTOS.escuela,
          nombre: 'Escuela Docente Abierta',
          meta: 'Formación docente',
        },
        {
          id: 'fundacion',
          logo: FOTOS.fundacion,
          nombre: 'Fundación Ciencia en el Aula',
          meta: 'Talleres STEM · Madrid',
        },
      ],
    },
  },
};

export const PERSONAS_COMPARTIR = [
  { id: 'elena', cargo: 'Profesora de Lengua · IES Valle del Sol' },
  { id: 'jordi', cargo: 'Profesor de Tecnología · Barcelona' },
  { id: 'amparo', cargo: 'Jefa de estudios · IES Alameda' },
];

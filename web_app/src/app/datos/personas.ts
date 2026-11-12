import { FOTOS } from './fotos';
import { Cara, EXTRAS, Habilidad, PERFILES, Perfil, ProyectoPerfil, RecursoPerfil } from './perfil';
import { PERSONAS, PROYECTOS } from './proyectos';
import { CATALOGO } from './recursos';

// Directorio de personas de LinkEdu: sirve para abrir el perfil de cualquiera
// al pulsar su foto (en cualquier pantalla) o al buscarla en la cabecera.

export interface FichaPersona {
  nombre: string;
  foto: string;
  mujer: boolean;
  materia: string; // o los estudios, si es alumno
  etapa: string;
  ciudad: string;
  centro: string;
  desde: number;
  alumno?: boolean;
}

const ficha = (
  nombre: string,
  foto: string,
  mujer: boolean,
  materia: string,
  etapa: string,
  ciudad: string,
  centro: string,
  desde: number,
  alumno = false,
): FichaPersona => ({ nombre, foto, mujer, materia, etapa, ciudad, centro, desde, alumno });

export const DIRECTORIO: Record<string, FichaPersona> = {
  // Docentes
  javier: ficha(
    'Javier Molina',
    FOTOS.javier,
    false,
    'Tecnología',
    'ESO',
    'Madrid',
    'IES Sierra Norte',
    2012,
  ),
  elena: ficha(
    'Elena Sanz Prieto',
    FOTOS.elena,
    true,
    'Matemáticas',
    'ESO',
    'Madrid',
    'IES Valle del Sol',
    2016,
  ),
  jordi: ficha(
    'Jordi Puig Ferrer',
    FOTOS.jordi,
    false,
    'Matemáticas',
    'Bachillerato',
    'Barcelona',
    'Institut Joan Miró',
    2011,
  ),
  amparo: ficha(
    'Amparo Ferrandis Gil',
    FOTOS.amparo,
    true,
    'Matemáticas',
    'ESO',
    'Valencia',
    'IES Alameda',
    2008,
  ),
  rocio: ficha(
    'Rocío Campos León',
    FOTOS.rocio,
    true,
    'Matemáticas',
    'Primaria',
    'Sevilla',
    'CEIP Giralda',
    2015,
  ),
  marta: ficha(
    'Marta Ruiz Delgado',
    FOTOS.marta,
    true,
    'Lengua',
    'Primaria',
    'Cádiz',
    'CEIP La Caleta',
    2013,
  ),
  carlos: ficha(
    'Carlos Pérez Nieto',
    FOTOS.carlos,
    false,
    'Matemáticas',
    'Bachillerato',
    'Alicante',
    'IES Jorge Juan',
    2013,
  ),
  nuria: ficha(
    'Nuria Gil Soler',
    FOTOS.nuria,
    true,
    'Matemáticas',
    'ESO',
    'Santander',
    'IES Santa Clara',
    2017,
  ),
  andres: ficha(
    'Andrés López Vega',
    FOTOS.andres,
    false,
    'Matemáticas',
    'FP',
    'Lugo',
    'CIFP Politécnico de Lugo',
    2014,
  ),
  paula: ficha(
    'Paula Díez Romero',
    FOTOS.paula,
    true,
    'Orientación',
    'ESO',
    'Madrid',
    'IES Ramiro de Maeztu',
    2015,
  ),
  iker: ficha(
    'Iker Etxeberria Sáez',
    FOTOS.iker,
    false,
    'Robótica',
    'FP',
    'Bilbao',
    'CIFP Txurdinaga',
    2012,
  ),
  lidia: ficha(
    'Lidia Moreno Paz',
    FOTOS.lidia,
    true,
    'Química',
    'ESO',
    'Madrid',
    'IES Sierra Norte',
    2018,
  ),
  sergio: ficha(
    'Sergio Blanco Ruiz',
    FOTOS.sergio,
    false,
    'Matemáticas',
    'ESO',
    'Salamanca',
    'IES Fray Luis de León',
    2016,
  ),
  oscar: ficha(
    'Óscar Herrero Mata',
    FOTOS.oscar,
    false,
    'Informática',
    'FP',
    'Valladolid',
    'IES Galileo',
    2010,
  ),
  hugo: ficha(
    'Hugo Martín Rey',
    FOTOS.hugo,
    false,
    'Física',
    'Bachillerato',
    'Madrid',
    'IES San Isidro',
    2015,
  ),
  irene: ficha(
    'Irene Pastor Llorente',
    FOTOS.irene,
    true,
    'Matemáticas y Física',
    'clases particulares',
    'Madrid',
    'Academia Pitágoras',
    2021,
  ),
  adrian: ficha(
    'Adrián Castro León',
    FOTOS.adrian,
    false,
    'Física',
    'Bachillerato',
    'Madrid',
    'Academia Pitágoras',
    2023,
  ),
  carmen: ficha(
    'Carmen Luque Vega',
    FOTOS.carmen,
    true,
    'Matemáticas',
    'ESO',
    'Córdoba',
    'IES Góngora',
    2012,
  ),
  maite: ficha(
    'Maite Arana Ruiz',
    FOTOS.maite,
    true,
    'Inglés',
    'Primaria',
    'Pamplona',
    'CEIP San Juan',
    2014,
  ),
  teresa: ficha(
    'Teresa Alonso Cano',
    FOTOS.teresa,
    true,
    'Matemáticas',
    'ESO',
    'Valladolid',
    'IES Zorrilla',
    2011,
  ),
  manuel: ficha(
    'Manuel Ortega Lara',
    PERSONAS['manuel'].foto,
    false,
    'Tecnología',
    'ESO',
    'Sevilla',
    'IES Triana',
    2014,
  ),
  // Alumnado
  sofia: ficha(
    'Sofía Navarro Gil',
    FOTOS.sofia,
    true,
    '2º de DAW',
    'FP',
    'Madrid',
    'CIFP Madrid Norte',
    2025,
    true,
  ),
  carla: ficha(
    'Carla Méndez Ruiz',
    FOTOS.carla,
    true,
    '2º de DAW',
    'FP',
    'Madrid',
    'CIFP Madrid Norte',
    2025,
    true,
  ),
  daniel: ficha(
    'Daniel Ortiz Cano',
    FOTOS.daniel,
    false,
    '2º de DAW',
    'FP',
    'Madrid',
    'CIFP Madrid Norte',
    2025,
    true,
  ),
  noa: ficha(
    'Noa Jiménez Prado',
    FOTOS.noa,
    true,
    '2º de DAM',
    'FP',
    'Madrid',
    'CIFP Madrid Norte',
    2025,
    true,
  ),
  marcos: ficha(
    'Marcos Vidal Ortiz',
    FOTOS.marcos,
    false,
    'Magisterio de Primaria',
    'Grado',
    'Madrid',
    'Universidad Autónoma de Madrid',
    2023,
    true,
  ),
};

// ---------- De una foto a su perfil ----------
// Lucía es la usuaria (su perfil es /perfil); Álex y la Academia Pitágoras tienen perfil propio.
const RUTA_POR_FOTO: Record<string, string> = {
  [FOTOS.lucia]: '/perfil',
  [FOTOS.alex]: '/perfil/alex',
  [FOTOS.pitagoras]: '/perfil/pitagoras',
};
Object.entries(DIRECTORIO).forEach(([id, p]) => (RUTA_POR_FOTO[p.foto] ??= '/perfil/' + id));

/** Ruta del perfil de quien sale en esa foto (o null si la foto no es de nadie con perfil). */
export function rutaPerfilDeFoto(foto: string | null | undefined): string | null {
  if (!foto) return null;
  // La foto puede llegar como ruta relativa o como URL completa (img.src)
  const limpia = foto.slice(foto.indexOf('imagenes/'));
  return RUTA_POR_FOTO[limpia] ?? null;
}

// ---------- De un nombre a su perfil ----------
// Vale el nombre completo ("Sergio Blanco Ruiz") o nombre + primer apellido ("Sergio Blanco").
// El nombre de pila solo ("Sergio") no, porque podría ser de varias personas.
const RUTA_POR_NOMBRE: Record<string, string> = {};
const apuntarNombre = (nombre: string, ruta: string) => {
  RUTA_POR_NOMBRE[nombre] ??= ruta;
  RUTA_POR_NOMBRE[nombre.split(' ').slice(0, 2).join(' ')] ??= ruta;
};
apuntarNombre('Lucía Fernández Ortega', '/perfil');
apuntarNombre(PERFILES.Alumno.nombre, '/perfil/alex');
apuntarNombre(PERFILES.Empresa.nombre, '/perfil/pitagoras');
Object.entries(DIRECTORIO).forEach(([id, p]) => apuntarNombre(p.nombre, '/perfil/' + id));

/** Ruta del perfil de la persona con ese nombre (o null si no hay nadie con perfil). */
export function rutaPerfilDeNombre(nombre: string | null | undefined): string | null {
  return nombre ? (RUTA_POR_NOMBRE[nombre.trim()] ?? null) : null;
}

export function nombreDeFoto(foto: string): string {
  const ruta = rutaPerfilDeFoto(foto);
  if (ruta === '/perfil') return 'Lucía Fernández Ortega';
  const id = ruta?.split('/')[2] ?? '';
  if (id === 'alex') return PERFILES.Alumno.nombre;
  if (id === 'pitagoras') return PERFILES.Empresa.nombre;
  return DIRECTORIO[id]?.nombre ?? '';
}

// ---------- Generar el perfil de cualquier persona ----------
const caraDe = (id: string): Cara =>
  id === 'lucia'
    ? { foto: FOTOS.lucia, nombre: 'Lucía Fernández Ortega' }
    : {
        foto: DIRECTORIO[id]?.foto ?? PERSONAS[id]?.foto,
        nombre: DIRECTORIO[id]?.nombre ?? PERSONAS[id]?.nombre,
      };

// Número estable a partir del id (para que cada perfil tenga sus cifras y no cambien al recargar)
const semilla = (id: string) => [...id].reduce((s, c) => (s * 31 + c.charCodeAt(0)) % 9973, 7);

// Herramientas y temas típicos de cada materia
const TEMAS: Record<
  string,
  { etiquetas: string[]; habilidades: string[]; recursos: [string, string][] }
> = {
  Matemáticas: {
    etiquetas: ['GeoGebra', 'ABP', 'Estadística'],
    habilidades: [
      'Estadística aplicada',
      'GeoGebra',
      'Aprendizaje basado en proyectos',
      'Diseño de pruebas',
    ],
    recursos: [
      ['Ecuaciones con retos de escape room', 'Fichas'],
      ['Estadística con datos del barrio', 'PDF'],
      ['Geometría con GeoGebra paso a paso', 'Presentación'],
    ],
  },
  Tecnología: {
    etiquetas: ['Arduino', 'Maker', 'ABP'],
    habilidades: ['Sensores con Arduino', 'Impresión 3D', 'Aprendizaje basado en proyectos'],
    recursos: [
      ['Proyecto de domótica con Arduino', 'PDF'],
      ['Diseño 3D para principiantes', 'Presentación'],
      ['Retos de electrónica básica', 'Fichas'],
    ],
  },
  Robótica: {
    etiquetas: ['Arduino', 'Robótica educativa', 'Maker'],
    habilidades: ['Robótica educativa', 'Sensores con Arduino', 'Coordinación FP y ESO'],
    recursos: [
      ['Robots siguelíneas en 4 sesiones', 'PDF'],
      ['Programación por bloques', 'Presentación'],
      ['Retos de robótica por niveles', 'Fichas'],
    ],
  },
  Informática: {
    etiquetas: ['Programación', 'Bases de datos', 'Linux'],
    habilidades: ['Programación en Python', 'Bases de datos', 'Coordinación FP y ESO'],
    recursos: [
      ['Python desde cero con retos', 'PDF'],
      ['SQL con ejemplos reales', 'Presentación'],
      ['Prácticas de redes', 'Fichas'],
    ],
  },
  Física: {
    etiquetas: ['Laboratorio', 'Simulaciones', 'PAU'],
    habilidades: ['Prácticas de laboratorio', 'Simulaciones PhET', 'Preparación de la PAU'],
    recursos: [
      ['Cinemática con vídeos del móvil', 'PDF'],
      ['Simulacro de Física PAU', 'PDF'],
      ['Leyes de Newton con experimentos', 'Presentación'],
    ],
  },
  Química: {
    etiquetas: ['Laboratorio', 'Juegos', 'Gamificación'],
    habilidades: ['Prácticas de laboratorio', 'Gamificación', 'Aprendizaje cooperativo'],
    recursos: [
      ['La tabla periódica en cartas', 'Juego'],
      ['Prácticas de laboratorio seguras', 'PDF'],
      ['Reacciones químicas del día a día', 'Presentación'],
    ],
  },
  Lengua: {
    etiquetas: ['Lectura', 'Escritura creativa', 'Primaria'],
    habilidades: ['Animación a la lectura', 'Escritura creativa', 'Trabajo con familias'],
    recursos: [
      ['Fichas de comprensión lectora', 'Fichas'],
      ['Taller de cuentos en clase', 'PDF'],
      ['Ortografía con juegos', 'Juego'],
    ],
  },
  Inglés: {
    etiquetas: ['Inglés', 'Canciones', 'Primaria'],
    habilidades: ['Inglés con canciones', 'Aprendizaje cooperativo', 'Trabajo con familias'],
    recursos: [
      ['Vocabulario con canciones', 'Presentación'],
      ['Cuentos en inglés para 3º', 'PDF'],
      ['Juegos de rol en inglés', 'Fichas'],
    ],
  },
  Orientación: {
    etiquetas: ['Orientación', 'Tutoría', 'Convivencia'],
    habilidades: ['Mediación de conflictos', 'Trabajo con familias', 'Orientación académica'],
    recursos: [
      ['Rúbricas de trabajo en equipo', 'Fichas'],
      ['Guía de orientación para 4º ESO', 'PDF'],
      ['Dinámicas de cohesión de grupo', 'Presentación'],
    ],
  },
  '2º de DAW': {
    etiquetas: ['Angular', 'Figma', 'Accesibilidad'],
    habilidades: ['Figma', 'Angular', 'Accesibilidad web', 'Trabajo en equipo'],
    recursos: [
      ['Apuntes de Angular: componentes y servicios', 'PDF'],
      ['Plantilla de Figma para wireframes', 'Presentación'],
      ['Guía rápida de accesibilidad web', 'Fichas'],
    ],
  },
  '2º de DAM': {
    etiquetas: ['Kotlin', 'Android', 'Bases de datos'],
    habilidades: ['Apps con Kotlin', 'Bases de datos', 'Trabajo en equipo'],
    recursos: [
      ['Primeros pasos con Kotlin', 'PDF'],
      ['Diseño de apps móviles', 'Presentación'],
      ['Ejercicios de SQL resueltos', 'Fichas'],
    ],
  },
  'Magisterio de Primaria': {
    etiquetas: ['Prácticas', 'Primaria', 'Didáctica'],
    habilidades: [
      'Didáctica de las Matemáticas',
      'Trabajo con familias',
      'Aprendizaje cooperativo',
    ],
    recursos: [
      ['Unidad didáctica de fracciones', 'PDF'],
      ['Diario de prácticas', 'PDF'],
      ['Juegos de cálculo mental', 'Juego'],
    ],
  },
};
const temasDe = (materia: string) =>
  TEMAS[materia] ?? TEMAS[Object.keys(TEMAS).find((k) => materia.startsWith(k)) ?? 'Matemáticas'];

const CLASES_TIPO: Record<string, [string, string]> = {
  PDF: ['PDF', 'bg-marino text-white'],
  Presentación: ['PPT', 'bg-azul text-white'],
  Fichas: ['FICHA', 'bg-turquesa text-ink'],
  Juego: ['FIG', 'bg-naranja text-ink'],
  Vídeo: ['PPT', 'bg-azul text-white'],
  'Hoja de cálculo': ['FICHA', 'bg-turquesa text-ink'],
};
const COLOR_ESTADO: Record<string, string> = {
  Activo: 'bg-turquesa',
  Borrador: 'bg-amarillo',
  Finalizado: 'bg-line',
};

/** Perfil completo de una persona del directorio (o null si no existe). */
export function perfilDe(
  id: string,
): { perfil: Perfil; extras: (typeof EXTRAS)['Profesora'] } | null {
  if (id === 'alex') return { perfil: PERFILES.Alumno, extras: EXTRAS.Alumno };
  if (id === 'pitagoras') return { perfil: PERFILES.Empresa, extras: EXTRAS.Empresa };
  const p = DIRECTORIO[id];
  if (!p) return null;
  const s = semilla(id);
  const temas = temasDe(p.materia);
  const corto = p.nombre.split(' ')[0];
  const docente = p.mujer ? 'Profesora' : 'Profesor';
  const insignia = p.alumno ? (p.mujer ? 'Alumna' : 'Alumno') : docente;
  // Gente con la que se relaciona: docentes con docentes y alumnado con alumnado
  const otros = Object.keys(DIRECTORIO).filter(
    (k) => k !== id && !!DIRECTORIO[k].alumno === !!p.alumno,
  );
  const elegir = (n: number, desde: number) => [
    ...new Set(Array.from({ length: n }, (_, i) => otros[(s + desde + i * 7) % otros.length])),
  ];

  // Proyectos públicos en los que participa
  const suyos = Object.values(PROYECTOS).filter((x) => x.miembros.includes(id));
  const publicos = suyos.filter((x) => x.visibilidad === 'Público');
  const proyectos: ProyectoPerfil[] = publicos.map((x) => {
    const val = x.validaciones[id] ?? {};
    return {
      titulo: x.titulo,
      color: x.color,
      estado: x.estado,
      colorEstado: COLOR_ESTADO[x.estado],
      fechas: x.fechas.toUpperCase(),
      resumen: x.resumen,
      habilidades: Object.entries(val).map(([h, por]) => `${h} · ${por.length}`),
      caras: x.miembros.map(caraDe),
      rol: `${x.miembros[0] === id ? 'Coordina' : 'Participa'} · ${x.miembros.length} participantes`,
    };
  });
  // Siempre al menos 2 proyectos, para que la cuadrícula no quede con un hueco vacío
  const companeros = otros;
  const equipoDe = (desde: number) => [
    id,
    ...[0, 1].map((i) => companeros[(s + desde + i * 3) % companeros.length]),
  ];
  const plantillas = p.alumno
    ? [
        {
          titulo: 'Proyecto de fin de curso',
          resumen: `Proyecto en equipo de ${p.materia} en ${p.centro}, con una entidad real como cliente.`,
          estado: 'Activo',
        },
        {
          titulo: 'Hackathon educativo 2026',
          resumen: 'Dos días para crear una herramienta útil para un aula. Quedamos segundos.',
          estado: 'Finalizado',
        },
      ]
    : [
        {
          titulo: `${p.materia} entre centros`,
          resumen: `Varios centros comparten materiales y retos de ${p.materia.toLowerCase()} para ${p.etapa}.`,
          estado: 'Activo',
        },
        {
          titulo: 'Jornadas de innovación educativa',
          resumen: `Docentes de ${p.ciudad} preparan juntos talleres para las jornadas de primavera.`,
          estado: 'Finalizado',
        },
      ];
  plantillas.slice(0, Math.max(0, 2 - proyectos.length)).forEach((x, i) => {
    const equipo = equipoDe(i * 5 + 1);
    proyectos.push({
      titulo: x.titulo,
      color: i ? 'bg-ink-faint' : 'bg-azul',
      estado: x.estado,
      colorEstado: COLOR_ESTADO[x.estado],
      fechas: x.estado === 'Activo' ? 'OCT 26 – JUN 27' : 'MAR 26 – MAY 26',
      resumen: x.resumen,
      habilidades: [`${temas.habilidades[i]} · 2`, `${temas.habilidades[i + 1]} · 1`],
      caras: equipo.map(caraDe),
      rol: `${i ? 'Participa' : 'Coordina'} · ${equipo.length} participantes`,
    });
  });

  // Habilidades validadas: las de sus proyectos y, si faltan, las típicas de su materia
  const mapa: Record<string, { por: string[]; donde: string[] }> = {};
  suyos.forEach((x) =>
    Object.entries(x.validaciones[id] ?? {}).forEach(([h, por]) => {
      mapa[h] ??= { por: [], donde: [] };
      por.forEach((q) => !mapa[h].por.includes(q) && mapa[h].por.push(q));
      mapa[h].donde.push(x.titulo);
    }),
  );
  temas.habilidades.forEach((h, i) => {
    if (!mapa[h])
      mapa[h] = { por: elegir(3 - Math.min(i, 2), i * 3), donde: [proyectos[0].titulo] };
  });
  const habilidades: Habilidad[] = Object.entries(mapa).map(([nombre, v]) => ({
    nombre,
    n: v.por.length,
    por: v.por.filter((q) => caraDe(q).foto).map(caraDe),
    donde: 'En ' + v.donde.join(' y '),
  }));
  const validaciones = habilidades.reduce((t, h) => t + h.n, 0);

  // Recursos: los suyos del catálogo y, si no hay, los típicos de su materia
  const delCatalogo = CATALOGO.filter(
    (r) => r.autor.split(' ').slice(0, 2).join(' ') === p.nombre.split(' ').slice(0, 2).join(' '),
  );
  // Primero los suyos del catálogo y, hasta tener al menos 3, los típicos de su materia
  const recursos: RecursoPerfil[] = [
    ...delCatalogo.map(
      (r) => [r.titulo, r.tipo, r.detalle.toLowerCase(), r.materia, r.descargas] as const,
    ),
    ...temas.recursos
      .filter((x) => !delCatalogo.some((r) => r.titulo === x[0]))
      .slice(0, Math.max(0, 3 - delCatalogo.length))
      .map(
        ([t, tipo], i) =>
          [
            t,
            tipo,
            `${8 + ((s + i * 5) % 20)} págs`,
            `${p.materia} · ${p.etapa}`,
            120 + ((s * (i + 3)) % 900),
          ] as const,
      ),
  ].map(([titulo, tipo, detalle, materia, descargas]) => ({
    tipo: CLASES_TIPO[tipo][0],
    clases: CLASES_TIPO[tipo][1],
    titulo,
    meta: `${tipo} · ${detalle} · ${materia}`,
    descargas: descargas.toLocaleString('es-ES'),
    precio: 'Gratis',
  }));

  const r0 = recursos[0];
  const publicaciones = [
    {
      cuando: `Hace ${1 + (s % 5)} días · ${proyectos[0].titulo}`,
      texto: p.alumno
        ? `Hemos terminado la primera entrega del ${proyectos[0].titulo.toLowerCase()}. Os dejo lo que hemos aprendido por si os sirve.`
        : `Ya está lista la primera fase de ${proyectos[0].titulo}. Comparto el material que hemos usado, listo para adaptar a vuestras clases.`,
      adjuntoTipo: r0.tipo,
      adjuntoClases: r0.clases,
      adjuntoTitulo: r0.titulo,
      adjuntoMeta: `${r0.meta} · ${r0.descargas} descargas`,
      likes: 20 + (s % 60),
      comentarios: 3 + (s % 14),
    },
    {
      cuando: `Hace ${2 + (s % 3)} semanas`,
      texto: p.alumno
        ? `¿Alguien tiene ideas para mejorar la parte visual de nuestro proyecto? Se aceptan consejos.`
        : `Una pregunta para quien dé ${p.materia} en ${p.etapa}: ¿cómo trabajáis la evaluación por proyectos? Os leo.`,
      adjuntoTipo: recursos[1 % recursos.length].tipo,
      adjuntoClases: recursos[1 % recursos.length].clases,
      adjuntoTitulo: recursos[1 % recursos.length].titulo,
      adjuntoMeta: recursos[1 % recursos.length].meta,
      likes: 8 + (s % 30),
      comentarios: 2 + (s % 9),
    },
  ];

  const conexiones = 40 + (s % 260);
  const privados = suyos.length - publicos.length;
  const perfil: Perfil = {
    esPersona: true,
    propio: false,
    foto: p.foto,
    nombre: p.nombre,
    insignia,
    iconoInsignia: p.alumno ? 'perfil' : 'formacion',
    clasesInsignia: p.alumno ? 'bg-amarillo text-ink' : 'bg-turquesa text-ink',
    titular: p.alumno
      ? `${insignia} de ${p.materia} · ${p.centro}`
      : `${docente} de ${p.materia} en ${p.etapa} · ${p.centro}`,
    lugar: p.ciudad,
    org: p.centro,
    stats: [
      [String(conexiones), 'conexiones'],
      [String(suyos.length || proyectos.length), 'proyectos'],
      [String(recursos.length), 'recursos'],
      [String(validaciones), 'validaciones'],
    ],
    acerca: p.alumno
      ? `Estudio ${p.materia} en ${p.centro}. Busco prácticas y proyectos reales donde aprender con otros. Me gusta compartir lo que hago en clase.`
      : `Doy ${p.materia} en ${p.etapa} desde ${p.desde}. Me gusta aprender de otros docentes y compartir lo que preparo para que se pueda adaptar a cualquier aula. Ahora mismo trabajo en ${p.centro}, en ${p.ciudad}.`,
    etiquetas: [p.materia, p.etapa, ...temas.etiquetas].filter((e, i, a) => a.indexOf(e) === i),
    tituloLinea: p.alumno ? 'Formación' : 'Experiencia y formación',
    linea: p.alumno
      ? [
          {
            icono: 'formacion',
            titulo: p.materia,
            donde: `${p.centro} · ${p.ciudad}`,
            cuando: `${p.desde} – hoy`,
            clases: 'bg-marino text-white',
          },
          {
            icono: 'formacion',
            titulo: 'Bachillerato',
            donde: `IES de ${p.ciudad}`,
            cuando: `${p.desde - 2} – ${p.desde}`,
            clases: 'bg-azul-soft text-azul',
          },
        ]
      : [
          {
            icono: 'empleo',
            titulo: `${docente} de ${p.materia}`,
            donde: `${p.centro} · ${p.ciudad}`,
            cuando: `${Math.min(p.desde + 4, 2024)} – hoy`,
            clases: 'bg-marino text-white',
          },
          {
            icono: 'empleo',
            titulo: p.mujer ? 'Profesora interina' : 'Profesor interino',
            donde: `Centros de ${p.ciudad}`,
            cuando: `${p.desde} – ${Math.min(p.desde + 4, 2024)}`,
            clases: 'bg-marino-soft text-marino',
          },
          {
            icono: 'formacion',
            titulo: 'Máster en Formación del Profesorado',
            donde: `Especialidad de ${p.materia}`,
            cuando: `${p.desde - 1} – ${p.desde}`,
            clases: 'bg-azul-soft text-azul',
          },
        ],
    pestanas: [
      [
        'projects',
        'Proyectos',
        `${proyectos.length} ${proyectos.length === 1 ? 'público' : 'públicos'}`,
      ],
      ['posts', 'Publicaciones', '2'],
      ['resources', 'Recursos', String(recursos.length)],
    ],
    proyectos,
    tituloPrivados:
      privados > 0
        ? `${privados} ${privados === 1 ? 'proyecto privado' : 'proyectos privados'}`
        : undefined,
    publicaciones,
    recursos,
    tituloLateral: 'Habilidades validadas',
    cuentaLateral: `${validaciones} validaciones`,
    notaLateral: `Solo las validan compañeros que han trabajado con ${corto} en un proyecto.`,
    habilidades,
  };

  // Columna lateral: contactos en común y actividad
  const comun = elegir(3, 11).map((k) => ({
    foto: DIRECTORIO[k].foto,
    nombre: DIRECTORIO[k].nombre,
    cargo: `${DIRECTORIO[k].materia} · ${DIRECTORIO[k].ciudad}`,
  }));
  const [a, b, c] = elegir(3, 5);
  const act = (
    quien: string,
    icono: string,
    clases: string,
    pre: string,
    fuerte: string,
    cuando: string,
  ) => ({
    foto: DIRECTORIO[quien].foto,
    encaja: 'object-cover',
    icono,
    clases,
    pre,
    fuerte,
    post: '',
    cuando,
  });
  const nom = (k: string) => DIRECTORIO[k].nombre.split(' ').slice(0, 2).join(' ');
  const extras = {
    comun: { titulo: 'Contactos en común', cuenta: `${3 + (s % 9)} CONTACTOS`, personas: comun },
    actividad: {
      titulo: 'Actividad reciente',
      cuenta: 'ESTA SEMANA',
      items: [
        act(
          a,
          'check',
          'bg-turquesa text-ink',
          `${nom(a)} le ha validado`,
          habilidades[0].nombre,
          `${1 + (s % 9)} h`,
        ),
        act(b, 'comentar', 'bg-azul text-white', `${nom(b)} ha comentado`, r0.titulo, 'Ayer'),
        act(
          c,
          'proyecto',
          'bg-marino text-white',
          `${nom(c)} se ha unido a`,
          proyectos[0].titulo,
          '3 d',
        ),
      ],
    },
  };
  return { perfil, extras };
}

// Datos de prueba de la pantalla "Mi red".
// Las formas del mapa y las posiciones están en public/datos/mapa.json.

export type Lado = 't' | 'b' | 'l' | 'r';

export interface PersonaRed {
  nombre: string;
  cargo: string;
  relacion: number; // 0 = de tu materia, 1 = en proyectos, 2 = en grupos
  foto: string;
}

export interface CiudadRed {
  id: string;
  nombre: string;
  rel: number[]; // contactos de [materia, proyectos, grupos]
  lado: Lado;
  personas: PersonaRed[];
}

export interface PaisRed {
  id: string;
  nombre: string;
  lado: Lado;
  malla: string[][]; // parejas de ciudades unidas entre sí
  ciudades: CiudadRed[];
}

export interface Recomendado {
  id: string;
  nombre: string;
  materia: string;
  ciudad: string;
  pais: string | null;
  vista: string;
  lado: Lado;
  via: string;
  viaCiudad: string | null;
  puente: string;
  enComun: number;
  foto: string;
}

export interface Invitacion {
  id: string;
  nombre: string;
  cargo: string;
  foto: string;
}

export const PAISES: PaisRed[] = [
  {
    id: 'espana',
    nombre: 'España',
    lado: 'b',
    malla: [
      ['barcelona', 'valencia'],
      ['barcelona', 'zaragoza'],
      ['zaragoza', 'bilbao'],
      ['bilbao', 'valladolid'],
      ['valladolid', 'coruna'],
      ['sevilla', 'malaga'],
      ['malaga', 'granada'],
      ['granada', 'murcia'],
      ['valencia', 'murcia'],
      ['barcelona', 'palma'],
      ['sevilla', 'laspalmas'],
    ],
    ciudades: [
      {
        id: 'madrid',
        nombre: 'Madrid',
        rel: [22, 12, 14],
        lado: 'r',
        personas: [
          {
            nombre: 'Elena Sanz Prieto',
            cargo: 'Matemáticas · ESO',
            relacion: 0,
            foto: 'imagenes/54857d9a7b150e6e1114b2b43d4a303b.jpg',
          },
          {
            nombre: 'Hugo Martín Rey',
            cargo: 'Física · Bachillerato',
            relacion: 1,
            foto: 'imagenes/bc0aabedc0a35e854f57407788451189.jpg',
          },
          {
            nombre: 'Paula Díez Romero',
            cargo: 'Orientación · ESO',
            relacion: 2,
            foto: 'imagenes/b2d042b7b34e78e1d2dfd69551620005.jpg',
          },
        ],
      },
      {
        id: 'barcelona',
        nombre: 'Barcelona',
        rel: [10, 8, 8],
        lado: 't',
        personas: [
          {
            nombre: 'Jordi Puig Ferrer',
            cargo: 'Matemáticas · Bachillerato',
            relacion: 0,
            foto: 'imagenes/b694740183a71b4e395586110be41fbc.jpg',
          },
          {
            nombre: 'Montse Soler Roca',
            cargo: 'Ciencias · ESO',
            relacion: 1,
            foto: 'imagenes/03c4abcce6ca8fd4611b853617d47760.jpg',
          },
          {
            nombre: 'Pau Serra Mas',
            cargo: 'Música · Primaria',
            relacion: 2,
            foto: 'imagenes/136a9c2c0dff43f5aabc739225adda96.jpg',
          },
        ],
      },
      {
        id: 'valencia',
        nombre: 'Valencia',
        rel: [8, 9, 3],
        lado: 'r',
        personas: [
          {
            nombre: 'Javier Molina',
            cargo: 'Tecnología · FP',
            relacion: 1,
            foto: 'imagenes/4b045af20015bcef2e4206fed41e32cc.jpg',
          },
          {
            nombre: 'Amparo Ferrandis Gil',
            cargo: 'Matemáticas · ESO',
            relacion: 0,
            foto: 'imagenes/e9e83a615a697ebaca43fd0f244335f6.jpg',
          },
          {
            nombre: 'Vicent Martí Sanchis',
            cargo: 'Historia · ESO',
            relacion: 2,
            foto: 'imagenes/e05bef52af5aa72a22d768a4b0f9ed34.jpg',
          },
        ],
      },
      {
        id: 'sevilla',
        nombre: 'Sevilla',
        rel: [7, 3, 6],
        lado: 'l',
        personas: [
          {
            nombre: 'Rocío Campos León',
            cargo: 'Matemáticas · Primaria',
            relacion: 0,
            foto: 'imagenes/43952f64025d47ca7dc00289673ef628.jpg',
          },
          {
            nombre: 'Manuel Ortega Lara',
            cargo: 'Tecnología · ESO',
            relacion: 1,
            foto: 'imagenes/1c61e2e8e2fd9353bbb800625d14dd91.jpg',
          },
          {
            nombre: 'Laura Vidal Reina',
            cargo: 'Lengua · ESO',
            relacion: 2,
            foto: 'imagenes/9e542aac288a38550cbb02a114657083.jpg',
          },
        ],
      },
      {
        id: 'bilbao',
        nombre: 'Bilbao',
        rel: [4, 5, 3],
        lado: 'r',
        personas: [
          {
            nombre: 'Ane Urrutia Goñi',
            cargo: 'Matemáticas · ESO',
            relacion: 0,
            foto: 'imagenes/83eb3576cb3a3a5860bda0988a0d3c3a.jpg',
          },
          {
            nombre: 'Iker Etxeberria Sáez',
            cargo: 'Robótica · FP',
            relacion: 1,
            foto: 'imagenes/d6d835fa202bb0e13a65410011d69267.jpg',
          },
          {
            nombre: 'Maite Arana Ruiz',
            cargo: 'Inglés · Primaria',
            relacion: 2,
            foto: 'imagenes/ca12bd53d9cd119f6f2f8c9c0f118b82.jpg',
          },
        ],
      },
      {
        id: 'zaragoza',
        nombre: 'Zaragoza',
        rel: [5, 2, 4],
        lado: 'r',
        personas: [
          {
            nombre: 'Pilar Lacasta Bel',
            cargo: 'Matemáticas · FP',
            relacion: 0,
            foto: 'imagenes/005031b5c2b9253d0a8b00455d61d3ca.jpg',
          },
          {
            nombre: 'Diego Royo Gracia',
            cargo: 'Física · ESO',
            relacion: 1,
            foto: 'imagenes/12ed995260eb925d33ff97a9907201b5.jpg',
          },
          {
            nombre: 'Sara Bernal Polo',
            cargo: 'Infantil',
            relacion: 2,
            foto: 'imagenes/4e0619a0dac26a85e69f6ee6ba9123c0.jpg',
          },
        ],
      },
      {
        id: 'malaga',
        nombre: 'Málaga',
        rel: [4, 0, 6],
        lado: 'b',
        personas: [
          {
            nombre: 'Carmen Luque Vega',
            cargo: 'Matemáticas · ESO',
            relacion: 0,
            foto: 'imagenes/0a932f04265884ab181618e4fc0ddbfc.jpg',
          },
          {
            nombre: 'Alberto Reyes Soto',
            cargo: 'Plástica · ESO',
            relacion: 2,
            foto: 'imagenes/c2ef773dbc73a46d53d695874439d07b.jpg',
          },
          {
            nombre: 'Inés Fuentes Marín',
            cargo: 'Lengua · Primaria',
            relacion: 2,
            foto: 'imagenes/152085c5053eb6fe917c2fb3e68c0ace.jpg',
          },
        ],
      },
      {
        id: 'coruna',
        nombre: 'A Coruña',
        rel: [2, 0, 5],
        lado: 'l',
        personas: [
          {
            nombre: 'Brais Novoa Pena',
            cargo: 'Matemáticas · Bachillerato',
            relacion: 0,
            foto: 'imagenes/0375e91a455ff5c7484bae0df272e980.jpg',
          },
          {
            nombre: 'Uxía Souto Rial',
            cargo: 'Gallego · ESO',
            relacion: 2,
            foto: 'imagenes/2cd5b495c6fe64c8fdb7eacf0edf3996.jpg',
          },
          {
            nombre: 'Iria Lema Castro',
            cargo: 'Biología · ESO',
            relacion: 2,
            foto: 'imagenes/9b43d957ada75c08a6f0edf6a2df9ebc.jpg',
          },
        ],
      },
      {
        id: 'valladolid',
        nombre: 'Valladolid',
        rel: [3, 1, 3],
        lado: 'l',
        personas: [
          {
            nombre: 'Teresa Alonso Cano',
            cargo: 'Matemáticas · ESO',
            relacion: 0,
            foto: 'imagenes/9d1ce8cad01712849a89ed981286329f.jpg',
          },
          {
            nombre: 'Óscar Herrero Mata',
            cargo: 'Informática · FP',
            relacion: 1,
            foto: 'imagenes/1642bf9b80fdde6c9c365cd9887ada88.jpg',
          },
          {
            nombre: 'Clara Rojo Pascual',
            cargo: 'Historia · Bachillerato',
            relacion: 2,
            foto: 'imagenes/3a45e25c841dffea59f8b31309848e5f.jpg',
          },
        ],
      },
      {
        id: 'granada',
        nombre: 'Granada',
        rel: [2, 2, 2],
        lado: 'r',
        personas: [
          {
            nombre: 'Alba Torres Ruiz',
            cargo: 'Matemáticas · Primaria',
            relacion: 0,
            foto: 'imagenes/0bd7bd76fbd3600421669d0dfdab0910.jpg',
          },
          {
            nombre: 'Rafael Cuesta Gil',
            cargo: 'Química · Bachillerato',
            relacion: 1,
            foto: 'imagenes/5f22633cf07d1dd48617e70fb76ba151.jpg',
          },
          {
            nombre: 'Nieves Ramos Lao',
            cargo: 'Inglés · ESO',
            relacion: 2,
            foto: 'imagenes/e59c24d08d759e7711e47f8889771da1.jpg',
          },
        ],
      },
      {
        id: 'murcia',
        nombre: 'Murcia',
        rel: [2, 0, 3],
        lado: 'r',
        personas: [
          {
            nombre: 'Ginés Carrillo Mora',
            cargo: 'Matemáticas · ESO',
            relacion: 0,
            foto: 'imagenes/7c849aa2e41ec16983f092603adeda00.jpg',
          },
          {
            nombre: 'Fuensanta Abellán Ríos',
            cargo: 'Primaria',
            relacion: 2,
            foto: 'imagenes/4606b233fd7b8fe408786754eb9184c2.jpg',
          },
          {
            nombre: 'Pedro Navarro Sáez',
            cargo: 'Educación Física · ESO',
            relacion: 2,
            foto: 'imagenes/63f33b4d6da6b71da94b3dbaf63ad742.jpg',
          },
        ],
      },
      {
        id: 'palma',
        nombre: 'Palma',
        rel: [2, 1, 2],
        lado: 'b',
        personas: [
          {
            nombre: 'Aina Bauzà Ferrer',
            cargo: 'Matemáticas · ESO',
            relacion: 0,
            foto: 'imagenes/9444315b6cfbebd37aae0a0071b65881.jpg',
          },
          {
            nombre: 'Toni Mas Riera',
            cargo: 'Tecnología · ESO',
            relacion: 1,
            foto: 'imagenes/8161378603d4687cd8f622ab7dbcb106.jpg',
          },
          {
            nombre: 'Joana Coll Vives',
            cargo: 'Catalán · Bachillerato',
            relacion: 2,
            foto: 'imagenes/e278081905e3b288cfb8ce426c3d98a8.jpg',
          },
        ],
      },
      {
        id: 'laspalmas',
        nombre: 'Las Palmas',
        rel: [1, 0, 2],
        lado: 'r',
        personas: [
          {
            nombre: 'Yaiza Santana Déniz',
            cargo: 'Matemáticas · FP',
            relacion: 0,
            foto: 'imagenes/24dc316bb149ea4ef88537c7182b36ed.jpg',
          },
          {
            nombre: 'Airam Suárez Betancor',
            cargo: 'Geografía · ESO',
            relacion: 2,
            foto: 'imagenes/497ea6e19c7bd671d044527b6b06e4fd.jpg',
          },
          {
            nombre: 'Nayra Cabrera León',
            cargo: 'Infantil',
            relacion: 2,
            foto: 'imagenes/4c33bdd44223975f197074e07376a735.jpg',
          },
        ],
      },
    ],
  },
  {
    id: 'mexico',
    nombre: 'México',
    lado: 'l',
    malla: [],
    ciudades: [
      {
        id: 'cdmx',
        nombre: 'Ciudad de México',
        rel: [2, 1, 2],
        lado: 'r',
        personas: [
          {
            nombre: 'Mariana Reyes Luna',
            cargo: 'Matemáticas · Secundaria',
            relacion: 0,
            foto: 'imagenes/0c9b973c8529b6573a707a82bdd02f90.jpg',
          },
          {
            nombre: 'Emilio Vega Ochoa',
            cargo: 'Ciencias · Preparatoria',
            relacion: 1,
            foto: 'imagenes/5de102a528f19a90d116303e6fd4d23b.jpg',
          },
          {
            nombre: 'Ximena Durán Paz',
            cargo: 'Español · Primaria',
            relacion: 2,
            foto: 'imagenes/90e7bf9d33b69c6f1ed5260a3dfc3946.jpg',
          },
        ],
      },
      {
        id: 'guadalajara',
        nombre: 'Guadalajara',
        rel: [1, 0, 1],
        lado: 'l',
        personas: [
          {
            nombre: 'Rodrigo Salas Cruz',
            cargo: 'Matemáticas · Preparatoria',
            relacion: 0,
            foto: 'imagenes/681c91bd2c03845ee7a2d82973dc4177.jpg',
          },
          {
            nombre: 'Lucero Ibarra Mora',
            cargo: 'Historia · Secundaria',
            relacion: 2,
            foto: 'imagenes/84eeee5b705789b546f3d1ff07c80be4.jpg',
          },
        ],
      },
      {
        id: 'monterrey',
        nombre: 'Monterrey',
        rel: [1, 1, 0],
        lado: 'r',
        personas: [
          {
            nombre: 'Andrea Treviño Garza',
            cargo: 'Matemáticas · Secundaria',
            relacion: 0,
            foto: 'imagenes/20339f8f2a1fe7db3a435526009e75d8.jpg',
          },
          {
            nombre: 'Mauricio Elizondo Ríos',
            cargo: 'Robótica · Técnica',
            relacion: 1,
            foto: 'imagenes/d31376cdfba1809f78b27091ffc28319.jpg',
          },
        ],
      },
    ],
  },
  {
    id: 'argentina',
    nombre: 'Argentina',
    lado: 'r',
    malla: [],
    ciudades: [
      {
        id: 'buenosaires',
        nombre: 'Buenos Aires',
        rel: [2, 2, 1],
        lado: 'r',
        personas: [
          {
            nombre: 'Valentina Paz Rossi',
            cargo: 'Matemáticas · Secundaria',
            relacion: 0,
            foto: 'imagenes/b83798394c98e671754a94411d8d4674.jpg',
          },
          {
            nombre: 'Santiago Ferro Gallo',
            cargo: 'Tecnología · Secundaria',
            relacion: 1,
            foto: 'imagenes/56be4e87be017eb27057aeb497744316.jpg',
          },
          {
            nombre: 'Julieta Bruno Sosa',
            cargo: 'Lengua · Primaria',
            relacion: 2,
            foto: 'imagenes/c5b2c35a705f61b2061e392e84d7ce37.jpg',
          },
        ],
      },
      {
        id: 'cordoba',
        nombre: 'Córdoba',
        rel: [1, 0, 1],
        lado: 'l',
        personas: [
          {
            nombre: 'Martín Aguirre Díaz',
            cargo: 'Matemáticas · Secundaria',
            relacion: 0,
            foto: 'imagenes/1b40f2127d9c5f2394a7ce2f44a1c787.jpg',
          },
          {
            nombre: 'Rocío Peralta Luna',
            cargo: 'Inglés · Primaria',
            relacion: 2,
            foto: 'imagenes/ce2105812895005368372f50628a32bb.jpg',
          },
        ],
      },
    ],
  },
  {
    id: 'reino',
    nombre: 'Reino Unido',
    lado: 't',
    malla: [],
    ciudades: [
      {
        id: 'londres',
        nombre: 'Londres',
        rel: [1, 2, 1],
        lado: 'r',
        personas: [
          {
            nombre: 'Emily Carter',
            cargo: 'Matemáticas · Secondary',
            relacion: 0,
            foto: 'imagenes/2b6ccec38abba6a7a1b3ea280d970d8f.jpg',
          },
          {
            nombre: 'Oliver Hughes',
            cargo: 'Ciencias · Sixth Form',
            relacion: 1,
            foto: 'imagenes/ae4567651fe66633fe7d4196756d4b78.jpg',
          },
          {
            nombre: 'Grace Bennett',
            cargo: 'Español · Secondary',
            relacion: 2,
            foto: 'imagenes/2cc9df80be3ee6ff8dfb426a3055d3ab.jpg',
          },
        ],
      },
      {
        id: 'edimburgo',
        nombre: 'Edimburgo',
        rel: [1, 0, 1],
        lado: 'r',
        personas: [
          {
            nombre: 'Callum Reid',
            cargo: 'Matemáticas · Secondary',
            relacion: 0,
            foto: 'imagenes/46a6ac619b54fef422fbaa642acef733.jpg',
          },
          {
            nombre: 'Isla Morrison',
            cargo: 'Primaria',
            relacion: 2,
            foto: 'imagenes/86705237482dcbb17f0cedf5b022f19b.jpg',
          },
        ],
      },
    ],
  },
  {
    id: 'colombia',
    nombre: 'Colombia',
    lado: 'r',
    malla: [],
    ciudades: [
      {
        id: 'bogota',
        nombre: 'Bogotá',
        rel: [1, 2, 1],
        lado: 'r',
        personas: [
          {
            nombre: 'Daniela Rojas Mejía',
            cargo: 'Matemáticas · Bachillerato',
            relacion: 0,
            foto: 'imagenes/c2838f66a3c5a3761467978e83e8dc1e.jpg',
          },
          {
            nombre: 'Camilo Pardo León',
            cargo: 'Ciencias · Bachillerato',
            relacion: 1,
            foto: 'imagenes/865d2d9c7035d19d268e8fae6b9f4449.jpg',
          },
          {
            nombre: 'Natalia Gómez Ruiz',
            cargo: 'Lengua · Primaria',
            relacion: 2,
            foto: 'imagenes/36596feae992fdd39dc68a017473d1c4.jpg',
          },
        ],
      },
      {
        id: 'medellin',
        nombre: 'Medellín',
        rel: [1, 0, 1],
        lado: 'l',
        personas: [
          {
            nombre: 'Felipe Restrepo Vélez',
            cargo: 'Matemáticas · Técnica',
            relacion: 0,
            foto: 'imagenes/ea2960412510dfdfcdfe6538461e48fa.jpg',
          },
          {
            nombre: 'Paola Arango Gil',
            cargo: 'Inglés · Bachillerato',
            relacion: 2,
            foto: 'imagenes/573982d1ab82f817b4238d21ce578381.jpg',
          },
        ],
      },
    ],
  },
  {
    id: 'alemania',
    nombre: 'Alemania',
    lado: 'r',
    malla: [],
    ciudades: [
      {
        id: 'berlin',
        nombre: 'Berlín',
        rel: [1, 1, 1],
        lado: 'r',
        personas: [
          {
            nombre: 'Lena Fischer',
            cargo: 'Matemáticas · Gymnasium',
            relacion: 0,
            foto: 'imagenes/011303af320af10e29d869f1715db5b2.jpg',
          },
          {
            nombre: 'Jonas Weber',
            cargo: 'Física · Gymnasium',
            relacion: 1,
            foto: 'imagenes/a50fdd8fc8b595012c5cdb1353a0feb2.jpg',
          },
          {
            nombre: 'Mia Schulz',
            cargo: 'Español · Gymnasium',
            relacion: 2,
            foto: 'imagenes/8d792b64b9d29c9bdd520854098ee3a3.jpg',
          },
        ],
      },
      {
        id: 'munich',
        nombre: 'Múnich',
        rel: [0, 1, 1],
        lado: 'r',
        personas: [
          {
            nombre: 'Felix Bauer',
            cargo: 'Informática · FP dual',
            relacion: 1,
            foto: 'imagenes/98f855a01068cf0007ee09808563c8ce.jpg',
          },
          {
            nombre: 'Hannah Maier',
            cargo: 'Grundschule',
            relacion: 2,
            foto: 'imagenes/51a4f2d3d64c42eb39c33b0692850f25.jpg',
          },
        ],
      },
    ],
  },
  {
    id: 'italia',
    nombre: 'Italia',
    lado: 'r',
    malla: [],
    ciudades: [
      {
        id: 'roma',
        nombre: 'Roma',
        rel: [1, 1, 1],
        lado: 'r',
        personas: [
          {
            nombre: 'Giulia Conti',
            cargo: 'Matemáticas · Liceo',
            relacion: 0,
            foto: 'imagenes/d77621373d4853c0087bba0388219329.jpg',
          },
          {
            nombre: 'Marco De Luca',
            cargo: 'Ciencias · Liceo',
            relacion: 1,
            foto: 'imagenes/6b025b4023cf129371ce1df8657a0bac.jpg',
          },
          {
            nombre: 'Chiara Ricci',
            cargo: 'Primaria',
            relacion: 2,
            foto: 'imagenes/aac0246a5ba05203971089160a12aac5.jpg',
          },
        ],
      },
      {
        id: 'bolonia',
        nombre: 'Bolonia',
        rel: [0, 1, 1],
        lado: 'r',
        personas: [
          {
            nombre: 'Luca Marchetti',
            cargo: 'Tecnología · Istituto',
            relacion: 1,
            foto: 'imagenes/a0201aa74c20bd6cac033f86a2ed58c5.jpg',
          },
          {
            nombre: 'Sara Galli',
            cargo: 'Inglés · Liceo',
            relacion: 2,
            foto: 'imagenes/e374a70280ffd6862c787850cdae7cf3.jpg',
          },
        ],
      },
    ],
  },
];

// Parejas de países unidos en el mapa global
export const MALLA_GLOBAL: string[][] = [
  ['reino', 'alemania'],
  ['alemania', 'italia'],
  ['mexico', 'colombia'],
  ['colombia', 'argentina'],
];

export const RECOMENDADOS: Recomendado[] = [
  {
    id: 'carlos',
    nombre: 'Carlos Pérez Nieto',
    materia: 'Matemáticas',
    ciudad: 'Alicante',
    pais: null,
    vista: 'espana',
    lado: 'r',
    via: 'valencia',
    viaCiudad: null,
    puente: 'Javier Molina',
    enComun: 9,
    foto: 'imagenes/28657f050501adb743b2d5c79a3f7273.jpg',
  },
  {
    id: 'marta',
    nombre: 'Marta Ruiz Delgado',
    materia: 'Lengua',
    ciudad: 'Cádiz',
    pais: null,
    vista: 'espana',
    lado: 'l',
    via: 'sevilla',
    viaCiudad: null,
    puente: 'Laura Vidal',
    enComun: 6,
    foto: 'imagenes/a2ac8ec29daeb20c4d28dc3f35572f2b.jpg',
  },
  {
    id: 'nuria',
    nombre: 'Nuria Gil Soler',
    materia: 'Matemáticas',
    ciudad: 'Santander',
    pais: null,
    vista: 'espana',
    lado: 'l',
    via: 'bilbao',
    viaCiudad: null,
    puente: 'Iker Etxeberria',
    enComun: 4,
    foto: 'imagenes/8904087697c797924c37a5f66f5b2ec5.jpg',
  },
  {
    id: 'camila',
    nombre: 'Camila Fuentes Soto',
    materia: 'Matemáticas',
    ciudad: 'Santiago de Chile',
    pais: 'Chile',
    vista: 'global',
    lado: 'l',
    via: 'argentina',
    viaCiudad: 'buenosaires',
    puente: 'Valentina Paz',
    enComun: 3,
    foto: 'imagenes/924853dc3757f79d76087af0661724f2.jpg',
  },
  {
    id: 'andres',
    nombre: 'Andrés López Vega',
    materia: 'Matemáticas',
    ciudad: 'Lugo',
    pais: null,
    vista: 'espana',
    lado: 'r',
    via: 'coruna',
    viaCiudad: null,
    puente: 'Uxía Souto',
    enComun: 3,
    foto: 'imagenes/9618de49960139cb7668470de955337d.jpg',
  },
  {
    id: 'irene',
    nombre: 'Irene Castro Vidal',
    materia: 'Ciencias',
    ciudad: 'Pamplona',
    pais: null,
    vista: 'espana',
    lado: 'r',
    via: 'zaragoza',
    viaCiudad: null,
    puente: 'Pilar Lacasta',
    enComun: 5,
    foto: 'imagenes/efb9a6d23d39ada488abff476997236e.jpg',
  },
  {
    id: 'tomas',
    nombre: 'Tomás Vargas Quispe',
    materia: 'Lengua',
    ciudad: 'Lima',
    pais: 'Perú',
    vista: 'global',
    lado: 'l',
    via: 'colombia',
    viaCiudad: 'bogota',
    puente: 'Daniela Rojas',
    enComun: 2,
    foto: 'imagenes/e0a44db3683e7eaf3720820fafc6051c.jpg',
  },
  {
    id: 'hanna',
    nombre: 'Hanna Virtanen',
    materia: 'Ciencias',
    ciudad: 'Helsinki',
    pais: 'Finlandia',
    vista: 'global',
    lado: 'r',
    via: 'alemania',
    viaCiudad: 'berlin',
    puente: 'Lena Fischer',
    enComun: 2,
    foto: 'imagenes/7806e12623c3f23b3c2b8e794a64695e.jpg',
  },
];

export const INVITACIONES: Invitacion[] = [
  {
    id: 'sergio',
    nombre: 'Sergio Blanco Ruiz',
    cargo: 'Matemáticas · Salamanca',
    foto: 'imagenes/3aa671cddfec942dab42bd0988f07998.jpg',
  },
  {
    id: 'lidia',
    nombre: 'Lidia Moreno Paz',
    cargo: 'Tecnología · Madrid',
    foto: 'imagenes/10af080e6758725651d1e55ec3eba00b.jpg',
  },
  {
    id: 'gonzalo',
    nombre: 'Gonzalo Iglesias Vara',
    cargo: 'Orientación · Vigo',
    foto: 'imagenes/28f1f46e8cd6456e8999b210eab213e8.jpg',
  },
  {
    id: 'marina',
    nombre: 'Marina Costa Pons',
    cargo: 'Inglés · Girona',
    foto: 'imagenes/6189d4b675bc17b53122b63019671030.jpg',
  },
];

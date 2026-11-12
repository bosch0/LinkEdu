// Fotos de prueba (retratos y logos). Los archivos están en public/imagenes/.
// Cada nombre apunta a un archivo, así en el resto del código se escribe FOTOS.lucia
// en vez de la ruta larga.
const f = (archivo: string) => `imagenes/${archivo}`;

export const FOTOS = {
  // Docentes
  lucia: f('318f5935fdaf85b36293d86ef5c3f2b6.jpg'),
  javier: f('4b045af20015bcef2e4206fed41e32cc.jpg'),
  elena: f('54857d9a7b150e6e1114b2b43d4a303b.jpg'),
  jordi: f('b694740183a71b4e395586110be41fbc.jpg'),
  amparo: f('e9e83a615a697ebaca43fd0f244335f6.jpg'),
  rocio: f('43952f64025d47ca7dc00289673ef628.jpg'),
  marta: f('a2ac8ec29daeb20c4d28dc3f35572f2b.jpg'),
  carlos: f('28657f050501adb743b2d5c79a3f7273.jpg'),
  nuria: f('8904087697c797924c37a5f66f5b2ec5.jpg'),
  andres: f('9618de49960139cb7668470de955337d.jpg'),
  paula: f('b2d042b7b34e78e1d2dfd69551620005.jpg'),
  iker: f('d6d835fa202bb0e13a65410011d69267.jpg'),
  lidia: f('10af080e6758725651d1e55ec3eba00b.jpg'),
  sergio: f('3aa671cddfec942dab42bd0988f07998.jpg'),
  oscar: f('1642bf9b80fdde6c9c365cd9887ada88.jpg'),
  hugo: f('bc0aabedc0a35e854f57407788451189.jpg'),
  alex: f('f6a013957f94c979999fbd9e06f3c605.jpg'),
  irene: f('586d99d6f9013319c5a12c7164c86ae7.jpg'),
  adrian: f('324977d162dd24baa1f62821e5e9bcb7.jpg'),
  sofia: f('34a808f5a4f23a7439bf352302deec7a.jpg'),
  carla: f('111883e6566a2e546c121aa960dce601.jpg'),
  noa: f('b939bd266076f3c60b615f68813d501c.jpg'),
  daniel: f('bb7efce7d089ba3b8c9b3eec110149bc.jpg'),
  marcos: f('b7296b46ea317bea724ca7fd4c600e96.jpg'),
  carmen: f('0a932f04265884ab181618e4fc0ddbfc.jpg'),
  maite: f('ca12bd53d9cd119f6f2f8c9c0f118b82.jpg'),
  teresa: f('9d1ce8cad01712849a89ed981286329f.jpg'),

  // Logos de centros y academias
  pitagoras: f('364d20dbf14750db6ec516e3f7b417f9.svg'),
  valle: f('c04c42472d710fbc69846b33bbea0a1a.svg'),
  alameda: f('7a9f9c1f3ae21b808447868a5f7f97e7.svg'),
  hipatia: f('5b5fa0161aadbf0f4464e3f9b003f6ff.svg'),
  aula: f('2cbf48d6e9b0fea7c4cf9311c7327a97.svg'),
  escuela: f('19ab61675cdd293461d04f6d37bb584a.svg'),
  lumen: f('ff7358a48d2088301fc9eb2cd50c7749.svg'),
  fundacion: f('408247403f395d6fe70768ce1f568757.svg'),
  sierra: f('8b2b0ab03a7ffe42f477cc9214bf44c8.svg'),
};

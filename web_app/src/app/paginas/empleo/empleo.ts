import { ABRE_PERFIL } from '../../compartido/abre-perfil';
import { Component, computed, inject, signal } from '@angular/core';
import { Avisos } from '../../compartido/avisos';
import { Confeti } from '../../compartido/confeti/confeti';
import { Icono } from '../../compartido/icono/icono';
import { EstadoVentana, Ventana } from '../../compartido/ventana/ventana';
import {
  Anuncio,
  CENTROS_QUE_CONTRATAN,
  COLORES_CONSEJO,
  COMPANEROS,
  CONSEJOS,
  CUENTAS,
  DOCENTES_CERCA,
  HABILIDADES_OFERTA,
  HUECOS_CLASE,
  HUECOS_ENTREVISTA,
  LOGOS,
  Modalidad,
  OFERTAS,
  OFERTAS_EMPRESA,
  Oferta,
  OfertaEmpresa,
  PERSONAS_CHAT,
  Rol,
  TIPOS_OFERTA,
  TUTORES,
  TUTOR_SERGIO,
  Tutor,
} from '../../datos/empleo';
import { Estado } from '../../datos/estado';
import { FOTOS } from '../../datos/fotos';

interface MensajeEmpleo {
  mio: boolean;
  texto: string;
  hora: string;
}

const ANUNCIO_INICIAL: Anuncio = {
  materias: ['Matemáticas', 'Estadística'],
  niveles: ['ESO', 'Bachillerato'],
  precio: '25',
  modo: 'En línea y Madrid',
  horarios: ['Mar tarde', 'Jue tarde'],
  desc: 'Profesora de Matemáticas en el IES Ramiro de Maeztu. Clases prácticas con ejemplos reales y material propio.',
};

@Component({
  selector: 'app-empleo',
  imports: [Icono, Ventana, Confeti, ABRE_PERFIL],
  templateUrl: './empleo.html',
  host: { class: 'flex flex-1 flex-col' },
})
export class Empleo {
  private avisos = inject(Avisos);
  private estado = inject(Estado);

  protected logos = LOGOS;
  protected cuentas = CUENTAS;
  protected roles: Rol[] = ['Profesor', 'Alumno', 'Empresa'];
  protected filtros: ('Todas' | Modalidad)[] = ['Todas', 'Presencial', 'Remoto', 'Híbrido'];
  protected habilidadesOferta = HABILIDADES_OFERTA;
  protected tiposOferta = TIPOS_OFERTA;
  protected coloresConsejo = COLORES_CONSEJO;
  protected huecosClase = HUECOS_CLASE;
  protected huecosEntrevista = HUECOS_ENTREVISTA;
  protected materiasAnuncio = [
    'Matemáticas',
    'Estadística',
    'Física',
    'Preparación de Selectividad',
  ];
  protected nivelesAnuncio = ['Primaria', 'ESO', 'Bachillerato', 'Universidad'];
  protected horariosAnuncio = ['Lun tarde', 'Mar tarde', 'Mié tarde', 'Jue tarde', 'Sábado mañana'];
  protected modosAnuncio = ['En línea', 'Presencial', 'En línea y Madrid'];
  protected fotoLucia = FOTOS.lucia;

  // ---------- Estado ----------
  // El rol es el mismo en toda la plataforma (se guarda en Estado)
  protected rol = this.estado.rol;
  private tabPorRol = signal<Record<string, string>>({});
  protected filtro = signal<'Todas' | Modalidad>('Todas');
  protected candidaturas = signal<Record<string, { doc: string; msg: string }>>({
    p3: { doc: 'perfil', msg: '' },
  });
  protected guardadas = signal<Record<string, boolean>>({ p1: true, a1: true });
  protected reservas = signal<Record<string, string>>({});
  protected entrevistas = signal<Record<string, string>>({});
  protected siguiendo = signal<Record<string, boolean>>({});
  protected invitados = signal<Record<string, string>>({});
  protected chats = signal<Record<string, MensajeEmpleo[]>>({});
  protected anuncio = signal<Anuncio | null>(null);
  protected creadas = signal<OfertaEmpresa[]>([]);
  protected ofertaElegida = signal<string>('o1');
  protected facturas = signal<Record<string, boolean>>({});

  // Ventanas
  protected vDetalle = new EstadoVentana<string>();
  protected vAplicar = new EstadoVentana<string>();
  protected vRetirar = new EstadoVentana<{
    id: string;
    empresa: string;
    titulo: string;
    estado: string;
  }>();
  protected vReservar = new EstadoVentana<string>();
  protected vAnuncio = new EstadoVentana<null>();
  protected vPublicar = new EstadoVentana<null>();
  protected vCandidato = new EstadoVentana<{ oid: string; i: number }>();
  protected vChat = new EstadoVentana<string>();
  protected vInvitar = new EstadoVentana<{ quien: string; meta: string }>();
  protected vLlamada = new EstadoVentana<null>();
  protected vFacturacion = new EstadoVentana<null>();
  protected disparo = signal(0);

  // Formularios
  protected apPaso = signal(1);
  protected apDoc = signal('perfil');
  protected apMsg = signal('');
  protected apSeguro = signal(false);
  protected retirarConfirmado = signal(false);
  protected bkPaso = signal(1);
  protected bkHueco = signal<string | null>(null);
  protected bkMsg = signal('');
  protected cdHueco = signal<string | null>(null);
  protected chatBorrador = signal('');
  protected ivOferta = signal<string | null>(null);
  protected camaraLista = signal(false);
  protected enCalendario = signal(false);
  protected borradorAnuncio = signal<Anuncio>(structuredClone(ANUNCIO_INICIAL));
  protected pubTitulo = signal('');
  protected pubPago = signal('25 €/hora');
  protected pubTipo = signal('docencia');
  protected pubSkills = signal<Record<string, boolean>>({ 'Clases en línea': true });

  // ---------- Datos calculados ----------
  // La oferta de la Academia Pitágoras (a1) se comparte con la pantalla de Inicio
  protected aplicada = (id: string) =>
    !!this.candidaturas()[id] || (id === 'a1' && this.estado.inscritaPitagoras());

  protected cuenta = computed(() => CUENTAS[this.rol()]);
  protected tab = computed(
    () =>
      this.tabPorRol()[this.rol()] ??
      { Profesor: 'centros', Alumno: 'profes', Empresa: 'candidatos' }[this.rol()],
  );
  protected verbo = computed(() => (this.rol() === 'Alumno' ? 'Solicitar' : 'Inscribirme'));

  protected todasLasOfertas = computed(() => {
    const mapa: Record<string, Oferta> = {};
    Object.values(OFERTAS).forEach((l) => l.forEach((o) => (mapa[o.id] = o)));
    return mapa;
  });

  protected ofertas = computed(() => {
    const clave = this.rol() === 'Alumno' ? 'practicas' : (this.tab() as 'centros' | 'academias');
    return (OFERTAS[clave] ?? []).filter(
      (o) => this.filtro() === 'Todas' || o.modalidad === this.filtro(),
    );
  });
  protected mostrarOfertas = computed(
    () => this.rol() === 'Profesor' || (this.rol() === 'Alumno' && this.tab() === 'practicas'),
  );
  protected mostrarTutores = computed(() => this.rol() === 'Alumno' && this.tab() === 'profes');
  protected mostrarCandidatos = computed(() => this.rol() === 'Empresa');
  protected mostrarFiltros = computed(() => this.mostrarOfertas());

  protected tutores = computed<Tutor[]>(() => {
    const a = this.anuncio();
    if (!a) return TUTORES;
    const mio: Tutor = {
      id: 'tl',
      nuevo: true,
      nombre: 'Lucía Fernández Ortega',
      foto: FOTOS.lucia,
      materias: a.materias.join(', ') + ' · ' + a.niveles.join(' y '),
      valoracion: '5,0 · 21 reseñas',
      precio: a.precio + ' €',
      modo: a.modo,
      habilidades: [
        ['Estadística aplicada', 5],
        ['GeoGebra', 2],
      ],
      prueba: a.desc,
    };
    return [mio, TUTOR_SERGIO, ...TUTORES];
  });
  protected tutorPorId = computed(() => Object.fromEntries(this.tutores().map((t) => [t.id, t])));

  protected pestanas = computed(() => {
    const r = this.rol();
    if (r === 'Profesor')
      return [
        { id: 'centros', texto: 'Plazas en centros', n: '5' },
        { id: 'academias', texto: 'Academias y en línea', n: '5' },
      ];
    if (r === 'Alumno')
      return [
        { id: 'profes', texto: 'Profesores particulares', n: String(this.tutores().length) },
        { id: 'practicas', texto: 'Prácticas y empleo', n: '5' },
      ];
    return [
      {
        id: 'candidatos',
        texto: 'Candidatos',
        n: String(this.ofertasEmpresa().reduce((t, o) => t + o.n, 0)),
      },
    ];
  });

  protected cabecera = computed(() => {
    const r = this.rol();
    if (r === 'Profesor')
      return {
        titulo: 'Empleo para docentes',
        texto:
          'Plazas en colegios e institutos, academias y formación. Te avisamos cuando encajan con tus habilidades validadas.',
        boton: this.anuncio()
          ? 'Editar mi anuncio de clases'
          : 'Crear anuncio de clases particulares',
      };
    if (r === 'Alumno')
      return {
        titulo:
          this.tab() === 'profes' ? 'Encuentra profe particular' : 'Prácticas y primer empleo',
        texto:
          this.tab() === 'profes'
            ? 'Profesores con habilidades validadas por otros docentes en proyectos reales.'
            : 'Empresas y centros que buscan alumnado de FP para prácticas o su primer contrato.',
        boton: '',
      };
    return {
      titulo: 'Tus candidatos',
      texto:
        'Elige una oferta a la izquierda. Ves primero a quien tiene validadas las habilidades que pides.',
      boton: 'Publicar oferta',
    };
  });

  // Columna izquierda: lo que has enviado / tus ofertas
  protected lateral = computed(() => {
    const r = this.rol();
    const ap = this.candidaturas();
    type Fila = {
      clave: string;
      foto: string;
      encaja: string;
      titulo: string;
      meta: string;
      estado: string;
      colorEstado: string;
      activa: boolean;
      abrir: () => void;
    };
    const logo = (c: string) => LOGOS[c];
    const verEstado = (id: string, empresa: string, titulo: string, estado: string) => () =>
      this.abrirRetirar(id, empresa, titulo, estado);
    if (r === 'Profesor') {
      const filas: [string, string, string, string, string][] = [
        ['p3', 'IES Sierra Norte', 'Sustitución de Matemáticas', 'En revisión', 'bg-amarillo'],
        ['x1', 'Escuela Docente Abierta', 'Taller de GeoGebra', 'Entrevista', 'bg-turquesa'],
        ['x2', 'Academia Hipatia', 'Selectividad de verano', 'Cerrada', 'bg-line'],
      ];
      Object.keys(ap).forEach((k) => {
        const o = this.todasLasOfertas()[k];
        if (ap[k] && k !== 'p3' && o)
          filas.unshift([k, o.empresa, o.titulo, 'Enviada', 'bg-azul-soft']);
      });
      return {
        titulo: 'Tus candidaturas',
        puedeAnadir: false,
        filas: filas.slice(0, 4).map(([id, emp, tit, est, col]): Fila => ({
          clave: id,
          foto: logo(emp),
          encaja: 'object-contain',
          titulo: tit,
          meta: emp,
          estado: est,
          colorEstado: col,
          activa: false,
          abrir: verEstado(id, emp, tit, est),
        })),
      };
    }
    if (r === 'Alumno') {
      const filas: Fila[] = [
        {
          clave: 'r1',
          foto: FOTOS.irene,
          encaja: 'object-cover',
          titulo: 'Clase de prueba',
          meta: 'Irene Pastor · mañana 18:00',
          estado: 'Confirmada',
          colorEstado: 'bg-turquesa',
          activa: false,
          abrir: () => this.vLlamada.abrir(null),
        },
        {
          clave: 'r2',
          foto: logo('Estudio Lumen'),
          encaja: 'object-contain',
          titulo: 'Prácticas de desarrollo web',
          meta: 'Estudio Lumen',
          estado: 'En revisión',
          colorEstado: 'bg-amarillo',
          activa: false,
          abrir: verEstado('f1x', 'Estudio Lumen', 'Prácticas de desarrollo web', 'En revisión'),
        },
        {
          clave: 'r3',
          foto: logo('Aula Digital Ediciones'),
          encaja: 'object-contain',
          titulo: 'Junior front-end',
          meta: 'Aula Digital Ediciones',
          estado: 'Enviada',
          colorEstado: 'bg-azul-soft',
          activa: false,
          abrir: verEstado('f3x', 'Aula Digital Ediciones', 'Junior front-end', 'Enviada'),
        },
      ];
      Object.entries(this.reservas()).forEach(([k, hueco]) => {
        const t = this.tutorPorId()[k];
        if (t)
          filas.unshift({
            clave: 'b' + k,
            foto: t.foto,
            encaja: 'object-cover',
            titulo: 'Clase de prueba',
            meta: t.nombre.split(' ')[0] + ' · ' + hueco,
            estado: 'Pendiente',
            colorEstado: 'bg-amarillo',
            activa: false,
            abrir: () => this.vChat.abrir(k),
          });
      });
      return { titulo: 'Tus solicitudes', puedeAnadir: false, filas: filas.slice(0, 4) };
    }
    return {
      titulo: 'Tus ofertas',
      puedeAnadir: true,
      filas: this.ofertasEmpresa().map((o): Fila => ({
        clave: o.id,
        foto: logo('Academia Pitágoras'),
        encaja: 'object-contain',
        titulo: o.titulo,
        meta: o.meta + ' · ' + o.n + ' candidaturas',
        estado: o.estado,
        colorEstado: o.estado === 'Nueva' ? 'bg-naranja' : 'bg-turquesa',
        activa: o.id === this.ofertaSel().id,
        abrir: () => this.ofertaElegida.set(o.id),
      })),
    };
  });

  protected panel = computed(() => {
    const r = this.rol();
    const a = this.anuncio();
    if (r === 'Profesor') {
      return a
        ? {
            etiqueta: 'TU ANUNCIO DE CLASES PARTICULARES',
            titulo: a.materias.join(' y ') + ' · ' + a.niveles.join(' y '),
            grande: a.precio + ' €/hora',
            mas: false,
            lineas: [
              { icono: 'ubicacion', texto: a.modo },
              { icono: 'calendario', texto: a.horarios.join(', ') },
              { icono: 'mensajes', texto: 'Visible para 1.240 alumnos de tu zona' },
            ],
            accion: 'Editar anuncio',
            clases: 'bg-white text-marino',
            abrir: () => this.abrirAnuncio(),
          }
        : {
            etiqueta: 'CLASES PARTICULARES',
            titulo: 'Da clases a alumnos de toda la red',
            grande: 'Desde 0 €',
            mas: true,
            lineas: [
              { icono: 'check', texto: 'Tus habilidades validadas salen en el anuncio' },
              { icono: 'check', texto: 'Tú pones el precio y el horario' },
              { icono: 'check', texto: 'Sin comisión en la primera clase' },
            ],
            accion: 'Crear mi anuncio',
            clases: 'bg-naranja text-ink',
            abrir: () => this.abrirAnuncio(),
          };
    }
    if (r === 'Alumno') {
      return {
        etiqueta: 'TU PRÓXIMA CLASE',
        titulo: 'Límites y derivadas con Irene',
        grande: 'Mañana, 18:00',
        mas: false,
        lineas: [
          { icono: 'perfil', texto: 'Irene Pastor Llorente' },
          { icono: 'calendario', texto: '45 minutos · clase de prueba' },
          { icono: 'mensajes', texto: 'Por videollamada en Linkedu' },
        ],
        accion: 'Preparar la videollamada',
        clases: 'bg-white text-marino',
        abrir: () => this.vLlamada.abrir(null),
      };
    }
    return {
      etiqueta: 'PLAN EMPRESA',
      titulo: this.ofertasEmpresa().length + ' de 5 ofertas activas',
      grande: '49 €/mes',
      mas: false,
      lineas: [
        { icono: 'check', texto: 'Filtro por habilidades validadas' },
        { icono: 'check', texto: 'Mensajes ilimitados a candidatos' },
        { icono: 'check', texto: 'Ofertas destacadas en Empleo' },
      ],
      accion: 'Ver facturación',
      clases: 'bg-white text-marino',
      abrir: () => this.vFacturacion.abrir(null),
    };
  });

  protected estadisticas = computed(() => {
    const r = this.rol();
    const n = Object.values(this.candidaturas()).length;
    if (r === 'Profesor')
      return {
        titulo: 'Tu búsqueda',
        items: [
          { n: 12, t: 'ofertas nuevas para ti' },
          { n: n + 2, t: 'candidaturas enviadas' },
          { n: 86, t: 'visitas a tu perfil' },
          { n: 1, t: 'entrevista esta semana' },
        ],
      };
    if (r === 'Alumno')
      return {
        titulo: 'Tu búsqueda',
        items: [
          { n: 14, t: 'profes cerca de ti' },
          { n: Object.keys(this.reservas()).length + 1, t: 'clases pedidas' },
          { n: 5, t: 'ofertas de prácticas' },
          { n: 5, t: 'habilidades validadas' },
        ],
      };
    return {
      titulo: 'Tus ofertas este mes',
      items: [
        { n: '1.240', t: 'visitas' },
        { n: this.ofertasEmpresa().reduce((t, o) => t + o.n, 0), t: 'candidaturas' },
        { n: this.proximasEntrevistas().length, t: 'entrevistas' },
        { n: 1, t: 'contratación' },
      ],
    };
  });

  // Tarjeta "más": centros que contratan / compañeros / docentes cerca
  protected mas = computed(() => {
    const r = this.rol();
    if (r === 'Profesor') {
      return {
        titulo: 'Centros que contratan',
        filas: CENTROS_QUE_CONTRATAN.map(([c, n]) => ({
          clave: c,
          foto: LOGOS[c],
          encaja: 'object-contain',
          titulo: c,
          meta: n + ' ofertas abiertas',
          aria: 'Seguir a ' + c,
          activo: !!this.siguiendo()[c],
          accion: this.siguiendo()[c] ? 'Siguiendo' : 'Seguir',
          abrir: () => this.alternarSeguir(c),
        })),
      };
    }
    if (r === 'Alumno') {
      return {
        titulo: 'Compañeros que ya hacen prácticas',
        filas: COMPANEROS.map(([id, meta]) => ({
          clave: id,
          foto: PERSONAS_CHAT[id][1],
          encaja: 'object-cover',
          titulo: PERSONAS_CHAT[id][0],
          meta,
          aria: 'Preguntar a ' + PERSONAS_CHAT[id][0],
          activo: false,
          accion: 'Preguntar',
          abrir: () => this.vChat.abrir(id),
        })),
      };
    }
    return {
      titulo: 'Docentes disponibles cerca',
      filas: DOCENTES_CERCA.map(([id, meta]) => {
        const inv = this.invitados()[id];
        return {
          clave: id,
          foto: PERSONAS_CHAT[id][1],
          encaja: 'object-cover',
          titulo: PERSONAS_CHAT[id][0],
          meta: inv ? 'Invitado a «' + inv + '»' : meta,
          aria: 'Invitar a ' + PERSONAS_CHAT[id][0],
          activo: !!inv,
          accion: inv ? 'Invitado' : 'Invitar',
          abrir: () => (inv ? this.vChat.abrir(id) : this.abrirInvitar(id, meta)),
        };
      }),
    };
  });

  protected consejos = computed(() => CONSEJOS[this.rol()]);

  // Empresa
  protected ofertasEmpresa = computed(() => [...this.creadas(), ...OFERTAS_EMPRESA]);
  protected ofertaSel = computed(
    () => this.ofertasEmpresa().find((o) => o.id === this.ofertaElegida()) ?? OFERTAS_EMPRESA[0],
  );
  protected candidatos = computed(() =>
    this.ofertaSel().personas.map((c, i) => ({
      ...c,
      i,
      invitado: this.entrevistas()[this.ofertaSel().id + '|' + i] ?? null,
      alumno: c.tipo === 'Alumno' || c.tipo === 'Alumna',
    })),
  );
  protected proximasEntrevistas = computed(() => {
    const lista = [
      {
        dia: 'LUN 17',
        hora: '10:00',
        foto: FOTOS.irene,
        nombre: 'Irene Pastor Llorente',
        oferta: 'Refuerzo online de Matemáticas',
        quien: 'irene',
      },
      {
        dia: 'MAR 18',
        hora: '12:30',
        foto: FOTOS.alex,
        nombre: 'Álex Romero Gil',
        oferta: 'Prácticas de diseño UX',
        quien: 'alex',
      },
    ];
    Object.entries(this.entrevistas()).forEach(([k, v]) => {
      const [oid, i] = k.split('|');
      const o = this.ofertasEmpresa().find((x) => x.id === oid);
      const c = o?.personas[+i];
      const [dia, hora] = v.split(' · ');
      if (o && c)
        lista.push({
          dia: dia.toUpperCase(),
          hora,
          foto: c.foto,
          nombre: c.nombre,
          oferta: o.titulo,
          quien: c.id,
        });
    });
    return lista;
  });

  // ----- Ventanas -----
  protected ofertaDetalle = computed(
    () => this.todasLasOfertas()[this.vDetalle.dato() ?? ''] ?? null,
  );
  protected ofertaAplicar = computed(
    () => this.todasLasOfertas()[this.vAplicar.dato() ?? ''] ?? null,
  );
  protected tutorReservar = computed(() => this.tutorPorId()[this.vReservar.dato() ?? ''] ?? null);
  protected candidatoVentana = computed(() => {
    const d = this.vCandidato.dato();
    if (!d) return null;
    const o = this.ofertasEmpresa().find((x) => x.id === d.oid);
    const c = o?.personas[d.i];
    if (!o || !c) return null;
    return {
      oferta: o,
      c,
      clave: o.id + '|' + d.i,
      invitado: this.entrevistas()[o.id + '|' + d.i] ?? null,
      alumno: c.tipo === 'Alumno' || c.tipo === 'Alumna',
    };
  });
  protected conversacion = computed(() => {
    const id = this.vChat.dato();
    if (!id) return null;
    const quien =
      PERSONAS_CHAT[id] ??
      (LOGOS[id]
        ? ([id, LOGOS[id]] as [string, string])
        : (['Contacto', FOTOS.lucia] as [string, string]));
    const esLogo = !!LOGOS[id];
    const semilla: MensajeEmpleo[] = [
      {
        mio: false,
        hora: 'Ayer',
        texto: {
          Profesor: '¡Hola! Hemos visto tu perfil en Linkedu y nos encaja mucho.',
          Alumno: '¡Hola! Claro, pregúntame lo que quieras sobre las prácticas.',
          Empresa: 'Gracias por escribir. ¿Qué día os viene bien para hablar?',
        }[this.rol()],
      },
    ];
    const todos = semilla.concat(this.chats()[id] ?? []);
    return {
      nombre: quien[0],
      foto: quien[1],
      encajaFoto: esLogo ? 'object-contain' : 'object-cover',
      mensajes: todos.map((m) => ({
        ...m,
        foto: m.mio
          ? this.rol() === 'Empresa'
            ? LOGOS['Academia Pitágoras']
            : this.cuenta().foto
          : quien[1],
      })),
    };
  });
  protected pasosAplicar = computed(() =>
    [
      ['1', 'Preparar'],
      ['2', 'Revisar y enviar'],
    ].map((p, i) => ({
      n: p[0],
      texto: p[1],
      hecho: i + 1 <= this.apPaso(),
      linea: i + 1 < this.apPaso(),
    })),
  );
  protected nombreCV = computed(() =>
    this.rol() === 'Alumno' ? 'CV_Alex_Romero.pdf' : 'CV_Lucia_Fernandez.pdf',
  );
  protected ventanaRetirar = computed(() => {
    const d = this.vRetirar.dato();
    if (!d) return null;
    const estado = d.estado || 'Enviada';
    const pasos = [
      'Enviada',
      'Vista por el centro',
      estado === 'Entrevista' ? 'Entrevista' : 'En revisión',
      'Respuesta',
    ];
    const alcanzado =
      ({ Enviada: 1, 'En revisión': 3, Entrevista: 3, Cerrada: 4 } as Record<string, number>)[
        estado
      ] ?? 1;
    return {
      ...d,
      estado,
      puedeRetirar: estado !== 'Cerrada',
      linea: pasos.map((t, i) => ({
        texto: i === 3 && estado === 'Cerrada' ? 'Plaza cubierta' : t,
        cuando:
          i < alcanzado ? ['hace 5 días', 'hace 4 días', 'hace 2 días', 'ayer'][i] : 'Pendiente',
        hecho: i < alcanzado,
        trazo: i < 3 && i + 1 < alcanzado,
        hayTrazo: i < 3,
      })),
    };
  });

  // Anuncio
  protected anuncioValido = computed(() => {
    const a = this.borradorAnuncio();
    return (
      a.materias.length > 0 && a.niveles.length > 0 && parseFloat(a.precio.replace(',', '.')) > 0
    );
  });
  protected alcance = computed(() => {
    const tipo = TIPOS_OFERTA.find((t) => t.id === this.pubTipo())!;
    const n = Object.values(this.pubSkills()).filter(Boolean).length;
    if (tipo.alcance === 'alumnos')
      return { grande: '1.380 alumnos de FP', texto: 'de tu zona verán esta oferta de prácticas.' };
    return n
      ? {
          grande: 2140 - n * 310 + ' docentes',
          texto: 'tienen validada al menos una de esas habilidades y verán la oferta primero.',
        }
      : { grande: '4.820 docentes', texto: 'de tu zona verán esta oferta.' };
  });

  // ===== Acciones generales =====
  protected elegirRol(r: Rol) {
    this.rol.set(r);
    this.filtro.set('Todas');
    [
      this.vDetalle,
      this.vAplicar,
      this.vRetirar,
      this.vReservar,
      this.vAnuncio,
      this.vPublicar,
      this.vCandidato,
      this.vChat,
      this.vInvitar,
      this.vLlamada,
      this.vFacturacion,
    ].forEach((v) => v.cerrar());
  }

  protected elegirPestana(id: string) {
    this.tabPorRol.update((t) => ({ ...t, [this.rol()]: id }));
  }

  protected accionPrincipal() {
    if (this.rol() === 'Profesor') this.abrirAnuncio();
    else this.abrirPublicar();
  }

  protected alternarGuardada(id: string, titulo: string) {
    this.guardadas.update((g) => ({ ...g, [id]: !g[id] }));
    if (this.guardadas()[id])
      this.avisos.mostrar(`Guardada: «${titulo}»`, 'guardar', 'bg-amarillo text-ink');
  }

  protected alternarSeguir(c: string) {
    this.siguiendo.update((s) => ({ ...s, [c]: !s[c] }));
    if (this.siguiendo()[c]) this.avisos.mostrar(`Ahora sigues a ${c}`, 'check');
  }

  // ===== Aplicar a una oferta =====
  protected abrirAplicar(o: Oferta) {
    if (this.aplicada(o.id)) {
      this.abrirRetirar(o.id, o.empresa, o.titulo, 'Enviada');
      return;
    }
    this.vDetalle.cerrar();
    this.apPaso.set(1);
    this.apDoc.set('perfil');
    this.apMsg.set('');
    this.apSeguro.set(false);
    this.vAplicar.abrir(o.id);
  }

  protected siguienteAplicar(o: Oferta) {
    if (this.apPaso() === 1) {
      this.apPaso.set(2);
      this.apSeguro.set(false);
    } else if (this.apSeguro()) {
      this.candidaturas.update((c) => ({ ...c, [o.id]: { doc: this.apDoc(), msg: this.apMsg() } }));
      if (o.id === 'a1') this.estado.inscritaPitagoras.set(true);
      this.vAplicar.cerrar();
      this.disparo.update((n) => n + 1);
      this.avisos.mostrar(
        this.rol() === 'Alumno' ? 'Solicitud enviada' : 'Candidatura enviada',
        'check',
      );
    }
  }

  protected abrirRetirar(id: string, empresa: string, titulo: string, estado: string) {
    const o = this.todasLasOfertas()[id];
    this.retirarConfirmado.set(false);
    this.vDetalle.cerrar();
    this.vRetirar.abrir({
      id,
      empresa: o?.empresa ?? empresa,
      titulo: o?.titulo ?? titulo,
      estado,
    });
  }

  protected accionRetirar() {
    const v = this.ventanaRetirar();
    if (!v) return;
    if (!v.puedeRetirar) {
      this.vRetirar.cerrar();
    } else if (!this.retirarConfirmado()) {
      this.retirarConfirmado.set(true);
    } else {
      this.candidaturas.update((c) => {
        const copia = { ...c };
        delete copia[v.id];
        return copia;
      });
      if (v.id === 'a1') this.estado.inscritaPitagoras.set(false);
      this.vRetirar.cerrar();
      this.avisos.mostrar('Has retirado tu candidatura', 'cerrar', 'bg-line text-ink');
    }
  }

  // ===== Clases particulares =====
  protected abrirReservar(t: Tutor) {
    const hueco = this.reservas()[t.id];
    if (hueco) {
      this.vChat.abrir(t.id);
      return;
    }
    this.bkPaso.set(1);
    this.bkHueco.set(null);
    this.bkMsg.set('');
    this.vReservar.abrir(t.id);
  }

  protected siguienteReservar(t: Tutor) {
    if (this.bkPaso() === 1) {
      if (this.bkHueco()) this.bkPaso.set(2);
    } else {
      this.reservas.update((r) => ({ ...r, [t.id]: this.bkHueco()! }));
      this.vReservar.cerrar();
      this.disparo.update((n) => n + 1);
      this.avisos.mostrar(
        `Clase de prueba pedida a ${t.nombre.split(' ')[0]}`,
        'calendario',
        'bg-naranja text-ink',
      );
    }
  }

  // ===== Anuncio de clases particulares =====
  protected abrirAnuncio() {
    this.borradorAnuncio.set(structuredClone(this.anuncio() ?? ANUNCIO_INICIAL));
    this.vAnuncio.abrir(null);
  }

  protected alternarEnAnuncio(clave: 'materias' | 'niveles' | 'horarios', valor: string) {
    this.borradorAnuncio.update((a) => {
      const lista = a[clave].includes(valor)
        ? a[clave].filter((x) => x !== valor)
        : [...a[clave], valor];
      return { ...a, [clave]: lista };
    });
  }

  protected cambiarAnuncio(campo: 'precio' | 'desc', e: Event) {
    const v = (e.target as HTMLInputElement).value;
    this.borradorAnuncio.update((a) => ({ ...a, [campo]: v }));
  }

  protected guardarAnuncio(e: Event) {
    e.preventDefault();
    if (!this.anuncioValido()) return;
    const eraNuevo = !this.anuncio();
    this.anuncio.set(this.borradorAnuncio());
    this.vAnuncio.cerrar();
    this.avisos.mostrar(
      eraNuevo ? 'Anuncio publicado' : 'Anuncio actualizado',
      'check',
      'bg-turquesa text-ink',
    );
  }

  protected pausarAnuncio() {
    this.anuncio.set(null);
    this.vAnuncio.cerrar();
    this.avisos.mostrar('Anuncio pausado', 'cerrar', 'bg-line text-ink');
  }

  // ===== Empresa: publicar oferta y candidatos =====
  protected abrirPublicar() {
    this.pubTitulo.set('');
    this.pubPago.set('25 €/hora');
    this.pubTipo.set('docencia');
    this.pubSkills.set({ 'Clases en línea': true });
    this.vPublicar.abrir(null);
  }

  protected alternarSkill(k: string) {
    this.pubSkills.update((s) => ({ ...s, [k]: !s[k] }));
  }

  protected publicarOferta(e: Event) {
    e.preventDefault();
    const titulo = this.pubTitulo().trim();
    if (!titulo) return;
    const elegidas = HABILIDADES_OFERTA.filter((k) => this.pubSkills()[k]);
    const nueva: OfertaEmpresa = {
      id: 'n' + (this.creadas().length + 1),
      titulo,
      meta: this.pubPago(),
      n: 0,
      estado: 'Nueva',
      pide: elegidas.length ? elegidas : ['Sin habilidades marcadas'],
      personas: [],
    };
    this.creadas.update((c) => [nueva, ...c]);
    this.ofertaElegida.set(nueva.id);
    this.vPublicar.cerrar();
    this.disparo.update((n) => n + 1);
    this.avisos.mostrar('Oferta publicada', 'empleo', 'bg-naranja text-ink');
  }

  protected abrirCandidato(oid: string, i: number) {
    this.cdHueco.set(null);
    this.vCandidato.abrir({ oid, i });
  }

  protected accionCandidato() {
    const v = this.candidatoVentana();
    if (!v) return;
    if (v.invitado) {
      this.entrevistas.update((x) => {
        const copia = { ...x };
        delete copia[v.clave];
        return copia;
      });
      this.avisos.mostrar('Propuesta cancelada', 'cerrar', 'bg-line text-ink');
    } else if (this.cdHueco()) {
      this.entrevistas.update((x) => ({ ...x, [v.clave]: this.cdHueco()! }));
      this.vCandidato.cerrar();
      this.avisos.mostrar(
        `Entrevista propuesta a ${v.c.nombre.split(' ')[0]}`,
        'calendario',
        'bg-naranja text-ink',
      );
    }
  }

  protected abrirInvitar(quien: string, meta: string) {
    this.ivOferta.set(null);
    this.vInvitar.abrir({ quien, meta });
  }

  protected enviarInvitacion() {
    const d = this.vInvitar.dato();
    if (!d || !this.ivOferta()) return;
    this.invitados.update((x) => ({ ...x, [d.quien]: this.ivOferta()! }));
    this.vInvitar.cerrar();
    this.avisos.mostrar(
      `Invitación enviada a ${PERSONAS_CHAT[d.quien][0].split(' ')[0]}`,
      'conectar',
    );
  }

  // ===== Chat =====
  protected enviarMensaje(e: Event) {
    e.preventDefault();
    const id = this.vChat.dato();
    const texto = this.chatBorrador().trim();
    if (!id || !texto) return;
    this.chats.update((c) => ({
      ...c,
      [id]: [...(c[id] ?? []), { mio: true, texto, hora: 'Ahora' }],
    }));
    this.chatBorrador.set('');
  }

  protected descargarFactura(k: string) {
    this.facturas.update((f) => ({ ...f, [k]: true }));
    this.avisos.mostrar('Factura descargada', 'descargar');
  }

  // Nombre y foto de una persona del chat
  protected cuentasChat(id: string) {
    return PERSONAS_CHAT[id] ?? ['Contacto', FOTOS.lucia];
  }

  protected escribir(campo: { set: (v: string) => void }, e: Event) {
    campo.set((e.target as HTMLInputElement).value);
  }
}

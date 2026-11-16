import { ABRE_PERFIL } from '../../compartido/abre-perfil';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Avisos } from '../../compartido/avisos';
import { Confeti } from '../../compartido/confeti/confeti';
import { Icono } from '../../compartido/icono/icono';
import { EstadoVentana, Ventana } from '../../compartido/ventana/ventana';
import {
  FRASES_OTROS,
  MensajeChat,
  PERSONAS,
  PROYECTOS,
  Proyecto,
  ReunionProyecto,
  TareaProyecto,
} from '../../datos/proyectos';

const ABP = 'Aprendizaje basado en proyectos';

interface Enviada {
  id: string;
  para: string;
  proyecto: string;
  estado: 'Pendiente' | 'Aceptada';
}

type Filtro = 'todos' | 'publicos' | 'privados';

// Plantillas para empezar un proyecto
const PLANTILLAS = [
  {
    titulo: 'Mercado de datos',
    meta: 'Estadística · ESO · 38 centros',
    icono: 'buscar',
    clases: 'bg-azul-soft text-azul',
    habilidades: ['Estadística aplicada', 'Hojas de cálculo', 'Trabajo cooperativo'],
    desc: 'Recogemos datos reales del barrio y los analizamos entre varios centros.',
  },
  {
    titulo: 'Escape room entre centros',
    meta: 'Gamificación · 21 centros',
    icono: 'proyecto',
    clases: 'bg-naranja-soft text-naranja-oscuro',
    habilidades: ['Gamificación', 'Trabajo cooperativo'],
    desc: 'Cada centro diseña dos retos y los intercambia con otro.',
  },
  {
    titulo: 'Club de robótica',
    meta: 'Tecnología · FP y ESO · 14 centros',
    icono: 'ajustes',
    clases: 'bg-verde-soft text-verde',
    habilidades: ['Robótica educativa', ABP],
    desc: 'Alumnado de FP mentoriza a ESO en un reto de robótica.',
  },
  {
    titulo: 'Radio entre institutos',
    meta: 'Lengua · ESO · 17 centros',
    icono: 'mensajes',
    clases: 'bg-azul-soft text-marino',
    habilidades: ['Guion radiofónico', 'Expresión oral'],
    desc: 'Cada centro produce una sección de un programa común.',
  },
];

const HABILIDADES_POSIBLES = [
  ABP,
  'Estadística aplicada',
  'GeoGebra',
  'Evaluación con rúbricas',
  'Trabajo cooperativo',
  'Hojas de cálculo',
  'Gamificación',
  'Comunicación con familias',
  'Robótica educativa',
];
const EQUIPO_POSIBLE = ['elena', 'carlos', 'nuria', 'hugo', 'paula', 'ane'];
const SUGERIDOS = ['carlos', 'hugo', 'ane', 'sergio', 'marta', 'nuria', 'paula', 'elena', 'teresa'];

const NOMBRES_ESTADO = ['Por hacer', 'En curso', 'Hecho'];
const COLOR_COLUMNA = ['bg-naranja', 'bg-azul', 'bg-turquesa'];
const COLOR_ETIQUETA_ESTADO = ['bg-naranja-soft', 'bg-azul-soft', 'bg-turquesa'];
const COLOR_ESTADO_PROYECTO: Record<string, string> = {
  Activo: 'bg-turquesa',
  Borrador: 'bg-amarillo',
  Finalizado: 'bg-line',
};
const COLORES_BARRAS = ['bg-turquesa', 'bg-cielo-medio', 'bg-amarillo', 'bg-naranja', 'bg-cielo'];
const IDEAS_MENSAJE = [
  'Lo usó muy bien en las sesiones',
  'Me ayudó a aprenderlo',
  'Preparó materiales con ello',
];

@Component({
  selector: 'app-proyectos',
  imports: [RouterLink, Icono, Ventana, Confeti, ABRE_PERFIL],
  templateUrl: './proyectos.html',
  host: { class: 'flex flex-1 flex-col' },
})
export class Proyectos {
  private avisos = inject(Avisos);

  protected personas = PERSONAS;
  protected plantillas = PLANTILLAS;
  protected habilidadesPosibles = HABILIDADES_POSIBLES;
  protected equipoPosible = EQUIPO_POSIBLE;
  protected ideasMensaje = IDEAS_MENSAJE;
  protected nombresEstado = NOMBRES_ESTADO;
  protected colorColumna = COLOR_COLUMNA;
  protected colorEtiquetaEstado = COLOR_ETIQUETA_ESTADO;
  protected filtros: { id: Filtro; texto: string }[] = [
    { id: 'todos', texto: 'Todos' },
    { id: 'publicos', texto: 'Públicos' },
    { id: 'privados', texto: 'Privados' },
  ];

  // ---------- Estado ----------
  protected creados = signal<Proyecto[]>([]);
  protected aceptadas = signal<Record<string, boolean>>({});
  protected rechazadas = signal<Record<string, boolean>>({});
  // Validaciones que has hecho tú: "proyecto|persona|habilidad" -> tu mensaje
  protected mias = signal<Record<string, string>>({
    'mercado|elena|GeoGebra': 'Sus construcciones de GeoGebra son las que usamos en clase.',
    'radio|javier|Audacity': 'Nos enseñó a todos a editar el sonido.',
  });
  protected enviadas = signal<Enviada[]>([
    { id: 's1', para: 'hugo', proyecto: 'olimpiada', estado: 'Pendiente' },
    { id: 's2', para: 'ane', proyecto: 'olimpiada', estado: 'Pendiente' },
    { id: 's3', para: 'elena', proyecto: 'mercado', estado: 'Aceptada' },
  ]);
  protected registro = signal<{ clave: string; habilidad: string; quien: string; donde: string }[]>(
    [],
  );
  protected filtro = signal<Filtro>('todos');
  protected seleccion = signal('mercado');
  // Lista de proyectos desplegada en el teléfono
  protected selectorAbierto = signal(false);
  protected pestana = signal<'recibidas' | 'enviadas'>('recibidas');
  protected estadoTarea = signal<Record<string, number>>({});
  protected tareasExtra = signal<Record<string, TareaProyecto[]>>({});
  protected chatExtra = signal<Record<string, MensajeChat[]>>({});
  protected agenda = signal<Record<string, boolean>>({});
  protected visto = signal<Record<string, boolean>>({});
  protected pedidas = signal<Record<string, boolean>>({});
  protected tareaNueva = signal('');
  protected mensajeChat = signal('');

  // Ventanas
  protected ventanaCrear = new EstadoVentana<null>();
  protected ventanaTablero = new EstadoVentana<null>();
  protected ventanaChat = new EstadoVentana<null>();
  // Ventana para invitar a gente al proyecto
  protected ventanaInvitar = new EstadoVentana<null>();
  protected ventanaValidar = new EstadoVentana<{ pid: string; quien: string; habilidad: string }>();

  // Formulario de proyecto nuevo
  protected formTitulo = signal('');
  protected formDesc = signal('');
  protected formVis = signal<'Público' | 'Privado'>('Público');
  protected formHabilidades = signal<Record<string, boolean>>({ [ABP]: true });
  protected formEquipo = signal<Record<string, boolean>>({});

  // Formulario de validación
  protected mensajeValidacion = signal('');
  protected validacionSegura = signal(false);
  protected validacionHecha = signal(false);
  protected disparo = signal(0);

  // ---------- Datos calculados ----------
  protected proyectos = computed<Record<string, Proyecto>>(() => ({
    ...PROYECTOS,
    ...Object.fromEntries(this.creados().map((p) => [p.id, p])),
  }));

  protected orden = computed(() => {
    let o = ['mercado', 'radio', 'tutoria', 'olimpiada', 'huerto'];
    if (this.aceptadas()['aire']) o.splice(2, 0, 'aire');
    if (this.aceptadas()['escape']) o.splice(2, 0, 'escape');
    o = this.creados()
      .map((p) => p.id)
      .concat(o);
    return o;
  });

  protected actual = computed(() => {
    const id = this.seleccion();
    return this.orden().includes(id) ? this.proyectos()[id] : this.proyectos()['mercado'];
  });

  // Cuántas validaciones tiene una persona en una habilidad (las de los demás + la tuya)
  protected cuenta(pid: string, quien: string, habilidad: string) {
    const base = (this.proyectos()[pid].validaciones[quien] ?? {})[habilidad] ?? [];
    return base.length + (this.mias()[pid + '|' + quien + '|' + habilidad] !== undefined ? 1 : 0);
  }

  protected lista = computed(() =>
    this.orden()
      .map((id) => this.proyectos()[id])
      .filter((p) =>
        this.filtro() === 'publicos'
          ? p.visibilidad === 'Público'
          : this.filtro() === 'privados'
            ? p.visibilidad === 'Privado'
            : true,
      ),
  );

  protected misHabilidades = computed(() => {
    const total: Record<string, number> = {};
    let proyectos = 0;
    for (const id of this.orden()) {
      let alguno = false;
      for (const h of Object.keys(this.proyectos()[id].validaciones['lucia'] ?? {})) {
        const n = this.cuenta(id, 'lucia', h);
        if (n) {
          total[h] = (total[h] ?? 0) + n;
          alguno = true;
        }
      }
      if (alguno) proyectos++;
    }
    const claves = Object.keys(total).sort((a, b) => total[b] - total[a]);
    const maximo = claves.length ? total[claves[0]] : 1;
    return {
      total: claves.reduce((t, k) => t + total[k], 0),
      proyectos,
      filas: claves.slice(0, 5).map((k, i) => ({
        nombre: k,
        n: total[k],
        pct: Math.round((total[k] / maximo) * 100) + '%',
        barra: COLORES_BARRAS[i % COLORES_BARRAS.length],
      })),
    };
  });

  protected pendientesAqui = computed(() =>
    this.enviadas().filter((x) => x.proyecto === this.actual().id && x.estado === 'Pendiente'),
  );
  protected esPrivado = computed(() => this.actual().visibilidad === 'Privado');
  protected colorEstado = computed(() => COLOR_ESTADO_PROYECTO[this.actual().estado] ?? 'bg-line');
  protected equipo = computed(() => this.actual().miembros.filter((m) => m !== 'lucia'));

  protected habilidadesProyecto = computed(() => {
    const p = this.actual();
    const nombres: string[] = [];
    p.miembros.forEach((m) =>
      Object.keys(p.validaciones[m] ?? {}).forEach((k) => !nombres.includes(k) && nombres.push(k)),
    );
    (p.habilidades ?? []).forEach((k) => !nombres.includes(k) && nombres.push(k));
    return nombres;
  });

  protected totalesHabilidad = computed(() => {
    const p = this.actual();
    return this.habilidadesProyecto().map((k) => ({
      nombre: k,
      n: p.miembros.reduce(
        (n, m) => n + ((p.validaciones[m] ?? {})[k] ? this.cuenta(p.id, m, k) : 0),
        0,
      ),
    }));
  });

  protected etiquetaValidaciones = computed(
    () =>
      this.totalesHabilidad().reduce((t, x) => t + x.n, 0) +
      ' validaciones · ' +
      this.habilidadesProyecto().length +
      ' habilidades',
  );

  // "Te han validado aquí"
  protected teHanValidado = computed(() => {
    const p = this.actual();
    const mias = p.validaciones['lucia'] ?? {};
    return Object.keys(mias)
      .map((k) => {
        const por = mias[k];
        const frase = p.frases[k];
        const nombres = por.map((w) => PERSONAS[w].corto);
        return {
          nombre: k,
          n: por.length,
          por: por.map((w) => PERSONAS[w]),
          quien:
            por.length === 1
              ? 'Validada por ' + nombres[0]
              : 'Validada por ' +
                nombres.slice(0, -1).join(', ') +
                ' y ' +
                nombres[nombres.length - 1],
          frase: frase ? { texto: frase.texto, quien: PERSONAS[frase.quien].corto } : null,
        };
      })
      .filter((r) => r.n > 0);
  });

  protected habilidadPorPedir = computed(() => {
    const nombres = this.teHanValidado().map((r) => r.nombre);
    return this.habilidadesProyecto().find((k) => !nombres.includes(k));
  });

  // "Valida a tu equipo"
  protected filasEquipo = computed(() => {
    const p = this.actual();
    return this.equipo().map((m) => ({
      id: m,
      persona: PERSONAS[m],
      habilidades: Object.keys(p.validaciones[m] ?? {}).map((k) => ({
        nombre: k,
        n: this.cuenta(p.id, m, k),
        mia: this.mias()[p.id + '|' + m + '|' + k] !== undefined,
      })),
    }));
  });

  protected carasPendientes = computed(() => this.pendientesAqui().map((x) => PERSONAS[x.para]));
  protected tituloPendientes = computed(() =>
    this.pendientesAqui().length
      ? 'Esperando a ' +
        this.pendientesAqui()
          .map((x) => PERSONAS[x.para].corto)
          .join(' y ')
      : 'Invita a tu equipo desde la columna derecha',
  );
  protected textoParticipantes = computed(() => {
    const n = this.actual().miembros.length;
    const pend = this.pendientesAqui().length;
    return (
      n +
      (n === 1 ? ' participante' : ' participantes') +
      (pend ? ' · ' + pend + ' invitaciones pendientes' : '')
    );
  });
  protected ayudaInvitar = computed(() =>
    this.esPrivado()
      ? 'Proyecto privado: solo lo verán las personas que invites.'
      : 'Proyecto público: aparecerá en el perfil de cada participante.',
  );
  protected chatSinLeer = computed(() => !this.visto()[this.actual().id] && !!this.actual().chat);
  protected peticionEnviada = computed(() => !!this.pedidas()[this.actual().id]);

  // Tareas del tablero
  protected tareas = computed(() => {
    const p = this.actual();
    const base: TareaProyecto[] = p.tareas ?? [
      {
        titulo: 'Reunión de arranque',
        quien: 'lucia',
        vence: 'Hecha',
        estado: 2,
        etiqueta: 'Organización',
      },
      {
        titulo: 'Repartir tareas del primer mes',
        quien: p.miembros[1] ?? 'lucia',
        vence: '20 nov',
        estado: 1,
        etiqueta: 'Organización',
      },
      {
        titulo: 'Preparar los primeros materiales',
        quien: p.miembros[p.miembros.length - 1],
        vence: '27 nov',
        estado: 0,
        etiqueta: 'Materiales',
      },
      {
        titulo: 'Calendario de sesiones',
        quien: 'lucia',
        vence: '4 dic',
        estado: 0,
        etiqueta: 'Organización',
      },
    ];
    return base.concat(this.tareasExtra()[p.id] ?? []).map((t, i) => {
      const clave = p.id + '|' + i;
      const estado = this.estadoTarea()[clave] ?? t.estado;
      return {
        ...t,
        clave,
        estado,
        vence: estado === 2 ? 'Hecha' : t.vence === 'Hecha' ? 'Esta semana' : t.vence,
        persona: PERSONAS[t.quien],
      };
    });
  });
  protected tareasPrevia = computed(() =>
    [
      ...this.tareas().filter((t) => t.estado < 2),
      ...this.tareas().filter((t) => t.estado === 2),
    ].slice(0, 8),
  );
  protected columnas = computed(() =>
    [0, 1, 2].map((e) => ({ estado: e, tareas: this.tareas().filter((t) => t.estado === e) })),
  );
  protected resumenTareas = computed(
    () =>
      this.tareas().filter((t) => t.estado === 2).length +
      ' de ' +
      this.tareas().length +
      ' tareas hechas',
  );

  protected mensajes = computed(() => {
    const p = this.actual();
    const base: MensajeChat[] = p.chat ?? [
      {
        quien: this.equipo()[0] ?? 'lucia',
        texto: 'Hola a todos, ¿empezamos esta semana?',
        hora: 'Ayer 17:20',
      },
      { quien: 'lucia', texto: 'Sí, preparo el calendario y os lo paso.', hora: 'Hoy 9:05' },
    ];
    return base
      .concat(this.chatExtra()[p.id] ?? [])
      .map((m) => ({ ...m, yo: m.quien === 'lucia', persona: PERSONAS[m.quien] }));
  });

  protected reuniones = computed<(ReunionProyecto & { clave: string; colores: string })[]>(() => {
    const p = this.actual();
    const base = p.reuniones ?? [
      {
        mes: 'NOV',
        dia: '21',
        titulo: 'Reunión de arranque',
        meta: 'Jueves · 17:30 · videollamada',
      },
      { mes: 'DIC', dia: '05', titulo: 'Primera revisión', meta: 'Jueves · 17:30 · videollamada' },
    ];
    return base.map((m, i) => ({
      ...m,
      clave: p.id + i,
      colores: i % 2 ? 'bg-naranja text-ink' : 'bg-marino text-white',
    }));
  });

  // Invitaciones
  protected recibidas = computed(() =>
    [
      {
        id: 'aire',
        de: 'javier',
        cuando: 'hace 2 h',
        nota: 'Busca a alguien para el análisis estadístico de los datos.',
      },
      {
        id: 'escape',
        de: 'carmen',
        cuando: 'ayer',
        nota: 'Necesitan retos de álgebra para 2º de ESO.',
      },
    ].map((r) => ({
      ...r,
      proyecto: this.proyectos()[r.id].titulo,
      persona: PERSONAS[r.de],
      abierta: !this.aceptadas()[r.id] && !this.rechazadas()[r.id],
      unida: !!this.aceptadas()[r.id],
      rechazada: !!this.rechazadas()[r.id],
    })),
  );
  protected pendientesRecibidas = computed(() => this.recibidas().filter((r) => r.abierta).length);
  protected envios = computed(() =>
    this.enviadas().map((x) => ({
      ...x,
      persona: PERSONAS[x.para],
      nombreProyecto: this.proyectos()[x.proyecto].titulo,
    })),
  );
  protected sugeridos = computed(() =>
    SUGERIDOS.filter(
      (w) =>
        !this.actual().miembros.includes(w) &&
        !this.enviadas().some((x) => x.para === w && x.proyecto === this.actual().id),
    )
      .slice(0, 3)
      .map((w) => ({ id: w, persona: PERSONAS[w] })),
  );

  protected actividad = computed(() =>
    this.registro()
      .slice(0, 2)
      .map((l) => ({
        foto: PERSONAS['lucia'].foto,
        quien: 'Has validado',
        texto: 'a ' + l.quien + ' en',
        que: l.habilidad,
        donde: l.donde,
        cuando: 'ahora',
      }))
      .concat([
        {
          foto: PERSONAS['elena'].foto,
          quien: 'Elena',
          texto: 'validó tu habilidad',
          que: 'Estadística aplicada',
          donde: 'Matemáticas en el mercado',
          cuando: 'hace 1 h',
        },
        {
          foto: PERSONAS['javier'].foto,
          quien: 'Javier',
          texto: 'te invitó a',
          que: 'Medimos el aire',
          donde: 'Invitación',
          cuando: 'hace 2 h',
        },
        {
          foto: PERSONAS['lidia'].foto,
          quien: 'Lidia',
          texto: 'validó tu habilidad',
          que: 'Guion radiofónico',
          donde: 'Radio escolar',
          cuando: 'ayer',
        },
        {
          foto: PERSONAS['rocio'].foto,
          quien: 'Rocío',
          texto: 'completó la tarea',
          que: 'Encuesta de precios',
          donde: 'Matemáticas en el mercado',
          cuando: 'ayer',
        },
        {
          foto: PERSONAS['nuria'].foto,
          quien: 'Nuria',
          texto: 'validó tu habilidad',
          que: 'Diseño de pruebas',
          donde: 'Olimpiada de estadística',
          cuando: 'hace 3 días',
        },
        {
          foto: PERSONAS['iker'].foto,
          quien: 'Iker',
          texto: 'subió la sintonía a',
          que: 'Radio escolar',
          donde: 'Tablero',
          cuando: 'hace 4 días',
        },
        {
          foto: PERSONAS['amparo'].foto,
          quien: 'Amparo',
          texto: 'subió el acta de',
          que: 'Coordinación de datos',
          donde: 'Matemáticas en el mercado',
          cuando: 'hace 5 días',
        },
        {
          foto: PERSONAS['jordi'].foto,
          quien: 'Jordi',
          texto: 'te mencionó en',
          que: 'Gráficas comparativas',
          donde: 'Tablero',
          cuando: 'hace 6 días',
        },
      ])
      .slice(0, 8),
  );

  // Formulario de nuevo proyecto
  protected habilidadesElegidas = computed(() =>
    HABILIDADES_POSIBLES.filter((k) => this.formHabilidades()[k]),
  );
  protected equipoElegido = computed(() => EQUIPO_POSIBLE.filter((w) => this.formEquipo()[w]));
  protected resumenFormulario = computed(() =>
    this.formTitulo().trim()
      ? `Se creará como borrador ${this.formVis() === 'Privado' ? 'privado' : 'público'} y se enviarán ${this.equipoElegido().length} invitaciones.`
      : 'Escribe un nombre para poder crear el proyecto.',
  );

  // Ventana de validación
  protected validacion = computed(() => {
    const d = this.ventanaValidar.dato();
    if (!d) return null;
    const p = this.proyectos()[d.pid];
    const persona = PERSONAS[d.quien];
    const clave = d.pid + '|' + d.quien + '|' + d.habilidad;
    const yaValidada = this.mias()[clave] !== undefined;
    const otros = ((p.validaciones[d.quien] ?? {})[d.habilidad] ?? []).filter((o) => o !== 'lucia');
    const n = this.cuenta(d.pid, d.quien, d.habilidad);
    return {
      ...d,
      clave,
      proyecto: p,
      persona,
      yaValidada,
      miMensaje: yaValidada
        ? this.mias()[clave]
          ? 'Tu mensaje: «' + this.mias()[clave] + '»'
          : 'No dejaste mensaje.'
        : '',
      cuentaTexto: n === 1 ? '1 validación en este proyecto' : n + ' validaciones en este proyecto',
      otros: otros.slice(0, 2).map((o, i) => ({
        persona: PERSONAS[o],
        texto:
          i === 0
            ? (FRASES_OTROS[d.habilidad] ?? 'Lo demostró durante todo el proyecto.')
            : ['Siempre dispuesta a echar una mano con esto.', 'Aprendí mucho viéndole trabajar.'][
                (d.quien.length + d.habilidad.length) % 2
              ],
      })),
    };
  });

  // ===== Acciones =====
  protected elegirProyecto(id: string) {
    this.seleccion.set(id);
    // Al elegir uno, la lista del teléfono se vuelve a cerrar
    this.selectorAbierto.set(false);
  }

  protected abrirCrear(plantilla?: (typeof PLANTILLAS)[number]) {
    this.formTitulo.set(plantilla ? plantilla.titulo + ' 2027' : '');
    this.formDesc.set(plantilla ? plantilla.desc : '');
    this.formVis.set('Público');
    this.formHabilidades.set(
      plantilla ? Object.fromEntries(plantilla.habilidades.map((k) => [k, true])) : { [ABP]: true },
    );
    this.formEquipo.set({});
    this.ventanaCrear.abrir(null);
  }

  protected alternarHabilidad(k: string) {
    this.formHabilidades.update((h) => ({ ...h, [k]: !h[k] }));
  }

  protected alternarEquipo(w: string) {
    this.formEquipo.update((h) => ({ ...h, [w]: !h[w] }));
  }

  protected crearProyecto(e: Event) {
    e.preventDefault();
    const titulo = this.formTitulo().trim();
    if (!titulo) return;
    const id = 'nuevo' + (this.creados().length + 1);
    const nuevo: Proyecto = {
      id,
      titulo,
      corto: titulo,
      visibilidad: this.formVis(),
      estado: 'Borrador',
      color: 'bg-naranja',
      resumen:
        this.formDesc().trim() ||
        'Proyecto recién creado. Añade una descripción y las primeras tareas desde el tablero.',
      centros: '1 centro · IES Ramiro de Maeztu',
      fechas: 'Creado hoy',
      progreso: 2,
      tareasTexto: '1 de 4 tareas',
      miembros: ['lucia'],
      validaciones: { lucia: {} },
      habilidades: this.habilidadesElegidas(),
      frases: {},
    };
    const invitaciones: Enviada[] = this.equipoElegido().map((w) => ({
      id: id + w,
      para: w,
      proyecto: id,
      estado: 'Pendiente',
    }));
    this.creados.update((c) => [nuevo, ...c]);
    this.enviadas.update((e) => [...invitaciones, ...e]);
    this.seleccion.set(id);
    this.filtro.set('todos');
    this.ventanaCrear.cerrar();
    this.avisos.mostrar(`Proyecto «${titulo}» creado`, 'proyecto', 'bg-naranja text-ink');
  }

  protected aceptarInvitacion(id: string, nombre: string) {
    this.aceptadas.update((a) => ({ ...a, [id]: true }));
    this.seleccion.set(id);
    this.filtro.set('todos');
    this.avisos.mostrar(`Te has unido a «${nombre}»`, 'check');
  }

  protected rechazarInvitacion(id: string) {
    this.rechazadas.update((a) => ({ ...a, [id]: true }));
  }

  protected cancelarInvitacion(id: string) {
    this.enviadas.update((l) => l.filter((x) => x.id !== id));
    this.avisos.mostrar('Invitación cancelada', 'cerrar', 'bg-line text-ink');
  }

  protected invitar(w: string) {
    this.enviadas.update((l) => [
      { id: 'n' + Date.now(), para: w, proyecto: this.actual().id, estado: 'Pendiente' },
      ...l,
    ]);
    this.pestana.set('enviadas');
    this.avisos.mostrar(`Invitación enviada a ${PERSONAS[w].corto}`, 'conectar');
  }

  protected alternarAgenda(clave: string, titulo: string) {
    this.agenda.update((a) => ({ ...a, [clave]: !a[clave] }));
    if (this.agenda()[clave])
      this.avisos.mostrar(
        `«${titulo}» añadida a tu calendario`,
        'calendario',
        'bg-naranja text-ink',
      );
  }

  protected alternarPeticion() {
    const id = this.actual().id;
    this.pedidas.update((a) => ({ ...a, [id]: !a[id] }));
    if (this.pedidas()[id])
      this.avisos.mostrar(
        'Petición de validación enviada al equipo',
        'mensajes',
        'bg-azul text-white',
      );
  }

  protected abrirChat() {
    this.visto.update((v) => ({ ...v, [this.actual().id]: true }));
    this.ventanaChat.abrir(null);
  }

  protected moverTarea(clave: string, estado: number) {
    this.estadoTarea.update((t) => ({ ...t, [clave]: estado }));
    if (estado === 2) this.avisos.mostrar('¡Tarea hecha!', 'check');
  }

  protected anadirTarea(e: Event) {
    e.preventDefault();
    const titulo = this.tareaNueva().trim();
    if (!titulo) return;
    const id = this.actual().id;
    const nueva: TareaProyecto = {
      titulo,
      quien: 'lucia',
      vence: 'Sin fecha',
      estado: 0,
      etiqueta: 'Nueva',
    };
    this.tareasExtra.update((x) => ({ ...x, [id]: [...(x[id] ?? []), nueva] }));
    this.tareaNueva.set('');
  }

  protected enviarMensaje(e: Event) {
    e.preventDefault();
    const texto = this.mensajeChat().trim();
    if (!texto) return;
    const id = this.actual().id;
    this.chatExtra.update((x) => ({
      ...x,
      [id]: [...(x[id] ?? []), { quien: 'lucia', texto, hora: 'Ahora' }],
    }));
    this.mensajeChat.set('');
  }

  protected abrirValidar(quien: string, habilidad: string) {
    this.mensajeValidacion.set('');
    this.validacionSegura.set(false);
    this.validacionHecha.set(false);
    this.ventanaValidar.abrir({ pid: this.actual().id, quien, habilidad });
  }

  protected usarIdea(idea: string) {
    const actual = this.mensajeValidacion().replace(/\s*$/, '');
    this.mensajeValidacion.set(actual ? actual + ' ' + idea + '.' : idea + '.');
  }

  protected validar(e: Event) {
    e.preventDefault();
    const v = this.validacion();
    if (!v || !this.validacionSegura() || v.yaValidada) return;
    this.mias.update((m) => ({ ...m, [v.clave]: this.mensajeValidacion().trim() }));
    this.registro.update((r) => [
      { clave: v.clave, habilidad: v.habilidad, quien: v.persona.corto, donde: v.proyecto.corto },
      ...r,
    ]);
    this.validacionHecha.set(true);
    this.disparo.update((n) => n + 1);
  }

  protected retirarValidacion() {
    const v = this.validacion();
    if (!v) return;
    this.mias.update((m) => {
      const copia = { ...m };
      delete copia[v.clave];
      return copia;
    });
    this.registro.update((r) => r.filter((l) => l.clave !== v.clave));
    this.ventanaValidar.cerrar();
    this.avisos.mostrar('Has retirado tu validación', 'cerrar', 'bg-line text-ink');
  }

  protected escribir(campo: { set: (v: string) => void }, e: Event) {
    campo.set((e.target as HTMLInputElement).value);
  }
}

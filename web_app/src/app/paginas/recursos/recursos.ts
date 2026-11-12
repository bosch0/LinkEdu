import { Component, computed, inject, signal } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Avisos } from '../../compartido/avisos';
import { Confeti } from '../../compartido/confeti/confeti';
import { Icono } from '../../compartido/icono/icono';
import { EstadoVentana, Ventana } from '../../compartido/ventana/ventana';
import { FOTOS } from '../../datos/fotos';
import { portada } from '../../datos/portadas';
import {
  CATALOGO,
  COLECCIONES,
  COLOR_TIPO,
  COMENTARIOS,
  INCLUYE,
  MAS_DESCARGADOS,
  MIS_RECURSOS,
  MiRecurso,
  Recurso,
  TipoRecurso,
  VENTAJAS_PREMIUM,
} from '../../datos/recursos';

type Pestana = 'explorar' | 'mios' | 'descargados' | 'favoritos';
type FiltroPrecio = 'todos' | 'gratis' | 'pago';

/** Cualquier recurso (de otro o tuyo) con los datos que necesitan las tarjetas y las ventanas. */
interface Item {
  id: string;
  titulo: string;
  tipo: TipoRecurso;
  detalle: string;
  materia: string;
  autor: string;
  foto: string;
  coste: number;
  descargas: number;
  valoracion: string;
  pro?: boolean;
  estilo?: string;
  mio: boolean;
  idx: number;
  descripcion?: string;
  portada?: string;
  privado?: boolean;
  meta?: string;
  favs?: number;
  nuevo?: boolean;
}

const ESTADO_INICIAL_FAVS = {
  arduino: true,
  escape: true,
  lectora: true,
  rubricas: true,
  ine: true,
  probab: true,
};
const ESTADO_INICIAL_DESCARGADOS = {
  arduino: 'el 3 nov',
  rubricas: 'el 28 oct',
  escape: 'el 21 oct · comprado',
  video: 'el 14 oct',
  ine: 'el 2 oct',
};

const euros = (n: number) => n.toFixed(2).replace('.', ',') + ' €';
const miles = (n: number) =>
  new Intl.NumberFormat('es-ES', {
    useGrouping: 'always',
  } as unknown as Intl.NumberFormatOptions).format(n);

@Component({
  selector: 'app-recursos',
  imports: [Icono, Ventana, Confeti],
  templateUrl: './recursos.html',
  host: { class: 'flex flex-1 flex-col' },
})
export class Recursos {
  private avisos = inject(Avisos);
  private sanitizer = inject(DomSanitizer);
  private portadas = new Map<string, SafeUrl>();

  protected fotoPerfil = FOTOS.lucia;
  protected euros = euros;
  protected miles = miles;
  protected colorTipo = COLOR_TIPO;
  protected ventajas = VENTAJAS_PREMIUM;
  protected tiposFiltro: ('Todos' | TipoRecurso)[] = [
    'Todos',
    'PDF',
    'Presentación',
    'Fichas',
    'Vídeo',
    'Juego',
  ];
  protected tiposSubida: TipoRecurso[] = ['PDF', 'Presentación', 'Fichas', 'Vídeo', 'Juego'];
  protected preciosFiltro: { id: FiltroPrecio; texto: string }[] = [
    { id: 'todos', texto: 'Todos' },
    { id: 'gratis', texto: 'Gratis' },
    { id: 'pago', texto: 'De pago' },
  ];
  protected barras = [38, 52, 44, 61, 58, 72, 66, 84];
  protected estilosPortada = ['auto', 'ondas', 'bloques', 'circulos'];

  // ---------- Estado ----------
  protected premium = signal(false);
  protected pestana = signal<Pestana>('explorar');
  protected tipoFiltro = signal<'Todos' | TipoRecurso>('Todos');
  protected precioFiltro = signal<FiltroPrecio>('todos');
  protected busqueda = signal('');
  protected coleccion = signal<string | null>(null);
  protected favs = signal<Record<string, boolean>>({ ...ESTADO_INICIAL_FAVS });
  protected descargados = signal<Record<string, string>>({ ...ESTADO_INICIAL_DESCARGADOS });
  protected descargando = signal<Record<string, boolean>>({});
  protected subidos = signal<MiRecurso[]>([]);
  protected ediciones = signal<
    Record<string, { titulo: string; descripcion: string; privado: boolean }>
  >({});
  protected respuestas = signal<Record<string, string>>({});
  protected respondiendoA = signal<string | null>(null);
  protected borradorRespuesta = signal('');

  // Ventanas
  protected ventanaDetalle = new EstadoVentana<string>();
  protected ventanaCompra = new EstadoVentana<string>();
  protected ventanaEdicion = new EstadoVentana<string>();
  protected ventanaPremium = new EstadoVentana<null>();
  protected confirmarCancelar = signal(false);
  protected disparo = signal(0);
  protected edTitulo = signal('');
  protected edDescripcion = signal('');
  protected edPrivado = signal(false);

  // Formulario de subida
  protected subArchivo = signal('');
  protected subTitulo = signal('');
  protected subTipo = signal<TipoRecurso>('PDF');
  protected subDePago = signal(false);
  protected subPrecio = signal('4,90');
  protected subBloqueado = signal(false);
  protected subPortadaPropia = signal('');
  protected subEstilo = signal('');

  // ---------- Datos calculados ----------
  // Tus recursos (con los cambios que hayas hecho al editar)
  protected misRecursos = computed<Item[]>(() =>
    [...this.subidos(), ...MIS_RECURSOS].map((m, i) => {
      const e = this.ediciones()[m.id];
      return {
        id: m.id,
        titulo: e?.titulo || m.titulo,
        tipo: m.tipo,
        detalle: m.detalle,
        materia: m.materia,
        autor: 'Tú',
        foto: this.fotoPerfil,
        coste: m.coste ?? 0,
        descargas: m.descargas,
        valoracion: m.descargas ? '4,8' : '—',
        mio: true,
        idx: i + 20,
        descripcion: e ? e.descripcion : m.descripcion,
        portada: m.portada,
        privado: e ? e.privado : m.privado,
        meta: m.meta,
        favs: m.favs,
        nuevo: m.nuevo,
      };
    }),
  );

  protected catalogo = computed<Item[]>(() =>
    CATALOGO.map((r: Recurso, i) => ({ ...r, mio: false, idx: i })),
  );
  protected porId = computed(() => {
    const mapa: Record<string, Item> = {};
    this.catalogo().forEach((r) => (mapa[r.id] = r));
    this.misRecursos().forEach((r) => (mapa[r.id] = r));
    return mapa;
  });
  protected coleccionActual = computed(
    () => COLECCIONES.find((c) => c.id === this.coleccion()) ?? null,
  );

  // Recursos que se muestran según la pestaña, la colección y los filtros
  protected filtrados = computed(() => {
    const nuevosPublicos = this.misRecursos().filter((r) => r.nuevo && !r.privado);
    let base: Item[] = [...nuevosPublicos, ...this.catalogo()];
    if (this.pestana() === 'descargados')
      base = this.catalogo().filter((r) => this.descargados()[r.id]);
    if (this.pestana() === 'favoritos') base = this.catalogo().filter((r) => this.favs()[r.id]);
    const col = this.coleccionActual();
    if (col) base = col.ids.map((id) => this.porId()[id]);
    const q = this.busqueda().trim().toLowerCase();
    return base.filter((r) => {
      if (this.tipoFiltro() !== 'Todos' && r.tipo !== this.tipoFiltro()) return false;
      if (this.precioFiltro() === 'gratis' && r.coste) return false;
      if (this.precioFiltro() === 'pago' && !r.coste) return false;
      return !q || (r.titulo + ' ' + r.autor + ' ' + r.materia).toLowerCase().includes(q);
    });
  });

  // Se rellena hasta completar filas de 12 con recursos "Sugerido para ti"
  protected sugeridos = computed(() => {
    const ids = this.filtrados().map((r) => r.id);
    const objetivo = Math.max(12, Math.ceil(this.filtrados().length / 12) * 12);
    return this.catalogo()
      .filter((r) => !ids.includes(r.id))
      .slice(0, objetivo - this.filtrados().length);
  });
  protected tarjetas = computed(() => [
    ...this.filtrados().map((r) => ({ r, sugerido: false })),
    ...this.sugeridos().map((r) => ({ r, sugerido: true })),
  ]);

  protected tambienInteresa = computed(() => {
    const n = this.filtrados().length;
    const necesita = n >= 9 ? 0 : n > 6 ? 3 : n > 3 ? 3 : 6;
    const ids = this.filtrados().map((r) => r.id);
    return this.catalogo()
      .filter((r) => !ids.includes(r.id))
      .slice(0, necesita);
  });

  protected cuentas = computed(() => ({
    explorar:
      this.misRecursos().filter((r) => r.nuevo && !r.privado).length + this.catalogo().length,
    mios: this.misRecursos().length,
    descargados: this.catalogo().filter((r) => this.descargados()[r.id]).length,
    favoritos: this.catalogo().filter((r) => this.favs()[r.id]).length,
  }));

  protected pestanas = computed(() => {
    const c = this.cuentas();
    return [
      { id: 'explorar' as Pestana, texto: 'Explorar', icono: 'buscar', n: c.explorar },
      { id: 'mios' as Pestana, texto: 'Mis recursos', icono: 'subir', n: c.mios },
      { id: 'descargados' as Pestana, texto: 'Descargados', icono: 'descargar', n: c.descargados },
      { id: 'favoritos' as Pestana, texto: 'Favoritos', icono: 'megusta', n: c.favoritos },
    ];
  });

  protected cabecera = computed(() => {
    const col = this.coleccionActual();
    if (col)
      return {
        titulo: col.nombre,
        texto: 'Colección privada · ' + col.ids.length + ' recursos guardados',
        coleccion: true,
      };
    const textos: Record<Pestana, [string, string]> = {
      explorar: [
        'Explorar recursos',
        'Materiales que comparten docentes de toda la red. Los de pago llevan la insignia PRO del autor.',
      ],
      mios: [
        'Mis recursos',
        this.misRecursos().length + ' recursos subidos · 3.420 descargas en total',
      ],
      descargados: ['Descargados', 'Todo lo que has descargado o comprado, siempre disponible.'],
      favoritos: ['Favoritos', 'Los recursos que has guardado para más tarde.'],
    };
    const [titulo, texto] = textos[this.pestana()];
    return { titulo, texto, coleccion: false };
  });

  protected mostrarFiltros = computed(() => this.pestana() !== 'mios' || !!this.coleccionActual());
  protected mostrarMios = computed(() => this.pestana() === 'mios' && !this.coleccionActual());

  protected colecciones = computed(() =>
    COLECCIONES.map((c) => ({
      ...c,
      activa: this.coleccion() === c.id,
      miniaturas: c.ids
        .slice(0, 3)
        .map((id, i) => ({
          src: this.portadaDe(this.porId()[id]),
          arriba: i * 6,
          izquierda: i * 10,
        }))
        .reverse(),
    })),
  );

  protected masDescargados = computed(() =>
    MAS_DESCARGADOS.map((t, i) => ({ n: i + 1, semana: t.semana, r: this.porId()[t.id] })),
  );

  protected comentarios = computed(() =>
    COMENTARIOS.map((c) => ({
      ...c,
      respuesta: this.respuestas()[c.id] ?? '',
      respondiendo: this.respondiendoA() === c.id && !this.respuestas()[c.id],
    })),
  );

  // Datos de la ventana de Premium
  protected filasPremium = computed(() =>
    this.premium()
      ? [
          {
            etiqueta: 'Recursos de pago',
            valor: this.misRecursos().filter((x) => x.coste).length + ' publicados',
          },
          { etiqueta: 'Ganado este mes', valor: '0,00 €' },
          { etiqueta: 'Próximo cobro', valor: '12 dic · 7,99 €' },
          { etiqueta: 'Método de pago', valor: 'Tarjeta ···· 4242' },
        ]
      : [
          { etiqueta: 'Tú recibes', valor: '85 % de cada venta' },
          { etiqueta: 'Comisión de LinkEdu', valor: '15 %' },
          { etiqueta: 'Insignia', valor: 'PRO en perfil y recursos' },
          { etiqueta: 'Estadísticas', valor: 'Descargas por semana' },
        ],
  );

  // ----- Ventanas -----
  protected itemDetalle = computed(() => this.porId()[this.ventanaDetalle.dato() ?? ''] ?? null);
  protected itemCompra = computed(() => this.porId()[this.ventanaCompra.dato() ?? ''] ?? null);
  protected itemEdicion = computed(() => this.porId()[this.ventanaEdicion.dato() ?? ''] ?? null);
  protected incluye = (r: Item) => INCLUYE[r.tipo];
  protected paginasMuestra = (r: Item) => [
    this.portadaCon(r, r.idx + 11),
    this.portadaCon(r, r.idx + 17),
    this.portadaCon(r, r.idx + 29),
  ];

  // Subida
  protected precioNumero = computed(() => {
    const n = parseFloat(this.subPrecio().replace(',', '.'));
    return n > 0 ? n : 0;
  });
  protected pagoActivo = computed(() => this.premium() && this.subDePago());
  protected subBloquear = computed(
    () => !this.subTitulo().trim() || (this.pagoActivo() && !this.precioNumero()),
  );
  protected portadaSubida = computed(() => {
    const titulo = this.subTitulo().trim() || 'Tu recurso';
    if (this.subPortadaPropia()) return this.confiar(this.subPortadaPropia());
    return this.confiar(portada(this.subTipo(), titulo, 1, this.subEstilo()));
  });
  protected etiquetaPortada = computed(() =>
    this.subPortadaPropia()
      ? 'Tu imagen'
      : this.subEstilo()
        ? 'Portada de LinkEdu'
        : 'Vista previa automática',
  );
  protected estilosVista = computed(() =>
    this.estilosPortada.map((p) => ({
      id: p,
      src: this.confiar(
        portada(this.subTipo(), this.subTitulo().trim() || 'Tu recurso', 1, p === 'auto' ? '' : p),
      ),
      activo:
        p === 'auto'
          ? !this.subEstilo() && !this.subPortadaPropia()
          : this.subEstilo() === p && !this.subPortadaPropia(),
    })),
  );

  // ---------- Portadas ----------
  private confiar(url: string) {
    let s = this.portadas.get(url);
    if (!s) {
      s = this.sanitizer.bypassSecurityTrustUrl(url);
      this.portadas.set(url, s);
    }
    return s;
  }

  private portadaCon(r: Item, semilla: number) {
    return this.confiar(portada(r.tipo, r.titulo, semilla, r.estilo ?? ''));
  }

  protected portadaDe(r: Item) {
    return r.portada ? this.confiar(r.portada) : this.portadaCon(r, r.idx + 3);
  }

  // ---------- Textos de las tarjetas ----------
  protected textoAccion(r: Item) {
    const ya = this.descargados()[r.id];
    if (r.mio) return 'Tu recurso';
    if (ya) return this.pestana() === 'descargados' ? 'Descargado ' + ya : 'Descargado';
    return r.coste ? 'Comprar · ' + euros(r.coste) : 'Descargar';
  }

  protected semanal(r: Item) {
    return '+' + Math.max(3, Math.round(r.descargas / 37)) + ' ESTA SEMANA';
  }

  // ===== Acciones =====
  protected elegirPestana(p: Pestana) {
    this.pestana.set(p);
    this.coleccion.set(null);
  }

  protected elegirColeccion(id: string) {
    this.coleccion.set(this.coleccion() === id ? null : id);
    this.pestana.set('explorar');
  }

  protected quitarFiltros() {
    this.tipoFiltro.set('Todos');
    this.precioFiltro.set('todos');
    this.busqueda.set('');
  }

  protected alternarFav(r: Item) {
    this.favs.update((f) => ({ ...f, [r.id]: !f[r.id] }));
    if (this.favs()[r.id])
      this.avisos.mostrar('Guardado en tus favoritos', 'megusta', 'bg-naranja text-ink');
  }

  // Pulsar el botón principal de una tarjeta
  protected accionTarjeta(r: Item) {
    if (r.mio || this.descargados()[r.id]) this.ventanaDetalle.abrir(r.id);
    else if (r.coste) this.ventanaCompra.abrir(r.id);
    else this.descargar(r);
  }

  // La descarga "tarda" un momento para que se vea la animación de progreso
  protected descargar(r: Item, compra = false) {
    if (this.descargando()[r.id]) return;
    this.descargando.update((d) => ({ ...d, [r.id]: true }));
    setTimeout(() => {
      this.descargados.update((d) => ({ ...d, [r.id]: compra ? 'hoy · comprado' : 'hoy' }));
      this.descargando.update((d) => ({ ...d, [r.id]: false }));
      this.avisos.mostrar(
        compra ? `Compra completada: «${r.titulo}»` : `«${r.titulo}» descargado`,
        'descargar',
      );
    }, 1100);
  }

  protected accionDetalle(r: Item) {
    if (r.mio) {
      this.abrirEdicion(r);
    } else if (this.descargados()[r.id]) {
      this.ventanaDetalle.cerrar();
    } else if (r.coste) {
      this.ventanaDetalle.cerrar();
      this.ventanaCompra.abrir(r.id);
    } else {
      this.ventanaDetalle.cerrar();
      this.descargar(r);
    }
  }

  protected textoAccionDetalle(r: Item) {
    if (r.mio) return 'Editar recurso';
    if (this.descargados()[r.id]) return 'Volver a descargar';
    return r.coste ? 'Comprar · ' + euros(r.coste) : 'Descargar gratis';
  }

  protected confirmarCompra(r: Item) {
    this.ventanaCompra.cerrar();
    this.disparo.update((n) => n + 1);
    this.descargar(r, true);
  }

  protected abrirEdicion(r: Item) {
    this.edTitulo.set(r.titulo);
    this.edDescripcion.set(r.descripcion ?? '');
    this.edPrivado.set(!!r.privado);
    this.ventanaDetalle.cerrar();
    this.ventanaEdicion.abrir(r.id);
  }

  protected guardarEdicion(e: Event, r: Item) {
    e.preventDefault();
    this.ediciones.update((x) => ({
      ...x,
      [r.id]: {
        titulo: this.edTitulo().trim() || r.titulo,
        descripcion: this.edDescripcion(),
        privado: this.edPrivado(),
      },
    }));
    this.ventanaEdicion.cerrar();
    this.avisos.mostrar('Cambios guardados', 'check');
  }

  protected abrirPremium() {
    this.confirmarCancelar.set(false);
    this.ventanaPremium.abrir(null);
  }

  protected accionPremium() {
    if (this.premium()) {
      if (!this.confirmarCancelar()) {
        this.confirmarCancelar.set(true);
        return;
      }
      this.premium.set(false);
      this.subDePago.set(false);
      this.ventanaPremium.cerrar();
      this.avisos.mostrar('Suscripción Premium cancelada', 'cerrar', 'bg-line text-ink');
    } else {
      this.premium.set(true);
      this.subBloqueado.set(false);
      this.disparo.update((n) => n + 1);
      this.ventanaPremium.cerrar();
      this.avisos.mostrar(
        '¡Ya eres Premium! Ya puedes vender recursos',
        'check',
        'bg-amarillo text-ink',
      );
    }
  }

  // ----- Responder comentarios -----
  protected responder(id: string) {
    this.respondiendoA.set(id);
    this.borradorRespuesta.set('');
  }

  protected enviarRespuesta(e: Event, id: string) {
    e.preventDefault();
    const texto = this.borradorRespuesta().trim();
    if (!texto) return;
    this.respuestas.update((r) => ({ ...r, [id]: texto }));
    this.respondiendoA.set(null);
    this.avisos.mostrar('Respuesta enviada', 'comentar', 'bg-azul text-white');
  }

  // ----- Subir un recurso -----
  protected elegirArchivo(e: Event) {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (!f) return;
    const ext = (f.name.split('.').pop() ?? '').toLowerCase();
    const tipos: Record<string, TipoRecurso> = {
      pptx: 'Presentación',
      ppt: 'Presentación',
      key: 'Presentación',
      mp4: 'Vídeo',
      mov: 'Vídeo',
      docx: 'Fichas',
      doc: 'Fichas',
    };
    this.subArchivo.set(f.name);
    this.subTipo.set(tipos[ext] ?? 'PDF');
    if (!this.subTitulo()) this.subTitulo.set(f.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '));
  }

  protected elegirPortada(e: Event) {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (!f) return;
    const lector = new FileReader();
    lector.onload = () => {
      this.subPortadaPropia.set(lector.result as string);
      this.subEstilo.set('');
    };
    lector.readAsDataURL(f);
  }

  protected elegirEstilo(p: string) {
    this.subEstilo.set(p === 'auto' ? '' : p);
    this.subPortadaPropia.set('');
  }

  protected ponerDePago() {
    if (this.premium()) {
      this.subDePago.set(true);
      this.subBloqueado.set(false);
    } else {
      this.subBloqueado.set(true);
    }
  }

  protected ponerGratis() {
    this.subDePago.set(false);
    this.subBloqueado.set(false);
  }

  protected publicar(e: Event) {
    e.preventDefault();
    if (this.subBloquear()) return;
    const id = 'u' + (this.subidos().length + 1);
    const nuevo: MiRecurso = {
      id,
      titulo: this.subTitulo().trim(),
      tipo: this.subTipo(),
      detalle: 'NUEVO',
      materia: 'Matemáticas · ESO',
      meta: this.subTipo() + ' · subido ahora',
      descargas: 0,
      favs: 0,
      coste: this.pagoActivo() ? this.precioNumero() : 0,
      nuevo: true,
      portada:
        this.subPortadaPropia() ||
        (this.subEstilo()
          ? portada(this.subTipo(), this.subTitulo().trim(), 1, this.subEstilo())
          : undefined),
    };
    this.subidos.update((s) => [nuevo, ...s]);
    this.pestana.set('mios');
    this.coleccion.set(null);
    this.subArchivo.set('');
    this.subTitulo.set('');
    this.subTipo.set('PDF');
    this.subDePago.set(false);
    this.subPrecio.set('4,90');
    this.subPortadaPropia.set('');
    this.subEstilo.set('');
    this.avisos.mostrar(`«${nuevo.titulo}» publicado`, 'subir', 'bg-naranja text-ink');
  }

  protected escribir(campo: { set: (v: string) => void }, e: Event) {
    campo.set((e.target as HTMLInputElement).value);
  }
}

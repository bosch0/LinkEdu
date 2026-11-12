import {
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { Avisos } from '../../compartido/avisos';
import { Icono } from '../../compartido/icono/icono';
import { EstadoVentana, Ventana } from '../../compartido/ventana/ventana';
import { Estado } from '../../datos/estado';
import { FOTOS } from '../../datos/fotos';
import {
  INVITACIONES,
  Lado,
  MALLA_GLOBAL,
  PAISES,
  PersonaRed,
  RECOMENDADOS,
} from '../../datos/red';

// El mapa mide 1000 x 480 "unidades". El zoom y el desplazamiento se guardan en esas unidades.
interface Zoom {
  z: number;
  x: number;
  y: number;
}

interface DatosMapa {
  shapes: Record<string, { land: string; hi: string }>;
  pos: Record<string, Record<string, number[]>>;
}

// Un sitio del mapa (país o ciudad) con su posición
interface Lugar {
  id: string;
  nombre: string;
  lado: Lado;
  rel: number[];
  personas: PersonaRed[];
  x: number;
  y: number;
  gapFix?: number;
}

const ETIQUETAS_RELACION = ['Mi materia', 'Proyectos', 'Grupos'];

@Component({
  selector: 'app-red',
  imports: [Icono, Ventana],
  templateUrl: './red.html',
  host: { class: 'flex flex-1 flex-col' },
})
export class Red {
  private estado = inject(Estado);
  private avisos = inject(Avisos);

  protected fotoPerfil = FOTOS.lucia;

  // ---------- Estado de la pantalla ----------
  private datos = signal<DatosMapa | null>(null);
  protected vista = signal('global'); // 'global', 'espana' o el id de otro país
  private tick = signal(0); // sube al cambiar de vista (para repetir las animaciones)
  protected filtro = signal(-1); // -1 = todos
  protected seleccion = signal<string | null>(null);
  protected hoverLugar = signal<string | null>(null);
  protected hoverRec = signal<string | null>(null);
  protected expandido = signal(false);
  protected zoom = signal<Zoom>({ z: 1, x: 0, y: 0 });
  private anchoMapa = signal(1026);
  private pintado = signal<{ view: string; z: number; x: number; y: number } | null>(null);
  protected respondidas = signal<Record<string, 'ok' | 'no'>>({});
  protected enviadas = this.estado.conectados;

  // Ventana con todos los contactos de un sitio
  protected ventanaContactos = new EstadoVentana<string>();
  protected busqueda = signal('');
  protected filtroContactos = signal(-1);
  protected mensajeAbierto = signal<string | null>(null);
  protected textoMensaje = signal('');

  // ---------- Elementos del HTML ----------
  private mapaEl = viewChild<ElementRef<HTMLElement>>('mapa');
  private tierraEl = viewChild<ElementRef<HTMLCanvasElement>>('tierra');
  private ruedaPuesta: HTMLElement | null = null;
  private observador: ResizeObserver | null = null;
  private tierraObservada: HTMLCanvasElement | null = null;
  private rutas: Record<string, { land: Path2D; hi: Path2D }> = {};
  private temporizador: ReturnType<typeof setTimeout> | undefined;
  private animacion = 0;
  private arrastre: {
    px: number;
    py: number;
    x: number;
    y: number;
    sx: number;
    sy: number;
  } | null = null;
  protected movido = false;

  constructor() {
    // Carga las formas del mapa (están en public/datos/mapa.json)
    fetch('datos/mapa.json')
      .then((r) => r.json())
      .then((d: DatosMapa) => this.datos.set(d));

    // Conecta la rueda del ratón (Ctrl + rueda = zoom) cuando el mapa existe
    effect(() => {
      const el = this.mapaEl()?.nativeElement;
      if (el && el !== this.ruedaPuesta) {
        this.ruedaPuesta = el;
        this.activarRueda(el);
      }
    });

    // Vigila el tamaño del mapa y pinta la tierra (el fondo de puntos) cuando cambia algo
    effect(() => {
      const canvas = this.tierraEl()?.nativeElement;
      if (canvas && canvas !== this.tierraObservada) {
        this.tierraObservada = canvas;
        this.observador?.disconnect();
        this.observador = new ResizeObserver(() => {
          this.anchoMapa.set(canvas.parentElement?.clientWidth || 1026);
          this.pintarTierra();
        });
        this.observador.observe(canvas.parentElement!);
      }
    });

    effect(() => {
      const view = this.vista();
      const now = this.zoom();
      if (!this.datos() || !this.tierraEl()) return;
      const hecho = untracked(() => this.pintado());
      const igual = !!hecho && hecho.view === view;
      if (igual && hecho.z === now.z && hecho.x === now.x && hecho.y === now.y) return;
      const ancho = 1000 / now.z;
      const alto = 480 / now.z;
      // Si nos salimos de lo ya pintado, se repinta ya; si no, se espera un poco
      const fuera =
        !igual ||
        now.x < hecho.x - 250 / hecho.z ||
        now.y < hecho.y - 120 / hecho.z ||
        now.x + ancho > hecho.x + 1250 / hecho.z ||
        now.y + alto > hecho.y + 600 / hecho.z;
      clearTimeout(this.temporizador);
      this.temporizador = setTimeout(() => this.pintarTierra(), fuera ? 0 : 140);
    });
  }

  // ============ Geometría del mapa ============
  private curva(a: { x: number; y: number }, b: { x: number; y: number }, curvatura: number) {
    const mx = (a.x + b.x) / 2 - (b.y - a.y) * curvatura;
    const my = (a.y + b.y) / 2 + (b.x - a.x) * curvatura;
    return `M${a.x} ${a.y}Q${mx.toFixed(1)} ${my.toFixed(1)} ${b.x} ${b.y}`;
  }

  private estiloEtiqueta(lado: Lado, hueco: number) {
    if (lado === 't')
      return `left: 50%; bottom: 100%; transform: translateX(-50%); margin-bottom: ${hueco}px`;
    if (lado === 'b')
      return `left: 50%; top: 100%; transform: translateX(-50%); margin-top: ${hueco}px`;
    if (lado === 'l')
      return `right: 100%; top: 50%; transform: translateY(-50%); margin-right: ${hueco}px`;
    return `left: 100%; top: 50%; transform: translateY(-50%); margin-left: ${hueco}px`;
  }

  // Posición (en %) de un punto del mapa según el zoom actual
  private porcentaje(p: { x: number; y: number }, v: Zoom) {
    return {
      left: (((p.x - v.x) * v.z) / 10).toFixed(2) + '%',
      top: (((p.y - v.y) * v.z) / 4.8).toFixed(2) + '%',
    };
  }

  // Rejilla de puntos (la "tierra" del mapa se dibuja con puntos)
  private rejilla(paso: number, izq: number, arriba: number, der: number, abajo: number) {
    const fila = (paso * Math.sqrt(3)) / 2;
    let out = '';
    for (let k = Math.floor(arriba / fila) - 1; k * fila <= abajo + fila; k++) {
      const desp = k % 2 ? paso / 2 : 0;
      let j = Math.floor((izq - desp) / paso) - 1;
      out += `M${(j * paso + desp).toFixed(3)} ${(k * fila).toFixed(3)}h0`;
      for (j++; j * paso + desp <= der + paso; j++) out += `m${paso} 0h0`;
    }
    return out;
  }

  private lugares(view: string, profundo: boolean): Lugar[] {
    const pos = this.datos()!.pos;
    const en = (id: string) => ({ x: pos[view][id][0], y: pos[view][id][1] });
    if (profundo) {
      return PAISES.flatMap((p) => p.ciudades.map((c) => ({ ...c, ...en(c.id) }) as Lugar));
    }
    if (view === 'global') {
      return PAISES.map((p) => {
        const rel = [0, 1, 2].map((k) => p.ciudades.reduce((s, c) => s + c.rel[k], 0));
        const personas = p.ciudades.flatMap((c) => c.personas);
        return { id: p.id, nombre: p.nombre, lado: p.lado, rel, personas, ...en(p.id) };
      });
    }
    const pais = PAISES.find((p) => p.id === view)!;
    return pais.ciudades.map((c) => ({ ...c, ...en(c.id) }) as Lugar);
  }

  // ============ Pintar la tierra en el canvas ============
  private pintarTierra() {
    const canvas = this.tierraEl()?.nativeElement;
    const datos = this.datos();
    if (!canvas || !datos || !canvas.parentElement?.clientWidth) return;
    const view = this.vista();
    const now = this.zoom();
    const formas = datos.shapes[view];
    const rutas = (this.rutas[view] ??= {
      land: new Path2D(formas.land),
      hi: new Path2D(formas.hi),
    });
    const w = canvas.parentElement.clientWidth;
    const h = canvas.parentElement.clientHeight;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * 1.5 * ratio);
    canvas.height = Math.round(h * 1.5 * ratio);
    const ctx = canvas.getContext('2d')!;
    const escala = (w / 1000) * now.z * ratio;
    const ancho = 1000 / now.z;
    const alto = 480 / now.z;
    const izq = now.x - ancho / 4;
    const arriba = now.y - alto / 4;
    ctx.setTransform(escala, 0, 0, escala, -izq * escala, -arriba * escala);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    if (view === 'espana') {
      // Recuadro de Canarias
      ctx.beginPath();
      ctx.roundRect(18, 372, 192, 100, 10);
      ctx.fillStyle = '#073157';
      ctx.fill();
      ctx.strokeStyle = '#2a6a9b';
      ctx.lineWidth = 1 / now.z;
      ctx.stroke();
    }
    const nivel = Math.floor(Math.log(now.z) / Math.LN2 + 1e-9);
    const hueco = (view === 'global' ? 7 : 8) / Math.pow(2, nivel);
    const parte = Math.log(now.z) / Math.LN2 - nivel;
    const fino = parte * parte * (3 - 2 * parte);
    const gruesa = new Path2D(
      this.rejilla(hueco, izq, arriba, izq + ancho * 1.5, arriba + alto * 1.5),
    );
    const densa =
      fino > 0
        ? new Path2D(this.rejilla(hueco / 2, izq, arriba, izq + ancho * 1.5, arriba + alto * 1.5))
        : null;
    const puntoClaro = view === 'global' ? '#7cc8f2' : '#5aa5d6';
    ctx.lineWidth = (view === 'global' ? 3.2 : 3.4) / now.z;
    (
      [
        [rutas.land, '#2f79ad'],
        [rutas.hi, puntoClaro],
      ] as [Path2D, string][]
    ).forEach(([ruta, color]) => {
      ctx.save();
      ctx.clip(ruta);
      ctx.strokeStyle = color;
      ctx.stroke(gruesa);
      if (densa) {
        ctx.globalAlpha = fino;
        ctx.stroke(densa);
      }
      ctx.restore();
    });
    const contorno = Math.min(0.35, (now.z - 1.5) / 5);
    if (contorno > 0) {
      ctx.globalAlpha = contorno;
      ctx.lineWidth = 0.8 / now.z;
      ctx.strokeStyle = '#2f79ad';
      ctx.stroke(rutas.land);
      ctx.strokeStyle = puntoClaro;
      ctx.stroke(rutas.hi);
    }
    this.pintado.set({ view, z: now.z, x: now.x, y: now.y });
  }

  // Mientras se hace zoom, el dibujo ya pintado se estira con CSS hasta que se repinta
  protected movimientoTierra = computed(() => {
    const view = this.vista();
    const now = this.zoom();
    const hecho = this.pintado();
    const px = this.anchoMapa() / 1000;
    if (!hecho || hecho.view !== view) return 'none';
    const k = now.z / hecho.z;
    const w = 1000 * px;
    const h = 480 * px;
    const dx = (hecho.x - now.x) * now.z * px + (w / 4) * (1 - k);
    const dy = (hecho.y - now.y) * now.z * px + (h / 4) * (1 - k);
    return `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px) scale(${k.toFixed(5)})`;
  });

  // ============ Zoom y arrastre ============
  private zoomEn(z: number, fx: number, fy: number) {
    const v = this.zoom();
    const nuevo = Math.min(12, Math.max(1, z));
    const limita = (n: number, max: number) => Math.min(max, Math.max(0, n));
    const ancho = 1000 / nuevo;
    const alto = 480 / nuevo;
    this.zoom.set({
      z: nuevo,
      x: limita(v.x + (fx * 1000) / v.z - fx * ancho, 1000 - ancho),
      y: limita(v.y + (fy * 480) / v.z - fy * alto, 480 - alto),
    });
  }

  // Zoom suave hacia un nivel (y, si se indica, hacia un punto)
  private deslizar(objetivo: number, hacia?: { x: number; y: number }) {
    const v = this.zoom();
    const desdeX = v.x + 500 / v.z;
    const desdeY = v.y + 240 / v.z;
    const aX = hacia ? hacia.x : desdeX;
    const aY = hacia ? hacia.y : desdeY;
    let inicio: number | null = null;
    cancelAnimationFrame(this.animacion);
    const paso = (ahora: number) => {
      if (inicio === null) inicio = ahora;
      const t = Math.min(1, (ahora - inicio) / 360);
      const e = t * (2 - t);
      const z = v.z * Math.pow(objetivo / v.z, e);
      const ancho = 1000 / z;
      const alto = 480 / z;
      const limita = (n: number, max: number) => Math.min(max, Math.max(0, n));
      this.zoom.set({
        z,
        x: limita(desdeX + (aX - desdeX) * e - ancho / 2, 1000 - ancho),
        y: limita(desdeY + (aY - desdeY) * e - alto / 2, 480 - alto),
      });
      if (t < 1) this.animacion = requestAnimationFrame(paso);
    };
    this.animacion = requestAnimationFrame(paso);
  }

  private activarRueda(el: HTMLElement) {
    let zRueda = 0;
    let fx = 0;
    let fy = 0;
    let frame = 0;
    el.addEventListener(
      'wheel',
      (e) => {
        if (!e.ctrlKey && !e.metaKey) return;
        e.preventDefault();
        const caja = el.getBoundingClientRect();
        zRueda = (zRueda || this.zoom().z) * Math.exp(-e.deltaY * 0.002);
        fx = (e.clientX - caja.left) / caja.width;
        fy = (e.clientY - caja.top) / caja.height;
        if (frame) return;
        frame = requestAnimationFrame(() => {
          frame = 0;
          this.zoomEn(zRueda, fx, fy);
          zRueda = 0;
        });
      },
      { passive: false },
    );
  }

  protected empezarArrastre(e: PointerEvent) {
    this.movido = false;
    const v = this.zoom();
    if (v.z <= 1 || (e.target as HTMLElement).closest('button')) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    const caja = (e.currentTarget as HTMLElement).getBoundingClientRect();
    this.arrastrando.set(true);
    this.arrastre = {
      px: e.clientX,
      py: e.clientY,
      x: v.x,
      y: v.y,
      sx: 1000 / v.z / caja.width,
      sy: 480 / v.z / caja.height,
    };
  }

  protected moverArrastre(e: PointerEvent) {
    const g = this.arrastre;
    if (!g) return;
    const dx = e.clientX - g.px;
    const dy = e.clientY - g.py;
    if (Math.abs(dx) + Math.abs(dy) > 4) this.movido = true;
    if (!this.movido) return;
    const v = this.zoom();
    this.zoom.set({
      z: v.z,
      x: Math.min(1000 - 1000 / v.z, Math.max(0, g.x - dx * g.sx)),
      y: Math.min(480 - 480 / v.z, Math.max(0, g.y - dy * g.sy)),
    });
  }

  protected terminarArrastre() {
    this.arrastre = null;
    this.arrastrando.set(false);
    setTimeout(() => (this.movido = false), 0);
  }

  protected acercar() {
    const v = this.zoom();
    const lugar = this.seleccion() ? this.lugarPorId(this.seleccion()!) : null;
    this.deslizar(Math.min(12, v.z * 2), v.z <= 1 ? (lugar ?? this.vm()?.centro) : undefined);
  }

  protected alejar() {
    this.deslizar(Math.max(1, this.zoom().z / 2));
  }

  private lugarPorId(id: string) {
    return this.vm()?.porId[id];
  }

  protected arrastrando = signal(false);
  protected cursor = computed(() =>
    this.zoom().z <= 1 ? 'default' : this.arrastrando() ? 'grabbing' : 'grab',
  );

  // ============ Acciones ============
  protected ir(vista: string) {
    cancelAnimationFrame(this.animacion);
    this.zoom.set({ z: 1, x: 0, y: 0 });
    this.pintado.set(null);
    this.vista.set(vista);
    this.tick.update((t) => t + 1);
    this.seleccion.set(null);
    this.hoverLugar.set(null);
    this.hoverRec.set(null);
    this.expandido.set(false);
  }

  protected elegir(id: string) {
    if (this.movido) return;
    const profundo = this.vista() === 'global' && this.zoom().z >= 5;
    if (this.vista() === 'global' && !profundo) this.ir(id);
    else this.seleccion.set(id);
  }

  protected entrar(id: string) {
    this.hoverLugar.set(id);
    this.hoverRec.set(null);
  }

  protected entrarRec(id: string) {
    this.hoverRec.set(id);
    this.hoverLugar.set(null);
  }

  protected salir() {
    this.hoverLugar.set(null);
    this.hoverRec.set(null);
  }

  protected alternarEnvio(id: string, nombre: string) {
    this.estado.alternar(this.estado.conectados, id);
    if (this.estado.conectados()[id])
      this.avisos.mostrar(`Solicitud enviada a ${nombre}`, 'conectar');
  }

  protected responder(id: string, valor: 'ok' | 'no', nombre: string) {
    this.respondidas.update((r) => ({ ...r, [id]: valor }));
    if (valor === 'ok') this.avisos.mostrar(`Ya estás conectada con ${nombre}`, 'check');
  }

  protected accionLista() {
    if (this.vm()?.hayMas) this.expandido.update((v) => !v);
    else this.ir('global');
  }

  protected abrirContactos() {
    const lugar = this.vm()?.mostrado;
    if (!lugar) return;
    this.busqueda.set('');
    this.filtroContactos.set(-1);
    this.mensajeAbierto.set(null);
    this.ventanaContactos.abrir(lugar.id);
  }

  // Contactos de la ventana (se filtran por texto y por relación)
  protected contactos = computed(() => {
    const lugar = this.vm()?.porId[this.ventanaContactos.dato() ?? ''];
    if (!lugar) return [];
    const q = this.busqueda().trim().toLowerCase();
    return lugar.personas.filter(
      (p) =>
        (this.filtroContactos() < 0 || p.relacion === this.filtroContactos()) &&
        (!q || (p.nombre + ' ' + p.cargo).toLowerCase().includes(q)),
    );
  });
  protected nombreVentana = computed(
    () => this.vm()?.porId[this.ventanaContactos.dato() ?? '']?.nombre ?? '',
  );
  protected relaciones = ETIQUETAS_RELACION;

  protected escribirBusqueda(e: Event) {
    this.busqueda.set((e.target as HTMLInputElement).value);
  }

  protected escribirMensaje(e: Event) {
    this.textoMensaje.set((e.target as HTMLInputElement).value);
  }

  protected abrirMensaje(nombre: string) {
    this.textoMensaje.set('');
    this.mensajeAbierto.update((m) => (m === nombre ? null : nombre));
  }

  protected enviarMensaje(e: Event, nombre: string) {
    e.preventDefault();
    if (!this.textoMensaje().trim()) return;
    this.mensajeAbierto.set(null);
    this.avisos.mostrar(`Mensaje enviado a ${nombre}`, 'mensajes', 'bg-azul text-white');
  }

  // ============ Todo lo que se pinta (se recalcula solo cuando cambia algo) ============
  protected vm = computed(() => {
    const datos = this.datos();
    if (!datos) return null;
    const view = this.vista();
    const tick = this.tick();
    const filtro = this.filtro();
    const sel = this.seleccion();
    const hoverLugar = this.hoverLugar();
    const hoverRec = this.hoverRec();
    const enviadas = this.enviadas();
    const respondidas = this.respondidas();
    const expandido = this.expandido();
    const now = this.zoom();
    const anchoPx = this.anchoMapa();

    const profundo = view === 'global' && now.z >= 5;
    const lugares = this.lugares(view, profundo);
    const porId: Record<string, Lugar> = {};
    lugares.forEach((c) => (porId[c.id] = c));
    const cuenta = (c: Lugar) => (filtro < 0 ? c.rel[0] + c.rel[1] + c.rel[2] : c.rel[filtro]);
    const centro = lugares[0];
    const esInicio = view === 'global' || view === 'espana';
    const enVista = RECOMENDADOS.filter((r) => profundo || r.vista === view);
    const recActiva = enVista.find((r) => r.id === hoverRec) ?? null;
    const foco = recActiva ? null : (hoverLugar ?? sel);
    const esFoco = (id: string) => foco === id;
    const viaDe = (r: (typeof RECOMENDADOS)[number]) => (profundo ? (r.viaCiudad ?? r.via) : r.via);

    // ----- líneas y pulsos -----
    const estadoLinea = (toca: boolean, enCamino: boolean, n: number, base: number) => {
      if (n === 0) return { stroke: '#d6e9f7', opacity: 0.06 };
      if (recActiva)
        return enCamino ? { stroke: '#fcb527', opacity: 1 } : { stroke: '#d6e9f7', opacity: 0.12 };
      if (toca) return { stroke: '#fcb527', opacity: 1 };
      return { stroke: '#d6e9f7', opacity: base };
    };
    const lineas: {
      d: string;
      punteada: boolean;
      stroke: string;
      opacity: number;
      ancho: string;
      retraso: number;
    }[] = [];
    const pulsos: {
      d: string;
      dash: string;
      ancho: string;
      opacity: number;
      retraso: number;
      duracion: number;
    }[] = [];
    const malla = profundo
      ? PAISES.flatMap((p) => p.malla)
      : view === 'global'
        ? MALLA_GLOBAL
        : PAISES.find((p) => p.id === view)!.malla;
    malla.forEach((par, i) => {
      const a = porId[par[0]];
      const b = porId[par[1]];
      const n = Math.min(cuenta(a), cuenta(b));
      const st = estadoLinea(foco === a.id || foco === b.id, false, n, 0.45);
      lineas.push({
        d: this.curva(a, b, -0.1),
        punteada: false,
        stroke: st.stroke,
        opacity: st.opacity,
        ancho: (1.2 / now.z).toFixed(2),
        retraso: 900 + i * 60,
      });
    });
    const escalaAncho = view === 'global' && !profundo ? 4 : 10;
    lugares.slice(1).forEach((c, i) => {
      const n = cuenta(c);
      const enCamino = !!recActiva && viaDe(recActiva) === c.id;
      const st = estadoLinea(
        foco === centro.id || foco === c.id,
        enCamino,
        n,
        profundo ? 0.4 : 0.75,
      );
      const d = this.curva(centro, c, view === 'global' ? 0.16 : 0.1);
      lineas.push({
        d,
        punteada: false,
        stroke: st.stroke,
        opacity: st.opacity,
        ancho: ((profundo ? 1 : 1.2 + n / escalaAncho) / now.z).toFixed(2),
        retraso: profundo ? i * 12 : i * 70,
      });
      if (n > 0 && (!profundo || i < 12)) {
        pulsos.push({
          d,
          dash: (0.035 / now.z).toFixed(4) + ' ' + (1 - 0.035 / now.z).toFixed(4),
          ancho: (3.2 / now.z).toFixed(2),
          opacity: st.opacity < 0.3 ? 0.2 : 0.9,
          retraso: i * 530,
          duracion: 3.4 + (i % 4) * 0.7,
        });
      }
    });
    enVista.forEach((r) => {
      const activa = recActiva === r;
      const p = datos.pos[view][r.id];
      lineas.push({
        d: this.curva(porId[viaDe(r)], { x: p[0], y: p[1] }, 0.18),
        punteada: !enviadas[r.id],
        stroke: '#fb8d2b',
        opacity: recActiva && !activa ? 0.2 : 1,
        ancho: ((activa ? 2.6 : 1.8) / now.z).toFixed(2),
        retraso: 0,
      });
    });

    // ----- bolas, etiquetas (se colocan evitando que se pisen) -----
    const encoge = profundo ? Math.max(0.65, Math.min(1, now.z / 8)) : 1;
    const hubPx = Math.round(48 * encoge);
    const px = anchoPx / 1000;
    const pantalla = (p: { x: number; y: number }) => ({
      x: (p.x - now.x) * now.z * px,
      y: (p.y - now.y) * now.z * px,
    });
    const mapaW = 1000 * px;
    const mapaH = 480 * px;
    const ocupados: { x: number; y: number; w: number; h: number }[] = [];
    const choca = (b: { x: number; y: number; w: number; h: number }) =>
      ocupados.some(
        (o) => b.x < o.x + o.w && o.x < b.x + b.w && b.y < o.y + o.h && o.y < b.y + b.h,
      );
    const cajaEtiqueta = (
      at: { x: number; y: number },
      lado: Lado,
      texto: string,
      hueco: number,
    ) => {
      const w = texto.length * 7.4 + 8;
      const h = 18;
      if (lado === 't') return { x: at.x - w / 2, y: at.y - hueco - h, w, h };
      if (lado === 'b') return { x: at.x - w / 2, y: at.y + hueco, w, h };
      if (lado === 'l') return { x: at.x - hueco - w, y: at.y - h / 2, w, h };
      return { x: at.x + hueco, y: at.y - h / 2, w, h };
    };
    const opuesto: Record<Lado, Lado> = { t: 'b', b: 't', l: 'r', r: 'l' };
    const colocar = (
      p: { x: number; y: number; gapFix?: number },
      lado: Lado,
      texto: string,
      hueco: number,
      forzar: boolean,
    ) => {
      const at = pantalla(p);
      const orden: Lado[] = [
        lado,
        opuesto[lado],
        ...((lado === 't' || lado === 'b' ? ['r', 'l'] : ['t', 'b']) as Lado[]),
      ];
      const libre = (b: { x: number; y: number; w: number; h: number }) => {
        const bajoZoom = b.x + b.w > mapaW - 70 && b.y < 130;
        return (
          b.x >= 0 && b.y >= 0 && b.x + b.w <= mapaW && b.y + b.h <= mapaH && !bajoZoom && !choca(b)
        );
      };
      for (let i = 0; i < 4; i++) {
        const caja = cajaEtiqueta(at, orden[i], texto, hueco);
        if (libre(caja)) {
          ocupados.push(caja);
          return this.estiloEtiqueta(orden[i], hueco - (p.gapFix || 0));
        }
      }
      return this.estiloEtiqueta(lado, hueco - (p.gapFix || 0)) + (forzar ? '' : '; display: none');
    };
    const atenuado = (c: Lugar) =>
      cuenta(c) === 0 ? 0.35 : recActiva && viaDe(recActiva) !== c.id ? 0.4 : 1;
    const nodosLugares = esInicio ? lugares.slice(1) : lugares;
    const tamBola = (c: Lugar) => {
      const n = cuenta(c);
      const tam =
        view === 'global' ? (profundo ? 16 : 20) + Math.sqrt(n) * 2.4 : 18 + Math.sqrt(n) * 4;
      return Math.max(18, Math.round((n === 0 ? 20 : tam) * encoge));
    };
    const hubAt = pantalla(centro);
    if (esInicio)
      ocupados.push({ x: hubAt.x - hubPx / 2, y: hubAt.y - hubPx / 2, w: hubPx, h: hubPx + 24 });
    nodosLugares.forEach((c) => {
      const at = pantalla(c);
      const r = tamBola(c) / 2;
      ocupados.push({ x: at.x - r, y: at.y - r, w: r * 2, h: r * 2 });
    });
    const etiquetaDe: Record<string, string> = {};
    nodosLugares
      .slice()
      .sort((a, b) => (esFoco(b.id) ? 1 : 0) - (esFoco(a.id) ? 1 : 0) || cuenta(b) - cuenta(a))
      .forEach((c) => {
        etiquetaDe[c.id] = colocar(
          { ...c, gapFix: 22 },
          c.lado || 'r',
          c.nombre,
          tamBola(c) / 2 + 1,
          esFoco(c.id),
        );
      });
    const porPais = view === 'global' && !profundo;
    const nodos = nodosLugares.map((c, i) => {
      const n = cuenta(c);
      const caja = this.porcentaje(c, now);
      const at = pantalla(c);
      return {
        id: c.id,
        nombre: c.nombre,
        n: String(n),
        activo: esFoco(c.id),
        aria: `${c.nombre}, ${n} contactos${porPais ? '. Abrir su mapa' : ''}`,
        left: caja.left,
        top: caja.top,
        tab: at.x >= 0 && at.y >= 0 && at.x <= mapaW && at.y <= mapaH ? 0 : -1,
        tam: tamBola(c),
        opacity: atenuado(c),
        retraso: profundo ? i * 12 : 260 + i * 70,
        etiqueta: etiquetaDe[c.id],
      };
    });
    const hubCaja = this.porcentaje(centro, now);
    const hub = {
      id: centro.id,
      px: hubPx,
      mostrar: esInicio,
      nombre: centro.nombre,
      n: String(cuenta(centro)),
      activo: esFoco(centro.id),
      aria: `${centro.nombre}, ${porPais ? 'tu país, ' : 'tu ciudad, '}${cuenta(centro)} contactos`,
      left: hubCaja.left,
      top: hubCaja.top,
    };

    // ----- lista de países/ciudades -----
    const ordenados = lugares.slice().sort((a, b) => cuenta(b) - cuenta(a));
    const maximo = Math.max(cuenta(ordenados[0]), 1);
    const sustantivo = porPais ? 'países' : 'ciudades';
    const filas = (expandido ? ordenados : ordenados.slice(0, 5)).map((c) => ({
      id: c.id,
      nombre: c.nombre,
      n: String(cuenta(c)),
      activa: sel === c.id,
      resaltada: hoverLugar === c.id,
      pct: Math.round((cuenta(c) / maximo) * 100) + '%',
    }));
    const hayMas = ordenados.length > 5;
    const lista = {
      titulo: 'Tus ' + sustantivo,
      filas,
      accion: hayMas
        ? expandido
          ? 'Ver menos'
          : 'Ver ' + (porPais ? 'todos' : 'todas') + ' (' + ordenados.length + ')'
        : 'Volver al mapa global',
    };

    // ----- filtros y zonas del mapa -----
    const filtros = [-1, 0, 1, 2].map((id) => ({
      id,
      etiqueta: id < 0 ? 'Todos' : ETIQUETAS_RELACION[id],
      activo: filtro === id,
    }));
    const extranjero = view !== 'global' && view !== 'espana';
    const listaZonas: [string, string][] = [
      ['global', 'Global'],
      ['espana', 'Mi país'],
    ];
    if (extranjero) listaZonas.push([view, PAISES.find((c) => c.id === view)!.nombre]);
    const zonas = listaZonas.map((s) => ({ id: s[0], etiqueta: s[1], activa: view === s[0] }));

    // ----- panel de detalle -----
    const mostrado = porId[hoverLugar ?? sel ?? ''] ?? centro;
    const total = mostrado.rel[0] + mostrado.rel[1] + mostrado.rel[2];
    const coinciden = mostrado.personas.filter((p) => filtro < 0 || p.relacion === filtro);
    const personas = (coinciden.length ? coinciden : mostrado.personas).slice(0, 3);
    const partes = `${mostrado.rel[0]} de tu materia · ${mostrado.rel[1]} en proyectos · ${mostrado.rel[2]} en grupos`;
    const detalle = {
      nombre: mostrado.nombre,
      contador: filtro < 0 ? total + ' contactos' : cuenta(mostrado) + ' de ' + total,
      resumen:
        filtro < 0
          ? partes
          : coinciden.length
            ? 'Con este filtro: ' + ETIQUETAS_RELACION[filtro].toLowerCase()
            : 'Nadie con este filtro. Otros contactos aquí:',
      accion:
        cuenta(mostrado) === 1
          ? 'Ver 1 contacto'
          : 'Ver los ' + (cuenta(mostrado) || total) + ' contactos',
      personas,
    };

    // ----- recomendados -----
    const ordenRecs = enVista.concat(RECOMENDADOS.filter((r) => !enVista.includes(r)));
    const recs = ordenRecs.map((r) => ({
      id: r.id,
      nombre: r.nombre,
      cargo: r.materia + ' · ' + (r.pais || r.ciudad),
      motivo: `Vía ${r.puente} · ${r.enComun} en común`,
      foto: r.foto,
      enviada: !!enviadas[r.id],
      resaltada: hoverRec === r.id,
    }));
    const nodosRec = enVista.map((r) => {
      const p = datos.pos[view][r.id];
      const caja = this.porcentaje({ x: p[0], y: p[1] }, now);
      const activo = recActiva === r;
      const texto = r.pais && !profundo ? r.pais : r.ciudad;
      return {
        ciudad: texto,
        left: caja.left,
        top: caja.top,
        enviada: !!enviadas[r.id],
        escala: activo ? 1.5 : 1,
        opacity: recActiva && !activo ? 0.3 : 1,
        etiqueta: colocar({ x: p[0], y: p[1] }, r.lado, texto, 9, activo),
      };
    });

    // ----- invitaciones y números -----
    const invitaciones = INVITACIONES.map((v) => ({ ...v, respuesta: respondidas[v.id] ?? null }));
    const aceptadas = Object.values(respondidas).filter((v) => v === 'ok').length;
    const stats = {
      total: String(
        lugares.reduce((s, c) => s + cuenta(c), 0) + (esInicio && filtro < 0 ? aceptadas : 0),
      ),
      lugares: String(lugares.filter((c) => cuenta(c) > 0).length),
      etiquetaLugares: sustantivo,
      enviadas: String(Object.values(enviadas).filter(Boolean).length),
      pendientes: String(INVITACIONES.length - Object.keys(respondidas).length),
    };

    const pais = PAISES.find((c) => c.id === view);
    const insetPos = this.porcentaje({ x: 26, y: 376 }, now);
    const mapa = {
      caja: `${now.x.toFixed(1)} ${now.y.toFixed(1)} ${(1000 / now.z).toFixed(1)} ${(480 / now.z).toFixed(1)}`,
      marGX: (-(now.x * now.z * px) % 21).toFixed(1) + 'px',
      marGY: (-(now.y * now.z * px) % 21).toFixed(1) + 'px',
      canariasLeft: insetPos.left,
      canariasTop: insetPos.top,
      canarias: view === 'espana',
    };
    const atMin = now.z <= 1;
    const atMax = now.z >= 12;

    return {
      tick,
      titulo: view === 'global' ? 'Tu red en el mundo' : 'Tu red en ' + pais!.nombre,
      pista: porPais
        ? 'Elige un país para ver a quién tienes allí.'
        : 'Elige una ciudad para ver a quién tienes allí.',
      porId,
      centro,
      hayMas,
      mostrado,
      stats,
      lista,
      filtros,
      zonas,
      mapa,
      lineas,
      pulsos,
      nodos,
      hub,
      nodosRec,
      detalle,
      recs,
      invitaciones,
      zoomEtiqueta: Math.round(now.z * 100) + '%',
      enMin: atMin,
      enMax: atMax,
    };
  });
}

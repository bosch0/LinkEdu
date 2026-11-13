import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ABRE_PERFIL } from '../../compartido/abre-perfil';
import { Avisos } from '../../compartido/avisos';
import { DatosFlujo, Flujo } from '../../compartido/flujo/flujo';
import { Icono } from '../../compartido/icono/icono';
import { EstadoVentana, Ventana } from '../../compartido/ventana/ventana';
import { Estado } from '../../datos/estado';
import { ESTADISTICAS, MAS_VISITANTES, miles } from '../../datos/estadisticas';
import { FOTOS } from '../../datos/fotos';
import {
  EXTRAS,
  NOMBRES,
  PERFILES,
  PERSONAS_COMPARTIR,
  SEMILLAS_COMENTARIOS,
  TipoPerfil,
  VALIDACIONES_EMPRESA,
} from '../../datos/perfil';
import { perfilDe, rutaPerfilDeFoto } from '../../datos/personas';

@Component({
  selector: 'app-perfil',
  imports: [RouterLink, Icono, Ventana, Flujo, ABRE_PERFIL],
  templateUrl: './perfil.html',
  host: { class: 'flex flex-1 flex-col' },
})
export class Perfil {
  private avisos = inject(Avisos);
  private estado = inject(Estado);

  protected tipos: TipoPerfil[] = ['Profesora', 'Alumno', 'Empresa'];
  protected fotoLucia = FOTOS.lucia;
  protected fotoAlex = FOTOS.alex;
  protected visibilidades = ['Todo LinkEdu', 'Solo mis contactos'];
  protected personasCompartir = PERSONAS_COMPARTIR.map((p) => ({
    ...p,
    nombre: NOMBRES[p.id],
    foto: (FOTOS as Record<string, string>)[p.id],
  }));

  // Id de la persona cuando se abre /perfil/:id (sin id = tu perfil, con el selector de ejemplos)
  id = input<string>();
  protected rutaPerfil = rutaPerfilDeFoto;

  // ---------- Estado ----------
  protected tipo = signal<TipoPerfil>('Profesora');
  // Perfil de otra persona (null = el tuyo o uno de los ejemplos)
  protected otro = computed(() => {
    const id = this.id();
    return id && id !== 'lucia' ? perfilDe(id) : null;
  });
  // Clave para guardar el estado de cada perfil por separado (pestaña, me gusta, seguir...)
  protected clave = computed(() => (this.otro() ? 'p:' + this.id() : this.tipo()));
  private pestanaPorTipo = signal<Record<string, string>>({});
  protected meGusta = signal<Record<string, boolean>>({});
  protected abiertos = signal<Record<string, boolean>>({});
  protected propios = signal<Record<string, string[]>>({});
  protected borradores = signal<Record<string, string>>({});
  protected siguiendo = signal<Record<string, boolean>>({});
  protected siguiendoLateral = signal<Record<string, boolean>>({});
  protected inscritas = signal<Record<string, boolean>>({});
  protected ediciones = signal<Record<string, { titular: string; acerca: string }>>({});
  protected copiado = signal(false);
  protected enviados = signal<Record<string, boolean>>({});
  protected mensajesChat = signal<string[]>([]);
  protected borradorChat = signal('');

  // Ventanas
  protected vOferta = new EstadoVentana<number>();
  protected vEditar = new EstadoVentana<null>();
  protected vCompartir = new EstadoVentana<string>();
  protected vChat = new EstadoVentana<null>();
  protected edTitular = signal('');
  protected edAcerca = signal('');
  protected edVis = signal('Todo LinkEdu');

  // Resumen de Estadísticas (últimos 7 días). Solo sale en tu propio perfil de profesora.
  private semana = ESTADISTICAS['7 días'];
  private suma = (l: number[]) => l.reduce((a, b) => a + b, 0);
  protected resumen = [
    {
      icono: 'perfil',
      n: this.suma(this.semana.series.visitas),
      texto: 'visitas al perfil',
      ayuda: 'Descubre quién ha visto tu perfil.',
    },
    {
      icono: 'compartir',
      n: this.suma(this.semana.series.impresiones),
      texto: 'impresiones de tus publicaciones',
      ayuda: 'Mira quién interactúa con lo que compartes.',
    },
    {
      icono: 'buscar',
      n: this.semana.busquedas,
      texto: 'apariciones en búsquedas',
      ayuda: 'Cuántas veces sales cuando buscan docentes.',
    },
  ];
  protected masVisitantes = MAS_VISITANTES;
  protected miles = miles;
  protected verEstadisticas = computed(() => !this.otro() && this.tipo() === 'Profesora');

  // ---------- Datos calculados ----------
  protected perfil = computed(() => {
    const base = this.otro()?.perfil ?? PERFILES[this.tipo()];
    const e = this.ediciones()[this.clave()];
    return { ...base, titular: e?.titular ?? base.titular, acerca: e?.acerca ?? base.acerca };
  });
  protected extras = computed(() => this.otro()?.extras ?? EXTRAS[this.tipo()]);
  protected pestana = computed(
    () => this.pestanaPorTipo()[this.clave()] ?? this.perfil().pestanas[0][0],
  );

  protected habilidades = computed(() =>
    this.perfil().habilidades.map((h, i) => ({
      ...h,
      n: this.perfil().esPersona ? h.n : (VALIDACIONES_EMPRESA[h.nombre] ?? h.n),
      primero: i === 0,
    })),
  );

  protected publicaciones = computed(() =>
    this.perfil().publicaciones.map((p, i) => {
      const clave = this.clave() + i;
      const mios = this.propios()[clave] ?? [];
      return {
        ...p,
        clave,
        meGusta: !!this.meGusta()[clave],
        likes: p.likes + (this.meGusta()[clave] ? 1 : 0),
        abierto: !!this.abiertos()[clave],
        comentarios: p.comentarios + mios.length,
        hilo: [
          ...SEMILLAS_COMENTARIOS[i % 2],
          ...mios.map((texto) => ({ foto: FOTOS.lucia, nombre: 'Tú', texto })),
        ],
        borrador: this.borradores()[clave] ?? '',
      };
    }),
  );

  protected ofertas = computed(() =>
    (this.perfil().ofertas ?? []).map((o, i) => ({
      ...o,
      i,
      inscrita: !!this.inscritas()[i] || (i === 0 && this.estado.inscritaPitagoras()),
    })),
  );

  protected datosFlujo = computed<DatosFlujo | null>(() => {
    const i = this.vOferta.dato();
    const o = i === null ? null : this.perfil().ofertas?.[i];
    if (!o) return null;
    return {
      titulo: o.titulo,
      kickers: [o.tipo, 'INSCRIPCIÓN · PASO 2 DE 2', 'INSCRIPCIÓN ENVIADA'],
      logo: FOTOS.pitagoras,
      logoEncaja: 'object-contain',
      organizacion: 'Academia Pitágoras',
      meta: o.meta,
      grande: o.pago,
      descripcion: o.desc,
      puntos: [...o.ventajas, o.encaje],
      botonSolicitar: 'Inscribirme',
      botonEnviar: 'Enviar candidatura',
      etiquetaMensaje: 'Mensaje para la academia',
      ayudaMensaje: 'Cuéntales en dos frases por qué encajas.',
      consentimiento:
        'Acepto que Academia Pitágoras vea mi perfil completo y mis datos de contacto para esta oferta.',
      textoFinal: 'Candidatura enviada. Puedes seguir su estado desde Empleo.',
    };
  });
  protected ofertaYaInscrita = computed(() => {
    const i = this.vOferta.dato();
    return i !== null && (!!this.inscritas()[i] || (i === 0 && this.estado.inscritaPitagoras()));
  });

  // Acciones del encabezado (cambian según sea tu perfil, el de otra persona o una empresa)
  protected accionPrincipal = computed(() => {
    const p = this.perfil();
    const sigue = !!this.siguiendo()[this.clave()];
    if (p.propio)
      return {
        texto: 'Editar perfil',
        icono: 'ajustes',
        activa: false,
        segundo: 'Compartir perfil',
        iconoSegundo: 'compartir',
      };
    if (p.esPersona)
      return {
        texto: sigue ? 'Solicitud enviada' : 'Conectar',
        icono: sigue ? 'check' : 'conectar',
        activa: sigue,
        segundo: 'Mensaje',
        iconoSegundo: 'mensajes',
      };
    return {
      texto: sigue ? 'Siguiendo' : 'Seguir',
      icono: sigue ? 'check' : 'mas',
      activa: sigue,
      segundo: 'Ver ofertas',
      iconoSegundo: 'empleo',
    };
  });

  protected conversacion = computed(() => {
    const otro = this.otro()?.perfil;
    if (otro && otro.esPersona) {
      const saludo = {
        mio: false,
        texto: `¡Hola, Lucía! Gracias por pasarte por mi perfil. ¿Te apetece que colaboremos en algún proyecto?`,
        hora: 'Ayer, 17:45',
      };
      return [saludo, ...this.mensajesChat().map((texto) => ({ mio: true, texto, hora: 'Ahora' }))];
    }
    const base = [
      {
        mio: false,
        texto:
          '¡Hola, Lucía! Vi tu taller de estadística. ¿Lo podríamos usar en nuestro proyecto de clase?',
        hora: 'Ayer, 18:02',
      },
      { mio: true, texto: 'Claro, Álex. Te paso las fichas y lo hablamos.', hora: 'Ayer, 18:30' },
    ];
    return [...base, ...this.mensajesChat().map((texto) => ({ mio: true, texto, hora: 'Ahora' }))];
  });

  protected enlace = computed(
    () =>
      'linkedu.es/' +
      (this.otro()
        ? this.perfil()
            .nombre.toLowerCase()
            .normalize('NFD')
            .replace(/[̀-ͯ]/g, '')
            .split(' ')
            .slice(0, 2)
            .join('-')
        : this.tipo() === 'Empresa'
          ? 'empresa/academia-pitagoras'
          : this.tipo() === 'Alumno'
            ? 'alex-romero'
            : 'lucia-fernandez'),
  );

  // ===== Acciones =====
  protected elegirPestana(id: string) {
    this.pestanaPorTipo.update((p) => ({ ...p, [this.clave()]: id }));
  }

  protected pulsarPrincipal() {
    const p = this.perfil();
    if (p.propio) {
      this.edTitular.set(p.titular);
      this.edAcerca.set(p.acerca);
      this.vEditar.abrir(null);
    } else {
      this.siguiendo.update((s) => ({ ...s, [this.clave()]: !s[this.clave()] }));
      if (this.siguiendo()[this.clave()])
        this.avisos.mostrar(
          p.esPersona ? `Solicitud enviada a ${p.nombre}` : `Ahora sigues a ${p.nombre}`,
          p.esPersona ? 'conectar' : 'check',
        );
    }
  }

  protected pulsarSegundo() {
    const p = this.perfil();
    if (p.propio) this.abrirCompartir('tu perfil');
    else if (p.esPersona) this.vChat.abrir(null);
    else this.elegirPestana('offers');
  }

  protected abrirCompartir(que: string) {
    this.copiado.set(false);
    this.enviados.set({});
    this.vCompartir.abrir(que);
  }

  protected copiar() {
    this.copiado.set(true);
    this.avisos.mostrar('Enlace copiado al portapapeles', 'compartir', 'bg-amarillo text-ink');
  }

  protected enviarA(id: string, nombre: string) {
    this.enviados.update((e) => ({ ...e, [id]: true }));
    this.avisos.mostrar(`Enviado a ${nombre}`, 'mensajes', 'bg-azul text-white');
  }

  protected guardarEdicion(e: Event) {
    e.preventDefault();
    this.ediciones.update((x) => ({
      ...x,
      [this.clave()]: {
        titular: this.edTitular().trim() || this.perfil().titular,
        acerca: this.edAcerca().trim() || this.perfil().acerca,
      },
    }));
    this.vEditar.cerrar();
    this.avisos.mostrar('Perfil actualizado', 'check');
  }

  protected alternarMeGusta(clave: string) {
    this.meGusta.update((m) => ({ ...m, [clave]: !m[clave] }));
  }

  protected alternarComentarios(clave: string) {
    this.abiertos.update((m) => ({ ...m, [clave]: !m[clave] }));
  }

  protected enviarComentario(e: Event, clave: string) {
    e.preventDefault();
    const texto = (this.borradores()[clave] ?? '').trim();
    if (!texto) return;
    this.propios.update((p) => ({ ...p, [clave]: [...(p[clave] ?? []), texto] }));
    this.borradores.update((b) => ({ ...b, [clave]: '' }));
  }

  protected escribirComentario(clave: string, e: Event) {
    const v = (e.target as HTMLInputElement).value;
    this.borradores.update((b) => ({ ...b, [clave]: v }));
  }

  protected alternarLateral(id: string, nombre: string) {
    const clave = this.clave() + id;
    this.siguiendoLateral.update((s) => ({ ...s, [clave]: !s[clave] }));
    if (this.siguiendoLateral()[clave]) this.avisos.mostrar(`Ahora sigues a ${nombre}`, 'check');
  }

  protected inscripcionEnviada() {
    const i = this.vOferta.dato();
    if (i === null) return;
    this.inscritas.update((x) => ({ ...x, [i]: true }));
    if (i === 0) this.estado.inscritaPitagoras.set(true);
    this.avisos.mostrar('Candidatura enviada', 'check');
  }

  protected enviarChat(e: Event) {
    e.preventDefault();
    const texto = this.borradorChat().trim();
    if (!texto) return;
    this.mensajesChat.update((m) => [...m, texto]);
    this.borradorChat.set('');
  }

  protected escribir(campo: { set: (v: string) => void }, e: Event) {
    campo.set((e.target as HTMLInputElement).value);
  }
}

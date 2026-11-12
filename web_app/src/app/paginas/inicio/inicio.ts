import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Avisos } from '../../compartido/avisos';
import { Flujo } from '../../compartido/flujo/flujo';
import { Icono } from '../../compartido/icono/icono';
import { EstadoVentana, Ventana } from '../../compartido/ventana/ventana';
import {
  DOCENTES_SUGERIDOS,
  ETIQUETAS_TIPO,
  EVENTOS,
  FLUJO_CIENCIA,
  FLUJO_PITAGORAS,
  GRUPOS,
  MIS_PROYECTOS,
  PUBLICACIONES,
  Publicacion,
  RECURSOS_MATERIA,
  SEMANA,
  TipoPublicacion,
  ULTIMOS_DEL_GRUPO,
} from '../../datos/inicio';
import { Estado } from '../../datos/estado';
import { FOTOS } from '../../datos/fotos';

/** Una publicación del muro con su propio estado (me gusta, comentarios...). */
class Post {
  meGusta = signal(false);
  abierto = signal(false); // ¿comentarios desplegados?
  compartido = signal(false);
  propios = signal<string[]>([]); // comentarios escritos por ti
  borrador = signal('');

  likes = computed(() => this.datos.megusta + (this.meGusta() ? 1 : 0));
  totalComentarios = computed(() => this.datos.comentarios + this.propios().length);
  hilo = computed(() => [
    ...this.datos.hilo,
    ...this.propios().map((texto) => ({ foto: FOTOS.lucia, nombre: 'Tú', texto })),
  ]);

  constructor(public datos: Publicacion) {}
}

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, Icono, Ventana, Flujo],
  templateUrl: './inicio.html',
  host: { class: 'flex flex-1 flex-col' },
})
export class Inicio {
  protected estado = inject(Estado);
  private avisos = inject(Avisos);

  // Datos de prueba
  protected foto = FOTOS.lucia;
  protected fotoPitagoras = FOTOS.pitagoras;
  protected proyectosFijos = MIS_PROYECTOS;
  protected recursos = RECURSOS_MATERIA;
  protected docentes = DOCENTES_SUGERIDOS;
  protected eventos = EVENTOS;
  protected semana = SEMANA;
  protected tipos = Object.keys(ETIQUETAS_TIPO) as TipoPublicacion[];
  protected etiquetas = ETIQUETAS_TIPO;
  protected ultimosDelGrupo = ULTIMOS_DEL_GRUPO;
  protected flujoCiencia = FLUJO_CIENCIA;
  protected flujoPitagoras = FLUJO_PITAGORAS;
  protected avatares = [
    { foto: FOTOS.marta, nombre: 'Marta Ruiz' },
    { foto: FOTOS.carlos, nombre: 'Carlos Pérez' },
    { foto: FOTOS.nuria, nombre: 'Nuria Gil' },
  ];

  // ----- Compositor -----
  protected tipo = signal<TipoPublicacion>('Recurso');
  protected borrador = signal('');
  protected muro = signal<Post[]>([]); // tus publicaciones nuevas
  protected feed = PUBLICACIONES.map((p) => new Post(p));
  // Primero las tuyas y después las de los demás
  protected publicaciones = computed(() => [...this.muro(), ...this.feed]);

  // ----- Grupos -----
  protected misGrupos = computed(() => GRUPOS.filter((g) => this.estado.gruposUnidos()[g.id]));
  // El dato de la ventana es el id del grupo; null = "explorar todos"
  protected ventanaGrupos = new EstadoVentana<string | null>();
  protected grupoSeleccionado = computed(
    () => GRUPOS.find((g) => g.id === this.ventanaGrupos.dato()) ?? null,
  );
  protected gruposEnVentana = computed(() => {
    const uno = this.grupoSeleccionado();
    return uno ? [uno] : GRUPOS;
  });

  // ----- Proyectos creados -----
  protected ventanaCrear = new EstadoVentana<null>();
  protected nombreProyecto = signal('');
  protected visibilidad = signal<'Público' | 'Privado'>('Público');
  protected visibilidades: ('Público' | 'Privado')[] = ['Público', 'Privado'];
  protected puedeCrear = computed(() => this.nombreProyecto().trim().length > 0);

  // ----- Ventanas de solicitud en dos pasos -----
  protected ventanaCiencia = new EstadoVentana<null>();
  protected ventanaOferta = new EstadoVentana<null>();

  // ===== Acciones =====
  protected publicar(e: Event) {
    e.preventDefault();
    const texto = this.borrador().trim();
    if (!texto) return;
    const nuevo = new Post({
      id: 'mio-' + Date.now(),
      foto: FOTOS.lucia,
      nombre: 'Lucía Fernández Ortega',
      meta: 'Profesora de Matemáticas · ahora',
      texto,
      etiqueta: { texto: this.tipo(), clases: ETIQUETAS_TIPO[this.tipo()].clases },
      megusta: 0,
      comentarios: 0,
      hilo: [],
    });
    this.muro.update((m) => [nuevo, ...m]);
    this.borrador.set('');
    this.avisos.mostrar('Publicación compartida con tu claustro');
  }

  protected escribirBorrador(e: Event) {
    this.borrador.set((e.target as HTMLInputElement).value);
  }

  protected alternarMeGusta(p: Post) {
    p.meGusta.update((v) => !v);
  }

  protected alternarCompartido(p: Post) {
    p.compartido.update((v) => !v);
    if (p.compartido())
      this.avisos.mostrar('Enlace de la publicación copiado', 'compartir', 'bg-amarillo text-ink');
  }

  protected escribirComentario(p: Post, e: Event) {
    p.borrador.set((e.target as HTMLInputElement).value);
  }

  protected enviarComentario(p: Post, e: Event) {
    e.preventDefault();
    const texto = p.borrador().trim();
    if (!texto) return;
    p.propios.update((c) => [...c, texto]);
    p.borrador.set('');
  }

  protected alternarConexion(id: string, nombre: string) {
    this.estado.alternar(this.estado.conectados, id);
    if (this.estado.conectados()[id])
      this.avisos.mostrar(`Solicitud enviada a ${nombre}`, 'conectar');
  }

  protected alternarEvento(id: string, titulo: string) {
    this.estado.alternar(this.estado.eventosApuntados, id);
    if (this.estado.eventosApuntados()[id])
      this.avisos.mostrar(`Te has apuntado a «${titulo}»`, 'calendario', 'bg-naranja text-ink');
  }

  protected alternarGrupo(id: string, nombre: string) {
    this.estado.alternar(this.estado.gruposUnidos, id);
    this.avisos.mostrar(
      this.estado.gruposUnidos()[id]
        ? `Ahora eres parte de «${nombre}»`
        : `Has salido de «${nombre}»`,
      this.estado.gruposUnidos()[id] ? 'check' : 'cerrar',
      this.estado.gruposUnidos()[id] ? 'bg-turquesa text-ink' : 'bg-line text-ink',
    );
  }

  protected abrirCrear() {
    this.nombreProyecto.set('');
    this.ventanaCrear.abrir(null);
  }

  protected escribirNombre(e: Event) {
    this.nombreProyecto.set((e.target as HTMLInputElement).value);
  }

  protected crearProyecto(e: Event) {
    e.preventDefault();
    if (!this.puedeCrear()) return;
    const nombre = this.nombreProyecto().trim();
    this.estado.proyectosCreados.update((l) => [...l, { nombre, visibilidad: this.visibilidad() }]);
    this.ventanaCrear.cerrar();
    this.avisos.mostrar(`Proyecto «${nombre}» creado`, 'proyecto', 'bg-naranja text-ink');
  }
}

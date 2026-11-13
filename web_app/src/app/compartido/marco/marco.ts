import { ABRE_PERFIL } from '../abre-perfil';
import { Location } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { filter, map } from 'rxjs';
import { FOTOS } from '../../datos/fotos';
import { NOTIFICACIONES } from '../../datos/notificaciones';
import { INVITACIONES } from '../../datos/red';
import { Buscador } from '../buscador/buscador';
import { Icono } from '../icono/icono';
import { Ventana } from '../ventana/ventana';

/**
 * Marco común de todas las pantallas.
 * - En el ordenador: franja de colores + cabecera con el menú.
 * - En el teléfono (menos de 1024px): barra de arriba (foto o flecha de volver, buscador y
 *   campana) y barra de pestañas fija abajo, como una app del móvil.
 */
@Component({
  selector: 'app-marco',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Icono, Buscador, Ventana, ABRE_PERFIL],
  templateUrl: './marco.html',
})
export class Marco {
  private router = inject(Router);
  private location = inject(Location);

  protected fotoPerfil = FOTOS.lucia;

  // Enlaces del menú principal (cabecera en el ordenador y pestañas en el teléfono)
  protected enlaces = [
    { ruta: '/', texto: 'Inicio', icono: 'inicio', aviso: 0 },
    { ruta: '/red', texto: 'Mi red', icono: 'red', aviso: INVITACIONES.length },
    { ruta: '/proyectos', texto: 'Proyectos', icono: 'proyecto', aviso: 0 },
    { ruta: '/recursos', texto: 'Recursos', icono: 'recurso', aviso: 0 },
    { ruta: '/empleo', texto: 'Empleo', icono: 'empleo', aviso: 0 },
  ];

  // Ruta actual, para saber si la barra de arriba lleva flecha de volver
  private url = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  /** En los perfiles y en Estadísticas la barra de arriba lleva flecha de volver en vez de tu foto. */
  protected conVolver = computed(() => /^\/(perfil|estadisticas)/.test(this.url()));

  // ---------- Notificaciones ----------
  protected notificaciones = NOTIFICACIONES;
  protected notifAbiertas = signal(false);
  protected leidas = signal(false);
  protected sinLeer = computed(() =>
    this.leidas() ? 0 : NOTIFICACIONES.filter((n) => n.nueva).length,
  );

  constructor() {
    // Al ir a otra pantalla (por ejemplo, pulsando una notificación), se cierra la hoja
    this.router.events
      .pipe(filter((e) => e instanceof NavigationStart))
      .subscribe(() => this.notifAbiertas.set(false));
  }

  abrirNotificaciones() {
    this.notifAbiertas.set(true);
  }

  cerrarNotificaciones() {
    this.notifAbiertas.set(false);
    // Al cerrar la hoja ya se han visto: se quita el número rojo
    this.leidas.set(true);
  }

  irA(ruta: string) {
    this.router.navigateByUrl(ruta);
    this.leidas.set(true);
  }

  volver() {
    // Si se ha entrado directamente con el enlace, no hay pantalla anterior: se va a Inicio
    if (window.history.length > 1) this.location.back();
    else this.router.navigateByUrl('/');
  }
}

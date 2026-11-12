import { ABRE_PERFIL } from '../abre-perfil';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FOTOS } from '../../datos/fotos';
import { Buscador } from '../buscador/buscador';
import { Icono } from '../icono/icono';

/** Marco común de todas las pantallas: franja de colores + cabecera + el contenido de cada página. */
@Component({
  selector: 'app-marco',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Icono, Buscador, ABRE_PERFIL],
  templateUrl: './marco.html',
})
export class Marco {
  protected fotoPerfil = FOTOS.lucia;

  // Enlaces del menú principal
  protected enlaces = [
    { ruta: '/', texto: 'Inicio', icono: 'inicio' },
    { ruta: '/red', texto: 'Mi red', icono: 'red' },
    { ruta: '/proyectos', texto: 'Proyectos', icono: 'proyecto' },
    { ruta: '/recursos', texto: 'Recursos', icono: 'recurso' },
    { ruta: '/empleo', texto: 'Empleo', icono: 'empleo' },
  ];
}

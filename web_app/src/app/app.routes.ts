import { Routes } from '@angular/router';
import { Marco } from './compartido/marco/marco';

// Todas las pantallas se cargan dentro del Marco (cabecera + franja de colores).
// loadComponent hace que cada pantalla se descargue solo cuando se visita.
export const routes: Routes = [
  {
    path: '',
    component: Marco,
    children: [
      {
        path: '',
        title: 'LinkEdu · Inicio',
        loadComponent: () => import('./paginas/inicio/inicio').then((m) => m.Inicio),
      },
      {
        path: 'red',
        title: 'LinkEdu · Mi red',
        loadComponent: () => import('./paginas/red/red').then((m) => m.Red),
      },
      {
        path: 'proyectos',
        title: 'LinkEdu · Proyectos',
        loadComponent: () => import('./paginas/proyectos/proyectos').then((m) => m.Proyectos),
      },
      {
        path: 'recursos',
        title: 'LinkEdu · Recursos',
        loadComponent: () => import('./paginas/recursos/recursos').then((m) => m.Recursos),
      },
      {
        path: 'empleo',
        title: 'LinkEdu · Empleo',
        loadComponent: () => import('./paginas/empleo/empleo').then((m) => m.Empleo),
      },
      {
        path: 'perfil',
        title: 'LinkEdu · Perfil',
        loadComponent: () => import('./paginas/perfil/perfil').then((m) => m.Perfil),
      },
      {
        // Perfil de otra persona: /perfil/elena, /perfil/alex... (el id llega como input "id")
        path: 'perfil/:id',
        title: 'LinkEdu · Perfil',
        loadComponent: () => import('./paginas/perfil/perfil').then((m) => m.Perfil),
      },
      { path: '**', redirectTo: '' },
    ],
  },
];

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
        title: 'Linkedu · Inicio',
        loadComponent: () => import('./paginas/inicio/inicio').then((m) => m.Inicio),
      },
      {
        path: 'red',
        title: 'Linkedu · Mi red',
        loadComponent: () => import('./paginas/red/red').then((m) => m.Red),
      },
      {
        path: 'proyectos',
        title: 'Linkedu · Proyectos',
        loadComponent: () => import('./paginas/proyectos/proyectos').then((m) => m.Proyectos),
      },
      {
        path: 'recursos',
        title: 'Linkedu · Recursos',
        loadComponent: () => import('./paginas/recursos/recursos').then((m) => m.Recursos),
      },
      {
        path: 'empleo',
        title: 'Linkedu · Empleo',
        loadComponent: () => import('./paginas/empleo/empleo').then((m) => m.Empleo),
      },
      {
        path: 'perfil',
        title: 'Linkedu · Perfil',
        loadComponent: () => import('./paginas/perfil/perfil').then((m) => m.Perfil),
      },
      {
        // Perfil de otra persona: /perfil/elena, /perfil/alex... (el id llega como input "id")
        path: 'perfil/:id',
        title: 'Linkedu · Perfil',
        loadComponent: () => import('./paginas/perfil/perfil').then((m) => m.Perfil),
      },
      {
        // Estadísticas de tu perfil (solo las ves tú)
        path: 'estadisticas',
        title: 'Linkedu · Estadísticas',
        loadComponent: () =>
          import('./paginas/estadisticas/estadisticas').then((m) => m.Estadisticas),
      },
      { path: '**', redirectTo: '' },
    ],
  },
];

import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Al cambiar de pantalla, vuelve arriba del todo
    // withComponentInputBinding: los parámetros de la ruta (como el id de /perfil/:id) llegan como inputs
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
      withComponentInputBinding(),
    ),
  ],
};

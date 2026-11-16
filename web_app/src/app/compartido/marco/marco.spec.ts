import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Marco } from './marco';

describe('Marco', () => {
  let fixture: ComponentFixture<Marco>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Marco],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(Marco);
    await fixture.whenStable();
  });

  it('muestra el logo y el buscador', () => {
    expect(fixture.nativeElement.querySelector('img[alt=Linkedu]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-buscador')).toBeTruthy();
  });

  it('tiene los 5 enlaces del menú principal (arriba en el ordenador y abajo en el teléfono)', () => {
    const menus: HTMLElement[] = [
      ...fixture.nativeElement.querySelectorAll('nav[aria-label=Principal]'),
    ];
    expect(menus.length).toBe(2);
    for (const menu of menus) {
      const textos = [...menu.querySelectorAll('a')].map((a) =>
        a.textContent!.replace('nuevas', '').replace(/\d/g, '').trim(),
      );
      expect(textos).toEqual(['Inicio', 'Mi red', 'Proyectos', 'Recursos', 'Empleo']);
    }
  });

  it('la campana abre las notificaciones y al cerrarlas se quita el número', async () => {
    const campana: HTMLButtonElement = fixture.nativeElement.querySelector(
      'button[aria-label^=Notificaciones]',
    );
    expect(campana.getAttribute('aria-label')).toContain('3 sin leer');
    campana.click();
    await fixture.whenStable();
    expect(document.querySelector('[role=dialog]')?.textContent).toContain('Elena Sanz Prieto');
    (document.querySelector('button[aria-label=Cerrar]') as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(campana.getAttribute('aria-label')).toBe('Notificaciones');
  });

  it('la insignia de rol junto al avatar cambia el rol de toda la plataforma', async () => {
    const insignia: HTMLButtonElement = fixture.nativeElement.querySelector(
      'button[aria-label^="Rol activo"]',
    );
    expect(insignia.textContent).toContain('Profesor');
    insignia.click();
    await fixture.whenStable();
    const opciones = [...document.querySelectorAll('[role=dialog] button[aria-pressed]')];
    (opciones.find((b) => b.textContent!.includes('Alumno')) as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(insignia.textContent).toContain('Alumno');
  });
});

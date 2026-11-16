import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Proyectos } from './proyectos';

describe('Proyectos', () => {
  let fixture: ComponentFixture<Proyectos>;
  let html: HTMLElement;

  const boton = (texto: string) =>
    ([...html.querySelectorAll('button')] as HTMLButtonElement[]).find((b) =>
      b.textContent!.trim().includes(texto),
    )!;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Proyectos],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(Proyectos);
    html = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('empieza con el proyecto del mercado seleccionado', () => {
    expect(html.querySelector('h1')!.textContent).toContain('Matemáticas en el mercado');
  });

  it('el botón "+ Invitar" abre la ventana con las personas sugeridas', async () => {
    boton('+ Invitar').click();
    await fixture.whenStable();
    expect(html.querySelector('[role=dialog]')!.textContent).toContain('Invita a');
  });

  it('el filtro "Privados" deja solo los proyectos privados', async () => {
    boton('Privados').click();
    await fixture.whenStable();
    const lista = [...html.querySelectorAll('button[aria-pressed]')].filter((b) =>
      b.textContent!.includes('personas'),
    );
    expect(lista.length).toBe(2);
  });

  it('al elegir otro proyecto cambia el título', async () => {
    boton('Radio escolar FP + ESO').click();
    await fixture.whenStable();
    expect(html.querySelector('h1')!.textContent).toContain('Radio escolar');
  });

  it('aceptar una invitación mete el proyecto en la lista', async () => {
    (html.querySelector('button[aria-label^="Aceptar invitación"]') as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(html.querySelector('h1')!.textContent).toContain('Ciencia ciudadana');
  });

  it('validar una habilidad pide confirmar y la deja marcada como tuya', async () => {
    (html.querySelector('button[aria-label^="Validar"]') as HTMLButtonElement).click();
    await fixture.whenStable();

    const enviar = html.querySelector('[role=dialog] button[type=submit]') as HTMLButtonElement;
    expect(enviar.disabled).toBe(true);

    (html.querySelector('[role=dialog] input[type=checkbox]') as HTMLInputElement).click();
    await fixture.whenStable();
    enviar.click();
    await fixture.whenStable();

    expect(html.querySelector('[role=dialog]')!.textContent).toContain('Validación enviada');
  });
});

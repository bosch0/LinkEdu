import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Estado } from '../../datos/estado';
import { Empleo } from './empleo';

describe('Empleo', () => {
  let fixture: ComponentFixture<Empleo>;
  let html: HTMLElement;

  const boton = (texto: string) =>
    ([...html.querySelectorAll('button')] as HTMLButtonElement[]).find((b) =>
      b.textContent!.trim().startsWith(texto),
    )!;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Empleo] }).compileComponents();
    fixture = TestBed.createComponent(Empleo);
    html = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('empieza como profesora, con las 5 plazas de centros', () => {
    expect(html.querySelector('h1')!.textContent).toContain('Empleo para docentes');
    expect(html.querySelectorAll('article').length).toBe(5);
  });

  it('filtrar por "Remoto" deja solo las ofertas remotas', async () => {
    boton('Remoto').click();
    await fixture.whenStable();
    expect(html.querySelectorAll('article').length).toBe(1);
  });

  it('cambiar a cuenta de alumno cambia el contenido', async () => {
    boton('Alumno').click();
    await fixture.whenStable();
    expect(html.querySelector('h1')!.textContent).toContain('Encuentra profe particular');
  });

  it('cambiar a cuenta de empresa enseña candidatos', async () => {
    boton('Empresa').click();
    await fixture.whenStable();
    expect(html.querySelector('h1')!.textContent).toContain('Tus candidatos');
    expect(html.textContent).toContain('Lucía Fernández Ortega');
  });

  it('inscribirse en una oferta pide los dos pasos y deja la oferta enviada', async () => {
    boton('Inscribirme').click();
    await fixture.whenStable();
    boton('Revisar').click();
    await fixture.whenStable();

    const enviar = boton('Enviar candidatura');
    expect(enviar.disabled).toBe(true);
    (html.querySelector('[role=dialog] input[type=checkbox]') as HTMLInputElement).click();
    await fixture.whenStable();
    enviar.click();
    await fixture.whenStable();

    expect(html.textContent).toContain('Candidatura enviada');
  });

  it('la inscripción en la oferta de Pitágoras se comparte con el resto de la app', async () => {
    boton('Academias y en línea').click();
    await fixture.whenStable();
    boton('Inscribirme').click();
    await fixture.whenStable();
    boton('Revisar').click();
    await fixture.whenStable();
    (html.querySelector('[role=dialog] input[type=checkbox]') as HTMLInputElement).click();
    await fixture.whenStable();
    boton('Enviar candidatura').click();
    await fixture.whenStable();

    expect(TestBed.inject(Estado).inscritaPitagoras()).toBe(true);
  });
});

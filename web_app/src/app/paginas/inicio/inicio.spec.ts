import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Estado } from '../../datos/estado';
import { Inicio } from './inicio';

describe('Inicio', () => {
  let fixture: ComponentFixture<Inicio>;
  let html: HTMLElement;

  const botones = () => [...html.querySelectorAll('button')] as HTMLButtonElement[];
  const boton = (texto: string) => botones().find((b) => b.textContent!.trim().includes(texto))!;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inicio],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(Inicio);
    html = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('saluda y enseña las dos publicaciones de ejemplo', () => {
    expect(html.querySelector('h1')!.textContent).toContain('Buenos días, Lucía');
    expect(html.querySelectorAll('article').length).toBeGreaterThanOrEqual(2);
  });

  it('no deja publicar con el texto vacío', () => {
    expect(boton('Publicar').disabled).toBe(true);
  });

  it('publica un mensaje nuevo al principio del muro', async () => {
    const campo = html.querySelector(
      'input[aria-label="Escribe una publicación"]',
    ) as HTMLInputElement;
    campo.value = 'Mi primera publicación';
    campo.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    boton('Publicar').click();
    await fixture.whenStable();

    expect(html.querySelector('article')!.textContent).toContain('Mi primera publicación');
  });

  it('el me gusta suma uno al pulsarlo', async () => {
    const like = html.querySelector('article button[aria-pressed]') as HTMLButtonElement;
    const antes = parseInt(like.textContent!.trim(), 10);
    like.click();
    await fixture.whenStable();
    expect(parseInt(like.textContent!.trim(), 10)).toBe(antes + 1);
  });

  it('conectar con un docente se guarda en el estado compartido', async () => {
    const conectar = html.querySelector('button[aria-label^="Conectar con"]') as HTMLButtonElement;
    conectar.click();
    await fixture.whenStable();
    expect(Object.values(TestBed.inject(Estado).conectados()).some(Boolean)).toBe(true);
  });

  it('crear un proyecto lo añade a "Tus proyectos"', async () => {
    boton('Crear proyecto').click();
    await fixture.whenStable();

    const nombre = html.querySelector('[role=dialog] input[type=text]') as HTMLInputElement;
    nombre.value = 'Huerto 2027';
    nombre.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    (html.querySelector('[role=dialog] button[type=submit]') as HTMLButtonElement).click();
    await fixture.whenStable();

    expect(
      TestBed.inject(Estado)
        .proyectosCreados()
        .map((p) => p.nombre),
    ).toContain('Huerto 2027');
  });
});

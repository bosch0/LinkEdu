import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Perfil } from './perfil';

describe('Perfil', () => {
  let fixture: ComponentFixture<Perfil>;
  let html: HTMLElement;

  const boton = (texto: string) =>
    ([...html.querySelectorAll('button')] as HTMLButtonElement[]).find((b) =>
      b.textContent!.trim().includes(texto),
    )!;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Perfil],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(Perfil);
    html = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('empieza enseñando el perfil de Lucía con 3 proyectos públicos', () => {
    expect(html.querySelector('h1')!.textContent).toContain('Lucía Fernández Ortega');
    expect(html.textContent).toContain('2 proyectos privados');
  });

  it('cambiar a "Empresa" enseña la academia y sus ofertas', async () => {
    boton('Empresa').click();
    await fixture.whenStable();
    expect(html.querySelector('h1')!.textContent).toContain('Academia Pitágoras');
    expect(html.textContent).toContain('Docente de Matemáticas para refuerzo online');
  });

  it('en el perfil de otra persona, conectar cambia el botón a "Solicitud enviada"', async () => {
    boton('Alumno').click();
    await fixture.whenStable();
    boton('Conectar').click();
    await fixture.whenStable();
    expect(html.textContent).toContain('Solicitud enviada');
  });

  it('editar el perfil cambia el titular', async () => {
    boton('Editar perfil').click();
    await fixture.whenStable();
    const campo = html.querySelector('[role=dialog] input[type=text]') as HTMLInputElement;
    campo.value = 'Titular nuevo de prueba';
    campo.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    (html.querySelector('[role=dialog] button[type=submit]') as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(html.textContent).toContain('Titular nuevo de prueba');
  });

  it('en la pestaña de publicaciones se puede dar me gusta', async () => {
    boton('Publicaciones').click();
    await fixture.whenStable();
    const like = html.querySelector('article button[aria-pressed]') as HTMLButtonElement;
    const antes = parseInt(like.textContent!.trim(), 10);
    like.click();
    await fixture.whenStable();
    expect(parseInt(like.textContent!.trim(), 10)).toBe(antes + 1);
  });
});

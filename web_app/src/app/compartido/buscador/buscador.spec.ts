import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Buscador } from './buscador';

describe('Buscador', () => {
  let fixture: ComponentFixture<Buscador>;

  const escribir = async (texto: string) => {
    const campo: HTMLInputElement = fixture.nativeElement.querySelector('input');
    campo.value = texto;
    campo.dispatchEvent(new Event('input'));
    await fixture.whenStable();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Buscador],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(Buscador);
    await fixture.whenStable();
  });

  it('no abre el desplegable si no se ha escrito nada', () => {
    expect(fixture.nativeElement.querySelectorAll('button').length).toBe(0);
  });

  it('encuentra recursos aunque se escriba sin tildes ni mayúsculas', async () => {
    await escribir('ROBOTICA');
    const texto: string = fixture.nativeElement.textContent;
    expect(texto).toContain('Robótica con Arduino');
  });

  it('avisa cuando no hay resultados', async () => {
    await escribir('zzzzzz');
    expect(fixture.nativeElement.textContent).toContain('No hay resultados');
  });

  it('se cierra con la tecla Escape', async () => {
    await escribir('mercado');
    expect(fixture.nativeElement.querySelectorAll('button').length).toBeGreaterThan(0);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelectorAll('button').length).toBe(0);
  });
});

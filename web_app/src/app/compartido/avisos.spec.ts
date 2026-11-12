import { TestBed } from '@angular/core/testing';
import { Avisos } from './avisos';

describe('Avisos', () => {
  let servicio: Avisos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    servicio = TestBed.inject(Avisos);
  });

  it('añade un aviso con su texto', () => {
    servicio.mostrar('Guardado');
    expect(servicio.lista().length).toBe(1);
    expect(servicio.lista()[0].texto).toBe('Guardado');
  });

  it('solo conserva los 3 últimos avisos', () => {
    ['uno', 'dos', 'tres', 'cuatro'].forEach((t) => servicio.mostrar(t));
    expect(servicio.lista().map((a) => a.texto)).toEqual(['dos', 'tres', 'cuatro']);
  });

  it('quita un aviso por su id', () => {
    servicio.mostrar('Hola');
    servicio.quitar(servicio.lista()[0].id);
    expect(servicio.lista().length).toBe(0);
  });
});

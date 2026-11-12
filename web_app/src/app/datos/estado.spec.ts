import { TestBed } from '@angular/core/testing';
import { Estado } from './estado';

describe('Estado', () => {
  let estado: Estado;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    estado = TestBed.inject(Estado);
  });

  it('empieza sin solicitudes de conexión ni proyectos creados', () => {
    expect(estado.conectados()).toEqual({});
    expect(estado.proyectosCreados()).toEqual([]);
    expect(estado.inscritaPitagoras()).toBe(false);
  });

  it('alternar cambia un true/false y lo vuelve a cambiar', () => {
    estado.alternar(estado.conectados, 'marta');
    expect(estado.conectados()['marta']).toBe(true);

    estado.alternar(estado.conectados, 'marta');
    expect(estado.conectados()['marta']).toBe(false);
  });

  it('empieza dentro de 5 grupos y apuntada a un evento', () => {
    expect(Object.values(estado.gruposUnidos()).filter(Boolean).length).toBe(5);
    expect(estado.eventosApuntados()['sens']).toBe(true);
  });
});

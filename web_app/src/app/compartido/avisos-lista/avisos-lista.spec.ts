import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Avisos } from '../avisos';
import { AvisosLista } from './avisos-lista';

describe('AvisosLista', () => {
  let fixture: ComponentFixture<AvisosLista>;
  let avisos: Avisos;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AvisosLista] }).compileComponents();
    fixture = TestBed.createComponent(AvisosLista);
    avisos = TestBed.inject(Avisos);
    await fixture.whenStable();
  });

  it('no enseña nada si no hay avisos', () => {
    expect(fixture.nativeElement.textContent.trim()).toBe('');
  });

  it('enseña el texto de un aviso nuevo', async () => {
    avisos.mostrar('Solicitud enviada');
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('Solicitud enviada');
  });
});

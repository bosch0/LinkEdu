import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstadoVentana, Ventana } from './ventana';

describe('Ventana', () => {
  let fixture: ComponentFixture<Ventana>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Ventana] }).compileComponents();
    fixture = TestBed.createComponent(Ventana);
    fixture.componentRef.setInput('titulo', 'Crear proyecto');
    fixture.componentRef.setInput('kicker', 'NUEVO');
  });

  it('no pinta nada mientras está cerrada', async () => {
    fixture.componentRef.setInput('abierta', false);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('[role=dialog]')).toBeNull();
  });

  it('muestra el título y el texto pequeño al abrirse', async () => {
    fixture.componentRef.setInput('abierta', true);
    await fixture.whenStable();
    const ventana: HTMLElement = fixture.nativeElement.querySelector('[role=dialog]');
    expect(ventana).toBeTruthy();
    expect(ventana.textContent).toContain('Crear proyecto');
    expect(ventana.textContent).toContain('NUEVO');
  });

  it('avisa de que hay que cerrarla al pulsar el botón de cerrar', async () => {
    fixture.componentRef.setInput('abierta', true);
    await fixture.whenStable();
    let cerrada = false;
    fixture.componentInstance.cerrar.subscribe(() => (cerrada = true));
    fixture.nativeElement.querySelector('button[aria-label=Cerrar]').click();
    expect(cerrada).toBe(true);
  });
});

describe('EstadoVentana', () => {
  it('guarda el dato al abrir y lo conserva al cerrar (para la animación de salida)', () => {
    const v = new EstadoVentana<string>();
    expect(v.abierta()).toBe(false);

    v.abrir('hola');
    expect(v.abierta()).toBe(true);
    expect(v.dato()).toBe('hola');

    v.cerrar();
    expect(v.abierta()).toBe(false);
    expect(v.dato()).toBe('hola');
  });
});

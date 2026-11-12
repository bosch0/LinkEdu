import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Icono } from './icono';

describe('Icono', () => {
  let fixture: ComponentFixture<Icono>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Icono] }).compileComponents();
    fixture = TestBed.createComponent(Icono);
    fixture.componentRef.setInput('nombre', 'inicio');
    await fixture.whenStable();
  });

  it('dibuja el icono pedido dentro de un svg', () => {
    const svg: SVGElement = fixture.nativeElement.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg.querySelectorAll('path').length).toBeGreaterThan(0);
  });

  it('usa 20 píxeles por defecto y respeta el tamaño que se le da', async () => {
    const svg: SVGElement = fixture.nativeElement.querySelector('svg');
    expect(svg.getAttribute('width')).toBe('20');

    fixture.componentRef.setInput('tam', 32);
    await fixture.whenStable();
    expect(svg.getAttribute('width')).toBe('32');
  });

  it('se rellena con el color del texto cuando se pide', async () => {
    fixture.componentRef.setInput('relleno', true);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('svg').getAttribute('fill')).toBe('currentColor');
  });
});

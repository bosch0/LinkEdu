import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Estadisticas } from './estadisticas';

describe('Estadisticas', () => {
  let fixture: ComponentFixture<Estadisticas>;
  const texto = () => fixture.nativeElement.textContent as string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Estadisticas],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(Estadisticas);
    await fixture.whenStable();
  });

  it('muestra los totales de los últimos 7 días', () => {
    expect(texto()).toContain('12.840');
    expect(texto()).toContain('908');
  });

  it('al cambiar a 28 días cambian los totales', async () => {
    const boton = [...fixture.nativeElement.querySelectorAll('button')].find((b: HTMLElement) =>
      b.textContent!.includes('28 días'),
    ) as HTMLButtonElement;
    boton.click();
    await fixture.whenStable();
    expect(texto()).toContain('41.990');
  });
});

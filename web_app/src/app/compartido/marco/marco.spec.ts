import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Marco } from './marco';

describe('Marco', () => {
  let fixture: ComponentFixture<Marco>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Marco],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(Marco);
    await fixture.whenStable();
  });

  it('muestra el logo y el buscador', () => {
    expect(fixture.nativeElement.querySelector('img[alt=LinkEdu]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-buscador')).toBeTruthy();
  });

  it('tiene los 5 enlaces del menú principal', () => {
    const enlaces: HTMLElement[] = [...fixture.nativeElement.querySelectorAll('nav a')];
    expect(enlaces.map((a) => a.textContent!.trim())).toEqual([
      'Inicio',
      'Mi red',
      'Proyectos',
      'Recursos',
      'Empleo',
    ]);
  });
});

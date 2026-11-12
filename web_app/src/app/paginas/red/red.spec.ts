import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PAISES, RECOMENDADOS } from '../../datos/red';
import { Red } from './red';

// Un mapa mínimo: una posición para cada sitio, sin las formas reales (el archivo grande no hace falta en los tests)
const todosLosIds = [
  ...PAISES.flatMap((p) => [p.id, ...p.ciudades.map((c) => c.id)]),
  ...RECOMENDADOS.map((r) => r.id),
];
const MAPA_DE_PRUEBA = {
  shapes: {
    global: { land: 'M0 0h10v10z', hi: 'M0 0h5v5z' },
    espana: { land: 'M0 0h10v10z', hi: 'M0 0h5v5z' },
  },
  pos: {
    global: Object.fromEntries(
      todosLosIds.map((id, i) => [id, [50 + ((i * 17) % 900), 60 + ((i * 31) % 360)]]),
    ),
    espana: {},
  },
};

describe('Red', () => {
  let fixture: ComponentFixture<Red>;

  beforeEach(async () => {
    vi.stubGlobal('fetch', () => Promise.resolve({ json: () => Promise.resolve(MAPA_DE_PRUEBA) }));
    // jsdom no sabe dibujar en un canvas ni vigilar tamaños: se simula
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe() {}
        disconnect() {}
      },
    );
    vi.stubGlobal('Path2D', class {});
    HTMLCanvasElement.prototype.getContext = (() => null) as never;
    await TestBed.configureTestingModule({ imports: [Red] }).compileComponents();
    fixture = TestBed.createComponent(Red);
    await fixture.whenStable();
    await new Promise((r) => setTimeout(r, 0));
    await fixture.whenStable();
  });

  afterEach(() => vi.unstubAllGlobals());

  it('al cargar el mapa enseña el título y la lista de países', () => {
    const texto: string = fixture.nativeElement.textContent;
    expect(texto).toContain('Tu red en el mundo');
    expect(texto).toContain('Tus países');
  });

  it('tiene 4 invitaciones pendientes y se pueden aceptar', async () => {
    expect(fixture.nativeElement.textContent).toContain('Invitaciones');
    const aceptar = fixture.nativeElement.querySelector(
      'button[aria-label^="Aceptar a"]',
    ) as HTMLButtonElement;
    aceptar.click();
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('Ya estáis conectados');
  });

  it('el filtro "Proyectos" queda marcado al pulsarlo', async () => {
    const filtro = [
      ...fixture.nativeElement.querySelectorAll('[aria-label="Filtrar por relación"] button'),
    ].find((b: HTMLButtonElement) => b.textContent!.trim() === 'Proyectos') as HTMLButtonElement;
    filtro.click();
    await fixture.whenStable();
    expect(filtro.getAttribute('aria-pressed')).toBe('true');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Recursos } from './recursos';

describe('Recursos', () => {
  let fixture: ComponentFixture<Recursos>;
  let html: HTMLElement;

  const boton = (texto: string) =>
    ([...html.querySelectorAll('button')] as HTMLButtonElement[]).find((b) =>
      b.textContent!.trim().includes(texto),
    )!;
  const tarjetas = () => html.querySelectorAll('article').length;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Recursos] }).compileComponents();
    fixture = TestBed.createComponent(Recursos);
    html = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('rellena la rejilla hasta 12 tarjetas', () => {
    expect(tarjetas()).toBe(12);
  });

  it('la pestaña de favoritos solo enseña los marcados (y completa con sugeridos)', async () => {
    boton('Favoritos').click();
    await fixture.whenStable();
    expect(html.querySelector('h1')!.textContent).toContain('Favoritos');
    expect(html.textContent).toContain('Sugerido para ti');
  });

  it('el filtro "De pago" deja solo recursos con precio entre los principales', async () => {
    boton('De pago').click();
    await fixture.whenStable();
    expect(html.querySelectorAll('article')[0].textContent).toMatch(/\d,\d\d €/);
  });

  it('buscar por autor filtra las tarjetas', async () => {
    const campo = html.querySelector('input[aria-label="Buscar recursos"]') as HTMLInputElement;
    campo.value = 'Arduino';
    campo.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    expect(html.querySelectorAll('article')[0].textContent).toContain('Arduino');
  });

  it('comprar un recurso de pago abre la confirmación', async () => {
    boton('Comprar · 3,90').click();
    await fixture.whenStable();
    expect(html.querySelector('[role=dialog]')!.textContent).toContain('Confirmar compra');
  });

  it('sin Premium, el botón "De pago" del formulario avisa de que hace falta', async () => {
    const dePago = [...html.querySelectorAll('form button')].find((b) =>
      b.textContent!.includes('De pago'),
    ) as HTMLButtonElement;
    dePago.click();
    await fixture.whenStable();
    expect(html.textContent).toContain('Necesitas LinkEdu Premium');
  });
});

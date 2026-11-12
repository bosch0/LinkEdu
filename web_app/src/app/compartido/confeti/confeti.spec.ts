import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Confeti } from './confeti';

describe('Confeti', () => {
  let fixture: ComponentFixture<Confeti>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Confeti] }).compileComponents();
    fixture = TestBed.createComponent(Confeti);
    await fixture.whenStable();
  });

  it('no suelta confeti hasta que se dispara', () => {
    expect(fixture.nativeElement.querySelectorAll('span').length).toBe(0);
  });

  it('suelta 36 piezas cada vez que sube el contador', async () => {
    fixture.componentRef.setInput('disparo', 1);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelectorAll('span').length).toBe(36);
  });
});

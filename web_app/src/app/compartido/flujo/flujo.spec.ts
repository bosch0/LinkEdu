import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FLUJO_CIENCIA } from '../../datos/inicio';
import { Flujo } from './flujo';

describe('Flujo', () => {
  let fixture: ComponentFixture<Flujo>;

  const boton = (texto: string): HTMLButtonElement =>
    [...fixture.nativeElement.querySelectorAll('button')].find(
      (b: HTMLButtonElement) => b.textContent!.trim() === texto,
    );

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Flujo] }).compileComponents();
    fixture = TestBed.createComponent(Flujo);
    fixture.componentRef.setInput('datos', FLUJO_CIENCIA);
    fixture.componentRef.setInput('abierta', true);
    await fixture.whenStable();
  });

  it('empieza enseñando la información del proyecto', () => {
    expect(fixture.nativeElement.textContent).toContain('2 plazas');
    expect(boton('Solicitar unirme')).toBeTruthy();
  });

  it('no deja enviar hasta marcar la casilla de confirmación', async () => {
    boton('Solicitar unirme').click();
    await fixture.whenStable();

    const enviar = boton('Enviar solicitud');
    expect(enviar.disabled).toBe(true);

    fixture.nativeElement.querySelector('input[type=checkbox]').click();
    await fixture.whenStable();
    expect(boton('Enviar solicitud').disabled).toBe(false);
  });

  it('al confirmar avisa de que se ha enviado y enseña el mensaje final', async () => {
    let enviado = false;
    fixture.componentInstance.enviado.subscribe(() => (enviado = true));

    boton('Solicitar unirme').click();
    await fixture.whenStable();
    fixture.nativeElement.querySelector('input[type=checkbox]').click();
    await fixture.whenStable();
    boton('Enviar solicitud').click();
    await fixture.whenStable();

    expect(enviado).toBe(true);
    expect(fixture.nativeElement.textContent).toContain(FLUJO_CIENCIA.textoFinal);
  });

  it('si ya estaba enviado, se abre directamente en el último paso', async () => {
    const otro = TestBed.createComponent(Flujo);
    otro.componentRef.setInput('datos', FLUJO_CIENCIA);
    otro.componentRef.setInput('yaEnviado', true);
    otro.componentRef.setInput('abierta', true);
    await otro.whenStable();
    expect(otro.nativeElement.textContent).toContain(FLUJO_CIENCIA.textoFinal);
  });
});

import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ABRE_PERFIL } from '../../compartido/abre-perfil';
import { Avisos } from '../../compartido/avisos';
import { Icono } from '../../compartido/icono/icono';
import {
  DEMOGRAFIA,
  ESTADISTICAS,
  METRICAS,
  Metrica,
  PERIODOS,
  Periodo,
  QUIEN_BUSCA,
  TERMINOS_BUSQUEDA,
  TOP_PUBLICACIONES,
  VISITANTES,
  miles,
} from '../../datos/estadisticas';

// Medidas de la gráfica (en unidades del viewBox del SVG; luego se escala al ancho de la tarjeta)
const ANCHO = 340;
const ALTO = 190;
const IZQ = 44; // hueco para los números del eje vertical
const DER = 12;
const ARRIBA = 30; // hueco para la etiqueta del punto elegido
const ABAJO = 26; // hueco para las fechas

/** Pantalla "Estadísticas": cómo rinde tu perfil y lo que compartes. Solo la ves tú. */
@Component({
  selector: 'app-estadisticas',
  imports: [RouterLink, Icono, ABRE_PERFIL],
  templateUrl: './estadisticas.html',
  host: { class: 'flex flex-1 flex-col' },
})
export class Estadisticas {
  private avisos = inject(Avisos);

  protected periodos = PERIODOS;
  protected metricas = METRICAS;
  protected visitantes = VISITANTES;
  protected publicaciones = TOP_PUBLICACIONES;
  protected terminos = TERMINOS_BUSQUEDA;
  protected quienBusca = QUIEN_BUSCA;
  protected gruposDemografia = Object.keys(DEMOGRAFIA);
  protected miles = miles;
  protected medidas = { ANCHO, ALTO, IZQ, DER, ARRIBA, ABAJO };

  // ---------- Estado ----------
  protected periodo = signal<Periodo>('7 días');
  protected metrica = signal<Metrica>('impresiones');
  protected grupo = signal('Materia');
  // Punto de la gráfica elegido (null = el último)
  protected elegido = signal<number | null>(null);
  protected conectados = signal<Record<string, boolean>>({});

  // ---------- Datos calculados ----------
  protected datos = computed(() => ESTADISTICAS[this.periodo()]);

  protected totales = computed(() => {
    const d = this.datos();
    const suma = (m: Metrica) => d.series[m].reduce((a, b) => a + b, 0);
    return {
      impresiones: suma('impresiones'),
      interacciones: suma('interacciones'),
      visitas: suma('visitas'),
    };
  });

  /** Texto de la comparación: "frente a los 7 días anteriores". */
  protected frente = computed(() => 'frente a los ' + this.periodo() + ' anteriores');

  protected grafica = computed(() => {
    const d = this.datos();
    const valores = d.series[this.metrica()];
    const maximo = redondeoBonito(Math.max(...valores) * 1.08);
    const n = valores.length;
    const x = (i: number) => IZQ + (i * (ANCHO - IZQ - DER)) / (n - 1);
    const y = (v: number) => ARRIBA + (1 - v / maximo) * (ALTO - ARRIBA - ABAJO);
    const puntos = valores.map((v, i) => ({
      x: x(i),
      y: y(v),
      v,
      etiqueta: d.etiquetas[i],
    }));
    const linea = puntos.map((p, i) => (i ? 'L' : 'M') + p.x.toFixed(1) + ' ' + p.y.toFixed(1));
    const base = (ALTO - ABAJO).toFixed(1);
    const area =
      linea.join(' ') +
      ` L${puntos[n - 1].x.toFixed(1)} ${base} L${puntos[0].x.toFixed(1)} ${base} Z`;
    // Líneas de guía del eje vertical: 0, la mitad y el máximo
    const guias = [0, maximo / 2, maximo].map((v) => ({ y: y(v), texto: corto(v) }));
    // En el eje horizontal solo caben tres fechas: la primera, la del medio y la última
    const medio = Math.floor((n - 1) / 2);
    const fechas = [0, medio, n - 1].map((i) => ({
      x: x(i),
      texto: d.etiquetas[i],
      ancla: i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle',
    }));
    // Zona que se puede pulsar alrededor de cada punto
    const paso = (ANCHO - IZQ - DER) / (n - 1);
    const zonas = puntos.map((p) => ({ x: p.x - paso / 2, ancho: paso }));
    return {
      puntos,
      linea: linea.join(' '),
      area,
      guias,
      fechas,
      zonas,
      clave: this.periodo() + this.metrica(),
    };
  });

  protected punto = computed(() => {
    const g = this.grafica();
    const i = this.elegido() ?? g.puntos.length - 1;
    const p = g.puntos[Math.min(i, g.puntos.length - 1)];
    const texto = miles(p.v);
    // Que la etiqueta no se salga por los lados
    const anchoEtiqueta = 18 + texto.length * 8;
    const xEtiqueta = Math.min(Math.max(p.x - anchoEtiqueta / 2, IZQ - 8), ANCHO - anchoEtiqueta);
    return { ...p, texto, anchoEtiqueta, xEtiqueta };
  });

  protected nombreMetrica = computed(
    () => METRICAS.find((m) => m.id === this.metrica())?.texto ?? '',
  );

  protected demografia = computed(() => {
    const total = this.datos().audiencia;
    return DEMOGRAFIA[this.grupo()].map(([nombre, pct], i) => ({
      nombre,
      pct,
      n: miles((total * pct) / 100),
      primero: i === 0,
    }));
  });

  // ---------- Acciones ----------
  elegirPeriodo(p: Periodo) {
    this.periodo.set(p);
    this.elegido.set(null);
  }

  elegirMetrica(m: Metrica) {
    this.metrica.set(m);
    this.elegido.set(null);
  }

  elegirGrupo(e: Event) {
    this.grupo.set((e.target as HTMLSelectElement).value);
  }

  /** Con las flechas del teclado se recorre la gráfica punto a punto. */
  moverPunto(e: KeyboardEvent) {
    const n = this.grafica().puntos.length;
    const actual = this.elegido() ?? n - 1;
    if (e.key === 'ArrowLeft') this.elegido.set(Math.max(0, actual - 1));
    else if (e.key === 'ArrowRight') this.elegido.set(Math.min(n - 1, actual + 1));
    else return;
    e.preventDefault();
  }

  conectar(nombre: string) {
    this.conectados.update((c) => ({ ...c, [nombre]: !c[nombre] }));
    if (this.conectados()[nombre])
      this.avisos.mostrar('Solicitud enviada a ' + nombre.split(' ')[0]);
  }

  descargar() {
    this.avisos.mostrar('Informe de los últimos ' + this.periodo() + ' descargado', 'descargar');
  }

  cambio(n: number) {
    return n.toLocaleString('es-ES', { maximumFractionDigits: 1 }) + ' %';
  }
}

/** Redondea hacia arriba a un número "bonito" para el eje (3.000, 1.500, 250...). */
function redondeoBonito(x: number) {
  const potencia = 10 ** Math.floor(Math.log10(x));
  for (const m of [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]) {
    if (m * potencia >= x) return m * potencia;
  }
  return 10 * potencia;
}

/** Número corto para el eje: 12.500 → "12,5 mil". */
function corto(v: number) {
  if (v >= 1000) return (v / 1000).toLocaleString('es-ES', { maximumFractionDigits: 1 }) + ' mil';
  return miles(v);
}

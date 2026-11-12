import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// Dibujos (SVG) de los iconos de LinkEdu. Salen de design/assets/iconos/.
const ICONOS: Record<string, string> = {
  inicio: '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/>',
  buscar: '<circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4.5 4.5"/>',
  red: '<circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M16.5 14.1c2.6.3 4.5 2.6 4.5 5.4"/>',
  conectar:
    '<circle cx="10" cy="8" r="3.5"/><path d="M4 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M19 7v6M16 10h6"/>',
  perfil: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>',
  mensajes: '<path d="M4 5h16v11H9l-5 4z"/>',
  notificaciones: '<path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>',
  proyecto:
    '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><circle cx="16.5" cy="16.5" r="3.5"/>',
  recurso:
    '<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/>',
  empleo:
    '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/><path d="M3 13h18"/>',
  formacion:
    '<path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/><path d="M22 9v6"/>',
  guardar: '<path d="M6 3h12v18l-6-4-6 4z"/>',
  compartir:
    '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.6M8.2 13.2l7.6 4.6"/>',
  megusta: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
  comentar: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
  calendario: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  ubicacion:
    '<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  descargar: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  subir: '<path d="M12 15V4M7 9l5-5 5 5M5 20h14"/>',
  filtro: '<path d="M4 5h16l-6 8v6l-4-2v-4z"/>',
  ajustes:
    '<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',
  mas: '<path d="M12 5v14M5 12h14"/>',
  cerrar: '<path d="M6 6l12 12M18 6 6 18"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
  flecha: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  // Aviso / error: un estado nunca se marca solo con color, va con este icono y un texto
  aviso: '<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17v.5"/>',
};

/**
 * Icono de LinkEdu.
 * Uso: <app-icono nombre="inicio" /> o <app-icono nombre="inicio" [tam]="16" />
 * Toma el color del texto (currentColor), así que se colorea con clases text-*.
 */
@Component({
  selector: 'app-icono',
  host: { class: 'inline-flex shrink-0' },
  templateUrl: './icono.html',
})
export class Icono {
  // Los dibujos son nuestros (no vienen del usuario), por eso se puede confiar en ellos
  private sanitizer = inject(DomSanitizer);

  nombre = input.required<string>();
  tam = input(20);
  relleno = input(false);

  protected dibujo = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(ICONOS[this.nombre()] ?? ''),
  );
}

// Genera las portadas (dibujos SVG) de los recursos, sin necesidad de imágenes.
// Devuelve una dirección "data:image/svg+xml..." que se puede poner en <img src>.

const FUENTE = 'font-family="Arial, Helvetica, sans-serif"';

// Cuadrícula de puntitos del fondo
function puntos(color: string, opacidad: number) {
  let d = '';
  for (let y = 7; y < 150; y += 14) for (let x = 7; x < 320; x += 14) d += `M${x} ${y}h.01`;
  return `<path d="${d}" stroke="${color}" stroke-opacity="${opacidad}" stroke-width="2.4" stroke-linecap="round"/>`;
}

const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * @param tipo    PDF, Presentación, Fichas, Vídeo, Juego o Hoja de cálculo
 * @param titulo  título del recurso (sale escrito en la portada)
 * @param semilla número que cambia los detalles para que no todas sean iguales
 * @param estilo  (opcional) un diseño especial: escape, lectora, roleplay, ondas, bloques, circulos
 */
export function portada(tipo: string, titulo: string, semilla = 0, estilo = ''): string {
  // Partimos el título en dos líneas
  let l1 = '';
  let l2 = '';
  titulo.split(' ').forEach((w) => {
    if ((l1 + ' ' + w).trim().length <= 22 && !l2) l1 = (l1 + ' ' + w).trim();
    else l2 = (l2 + ' ' + w).trim();
  });
  if (l2.length > 24) l2 = l2.slice(0, 23) + '…';
  const F = FUENTE;
  const s = semilla;
  const h = (i: number, base: number, span: number) => base + ((s * 7 + i * 13) % span);
  let out = '';

  if (estilo === 'escape') {
    out =
      '<rect width="320" height="150" fill="#073157"/>' +
      puntos('#ffffff', 0.18) +
      '<rect x="214" y="22" width="72" height="128" rx="6" fill="#0b4876" stroke="#fcb527" stroke-width="3"/><circle cx="270" cy="88" r="5" fill="#fcb527"/>' +
      '<circle cx="250" cy="56" r="10" fill="none" stroke="#ffffff" stroke-width="3"/><rect x="246" y="64" width="8" height="18" rx="2" fill="#ffffff"/>' +
      `<text x="22" y="62" ${F} font-size="30" font-weight="900" fill="#fcb527">ESCAPE</text><text x="22" y="94" ${F} font-size="30" font-weight="900" fill="#ffffff">ROOM</text>` +
      `<rect x="22" y="108" width="128" height="22" rx="11" fill="#21bcaa"/><text x="34" y="123" ${F} font-size="11" font-weight="700" fill="#0c1d2e">x² + 3x = 10 · 8 retos</text>`;
  } else if (estilo === 'lectora') {
    out =
      '<rect width="320" height="150" fill="#fcb527"/>' +
      puntos('#073157', 0.14) +
      '<path d="M170 44 Q210 30 250 40 L250 128 Q210 118 170 132 Z" fill="#ffffff"/><path d="M170 44 Q130 30 92 40 L92 128 Q130 118 170 132 Z" fill="#dfe8f2"/>' +
      '<rect x="104" y="58" width="52" height="4" rx="2" fill="#7a8b9c"/><rect x="104" y="70" width="46" height="4" rx="2" fill="#7a8b9c"/><rect x="104" y="82" width="52" height="4" rx="2" fill="#7a8b9c"/><rect x="184" y="58" width="52" height="4" rx="2" fill="#7a8b9c"/><rect x="184" y="70" width="40" height="4" rx="2" fill="#7a8b9c"/>' +
      `<circle cx="272" cy="36" r="18" fill="#fb8d2b"/><text x="20" y="34" ${F} font-size="20" font-weight="900" fill="#073157">¡A LEER!</text><text x="20" y="140" ${F} font-size="11" font-weight="700" fill="#073157">30 fichas · Primaria</text>`;
  } else if (estilo === 'roleplay') {
    out =
      '<rect width="320" height="150" fill="#21bcaa"/>' +
      puntos('#073157', 0.14) +
      `<rect x="24" y="24" width="132" height="44" rx="22" fill="#ffffff"/><path d="M50 66 L44 82 L66 66 Z" fill="#ffffff"/><text x="44" y="53" ${F} font-size="20" font-weight="900" fill="#073157">Hello!</text>` +
      `<rect x="128" y="76" width="168" height="44" rx="22" fill="#073157"/><path d="M270 118 L278 134 L254 118 Z" fill="#073157"/><text x="146" y="104" ${F} font-size="17" font-weight="700" fill="#ffffff">How are you?</text>` +
      '<circle cx="280" cy="34" r="14" fill="#fcb527"/>';
  } else if (estilo === 'ondas' || estilo === 'bloques' || estilo === 'circulos') {
    const bg = { ondas: '#073157', bloques: '#fb8d2b', circulos: '#21bcaa' }[estilo];
    const tinta = estilo === 'ondas' ? '#ffffff' : '#0c1d2e';
    const deco =
      estilo === 'ondas'
        ? '<path d="M0 110 Q80 80 160 110 T320 110 V150 H0 Z" fill="#0a6a99"/><path d="M0 126 Q80 100 160 126 T320 126 V150 H0 Z" fill="#21bcaa"/>'
        : estilo === 'bloques'
          ? '<rect x="218" y="20" width="44" height="44" rx="8" fill="#073157"/><rect x="266" y="20" width="36" height="44" rx="8" fill="#fcb527"/><rect x="218" y="68" width="84" height="40" rx="8" fill="#ffffff"/>'
          : '<circle cx="262" cy="52" r="40" fill="#ffffff" opacity=".85"/><circle cx="226" cy="108" r="24" fill="#073157"/><circle cx="292" cy="118" r="14" fill="#fcb527"/>';
    out =
      `<rect width="320" height="150" fill="${bg}"/>` +
      deco +
      `<text x="22" y="52" ${F} font-size="20" font-weight="900" fill="${tinta}">${esc(l1)}</text><text x="22" y="76" ${F} font-size="20" font-weight="900" fill="${tinta}">${esc(l2)}</text>`;
  } else if (tipo === 'Presentación') {
    out =
      '<rect width="320" height="150" fill="#0a6a99"/>' +
      puntos('#ffffff', 0.16) +
      '<rect x="28" y="16" width="208" height="118" rx="6" fill="#ffffff"/><rect x="28" y="16" width="208" height="28" rx="6" fill="#073157"/><rect x="28" y="38" width="208" height="6" fill="#073157"/>' +
      `<text x="40" y="35" ${F} font-size="11" font-weight="700" fill="#ffffff">${esc(l1)}</text>` +
      '<circle cx="44" cy="62" r="3" fill="#fb8d2b"/><rect x="52" y="60" width="80" height="4" rx="2" fill="#a3b3c4"/><circle cx="44" cy="76" r="3" fill="#fb8d2b"/><rect x="52" y="74" width="66" height="4" rx="2" fill="#a3b3c4"/><circle cx="44" cy="90" r="3" fill="#fb8d2b"/><rect x="52" y="88" width="74" height="4" rx="2" fill="#a3b3c4"/>' +
      '<circle cx="190" cy="88" r="28" fill="#dfe8f2"/><path d="M190 88 L190 60 A28 28 0 0 1 216 98 Z" fill="#21bcaa"/><path d="M190 88 L216 98 A28 28 0 0 1 172 110 Z" fill="#fcb527"/>' +
      `<rect x="40" y="110" width="${h(1, 50, 40)}" height="10" rx="3" fill="#7fb9e6"/>` +
      '<rect x="248" y="16" width="52" height="30" rx="3" fill="#ffffff" opacity=".85"/><rect x="248" y="52" width="52" height="30" rx="3" fill="#ffffff" opacity=".6"/><rect x="248" y="88" width="52" height="30" rx="3" fill="#ffffff" opacity=".4"/>';
  } else if (tipo === 'Fichas') {
    out =
      '<rect width="320" height="150" fill="#d6f2ee"/>' +
      '<rect x="168" y="22" width="130" height="150" rx="4" fill="#ffffff" opacity=".7" transform="rotate(5 230 90)"/>' +
      '<rect x="26" y="12" width="186" height="160" rx="4" fill="#ffffff" stroke="#c9d6e2"/>' +
      `<text x="38" y="32" ${F} font-size="10" font-weight="700" fill="#073157">${esc(l1)}</text><rect x="38" y="38" width="160" height="1.5" fill="#21bcaa"/>` +
      `<text x="38" y="58" ${F} font-size="9" font-weight="700" fill="#0c1d2e">1.</text><rect x="50" y="52" width="100" height="4" rx="2" fill="#a3b3c4"/><rect x="160" y="48" width="38" height="14" rx="3" fill="none" stroke="#7a8b9c"/>` +
      `<text x="38" y="82" ${F} font-size="9" font-weight="700" fill="#0c1d2e">2.</text><rect x="50" y="76" width="86" height="4" rx="2" fill="#a3b3c4"/><rect x="160" y="72" width="38" height="14" rx="3" fill="none" stroke="#7a8b9c"/>` +
      `<text x="38" y="106" ${F} font-size="9" font-weight="700" fill="#0c1d2e">3.</text><rect x="50" y="100" width="108" height="4" rx="2" fill="#a3b3c4"/>` +
      '<path d="M50 120 H198" stroke="#a3b3c4" stroke-dasharray="3 3"/><path d="M50 134 H198" stroke="#a3b3c4" stroke-dasharray="3 3"/>' +
      '<circle cx="262" cy="40" r="20" fill="#fb8d2b"/><path d="m262 28 3.6 7.4 8 1.2-5.8 5.6 1.4 8-7.2-3.8-7.2 3.8 1.4-8-5.8-5.6 8-1.2z" fill="#ffffff"/>';
  } else if (tipo === 'Vídeo') {
    out =
      '<rect width="320" height="150" fill="#0c1d2e"/><rect width="320" height="150" fill="#0b4876" opacity=".55"/>' +
      puntos('#ffffff', 0.08) +
      '<path d="M30 104 L80 70 L120 88 L170 46 L220 66 L290 30" fill="none" stroke="#21bcaa" stroke-width="3"/><circle cx="170" cy="46" r="5" fill="#fcb527"/>' +
      '<circle cx="160" cy="70" r="24" fill="#fcb527"/><path d="M152 58 L174 70 L152 82 Z" fill="#073157"/>' +
      `<text x="18" y="24" ${F} font-size="11" font-weight="700" fill="#ffffff">${esc(l1)}</text>` +
      `<rect x="18" y="128" width="284" height="4" rx="2" fill="#4a5b6c"/><rect x="18" y="128" width="${h(2, 70, 90)}" height="4" rx="2" fill="#fb8d2b"/>` +
      `<text x="18" y="146" ${F} font-size="9" fill="#dfe8f2">04:12</text><text x="276" y="146" ${F} font-size="9" fill="#dfe8f2">12:00</text>`;
  } else if (tipo === 'Juego') {
    let fichas = '';
    for (let i = 0; i < 8; i++) {
      const x = 26 + (i % 4) * 52;
      const y = 40 + Math.floor(i / 4) * 52;
      const on = (i + s) % 3 === 0;
      fichas +=
        `<rect x="${x}" y="${y}" width="44" height="44" rx="8" fill="${on ? '#073157' : '#ffffff'}"/>` +
        `<text x="${x + 22}" y="${y + 29}" ${F} font-size="18" font-weight="900" text-anchor="middle" fill="${on ? '#fcb527' : '#073157'}">${on ? '?' : i + 1}</text>`;
    }
    out =
      '<rect width="320" height="150" fill="#fb8d2b"/>' +
      puntos('#073157', 0.12) +
      fichas +
      `<text x="26" y="28" ${F} font-size="11" font-weight="700" fill="#0c1d2e">${esc(l1)}</text>` +
      `<rect x="242" y="40" width="58" height="96" rx="10" fill="#073157"/><circle cx="271" cy="70" r="12" fill="none" stroke="#fcb527" stroke-width="3"/><rect x="261" y="78" width="20" height="16" rx="3" fill="#fcb527"/><text x="271" y="122" ${F} font-size="10" font-weight="700" text-anchor="middle" fill="#ffffff">RETO</text>`;
  } else if (tipo === 'Hoja de cálculo') {
    let celdas = '';
    for (let r = 0; r < 6; r++)
      for (let c = 0; c < 5; c++) {
        const relleno = r === 0 ? '#073157' : (r + c + s) % 5 === 0 ? '#d6f2ee' : '#ffffff';
        celdas += `<rect x="${30 + c * 52}" y="${18 + r * 20}" width="52" height="20" fill="${relleno}" stroke="#c9d6e2"/>`;
      }
    out = `<rect width="320" height="150" fill="#dfe8f2"/>${celdas}<text x="36" y="32" ${F} font-size="9" font-weight="700" fill="#ffffff">${esc(l1.slice(0, 18))}</text>`;
  } else {
    let barras = '';
    for (let k = 0; k < 6; k++) {
      const bh = h(k, 14, 30);
      barras += `<rect x="${54 + k * 18}" y="${150 - bh - 14}" width="12" height="${bh}" rx="2" fill="${k === 3 ? '#fb8d2b' : '#7fb9e6'}"/>`;
    }
    out =
      '<rect width="320" height="150" fill="#e6edf4"/>' +
      '<rect x="176" y="24" width="124" height="150" rx="4" fill="#ffffff" opacity=".75" transform="rotate(6 236 96)"/>' +
      '<rect x="40" y="12" width="156" height="164" rx="4" fill="#ffffff" stroke="#c9d6e2"/><rect x="40" y="12" width="156" height="6" fill="#073157"/>' +
      `<text x="52" y="36" ${F} font-size="10" font-weight="700" fill="#0c1d2e">${esc(l1)}</text>` +
      (l2
        ? `<text x="52" y="49" ${F} font-size="10" font-weight="700" fill="#0c1d2e">${esc(l2.slice(0, 22))}</text>`
        : '') +
      '<rect x="52" y="58" width="130" height="3" rx="1.5" fill="#a3b3c4"/><rect x="52" y="66" width="116" height="3" rx="1.5" fill="#a3b3c4"/><rect x="52" y="74" width="124" height="3" rx="1.5" fill="#a3b3c4"/><rect x="52" y="82" width="90" height="3" rx="1.5" fill="#a3b3c4"/>' +
      barras +
      '<rect x="50" y="136" width="136" height="1" fill="#7a8b9c"/>' +
      `<rect x="150" y="20" width="38" height="16" rx="3" fill="#fb8d2b"/><text x="169" y="31" ${F} font-size="9" font-weight="700" text-anchor="middle" fill="#0c1d2e">PDF</text>`;
  }
  return (
    'data:image/svg+xml;charset=utf-8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 150" preserveAspectRatio="xMidYMid slice">${out}</svg>`,
    )
  );
}

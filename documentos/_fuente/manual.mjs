// Genera manual.html (el manual de marca). Después, generar-pdf.mjs lo pasa a PDF.
// Uso: node manual.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const aqui = path.dirname(fileURLToPath(import.meta.url));
const iconosDir = path.join(aqui, "../../design/assets/iconos");

// ---------- ayudas ----------
const logo = (nombre, estilo = "") =>
  `<img src="../../design/assets/logo/linkedu-${nombre}.svg" alt="Logo LinkEdu ${nombre}" style="${estilo}">`;

// Contraste WCAG entre dos colores
const lum = (hex) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const contraste = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};
const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(", ");
const hsl = (hex) => {
  let [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
  let h = 0;
  const l = (mx + mn) / 2;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (d) h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return `${Math.round(((h * 60) + 360) % 360)}°, ${Math.round(s * 100)} %, ${Math.round(l * 100)} %`;
};
const textoSobre = (hex) => (contraste(hex, "#0c1d2e") > contraste(hex, "#ffffff") ? "#0c1d2e" : "#ffffff");

const iconos = fs.readdirSync(iconosDir).filter((f) => f.endsWith(".svg")).sort()
  .map((f) => ({ nombre: f.replace(".svg", ""), svg: fs.readFileSync(path.join(iconosDir, f), "utf8") }));
const icono = (nombre, tam = 24, color = "currentColor") => {
  const i = iconos.find((x) => x.nombre === nombre);
  return i.svg.replace('width="24" height="24"', `width="${tam}" height="${tam}"`).replace(/currentColor/g, color);
};

// ---------- estructura de página ----------
const franja = `<div class="franja" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>`;
let nPag = 0;
const pagina = (seccion, titulo, intro, cuerpo, extra = "") => {
  nPag++;
  return `<section class="page">
  ${franja}
  <header class="cab"><span class="kicker">Manual de marca · ${seccion}</span>${logo("integrado", "height:22px")}</header>
  <div class="cont">
    <div class="tit"><div><span class="sec">${seccion.split(" ")[0]}</span><h2>${titulo}</h2></div><p class="intro">${intro}</p></div>
    <div class="cuerpo ${extra}">${cuerpo}</div>
  </div>
  <footer class="pie"><span>LinkEdu · Manual de marca · Versión 1.0 · Noviembre de 2026</span><span class="num">${nPag}</span></footer>
</section>`;
};

const paginas = [];

// ============ 1. PORTADA ============
nPag++;
paginas.push(`<section class="page portada">
  <div class="p-izq">
    <div>${logo("completo-blanco", "width:430px")}</div>
    <div class="p-tit">
      <span class="kicker" style="color:var(--cielo)">Identidad visual · Versión 1.0</span>
      <h1>Manual de <span class="subrayado" style="color:#fff;background:linear-gradient(transparent 62%, rgba(252,181,39,.9) 62%)">marca</span></h1>
      <p>Logo, colores, tipografías, iconos y voz de la red profesional de la educación.</p>
    </div>
    <div class="p-pie"><span class="kicker" style="color:var(--cielo)">Noviembre de 2026</span><span class="kicker" style="color:var(--cielo)">Iván · Antonio</span></div>
  </div>
  <div class="p-der">
    <div class="p-rejilla"></div>
    ${logo("icono-blanco", "position:absolute;width:560px;left:-20px;top:120px")}
    <span class="p-p1"></span><span class="p-p2"></span><span class="p-p3"></span>
  </div>
  <div class="franja" aria-hidden="true" style="position:absolute;left:0;right:0;bottom:0;height:10px"><span></span><span></span><span></span><span></span><span></span></div>
</section>`);

// ============ 2. LA MARCA + ÍNDICE ============
const indice = [
  ["01", "Logo principal"], ["02", "Versiones del logo"], ["03", "Variantes de color y fondos"], ["04", "Zona de seguridad y mínimos"],
  ["05", "Usos incorrectos"], ["06", "Colores del logo"], ["07", "Paleta de la interfaz"], ["08", "La franja y el subrayado"],
  ["09", "Contraste y accesibilidad"], ["10", "Tipografías"], ["11", "Escala tipográfica"], ["12", "Iconografía"],
  ["13", "Forma, espacio y componentes"], ["14", "Composición de pantalla"], ["15", "La marca en la app"], ["16", "Versión móvil"],
  ["17", "Fotografía e ilustración"], ["18", "Voz y tono"],
];
const principios = [
  ["red", "Conectar docentes", "Docentes del mismo perfil se encuentran, aunque estén en otro centro o en otro país."],
  ["proyecto", "Proyectos colaborativos", "Centros distintos trabajan juntos en un mismo proyecto, con tablero y chat."],
  ["recurso", "Compartir recursos", "Fichas, presentaciones y vídeos para el aula, como en una red social."],
  ["perfil", "Alumnado", "El alumnado también tiene su sitio y aprende con quien le enseña."],
  ["empleo", "Empresas y docentes libres", "Las empresas encuentran y contratan a docentes que se publican como libres."],
];
paginas.push(pagina("00 La marca", "Qué es LinkEdu",
  "LinkEdu es la red profesional de la educación: una comunidad donde docentes, alumnado y empresas se conectan.",
  `<div class="g2" style="grid-template-columns: 1.15fr 1fr;">
    <div class="col">
      <div class="panel" style="padding:26px 28px;">
        <span class="kicker" style="color:var(--cielo)">Eslogan</span>
        <p style="font-family:var(--display);font-weight:800;font-size:34px;line-height:38px;margin:6px 0 10px">Red educativa <span class="subrayado" style="background:linear-gradient(transparent 62%, rgba(252,181,39,.9) 62%)">conectada</span></p>
        <p style="color:var(--cielo)">Un “LinkedIn de la educación”, hecho por y para el sector educativo, sin ánimo de lucro.</p>
      </div>
      ${principios.map(([ic, t, d]) => `<div class="card fila p" style="flex:1;justify-content:flex-start"><span class="caja-ic">${icono(ic, 22, "var(--azul)")}</span><div><h4>${t}</h4><p>${d}</p></div></div>`).join("")}
    </div>
    <div class="card" style="padding:22px 26px;background:var(--soft);display:flex;flex-direction:column">
      <h3 style="font-size:20px;margin-bottom:8px">Índice</h3>
      <ol class="indice">${indice.map(([n, t]) => `<li><span class="kicker">${n}</span><span>${t}</span></li>`).join("")}</ol>
    </div>
  </div>`));

// ============ 3. LOGO PRINCIPAL ============
paginas.push(pagina("01 Logo", "Logo principal",
  "Una “e” azul con un punto naranja, y la palabra linkedu. Sin birrete ni adornos: la marca se reconoce en un solo vistazo.",
  `<div class="g2" style="grid-template-columns: 1.45fr 1fr;">
    <div class="card" style="background:var(--soft);display:flex;align-items:center;justify-content:center;padding:36px;position:relative;">
      <span class="kicker" style="position:absolute;left:22px;top:18px;color:var(--ink-muted)">Logo completo · versión en color</span>
      ${logo("completo", "width:100%")}
    </div>
    <div class="col">
      <div class="card fila" style="flex:1;align-items:center"><span class="mini" style="background:var(--logo-azul)"></span><div><h4>La “e”</h4><p>El icono de la marca. Es la “e” de edu, con una abertura que la deja abierta, como una red lista para conectar.</p></div></div>
      <div class="card fila" style="flex:1;align-items:center"><span class="mini" style="background:var(--logo-naranja);border-radius:50%"></span><div><h4>El punto naranja</h4><p>El único acento cálido. Se repite como punto final de “linkedu.” y marca un punto de la red: un docente, un centro, un proyecto.</p></div></div>
      <div class="card fila" style="flex:1;align-items:center"><span class="mini" style="background:var(--logo-marino)"></span><div><h4>La palabra</h4><p>“link” en marino y “edu” en azul. Letra redondeada y de trazo grueso, amable y legible a cualquier tamaño.</p></div></div>
      <div class="card fila" style="flex:1;align-items:center"><span class="mini" style="background:var(--amarillo-soft);border:1px solid var(--amarillo)"></span><div><h4>El eslogan</h4><p>“Red educativa conectada” solo aparece en la versión completa. En tamaños pequeños no se lee.</p></div></div>
    </div>
  </div>`));

// ============ 4. VERSIONES ============
const versiones = [
  ["completo", "Completo", "Portadas, presentaciones y vídeo. Es la única con el eslogan.", "width:86%"],
  ["horizontal", "Horizontal", "Cabecera de la web, firmas y documentos.", "width:86%"],
  ["vertical", "Vertical", "Portadas, pantalla de carga y redes sociales.", "height:150px"],
  ["icono", "Icono", "Favicon, icono de app y avatar de la marca.", "height:140px"],
  ["texto", "Texto", "Espacios estrechos donde el icono no se lee.", "width:84%"],
  ["integrado", "Integrado", "Cabecera de la app: la “e” del icono hace de “e” de la palabra.", "width:84%"],
];
paginas.push(pagina("02 Versiones", "Seis versiones del logo",
  "Cada versión sirve para un sitio. Elige la que mejor se lea en el espacio disponible; nunca montes una nueva.",
  `<div class="g3" style="grid-template-rows:1fr 1fr;">
    ${versiones.map(([f, n, u, est]) => `<div class="card vers">
      <div class="vers-img">${logo(f, est)}</div>
      <div class="vers-txt"><h4>${n}</h4><p>${u}</p><code>linkedu-${f}.svg</code></div></div>`).join("")}
  </div>`));

// ============ 5. VARIANTES DE COLOR Y FONDOS ============
paginas.push(pagina("03 Variantes", "Tres colores, cuatro fondos",
  "Cada versión existe en tres colores: color, una tinta azul marino (-azul) y blanco (-blanco).",
  `<div class="col" style="gap:18px">
    <div class="g3" style="flex:1.25">
      <div class="card var"><div class="var-img" style="background:#fff">${logo("horizontal", "width:82%")}</div><div class="var-txt"><h4>Color</h4><p>La versión principal. Sobre fondos claros: blanco o gris azulado.</p><code>linkedu-horizontal.svg</code></div></div>
      <div class="card var"><div class="var-img" style="background:#fff">${logo("horizontal-azul", "width:82%")}</div><div class="var-txt"><h4>Una tinta · -azul</h4><p>Marino #102344. Cuando el color sobra o se imprime a una sola tinta.</p><code>linkedu-horizontal-azul.svg</code></div></div>
      <div class="card var"><div class="var-img" style="background:var(--logo-marino)">${logo("horizontal-blanco", "width:82%")}</div><div class="var-txt"><h4>Blanco · -blanco</h4><p>A una tinta, sobre marino, paneles, azul y fotos oscuras.</p><code>linkedu-horizontal-blanco.svg</code></div></div>
    </div>
    <div class="g4" style="flex:1">
      ${[
        ["#ffffff", "horizontal", "Blanco · Color", true],
        ["#ebf0f5", "horizontal-azul", "Gris azulado · Una tinta", true],
        ["#102344", "horizontal-blanco", "Marino · Blanco", true],
        ["#016bfc", "horizontal-blanco", "Azul · Blanco", true],
      ].map(([bg, f, t]) => `<div class="fondo" style="background:${bg};${bg === "#ffffff" ? "border:1px solid var(--line)" : ""}">${logo(f, "width:78%")}<span class="ok" title="Correcto">${icono("check", 16, "#fff")}</span><span class="fondo-t kicker" style="color:${textoSobre(bg)}">${t}</span></div>`).join("")}
    </div>
  </div>`));

// ============ 6. ZONA DE SEGURIDAD Y TAMAÑO MÍNIMO ============
// x = diámetro del punto naranja. En el logo horizontal mide el 23,6 % del alto (149 de 632 unidades)
// y en el icono el 19,6 % (149 de 760).
const zonaHtml = (nombre, alto, ancho, fx) => {
  const x = Math.round(alto * fx);
  return '<div class="zona" style="padding:' + x + 'px;"><div style="width:' + ancho + 'px;height:' + alto + 'px">' + logo(nombre, "width:100%;height:100%") + '</div>' +
    ["tl", "tr", "bl", "br"].map((c) => '<span class="esq ' + c + '"></span>').join("") +
    '<span class="medida" style="height:' + x + 'px;width:' + x + 'px;left:0;top:0"><b>x</b></span></div>';
};
paginas.push(pagina("04 Seguridad", "Zona de seguridad y mínimos",
  "Alrededor del logo no entra nada: ni texto, ni bordes, ni otras imágenes.",
  `<div class="g2" style="grid-template-columns: 1.3fr 1fr;">
    <div class="card" style="background:var(--soft);display:flex;flex-direction:column;overflow:hidden">
      <div style="flex:1.5;display:flex;align-items:center;justify-content:center;padding:14px">${zonaHtml("horizontal", 130, 130 * 1956.5 / 632, 0.236)}</div>
      <div style="flex:1;display:grid;grid-template-columns:auto 1fr;gap:26px;align-items:center;padding:14px 28px;border-top:1px solid var(--line);background:#fff">
        ${zonaHtml("icono", 110, 110, 0.196)}
        <div><h4>x = el diámetro del punto naranja</h4><p style="font-size:14px;line-height:20px;color:var(--ink-muted);margin-top:4px">Es el espacio libre mínimo por los cuatro lados. En el logo horizontal equivale a casi el 24 % de su alto; en el icono, a casi el 20 %.</p></div>
      </div>
    </div>
    <div class="col">
      <h3 style="font-size:20px">Tamaño mínimo</h3>
      <div class="card minimo"><div class="mn-img">${logo("completo", "width:100%")}</div><div><h4>Completo</h4><p>40 mm · 150 px de ancho</p></div></div>
      <div class="card minimo"><div class="mn-img">${logo("horizontal", "width:78%")}</div><div><h4>Horizontal</h4><p>25 mm · 96 px de ancho</p></div></div>
      <div class="card minimo"><div class="mn-img">${logo("integrado", "width:72%")}</div><div><h4>Integrado</h4><p>25 mm · 96 px de ancho<br><span style="color:var(--ink-muted)">En la cabecera de la app: 44 px de alto.</span></p></div></div>
      <div class="card minimo"><div class="mn-img">${logo("icono", "height:40px")}</div><div><h4>Icono</h4><p>5 mm · 16 px (favicon)</p></div></div>
    </div>
  </div>`));

// ============ 7. USOS INCORRECTOS ============
const malos = [
  ["No lo deformes", "transform:scale(1.4,.7)"],
  ["No lo gires", "transform:rotate(-14deg)"],
  ["No le pongas sombra", "filter:drop-shadow(6px 8px 5px rgba(0,0,0,.5))"],
  ["No cambies sus colores", "filter:hue-rotate(110deg) saturate(1.4)"],
  ["No lo uses con poco contraste", "", "#016bfc"],
  ["No lo vuelvas transparente", "opacity:.25"],
];
paginas.push(pagina("05 Usos incorrectos", "Lo que no hay que hacer",
  "El logo se usa tal cual viene en los archivos. Si necesitas otro color o tamaño, elige otra versión.",
  `<div class="g3" style="grid-template-rows:1fr 1fr;">
    ${malos.map(([t, est, bg]) => `<div class="card malo"><div class="malo-img" style="background:${bg ?? "#fff"}"><div style="width:60%;display:flex;justify-content:center;overflow:visible">${logo(bg ? "horizontal-azul" : "horizontal", `width:${bg ? "70" : "100"}%;${est}`)}</div><span class="no">${icono("cerrar", 18, "#fff")}</span></div><p><strong>${t}</strong></p></div>`).join("")}
  </div>`));

// ============ 8. COLORES DEL LOGO ============
const coloresLogo = [
  ["Marino", "#102344", "La palabra “link”, el logo a una tinta y los fondos del logo blanco.", 50],
  ["Azul", "#016bfc", "La “e” del icono y la palabra “edu”.", 35],
  ["Naranja", "#fe5c01", "El punto. Un acento pequeño, nunca un fondo grande.", 15],
];
paginas.push(pagina("06 Colores del logo", "Los tres colores del logo",
  "Son los colores de los archivos SVG del logo. No se modifican ni se mezclan con otros.",
  `<div class="col" style="gap:16px">
    <div class="g3" style="flex:1">
      ${coloresLogo.map(([n, h, u]) => `<div class="sw-grande" style="background:${h};color:${textoSobre(h)}">
        <span class="kicker">Color del logo</span>
        <div><h3 style="color:inherit;font-size:40px;line-height:42px">${n}</h3><p style="font-family:var(--mono);font-size:22px;font-weight:500;margin:4px 0 10px">${h.toUpperCase()}</p>
        <p style="font-size:13px;line-height:19px;opacity:.95">RGB ${rgb(h)}<br>HSL ${hsl(h)}</p></div>
        <p style="font-size:13px;line-height:19px;border-top:1px solid currentColor;padding-top:10px;opacity:.95">${u}</p></div>`).join("")}
    </div>
    <div class="card" style="padding:16px 22px;display:grid;grid-template-columns:auto 1fr;gap:22px;align-items:center">
      <div><h4>Proporción en el logo</h4><p style="font-size:13px;color:var(--ink-muted)">Predomina el marino; el naranja es solo el punto.</p></div>
      <div style="display:flex;height:34px;border-radius:8px;overflow:hidden">${coloresLogo.map(([n, h, , p]) => `<span style="flex:${p};background:${h};color:${textoSobre(h)};display:flex;align-items:center;padding-left:12px;font-weight:700;font-size:13px">${n} · ${p} %</span>`).join("")}</div>
    </div>
  </div>`));

// ============ 9. PALETA DE LA INTERFAZ ============
const sw = (n, h, u, extra = "") => `<div class="sw ${extra}"><div class="sw-c" style="background:${h};color:${textoSobre(h)};${["#ffffff", "#f6f8fb", "#ebf0f5", "#fff7e0"].includes(h) ? "border-bottom:1px solid var(--line)" : ""}"><span class="kicker">${h.toUpperCase()}</span></div><div class="sw-t"><h4>${n}</h4><p>${u}</p></div></div>`;
paginas.push(pagina("07 Interfaz", "Paleta de la interfaz",
  "El logo conserva sus tres colores; la interfaz usa los tokens de tokens.json (los de la app), que salen de los colores del primer logo. Solo tema claro.",
  `<div class="col" style="gap:12px">
    <div class="g5" style="flex:1.1">
      ${sw("Marino", "#073157", "Marca y acción principal. Un botón primary por vista. También los paneles.")}
      ${sw("Azul", "#0a6a99", "Enlaces, información, iconos de recurso y anillo de foco.")}
      ${sw("Turquesa", "#21bcaa", "“Disponible” o “activo”. Siempre como fondo.")}
      ${sw("Naranja", "#fb8d2b", "El acento: lo nuevo. Marca una sola cosa por vista.")}
      ${sw("Amarillo", "#fcb527", "El subrayado, la franja y la portada.")}
    </div>
    <div class="g6" style="flex:1">
      ${sw("Paper", "#ebf0f5", "Fondo de la página.")}
      ${sw("Surface", "#ffffff", "Tarjetas y cabecera.")}
      ${sw("Surface soft", "#f6f8fb", "Bloques dentro de una tarjeta.")}
      ${sw("Line", "#d3dce6", "Borde de tarjetas.")}
      ${sw("Ink", "#0c1d2e", "Texto principal.")}
      ${sw("Ink muted", "#4a5b6c", "Texto secundario.")}
    </div>
    <div class="g6" style="flex:1">
      ${sw("Marino soft", "#dfe8f2", "Etiquetas de materia y botón tonal.")}
      ${sw("Azul soft", "#e3f1f9", "Etiquetas de etapa y avisos.")}
      ${sw("Cielo", "#a3cdef", "Texto secundario sobre marino.")}
      ${sw("Marino hover", "#0b4876", "Marino al pasar el ratón.")}
      ${sw("Warning", "#8a4b00", "Plazo a punto de cerrar.")}
      ${sw("Danger", "#b3261e", "Errores y acciones destructivas.")}
    </div>
  </div>`));

// ============ 10. FRANJA Y SUBRAYADO ============
paginas.push(pagina("08 Firmas", "La franja y el subrayado",
  "Dos gestos propios que hacen reconocible la marca en cualquier pantalla o documento.",
  `<div class="col" style="gap:16px">
    <div class="card" style="padding:20px 26px;flex:0.8;display:flex;flex-direction:column;justify-content:center">
      <div style="display:flex;justify-content:space-between;align-items:baseline"><h3 style="font-size:22px">La franja</h3><span class="kicker" style="color:var(--ink-muted)">6 px · arriba del todo</span></div>
      <p style="margin:6px 0 16px;max-width:760px">Una barra con los cinco colores de la marca en proporción <strong>4 : 2 : 2 : 1 : 1</strong>. Va arriba en cada pantalla, en la portada y en los documentos (como en este manual).</p>
      <div class="franja" style="height:44px;border-radius:8px;overflow:hidden" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>
      <div style="display:flex;margin-top:8px;font-family:var(--mono);font-size:12px;color:var(--ink-muted)"><span style="flex:4">Marino ×4</span><span style="flex:2">Azul ×2</span><span style="flex:2">Turquesa ×2</span><span style="flex:1">Amarillo</span><span style="flex:1">Naranja</span></div>
    </div>
    <div class="g2" style="flex:1.5;grid-template-columns:1.3fr 1fr">
      <div class="card" style="padding:22px 26px;display:flex;flex-direction:column;justify-content:space-between">
        <div><h3 style="font-size:22px">El subrayado</h3><p style="margin-top:6px">Pasar el subrayador por una palabra. Franja amarilla en el 40 % inferior del texto. Solo en titulares y en la palabra clave de un estado vacío; nunca en texto de interfaz.</p></div>
        <p style="font-family:var(--display);font-weight:800;font-size:44px;line-height:48px;color:var(--marino);letter-spacing:-0.02em">Enseña con <span class="subrayado">más gente</span></p>
      </div>
      <div class="col" style="gap:10px">
        <div class="card" style="padding:14px 18px;flex:1"><h4>Un acento por vista</h4><p style="font-size:13px;line-height:19px">Si todo está destacado en naranja, nada lo está.</p></div>
        <div class="card" style="padding:14px 18px;flex:1"><h4>Como mucho dos paneles</h4><p style="font-size:13px;line-height:19px">Un panel marino por columna, para destacar un bloque entero.</p></div>
        <div class="card" style="padding:14px 18px;flex:1"><h4>El turquesa informa</h4><p style="font-size:13px;line-height:19px">Significa “disponible” o “activo”; no decora.</p></div>
        <div class="card" style="padding:14px 18px;flex:1"><h4>Colores planos</h4><p style="font-size:13px;line-height:19px">Sin degradados ni sombras en la interfaz.</p></div>
      </div>
    </div>
  </div>`));

// ============ 11. CONTRASTE ============
const pares = [
  ["Texto principal", "#0c1d2e", "#ebf0f5"],
  ["Texto secundario", "#4a5b6c", "#ffffff"],
  ["Texto sobre marino", "#ffffff", "#073157"],
  ["Texto secundario sobre marino", "#a3cdef", "#073157"],
  ["Enlace", "#0a6a99", "#ffffff"],
  ["Texto sobre turquesa", "#0c1d2e", "#21bcaa"],
  ["Texto sobre naranja", "#0c1d2e", "#fb8d2b"],
  ["Texto sobre amarillo", "#0c1d2e", "#fcb527"],
  ["Enlace amarillo sobre panel", "#fcb527", "#073157"],
  ["Logo blanco sobre marino del logo", "#ffffff", "#102344"],
  ["Logo blanco sobre azul del logo", "#ffffff", "#016bfc"],
  ["Naranja como texto sobre blanco", "#fb8d2b", "#ffffff"],
];
const nivel = (r) => (r >= 7 ? ["AAA", "ok"] : r >= 4.5 ? ["AA", "ok"] : r >= 3 ? ["Solo grande / icono", "med"] : ["No cumple", "mal"]);
paginas.push(pagina("09 Accesibilidad", "Contraste y accesibilidad",
  "LinkEdu es una red educativa: se tiene que leer bien. Estos son los contrastes (WCAG) de las combinaciones de la marca.",
  `<div class="g2" style="grid-template-columns:1.6fr 1fr;">
    <div class="card" style="padding:6px 0;overflow:hidden">
      <table class="tabla">
        <tr><th>Combinación</th><th>Muestra</th><th>Ratio</th><th>Nivel</th></tr>
        ${pares.map(([n, f, b]) => { const r = contraste(f, b); const [niv, cl] = nivel(r); return `<tr><td>${n}<br><span class="hx">${f.toUpperCase()} sobre ${b.toUpperCase()}</span></td><td><span class="muestra" style="color:${f};background:${b}">Aa</span></td><td class="r">${r.toFixed(1).replace(".", ",")} : 1</td><td><span class="niv ${cl}">${niv}</span></td></tr>`; }).join("")}
      </table>
    </div>
    <div class="col">
      <div class="panel" style="padding:20px 22px"><span class="kicker" style="color:var(--cielo)">Mínimos</span>
        <p style="font-family:var(--display);font-weight:700;font-size:22px;line-height:26px;margin:6px 0 8px">4,5 : 1 para texto<br>3 : 1 para bordes e iconos</p>
        <p style="color:var(--cielo);font-size:13px;line-height:19px">Nivel AA de las pautas WCAG. El texto de los paneles llega a 7 : 1.</p></div>
      <div class="card" style="padding:16px 20px;flex:1"><h4>Turquesa y naranja: nunca texto</h4><p style="font-size:14px;line-height:20px">Son colores de fondo. Con texto oscuro encima cumplen; como texto sobre blanco no llegan.</p></div>
      <div class="card" style="padding:16px 20px;flex:1"><h4>Nunca solo color</h4><p style="font-size:14px;line-height:20px">Un estado se explica también con icono y texto (por ejemplo “Atención”), no solo con un color.</p></div>
      <div class="card" style="padding:16px 20px;flex:1"><h4>Foco visible</h4><p style="font-size:14px;line-height:20px">Anillo doble (oscuro y amarillo) al navegar con el Tabulador. Objetivos táctiles de 40–44 px como mínimo.</p></div>
    </div>
  </div>`));

// ============ 12. TIPOGRAFÍAS ============
const tipos = [
  ["Títulos y nombres", "Bricolage Grotesque", "var(--display)", "500 · 600 · 700 · 800", "Tiene carácter, pero se usa poco: el saludo, la cifra de un panel, el título de una tarjeta.", "800", "Buenos días, Lucía", 30],
  ["Todo el texto", "Atkinson Hyperlegible", "var(--sans)", "400 · 700", "Diseñada para leerse bien con baja visión: encaja con una red educativa accesible.", "700", "He subido la unidad didáctica de robótica con Arduino que usamos en 4º de ESO.", 17],
  ["Datos", "IBM Plex Mono", "var(--mono)", "500", "Solo para datos: tipo de recurso en mayúsculas y contadores con cifras tabulares.", "500", "PROYECTO COLABORATIVO<br>1.248 descargas", 15],
];
paginas.push(pagina("10 Tipografías", "Tres tipografías",
  "Las tres son de Google Fonts, de licencia abierta (SIL OFL). Cada una tiene un trabajo distinto.",
  `<div class="g3">
    ${tipos.map(([rol, n, fam, pesos, desc, peso, ej, tamEj]) => `<div class="card tipo">
      <span class="kicker" style="color:var(--azul)">${rol}</span>
      <div class="aa" style="font-family:${fam};font-weight:${peso}">Aa</div>
      <h3 style="font-family:${fam};font-weight:${peso};font-size:26px;line-height:30px;color:var(--marino)">${n}</h3>
      <p class="abc" style="font-family:${fam};font-weight:${peso}">ABCDEFGHIJKLMNÑOPQRSTUVWXYZ<br>abcdefghijklmnñopqrstuvwxyz<br>0123456789 € % ¿? ¡! á é í ó ú ü</p>
      <p style="font-size:14px;line-height:20px;color:var(--ink-muted)">${desc}</p>
      <div class="ejemplo" style="font-family:${fam};font-weight:${peso};font-size:${tamEj}px;line-height:${Math.round(tamEj * 1.35)}px;${fam.includes("mono") ? "letter-spacing:.06em;" : ""}">${ej}</div>
      <p class="pesos"><span class="kicker">Pesos</span> ${pesos}</p>
    </div>`).join("")}
  </div>`));

// ============ 13. ESCALA TIPOGRÁFICA ============
const escala = [
  ["display-xl", "Bricolage 800", "56 / 60", "Enseña en red", "var(--display)", 56, 800, "Portada y landing. Una vez por página."],
  ["display-l", "Bricolage 700", "40 / 44", "Proyectos colaborativos", "var(--display)", 40, 700, "Título de sección grande."],
  ["title", "Bricolage 700", "30 / 36", "Buenos días, Lucía", "var(--display)", 30, 700, "Saludo y título de página."],
  ["figure", "Bricolage 800", "28 / 34", "28 €/hora", "var(--display)", 28, 800, "La cifra que importa en un panel."],
  ["card-title", "Bricolage 700", "20 / 26", "Ciencia ciudadana: medimos el aire del barrio", "var(--display)", 20, 700, "Título de tarjeta."],
  ["section-title", "Bricolage 600", "17 / 24", "Docentes de tu perfil", "var(--display)", 17, 600, "Título de bloque en columnas."],
  ["body-l", "Atkinson 400", "17 / 26", "He subido la unidad didáctica de robótica con Arduino.", "var(--sans)", 17, 400, "Publicaciones y entradilla."],
  ["body", "Atkinson 400", "16 / 24", "Tres centros de Madrid y Valencia montan sensores.", "var(--sans)", 16, 400, "Texto por defecto."],
  ["body-s", "Atkinson 400", "14 / 20", "Profesor de Tecnología · FP · hace 2 h", "var(--sans)", 14, 400, "Metadatos y ayudas."],
  ["label", "Atkinson 700", "14 / 20", "Crear proyecto", "var(--sans)", 14, 700, "Etiquetas, botones y navegación."],
  ["kicker", "Plex Mono 500", "12 / 16", "PROYECTO COLABORATIVO", "var(--mono)", 12, 500, "Tipo de recurso, en mayúsculas."],
  ["stat", "Plex Mono 500", "13 / 18", "1.248 descargas", "var(--mono)", 13, 500, "Contadores con cifras tabulares."],
];
paginas.push(pagina("11 Escala", "Escala tipográfica",
  "Doce estilos y nada más. Tamaño y altura de línea en píxeles. Texto corrido a 65 caracteres por línea como máximo.",
  `<div class="card" style="padding:4px 0;overflow:hidden;display:flex;flex-direction:column;height:100%">
    ${escala.map(([n, f, t, m, fam, sz, w, u]) => `<div class="esc" style="flex:${n === "display-xl" ? 1.5 : n === "display-l" ? 1.2 : n === "title" ? 1.1 : 1}"><span class="e-n"><b>${n}</b><span>${f} · ${t}</span></span><span class="e-m" style="font-family:${fam};font-size:${sz}px;font-weight:${w};line-height:1;${n === "kicker" ? "letter-spacing:.08em;" : ""}color:${n.startsWith("display") || n === "title" || n === "figure" ? "var(--marino)" : "var(--ink)"}">${m}</span><span class="e-u">${u}</span></div>`).join("")}
  </div>`));

// ============ 14. ICONOGRAFÍA ============
paginas.push(pagina("12 Iconos", "Iconografía",
  "Un set propio de 26 iconos. Trazo de 2 px, extremos redondeados y esquinas suaves, a juego con las formas de la interfaz.",
  `<div class="g2" style="grid-template-columns:1.7fr 1fr;">
    <div class="rejilla-ic">
      ${iconos.map((i) => `<div class="ic card">${icono(i.nombre, 30, "var(--marino)")}<span>${i.nombre}</span></div>`).join("")}
      <div class="ic ic-nota panel"><span class="figura">${iconos.length}</span><span>iconos en SVG</span></div>
    </div>
    <div class="col">
      <div class="card" style="padding:16px 20px"><h4 style="margin-bottom:10px">Tamaños y color</h4>
        <div style="display:flex;align-items:flex-end;gap:22px">
          <div class="tam">${icono("megusta", 16, "var(--azul)")}<span>16 px<br>metadatos</span></div>
          <div class="tam">${icono("megusta", 20, "var(--ink-muted)")}<span>20 px<br>junto a texto</span></div>
          <div class="tam">${icono("megusta", 24, "var(--marino)")}<span>24 px<br>sueltos</span></div>
        </div></div>
      <div class="card" style="padding:16px 20px;flex:1"><h4 style="margin-bottom:8px">Reglas</h4>
        <ul class="reglas">
          <li>Siempre de línea. Solo se rellena para marcar “activo” (el corazón de me gusta).</li>
          <li>Toman el color del texto (<code>currentColor</code>): gris en reposo, marino al estar activos.</li>
          <li>Junto a una etiqueta de texto siempre que se pueda.</li>
          <li>Un icono solo lleva etiqueta para el lector de pantalla.</li>
          <li>Nunca emojis como iconos.</li>
        </ul></div>
      <div class="card" style="padding:14px 20px;display:flex;gap:18px;align-items:center;background:var(--soft)">
        ${["inicio", "red", "proyecto", "recurso", "empleo"].map((n, i) => `<div class="nav-ej ${i === 1 ? "act" : ""}">${icono(n, 20, "currentColor")}</div>`).join("")}
        <span style="font-size:12px;color:var(--ink-muted);line-height:16px">Navegación: el activo en marino con raya</span>
      </div>
    </div>
  </div>`));

// ============ 15. FORMA, ESPACIO Y COMPONENTES ============
paginas.push(pagina("13 Forma y espacio", "Forma y espacio",
  "Estilo plano y ordenado: tarjetas blancas con borde fino sobre fondo gris azulado, esquinas redondeadas y la cuadrícula del cuaderno.",
  `<div class="g3" style="grid-template-rows:1fr 1fr;">
    <div class="card caja"><h4>Radios</h4><div class="radios">
      <div><span style="border-radius:8px"></span>8 px<br><small>botones</small></div>
      <div><span style="border-radius:12px"></span>12 px<br><small>tarjetas</small></div>
      <div><span style="border-radius:20px"></span>20 px<br><small>modales</small></div>
      <div><span style="border-radius:999px"></span>píldora<br><small>etiquetas</small></div></div></div>
    <div class="card caja"><h4>Espacio (paso de 4 px)</h4><div class="espacios">
      ${[[4, "1"], [8, "2"], [12, "3"], [16, "4"], [20, "5"], [24, "6"], [32, "8"], [48, "12"]].map(([p, n]) => '<div><i style="width:' + p * 3.2 + 'px"></i><span>space-' + n + ' · ' + p + ' px</span></div>').join("")}</div></div>
    <div class="card caja"><h4>Profundidad</h4>
      <div style="display:flex;gap:16px;flex:1">
        <div class="plana"><b>Tarjeta plana</b><span>Color + borde fino. Sin sombra.</span></div>
        <div class="flota"><b>Lo que flota</b><span>Menús, avisos y modales. La única sombra.</span></div></div></div>
    <div class="card caja"><h4>Botones</h4><div class="botones"><span class="btn primary">Conectar</span><span class="btn secondary">Guardar recurso</span><span class="btn tonal">Ver más</span><span class="btn highlight">Hazte Premium</span></div>
      <p style="font-size:14px;line-height:20px;color:var(--ink-muted);margin-top:auto">Un botón primary por vista. 40–44 px de alto como mínimo. El verbo va primero.</p></div>
    <div class="card caja"><h4>Etiquetas</h4><div style="display:flex;flex-wrap:wrap;gap:8px"><span class="tag marino">Matemáticas</span><span class="tag azul">Bachillerato</span><span class="tag turquesa">Disponible</span><span class="tag naranja">Plazo abierto</span><span class="tag marino">ABP</span><span class="tag azul">FP</span><span class="tag marino">Tecnología</span><span class="tag azul">ESO</span></div>
      <p style="font-size:14px;line-height:20px;color:var(--ink-muted);margin-top:auto">Materia en marino, etapa en azul, estado en turquesa y novedad en naranja.</p></div>
    <div class="card caja"><h4>Avatares</h4><div style="display:flex;gap:20px;align-items:flex-end;flex:1;justify-content:center">
      ${[[36, 9], [48, 12], [80, 20]].map(([t, r], i) => '<div style="text-align:center"><span class="avatar" style="width:' + t + 'px;height:' + t + 'px;border-radius:' + r + 'px;font-size:' + t / 2.6 + 'px;' + (i === 1 ? "box-shadow:0 0 0 3px #fff,0 0 0 6px var(--turquesa)" : "") + '">LF</span><small style="display:block;margin-top:' + (i === 1 ? 10 : 6) + 'px;font-size:12px;color:var(--ink-muted)">' + t + ' px</small></div>').join("")}</div>
      <p style="font-size:14px;line-height:20px;color:var(--ink-muted)">Cuadrados con el radio a un cuarto del lado, nunca círculos. Anillo turquesa: disponible.</p></div>
  </div>`));

// ============ 16. COMPOSICIÓN ============
const cap = (f) => "capturas/" + f + ".jpg";
paginas.push(pagina("14 Composición", "Composición de pantalla",
  "Todas las pantallas siguen la misma estructura: la franja, la cabecera y tres columnas.",
  `<div class="g2" style="grid-template-columns:1.6fr 1fr;">
    <div class="col" style="gap:12px">
      <div class="card" style="position:relative;overflow:hidden;background:var(--paper);aspect-ratio:1440/900;flex:none">
        <img src="${cap("inicio")}" style="width:100%;height:100%" alt="Pantalla de inicio de la app">
        <span class="pin" style="left:50%;top:1.2%">1</span><span class="pin" style="left:39%;top:6%">2</span>
        <span class="pin" style="left:20%;top:19%">3</span><span class="pin" style="left:73%;top:19%">4</span><span class="pin" style="left:96%;top:19%">5</span>
      </div>
      <div class="card" style="flex:1;padding:12px 18px;display:flex;flex-direction:column;justify-content:center;gap:8px">
        <span class="kicker" style="color:var(--azul)">Medidas en escritorio</span>
        <div class="medidas">
          <span style="flex:0 0 22px;background:var(--paper)">32</span>
          <span style="flex:1.1;background:var(--marino-soft)">260–290</span>
          <span style="flex:0 0 18px;background:var(--paper)">20</span>
          <span style="flex:2.2;background:var(--azul-soft)">flexible · mín. 480</span>
          <span style="flex:0 0 18px;background:var(--paper)">20</span>
          <span style="flex:1.2;background:var(--marino-soft)">300–340</span>
          <span style="flex:0 0 22px;background:var(--paper)">32</span>
        </div>
        <div class="medidas-t"><span>margen</span><span>izquierda</span><span>centro</span><span>derecha</span><span>margen</span></div>
      </div>
    </div>
    <div class="col">
      <div class="card fila p" style="flex:1"><span class="n">1</span><div><h4>La franja</h4><p>6 px arriba del todo.</p></div></div>
      <div class="card fila p" style="flex:1"><span class="n">2</span><div><h4>Cabecera</h4><p>Logo integrado (44 px), buscador, navegación y avatar. En blanco con borde inferior.</p></div></div>
      <div class="card fila p" style="flex:1"><span class="n">3</span><div><h4>Columna izquierda</h4><p>Perfil con banda marino, proyectos y grupos.</p></div></div>
      <div class="card fila p" style="flex:1"><span class="n">4</span><div><h4>Columna central</h4><p>Publicar, feed, proyectos y recursos.</p></div></div>
      <div class="card fila p" style="flex:1"><span class="n">5</span><div><h4>Columna derecha</h4><p>Docentes sugeridos, oferta en panel y eventos.</p></div></div>
      <div class="panel" style="padding:14px 18px;flex:1;display:flex;flex-direction:column;justify-content:center"><span class="kicker" style="color:var(--cielo)">Regla obligatoria</span><p style="font-family:var(--display);font-weight:700;font-size:17px;line-height:21px;margin-top:2px">Ninguna parte en blanco. Si sobra sitio se añade contenido útil, no se estira.</p></div>
    </div>
  </div>`));

// ============ 17. LA MARCA EN LA APP ============
const pantallas = [
  ["inicio", "Inicio", "Publica, comparte y descubre en el feed."],
  ["red", "Mi red", "Tu red en un mapa internacional."],
  ["proyectos", "Proyectos", "Tablero, chat y habilidades validadas."],
  ["recursos", "Recursos", "Fichas, presentaciones y vídeos."],
  ["empleo", "Empleo", "Ofertas y clases particulares."],
  ["perfil", "Perfil", "Profesorado, alumnado y empresas."],
];
paginas.push(pagina("15 En la app", "La marca en la app",
  "Las seis pantallas de la app aplican el manual: franja, logo integrado, tarjetas planas, paneles marino y un solo acento por vista.",
  `<div class="g3" style="grid-template-rows:1fr 1fr;gap:14px">
    ${pantallas.map(([f, n, d]) => `<div class="card pant"><div class="pant-img"><img src="${cap(f)}" alt="Pantalla ${n}"></div><div class="pant-t"><h4>${n}</h4><p>${d}</p></div></div>`).join("")}
  </div>`));

// ============ 18. MÓVIL ============
paginas.push(pagina("16 Móvil", "Versión móvil",
  "En el móvil las columnas se apilan y todas las opciones quedan visibles o a un toque.",
  `<div class="g2" style="grid-template-columns:2fr 1fr;">
    <div class="moviles">
      ${[["inicio", "Inicio"], ["proyectos", "Proyectos"], ["recursos", "Recursos"]].map(([f, n]) => '<div class="movil-c"><div class="movil"><img src="' + cap(f + "-movil") + '" alt="Pantalla ' + n + ' en móvil"></div><span class="kicker">' + n + '</span></div>').join("")}
    </div>
    <div class="col">
      <div class="card fila p" style="flex:1"><span class="caja-ic">${icono("menu", 22, "var(--azul)")}</span><div><h4>Columnas apiladas</h4><p>Orden: centro, izquierda, derecha.</p></div></div>
      <div class="card fila p" style="flex:1"><span class="caja-ic">${icono("perfil", 22, "var(--azul)")}</span><div><h4>Objetivos táctiles</h4><p>40–48 px de alto en botones y campos.</p></div></div>
      <div class="card fila p" style="flex:1"><span class="caja-ic">${icono("filtro", 22, "var(--azul)")}</span><div><h4>Sin menús ocultos</h4><p>Nada de scroll horizontal escondido: desplegables o rejillas visibles.</p></div></div>
      <div class="card fila p" style="flex:1"><span class="caja-ic">${icono("cerrar", 22, "var(--azul)")}</span><div><h4>Ventanas como hoja</h4><p>Las ventanas suben desde abajo, como una hoja, y se cierran con un toque fuera.</p></div></div>
      <div class="panel" style="padding:14px 18px;flex:1;display:flex;flex-direction:column;justify-content:center"><span class="kicker" style="color:var(--cielo)">Mismo manual</span><p style="font-family:var(--display);font-weight:700;font-size:17px;line-height:21px;margin-top:2px">Mismos colores, mismas tipografías, mismo logo. Cambia la composición, no la marca.</p></div>
    </div>
  </div>`));

// ============ 19. FOTOGRAFÍA E ILUSTRACIÓN ============
paginas.push(pagina("17 Imagen", "Fotografía e ilustración",
  "La fotografía enseña a docentes de verdad haciendo su trabajo. La ilustración se construye con las mismas formas que el logo.",
  `<div class="g2" style="grid-template-columns:1fr 1fr;">
    <div class="col">
      <h3 style="font-size:20px">Fotografía</h3>
      <div class="card" style="padding:14px 18px;flex:1"><h4>Personas reales en aulas reales</h4><p style="font-size:13px;line-height:19px">Pizarras con cosas escritas, mesas en grupo, talleres de FP, patios. Nada de sonrisas posadas ni “manos sobre portátil”.</p></div>
      <div class="card" style="padding:14px 18px;flex:1"><h4>Luz natural, sin filtros</h4><p style="font-size:13px;line-height:19px">Luz de ventana, tonos ligeramente fríos que casan con el marino. Sin viñeteado, sin blanco y negro.</p></div>
      <div class="card" style="padding:14px 18px;flex:1"><h4>Encuadre</h4><p style="font-size:13px;line-height:19px">Plano medio o detalle de manos, con aire a un lado para poner texto. 4:3 en tarjetas y 16:9 en cabeceras.</p></div>
      <div class="card" style="padding:14px 18px;flex:1"><h4>Privacidad</h4><p style="font-size:13px;line-height:19px">El alumnado menor no se reconoce nunca (de espaldas, desenfocado o fuera de plano). Toda foto necesita permiso del centro.</p></div>
      <div class="card" style="padding:14px 18px;flex:1"><h4>Texto sobre foto</h4><p style="font-size:13px;line-height:19px">Capa de marino al 70 % y el texto en blanco. Esquinas de 12 px o 20 px, sin borde.</p></div>
    </div>
    <div class="col">
      <h3 style="font-size:20px">Ilustración</h3>
      <div class="card ilus">
        <svg viewBox="0 0 520 250" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Ejemplo de ilustración con formas planas">
          <defs><pattern id="pt" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.4" fill="#073157" opacity=".22"/></pattern></defs>
          <rect width="520" height="250" fill="#ebf0f5"/><rect width="520" height="250" fill="url(#pt)"/>
          <rect x="70" y="40" width="250" height="150" rx="20" fill="#073157"/>
          <rect x="94" y="68" width="120" height="12" rx="6" fill="#a3cdef"/><rect x="94" y="94" width="170" height="12" rx="6" fill="#fff" opacity=".9"/><rect x="94" y="120" width="90" height="12" rx="6" fill="#fcb527"/>
          <rect x="62" y="196" width="266" height="10" rx="5" fill="#0a6a99"/>
          <circle cx="400" cy="70" r="34" fill="#fb8d2b"/>
          <rect x="360" y="124" width="110" height="34" rx="17" fill="#21bcaa"/><rect x="420" y="124" width="70" height="34" rx="17" fill="#0a6a99"/>
          <circle cx="410" cy="190" r="16" fill="#073157"/><rect x="392" y="208" width="36" height="30" rx="14" fill="#073157"/>
        </svg>
      </div>
      <div class="card" style="padding:14px 18px;flex:1"><h4>Formas planas y geométricas</h4><p style="font-size:13px;line-height:19px">Una pizarra es un rectángulo marino; el sol, un círculo naranja; un proyecto, píldoras que se tocan.</p></div>
      <div class="card" style="padding:14px 18px;flex:1"><h4>Solo colores del sistema</h4><p style="font-size:13px;line-height:19px">Como mucho cuatro por ilustración, sobre gris azulado. Sin degradados, sombras ni contornos. Las personas, si salen, sin rasgos.</p></div>
      <div class="card" style="padding:14px 18px;flex:1"><h4>Solo cuando hay sitio vacío</h4><p style="font-size:13px;line-height:19px">En estados vacíos, bienvenida y landing; nunca para decorar una pantalla que ya tiene contenido.</p></div>
    </div>
  </div>`));

// ============ 20. VOZ Y TONO ============
paginas.push(pagina("18 Voz y tono", "Voz y tono",
  "Hablamos de tú, como entre compañeros de claustro: cercanos, sin infantilizar y con las palabras del sector.",
  `<div class="g2" style="grid-template-columns:1fr 1fr;">
    <div class="col">
      <div class="card" style="padding:16px 20px"><h4>Frases cortas, verbo primero</h4><p style="font-size:13px;line-height:19px;margin-bottom:10px">En los botones, la acción por delante.</p><div style="display:flex;gap:8px;flex-wrap:wrap"><span class="btn primary">Conectar</span><span class="btn secondary">Guardar recurso</span><span class="btn tonal">Publicar proyecto</span></div></div>
      <div class="card" style="padding:16px 20px"><h4>Las palabras del sector</h4><p style="font-size:13px;line-height:19px;margin-bottom:10px">Etapa, materia, centro, claustro, unidad didáctica, ABP.</p><div style="display:flex;gap:8px;flex-wrap:wrap"><span class="tag marino">Infantil</span><span class="tag azul">Primaria</span><span class="tag marino">ESO</span><span class="tag azul">Bachillerato</span><span class="tag marino">FP</span></div></div>
      <div class="card" style="padding:16px 20px;flex:1"><h4>Lenguaje inclusivo sin barras</h4><p style="font-size:13px;line-height:19px">“El profesorado”, “quien imparte”, “docentes”. Nunca “usuarios” ni “contenido”: decimos <strong>docentes</strong> y <strong>recursos</strong>.</p></div>
      <div class="card" style="padding:16px 20px;flex:1"><h4>Cifras en formato español</h4><p style="font-size:13px;line-height:19px"><code>1.248 descargas</code> · <code>3 de noviembre</code> · <code>18:30</code> · <code>28 €/hora</code></p></div>
      <div class="card" style="padding:16px 20px;flex:1"><h4>El nombre</h4><p style="font-size:13px;line-height:19px">En texto corrido se escribe <strong>LinkEdu</strong>, con la L y la E en mayúscula. En el logo va en minúsculas: <em>linkedu</em>.</p></div>
    </div>
    <div class="col">
      <div class="card" style="padding:18px 22px;border-left:5px solid var(--turquesa)"><span class="kicker" style="color:#0b5a50">Sí</span><p style="font-family:var(--display);font-weight:700;font-size:20px;line-height:24px;color:var(--marino);margin-top:4px">“Conecta con docentes de tu etapa.”</p><p style="font-size:13px;color:var(--ink-muted)">Directo, en segunda persona del singular.</p></div>
      <div class="card" style="padding:18px 22px;border-left:5px solid var(--danger)"><span class="kicker" style="color:var(--danger)">No</span><p style="font-family:var(--display);font-weight:700;font-size:20px;line-height:24px;color:var(--marino);margin-top:4px">“Los usuarios pueden proceder a establecer conexiones.”</p><p style="font-size:13px;color:var(--ink-muted)">Frío, largo y con palabras que no son del sector.</p></div>
      <div class="panel" style="padding:20px 24px;flex:1"><span class="kicker" style="color:var(--cielo)">Los errores explican y ayudan</span>
        <p style="font-family:var(--display);font-weight:700;font-size:22px;line-height:27px;margin:8px 0 10px">“Ese correo no es de un centro educativo. Usa el de tu centro o regístrate como docente libre.”</p>
        <p style="color:var(--cielo);font-size:13px;line-height:19px">Dicen qué pasa y cómo arreglarlo, sin culpar a nadie.</p></div>
    </div>
  </div>`));

// ============ 21. CONTRAPORTADA ============
nPag++;
paginas.push(`<section class="page contra">
  <div class="c-izq">
    ${logo("vertical-blanco", "height:300px")}
    <p style="font-family:var(--display);font-weight:700;font-size:26px;line-height:30px;margin-top:26px;text-align:center">Conecta. Aprende. Crece.</p>
  </div>
  <div class="c-der">
    <span class="kicker" style="color:var(--azul)">En una página</span>
    <h2 style="font-size:34px;line-height:38px;margin:6px 0 20px">Lo esencial de la marca</h2>
    <div class="resumen">
      <div><h4>Logo</h4><p>Seis versiones, tres colores. Zona de seguridad = el punto naranja.</p><div style="display:flex;gap:6px;margin-top:10px">${["#102344", "#016bfc", "#fe5c01"].map((h) => `<i style="background:${h}"></i>`).join("")}</div></div>
      <div><h4>Colores</h4><p>Marino como base, azul y turquesa para informar, naranja y amarillo como acentos.</p><div style="display:flex;gap:6px;margin-top:10px">${["#073157", "#0a6a99", "#21bcaa", "#fb8d2b", "#fcb527"].map((h) => `<i style="background:${h}"></i>`).join("")}</div></div>
      <div><h4>Tipografías</h4><p><span style="font-family:var(--display);font-weight:800">Bricolage Grotesque</span> para títulos, <span style="font-weight:700">Atkinson Hyperlegible</span> para el texto e <span style="font-family:var(--mono)">IBM Plex Mono</span> para datos.</p></div>
      <div><h4>Firmas</h4><p>La franja 4 : 2 : 2 : 1 : 1 y el subrayado amarillo.</p></div>
      <div><h4>Forma</h4><p>Tarjetas planas, esquinas de 8 / 12 / 20 px, iconos de línea de 2 px.</p></div>
      <div><h4>Voz</h4><p>De tú, frases cortas, verbo primero y las palabras del sector.</p></div>
    </div>
    <div class="c-pie card"><span class="kicker" style="color:var(--ink-muted)">Equipo</span><p><strong>Iván</strong> · project manager y vídeo &nbsp;·&nbsp; <strong>Antonio</strong> · desarrollo de la app</p></div>
  </div>
  <div class="franja" aria-hidden="true" style="position:absolute;left:0;right:0;bottom:0;height:10px"><span></span><span></span><span></span><span></span><span></span></div>
</section>`);

// ---------- documento ----------
const css = `
@page { size: 1123px 794px; margin: 0; }
body { background: #fff; counter-reset: pg; }
.page { position: relative; width: 1123px; height: 794px; overflow: hidden; break-after: page; background: #fff; }
.page:last-child { break-after: auto; }
.cab { height: 52px; padding: 0 56px; display: flex; align-items: center; justify-content: space-between; color: var(--ink-muted); }
.cont { position: absolute; top: 58px; bottom: 40px; left: 56px; right: 56px; display: flex; flex-direction: column; }
.tit { display: flex; justify-content: space-between; align-items: flex-end; gap: 40px; padding: 6px 0 16px; }
.tit .sec { font-family: var(--mono); font-weight: 500; font-size: 12px; letter-spacing: .08em; color: var(--azul); }
.tit h2 { font-size: 36px; line-height: 40px; letter-spacing: -0.015em; font-weight: 800; }
.intro { max-width: 470px; font-size: 14px; line-height: 20px; color: var(--ink-muted); text-align: left; }
.cuerpo { flex: 1; min-height: 0; display: flex; flex-direction: column; }
.cuerpo > .g2, .cuerpo > .g3, .cuerpo > .col { flex: 1; min-height: 0; }
.pie { position: absolute; left: 56px; right: 56px; bottom: 0; height: 40px; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--line); font-family: var(--mono); font-size: 11px; color: var(--ink-muted); }
.pie .num { font-weight: 500; color: var(--marino); }
.g2, .g3, .g4, .g5, .g6 { display: grid; gap: 16px; min-height: 0; }
.g2 { grid-template-columns: 1fr 1fr; } .g3 { grid-template-columns: repeat(3, 1fr); } .g4 { grid-template-columns: repeat(4, 1fr); } .g5 { grid-template-columns: repeat(5, 1fr); } .g6 { grid-template-columns: repeat(6, 1fr); }
.g2 > *, .g3 > * { min-height: 0; min-width: 0; }
.col { display: flex; flex-direction: column; gap: 12px; min-height: 0; min-width: 0; }
h4 { font-size: 16px; line-height: 20px; font-weight: 700; margin-bottom: 2px; }
p { font-size: 14px; line-height: 20px; }
code { font-family: var(--mono); font-size: 12px; background: var(--paper); padding: 1px 6px; border-radius: 4px; color: var(--marino); }
.fila { display: flex; gap: 14px; padding: 14px 18px; align-items: flex-start; }
.fila.p { padding: 12px 16px; align-items: center; }
.fila p { font-size: 13px; line-height: 19px; color: var(--ink-muted); }
.caja-ic { flex: none; width: 40px; height: 40px; border-radius: 8px; background: var(--azul-soft); display: flex; align-items: center; justify-content: center; }
.mini { flex: none; width: 34px; height: 34px; border-radius: 8px; margin-top: 2px; }
.indice { list-style: none; display: flex; flex-direction: column; flex: 1; }
.indice li { flex: 1; display: flex; gap: 14px; align-items: center; padding: 0; font-size: 13px; line-height: 18px; border-bottom: 1px solid var(--line); font-weight: 700; color: var(--marino); }
.indice li:last-child { border-bottom: 0; }
.indice .kicker { color: var(--azul); width: 22px; }

.col > .card[style*='flex:1'], .col > .panel[style*='flex:1'] { display: flex; flex-direction: column; justify-content: center; }
/* Las tarjetas en fila (número o icono + texto) se alinean a la izquierda, no centradas */
.col > .card.fila[style*='flex:1'] { flex-direction: row; justify-content: flex-start; }
.resumen > div { display: flex; flex-direction: column; justify-content: center; }
.resumen p { font-size: 14px !important; line-height: 20px !important; }
.e-m { overflow: visible !important; text-overflow: clip !important; }

/* Portada */
.portada { display: flex; background: var(--logo-marino); color: #fff; }
.p-izq { width: 640px; padding: 64px 64px 52px; display: flex; flex-direction: column; justify-content: space-between; position: relative; z-index: 2; }
.p-tit h1 { color: #fff; font-size: 92px; line-height: 92px; font-weight: 800; letter-spacing: -0.03em; margin: 12px 0 18px; }
.p-tit p { font-size: 20px; line-height: 28px; color: var(--cielo); max-width: 470px; }
.p-pie { display: flex; justify-content: space-between; border-top: 1px solid rgba(255,255,255,.25); padding-top: 14px; }
.p-der { flex: 1; background: var(--logo-azul); position: relative; overflow: hidden; }
.p-rejilla { position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,.28) 1.6px, transparent 1.7px); background-size: 24px 24px; }
.p-p1 { position: absolute; width: 150px; height: 150px; border-radius: 50%; background: var(--logo-naranja); right: 60px; top: 70px; }
.p-p2 { position: absolute; width: 260px; height: 64px; border-radius: 999px; background: var(--turquesa); right: -60px; bottom: 130px; }
.p-p3 { position: absolute; width: 150px; height: 64px; border-radius: 999px; background: var(--amarillo); right: 150px; bottom: 60px; }

/* Versiones */
.vers { display: flex; flex-direction: column; overflow: hidden; }
.vers-img { flex: 1; min-height: 0; display: flex; align-items: center; justify-content: center; background: var(--soft); border-bottom: 1px solid var(--line); }
.vers-txt { padding: 12px 18px 14px; }
.vers-txt p { font-size: 13px; line-height: 18px; color: var(--ink-muted); margin: 2px 0 8px; }
.var { display: flex; flex-direction: column; overflow: hidden; }
.var-img { flex: 1; display: flex; align-items: center; justify-content: center; min-height: 0; border-bottom: 1px solid var(--line); }
.var-txt { padding: 12px 18px 14px; } .var-txt p { font-size: 13px; line-height: 18px; color: var(--ink-muted); margin: 2px 0 8px; }
.fondo { position: relative; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
.fondo .ok { position: absolute; right: 10px; top: 10px; width: 24px; height: 24px; border-radius: 50%; background: #127a6e; display: flex; align-items: center; justify-content: center; }
.fondo-t { position: absolute; left: 12px; bottom: 10px; font-size: 11px; }

/* Zona de seguridad */
.zona { position: relative; border: 2px dashed var(--logo-naranja); background: rgba(254,92,1,.06); }
.esq { position: absolute; width: 8px; height: 8px; background: var(--logo-naranja); }
.esq.tl { left: -5px; top: -5px; } .esq.tr { right: -5px; top: -5px; } .esq.bl { left: -5px; bottom: -5px; } .esq.br { right: -5px; bottom: -5px; }
.medida { position: absolute; background: rgba(254,92,1,.28); display: flex; align-items: center; justify-content: center; font-family: var(--mono); font-size: 12px; color: #7a2a00; }
.m-sup { left: 0; top: 0; } .m-izq { left: 0; top: 0; display: none; }
.minimo { display: flex; gap: 14px; align-items: center; padding: 10px 16px; flex: 1; }
.minimo p { font-size: 13px; line-height: 18px; color: var(--ink); }
.mn-img { width: 150px; height: 50px; display: flex; align-items: center; justify-content: center; background: var(--soft); border-radius: 8px; flex: none; }

/* Usos incorrectos */
.malo { display: flex; flex-direction: column; overflow: hidden; }
.malo-img { flex: 1; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; border-bottom: 1px solid var(--line); }
.malo p { padding: 10px 16px; font-size: 14px; }
.no { position: absolute; right: 10px; top: 10px; width: 28px; height: 28px; border-radius: 50%; background: var(--danger); display: flex; align-items: center; justify-content: center; }

/* Colores */
.sw-grande { border-radius: 12px; padding: 22px 24px; display: flex; flex-direction: column; justify-content: space-between; }
.sw { border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; border: 1px solid var(--line); background: #fff; min-height: 0; }
.sw-c { flex: 1; padding: 10px 12px; display: flex; align-items: flex-end; min-height: 0; }
.sw-t { padding: 8px 12px 10px; } .sw-t h4 { font-size: 14px; line-height: 17px; } .sw-t p { font-size: 11.5px; line-height: 15px; color: var(--ink-muted); }

/* Contraste */
.tabla { width: 100%; border-collapse: collapse; }
.tabla th { text-align: left; font-family: var(--mono); font-weight: 500; font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-muted); padding: 8px 14px 6px; }
.tabla td { padding: 5px 14px; border-top: 1px solid var(--line); font-size: 13px; line-height: 16px; font-weight: 700; color: var(--marino); }
.tabla .hx { font-family: var(--mono); font-weight: 500; font-size: 10.5px; color: var(--ink-muted); }
.tabla .r { font-family: var(--mono); font-weight: 500; white-space: nowrap; color: var(--ink); }
.muestra { display: inline-flex; align-items: center; justify-content: center; width: 50px; height: 28px; border-radius: 6px; font-family: var(--display); font-weight: 800; font-size: 16px; border: 1px solid var(--line); }
.niv { display: inline-block; padding: 2px 10px; border-radius: 999px; font-size: 11.5px; font-weight: 700; white-space: nowrap; }
.niv.ok { background: var(--turquesa-soft); color: #0b5a50; } .niv.med { background: var(--amarillo-soft); color: var(--warning); } .niv.mal { background: #fde8e6; color: var(--danger); }

/* Tipografías */
.tipo { padding: 22px 24px; display: flex; flex-direction: column; gap: 10px; }
.aa { font-size: 110px; line-height: 110px; color: var(--marino); letter-spacing: -0.02em; }
.ejemplo { background: var(--soft); border: 1px solid var(--line); border-radius: 8px; padding: 14px 16px; color: var(--marino); flex: 1; display: flex; align-items: center; }
.abc { font-size: 14px; line-height: 22px; color: var(--ink); padding: 12px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.pesos { margin-top: auto; font-size: 13px; color: var(--ink-muted); } .pesos .kicker { color: var(--azul); margin-right: 6px; }
.esc { flex: 1; display: grid; grid-template-columns: 210px 1fr 230px; gap: 20px; align-items: center; padding: 0 22px; border-top: 1px solid var(--line); min-height: 0; overflow: hidden; }
.esc:first-child { border-top: 0; }
.e-n b { display: block; font-family: var(--mono); font-weight: 500; font-size: 13px; color: var(--azul); } .e-n span { font-size: 12px; color: var(--ink-muted); }
.e-m { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } .e-u { font-size: 12.5px; line-height: 17px; color: var(--ink-muted); }

/* Iconos */
.rejilla-ic { display: grid; grid-template-columns: repeat(7, 1fr); grid-template-rows: repeat(4, 1fr); gap: 10px; min-height: 0; }
.ic { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; }
.ic span { font-family: var(--mono); font-size: 11px; color: var(--ink-muted); }
.ic-nota { grid-column: span 2; flex-direction: row; gap: 12px; color: #fff; }
.ic-nota .figura { font-family: var(--display); font-weight: 800; font-size: 44px; color: #fff; } .ic-nota span { color: var(--cielo); font-size: 12px; }
.tam { display: flex; flex-direction: column; align-items: flex-start; gap: 8px; } .tam span { font-size: 12px; line-height: 15px; color: var(--ink-muted); }
.reglas { list-style: none; display: grid; gap: 6px; } .reglas li { font-size: 14px; line-height: 20px; padding-left: 16px; position: relative; } .reglas li::before { content: ""; position: absolute; left: 0; top: 7px; width: 6px; height: 6px; border-radius: 50%; background: var(--naranja); }
.nav-ej { color: var(--ink-muted); padding-bottom: 5px; border-bottom: 3px solid transparent; } .nav-ej.act { color: var(--marino); border-bottom-color: var(--marino); }

/* Forma y espacio */
.caja { padding: 16px 20px; display: flex; flex-direction: column; gap: 12px; min-height: 0; overflow: hidden; }
.radios { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; flex: 1; align-items: center; font-size: 12px; line-height: 15px; text-align: center; font-family: var(--mono); }
.radios span { display: block; height: 80px; background: var(--marino-soft); border: 2px solid var(--marino); margin-bottom: 8px; } .radios small { color: var(--ink-muted); font-family: var(--sans); font-size: 11.5px; }
.espacios { display: grid; gap: 5px; } .espacios div { display: flex; align-items: center; gap: 10px; font-family: var(--mono); font-size: 11px; color: var(--ink-muted); } .espacios i { height: 10px; background: var(--azul); border-radius: 2px; display: block; flex: none; }
.plana, .flota { flex: 1; padding: 14px; border-radius: 12px; background: #fff; display: flex; flex-direction: column; justify-content: center; gap: 4px; margin: 6px 4px 8px; }
.plana { border: 1px solid var(--line); } .flota { box-shadow: 0 4px 12px rgba(7,49,87,.10), 0 12px 32px rgba(7,49,87,.12); }
.plana b, .flota b { color: var(--marino); } .plana span, .flota span { font-size: 12.5px; line-height: 17px; color: var(--ink-muted); }
.botones { display: flex; flex-wrap: wrap; gap: 10px; }
.avatar { display: inline-flex; align-items: center; justify-content: center; background: var(--marino-soft); color: var(--marino); font-family: var(--display); font-weight: 800; }

/* Composición */
.pin { position: absolute; width: 28px; height: 28px; border-radius: 50%; background: var(--naranja); color: var(--ink); font-weight: 700; display: flex; align-items: center; justify-content: center; border: 2px solid #fff; transform: translate(-50%, -50%); }
.n { flex: none; width: 28px; height: 28px; border-radius: 50%; background: var(--naranja); color: var(--ink); font-weight: 700; display: flex; align-items: center; justify-content: center; }

/* Pantallas */
.pant { display: flex; flex-direction: column; overflow: hidden; }
.pant-img { flex: 1; min-height: 0; overflow: hidden; border-bottom: 1px solid var(--line); }
.pant-img img { width: 100%; height: 100%; object-fit: cover; object-position: top left; }
.pant-t { padding: 8px 16px 10px; display: flex; gap: 10px; align-items: baseline; } .pant-t p { font-size: 13px; color: var(--ink-muted); }
.moviles { display: flex; gap: 22px; align-items: center; justify-content: center; background: var(--paper); border-radius: 12px; padding: 16px 24px; min-height: 0; }
.movil-c { flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; align-items: center; gap: 12px; }
.movil-c .kicker { color: var(--marino); }
.movil { width: 100%; aspect-ratio: 390 / 844; border-radius: 26px; border: 6px solid var(--logo-marino); overflow: hidden; background: #fff; }
.movil img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
.medidas { display: flex; gap: 0; height: 38px; border: 1px solid var(--line); border-radius: 6px; overflow: hidden; font-family: var(--mono); font-size: 11px; }
.medidas span { display: flex; align-items: center; justify-content: center; border-right: 1px solid var(--line); color: var(--marino); white-space: nowrap; overflow: hidden; }
.medidas span:last-child { border-right: 0; }
.medidas-t { display: flex; justify-content: space-between; font-size: 12px; color: var(--ink-muted); padding: 0 6px; }
.ilus { flex: 2.6; min-height: 0; overflow: hidden; padding: 0; background: var(--paper); }

/* Contraportada */
.contra { display: flex; background: #fff; }
.c-izq { width: 440px; background: var(--logo-marino); color: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.c-der { flex: 1; padding: 64px 60px 50px; display: flex; flex-direction: column; }
.resumen { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; flex: 1; }
.resumen > div { border: 1px solid var(--line); border-radius: 12px; padding: 14px 18px; background: var(--soft); } .resumen p { font-size: 13px; line-height: 19px; color: var(--ink-muted); }
.resumen i { width: 34px; height: 22px; border-radius: 6px; display: block; }
.c-pie { padding: 14px 20px; margin-top: 16px; } .c-pie p { font-size: 14px; margin-top: 2px; }
`;

const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><title>LinkEdu · Manual de marca</title>
<link rel="stylesheet" href="base.css"><style>${css}</style></head>
<body>${paginas.join("\n")}</body></html>`;
fs.writeFileSync(path.join(aqui, "manual.html"), html);
console.log("manual.html listo,", paginas.length, "páginas");

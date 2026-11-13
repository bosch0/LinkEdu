// Graba la web app REAL en movimiento (con un cursor visible que se mueve y hace clic)
// y la guarda como vídeos .mp4 en public/grabaciones/.
// Remotion pone esos vídeos dentro de las pantallas de cristal en 3D.
//
// Uso (con la web app ya arrancada: `npm start -- --port 4300` en web_app/):
//   node scripts/grabar.mjs                 -> graba todo
//   node scripts/grabar.mjs inicio empleo   -> graba solo esas escenas
import { chromium } from "playwright-core";
import { mkdirSync, writeFileSync, readdirSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";

const URL_APP = process.env.URL_APP ?? "http://localhost:4300";
const SALIDA = "public/grabaciones";
const TMP = "tmp-grabacion";
mkdirSync(SALIDA, { recursive: true });

// Tamaño de la ventana de la app (px de CSS). Se graba al doble de resolución.
const ESCRITORIO = { ancho: 1280, alto: 720, escala: "2560:1440" };
const MOVIL = { ancho: 390, alto: 844, escala: "780:1688" };

// Los botones que cambian entre profesor, alumno y empresa NO deben salir en el vídeo.
// Además se dibuja un cursor (flecha) y una onda en cada clic o toque.
const INIT = `
(() => {
  const css = '[aria-label="Vista de ejemplo por tipo de cuenta"],[aria-label="Perfil de ejemplo"]{display:none!important}'
    + '#cursor-video{position:fixed;left:0;top:0;width:40px;height:40px;z-index:2147483647;pointer-events:none;transform:translate(-200px,-200px);filter:drop-shadow(0 3px 4px rgba(0,0,0,.35))}'
    + '.onda-video{position:fixed;z-index:2147483646;pointer-events:none;width:16px;height:16px;margin:-8px 0 0 -8px;border-radius:50%;border:5px solid #21bcaa;animation:onda-video .65s ease-out forwards}'
    + '@keyframes onda-video{to{transform:scale(5);opacity:0}}';
  function montar() {
    const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
    const c = document.createElement('div'); c.id = 'cursor-video';
    c.innerHTML = '<svg width="40" height="40" viewBox="0 0 24 24"><path d="M4 2 L4 19 L8.6 15 L11.6 22 L14.4 20.8 L11.5 14 L17.5 14 Z" fill="#fff" stroke="#073157" stroke-width="1.6" stroke-linejoin="round"/></svg>';
    document.body.appendChild(c);
    addEventListener('pointermove', (e) => {
      if (e.pointerType === 'mouse') c.style.transform = 'translate(' + (e.clientX - 5) + 'px,' + (e.clientY - 3) + 'px)';
    }, true);
    addEventListener('pointerdown', (e) => {
      const r = document.createElement('div'); r.className = 'onda-video';
      r.style.left = e.clientX + 'px'; r.style.top = e.clientY + 'px';
      document.body.appendChild(r); setTimeout(() => r.remove(), 700);
    }, true);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar); else montar();
})();
`;

const navegador = await chromium.launch({ channel: "chrome" }); // usa el Chrome instalado

// ----------------------------------------------------------------- ayudas
const pausa = (p, ms) => p.waitForTimeout(ms);

// Mueve el ratón poco a poco (con suavizado) para que el cursor se vea natural.
async function mover(p, x, y, ms = 700) {
  const ini = p.__pos ?? { x: 900, y: 500 };
  const t0 = Date.now();
  for (;;) {
    const k = Math.min(1, (Date.now() - t0) / ms);
    const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
    await p.mouse.move(ini.x + (x - ini.x) * e, ini.y + (y - ini.y) * e);
    if (k >= 1) break;
    await p.waitForTimeout(8);
  }
  p.__pos = { x, y };
}

// Lleva el cursor al centro de un elemento.
async function ir(p, loc, ms = 700) {
  await loc.first().scrollIntoViewIfNeeded();
  const c = await loc.first().boundingBox();
  await mover(p, c.x + c.width / 2, c.y + c.height / 2, ms);
}

// Lleva el cursor y hace clic.
async function clic(p, loc, ms = 700) {
  await ir(p, loc, ms);
  await pausa(p, 150);
  await loc.first().click();
}

const boton = (p, nombre, op = {}) => p.getByRole("button", { name: nombre, ...op });

// ----------------------------------------------------------------- escenas
const ESCENAS = {
  // Inicio: escribir y publicar
  inicio: [ESCRITORIO, "", async (p) => {
    const campo = p.getByPlaceholder(/Comparte un recurso/);
    await pausa(p, 700);
    await clic(p, campo);
    await campo.pressSequentially("Nueva unidad de probabilidad: ¡adáptala!", { delay: 45 });
    await pausa(p, 400);
    await clic(p, boton(p, "Publicar"));
    await pausa(p, 2200);
  }],

  // Mi red: el mapa y un país
  red: [ESCRITORIO, "red", async (p) => {
    await pausa(p, 1200);
    await clic(p, p.getByText("México", { exact: true }), 900);
    await pausa(p, 2200);
  }],

  // Proyectos: crear un proyecto con equipo
  proyectos: [ESCRITORIO, "proyectos", async (p) => {
    await pausa(p, 900);
    await clic(p, boton(p, "Crear proyecto").first());
    await pausa(p, 900);
    const nombre = p.getByPlaceholder(/Huerto matemático/);
    await clic(p, nombre, 500);
    await nombre.pressSequentially("Huerto matemático 2027", { delay: 45 });
    await pausa(p, 300);
    await clic(p, p.locator("form").getByRole("button", { name: /^Invitar a/ }), 600);
    await pausa(p, 300);
    await clic(p, p.locator("form").getByRole("button", { name: "Crear proyecto" }), 600);
    await pausa(p, 2300);
  }],

  // Recursos: abrir la vista previa de un recurso
  recursos: [ESCRITORIO, "recursos", async (p) => {
    await pausa(p, 1000);
    await clic(p, boton(p, /Ver vista previa de .*40 problemas/), 900);
    await pausa(p, 2300);
  }],

  // Empleo: inscribirse en dos pasos
  empleo: [ESCRITORIO, "empleo", async (p) => {
    await pausa(p, 900);
    await clic(p, boton(p, "Inscribirme"));
    await pausa(p, 1000);
    await clic(p, boton(p, "Revisar"), 600);
    await pausa(p, 900);
    await clic(p, p.getByText(/Acepto que/), 600);
    await pausa(p, 400);
    await clic(p, boton(p, "Enviar candidatura"), 600);
    await pausa(p, 2400);
  }],

  // Móvil: recorrer la barra de pestañas de abajo
  movil: [MOVIL, "", async (p) => {
    const pestana = (n) => p.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: n });
    await pausa(p, 1100);
    for (const n of ["Mi red", "Proyectos", "Recursos", "Empleo"]) {
      await pestana(n).tap();
      await pausa(p, 1250);
    }
  }],
};

// ----------------------------------------------------------------- grabación
async function grabar(nombre) {
  const [tam, ruta, guion] = ESCENAS[nombre];
  const movil = tam === MOVIL;
  const ctx = await navegador.newContext({
    viewport: { width: tam.ancho, height: tam.alto },
    deviceScaleFactor: movil ? 3 : 2,
    isMobile: movil,
    hasTouch: movil,
  });
  await ctx.addInitScript(INIT);
  const p = await ctx.newPage();
  await p.goto(`${URL_APP}/${ruta}`);
  await pausa(p, 1800); // deja terminar las animaciones de entrada
  if (!movil) await p.mouse.move(900, 500);

  // Empieza a copiar los fotogramas de la pantalla (calidad alta)
  rmSync(TMP, { recursive: true, force: true });
  mkdirSync(TMP, { recursive: true });
  const cdp = await ctx.newCDPSession(p);
  const marcas = [];
  cdp.on("Page.screencastFrame", (f) => {
    writeFileSync(`${TMP}/${String(marcas.length).padStart(5, "0")}.jpg`, Buffer.from(f.data, "base64"));
    marcas.push(f.metadata.timestamp);
    cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {});
  });
  await cdp.send("Page.startScreencast", {
    format: "jpeg",
    quality: 92,
    maxWidth: tam.ancho * (movil ? 3 : 2),
    maxHeight: tam.alto * (movil ? 3 : 2),
    everyNthFrame: 1,
  });
  await pausa(p, 300);
  await guion(p);
  await cdp.send("Page.stopScreencast");
  await ctx.close();

  // Lista de fotogramas con lo que dura cada uno y conversión a vídeo de 30 fps
  const archivos = readdirSync(TMP).filter((f) => f.endsWith(".jpg")).sort();
  let lista = "";
  archivos.forEach((f, i) => {
    const dur = i + 1 < marcas.length ? Math.min(2, Math.max(0.001, marcas[i + 1] - marcas[i])) : 0.5;
    lista += `file '${f}'\nduration ${dur.toFixed(4)}\n`;
  });
  lista += `file '${archivos[archivos.length - 1]}'\n`;
  writeFileSync(`${TMP}/lista.txt`, lista);
  execFileSync(
    "npx",
    [
      "remotion", "ffmpeg", "-y", "-loglevel", "error",
      "-f", "concat", "-safe", "0", "-i", `${TMP}/lista.txt`,
      "-vf", `scale=${tam.escala}:flags=lanczos`,
      "-r", "30", "-fps_mode", "cfr",
      "-c:v", "libx264", "-crf", "17", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
      `${SALIDA}/${nombre}.mp4`,
    ],
    { shell: true, stdio: "inherit" },
  );
  rmSync(TMP, { recursive: true, force: true });
  console.log("✓", nombre, `(${archivos.length} fotogramas)`);
}

// ----------------------------------------------------------------- perfiles (fotos fijas)
async function fotosPerfiles() {
  const ctx = await navegador.newContext({
    viewport: { width: ESCRITORIO.ancho, height: ESCRITORIO.alto },
    deviceScaleFactor: 2,
  });
  const p = await ctx.newPage();
  await p.goto(`${URL_APP}/perfil`);
  await pausa(p, 1800);
  const ocultar = () =>
    p.addStyleTag({
      content: `[aria-label="Vista de ejemplo por tipo de cuenta"],[aria-label="Perfil de ejemplo"]{display:none!important}`,
    });
  const foto = async (n) => {
    await pausa(p, 1000);
    const e = await ocultar();
    await pausa(p, 150);
    await p.screenshot({ path: `${SALIDA}/${n}.jpg`, type: "jpeg", quality: 93 });
    await e.evaluate((x) => x.remove());
    console.log("✓", n);
  };
  await foto("perfil-docente");
  await p.getByRole("button", { name: "Alumno", exact: true }).click();
  await foto("perfil-alumno");
  await p.getByRole("button", { name: "Empresa", exact: true }).click();
  await foto("perfil-empresa");
  await ctx.close();
}

const pedidas = process.argv.slice(2);
const lista = pedidas.length ? pedidas : [...Object.keys(ESCENAS), "perfiles"];
for (const n of lista) {
  if (n === "perfiles") await fotosPerfiles();
  else await grabar(n);
}
await navegador.close();

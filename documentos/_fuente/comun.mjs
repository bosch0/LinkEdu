// Piezas comunes de la memoria y del documento de monetización (hojas A4 verticales).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const aqui = path.dirname(fileURLToPath(import.meta.url));
const iconosDir = path.join(aqui, "../../design/assets/iconos");

export const logo = (nombre, estilo = "") =>
  `<img src="../../design/assets/logo/linkedu-${nombre}.svg" alt="Logo LinkEdu ${nombre}" style="${estilo}">`;

const iconos = fs.readdirSync(iconosDir).filter((f) => f.endsWith(".svg"))
  .map((f) => ({ nombre: f.replace(".svg", ""), svg: fs.readFileSync(path.join(iconosDir, f), "utf8") }));
export const icono = (nombre, tam = 24, color = "currentColor") => {
  const i = iconos.find((x) => x.nombre === nombre);
  if (!i) throw new Error("No existe el icono " + nombre);
  return i.svg.replace('width="24" height="24"', `width="${tam}" height="${tam}"`).replace(/currentColor/g, color);
};

export const franja = `<div class="franja" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>`;

// Crea la función que monta una hoja interior con cabecera, título y pie
export function creaPaginas(nombreDoc, versionTxt) {
  let n = 1; // la portada es la 1
  const lista = [];
  const pagina = (seccion, titulo, intro, cuerpo) => {
    n++;
    lista.push(`<section class="page">
  ${franja}
  <header class="cab"><span class="kicker">${nombreDoc}</span>${logo("integrado", "height:20px")}</header>
  <div class="cont">
    <div class="tit"><span class="sec">${seccion}</span><h2>${titulo}</h2>${intro ? `<p class="intro">${intro}</p>` : ""}</div>
    <div class="cuerpo">${cuerpo}</div>
  </div>
  <footer class="pie"><span>${versionTxt}</span><span class="num">${n}</span></footer>
</section>`);
  };
  return { lista, pagina };
}

// Fotografías de la app (capturas hechas con Playwright)
export const cap = (f) => `capturas/${f}.jpg`;

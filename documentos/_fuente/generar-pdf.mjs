// Convierte los HTML de esta carpeta en los PDF de entrega, usando el Chrome instalado.
//
// Uso (desde la raíz del repo):
//   node documentos/_fuente/generar-pdf.mjs            -> los tres PDF
//   node documentos/_fuente/generar-pdf.mjs manual     -> solo el manual de marca
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const aqui = path.dirname(fileURLToPath(import.meta.url));
const documentos = path.resolve(aqui, "..");

// [nombre, carpeta de salida, archivo PDF, generador (si lo hay)]
const todos = [
  ["manual", "manual-de-marca", "LinkEdu-Manual-de-marca.pdf", "manual.mjs"],
  ["memoria", "memoria-final", "LinkEdu-Memoria-final.pdf", "memoria.mjs"],
  ["monetizacion", "monetizacion", "LinkEdu-Como-monetizar.pdf", "monetizacion.mjs"],
];
const pedidos = process.argv.slice(2);
const lista = pedidos.length ? todos.filter((t) => pedidos.includes(t[0])) : todos;

const chrome = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
].find(existsSync);
if (!chrome) throw new Error("No encuentro Chrome ni Edge");

for (const [nombre, carpeta, pdf, generador] of lista) {
  if (generador) execFileSync("node", [path.join(aqui, generador)], { stdio: "inherit" });
  mkdirSync(path.join(documentos, carpeta), { recursive: true });
  const salida = path.join(documentos, carpeta, pdf);
  execFileSync(chrome, [
    "--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--allow-file-access-from-files",
    `--print-to-pdf=${salida}`, pathToFileURL(path.join(aqui, `${nombre}.html`)).href,
  ], { stdio: "ignore" });
  console.log("PDF listo:", path.relative(path.resolve(documentos, ".."), salida));
}

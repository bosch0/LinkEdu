// Genera monetizacion.html (el documento "¿Cómo monetizar?"). Después, generar-pdf.mjs lo pasa a PDF.
// Solo usa cifras que ya existen en la app: Premium 7,99 €/mes, comisión del 15 %, Plan Empresa 49 €/mes,
// primera clase sin comisión y los precios de ejemplo de recursos (datos/recursos.ts) y clases (datos/empleo.ts).
// Uso: node monetizacion.mjs
import fs from "node:fs";
import path from "node:path";
import { aqui, logo, icono, creaPaginas, cap } from "./comun.mjs";

const { lista: paginas, pagina } = creaPaginas("¿Cómo monetizar?", "LinkEdu · ¿Cómo monetizar? · Noviembre de 2026");
const eur = (n) => n.toFixed(2).replace(".", ",") + " €";
const foto = (f, alto) => `<div class="shot" style="height:${alto}px"><img src="${cap(f)}" alt="Captura de ${f}"></div>`;
const kic = (t, c = "var(--azul)") => `<span class="kicker" style="color:${c}">${t}</span>`;
const li = (t) => `<li style="font-size:14px;line-height:20px">${t}</li>`;

// ================= PORTADA =================
paginas.unshift(`<section class="page portada">
  <div>${logo("completo-blanco", "width:400px")}</div>
  <div class="p-banda"><div class="p-rejilla"></div><span class="p-sol"></span><span class="p-pil1"></span><span class="p-pil2"></span></div>
  <div style="margin-top:150px">
    <span class="kicker" style="color:var(--cielo)">Modelo de negocio</span>
    <h1 style="margin-top:12px">¿Cómo <br><span style="background:linear-gradient(transparent 62%, rgba(252,181,39,.9) 62%)">monetizar</span>?</h1>
    <p class="sub">Conectar es gratis. Se paga por vender recursos, por contratar docentes y por dar clases.</p>
  </div>
  <div style="flex:1"></div>
  <div class="p-pie"><span>Iván · Antonio</span><span>19 de noviembre de 2026</span></div>
  <div class="franja" aria-hidden="true" style="position:absolute;left:0;right:0;bottom:0;height:10px"><span></span><span></span><span></span><span></span><span></span></div>
</section>`);

// ================= 2. EL MODELO EN UNA PÁGINA =================
pagina("Resumen", "El modelo en una página",
  "LinkEdu nace sin ánimo de lucro. Si un día hay que sostener la plataforma, lo básico seguirá siendo gratis y se cobrará por lo que genera valor.",
  `<div class="panel c" style="padding:24px 28px"><span class="kicker" style="color:var(--cielo)">La idea</span>
    <p style="font-family:var(--display);font-weight:800;font-size:28px;line-height:32px;margin-top:8px">Conectar, colaborar y compartir recursos gratis es gratis. Pagan quien vende, quien contrata y quien da clases.</p></div>
  <div class="g2 grow" style="grid-auto-rows:1fr">
    ${[["estrella", "LinkEdu Premium", "7,99 €", "/mes", "Para docentes que quieren poner precio a sus recursos.", "n"], ["recurso", "Comisión por ventas", "15 %", "de cada venta", "LinkEdu se queda el 15 %; el autor recibe el 85 %.", "a"], ["empleo", "Plan Empresa", "49 €", "/mes", "Para empresas que publican ofertas y buscan docentes.", "m"], ["formacion", "Clases particulares", "0 €", "1.ª clase", "Sin comisión en la primera clase. El docente pone el precio.", "t"]].map(([ic, t, c, u, d, cl], i) => `<div class="card c centro"><div style="display:flex;gap:12px;align-items:center;margin-bottom:10px"><span class="ic ${cl}">${icono(ic === "estrella" ? "guardar" : ic, 22, "var(--azul)")}</span><span class="kicker" style="color:var(--azul)">Fuente ${i + 1}</span></div><h3 style="color:var(--marino)">${t}</h3><p style="margin:8px 0 6px"><span class="cifra">${c}</span> <span class="muted" style="font-size:15px">${u}</span></p><p class="muted" style="font-size:13.5px;line-height:19px">${d}</p></div>`).join("")}
  </div>
  <div class="card c soft" style="display:flex;gap:18px;align-items:center"><span class="ic t">${icono("check", 22, "var(--azul)")}</span><p style="font-size:14px;line-height:20px"><strong>Siempre gratis:</strong> crear perfil, conectar con docentes, proyectos colaborativos, compartir recursos gratuitos y apuntarse a ofertas.</p></div>`);

// ================= 3. QUIÉN PAGA =================
pagina("01 Quién paga", "Quién paga y qué recibe",
  "Cada perfil de la app tiene claro qué es gratis y qué es de pago.",
  `<div class="g3 roles">
    ${[["red", "Docentes", "t", "Gratis", ["Perfil, mapa de contactos y mensajes", "Proyectos colaborativos", "Subir y descargar recursos gratuitos", "Apuntarse a ofertas de empleo"], "De pago", ["Premium: vender recursos, 7,99 €/mes", "15 % de comisión por venta", "Clases particulares (desde la 2.ª clase)"]], ["perfil", "Alumnado", "a", "Gratis", ["Perfil y proyectos", "Recursos gratuitos", "Buscar docentes y ver sus habilidades validadas"], "De pago", ["Las clases particulares que reserve, a precio del docente", "Los recursos de pago que quiera comprar"]], ["empleo", "Empresas", "n", "Gratis", ["Perfil de empresa", "Ver docentes y sus habilidades"], "De pago", ["Plan Empresa: 49 €/mes", "Hasta 5 ofertas activas", "Mensajes ilimitados a candidatos", "Ofertas destacadas en Empleo"]]].map(([ic, t, cl, g, gl, p, pl]) => `<div class="card" style="display:flex;flex-direction:column;overflow:hidden"><div style="padding:16px 18px;background:var(--${cl === "t" ? "azul-soft" : cl === "a" ? "amarillo-soft" : "naranja-soft"});display:flex;gap:12px;align-items:center"><span class="ic" style="background:#fff">${icono(ic, 22, "var(--marino)")}</span><h3 style="color:var(--marino)">${t}</h3></div><div style="padding:14px 18px;flex:1">${kic(g, "#0b5a50")}<ul class="lista" style="margin-top:8px;gap:6px">${gl.map(li).join("")}</ul></div><div style="padding:14px 18px;flex:1;border-top:1px solid var(--line);background:var(--soft)">${kic(p, "var(--warning)")}<ul class="lista" style="margin-top:8px;gap:6px">${pl.map(li).join("")}</ul></div></div>`).join("")}
  </div>
  <div class="card" style="overflow:hidden"><table class="tabla">
    <tr><th>Qué se cobra</th><th>Quién paga</th><th>Cuánto</th></tr>
    <tr><td>Premium</td><td>Docente que quiere vender</td><td>7,99 €/mes</td></tr>
    <tr><td>Comisión por venta</td><td>Se descuenta al autor de cada venta</td><td>15 %</td></tr>
    <tr><td>Plan Empresa</td><td>Empresa que publica ofertas</td><td>49 €/mes</td></tr>
    <tr><td>Clase particular</td><td>Alumno, al docente; LinkEdu cobra comisión</td><td>Precio del docente (1.ª clase sin comisión)</td></tr>
  </table></div>
  <div class="panel c grow" style="display:flex;gap:18px;align-items:center"><p style="font-family:var(--display);font-weight:700;font-size:19px;line-height:24px">El alumnado nunca paga por usar LinkEdu: solo paga, si quiere, por una clase o un recurso concreto.</p></div>`);

// ================= 4. PREMIUM =================
pagina("02 Premium", "LinkEdu Premium para docentes",
  "Quien quiere poner precio a sus mejores materiales se hace Premium. Sin permanencia: se cancela cuando se quiera.",
  `<div class="panel c" style="display:flex;gap:24px;align-items:center;padding:24px 28px">
    <div style="flex:1"><span class="kicker" style="color:var(--cielo)">LinkEdu Premium</span><p style="font-family:var(--display);font-weight:800;font-size:26px;line-height:30px;margin-top:6px">Tus mejores materiales, con precio.</p><p style="color:var(--cielo);margin-top:6px;font-size:14px;line-height:20px">Sin permanencia: cancela cuando quieras. Los recursos gratuitos siguen publicados.</p></div>
    <div style="text-align:right"><span class="cifra" style="font-size:54px;line-height:56px">7,99 €</span><br><span style="color:var(--cielo)">al mes</span></div>
  </div>
  <div class="g2" style="grid-auto-rows:1fr">
    ${[["Sube recursos de pago y cobra por ellos", "recurso"], ["Recibes el 85 % de cada venta", "check"], ["Insignia PRO en tu perfil y tus recursos", "guardar"], ["Estadísticas detalladas de descargas", "inicio"]].map(([t, ic]) => `<div class="card fila-c m"><span class="ic n">${icono(ic, 22, "var(--azul)")}</span><h4 style="font-size:15px;line-height:19px">${t}</h4></div>`).join("")}
  </div>
  ${foto("recursos", 340)}
  <p class="pie-foto">Pantalla de Recursos: desde aquí el docente se hace Premium, sube recursos y ve sus ganancias.</p>
  <div class="g2 grow" style="grid-auto-rows:1fr">
    <div class="card c centro">${kic("Para el docente")}<p style="margin-top:6px;font-size:14px;line-height:20px">Ve cuánto ha ganado en el mes y qué recursos se descargan más. Sin Premium, todos sus recursos son gratis.</p></div>
    <div class="card c soft centro">${kic("Para LinkEdu")}<p style="margin-top:6px;font-size:14px;line-height:20px">Una cuota fija y predecible por cada docente que decide vender, además de la comisión de sus ventas.</p></div>
  </div>`);

// ================= 5. COMISIÓN =================
const precios = [1.9, 2.5, 2.9, 3.9, 4.5];
const filas = precios.map((p) => {
  const com = p * 0.15, neto = p * 0.85;
  return `<tr><td>${eur(p)}</td><td>${eur(neto)}</td><td>${eur(com)}</td><td>${Math.ceil(7.99 / neto)} ventas</td></tr>`;
}).join("");
pagina("03 Comisión", "La comisión del 15 %",
  "Cuando un docente Premium vende un recurso, el 85 % es suyo y el 15 % es de LinkEdu.",
  `<div class="card c" style="padding:22px 24px"><div style="display:flex;height:60px;border-radius:10px;overflow:hidden;font-family:var(--display);font-weight:800;font-size:22px">
      <span style="flex:85;background:var(--marino);color:#fff;display:flex;align-items:center;padding-left:20px">85 % para el autor</span>
      <span style="flex:15;background:var(--naranja);color:var(--ink);display:flex;align-items:center;justify-content:center">15 %</span></div>
    <p class="muted" style="margin-top:10px;font-size:13.5px;line-height:19px">La app muestra el desglose antes de publicar el recurso y en su ficha: “Para el autor (85 %)” y “Comisión de Linkedu (15 %)”.</p></div>
  <h3>Ejemplos con los precios de los recursos de la app</h3>
  <div class="card" style="overflow:hidden"><table class="tabla ancha">
    <tr><th>Precio del recurso</th><th>Recibe el autor (85 %)</th><th>Comisión (15 %)</th><th>Ventas para cubrir Premium</th></tr>
    ${filas}
  </table></div>
  <p class="pie-foto">Cálculo sobre los precios de los recursos de ejemplo de la app (de 1,90 € a 4,50 €). “Ventas para cubrir Premium”: cuántas ventas al mes hacen falta para pagar los 7,99 € de la cuota.</p>
  <div class="g2 grow" style="grid-auto-rows:1fr">
    <div class="panel c centro">${kic("En resumen", "var(--cielo)")}<p style="font-family:var(--display);font-weight:700;font-size:21px;line-height:26px;margin-top:6px">Con unas 3 ventas al mes de un recurso medio, Premium se paga solo.</p></div>
    <div class="card c centro">${kic("Por qué un porcentaje")}<p style="margin-top:6px;font-size:14px;line-height:20px">LinkEdu solo gana más cuando el docente gana más. Los recursos baratos no penalizan: la comisión crece con el precio.</p></div>
  </div>`);

// ================= 6. PLAN EMPRESA =================
pagina("04 Empresas", "Plan Empresa",
  "Las empresas que buscan docentes pagan un plan mensual por publicar ofertas y contactar con candidatos.",
  `<div class="panel c" style="display:flex;gap:24px;align-items:center;padding:24px 28px">
    <div style="flex:1"><span class="kicker" style="color:var(--cielo)">Plan Empresa</span><p style="font-family:var(--display);font-weight:800;font-size:26px;line-height:30px;margin-top:6px">Encuentra al docente que necesitas.</p><p style="color:var(--cielo);margin-top:6px;font-size:14px;line-height:20px">Con facturación desde la propia app.</p></div>
    <div style="text-align:right"><span class="cifra" style="font-size:54px;line-height:56px">49 €</span><br><span style="color:var(--cielo)">al mes</span></div>
  </div>
  <div class="g3" style="grid-auto-rows:1fr">
    ${[["filtro", "Filtro por habilidades validadas", "Solo ve docentes cuyas habilidades se han validado en proyectos reales."], ["mensajes", "Mensajes ilimitados", "Habla con todos los candidatos que quiera."], ["empleo", "Ofertas destacadas", "Sus ofertas aparecen destacadas en Empleo. Hasta 5 ofertas activas."]].map(([ic, t, d]) => `<div class="card c"><span class="ic m" style="margin-bottom:10px">${icono(ic, 22, "var(--azul)")}</span><h4 style="color:var(--marino)">${t}</h4><p class="muted" style="font-size:13.5px;line-height:19px">${d}</p></div>`).join("")}
  </div>
  ${foto("empleo", 330)}
  <p class="pie-foto">Pantalla de Empleo. Cada perfil ve su propio panel: la empresa ve “Plan Empresa · 49 €/mes”.</p>
  <div class="card c soft grow centro">${kic("Qué gana la empresa")}<p style="margin-top:6px;font-size:14px;line-height:20px">Candidaturas con habilidades comprobadas en proyectos y no solo declaradas en un currículum, y un canal directo con docentes de toda la red.</p></div>`);

// ================= 7. CLASES PARTICULARES =================
pagina("05 Clases", "Clases particulares",
  "Los docentes libres publican un anuncio, ponen su precio y su horario, y el alumnado reserva.",
  `<div class="panel c" style="display:flex;gap:24px;align-items:center;padding:24px 28px">
    <div style="flex:1"><span class="kicker" style="color:var(--cielo)">Clases particulares</span><p style="font-family:var(--display);font-weight:800;font-size:26px;line-height:30px;margin-top:6px">Da clases a alumnos de toda la red.</p></div>
    <div style="text-align:right"><span class="cifra" style="font-size:44px;line-height:46px">0 €</span><br><span style="color:var(--cielo)">comisión en la 1.ª clase</span></div>
  </div>
  <div class="g2" style="grid-auto-rows:1fr">
    ${[["Tú pones el precio y el horario", "calendario"], ["Tus habilidades validadas salen en el anuncio", "check"], ["Clase de prueba de 45 minutos por videollamada", "mensajes"], ["Reserva en pocos pasos para el alumnado", "perfil"]].map(([t, ic]) => `<div class="card fila-c m"><span class="ic t">${icono(ic, 22, "var(--azul)")}</span><h4 style="font-size:15px;line-height:19px">${t}</h4></div>`).join("")}
  </div>
  <h3>Precios de los anuncios de la app</h3>
  <div class="card" style="overflow:hidden"><table class="tabla ancha">
    <tr><th>Docente (ejemplo)</th><th>Materia</th><th>Precio</th></tr>
    <tr><td>Sergio Blanco Ruiz</td><td>Matemáticas · ESO</td><td>16 €/hora</td></tr>
    <tr><td>Adrián Castro León</td><td>Programación y bases de datos · FP</td><td>20 €/hora</td></tr>
    <tr><td>Anuncios de Empleo</td><td>Desde 16 € hasta 22 € la hora</td><td>Precio fijado por el docente</td></tr>
  </table></div>
  <h3>Cómo funciona una reserva</h3>
  <div class="g4 grow" style="grid-auto-rows:1fr">
    ${[["1", "Anuncio", "El docente publica su anuncio con precio y horario."], ["2", "Reserva", "El alumno reserva una clase de prueba de 45 minutos."], ["3", "Primera clase", "Se da por videollamada en LinkEdu, sin comisión."], ["4", "Siguientes", "A partir de la segunda clase, LinkEdu cobra su comisión."]].map(([n, t, d]) => `<div class="card c centro"><span class="n-c">${n}</span><h4 style="margin-top:10px">${t}</h4><p class="muted" style="font-size:14px !important;line-height:20px !important">${d}</p></div>`).join("")}
  </div>
  <div class="g2">
    <div class="card c centro">${kic("Cómo gana LinkEdu")}<p style="margin-top:6px;font-size:14px;line-height:20px">Una comisión sobre las clases a partir de la segunda. El porcentaje todavía no está decidido.</p></div>
    <div class="card c soft centro">${kic("Por qué no cobrar la primera")}<p style="margin-top:6px;font-size:14px;line-height:20px">Es un incentivo para que docentes nuevos se animen a publicar su primer anuncio.</p></div>
  </div>`);

// ================= 8. COSTES =================
pagina("06 Costes", "Costes y qué falta para cobrar",
  "Hoy la app funciona con datos de ejemplo. Para cobrar de verdad hay que montar la parte que falta.",
  `<div class="g2" style="grid-auto-rows:auto">
    <div class="card c">${kic("Qué hay que pagar")}
      <ul class="lista" style="margin-top:10px;gap:9px">${["Dominio de la web (linkedu.es)", "Alojamiento de la app (hoy, Vercel)", "Servidor y base de datos para los datos reales", "Pasarela de pago para cobrar", "Moderación y atención a las personas usuarias"].map(li).join("")}</ul>
      <p class="muted" style="font-size:12.5px;line-height:17px;margin-top:12px">Importes por estimar cuando se elija cada servicio.</p></div>
    <div class="card c soft">${kic("Qué falta construir")}
      <ul class="lista" style="margin-top:10px;gap:9px">${["Cuentas y datos reales: la app no tiene servidor", "Cobros: Premium, comisiones, planes y clases", "Facturación de empresas", "Textos legales y protección de datos (alumnado menor)", "Verificación de centros y empresas"].map(li).join("")}</ul></div>
  </div>
  <div class="panel c" style="padding:22px 26px">${kic("Ingresos y costes", "var(--cielo)")}
    <p style="font-family:var(--display);font-weight:700;font-size:22px;line-height:27px;margin-top:6px">Primero hay que saber cuánto cuesta mantener LinkEdu; los ingresos solo tienen que cubrirlo.</p>
    <p style="color:var(--cielo);margin-top:8px;font-size:14px;line-height:20px">Al ser un proyecto sin ánimo de lucro, el objetivo no es ganar dinero, sino que la plataforma se sostenga sola.</p></div>
  <h3>Qué mediremos para decidir</h3>
  <div class="g2 grow" style="grid-auto-rows:1fr">
    ${[["Docentes que se hacen Premium", "Sobre el total de docentes que suben recursos."], ["Recursos de pago vendidos", "Cuántos al mes y a qué precio."], ["Empresas con plan activo", "Y cuántas ofertas publican."], ["Clases reservadas", "Cuántas pasan de la primera clase."]].map(([t, d]) => `<div class="card c centro"><h4 style="color:var(--marino)">${t}</h4><p class="muted" style="font-size:13.5px;line-height:19px">${d}</p></div>`).join("")}
  </div>`);

// ================= 9. HOJA DE RUTA =================
const fases = [
  ["Ahora", "App de demostración", "Todo es gratis y funciona con datos de ejemplo. Los precios y planes ya se ven y se pueden probar en la app.", "var(--marino)"],
  ["Fase 1", "Cuentas reales", "Servidor, cuentas, perfiles y publicación de recursos y proyectos. Todo sigue siendo gratis.", "var(--azul)"],
  ["Fase 2", "Premium y recursos de pago", "Pasarela de pago, Premium a 7,99 €/mes y comisión del 15 % en las ventas.", "var(--turquesa)"],
  ["Fase 3", "Empresas y clases", "Plan Empresa a 49 €/mes, facturación y clases particulares con comisión a partir de la segunda.", "var(--naranja)"],
];
pagina("07 Hoja de ruta", "Hoja de ruta de la monetización",
  "Se empieza por lo que ya funciona y se cobra solo cuando hay comunidad.",
  `<div class="col grow" style="gap:0;position:relative">
    <div style="position:absolute;left:23px;top:20px;bottom:20px;width:3px;background:var(--line)"></div>
    ${fases.map(([f, t, d, c]) => `<div style="display:flex;gap:18px;flex:1;align-items:center;position:relative"><span style="flex:none;width:48px;height:48px;border-radius:50%;background:${c};border:4px solid #fff;box-shadow:0 0 0 1px var(--line);display:flex;align-items:center;justify-content:center;color:${c === "var(--turquesa)" || c === "var(--naranja)" ? "var(--ink)" : "#fff"};font-family:var(--mono);font-weight:500;font-size:10px;text-align:center;line-height:11px">${f}</span><div class="card c" style="flex:1"><h3 style="color:var(--marino);font-size:19px">${t}</h3><p class="muted" style="font-size:14px;line-height:20px;margin-top:3px">${d}</p></div></div>`).join("")}
  </div>
  <div class="g3" style="grid-auto-rows:1fr">
    ${[["Sin publicidad invasiva", "El diseño es lo primero: nada de anuncios que rompan la experiencia."], ["Lo básico, gratis", "Conectar, colaborar y compartir no tendrá coste."], ["Precios transparentes", "La app ya enseña el desglose de cada pago."]].map(([t, d]) => `<div class="card c centro soft"><h4 style="color:var(--marino)">${t}</h4><p class="muted" style="font-size:13px;line-height:18px">${d}</p></div>`).join("")}
  </div>
  <div style="display:flex;justify-content:center;padding:2px 0">${logo("horizontal", "height:46px")}</div>`);

const css = `.n-c { display:inline-flex; width:28px; height:28px; border-radius:50%; background:var(--naranja); color:var(--ink); font-weight:700; align-items:center; justify-content:center; }`;
const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><title>LinkEdu · ¿Cómo monetizar?</title>
<link rel="stylesheet" href="base.css"><link rel="stylesheet" href="documento.css"><style>${css}</style></head>
<body class="mon">${paginas.join("\n")}</body></html>`;
fs.writeFileSync(path.join(aqui, "monetizacion.html"), html);
console.log("monetizacion.html listo,", paginas.length, "páginas");

// Genera memoria.html (la Memoria final del proyecto). Después, generar-pdf.mjs la pasa a PDF.
// Uso: node memoria.mjs
import fs from "node:fs";
import path from "node:path";
import { aqui, logo, icono, franja, creaPaginas, cap } from "./comun.mjs";

const { lista: paginas, pagina } = creaPaginas("Memoria del proyecto", "LinkEdu · Memoria final · Noviembre de 2026");
const L = "../../design/assets/logo";
const tarjeta = (titulo, texto, ic = "check", cl = "", estilo = "") =>
  `<div class="card fila-c ${estilo}"><span class="ic ${cl}">${icono(ic, 22, "var(--azul)")}</span><div><h4>${titulo}</h4><p class="muted" style="font-size:13.5px;line-height:19px">${texto}</p></div></div>`;
const foto = (f, alto, extra = "") => `<div class="shot" style="height:${alto}px;${extra}"><img src="${cap(f)}" alt="Captura de ${f}"></div>`;

// ================= 1. PORTADA =================
paginas.unshift(`<section class="page portada">
  <div>${logo("completo-blanco", "width:400px")}</div>
  <div class="p-banda"><div class="p-rejilla"></div><span class="p-sol"></span><span class="p-pil1"></span><span class="p-pil2"></span></div>
  <div style="margin-top:150px">
    <span class="kicker" style="color:var(--cielo)">Concurso de diseño de interfaces · 2.º DAW</span>
    <h1 style="margin-top:12px">Memoria <br>del <span style="background:linear-gradient(transparent 62%, rgba(252,181,39,.9) 62%)">proyecto</span></h1>
    <p class="sub">Cómo hemos diseñado y construido LinkEdu, la red profesional de la educación.</p>
  </div>
  <div style="flex:1"></div>
  <div class="p-pie"><span>Iván · Antonio</span><span>19 de noviembre de 2026</span></div>
  <div class="franja" aria-hidden="true" style="position:absolute;left:0;right:0;bottom:0;height:10px"><span></span><span></span><span></span><span></span><span></span></div>
</section>`);

// ================= 2. RESUMEN =================
pagina("Resumen", "LinkEdu en una página",
  "Una app web para el sector educativo, pensada como un “LinkedIn de la educación”, sin ánimo de lucro.",
  `<div class="panel c" style="padding:26px 30px">
    <span class="kicker" style="color:var(--cielo)">La idea</span>
    <p style="font-family:var(--display);font-weight:800;font-size:30px;line-height:34px;margin:8px 0 12px">La red profesional de la educación: docentes, alumnado y empresas, conectados.</p>
    <p style="color:var(--cielo)">LinkEdu conecta a docentes del mismo perfil, les deja montar proyectos colaborativos y compartir recursos, y permite que las empresas encuentren y contraten a docentes libres.</p>
  </div>
  <div class="card c" style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;padding:20px 22px">
    ${[["6", "pantallas funcionales"], ["3", "perfiles: docente, alumnado y empresa"], ["26", "iconos propios"], ["65", "tests que pasan"], ["34 s", "de vídeo promocional"]].map(([c, t]) => `<div class="est"><span class="cifra">${c}</span><span>${t}</span></div>`).join("")}
  </div>
  <div class="g3">
    ${[["red", "Docentes", "Encuentran a otros docentes de su materia y etapa, comparten recursos y montan proyectos.", ""], ["perfil", "Alumnado", "Participa en proyectos, aprende con quien le enseña y puede reservar clases particulares.", "t"], ["empleo", "Empresas", "Publican ofertas y buscan docentes con habilidades validadas.", "n"]].map(([ic, t, d, cl]) => `<div class="card c"><span class="ic ${cl}" style="margin-bottom:10px">${icono(ic, 22, "var(--azul)")}</span><h4>${t}</h4><p class="muted" style="font-size:13.5px;line-height:19px">${d}</p></div>`).join("")}
  </div>
  <div class="card c soft grow" style="display:flex;flex-direction:column">
    <h3 style="margin-bottom:10px">Contenido</h3>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0 30px;flex:1">
      ${["La idea", "El equipo y cómo trabajamos", "Cronología", "Identidad de marca", "Diseño UI/UX", "La app: Inicio y Mi red", "La app: Proyectos y Recursos", "La app: Empleo y Perfil", "Usabilidad y accesibilidad", "Desarrollo técnico", "Vídeo promocional", "Retos y soluciones", "Conclusiones y siguientes pasos", "Anexos"].map((t, i) => `<div style="display:flex;gap:12px;align-items:center;border-bottom:1px solid var(--line);font-weight:700;color:var(--marino);font-size:14px"><span class="kicker" style="color:var(--azul);width:22px">${String(i + 1).padStart(2, "0")}</span>${t}</div>`).join("")}
    </div>
  </div>`);

// ================= 3. LA IDEA =================
pagina("01 La idea", "De la idea a la app",
  "Queremos que el profesorado deje de trabajar solo en su centro y pueda conectar, compartir y crecer con otros.",
  `<div class="g2">
    <div class="card c"><span class="kicker" style="color:var(--azul)">El problema</span><p style="margin-top:6px">Quien enseña suele tener pocos sitios donde encontrar a docentes de su misma materia y etapa, compartir lo que le funciona, montar proyectos con otros centros o darse a conocer ante quien contrata.</p></div>
    <div class="panel c"><span class="kicker" style="color:var(--cielo)">La solución</span><p style="margin-top:6px">Una red social pensada para educación, con herramientas para colaborar de verdad: mapa de contactos, proyectos con tablero y chat, recursos y empleo.</p></div>
  </div>
  <h3 style="margin-top:4px">Los cinco principios de la app</h3>
  <div class="col grow" style="gap:10px">
    ${[["red", "Conectar docentes del mismo perfil", "Mi red muestra tu red en un mapa internacional y recomienda contactos.", ""], ["proyecto", "Proyectos colaborativos", "Centros distintos, un mismo proyecto: tablero, chat y habilidades validadas.", "t"], ["recurso", "Compartir recursos", "Fichas, presentaciones y vídeos para el aula, gratis o de pago (Premium).", "m"], ["perfil", "Alumnado", "Perfil propio, proyectos y clases particulares.", "a"], ["empleo", "Empresas y docentes libres", "Docentes libres y empresas que buscan docentes: ofertas y anuncios.", "n"]].map(([ic, t, d, cl]) => `<div class="card fila-c m grow"><span class="ic ${cl}">${icono(ic, 24, "var(--azul)")}</span><div><h4>${t}</h4><p class="muted" style="font-size:13.5px;line-height:19px">${d}</p></div></div>`).join("")}
  </div>
  <div class="panel c" style="display:flex;gap:22px;align-items:center">
    <div style="flex:1"><span class="kicker" style="color:var(--cielo)">Objetivo del concurso</span><p style="font-family:var(--display);font-weight:700;font-size:20px;line-height:25px;margin-top:4px">Todo el mundo hace la misma idea: queremos destacar por el diseño UI/UX con una app muy llamativa.</p></div>
  </div>
  <div class="card c soft"><span class="kicker" style="color:var(--ink-muted)">Entregables del proyecto</span>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">${["Aplicación funcional", "Manual de marca", "Memoria", "¿Cómo monetizar?", "Vídeo de la app"].map((t) => `<span class="tag marino" style="font-size:14px;padding:5px 14px">${t}</span>`).join("")}</div></div>`);

// ================= 4. EQUIPO =================
pagina("02 Equipo", "El equipo y cómo trabajamos",
  "Somos dos personas con roles claros, y todo el trabajo pasa por Git para no pisarnos.",
  `<div class="g2">
    <div class="card c"><div style="display:flex;gap:14px;align-items:center;margin-bottom:10px"><span class="ic m" style="width:52px;height:52px;font-family:var(--display);font-weight:800;font-size:22px;color:var(--marino)">I</span><div><h3>Iván</h3><span class="kicker" style="color:var(--azul)">Project manager y vídeo</span></div></div>
      <ul class="lista"><li>Organiza el proyecto, el repositorio y el diario.</li><li>Crea el logo y sus 18 versiones.</li><li>Produce el vídeo promocional.</li><li>Aplica las mejoras del informe del profesor.</li></ul></div>
    <div class="card c"><div style="display:flex;gap:14px;align-items:center;margin-bottom:10px"><span class="ic t" style="width:52px;height:52px;font-family:var(--display);font-weight:800;font-size:22px;color:#0b5a50">A</span><div><h3>Antonio</h3><span class="kicker" style="color:var(--azul)">Desarrollo de la app</span></div></div>
      <ul class="lista"><li>Crea el sistema de diseño y el canvas.</li><li>Programa la web app en Angular.</li><li>Aplica las normas visuales de la teoría.</li><li>Optimiza el rendimiento del mapa.</li></ul></div>
  </div>
  <h3 style="margin-top:4px">Herramientas</h3>
  <div class="g4" style="grid-auto-rows:1fr">
    ${[["Claude Design", "Diseño de pantallas y sistema de diseño"], ["Claude Code", "Ayuda para programar y documentar"], ["Angular 22", "Framework de la web app"], ["Tailwind CSS 4", "Estilos de todas las pantallas"], ["Git y GitHub", "Ramas, Pull Requests y revisión"], ["Vercel", "Publicación de la app"], ["Remotion", "Vídeo hecho con código"], ["ElevenLabs", "Voz en off y efectos de sonido"]].map(([t, d]) => `<div class="card c centro"><h4 style="color:var(--marino)">${t}</h4><p class="muted" style="font-size:13px;line-height:18px">${d}</p></div>`).join("")}
  </div>
  <h3 style="margin-top:4px">Flujo de trabajo con Git</h3>
  <div class="g4">
    ${[["1", "Rama", "Una rama por tarea, creada desde main."], ["2", "Commit", "Mensajes en español y en presente."], ["3", "Pull Request", "Cada cambio entra por PR; main está protegida."], ["4", "Revisión", "Lo revisa la otra persona."]].map(([n, t, d]) => `<div class="card c"><span class="n-c">${n}</span><h4 style="margin-top:8px">${t}</h4><p class="muted" style="font-size:13px;line-height:18px">${d}</p></div>`).join("")}
  </div>
  <div class="panel c grow" style="display:flex;flex-direction:column;justify-content:center"><span class="kicker" style="color:var(--cielo)">El diario del proyecto</span><p style="margin-top:4px">Cada persona escribe una entrada por día de trabajo: qué se hizo, qué se decidió, qué problemas hubo y qué queda pendiente. De ahí sale esta memoria. Más de 30 Pull Requests unidos a main en tres semanas.</p></div>`);

// ================= 5. CRONOLOGÍA =================
const crono = [
  ["29 oct", "Arranque", "Se escribe la descripción del proyecto, se prepara el repositorio con ramas protegidas y se crea el primer logo en SVG. Antonio monta el sistema de diseño: tokens de color, tipografías, componentes y la franja de colores."],
  ["5 nov", "Canvas y logo integrado", "El diseño de la app se guarda en el repositorio. Se prueban variantes del icono del logo y la cabecera pasa a usar el logo integrado a 44 px."],
  ["6 nov", "Logo nuevo", "Tras la propuesta del profesor se quita el birrete: nace el logo actual (una “e” azul con punto naranja) con 18 versiones."],
  ["12 nov", "De diseño a app", "Segunda ronda de diseño (proyectos, recursos, empleo y perfil). Nace la web app en Angular con Tailwind, y se aplican las normas visuales de la teoría: botones, contraste, Fitts."],
  ["13 nov", "Móvil, despliegue y vídeo", "La app se adapta al móvil y se publica en Vercel. Empieza el vídeo con gráficos en movimiento; se arregla el parpadeo de los fotogramas."],
  ["16 nov", "Informe de usabilidad", "El profesor envía su informe UX/UI. Se aplican todas sus mejoras: ventanas en vez de formularios fijos, rol visible, tarjetas con 4 datos. También se pulen los menús del móvil."],
  ["17 nov", "Vídeo con voz y sonido", "El vídeo se rehace en 34 s con voz en off, música y efectos, centrado en las tres vistas con más personalidad."],
];
pagina("03 Cronología", "Tres semanas de trabajo",
  "Del primer logo a la app funcionando y al vídeo, paso a paso.",
  `<div class="col grow" style="gap:0;position:relative">
    <div style="position:absolute;left:71px;top:10px;bottom:10px;width:3px;background:var(--line)"></div>
    ${crono.map(([f, t, d], i) => `<div style="display:flex;gap:18px;flex:1;align-items:center;position:relative">
      <span class="kicker" style="width:44px;flex:none;color:var(--azul);text-align:right;font-size:12px">${f}</span>
      <span style="flex:none;width:17px;height:17px;border-radius:50%;background:${["var(--marino)", "var(--azul)", "var(--turquesa)", "var(--amarillo)", "var(--naranja)", "var(--azul)", "var(--marino)"][i]};border:3px solid #fff;box-shadow:0 0 0 1px var(--line);margin-left:2px"></span>
      <div class="card c" style="flex:1;padding:11px 16px"><h4 style="color:var(--marino)">${t}</h4><p class="muted" style="font-size:13.2px;line-height:18.5px">${d}</p></div></div>`).join("")}
  </div>`);

// ================= 6. IDENTIDAD =================
pagina("04 Marca", "Identidad de marca",
  "El logo se simplificó en tres pasos hasta quedarse con lo esencial. El detalle está en el manual de marca.",
  `<div class="g3" style="grid-auto-rows:auto">
    ${[["antiguo", "1. Primer logo", "Una “e” con personas alrededor y birrete."], ["antiguo_2", "2. Con birrete", "El icono se simplifica, pero el birrete sigue."], ["", "3. Logo actual", "Una “e” azul con punto naranja. Sin birrete."]].map(([d, t, x], i) => `<div class="card" style="overflow:hidden;${i === 2 ? "border:2px solid var(--logo-azul)" : ""}"><div style="height:130px;display:flex;align-items:center;justify-content:center;background:${i === 2 ? "var(--azul-soft)" : "var(--soft)"};padding:12px"><img src="${L}/${d ? d + "/" : ""}linkedu-horizontal.svg" style="width:100%"></div><div style="padding:10px 14px 12px"><h4>${t}</h4><p class="muted" style="font-size:13px;line-height:18px">${x}</p></div></div>`).join("")}
  </div>
  <div class="g3">
    ${[["El birrete es un cliché", "Resta modernidad. La “e” con el punto naranja ya funciona sola."], ["La prueba en negro", "El rombo hueco se leía como un “8” en negro: se descartó."], ["Una sola síntesis", "Con rombo habría tres capas (letra, rombo y punto) y se perdería."]].map(([t, d]) => `<div class="card c soft"><h4 style="color:var(--marino)">${t}</h4><p class="muted" style="font-size:13px;line-height:18px">${d}</p></div>`).join("")}
  </div>
  <div class="card c">
    <h4 style="margin-bottom:10px">Colores</h4>
    <div style="display:flex;height:64px;border-radius:8px;overflow:hidden">${[["#102344", "Marino", "#fff", 3], ["#016bfc", "Azul", "#fff", 3], ["#fe5c01", "Naranja", "#fff", 1.5], ["#073157", "Marino UI", "#fff", 2], ["#21bcaa", "Turquesa", "#0c1d2e", 2], ["#fcb527", "Amarillo", "#0c1d2e", 2]].map(([h, n, t, f]) => `<span style="flex:${f};background:${h};color:${t};display:flex;flex-direction:column;justify-content:flex-end;padding:6px 8px;font-size:11px;line-height:14px;font-weight:700">${n}<span style="font-family:var(--mono);font-weight:500;font-size:10px">${h.toUpperCase()}</span></span>`).join("")}</div>
    <p class="muted" style="font-size:13px;line-height:19px;margin-top:10px">Los tres primeros son los del logo actual. Los de la interfaz salen de los colores del primer logo (marino, azul, turquesa, naranja y amarillo), ajustados para que se lean bien.</p>
  </div>
  <div class="g3">
    ${[["Bricolage Grotesque", "var(--display)", "800", "Títulos y nombres"], ["Atkinson Hyperlegible", "var(--sans)", "700", "Todo el texto"], ["IBM Plex Mono", "var(--mono)", "500", "Datos y contadores"]].map(([n, f, w, u]) => `<div class="card c centro"><span class="kicker" style="color:var(--azul)">${u}</span><p style="font-family:${f};font-weight:${w};font-size:22px;line-height:26px;color:var(--marino);margin-top:4px">${n}</p></div>`).join("")}
  </div>
  <div class="panel c grow" style="display:flex;flex-direction:column;justify-content:center"><span class="kicker" style="color:var(--cielo)">Firmas de la marca</span><p style="margin-top:4px">La <strong>franja</strong> de cinco colores (4 : 2 : 2 : 1 : 1) arriba de cada pantalla y el <strong>subrayado</strong> amarillo en los titulares. Atkinson Hyperlegible se eligió porque se lee bien con baja visión: encaja con una red educativa accesible.</p></div>`);

// ================= 7. DISEÑO UI/UX =================
pagina("05 Diseño", "Diseño UI/UX",
  "Estilo plano y ordenado, con una estructura que se repite en todas las pantallas.",
  `${foto("inicio", 300)}
  <p class="pie-foto">Pantalla de Inicio: franja, cabecera con el logo integrado y tres columnas.</p>
  <div class="g2 grow" style="grid-auto-rows:1fr">
    ${[["Tarjetas planas", "Tarjetas blancas con borde fino sobre fondo gris azulado. Se destacan por el color, no por las sombras."], ["Tres columnas", "Perfil a la izquierda, feed en el centro y sugerencias a la derecha. Todas las pantallas siguen esa estructura."], ["Paneles marino", "Como mucho dos por pantalla, para lo importante: una oferta de empleo o tus grupos."], ["Ninguna parte en blanco", "Los huecos se rellenan con contenido útil, nunca estirando los elementos."], ["Un acento por vista", "El naranja marca una sola cosa (“Nuevo”, “Plazo abierto”). Si todo es naranja, nada lo es."], ["Solo tema claro", "Sin modo oscuro: menos trabajo y un estilo más coherente."], ["Confirmar en dos pasos", "Inscribirse, unirse o validar pide un segundo paso para evitar errores."], ["Ventanas flotantes", "Crear, invitar o subir se hace en ventanas con el mismo patrón en todas las pantallas."]].map(([t, d]) => `<div class="card c centro"><h4 style="color:var(--marino)">${t}</h4><p class="muted" style="font-size:13px;line-height:18px">${d}</p></div>`).join("")}
  </div>`);

// ================= 8-10. LA APP =================
const bloqueApp = (f, titulo, hace, diseno) => `
  <div class="col" style="gap:10px;flex:1;min-height:0">
    <div style="display:flex;align-items:baseline;gap:12px"><h3>${titulo}</h3></div>
    ${foto(f, 262)}
    <div class="g2" style="flex:1;grid-auto-rows:1fr">
      <div class="card c" style="padding:12px 16px"><span class="kicker" style="color:var(--azul)">Qué se puede hacer</span><ul class="lista" style="margin-top:6px;gap:4px">${hace.map((x) => `<li style="font-size:13px;line-height:18px;padding-left:16px">${x}</li>`).join("")}</ul></div>
      <div class="card c soft" style="padding:12px 16px"><span class="kicker" style="color:var(--azul)">Decisiones de diseño</span><ul class="lista" style="margin-top:6px;gap:4px">${diseno.map((x) => `<li style="font-size:13px;line-height:18px;padding-left:16px">${x}</li>`).join("")}</ul></div>
    </div>
  </div>`;
pagina("06 La app", "Inicio y Mi red",
  "La puerta de entrada y el mapa de contactos.",
  bloqueApp("inicio", "Inicio", ["Publicar un recurso, un proyecto o un evento", "Dar me gusta, comentar y compartir", "Unirte a proyectos y grupos", "Apuntarte a eventos"], ["“Tus grupos” dentro de “Tus proyectos” y “Tu semana” dentro de eventos", "Un único panel marino: la oferta de empleo", "Más espacio entre columnas y bloques"]) +
  bloqueApp("red", "Mi red", ["Mapa con zoom y arrastre", "Filtrar por materia, proyectos o grupos", "Aceptar invitaciones y conectar con recomendados", "Ver los contactos de cada país"], ["Mapa de puntos internacional con tu foto en el centro", "Etiquetas con fondo sólido para que se lean", "Mapa un 12 % más bajo: los recomendados quedan antes"]));
pagina("07 La app", "Proyectos y Recursos",
  "Dos de las vistas con más personalidad de LinkEdu.",
  bloqueApp("proyectos", "Proyectos", ["Crear proyectos en una ventana flotante", "Tablero de tareas y chat del equipo", "Invitar a docentes con “+ Invitar”", "Validar habilidades en dos pasos"], ["Reuniones y plantillas en una sola tarjeta", "En el móvil, el selector de proyecto es un desplegable", "Mensajes y confirmaciones claros"]) +
  bloqueApp("recursos", "Recursos", ["Explorar, descargar y comprar recursos", "Subir un recurso con “+ Subir recurso”", "Editar tus recursos y hacerte Premium", "Ver valoración y descargas al abrirlo"], ["Tarjetas inspiradas en las clases de Google Classroom: banner de color y foto del autor", "Cada tarjeta muestra solo 4 datos", "Insignia PRO para autores Premium"]));
pagina("08 La app", "Empleo y Perfil",
  "Donde las empresas encuentran docentes, y donde cada persona se presenta.",
  bloqueApp("empleo", "Empleo", ["Ver ofertas y apuntarte en dos pasos", "Publicar una oferta (empresa) o un anuncio de clases (docente)", "Vista de empresa con sus ofertas", "Clases particulares para el alumnado"], ["Selector de rol con la opción activa en marino", "Logos de los centros en cada oferta", "Botón “+” para crear ofertas y anuncios"]) +
  bloqueApp("perfil", "Perfil", ["Perfil de profesora, de alumno y de empresa", "Ofertas, publicaciones y habilidades", "Editar el perfil y compartirlo", "Abrir el perfil de cualquier persona"], ["Cada foto y cada nombre llevan a su perfil", "Cada perfil tiene al menos 2 proyectos y 3 recursos", "Insignia con el rol activo junto al avatar"]));

// ================= 11. USABILIDAD =================
pagina("09 Usabilidad", "Usabilidad y accesibilidad",
  "Aplicamos las leyes vistas en clase y el informe de usabilidad del profesor.",
  `<div class="card" style="overflow:hidden"><table class="tabla">
    <tr><th style="width:130px">Ley</th><th>Qué dice</th><th>Qué hicimos</th></tr>
    <tr><td>Jakob</td><td>Se espera que funcione como lo que ya conocemos.</td><td>Patrones de red social: feed, perfiles, conexiones y notificaciones.</td></tr>
    <tr><td>Fitts</td><td>Cuanto más grande y cercano, más fácil de pulsar.</td><td>38 botones pequeños pasan a 40 px; táctiles de 40–48 px en el móvil.</td></tr>
    <tr><td>Hick</td><td>Más opciones, más tiempo para decidir.</td><td>Ventanas en vez de formularios fijos; desplegables en el móvil.</td></tr>
    <tr><td>Miller</td><td>Recordamos unos 7 elementos a la vez.</td><td>Menú de 5 bloques y tarjetas con 4 datos.</td></tr>
    <tr><td>Von Restorff</td><td>Lo distinto destaca.</td><td>Botón principal relleno y los demás con borde; un solo naranja por vista.</td></tr>
    <tr><td>WCAG AA</td><td>Contraste mínimo de 4,5 : 1.</td><td>Naranja y turquesa más oscuros sobre blanco; estados con icono y texto.</td></tr>
  </table></div>
  <div class="g2 grow">
    <div class="card c"><span class="kicker" style="color:var(--azul)">Informe del profesor · 16 de noviembre</span>
      <ul class="lista" style="margin-top:8px;gap:6px">
        <li style="font-size:13.5px;line-height:19px">Recursos: botón “+ Subir recurso” que abre una ventana.</li>
        <li style="font-size:13.5px;line-height:19px">Tarjetas con solo 4 datos; el resto, al abrirlas.</li>
        <li style="font-size:13.5px;line-height:19px">Proyectos: “+ Invitar” en una ventana.</li>
        <li style="font-size:13.5px;line-height:19px">Inicio: bloques agrupados y más espacio.</li>
        <li style="font-size:13.5px;line-height:19px">Mi red: etiquetas del mapa con fondo sólido.</li>
        <li style="font-size:13.5px;line-height:19px">Campanita con contador naranja.</li>
        <li style="font-size:13.5px;line-height:19px">Insignia con el rol activo en toda la plataforma.</li>
      </ul></div>
    <div class="col">
      <div class="panel c grow" style="display:flex;flex-direction:column;justify-content:center"><span class="kicker" style="color:var(--cielo)">Foco visible</span><p style="margin-top:4px;font-size:14px;line-height:20px">Anillo doble, oscuro y amarillo, al navegar con el Tabulador: se ve sobre fondos claros y oscuros.</p></div>
      <div class="card c grow centro"><span class="kicker" style="color:var(--azul)">Nunca solo color</span><p class="muted" style="margin-top:4px;font-size:13.5px;line-height:19px">El aviso de “retirar candidatura” lleva icono, borde y el texto “Atención”.</p></div>
      <div class="card c grow centro"><span class="kicker" style="color:var(--azul)">Menos movimiento</span><p class="muted" style="margin-top:4px;font-size:13.5px;line-height:19px">Si el sistema lo pide, las animaciones se desactivan solas.</p></div>
    </div>
  </div>`);

// ================= 12. DESARROLLO TÉCNICO =================
pagina("10 Técnica", "Desarrollo técnico",
  "Una app moderna, ligera y probada, con datos de ejemplo mientras no hay servidor.",
  `<div class="g3" style="grid-auto-rows:1fr">
    ${[["Angular 22", "Sin zone.js y con signals."], ["Tailwind CSS 4", "El diseño está en las clases de los .html."], ["Datos de prueba", "Todo funciona en memoria, sin backend."], ["65 tests", "Con Vitest. Todos pasan."], ["Vercel", "La app se despliega en Vercel."], ["Cargas bajo demanda", "Cada pantalla se carga solo al visitarla."]].map(([t, d]) => `<div class="card c centro"><h4 style="color:var(--marino)">${t}</h4><p class="muted" style="font-size:13px;line-height:18px">${d}</p></div>`).join("")}
  </div>
  <div class="g2">
    <div class="card c soft"><span class="kicker" style="color:var(--azul)">Organización del código</span>
<pre style="font-family:var(--mono);font-size:11.5px;line-height:17px;margin-top:8px;color:var(--ink)">src/app/
├─ compartido/  marco, buscador, iconos,
│               ventanas, avisos, confeti
├─ datos/       datos de ejemplo y estado
└─ paginas/     inicio, red, proyectos,
                recursos, empleo, perfil</pre></div>
    <div class="card c"><span class="kicker" style="color:var(--azul)">Rendimiento del mapa</span>
      <p style="font-family:var(--display);font-weight:800;font-size:30px;line-height:34px;color:var(--marino);margin:6px 0">320–760 ms → ~1 ms</p>
      <p class="muted" style="font-size:13px;line-height:18px">Tiempo de pintar la tierra del mapa de Mi red. Se pasó de miles de puntos a una baldosa de puntos que se repite.</p></div>
  </div>
  <h3>Versión móvil</h3>
  <div class="fila grow" style="gap:14px">
    ${["inicio-movil", "proyectos-movil"].map((f) => `<div class="shot" style="flex:none;height:470px;width:217px;border-radius:20px;border:5px solid var(--logo-marino);background:#fff"><img src="${cap(f)}" alt="Captura móvil" style="object-position:top"></div>`).join("")}
    <div class="col" style="flex:1">
      <div class="card c grow centro"><h4>Columnas apiladas</h4><p class="muted" style="font-size:13px;line-height:18px">Orden: centro, izquierda, derecha.</p></div>
      <div class="card c grow centro"><h4>Ventanas como hoja</h4><p class="muted" style="font-size:13px;line-height:18px">Suben desde abajo; cierre sin parpadeos.</p></div>
      <div class="card c grow centro"><h4>Sin scroll oculto</h4><p class="muted" style="font-size:13px;line-height:18px">Desplegables y rejillas visibles.</p></div>
    </div>
  </div>`);

// ================= 13. VÍDEO =================
pagina("11 Vídeo", "Vídeo promocional",
  "Unos 34 segundos que enseñan la app real, pensados para ser muy llamativos y entenderse incluso sin sonido.",
  `<div class="g2">
    <div class="panel c"><span class="kicker" style="color:var(--cielo)">Estilo</span><p style="font-family:var(--display);font-weight:800;font-size:22px;line-height:26px;margin:6px 0 8px">Estudio de producto + Cristal</p><p style="color:var(--cielo);font-size:13.5px;line-height:19px">Fondo marino con luces de color, paneles de cristal en 3D con la app dentro y objetos 3D que giran y flotan.</p></div>
    <div class="card c"><span class="kicker" style="color:var(--azul)">Sonido</span>
      <ul class="lista" style="margin-top:8px;gap:5px"><li style="font-size:13.5px;line-height:19px">Voz en off en español (ElevenLabs).</li><li style="font-size:13.5px;line-height:19px">Efectos para cada acción.</li><li style="font-size:13.5px;line-height:19px">Música compuesta con código, a 120 BPM, que baja cuando habla la voz.</li></ul></div>
  </div>
  <div class="card" style="overflow:hidden"><table class="tabla ancha">
    <tr><th style="width:92px">Tiempo</th><th style="width:150px">Escena</th><th>Qué pasa</th></tr>
    <tr><td>0–4 s</td><td>Perfiles</td><td>Docente, alumno y empresa entre objetos 3D: “¿Y si estuvieran conectados?”.</td></tr>
    <tr><td>4–6 s</td><td>Logo</td><td>Vuelo de cámara hacia el logo: “Esto es LinkEdu”.</td></tr>
    <tr><td>6–13 s</td><td>01 Conecta</td><td>Mi red: mapa internacional con zoom a otros países.</td></tr>
    <tr><td>14–22 s</td><td>02 Colabora</td><td>Proyectos: tablero con tareas que cambian de columna.</td></tr>
    <tr><td>22–30 s</td><td>03 Descubre</td><td>Recursos: filtros, vista previa y favoritos.</td></tr>
    <tr><td>31–34 s</td><td>Cierre</td><td>Logo y lema: “Conecta. Aprende. Crece.”.</td></tr>
  </table></div>
  <div class="card c" style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:18px 22px">
    ${[["34 s", "de duración"], ["1019", "fotogramas a 30 fps"], ["1080p", "1920 × 1080 px"], ["6", "escenas con voz"]].map(([c, t]) => `<div class="est"><span class="cifra">${c}</span><span>${t}</span></div>`).join("")}
  </div>
  <div class="g3 grow" style="grid-auto-rows:1fr">
    ${[["perfil", "Se ve la app real", "Son grabaciones de la app con un cursor que hace clic de verdad, dentro de paneles de cristal 3D. Los botones de demostración para cambiar de perfil no salen."], ["flecha", "Ritmo rápido", "Vuelos de cámara de menos de medio segundo, con giro y zoom-out, y la cámara se acerca a cada clic del cursor."], ["proyecto", "Hecho con código", "Remotion monta las escenas, Playwright graba la app y ffmpeg corta la voz. Todo está en el repositorio, salvo los archivos de vídeo pesados."]].map(([ic, t, d]) => `<div class="card c centro"><span class="ic" style="margin-bottom:10px">${icono(ic, 22, "var(--azul)")}</span><h4 style="color:var(--marino)">${t}</h4><p class="muted" style="font-size:13.5px;line-height:19px">${d}</p></div>`).join("")}
  </div>`);

// ================= 14. RETOS =================
const retos = [
  ["El logo salía al revés", "La primera vectorización rellenaba el fondo en vez de las formas.", "Se invirtió la máscara."],
  ["El rombo parecía un “8”", "En negro, el rombo hueco se confundía con un 8.", "Se maciza el rombo; más tarde el rombo se descarta del logo."],
  ["Columnas a distinta altura", "Las columnas de Proyectos terminaban en alturas distintas.", "Se midieron en Chrome y se añadieron filas hasta igualarlas."],
  ["El zoom del mapa iba a tirones", "Se redibujaban unos 100.000 puntos por fotograma.", "Baldosa de puntos repetida: de 320–760 ms a ~1 ms."],
  ["Contraste insuficiente", "Naranja y turquesa sobre blanco no llegaban a AA.", "Tonos más oscuros y placeholders en gris oscuro."],
  ["Parpadeo al cerrar ventanas", "La capa oscura salía antes que la hoja del móvil.", "Las dos animaciones duran lo mismo: 180 ms."],
  ["El vídeo parpadeaba", "Unos 229 fotogramas de 1184 salían con solo el fondo azul.", "Se quitó el desenfoque de movimiento sobre el mundo 3D."],
];
pagina("12 Retos", "Retos y cómo los resolvimos",
  "Los problemas que más nos costaron y lo que aprendimos de ellos.",
  `<div class="col grow" style="gap:10px">
    ${retos.map(([t, p, s], i) => `<div class="card grow" style="display:grid;grid-template-columns:200px 1fr;overflow:hidden"><div style="background:${i % 2 ? "var(--azul-soft)" : "var(--marino-soft)"};padding:12px 16px;display:flex;flex-direction:column;justify-content:center"><span class="kicker" style="color:var(--azul)">Reto ${i + 1}</span><h4 style="color:var(--marino);margin-top:2px">${t}</h4></div><div style="padding:10px 18px;display:flex;flex-direction:column;justify-content:center;gap:3px"><p style="font-size:13.5px;line-height:19px"><strong>Qué pasaba:</strong> <span class="muted">${p}</span></p><p style="font-size:13.5px;line-height:19px"><strong>Solución:</strong> <span class="muted">${s}</span></p></div></div>`).join("")}
  </div>`);

// ================= 15. CONCLUSIONES =================
pagina("13 Conclusiones", "Conclusiones y siguientes pasos",
  "Lo que hemos conseguido, lo que queda y lo que hay que decir con honestidad.",
  `<div class="panel c" style="padding:22px 26px"><span class="kicker" style="color:var(--cielo)">Lo que hemos conseguido</span>
    <ul class="lista" style="margin-top:10px;gap:7px;color:#fff"><li>Una app funcional de seis pantallas y tres perfiles, desplegada en Vercel.</li><li>Una identidad de marca completa: logo en 18 versiones, paleta, tipografías, iconos y voz.</li><li>Un diseño que cumple las leyes de usabilidad y el contraste AA.</li><li>Un vídeo promocional de 34 s con voz, música y efectos.</li></ul></div>
  <h3>Lo que hemos aprendido</h3>
  <div class="g2 grow" style="grid-auto-rows:1fr">
    ${[["Las leyes se aplican", "Fitts, Hick o Miller no son solo teoría: cada una nos dio una decisión concreta de diseño."], ["Un sistema de diseño ahorra tiempo", "Con tokens y componentes, cambiar un color o un radio cambia toda la app."], ["Medir antes de optimizar", "El mapa pasó de 320–760 ms a ~1 ms después de medirlo en el navegador."], ["Revisar en pareja", "Los Pull Requests evitaron pisarnos y dejaron un historial de cada decisión."]].map(([t, d]) => `<div class="card c centro"><h4 style="color:var(--marino)">${t}</h4><p class="muted" style="font-size:14px;line-height:20px">${d}</p></div>`).join("")}
  </div>
  <div class="g2">
    <div class="card c"><span class="kicker" style="color:var(--azul)">Siguientes pasos</span>
      <ul class="lista" style="margin-top:8px;gap:6px"><li style="font-size:13.5px;line-height:19px">Hacer la parte del servidor (server-side), con cuentas y datos reales, para que el programa quede terminado y funcional: ahora mismo está orientado únicamente a la interfaz (UI).</li><li style="font-size:13.5px;line-height:19px">Poner en marcha el plan de monetización.</li></ul></div>
    <div class="card c soft"><span class="kicker" style="color:var(--azul)">Limitaciones</span>
      <ul class="lista" style="margin-top:8px;gap:6px"><li style="font-size:13.5px;line-height:19px">Los datos son de ejemplo: algunas ciudades, centros y años de las personas son inventados.</li><li style="font-size:13.5px;line-height:19px">No hay servidor: nada se guarda al recargar.</li><li style="font-size:13.5px;line-height:19px">El vídeo se ha comprobado por fotogramas, no entero reproduciéndose.</li></ul></div>
  </div>
  <div class="card c centro" style="border-left:5px solid var(--naranja)"><p style="font-family:var(--display);font-weight:700;font-size:20px;line-height:25px;color:var(--marino)">“Un LinkedIn de la educación, hecho por y para quien enseña.”</p></div>`);

// ================= 16. ANEXOS =================
pagina("14 Anexos", "Anexos",
  "Dónde está cada entregable y de dónde sale cada pieza.",
  `<div class="card" style="overflow:hidden;flex:none"><table class="tabla">
    <tr><th style="width:170px">Entregable</th><th>Dónde está</th></tr>
    <tr><td>Aplicación</td><td><code>web_app/</code> (Angular 22 + Tailwind 4)</td></tr>
    <tr><td>Manual de marca</td><td><code>documentos/manual-de-marca/</code></td></tr>
    <tr><td>Memoria</td><td><code>documentos/memoria-final/</code></td></tr>
    <tr><td>¿Cómo monetizar?</td><td><code>documentos/monetizacion/</code></td></tr>
    <tr><td>Vídeo</td><td><code>video/</code> (guion, proyecto Remotion y notas)</td></tr>
    <tr><td>Logo e iconos</td><td><code>design/assets/</code></td></tr>
    <tr><td>Diseño y sistema de diseño</td><td><code>design/claude-design/</code></td></tr>
    <tr><td>Diario del proyecto</td><td><code>memoria/diario/</code></td></tr>
  </table></div>
  <div class="g2">
    <div class="card c"><span class="kicker" style="color:var(--azul)">Enlaces</span>
      <ul class="lista" style="margin-top:8px;gap:6px"><li style="font-size:13px;line-height:18px">Sistema de diseño: <code style="font-size:9.5px">claude.ai/artifact/UYFcsEQgzgfYWSX5DtJ9BN</code></li><li style="font-size:13px;line-height:18px">Diseño de la app: <code style="font-size:9.5px">claude.ai/artifact/A8JJ6qNS6oPAAjJKigt5No</code></li></ul></div>
    <div class="card c soft"><span class="kicker" style="color:var(--azul)">Tipografías</span><p style="font-size:13px;line-height:18px;margin-top:6px">Bricolage Grotesque, Atkinson Hyperlegible e IBM Plex Mono, de Google Fonts, con licencia abierta (SIL OFL).</p></div>
  </div>
  <div class="g2">
    <div class="card c soft centro"><span class="kicker" style="color:var(--azul)">Sonido del vídeo</span><p style="font-size:13px;line-height:18px;margin-top:6px">Voz y efectos generados con ElevenLabs. Música compuesta con código para este proyecto.</p></div>
    <div class="card c soft centro"><span class="kicker" style="color:var(--azul)">Iconos y logo</span><p style="font-size:13px;line-height:18px;margin-top:6px">Los 26 iconos y los 18 archivos del logo son propios del proyecto, en SVG.</p></div>
  </div>
  <div class="panel c grow" style="display:flex;flex-direction:column;justify-content:center;gap:12px"><span class="kicker" style="color:var(--cielo)">El proyecto en cifras</span>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px 12px">
      ${[["6", "pantallas"], ["3", "perfiles"], ["18", "versiones del logo"], ["26", "iconos propios"], ["65", "tests que pasan"], ["+30", "Pull Requests"]].map(([c, t]) => `<div class="est"><span class="cifra">${c}</span><span>${t}</span></div>`).join("")}
    </div></div>
  <div style="display:flex;justify-content:center;padding:4px 0">${logo("horizontal", "height:48px")}</div>`);

const css = `.n-c { display:inline-flex; width:28px; height:28px; border-radius:50%; background:var(--naranja); color:var(--ink); font-weight:700; align-items:center; justify-content:center; }`;
const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><title>LinkEdu · Memoria del proyecto</title>
<link rel="stylesheet" href="base.css"><link rel="stylesheet" href="documento.css"><style>${css}</style></head>
<body>${paginas.join("\n")}</body></html>`;
fs.writeFileSync(path.join(aqui, "memoria.html"), html);
console.log("memoria.html listo,", paginas.length, "páginas");

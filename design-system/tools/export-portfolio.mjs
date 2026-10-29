// Exporta el style guide al portfolio (pestaña "Design system" del caso Pedí tu lavado).
//   node design-system/tools/export-portfolio.mjs
// Genera:
//   src/components/ds/ds-embed.html  → secciones del style guide (estáticas, sin JS)
//   src/components/ds/ds-embed.css   → estilos del style guide con alcance .ds-embed
//   public/design-system/            → imágenes que usa (logo, Mercado Pago, captura de referencia)
// Correr después de tools/build.mjs, que inyecta los tokens en style-guide.html.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dsRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const repo = join(dsRoot, '..');
const html = readFileSync(join(dsRoot, 'style-guide.html'), 'utf8').replace(/\r\n/g, '\n');
const tokens = JSON.parse(readFileSync(join(dsRoot, 'tokens.json'), 'utf8'));

const between = (s, a, b, from = 0) => {
  const i = s.indexOf(a, from);
  if (i < 0) throw new Error('No encontré: ' + a.slice(0, 50));
  const j = s.indexOf(b, i + a.length);
  if (j < 0) throw new Error('No encontré el cierre de: ' + a.slice(0, 50));
  return s.slice(i + a.length, j);
};
const section = (id) => {
  const start = html.indexOf(`<section class="sg" id="${id}">`);
  if (start < 0) throw new Error('Falta la sección ' + id);
  const end = html.indexOf('</section>', start) + '</section>'.length;
  return html.slice(start, end);
};

// --- CSS: tokens + estilos del style guide, con alcance .ds-embed ---------------
const tokenCss = between(html, '<style id="tokens">', '</style>');
const mainCss = between(html, '<!-- TOKENS:END -->\n<style>', '</style>');

function scopeSelector(sel) {
  sel = sel.trim();
  if (!sel) return sel;
  if (sel === ':root' || sel === 'html' || sel === 'body') return '.ds-embed';
  if (sel.startsWith('[data-mode=')) {
    const m = sel.match(/^(\[data-mode="[a-z]+"\])(.*)$/);
    return `.ds-embed${m[1]}${m[2]}`;
  }
  if (sel.startsWith(':root')) return '.ds-embed' + sel.slice(5);
  return '.ds-embed ' + sel;
}
function scopeCss(css) {
  let out = '';
  let i = 0;
  while (i < css.length) {
    const open = css.indexOf('{', i);
    if (open < 0) { out += css.slice(i); break; }
    const head = css.slice(i, open);
    const trimmed = head.trim();
    if (trimmed.startsWith('@media') || trimmed.startsWith('@supports')) {
      // bloque anidado: buscar el cierre que balancea
      let depth = 1, j = open + 1;
      while (depth && j < css.length) { if (css[j] === '{') depth++; else if (css[j] === '}') depth--; j++; }
      out += head + '{' + scopeCss(css.slice(open + 1, j - 1)) + '}';
      i = j;
      continue;
    }
    if (trimmed.startsWith('@keyframes')) {
      let depth = 1, j = open + 1;
      while (depth && j < css.length) { if (css[j] === '{') depth++; else if (css[j] === '}') depth--; j++; }
      out += css.slice(i, j);
      i = j;
      continue;
    }
    const close = css.indexOf('}', open);
    const comment = head.match(/^\s*(\/\*[\s\S]*?\*\/\s*)*/)[0];
    const selectors = head.slice(comment.length);
    const scoped = selectors.split(',').map(scopeSelector).join(', ');
    out += comment + scoped + ' {' + css.slice(open + 1, close) + '}';
    i = close + 1;
  }
  return out;
}

// Ajustes para que la página del style guide se integre al portfolio oscuro.
// Las muestras de la app (stages, pantallas, componentes) siguen usando los tokens del modo elegido.
const OVERRIDES = `
/* --- Integración con el portfolio --- */
.ds-embed { background: transparent; color: #e5e5e5; font-family: inherit; }
.ds-embed ul { list-style: disc; }
.ds-embed section.sg { border-top-color: #171717; padding: 56px 0; }
.ds-embed section.sg:first-of-type { padding-top: 0; }
.ds-embed .eyebrow { color: #9FD592; font-family: inherit; }
.ds-embed h2.sg-h2 { color: #f5f5f5; font-family: inherit; font-weight: 300; letter-spacing: -0.02em; }
.ds-embed h3.sg-h3, .ds-embed .comp h3 { color: #f5f5f5; font-family: inherit; font-weight: 400; }
.ds-embed p.sg-p, .ds-embed p.lead { color: #a3a3a3; font-family: inherit; font-weight: 300; font-size: 16px; line-height: 1.65; }
.ds-embed code { background: #171717; color: #e5e5e5; }
.ds-embed .panel, .ds-embed .table-wrap { background: #0f0f0f; border-color: #262626; }
.ds-embed .stat-label, .ds-embed .comp .src, .ds-embed .type-row .meta, .ds-embed .ramp .name, .ds-embed .space-row .lbl { color: #a3a3a3; font-family: inherit; }
.ds-embed .sg-table { font-family: inherit; color: #d4d4d4; }
.ds-embed .sg-table th { color: #737373; border-bottom-color: #262626; font-family: inherit; }
.ds-embed .sg-table td { border-bottom-color: #1f1f1f; }
.ds-embed .ok { color: #9FD592; }
.ds-embed .ko { color: #fb7185; }
.ds-embed .sem-row { border-bottom-color: #1f1f1f; color: #d4d4d4; font-family: inherit; }
.ds-embed .sem-row > span:not(.sem-dot) { color: #a3a3a3; }
.ds-embed .chip-sw { border-color: rgba(255,255,255,0.08); }
.ds-embed .type-row { border-bottom-color: #1f1f1f; color: #f5f5f5; }
.ds-embed .comp { border-top-color: #171717; }
.ds-embed .rules { color: #d4d4d4; font-family: inherit; }
.ds-embed .rules ul { color: #a3a3a3; }
.ds-embed .rules .yes h4 { color: #9FD592; }
.ds-embed .rules .no h4 { color: #fb7185; }
.ds-embed .rules .tokens { color: #737373; }
.ds-embed .compare figcaption { color: #737373; font-family: inherit; }
.ds-embed .compare img.ref { border-color: #262626; }
.ds-embed .radius-box { background: rgba(159,213,146,0.08); border-color: #9FD592; }
.ds-embed .space-row .bar { background: #9FD592; }
.ds-embed .stage { border-color: #262626; }
/* Mobile: las columnas pueden achicarse y las barras de espaciado no empujan el ancho */
.ds-embed .grid > *, .ds-embed .comp > *, .ds-embed .compare > * { min-width: 0; }
.ds-embed .space-row .bar { max-width: 45%; }
.ds-embed .stage > *, .ds-embed .state { max-width: 100%; min-width: 0; }
.ds-embed .seg { max-width: 100%; overflow-x: auto; scrollbar-width: none; }
.ds-embed .seg a { white-space: nowrap; }
.ds-embed .modal .btn { white-space: normal; text-align: center; }
.ds-embed .wcard .badge { white-space: normal; }
.ds-embed .wcard .info { min-width: 0; }
@media (max-width: 480px) { .ds-embed .seg a { padding: 10px 14px; } .ds-embed .stage { padding: 16px; } }
/* Las muestras de la app usan el color de texto de sus tokens, no el del portfolio */
.ds-embed .stage, .ds-embed .screen, .ds-embed .desk, .ds-embed .phone { color: var(--text-primary); font-family: var(--font); }
.ds-embed[data-mode="claro"] [data-mode-row="oscuro"], .ds-embed[data-mode="oscuro"] [data-mode-row="claro"] { display: none; }
.ds-embed[data-mode="claro"] tr[data-mode="oscuro"], .ds-embed[data-mode="oscuro"] tr[data-mode="claro"] { display: none; }
`;

const css = `/* Generado por design-system/tools/export-portfolio.mjs — no editar a mano */\n` + scopeCss(tokenCss) + '\n' + scopeCss(mainCss) + OVERRIDES;

// --- HTML estático de las piezas que el style guide arma con JS -----------------
const textOn = (hex) => {
  const h = hex.replace('#', '');
  if (h.length > 6 && parseInt(h.slice(6, 8), 16) < 160) return '#e5e5e5';
  const [r, g, b] = [0, 2, 4].map((k) => parseInt(h.slice(k, k + 2), 16));
  return 0.299 * r + 0.587 * g + 0.114 * b > 150 ? '#0f172a' : '#ffffff';
};
const prim = tokens.primitivos.color;
const ramps = Object.entries(prim).map(([group, steps]) =>
  `<div class="ramp"><span class="name">${group}</span>` + Object.entries(steps).map(([step, t]) =>
    `<div class="chip-sw" style="background:${t.$value};color:${textOn(t.$value)}"><b>${step}</b><span>${t.$value}</span></div>`).join('') + '</div>').join('\n');

const primHex = (ref) => { const [g, s] = ref.replace(/[{}]/g, '').replace(/^color\./, '').split('.'); return prim[g][s].$value; };
const semantic = ['claro', 'oscuro'].map((mode) =>
  `<div class="sem-row" data-mode-row="${mode}" style="font:700 10px var(--font);letter-spacing:.15em;text-transform:uppercase"><span></span><span>Token</span><span>Primitivo</span><span class="hide-sm">Valor</span></div>` +
  Object.entries(tokens.semanticos[mode].color).map(([name, t]) => {
    const hex = primHex(t.$value);
    return `<div class="sem-row" data-mode-row="${mode}"><span class="sem-dot"><i style="background:${hex}"></i></span><code>${name}</code><span>${t.$value.replace(/[{}]/g, '').replace('color.', '')}</span><span class="hide-sm">${hex}</span></div>`;
  }).join('')).join('\n');

const SAMPLES = { display: 'Tu auto impecable, sin moverte.', 'title-xl': 'Lavadores en la zona', 'title-lg': 'Lavadores en la zona', 'title-md': 'Lavador en camino', 'title-sm': '¡Hola, Lucía!', body: 'Elegí dónde va a estar el auto: tu casa, el trabajo u otra dirección.', 'body-sm': 'El precio con crédito incluye el costo de financiación.', label: 'Lavadores · Historial · Mi Perfil', 'label-sm': '12 cerca ahora', caption: 'Eco lavado — muy pronto', overline: 'Ubicación de lavado', cta: 'Pedir lavado', 'cta-sm': 'Iniciar sesión', pin: '4821' };
const type = Object.entries(tokens.estilos.texto).map(([name, t]) => {
  const v = t.$value;
  const fam = name === 'pin' ? 'ui-monospace,monospace' : "'Lexend',system-ui,sans-serif";
  const css = `font:${v.fontWeight} ${v.fontSize}/${v.lineHeight} ${fam};letter-spacing:${v.letterSpacing}${v.textCase ? ';text-transform:uppercase' : ''}`;
  const spec = `${parseFloat(v.fontSize)} / ${v.lineHeight} · ${v.fontWeight}${v.textCase ? ' · MAYÚS' : ''}`;
  return `<div class="type-row"><code>${name}</code><span style="${css}">${SAMPLES[name] || name}</span><span class="meta">${spec}</span></div>`;
}).join('\n');

const spacing = '<h4 class="eyebrow">Espaciado</h4>' + Object.keys(tokens.primitivos.space).filter((k) => k !== '0').map((k) =>
  `<div class="space-row"><span class="lbl"><code>space-${k}</code></span><span class="bar" style="width:${parseInt(k, 10) * 3}px"></span><span>${k}px</span></div>`).join('');
const radii = Object.entries(tokens.primitivos.radius).map(([k, t]) => {
  const v = parseFloat(t.$value);
  return `<div><div class="radius-box" style="border-radius:${Math.min(v, 36)}px"></div><p class="stat-label"><code>radius-${k}</code> · ${v === 9999 ? 'píldora' : v + 'px'}</p></div>`;
}).join('');
const elev = Object.entries(tokens.estilos.sombra).map(([k, t]) =>
  `<div class="elev-box" style="box-shadow:var(--shadow-${k})"><span><code>${k}</code><br>${t.$description || ''}</span></div>`).join('');

// --- Secciones -----------------------------------------------------------------
let contraste = section('contraste');
// Fuera la tabla "Ajustes mínimos propuestos" (comparación con el código anterior)
contraste = contraste.replace(/\s*<h3 class="sg-h3">Ajustes mínimos propuestos<\/h3>\s*<div class="table-wrap">[\s\S]*?<\/table>\s*<\/div>/, '');
const sections = [section('color'), contraste, section('tipografia'), section('espacio'), section('componentes'), section('pantallas')]
  .join('\n')
  .replace('<div id="ramps"></div>', `<div id="ramps">${ramps}</div>`)
  .replace('<div id="semantic"></div>', `<div id="semantic">${semantic}</div>`)
  .replace('<div class="panel" id="type"></div>', `<div class="panel" id="type">${type}</div>`)
  .replace('<div class="panel" id="spacing"></div>', `<div class="panel" id="spacing">${spacing}</div>`)
  .replace('<div class="grid g3" id="radii"></div>', `<div class="grid g3" id="radii">${radii}</div>`)
  .replace('<div class="grid g3" id="elev" style="margin-top:16px"></div>', `<div class="grid g3" id="elev" style="margin-top:16px">${elev}</div>`)
  .replace(' (hoy están en 9)', '')
  .replace('Cambiá entre Claro y Oscuro arriba a la derecha.', 'Cambiá entre Claro y Oscuro con el selector de arriba.')
  .replace('Se calcula en <code>tools/build.mjs</code> y el build falla si algún par no cumple.', 'Cada par se calcula automáticamente a partir de los tokens: si un cambio rompe el contraste, el build falla.')
  // Textos de proceso → descripción del sistema
  .replace(' Los 600 se consolidan en 700 y los 800 en 900.', '')
  .replace(/Base de 4 px\. Los medios pasos de Tailwind[\s\S]*?se redondean al paso más cercano\. /, 'Base de 4 px: todos los espacios son múltiplos de 4. ')
  .replace('Cada componente sale de su archivo en la app, con los tokens consolidados aplicados.', 'Cada componente con sus variantes, sus estados y una regla corta de cuándo usarlo y cuándo no. Debajo del título, el archivo de la app donde vive.')
  .replace(/src="assets\//g, 'src="/design-system/')
  .replace(/src="referencias\//g, 'src="/design-system/')
  .replace(/src="\.\.\/public\/peditulavado\//g, 'src="/peditulavado/');

// Filas de contraste: vienen inyectadas por build.mjs
if (!sections.includes('<tr data-mode=')) throw new Error('Faltan las filas de contraste: corré tools/build.mjs primero');

const sprite = '<svg width="0" height="0"' + between(html, '<svg width="0" height="0"', '\n</svg>') + '\n</svg>';
const out = `<!-- Generado por design-system/tools/export-portfolio.mjs desde style-guide.html — no editar a mano -->\n${sprite}\n${sections}\n`;

const outDir = join(repo, 'src', 'components', 'ds');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'ds-embed.html'), out);
writeFileSync(join(outDir, 'ds-embed.css'), css);

const pub = join(repo, 'public', 'design-system');
mkdirSync(pub, { recursive: true });
for (const [from, to] of [['assets/logo2.png', 'logo2.png'], ['assets/mercadopago-logo.svg', 'mercadopago-logo.svg'], ['referencias/real-cliente-home-desktop.png', 'real-cliente-home-desktop.png']]) {
  copyFileSync(join(dsRoot, from), join(pub, to));
}
console.log(`ds-embed.html ${(out.length / 1024).toFixed(0)} KB · ds-embed.css ${(css.length / 1024).toFixed(0)} KB · imágenes copiadas a public/design-system/`);

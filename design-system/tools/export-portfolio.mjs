// Exporta el style guide al portfolio (pestaña "Design system" del caso Pedí tu lavado).
//   node design-system/tools/export-portfolio.mjs
// Genera:
//   src/components/ds/ds-embed.html  → componentes y pantallas del style guide
//   src/components/ds/ds-data.ts     → tokens y contraste para los fundamentos (React)
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
.ds-embed .stage, .ds-embed .screen, .ds-embed .desk, .ds-embed .phone, .ds-embed .mock, .ds-embed .chatcard, .ds-embed .rv-card { color: var(--text-primary); font-family: var(--font); }
.ds-embed[data-mode="claro"] [data-mode-row="oscuro"], .ds-embed[data-mode="oscuro"] [data-mode-row="claro"] { display: none; }
.ds-embed[data-mode="claro"] tr[data-mode="oscuro"], .ds-embed[data-mode="oscuro"] tr[data-mode="claro"] { display: none; }
`;

const css = `/* Generado por design-system/tools/export-portfolio.mjs — no editar a mano */\n` + scopeCss(tokenCss) + '\n' + scopeCss(mainCss) + OVERRIDES;

// --- Datos para la pestaña (fundamentos en React) -------------------------------
const prim = tokens.primitivos.color;
const primHex = (ref) => { const [g, s] = ref.replace(/[{}]/g, '').replace(/^color\./, '').split('.'); return prim[g][s].$value; };
const contrast = JSON.parse(readFileSync(join(dsRoot, 'contrast-report.json'), 'utf8'));
const data = {
  primitives: Object.fromEntries(Object.entries(prim).map(([g, steps]) => [g, Object.entries(steps).map(([s, t]) => [s, t.$value])])),
  semantic: Object.fromEntries(Object.keys(tokens.semanticos.claro.color).map((name) => [name, {
    claro: primHex(tokens.semanticos.claro.color[name].$value),
    oscuro: primHex(tokens.semanticos.oscuro.color[name].$value),
    refClaro: tokens.semanticos.claro.color[name].$value.replace(/[{}]/g, '').replace('color.', ''),
    refOscuro: tokens.semanticos.oscuro.color[name].$value.replace(/[{}]/g, '').replace('color.', ''),
  }])),
  textStyles: Object.entries(tokens.estilos.texto).map(([name, t]) => ({ name, ...t.$value })),
  space: Object.keys(tokens.primitivos.space).map((k) => parseFloat(tokens.primitivos.space[k].$value)).filter((v) => v > 0),
  radius: Object.entries(tokens.primitivos.radius).map(([k, t]) => ({ name: k, value: parseFloat(t.$value), description: t.$description || '' })),
  shadows: Object.entries(tokens.estilos.sombra).map(([k, t]) => ({ name: k, description: t.$description || '' })),
  contrast: contrast.map(({ mode, fg, bg, fgHex, bgHex, ratio, min, use }) => ({ mode, fg, bg, fgHex, bgHex, ratio, min, use })),
};

// --- Componentes y pantallas (HTML del style guide, sin su encabezado) ---------
const stripHeader = (s) => s.replace(/<p class="eyebrow">[\s\S]*?<\/p>\s*<h2 class="sg-h2">[\s\S]*?<\/h2>\s*<p class="sg-p">[\s\S]*?<\/p>/, '');
const sections = [section('componentes'), section('pantallas')].map(stripHeader)
  .join('\n')
  .replace(' (hoy están en 9)', '')
  .replace(/src="assets\//g, 'src="/design-system/')
  .replace(/src="referencias\//g, 'src="/design-system/')
  .replace(/src="\.\.\/public\/peditulavado\//g, 'src="/peditulavado/');

const sprite = '<svg width="0" height="0"' + between(html, '<svg width="0" height="0"', '\n</svg>') + '\n</svg>';
const out = `<!-- Generado por design-system/tools/export-portfolio.mjs desde style-guide.html — no editar a mano -->\n${sprite}\n${sections}\n`;

const outDir = join(repo, 'src', 'components', 'ds');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'ds-embed.html'), out);
writeFileSync(join(outDir, 'ds-embed.css'), css);
writeFileSync(join(outDir, 'ds-data.ts'), `// Generado por design-system/tools/export-portfolio.mjs desde tokens.json — no editar a mano\nexport const DS = ${JSON.stringify(data, null, 1)} as const;\n`);

const pub = join(repo, 'public', 'design-system');
mkdirSync(pub, { recursive: true });
for (const [from, to] of [['assets/logo2.png', 'logo2.png'], ['assets/mercadopago-logo.svg', 'mercadopago-logo.svg'], ['referencias/real-cliente-home-desktop.png', 'real-cliente-home-desktop.png']]) {
  copyFileSync(join(dsRoot, from), join(pub, to));
}
console.log(`ds-embed.html ${(out.length / 1024).toFixed(0)} KB · ds-embed.css ${(css.length / 1024).toFixed(0)} KB · imágenes copiadas a public/design-system/`);

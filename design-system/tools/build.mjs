// Sincroniza el design system a partir de tokens.json (sin dependencias).
//   node design-system/tools/build.mjs
// 1. Resuelve las referencias {color.x.y} de los semánticos (Claro / Oscuro).
// 2. Verifica contraste WCAG AA de los pares que usa la UI y falla si alguno no cumple.
// 3. Inyecta las variables CSS en style-guide.html (entre los marcadores TOKENS).
// 4. Genera figma-plugin/code.js a partir de figma-plugin/code.template.js con los tokens embebidos.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tokens = JSON.parse(readFileSync(join(root, 'tokens.json'), 'utf8'));

// --- Resolución de referencias ---------------------------------------------
const prim = tokens.primitivos;
const getPrim = (ref) => {
  const path = ref.replace(/[{}]/g, '').split('.');
  let node = prim;
  for (const p of path) node = node?.[p];
  if (!node || node.$value === undefined) throw new Error(`Referencia no encontrada: ${ref}`);
  return node.$value;
};
const resolveMode = (mode) => {
  const out = {};
  for (const [name, t] of Object.entries(tokens.semanticos[mode].color)) {
    out[name] = { ref: t.$value.replace(/[{}]/g, ''), hex: getPrim(t.$value) };
  }
  return out;
};
const semantic = { claro: resolveMode('claro'), oscuro: resolveMode('oscuro') };

// --- Contraste -------------------------------------------------------------
const hexToRgba = (hex) => {
  const h = hex.replace('#', '');
  return [0, 2, 4, 6].map((i) => (i < h.length ? parseInt(h.slice(i, i + 2), 16) / 255 : 1));
};
// Compone un color con alfa sobre un fondo opaco.
const over = (fg, bg) => {
  const [r, g, b, a] = hexToRgba(fg);
  const [R, G, B] = hexToRgba(bg);
  const mix = (x, y) => Math.round((x * a + y * (1 - a)) * 255).toString(16).padStart(2, '0');
  return '#' + mix(r, R) + mix(g, G) + mix(b, B);
};
const lum = (hex) => hexToRgba(hex).slice(0, 3)
  .map((x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4))
  .reduce((acc, v, i) => acc + v * [0.2126, 0.7152, 0.0722][i], 0);
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return Math.round(((x + 0.05) / (y + 0.05)) * 100) / 100;
};

// [primer plano, fondo, mínimo, uso]
const PAIRS = [
  ['text-primary', 'surface', 4.5, 'Texto principal en cards'],
  ['text-primary', 'bg', 4.5, 'Texto principal sobre el fondo'],
  ['text-secondary', 'surface', 4.5, 'Texto secundario en cards'],
  ['text-secondary', 'bg', 4.5, 'Texto secundario sobre el fondo'],
  ['text-on-muted', 'surface-muted', 4.5, 'Chips de filtro inactivos, "Offline"'],
  ['text-on-brand', 'brand', 4.5, 'Botón "Pedir lavado"'],
  ['text-on-brand', 'brand-hover', 4.5, 'Botón principal en hover'],
  ['text-on-brand', 'washer', 4.5, 'Botón "Ser lavador"'],
  ['text-on-brand', 'danger', 4.5, 'Botón destructivo'],
  ['text-on-brand', 'certified', 4.5, 'Cinta "Certificado"'],
  ['text-on-brand', 'promo', 4.5, 'Etiqueta de descuento'],
  ['brand-text', 'surface', 4.5, 'Links y "en la zona"'],
  ['brand-text', 'brand-subtle', 4.5, 'Badge de servicio'],
  ['washer-text', 'surface', 4.5, 'Texto del modo lavador'],
  ['success-text', 'success-subtle', 4.5, 'Badge "Cerca de tu zona"'],
  ['warning-text', 'warning-subtle', 4.5, 'Badge "Ocupado"'],
  ['rating-text', 'rating-subtle', 4.5, 'Número de calificación'],
  ['certified-text', 'surface', 4.5, '"Hizo el curso de lavado"'],
  ['danger-text', 'surface', 4.5, 'Texto de error'],
  ['text-on-chrome', 'surface-chrome', 4.5, 'Header y barra inferior'],
  ['text-on-chrome-muted', 'surface-chrome', 4.5, 'Ítems inactivos de la barra inferior'],
  ['brand-text-on-chrome', 'surface-chrome', 4.5, 'Etiqueta "Ubicación de lavado"'],
  ['border-strong', 'surface', 3, 'Borde de inputs'],
  ['focus', 'surface', 3, 'Anillo de foco'],
  ['success', 'surface', 3, 'Punto "online" (componente)'],
];

const report = [];
for (const mode of ['claro', 'oscuro']) {
  const s = semantic[mode];
  for (const [fg, bg, min, use] of PAIRS) {
    // Los fondos con alfa (badges "subtle" en modo oscuro) se componen sobre la superficie.
    const bgHex = s[bg].hex.length > 7 ? over(s[bg].hex, s.surface.hex) : s[bg].hex;
    const fgHex = s[fg].hex.length > 7 ? over(s[fg].hex, bgHex) : s[fg].hex;
    const r = ratio(fgHex, bgHex);
    report.push({ mode, fg, bg, min, use, ratio: r, pass: r >= min });
  }
}
const failures = report.filter((r) => !r.pass);

// --- CSS para el style guide -----------------------------------------------
const cssVars = (mode) => Object.entries(semantic[mode]).map(([k, v]) => `  --${k}: ${v.hex};`).join('\n');
const primVars = Object.entries(prim.color).flatMap(([group, steps]) =>
  Object.entries(steps).map(([step, t]) => `  --p-${group}-${step}: ${t.$value};`)).join('\n');
const css = `/* Generado por tools/build.mjs desde tokens.json — no editar a mano */
:root {
${primVars}
${cssVars('claro')}
}
[data-mode="oscuro"] {
${cssVars('oscuro')}
}`;

const contrastRows = report.map((r) =>
  `<tr data-mode="${r.mode}"><td>${r.mode === 'claro' ? 'Claro' : 'Oscuro'}</td><td><code>${r.fg}</code> / <code>${r.bg}</code></td><td>${r.use}</td><td class="num">${r.ratio.toFixed(2)}:1</td><td class="num">${r.min}:1</td><td>${r.pass ? '<span class="ok">Cumple</span>' : '<span class="ko">No cumple</span>'}</td></tr>`).join('\n');

const sgPath = join(root, 'style-guide.html');
let sg = readFileSync(sgPath, 'utf8');
const inject = (html, marker, content) => {
  const re = new RegExp(`(<!-- ${marker}:START -->)[\\s\\S]*?(<!-- ${marker}:END -->)`);
  if (!re.test(html)) throw new Error(`Falta el marcador ${marker} en style-guide.html`);
  return html.replace(re, `$1\n${content}\n$2`);
};
sg = inject(sg, 'TOKENS', `<style id="tokens">\n${css}\n</style>`);
sg = inject(sg, 'CONTRASTE', contrastRows);
sg = inject(sg, 'TOKENS-JSON', `<script id="tokens-data" type="application/json">${JSON.stringify({ primitivos: prim.color, semanticos: semantic })}</script>`);
writeFileSync(sgPath, sg);

// --- Plugin de Figma -------------------------------------------------------
const tpl = readFileSync(join(root, 'figma-plugin', 'code.template.js'), 'utf8');
if (!tpl.includes('/*__TOKENS__*/')) throw new Error('Falta /*__TOKENS__*/ en code.template.js');
const code = tpl.replace('/*__TOKENS__*/', JSON.stringify(tokens));
writeFileSync(join(root, 'figma-plugin', 'code.js'), '// Generado por tools/build.mjs desde tokens.json — editá code.template.js\n' + code);

console.log(`Semánticos: ${Object.keys(semantic.claro).length} por modo · pares de contraste: ${report.length}`);
if (failures.length) {
  console.log('\nNO CUMPLEN AA:');
  for (const f of failures) console.log(`  [${f.mode}] ${f.fg} sobre ${f.bg}: ${f.ratio}:1 (mín ${f.min}:1) — ${f.use}`);
  process.exitCode = 1;
} else {
  console.log('Todos los pares cumplen WCAG AA.');
}

// Plugin de Figma: Pedí tu lavado · Design System
// Crea Variables (Primitivos, Dimensiones y Semánticos con modos Claro/Oscuro), estilos de texto y de
// sombra, y las páginas Portada, Fundamentos, Componentes y Pantallas. Sin dependencias.
// Los tokens vienen de ../tokens.json y los embebe tools/build.mjs: editá este template, no code.js.

const TOKENS = /*__TOKENS__*/;

// ---------------------------------------------------------------------------
// Utilidades
// ---------------------------------------------------------------------------
const hexToRgba = (hex) => {
  const h = hex.replace('#', '');
  const n = (i) => parseInt(h.slice(i, i + 2), 16) / 255;
  return { r: n(0), g: n(2), b: n(4), a: h.length > 6 ? n(6) : 1 };
};
const px = (v) => parseFloat(String(v));

const V = { prim: {}, sem: {}, space: {}, radius: {} };
const TEXT = {};
const EFFECT = {};
const pendingEffects = [];
let FONT_FAMILY = 'Lexend';
let MODES;
const WEIGHT_STYLE = { 400: 'Regular', 500: 'Medium', 700: 'Bold', 900: 'Black' };

// Valor hex de un token (semántico en modo Claro o primitivo "p:grupo/paso"), para respaldos.
function tokenHex(token) {
  const primRef = token.startsWith('p:') ? token.slice(2) : TOKENS.semanticos.claro.color[token].$value.replace(/[{}]/g, '').replace(/^color\./, '').replace('.', '/');
  const [group, step] = primRef.split('/');
  return TOKENS.primitivos.color[group][step].$value;
}
function varOf(token) {
  const v = token.startsWith('p:') ? V.prim[token.slice(2)] : V.sem[token];
  if (!v) throw new Error('Token sin variable: ' + token);
  return v;
}
// Pintura sólida enlazada a una variable
function paint(token) {
  return figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', varOf(token));
}
// Gradiente lineal con paradas enlazadas a variables (si la versión de Figma no lo admite, se usa el valor del modo Claro)
function gradient(tokens, angle = 0) {
  const rad = (angle * Math.PI) / 180;
  const c = Math.cos(rad), s = Math.sin(rad);
  return {
    type: 'GRADIENT_LINEAR',
    gradientTransform: [[c, s, (1 - c - s) / 2], [-s, c, (1 + s - c) / 2]],
    gradientStops: tokens.map((t, i) => ({
      position: tokens.length === 1 ? 0 : i / (tokens.length - 1),
      color: hexToRgba(tokenHex(t)),
      boundVariables: { color: figma.variables.createVariableAlias(varOf(t)) },
    })),
  };
}
function setFills(node, paints) {
  try { node.fills = paints; }
  catch (e) { node.fills = paints.map((p) => (p.gradientStops ? Object.assign({}, p, { gradientStops: p.gradientStops.map(({ position, color }) => ({ position, color })) }) : p)); }
}
function bindSpace(node, field, value) {
  const v = V.space[value];
  if (v) node.setBoundVariable(field, v); else node[field] = value;
}
function bindRadius(node, value) {
  const key = Object.keys(V.radius).find((k) => V.radius[k].__value === value);
  for (const f of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']) {
    if (key) node.setBoundVariable(f, V.radius[key]); else node[f] = value;
  }
}

// Auto-layout con espaciados, radios y colores enlazados a variables
function layout(node, o = {}) {
  const vertical = o.dir === 'VERTICAL';
  node.layoutMode = vertical ? 'VERTICAL' : 'HORIZONTAL';
  if (o.w || o.h) node.resize(o.w || 100, o.h || 100);
  node.primaryAxisSizingMode = (vertical ? o.h : o.w) ? 'FIXED' : 'AUTO';
  node.counterAxisSizingMode = (vertical ? o.w : o.h) ? 'FIXED' : 'AUTO';
  node.primaryAxisAlignItems = o.justify || 'MIN';
  node.counterAxisAlignItems = o.align || 'CENTER';
  if (o.wrap) node.layoutWrap = 'WRAP';
  const p = o.p == null ? [0, 0, 0, 0] : Array.isArray(o.p) ? (o.p.length === 2 ? [o.p[0], o.p[1], o.p[0], o.p[1]] : o.p) : [o.p, o.p, o.p, o.p];
  bindSpace(node, 'paddingTop', p[0]); bindSpace(node, 'paddingRight', p[1]);
  bindSpace(node, 'paddingBottom', p[2]); bindSpace(node, 'paddingLeft', p[3]);
  bindSpace(node, 'itemSpacing', o.gap || 0);
  if (o.wrap && o.counterGap != null) bindSpace(node, 'counterAxisSpacing', o.counterGap);
  setFills(node, o.fill ? [o.fill.type ? o.fill : paint(o.fill)] : []);
  if (o.stroke) { node.strokes = [paint(o.stroke)]; node.strokeWeight = o.strokeW || 1; node.strokeAlign = o.strokeAlign || 'INSIDE'; }
  if (o.radius != null) bindRadius(node, o.radius);
  if (o.effect) pendingEffects.push([node, o.effect]);
  node.clipsContent = !!o.clip;
  return node;
}
async function applyEffects() {
  for (const [node, name] of pendingEffects) if (EFFECT[name] && !node.removed) await node.setEffectStyleIdAsync(EFFECT[name].id);
  pendingEffects.length = 0;
}
function frame(name, o) { const f = figma.createFrame(); f.name = name; return layout(f, o); }
function component(name, o) { const c = figma.createComponent(); c.name = name; return layout(c, o); }
function add(parent, ...children) { for (const c of children) if (c) parent.appendChild(c); return parent; }
// Agrega un hijo con posición absoluta dentro de un padre con auto-layout
function absolute(parent, node, x, y) { parent.appendChild(node); node.layoutPositioning = 'ABSOLUTE'; node.x = x; node.y = y; return node; }
function fillW(...nodes) { for (const n of nodes) n.layoutSizingHorizontal = 'FILL'; }
function wrapText(...nodes) { for (const n of nodes) { n.layoutSizingHorizontal = 'FILL'; n.textAutoResize = 'HEIGHT'; } }

async function text(chars, style, color, o = {}) {
  const t = figma.createText();
  const st = TEXT[style];
  await figma.loadFontAsync(st.fontName);
  t.fontName = st.fontName;
  t.characters = chars;
  await t.setTextStyleIdAsync(st.id);
  t.fills = [paint(color)];
  t.name = o.name || chars.slice(0, 32);
  if (o.align) t.textAlignHorizontal = o.align;
  return t;
}

// Íconos: trazos de lucide-react, la librería de íconos de la app
const ICONS = {
  'map-pin': '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  history: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>',
  grid: '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
  car: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
  cal: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  nav: '<polygon points="3 11 22 2 13 21 11 13 3 11"/>',
  award: '<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/>',
  star: '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  map: '<path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/>',
  ig: '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>',
  card: '<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>',
  drops: '<path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/>',
  droplet: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  'check-circle': '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  alert: '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
  chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  'arrow-left': '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
};
function icon(name, size, color, o = {}) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="${o.weight || 2}" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg>`;
  const node = figma.createNodeFromSvg(svg);
  node.name = 'icon/' + name;
  node.fills = [];
  node.rescale(size / 24);
  for (const v of node.findAll((n) => 'strokes' in n)) {
    if (v.strokes.length) v.strokes = [paint(color)];
    if (o.filled && v.type === 'VECTOR') v.fills = [paint(color)];
  }
  return node;
}
function dot(size, color, o = {}) {
  const e = figma.createEllipse();
  e.name = o.name || 'Punto';
  e.resize(size, size);
  e.fills = [paint(color)];
  if (o.stroke) { e.strokes = [paint(o.stroke)]; e.strokeWeight = o.strokeW || 2; e.strokeAlign = 'OUTSIDE'; }
  return e;
}
async function avatar(letter, size = 40, color = 'brand', textColor = 'text-on-brand', radius = 9999) {
  const a = frame('Avatar', { justify: 'CENTER', w: size, h: size, radius, fill: color });
  add(a, await text(letter, size > 36 ? 'title-sm' : 'label-sm', textColor, { name: 'Inicial' }));
  return a;
}

// ---------------------------------------------------------------------------
// 1. Variables
// ---------------------------------------------------------------------------
function scopesFor(name) {
  if (name.startsWith('text-')) return ['TEXT_FILL'];
  if (name.startsWith('shadow') || name.startsWith('glow')) return ['EFFECT_COLOR'];
  if (name.startsWith('border') || name === 'focus') return ['STROKE_COLOR'];
  if (['bg', 'surface', 'surface-muted', 'surface-chrome', 'surface-chrome-raised', 'overlay'].includes(name)) return ['FRAME_FILL', 'SHAPE_FILL'];
  return ['ALL_FILLS', 'STROKE_COLOR'];
}
async function buildVariables() {
  const existing = await figma.variables.getLocalVariableCollectionsAsync();
  if (existing.some((c) => ['Primitivos', 'Semánticos', 'Dimensiones'].includes(c.name))) {
    throw new Error('Este archivo ya tiene las colecciones del design system. Corré el plugin en un archivo nuevo.');
  }
  // Primitivos: un modo y sin scopes (no aparecen en los selectores; se usan a través de los semánticos)
  const prim = figma.variables.createVariableCollection('Primitivos');
  const pm = prim.modes[0].modeId;
  prim.renameMode(pm, 'Valor');
  for (const [group, steps] of Object.entries(TOKENS.primitivos.color)) {
    for (const [step, t] of Object.entries(steps)) {
      const v = figma.variables.createVariable(`${group}/${step}`, prim, 'COLOR');
      v.setValueForMode(pm, hexToRgba(t.$value));
      v.scopes = [];
      if (t.$description) v.description = t.$description;
      v.setVariableCodeSyntax('WEB', `var(--p-${group}-${step})`);
      V.prim[`${group}/${step}`] = v;
    }
  }
  // Dimensiones: espaciado y radios
  const dim = figma.variables.createVariableCollection('Dimensiones');
  const dm = dim.modes[0].modeId;
  dim.renameMode(dm, 'Valor');
  for (const [k, t] of Object.entries(TOKENS.primitivos.space)) {
    const v = figma.variables.createVariable(`space/${k}`, dim, 'FLOAT');
    v.setValueForMode(dm, px(t.$value));
    v.scopes = ['GAP', 'WIDTH_HEIGHT'];
    v.setVariableCodeSyntax('WEB', `var(--space-${k})`);
    V.space[px(t.$value)] = v;
  }
  for (const [k, t] of Object.entries(TOKENS.primitivos.radius)) {
    const v = figma.variables.createVariable(`radius/${k}`, dim, 'FLOAT');
    v.setValueForMode(dm, px(t.$value));
    v.scopes = ['CORNER_RADIUS'];
    if (t.$description) v.description = t.$description;
    v.setVariableCodeSyntax('WEB', `var(--radius-${k})`);
    v.__value = px(t.$value);
    V.radius[k] = v;
  }
  // Semánticos: modos Claro y Oscuro, cada valor es un alias a un primitivo
  const sem = figma.variables.createVariableCollection('Semánticos');
  const claro = sem.modes[0].modeId;
  sem.renameMode(claro, 'Claro');
  const oscuro = sem.addMode('Oscuro');
  const ref = (r) => V.prim[r.replace(/[{}]/g, '').replace(/^color\./, '').replace('.', '/')];
  for (const [name, t] of Object.entries(TOKENS.semanticos.claro.color)) {
    const v = figma.variables.createVariable(name, sem, 'COLOR');
    v.setValueForMode(claro, figma.variables.createVariableAlias(ref(t.$value)));
    v.setValueForMode(oscuro, figma.variables.createVariableAlias(ref(TOKENS.semanticos.oscuro.color[name].$value)));
    v.scopes = scopesFor(name);
    v.setVariableCodeSyntax('WEB', `var(--${name})`);
    V.sem[name] = v;
  }
  return { sem, claro, oscuro };
}

// ---------------------------------------------------------------------------
// 2. Estilos de texto y de sombra
// ---------------------------------------------------------------------------
async function buildStyles() {
  try { await figma.loadFontAsync({ family: 'Lexend', style: 'Regular' }); }
  catch (e) { FONT_FAMILY = 'Inter'; figma.notify('Lexend no está disponible: uso Inter. Instalá Lexend y volvé a correr el plugin.'); }
  for (const [name, t] of Object.entries(TOKENS.estilos.texto)) {
    const v = t.$value;
    const fontName = { family: FONT_FAMILY, style: WEIGHT_STYLE[v.fontWeight] };
    await figma.loadFontAsync(fontName);
    const s = figma.createTextStyle();
    s.name = name;
    s.fontName = fontName;
    s.fontSize = px(v.fontSize);
    s.lineHeight = { unit: 'PERCENT', value: Math.round(v.lineHeight * 100) };
    s.letterSpacing = { unit: 'PERCENT', value: Math.round(parseFloat(v.letterSpacing) * 1000) / 10 };
    if (v.textCase === 'uppercase') s.textCase = 'UPPER';
    TEXT[name] = s;
  }
  for (const [name, t] of Object.entries(TOKENS.estilos.sombra)) {
    const v = t.$value;
    const colorVar = V.sem[v.color.replace(/[{}]/g, '').split('.').pop()];
    let effect = { type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.2 }, offset: { x: px(v.offsetX), y: px(v.offsetY) }, radius: px(v.blur), spread: px(v.spread), visible: true, blendMode: 'NORMAL' };
    effect = figma.variables.setBoundVariableForEffect(effect, 'color', colorVar);
    const s = figma.createEffectStyle();
    s.name = name;
    s.effects = [effect];
    if (t.$description) s.description = t.$description;
    EFFECT[name] = s;
  }
}

// ---------------------------------------------------------------------------
// 3. Documentación al lado de cada componente
// ---------------------------------------------------------------------------
const DOCS = {
  'Botón': { src: 'Landing.tsx · NavbarActions.tsx · ActiveBookingCard.tsx', yes: ['Primario: una sola acción principal por pantalla (pedir, pagar, aceptar).', 'Lavador: solo para sumarse como lavador o en el modo lavador.', 'En mobile, altura mínima de 44 px (md o lg).'], no: ['No pongas dos primarios juntos: el segundo va como secundario.', 'No uses el rosa de lavador para acciones del cliente.'], tokens: 'brand, brand-hover, washer, text-on-brand, radius/full, glow-brand, cta' },
  'Header': { src: 'RootLayout.tsx · NavbarActions.tsx', yes: ['Arriba de todas las pantallas, cliente y lavador.', 'Es oscuro en los dos modos: es el "chrome" de la marca.'], no: ['No sumes acciones: logo, Instagram y sesión.', 'El logo es un placeholder: reemplazalo por logo2.png.'], tokens: 'surface-chrome, text-on-chrome, magenta (Instagram)' },
  'Ítem de navegación': { src: 'ClientLayout.tsx (desktop)', yes: ['Secciones principales en desktop. En mobile lo reemplaza la barra inferior.'], no: ['No la uses para filtrar contenido: para eso están los chips.', 'Máximo 4 ítems.'], tokens: 'surface-muted, surface, brand-text, radius/full' },
  'Barra de ubicación': { src: 'client/Dashboard.tsx', yes: ['Flotando arriba del mapa: define qué lavadores llegan a esa dirección.', 'La "i" explica para qué sirve y no abre el selector.'], no: ['Una sola por pantalla.'], tokens: 'surface-chrome, surface-chrome-raised, brand-text-on-chrome, lg' },
  'Bienvenida': { src: 'client/Dashboard.tsx', yes: ['Arriba del panel del cliente, con su nombre o "Invitado".'], no: ['No agregues acciones: es un saludo.'], tokens: 'brand, brand-text, title-sm, overline' },
  'Tab': { src: 'client/Dashboard.tsx (Tabs)', yes: ['Alternar dos vistas del mismo contexto (Lavadores / Turnos).'], no: ['No más de 3 tabs.'], tokens: 'surface-muted, surface, brand-text, text-on-muted, radius/md' },
  'Chip de filtro': { src: 'client/Dashboard.tsx', yes: ['Filtrar la lista. Siempre hay uno activo ("Todos").', 'Lo que viene va como nota en texto secundario, sin acción.'], no: ['No navegan a otra pantalla.', 'No muestres un chip deshabilitado para lo que viene.'], tokens: 'surface-muted, surface, text-on-muted, text-primary, radius/full' },
  'Banner suscripción': { src: 'client/SubscribeBanner.tsx', yes: ['Solo para quien no está suscripto. La cruz lo oculta durante esa visita.'], no: ['No sumes texto: la info está en la pantalla de planes.', 'No uses este gradiente para otra cosa.'], tokens: 'gradient-subscribe-*, radius/lg, md / lg' },
  'Badge': { src: 'client/Dashboard.tsx', yes: ['Estados o atributos cortos (1 a 3 palabras), en mayúsculas.'], no: ['Nunca menos de 10 px. Si no entra, sacá palabras.'], tokens: 'success-*, warning-*, brand-*, promo, overline' },
  'Rating': { src: 'client/Dashboard.tsx', yes: ['Calificación promedio del lavador. Sin calificación: estrella vacía y 0.0.'], no: ['No lo muestres junto a "Offline".'], tokens: 'rating, rating-text, rating-subtle' },
  'Nivel': { src: 'ui/WasherBadge.tsx', yes: ['Experiencia y calificación del lavador: oro, plata o bronce.'], no: ['Los gradientes metálicos usan primitivos y no cambian con el modo.', 'Si el lavador está certificado, el marco de la card es el violeta.'], tokens: 'amber/*, orange/*, neutral/* (primitivos)' },
  'Card de lavador': { src: 'client/Dashboard.tsx · ui/CertifiedInfo.tsx', yes: ['Una por lavador en la lista.', 'Punto verde solo para online; ocupado usa el reloj ámbar.', 'Offline sigue legible: solo se atenúa el avatar.', '"Certificado" (hizo el curso) no es lo mismo que "verificado" (escudo azul).'], no: ['No uses el violeta para otra cosa que la certificación.', 'Rating y "Offline" nunca juntos.'], tokens: 'surface, success, warning, certified-*, rating-*, radius/lg, glow-certified' },
  'Pin de mapa': { src: 'shared/MapView.tsx', yes: ['El aro de color indica el estado y siempre va con etiqueta de texto.', 'La etiqueta violeta solo para certificados.'], no: ['No uses el color como única señal.'], tokens: 'success, warning, certified, certified-end, radius/full' },
  'Barra inferior': { src: 'layouts/ClientLayout.tsx', yes: ['Navegación principal en mobile. El botón central (mapa) es el inicio.'], no: ['No más de 5 destinos.', 'Las etiquetas no bajan de 10 px.'], tokens: 'surface-chrome, brand, brand-text-on-chrome, text-on-chrome-muted, radius/xl' },
  'Input': { src: 'ui/input.tsx', yes: ['Siempre con label visible. El error dice qué hacer.', 'Texto de 16 px para que iOS no haga zoom.'], no: ['No uses el placeholder como label.'], tokens: 'border-strong, focus, danger-text, radius/md' },
  'Celda de PIN': { src: 'shared/OtpInput.tsx · client/ActiveBookingCard.tsx', yes: ['El cliente dicta el PIN y el lavador lo ingresa al llegar.', 'Si es incorrecto, la fila tiembla (salvo con movimiento reducido).'], no: ['No la uses para login ni pagos.'], tokens: 'surface-chrome-raised, brand-text-on-chrome, pin' },
  'Paso del pedido': { src: 'shared/BookingSteps.tsx', yes: ['Cliente y lavador ven los mismos 6 estados. Verde = hecho, azul = ahora, gris = falta.'], no: ['No cambies el orden: el pago va después del PIN y antes del lavado.'], tokens: 'success-*, brand-*, border, glow-brand' },
  'Banner de pedido': { src: 'layouts/ClientLayout.tsx', yes: ['Arriba de todo mientras hay un pedido en curso. Lleva al pedido.'], no: ['Un solo banner a la vez.'], tokens: 'blue/*, amber/700, orange/800, indigo/700, neutral/* (gradientes)' },
  'Toast': { src: 'ui/sonner.tsx (richColors)', yes: ['Confirmar algo que ya pasó, sin pedir acción.'], no: ['Un solo sistema de toast (sonner).', 'No uses toast para errores que bloquean: usá un modal.'], tokens: 'surface, success-*, danger-*, md' },
  'Modal invitado': { src: 'shared/GuestGateDialog.tsx', yes: ['Cuando un invitado intenta algo que necesita cuenta.'], no: ['No lo uses para avisos informativos.'], tokens: 'surface-chrome-raised, brand, radius/xl, lg' },
  'Burbuja de chat': { src: 'shared/ChatComponent.tsx', yes: ['Propios a la derecha en azul de marca; los del otro a la izquierda en superficie.'], no: ['No uses otros colores para los mensajes.'], tokens: 'brand, text-on-brand, surface, border' },
  'Fila de pago': { src: 'client/WalletHistory.tsx', yes: ['Historial de pagos del cliente: pagado con check verde, pendiente con reloj ámbar.'], no: ['No uses solo el color para el estado: va el ícono.'], tokens: 'success-*, warning-*, border' },
  'Switch online': { src: 'washer/WasherDashboard.tsx', yes: ['Solo en el panel del lavador, para recibir pedidos.'], no: ['El cliente nunca lo ve.'], tokens: 'washer, washer-text, neutral/300' },
};
async function docNote(title) {
  const d = DOCS[title];
  const n = frame('Doc · ' + title, { dir: 'VERTICAL', gap: 12, p: 20, w: 320, fill: 'surface', stroke: 'border', radius: 20, align: 'MIN' });
  const h = await text(title, 'title-md', 'text-primary');
  const src = await text(d.src, 'caption', 'text-secondary');
  add(n, h, src); wrapText(h, src);
  for (const [label, items, color] of [['Cuándo sí', d.yes, 'success-text'], ['Cuándo no', d.no, 'danger-text']]) {
    const b = frame(label, { dir: 'VERTICAL', gap: 4, align: 'MIN' });
    n.appendChild(b); fillW(b);
    b.appendChild(await text(label, 'overline', color));
    for (const it of items) { const t = await text('• ' + it, 'body-sm', 'text-secondary'); b.appendChild(t); wrapText(t); }
  }
  const tk = await text('Tokens: ' + d.tokens, 'caption', 'text-secondary');
  n.appendChild(tk); wrapText(tk);
  return n;
}

// Combina variantes en un component set con auto-layout y propiedades.
function makeSet(name, comps, parent, o = {}) {
  const set = figma.combineAsVariants(comps, parent);
  set.name = name;
  layout(set, { dir: o.dir || 'HORIZONTAL', wrap: o.dir !== 'VERTICAL', gap: 24, counterGap: 24, p: 24, align: 'MIN', radius: 20, w: o.w, fill: 'bg', stroke: 'border' });
  set.dashPattern = [6, 4];
  for (const [label, def, nodeName] of o.textProps || []) {
    const key = set.addComponentProperty(label, 'TEXT', def);
    for (const v of set.children) for (const t of v.findAll((n) => n.type === 'TEXT' && n.name === nodeName)) t.componentPropertyReferences = { characters: key };
  }
  for (const [label, def, nodeName] of o.boolProps || []) {
    const key = set.addComponentProperty(label, 'BOOLEAN', def);
    for (const v of set.children) for (const t of v.findAll((n) => n.name === nodeName)) t.componentPropertyReferences = { visible: key };
  }
  return set;
}
const variant = (set, props) => {
  const found = set.children.find((c) => Object.entries(props).every(([k, v]) => c.name.split(', ').includes(`${k}=${v}`)));
  if (!found) throw new Error(`Variante no encontrada en ${set.name}: ${JSON.stringify(props)}`);
  return found;
};
const propKey = (inst, prefix) => Object.keys(inst.componentProperties).find((k) => k.startsWith(prefix));
function setText(inst, prefix, value) { inst.setProperties({ [propKey(inst, prefix)]: value }); return inst; }

// ---------------------------------------------------------------------------
// 4. Componentes
// ---------------------------------------------------------------------------
const C = {};

async function buildButton(page) {
  const VARIANTS = {
    Primario: { fill: 'brand', hover: 'brand-hover', text: 'text-on-brand', glow: 'glow-brand' },
    Lavador: { fill: 'washer', hover: 'washer-hover', text: 'text-on-brand', glow: 'glow-washer' },
    Secundario: { fill: null, hover: 'brand-subtle', text: 'brand-text', stroke: 'brand-text' },
    Ghost: { fill: null, hover: 'surface-muted', text: 'text-secondary' },
    Destructivo: { fill: null, hover: 'danger-subtle', text: 'danger-text', stroke: 'danger-subtle' },
  };
  const SIZES = { sm: { h: 36, p: 16, style: 'cta-sm' }, md: { h: 48, p: 24, style: 'cta' }, lg: { h: 56, p: 40, style: 'cta' } };
  const comps = [];
  for (const [vn, v] of Object.entries(VARIANTS)) for (const [sn, s] of Object.entries(SIZES)) for (const st of ['Default', 'Hover', 'Pressed', 'Focus', 'Disabled']) {
    const c = component(`variant=${vn}, size=${sn}, state=${st}`, { gap: 8, p: [0, s.p], h: s.h, justify: 'CENTER', radius: 9999, fill: st === 'Hover' || st === 'Pressed' ? v.hover : v.fill, stroke: v.stroke });
    c.primaryAxisSizingMode = 'AUTO';
    if (st === 'Focus') { c.strokes = [paint('focus')]; c.strokeWeight = 3; c.strokeAlign = 'OUTSIDE'; }
    if (st === 'Disabled') c.opacity = 0.5;
    if (v.glow && st !== 'Disabled' && st !== 'Pressed') pendingEffects.push([c, v.glow]);
    add(c, await text('Pedir lavado', s.style, v.text, { name: 'Label' }));
    comps.push(c);
  }
  C.button = makeSet('Botón', comps, page, { w: 1760, textProps: [['Texto', 'Pedir lavado', 'Label']] });
  const btn = (vn, sn, label, st = 'Default') => setText(variant(C.button, { variant: vn, size: sn, state: st }).createInstance(), 'Texto', label);
  C.btn = btn;
}

async function buildHeader(page) {
  const comps = [];
  for (const kind of ['Invitado', 'Con sesión']) {
    const c = component(`sesión=${kind}`, { justify: 'SPACE_BETWEEN', p: [0, 24], w: 390, h: 64, fill: 'surface-chrome' });
    const logo = frame('Logo (reemplazar por logo2.png)', { gap: 8 });
    add(logo, icon('droplet', 22, 'brand', { filled: true }), await text('Pedí tu lavado', 'title-md', 'text-on-chrome', { name: 'Marca' }));
    const right = frame('Acciones', { gap: 12 });
    const ig = frame('Instagram', { justify: 'CENTER', w: 36, h: 36, radius: 9999, fill: 'p:alpha/magenta-20' });
    add(ig, icon('ig', 18, 'p:magenta/400'));
    right.appendChild(ig);
    if (kind === 'Invitado') right.appendChild(C.btn('Primario', 'sm', 'Iniciar sesión'));
    else { const av = await avatar('L', 36); av.strokes = [paint('border-chrome')]; av.strokeWeight = 2; right.appendChild(av); }
    add(c, logo, right);
    comps.push(c);
  }
  C.header = makeSet('Header', comps, page, { dir: 'VERTICAL' });
}

async function buildNavItem(page) {
  const comps = [];
  for (const [item, ic] of [['Lavadores', 'user'], ['Historial', 'history'], ['Mi Perfil', 'grid']]) for (const st of ['Activo', 'Inactivo', 'Hover']) {
    const c = component(`item=${item}, state=${st}`, { gap: 8, p: [12, 20], radius: 9999, fill: st === 'Activo' ? 'surface' : st === 'Hover' ? 'border' : null });
    if (st === 'Activo') pendingEffects.push([c, 'sm']);
    add(c, icon(ic, 16, st === 'Activo' ? 'brand-text' : 'text-secondary'), await text(item, 'label', st === 'Inactivo' ? 'text-secondary' : 'text-primary'));
    comps.push(c);
  }
  C.navItem = makeSet('Ítem de navegación', comps, page, { w: 760 });
  const seg = component('Navegación segmentada', { gap: 0, p: 4, radius: 9999, fill: 'surface-muted', stroke: 'border', effect: 'sm' });
  for (const [item, st] of [['Lavadores', 'Activo'], ['Historial', 'Inactivo'], ['Mi Perfil', 'Inactivo']]) seg.appendChild(variant(C.navItem, { item, state: st }).createInstance());
  page.appendChild(seg);
  C.seg = seg;
}

async function buildLocationBar(page) {
  const comps = [];
  for (const st of ['Cerrada', 'Abierta']) {
    const wrap = component(`state=${st}`, { dir: 'VERTICAL', gap: 8, align: 'MIN' });
    const bar = frame('Barra', { gap: 16, p: [16, 24], w: 358, radius: 24, fill: 'surface-chrome', stroke: 'brand-subtle', effect: 'lg' });
    const pin = frame('Ícono', { justify: 'CENTER', p: 8, radius: 12, fill: 'p:alpha/blue-20' });
    add(pin, icon('map-pin', 16, 'brand-text-on-chrome'));
    const col = frame('Texto', { dir: 'VERTICAL', gap: 2, align: 'MIN' });
    const kick = frame('Etiqueta', { gap: 6 });
    add(kick, await text('Ubicación de lavado', 'overline', 'brand-text-on-chrome'), icon('info', 12, 'text-on-chrome-muted'));
    const val = frame('Valor', { gap: 6 });
    add(val, await text('Casa · Barrio Jardín', 'label', 'text-on-chrome', { name: 'Dirección' }), icon('chevron', 16, 'brand-text-on-chrome'));
    add(col, kick, await text('Tocá para cambiar', 'caption', 'text-on-chrome-muted'), val);
    add(bar, pin, col);
    wrap.appendChild(bar);
    if (st === 'Abierta') {
      const menu = frame('Menú', { dir: 'VERTICAL', gap: 4, p: 8, w: 358, radius: 20, fill: 'surface-chrome-raised', stroke: 'brand-subtle', align: 'MIN', effect: 'lg' });
      for (const [label, sel, color] of [['Ubicación actual', false, 'text-on-chrome'], ['Casa · Barrio Jardín', true, 'text-on-chrome'], ['Trabajo · Centro', false, 'text-on-chrome'], ['+ Nueva dirección', false, 'brand-text-on-chrome']]) {
        const it = frame('Opción', { p: [10, 12], radius: 8, fill: sel ? 'border-chrome' : null });
        add(it, await text(label, 'body-sm', color));
        menu.appendChild(it); fillW(it);
      }
      wrap.appendChild(menu);
    }
    comps.push(wrap);
  }
  C.location = makeSet('Barra de ubicación', comps, page, { textProps: [['Dirección', 'Casa · Barrio Jardín', 'Dirección']] });
}

async function buildWelcome(page) {
  const c = component('Bienvenida', { gap: 16 });
  const col = frame('Texto', { dir: 'VERTICAL', gap: 6, align: 'MIN' });
  const h = frame('Saludo', { gap: 0 });
  add(h, await text('¡Hola, ', 'title-sm', 'text-primary'), await text('Lucía!', 'title-sm', 'brand-text', { name: 'Nombre' }));
  add(col, h, await text('¿Qué lavamos hoy? ✨', 'overline', 'text-secondary'));
  add(c, await avatar('L'), col);
  page.appendChild(c);
  const key = c.addComponentProperty('Nombre', 'TEXT', 'Lucía!');
  c.findOne((n) => n.type === 'TEXT' && n.name === 'Nombre').componentPropertyReferences = { characters: key };
  C.welcome = c;
}

async function buildTabs(page) {
  const comps = [];
  for (const [tab, ic, label] of [['Lavadores', 'car', 'Lavadores'], ['Turnos', 'cal', 'Turnos (2)']]) for (const st of ['Activo', 'Inactivo']) {
    const c = component(`tab=${tab}, state=${st}`, { gap: 8, p: [10, 16], radius: 8, fill: st === 'Activo' ? 'surface' : null, justify: 'CENTER' });
    if (st === 'Activo') pendingEffects.push([c, 'md']);
    add(c, icon(ic, 14, st === 'Activo' ? 'brand-text' : 'text-on-muted'), await text(label, 'label-sm', st === 'Activo' ? 'brand-text' : 'text-on-muted'));
    comps.push(c);
  }
  C.tab = makeSet('Tab', comps, page);
  const group = component('Tabs', { gap: 0, p: 4, w: 358, radius: 12, fill: 'surface-muted' });
  for (const [tab, st] of [['Lavadores', 'Activo'], ['Turnos', 'Inactivo']]) { const i = variant(C.tab, { tab, state: st }).createInstance(); group.appendChild(i); i.layoutGrow = 1; }
  page.appendChild(group);
  C.tabs = group;
}

async function buildChips(page) {
  const comps = [];
  for (const st of ['Activo', 'Inactivo', 'Hover']) {
    const c = component(`state=${st}`, { p: [8, 16], radius: 9999, fill: st === 'Activo' ? 'surface' : null });
    if (st === 'Activo') pendingEffects.push([c, 'sm']);
    add(c, await text('Todos', 'label', st === 'Inactivo' ? 'text-on-muted' : 'text-primary', { name: 'Label' }));
    comps.push(c);
  }
  C.chip = makeSet('Chip de filtro', comps, page, { textProps: [['Texto', 'Todos', 'Label']] });
  const group = component('Filtros', { dir: 'VERTICAL', gap: 10, align: 'MIN' });
  const row = frame('Chips', { gap: 4, p: 4, radius: 9999, fill: 'surface-muted' });
  for (const [label, st] of [['Todos', 'Activo'], ['Lavados', 'Inactivo'], ['Tapizados', 'Inactivo'], ['Pulidos', 'Inactivo']]) row.appendChild(setText(variant(C.chip, { state: st }).createInstance(), 'Texto', label));
  const note = frame('Nota', { gap: 6 });
  add(note, icon('leaf', 14, 'text-secondary'), await text('Eco lavado — muy pronto', 'caption', 'text-secondary'));
  add(group, row, note);
  page.appendChild(group);
  C.filters = group;
}

async function buildSubscribe(page) {
  const comps = [];
  for (const v of ['Lista', 'Mapa']) {
    const c = component(`variant=${v}`, { gap: 12, p: [12, 40, 12, 16], w: 358, radius: 20, fill: gradient(['gradient-subscribe-start', 'gradient-subscribe-mid', 'gradient-subscribe-end'], -35), stroke: 'border-chrome', effect: v === 'Mapa' ? 'lg' : 'md' });
    const title = await text('¡Suscribite y ahorrá!', 'label-sm', 'text-on-chrome');
    const pill = frame('Ver planes', { p: [8, 12], radius: 9999, fill: 'p:neutral/0' });
    add(pill, await text('Ver planes', 'label-sm', 'p:blue/900'));
    add(c, title, pill);
    title.layoutGrow = 1;
    absolute(c, icon('x', 14, 'p:alpha/white-60'), 358 - 26, 8);
    comps.push(c);
  }
  C.subscribe = makeSet('Banner suscripción', comps, page);
}

async function buildBadges(page) {
  const comps = [];
  const DEF = {
    Cerca: { fg: 'success-text', bg: 'success-subtle', label: 'Cerca de tu zona', ic: 'nav' },
    Ocupado: { fg: 'warning-text', bg: 'warning-subtle', label: 'Ocupado' },
    'Suscripción': { fg: 'brand-text', bg: 'brand-subtle', label: 'Suscripción', ic: 'drops' },
    Servicio: { fg: 'brand-text', bg: 'brand-subtle', label: 'Lavado completo' },
    Nuevo: { fg: 'brand-text', bg: null, label: 'Nuevo' },
    Promo: { fg: 'text-on-brand', bg: 'promo', label: '-20%' },
  };
  for (const [k, d] of Object.entries(DEF)) {
    const c = component(`type=${k}`, { gap: 4, p: k === 'Nuevo' ? 0 : [4, 8], radius: 8, fill: d.bg });
    if (d.ic) c.appendChild(icon(d.ic, 10, d.fg));
    c.appendChild(await text(d.label, k === 'Promo' ? 'label-sm' : 'overline', d.fg));
    comps.push(c);
  }
  C.badge = makeSet('Badge', comps, page);

  const rc = [];
  for (const st of ['Con calificación', 'Sin calificación']) {
    const on = st === 'Con calificación';
    const c = component(`state=${st}`, { gap: 6, p: [4, 12], radius: 8, fill: 'rating-subtle', effect: 'sm' });
    add(c, icon('star', 14, on ? 'rating' : 'p:neutral/300', { filled: on }), await text(on ? '4.9' : '0.0', 'label-sm', 'rating-text'));
    rc.push(c);
  }
  C.rating = makeSet('Rating', rc, page);

  const lc = [];
  const MEDAL = {
    Oro: { g: ['p:amber/500', 'p:amber/200', 'p:amber/600'], text: 'p:amber/900', emoji: '🥇' },
    Plata: { g: ['p:neutral/400', 'p:neutral/100', 'p:neutral/500'], text: 'p:neutral/800', emoji: '🥈' },
    Bronce: { g: ['p:orange/600', 'p:orange/300', 'p:orange/800'], text: 'p:orange/50', emoji: '🥉' },
  };
  for (const [k, m] of Object.entries(MEDAL)) {
    const c = component(`level=${k}`, { gap: 4, p: [4, 8], radius: 9999, fill: gradient(m.g, -45), stroke: m.g[0], strokeW: 1.5 });
    add(c, await text(m.emoji + ' ' + k, 'overline', m.text));
    lc.push(c);
  }
  C.level = makeSet('Nivel', lc, page);
}

async function washerCard(status, certified) {
  const off = status === 'Offline';
  const W = 380;
  const c = component(`status=${status}, certificado=${certified ? 'Sí' : 'No'}`, { gap: 12, p: 16, w: W, radius: 20, fill: off ? 'bg' : 'surface', stroke: certified ? 'certified-border' : 'border', strokeW: certified ? 2 : 1, clip: true, effect: certified ? 'glow-certified' : 'sm' });
  // Avatar con estado (fallback de la app: inicial sobre gris)
  const av = frame('Avatar', { justify: 'CENTER', w: 48, h: 48 });
  const img = await avatar('M', 48, 'surface-muted', 'text-secondary', 12);
  img.name = 'Foto';
  if (off) img.opacity = 0.7;
  if (certified) { img.strokes = [paint('certified-border')]; img.strokeWeight = 2; img.strokeAlign = 'OUTSIDE'; }
  av.appendChild(img);
  if (status === 'Online') absolute(av, dot(14, 'success', { stroke: 'surface' }), 36, 36);
  if (status === 'Ocupado') { const b = frame('Ocupado', { justify: 'CENTER', p: 4, radius: 8, fill: 'warning', stroke: 'surface', strokeW: 2 }); add(b, icon('clock', 10, 'text-on-brand')); absolute(av, b, 30, 30); }
  // Info
  const info = frame('Info', { dir: 'VERTICAL', gap: 4, align: 'MIN' });
  const name = frame('Nombre', { gap: 6 });
  add(name, await text('Martín G.', 'title-sm', 'text-primary', { name: 'Nombre' }), icon('shield', 14, 'p:blue/500'));
  if (status === 'Ocupado') name.appendChild(variant(C.badge, { type: 'Ocupado' }).createInstance());
  const dist = frame('Distancia', { gap: 4 });
  add(dist, icon('map-pin', 10, 'p:rose/600'), await text('A 0.4 km', 'overline', 'text-secondary', { name: 'Km' }));
  add(info, name, dist);
  if (!off) { const near = variant(C.badge, { type: 'Cerca' }).createInstance(); near.name = 'Cerca'; info.appendChild(near); }
  if (certified) {
    const course = frame('Curso', { gap: 4 });
    add(course, icon('award', 12, 'certified-text'), await text('Hizo el curso de lavado', 'label-sm', 'certified-text'), icon('info', 12, 'certified-border'));
    info.appendChild(course);
  }
  // Lado derecho
  const side = frame('Estado', { dir: 'VERTICAL', gap: 4, align: 'MAX' });
  if (off) {
    const box = frame('Offline', { dir: 'VERTICAL', gap: 2, p: [8, 12], radius: 8, fill: 'surface-muted', align: 'MAX' });
    add(box, await text('Offline', 'overline', 'text-on-muted'), await text('Solo reservas a futuro', 'caption', 'text-on-muted'));
    side.appendChild(box);
  } else {
    side.appendChild(variant(C.rating, { state: 'Sin calificación' }).createInstance());
    const nuevo = variant(C.badge, { type: 'Nuevo' }).createInstance(); nuevo.name = 'Nuevo';
    side.appendChild(nuevo);
  }
  add(c, av, info, side);
  info.layoutGrow = 1;
  if (certified) {
    side.paddingRight = 40;
    const ribbon = frame('Cinta Certificado', { p: [2, 32], fill: gradient(['certified', 'certified-end'], 0), effect: 'sm' });
    add(ribbon, await text('Certificado', 'overline', 'text-on-brand'));
    absolute(c, ribbon, W - 86, -2);
    ribbon.rotation = -35;
  }
  return c;
}
async function buildWasherCard(page) {
  const comps = [];
  for (const status of ['Online', 'Ocupado', 'Offline']) for (const cert of [false, true]) comps.push(await washerCard(status, cert));
  C.washer = makeSet('Card de lavador', comps, page, { w: 1300, textProps: [['Nombre', 'Martín G.', 'Nombre'], ['Distancia', 'A 0.4 km', 'Km']], boolProps: [['Cerca de tu zona', true, 'Cerca'], ['Nuevo', true, 'Nuevo']] });
}

async function buildPins(page) {
  const comps = [];
  const DEF = {
    Online: { ring: 'success', label: 'Martín G.', lbg: 'surface', lfg: 'text-primary', dot: 'success' },
    Ocupado: { ring: 'warning', label: 'Lavando', lbg: 'surface', lfg: 'text-primary', dot: 'warning' },
    Certificado: { ring: 'success', label: 'Julián V.', grad: true, lfg: 'text-on-brand', ic: 'award', dot: 'success' },
    Offline: { ring: 'p:neutral/300', label: 'Solo reservas', lbg: 'p:neutral/200', lfg: 'p:neutral/600' },
    Cliente: { ring: 'surface', label: 'Vos', lbg: 'p:neutral/900', lfg: 'text-on-chrome' },
  };
  for (const [k, d] of Object.entries(DEF)) {
    const c = component(`status=${k}`, { dir: 'VERTICAL', gap: 4 });
    const ring = frame('Aro', { justify: 'CENTER', p: 4, radius: 9999, fill: d.ring });
    const face = await avatar(k === 'Cliente' ? 'L' : k[0], 40, k === 'Cliente' ? 'p:neutral/200' : 'surface-muted', 'text-secondary');
    face.strokes = [paint('surface')]; face.strokeWeight = 2;
    if (k === 'Offline') face.opacity = 0.7;
    ring.appendChild(face);
    if (d.dot) absolute(ring, dot(10, d.dot, { stroke: 'surface' }), 36, 2);
    const label = frame('Etiqueta', { gap: 4, p: [2, 8], radius: 9999, fill: d.grad ? gradient(['certified', 'certified-end'], 0) : d.lbg, effect: 'sm' });
    if (d.ic) label.appendChild(icon(d.ic, 12, d.lfg));
    if (k === 'Offline') label.appendChild(dot(6, 'p:neutral/500'));
    label.appendChild(await text(d.label, 'caption', d.lfg));
    add(c, ring, label);
    comps.push(c);
  }
  C.pin = makeSet('Pin de mapa', comps, page);
}

async function buildBottomNav(page) {
  const comps = [];
  const ITEMS = [['Lavadores', 'user'], ['Agenda', 'cal'], ['Mapa', 'map'], ['Historial', 'history'], ['Mi Perfil', 'grid']];
  for (const [active] of ITEMS) {
    const c = component(`active=${active}`, { justify: 'SPACE_BETWEEN', p: [0, 8], w: 390, h: 75, fill: 'surface-chrome', stroke: 'border-chrome', effect: 'lg' });
    c.topLeftRadius = c.topRightRadius = 32;
    c.bottomLeftRadius = c.bottomRightRadius = 0;
    for (const [label, ic] of ITEMS) {
      const on = label === active;
      if (label === 'Mapa') {
        const slot = frame('Mapa', { justify: 'CENTER', w: 74, h: 75 });
        c.appendChild(slot);
        const fab = frame('Botón mapa', { justify: 'CENTER', w: 64, h: 64, radius: 9999, fill: on ? 'brand' : 'p:neutral/700', stroke: 'surface-chrome', strokeW: 6, effect: on ? 'glow-brand' : 'md' });
        add(fab, icon('map', 28, 'text-on-brand', { weight: 2.5 }));
        absolute(slot, fab, 5, -24);
        continue;
      }
      const it = frame(label, { dir: 'VERTICAL', gap: 4, justify: 'CENTER', w: 74, h: 75 });
      add(it, icon(ic, 24, on ? 'brand-text-on-chrome' : 'text-on-chrome-muted', { weight: on ? 2.5 : 2 }), await text(label, on ? 'overline' : 'caption', on ? 'brand-text-on-chrome' : 'text-on-chrome-muted'));
      c.appendChild(it);
    }
    comps.push(c);
  }
  C.bottom = makeSet('Barra inferior', comps, page, { dir: 'VERTICAL' });
  for (const v of C.bottom.children) v.clipsContent = false;
}

async function buildInput(page) {
  const comps = [];
  for (const st of ['Default', 'Focus', 'Error', 'Disabled']) {
    const c = component(`state=${st}`, { dir: 'VERTICAL', gap: 8, w: 280, align: 'MIN' });
    const ring = st === 'Focus' ? 'focus' : st === 'Error' ? 'danger-text' : 'border-strong';
    const box = frame('Campo', { p: [0, 12], h: 44, radius: 12, fill: 'surface', stroke: ring, strokeW: st === 'Focus' || st === 'Error' ? 2 : 1 });
    add(box, await text(st === 'Default' ? 'AB 123 CD' : st === 'Error' ? 'AB12' : 'AB 123', 'body', st === 'Default' ? 'text-secondary' : 'text-primary'));
    if (st === 'Disabled') c.opacity = 0.5;
    const help = await text(st === 'Error' ? 'La patente tiene que tener 6 o 7 caracteres.' : 'Como figura en la cédula.', 'caption', st === 'Error' ? 'danger-text' : 'text-secondary');
    add(c, await text('Patente', 'label', 'text-primary', { name: 'Label' }), box, help);
    fillW(box); wrapText(help);
    comps.push(c);
  }
  C.input = makeSet('Input', comps, page, { textProps: [['Label', 'Patente', 'Label']] });
}

async function buildPin(page) {
  const comps = [];
  for (const st of ['Vacía', 'Focus', 'Error', 'Correcta']) {
    const ring = st === 'Error' ? 'p:red/400' : st === 'Correcta' ? 'p:emerald/400' : st === 'Focus' ? 'brand-text-on-chrome' : 'border-chrome';
    const c = component(`state=${st}`, { justify: 'CENTER', w: 48, h: 56, radius: 16, fill: 'p:alpha/white-5', stroke: ring, strokeW: st === 'Vacía' ? 1 : 2 });
    if (st === 'Error' || st === 'Correcta') add(c, await text('4', 'pin', st === 'Correcta' ? 'p:emerald/400' : 'text-on-chrome'));
    comps.push(c);
  }
  C.otp = makeSet('Celda de PIN', comps, page);
  setFills(C.otp, [paint('surface-chrome-raised')]);
  const show = component('PIN del cliente', { dir: 'VERTICAL', gap: 4, align: 'MAX' });
  const box = frame('Caja', { p: [4, 12], radius: 8, fill: 'p:neutral/900', effect: 'md' });
  add(box, await text('4821', 'pin', 'text-on-chrome', { name: 'PIN' }));
  add(show, await text('PIN seguridad', 'overline', 'text-secondary'), box);
  page.appendChild(show);
  const key = show.addComponentProperty('PIN', 'TEXT', '4821');
  show.findOne((n) => n.type === 'TEXT' && n.name === 'PIN').componentPropertyReferences = { characters: key };
  C.pinShow = show;
}

const STEPS = [['Pedido', 'check'], ['Aceptado', 'check'], ['En camino', 'check'], ['PIN', 'shield'], ['Pago', 'card'], ['Lavado', 'drops']];
async function buildSteps(page) {
  const comps = [];
  for (const [step, ic] of STEPS) for (const st of ['Hecho', 'Actual', 'Pendiente']) {
    const c = component(`step=${step}, state=${st}`, { dir: 'VERTICAL', gap: 6, w: 60 });
    const circ = frame('Círculo', { justify: 'CENTER', w: 44, h: 44, radius: 9999, fill: st === 'Hecho' ? 'success-subtle' : st === 'Actual' ? 'brand-subtle' : 'surface', stroke: st === 'Hecho' ? 'success' : st === 'Actual' ? 'brand' : 'border', strokeW: 2, effect: st === 'Actual' ? 'glow-brand' : 'sm' });
    add(circ, icon(st === 'Hecho' ? 'check' : ic, 20, st === 'Hecho' ? 'success-text' : st === 'Actual' ? 'brand-text' : 'p:neutral/300', { weight: st === 'Hecho' ? 3.5 : 2 }));
    add(c, circ, await text(step, 'overline', st === 'Hecho' ? 'success-text' : st === 'Actual' ? 'brand-text' : 'text-secondary', { align: 'CENTER' }));
    comps.push(c);
  }
  C.step = makeSet('Paso del pedido', comps, page, { w: 760 });
  C.stepper = (current) => {
    const row = frame('Estados del pedido', { justify: 'SPACE_BETWEEN', align: 'MIN' });
    STEPS.forEach(([step], i) => row.appendChild(variant(C.step, { step, state: i < current ? 'Hecho' : i === current ? 'Actual' : 'Pendiente' }).createInstance()));
    return row;
  };
  const demo = component('Estados del pedido', { dir: 'VERTICAL', w: 390, align: 'MIN' });
  const r = C.stepper(3); demo.appendChild(r); fillW(r);
  page.appendChild(demo);
  C.stepsDemo = demo;
}

async function buildStatusBanner(page) {
  const comps = [];
  const TONES = { 'En camino': ['p:blue/600', 'p:blue/700'], 'Esperando pago': ['p:amber/700', 'p:orange/800'], Lavando: ['p:indigo/700', 'p:blue/700'], Enviado: ['p:neutral/600', 'p:neutral/700'] };
  for (const [k, g] of Object.entries(TONES)) {
    const c = component(`tone=${k}`, { justify: 'SPACE_BETWEEN', p: [12, 16], w: 390, fill: gradient(g, 0) });
    const right = frame('Ver pedido', { gap: 4 });
    add(right, await text('Ver pedido', 'cta-sm', 'text-on-brand'), icon('arrow', 14, 'text-on-brand'));
    add(c, await text(k, 'cta-sm', 'text-on-brand'), right);
    comps.push(c);
  }
  C.statusBanner = makeSet('Banner de pedido', comps, page, { dir: 'VERTICAL' });
}

async function buildToast(page) {
  const comps = [];
  const DEF = { Normal: ['surface', 'border', 'text-primary', 'info', 'Link copiado', null], 'Éxito': ['success-subtle', 'success-subtle', 'success-text', 'check-circle', '¡Trabajo aceptado!', null], Error: ['danger-subtle', 'danger-subtle', 'danger-text', 'alert', 'No se pudo tomar el pedido.', 'Revisá tu conexión e intentá de nuevo.'] };
  for (const [k, [bg, br, fg, ic, title, desc]] of Object.entries(DEF)) {
    const c = component(`type=${k}`, { gap: 12, p: [16, 16], w: 340, radius: 12, fill: bg, stroke: br, align: 'MIN', effect: 'md' });
    const col = frame('Texto', { dir: 'VERTICAL', gap: 2, align: 'MIN' });
    add(c, icon(ic, 18, fg), col);
    col.layoutGrow = 1;
    const t = await text(title, 'label', fg); col.appendChild(t); wrapText(t);
    if (desc) { const d = await text(desc, 'body-sm', fg); col.appendChild(d); wrapText(d); }
    comps.push(c);
  }
  C.toast = makeSet('Toast', comps, page, { dir: 'VERTICAL' });
}

async function buildModal(page) {
  const c = component('Modal invitado', { dir: 'VERTICAL', gap: 12, p: [32, 28, 24, 28], w: 360, radius: 32, fill: 'surface-chrome-raised', stroke: 'border-chrome', effect: 'lg' });
  const kick = frame('Etiqueta', { gap: 8, p: [8, 16], radius: 9999, fill: 'p:alpha/blue-20' });
  add(kick, icon('user', 14, 'brand-text-on-chrome'), await text('Creá tu cuenta', 'overline', 'brand-text-on-chrome'));
  const title = await text('Necesitás una cuenta', 'title-md', 'text-on-chrome', { align: 'CENTER' });
  const desc = await text('Creá tu cuenta gratis para ver el historial de tus lavados.', 'body-sm', 'text-on-chrome-muted', { name: 'Descripción', align: 'CENTER' });
  const btn = C.btn('Primario', 'lg', 'Crear cuenta / Iniciar sesión');
  const later = C.btn('Ghost', 'sm', 'Ahora no');
  add(c, kick, title, desc, btn, later);
  wrapText(title, desc); fillW(btn);
  page.appendChild(c);
  C.modal = c;
}

async function buildChatWalletSwitch(page) {
  const bc = [];
  for (const k of ['Propio', 'Otro']) {
    const own = k === 'Propio';
    const c = component(`from=${k}`, { dir: 'VERTICAL', gap: 4, p: [8, 16], w: 240, radius: 16, fill: own ? 'brand' : 'surface', stroke: own ? null : 'border', align: own ? 'MAX' : 'MIN', effect: 'sm' });
    if (own) c.bottomRightRadius = 4; else c.bottomLeftRadius = 4;
    const msg = await text(own ? '¡Perfecto! El auto está en la puerta.' : 'Hola, estoy llegando en 5 minutos.', 'body-sm', own ? 'text-on-brand' : 'text-primary');
    add(c, msg, await text(own ? '14:53' : '14:52', 'caption', own ? 'text-on-brand' : 'text-secondary'));
    wrapText(msg);
    bc.push(c);
  }
  C.bubble = makeSet('Burbuja de chat', bc, page, { dir: 'VERTICAL' });

  const wc = [];
  for (const k of ['Pagado', 'Pendiente']) {
    const paid = k === 'Pagado';
    const c = component(`status=${k}`, { justify: 'SPACE_BETWEEN', p: [12, 16], w: 360, fill: 'surface', stroke: 'border' });
    const l = frame('Detalle', { gap: 12 });
    const ic = frame('Ícono', { justify: 'CENTER', w: 32, h: 32, radius: 8, fill: paid ? 'success-subtle' : 'warning-subtle' });
    add(ic, icon(paid ? 'check-circle' : 'clock', 16, paid ? 'success-text' : 'warning-text'));
    const col = frame('Texto', { dir: 'VERTICAL', gap: 2, align: 'MIN' });
    add(col, await text('Lavado completo', 'label-sm', 'text-primary', { name: 'Servicio' }), await text('08 oct, 15:40 · Tomás · Mercado Pago', 'overline', 'text-secondary', { name: 'Detalle' }));
    add(l, ic, col);
    add(c, l, await text('$25.000', 'label-sm', 'text-primary', { name: 'Monto' }));
    wc.push(c);
  }
  C.payRow = makeSet('Fila de pago', wc, page, { dir: 'VERTICAL', textProps: [['Servicio', 'Lavado completo', 'Servicio'], ['Detalle', '08 oct, 15:40 · Tomás · Mercado Pago', 'Detalle'], ['Monto', '$25.000', 'Monto']] });

  const sc = [];
  for (const k of ['On', 'Off']) {
    const on = k === 'On';
    const c = component(`state=${k}`, { gap: 12, p: [8, 16, 8, 8], radius: 9999, fill: 'surface', stroke: 'border', effect: 'sm' });
    const track = frame('Switch', { p: 4, w: 40, h: 24, radius: 9999, fill: on ? 'washer' : 'p:neutral/300', justify: on ? 'MAX' : 'MIN' });
    add(track, dot(16, 'surface'));
    add(c, track, await text(on ? 'Online' : 'Offline', 'overline', on ? 'washer-text' : 'text-on-muted'));
    sc.push(c);
  }
  C.online = makeSet('Switch online', sc, page);
}

// Card de pedido activo (compuesta con instancias)
async function orderCard(title, current, withPay, accent) {
  const card = frame('Card de pedido', { dir: 'VERTICAL', gap: 16, p: [24, 16, 16, 16], w: 358, radius: 20, fill: 'surface', stroke: 'border', align: 'MIN', clip: true, effect: 'sm' });
  absolute(card, frame('Acento', { w: 358, h: 6, fill: accent }), 0, 0);
  const head = frame('Encabezado', { justify: 'SPACE_BETWEEN', align: 'MIN' });
  const col = frame('Título', { dir: 'VERTICAL', gap: 8, align: 'MIN' });
  const pills = frame('Datos', { gap: 8, wrap: true, counterGap: 8 });
  const date = frame('Fecha', { gap: 4, p: [2, 8], radius: 9999, fill: 'surface-muted', stroke: 'border' });
  add(date, icon('cal', 12, 'text-on-muted'), await text('08 oct • 15:00 hs', 'caption', 'text-on-muted'));
  add(pills, date, variant(C.badge, { type: 'Servicio' }).createInstance());
  add(col, await text(title, 'title-md', 'text-primary'), pills);
  add(head, col, C.pinShow.createInstance());
  card.appendChild(head); fillW(head);
  const steps = C.stepper(current);
  card.appendChild(steps); fillW(steps);
  if (withPay) { const b = C.btn('Primario', 'lg', 'Pagar $25.000 ahora para iniciar'); card.appendChild(b); fillW(b); }
  const row = frame('Tu lavador', { gap: 12, p: 8, radius: 20, fill: 'bg', stroke: 'border' });
  const who = frame('Lavador', { dir: 'VERTICAL', gap: 2, align: 'MIN' });
  add(who, await text('Tu lavador', 'overline', 'text-secondary'), await text('Tomás', 'label-sm', 'text-primary'));
  const chat = frame('Chat', { justify: 'CENTER', w: 40, h: 40, radius: 12, fill: 'surface', stroke: 'border' });
  add(chat, icon('chat', 16, 'brand-text'));
  add(row, await avatar('T'), who, chat);
  who.layoutGrow = 1;
  card.appendChild(row); fillW(row);
  return card;
}

// ---------------------------------------------------------------------------
// 5. Páginas
// ---------------------------------------------------------------------------
async function buildCover(page) {
  const f = frame('Portada', { dir: 'VERTICAL', gap: 24, p: 96, w: 1440, h: 900, fill: 'surface-chrome', align: 'MIN', justify: 'CENTER' });
  page.appendChild(f);
  const brand = frame('Logo', { gap: 12 });
  add(brand, icon('droplet', 32, 'brand', { filled: true }), await text('Pedí tu lavado', 'title-lg', 'text-on-chrome'));
  const title = await text('Design System', 'display', 'text-on-chrome');
  const desc = await text('Tokens, componentes y pantallas sacados del código real de la app: cliente, lavador y landing.', 'title-sm', 'text-on-chrome-muted');
  const meta = await text('v1 · Variables Claro / Oscuro · Lexend · Contraste WCAG AA verificado', 'overline', 'brand-text-on-chrome');
  add(f, brand, title, desc, meta);
  wrapText(title, desc, meta);
}

async function sectionTitle(parent, eyebrow, title) {
  const h = frame(title, { dir: 'VERTICAL', gap: 8, align: 'MIN' });
  add(h, await text(eyebrow, 'overline', 'brand-text'), await text(title, 'title-xl', 'text-primary'));
  parent.appendChild(h);
}

async function buildFoundations(page) {
  const root = frame('Fundamentos', { dir: 'VERTICAL', gap: 48, p: 64, w: 1440, fill: 'bg', align: 'MIN' });
  page.appendChild(root);
  // Primitivos
  await sectionTitle(root, 'Color', 'Primitivos');
  for (const [group, steps] of Object.entries(TOKENS.primitivos.color)) {
    const row = frame(group, { gap: 8, align: 'MIN' });
    const label = frame('Grupo', { w: 120 });
    label.appendChild(await text(group, 'label', 'text-secondary'));
    row.appendChild(label);
    for (const [step, t] of Object.entries(steps)) {
      const sw = frame(`${group}/${step}`, { dir: 'VERTICAL', gap: 4, w: 88, align: 'MIN' });
      const box = frame('Muestra', { w: 88, h: 56, radius: 8, fill: `p:${group}/${step}`, stroke: 'border' });
      add(sw, box, await text(step, 'label-sm', 'text-primary'), await text(t.$value, 'caption', 'text-secondary'));
      row.appendChild(sw);
    }
    root.appendChild(row);
  }
  // Semánticos en los dos modos
  await sectionTitle(root, 'Color', 'Semánticos · Claro y Oscuro');
  const modesRow = frame('Modos', { gap: 32, align: 'MIN' });
  root.appendChild(modesRow);
  for (const [label, key, modeId] of [['Claro', 'claro', MODES.claro], ['Oscuro', 'oscuro', MODES.oscuro]]) {
    const col = frame('Modo ' + label, { dir: 'VERTICAL', gap: 8, p: 24, w: 640, radius: 20, fill: 'bg', stroke: 'border', align: 'MIN' });
    col.setExplicitVariableModeForCollection(MODES.sem, modeId);
    modesRow.appendChild(col);
    col.appendChild(await text('Modo ' + label, 'title-md', 'text-primary'));
    for (const name of Object.keys(TOKENS.semanticos.claro.color)) {
      const r = frame(name, { gap: 12 });
      const sw = frame('Muestra', { w: 40, h: 28, radius: 8, fill: name, stroke: 'border' });
      const ref = TOKENS.semanticos[key].color[name].$value.replace(/[{}]/g, '').replace('color.', '');
      add(r, sw, await text(name, 'label', 'text-primary'), await text(ref, 'caption', 'text-secondary'));
      col.appendChild(r);
    }
  }
  // Tipografía
  await sectionTitle(root, 'Tipografía', 'Lexend · 4 pesos, 9 tamaños');
  const SAMPLES = { display: 'Tu auto impecable, sin moverte.', 'title-xl': 'Lavadores en la zona', 'title-lg': 'Lavadores en la zona', 'title-md': 'Lavador en camino', 'title-sm': '¡Hola, Lucía!', body: 'Elegí dónde va a estar el auto: tu casa, el trabajo u otra dirección.', 'body-sm': 'El precio con crédito incluye el costo de financiación.', label: 'Lavadores · Historial · Mi Perfil', 'label-sm': '12 cerca ahora', caption: 'Eco lavado — muy pronto', overline: 'Ubicación de lavado', cta: 'Pedir lavado', 'cta-sm': 'Iniciar sesión', pin: '4821' };
  for (const [name, t] of Object.entries(TOKENS.estilos.texto)) {
    const r = frame(name, { gap: 24 });
    const n = frame('Nombre', { w: 140 });
    n.appendChild(await text(name, 'label', 'text-secondary'));
    const v = t.$value;
    add(r, n, await text(SAMPLES[name] || name, name, 'text-primary'), await text(`${px(v.fontSize)} px · ${v.lineHeight} · ${v.fontWeight}`, 'caption', 'text-secondary'));
    root.appendChild(r);
  }
  // Espaciado
  await sectionTitle(root, 'Espaciado', 'Base de 4 px');
  const sp = frame('Espaciado', { dir: 'VERTICAL', gap: 8, align: 'MIN' });
  for (const k of Object.keys(TOKENS.primitivos.space)) {
    if (k === '0') continue;
    const r = frame('space/' + k, { gap: 16 });
    const name = frame('Nombre', { w: 90 });
    name.appendChild(await text('space/' + k, 'caption', 'text-secondary'));
    const bar = figma.createRectangle(); bar.resize(px(k), 12); bar.cornerRadius = 3; bar.fills = [paint('brand')];
    bar.setBoundVariable('width', V.space[px(k)]);
    add(r, name, bar);
    sp.appendChild(r);
  }
  root.appendChild(sp);
  // Radios
  await sectionTitle(root, 'Radios', '5 valores');
  const rad = frame('Radios', { gap: 24, align: 'MIN' });
  for (const k of Object.keys(TOKENS.primitivos.radius)) {
    const col = frame('radius/' + k, { dir: 'VERTICAL', gap: 8, align: 'MIN' });
    const box = frame('Caja', { w: 120, h: 80, fill: 'brand-subtle', stroke: 'brand', strokeW: 2 });
    bindRadius(box, px(TOKENS.primitivos.radius[k].$value));
    add(col, box, await text('radius/' + k, 'caption', 'text-secondary'));
    rad.appendChild(col);
  }
  root.appendChild(rad);
  // Elevación
  await sectionTitle(root, 'Elevación', '3 niveles y 3 glows');
  const el = frame('Elevación', { gap: 32, p: [24, 0], align: 'MIN' });
  for (const k of Object.keys(TOKENS.estilos.sombra)) {
    const b = frame(k, { dir: 'VERTICAL', p: 16, w: 180, h: 110, radius: 20, fill: 'surface', stroke: 'border', justify: 'MAX', align: 'MIN', effect: k });
    const t1 = await text(k, 'label-sm', 'text-primary');
    const t2 = await text(TOKENS.estilos.sombra[k].$description, 'caption', 'text-secondary');
    add(b, t1, t2); wrapText(t1, t2);
    el.appendChild(b);
  }
  root.appendChild(el);
}

async function placeComponents(page) {
  const ORDER = [
    ['Botón', C.button], ['Header', C.header], ['Ítem de navegación', C.navItem, C.seg], ['Barra de ubicación', C.location],
    ['Bienvenida', C.welcome], ['Tab', C.tab, C.tabs], ['Chip de filtro', C.chip, C.filters], ['Banner suscripción', C.subscribe],
    ['Badge', C.badge], ['Rating', C.rating], ['Nivel', C.level], ['Card de lavador', C.washer], ['Pin de mapa', C.pin],
    ['Barra inferior', C.bottom], ['Input', C.input], ['Celda de PIN', C.otp, C.pinShow], ['Paso del pedido', C.step, C.stepsDemo],
    ['Banner de pedido', C.statusBanner], ['Toast', C.toast], ['Modal invitado', C.modal], ['Burbuja de chat', C.bubble],
    ['Fila de pago', C.payRow], ['Switch online', C.online],
  ];
  let y = 0;
  for (const [title, main, extra] of ORDER) {
    const note = await docNote(title);
    page.appendChild(note);
    note.x = 0; note.y = y;
    main.x = 380; main.y = y;
    let bottom = y + Math.max(note.height, main.height);
    if (extra) { extra.x = 380; extra.y = y + main.height + 32; bottom = Math.max(bottom, extra.y + extra.height); }
    y = bottom + 120;
  }
}

async function buildScreens(page) {
  const W = 390, H = 844;
  const screen = (name) => frame(name, { dir: 'VERTICAL', w: W, h: H, fill: 'bg', align: 'MIN', clip: true });
  const body = () => frame('Contenido', { dir: 'VERTICAL', gap: 16, p: 16, align: 'MIN' });
  const finish = (s, top, content, bottom) => {
    for (const n of top) { s.appendChild(n); fillW(n); }
    s.appendChild(content); fillW(content); content.layoutSizingVertical = 'FILL';
    if (bottom) { s.appendChild(bottom); fillW(bottom); }
  };
  const screens = [];

  // 1. Home del cliente: mapa
  {
    const s = screen('Cliente · Mapa');
    const map = frame('Mapa (Google Maps)', { dir: 'VERTICAL', gap: 12, p: 16, fill: 'surface-muted' });
    finish(s, [variant(C.header, { 'sesión': 'Invitado' }).createInstance()], map, variant(C.bottom, { active: 'Mapa' }).createInstance());
    add(map, variant(C.location, { state: 'Cerrada' }).createInstance(), variant(C.subscribe, { variant: 'Mapa' }).createInstance());
    for (const [st, x, y] of [['Online', 60, 300], ['Certificado', 230, 220], ['Offline', 40, 470], ['Cliente', 190, 400], ['Ocupado', 250, 520]]) {
      absolute(map, variant(C.pin, { status: st }).createInstance(), x, y);
    }
    screens.push(s);
  }
  // 2. Lista de lavadores
  {
    const s = screen('Cliente · Lavadores');
    const b = body();
    finish(s, [variant(C.header, { 'sesión': 'Con sesión' }).createInstance()], b, variant(C.bottom, { active: 'Lavadores' }).createInstance());
    const title = frame('Título', { justify: 'SPACE_BETWEEN' });
    const t1 = frame('Lavadores en la zona', { gap: 0 });
    add(t1, await text('Lavadores ', 'title-lg', 'text-primary'), await text('en la zona', 'title-lg', 'brand-text'));
    const live = frame('En vivo', { gap: 6 });
    add(live, dot(6, 'success'), await text('12 cerca', 'label-sm', 'text-secondary'));
    add(title, t1, live);
    const tabs = C.tabs.createInstance();
    add(b, C.welcome.createInstance(), tabs, title, C.filters.createInstance());
    fillW(tabs); fillW(title);
    for (const [st, cert, name, km] of [['Online', 'No', 'Martín G.', 'A 0.4 km'], ['Online', 'Sí', 'Julián V.', 'A 2.4 km'], ['Ocupado', 'No', 'Sofía P.', 'A 2.1 km'], ['Offline', 'No', 'Andrés L.', 'A 1.3 km']]) {
      const c = variant(C.washer, { status: st, certificado: cert }).createInstance();
      c.setProperties({ [propKey(c, 'Nombre')]: name, [propKey(c, 'Distancia')]: km });
      b.appendChild(c); fillW(c);
    }
    screens.push(s);
  }
  // 3. Seguimiento con PIN
  {
    const s = screen('Cliente · Seguimiento con PIN');
    const b = body();
    finish(s, [variant(C.statusBanner, { tone: 'En camino' }).createInstance(), variant(C.header, { 'sesión': 'Con sesión' }).createInstance()], b, variant(C.bottom, { active: 'Agenda' }).createInstance());
    const card = await orderCard('Lavador en camino', 3, false, 'brand');
    b.appendChild(card); fillW(card);
    screens.push(s);
  }
  // 4. Pedido y pago
  {
    const s = screen('Cliente · Pedido y pago');
    const b = body();
    finish(s, [variant(C.statusBanner, { tone: 'Esperando pago' }).createInstance(), variant(C.header, { 'sesión': 'Con sesión' }).createInstance()], b, variant(C.bottom, { active: 'Agenda' }).createInstance());
    const card = await orderCard('¡Identidad verificada!', 4, true, 'success');
    b.appendChild(card); fillW(card);
    screens.push(s);
  }
  // 5. Panel del lavador: validación de PIN
  {
    const s = screen('Lavador · Validación de PIN');
    const b = body();
    finish(s, [variant(C.header, { 'sesión': 'Con sesión' }).createInstance()], b, null);
    const top = frame('Arriba', { justify: 'SPACE_BETWEEN' });
    const back = frame('Volver', { gap: 6 });
    add(back, icon('arrow-left', 16, 'text-secondary'), await text('Volver atrás', 'label', 'text-secondary'));
    add(top, back, variant(C.online, { state: 'On' }).createInstance());
    const job = frame('Trabajo', { dir: 'VERTICAL', gap: 8, p: 20, radius: 20, fill: 'p:neutral/900', align: 'MIN' });
    const who = frame('Cliente', { justify: 'SPACE_BETWEEN' });
    const cl = frame('Nombre', { gap: 8 });
    add(cl, await avatar('L', 32, 'p:neutral/700', 'text-on-chrome'), await text('Lucía', 'label-sm', 'text-on-chrome'));
    add(who, cl, await text('$22.000', 'title-md', 'p:emerald/400'));
    add(job, await text('Aceptado · 8 oct · 15:00 hs', 'overline', 'text-on-chrome-muted'), await text('Lavado completo', 'title-lg', 'text-on-chrome'), await text('Volkswagen Gol Trend · Gris', 'overline', 'text-on-chrome-muted'), who);
    fillW(who);
    const steps = C.stepper(3);
    const warn = frame('Aviso fotos', { gap: 12, p: 12, radius: 20, fill: 'warning-subtle' });
    const wtxt = await text('Asegurate de registrar fotos de golpes o detalles previos para evitar reclamos.', 'body-sm', 'warning-text');
    add(warn, icon('alert', 16, 'warning-text'), wtxt, C.btn('Secundario', 'sm', 'Subir'));
    wtxt.layoutGrow = 1; wtxt.textAutoResize = 'HEIGHT';
    const pinBox = frame('Validación de PIN', { dir: 'VERTICAL', gap: 12, p: 20, radius: 32, fill: 'surface-chrome-raised' });
    const cells = frame('Celdas', { gap: 12 });
    for (let i = 0; i < 4; i++) cells.appendChild(variant(C.otp, { state: i === 0 ? 'Focus' : 'Vacía' }).createInstance());
    add(pinBox, icon('lock', 20, 'brand-text-on-chrome'), await text('Validación de PIN', 'overline', 'text-on-chrome-muted'), cells);
    add(b, top, job, steps, warn, pinBox);
    fillW(top, job, steps, warn, pinBox);
    screens.push(s);
  }

  let x = 0;
  for (const s of screens) { page.appendChild(s); s.x = x; s.y = 0; x += W + 80; }
  // Las mismas pantallas en modo Oscuro
  x = 0;
  for (const s of screens) {
    const d = s.clone();
    d.name = s.name + ' · Oscuro';
    d.setExplicitVariableModeForCollection(MODES.sem, MODES.oscuro);
    page.appendChild(d); d.x = x; d.y = H + 120; x += W + 80;
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  await figma.loadAllPagesAsync();
  figma.notify('Creando variables y estilos…', { timeout: 1500 });
  MODES = await buildVariables();
  await buildStyles();

  const first = figma.root.children[0];
  const cover = first.children.length === 0 ? first : figma.createPage();
  cover.name = 'Portada';
  const pFund = figma.createPage(); pFund.name = 'Fundamentos';
  const pComp = figma.createPage(); pComp.name = 'Componentes';
  const pScreens = figma.createPage(); pScreens.name = 'Pantallas';

  await buildCover(cover);
  await buildFoundations(pFund);

  figma.notify('Creando componentes…', { timeout: 1500 });
  await buildButton(pComp);
  await buildHeader(pComp);
  await buildNavItem(pComp);
  await buildLocationBar(pComp);
  await buildWelcome(pComp);
  await buildTabs(pComp);
  await buildChips(pComp);
  await buildSubscribe(pComp);
  await buildBadges(pComp);
  await buildWasherCard(pComp);
  await buildPins(pComp);
  await buildBottomNav(pComp);
  await buildInput(pComp);
  await buildPin(pComp);
  await buildSteps(pComp);
  await buildStatusBanner(pComp);
  await buildToast(pComp);
  await buildModal(pComp);
  await buildChatWalletSwitch(pComp);
  await placeComponents(pComp);

  figma.notify('Armando pantallas…', { timeout: 1500 });
  await buildScreens(pScreens);
  await applyEffects();

  await figma.setCurrentPageAsync(cover);
  figma.viewport.scrollAndZoomIntoView(cover.children);
  figma.closePlugin('Listo: variables, estilos, componentes y pantallas de Pedí tu lavado.');
}

main().catch((err) => {
  console.error(err);
  figma.closePlugin('Error: ' + (err && err.message ? err.message : String(err)));
});

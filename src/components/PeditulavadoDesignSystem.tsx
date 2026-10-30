import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState, type ReactNode } from 'react';
import dsHtml from './ds/ds-embed.html?raw';
import { DS } from './ds/ds-data';
import './ds/ds-embed.css';

// Pestaña "Design system" del caso Pedí tu lavado.
// Fundamentos en React a partir de ds-data.ts; componentes y pantallas desde ds-embed.html, de a uno.
// Ambos se generan con `node design-system/tools/export-portfolio.mjs`.

type Mode = 'claro' | 'oscuro';
type SemanticName = keyof typeof DS.semantic;

const LEXEND = "'Lexend', system-ui, sans-serif";
// El HTML exportado trae: sprite de íconos + sección de componentes + sección de pantallas.
// Se parte en piezas para mostrarlas de a una.
const SPRITE = dsHtml.slice(0, dsHtml.indexOf('<section'));
const sectionOf = (id: string) => {
    const start = dsHtml.indexOf(`<section class="sg" id="${id}">`);
    const end = dsHtml.indexOf('</section>', start);
    return dsHtml.slice(start, end);
};
const clean = (s: string) => s.replace(/(\s*<!--[^>]*-->)*\s*$/, '');
const COMPONENTS = sectionOf('componentes')
    .split('<div class="comp">')
    .slice(1)
    .map((chunk) => ({ title: (chunk.match(/<h3>([^<]+)<\/h3>/) || [])[1] ?? '', html: '<div class="comp">' + clean(chunk) }));
const SCREENS = sectionOf('pantallas')
    .split('<h3 class="sg-h3">')
    .slice(1)
    .map((chunk) => {
        const cut = chunk.indexOf('</h3>');
        // Solo la pantalla armada con el sistema: se saca la captura de referencia y los rótulos
        const html = clean(chunk.slice(cut + 5))
            .replace(/<figure><figcaption>Hoy en la app<\/figcaption>[\s\S]*?<\/figure>/, '')
            .replace('<figcaption>Con el sistema de diseño</figcaption>', '');
        return { title: chunk.slice(0, cut).replace(/^\d+\s*·\s*/, ''), html };
    });

// Componentes agrupados por dónde viven en la app
const COMPONENT_GROUPS: { name: string; items: string[] }[] = [
    { name: 'Base', items: ['Botón', 'Campo de texto', 'Etiquetas', 'Aviso emergente y ventana'] },
    { name: 'Navegación', items: ['Encabezado oscuro', 'Barra inferior (celular)', 'Navegación segmentada', 'Barra de ubicación de lavado', 'Bienvenida, pestañas y filtros'] },
    { name: 'Lavadores', items: ['Tarjeta de lavador', 'Marcadores del mapa', 'Aviso "¡Suscribite y ahorrá!"', 'Disponibilidad del lavador'] },
    { name: 'Pedido y pago', items: ['Pedido en curso (burbuja flotante)', 'Estados del pedido', 'PIN de verificación', 'Tarjeta de pedido y pago con Mercado Pago', 'Historial de pagos'] },
    { name: 'Comunicación', items: ['Chat', 'Reseñas'] },
];
const SCREEN_LABELS = ['Inicio del cliente', 'Seguimiento con PIN', 'Pedido y pago', 'Panel del lavador'];

const luminance = (hex: string) => {
    const h = hex.replace('#', '');
    const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const inkOn = (hex: string) => (hex.length > 7 ? '#e5e5e5' : luminance(hex) > 0.35 ? '#0f172a' : '#ffffff');

// Roles principales del sistema
const ROLES: { token: SemanticName; name: string; use: string }[] = [
    { token: 'brand', name: 'Marca', use: 'Las acciones del cliente: pedir, pagar, aceptar.' },
    { token: 'washer', name: 'Lavador', use: 'Todo lo que es del lavador: sumarse y ponerse online.' },
    { token: 'certified', name: 'Certificado', use: 'Reservado para quien hizo el curso de lavado.' },
    { token: 'success', name: 'Éxito', use: 'Online, hecho, pagado.' },
    { token: 'rating', name: 'Calificación', use: 'Estrellas y nivel del lavador.' },
    { token: 'surface-chrome', name: 'Fondo de marca', use: 'Header, barra inferior y ubicación. Oscuro en los dos modos.' },
];

const GROUPS: { title: string; tokens: SemanticName[] }[] = [
    { title: 'Superficies', tokens: ['bg', 'surface', 'surface-muted', 'surface-chrome', 'surface-chrome-raised', 'overlay'] },
    { title: 'Texto', tokens: ['text-primary', 'text-secondary', 'text-on-muted', 'text-on-brand', 'text-on-chrome', 'text-on-chrome-muted'] },
    { title: 'Marca', tokens: ['brand', 'brand-hover', 'brand-text', 'brand-subtle', 'brand-text-on-chrome'] },
    { title: 'Lavador', tokens: ['washer', 'washer-hover', 'washer-text', 'washer-subtle'] },
    { title: 'Estados', tokens: ['success', 'success-text', 'success-subtle', 'warning', 'warning-text', 'warning-subtle', 'danger', 'danger-text', 'danger-subtle'] },
    { title: 'Certificado, calificación y promo', tokens: ['certified', 'certified-text', 'certified-border', 'certified-subtle', 'rating', 'rating-text', 'rating-subtle', 'promo'] },
    { title: 'Bordes y foco', tokens: ['border', 'border-strong', 'border-chrome', 'focus'] },
];

// Nombres en español para mostrar; el nombre del token queda chico, como código
const GROUP_ES: Record<string, string> = {
    neutral: 'Grises', navy: 'Azul noche', blue: 'Azul', indigo: 'Índigo', magenta: 'Rosa lavador', fuchsia: 'Fucsia', violet: 'Violeta',
    emerald: 'Verde', amber: 'Ámbar', orange: 'Naranja', red: 'Rojo', rose: 'Rosa', alpha: 'Transparencias',
};
const ALPHA_ES: Record<string, string> = {
    'white-5': 'Blanco 5%', 'white-10': 'Blanco 10%', 'white-60': 'Blanco 60%', 'black-50': 'Negro 50%', 'black-60': 'Negro 60%',
    'blue-20': 'Azul 20%', 'magenta-20': 'Rosa 20%', 'emerald-15': 'Verde 15%', 'amber-15': 'Ámbar 15%', 'red-15': 'Rojo 15%', 'violet-20': 'Violeta 20%',
    'shadow-sm': 'Sombra baja', 'shadow-md': 'Sombra media', 'shadow-lg': 'Sombra alta', 'glow-brand': 'Brillo azul', 'glow-washer': 'Brillo rosa', 'glow-certified': 'Brillo violeta',
};
// Tonos que no están en la app: los propongo para que el rosa cumpla contraste
const PROPOSED = new Set(['magenta.50', 'magenta.400', 'magenta.600', 'magenta.700']);
const TEXT_ES: Record<string, string> = {
    display: 'Titular', 'title-xl': 'Título muy grande', 'title-lg': 'Título grande', 'title-md': 'Título mediano', 'title-sm': 'Título chico',
    body: 'Texto', 'body-sm': 'Texto chico', label: 'Etiqueta', 'label-sm': 'Etiqueta chica', caption: 'Nota', overline: 'Sobretítulo',
    cta: 'Botón', 'cta-sm': 'Botón chico', pin: 'PIN',
};
const RADIUS_ES: Record<string, string> = { sm: 'Chico', md: 'Mediano', lg: 'Grande', xl: 'Muy grande', full: 'Píldora' };
const SHADOW_ES: Record<string, string> = { sm: 'Baja', md: 'Media', lg: 'Alta', 'glow-brand': 'Brillo azul', 'glow-washer': 'Brillo rosa', 'glow-certified': 'Brillo violeta' };

// Nombre en español de cada token semántico (para mostrar; el token queda como código)
const BASE_ES: Record<string, string> = {
    bg: 'Fondo', surface: 'Superficie', 'surface-muted': 'Superficie apagada', 'surface-chrome': 'Fondo de marca', 'surface-chrome-raised': 'Fondo de marca elevado',
    overlay: 'Velo', 'text-primary': 'Texto principal', 'text-secondary': 'Texto secundario', 'text-on-muted': 'Texto sobre superficie apagada',
    'text-on-brand': 'Texto sobre azul', 'text-on-chrome': 'Texto sobre fondo de marca', 'text-on-chrome-muted': 'Texto secundario sobre fondo de marca',
    'brand-text-on-chrome': 'Azul sobre fondo de marca', brand: 'Azul de marca', washer: 'Rosa lavador', success: 'Éxito', warning: 'Alerta', danger: 'Error',
    certified: 'Certificado', rating: 'Calificación', promo: 'Promoción', border: 'Borde', 'border-strong': 'Borde marcado', 'border-chrome': 'Borde sobre fondo de marca', focus: 'Foco',
};
const SUFFIX_ES: Record<string, string> = { hover: 'con el mouse encima', text: 'texto', subtle: 'suave', border: 'borde', end: 'final del degradado' };
const tokenEs = (t: string) => {
    if (BASE_ES[t]) return BASE_ES[t];
    const i = t.lastIndexOf('-');
    const base = BASE_ES[t.slice(0, i)];
    const suf = SUFFIX_ES[t.slice(i + 1)];
    return base && suf ? `${base}, ${suf}` : t;
};

const TYPE_SAMPLES: Record<string, string> = {
    display: 'Tu auto impecable, sin moverte.', 'title-xl': 'Lavadores en la zona', 'title-lg': 'Lavadores en la zona', 'title-md': 'Lavador en camino',
    'title-sm': '¡Hola, Lucía!', body: 'Elegí dónde va a estar el auto: tu casa, el trabajo u otra dirección.', 'body-sm': 'El precio con crédito incluye el costo de financiación.',
    label: 'Lavadores, Historial, Mi Perfil', 'label-sm': '12 cerca ahora', caption: 'Eco lavado, muy pronto', overline: 'Ubicación de lavado', cta: 'Pedir lavado', 'cta-sm': 'Iniciar sesión', pin: '4821',
};

// Íconos (sprite del style guide, presente en ds-embed.html)
const Ic = ({ id, size = 16 }: { id: string; size?: number }) => (
    <svg className="ic" style={{ width: size, height: size }} aria-hidden><use href={`#i-${id}`} /></svg>
);

function SectionHead({ step, title, children }: { step: string; title: string; children: ReactNode }) {
    return (
        <header className="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-16 mb-12 md:mb-16">
            <div className="xl:col-span-5 flex items-baseline gap-4">
                <span className="text-[#9FD592] text-4xl md:text-5xl tracking-tight" style={{ fontFamily: LEXEND, fontWeight: 300 }}>{step}</span>
                <h3 className="text-4xl md:text-5xl text-neutral-50 tracking-tight" style={{ fontFamily: LEXEND, fontWeight: 500 }}>{title}</h3>
            </div>
            <div className="xl:col-span-7 text-base md:text-lg text-neutral-400 font-light leading-relaxed max-w-2xl space-y-4">{children}</div>
        </header>
    );
}

function SubHead({ title, children }: { title: string; children?: ReactNode }) {
    return (
        <div className="mb-6 md:mb-8 max-w-2xl">
            <h4 className="text-2xl text-neutral-100 tracking-tight mb-2" style={{ fontFamily: LEXEND, fontWeight: 500 }}>{title}</h4>
            {children && <p className="text-neutral-400 font-light leading-relaxed">{children}</p>}
        </div>
    );
}

// --- Anatomía: una pantalla armada con las piezas reales y el token que pinta cada una ---
function Anatomy() {
    const reduce = useReducedMotion();
    const rows: { el: ReactNode; token: string; title: string; note: string; bleed?: boolean }[] = [
        {
            bleed: true,
            token: 'surface-chrome',
            title: 'Fondo de marca', note: 'Header, barra inferior y ubicación. Es oscuro en los dos modos.',
            el: (
                <div className="app-header" style={{ borderRadius: 0, height: 60, padding: '0 16px' }}>
                    <img src="/design-system/logo2.png" alt="Pedí tu lavado" style={{ height: 22 }} />
                    <div className="right"><button className="btn sm primary" type="button" tabIndex={-1}>Iniciar sesión</button></div>
                </div>
            ),
        },
        {
            token: 'brand-text-on-chrome',
            title: 'Azul sobre fondo oscuro', note: 'El azul de marca, aclarado para que se lea sobre el fondo de marca.',
            el: (
                <div className="loc" style={{ padding: '14px 16px', gap: 12, borderRadius: 20 }}>
                    <span className="pin"><Ic id="map-pin" /></span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="kicker">Ubicación de lavado</div>
                        <div className="value" style={{ fontSize: 15 }}>Casa, Barrio Jardín <Ic id="chevron" /></div>
                    </div>
                </div>
            ),
        },
        {
            token: 'certified',
            title: 'Certificado', note: 'El violeta queda reservado para quien hizo el curso.',
            el: (
                <div className="wcard certified" style={{ width: '100%' }}>
                    <div className="ribbon">Certificado</div>
                    <div className="av"><div className="img" style={{ background: '#0d9488' }}>J</div><span className="dot" /></div>
                    <div className="info">
                        <div className="name"><b>Julián V.</b><Ic id="shield" size={14} /></div>
                        <div className="dist"><Ic id="map-pin" size={10} />A 2.4 km</div>
                        <div className="course"><Ic id="award" size={12} />Hizo el curso</div>
                    </div>
                    <div className="side"><span className="rating"><Ic id="star" size={14} /><b>5.0</b></span></div>
                </div>
            ),
        },
        {
            token: 'success',
            title: 'Éxito', note: 'Verde es hecho, azul es lo que está pasando ahora.',
            el: (
                <div className="steps" style={{ maxWidth: 'none' }}>
                    {[['Pedido', 'check', 'done'], ['Aceptado', 'check', 'done'], ['En camino', 'check', 'done'], ['PIN', 'shield', 'current'], ['Pago', 'card', ''], ['Lavado', 'drops', '']].map(([label, ic, st]) => (
                        <div key={label} className={`step ${st}`}><span className="c"><Ic id={ic} size={18} /></span><span>{label}</span></div>
                    ))}
                </div>
            ),
        },
        {
            token: 'brand',
            title: 'Marca', note: 'La acción principal. Una sola por pantalla.',
            el: <button className="btn md primary" type="button" tabIndex={-1} style={{ width: '100%' }}>Pedir lavado</button>,
        },
    ];

    return (
        <div className="relative max-w-[400px] mx-auto xl:max-w-none">
            {/* Pantalla de fondo (solo la columna de la izquierda) */}
            <div aria-hidden className="absolute top-0 bottom-0 left-0 w-full xl:w-[360px] rounded-[32px] border overflow-hidden" style={{ background: 'var(--bg)', borderColor: 'var(--border)', boxShadow: '0 40px 80px -30px rgba(0,0,0,0.7)' }} />
            <ol style={{ color: 'var(--text-primary)' }} className="relative grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-y-5 pb-6 list-none">
                {rows.map((r, i) => (
                    <motion.li
                        key={r.token}
                        initial={reduce ? false : { opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="contents"
                    >
                        <div className={r.bleed ? 'overflow-hidden rounded-t-[32px]' : 'px-4'}>{r.el}</div>
                        <div className="hidden xl:flex items-center gap-4 pl-6">
                            <span aria-hidden className="h-px w-10 bg-neutral-700 shrink-0" />
                            <p className="text-sm text-neutral-400 font-light leading-snug">
                                <span className="block text-base text-neutral-100" style={{ fontFamily: LEXEND, fontWeight: 500 }}>{r.title}</span>
                                <span className="block mt-1">{r.note}</span>
                                <code className="inline-block mt-2 text-[#9FD592] bg-transparent p-0 text-xs">{r.token}</code>
                            </p>
                        </div>
                    </motion.li>
                ))}
            </ol>
        </div>
    );
}

// Bloque plegable para el detalle que no hace falta ver de entrada
function More({ label, children }: { label: string; children: ReactNode }) {
    return (
        <details className="group rounded-2xl border border-neutral-800 bg-neutral-950">
            <summary className="cursor-pointer list-none px-5 py-4 text-neutral-300 hover:text-neutral-100 flex items-center justify-between gap-4" style={{ fontFamily: LEXEND }}>
                {label}
                <span className="text-neutral-500 transition-transform group-open:rotate-180 shrink-0"><Ic id="chevron" /></span>
            </summary>
            <div className="px-5 pb-5">{children}</div>
        </details>
    );
}

// Botón tipo píldora para los selectores
function Pill({ active, onClick, children, small }: { active: boolean; onClick: () => void; children: ReactNode; small?: boolean }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={`rounded-full border transition-colors text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9FD592] ${small ? 'px-3.5 py-1.5 text-sm' : 'px-4 py-2 text-sm'} ${
                active ? 'bg-[#9FD592] border-[#9FD592] text-[#0a0a0a]' : 'bg-neutral-900 border-neutral-700 text-neutral-200 hover:bg-neutral-800 hover:border-neutral-500 hover:text-white'
            }`}
        >
            {children}
        </button>
    );
}

// Flecha redonda para pasar a la pantalla anterior o siguiente
function StepButton({ label, onClick, disabled, back }: { label: string; onClick: () => void; disabled?: boolean; back?: boolean }) {
    return (
        <button
            type="button"
            aria-label={label}
            onClick={onClick}
            disabled={disabled}
            className="w-10 h-10 rounded-full border border-neutral-700 bg-neutral-900 text-neutral-200 grid place-items-center hover:bg-neutral-800 hover:border-neutral-500 disabled:opacity-30 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-[#9FD592]"
        >
            <span className={back ? 'rotate-180' : ''}><Ic id="chevron-right" /></span>
        </button>
    );
}

const SECTIONS = [
    { id: 'ds-pantallas', label: 'Pantallas' },
    { id: 'ds-componentes', label: 'Componentes' },
    { id: 'ds-fundamentos', label: 'Fundamentos' },
] as const;

const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 150, behavior: 'smooth' });
};

export default function PeditulavadoDesignSystem() {
    const [mode, setMode] = useState<Mode>('claro');
    const [screen, setScreen] = useState(0);
    const [group, setGroup] = useState(0);
    const [compTitle, setCompTitle] = useState(COMPONENT_GROUPS[0].items[0]);
    const [active, setActive] = useState<string>(SECTIONS[0].id);

    // Lexend: la tipografía de Pedí tu lavado
    useEffect(() => {
        const id = 'font-lexend';
        if (document.getElementById(id)) return;
        const link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;700;900&display=swap';
        document.head.appendChild(link);
    }, []);

    // Índice: marca la sección que se está leyendo (la última cuyo inicio ya pasó debajo de las barras fijas)
    useEffect(() => {
        const onScroll = () => {
            let current: string = SECTIONS[0].id;
            for (const sec of SECTIONS) {
                const el = document.getElementById(sec.id);
                if (el && el.getBoundingClientRect().top < 260) current = sec.id;
            }
            setActive(current);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const hex = (t: SemanticName) => DS.semantic[t][mode];
    const pairs = DS.contrast.filter((c) => c.mode === mode);

    const flat = COMPONENT_GROUPS.flatMap((g) => g.items);
    const compIndex = flat.indexOf(compTitle);
    const comp = COMPONENTS.find((c) => c.title === compTitle);
    const goTo = (title: string) => {
        setCompTitle(title);
        setGroup(COMPONENT_GROUPS.findIndex((g) => g.items.includes(title)));
        scrollToSection('ds-comp-view');
    };

    const contrastTile = (c: (typeof pairs)[number]) => (
        <div key={c.fg + c.bg} className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 flex flex-col">
            <div className="h-20 grid place-items-center" style={{ background: c.bgHex }}>
                {c.min === 3 ? (
                    c.fg === 'success'
                        ? <span className="w-4 h-4 rounded-full" style={{ background: c.fgHex }} />
                        : <span className="w-24 h-8 rounded-lg" style={{ border: `2px solid ${c.fgHex}` }} />
                ) : (
                    <span className="text-2xl" style={{ color: c.fgHex, fontFamily: LEXEND, fontWeight: 700 }}>Aa</span>
                )}
            </div>
            <div className="p-3 flex-1 flex flex-col justify-between gap-2">
                <p className="text-xs text-neutral-400 leading-snug">{c.use}</p>
                <p className="text-sm text-[#9FD592]" style={{ fontFamily: LEXEND }}>{c.ratio.toFixed(2)}:1</p>
            </div>
        </div>
    );

    return (
        <section id="design-system" className="max-w-6xl w-full pb-24 md:pb-32 relative z-10">
            <style>{`.ds-embed .ds-part section.sg { border-top: 0; padding: 0; } .ds-embed .ds-part .comp { border-top: 0; padding-top: 0; } .ds-embed .ds-part .compare { grid-template-columns: 1fr; } .ds-embed .ds-part .compare .screen { border: 10px solid #0b0f1a; border-radius: 46px; min-height: 680px; box-shadow: 0 40px 80px -30px rgba(0,0,0,0.7); }`}</style>
            <div className="ds-embed" data-mode={mode}>
                <div aria-hidden dangerouslySetInnerHTML={{ __html: SPRITE }} />

                {/* ---------- Apertura ---------- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20 md:mb-24">
                    <div className="lg:col-span-5">
                        <p className="text-[#9FD592] text-sm mb-6" style={{ fontFamily: LEXEND }}>Sistema de diseño</p>
                        <h2 className="text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.05] tracking-tight text-neutral-50 mb-8" style={{ fontFamily: LEXEND, fontWeight: 500 }}>
                            Las piezas con las que está hecha Pedí tu lavado.
                        </h2>
                        <p className="text-base md:text-lg text-neutral-400 font-light leading-relaxed mb-6">
                            Colores, tipografía, espaciado y componentes, cada uno con su regla de uso, para diseñar en Figma y construir en código con el mismo criterio. Todo sale de la interfaz real de cliente, lavador y landing.
                        </p>
                        <p className="text-sm text-neutral-500 font-light leading-relaxed">
                            73 colores base, 53 tokens con modo claro y oscuro, 14 estilos de texto y 20 componentes documentados, con contraste AA verificado.
                        </p>
                    </div>
                    <div className="lg:col-span-7">
                        <Anatomy />
                    </div>
                </div>

                {/* ---------- Índice ---------- */}
                <nav aria-label="Secciones del sistema" className="sticky top-[141px] z-30 -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24 mb-16 md:mb-20 bg-[#0a0a0a]/85 backdrop-blur-md border-b border-neutral-900">
                    <div className="flex gap-6 md:gap-10">
                        {SECTIONS.map((s, i) => (
                            <button
                                key={s.id}
                                type="button"
                                onClick={() => scrollToSection(s.id)}
                                aria-current={active === s.id ? 'true' : undefined}
                                className={`py-3 text-sm border-b-2 -mb-px transition-colors focus-visible:outline-2 focus-visible:outline-[#9FD592] ${active === s.id ? 'border-[#9FD592] text-neutral-50' : 'border-transparent text-neutral-500 hover:text-neutral-200'}`}
                                style={{ fontFamily: LEXEND }}
                            >
                                <span className="text-[#9FD592] mr-1.5">{i + 1}</span>{s.label}
                            </button>
                        ))}
                    </div>
                </nav>

                {/* ---------- 1. Pantallas ---------- */}
                <div id="ds-pantallas" className="mb-24 md:mb-32">
                    <SectionHead step="1" title="Pantallas">
                        <p>Pantallas clave de la app armadas solo con los componentes y tokens del sistema: el inicio del cliente, el seguimiento con PIN, el pago y el panel del lavador.</p>
                    </SectionHead>
                    <div className="rounded-3xl border border-neutral-800 bg-neutral-950/60 p-4 md:p-6 mb-10">
                        <p className="text-sm text-neutral-400 mb-3" style={{ fontFamily: LEXEND }}>Elegí una pantalla</p>
                        <div role="group" aria-label="Pantalla" className="flex flex-wrap gap-2">
                            {SCREENS.map((s, i) => (
                                <Pill key={s.title} active={screen === i} onClick={() => setScreen(i)}>{SCREEN_LABELS[i] ?? s.title}</Pill>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 mb-6">
                        <h4 className="text-xl md:text-2xl text-neutral-100 tracking-tight" style={{ fontFamily: LEXEND, fontWeight: 500 }}>{SCREENS[screen].title}</h4>
                        <div className="flex items-center gap-2 shrink-0" style={{ fontFamily: LEXEND }}>
                            <span className="text-sm text-neutral-500 mr-1">{screen + 1} de {SCREENS.length}</span>
                            <StepButton label="Pantalla anterior" disabled={screen === 0} onClick={() => setScreen(screen - 1)} back />
                            <StepButton label="Pantalla siguiente" disabled={screen === SCREENS.length - 1} onClick={() => setScreen(screen + 1)} />
                        </div>
                    </div>
                    <div key={screen} className="ds-part" dangerouslySetInnerHTML={{ __html: SCREENS[screen].html }} />
                </div>

                {/* ---------- 2. Componentes ---------- */}
                <div id="ds-componentes" className="border-t border-neutral-900 pt-16 md:pt-24 mb-24 md:mb-32">
                    <SectionHead step="2" title="Componentes">
                        <p>Los componentes reales de la app armados solo con tokens, cada uno con sus variantes, sus estados y cuándo usarlo. Al lado, un celular muestra dónde aparece y cómo queda.</p>
                    </SectionHead>
                    <div id="ds-comp-view" className="rounded-3xl border border-neutral-800 bg-neutral-950/60 p-4 md:p-6 mb-10">
                        <p className="text-sm text-neutral-400 mb-3" style={{ fontFamily: LEXEND }}>Elegí un grupo</p>
                        <div role="group" aria-label="Grupo de componentes" className="flex flex-wrap gap-2">
                            {COMPONENT_GROUPS.map((g, i) => (
                                <Pill key={g.name} active={group === i} onClick={() => { setGroup(i); setCompTitle(g.items[0]); }}>
                                    {g.name} <span className={group === i ? 'opacity-60' : 'text-neutral-600'}>{g.items.length}</span>
                                </Pill>
                            ))}
                        </div>
                        <p className="text-sm text-neutral-400 mt-5 pt-5 mb-3 border-t border-neutral-900" style={{ fontFamily: LEXEND }}>Elegí un componente</p>
                        <div role="group" aria-label="Componente" className="flex flex-wrap gap-2">
                            {COMPONENT_GROUPS[group].items.map((t) => (
                                <Pill key={t} small active={compTitle === t} onClick={() => setCompTitle(t)}>{t}</Pill>
                            ))}
                        </div>
                    </div>
                    {comp && <div key={comp.title} className="ds-part" dangerouslySetInnerHTML={{ __html: comp.html }} />}
                    <div className="flex justify-between gap-4 mt-10 pt-6 border-t border-neutral-900 text-sm" style={{ fontFamily: LEXEND }}>
                        {compIndex > 0 ? (
                            <button type="button" onClick={() => goTo(flat[compIndex - 1])} className="text-left text-neutral-400 hover:text-neutral-100">
                                <span className="block text-xs text-neutral-600 mb-1">Anterior</span>{flat[compIndex - 1]}
                            </button>
                        ) : <span />}
                        {compIndex < flat.length - 1 && (
                            <button type="button" onClick={() => goTo(flat[compIndex + 1])} className="text-right text-neutral-400 hover:text-neutral-100">
                                <span className="block text-xs text-neutral-600 mb-1">Siguiente</span>{flat[compIndex + 1]}
                            </button>
                        )}
                    </div>
                </div>

                {/* ---------- 3. Fundamentos ---------- */}
                <div id="ds-fundamentos" className="border-t border-neutral-900 pt-16 md:pt-24">
                    <SectionHead step="3" title="Fundamentos">
                        <p>
                            Un <span className="text-neutral-200">token</span> es una decisión de diseño con nombre. Un botón no usa <code>#2563eb</code>: usa <code>brand</code>. Si el azul cambia, cambia en un solo lugar y se actualizan Figma y el código.
                        </p>
                        <p>
                            Hay dos capas. Los <span className="text-neutral-200">primitivos</span> son los colores base. Los <span className="text-neutral-200">semánticos</span> dicen para qué se usa cada uno y cambian solos entre modo claro y oscuro: probalo con el selector de abajo.
                        </p>
                    </SectionHead>

                    {/* Color */}
                    <SubHead title="Seis colores con un rol cada uno" />
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">
                        {ROLES.map((r) => (
                            <div key={r.token} className="flex flex-col">
                                <div className="h-36 md:h-44 rounded-2xl p-4 flex flex-col justify-end border border-white/5" style={{ background: hex(r.token), color: inkOn(hex(r.token)), fontFamily: LEXEND }}>
                                    <span className="text-lg" style={{ fontWeight: 500 }}>{r.name}</span>
                                    <span className="text-xs opacity-80">{hex(r.token)}</span>
                                </div>
                                <code className="mt-3 self-start">{r.token}</code>
                                <p className="mt-2 text-sm text-neutral-400 font-light leading-snug">{r.use}</p>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-3 mb-16 md:mb-20">
                        <More label="Ver los 53 tokens con su valor en claro y oscuro">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {GROUPS.map((g) => (
                                    <div key={g.title} className="rounded-2xl border border-neutral-800 p-5">
                                        <div className="flex items-center justify-between mb-3">
                                            <h5 className="text-neutral-100" style={{ fontFamily: LEXEND, fontWeight: 500 }}>{g.title}</h5>
                                            <div className="flex gap-2 text-[11px] text-neutral-500 w-[116px] justify-between"><span className="w-[54px] text-center">Claro</span><span className="w-[54px] text-center">Oscuro</span></div>
                                        </div>
                                        {g.tokens.map((t) => (
                                            <div key={t} className="flex items-center justify-between gap-3 py-2 border-t border-neutral-900">
                                                <span className="min-w-0 text-sm text-neutral-300 leading-tight">{tokenEs(t)}<code className="block mt-0.5 text-[10px] text-neutral-500 bg-transparent p-0 truncate">{t}</code></span>
                                                <div className="flex gap-2 shrink-0">
                                                    {(['claro', 'oscuro'] as Mode[]).map((m) => (
                                                        <span key={m} title={`${t} · ${m}: ${DS.semantic[t][m]}`} className="w-[54px] h-7 rounded-md border border-white/10" style={{ background: DS.semantic[t][m] }} />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </More>
                        <More label="Ver las escalas de color completas">
                            <div className="space-y-2">
                                <p className="text-sm text-neutral-400 font-light leading-relaxed mb-4 max-w-2xl">
                                    Todos salen de los colores que usa la app hoy. Los marcados con un punto son ajustes que propongo: tonos del rosa de lavador para que el texto blanco cumpla AA.
                                </p>
                                {Object.entries(DS.primitives).map(([g, steps]) => (
                                    <div key={g} className="grid grid-cols-[96px_1fr] gap-3 items-center">
                                        <span className="text-xs text-neutral-400 leading-tight">{GROUP_ES[g] ?? g}<code className="block mt-0.5 text-[10px] text-neutral-600 bg-transparent p-0">{g}</code></span>
                                        <div className="flex flex-wrap gap-1">
                                            {steps.map(([step, value]) => (
                                                <span key={step} title={`${g}/${step} ${value}`} className={`relative ${g === 'alpha' ? 'w-[4.5rem]' : 'w-12'} h-10 rounded-md border border-white/5 flex items-end p-1 text-[10px] leading-tight`} style={{ background: value, color: inkOn(value) }}>
                                                    {g === 'alpha' ? ALPHA_ES[step] ?? step : step}
                                                    {PROPOSED.has(`${g}.${step}`) && <span aria-label="propuesto" className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-current" />}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </More>
                    </div>

                    {/* Contraste */}
                    <SubHead title="Contraste que se lee">
                        Cada combinación que usa la interfaz, medida contra WCAG AA: 4.5:1 para texto y 3:1 para bordes y componentes. Se verifica sola cada vez que cambia un token.
                    </SubHead>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">{pairs.slice(0, 5).map(contrastTile)}</div>
                    <div className="mb-16 md:mb-20">
                        <More label={`Ver los ${pairs.length} pares del modo ${mode}`}>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">{pairs.slice(5).map(contrastTile)}</div>
                        </More>
                    </div>

                    {/* Tipografía */}
                    <SubHead title="Una tipografía, cuatro pesos">
                        Lexend fue pensada para mejorar la lectura. En la app se usa en 400 para textos y títulos, 500 para la interfaz, 700 solo para nombres, precios y etiquetas chicas, y 900 para los botones principales.
                    </SubHead>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-6 items-end">
                        <div className="lg:col-span-4">
                            <span className="block text-[9rem] md:text-[11rem] leading-[0.8] text-neutral-50" style={{ fontFamily: LEXEND, fontWeight: 500 }}>Aa</span>
                        </div>
                        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {[400, 500, 700, 900].map((w) => (
                                <div key={w} className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
                                    <span className="block text-2xl xl:text-3xl text-neutral-100 break-words" style={{ fontFamily: LEXEND, fontWeight: w }}>Lavado</span>
                                    <span className="block mt-2 text-xs text-neutral-500">{w}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mb-16 md:mb-20">
                        <More label="Ver los 14 estilos de texto">
                            {DS.textStyles.map((s) => (
                                <div key={s.name} className="grid grid-cols-1 md:grid-cols-[150px_1fr_160px] gap-1 md:gap-6 items-baseline py-4 border-b border-neutral-900 last:border-0">
                                    <span className="self-start text-sm text-neutral-300 leading-tight">{TEXT_ES[s.name] ?? s.name}<code className="block mt-1 text-[10px] text-neutral-500 bg-transparent p-0">{s.name}</code></span>
                                    <span className="text-neutral-100 min-w-0 break-words" style={{
                                        fontFamily: s.name === 'pin' ? 'ui-monospace, monospace' : LEXEND, fontWeight: s.fontWeight,
                                        fontSize: `min(${s.fontSize}, 11vw)`, lineHeight: s.lineHeight, letterSpacing: s.letterSpacing,
                                        textTransform: 'textCase' in s ? 'uppercase' : undefined,
                                    }}>{TYPE_SAMPLES[s.name] || s.name}</span>
                                    <span className="text-xs text-neutral-500">{parseFloat(s.fontSize)} px, peso {s.fontWeight}</span>
                                </div>
                            ))}
                        </More>
                    </div>

                    {/* Espaciado, radios y elevación */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        <div>
                            <SubHead title="Espaciado">Base de 4 px, con un paso de 2 para ajustes finos.</SubHead>
                            <div className="space-y-2">
                                {DS.space.map((v) => (
                                    <div key={v} className="flex items-center gap-3">
                                        <span className="w-10 text-xs text-neutral-500 text-right">{v}</span>
                                        <span className="h-3 rounded-sm bg-[#9FD592]" style={{ width: v * 2.5 }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <SubHead title="Radios">De la etiqueta a la píldora.</SubHead>
                            <div className="grid grid-cols-3 gap-3">
                                {DS.radius.map((r) => (
                                    <div key={r.name}>
                                        <div className="h-16 border-2 border-[#9FD592] bg-[#9FD592]/10" style={{ borderRadius: Math.min(r.value, 32) }} />
                                        <p className="mt-2 text-xs text-neutral-400">{RADIUS_ES[r.name] ?? r.name}{r.value === 9999 ? '' : `, ${r.value} px`}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <SubHead title="Elevación">Tres niveles y tres brillos.</SubHead>
                            <div className="grid grid-cols-3 gap-3">
                                {DS.shadows.map((s) => (
                                    <div key={s.name} className="h-20 rounded-xl flex items-end p-2" style={{ background: 'var(--surface)', boxShadow: `var(--shadow-${s.name})` }}>
                                        <span className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>{SHADOW_ES[s.name] ?? s.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Selector de modo: flota abajo al centro mientras se recorre el sistema */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
                <div role="group" aria-label="Modo de color" className="flex items-center gap-1 p-1 rounded-full bg-neutral-950/90 backdrop-blur-md border border-neutral-800 shadow-lg">
                    {(['claro', 'oscuro'] as Mode[]).map((m) => (
                        <button
                            key={m}
                            type="button"
                            onClick={() => setMode(m)}
                            aria-pressed={mode === m}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-[#9FD592] ${mode === m ? 'bg-[#9FD592] text-[#0a0a0a]' : 'text-neutral-400 hover:text-neutral-100'}`}
                        >
                            {m === 'claro' ? 'Modo claro' : 'Modo oscuro'}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

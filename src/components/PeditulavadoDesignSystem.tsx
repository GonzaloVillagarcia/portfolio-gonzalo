import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState, type ReactNode } from 'react';
import dsHtml from './ds/ds-embed.html?raw';
import { DS } from './ds/ds-data';
import './ds/ds-embed.css';

// Pestaña "Design system" del caso Pedí tu lavado.
// Fundamentos en React a partir de ds-data.ts; componentes y pantallas desde ds-embed.html.
// Ambos se generan con `node design-system/tools/export-portfolio.mjs`.

type Mode = 'claro' | 'oscuro';
type SemanticName = keyof typeof DS.semantic;

const LEXEND = "'Lexend', system-ui, sans-serif";
const [componentsHtml, screensHtml] = (() => {
    const cut = dsHtml.indexOf('<section class="sg" id="pantallas">');
    return [dsHtml.slice(0, cut), dsHtml.slice(cut)];
})();

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
    { token: 'surface-chrome', name: 'Chrome', use: 'Header, barra inferior y ubicación. Oscuro en los dos modos.' },
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
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 mb-12 md:mb-16">
            <div className="lg:col-span-5 flex items-baseline gap-4">
                <span className="text-[#9FD592] text-4xl md:text-5xl tracking-tight" style={{ fontFamily: LEXEND, fontWeight: 300 }}>{step}</span>
                <h3 className="text-4xl md:text-5xl text-neutral-50 tracking-tight" style={{ fontFamily: LEXEND, fontWeight: 500 }}>{title}</h3>
            </div>
            <div className="lg:col-span-7 text-base md:text-lg text-neutral-400 font-light leading-relaxed max-w-2xl space-y-4">{children}</div>
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
    const rows: { el: ReactNode; token: string; note: string; bleed?: boolean }[] = [
        {
            bleed: true,
            token: 'surface-chrome',
            note: 'El chrome de la marca. Es oscuro en los dos modos.',
            el: (
                <div className="app-header" style={{ borderRadius: 0, height: 60, padding: '0 16px' }}>
                    <img src="/design-system/logo2.png" alt="Pedí tu lavado" style={{ height: 22 }} />
                    <div className="right"><button className="btn sm primary" type="button" tabIndex={-1}>Iniciar sesión</button></div>
                </div>
            ),
        },
        {
            token: 'brand-text-on-chrome',
            note: 'El azul de marca, aclarado para leerse sobre el navy.',
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
            note: 'El violeta queda reservado para quien hizo el curso.',
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
            note: 'Verde es hecho, azul es lo que está pasando ahora.',
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
            note: 'La acción principal. Una sola por pantalla.',
            el: <button className="btn md primary" type="button" tabIndex={-1} style={{ width: '100%' }}>Pedir lavado</button>,
        },
    ];

    return (
        <div className="relative">
            {/* Pantalla de fondo (solo la columna de la izquierda) */}
            <div aria-hidden className="absolute top-0 bottom-0 left-0 w-full lg:w-[360px] rounded-[32px] border overflow-hidden" style={{ background: 'var(--bg)', borderColor: 'var(--border)', boxShadow: '0 40px 80px -30px rgba(0,0,0,0.7)' }} />
            <ol className="relative grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-y-5 pb-6 list-none">
                {rows.map((r, i) => (
                    <motion.li
                        key={r.token}
                        initial={reduce ? false : { opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="contents"
                    >
                        <div className={r.bleed ? 'overflow-hidden rounded-t-[32px]' : 'px-4'}>{r.el}</div>
                        <div className="hidden lg:flex items-center gap-4 pl-6">
                            <span aria-hidden className="h-px w-10 bg-neutral-700 shrink-0" />
                            <p className="text-sm text-neutral-400 font-light leading-snug">
                                <code className="text-[#9FD592] bg-transparent p-0 text-[13px]">{r.token}</code>
                                <span className="block mt-1">{r.note}</span>
                            </p>
                        </div>
                    </motion.li>
                ))}
            </ol>
        </div>
    );
}

export default function PeditulavadoDesignSystem() {
    const [mode, setMode] = useState<Mode>('claro');

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

    const hex = (t: SemanticName) => DS.semantic[t][mode];
    const pairs = DS.contrast.filter((c) => c.mode === mode);

    return (
        <section id="design-system" className="max-w-6xl w-full pb-24 md:pb-32 relative z-10">
            <style>{`.ds-embed .ds-part section.sg { border-top: 0; padding: 0; }`}</style>
            <div className="ds-embed" data-mode={mode}>

                {/* ---------- Apertura ---------- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24 md:mb-32">
                    <div className="lg:col-span-5">
                        <p className="text-[#9FD592] text-sm mb-6" style={{ fontFamily: LEXEND }}>Design system</p>
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

                {/* ---------- 1. Fundamentos ---------- */}
                <div className="border-t border-neutral-900 pt-16 md:pt-24 mb-24 md:mb-32">
                    <SectionHead step="1" title="Fundamentos">
                        <p>
                            Un <span className="text-neutral-200">token</span> es una decisión de diseño con nombre. Un botón no usa <code>#2563eb</code>: usa <code>brand</code>. Si el azul cambia, cambia en un solo lugar y se actualizan Figma y el código.
                        </p>
                        <p>
                            Hay dos capas. Los <span className="text-neutral-200">primitivos</span> son los colores base. Los <span className="text-neutral-200">semánticos</span> dicen para qué se usa cada uno y cambian solos entre modo claro y oscuro: probalo con el selector de abajo.
                        </p>
                    </SectionHead>

                    {/* Roles */}
                    <SubHead title="Seis colores con un rol cada uno" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-16 md:mb-20">
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

                    {/* Semánticos por función */}
                    <SubHead title="Tokens por función">
                        Cada token con su valor en modo claro y en modo oscuro.
                    </SubHead>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {GROUPS.map((g) => (
                            <div key={g.title} className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
                                <div className="flex items-center justify-between mb-3">
                                    <h5 className="text-neutral-100" style={{ fontFamily: LEXEND, fontWeight: 500 }}>{g.title}</h5>
                                    <div className="flex gap-2 text-[11px] text-neutral-500 w-[116px] justify-between"><span className="w-[54px] text-center">Claro</span><span className="w-[54px] text-center">Oscuro</span></div>
                                </div>
                                {g.tokens.map((t) => (
                                    <div key={t} className="flex items-center justify-between gap-3 py-2 border-t border-neutral-900">
                                        <code className="truncate">{t}</code>
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
                    <details className="group mb-16 md:mb-20 rounded-2xl border border-neutral-800 bg-neutral-950">
                        <summary className="cursor-pointer list-none px-5 py-4 text-neutral-300 flex items-center justify-between" style={{ fontFamily: LEXEND }}>
                            Ver las escalas de color completas
                            <span className="text-neutral-500 transition-transform group-open:rotate-180"><Ic id="chevron" /></span>
                        </summary>
                        <div className="px-5 pb-5 space-y-2">
                            {Object.entries(DS.primitives).map(([group, steps]) => (
                                <div key={group} className="grid grid-cols-[88px_1fr] gap-3 items-center">
                                    <span className="text-xs text-neutral-500">{group}</span>
                                    <div className="flex flex-wrap gap-1">
                                        {steps.map(([step, value]) => (
                                            <span key={step} title={`${group}/${step} ${value}`} className="w-12 h-10 rounded-md border border-white/5 flex items-end p-1 text-[10px]" style={{ background: value, color: inkOn(value) }}>{step}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </details>

                    {/* Contraste */}
                    <SubHead title="Contraste que se lee">
                        Cada combinación que usa la interfaz, medida contra WCAG AA: 4.5:1 para texto y 3:1 para bordes y componentes. Se verifica sola cada vez que cambia un token.
                    </SubHead>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-16 md:mb-20">
                        {pairs.map((c) => (
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
                        ))}
                    </div>

                    {/* Tipografía */}
                    <SubHead title="Una tipografía, cuatro pesos">
                        Lexend fue pensada para mejorar la lectura. En la app se usa en 400 para texto, 500 para la interfaz, 700 para títulos y 900 para los llamados a la acción.
                    </SubHead>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-end">
                        <div className="lg:col-span-4">
                            <span className="block text-[9rem] md:text-[11rem] leading-[0.8] text-neutral-50" style={{ fontFamily: LEXEND, fontWeight: 500 }}>Aa</span>
                        </div>
                        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {[400, 500, 700, 900].map((w) => (
                                <div key={w} className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
                                    <span className="block text-3xl text-neutral-100" style={{ fontFamily: LEXEND, fontWeight: w }}>Lavado</span>
                                    <span className="block mt-2 text-xs text-neutral-500">{w}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="rounded-2xl border border-neutral-800 bg-neutral-950 px-5 mb-16 md:mb-20">
                        {DS.textStyles.map((s) => (
                            <div key={s.name} className="grid grid-cols-1 md:grid-cols-[120px_1fr_160px] gap-1 md:gap-6 items-baseline py-4 border-b border-neutral-900 last:border-0">
                                <code className="self-start justify-self-start">{s.name}</code>
                                <span className="text-neutral-100 min-w-0 break-words" style={{
                                    fontFamily: s.name === 'pin' ? 'ui-monospace, monospace' : LEXEND, fontWeight: s.fontWeight,
                                    fontSize: `min(${s.fontSize}, 11vw)`, lineHeight: s.lineHeight, letterSpacing: s.letterSpacing,
                                    textTransform: 'textCase' in s ? 'uppercase' : undefined,
                                }}>{TYPE_SAMPLES[s.name] || s.name}</span>
                                <span className="text-xs text-neutral-500">{parseFloat(s.fontSize)} px, peso {s.fontWeight}</span>
                            </div>
                        ))}
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
                            <SubHead title="Radios">Del chip a la píldora.</SubHead>
                            <div className="grid grid-cols-3 gap-3">
                                {DS.radius.map((r) => (
                                    <div key={r.name}>
                                        <div className="h-16 border-2 border-[#9FD592] bg-[#9FD592]/10" style={{ borderRadius: Math.min(r.value, 32) }} />
                                        <p className="mt-2 text-xs text-neutral-500">{r.name}, {r.value === 9999 ? 'píldora' : `${r.value} px`}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <SubHead title="Elevación">Tres niveles y tres brillos.</SubHead>
                            <div className="grid grid-cols-3 gap-3">
                                {DS.shadows.map((s) => (
                                    <div key={s.name} className="h-20 rounded-xl flex items-end p-2" style={{ background: 'var(--surface)', boxShadow: `var(--shadow-${s.name})` }}>
                                        <span className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>{s.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ---------- 2. Componentes ---------- */}
                <div className="border-t border-neutral-900 pt-16 md:pt-24 mb-24 md:mb-32">
                    <SectionHead step="2" title="Componentes">
                        <p>Los componentes reales de la app armados solo con tokens. Cada uno con sus variantes, sus estados y una regla corta de cuándo usarlo y cuándo no. Debajo del título, el archivo de la app donde vive, y al lado, un celular que muestra dónde aparece y cómo queda.</p>
                    </SectionHead>
                    <div className="ds-part" dangerouslySetInnerHTML={{ __html: componentsHtml }} />
                </div>

                {/* ---------- 3. Pantallas ---------- */}
                <div className="border-t border-neutral-900 pt-16 md:pt-24">
                    <SectionHead step="3" title="Pantallas">
                        <p>A la izquierda, la app en producción. A la derecha, la misma pantalla armada solo con los componentes del sistema. Los nombres y las fotos de lavadores reales están difuminados.</p>
                    </SectionHead>
                    <div className="ds-part" dangerouslySetInnerHTML={{ __html: screensHtml }} />
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

import { motion } from 'framer-motion';
import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';

// Sección "Design system" del caso Pedí tu lavado.
// Los valores salen de design-system/tokens.json (semánticos Claro / Oscuro) y la UI de muestra
// replica los componentes reales de la app con esos tokens.

type Mode = 'claro' | 'oscuro';

const SEMANTIC: Record<Mode, Record<string, string>> = {
    claro: {
        bg: '#f8fafc', surface: '#ffffff', 'surface-muted': '#f1f5f9', border: '#e2e8f0',
        'text-primary': '#0f172a', 'text-secondary': '#64748b', 'text-on-muted': '#475569',
        brand: '#2563eb', 'brand-text': '#2563eb', 'brand-subtle': '#eff6ff',
        success: '#059669', 'success-text': '#047857', 'success-subtle': '#ecfdf5',
        warning: '#f59e0b', 'warning-text': '#b45309', 'warning-subtle': '#fffbeb',
        certified: '#7c3aed', 'certified-end': '#d946ef', 'certified-text': '#6d28d9', 'certified-border': '#a78bfa', 'certified-subtle': '#f5f3ff',
        rating: '#f59e0b', 'rating-text': '#b45309', 'rating-subtle': '#fffbeb',
        washer: '#e0007a', shadow: 'rgba(15,23,42,0.06)',
    },
    oscuro: {
        bg: '#050814', surface: '#0f172a', 'surface-muted': '#1e293b', border: 'rgba(255,255,255,0.1)',
        'text-primary': '#f8fafc', 'text-secondary': '#94a3b8', 'text-on-muted': '#94a3b8',
        brand: '#2563eb', 'brand-text': '#60a5fa', 'brand-subtle': 'rgba(37,99,235,0.2)',
        success: '#10b981', 'success-text': '#34d399', 'success-subtle': 'rgba(16,185,129,0.15)',
        warning: '#f59e0b', 'warning-text': '#fbbf24', 'warning-subtle': 'rgba(245,158,11,0.15)',
        certified: '#7c3aed', 'certified-end': '#d946ef', 'certified-text': '#a78bfa', 'certified-border': '#7c3aed', 'certified-subtle': 'rgba(124,58,237,0.2)',
        rating: '#fbbf24', 'rating-text': '#fbbf24', 'rating-subtle': 'rgba(245,158,11,0.15)',
        washer: '#e0007a', shadow: 'rgba(0,0,0,0.5)',
    },
};
const vars = (mode: Mode) => Object.fromEntries(Object.entries(SEMANTIC[mode]).map(([k, v]) => [`--${k}`, v])) as CSSProperties;
const v = (name: string) => `var(--${name})`;

const STATS = [
    { from: '761', to: '53', label: 'colores sueltos → tokens semánticos por modo' },
    { from: '36', to: '9', label: 'tamaños de texto → escala de 10 a 48 px' },
    { from: '19', to: '5', label: 'radios distintos → sm, md, lg, xl y píldora' },
    { from: '97', to: '6', label: 'sombras → 3 niveles y 3 brillos' },
];

const CONTRAST = [
    { where: 'Botón "Ser lavador"', beforeBg: '#ff0080', afterBg: '#e0007a', fg: '#ffffff', before: '3.77', after: '4.72', sample: 'SER LAVADOR' },
    { where: 'Texto secundario', beforeBg: '#ffffff', afterBg: '#ffffff', fgBefore: '#94a3b8', fg: '#64748b', before: '2.56', after: '4.76', sample: 'A 0.4 km · Solo reservas' },
    { where: 'Badge "Cerca de tu zona"', beforeBg: '#ecfdf5', afterBg: '#ecfdf5', fgBefore: '#059669', fg: '#047857', before: '3.58', after: '5.21', sample: 'CERCA DE TU ZONA' },
];

// --- Íconos (trazos de lucide, la librería de la app) ---
const Icon = ({ d, size = 14, color = 'currentColor', fill = 'none', sw = 2 }: { d: ReactNode; size?: number; color?: string; fill?: string; sw?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0">{d}</svg>
);
const I = {
    shield: <><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></>,
    pin: <><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></>,
    nav: <polygon points="3 11 22 2 13 21 11 13 3 11" />,
    star: <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />,
    award: <><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" /><circle cx="12" cy="8" r="6" /></>,
    clock: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>,
};

// --- Card de lavador (réplica de client/Dashboard.tsx con tokens) ---
type Status = 'online' | 'ocupado' | 'offline';
function WasherCard({ name, km, status, certified = false, rating }: { name: string; km: string; status: Status; certified?: boolean; rating?: string }) {
    const off = status === 'offline';
    return (
        <div
            className="relative overflow-hidden flex items-center gap-3 p-3.5 rounded-[20px] w-full"
            style={{
                background: off ? v('bg') : v('surface'),
                border: `${certified ? 2 : 1}px solid ${certified ? v('certified-border') : v('border')}`,
                boxShadow: certified ? `0 0 0 2px ${v('certified-subtle')}, 0 8px 24px -10px rgba(124,58,237,0.55)` : `0 1px 3px ${v('shadow')}`,
            }}
        >
            {certified && (
                <span className="absolute top-[13px] -right-[34px] rotate-[35deg] px-8 py-0.5 text-[10px] font-black tracking-[0.15em] uppercase text-white" style={{ background: `linear-gradient(90deg, ${v('certified')}, ${v('certified-end')})` }}>
                    Certificado
                </span>
            )}
            <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-xl grid place-items-center text-base font-bold" style={{ background: v('surface-muted'), color: v('text-secondary'), opacity: off ? 0.7 : 1, boxShadow: certified ? `0 0 0 2px ${v('surface')}, 0 0 0 4px ${v('certified-border')}` : undefined }}>
                    {name[0]}
                </div>
                {status === 'online' && <span className="absolute -right-1 -bottom-1 w-4 h-4 rounded-full" style={{ background: v('success'), border: `2px solid ${v('surface')}` }} />}
                {status === 'ocupado' && <span className="absolute -right-1 -bottom-1 p-1 rounded-lg grid place-items-center" style={{ background: v('warning'), border: `2px solid ${v('surface')}` }}><Icon d={I.clock} size={10} color="#fff" /></span>}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 mb-1">
                    <b className="text-[15px] leading-none tracking-tight" style={{ color: v('text-primary') }}>{name}</b>
                    <Icon d={I.shield} size={14} color="#3b82f6" />
                    {status === 'ocupado' && <span className="text-[10px] font-bold tracking-[0.12em] uppercase px-1.5 py-0.5 rounded-md" style={{ color: v('warning-text'), background: v('warning-subtle') }}>Ocupado</span>}
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold tracking-[0.05em] uppercase" style={{ color: v('text-secondary') }}>
                    <Icon d={I.pin} size={10} color="#e11d48" />A {km}
                </div>
                {status === 'online' && !certified && (
                    <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] font-bold tracking-[0.12em] uppercase px-1.5 py-0.5 rounded-md" style={{ color: v('success-text'), background: v('success-subtle') }}>
                        <Icon d={I.nav} size={10} />Cerca de tu zona
                    </span>
                )}
                {certified && (
                    <span className="flex items-center gap-1 mt-1 text-xs font-bold" style={{ color: v('certified-text') }}>
                        <Icon d={I.award} size={12} />Hizo el curso de lavado
                    </span>
                )}
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0" style={{ marginRight: certified ? 36 : 0 }}>
                {off ? (
                    <div className="flex flex-col items-end gap-0.5 px-2.5 py-1.5 rounded-[10px]" style={{ background: v('surface-muted') }}>
                        <span className="text-[10px] font-bold tracking-[0.15em] uppercase" style={{ color: v('text-on-muted') }}>Offline</span>
                        <span className="text-[10px]" style={{ color: v('text-on-muted') }}>Solo reservas</span>
                    </div>
                ) : (
                    <>
                        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-[10px] text-xs font-black" style={{ background: v('rating-subtle'), color: v('rating') }}>
                            <Icon d={I.star} size={13} fill={rating ? 'currentColor' : 'none'} color={rating ? undefined : '#cbd5e1'} />
                            <span style={{ color: v('rating-text') }}>{rating || '0.0'}</span>
                        </span>
                        {!rating && <span className="text-[10px] font-bold tracking-[0.15em] uppercase" style={{ color: v('brand-text') }}>Nuevo</span>}
                    </>
                )}
            </div>
        </div>
    );
}

// --- Mini pantalla que cambia de modo en vivo ---
function ModeDemo() {
    const [mode, setMode] = useState<Mode>('claro');
    return (
        <div className="flex flex-col items-center gap-4">
            <div role="group" aria-label="Modo de color" className="flex p-1 rounded-full bg-neutral-900 border border-neutral-800">
                {(['claro', 'oscuro'] as Mode[]).map((m) => (
                    <button
                        key={m}
                        type="button"
                        onClick={() => setMode(m)}
                        aria-pressed={mode === m}
                        className={`px-5 py-2 rounded-full text-xs tracking-widest uppercase font-medium transition-colors ${mode === m ? 'bg-[#9FD592] text-[#0a0a0a]' : 'text-neutral-400 hover:text-neutral-100'}`}
                    >
                        {m === 'claro' ? 'Claro' : 'Oscuro'}
                    </button>
                ))}
            </div>
            <div className="w-full max-w-[380px] rounded-[28px] p-4 flex flex-col gap-3 font-lexend" style={{ ...vars(mode), background: v('bg'), border: `1px solid ${v('border')}` }}>
                <div className="flex items-center justify-between gap-3 px-1 pt-1">
                    <span className="text-xl font-bold tracking-tight" style={{ color: v('text-primary') }}>
                        Lavadores <span style={{ color: v('brand-text') }}>en la zona</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-bold shrink-0" style={{ color: v('text-secondary') }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: v('success') }} />12 cerca
                    </span>
                </div>
                <div className="flex gap-1 p-1 rounded-full w-fit" style={{ background: v('surface-muted') }}>
                    {['Todos', 'Lavados', 'Pulidos'].map((c, i) => (
                        <span key={c} className="px-3.5 py-1.5 rounded-full text-[13px] font-bold" style={i === 0 ? { background: v('surface'), color: v('text-primary'), boxShadow: `0 1px 3px ${v('shadow')}` } : { color: v('text-on-muted') }}>{c}</span>
                    ))}
                </div>
                <WasherCard name="Martín G." km="0.4 km" status="online" />
                <WasherCard name="Julián V." km="2.4 km" status="online" certified />
                <button type="button" className="h-12 rounded-full text-white text-sm font-black tracking-[0.1em] uppercase" style={{ background: v('brand'), boxShadow: '0 0 20px rgba(37,99,235,0.35)' }}>
                    Pedir lavado
                </button>
            </div>
            <p className="text-xs text-neutral-500 text-center max-w-xs">Los mismos componentes, cambiando solo el modo de los tokens semánticos.</p>
        </div>
    );
}

function Block({ index, title, children, aside }: { index: string; title: string; children: ReactNode; aside: ReactNode }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 border-t border-neutral-900 pt-14 md:pt-20"
        >
            <div className="lg:col-span-5 space-y-4">
                <span className="block text-xs tracking-[0.2em] text-[#9FD592] font-medium">{index}</span>
                <h4 className="text-2xl md:text-3xl font-light tracking-tight text-neutral-100">{title}</h4>
                <div className="text-base md:text-lg text-neutral-400 font-light leading-relaxed space-y-4">{children}</div>
            </div>
            <div className="lg:col-span-7">{aside}</div>
        </motion.article>
    );
}

export default function PeditulavadoDesignSystem() {
    // Lexend solo para las muestras de UI de la app (es la tipografía de Pedí tu lavado)
    useEffect(() => {
        const id = 'font-lexend';
        if (document.getElementById(id)) return;
        const link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;700;900&display=swap';
        document.head.appendChild(link);
    }, []);

    return (
        <section id="design-system" className="max-w-6xl w-full pb-24 md:pb-32 relative z-10">
            <style>{`.font-lexend, .font-lexend * { font-family: 'Lexend', system-ui, sans-serif; }`}</style>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8 }} className="mb-12 md:mb-16">
                <h3 className="text-xs tracking-[0.3em] uppercase text-[#9FD592] font-bold mb-6">Design system</h3>
                <p className="text-2xl md:text-4xl font-light tracking-tight text-neutral-200 max-w-3xl leading-snug mb-6">
                    Después del lanzamiento, ordené el sistema visual.
                </p>
                <p className="text-base md:text-lg text-neutral-400 font-light leading-relaxed max-w-3xl">
                    Construí la app rápido, pantalla por pantalla, y cada una tomó sus propias decisiones de color, tamaño y espaciado. Medí el código real y lo consolidé en un design system: tokens con modo claro y oscuro, componentes documentados y una librería en Figma.
                </p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-14 md:mb-20">
                {STATS.map((s) => (
                    <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5 md:p-6">
                        <div className="text-3xl md:text-4xl font-light tracking-tight text-neutral-100">
                            <span className="text-neutral-500">{s.from}</span> <span className="text-[#9FD592]">→</span> {s.to}
                        </div>
                        <p className="mt-2 text-xs md:text-sm text-neutral-500 font-light leading-snug">{s.label}</p>
                    </motion.div>
                ))}
            </div>

            <div className="space-y-14 md:space-y-20">
                <Block index="01" title="Tokens en dos capas, con modo oscuro" aside={<ModeDemo />}>
                    <p>
                        Primero, los <span className="text-neutral-200">primitivos</span>: las escalas de color que la app usa de verdad. Encima, los <span className="text-neutral-200">semánticos</span>, que nombran para qué sirve cada color: fondo, texto secundario, marca, lavador, éxito, certificado.
                    </p>
                    <p>
                        Los componentes solo usan semánticos. Por eso el modo oscuro es cambiar un valor y no reescribir pantallas. Probá el selector.
                    </p>
                </Block>

                <Block
                    index="02"
                    title="Componentes con todas sus variantes"
                    aside={
                        <div className="rounded-3xl p-4 md:p-6 grid grid-cols-1 gap-4 max-w-[440px] mx-auto lg:mx-0 font-lexend" style={{ ...vars('claro'), background: '#f8fafc' }}>
                            {[
                                { label: 'Online · nuevo', el: <WasherCard name="Martín G." km="0.4 km" status="online" /> },
                                { label: 'Ocupado · con calificación', el: <WasherCard name="Sofía P." km="2.1 km" status="ocupado" rating="4.8" /> },
                                { label: 'Offline · solo reservas', el: <WasherCard name="Andrés L." km="1.3 km" status="offline" /> },
                                { label: 'Certificado · hizo el curso', el: <WasherCard name="Julián V." km="2.4 km" status="online" certified /> },
                            ].map((x) => (
                                <div key={x.label} className="flex flex-col gap-2">
                                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-500">{x.label}</span>
                                    {x.el}
                                </div>
                            ))}
                        </div>
                    }
                >
                    <p>
                        Pasé los componentes reales al sistema: la card de lavador, los pins del mapa, el PIN de verificación, los estados del pedido y la barra de navegación. Cada uno tiene sus variantes, sus estados y una regla corta de cuándo usarlo y cuándo no.
                    </p>
                    <p>
                        Separé dos ideas que en la interfaz se mezclaban: todos los lavadores están <span className="text-neutral-200">verificados</span> (escudo azul), y el <span className="text-neutral-200">certificado</span> es el que hizo el curso. El violeta queda reservado solo para eso.
                    </p>
                </Block>

                <Block
                    index="03"
                    title="Contraste que se lee"
                    aside={
                        <div className="flex flex-col gap-3">
                            {CONTRAST.map((c) => (
                                <div key={c.where} className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 md:p-5">
                                    <p className="text-xs tracking-[0.15em] uppercase text-neutral-500 mb-3">{c.where}</p>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { tag: 'Antes', bg: c.beforeBg, fg: c.fgBefore || c.fg, ratio: c.before, ok: false },
                                            { tag: 'Ahora', bg: c.afterBg, fg: c.fg, ratio: c.after, ok: true },
                                        ].map((s) => (
                                            <div key={s.tag} className="flex flex-col gap-2">
                                                <div className="h-14 rounded-xl grid place-items-center px-3 text-center text-[13px] font-black tracking-[0.06em] font-lexend border border-neutral-800" style={{ background: s.bg, color: s.fg }}>
                                                    {c.sample}
                                                </div>
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="text-neutral-500">{s.tag}</span>
                                                    <span className={s.ok ? 'text-[#9FD592] font-medium' : 'text-rose-400 font-medium'}>{s.ratio}:1 {s.ok ? '✓' : '✕'}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                >
                    <p>
                        Verifiqué cada par de colores contra WCAG AA: 4.5:1 para texto y 3:1 para bordes y componentes. Donde no llegaba, hice el ajuste más chico posible para no cambiar la identidad.
                    </p>
                    <p>
                        También subí el texto mínimo a 10 px: había etiquetas de 7 y 8 px que en un celular no se leían.
                    </p>
                </Block>
            </div>
        </section>
    );
}

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import dsHtml from './ds/ds-embed.html?raw';
import './ds/ds-embed.css';

// Pestaña "Design system" del caso Pedí tu lavado.
// El contenido (ds-embed.html / .css) se genera desde design-system/style-guide.html con
// `node design-system/tools/export-portfolio.mjs`: no se edita a mano.

type Mode = 'claro' | 'oscuro';

const SUMMARY = [
    { value: '73', label: 'colores primitivos' },
    { value: '53', label: 'tokens semánticos' },
    { value: '2', label: 'modos: claro y oscuro' },
    { value: '14', label: 'estilos de texto en Lexend' },
    { value: '16', label: 'componentes documentados' },
    { value: 'AA', label: 'contraste verificado' },
];

export default function PeditulavadoDesignSystem() {
    const [mode, setMode] = useState<Mode>('claro');

    // Lexend: la tipografía de Pedí tu lavado, solo para las muestras de la interfaz
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
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-12 md:mb-16">
                <h3 className="text-xs tracking-[0.3em] uppercase text-[#9FD592] font-bold mb-6">Design system</h3>
                <p className="text-2xl md:text-4xl font-light tracking-tight text-neutral-200 max-w-3xl leading-snug mb-6">
                    El sistema visual de Pedí tu lavado.
                </p>
                <p className="text-base md:text-lg text-neutral-400 font-light leading-relaxed max-w-3xl">
                    Tokens de color con modo claro y oscuro, tipografía, espaciado, componentes con todas sus variantes y estados, y las pantallas armadas con esas piezas. Está documentado para diseñar en Figma y construir en código con las mismas reglas, y sale de la interfaz real de la plataforma: cliente, lavador y landing.
                </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12 md:mb-16">
                {SUMMARY.map((s) => (
                    <div key={s.label} className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 md:p-5">
                        <div className="text-3xl font-light tracking-tight text-[#9FD592]">{s.value}</div>
                        <p className="mt-1 text-xs text-neutral-500 font-light leading-snug">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Selector de modo: flota abajo al centro mientras se recorre el sistema */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
                <div role="group" aria-label="Modo de color de las muestras" className="pointer-events-auto flex items-center gap-1 p-1 rounded-full bg-neutral-950/90 backdrop-blur-md border border-neutral-800 shadow-lg">
                    <span className="hidden sm:inline pl-3 pr-1 text-[10px] tracking-[0.2em] uppercase text-neutral-500">Modo</span>
                    {(['claro', 'oscuro'] as Mode[]).map((m) => (
                        <button
                            key={m}
                            type="button"
                            onClick={() => setMode(m)}
                            aria-pressed={mode === m}
                            className={`px-4 py-2 rounded-full text-xs tracking-widest uppercase font-medium transition-colors ${mode === m ? 'bg-[#9FD592] text-[#0a0a0a]' : 'text-neutral-400 hover:text-neutral-100'}`}
                        >
                            {m === 'claro' ? 'Claro' : 'Oscuro'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="ds-embed" data-mode={mode} dangerouslySetInnerHTML={{ __html: dsHtml }} />
        </section>
    );
}

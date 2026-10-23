import { Fragment, useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './servicios.css';

const WA = `https://wa.me/5493513904389?text=${encodeURIComponent('Hola Gonzalo! Vi tus servicios y quiero contarte un proyecto.')}`;
const EMAIL = 'gonzaloevillagarcia@gmail.com';
const waFor = (servicio: string) =>
    `https://wa.me/5493513904389?text=${encodeURIComponent(`Hola Gonzalo! Vi tus servicios y me interesa ${servicio}. Te cuento mi proyecto:`)}`;

const SERVICES = [
    { a: 'Sitios y ', b: 'landings', d: 'Diseño y desarrollo orientados a conversión, con medición desde el día uno.' },
    { a: 'Apps y ', b: 'plataformas', d: 'Productos web y mobile, del research a producción.' },
    { a: '', b: 'Integraciones', d: 'Pagos, WhatsApp, CRM y automatizaciones.' },
    { a: 'Consultoría ', b: 'UX/UI', d: 'Auditorías, prototipos y design systems para equipos.' },
];

const STEPS = [
    { n: '01', t: 'Descubrimiento', d: 'Objetivos, usuarios y contexto del negocio.' },
    { n: '02', t: 'Propuesta', d: 'Alcance, inversión y roadmap de acuerdo al alcance del proyecto.' },
    { n: '03', t: 'Diseño y desarrollo', d: 'Iteraciones cortas con entregas semanales.' },
    { n: '04', t: 'Lanzamiento', d: 'Salida a producción, medición y ajustes.' },
];

const CASES = [
    { to: '/peditulavado', img: '/peditulavado-mockup.jpg', alt: 'Pantallas de Pedí tu lavado', t: 'Pedí tu lavado', d: 'Plataforma on-demand, de la idea a producción.' },
    { to: '/vertex', img: '/vertex-mock-hero.jpg', alt: 'Vertex en notebook y mobile', t: 'Vertex', d: 'Webapp multi-club para gestionar torneos de pádel.' },
    { to: '/zygma', img: '/zygmamobile.png', alt: 'Sitio de Zygma en celular', t: 'Zygma', d: 'Sitio institucional para una constructora.' },
];

const NAV = [
    { id: 'servicios', label: 'Servicios', hide: true },
    { id: 'proceso', label: 'Proceso', hide: true },
    { id: 'casos', label: 'Casos', hide: true },
    { id: 'contacto', label: 'Contacto', hide: false },
];

const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const ROWS: { cls: string; words: [string, boolean][] }[] = [
    { cls: 'r1', words: [['Webs', false], ['Apps', true], ['Integraciones', false], ['UX/UI', true]] },
    { cls: 'r2', words: [['Diseño', true], ['Desarrollo', false], ['Lanzamiento', true], ['Motion', false]] },
    { cls: 'r3', words: [['Apps', false], ['Integraciones', true], ['UX/UI', false], ['Webs', true]] },
];

function Preview({ i }: { i: number }) {
    if (i === 0) return <div className="mini web"><i className="b1" /><i className="b2" /><i className="b3" /><i className="b4" /><i className="im" /></div>;
    if (i === 1) return <div className="mini app"><div className="ph2"><i className="r r1" /><i className="r r2" /><i className="r r3" /><i className="cta" /></div></div>;
    if (i === 2) return <div className="mini int"><i className="nd n1" /><i className="nd n2" /><i className="nd n3" /><i className="wire w1" /><i className="wire w2" /><i className="pulse" /></div>;
    if (i === 3) return (
        <div className="mini ux">
            <i className="bx x1" /><i className="bx x2" /><i className="bx x3" />
            <svg className="cr" viewBox="0 0 24 24"><path d="M5 3l14 8-6 1.5L10 19z" fill="#F2F2F2" /></svg>
        </div>
    );
    return null;
}

export default function Servicios() {
    const pageRef = useRef<HTMLDivElement>(null);
    const [hov, setHov] = useState(-1);
    const [active, setActive] = useState('');

    // Marca en el menú la sección que se está viendo
    useEffect(() => {
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
            { rootMargin: '-45% 0px -50% 0px' },
        );
        NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el); });
        const top = () => { if (window.scrollY < 200) setActive(''); };
        window.addEventListener('scroll', top, { passive: true });
        return () => { io.disconnect(); window.removeEventListener('scroll', top); };
    }, []);

    // En pantallas grandes el sitio usa zoom (ver index.css): las coordenadas del mouse
    // vienen sin zoom, así que se dividen por el factor para que el punto siga al puntero.
    const zoom = () => parseFloat(getComputedStyle(document.documentElement).zoom) || 1;
    const moveCursor = (e: MouseEvent<HTMLDivElement>) => {
        const z = zoom();
        pageRef.current?.style.setProperty('--cx', `${e.clientX / z}px`);
        pageRef.current?.style.setProperty('--cy', `${e.clientY / z}px`);
    };
    const movePreview = (e: MouseEvent<HTMLDivElement>) => {
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        const z = zoom();
        el.style.setProperty('--px', `${(e.clientX - r.left) / z}px`);
        el.style.setProperty('--py', `${(e.clientY - r.top) / z}px`);
    };

    return (
        <div ref={pageRef} className="sv" onMouseMove={moveCursor}>
            <div className="prog" aria-hidden="true" />
            <div className="cdot" aria-hidden="true" />

            <header className="nav">
                <div className="wrap in">
                    <button type="button" className="brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Gonzalo E. Villagarcía</button>
                    <nav aria-label="Secciones" className="links">
                        {NAV.map((n) => (
                            <button
                                key={n.id}
                                type="button"
                                onClick={() => goTo(n.id)}
                                className={[n.hide ? 'hide' : '', n.id === 'contacto' ? 'ct' : '', active === n.id ? 'on' : ''].join(' ').trim() || undefined}
                                aria-current={active === n.id ? 'true' : undefined}
                            >
                                {n.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </header>

            <section className="hero">
                <div className="glow" aria-hidden="true" />
                <div className="rows" aria-hidden="true">
                    {ROWS.map((row) => (
                        <div key={row.cls} className={`row ${row.cls}`}>
                            <div className="track">
                                {[...row.words, ...row.words, ...row.words, ...row.words].map(([w, ol], k) => (
                                    <Fragment key={k}>
                                        <span className={ol ? 'ol' : undefined}>{w}</span>
                                        <i />
                                    </Fragment>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="me">
                    <img src="/gonzalo-sentado.webp" alt="Gonzalo Villagarcía, sentado en un puff negro" />
                </div>
                <div className="shade" aria-hidden="true" />

                <div className="heroCopy">
                    <div className="wrap">
                        <div className="inner">
                            <p className="lbl fu hlbl">Servicios para empresas y emprendedores</p>
                            <h1 className="ttl" aria-label="Webs, apps e integraciones para tu negocio.">
                                <span className="ln" aria-hidden="true"><span style={{ '--i': 0, fontWeight: 200 } as CSSProperties}>Webs, apps e</span></span>
                                <span className="ln" aria-hidden="true"><span style={{ '--i': 1, fontWeight: 700 } as CSSProperties}>integraciones</span></span>
                                <span className="ln" aria-hidden="true"><span className="it" style={{ '--i': 2 } as CSSProperties}>(para tu negocio).</span></span>
                            </h1>
                            <p className="fu hsub">
                                Diseño y desarrollo con foco en tu negocio.
                            </p>
                            <div className="fu hcta">
                                <a className="btn btn-p" href={WA} target="_blank" rel="noopener noreferrer">Contame tu proyecto</a>
                                <a className="btn btn-g hsec" href="#servicios">Ver servicios</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="servicios" className="wrap" style={{ paddingTop: 120, scrollMarginTop: 80 }}>
                <div className="rv">
                    <p className="lbl" style={{ margin: '0 0 16px' }}>01 — Servicios</p>
                    <h2 className="h2" style={{ marginBottom: 36 }}><span className="l">Qué </span><span className="b">hago.</span></h2>
                </div>
                <div className="svcList" onMouseMove={movePreview} onMouseLeave={() => setHov(-1)}>
                    <div className={hov >= 0 ? 'pv on' : 'pv'} aria-hidden="true"><Preview i={hov} /></div>
                    {SERVICES.map((s, i) => (
                        <a
                            key={s.b}
                            className="svc"
                            href={waFor(`${s.a}${s.b}`.toLowerCase())}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Consultar por ${s.a}${s.b} por WhatsApp`}
                            onMouseEnter={() => setHov(i)}
                        >
                            <span className="t">{s.a}<b>{s.b}</b></span>
                            <span className="d">{s.d}</span>
                            <span className="go">Consultar <span aria-hidden="true">→</span></span>
                        </a>
                    ))}
                </div>
            </section>

            <section id="proceso" className="wrap" style={{ paddingTop: 128, scrollMarginTop: 40 }}>
                <div className="rv">
                    <p className="lbl" style={{ margin: '0 0 16px' }}>02 — Proceso</p>
                    <h2 className="h2" style={{ marginBottom: 40 }}><span className="l">Cómo </span><span className="b">trabajo.</span></h2>
                </div>
                <div className="pline" aria-hidden="true"><i /></div>
                <div className="steps">
                    {STEPS.map((s, i) => (
                        <div key={s.n} className="step" style={{ '--s': `${i * 8}%` } as CSSProperties}>
                            <b>{s.n}</b><h3>{s.t}</h3><p>{s.d}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section id="casos" className="wrap" style={{ paddingTop: 128, scrollMarginTop: 40 }}>
                <div className="rv" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap', marginBottom: 40 }}>
                    <div>
                        <p className="lbl" style={{ margin: '0 0 16px' }}>03 — Casos</p>
                        <h2 className="h2"><span className="l">Casos de </span><span className="b">éxito.</span></h2>
                    </div>
                    <Link className="btn btn-g" to="/#work">Ver todo el portfolio</Link>
                </div>
                <div className="cases">
                    {CASES.map((c) => (
                        <Link key={c.to} className="case" to={c.to}>
                            <div className="im"><img src={c.img} alt={c.alt} loading="lazy" /></div>
                            <h3>{c.t}</h3>
                            <p>{c.d}</p>
                            <span className="go">Ver caso</span>
                        </Link>
                    ))}
                </div>
            </section>

            <section id="contacto" className="relative w-full min-h-screen flex flex-col justify-center items-center px-6 text-center" style={{ scrollMarginTop: 0 }}>
                <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] max-w-full bg-[#9FD592]/5 rounded-full blur-[180px] pointer-events-none" aria-hidden="true" />
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    <h2 className="text-[9vw] md:text-[4.5vw] font-light tracking-tighter leading-[0.95] text-neutral-400 uppercase mb-4 md:mb-5">¿Tenés una idea?</h2>
                    <h2 className="text-[13vw] md:text-[8vw] font-black tracking-tighter leading-[0.9] text-[#9FD592] mb-12 uppercase">
                        <span className="block md:inline">Hagámosla</span> real.
                    </h2>
                    <a href={`mailto:${EMAIL}`} className="group relative inline-block text-lg md:text-2xl font-light text-neutral-400 hover:text-[#9FD592] transition-colors duration-500">
                        {EMAIL}
                        <span className="absolute -bottom-2 left-0 w-0 h-px bg-[#9FD592] transition-all duration-500 group-hover:w-full" />
                    </a>
                    <div className="flex flex-wrap justify-center gap-4 mt-14">
                        <a
                            href={WA}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-10 py-4 bg-[#9FD592] border border-[#9FD592] rounded-full text-xs tracking-widest uppercase text-[#0a0a0a] hover:bg-transparent hover:text-[#9FD592] transition-all duration-500 outline-none font-medium"
                        >
                            Escribime por WhatsApp
                        </a>
                        <Link
                            to="/#work"
                            className="px-10 py-4 border border-[#9FD592]/60 rounded-full text-xs tracking-widest uppercase text-neutral-300 hover:bg-[#9FD592] hover:border-[#9FD592] hover:text-[#0a0a0a] transition-all duration-500 outline-none font-medium"
                        >
                            Ver portfolio
                        </Link>
                    </div>
                </motion.div>
            </section>

            <footer className="wrap">
                <div className="foot">
                    <span>© 2026 Gonzalo Villagarcía</span>
                    <div style={{ display: 'flex', gap: 32 }}>
                        <a href="https://www.linkedin.com/in/gonzalovillagarcia/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        <a href="https://github.com/GonzaloVillagarcia?tab=repositories" target="_blank" rel="noopener noreferrer">GitHub</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

import { Fragment, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import './servicios.css';

const WA = `https://wa.me/5493513904389?text=${encodeURIComponent('Hola Gonzalo! Vi tus servicios y quiero contarte un proyecto.')}`;
const EMAIL = 'gonzaloevillagarcia@gmail.com';

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

    const moveCursor = (e: MouseEvent<HTMLDivElement>) => {
        pageRef.current?.style.setProperty('--cx', `${e.clientX}px`);
        pageRef.current?.style.setProperty('--cy', `${e.clientY}px`);
    };
    const movePreview = (e: MouseEvent<HTMLDivElement>) => {
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--px', `${e.clientX - r.left}px`);
        el.style.setProperty('--py', `${e.clientY - r.top}px`);
    };

    return (
        <div ref={pageRef} className="sv" onMouseMove={moveCursor}>
            <div className="prog" aria-hidden="true" />
            <div className="cdot" aria-hidden="true" />

            <header className="nav">
                <div className="wrap in">
                    <Link to="/" className="brand">Gonzalo E. Villagarcía</Link>
                    <nav aria-label="Principal" className="links">
                        <Link className="hide" to="/#work">Work</Link>
                        <Link className="hide" to="/#about">About</Link>
                        <a className="on" href="#servicios">Servicios</a>
                        <a className="ct" href="#contacto">Contacto</a>
                    </nav>
                </div>
            </header>

            <section className="hero">
                <div className="glow" aria-hidden="true" />
                <div className="rows" aria-hidden="true">
                    {ROWS.map((row) => (
                        <div key={row.cls} className={`row ${row.cls}`}>
                            <div className="track">
                                {[...row.words, ...row.words].map(([w, ol], k) => (
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
                            <p className="lbl fu" style={{ margin: '0 0 24px', color: '#9A9A9A' }}>Servicios para empresas y emprendedores</p>
                            <h1 className="ttl" aria-label="Webs, apps e integraciones para tu negocio.">
                                <span className="ln" aria-hidden="true"><span style={{ '--i': 0, fontWeight: 200 } as CSSProperties}>Webs, apps e</span></span>
                                <span className="ln" aria-hidden="true"><span style={{ '--i': 1, fontWeight: 700 } as CSSProperties}>integraciones</span></span>
                                <span className="ln" aria-hidden="true"><span className="it" style={{ '--i': 2 } as CSSProperties}>(para tu negocio).</span></span>
                            </h1>
                            <p className="fu" style={{ margin: '28px 0 0', fontSize: 19, fontWeight: 300, lineHeight: 1.5, color: '#C4C4C4', maxWidth: '26em' }}>
                                Diseño y desarrollo con foco en tu negocio.
                            </p>
                            <div className="fu" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 32 }}>
                                <a className="btn btn-p" href={WA} target="_blank" rel="noopener noreferrer">Contame tu proyecto</a>
                                <a className="btn btn-g" href="#servicios">Ver servicios</a>
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
                        <a key={s.b} className="svc" href={WA} target="_blank" rel="noopener noreferrer" onMouseEnter={() => setHov(i)}>
                            <span className="t">{s.a}<b>{s.b}</b></span>
                            <span className="d">{s.d}</span>
                        </a>
                    ))}
                </div>
            </section>

            <section className="wrap" style={{ paddingTop: 128 }}>
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

            <section className="wrap" style={{ paddingTop: 128 }}>
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

            <section id="contacto" className="wrap" style={{ paddingTop: 160, paddingBottom: 120, scrollMarginTop: 40 }}>
                <p className="lbl" style={{ margin: '0 0 16px' }}>¿Tenés un proyecto en mente?</p>
                <h2 className="bigcta"><span style={{ fontWeight: 200, color: '#FAFAFA' }}>Hablemos</span><span style={{ fontWeight: 700, color: '#9FD592' }}>.</span></h2>
                <p style={{ margin: '28px 0 0', fontSize: 18, fontWeight: 300, color: '#D4D4D4', maxWidth: '30em' }}>
                    Contame el contexto y el objetivo. Te respondo con los próximos pasos.
                </p>
                <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center', marginTop: 36 }}>
                    <a className="btn btn-p" href={WA} target="_blank" rel="noopener noreferrer">Escribime por WhatsApp</a>
                    <a href={`mailto:${EMAIL}`} style={{ fontSize: 15, color: '#8A8A8A', textDecoration: 'none' }}>{EMAIL}</a>
                </div>
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

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const yImage = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const yText = useTransform(scrollYProgress, [0, 1], [0, 100]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const skills = [
        "Claudecode", "Antigravity", "Nano banana",
        "Gemini", "Supabase", "Vercel",
        "Webflow", "HTML / CSS", "Figma",
        "Illustrator", "Photoshop", "After Effects",
        "AI Driven Workflows", "Product Management"
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-neutral-50 flex flex-col items-center px-6 md:px-12 lg:px-24 selection:bg-[#9FD592] selection:text-[#0a0a0a]">

            {/* --- NAVBAR --- */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-neutral-900/50">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-20">
                    <span
                        onClick={() => scrollToSection('home')}
                        className="text-neutral-200 font-light tracking-[0.15em] text-xs cursor-pointer hover:opacity-70 transition-opacity uppercase"
                    >
                        Gonzalo E. Villagarcía
                    </span>
                    <div className="flex gap-6 md:gap-10 text-[10px] md:text-xs tracking-[0.2em] uppercase text-neutral-500 font-medium">
                        <button onClick={() => scrollToSection('work')} className="hover:text-neutral-50 transition-colors duration-300 outline-none">Work</button>
                        <button onClick={() => scrollToSection('about')} className="hover:text-neutral-50 transition-colors duration-300 outline-none">About</button>
                        <button onClick={() => scrollToSection('contact')} className="hover:text-neutral-50 transition-colors duration-300 outline-none">Contact</button>
                    </div>
                </div>
            </nav>

            {/* --- HERO SECTION --- */}
            <div id="home" className="max-w-6xl w-full min-h-screen flex flex-col justify-center pt-20 scroll-mt-20 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#9FD592]/5 rounded-full blur-[150px] pointer-events-none"></div>

                <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-8 relative z-10 font-medium">
                    Córdoba, Argentina
                </motion.h2>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-6xl md:text-[6rem] lg:text-[7.5rem] font-light tracking-tighter leading-[0.9] uppercase mb-12 relative z-10"
                >
                    UX/UI <span className="text-[#9FD592] font-medium">&</span> GRAPHICS <br />
                    <span className="text-neutral-600 italic font-thin">Designer.</span>
                </motion.h1>
                <motion.p className="text-xl md:text-2xl text-neutral-400 font-light max-w-2xl leading-relaxed mb-12 relative z-10">
                    Transformo identidades visuales en productos digitales de alto impacto, potenciando cada flujo con Inteligencia Artificial.
                </motion.p>

                <button
                    onClick={() => scrollToSection('work')}
                    className="w-fit px-10 py-4 border border-[#9FD592]/60 rounded-full text-xs tracking-widest uppercase text-neutral-300 hover:bg-[#9FD592] hover:border-[#9FD592] hover:text-[#0a0a0a] transition-all duration-500 relative z-10 outline-none font-medium"
                >
                    Explore Projects
                </button>
            </div>

            {/* --- SELECTED WORK SECTION --- */}
            <div id="work" className="max-w-7xl w-full scroll-mt-32 pt-12 pb-24 md:pb-32 relative z-10">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-[8vw] md:text-[4vw] font-light tracking-tighter leading-none mb-16 uppercase text-neutral-50"
                >
                    Selected <span className="font-light text-[#9FD592]">Work.</span>
                </motion.h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {/* FILA 1: 1 PROYECTO (LARGE) */}
                    {/* PROYECTO 1: PEDI TU LAVADO */}
                    <Link to="/peditulavado" className="block outline-none md:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                            className="group relative aspect-square md:aspect-[16/9] bg-neutral-900 border border-neutral-800/50 rounded-2xl overflow-hidden cursor-pointer shadow-[0_0_40px_rgba(0,0,0,0.4)]"
                        >
                            <img
                                src="/perfilcliente2.png"
                                alt="PediTuLavado Preview"
                                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent z-10 opacity-90 transition-opacity duration-700 group-hover:opacity-70"></div>
                            <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <span className="inline-block border border-[#9FD592]/30 text-[#9FD592] text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-full mb-4 font-bold bg-[#9FD592]/10">
                                    Founder
                                </span>
                                <h4 className="text-4xl md:text-5xl font-light tracking-tight mb-2">Pedí tu lavado</h4>
                                <p className="text-neutral-400 text-base font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 max-w-md">
                                    Logística de servicios On-Demand.
                                </p>
                            </div>
                        </motion.div>
                    </Link>

                    {/* FILA 2: 2 PROYECTOS (SMALL) */}
                    {/* PROYECTO 2: RS CONNECTING */}
                    <Link to="/rsconnecting" className="block outline-none md:mt-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                            className="group relative aspect-[4/5] bg-neutral-900 border border-neutral-800/50 rounded-2xl overflow-hidden cursor-pointer shadow-[0_0_40px_rgba(0,0,0,0.4)]"
                        >
                            <img
                                src="/rs-home-mockup.png"
                                alt="RS Connecting Identity"
                                className="absolute inset-0 w-full h-full object-cover object-[center_60%] group-hover:scale-105 transition-all duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent z-10 opacity-90 transition-opacity duration-700 group-hover:opacity-70"></div>
                            <div className="absolute bottom-0 left-0 p-8 z-20 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <span className="inline-block border border-[#e34d6d]/30 text-[#e34d6d] text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-full mb-4 font-bold bg-[#e34d6d]/10">
                                    Brand Identity
                                </span>
                                <h4 className="text-3xl font-light tracking-tight mb-2">RS Connecting</h4>
                                <p className="text-neutral-400 text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    Reclutamiento IT a nivel LATAM.
                                </p>
                            </div>
                        </motion.div>
                    </Link>

                    {/* PROYECTO 3: LOS TUCUS */}
                    <Link to="/lostucus" className="block outline-none md:mt-32">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="group relative aspect-[4/5] bg-neutral-900 border border-neutral-800/50 rounded-2xl overflow-hidden cursor-pointer shadow-[0_0_40px_rgba(0,0,0,0.4)]"
                        >
                            <img
                                src="/tucus-box1.png"
                                alt="Los Tucus Branding"
                                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent z-10 opacity-90 transition-opacity duration-700 group-hover:opacity-70"></div>
                            <div className="absolute bottom-0 left-0 p-8 z-20 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <span className="inline-block border border-[#d5a05a]/30 text-[#d5a05a] text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-full mb-4 font-bold bg-[#d5a05a]/10">
                                    Food Branding & D2C
                                </span>
                                <h4 className="text-3xl font-light tracking-tight mb-2">Los Tucus Empanadas</h4>
                                <p className="text-neutral-400 text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 max-w-md">
                                    Identidad visual y packaging para modelo de negocio de congelados direct-to-consumer.
                                </p>
                            </div>
                        </motion.div>
                    </Link>

                    {/* FILA 3: 1 PROYECTO (LARGE) */}
                    {/* PROYECTO 4: BROOKLYN'S */}
                    <Link to="/brooklyns" className="block outline-none md:col-span-2 md:mt-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                            className="group relative aspect-square md:aspect-[16/9] bg-neutral-900 border border-neutral-800/50 rounded-2xl overflow-hidden cursor-pointer shadow-[0_0_40px_rgba(0,0,0,0.4)]"
                        >
                            <img
                                src="/brooklyns-home-mockup.jpg"
                                alt="Brooklyn's Branding"
                                className="absolute inset-0 w-full h-full object-cover object-[center_45%] group-hover:scale-105 transition-all duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent z-10 opacity-90 transition-opacity duration-700 group-hover:opacity-70"></div>
                            <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <span className="inline-block border border-[#c0e600]/30 text-[#c0e600] text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-full mb-4 font-bold bg-[#c0e600]/10">
                                    Branding
                                </span>
                                <h4 className="text-4xl md:text-5xl font-light tracking-tight mb-2">Brooklyn’s</h4>
                                <p className="text-neutral-400 text-base font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 max-w-md">
                                    Identidad visual y sistema de marca con espíritu urbano.
                                </p>
                            </div>
                        </motion.div>
                    </Link>

                    {/* FILA 4: 2 PROYECTOS (SMALL) */}
                    {/* PROYECTO 5: 361 CASA DE PASTAS */}
                    <Link to="/361casadepastas" className="block outline-none md:mt-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                            className="group relative aspect-[4/5] bg-[#0d0b0a] border border-white/5 rounded-2xl overflow-hidden cursor-pointer shadow-[0_0_40px_rgba(0,0,0,0.4)]"
                        >
                            <img
                                src="/361-packaging.png"
                                alt="361 Identidad"
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b0a] via-transparent to-transparent z-10 opacity-90 transition-opacity duration-700 group-hover:opacity-70"></div>
                            <div className="absolute bottom-0 left-0 p-8 z-20 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <span className="inline-block border border-[#a34d35]/30 text-[#a34d35] text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-full mb-4 font-bold bg-[#a34d35]/10 font-sans">
                                    Branding
                                </span>
                                <h4 className="text-3xl font-light tracking-tight mb-2 text-white italic" style={{ fontFamily: 'serif' }}>361 Casa de Pastas</h4>
                                <p className="text-neutral-400 text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 font-sans">
                                    Identidad visual urbana.
                                </p>
                            </div>
                        </motion.div>
                    </Link>

                    {/* PROYECTO 6: DON QUIJOTE */}
                    <Link to="/donquijote" className="block outline-none md:mt-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                            className="group relative aspect-[4/5] bg-[#16100c] border border-[#3a281c]/30 rounded-2xl overflow-hidden cursor-pointer shadow-[0_0_40px_rgba(0,0,0,0.4)]"
                        >
                            <img
                                src="/quijote-menu.png"
                                alt="Don Quijote Identity"
                                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent z-10 opacity-90 transition-opacity duration-700 group-hover:opacity-70"></div>
                            <div className="absolute bottom-0 left-0 p-8 z-20 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <span className="inline-block border border-[#c28e6c]/30 text-[#c28e6c] text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-full mb-4 font-bold bg-[#c28e6c]/10">
                                    Branding
                                </span>
                                <h4 className="text-3xl font-light tracking-tight mb-2 text-[#e8dccb]" style={{ fontFamily: "'ACaslonPro-Regular', Georgia, serif" }}>Don Quijote</h4>
                                <p className="text-[#a89582] text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    Gastronomía de categoría.
                                </p>
                            </div>
                        </motion.div>
                    </Link>

                    {/* FILA 5: 1 PROYECTO (LARGE) */}
                    {/* PROYECTO 7: ACADEMIA DE RIEGO */}
                    <Link to="/academiaderiego" className="block outline-none md:col-span-2 md:mt-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "0px" }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                            className="group relative aspect-square md:aspect-[16/9] bg-neutral-900 border border-neutral-800/50 rounded-2xl overflow-hidden cursor-pointer shadow-[0_0_40px_rgba(0,0,0,0.4)]"
                        >
                            <img
                                src="/riego-brandbook.png"
                                alt="Academia de Riego Brandbook"
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#003D7F]/40 to-transparent z-10 opacity-90 transition-opacity duration-700 group-hover:opacity-70"></div>
                            <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <span className="inline-block border border-[#C1D000]/30 text-[#C1D000] text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-full mb-4 font-bold bg-[#C1D000]/10">
                                    AgTech Branding
                                </span>
                                <h4 className="text-3xl md:text-5xl font-light tracking-tight mb-2 text-white">Academia de Riego</h4>
                                <p className="text-neutral-300 text-base font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 max-w-md">
                                    Arquitectura de marca e identidad visual by Kilimo.
                                </p>
                            </div>
                        </motion.div>
                    </Link>


                </div>
            </div>

            {/* --- ABOUT SECTION --- */}
            <section id="about" ref={containerRef} className="w-full max-w-7xl py-32 md:py-40 relative overflow-hidden scroll-mt-20 z-10">
                <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden">
                    <div className="w-[150vw] h-[150vw] animate-[spin_60s_linear_infinite]">
                        <svg viewBox="0 0 1000 1000" className="w-full h-full fill-current text-[#9FD592]">
                            <path id="giantTextPath" d="M 500, 500 m -450, 0 a 450,450 0 1,1 900,0 a 450,450 0 1,1 -900,0" fill="none" />
                            <text className="text-[40px] tracking-[0.4em] uppercase font-bold">
                                <textPath href="#giantTextPath" startOffset="0%">
                                    UX/UI & Graphics Designer • Gonzalo Villagarcía • AI Driven Workflows • Figma • Web3 •
                                </textPath>
                            </text>
                        </svg>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center z-10 relative">
                    <motion.div style={{ y: yImage }} className="lg:col-span-5 relative group">
                        <div className="absolute -inset-4 border border-neutral-900 rounded-2xl -z-10 group-hover:inset-0 transition-all duration-700"></div>
                        <div className="aspect-square lg:aspect-[3/4] max-w-sm mx-auto lg:max-w-none lg:mx-0 overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800 relative z-10">
                            <img
                                src="/porfolio.png"
                                alt="Gonzalo Villagarcía"
                                className="w-full h-full object-cover transition-all duration-1000 ease-in-out relative z-0 group-hover:scale-105"
                            />
                        </div>
                    </motion.div>

                    <motion.div style={{ y: yText }} className="lg:col-span-7 space-y-16 pt-12 lg:pt-0">
                        <div className="space-y-8">
                            <span className="block text-neutral-500 text-xs tracking-[0.2em] uppercase font-medium">Sobre Mí</span>
                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter leading-tight uppercase text-neutral-200">
                                Visión enfocada en <br /> la <span className="text-[#9FD592]">funcionalidad.</span>
                            </h3>
                            <div className="text-base md:text-lg text-neutral-400 font-light leading-relaxed max-w-xl space-y-6">
                                <p className="flex items-center gap-4 text-neutral-300 font-light tracking-wide">
                                    <span className="text-[#9FD592] font-medium">6+ Años</span> de trayectoria visual.
                                    <span className="text-neutral-700">|</span>
                                    <span className="text-[#9FD592] font-medium">4+ Años</span> en IT & Fintech.
                                </p>
                                <p>Soy un diseñador con raíces visuales que evolucionó hacia el UX/UI para impactar directamente en la esencia de los productos digitales.</p>
                                <p>Tras más de 4 años simplificando la complejidad de entornos IT y Fintech, hoy me dedico a transformar sistemas robustos en experiencias limpias y ágiles.</p>
                            </div>
                        </div>

                        <div>
                            <span className="block text-[10px] tracking-[0.4em] uppercase text-neutral-600 font-medium mb-6">Toolstack & Expertise</span>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {skills.map((skill) => (
                                    <motion.div
                                        key={skill}
                                        whileHover={{ scale: 1.03, y: -2 }}
                                        className="flex justify-center items-center w-full px-4 py-3 border border-[#9FD592]/30 rounded-lg text-[10px] md:text-[11px] font-bold tracking-[0.1em] uppercase text-center text-[#9FD592] bg-[#9FD592]/5 hover:bg-[#9FD592] hover:text-[#0a0a0a] transition-all duration-300 cursor-default"
                                    >
                                        {skill}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- CONTACT / FOOTER --- */}
            <div id="contact" className="w-full min-h-screen flex flex-col justify-center items-center relative scroll-mt-0 pb-12 z-10">
                <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#9FD592]/5 rounded-full blur-[180px] pointer-events-none z-0"></div>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center relative z-10"
                >
                    <h2 className="text-[10vw] md:text-[6vw] font-light tracking-tighter leading-[0.8] text-neutral-400 uppercase">¿Tenés una idea?</h2>
                    <h2 className="text-[12vw] md:text-[8vw] font-black tracking-tighter leading-[0.9] text-neutral-50 mb-12 uppercase">
                        Hagámosla <span className="text-[#9FD592]">real.</span>
                    </h2>
                    <a href="mailto:gonzaloevillagarcia@gmail.com" className="group relative text-lg md:text-2xl font-light text-neutral-400 hover:text-[#9FD592] transition-colors duration-500">
                        gonzaloevillagarcia@gmail.com
                        <span className="absolute -bottom-2 left-0 w-0 h-px bg-[#9FD592] transition-all duration-500 group-hover:w-full"></span>
                    </a>
                </motion.div>

                <div className="absolute bottom-8 lg:bottom-12 w-full max-w-7xl px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-neutral-600 z-10">
                    <span className="font-medium">© 2026 Gonzalo Villagarcía</span>
                    <div className="flex gap-8 font-medium">
                        <a href="https://www.linkedin.com/in/gonzalovillagarcia/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">LinkedIn</a>
                        <a href="https://github.com/GonzaloVillagarcia?tab=repositories" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">GitHub</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
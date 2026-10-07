import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';

const CONTACT_EMAIL = 'gonzaloevillagarcia@gmail.com';
const CV_URL = '/cv-gonzalo-villagarcia.pdf';

// --- EMAIL: clic para copiar, con feedback visual ---
function CopyEmailButton() {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(CONTACT_EMAIL);
        } catch {
            return;
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            type="button"
            onClick={handleCopy}
            className="group relative text-lg md:text-2xl font-light text-neutral-400 hover:text-[#9FD592] transition-colors duration-500"
        >
            {CONTACT_EMAIL}
            <span className="absolute -bottom-2 left-0 w-0 h-px bg-[#9FD592] transition-all duration-500 group-hover:w-full"></span>
            <AnimatePresence>
                {copied && (
                    <motion.span
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.25 }}
                        className="absolute left-1/2 -translate-x-1/2 -bottom-10 text-xs font-medium tracking-widest uppercase text-[#9FD592] whitespace-nowrap"
                    >
                        ¡Copiado!
                    </motion.span>
                )}
            </AnimatePresence>
        </button>
    );
}

// --- PROYECTO DESTACADO: imagen con el mismo tratamiento hero de antes (tilt 3D + beam) ---
function FeaturedImage() {
    const px = useMotionValue(0.5);
    const py = useMotionValue(0.5);

    const rotateX = useSpring(useTransform(py, [0, 1], [6, -6]), { stiffness: 150, damping: 18 });
    const rotateY = useSpring(useTransform(px, [0, 1], [-6, 6]), { stiffness: 150, damping: 18 });

    return (
        <Link to="/peditulavado" className="block outline-none group" style={{ perspective: 1400 }}>
            <motion.div
                onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    px.set((e.clientX - rect.left) / rect.width);
                    py.set((e.clientY - rect.top) / rect.height);
                }}
                onMouseLeave={() => {
                    px.set(0.5);
                    py.set(0.5);
                }}
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                className="relative aspect-[3/2] rounded-2xl"
            >
                {/* Haz de luz giratorio en el borde (beam) */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <motion.div
                        aria-hidden
                        animate={{ rotate: 360 }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                        className="absolute left-1/2 top-1/2 h-[190%] w-[190%] -translate-x-1/2 -translate-y-1/2"
                        style={{
                            background:
                                'conic-gradient(from 0deg, transparent 0deg, transparent 250deg, rgba(159,213,146,0.9) 305deg, rgba(159,213,146,0) 340deg, transparent 360deg)',
                        }}
                    />
                </div>

                <div className="absolute inset-[1.5px] rounded-[15px] overflow-hidden bg-neutral-900 shadow-[0_30px_80px_-25px_rgba(0,0,0,0.85)] transition-shadow duration-700 group-hover:shadow-[0_40px_110px_-30px_rgba(159,213,146,0.28)]">
                    <picture>
                        <source srcSet="/peditulavado-mockup.webp" type="image/webp" />
                        <img
                            src="/peditulavado-mockup.jpg"
                            alt="Pantallas de Pedí tu lavado: mapa de lavadores y selección de servicios"
                            width={2000}
                            height={1333}
                            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                    </picture>
                </div>
            </motion.div>
        </Link>
    );
}

const FEATURED_STATS = [
    { value: '+150', label: 'usuarios entre clientes y lavadores' },
    { value: '100% web', label: 'sin descargar una app' },
    { value: 'En TV local', label: 'El Show del Lagarto' },
];

function FeaturedProject() {
    return (
        <section id="destacado" className="max-w-7xl w-full scroll-mt-28 pb-24 md:pb-40 relative z-10">
            <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="block text-neutral-500 text-xs tracking-[0.2em] uppercase font-medium mb-8"
            >
                Proyecto destacado
            </motion.span>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative rounded-3xl border border-[#9FD592]/15 bg-gradient-to-br from-[#9FD592]/[0.07] via-neutral-950 to-[#0a0a0a] p-6 md:p-12 xl:p-16 overflow-hidden"
            >
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#9FD592]/10 rounded-full blur-[150px] pointer-events-none"></div>

                <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                    <div className="lg:col-span-6 order-2 lg:order-1">
                        <span className="inline-block border border-[#9FD592]/30 text-[#9FD592] text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-full mb-6 font-bold bg-[#9FD592]/10">
                            Proyecto propio · Founder & Product Designer
                        </span>
                        <h3 className="text-5xl md:text-7xl font-light tracking-tighter leading-[0.95] text-white mb-6">
                            Pedí tu <span className="text-[#9FD592] font-medium">lavado</span>
                        </h3>
                        <p className="text-base md:text-lg text-neutral-300 font-light leading-relaxed mb-10 max-w-md">
                            Diseñé y lancé una plataforma on-demand de lavado de autos a domicilio, de la idea a producción.
                        </p>

                        <div className="grid grid-cols-3 gap-4 sm:flex sm:justify-between sm:gap-6 border-t border-neutral-800 pt-8 mb-10">
                            {FEATURED_STATS.map((stat) => (
                                <div key={stat.value}>
                                    <span className="block text-xl sm:text-3xl lg:text-[1.75rem] xl:text-[2rem] font-light tracking-tight leading-none text-[#9FD592] mb-2 sm:whitespace-nowrap">
                                        {stat.value}
                                    </span>
                                    <span className="block text-[11px] md:text-xs text-neutral-500 font-light leading-snug sm:max-w-[10rem]">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/peditulavado"
                                className="w-fit px-8 py-4 bg-[#9FD592] border border-[#9FD592] rounded-full text-xs tracking-widest uppercase text-[#0a0a0a] hover:bg-transparent hover:text-[#9FD592] transition-all duration-500 outline-none font-medium"
                            >
                                Ver caso de estudio
                            </Link>
                            <a
                                href="https://www.peditulavado.com.ar"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-fit inline-flex items-center gap-2 px-8 py-4 border border-[#9FD592]/60 rounded-full text-xs tracking-widest uppercase text-neutral-300 hover:bg-[#9FD592] hover:border-[#9FD592] hover:text-[#0a0a0a] transition-all duration-500 outline-none font-medium"
                            >
                                Visitar plataforma
                                <svg aria-hidden viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M3 9L9 3M4 3h5v5" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-6 order-1 lg:order-2">
                        <FeaturedImage />
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

// --- TÍTULO DE BLOQUE DE PROYECTOS ---
function SectionHeading({ eyebrow, title, accent }: { eyebrow: string; title: string; accent: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12 md:mb-16"
        >
            <span className="block text-neutral-500 text-xs tracking-[0.2em] uppercase font-medium mb-4">{eyebrow}</span>
            <h3 className="text-[8vw] md:text-[4vw] font-light tracking-tighter leading-none uppercase text-neutral-50">
                {title} <span className="text-[#9FD592]">{accent}</span>
            </h3>
        </motion.div>
    );
}

// --- PROYECTOS DE BRANDING: grilla compacta, cada uno conserva su color de marca ---
type BrandProject = {
    to: string;
    img: string;
    alt: string;
    imgPosition?: string;
    tag: string;
    color: string;
    title: string;
    titleClassName?: string;
    titleStyle?: CSSProperties;
    description: string;
    descriptionClassName?: string;
    cardClassName?: string;
};

const BRANDING_PROJECTS: BrandProject[] = [
    {
        to: '/rsconnecting',
        img: '/rs-home-mockup.png',
        alt: 'RS Connecting Identity',
        imgPosition: 'object-[center_60%]',
        tag: 'Brand Identity',
        color: '#e34d6d',
        title: 'RS Connecting',
        description: 'Reclutamiento IT a nivel LATAM.',
    },
    {
        to: '/lostucus',
        img: '/tucus-box1.png',
        alt: 'Los Tucus Branding',
        tag: 'Food Branding & D2C',
        color: '#d5a05a',
        title: 'Los Tucus Empanadas',
        description: 'Identidad visual y packaging para modelo de negocio de congelados direct-to-consumer.',
    },
    {
        to: '/brooklyns',
        img: '/brooklyns-home-mockup.jpg',
        alt: 'Brooklyn’s Branding',
        imgPosition: 'object-[center_45%]',
        tag: 'Branding',
        color: '#c0e600',
        title: 'Brooklyn’s',
        description: 'Identidad visual y sistema de marca con espíritu urbano.',
    },
    {
        to: '/361casadepastas',
        img: '/361-packaging.png',
        alt: '361 Identidad',
        tag: 'Branding',
        color: '#a34d35',
        title: '361 Casa de Pastas',
        titleClassName: 'text-white italic',
        titleStyle: { fontFamily: 'serif' },
        description: 'Identidad visual urbana.',
        cardClassName: 'bg-[#0d0b0a] border-white/5',
    },
    {
        to: '/donquijote',
        img: '/quijote-menu.png',
        alt: 'Don Quijote Identity',
        tag: 'Branding',
        color: '#c28e6c',
        title: 'Don Quijote',
        titleClassName: 'text-[#e8dccb]',
        titleStyle: { fontFamily: "'ACaslonPro-Regular', Georgia, serif" },
        description: 'Gastronomía de categoría.',
        descriptionClassName: 'text-[#a89582]',
        cardClassName: 'bg-[#16100c] border-[#3a281c]/30',
    },
    {
        to: '/academiaderiego',
        img: '/riego-brandbook.png',
        alt: 'Academia de Riego Brandbook',
        tag: 'AgTech Branding',
        color: '#C1D000',
        title: 'Academia de Riego',
        description: 'Arquitectura de marca e identidad visual by Kilimo.',
    },
];

function BrandCard({ project, index }: { project: BrandProject; index: number }) {
    return (
        <Link to={project.to} className="block outline-none">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: (index % 3) * 0.1, duration: 0.6 }}
                className={`group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer border shadow-[0_0_40px_rgba(0,0,0,0.4)] ${project.cardClassName ?? 'bg-neutral-900 border-neutral-800/50'}`}
            >
                <img
                    src={project.img}
                    alt={project.alt}
                    className={`absolute inset-0 w-full h-full object-cover ${project.imgPosition ?? 'object-center'} group-hover:scale-105 transition-all duration-700 ease-out`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent z-10 opacity-90 transition-opacity duration-700 group-hover:opacity-70"></div>
                <div className="absolute bottom-0 left-0 p-3 sm:p-6 z-20 w-full transform translate-y-0 md:translate-y-3 md:group-hover:translate-y-0 transition-transform duration-500">
                    <span
                        className="inline-block border text-[8px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.15em] uppercase px-2 sm:px-3 py-0.5 sm:py-1 rounded-full mb-2 sm:mb-3 leading-tight font-bold font-sans"
                        style={{ color: project.color, borderColor: `${project.color}4d`, backgroundColor: `${project.color}1a` }}
                    >
                        {project.tag}
                    </span>
                    <h4 className={`text-base sm:text-2xl font-light tracking-tight leading-tight mb-1 ${project.titleClassName ?? 'text-white'}`} style={project.titleStyle}>
                        {project.title}
                    </h4>
                    <p className={`hidden sm:block text-sm font-light opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100 ${project.descriptionClassName ?? 'text-neutral-400'}`}>
                        {project.description}
                    </p>
                </div>
            </motion.div>
        </Link>
    );
}

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

    const toolGroups = [
        { label: "Diseño", tools: ["Figma", "Illustrator", "Photoshop", "After Effects", "Webflow"] },
        { label: "Construcción con IA", tools: ["Claude Code", "Gemini", "Antigravity", "Nano Banana", "Supabase", "Vercel"] },
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-neutral-50 flex flex-col items-center px-6 md:px-12 lg:px-24 selection:bg-[#9FD592] selection:text-[#0a0a0a] w-full overflow-x-hidden">

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
                        <a href={CV_URL} download className="text-[#9FD592] hover:text-neutral-50 transition-colors duration-300 outline-none">CV</a>
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
                    Product <span className="text-[#9FD592] font-medium">Designer</span> <br />
                    <span className="text-neutral-600 italic font-thin">(UX/UI).</span>
                </motion.h1>
                <motion.p className="text-lg md:text-2xl text-neutral-300 font-light leading-relaxed mb-4 relative z-10 max-w-3xl">
                    Diseño productos digitales y los llevo a producción con desarrollo asistido por IA.
                </motion.p>
                <motion.p className="text-sm md:text-base text-neutral-500 font-light tracking-wide mb-12 relative z-10">
                    <span className="text-[#9FD592]">6+ años</span> en diseño
                    <span className="text-neutral-700 mx-3">|</span>
                    <span className="text-[#9FD592]">casi 4</span> en productos fintech y Web3
                </motion.p>

                <div className="flex flex-wrap gap-4 relative z-10">
                    <button
                        onClick={() => scrollToSection('work')}
                        className="w-fit px-10 py-4 bg-[#9FD592] border border-[#9FD592] rounded-full text-xs tracking-widest uppercase text-[#0a0a0a] hover:bg-transparent hover:text-[#9FD592] transition-all duration-500 outline-none font-medium"
                    >
                        Ver proyectos
                    </button>
                    <a
                        href={CV_URL}
                        download
                        className="w-fit px-10 py-4 border border-[#9FD592]/60 rounded-full text-xs tracking-widest uppercase text-neutral-300 hover:bg-[#9FD592] hover:border-[#9FD592] hover:text-[#0a0a0a] transition-all duration-500 outline-none font-medium"
                    >
                        Descargar CV
                    </a>
                </div>
            </div>

            {/* --- PROYECTO DESTACADO --- */}
            <FeaturedProject />

            {/* --- SELECTED WORK SECTION --- */}
            <div id="work" className="max-w-7xl w-full scroll-mt-32 pt-12 pb-24 md:pb-32 relative z-10">

                {/* BLOQUE 1: PRODUCTO / UX-UI */}
                <SectionHeading eyebrow="01 — Selected Work" title="Producto /" accent="UX-UI." />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {/* XCAPIT: se agrega acá cuando exista la página /xcapit (y su ruta en App.tsx) */}

                    {/* ZYGMA */}
                    <Link to="/zygma" className="block outline-none">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                            className="group relative aspect-[4/5] bg-[#0a0a0a] border border-neutral-800/50 rounded-2xl overflow-hidden cursor-pointer shadow-[0_0_40px_rgba(0,0,0,0.4)]"
                        >
                            <img
                                src="/zygmamobile.png"
                                alt="Zygma Empresa Constructora"
                                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10 opacity-95 transition-opacity duration-700 group-hover:opacity-80"></div>
                            <div className="absolute bottom-0 left-0 p-8 z-20 w-full transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
                                <span className="inline-block border border-[#cc5631]/30 text-[#e27254] text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-full mb-4 font-bold bg-[#cc5631]/10">
                                    Web Design & Dev
                                </span>
                                <h4 className="text-3xl font-light tracking-tight mb-2 text-white">Zygma</h4>
                                <p className="text-neutral-300 text-sm font-light opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100 max-w-md">
                                    Sitio institucional para empresa de soluciones constructivas.
                                </p>
                            </div>
                        </motion.div>
                    </Link>

                    {/* MUSEO 3D */}
                    <Link to="/museo3d" className="block outline-none md:mt-24">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="group relative aspect-[4/5] bg-[#0a0a0a] border border-neutral-800/50 rounded-2xl overflow-hidden cursor-pointer shadow-[0_0_40px_rgba(0,0,0,0.4)]"
                        >
                            <img
                                src="/login.png"
                                alt="Museo 3D Web Experience"
                                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent z-10 opacity-90 transition-opacity duration-700 group-hover:opacity-70"></div>
                            <div className="absolute bottom-0 left-0 p-8 z-20 w-full transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
                                <span className="inline-block border border-[#9FD592]/30 text-[#9FD592] text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-full mb-4 font-bold bg-[#9FD592]/10">
                                    Web 3D
                                </span>
                                <h4 className="text-3xl font-light tracking-tight mb-2 text-white">Museo 3D</h4>
                                <p className="text-neutral-300 text-sm font-light opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100 max-w-md">
                                    Experiencia inmersiva e interactiva en la web.
                                </p>
                            </div>
                        </motion.div>
                    </Link>
                </div>

                {/* BLOQUE 2: BRANDING & GRÁFICO (grilla compacta) */}
                <div className="mt-32 md:mt-48">
                    <SectionHeading eyebrow="02 — Identidad visual" title="Branding &" accent="Gráfico." />

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
                        {BRANDING_PROJECTS.map((project, i) => (
                            <BrandCard key={project.to} project={project} index={i} />
                        ))}
                    </div>
                </div>
            </div>

            {/* --- ABOUT SECTION --- */}
            <section id="about" ref={containerRef} className="w-full max-w-7xl py-32 md:py-40 relative overflow-hidden scroll-mt-20 z-10">
                <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.12] pointer-events-none overflow-hidden">
                    <div className="w-[150vw] h-[150vw] animate-[spin_60s_linear_infinite]">
                        <svg viewBox="0 0 1000 1000" className="w-full h-full fill-current text-[#9FD592]">
                            <path id="giantTextPath" d="M 500, 500 m -450, 0 a 450,450 0 1,1 900,0 a 450,450 0 1,1 -900,0" fill="none" />
                            <text className="text-[40px] tracking-[0.4em] uppercase font-bold">
                                <textPath href="#giantTextPath" startOffset="0%">
                                    Product Designer (UX/UI) • Gonzalo Villagarcía • Diseño + Construcción con IA • Figma • Web3 •
                                </textPath>
                            </text>
                        </svg>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center z-10 relative">
                    <motion.div style={{ y: yImage }} className="lg:col-span-5 relative group">
                        <div className="absolute -inset-4 border border-neutral-900 rounded-2xl -z-10 group-hover:inset-0 transition-all duration-700"></div>
                        <div className="aspect-[4/5] lg:aspect-[3/4] w-full overflow-hidden rounded-xl relative z-10">
                            <img
                                src="/porfolio.png"
                                alt="Gonzalo Villagarcía"
                                className="w-full h-full object-cover object-top transition-all duration-1000 ease-in-out relative z-0 group-hover:scale-105"
                            />
                        </div>
                    </motion.div>

                    <motion.div style={{ y: yText }} className="lg:col-span-7 space-y-16 pt-4 lg:pt-0">
                        <div className="space-y-8">
                            <span className="block text-neutral-500 text-xs tracking-[0.2em] uppercase font-medium">Sobre Mí</span>
                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter leading-tight uppercase text-neutral-200">
                                Visión enfocada en <br /> la <span className="text-[#9FD592]">funcionalidad.</span>
                            </h3>
                            <div className="text-base md:text-lg text-neutral-400 font-light leading-relaxed max-w-xl space-y-6">
                                <p className="flex items-center gap-4 text-neutral-300 font-light tracking-wide">
                                    <span className="text-[#9FD592] font-medium">6+ años</span> en diseño.
                                    <span className="text-neutral-700">|</span>
                                    <span className="text-[#9FD592] font-medium">Casi 4</span> en fintech y Web3.
                                </p>
                                <p>Soy un diseñador con raíces visuales que evolucionó hacia el UX/UI para impactar directamente en la esencia de los productos digitales.</p>
                                <p>Hace casi 4 años que diseño productos fintech y Web3. Hoy, además, llevo mis diseños a producción con desarrollo asistido por IA.</p>
                            </div>
                        </div>

                        <div>
                            <span className="block text-[10px] tracking-[0.4em] uppercase text-neutral-600 font-medium mb-6">Toolstack</span>
                            <div className="space-y-8">
                                {toolGroups.map((group) => (
                                    <div key={group.label}>
                                        <span className="block text-xs tracking-[0.2em] uppercase text-neutral-400 font-medium mb-3">{group.label}</span>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {group.tools.map((tool) => (
                                                <motion.div
                                                    key={tool}
                                                    whileHover={{ scale: 1.03, y: -2 }}
                                                    className="flex justify-center items-center w-full px-4 py-3 border border-[#9FD592]/30 rounded-lg text-[10px] md:text-[11px] font-bold tracking-[0.1em] uppercase text-center text-[#9FD592] bg-[#9FD592]/5 hover:bg-[#9FD592] hover:text-[#0a0a0a] transition-all duration-300 cursor-default"
                                                >
                                                    {tool}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
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
                    <CopyEmailButton />
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
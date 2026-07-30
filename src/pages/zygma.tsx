import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Zygma() {
    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any } }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-neutral-50 flex flex-col items-center px-6 md:px-12 lg:px-24 selection:bg-[#cc5631] selection:text-[#f9f7ef]">

            {/* --- NAVBAR SECUNDARIO --- */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-neutral-900/50">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-20">
                    <Link
                        to="/"
                        className="group flex items-center gap-3 text-neutral-400 hover:text-[#cc5631] transition-colors duration-300 outline-none"
                    >
                        <span className="text-xl font-light mb-1">←</span>
                        <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Volver al Home</span>
                    </Link>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-600 font-medium">
                        Case Study
                    </span>
                </div>
            </nav>

            {/* --- HERO DEL PROYECTO --- */}
            <div className="max-w-4xl w-full pt-40 pb-20 relative z-10">
                <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                    <span className="inline-block px-4 py-2 border border-[#cc5631]/30 rounded-full text-[10px] tracking-[0.2em] uppercase text-[#e27254] bg-[#cc5631]/5 mb-8 font-bold">
                        Web Design & Dev
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-light tracking-tighter leading-[0.9] uppercase mb-8">
                        Zygma<span className="text-[#cc5631] font-medium">.</span>
                    </h1>
                    <h2 className="text-xl md:text-3xl text-neutral-300 font-light tracking-tight mb-6">
                        Identidad digital para una constructora.
                    </h2>
                    <p className="text-base md:text-lg text-neutral-500 font-light leading-relaxed max-w-2xl">
                        Diseño y desarrollo del sitio institucional de Zygma, empresa de soluciones constructivas con base en Buenos Aires. Una landing sobria y técnica que ordena más de una década de obra en una experiencia clara y profesional.
                    </p>
                </motion.div>
            </div>

            {/* --- SECCIÓN DE MOCKUPS INTEGRADOS (BENTO GRID) --- */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="max-w-7xl w-full mb-24 md:mb-40 relative z-10"
            >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

                    <div className="md:col-span-12 bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl relative group p-2 md:p-6">
                        <div className="aspect-video md:aspect-[16/9] rounded-2xl overflow-hidden relative border border-neutral-800 bg-[#0a0a0a]">
                            <img
                                src="/zygma1.png"
                                alt="Zygma Home / Hero"
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000"
                            />
                            <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                <span className="text-xs text-white/80 font-medium tracking-wide uppercase bg-black/50 px-3 py-1 rounded backdrop-blur-md">
                                    [ Portada Principal ]
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-7 bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl p-4 md:p-6 group">
                        <div className="aspect-video rounded-2xl overflow-hidden relative border border-neutral-800 bg-[#0a0a0a]">
                            <img
                                src="/zygma2.png"
                                alt="Zygma Sección Contacto"
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                            />
                            <span className="absolute bottom-6 left-6 text-xs text-white/80 font-medium tracking-wide uppercase bg-black/50 px-3 py-1 rounded backdrop-blur-md">
                                [ Contacto ]
                            </span>
                        </div>
                    </div>

                    <div className="md:col-span-5 bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl p-4 md:p-6 md:mt-16 group">
                        <div className="aspect-[3/4] rounded-2xl overflow-hidden relative border border-neutral-800 bg-[#0a0a0a]">
                            <img
                                src="/zygmamobile.png"
                                alt="Zygma Vista Mobile"
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                            />
                            <span className="absolute bottom-6 left-6 text-xs text-white/80 font-medium tracking-wide uppercase bg-black/50 px-3 py-1 rounded backdrop-blur-md">
                                [ Vista Mobile ]
                            </span>
                        </div>
                    </div>

                </div>
            </motion.div>

            {/* --- ESTRUCTURA DEL CASE STUDY --- */}
            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 pb-20 relative z-10">

                <div className="md:col-span-7 space-y-20">
                    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                        <h3 className="text-xs tracking-[0.3em] uppercase text-[#e27254] font-bold mb-6 border-b border-neutral-800 pb-4">
                            El Desafío
                        </h3>
                        <div className="text-base md:text-lg text-neutral-400 font-light leading-relaxed space-y-6">
                            <p>
                                Zygma ejecuta obras comerciales, corporativas, educativas, hoteleras y residenciales desde 2013, pero su trayectoria no tenía un correlato digital. El desafío era traducir el peso técnico y la seriedad del rubro constructivo en una web que generara confianza inmediata en su público B2B: estudios de arquitectura, project managers y empresas.
                            </p>
                            <p>
                                A nivel producto, había que exhibir un portfolio extenso —16 obras de tipologías muy distintas— sin abrumar al visitante, sosteniendo jerarquía y legibilidad en cada resolución.
                            </p>
                        </div>
                    </motion.section>

                    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                        <h3 className="text-xs tracking-[0.3em] uppercase text-[#e27254] font-bold mb-6 border-b border-neutral-800 pb-4">
                            La Solución
                        </h3>
                        <div className="text-base md:text-lg text-neutral-400 font-light leading-relaxed space-y-6">
                            <p>
                                Una landing institucional de página única con una narrativa ordenada: quiénes son, qué hacen, obras, servicios y metodología. El sistema visual se apoya en una paleta de hormigón con un acento naranja de obra, tipografías técnicas (Space Grotesk + Inter) y una grilla de proyectos filtrable por tipología que permite recorrer el trabajo sin fricción.
                            </p>
                            <p>
                                Los datos duros —años de experiencia, tipologías y m² intervenidos— conviven con un recorrido de obras y una explicación transparente del proceso, del análisis a la posventa.
                            </p>
                        </div>
                    </motion.section>

                    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                        <h3 className="text-xs tracking-[0.3em] uppercase text-[#e27254] font-bold mb-6 border-b border-neutral-800 pb-4">
                            El Impacto
                        </h3>
                        <div className="text-base md:text-lg text-neutral-400 font-light leading-relaxed space-y-6">
                            <p>
                                Zygma pasó de no tener presencia digital a un sitio que comunica solidez y método. La web opera como carta de presentación ante clientes corporativos, condensando más de diez años de obra en un relato rápido, coherente y a la altura de la marca.
                            </p>
                        </div>
                    </motion.section>
                </div>

                <div className="md:col-span-5 relative z-10">
                    <div className="sticky top-32 space-y-16">

                        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h3 className="text-xs tracking-[0.3em] uppercase text-[#e27254] font-bold mb-6">
                                Excelencia Técnica
                            </h3>
                            <ul className="space-y-6 text-sm md:text-base text-neutral-400 font-light">
                                <li className="flex flex-col gap-1">
                                    <span className="text-neutral-200 font-medium">Frontend</span>
                                    <span>React, TypeScript (Vite), animaciones fluidas.</span>
                                </li>
                                <li className="flex flex-col gap-1">
                                    <span className="text-neutral-200 font-medium">Diseño & Tipografía</span>
                                    <span>Sistema sobrio en Space Grotesk + Inter, paleta de hormigón y acento de obra.</span>
                                </li>
                                <li className="flex flex-col gap-1">
                                    <span className="text-neutral-200 font-medium">Infraestructura</span>
                                    <span>Deploy en Vercel, fuentes optimizadas y carga veloz.</span>
                                </li>
                            </ul>
                        </motion.section>

                        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h3 className="text-xs tracking-[0.3em] uppercase text-[#e27254] font-bold mb-6">
                                Pilares del Proyecto
                            </h3>
                            <ul className="space-y-6 text-sm font-light text-neutral-400">
                                <li className="border-l border-neutral-800 pl-4">
                                    <strong className="text-neutral-200 font-medium block mb-1">Grilla Filtrable</strong>
                                    Recorrido de 16 obras por tipología sin recargar la vista.
                                </li>
                                <li className="border-l border-neutral-800 pl-4">
                                    <strong className="text-neutral-200 font-medium block mb-1">Data-Driven Trust</strong>
                                    Años, tipologías y m² intervenidos como prueba social.
                                </li>
                                <li className="border-l border-neutral-800 pl-4">
                                    <strong className="text-neutral-200 font-medium block mb-1">Proceso Transparente</strong>
                                    Metodología de 5 etapas, del análisis a la posventa.
                                </li>
                                <li className="border-l border-neutral-800 pl-4">
                                    <strong className="text-neutral-200 font-medium block mb-1">Identidad B2B</strong>
                                    Tono técnico y sobrio orientado a decisores corporativos.
                                </li>
                            </ul>
                        </motion.section>

                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="pt-8 relative z-20">
                            <a
                                href="https://zygma.ar"
                                target="_blank"
                                rel="noreferrer"
                                className="w-full flex justify-center items-center px-8 py-4 bg-[#cc5631]/10 border border-[#cc5631]/50 rounded-xl text-xs tracking-widest uppercase text-[#e27254] hover:bg-[#cc5631] hover:text-[#f9f7ef] transition-all duration-500 font-bold"
                            >
                                Visitar Sitio
                            </a>
                        </motion.div>

                    </div>
                </div>
            </div>

            {/* --- FOOTER SIMPLIFICADO --- */}
            <div className="w-full max-w-7xl px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-neutral-600 py-12 border-t border-neutral-900 z-10 relative">
                <span className="font-medium">© 2026 Gonzalo Villagarcía</span>
                <div className="flex gap-8 font-medium">
                    <Link to="/" className="hover:text-white transition-colors duration-300">Home</Link>
                    <a href="https://www.linkedin.com/in/gonzalovillagarcia/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">LinkedIn</a>
                </div>
            </div>

        </div>
    );
}

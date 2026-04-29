import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function AcademiaDeRiego() {
    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-neutral-50 flex flex-col items-center px-6 md:px-12 lg:px-24 selection:bg-[#C1D000] selection:text-[#003D7F] pb-32">

            {/* --- NAVBAR --- */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-neutral-900/50">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-20">
                    <Link to="/" className="group flex items-center gap-3 text-neutral-400 hover:text-[#C1D000] transition-colors duration-300 outline-none">
                        <span className="text-xl font-light mb-1">←</span>
                        <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Volver al Home</span>
                    </Link>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-600 font-medium">Case Study</span>
                </div>
            </nav>

            {/* --- HERO SECTION --- */}
            <div className="max-w-4xl w-full pt-40 pb-20 relative z-10">
                <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                    <span className="inline-block px-4 py-2 border border-[#C1D000]/30 rounded-full text-[10px] tracking-[0.2em] uppercase text-[#C1D000] bg-[#C1D000]/5 mb-8 font-bold">
                        AgTech & Sub-Branding
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-light tracking-tighter leading-[0.9] uppercase mb-8">
                        Academia <span className="text-[#003D7F] font-bold">de Riego</span>
                    </h1>
                    <h2 className="text-xl md:text-3xl text-neutral-300 font-light tracking-tight mb-6">
                        Identidad educativa by Kilimo.
                    </h2>
                    <p className="text-base md:text-lg text-neutral-500 font-light leading-relaxed max-w-2xl">
                        Diseño de marca para el brazo académico de una de las startups AgTech líderes de LATAM. Uniendo la tecnología con la naturaleza.
                    </p>
                </motion.div>
            </div>

            {/* --- MOCKUPS PRINCIPALES (CORREGIDOS A .PNG) --- */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-7xl w-full mb-32 space-y-8"
            >
                <div className="rounded-3xl overflow-hidden bg-neutral-900 border border-[#003D7F]/30 aspect-video md:aspect-[3/2] relative group">
                    <img src="/riego-tablet.png" className="w-full h-full object-cover object-center group-hover:scale-[1.05] transition-transform duration-1000" alt="AgTech Context" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 aspect-video md:aspect-square">
                        <img src="/riego-merch.png" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Startup Merch" />
                    </div>
                    <div className="rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 aspect-video md:aspect-square">
                        <img src="/riego-brandbook.png" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Brand Book" />
                    </div>
                </div>
            </motion.div>

            {/* --- EL CASE STUDY --- */}
            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 pb-32 border-t border-neutral-900 pt-20">
                <div className="md:col-span-7 space-y-20">
                    <section>
                        <h3 className="text-xs tracking-[0.3em] uppercase text-[#C1D000] font-bold mb-6 border-b border-neutral-800 pb-4">El Desafío</h3>
                        <div className="text-lg text-neutral-400 font-light leading-relaxed space-y-6">
                            <p>Kilimo necesitaba establecer una sub-marca dedicada exclusivamente a la formación y divulgación de conocimiento: la Academia de Riego.</p>
                            <p>El reto de arquitectura de marca consistía en crear una identidad con personalidad propia (académica y accesible), pero que mantuviera un vínculo visual innegable con la marca madre corporativa para heredar su autoridad y confianza en el sector AgTech.</p>
                        </div>
                    </section>
                    <section>
                        <h3 className="text-xs tracking-[0.3em] uppercase text-[#C1D000] font-bold mb-6 border-b border-neutral-800 pb-4">La Solución</h3>
                        <div className="text-lg text-neutral-400 font-light leading-relaxed space-y-6">
                            <p>Se desarrolló un isologo circular que evoca la perfección y el ciclo infinito del agua. En su interior, la gota de agua y la hoja se fusionan, simbolizando la adaptabilidad y el crecimiento.</p>
                            <p>Para la vinculación con Kilimo, se optó por heredar la variante tipográfica <strong>Bold</strong> (FreightSans Pro Black), transmitiendo solidez, experiencia y tecnología. El resultado es un sello de calidad educativa.</p>
                        </div>
                    </section>
                </div>

                {/* --- SISTEMA VISUAL & PSICOLOGÍA --- */}
                <div className="md:col-span-5 relative z-10">
                    <div className="sticky top-32 h-fit space-y-16">
                        <div>
                            <h3 className="text-xs tracking-[0.3em] uppercase text-[#C1D000] font-bold mb-6">Psicología del Color</h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#003D7F] shadow-[0_0_15px_rgba(0,61,127,0.5)] flex-shrink-0"></div>
                                    <div>
                                        <h4 className="text-neutral-200 font-bold text-sm uppercase tracking-wider">Corporate Blue</h4>
                                        <p className="text-neutral-500 text-sm">Inteligencia, razón y confianza corporativa.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#C1D000] shadow-[0_0_15px_rgba(193,208,0,0.3)] flex-shrink-0"></div>
                                    <div>
                                        <h4 className="text-neutral-200 font-bold text-sm uppercase tracking-wider">Agri-Green</h4>
                                        <p className="text-neutral-500 text-sm">Naturaleza, crecimiento y adaptabilidad.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="pt-8 relative z-20">
                            <a
                                href="https://academiaderiego.kilimo.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="w-full flex justify-center items-center px-8 py-4 bg-[#C1D000]/10 border border-[#C1D000]/50 rounded-xl text-xs tracking-widest uppercase text-[#C1D000] hover:bg-[#C1D000] hover:text-[#003D7F] transition-all duration-500 font-bold"
                            >
                                Visitar Proyecto Live
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>

        </div>
    );
}
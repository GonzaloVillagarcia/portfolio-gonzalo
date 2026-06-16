import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Museo3D() {
    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any } }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-neutral-50 flex flex-col items-center px-6 md:px-12 lg:px-24 selection:bg-[#9FD592] selection:text-[#0a0a0a]">

            {/* --- NAVBAR SECUNDARIO --- */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-neutral-900/50">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-20">
                    <Link
                        to="/"
                        className="group flex items-center gap-3 text-neutral-400 hover:text-[#9FD592] transition-colors duration-300 outline-none"
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
                    <span className="inline-block px-4 py-2 border border-[#9FD592]/30 rounded-full text-[10px] tracking-[0.2em] uppercase text-[#9FD592] bg-[#9FD592]/10 mb-8 font-bold">
                        Web 3D / Experience
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-light tracking-tighter leading-[0.9] uppercase mb-8">
                        Museo <span className="text-[#9FD592] font-medium">3D</span>
                    </h1>
                    <h2 className="text-xl md:text-3xl text-neutral-300 font-light tracking-tight mb-6">
                        Experiencia inmersiva en la web.
                    </h2>
                    <p className="text-base md:text-lg text-neutral-500 font-light leading-relaxed max-w-2xl">
                        Una galería virtual interactiva que permite a los usuarios explorar exposiciones de arte directamente desde su navegador, combinando tecnología 3D y diseño web moderno.
                    </p>
                </motion.div>
            </div>

            {/* --- SECCIÓN DE MOCKUPS INTEGRADOS --- */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="max-w-7xl w-full mb-24 md:mb-40 relative z-10"
            >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

                    <div className="md:col-span-12 bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl relative group p-2 md:p-6">
                        <div className="aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden relative border border-neutral-800 bg-[#0a0a0a]">
                            <img
                                src="/1.png"
                                alt="Museo 3D Vista Principal"
                                className="w-full h-full object-cover md:object-contain group-hover:scale-105 transition-transform duration-1000"
                            />
                            <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                <span className="text-xs text-white/80 font-medium tracking-wide uppercase bg-black/50 px-3 py-1 rounded backdrop-blur-md">
                                    [ Vista Principal ]
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-7 bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl p-4 md:p-6 group">
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden relative border border-neutral-800 bg-[#0a0a0a]">
                            <img
                                src="/2.png"
                                alt="Museo 3D Detalle 1"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <span className="absolute bottom-6 left-6 text-xs text-white/80 font-medium tracking-wide uppercase bg-black/50 px-3 py-1 rounded backdrop-blur-md">
                                [ Exhibición ]
                            </span>
                        </div>
                    </div>

                    <div className="md:col-span-5 bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl p-4 md:p-6 md:mt-16 group">
                        <div className="aspect-[3/4] rounded-2xl overflow-hidden relative border border-neutral-800 bg-[#0a0a0a]">
                            <img
                                src="/3.png"
                                alt="Museo 3D Detalle 2"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <span className="absolute bottom-6 left-6 text-xs text-white/80 font-medium tracking-wide uppercase bg-black/50 px-3 py-1 rounded backdrop-blur-md">
                                [ Interfaz ]
                            </span>
                        </div>
                    </div>

                </div>
            </motion.div>

            {/* --- ESTRUCTURA DEL CASE STUDY --- */}
            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 pb-20 relative z-10">

                <div className="md:col-span-7 space-y-20">
                    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                        <h3 className="text-xs tracking-[0.3em] uppercase text-[#9FD592] font-bold mb-6 border-b border-neutral-800 pb-4">
                            El Desafío
                        </h3>
                        <div className="text-base md:text-lg text-neutral-400 font-light leading-relaxed space-y-6">
                            <p>
                                Crear un entorno inmersivo en la web sin sacrificar el rendimiento, logrando que el museo virtual sea accesible para una amplia variedad de dispositivos y navegadores.
                            </p>
                        </div>
                    </motion.section>

                    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                        <h3 className="text-xs tracking-[0.3em] uppercase text-[#9FD592] font-bold mb-6 border-b border-neutral-800 pb-4">
                            La Solución
                        </h3>
                        <div className="text-base md:text-lg text-neutral-400 font-light leading-relaxed space-y-6">
                            <p>
                                Implementamos tecnologías de renderizado 3D en tiempo real (como Three.js o WebGL) junto con una UI/UX envolvente, permitiendo a los visitantes navegar fluidamente por las exposiciones, interactuar con las obras y disfrutar de un entorno realista.
                            </p>
                        </div>
                    </motion.section>
                </div>

                <div className="md:col-span-5 relative z-10">
                    <div className="sticky top-32 space-y-16">

                        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h3 className="text-xs tracking-[0.3em] uppercase text-[#9FD592] font-bold mb-6">
                                Excelencia Técnica
                            </h3>
                            <ul className="space-y-6 text-sm md:text-base text-neutral-400 font-light">
                                <li className="flex flex-col gap-1">
                                    <span className="text-neutral-200 font-medium">Frontend & 3D</span>
                                    <span>React, Three.js, WebGL.</span>
                                </li>
                                <li className="flex flex-col gap-1">
                                    <span className="text-neutral-200 font-medium">Performance</span>
                                    <span>Optimización de texturas y modelos para carga rápida.</span>
                                </li>
                            </ul>
                        </motion.section>

                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="pt-8 relative z-20">
                            <a
                                href="https://museo-top.vercel.app/"
                                target="_blank"
                                rel="noreferrer"
                                className="w-full flex justify-center items-center px-8 py-4 bg-[#9FD592]/10 border border-[#9FD592]/50 rounded-xl text-xs tracking-widest uppercase text-[#9FD592] hover:bg-[#9FD592] hover:text-[#0a0a0a] transition-all duration-500 font-bold"
                            >
                                Visitar Plataforma (Alpha)
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
                    <a href="#" className="hover:text-white transition-colors duration-300">LinkedIn</a>
                </div>
            </div>

        </div>
    );
}

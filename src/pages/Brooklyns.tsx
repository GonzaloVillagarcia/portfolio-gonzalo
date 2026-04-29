import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Brooklyns() {
    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any } }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-neutral-50 flex flex-col items-center px-6 md:px-12 lg:px-24 selection:bg-[#c0e600] selection:text-[#3b265e]">

            {/* --- NAVBAR SECUNDARIO --- */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-neutral-900/50">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-20">
                    <Link
                        to="/"
                        className="group flex items-center gap-3 text-neutral-400 hover:text-[#c0e600] transition-colors duration-300 outline-none"
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
                    <span className="inline-block px-4 py-2 border border-[#c0e600]/30 rounded-full text-[10px] tracking-[0.2em] uppercase text-[#c0e600] bg-[#c0e600]/5 mb-8 font-bold">
                        Branding
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-light tracking-tighter leading-[0.9] uppercase mb-8">
                        Brooklyn<span className="text-[#c0e600] font-medium">'s</span>
                    </h1>
                    <h2 className="text-xl md:text-3xl text-neutral-300 font-light tracking-tight mb-6">
                        Identidad Visual & Brand Book.
                    </h2>
                    <p className="text-base md:text-lg text-neutral-500 font-light leading-relaxed max-w-2xl">
                        Construcción de un sistema de marca gastronómica vibrante, diseñado para conectar con las nuevas generaciones a través de la cultura urbana y la diversidad.
                    </p>
                </motion.div>
            </div>

            {/* --- SECCIÓN DE MOCKUPS REALES (BENTO GRID) --- */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="max-w-7xl w-full mb-24 md:mb-40 relative z-10"
            >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

                    {/* 1. MOCKUP CARTEL (image_93891c.jpg) */}
                    <div className="md:col-span-12 bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl relative group">
                        <div className="aspect-video md:aspect-[21/9] overflow-hidden relative bg-[#111]">
                            <img
                                src="/brooklyns-home-mockup.jpg"
                                alt="Brooklyn's Signboard Mockup"
                                className="w-full h-full object-cover object-[center_45%] opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                <span className="text-xs text-white/90 font-medium tracking-wide uppercase bg-black/50 px-3 py-1 rounded backdrop-blur-md">
                                    [ Brand Application: Physical ]
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 2. MOCKUP INSTAGRAM (redes.jpg) */}
                    <div className="md:col-span-7 bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl p-4 md:p-6 group">
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden relative border border-neutral-800 bg-white">
                            <img
                                src="brooklyns-redes.jpg"
                                alt="Brooklyn's Instagram Social Media"
                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                            <span className="absolute bottom-6 left-6 text-xs text-white/90 font-medium tracking-wide uppercase bg-black/50 px-3 py-1 rounded backdrop-blur-md">
                                [ Brand Application: Digital ]
                            </span>
                        </div>
                    </div>

                    {/* 3. MOCKUP VASO (vaso.jpg) */}
                    <div className="md:col-span-5 bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl p-4 md:p-6 md:mt-16 group">
                        <div className="aspect-[3/4] rounded-2xl overflow-hidden relative border border-neutral-800 bg-[#111]">
                            <img
                                src="/brooklyns-vaso.jpg"
                                alt="Brooklyn's Packaging Mockup"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                            <span className="absolute bottom-6 left-6 text-xs text-white/90 font-medium tracking-wide uppercase bg-black/50 px-3 py-1 rounded backdrop-blur-md">
                                [ Brand Application: Packaging ]
                            </span>
                        </div>
                    </div>

                </div>
            </motion.div>

            {/* --- SISTEMA DE DISEÑO (100% CÓDIGO) --- */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
                className="max-w-7xl w-full border-t border-neutral-900 pt-20 pb-32 space-y-24"
            >

                {/* PALETA CROMÁTICA - Bloques expansibles */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    <div className="md:col-span-4 space-y-4">
                        <h3 className="text-xs tracking-[0.3em] uppercase text-[#c0e600] font-bold mb-6">
                            Sistema Cromático
                        </h3>
                        <p className="text-base text-neutral-400 font-light leading-relaxed">
                            Desarrollo de una paleta de alto contraste que escapa de los tonos tradicionales de panadería, buscando un impacto visual vibrante e inclusivo.
                        </p>
                    </div>

                    <div className="md:col-span-8">
                        <div className="flex flex-col sm:flex-row w-full h-[300px] rounded-3xl overflow-hidden shadow-2xl group">
                            <div className="flex-1 bg-[#3b265e] flex flex-col justify-end p-6 hover:flex-[1.5] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                                <span className="text-[#e9b0be] font-bold text-lg mb-1 opacity-0 group-hover:opacity-100 transition-opacity">Deep Violet</span>
                                <span className="text-white font-mono text-sm">#3B265E</span>
                            </div>
                            <div className="flex-1 bg-[#e9b0be] flex flex-col justify-end p-6 hover:flex-[1.5] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                                <span className="text-[#3b265e] font-bold text-lg mb-1 opacity-0 group-hover:opacity-100 transition-opacity">Soft Pink</span>
                                <span className="text-[#3b265e] font-mono text-sm">#E9B0BE</span>
                            </div>
                            <div className="flex-1 bg-[#d62571] flex flex-col justify-end p-6 hover:flex-[1.5] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                                <span className="text-[#f4f9fc] font-bold text-lg mb-1 opacity-0 group-hover:opacity-100 transition-opacity">Magenta</span>
                                <span className="text-white font-mono text-sm">#D62571</span>
                            </div>
                            <div className="flex-1 bg-[#c0e600] flex flex-col justify-end p-6 hover:flex-[1.5] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                                <span className="text-[#3b265e] font-bold text-lg mb-1 opacity-0 group-hover:opacity-100 transition-opacity">Urban Lime</span>
                                <span className="text-[#3b265e] font-mono text-sm">#C0E600</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TIPOGRAFÍA GIGANTE */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    <div className="md:col-span-8 bg-neutral-900 border border-neutral-800 rounded-3xl p-8 md:p-12 relative overflow-hidden min-h-[300px] flex flex-col justify-center">
                        <span className="absolute -right-8 -bottom-16 text-[15rem] font-bold text-neutral-800/30 tracking-tighter select-none">Aa</span>
                        <div className="relative z-10">
                            <h4 className="text-5xl md:text-7xl font-medium tracking-tight text-white mb-4">Berlin Sans FB</h4>
                            <p className="text-2xl text-[#c0e600] font-light">Impactante, funcional y humana.</p>
                        </div>
                    </div>
                    <div className="md:col-span-4 space-y-4">
                        <h3 className="text-xs tracking-[0.3em] uppercase text-[#c0e600] font-bold mb-6">Dirección Tipográfica</h3>
                        <p className="text-base text-neutral-400 font-light leading-relaxed">
                            Selección de una fuente con alta personalidad y terminaciones amigables para el espíritu joven de la marca.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* --- TEXTO DEL CASE STUDY --- */}
            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 pb-32 relative z-10 border-t border-neutral-900 pt-20">
                <div className="md:col-span-7 space-y-20">
                    <section>
                        <h3 className="text-xs tracking-[0.3em] uppercase text-[#c0e600] font-bold mb-6 border-b border-neutral-800 pb-4">El Desafío</h3>
                        <div className="text-base md:text-lg text-neutral-400 font-light leading-relaxed space-y-6">
                            <p>
                                Posicionar una nueva marca gastronómica en un mercado saturado, alejándose por completo de los clichés de las panaderías tradicionales y acercándose a una estética urbana, cosmopolita y disruptiva.
                            </p>
                            <p>
                                El objetivo principal fue crear un sistema visual capaz de conectar con un público joven y diverso, transmitiendo una energía "New York Vibes" basada en la inclusión, la autenticidad y la calidad. Se buscó que la marca no fuera solo un lugar de consumo, sino un símbolo de identidad cultural para su comunidad.
                            </p>
                        </div>
                    </section>
                    <section>
                        <h3 className="text-xs tracking-[0.3em] uppercase text-[#c0e600] font-bold mb-6 border-b border-neutral-800 pb-4">La Solución</h3>
                        <div className="text-base md:text-lg text-neutral-400 font-light leading-relaxed space-y-6">
                            <p>
                                Se desarrolló una identidad de marca audaz y altamente contrastante. El logotipo se diseñó reemplazando las vocales centrales por un isotipo lúdico (la cookie mordida), donde los puntos interiores actúan como un símbolo sutil de diversidad e imperfección.
                            </p>
                            <p>
                                Todo el sistema visual fue normalizado en un extenso Brand Book, asegurando consistencia absoluta tanto en la dirección de arte fotográfica (enfocada en urbanismo, igualdad y comunidad) como en el tono de voz para canales digitales. El resultado es un ecosistema de marca que se siente orgánico en las calles y premium en las interfaces digitales.
                            </p>
                        </div>
                    </section>
                </div>
                <div className="md:col-span-5 relative z-10 sticky top-32">
                    <h3 className="text-xs tracking-[0.3em] uppercase text-[#c0e600] font-bold mb-6">Entregables</h3>
                    <ul className="space-y-6 text-sm text-neutral-400 font-light">
                        <li className="border-l border-neutral-800 pl-4">
                            <strong className="text-neutral-200 block mb-1">Brand Book Document</strong>
                            Normativa visual completa, grillas geométricas de construcción y manual de usos permitidos.
                        </li>
                        <li className="border-l border-neutral-800 pl-4">
                            <strong className="text-neutral-200 block mb-1">Dirección de Arte</strong>
                            Lineamientos fotográficos centrados en el estilo de vida urbano, la igualdad y la comunidad.
                        </li>
                        <li className="border-l border-neutral-800 pl-4">
                            <strong className="text-neutral-200 block mb-1">Diseño de Packaging</strong>
                            Aplicaciones físicas en materiales de embalaje, etiquetas y piezas de indumentaria corporativa.
                        </li>
                    </ul>
                </div>
            </div>

            {/* --- FOOTER --- */}
            <div className="w-full max-w-7xl px-6 md:px-12 flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-neutral-600 py-12 border-t border-neutral-900">
                <span>© 2026 Gonzalo Villagarcía</span>
                <Link to="/" className="hover:text-white transition-colors duration-300">Home</Link>
            </div>

        </div>
    );
}
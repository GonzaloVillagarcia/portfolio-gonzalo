import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function RsConnecting() {
    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-neutral-50 flex flex-col items-center px-6 md:px-12 lg:px-24 selection:bg-[#e34d6d] selection:text-white pb-32">

            {/* --- NAVBAR --- */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-neutral-900/50">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-20">
                    <Link to="/" className="group flex items-center gap-3 text-neutral-400 hover:text-[#e34d6d] transition-colors duration-300 outline-none">
                        <span className="text-xl font-light mb-1">←</span>
                        <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Volver al Home</span>
                    </Link>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-600 font-medium">Case Study</span>
                </div>
            </nav>

            {/* --- HERO SECTION --- */}
            <div className="max-w-4xl w-full pt-40 pb-20 relative z-10">
                <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                    <span className="inline-block px-4 py-2 border border-[#e34d6d]/30 rounded-full text-[10px] tracking-[0.2em] uppercase text-[#e34d6d] bg-[#e34d6d]/5 mb-8 font-bold">
                        Brand Identity
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-light tracking-tighter leading-[0.9] uppercase mb-8">
                        RS <span className="text-[#e34d6d] font-medium">Connecting</span>
                    </h1>
                    <h2 className="text-xl md:text-3xl text-neutral-300 font-light tracking-tight mb-6">
                        Digital-First Recruiting Agency.
                    </h2>
                    <p className="text-base md:text-lg text-neutral-500 font-light leading-relaxed max-w-2xl">
                        Diseño de identidad visual corporativa para una agencia especializada en la captación integral end-to-end de talento tecnológico a nivel LATAM.
                    </p>
                </motion.div>
            </div>

            {/* --- MOCKUPS PRINCIPALES (BENTO GRID - EFECTOS PREMIUM) --- */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="max-w-7xl w-full mb-32 md:mb-40 relative z-10"
            >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

                    {/* 1. MOCKUP PRINCIPAL (FULL WIDTH) */}
                    <div className="md:col-span-12 bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl relative group">
                        <div className="aspect-video md:aspect-[21/9] overflow-hidden relative bg-[#111]">
                            <img
                                src="/rs-home-mockup.png"
                                alt="RS Connecting Identity"
                                className="w-full h-full object-cover object-[center_55%] group-hover:scale-105 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                <span className="text-xs text-white/90 font-medium tracking-wide uppercase bg-black/50 px-3 py-1 rounded backdrop-blur-md">
                                    [ Brand Application: Identity ]
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 2. MOCKUP CARD PINK */}
                    <div className="md:col-span-7 bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl p-4 md:p-6 group">
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden relative border border-neutral-800 bg-white">
                            <img
                                src="/rs-card-pink.png"
                                alt="RS Connecting Card"
                                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                            <span className="absolute bottom-6 left-6 text-xs text-white/90 font-medium tracking-wide uppercase bg-black/50 px-3 py-1 rounded backdrop-blur-md">
                                [ Brand Application: Stationery ]
                            </span>
                        </div>
                    </div>

                    {/* 3. MOCKUP EMBOSSED WHITE */}
                    <div className="md:col-span-5 bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl p-4 md:p-6 md:mt-16 group">
                        <div className="aspect-[3/4] rounded-2xl overflow-hidden relative border border-neutral-800 bg-[#111]">
                            <img
                                src="/rs-embossed-white.png"
                                alt="RS Connecting Logo"
                                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                            <span className="absolute bottom-6 left-6 text-xs text-white/90 font-medium tracking-wide uppercase bg-black/50 px-3 py-1 rounded backdrop-blur-md">
                                [ Brand Application: Corporate ]
                            </span>
                        </div>
                    </div>

                </div>
            </motion.div>

            {/* --- EL CASE STUDY --- */}
            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 pb-32 border-t border-neutral-900 pt-20">
                <div className="md:col-span-7 space-y-20">
                    <section>
                        <h3 className="text-xs tracking-[0.3em] uppercase text-[#e34d6d] font-bold mb-6 border-b border-neutral-800 pb-4">El Desafío</h3>
                        <div className="text-lg text-neutral-400 font-light leading-relaxed space-y-6">
                            <p>Darle vida y estructura a la marca de dos profesionales de RRHH con más de 5 años de experiencia en el mundo IT, que necesitaban una identidad sólida para competir en el mercado de selección de personal a nivel LATAM.</p>
                            <p>La identidad fue diseñada para proyectar una presencia corporativa de alto nivel, capaz de convivir orgánicamente en ecosistemas digitales y presentaciones de alto impacto. El objetivo fue dotar a las fundadoras de un sistema visual que inspire la confianza de grandes clientes B2B, manteniendo la frescura necesaria para atraer al talento IT más exigente.</p>
                        </div>
                    </section>
                    <section>
                        <h3 className="text-xs tracking-[0.3em] uppercase text-[#e34d6d] font-bold mb-6 border-b border-neutral-800 pb-4">La Solución</h3>
                        <div className="text-lg text-neutral-400 font-light leading-relaxed space-y-6">
                            <p>Se desarrolló un isotipo distintivo y fluido, cuya morfología nace de la unión de las iniciales de sus fundadoras, Rocío y Silvina. Este símbolo se apoya en una extensa gama de colores secundarios (de gradientes cálidos a púrpuras) que permiten que la comunicación en redes sociales y presentaciones no sea monótona.</p>
                            <p>El proyecto culminó en un Manual de Identidad Corporativa detallado, asegurando la correcta escalabilidad de la marca en banners de LinkedIn, perfiles de empresa y comunicados de búsqueda.</p>
                        </div>
                    </section>
                </div>

                <div className="md:col-span-5 relative z-10 sticky top-32 h-fit space-y-16">
                    <div>
                        <h3 className="text-xs tracking-[0.3em] uppercase text-[#e34d6d] font-bold mb-6">Entregables</h3>
                        <ul className="space-y-4 text-sm text-neutral-400 font-light">
                            <li className="border-l border-neutral-800 pl-4"><strong className="text-neutral-200 block">Logotipo & Isotipo</strong> Diseño vectorial y sistema de reducciones.</li>
                            <li className="border-l border-neutral-800 pl-4"><strong className="text-neutral-200 block">Manual de Identidad</strong> Normativas de uso corporativo.</li>
                            <li className="border-l border-neutral-800 pl-4"><strong className="text-neutral-200 block">Social Media Assets</strong> Plantillas para comunicados digitales de búsqueda IT.</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* --- SISTEMA VISUAL (100% CÓDIGO) --- */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-7xl w-full border-t border-neutral-900 pt-20 pb-32 space-y-24">

                {/* PALETA CROMÁTICA EXTENDIDA */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    <div className="md:col-span-4 space-y-4">
                        <h3 className="text-xs tracking-[0.3em] uppercase text-[#e34d6d] font-bold mb-6">Paleta Cromática</h3>
                        <p className="text-base text-neutral-400 font-light leading-relaxed">
                            El color principal actúa como ancla visual, mientras que una amplia gama de secundarios permite la creación de gradientes modernos para entornos digitales.
                        </p>
                    </div>
                    <div className="md:col-span-8">
                        <div className="flex flex-col sm:flex-row w-full h-[300px] rounded-3xl overflow-hidden shadow-2xl group">
                            <div className="flex-1 bg-[#fdda9e] flex flex-col justify-end p-6 hover:flex-[1.5] transition-all duration-500">
                                <span className="text-[#e34d6d] font-bold text-lg mb-1 opacity-0 group-hover:opacity-100 transition-opacity">Warm Yellow</span>
                                <span className="text-[#e34d6d] font-mono text-sm tracking-wider">#FDDA9E</span>
                            </div>
                            <div className="flex-1 bg-[#ee726d] flex flex-col justify-end p-6 hover:flex-[1.5] transition-all duration-500">
                                <span className="text-white font-bold text-lg mb-1 opacity-0 group-hover:opacity-100 transition-opacity">Soft Coral</span>
                                <span className="text-white font-mono text-sm tracking-wider">#EE726D</span>
                            </div>
                            <div className="flex-1 bg-[#e34d6d] flex flex-col justify-end p-6 hover:flex-[1.5] transition-all duration-500">
                                <span className="text-white font-bold text-lg mb-1 opacity-0 group-hover:opacity-100 transition-opacity">Corporate Pink</span>
                                <span className="text-white font-mono text-sm tracking-wider">#E34D6D</span>
                            </div>
                            <div className="flex-1 bg-[#79216e] flex flex-col justify-end p-6 hover:flex-[1.5] transition-all duration-500">
                                <span className="text-[#fdda9e] font-bold text-lg mb-1 opacity-0 group-hover:opacity-100 transition-opacity">Deep Purple</span>
                                <span className="text-[#fdda9e] font-mono text-sm tracking-wider">#79216E</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TIPOGRAFÍA MONTSERRAT */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    <div className="md:col-span-8 bg-neutral-900 border border-neutral-800 rounded-3xl p-12 relative overflow-hidden flex flex-col justify-center min-h-[350px]">
                        <span className="absolute -right-8 -bottom-16 text-[15rem] font-bold text-neutral-800/30 tracking-tighter select-none">Aa</span>
                        <div className="relative z-10">
                            <h4 className="text-6xl md:text-8xl font-medium tracking-tight text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>Montserrat</h4>
                            <p className="text-2xl text-[#e34d6d] font-light">Legibilidad y presencia corporativa.</p>
                        </div>
                    </div>
                    <div className="md:col-span-4 space-y-4">
                        <h3 className="text-xs tracking-[0.3em] uppercase text-[#e34d6d] font-bold mb-6">Dirección Tipográfica</h3>
                        <p className="text-base text-neutral-400 font-light leading-relaxed">
                            Se seleccionó Montserrat como tipografía corporativa. Su estructura geométrica sin serif garantiza una lectura impecable en perfiles IT y plataformas digitales de reclutamiento.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* --- FOOTER --- */}
            <div className="w-full max-w-7xl border-t border-neutral-900 py-12 flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-neutral-600">
                <span className="font-medium">© 2026 Gonzalo Villagarcía</span>
                <div className="flex gap-8 font-medium">
                    <Link to="/" className="hover:text-white transition-colors duration-300">Home</Link>
                </div>
            </div>

        </div>
    );
}
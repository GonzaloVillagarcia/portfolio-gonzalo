import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function DonQuijote() {
    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any } }
    };

    return (
        <div className="min-h-screen bg-[#16100c] text-[#e8dccb] flex flex-col items-center px-6 md:px-12 lg:px-24 selection:bg-[#a36b4b] selection:text-white pb-32 font-serif">

            {/* --- NAVBAR --- */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-[#16100c]/80 backdrop-blur-md border-b border-[#3a281c]/50 font-sans">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-20">
                    <Link to="/" className="group flex items-center gap-3 text-[#a89582] hover:text-[#e8dccb] transition-colors duration-300 outline-none">
                        <span className="text-xl font-light mb-1">←</span>
                        <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Volver al Home</span>
                    </Link>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#7a6552] font-medium">Case Study</span>
                </div>
            </nav>

            {/* --- HERO SECTION --- */}
            <div className="max-w-4xl w-full pt-40 pb-20 relative z-10 text-center md:text-left font-sans">
                <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                    <span className="inline-block px-4 py-2 border border-[#a36b4b]/40 rounded-full text-[10px] tracking-[0.2em] uppercase text-[#c28e6c] bg-[#a36b4b]/10 mb-8 font-bold">
                        Identidad Gastronómica
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-medium tracking-tight leading-[0.9] mb-8" style={{ fontFamily: "'ACaslonPro-Regular', Georgia, serif" }}>
                        Don <span className="text-[#c28e6c] italic">Quijote</span>
                    </h1>
                    <h2 className="text-xl md:text-3xl text-[#a89582] font-light tracking-tight mb-6">
                        Identidad visual clásica y síntesis artesanal.
                    </h2>
                    <p className="text-base md:text-lg text-[#7a6552] font-light leading-relaxed max-w-2xl">
                        Diseño de logotipo para gastronomía tradicional, enfocado en la versatilidad de la marca para aplicaciones físicas de alta calidad como madera, cuero y grabados.
                    </p>
                </motion.div>
            </div>

            {/* --- MOCKUPS PRINCIPALES --- */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-7xl w-full mb-32 space-y-8"
            >
                <div className="rounded-2xl overflow-hidden bg-[#241a13] border border-[#3a281c] aspect-video relative group shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#16100c] via-transparent to-transparent opacity-60 z-10 pointer-events-none"></div>
                    <img src="/quijote-cartel.png" className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-1000" alt="Cartel Exterior Rústico" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="rounded-2xl overflow-hidden bg-[#241a13] border border-[#3a281c] aspect-square group shadow-xl">
                        <img src="/quijote-menu.png" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-1000" alt="Menú Grabado en Madera" />
                    </div>
                    <div className="rounded-2xl overflow-hidden bg-[#241a13] border border-[#3a281c] aspect-square group shadow-xl">
                        <img src="/quijote-posavasos.png" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-1000" alt="Posavasos Rústico" />
                    </div>
                </div>
            </motion.div>

            {/* --- EL CASE STUDY --- */}
            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 pb-32 border-t border-[#3a281c] pt-20 font-sans">
                <div className="md:col-span-7 space-y-20">
                    <section>
                        <h3 className="text-xs tracking-[0.3em] uppercase text-[#c28e6c] font-bold mb-6 border-b border-[#3a281c] pb-4">El Desafío</h3>
                        <div className="text-lg text-[#a89582] font-light leading-relaxed space-y-6">
                            <p>Capturar el espíritu clásico de una figura icónica y adaptarla a un sistema visual funcional. El reto fue lograr una síntesis gráfica que mantuviera la elegancia y el detalle, pero con la solidez necesaria para ser aplicada de forma legible en diversos materiales.</p>
                        </div>
                    </section>
                    <section>
                        <h3 className="text-xs tracking-[0.3em] uppercase text-[#c28e6c] font-bold mb-6 border-b border-[#3a281c] pb-4">La Solución</h3>
                        <div className="text-lg text-[#a89582] font-light leading-relaxed space-y-6">
                            <p>Se vectorizó y refinó una ilustración figurativa tradicional, dotándola de trazos equilibrados y una estructura robusta. Combinada con una tipografía serif atemporal, la marca logra un balance perfecto entre lo rústico y lo sofisticado, ideal para grabados en madera y soportes físicos táctiles.</p>
                        </div>
                    </section>
                </div>

                <div className="md:col-span-5 relative z-10 sticky top-32 h-fit space-y-16">
                    <div>
                        <h3 className="text-xs tracking-[0.3em] uppercase text-[#c28e6c] font-bold mb-6">El Ecosistema Táctil</h3>
                        <ul className="space-y-4 text-sm text-[#a89582] font-light">
                            <li className="border-l border-[#3a281c] pl-4"><strong className="text-[#e8dccb] block">Grabado CNC / Láser</strong> Optimizado para tallado en maderas nobles.</li>
                            <li className="border-l border-[#3a281c] pl-4"><strong className="text-[#e8dccb] block">Bajo Relieve (Debossing)</strong> Aplicaciones en menús de cuero y posavasos.</li>
                            <li className="border-l border-[#3a281c] pl-4"><strong className="text-[#e8dccb] block">Impresión Monocroma</strong> Alta legibilidad a una sola tinta.</li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );
}
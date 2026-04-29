import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function CasaDePastas361() {
    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any } }
    };

    return (
        <div className="min-h-screen bg-[#0d0b0a] text-[#f5f0e8] flex flex-col items-center px-6 md:px-12 lg:px-24 selection:bg-[#a34d35] selection:text-white pb-32">

            {/* --- NAVBAR --- */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-[#0d0b0a]/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-20">
                    <Link to="/" className="group flex items-center gap-3 text-neutral-500 hover:text-[#a34d35] transition-colors duration-300 outline-none">
                        <span className="text-xl font-light mb-1">←</span>
                        <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Volver al Home</span>
                    </Link>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-700 font-medium font-sans">Case Study</span>
                </div>
            </nav>

            {/* --- HERO SECTION --- */}
            <div className="max-w-4xl w-full pt-40 pb-20 relative z-10">
                <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                    <span className="inline-block px-4 py-2 border border-[#a34d35]/30 rounded-full text-[10px] tracking-[0.2em] uppercase text-[#a34d35] bg-[#a34d35]/5 mb-8 font-bold font-sans">
                        Identidad Geográfica & Minimalismo
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] font-light tracking-tighter leading-[0.9] mb-8 italic" style={{ fontFamily: 'serif' }}>
                        361 <span className="text-[#a34d35] not-italic font-bold tracking-tight">Casa de Pastas</span>
                    </h1>
                    <h2 className="text-xl md:text-3xl text-neutral-400 font-light tracking-tight mb-6 font-sans">
                        Rosario de Santa Fe 361, Córdoba.
                    </h2>
                    <p className="text-base md:text-lg text-neutral-500 font-light leading-relaxed max-w-2xl font-sans">
                        Rediseño integral de identidad para una propuesta gastronómica que busca la excelencia a través de la síntesis. Un proyecto donde la ubicación física se convierte en el núcleo de la marca.
                    </p>
                </motion.div>
            </div>

            {/* --- MOCKUPS SECTION --- */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-7xl w-full mb-32 space-y-8 relative z-0"
            >
                <div className="rounded-3xl overflow-hidden bg-neutral-900 border border-white/5 aspect-video relative group">
                    <img src="/361-exterior.png" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000" alt="361 Storefront" />
                    <div className="absolute inset-0 bg-black/10 group-hover:opacity-0 transition-opacity duration-700"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="rounded-3xl overflow-hidden bg-neutral-900 border border-white/5 aspect-square">
                        <img src="/361-packaging.png" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" alt="Packaging Mockup" />
                    </div>
                    <div className="rounded-3xl overflow-hidden bg-neutral-900 border border-white/5 aspect-square">
                        <img src="/361-detail.png" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" alt="Detail Mockup" />
                    </div>
                </div>
            </motion.div>

            {/* --- ESTRATEGIA & DISEÑO --- */}
            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 pb-32 border-t border-white/5 pt-20 font-sans">
                <div className="md:col-span-7 space-y-20">
                    <section>
                        <h3 className="text-xs tracking-[0.3em] uppercase text-[#a34d35] font-bold mb-6 border-b border-white/5 pb-4">La Estrategia</h3>
                        <div className="text-lg text-neutral-400 font-light leading-relaxed space-y-6">
                            <p>El desafío principal consistió en alejar a la marca de los recursos visuales genéricos del rubro. Se optó por una identidad anclada en el real estate: el número de la calle como nombre propio. Esta decisión estratégica facilita la recordación y posiciona al local como un hito urbano en la ciudad de Córdoba.</p>
                            <p>La marca se apoya en la sobriedad de sus materiales y en una estética minimalista que permite que la arquitectura del local y el producto artesanal sean los verdaderos protagonistas de la experiencia.</p>
                        </div>
                    </section>
                    <section>
                        <h3 className="text-xs tracking-[0.3em] uppercase text-[#a34d35] font-bold mb-6 border-b border-neutral-800/20 pb-4">Desarrollo Visual</h3>
                        <div className="text-lg text-neutral-400 font-light leading-relaxed space-y-6">
                            <p>La arquitectura tipográfica combina una familia con serifa de alto contraste para los títulos principales con una tipografía sans-serif técnica para los descriptores y señalética, asegurando una lectura clara en aplicaciones de packaging y fachada.</p>
                        </div>
                    </section>
                </div>

                <div className="md:col-span-5 relative z-10 sticky top-32 h-fit space-y-16">
                    <div>
                        <h3 className="text-xs tracking-[0.3em] uppercase text-[#a34d35] font-bold mb-6">Puntos Clave</h3>
                        <ul className="space-y-4 text-sm text-neutral-400 font-light">
                            <li className="border-l border-[#a34d35]/30 pl-4">
                                <strong className="text-neutral-200 block">Naming</strong>
                                Transposición de la ubicación geográfica a la identidad de marca.
                            </li>
                            <li className="border-l border-[#a34d35]/30 pl-4">
                                <strong className="text-neutral-200 block">Austeridad</strong>
                                Eliminación de ornamentos para resaltar la calidad del producto.
                            </li>
                            <li className="border-l border-[#a34d35]/30 pl-4">
                                <strong className="text-neutral-200 block">Presencia</strong>
                                Sistema visual diseñado para destacar en el entorno urbano cordobés.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );
}
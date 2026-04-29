import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function LosTucus() {
    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-[#f4f4f5] flex flex-col items-center px-6 md:px-12 lg:px-24 selection:bg-[#d5a05a] selection:text-[#0a0a0a] pb-32">

            {/* --- NAVBAR --- */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-neutral-900/50">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-20">
                    <Link to="/" className="group flex items-center gap-3 text-neutral-400 hover:text-[#d5a05a] transition-colors duration-300 outline-none">
                        <span className="text-xl font-light mb-1">←</span>
                        <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Volver al Home</span>
                    </Link>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-600 font-medium">Case Study</span>
                </div>
            </nav>

            {/* --- HERO SECTION --- */}
            <div className="max-w-4xl w-full pt-40 pb-20 relative z-10">
                <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                    <span className="inline-block px-4 py-2 border border-[#d5a05a]/30 rounded-full text-[10px] tracking-[0.2em] uppercase text-[#d5a05a] bg-[#d5a05a]/5 mb-8 font-bold">
                        Food Branding & D2C
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-light tracking-tighter leading-[0.9] mb-8 whitespace-nowrap">
                        <span className="text-[#d5a05a] font-medium">Los Tucus</span> Empanadas
                    </h1>
                    <h2 className="text-xl md:text-3xl text-neutral-300 font-light tracking-tight mb-6">
                        Tradición regional, formato congelado.
                    </h2>
                    <p className="text-base md:text-lg text-neutral-500 font-light leading-relaxed max-w-2xl">
                        Diseño de identidad visual para un proyecto gastronómico propio. Un desafío de branding enfocado en el modelo Direct-to-Consumer, empaquetado funcional y presencia digital.
                    </p>
                </motion.div>
            </div>

            {/* --- MOCKUPS PRINCIPALES (TODOS .PNG) --- */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-7xl w-full mb-32 space-y-8"
            >
                <div className="rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 aspect-video md:aspect-[21/9] relative group">
                    <img src="/tucus-container.png" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Los Tucus Frozen Container" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 aspect-square group relative">
                        <img src="/tucus-box1.png" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Cardboard Box Packaging Detail" />
                    </div>
                    <div className="rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 aspect-square group relative">
                        <img src="/tucus-ig.png" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Instagram Social Media" />
                    </div>
                </div>
            </motion.div>

            {/* --- EL CASE STUDY --- */}
            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 pb-32 border-t border-neutral-900 pt-20">
                <div className="md:col-span-7 space-y-20">
                    <section>
                        <h3 className="text-xs tracking-[0.3em] uppercase text-[#d5a05a] font-bold mb-6 border-b border-neutral-800 pb-4">El Proyecto</h3>
                        <div className="text-lg text-neutral-400 font-light leading-relaxed space-y-6">
                            <p>Nacido como un emprendimiento personal, "Los Tucus Empanadas" busca reivindicar la auténtica empanada tucumana mediante un modelo de negocio D2C (Direct-to-Consumer) de productos congelados premium, listos para hornear en casa.</p>
                            <p>El desafío visual consistía en crear una marca funcional que destacara en el freezer del consumidor. Se diseñó un logotipo en formato "insignia" o sello, pensado específicamente para ser aplicado como calcomanía monocromática sobre envases plásticos transparentes. Esta decisión permite que el producto real hable por sí mismo, mientras la marca asegura la fidelización y el contacto directo para la recompra.</p>
                        </div>
                    </section>
                    <section>
                        <h3 className="text-xs tracking-[0.3em] uppercase text-[#d5a05a] font-bold mb-6 border-b border-neutral-800 pb-4">Identidad & Detalles</h3>
                        <div className="text-lg text-neutral-400 font-light leading-relaxed space-y-6">
                            <p>El logotipo incorpora ondas superiores que remiten al clásico repulgue de manera geométrica y moderna. Al tratarse de un producto que se entrega congelado, el diseño debía ser extremadamente limpio y legible, evitando tintas innecesarias y asegurando que la información de contacto (redes y WhatsApp) estuviera siempre visible y clara ante la humedad del envase.</p>
                        </div>
                    </section>
                </div>

                <div className="md:col-span-5 relative z-10 sticky top-32 h-fit space-y-16">
                    <div>
                        <h3 className="text-xs tracking-[0.3em] uppercase text-[#d5a05a] font-bold mb-6">Ecosistema de Marca</h3>
                        <ul className="space-y-4 text-sm text-neutral-400 font-light">
                            <li className="border-l border-neutral-800 pl-4"><strong className="text-neutral-200 block">Logotipo Sello</strong> Diseño insignia versátil optimizado para lectura rápida.</li>
                            <li className="border-l border-neutral-800 pl-4"><strong className="text-neutral-200 block">Packaging Congelado</strong> Sistema de etiquetado monocromático para contenedores transparentes.</li>
                            <li className="border-l border-neutral-800 pl-4"><strong className="text-neutral-200 block">Social Media</strong> Dirección de arte orientada a la conversión y venta directa por Instagram.</li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );
}
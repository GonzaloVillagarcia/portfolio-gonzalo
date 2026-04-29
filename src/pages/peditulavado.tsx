import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function PediTuLavado() {
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
                    <span className="inline-block px-4 py-2 border border-[#9FD592]/30 rounded-full text-[10px] tracking-[0.2em] uppercase text-[#9FD592] bg-[#9FD592]/5 mb-8 font-bold">
                        Founder
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-light tracking-tighter leading-[0.9] uppercase mb-8">
                        Pedí tu <span className="text-[#9FD592] font-medium">lavado</span>
                    </h1>
                    <h2 className="text-xl md:text-3xl text-neutral-300 font-light tracking-tight mb-6">
                        Elevando la Logística On-Demand.
                    </h2>
                    <p className="text-base md:text-lg text-neutral-500 font-light leading-relaxed max-w-2xl">
                        Transformando un servicio tradicional en una experiencia digital de alta fidelidad, con flujos de trabajo impulsados por IA.
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
                        <div className="aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden relative border border-neutral-800 bg-[#0a0a0a]">
                            <img
                                src="/perfilcliente1.png"
                                alt="PediTuLavado Web Interface"
                                className="w-full h-full object-cover md:object-contain group-hover:scale-105 transition-transform duration-1000"
                            />
                            <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                <span className="text-xs text-white/80 font-medium tracking-wide uppercase bg-black/50 px-3 py-1 rounded backdrop-blur-md">
                                    [ Web Dashboard ]
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-7 bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl p-4 md:p-6 group">
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden relative border border-neutral-800 bg-[#0a0a0a]">
                            <img
                                src="/perfilcliente2.png"
                                alt="PediTuLavado App Isometric"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <span className="absolute bottom-6 left-6 text-xs text-white/80 font-medium tracking-wide uppercase bg-black/50 px-3 py-1 rounded backdrop-blur-md">
                                [ Mobile App Experience ]
                            </span>
                        </div>
                    </div>

                    <div className="md:col-span-5 bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl p-4 md:p-6 md:mt-16 group">
                        <div className="aspect-[3/4] rounded-2xl overflow-hidden relative border border-neutral-800 bg-[#0a0a0a]">
                            <img
                                src="/perfilcliente.png"
                                alt="PediTuLavado UI Front"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <span className="absolute bottom-6 left-6 text-xs text-white/80 font-medium tracking-wide uppercase bg-black/50 px-3 py-1 rounded backdrop-blur-md">
                                [ Interface Detail ]
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
                                El proyecto nace de una doble necesidad estructural: democratizar el acceso a oportunidades laborales flexibles en el contexto económico argentino, y eliminar la fricción logística para usuarios que carecen de tiempo.
                            </p>
                            <p>
                                El reto principal era digitalizar un rubro 100% analógico, reduciendo la carga cognitiva al mínimo para que solicitar un lavado a domicilio fuera tan intuitivo como pedir un Uber.
                            </p>
                        </div>
                    </motion.section>

                    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                        <h3 className="text-xs tracking-[0.3em] uppercase text-[#9FD592] font-bold mb-6 border-b border-neutral-800 pb-4">
                            La Solución
                        </h3>
                        <div className="text-base md:text-lg text-neutral-400 font-light leading-relaxed space-y-6">
                            <p>
                                Un ecosistema digital end-to-end que conecta demanda y oferta mediante una interfaz hiper-optimizada. La plataforma automatiza todo el ciclo de vida del servicio: desde el descubrimiento geolocalizado hasta la transacción financiera y la notificación final.
                            </p>
                        </div>
                    </motion.section>

                    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                        <h3 className="text-xs tracking-[0.3em] uppercase text-[#9FD592] font-bold mb-6 border-b border-neutral-800 pb-4">
                            El Impacto
                        </h3>
                        <div className="text-base md:text-lg text-neutral-400 font-light leading-relaxed space-y-6">
                            <p>
                                Pedí tu lavado trasciende la idea de una simple aplicación; es la validación empírica de cómo el diseño centrado en el usuario y la ingeniería moderna pueden resolver problemas socio-logísticos complejos. Un producto que orquesta múltiples APIs de escala empresarial bajo una interfaz fluida, estética y funcional.
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
                                    <span className="text-neutral-200 font-medium">Frontend</span>
                                    <span>React 19, TypeScript (Vite), Framer Motion.</span>
                                </li>
                                <li className="flex flex-col gap-1">
                                    <span className="text-neutral-200 font-medium">Backend & Infraestructura</span>
                                    <span>Supabase (PostgreSQL, Realtime, RLS Auth).</span>
                                </li>
                                <li className="flex flex-col gap-1">
                                    <span className="text-neutral-200 font-medium">Metodología</span>
                                    <span>AI-Driven Workflows (IA generativa para iteración ágil).</span>
                                </li>
                            </ul>
                        </motion.section>

                        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h3 className="text-xs tracking-[0.3em] uppercase text-[#9FD592] font-bold mb-6">
                                Pilares del Proyecto
                            </h3>
                            <ul className="space-y-6 text-sm font-light text-neutral-400">
                                <li className="border-l border-neutral-800 pl-4">
                                    <strong className="text-neutral-200 font-medium block mb-1">UX/UI Mobile-First</strong>
                                    Flujo de conversión reducido a su mínima expresión.
                                </li>
                                <li className="border-l border-neutral-800 pl-4">
                                    <strong className="text-neutral-200 font-medium block mb-1">Google Maps API</strong>
                                    Asignación dinámica por proximidad geográfica.
                                </li>
                                <li className="border-l border-neutral-800 pl-4">
                                    <strong className="text-neutral-200 font-medium block mb-1">Fintech Integration</strong>
                                    Checkout transparente y split payments (Mercado Pago).
                                </li>
                                <li className="border-l border-neutral-800 pl-4">
                                    <strong className="text-neutral-200 font-medium block mb-1">WhatsApp API (Meta)</strong>
                                    Notificación instantánea a los lavadores sobre nuevas solicitudes.
                                </li>
                            </ul>
                        </motion.section>

                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="pt-8 relative z-20">
                            <a
                                href="https://www.peditulavado.com.ar"
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

            {/* --- NUEVA SECCIÓN: BRAND EVOLUTION --- */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
                className="max-w-5xl w-full border-t border-neutral-900 pt-20 pb-32"
            >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

                    {/* Logo Showcase */}
                    <div className="md:col-span-6 bg-neutral-200 rounded-3xl p-12 md:p-20 flex items-center justify-center shadow-inner aspect-[4/3] relative overflow-hidden group">
                        {/* Grid sutil de fondo para darle toque técnico */}
                        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>

                        <img
                            src="/logo-gota.svg"
                            alt="Gota - Rediseño Pedí tu lavado"
                            className="w-full max-w-[280px] object-contain relative z-10 group-hover:scale-105 transition-transform duration-700"
                        />
                    </div>

                    {/* Justificación Estratégica */}
                    <div className="md:col-span-6 space-y-6">
                        <span className="inline-block border border-neutral-700 text-neutral-400 text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-full mb-2 font-medium">
                            Brand Evolution (Concept)
                        </span>
                        <h3 className="text-3xl md:text-4xl font-light tracking-tight text-neutral-200">
                            Rediseño & <br />Viabilidad Comercial.
                        </h3>
                        <p className="text-base text-neutral-400 font-light leading-relaxed">
                            Propuesta de rebranding ("Gota") desarrollada para elevar la identidad visual a estándares corporativos. El concepto superó las pruebas de validación con usuarios finales gracias a su legibilidad y pregnancia isotípica.
                        </p>
                        <p className="text-base text-neutral-400 font-light leading-relaxed">
                            Actualmente el rediseño se encuentra en <span className="text-neutral-200 font-medium">stand-by estratégico</span> debido a la ocupación de activos digitales críticos (dominios y handles en redes). Una decisión que subraya mi filosofía: el diseño siempre debe estar supeditado a la estrategia y viabilidad del negocio.
                        </p>
                    </div>

                </div>
            </motion.div>

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
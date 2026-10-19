import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Vertex() {
    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any } }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-neutral-50 flex flex-col items-center px-6 md:px-12 lg:px-24 selection:bg-[#9841ff] selection:text-white">

            {/* --- NAVBAR SECUNDARIO --- */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-neutral-900/50">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-20">
                    <Link
                        to="/"
                        className="group flex items-center gap-3 text-neutral-400 hover:text-[#b58cff] transition-colors duration-300 outline-none"
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
                    <span className="inline-block px-4 py-2 border border-[#9841ff]/30 rounded-full text-[10px] tracking-[0.2em] uppercase text-[#b58cff] bg-[#9841ff]/5 mb-8 font-bold">
                        Producto · SaaS
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-light tracking-tighter leading-[0.9] uppercase mb-8">
                        Vertex<span className="text-[#9841ff] font-medium">.</span>
                    </h1>
                    <h2 className="text-xl md:text-3xl text-neutral-300 font-light tracking-tight mb-6">
                        Torneos de pádel, de la inscripción a la final, sin planillas.
                    </h2>
                    <p className="text-base md:text-lg text-neutral-500 font-light leading-relaxed max-w-2xl">
                        Plataforma web multi-club para organizar torneos de pádel: inscripciones, fixture automático, cuadro en vivo y ranking. Producto propio, de la idea a la construcción, donde me encargué de la visión de producto, el diseño UX/UI, la identidad visual y el desarrollo asistido por IA.
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

                    <div className="md:col-span-12 bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl p-2 md:p-4 group">
                        <div className="aspect-video rounded-2xl overflow-hidden relative border border-neutral-800 bg-[#0a0a0a]">
                            <img
                                src="/vertex-mock-hero.jpg"
                                alt="Webapp de Vertex en notebook y mobile: home y próximo partido"
                                loading="lazy"
                                className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-1000"
                            />
                            <span className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-xs text-white/80 font-medium tracking-wide uppercase bg-black/50 px-3 py-1 rounded backdrop-blur-md">
                                [ Webapp · Desktop y mobile ]
                            </span>
                        </div>
                    </div>

                    <div className="md:col-span-7 bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl p-2 md:p-4 group">
                        <div className="aspect-video rounded-2xl overflow-hidden relative border border-neutral-800 bg-[#0a0a0a]">
                            <img
                                src="/vertex-mock-bracket.jpg"
                                alt="Cuadro en vivo de un torneo en Vertex, en notebook"
                                loading="lazy"
                                className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-1000"
                            />
                            <span className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-xs text-white/80 font-medium tracking-wide uppercase bg-black/50 px-3 py-1 rounded backdrop-blur-md">
                                [ Cuadro en vivo ]
                            </span>
                        </div>
                    </div>

                    <div className="md:col-span-5 bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl p-2 md:p-4 group md:mt-16">
                        <div className="aspect-[4/5] rounded-2xl overflow-hidden relative border border-neutral-800 bg-[#0a0a0a]">
                            <img
                                src="/vertex-mock-ranking.jpg"
                                alt="Ranking por categoría de Vertex en mobile"
                                loading="lazy"
                                className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-1000"
                            />
                            <span className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-xs text-white/80 font-medium tracking-wide uppercase bg-black/50 px-3 py-1 rounded backdrop-blur-md">
                                [ Ranking por categoría ]
                            </span>
                        </div>
                    </div>

                    <div className="md:col-span-5 bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl p-2 md:p-4 group">
                        <div className="aspect-[4/5] rounded-2xl overflow-hidden relative border border-neutral-800 bg-[#0a0a0a]">
                            <img
                                src="/vertex-mock-mobile.jpg"
                                alt="Home y cuadro de torneo de Vertex en mobile"
                                loading="lazy"
                                className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-1000"
                            />
                            <span className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-xs text-white/80 font-medium tracking-wide uppercase bg-black/50 px-3 py-1 rounded backdrop-blur-md">
                                [ Pensada para mobile ]
                            </span>
                        </div>
                    </div>

                    <div className="md:col-span-7 bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl p-2 md:p-4 group md:mt-16">
                        <div className="aspect-video rounded-2xl overflow-hidden relative border border-neutral-800 bg-[#0a0a0a]">
                            <img
                                src="/vertex-mock-torneos.jpg"
                                alt="Listado de torneos de todos los clubes en Vertex, en notebook"
                                loading="lazy"
                                className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-1000"
                            />
                            <span className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-xs text-white/80 font-medium tracking-wide uppercase bg-black/50 px-3 py-1 rounded backdrop-blur-md">
                                [ Torneos de todos los clubes ]
                            </span>
                        </div>
                    </div>

                </div>
            </motion.div>

            {/* --- ESTRUCTURA DEL CASE STUDY --- */}
            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-x-8 lg:gap-x-12 md:gap-y-24 pb-20 relative z-10">

                <div className="md:col-span-7 space-y-20">
                    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                        <h3 className="text-xs tracking-[0.3em] uppercase text-[#b58cff] font-bold mb-6 border-b border-neutral-800 pb-4">
                            El Desafío
                        </h3>
                        <div className="text-base md:text-lg text-neutral-400 font-light leading-relaxed space-y-6">
                            <p>
                                La idea nació de un amigo que organiza torneos en sus canchas de pádel y llevaba todo el proceso a mano: inscripciones, cruces, fixture y resultados.
                            </p>
                            <p>
                                El desafío era resolver ese flujo completo para cualquier club, no solo para uno: contemplar distintas modalidades de torneo, que los jugadores pudieran inscribirse solos y que todos siguieran el cuadro en tiempo real.
                            </p>
                        </div>
                    </motion.section>

                    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                        <h3 className="text-xs tracking-[0.3em] uppercase text-[#b58cff] font-bold mb-6 border-b border-neutral-800 pb-4">
                            La Solución
                        </h3>
                        <div className="text-base md:text-lg text-neutral-400 font-light leading-relaxed space-y-6">
                            <p>
                                Una plataforma con dos lados. El club da de alta su espacio, crea el torneo y configura formato, categoría, cupos y premios en minutos. Del otro lado, cada capitán arma su pareja e invita a su compañero con un link, sin trámites.
                            </p>
                            <p>
                                Vertex soporta tres modalidades: eliminación simple, zonas más playoffs y americano. Genera el fixture y los horarios automáticamente, muestra el cuadro en vivo a medida que se cargan los resultados y crea una historia lista para compartir en Instagram con los ganadores.
                            </p>
                            <p>
                                El ranking es híbrido: cada club tiene su propia tabla y su comunidad, y una tabla global cruza los resultados entre clubes para que también compitan entre sí.
                            </p>
                        </div>
                    </motion.section>

                    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                        <h3 className="text-xs tracking-[0.3em] uppercase text-[#b58cff] font-bold mb-6 border-b border-neutral-800 pb-4">
                            El Nombre y la Identidad
                        </h3>
                        <div className="text-base md:text-lg text-neutral-400 font-light leading-relaxed space-y-6">
                            <p>
                                Vertex (vértice) hace referencia al punto de convergencia: la cima, la cúspide donde se cruzan las líneas de un cuadro de torneo y donde los jugadores se disputan la gloria en la cancha.
                            </p>
                            <p>
                                Además, fonética y visualmente encajaba con la estética que definimos desde el día uno: dark mode, minimalista y con aire tech/Web3, para distanciarnos de los sistemas aburridos y anticuados que usan la mayoría de los clubes.
                            </p>
                            <p>
                                El isotipo es una V construida con nodos y líneas, y el sistema visual combina fondo oscuro con acentos neón (azul, violeta y magenta), tipografía display en mayúsculas y canchas de pádel iluminadas como escenario.
                            </p>
                        </div>
                    </motion.section>
                </div>

                <div className="md:col-span-5 relative z-10">
                    <div className="sticky top-32 space-y-16">

                        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h3 className="text-xs tracking-[0.3em] uppercase text-[#b58cff] font-bold mb-6">
                                Excelencia Técnica
                            </h3>
                            <ul className="space-y-6 text-sm md:text-base text-neutral-400 font-light">
                                <li className="flex flex-col gap-1">
                                    <span className="text-neutral-200 font-medium">Frontend</span>
                                    <span>Next.js, React y TypeScript, con Tailwind CSS.</span>
                                </li>
                                <li className="flex flex-col gap-1">
                                    <span className="text-neutral-200 font-medium">Backend & Datos</span>
                                    <span>Supabase: autenticación, base de datos y almacenamiento.</span>
                                </li>
                                <li className="flex flex-col gap-1">
                                    <span className="text-neutral-200 font-medium">Lógica de torneo</span>
                                    <span>Generación de cuadros, zonas, americano y ranking, cubiertos con tests automáticos.</span>
                                </li>
                            </ul>
                        </motion.section>

                        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h3 className="text-xs tracking-[0.3em] uppercase text-[#b58cff] font-bold mb-6">
                                Pilares del Proyecto
                            </h3>
                            <ul className="space-y-6 text-sm font-light text-neutral-400">
                                <li className="border-l border-neutral-800 pl-4">
                                    <strong className="text-neutral-200 font-medium block mb-1">Multi-club</strong>
                                    Cada club gestiona sus torneos, colaboradores y comunidad.
                                </li>
                                <li className="border-l border-neutral-800 pl-4">
                                    <strong className="text-neutral-200 font-medium block mb-1">Fixture Automático</strong>
                                    Cuadros y horarios generados según la modalidad elegida.
                                </li>
                                <li className="border-l border-neutral-800 pl-4">
                                    <strong className="text-neutral-200 font-medium block mb-1">Cuadro en Vivo</strong>
                                    Resultados y llaves actualizados al instante para todos.
                                </li>
                                <li className="border-l border-neutral-800 pl-4">
                                    <strong className="text-neutral-200 font-medium block mb-1">Ranking Híbrido</strong>
                                    Tabla por club y tabla global entre clubes.
                                </li>
                            </ul>
                        </motion.section>

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

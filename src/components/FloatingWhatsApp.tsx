import { motion } from 'framer-motion';

const WHATSAPP_NUMBER = '5493513904389';
const DEFAULT_MESSAGE = 'Hola Gonzalo! Vi tu portfolio y me gustaría charlar sobre un proyecto.';

export default function FloatingWhatsApp() {
    const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4, ease: 'easeOut' }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-black/30 transition-shadow duration-300 hover:shadow-xl hover:shadow-[#25D366]/30 md:h-16 md:w-16"
        >
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
            <svg
                viewBox="0 0 32 32"
                fill="currentColor"
                className="relative h-7 w-7 text-white md:h-8 md:w-8"
                aria-hidden="true"
            >
                <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.383.7 4.6 1.902 6.463L4 29l7.706-1.874A11.94 11.94 0 0 0 16.001 27C22.629 27 28 21.627 28 15S22.629 3 16.001 3Zm0 21.75c-1.982 0-3.827-.568-5.393-1.55l-.387-.235-4.573 1.112 1.224-4.46-.253-.393A9.72 9.72 0 0 1 5.25 15c0-5.936 4.815-10.75 10.751-10.75S26.75 9.064 26.75 15 21.937 24.75 16.001 24.75Zm5.907-8.05c-.323-.161-1.91-.943-2.206-1.05-.296-.108-.512-.161-.727.161-.215.323-.834 1.05-1.023 1.266-.188.215-.377.242-.7.081-.323-.161-1.364-.503-2.598-1.604-.96-.856-1.609-1.913-1.797-2.236-.188-.323-.02-.497.141-.658.145-.144.323-.377.484-.565.161-.188.215-.323.323-.538.108-.215.054-.404-.027-.565-.081-.161-.727-1.751-.996-2.399-.262-.631-.529-.546-.727-.556l-.619-.011c-.215 0-.565.081-.861.404-.296.323-1.13 1.104-1.13 2.693 0 1.589 1.157 3.124 1.318 3.339.161.215 2.278 3.478 5.52 4.878.771.333 1.373.532 1.842.681.774.246 1.478.211 2.035.128.621-.093 1.91-.781 2.179-1.535.269-.754.269-1.4.188-1.535-.081-.134-.296-.215-.619-.377Z" />
            </svg>
        </motion.a>
    );
}

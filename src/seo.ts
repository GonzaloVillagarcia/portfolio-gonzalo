// Metadatos por ruta. Los usa:
// - vite.config.ts → genera un HTML estático por ruta en el build (lo que leen LinkedIn, WhatsApp, Google sin JS).
// - App.tsx → actualiza el <title> al navegar dentro de la SPA.

export const SITE_URL = 'https://www.gonzalovillagarcia.com.ar';
export const SITE_NAME = 'Gonzalo Villagarcía';
export const DEFAULT_IMAGE = '/og-image.png';

export type RouteMeta = {
    title: string;
    description: string;
    image?: string;
};

export const ROUTE_META: Record<string, RouteMeta> = {
    '/': {
        title: 'Gonzalo Villagarcía | Product Designer (UX/UI)',
        description:
            'Product Designer (UX/UI) en Córdoba, Argentina. Diseño productos digitales y los llevo a producción con desarrollo asistido por IA. 6+ años en diseño, casi 4 en productos fintech y Web3.',
    },
    '/peditulavado': {
        title: 'Pedí tu lavado — Caso de estudio | Gonzalo Villagarcía',
        description:
            'Caso de estudio de Pedí tu lavado, producto propio: plataforma web que conecta clientes con lavadores. Diseño de producto y lanzamiento.',
        image: '/portfolio1.png',
    },
    '/zygma': {
        title: 'Zygma — Diseño web | Gonzalo Villagarcía',
        description: 'Sitio institucional para empresa de soluciones constructivas.',
        image: '/zygma1.png',
    },
    '/museo3d': {
        title: 'Museo 3D — Experiencia web | Gonzalo Villagarcía',
        description: 'Experiencia inmersiva e interactiva en la web.',
        image: '/login.png',
    },
    '/rsconnecting': {
        title: 'RS Connecting — Identidad de marca | Gonzalo Villagarcía',
        description: 'Identidad de marca para reclutamiento IT a nivel LATAM.',
        image: '/rs-home-mockup.png',
    },
    '/lostucus': {
        title: 'Los Tucus Empanadas — Branding | Gonzalo Villagarcía',
        description: 'Identidad visual y packaging para un modelo de negocio de congelados direct-to-consumer.',
        image: '/tucus-box1.png',
    },
    '/brooklyns': {
        title: 'Brooklyn’s — Branding | Gonzalo Villagarcía',
        description: 'Identidad visual y sistema de marca con espíritu urbano.',
        image: '/brooklyns-home-mockup.jpg',
    },
    '/361casadepastas': {
        title: '361 Casa de Pastas — Branding | Gonzalo Villagarcía',
        description: 'Identidad visual urbana para una casa de pastas en Córdoba.',
        image: '/361-packaging.png',
    },
    '/donquijote': {
        title: 'Don Quijote — Branding | Gonzalo Villagarcía',
        description: 'Identidad visual para gastronomía de categoría.',
        image: '/quijote-menu.png',
    },
    '/academiaderiego': {
        title: 'Academia de Riego — Branding | Gonzalo Villagarcía',
        description: 'Arquitectura de marca e identidad visual para la Academia de Riego de Kilimo.',
        image: '/riego-brandbook.png',
    },
};

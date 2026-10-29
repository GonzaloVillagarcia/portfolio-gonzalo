# Design system · Pedí tu lavado

Tokens, componentes y pantallas sacados del código real de la app (cliente, lavador y landing). Esta carpeta no forma parte del sitio: Vite solo publica `public/` y lo que importa `src/`, así que nada de acá llega al build.

## Qué hay

| Archivo | Para qué |
|---|---|
| `tokens.json` | Fuente de verdad. Formato W3C Design Tokens: primitivos, semánticos (Claro / Oscuro), espaciado, radios, estilos de texto y sombras. |
| `style-guide.html` | Guía para revisar en el navegador: auditoría, color, contraste, tipografía, componentes con estados y 4 pantallas comparadas con capturas reales. |
| `figma-plugin/` | Plugin de Figma sin dependencias que arma todo el sistema en un archivo. |
| `tools/build.mjs` | Sincroniza `tokens.json` con el style guide y el plugin, y verifica el contraste WCAG AA. |
| `caso-portfolio.md` | Texto para el caso de estudio del portfolio. |
| `referencias/` | Captura de la app real usada para comparar (nombres y fotos de lavadores difuminados). |
| `assets/` | Logo y logo de Mercado Pago copiados de la app. |

## Ver el style guide

Necesita servirse desde un servidor para cargar las imágenes. Desde la raíz del portfolio:

```bash
npm run dev
```

Y abrí `http://localhost:5173/design-system/style-guide.html` (o el puerto que indique Vite).

## Correr el plugin en Figma

1. Abrí **Figma Desktop** (el plugin de desarrollo no funciona en el navegador).
2. Creá un **archivo nuevo y vacío**. El plugin se frena si el archivo ya tiene las colecciones `Primitivos`, `Semánticos` o `Dimensiones`.
3. Menú **Plugins → Development → Import plugin from manifest…** y elegí `design-system/figma-plugin/manifest.json`.
4. Corré **Plugins → Development → Pedí tu lavado · Design System**. Tarda unos segundos.

Lo que crea:

- **Variables**: colección `Primitivos` (escalas por tono, ocultas de los selectores), `Dimensiones` (espaciado y radios) y `Semánticos` con modos **Claro** y **Oscuro**. Cada semántico es un alias a un primitivo y tiene su sintaxis CSS (`var(--brand)`).
- **Estilos**: 14 estilos de texto en Lexend y 6 de sombra (3 niveles y 3 glows), con el color enlazado a variables.
- **Páginas**: Portada, Fundamentos (color, tipografía, espaciado, radios, elevación), Componentes y Pantallas.
- **Componentes**: 21 component sets con variantes (`variant`, `size`, `state`, etc.), auto-layout y propiedades de texto o booleanas donde aplican. Cada uno tiene al lado una nota con cuándo usarlo y cuándo no. Todos los colores, espaciados y radios están enlazados a variables.
- **Pantallas**: 5 pantallas armadas con instancias (mapa, lista de lavadores, seguimiento con PIN, pago y panel del lavador), en modo Claro y repetidas en Oscuro.

Notas:

- La fuente es **Lexend** (Google Fonts, disponible en Figma). Si no está, el plugin usa Inter y avisa.
- El logo del header es un placeholder (gota + texto). Reemplazalo por `assets/logo2.png`.
- El plugin se probó contra una simulación de la API de Figma (corre completo y sin errores), no dentro de Figma. Si algo falla al correrlo, el mensaje de error aparece abajo en Figma: pasámelo y lo ajusto.

## Cambiar un token

1. Editá `tokens.json`.
2. Corré:

```bash
node design-system/tools/build.mjs
```

Actualiza las variables del style guide y regenera `figma-plugin/code.js`. Si algún par de colores deja de cumplir AA, el script lo lista y termina con error. Para cambiar el plugin editá `figma-plugin/code.template.js`, no `code.js`.

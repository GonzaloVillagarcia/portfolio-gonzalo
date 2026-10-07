import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { ROUTE_META, SITE_URL, SITE_NAME, DEFAULT_IMAGE } from './src/seo'

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function renderHead(path: string) {
  const meta = ROUTE_META[path]
  const url = SITE_URL + (path === '/' ? '/' : path)
  const image = SITE_URL + (meta.image ?? DEFAULT_IMAGE)
  const title = escape(meta.title)
  const description = escape(meta.description)
  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="es_AR" />`,
    `<meta property="og:site_name" content="${escape(SITE_NAME)}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ].join('\n    ')
}

// Inyecta las meta tags del home y, en el build, genera un HTML por ruta
// (dist/peditulavado.html, etc.) para que los crawlers sin JS vean título, descripción e imagen correctos.
function seoPages(): Plugin {
  return {
    name: 'seo-pages',
    enforce: 'post',
    transformIndexHtml(html) {
      return html.replace('<!-- SEO -->', renderHead('/'))
    },
    generateBundle(_, bundle) {
      const index = bundle['index.html']
      if (!index || index.type !== 'asset') return
      const html = String(index.source)
      const homeHead = renderHead('/')
      for (const path of Object.keys(ROUTE_META)) {
        if (path === '/') continue
        this.emitFile({
          type: 'asset',
          fileName: `${path.slice(1)}.html`,
          source: html.replace(homeHead, renderHead(path)),
        })
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoPages()],
})

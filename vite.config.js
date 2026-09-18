import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** Where the built site is published. A project Pages site lives under the repo name. */
const PAGES_BASE = '/test-task-mobile-app/'

/** The three deliverable routes. Finite and known, so they can be real files. */
const ROUTES = ['branding', 'design-system', 'app']

/**
 * GitHub Pages serves static files and has no rewrite rule, so a direct request
 * for /branding — or a browser refresh on it — would never reach the router.
 *
 * Rather than lean on the 404 document, each route is emitted as a real
 * directory index: dist/branding/index.html and so on. Pages resolves those
 * itself, so direct navigation and refresh both return a genuine 200 with the
 * URL intact — no redirect, no querystring rewrite, no 404 status on a page
 * that actually exists.
 *
 * dist/404.html is still written, as the catch-all for any other path.
 */
function pagesStaticRoutes() {
  let outDir
  return {
    name: 'kalora:pages-static-routes',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const index = path.join(outDir, 'index.html')
      if (!fs.existsSync(index)) return
      const html = fs.readFileSync(index)
      for (const route of ROUTES) {
        const dir = path.join(outDir, route)
        fs.mkdirSync(dir, { recursive: true })
        fs.writeFileSync(path.join(dir, 'index.html'), html)
      }
      fs.writeFileSync(path.join(outDir, '404.html'), html)
    },
  }
}

export default defineConfig(({ command }) => ({
  // Only the build is based under the repo name; `npm run dev` stays at the
  // root, so local development is unchanged. VITE_BASE overrides it for a
  // one-off build elsewhere.
  base: command === 'build' ? (process.env.VITE_BASE ?? PAGES_BASE) : '/',
  plugins: [react(), pagesStaticRoutes()],
  server: { host: true },
  preview: { host: true },
}))

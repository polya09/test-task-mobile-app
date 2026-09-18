/**
 * Minimal history-API router. Three routes, all three built:
 * /branding (stage 2), /design-system (stage 3) and /app (stage 4).
 *
 * Routes are written here without a prefix and wear the deployment base only
 * at the edges — reading `location.pathname` and writing a URL. Locally the
 * base is `/` and nothing changes; on GitHub Pages it is the repo name, so
 * /branding is served from /test-task-mobile-app/branding without a single
 * route literal in this file having to know that.
 */
import { useEffect, useState } from 'react'
import Branding from './pages/Branding'
import DesignSystem from './pages/DesignSystem'
import AppPrototype from './app/AppPrototype'

const ROUTES = [
  { path: '/branding', label: 'Branding', ready: true },
  { path: '/design-system', label: 'Design system', ready: true },
  { path: '/app', label: 'App', ready: true },
]

/** '' when served from the root, '/test-task-mobile-app' on GitHub Pages. */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '')

/** A route as it must appear in the address bar. */
const withBase = (route) => `${BASE}${route}`

function normalise(pathname) {
  const withoutBase =
    BASE && (pathname === BASE || pathname.startsWith(`${BASE}/`))
      ? pathname.slice(BASE.length)
      : pathname
  const clean = withoutBase.replace(/\/+$/, '') || '/'
  return clean === '/' ? '/branding' : clean
}

export default function App() {
  const [path, setPath] = useState(() => normalise(window.location.pathname))

  useEffect(() => {
    const onPop = () => setPath(normalise(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const go = (event, target) => {
    event.preventDefault()
    if (target === path) return
    window.history.pushState({}, '', withBase(target))
    setPath(target)
  }

  const skip =
    path === '/design-system'
      ? { href: '#ds-scroll', label: 'Skip to the design system' }
      : path === '/app'
        ? { href: '#ap-device', label: 'Skip to the prototype' }
        : { href: '#stylescape', label: 'Skip to the stylescape' }

  return (
    <div className="app">
      <a className="skip-link" href={skip.href}>
        {skip.label}
      </a>

      <header className="app__bar">
        <p className="app__brand">Kalora</p>

        <nav className="app__nav" aria-label="Sections">
          {ROUTES.map((r) => (
            <a
              key={r.path}
              className="app__link"
              href={withBase(r.path)}
              aria-current={path === r.path ? 'page' : undefined}
              aria-disabled={r.ready ? undefined : 'true'}
              onClick={(e) => go(e, r.path)}
            >
              {r.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="app__main">
        {path === '/app' ? (
          <AppPrototype />
        ) : path === '/design-system' ? (
          <DesignSystem />
        ) : (
          <Branding />
        )}
      </main>
    </div>
  )
}

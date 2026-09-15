/**
 * Minimal history-API router. Three routes are reserved from the start
 * (/branding, /design-system, /app); only /branding is built in Stage 2.
 */
import { useEffect, useState } from 'react'
import Branding from './pages/Branding'
import Stub from './pages/Stub'

const ROUTES = [
  { path: '/branding', label: 'Branding', ready: true },
  { path: '/design-system', label: 'Design system', ready: false },
  { path: '/app', label: 'App', ready: false },
]

const STUBS = {
  '/design-system': {
    title: 'Design system',
    text: 'Stage 3. Tokens, components and states are built here on top of the branding decisions.',
  },
  '/app': {
    title: 'App screens',
    text: 'Stage 4. Flows and screens for the calorie calculator and the recipe finder.',
  },
}

function normalise(pathname) {
  const clean = pathname.replace(/\/+$/, '') || '/'
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
    window.history.pushState({}, '', target)
    setPath(target)
  }

  const stub = STUBS[path]

  return (
    <div className="app">
      <a className="skip-link" href="#stylescape">
        Skip to the stylescape
      </a>

      <header className="app__bar">
        <p className="app__brand">
          Kalora <span className="app__stage">STAGE 02</span>
        </p>

        <nav className="app__nav" aria-label="Sections">
          {ROUTES.map((r) => (
            <a
              key={r.path}
              className="app__link"
              href={r.path}
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
        {stub ? <Stub title={stub.title} text={stub.text} /> : <Branding />}
      </main>
    </div>
  )
}

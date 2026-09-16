/**
 * /design-system — the KALORA component library board.
 *
 * The page is a documentation board, not a set of screens: a fixed contents
 * rail, thirteen sections, and two viewer controls that change how the board
 * is read rather than what it contains —
 *
 *   Specs    show or hide the measured spec panels under each component
 *   Density  comfortable (default) or compact section rhythm, for scanning
 *
 * The rail tracks the section in view, so a reviewer always knows where they
 * are in a page this long.
 */
import { useEffect, useMemo, useRef, useState } from 'react'
import { SpecContext } from './docs/Primitives'
import Principles from './sections/Principles'
import Foundations from './sections/Foundations'
import Actions from './sections/Actions'
import Forms from './sections/Forms'
import Navigation from './sections/Navigation'
import DataComponents from './sections/DataComponents'
import Feedback from './sections/Feedback'
import Rules from './sections/Rules'

const CONTENTS = [
  { id: 'principles', label: 'Principles', group: 'Introduction' },
  { id: 'colour', label: 'Colour', group: 'Foundations' },
  { id: 'type', label: 'Typography', group: 'Foundations' },
  { id: 'space', label: 'Space & grid', group: 'Foundations' },
  { id: 'buttons', label: 'Buttons', group: 'Components' },
  { id: 'inputs', label: 'Inputs', group: 'Components' },
  { id: 'selection', label: 'Selection', group: 'Components' },
  { id: 'navigation', label: 'Navigation', group: 'Components' },
  { id: 'progress', label: 'Progress', group: 'Components' },
  { id: 'cards', label: 'Cards', group: 'Components' },
  { id: 'lists', label: 'Lists & tooltips', group: 'Components' },
  { id: 'feedback', label: 'Messages', group: 'Components' },
  { id: 'states', label: 'States', group: 'Components' },
  { id: 'rules', label: 'Rules', group: 'Rules' },
]

function useScrollSpy(ids, rootRef) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const root = rootRef.current
    if (!root || typeof IntersectionObserver === 'undefined') return

    const seen = new Map()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e))
        const visible = [...seen.values()]
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { root, rootMargin: '-10% 0px -70% 0px', threshold: [0, 0.01] },
    )

    ids.forEach((id) => {
      const el = root.querySelector(`#${id}`)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids, rootRef])

  return active
}

export default function DesignSystemPage() {
  const scrollRef = useRef(null)
  const [specs, setSpecs] = useState(true)
  const [density, setDensity] = useState('comfortable')
  const [railOpen, setRailOpen] = useState(false)

  const ids = useMemo(() => CONTENTS.map((c) => c.id), [])
  const active = useScrollSpy(ids, scrollRef)

  const jump = (event, id) => {
    event.preventDefault()
    const root = scrollRef.current
    const target = root?.querySelector(`#${id}`)
    if (!target) return
    root.scrollTo({ top: target.offsetTop - 24, behavior: 'smooth' })
    setRailOpen(false)
    target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
  }

  const groups = CONTENTS.reduce((acc, item) => {
    const last = acc[acc.length - 1]
    if (last && last.name === item.group) last.items.push(item)
    else acc.push({ name: item.group, items: [item] })
    return acc
  }, [])

  return (
    <SpecContext.Provider value={specs}>
      <div className={`ds-page ds-page--${density}`}>
        <div className="ds-toolbar">
          <p className="ds-toolbar__title">
            <strong>KALORA — Design system</strong>
            <span>Stage 3 · component library and documentation</span>
          </p>

          <div className="ds-toolbar__controls">
            <button
              type="button"
              className="ds-toolbar__btn ds-toolbar__btn--rail"
              aria-expanded={railOpen}
              aria-controls="ds-rail"
              onClick={() => setRailOpen((v) => !v)}
            >
              Contents
            </button>

            <span className="ds-toolbar__group" role="group" aria-label="Specification panels">
              <span className="ds-toolbar__legend">Specs</span>
              <button
                type="button"
                className="ds-toolbar__btn"
                aria-pressed={specs}
                onClick={() => setSpecs(true)}
              >
                Show
              </button>
              <button
                type="button"
                className="ds-toolbar__btn"
                aria-pressed={!specs}
                onClick={() => setSpecs(false)}
              >
                Hide
              </button>
            </span>

            <span className="ds-toolbar__group" role="group" aria-label="Board density">
              <span className="ds-toolbar__legend">Density</span>
              <button
                type="button"
                className="ds-toolbar__btn"
                aria-pressed={density === 'comfortable'}
                onClick={() => setDensity('comfortable')}
              >
                Comfortable
              </button>
              <button
                type="button"
                className="ds-toolbar__btn"
                aria-pressed={density === 'compact'}
                onClick={() => setDensity('compact')}
              >
                Compact
              </button>
            </span>
          </div>
        </div>

        <div className="ds-body">
          <nav
            className={['ds-rail', railOpen && 'is-open'].filter(Boolean).join(' ')}
            id="ds-rail"
            aria-label="Design system contents"
          >
            <p className="ds-rail__title">Contents</p>
            {groups.map((g) => (
              <div className="ds-rail__group" key={g.name}>
                <p className="ds-rail__groupname">{g.name}</p>
                <ul>
                  {g.items.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="ds-rail__link"
                        aria-current={active === item.id ? 'true' : undefined}
                        onClick={(e) => jump(e, item.id)}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <p className="ds-rail__foot">
              Extends the Stage 2 stylescape. Tokens live in <code>src/styles/tokens.css</code>.
            </p>
          </nav>

          <div className="ds-scroll" ref={scrollRef} id="ds-scroll">
            <main className="ds-board">
              <Principles />
              <Foundations />
              <Actions />
              <Forms />
              <Navigation />
              <DataComponents />
              <Feedback />
              <Rules />
              <footer className="ds-footer">
                <p>
                  KALORA design system — Stage 3. Built on the Stage 2 stylescape; no brand decision was
                  changed to make a component fit.
                </p>
              </footer>
            </main>
          </div>
        </div>
      </div>
    </SpecContext.Provider>
  )
}

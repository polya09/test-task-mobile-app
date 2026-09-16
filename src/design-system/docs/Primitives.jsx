/**
 * Documentation scaffolding — the frame around every specimen.
 *
 * These are not product components. They exist so that each component in the
 * library is presented the same way: a title, a one-line rule, the live
 * component on a labelled surface, and (optionally) its measured spec.
 */
import { createContext, useContext } from 'react'

export const SpecContext = createContext(true)
export const useSpecsVisible = () => useContext(SpecContext)

export function Section({ id, index, title, lead, children }) {
  return (
    <section className="ds-section" id={id} aria-labelledby={`${id}-title`}>
      <header className="ds-section__head">
        <p className="ds-section__index tnum">{index}</p>
        <h2 className="ds-section__title" id={`${id}-title`}>
          {title}
        </h2>
        {lead && <p className="ds-section__lead">{lead}</p>}
      </header>
      <div className="ds-section__body">{children}</div>
    </section>
  )
}

export function Block({ title, rule, children, aside }) {
  return (
    <div className="ds-block">
      <div className="ds-block__head">
        <h3 className="ds-block__title">{title}</h3>
        {rule && <p className="ds-block__rule">{rule}</p>}
      </div>
      <div className="ds-block__body">{children}</div>
      {aside && <div className="ds-block__aside">{aside}</div>}
    </div>
  )
}

/**
 * A single specimen on a labelled stage. `surface` picks the backdrop the
 * component is designed to sit on, so contrast is always judged against the
 * real thing.
 */
export function Specimen({ label, note, surface = 'surface', width, align = 'start', children }) {
  // `width` is the component's real documented width, so the stage has to take
  // it rather than shrink to its content — otherwise a 430 px bottom bar gets
  // documented at whatever width its labels happen to need.
  //
  // Sized with `width`, never a flex-basis: a basis resolves against the main
  // axis, so inside a column stack it would set the specimen's *height*.
  const sizing = width ? { width: `min(100%, ${width}px)` } : undefined
  return (
    <figure className="ds-specimen" style={sizing}>
      <div
        className={`ds-stage ds-stage--${surface}`}
        style={{ justifyContent: align === 'center' ? 'center' : 'flex-start' }}
      >
        {children}
      </div>
      {(label || note) && (
        <figcaption className="ds-specimen__cap">
          {label && <span className="ds-specimen__label">{label}</span>}
          {note && <span className="ds-specimen__note">{note}</span>}
        </figcaption>
      )}
    </figure>
  )
}

/** A row of the same component in each of its documented states. */
export function StateGrid({ states, surface = 'surface', columns, children }) {
  return (
    <div
      className="ds-stategrid"
      style={columns ? { '--cols': columns } : undefined}
    >
      {states.map((s) => (
        <figure className="ds-stategrid__cell" key={s.key ?? s.label}>
          <div className={`ds-stage ds-stage--${surface}`}>{children(s)}</div>
          <figcaption>
            <span className="ds-stategrid__name">{s.label}</span>
            {s.note && <span className="ds-stategrid__note">{s.note}</span>}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

/**
 * Measured specification. Hidden when the viewer turns specs off, so the
 * board can be read either as a gallery or as a build sheet.
 */
export function Spec({ rows, title = 'Spec' }) {
  const visible = useSpecsVisible()
  if (!visible) return null
  return (
    <div className="ds-spec">
      <p className="ds-spec__title">{title}</p>
      <dl className="ds-spec__list">
        {rows.map(([term, detail]) => (
          <div className="ds-spec__row" key={term}>
            <dt>{term}</dt>
            <dd>{detail}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export function TokenRef({ children }) {
  return <code className="ds-token">{children}</code>
}

export function Table({ head, children, dense = false }) {
  return (
    <div className="ds-tablewrap">
      <table className={['ds-table', dense && 'ds-table--dense'].filter(Boolean).join(' ')}>
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

export function Callout({ tone = 'do', title, children }) {
  return (
    <div className={`ds-callout ds-callout--${tone}`}>
      <p className="ds-callout__title">{title}</p>
      <div className="ds-callout__body">{children}</div>
    </div>
  )
}

/** Phone-width frame: proves a component works at the 390 px reference width. */
export function PhoneFrame({ label, children, height }) {
  return (
    <figure className="ds-phone">
      <div className="ds-phone__screen" style={height ? { minHeight: height } : undefined}>
        {children}
      </div>
      {label && <figcaption>{label}</figcaption>}
    </figure>
  )
}

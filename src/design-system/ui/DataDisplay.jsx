/**
 * Data display — list rows, dividers and tooltips.
 *
 * A list row is the densest thing in the product, so it is also where the
 * touch-target rule bites: the row is 64 px tall and any trailing control
 * inside it keeps its own 44 px box.
 */
import Icon from '../../branding/parts/Icons'
import { nf } from '../data'

export function ListRow({
  title,
  meta,
  value,
  unit,
  leading,
  leadingTone,
  trailing,
  onClick,
  selected = false,
}) {
  const Element = onClick ? 'button' : 'div'
  return (
    <Element
      type={onClick ? 'button' : undefined}
      className={['ds-row', leading && 'ds-row--lead', onClick && 'ds-row--action', selected && 'is-selected']
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
      aria-pressed={onClick ? selected : undefined}
    >
      {leading && (
        <span className="ds-row__lead" style={leadingTone ? { '--lead': leadingTone } : undefined}>
          {typeof leading === 'string' ? <Icon name={leading} size={20} stroke={2} /> : leading}
        </span>
      )}
      <span className="ds-row__body">
        <span className="ds-row__title">{title}</span>
        {meta && <span className="ds-row__meta tnum">{meta}</span>}
      </span>
      {value !== undefined && (
        <span className="ds-row__value tnum">
          {typeof value === 'number' ? nf.format(value) : value}
          {unit && <span className="ds-row__unit">{unit}</span>}
        </span>
      )}
      {trailing}
    </Element>
  )
}

export function ListGroup({ label, children, dividers = true }) {
  return (
    <section className={['ds-list', dividers && 'ds-list--dividers'].filter(Boolean).join(' ')}>
      {label && <h4 className="ds-list__label">{label}</h4>}
      <div className="ds-list__body">{children}</div>
    </section>
  )
}

export function Divider({ label, inset = false, tone = 'light' }) {
  if (label) {
    return (
      <div className={`ds-divider ds-divider--labelled ds-divider--${tone}`}>
        <span>{label}</span>
      </div>
    )
  }
  return (
    <hr
      className={['ds-divider', inset && 'ds-divider--inset', `ds-divider--${tone}`].filter(Boolean).join(' ')}
    />
  )
}

/**
 * Tooltip — graphite bubble, one of the few places graphite is used as a
 * surface. Always shown here in its open state so it can be documented;
 * in the product it opens on focus and on long-press.
 */
export function Tooltip({ children, text, placement = 'top', open = true }) {
  return (
    <span className={`ds-tooltip ds-tooltip--${placement}`}>
      {children}
      {open && (
        <span className="ds-tooltip__bubble" role="tooltip">
          {text}
        </span>
      )}
    </span>
  )
}

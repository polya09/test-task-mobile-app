/**
 * Selection controls — segmented control, tabs, filter chips, tags, badges.
 *
 * Selected state is graphite-on-paper or lime-on-graphite, never a colour
 * shift alone: the selected item also carries weight and, on tabs, a 2 px
 * indicator. Chips announce selection with `aria-pressed` and a check glyph.
 */
import { useState } from 'react'
import Icon from '../../branding/parts/Icons'
import { StatusIcon } from './StatusIcon'

export function SegmentedControl({ options, value, onChange, label, size = 'md' }) {
  const [internal, setInternal] = useState(value ?? options[0])
  const current = value ?? internal
  const set = onChange ?? setInternal

  return (
    <div
      className={['ds-segmented', size === 'sm' && 'ds-segmented--sm'].filter(Boolean).join(' ')}
      role="group"
      aria-label={label}
    >
      {options.map((o) => (
        <button
          key={o}
          type="button"
          className="ds-segmented__item"
          aria-pressed={current === o}
          onClick={() => set(o)}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

export function Tabs({ items, value, onChange, label = 'Sections' }) {
  const [internal, setInternal] = useState(value ?? items[0].id)
  const current = value ?? internal
  const set = onChange ?? setInternal

  return (
    <div className="ds-tabs" role="tablist" aria-label={label}>
      {items.map((t) => (
        <button
          key={t.id}
          type="button"
          role="tab"
          className="ds-tabs__tab"
          aria-selected={current === t.id}
          tabIndex={current === t.id ? 0 : -1}
          onClick={() => set(t.id)}
        >
          {t.label}
          {typeof t.count === 'number' && <span className="ds-tabs__count tnum">{t.count}</span>}
        </button>
      ))}
    </div>
  )
}

export function FilterChip({ children, selected = false, disabled = false, icon, onClick, state }) {
  return (
    <button
      type="button"
      className={['ds-chip', selected && 'is-selected', state === 'hover' && 'is-hover', state === 'focus' && 'is-focus']
        .filter(Boolean)
        .join(' ')}
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
    >
      {selected ? (
        <StatusIcon tone="success" size={16} stroke={2.4} className="ds-chip__check" />
      ) : icon ? (
        <Icon name={icon} size={16} stroke={2} />
      ) : null}
      {children}
    </button>
  )
}

/** Static, non-interactive descriptor. Tone is only ever a nutrition or neutral tone. */
export function Tag({ children, tone = 'neutral', dot }) {
  return (
    <span className={`ds-tag ds-tag--${tone}`}>
      {dot && <span className="ds-tag__dot" style={{ '--dot': dot }} aria-hidden="true" />}
      {children}
    </span>
  )
}

/** Count or status marker. Status tones always carry their glyph. */
export function Badge({ children, tone = 'neutral', icon = false }) {
  return (
    <span className={`ds-badge ds-badge--${tone}`}>
      {icon && <StatusIcon tone={tone} size={14} stroke={2.4} />}
      {children}
    </span>
  )
}

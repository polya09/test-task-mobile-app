/**
 * Progress components, all three built on the brand's Precision Ring geometry.
 *
 *   CalorieRing   — the ring as a calorie meter, with the figure inside it
 *   MacroBar      — linear progress, one per macronutrient
 *   GoalIndicator — a target marker on a track: under, on, or over
 *
 * Progress is never colour alone. The ring and every bar state a value and a
 * target in text; over-target adds a glyph and a written "over" label.
 */
import PrecisionRing, { arcEnd } from '../../branding/parts/PrecisionRing'
import { StatusIcon } from './StatusIcon'
import { nf } from '../data'

const pct = (value, target) => (target > 0 ? value / target : 0)

export function CalorieRing({
  value,
  target,
  size = 180,
  stroke = 14,
  unit = 'kcal',
  caption,
  tone = 'light',
}) {
  const ratio = pct(value, target)
  const dark = tone === 'dark'
  // The figure is sized from the ring, not from the page: a 72 px ring cannot
  // carry a 40 px number. 0.215 x diameter keeps "1,170" inside the track at
  // every documented size.
  const valueSize = Math.round(size * 0.215)
  const unitSize = Math.max(10, Math.round(size * 0.075))

  return (
    <div className={['ds-ring', dark && 'ds-ring--dark'].filter(Boolean).join(' ')} style={{ width: size }}>
      <div className="ds-ring__art" style={{ width: size, height: size }}>
        <PrecisionRing
          size={size}
          progress={Math.min(ratio, 1)}
          stroke={stroke}
          track={dark ? 'rgba(247,245,239,0.24)' : 'var(--ds-surface-sunken)'}
          segment="var(--ds-action)"
        />
        <div className="ds-ring__centre" style={{ padding: stroke + 4 }}>
          <p className="ds-ring__value tnum" style={{ fontSize: valueSize, lineHeight: 1.08 }}>
            {nf.format(value)}
          </p>
          <p className="ds-ring__unit" style={{ fontSize: unitSize }}>
            {unit}
          </p>
        </div>
      </div>
      <p className="ds-ring__caption tnum">
        {caption ?? `of ${nf.format(target)} ${unit} · ${Math.round(ratio * 100)}%`}
      </p>
    </div>
  )
}

export function MacroBar({ name, short, value, target, colour, track, unit = 'g', showLegend = true }) {
  const ratio = pct(value, target)
  const over = value > target
  const width = `${Math.min(ratio, 1) * 100}%`

  return (
    <div className={['ds-macro', over && 'is-over'].filter(Boolean).join(' ')}>
      <div className="ds-macro__head">
        <span className="ds-macro__name">
          {showLegend && (
            <span className="ds-macro__key" style={{ '--macro': colour }} aria-hidden="true">
              {short}
            </span>
          )}
          {name}
        </span>
        <span className="ds-macro__value tnum">
          {value} / {target} {unit}
          {over && (
            <span className="ds-macro__over">
              <StatusIcon tone="warning" size={14} stroke={2.4} />
              {value - target} {unit} over
            </span>
          )}
        </span>
      </div>
      <div
        className="ds-macro__track"
        style={{ '--track': track }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={target}
        aria-label={`${name}, ${value} of ${target} ${unit}`}
      >
        <span className="ds-macro__fill" style={{ '--macro': colour, width }} />
      </div>
    </div>
  )
}

/**
 * Goal / target indicator — a linear track with the target notched on it.
 * Status is stated in words ("On target", "Over target") and by a glyph.
 */
export function GoalIndicator({ label, value, target, max, unit = 'kcal', tolerance = 0.05 }) {
  const ceiling = max ?? Math.max(value, target) * 1.25
  const valuePct = Math.min(value / ceiling, 1) * 100
  const targetPct = Math.min(target / ceiling, 1) * 100
  const delta = value - target
  const within = Math.abs(delta) <= target * tolerance

  const status = within
    ? { tone: 'success', text: 'On target' }
    : delta > 0
      ? { tone: 'warning', text: `${nf.format(delta)} ${unit} over` }
      : { tone: 'info', text: `${nf.format(-delta)} ${unit} to go` }

  return (
    <div className="ds-goal">
      <div className="ds-goal__head">
        <span className="ds-goal__label">{label}</span>
        <span className={`ds-goal__status ds-goal__status--${status.tone}`}>
          <StatusIcon tone={status.tone} size={16} stroke={2.2} />
          <span className="tnum">{status.text}</span>
        </span>
      </div>
      <div className="ds-goal__track">
        <span
          className={`ds-goal__fill ds-goal__fill--${status.tone}`}
          style={{ width: `${valuePct}%` }}
        />
        <span className="ds-goal__marker" style={{ left: `${targetPct}%` }} aria-hidden="true" />
      </div>
      <p className="ds-goal__scale tnum">
        <span>
          {nf.format(value)} {unit}
        </span>
        <span>
          Target {nf.format(target)} {unit}
        </span>
      </p>
    </div>
  )
}

/** Exposed so the spec panel can quote the ring's real end-point geometry. */
export const ringEndpoint = arcEnd

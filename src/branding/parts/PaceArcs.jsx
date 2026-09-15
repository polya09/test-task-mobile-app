/**
 * Pace Arcs — the graphic language derived from the Precision Ring.
 * Curved progress segments and short parallel speed lines that read as forward
 * motion. Used sparingly: as an anchor, a corner bleed, or a rhythm marker.
 */
import { arcPath } from './PrecisionRing'

const GRAPHITE = 'var(--k-graphite)'
const LIME = 'var(--k-lime)'
const DEEP = 'var(--k-lime-deep)'

function Nested({ ink, accent }) {
  return (
    <>
      <path d={arcPath(0.58, 42)} fill="none" stroke={accent} strokeWidth="11" strokeLinecap="round" />
      <path d={arcPath(0.42, 27)} fill="none" stroke={ink} strokeWidth="9" strokeLinecap="round" />
      <circle cx="50" cy="50" r="6" fill={accent} />
    </>
  )
}

function Speed({ ink, accent }) {
  const rows = [
    { y: 22, x1: 8, x2: 78, c: 'ink' },
    { y: 38, x1: 8, x2: 92, c: 'accent' },
    { y: 54, x1: 8, x2: 62, c: 'ink' },
    { y: 70, x1: 8, x2: 40, c: 'ink' },
  ]
  return (
    <>
      {rows.map((r) => (
        <path
          key={r.y}
          d={`M${r.x1} ${r.y}H${r.x2}`}
          stroke={r.c === 'accent' ? accent : ink}
          strokeWidth="10"
          strokeLinecap="round"
        />
      ))}
    </>
  )
}

function Sweep({ ink, accent }) {
  return (
    <>
      <path
        d="M6 88A62 62 0 0 1 68 26"
        fill="none"
        stroke={ink}
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M34 92A44 44 0 0 1 78 48"
        fill="none"
        stroke={accent}
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path d="M62 92H94" stroke={ink} strokeWidth="9" strokeLinecap="round" />
    </>
  )
}

function Comet({ ink, accent }) {
  return (
    <>
      <path d={arcPath(0.34, 40)} fill="none" stroke={accent} strokeWidth="13" strokeLinecap="round" />
      <path d="M10 62H46" stroke={ink} strokeWidth="9" strokeLinecap="round" />
      <path d="M20 80H54" stroke={ink} strokeWidth="9" strokeLinecap="round" />
    </>
  )
}

const VARIANTS = { nested: Nested, speed: Speed, sweep: Sweep, comet: Comet }

export default function PaceArc({ variant = 'nested', size = 160, tone = 'light', className }) {
  const Shape = VARIANTS[variant] ?? Nested
  const ink = tone === 'dark' ? 'var(--k-paper)' : GRAPHITE
  const accent = tone === 'deep' ? DEEP : LIME

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
    >
      <Shape ink={ink} accent={accent} />
    </svg>
  )
}

/** Oversized corner bleed used once, top-left, as the opening anchor of the board. */
export function BoardArcBleed({ className }) {
  return (
    <svg className={className} viewBox="0 0 600 600" aria-hidden="true" focusable="false">
      <path
        d="M600 300A300 300 0 0 1 300 600"
        fill="none"
        stroke="var(--k-lime)"
        strokeWidth="72"
        strokeLinecap="round"
      />
      <path
        d="M470 300A170 170 0 0 1 300 470"
        fill="none"
        stroke="var(--k-graphite)"
        strokeWidth="44"
        strokeLinecap="round"
      />
      <path
        d="M362 300A62 62 0 0 1 300 362"
        fill="none"
        stroke="var(--k-lime-deep)"
        strokeWidth="26"
        strokeLinecap="round"
      />
    </svg>
  )
}

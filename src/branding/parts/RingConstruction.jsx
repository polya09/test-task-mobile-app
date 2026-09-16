/**
 * Construction of the Precision Ring, drawn on the same 100-unit grid as the
 * wordmark: outer 50, stroke 18, centreline 41, segment 72% from 12 o'clock.
 */
import { arcPath, arcEnd } from './PrecisionRing'

const GUIDE = 'rgba(28,31,35,0.3)'
const HAIR = 0.9

function Frame({ size, children, label }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={label} focusable="false">
      {children}
    </svg>
  )
}

export function ConstructionStep({ step, size = 140 }) {
  const end = arcEnd(0.72)
  return (
    <Frame size={size} label={`Precision Ring construction step ${step}`}>
      {/* shared cap-height frame + axes */}
      <rect
        x="0.5"
        y="0.5"
        width="99"
        height="99"
        fill="none"
        stroke={GUIDE}
        strokeWidth={HAIR}
        strokeDasharray="4 5"
      />
      <path d="M50 0V100M0 50H100" stroke={GUIDE} strokeWidth={HAIR} strokeDasharray="4 5" />

      {step === 1 && (
        <>
          <circle cx="50" cy="50" r="50" fill="none" stroke={GUIDE} strokeWidth={HAIR} />
          <circle cx="50" cy="50" r="32" fill="none" stroke={GUIDE} strokeWidth={HAIR} />
          <circle cx="50" cy="50" r="2.6" fill="var(--k-graphite)" />
        </>
      )}

      {step === 2 && (
        <>
          <circle cx="50" cy="50" r="41" fill="none" stroke="rgba(28,31,35,0.22)" strokeWidth="18" />
          <circle cx="50" cy="50" r="50" fill="none" stroke={GUIDE} strokeWidth={HAIR} />
          <circle cx="50" cy="50" r="32" fill="none" stroke={GUIDE} strokeWidth={HAIR} />
        </>
      )}

      {step === 3 && (
        <>
          <circle cx="50" cy="50" r="41" fill="none" stroke="rgba(28,31,35,0.22)" strokeWidth="18" />
          <path
            d={arcPath(0.72)}
            fill="none"
            stroke="var(--k-lime)"
            strokeWidth="18"
            strokeLinecap="round"
          />
          <path d={`M50 50L${end.x} ${end.y}`} stroke={GUIDE} strokeWidth={HAIR} strokeDasharray="4 4" />
          <path d="M50 50V9" stroke={GUIDE} strokeWidth={HAIR} strokeDasharray="4 4" />
        </>
      )}
    </Frame>
  )
}

export function RingDerivation({ size = 320 }) {
  const end = arcEnd(0.72)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="The wordmark O built as the Precision Ring: complete track, 72 per cent lime segment"
      focusable="false"
    >
      <rect
        x="0.5"
        y="0.5"
        width="99"
        height="99"
        fill="none"
        stroke={GUIDE}
        strokeWidth={HAIR}
        strokeDasharray="4 5"
      />
      <circle cx="50" cy="50" r="41" fill="none" stroke="rgba(28,31,35,0.22)" strokeWidth="18" />
      <path d={arcPath(0.72)} fill="none" stroke="var(--k-lime)" strokeWidth="18" strokeLinecap="round" />

      {/* stroke-weight callout */}
      <path d="M50 0V100" stroke={GUIDE} strokeWidth={HAIR} strokeDasharray="4 5" />
      <path d="M91 50H100M59 50h9" stroke={GUIDE} strokeWidth={HAIR} />
      <path d="M50 50L91 50" stroke="none" />
      <circle cx="50" cy="9" r="2" fill="var(--k-graphite)" />
      <circle cx={end.x} cy={end.y} r="2" fill="var(--k-graphite)" />
      <path d={`M50 50L${end.x} ${end.y}`} stroke={GUIDE} strokeWidth={HAIR} strokeDasharray="4 4" />
      <path d="M50 50V9" stroke={GUIDE} strokeWidth={HAIR} strokeDasharray="4 4" />
    </svg>
  )
}

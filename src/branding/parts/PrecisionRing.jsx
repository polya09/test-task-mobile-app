/**
 * The Precision Ring — the core of the KALORA identity.
 * A complete neutral track plus an electric-lime progress segment.
 * The same geometry drives the logo "O", the app icon and every calorie meter.
 */

const CENTER = 50
const MID_RADIUS = 41 // outer 50, stroke 18 -> stroke centreline at 41

/** Endpoint of a clockwise arc that starts at 12 o'clock. */
export function arcEnd(progress, radius = MID_RADIUS, cx = CENTER, cy = CENTER) {
  const angle = (-90 + 360 * progress) * (Math.PI / 180)
  return {
    x: +(cx + radius * Math.cos(angle)).toFixed(2),
    y: +(cy + radius * Math.sin(angle)).toFixed(2),
    large: progress > 0.5 ? 1 : 0,
  }
}

/** Path data for a clockwise progress arc starting at 12 o'clock. */
export function arcPath(progress, radius = MID_RADIUS, cx = CENTER, cy = CENTER) {
  const p = Math.min(Math.max(progress, 0.001), 0.999)
  const { x, y, large } = arcEnd(p, radius, cx, cy)
  return `M${cx} ${cy - radius} A${radius} ${radius} 0 ${large} 1 ${x} ${y}`
}

export default function PrecisionRing({
  size = 120,
  progress = 0.72,
  stroke = 18,
  track = 'rgba(28,31,35,0.2)',
  segment = 'var(--k-lime)',
  title,
  className,
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <circle cx={CENTER} cy={CENTER} r={MID_RADIUS} fill="none" stroke={track} strokeWidth={stroke} />
      <path
        d={arcPath(progress)}
        fill="none"
        stroke={segment}
        strokeWidth={stroke}
        strokeLinecap="round"
      />
    </svg>
  )
}

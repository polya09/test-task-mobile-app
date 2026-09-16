/**
 * KALORA app icon — the Precision Ring alone on a graphite rounded square.
 * Geometry is proportional, so the same file holds up from 1024 px down to 32 px.
 */
import { arcPath } from './PrecisionRing'

export default function AppIcon({ size = 160, progress = 0.72, className, title = 'KALORA app icon' }) {
  // Ring occupies 56% of the tile; stroke thickens slightly as the tile shrinks.
  const ringStroke = size <= 72 ? 20 : 18

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={title}
      focusable="false"
    >
      <rect width="100" height="100" rx="22.4" fill="var(--k-graphite)" />
      <g transform="translate(22 22) scale(0.56)">
        <circle
          cx="50"
          cy="50"
          r="41"
          fill="none"
          stroke="rgba(247,245,239,0.28)"
          strokeWidth={ringStroke}
        />
        <path
          d={arcPath(progress)}
          fill="none"
          stroke="var(--k-lime)"
          strokeWidth={ringStroke}
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}

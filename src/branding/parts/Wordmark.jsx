/**
 * KALORA wordmark — original geometric letterforms drawn as SVG paths on a
 * 100-unit cap-height grid (stems 20, diagonals 22, bar 18). The "O" is the
 * Precision Ring: a complete neutral track with a lime progress segment,
 * built to the same 18-unit stroke so it reads as a letter, never as a C or G.
 */

const GLYPHS = [
  // K
  { w: 90, d: 'M0 0H20V100H0Z M68 0H90L42 58H20Z M20 46H42L90 100H68Z' },
  // A
  { w: 92, d: 'M36 0H58L22 100H0Z M34 0H56L92 100H70Z M28 64H64V80H28Z' },
  // L
  { w: 68, d: 'M0 0H20V82H68V100H0Z' },
  // O — placeholder slot, drawn as the Precision Ring
  { w: 106, ring: true },
  // R
  {
    w: 82,
    d: 'M0 0H20V100H0Z M20 0H48A27 27 0 0 1 48 54H20V36H46A9 9 0 0 0 46 18H20Z M30 54H52L82 100H60Z',
  },
  // A
  { w: 92, d: 'M36 0H58L22 100H0Z M34 0H56L92 100H70Z M28 64H64V80H28Z' },
]

const TRACKING = 10

const layout = (() => {
  let x = 0
  const placed = GLYPHS.map((g) => {
    const item = { ...g, x }
    x += g.w + TRACKING
    return item
  })
  return { placed, width: x - TRACKING }
})()

const RING = { r: 53, stroke: 18, mid: 44 }

export default function Wordmark({
  width = 560,
  tone = 'light',
  progress = 0.72,
  title = 'KALORA',
  className,
}) {
  const dark = tone === 'dark'
  const ink = dark ? 'var(--k-paper)' : 'var(--k-graphite)'
  const track = dark ? 'rgba(247,245,239,0.3)' : 'rgba(28,31,35,0.24)'

  const ringGlyph = layout.placed.find((g) => g.ring)
  const cx = ringGlyph.x + RING.r
  const cy = 50
  const angle = (-90 + 360 * progress) * (Math.PI / 180)
  const ex = +(cx + RING.mid * Math.cos(angle)).toFixed(2)
  const ey = +(cy + RING.mid * Math.sin(angle)).toFixed(2)

  const height = (width * 108) / layout.width

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 -4 ${layout.width} 108`}
      role="img"
      aria-label={title}
      focusable="false"
    >
      {layout.placed.map((g, i) =>
        g.ring ? null : (
          <path key={i} d={g.d} fill={ink} transform={`translate(${g.x} 0)`} />
        ),
      )}
      <circle cx={cx} cy={cy} r={RING.mid} fill="none" stroke={track} strokeWidth={RING.stroke} />
      <path
        d={`M${cx} ${cy - RING.mid} A${RING.mid} ${RING.mid} 0 ${progress > 0.5 ? 1 : 0} 1 ${ex} ${ey}`}
        fill="none"
        stroke="var(--k-lime)"
        strokeWidth={RING.stroke}
        strokeLinecap="round"
      />
    </svg>
  )
}

export const WORDMARK_RATIO = layout.width / 108

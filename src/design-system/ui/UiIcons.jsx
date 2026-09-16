/**
 * System glyphs added in Stage 3, drawn on the brand's 24 px grid with the
 * same 2 px stroke, rounded caps and rounded joins as the product icon set.
 *
 * These exist because the Stage 2 set is a product set — search, scan, recipe,
 * flame — and a component library also needs the four structural glyphs that
 * close, dismiss, go back and expand. Nothing here re-draws a brand icon.
 */
const SHAPES = {
  close: (
    <>
      <path d="M6.6 6.6 17.4 17.4" />
      <path d="M17.4 6.6 6.6 17.4" />
    </>
  ),
  back: (
    <>
      <path d="M14.4 5.4 7.8 12l6.6 6.6" />
    </>
  ),
  forward: (
    <>
      <path d="M9.6 5.4 16.2 12l-6.6 6.6" />
    </>
  ),
  chevron: (
    <>
      <path d="M5.4 9.6 12 16.2l6.6-6.6" />
    </>
  ),
  check: (
    <>
      <path d="M5.2 12.6 9.9 17.3 18.8 7.4" />
    </>
  ),
}

export const UI_ICON_NAMES = Object.keys(SHAPES)

export default function UiIcon({ name, size = 24, stroke = 2, title, className }) {
  const shape = SHAPES[name]
  if (!shape) return null
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {shape}
    </svg>
  )
}

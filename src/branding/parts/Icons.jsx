/**
 * KALORA icon set — original outline icons drawn on a 24 px grid.
 * Consistent optical size, ~2 px strokes, rounded caps and rounded corners.
 */

const PATHS = {
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="M15.8 15.8 20.5 20.5" />
    </>
  ),
  scan: (
    <>
      <path d="M3.5 8.4V6a2.5 2.5 0 0 1 2.5-2.5h2.4" />
      <path d="M15.6 3.5H18A2.5 2.5 0 0 1 20.5 6v2.4" />
      <path d="M20.5 15.6V18a2.5 2.5 0 0 1-2.5 2.5h-2.4" />
      <path d="M8.4 20.5H6A2.5 2.5 0 0 1 3.5 18v-2.4" />
      <path d="M3.5 12h17" />
    </>
  ),
  calculator: (
    <>
      <rect x="4.5" y="2.8" width="15" height="18.4" rx="3" />
      <path d="M8.2 7.2h7.6" />
      <path d="M8.4 12h.01M12 12h.01M15.6 12h.01M8.4 16.4h.01M12 16.4h.01M15.6 16.4h.01" />
    </>
  ),
  recipe: (
    <>
      <path d="M3.4 11.6h17.2a8.6 8.6 0 0 1-17.2 0Z" />
      <path d="M4.8 20.4h14.4" />
      <circle cx="8.9" cy="7.6" r="1.6" />
      <circle cx="13.4" cy="6.1" r="2.1" />
      <circle cx="17" cy="8" r="1.3" />
    </>
  ),
  timer: (
    <>
      <circle cx="12" cy="13.6" r="7.6" />
      <path d="M12 9.8v3.8h3.2" />
      <path d="M9.4 2.6h5.2" />
      <path d="M12 2.6V6" />
    </>
  ),
  flame: (
    <>
      <path d="M12 2.8c3.6 3.6 6 6.3 6 9.9a6 6 0 0 1-12 0c0-2 .9-3.7 2.1-5 .5 1 1.2 1.7 2 2.2.4-2.7 0-4.6 1.9-7.1Z" />
      <path d="M12 20.4a3 3 0 0 0 2.9-3c0-1.5-1-2.4-1.8-3.3-.8 1-1.8 1.5-2.7 2-.9.6-1.3 1.1-1.3 1.9a3 3 0 0 0 2.9 2.4Z" />
    </>
  ),
  bookmark: (
    <>
      <path d="M7 3.5h10A1.5 1.5 0 0 1 18.5 5v15.4l-6.5-4-6.5 4V5A1.5 1.5 0 0 1 7 3.5Z" />
    </>
  ),
  profile: (
    <>
      <circle cx="12" cy="8.4" r="3.9" />
      <path d="M4.6 20.4a7.6 7.6 0 0 1 14.8 0" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5.4v13.2M5.4 12h13.2" />
    </>
  ),
}

export const ICON_NAMES = ['search', 'scan', 'calculator', 'recipe', 'timer', 'flame', 'bookmark', 'profile']

export default function Icon({ name, size = 24, stroke = 2, title, className }) {
  const shape = PATHS[name]
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

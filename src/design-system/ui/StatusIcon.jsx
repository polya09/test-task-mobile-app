/**
 * Status glyphs, drawn on the same 24 px grid and 2 px stroke as the brand
 * icon set. They exist so that no status in the system is carried by colour
 * alone: every alert, toast, badge and field error pairs a distinct shape
 * with its written label.
 */
const SHAPES = {
  success: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M7.8 12.3 10.7 15.2 16.3 9.4" />
    </>
  ),
  warning: (
    <>
      <path d="M12 3.6 21.4 19.8H2.6Z" />
      <path d="M12 9.6v4.2" />
      <path d="M12 17.1h.01" />
    </>
  ),
  danger: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.4v5" />
      <path d="M12 16.2h.01" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11.2v5.2" />
      <path d="M12 7.8h.01" />
    </>
  ),
  neutral: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.2 12h7.6" />
    </>
  ),
}

export const STATUS_TONES = ['success', 'warning', 'danger', 'info', 'neutral']

export function StatusIcon({ tone = 'info', size = 20, stroke = 2, className, title }) {
  const shape = SHAPES[tone] ?? SHAPES.info
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

export default StatusIcon

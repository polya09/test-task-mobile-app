/**
 * Feedback — alerts, toasts, the bottom sheet, and loading placeholders.
 *
 * Every tone pairs a colour with a glyph and a written label, so status
 * survives greyscale, low vision and colour-blind viewing.
 */
import Icon from '../../branding/parts/Icons'
import { StatusIcon } from './StatusIcon'
import { Button, IconButton } from './Button'

const TONE_LABEL = {
  success: 'Success',
  warning: 'Warning',
  danger: 'Error',
  info: 'Information',
  neutral: 'Note',
}

export function Alert({ tone = 'info', title, children, action, onDismiss }) {
  return (
    <div className={`ds-alert ds-alert--${tone}`} role={tone === 'danger' ? 'alert' : 'status'}>
      <span className="ds-alert__icon">
        <StatusIcon tone={tone} size={20} stroke={2.2} />
      </span>
      <div className="ds-alert__body">
        <p className="ds-alert__title">
          <span className="visually-hidden">{TONE_LABEL[tone]}: </span>
          {title}
        </p>
        {children && <p className="ds-alert__text">{children}</p>}
        {action && (
          <p className="ds-alert__action">
            <Button variant="tertiary" size="sm">
              {action}
            </Button>
          </p>
        )}
      </div>
      {onDismiss && <IconButton icon="close" label="Dismiss" variant="tertiary" onClick={onDismiss} />}
    </div>
  )
}

export function Toast({ tone = 'neutral', title, action = 'Undo' }) {
  return (
    <div className={`ds-toast ds-toast--${tone}`} role="status">
      <StatusIcon tone={tone === 'neutral' ? 'success' : tone} size={20} stroke={2.2} />
      <p className="ds-toast__title">{title}</p>
      {action && (
        <button type="button" className="ds-toast__action">
          {action}
        </button>
      )}
    </div>
  )
}

/**
 * Bottom sheet — the product's modal. Rendered inline and open, because a
 * design system documents the sheet, not the transition. The scrim is shown
 * at its real opacity so the layering is inspectable.
 */
export function BottomSheet({
  title,
  children,
  primary = 'Add to today',
  secondary = 'Cancel',
  height = 360,
  destructive = false,
}) {
  return (
    <div className="ds-sheetframe" style={{ height }}>
      {/* A stand-in for the screen underneath, so the scrim can be read as a
          scrim rather than as a grey panel. */}
      <div className="ds-sheetframe__behind" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="ds-sheetframe__scrim" aria-hidden="true" />
      <div className="ds-sheet" role="dialog" aria-modal="true" aria-label={title}>
        <span className="ds-sheet__grabber" aria-hidden="true" />
        <div className="ds-sheet__head">
          <h4 className="ds-sheet__title">{title}</h4>
          <IconButton icon="close" label="Close" variant="tertiary" />
        </div>
        <div className="ds-sheet__body">{children}</div>
        <div className="ds-sheet__foot">
          {/* A destructive confirmation never takes the lime primary: the safe
              choice keeps it, and the destructive action is an outlined button
              in --ds-danger-ink. */}
          {destructive ? (
            <>
              <Button variant="danger" fullWidth>
                {primary}
              </Button>
              <Button fullWidth>{secondary}</Button>
            </>
          ) : (
            <>
              <Button variant="secondary" fullWidth>
                {secondary}
              </Button>
              <Button fullWidth>{primary}</Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export function Skeleton({ w = '100%', h = 16, radius = 'var(--ds-radius-xs)' }) {
  return <span className="ds-skeleton" style={{ width: w, height: h, borderRadius: radius }} aria-hidden="true" />
}

export function LoadingList({ rows = 3 }) {
  return (
    <div className="ds-loadinglist" role="status" aria-label="Loading foods">
      <span className="visually-hidden">Loading foods…</span>
      {Array.from({ length: rows }, (_, i) => (
        <div className="ds-loadinglist__row" key={i}>
          <Skeleton w={40} h={40} radius="var(--ds-radius-s)" />
          <div className="ds-loadinglist__lines">
            <Skeleton w={i === 1 ? '54%' : '68%'} h={14} />
            <Skeleton w="34%" h={12} />
          </div>
          <Skeleton w={52} h={20} />
        </div>
      ))}
    </div>
  )
}

export function StatePanel({ tone = 'neutral', icon = 'search', title, text, action }) {
  return (
    <div className={`ds-statepanel ds-statepanel--${tone}`}>
      <span className="ds-statepanel__art" aria-hidden="true">
        {tone === 'neutral' ? (
          <Icon name={icon} size={40} stroke={1.8} />
        ) : (
          <StatusIcon tone={tone} size={40} stroke={1.8} />
        )}
      </span>
      <h4 className="ds-statepanel__title">{title}</h4>
      <p className="ds-statepanel__text">{text}</p>
      {action && (
        <Button variant={tone === 'danger' ? 'secondary' : 'primary'} size="sm">
          {action}
        </Button>
      )}
    </div>
  )
}

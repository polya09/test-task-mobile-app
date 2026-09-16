/**
 * Buttons — primary, secondary, tertiary and icon-only.
 *
 * Every interactive state is reachable two ways: naturally (`:hover`,
 * `:active`, `:focus-visible`) and declaratively via the `state` prop, so the
 * documentation can print a state that a static screenshot could not capture.
 * `.is-*` classes and the real pseudo-classes share one rule block, so the
 * documented state and the live state can never drift apart.
 */
import Icon from '../../branding/parts/Icons'
import UiIcon, { UI_ICON_NAMES } from './UiIcons'
import { stateClass } from './state'

/** Product icons come from the brand set; structural glyphs from the Stage 3 set. */
const Glyph = ({ name, size, stroke = 2 }) =>
  UI_ICON_NAMES.includes(name) ? (
    <UiIcon name={name} size={size} stroke={stroke} />
  ) : (
    <Icon name={name} size={size} stroke={stroke} />
  )

const VARIANTS = {
  primary: 'ds-btn--primary',
  secondary: 'ds-btn--secondary',
  tertiary: 'ds-btn--tertiary',
  /* Destructive: secondary geometry, danger ink. Never a lime fill — lime is
     the safe, expected action, and a red fill would out-shout the copy. */
  danger: 'ds-btn--secondary ds-btn--danger',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconAfter = false,
  state,
  loading = false,
  disabled = false,
  fullWidth = false,
  type = 'button',
  ...rest
}) {
  const className = [
    'ds-btn',
    VARIANTS[variant] ?? VARIANTS.primary,
    size === 'sm' && 'ds-btn--sm',
    size === 'lg' && 'ds-btn--lg',
    fullWidth && 'ds-btn--block',
    loading && 'is-loading',
    stateClass(state),
  ]
    .filter(Boolean)
    .join(' ')

  const glyph = icon ? <Glyph name={icon} size={size === 'sm' ? 20 : 24} /> : null

  return (
    <button
      type={type}
      className={className}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <Spinner size={size === 'sm' ? 16 : 18} />}
      {!loading && !iconAfter && glyph}
      <span className="ds-btn__label">{children}</span>
      {!loading && iconAfter && glyph}
    </button>
  )
}

export function IconButton({
  icon,
  label,
  variant = 'secondary',
  state,
  disabled = false,
  loading = false,
  ...rest
}) {
  const className = [
    'ds-btn',
    'ds-btn--icon',
    VARIANTS[variant] ?? VARIANTS.secondary,
    loading && 'is-loading',
    stateClass(state),
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type="button"
      className={className}
      aria-label={label}
      title={label}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <Spinner size={18} /> : <Glyph name={icon} size={24} />}
    </button>
  )
}

/** Determinate-looking indeterminate spinner, cut from the Precision Ring. */
export function Spinner({ size = 18, tone = 'ink', label }) {
  return (
    <span
      className={`ds-spinner ds-spinner--${tone}`}
      style={{ width: size, height: size }}
      role={label ? 'status' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  )
}

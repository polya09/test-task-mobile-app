/**
 * Form controls — text, search, numeric, select and textarea.
 *
 * All five share one field shell (`ds-field`) so the label, helper text,
 * error message and 44 px minimum height are defined in exactly one place.
 * Error is never colour alone: the field gains a 2 px border, an alert icon
 * and a written message.
 *
 * Each control is uncontrolled by default, which is what the documentation
 * needs. Passing `onChange` switches the same control to a controlled one —
 * `value` becomes the source of truth and the stepper buttons become live.
 * Nothing else about the rendered markup changes, so a documented field and
 * a field in the product are the same field.
 */
import { useId } from 'react'
import Icon from '../../branding/parts/Icons'
import UiIcon from './UiIcons'
import { stateClass } from './state'
import { StatusIcon } from './StatusIcon'

function Shell({ label, hint, error, required, id, children, state, disabled }) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined
  return (
    <div
      className={['ds-field', error && 'ds-field--error', disabled && 'is-disabled', stateClass(state)]
        .filter(Boolean)
        .join(' ')}
    >
      {label && (
        <label className="ds-field__label" htmlFor={id}>
          {label}
          {required && (
            <span className="ds-field__req" aria-hidden="true">
              {' '}
              (required)
            </span>
          )}
        </label>
      )}
      {typeof children === 'function' ? children(describedBy) : children}
      {error ? (
        <p className="ds-field__error" id={`${id}-error`}>
          <StatusIcon tone="danger" size={16} />
          {error}
        </p>
      ) : hint ? (
        <p className="ds-field__hint" id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export function TextField({ label, hint, error, value, placeholder, state, disabled, required, onChange, ...rest }) {
  const id = useId()
  const bind = onChange ? { value: value ?? '', onChange } : { defaultValue: value }
  return (
    <Shell {...{ label, hint, error, required, id, state, disabled }}>
      {(describedBy) => (
        <div className="ds-input">
          <input
            id={id}
            type="text"
            className="ds-input__control"
            {...bind}
            placeholder={placeholder}
            disabled={disabled}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={describedBy}
            {...rest}
          />
        </div>
      )}
    </Shell>
  )
}

export function SearchField({
  label = 'Search foods',
  hint,
  error,
  value,
  placeholder = 'Search foods',
  state,
  disabled,
  onClear,
  onChange,
}) {
  const id = useId()
  const bind = onChange ? { value: value ?? '', onChange } : { defaultValue: value }
  return (
    <Shell {...{ label, hint, error, id, state, disabled }}>
      {(describedBy) => (
        <div className="ds-input ds-input--search">
          <Icon name="search" size={20} stroke={2} className="ds-input__lead" />
          <input
            id={id}
            type="search"
            className="ds-input__control"
            {...bind}
            placeholder={placeholder}
            disabled={disabled}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={describedBy}
          />
          {value ? (
            <button type="button" className="ds-input__clear" aria-label="Clear search" onClick={onClear}>
              <UiIcon name="close" size={20} stroke={2.2} />
            </button>
          ) : null}
        </div>
      )}
    </Shell>
  )
}

export function NumberField({
  label,
  hint,
  error,
  value = 0,
  unit,
  step = 5,
  state,
  disabled,
  min = 0,
  max,
  onChange,
}) {
  const id = useId()
  const controlled = typeof onChange === 'function'
  const clamp = (n) => {
    const bounded = Math.max(min, max === undefined ? n : Math.min(max, n))
    return Number.isFinite(bounded) ? bounded : min
  }
  const nudge = (delta) => onChange(clamp(Number(value) + delta))
  const bind = controlled
    ? {
        value: String(value ?? ''),
        onChange: (e) => onChange(e.target.value === '' ? '' : Number(e.target.value)),
      }
    : { defaultValue: value }
  return (
    <Shell {...{ label, hint, error, id, state, disabled }}>
      {(describedBy) => (
        <div className="ds-stepper">
          <button
            type="button"
            className="ds-stepper__btn"
            aria-label={`Decrease by ${step}`}
            disabled={disabled || (controlled && Number(value) <= min)}
            onClick={controlled ? () => nudge(-step) : undefined}
          >
            <span aria-hidden="true">−</span>
          </button>
          <div className="ds-stepper__value">
            <input
              id={id}
              type="number"
              inputMode="numeric"
              className="ds-stepper__control tnum"
              {...bind}
              step={step}
              min={min}
              max={max}
              disabled={disabled}
              aria-invalid={error ? 'true' : undefined}
              aria-describedby={describedBy}
            />
            {unit && (
              <span className="ds-stepper__unit" aria-hidden="true">
                {unit}
              </span>
            )}
          </div>
          <button
            type="button"
            className="ds-stepper__btn"
            aria-label={`Increase by ${step}`}
            disabled={disabled || (controlled && max !== undefined && Number(value) >= max)}
            onClick={controlled ? () => nudge(step) : undefined}
          >
            <span aria-hidden="true">+</span>
          </button>
        </div>
      )}
    </Shell>
  )
}

export function SelectField({ label, hint, error, value, options = [], state, disabled, onChange }) {
  const id = useId()
  const bind = onChange
    ? { value: value ?? '', onChange: (e) => onChange(e.target.value) }
    : { defaultValue: value }
  return (
    <Shell {...{ label, hint, error, id, state, disabled }}>
      {(describedBy) => (
        <div className="ds-input ds-input--select">
          <select
            id={id}
            className="ds-input__control"
            {...bind}
            disabled={disabled}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={describedBy}
          >
            {options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <span className="ds-input__chevron" aria-hidden="true" />
        </div>
      )}
    </Shell>
  )
}

export function TextArea({ label, hint, error, value, placeholder, rows = 3, state, disabled, onChange }) {
  const id = useId()
  const bind = onChange ? { value: value ?? '', onChange } : { defaultValue: value }
  return (
    <Shell {...{ label, hint, error, id, state, disabled }}>
      {(describedBy) => (
        <div className="ds-input ds-input--area">
          <textarea
            id={id}
            className="ds-input__control"
            rows={rows}
            {...bind}
            placeholder={placeholder}
            disabled={disabled}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={describedBy}
          />
        </div>
      )}
    </Shell>
  )
}

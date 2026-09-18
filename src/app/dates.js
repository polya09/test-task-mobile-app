/**
 * Date helpers for the weekly selector.
 *
 * Dates are handled as plain `YYYY-MM-DD` keys and only turned into `Date`
 * objects in UTC, so a day never shifts under a timezone. Weeks start on
 * Monday, which is how the rest of the copy reads.
 *
 * The prototype's reference day is Thursday 16 September — the date the Today
 * screen has always shown. 2027 is the year that falls on a Thursday, so the
 * weekday labels in the selector agree with that copy rather than contradicting
 * it.
 */
export const REFERENCE_DATE = '2027-09-16'

export const toDate = (key) => {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d))
}

export const toKey = (date) => date.toISOString().slice(0, 10)

export function addDays(key, n) {
  const d = toDate(key)
  d.setUTCDate(d.getUTCDate() + n)
  return toKey(d)
}

/** The Monday of the week `key` falls in. */
export function startOfWeek(key) {
  const d = toDate(key)
  return addDays(key, -((d.getUTCDay() + 6) % 7))
}

export const weekDays = (mondayKey) => Array.from({ length: 7 }, (_, i) => addDays(mondayKey, i))

const fmt = (opts) => new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', ...opts })

const WEEKDAY_NARROW = fmt({ weekday: 'narrow' })
const WEEKDAY_LONG = fmt({ weekday: 'long' })
const MONTH_YEAR = fmt({ month: 'long', year: 'numeric' })
const DAY_MONTH = fmt({ weekday: 'long', day: 'numeric', month: 'long' })
const FULL = fmt({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
const SHORT = fmt({ weekday: 'short', day: 'numeric', month: 'short' })

/** "T" — the single letter above each date in the strip. */
export const weekdayInitial = (key) => WEEKDAY_NARROW.format(toDate(key))
export const weekdayName = (key) => WEEKDAY_LONG.format(toDate(key))
/** "September 2027" — the selector's heading. */
export const monthYear = (key) => MONTH_YEAR.format(toDate(key))
/** "Thursday 16 September" — the subtitle under the Today heading. */
export const longDate = (key) => DAY_MONTH.format(toDate(key))
/** "Thursday 16 September 2027" — the accessible name of a date button. */
export const fullDate = (key) => FULL.format(toDate(key))
/** "Mon 13 Sep" — fits the progress card's heading beside its target. */
export const shortDate = (key) => SHORT.format(toDate(key))

export const dayOfMonth = (key) => toDate(key).getUTCDate()

export const isSameWeek = (a, b) => startOfWeek(a) === startOfWeek(b)
export const isAfter = (a, b) => a > b

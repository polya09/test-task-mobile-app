/**
 * The weekly date selector on Today.
 *
 * One compact row: the month and year with a week control either side, then
 * seven day cells. Selection is never carried by colour alone — the selected
 * cell takes the lime fill, a heavier figure and `aria-current="date"`, the
 * same three-way marking the bottom navigation uses.
 *
 * A future date is disabled rather than hidden, so the week keeps its shape,
 * and the next-week control stops at the week containing the reference day
 * because there is nothing to review beyond it.
 */
import { IconButton } from '../../design-system/ui/Button'
import {
  REFERENCE_DATE,
  dayOfMonth,
  fullDate,
  isAfter,
  monthYear,
  startOfWeek,
  weekDays,
  weekdayInitial,
} from '../dates'

export default function WeekStrip({ weekStart, selected, onSelect, onWeek, logged }) {
  const days = weekDays(weekStart)
  const atCurrentWeek = weekStart >= startOfWeek(REFERENCE_DATE)

  // A week can straddle two months; name both rather than mislabel the row.
  const first = monthYear(days[0])
  const last = monthYear(days[6])
  const heading = first === last ? first : `${first.split(' ')[0]} – ${last}`

  return (
    <section className="ap-week" aria-label="Select a day to review">
      <div className="ap-week__head">
        <IconButton
          icon="back"
          label="Previous week"
          variant="tertiary"
          onClick={() => onWeek(-1)}
        />
        <h2 className="ap-week__month" aria-live="polite">
          {heading}
        </h2>
        <IconButton
          icon="forward"
          label="Next week"
          variant="tertiary"
          disabled={atCurrentWeek}
          onClick={() => onWeek(1)}
        />
      </div>

      <ol className="ap-week__days">
        {days.map((date) => {
          const future = isAfter(date, REFERENCE_DATE)
          const isSelected = date === selected
          const isToday = date === REFERENCE_DATE
          return (
            <li key={date}>
              <button
                type="button"
                className={[
                  'ap-week__day',
                  isSelected && 'is-selected',
                  isToday && 'is-today',
                  logged.has(date) && 'has-log',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-current={isSelected ? 'date' : undefined}
                aria-label={`${fullDate(date)}${isToday ? ', today' : ''}`}
                disabled={future}
                onClick={() => onSelect(date)}
              >
                <span className="ap-week__initial" aria-hidden="true">
                  {weekdayInitial(date)}
                </span>
                <span className="ap-week__date tnum">{dayOfMonth(date)}</span>
              </button>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

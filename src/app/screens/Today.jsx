/**
 * Today — the running answer to "how many calories have I had?".
 *
 * Every figure on this screen is the sum of the rows beneath it. The ring, the
 * three remaining-macro cells and the list are all reading one array of
 * entries whose macros were rounded once, when they were logged.
 *
 * The weekly strip changes which array that is. A past day is a read-only
 * review: its numbers, its list and its empty state all work, but nothing on
 * it can be logged or edited, because the log is a record of what happened.
 */
import { DayCard, EmptyCard } from '../../design-system/ui/Cards'
import { ListGroup, ListRow } from '../../design-system/ui/DataDisplay'
import { Button } from '../../design-system/ui/Button'
import { Alert } from '../../design-system/ui/Feedback'
import { daySummary, kcal, macroRows, nf } from '../nutrition'
import { REFERENCE_DATE, longDate, shortDate } from '../dates'
import { LOGGED_DATES } from '../data/days'
import WeekStrip from '../parts/WeekStrip'
import { entriesForDate, useStore } from '../store'

const MACRO_LABELS = [
  { key: 'p', name: 'Protein', colour: 'var(--ds-protein)' },
  { key: 'c', name: 'Carbs', colour: 'var(--ds-carbs)' },
  { key: 'f', name: 'Fat', colour: 'var(--ds-fat)' },
]

export default function Today() {
  const { state, dispatch } = useStore()
  const { selectedDate } = state
  const isReferenceDay = selectedDate === REFERENCE_DATE
  const entries = entriesForDate(state, selectedDate)
  const day = daySummary(entries, state.targets)
  const empty = entries.length === 0

  return (
    <div className="ap-page">
      <div className="ap-titleblock">
        <div>
          <h1 className="ap-title">Today</h1>
          <p className="ap-subtitle" aria-live="polite">
            {longDate(selectedDate)}
          </p>
        </div>
        <Button
          size="sm"
          icon="plus"
          disabled={!isReferenceDay}
          onClick={() => dispatch({ type: 'tab', tab: 'log' })}
        >
          Add food
        </Button>
      </div>

      <WeekStrip
        weekStart={state.weekStart}
        selected={selectedDate}
        logged={LOGGED_DATES}
        onSelect={(date) => dispatch({ type: 'select-date', date })}
        onWeek={(delta) => dispatch({ type: 'week', delta })}
      />

      {/* The page heading stays "Today"; the card names the day its own
          numbers belong to, so a past day is never mislabelled. */}
      <DayCard
        title={isReferenceDay ? 'Today' : shortDate(selectedDate)}
        value={day.consumedKcal}
        target={day.targetKcal}
        macros={macroRows(day.consumed, day.macroTargets)}
        meta={`Target ${nf.format(day.targetKcal)} kcal`}
      />

      {day.remainingKcal < 0 && (
        <Alert tone="warning" title={`${nf.format(Math.abs(day.remainingKcal))} kcal over today's target`}>
          Nothing to fix — the day is logged as it happened. Tomorrow&rsquo;s target is unchanged.
        </Alert>
      )}

      <section className="ap-section" aria-labelledby="ap-left">
        <div className="ap-section__head">
          <h2 className="ap-section__title" id="ap-left">
            {isReferenceDay ? 'Left today' : 'Left that day'}
          </h2>
          <span className="ap-section__meta tnum">
            {day.remainingKcal >= 0
              ? `${nf.format(day.remainingKcal)} kcal`
              : `${nf.format(Math.abs(day.remainingKcal))} kcal over`}
          </span>
        </div>
        <div className="ap-remaining">
          {MACRO_LABELS.map((m) => {
            const left = day.remaining[m.key]
            return (
              <div className="ap-remaining__cell" key={m.key}>
                <p className="ap-remaining__name">
                  <span className="ap-remaining__dot" style={{ '--dot': m.colour }} aria-hidden="true" />
                  {m.name}
                </p>
                <p className={`ap-remaining__value${left < 0 ? ' is-over' : ''}`}>
                  {left >= 0 ? `${nf.format(left)} g` : `${nf.format(Math.abs(left))} g over`}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="ap-section" aria-labelledby="ap-logged">
        <div className="ap-section__head">
          <h2 className="ap-section__title" id="ap-logged">
            Logged
          </h2>
          {!empty && (
            <span className="ap-section__meta tnum">
              {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
            </span>
          )}
        </div>

        {empty ? (
          <EmptyCard
            icon="calculator"
            title={isReferenceDay ? 'No foods logged yet' : 'Nothing logged that day'}
            text={
              isReferenceDay
                ? "Add your first meal to see today's calories and macros."
                : 'This day has no entries, so its totals are zero. Days already logged keep their numbers.'
            }
            action={isReferenceDay ? 'Log a food' : null}
            onAction={() => dispatch({ type: 'tab', tab: 'log' })}
          />
        ) : (
          <>
            <ListGroup>
              {entries.map((entry) => (
                <ListRow
                  key={entry.id}
                  title={entry.name}
                  meta={`${entry.time} · ${entry.detail}`}
                  value={kcal(entry.macros)}
                  unit="kcal"
                  onClick={
                    isReferenceDay
                      ? () => dispatch({ type: 'sheet', sheet: { type: 'entry', entryId: entry.id } })
                      : undefined
                  }
                />
              ))}
            </ListGroup>
            <p className="ap-hint">
              {isReferenceDay
                ? 'Tap an entry to change its portion or remove it.'
                : 'A past day is a record — open today to log or change anything.'}
            </p>
          </>
        )}
      </section>
    </div>
  )
}

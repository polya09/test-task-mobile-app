/**
 * Today — the running answer to "how many calories have I had?".
 *
 * Every figure on this screen is the sum of the rows beneath it. The ring, the
 * three remaining-macro cells and the list are all reading one array of
 * entries whose macros were rounded once, when they were logged.
 */
import { DayCard, EmptyCard } from '../../design-system/ui/Cards'
import { ListGroup, ListRow } from '../../design-system/ui/DataDisplay'
import { Button } from '../../design-system/ui/Button'
import { Alert } from '../../design-system/ui/Feedback'
import { daySummary, kcal, macroRows, nf } from '../nutrition'
import { useStore } from '../store'

const MACRO_LABELS = [
  { key: 'p', name: 'Protein', colour: 'var(--ds-protein)' },
  { key: 'c', name: 'Carbs', colour: 'var(--ds-carbs)' },
  { key: 'f', name: 'Fat', colour: 'var(--ds-fat)' },
]

export default function Today() {
  const { state, dispatch } = useStore()
  const day = daySummary(state.entries, state.targets)
  const empty = state.entries.length === 0

  return (
    <div className="ap-page">
      <div className="ap-titleblock">
        <div>
          <h1 className="ap-title">Today</h1>
          <p className="ap-subtitle">Thursday 16 September</p>
        </div>
        <Button size="sm" icon="plus" onClick={() => dispatch({ type: 'tab', tab: 'log' })}>
          Add food
        </Button>
      </div>

      <DayCard
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
            Left today
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
              {state.entries.length} {state.entries.length === 1 ? 'entry' : 'entries'}
            </span>
          )}
        </div>

        {empty ? (
          <EmptyCard
            icon="calculator"
            title="No foods logged yet"
            text="Add your first meal to see today's calories and macros."
            action="Log a food"
            onAction={() => dispatch({ type: 'tab', tab: 'log' })}
          />
        ) : (
          <>
            <ListGroup>
              {state.entries.map((entry) => (
                <ListRow
                  key={entry.id}
                  title={entry.name}
                  meta={`${entry.time} · ${entry.detail}`}
                  value={kcal(entry.macros)}
                  unit="kcal"
                  onClick={() => dispatch({ type: 'sheet', sheet: { type: 'entry', entryId: entry.id } })}
                />
              ))}
            </ListGroup>
            <p className="ap-hint">Tap an entry to change its portion or remove it.</p>
          </>
        )}
      </section>
    </div>
  )
}

/**
 * Targets — what "suitable for me" actually resolves to.
 *
 * Two controls decide everything downstream: the calorie target sets the ring
 * on Today, and the goal sets the macro split that both the ring's bars and
 * the recipe fit test are measured against. Change either and every screen
 * behind this one re-reads.
 *
 * Deliberately not here: accounts, weight history, reminders, plans.
 */
import { ScreenHeader } from '../../design-system/ui/Header'
import { NumberField } from '../../design-system/ui/Inputs'
import { SegmentedControl, FilterChip } from '../../design-system/ui/Selection'
import { NutritionCard } from '../../design-system/ui/Cards'
import { Alert } from '../../design-system/ui/Feedback'
import { DIET_FILTERS } from '../data/recipes'
import { GOALS, daySummary, macroRows, macroTargets, nf } from '../nutrition'
import { useStore } from '../store'

const MIN_KCAL = 1200
const MAX_KCAL = 4000

const GOAL_NOTE = {
  cut: 'A calorie deficit with protein held high, so training quality holds while weight comes down.',
  maintain: 'Calories at maintenance, with carbohydrate carrying most of the day.',
  build: 'A surplus weighted towards carbohydrate, for adding size alongside heavy work.',
}

export default function Targets() {
  const { state, dispatch } = useStore()
  const { targets } = state
  const day = daySummary(state.entries, targets)

  const invalid =
    targets.kcal === '' || Number(targets.kcal) < MIN_KCAL || Number(targets.kcal) > MAX_KCAL
  const split = invalid ? day.macroTargets : macroTargets(Number(targets.kcal), targets.goal)

  const toggleDiet = (diet) =>
    dispatch({
      type: 'targets',
      patch: {
        diets: targets.diets.includes(diet)
          ? targets.diets.filter((d) => d !== diet)
          : [...targets.diets, diet],
      },
    })

  return (
    <>
      <ScreenHeader title="Targets" />

      <div className="ap-page ap-page--flush">
        <p className="ap-lede">
          These two settings decide what Today measures against, and which recipes are shown as
          fitting.
        </p>

        <NumberField
          label="Daily calorie target"
          unit="kcal"
          value={targets.kcal}
          step={50}
          min={0}
          max={MAX_KCAL}
          error={
            invalid
              ? `Enter a target between ${nf.format(MIN_KCAL)} and ${nf.format(MAX_KCAL)} kcal.`
              : undefined
          }
          hint={invalid ? undefined : 'Stated to the nearest 25 kcal, the way the goal was set.'}
          onChange={(next) => dispatch({ type: 'targets', patch: { kcal: next } })}
        />

        <section className="ap-section" aria-labelledby="ap-goal">
          <h2 className="ap-section__title" id="ap-goal">
            Goal
          </h2>
          <SegmentedControl
            options={GOALS.map((g) => g.label)}
            value={GOALS.find((g) => g.id === targets.goal)?.label}
            label="Goal"
            onChange={(label) =>
              dispatch({ type: 'targets', patch: { goal: GOALS.find((g) => g.label === label).id } })
            }
          />
          <p className="ap-hint">{GOAL_NOTE[targets.goal]}</p>
        </section>

        <NutritionCard
          title="Macro targets"
          macros={macroRows(day.consumed, split)}
          meta={invalid ? 'Awaiting a valid target' : `${nf.format(Number(targets.kcal))} kcal`}
        />

        {!invalid && day.remainingKcal < 0 && (
          <Alert tone="warning" title="Today is already past this target">
            {`${nf.format(Math.abs(day.remainingKcal))} kcal over. Recipes will show as over budget until tomorrow.`}
          </Alert>
        )}

        <section className="ap-section" aria-labelledby="ap-diet">
          <h2 className="ap-section__title" id="ap-diet">
            Dietary preference
          </h2>
          <p className="ap-hint">Preselects the diet filters on the Recipes screen. Nothing is hidden from search.</p>
          <div className="ap-chiprow">
            {DIET_FILTERS.map((d) => (
              <FilterChip key={d} selected={targets.diets.includes(d)} onClick={() => toggleDiet(d)}>
                {d}
              </FilterChip>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

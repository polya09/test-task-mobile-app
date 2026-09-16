/**
 * Recipe filters — the adjustable half of "suitable for me".
 *
 * The other half lives on the Targets screen: the goal and the calorie target
 * that decide what "fits today" means. This sheet narrows the list; it never
 * changes the verdict a recipe gets.
 */
import { useState } from 'react'
import Sheet from '../parts/Sheet'
import { SegmentedControl, FilterChip } from '../../design-system/ui/Selection'
import { DIET_FILTERS, GOAL_FILTERS, TIME_FILTERS } from '../data/recipes'
import { useStore } from '../store'

export default function FiltersSheet() {
  const { state, dispatch } = useStore()
  const [draft, setDraft] = useState(state.recipes.filters)

  const toggleDiet = (diet) =>
    setDraft((f) => ({
      ...f,
      diets: f.diets.includes(diet) ? f.diets.filter((d) => d !== diet) : [...f.diets, diet],
    }))

  const active =
    (draft.goal !== 'Any goal' ? 1 : 0) + (draft.time !== 'any' ? 1 : 0) + draft.diets.length

  return (
    <Sheet
      title="Filter recipes"
      primary={active === 0 ? 'Show all recipes' : `Show results · ${active} filter${active === 1 ? '' : 's'}`}
      secondary="Clear all"
      onPrimary={() => dispatch({ type: 'recipe-filters', patch: draft })}
      onSecondary={() => setDraft({ goal: 'Any goal', time: 'any', diets: [] })}
      onClose={() => dispatch({ type: 'sheet', sheet: null })}
    >
      <div className="ap-sheetgrid">
        <fieldset className="ap-fieldset">
          <legend className="ap-section__title">Goal</legend>
          <SegmentedControl
            options={GOAL_FILTERS}
            value={draft.goal}
            label="Goal"
            size="sm"
            onChange={(goal) => setDraft((f) => ({ ...f, goal }))}
          />
        </fieldset>

        <fieldset className="ap-fieldset">
          <legend className="ap-section__title">Time to cook</legend>
          <div className="ap-chiprow">
            {TIME_FILTERS.map((t) => (
              <FilterChip
                key={t.id}
                selected={draft.time === t.id}
                onClick={() => setDraft((f) => ({ ...f, time: t.id }))}
              >
                {t.label}
              </FilterChip>
            ))}
          </div>
        </fieldset>

        <fieldset className="ap-fieldset">
          <legend className="ap-section__title">Diet</legend>
          <div className="ap-chiprow">
            {DIET_FILTERS.map((d) => (
              <FilterChip key={d} selected={draft.diets.includes(d)} onClick={() => toggleDiet(d)}>
                {d}
              </FilterChip>
            ))}
          </div>
        </fieldset>
      </div>
    </Sheet>
  )
}

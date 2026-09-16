/**
 * Recipes — the second user story.
 *
 * "Suitable for me" is not a label a recipe carries; it is a comparison made
 * at read time between one serving and what is actually left of the day. Every
 * card therefore states its verdict as a sentence with a number in it, so the
 * list survives greyscale and never rests on a colour.
 */
import { useEffect, useMemo, useState } from 'react'
import { ScreenHeader } from '../../design-system/ui/Header'
import { SearchField } from '../../design-system/ui/Inputs'
import { SegmentedControl, FilterChip } from '../../design-system/ui/Selection'
import { RecipeCard } from '../../design-system/ui/Cards'
import { LoadingList, StatePanel } from '../../design-system/ui/Feedback'
import { RECIPES, TIME_FILTERS } from '../data/recipes'
import { FIT_ORDER, daySummary, kcal, nf, recipeFit } from '../nutrition'
import { useStore } from '../store'

const VIEWS = ['For today', 'All', 'Saved']
const SEARCH_MS = 420

export default function Recipes() {
  const { state, dispatch } = useStore()
  const { query, view, filters } = state.recipes
  const [status, setStatus] = useState('ready')

  const day = daySummary(state.entries, state.targets)
  const trimmed = query.trim().toLowerCase()

  const filterKey = `${trimmed}|${view}|${filters.goal}|${filters.time}|${filters.diets.join(',')}`
  useEffect(() => {
    setStatus('loading')
    const timer = setTimeout(() => setStatus('ready'), SEARCH_MS)
    return () => clearTimeout(timer)
  }, [filterKey])

  const maxMinutes = TIME_FILTERS.find((t) => t.id === filters.time)?.max ?? Infinity

  const results = useMemo(() => {
    const scored = RECIPES.map((recipe) => ({ recipe, fit: recipeFit(recipe, day) }))
    return scored
      .filter(({ recipe, fit }) => {
        if (view === 'For today' && fit.status === 'over') return false
        if (view === 'Saved' && !state.savedRecipes.includes(recipe.id)) return false
        if (filters.goal !== 'Any goal' && recipe.goal !== filters.goal) return false
        if (recipe.minutes > maxMinutes) return false
        if (filters.diets.some((d) => !recipe.diets.includes(d))) return false
        if (trimmed && !`${recipe.name} ${recipe.summary}`.toLowerCase().includes(trimmed)) return false
        return true
      })
      .sort(
        (a, b) =>
          FIT_ORDER[a.fit.status] - FIT_ORDER[b.fit.status] || kcal(a.recipe.macros) - kcal(b.recipe.macros),
      )
  }, [day, view, filters, maxMinutes, trimmed, state.savedRecipes])

  const activeFilters = [
    filters.goal !== 'Any goal' && {
      label: filters.goal,
      clear: () => dispatch({ type: 'recipe-filters', patch: { goal: 'Any goal' } }),
    },
    filters.time !== 'any' && {
      label: TIME_FILTERS.find((t) => t.id === filters.time).label,
      clear: () => dispatch({ type: 'recipe-filters', patch: { time: 'any' } }),
    },
    ...filters.diets.map((d) => ({
      label: d,
      clear: () =>
        dispatch({ type: 'recipe-filters', patch: { diets: filters.diets.filter((x) => x !== d) } }),
    })),
  ].filter(Boolean)

  const emptyText =
    activeFilters.length > 0
      ? `No recipes match all ${activeFilters.length} filter${activeFilters.length === 1 ? '' : 's'}. Try removing “${activeFilters[activeFilters.length - 1].label}”.`
      : view === 'Saved'
        ? 'Recipes you save with the bookmark appear here.'
        : `Nothing matches “${query.trim()}”. Try a shorter search.`

  return (
    <>
      {/* No trailing icon action: there is no filter glyph in the brand set,
          and a magnifier next to a search field would name the wrong thing.
          The filter affordance is the labelled chip in the rail below. */}
      <ScreenHeader title="Recipes" />

      <div className="ap-sticky">
        <SearchField
          label="Search recipes"
          placeholder="Search recipes"
          value={query}
          onChange={(e) => dispatch({ type: 'recipes', patch: { query: e.target.value } })}
          onClear={() => dispatch({ type: 'recipes', patch: { query: '' } })}
        />
        <SegmentedControl
          options={VIEWS}
          value={view}
          label="Which recipes"
          onChange={(next) => dispatch({ type: 'recipes', patch: { view: next } })}
        />
        <div className="ap-rail">
          <FilterChip
            icon="recipe"
            onClick={() => dispatch({ type: 'sheet', sheet: { type: 'filters' } })}
          >
            Filters
          </FilterChip>
          {activeFilters.map((f) => (
            <FilterChip key={f.label} selected onClick={f.clear}>
              {f.label}
            </FilterChip>
          ))}
        </div>
      </div>

      <div className="ap-page ap-page--flush">
        <section className="ap-section" aria-labelledby="ap-reclist">
          <div className="ap-section__head">
            <h2 className="ap-section__title" id="ap-reclist">
              {view === 'For today' ? 'Fits what’s left today' : view === 'Saved' ? 'Saved' : 'All recipes'}
            </h2>
            {status === 'ready' && (
              <span className="ap-section__meta tnum">
                {results.length} {results.length === 1 ? 'recipe' : 'recipes'}
              </span>
            )}
          </div>

          {view === 'For today' && status === 'ready' && (
            <p className="ap-hint tnum">
              {day.remainingKcal >= 0
                ? `${nf.format(day.remainingKcal)} kcal left · ${nf.format(day.remaining.p)} g protein, ${nf.format(day.remaining.c)} g carbs, ${nf.format(day.remaining.f)} g fat.`
                : `You are ${nf.format(Math.abs(day.remainingKcal))} kcal over today's target, so nothing is shown as fitting.`}
            </p>
          )}

          {status === 'loading' ? (
            <LoadingList rows={3} label="Finding recipes" />
          ) : results.length === 0 ? (
            <StatePanel
              tone="neutral"
              icon="recipe"
              title="No recipes match"
              text={emptyText}
              action={activeFilters.length > 0 ? 'Clear filters' : undefined}
              onAction={() =>
                dispatch({ type: 'recipe-filters', patch: { goal: 'Any goal', time: 'any', diets: [] } })
              }
            />
          ) : (
            <div className="ap-stack">
              {results.map(({ recipe, fit }) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  thumb={recipe.photo ?? undefined}
                  note={fit.text}
                  noteTone={fit.tone}
                  saved={state.savedRecipes.includes(recipe.id)}
                  onSave={() => dispatch({ type: 'save-recipe', id: recipe.id })}
                  onOpen={() => dispatch({ type: 'push', screen: { screen: 'recipe', id: recipe.id } })}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  )
}

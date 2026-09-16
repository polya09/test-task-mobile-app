/**
 * Log — find a product, reuse a dish, or start building one.
 *
 * This is the front door of the first user story. A product answers "how many
 * calories in this thing?"; a dish answers the same question for something
 * with four ingredients and no barcode.
 */
import { useEffect, useMemo, useState } from 'react'
import { ScreenHeader } from '../../design-system/ui/Header'
import { SearchField } from '../../design-system/ui/Inputs'
import { SegmentedControl } from '../../design-system/ui/Selection'
import { IconButton, Button } from '../../design-system/ui/Button'
import { FoodCard } from '../../design-system/ui/Cards'
import { ListGroup, ListRow } from '../../design-system/ui/DataDisplay'
import { LoadingList, StatePanel } from '../../design-system/ui/Feedback'
import { FOODS, FOOD_BY_ID } from '../data/foods'
import { dishMacrosFor, kcal, portionLabel, portionMacros } from '../nutrition'
import { useStore } from '../store'

const MODES = ['Products', 'Dishes', 'Recent']

/** A search feels instant or it feels broken; 420 ms is long enough to read. */
const SEARCH_MS = 420

const matches = (food, q) =>
  [food.name, food.brand, food.note, food.group].filter(Boolean).join(' ').toLowerCase().includes(q)

export default function Log() {
  const { state, dispatch } = useStore()
  const { query, mode } = state.log
  const [status, setStatus] = useState('ready')

  const trimmed = query.trim().toLowerCase()

  useEffect(() => {
    if (mode !== 'Products' || trimmed === '') {
      setStatus('ready')
      return undefined
    }
    setStatus('loading')
    const timer = setTimeout(() => setStatus('ready'), SEARCH_MS)
    return () => clearTimeout(timer)
  }, [trimmed, mode])

  const results = useMemo(() => {
    if (trimmed === '') return FOODS.filter((f) => f.group !== 'Packaged').slice(0, 6)
    return FOODS.filter((f) => matches(f, trimmed))
  }, [trimmed])

  const openPortion = (food) => dispatch({ type: 'sheet', sheet: { type: 'portion', foodId: food.id } })

  const cardItem = (food) => ({
    name: food.brand ? `${food.brand} ${food.name}` : food.name,
    serving: `${portionLabel(food, food.defaultAmount)} · ${food.note}`,
    macros: portionMacros(food, food.defaultAmount),
  })

  /* The most recent distinct foods on the day, newest first. */
  const recent = useMemo(() => {
    const seen = new Set()
    return [...state.entries]
      .reverse()
      .filter((e) => e.kind === 'food' && FOOD_BY_ID[e.foodId] && !seen.has(e.foodId) && seen.add(e.foodId))
      .slice(0, 8)
  }, [state.entries])

  return (
    <>
      <ScreenHeader
        title="Add food"
        action={
          <IconButton
            icon="scan"
            label="Scan a barcode"
            variant="tertiary"
            onClick={() => dispatch({ type: 'tab', tab: 'scan' })}
          />
        }
      />

      <div className="ap-sticky">
        <SearchField
          label="Search foods"
          placeholder="Search foods and products"
          value={query}
          onChange={(e) => dispatch({ type: 'log', patch: { query: e.target.value } })}
          onClear={() => dispatch({ type: 'log', patch: { query: '' } })}
        />
        <SegmentedControl
          options={MODES}
          value={mode}
          label="What to add"
          onChange={(next) => dispatch({ type: 'log', patch: { mode: next } })}
        />
      </div>

      <div className="ap-page ap-page--flush">
        {mode === 'Products' && (
          <section className="ap-section" aria-labelledby="ap-results">
            <div className="ap-section__head">
              <h2 className="ap-section__title" id="ap-results">
                {trimmed === '' ? 'Common foods' : 'Results'}
              </h2>
              {status === 'ready' && trimmed !== '' && (
                <span className="ap-section__meta tnum">
                  {results.length} {results.length === 1 ? 'match' : 'matches'}
                </span>
              )}
            </div>

            {status === 'loading' ? (
              <LoadingList rows={3} label="Searching foods" />
            ) : results.length === 0 ? (
              <StatePanel
                tone="neutral"
                icon="search"
                title={`No food called “${query.trim()}”`}
                text="Check the spelling, or build it as a dish from its ingredients."
                action="Build it as a dish"
                onAction={() => {
                  dispatch({
                    type: 'draft',
                    draft: { name: query.trim(), servings: 1, items: [] },
                  })
                  dispatch({ type: 'push', screen: { screen: 'dish-builder' } })
                }}
              />
            ) : (
              <div className="ap-stack">
                {results.map((food) => (
                  <FoodCard
                    key={food.id}
                    item={cardItem(food)}
                    actionLabel="Add"
                    onAdd={() => openPortion(food)}
                    onOpen={() => openPortion(food)}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {mode === 'Dishes' && (
          <section className="ap-section" aria-labelledby="ap-dishes">
            <div className="ap-section__head">
              <h2 className="ap-section__title" id="ap-dishes">
                Your dishes
              </h2>
              <span className="ap-section__meta tnum">{state.dishes.length} saved</span>
            </div>

            <Button
              icon="calculator"
              fullWidth
              onClick={() => {
                dispatch({ type: 'draft', draft: { name: '', servings: 1, items: [] } })
                dispatch({ type: 'push', screen: { screen: 'dish-builder' } })
              }}
            >
              Build a new dish
            </Button>

            {state.dishes.length === 0 ? (
              <StatePanel
                tone="neutral"
                icon="calculator"
                title="No dishes yet"
                text="A dish is a meal you build once from its ingredients and log in one tap afterwards."
              />
            ) : (
              <ListGroup>
                {state.dishes.map((dish) => (
                  <ListRow
                    key={dish.id}
                    title={dish.name}
                    meta={`${dish.items.length} ingredients · makes ${dish.servings}`}
                    value={kcal(dishMacrosFor(dish, 1))}
                    unit="kcal"
                    onClick={() => dispatch({ type: 'sheet', sheet: { type: 'dish', dishId: dish.id } })}
                  />
                ))}
              </ListGroup>
            )}
            <p className="ap-hint">A dish stores its ingredients, so its calories update if you change one.</p>
          </section>
        )}

        {mode === 'Recent' && (
          <section className="ap-section" aria-labelledby="ap-recent">
            <div className="ap-section__head">
              <h2 className="ap-section__title" id="ap-recent">
                Recently logged
              </h2>
            </div>
            {recent.length === 0 ? (
              <StatePanel
                tone="neutral"
                icon="flame"
                title="Nothing logged yet"
                text="Foods you log today appear here, so a repeat meal takes one tap."
              />
            ) : (
              <div className="ap-stack">
                {recent.map((entry) => {
                  const food = FOOD_BY_ID[entry.foodId]
                  return (
                    <FoodCard
                      key={entry.id}
                      item={{
                        name: entry.name,
                        serving: `${portionLabel(food, entry.amount)} · logged ${entry.time}`,
                        macros: entry.macros,
                      }}
                      actionLabel="Add again"
                      onAdd={() =>
                        dispatch({
                          type: 'sheet',
                          sheet: { type: 'portion', foodId: food.id, amount: entry.amount },
                        })
                      }
                      onOpen={() =>
                        dispatch({
                          type: 'sheet',
                          sheet: { type: 'portion', foodId: food.id, amount: entry.amount },
                        })
                      }
                    />
                  )
                })}
              </div>
            )}
          </section>
        )}
      </div>
    </>
  )
}

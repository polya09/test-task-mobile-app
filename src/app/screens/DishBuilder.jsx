/**
 * Dish builder — the other half of the first user story.
 *
 * A packaged product has a barcode; a bowl you made does not. This screen
 * sums a dish from its ingredients, divides by the servings it makes, and
 * logs the result as one entry. The running total at the top is the same
 * calculation the portion sheet does, applied to a list.
 */
import { useMemo } from 'react'
import { ScreenHeader } from '../../design-system/ui/Header'
import { TextField, NumberField } from '../../design-system/ui/Inputs'
import { Button } from '../../design-system/ui/Button'
import { ListGroup, ListRow } from '../../design-system/ui/DataDisplay'
import { StatePanel } from '../../design-system/ui/Feedback'
import { Card } from '../../design-system/ui/Cards'
import MacroReadout from '../parts/MacroReadout'
import { FOOD_BY_ID } from '../data/foods'
import { daySummary, dishPerServing, kcal, nf, portionLabel, portionMacros } from '../nutrition'
import { buildDishEntry, useStore } from '../store'

const MAX_SERVINGS = 12

export default function DishBuilder() {
  const { state, dispatch } = useStore()
  const draft = state.draft
  const day = daySummary(state.entries, state.targets)

  const items = draft?.items ?? []
  const servings = draft?.servings ?? 1
  const invalidServings = servings === '' || Number(servings) < 1 || Number(servings) > MAX_SERVINGS
  const nameMissing = !draft?.name?.trim()

  const perServing = useMemo(
    () => dishPerServing(items, invalidServings ? 1 : Number(servings)),
    [items, servings, invalidServings],
  )

  if (!draft) return null

  const canSave = items.length > 0 && !nameMissing && !invalidServings

  const patch = (next) => dispatch({ type: 'draft-patch', patch: next })

  const logIt = () => {
    if (!canSave) return
    const dish = { ...draft, name: draft.name.trim(), servings: Number(servings) }
    dispatch({ type: 'save-dish', dish })
    dispatch({
      type: 'add-entry',
      entry: buildDishEntry(dish, 1),
      toastTitle: `${dish.name} logged · ${nf.format(kcal(perServing))} kcal`,
    })
  }

  return (
    <>
      <ScreenHeader title="Build a dish" onBack={() => dispatch({ type: 'pop' })} backLabel="Back to Add food" />

      <div className="ap-page ap-page--pushed ap-page--flush">
        <TextField
          label="Dish name"
          required
          placeholder="Chicken and rice bowl"
          value={draft.name}
          error={nameMissing && items.length > 0 ? 'Give the dish a name so you can log it again later.' : undefined}
          hint={nameMissing && items.length > 0 ? undefined : 'Saved to your dishes, so the next one is a single tap.'}
          onChange={(e) => patch({ name: e.target.value })}
        />

        <Card>
          <div className="ds-card__head">
            <h2 className="ds-card__title">{items.length === 0 ? 'Nothing added yet' : 'One serving'}</h2>
            <span className="ds-card__meta tnum">
              {items.length} {items.length === 1 ? 'ingredient' : 'ingredients'}
            </span>
          </div>
          <MacroReadout
            macros={perServing}
            targetKcal={day.targetKcal}
            macroTargets={day.macroTargets}
            caption={items.length === 0 ? 'Add ingredients' : 'one serving'}
          />
        </Card>

        <NumberField
          label="Servings this makes"
          value={servings}
          step={1}
          min={0}
          max={MAX_SERVINGS}
          error={invalidServings ? `Enter between 1 and ${MAX_SERVINGS} servings.` : undefined}
          hint={invalidServings ? undefined : 'The total above is divided by this to give one serving.'}
          onChange={(next) => patch({ servings: next })}
        />

        <section className="ap-section" aria-labelledby="ap-ings">
          <div className="ap-section__head">
            <h2 className="ap-section__title" id="ap-ings">
              Ingredients
            </h2>
            {items.length > 0 && <span className="ap-section__meta tnum">{items.length} added</span>}
          </div>

          {items.length === 0 ? (
            <StatePanel
              tone="neutral"
              icon="calculator"
              title="Add ingredients to see the dish's calories"
              text="Every ingredient is weighed and scaled from the same catalogue the search uses."
              action="Add an ingredient"
              onAction={() => dispatch({ type: 'sheet', sheet: { type: 'ingredient' } })}
            />
          ) : (
            <>
              <ListGroup>
                {items.map((item, index) => {
                  const food = FOOD_BY_ID[item.foodId]
                  return (
                    <ListRow
                      key={`${item.foodId}-${index}`}
                      title={food.name}
                      meta={portionLabel(food, item.amount)}
                      value={kcal(portionMacros(food, item.amount))}
                      unit="kcal"
                      onClick={() =>
                        dispatch({ type: 'sheet', sheet: { type: 'ingredient-edit', index } })
                      }
                    />
                  )
                })}
              </ListGroup>
              <Button
                variant="secondary"
                icon="plus"
                fullWidth
                onClick={() => dispatch({ type: 'sheet', sheet: { type: 'ingredient' } })}
              >
                Add another ingredient
              </Button>
              <p className="ap-hint">Tap an ingredient to change its weight or take it out.</p>
            </>
          )}
        </section>
      </div>

      <div className="ap-commit">
        <div className="ap-commit__figure">
          <p className="ap-commit__value">{items.length === 0 ? '—' : nf.format(kcal(perServing))}</p>
          <p className="ap-commit__label">kcal / serving</p>
        </div>
        <Button icon="plus" disabled={!canSave} onClick={logIt}>
          Log one serving
        </Button>
      </div>
    </>
  )
}

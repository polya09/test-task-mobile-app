/**
 * Servings — logging a recipe or a saved dish at the portion actually eaten,
 * and editing one already on the day.
 *
 * The same calculation as the portion sheet, with servings in place of grams:
 * one serving's macros scaled, rounded, then handed to kcal(). A recipe's
 * card, its detail screen and this sheet therefore never disagree.
 */
import { useState } from 'react'
import Sheet from '../parts/Sheet'
import { NumberField } from '../../design-system/ui/Inputs'
import { Button } from '../../design-system/ui/Button'
import { Alert } from '../../design-system/ui/Feedback'
import { Tag } from '../../design-system/ui/Selection'
import MacroReadout from '../parts/MacroReadout'
import { RECIPE_BY_ID } from '../data/recipes'
import { daySummary, dishMacrosFor, kcal, nf, recipeServingMacros } from '../nutrition'
import { buildDishEntry, buildRecipeEntry, useStore } from '../store'

const MAX_SERVINGS = 10

export default function ServingsSheet({ sheet }) {
  const { state, dispatch } = useStore()

  const editing = sheet.type === 'entry'
  const entry = editing ? state.entries.find((e) => e.id === sheet.entryId) : null

  const [servings, setServings] = useState(entry?.servings ?? 1)

  const recipeId = editing ? entry?.recipeId : sheet.recipeId
  const dishId = editing ? entry?.dishId : sheet.dishId
  const recipe = recipeId ? RECIPE_BY_ID[recipeId] : null
  const dish = dishId ? state.dishes.find((d) => d.id === dishId) : null
  const subject = recipe ?? dish
  if (!subject) return null

  const invalid = servings === '' || Number(servings) < 1 || Number(servings) > MAX_SERVINGS
  const error = invalid ? `Enter between 1 and ${MAX_SERVINGS} servings.` : null

  const macros = invalid
    ? { p: 0, c: 0, f: 0 }
    : recipe
      ? recipeServingMacros(recipe, Number(servings))
      : dishMacrosFor(dish, Number(servings))
  const energy = kcal(macros)

  const day = daySummary(
    editing ? state.entries.filter((e) => e.id !== entry.id) : state.entries,
    state.targets,
  )
  const overBy = day.consumedKcal + energy - day.targetKcal

  const one = recipe ? kcal(recipe.macros) : kcal(dishMacrosFor(dish, 1))

  const commit = () => {
    if (invalid) return
    const built = recipe
      ? buildRecipeEntry(recipe, Number(servings))
      : buildDishEntry(dish, Number(servings))
    if (editing) {
      dispatch({
        type: 'update-entry',
        id: entry.id,
        patch: { servings: Number(servings), detail: built.detail, macros: built.macros },
        toastTitle: `${subject.name} updated · ${nf.format(energy)} kcal`,
      })
    } else {
      dispatch({
        type: 'add-entry',
        entry: built,
        toastTitle: `${subject.name} logged · ${nf.format(energy)} kcal`,
      })
    }
  }

  return (
    <Sheet
      title={subject.name}
      primary={editing ? 'Save changes' : `Add ${nf.format(energy)} kcal`}
      secondary="Cancel"
      primaryDisabled={invalid}
      onPrimary={commit}
      onSecondary={() => dispatch({ type: 'sheet', sheet: null })}
      onClose={() => dispatch({ type: 'sheet', sheet: null })}
    >
      <div className="ap-sheetgrid">
        <div className="ap-chiprow">
          <Tag>{`One serving · ${nf.format(one)} kcal`}</Tag>
          <Tag>{recipe ? `Recipe makes ${recipe.serves}` : `Dish makes ${dish.servings}`}</Tag>
        </div>

        <NumberField
          label="Servings eaten"
          value={servings}
          step={1}
          min={0}
          max={MAX_SERVINGS}
          error={error}
          hint={error ? undefined : `Logged as ${servings} × one serving, at ${nf.format(one)} kcal each.`}
          onChange={setServings}
        />

        <MacroReadout
          macros={macros}
          targetKcal={day.targetKcal}
          macroTargets={day.macroTargets}
          caption={
            invalid ? 'Enter servings' : `${servings} serving${Number(servings) === 1 ? '' : 's'}`
          }
        />

        {!invalid && overBy > 0 && (
          <Alert tone="warning" title={`This would put you ${nf.format(overBy)} kcal over today's target`}>
            Logged either way — the number is yours to decide on.
          </Alert>
        )}

        {editing && (
          <Button
            variant="danger"
            fullWidth
            onClick={() => dispatch({ type: 'remove-entry', id: entry.id, name: entry.name })}
          >
            Remove from today
          </Button>
        )}
      </div>
    </Sheet>
  )
}

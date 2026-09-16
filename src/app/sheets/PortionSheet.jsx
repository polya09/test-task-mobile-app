/**
 * Portion & calories — where the first user story is actually answered.
 *
 * The food holds macros per 100 g, 100 ml or one piece. This sheet scales
 * them by the amount, rounds to the grams it is about to print, and hands
 * exactly those grams to kcal(). Change the amount and the ring, the bars and
 * the button's figure all move together, because they are one calculation.
 *
 * Four jobs, one component: adding a searched product, adding a scanned one,
 * editing something already on the day, and setting an ingredient's weight in
 * the dish builder.
 */
import { useState } from 'react'
import Sheet from '../parts/Sheet'
import { NumberField } from '../../design-system/ui/Inputs'
import { Button } from '../../design-system/ui/Button'
import { Alert } from '../../design-system/ui/Feedback'
import MacroReadout from '../parts/MacroReadout'
import { FOOD_BY_ID } from '../data/foods'
import { daySummary, kcal, nf, portionLabel, portionMacros } from '../nutrition'
import { buildFoodEntry, useStore } from '../store'

const maxFor = (food) => (food.unit === 'piece' ? 20 : 2000)

function validate(food, amount) {
  const max = maxFor(food)
  if (amount === '' || amount === null || Number.isNaN(Number(amount))) {
    return `Enter an amount between 1 and ${nf.format(max)} ${food.unit === 'piece' ? (food.pieceLabel ?? 'piece') + 's' : food.unit}.`
  }
  const n = Number(amount)
  if (n < 1) return `The smallest amount this can be logged at is 1 ${food.unit === 'piece' ? (food.pieceLabel ?? 'piece') : food.unit}.`
  if (n > max)
    return `${nf.format(max)} ${food.unit === 'piece' ? (food.pieceLabel ?? 'piece') + 's' : food.unit} is the most that can be logged in one entry.`
  return null
}

export default function PortionSheet({ sheet }) {
  const { state, dispatch } = useStore()

  const editing = sheet.type === 'entry'
  const entry = editing ? state.entries.find((e) => e.id === sheet.entryId) : null

  // An entry that is a recipe or a dish is edited by its servings, not grams;
  // that sheet is ServingsSheet, so this one only ever sees a food.
  const food = FOOD_BY_ID[editing ? entry?.foodId : sheet.foodId]
  const [amount, setAmount] = useState(() => {
    if (editing) return entry?.amount ?? food?.defaultAmount ?? 0
    return sheet.amount ?? food?.defaultAmount ?? 0
  })

  if (!food) return null

  const error = validate(food, amount)
  const macros = error ? { p: 0, c: 0, f: 0 } : portionMacros(food, amount)
  const energy = kcal(macros)

  const day = daySummary(
    editing ? state.entries.filter((e) => e.id !== entry.id) : state.entries,
    state.targets,
  )
  const after = day.consumedKcal + energy
  const overBy = after - day.targetKcal

  const title = food.brand ? `${food.brand} ${food.name}` : food.name

  const commit = () => {
    if (error) return
    const built = buildFoodEntry(food, Number(amount))
    if (editing) {
      dispatch({
        type: 'update-entry',
        id: entry.id,
        patch: { amount: Number(amount), detail: built.detail, macros: built.macros },
        toastTitle: `${food.name} updated · ${nf.format(energy)} kcal`,
      })
    } else {
      dispatch({
        type: 'add-entry',
        entry: built,
        toastTitle: `Added to today · ${nf.format(energy)} kcal`,
      })
    }
  }

  return (
    <Sheet
      title={title}
      primary={editing ? 'Save changes' : `Add ${nf.format(energy)} kcal`}
      secondary="Cancel"
      primaryDisabled={Boolean(error)}
      onPrimary={commit}
      onSecondary={() => dispatch({ type: 'sheet', sheet: null })}
      onClose={() => dispatch({ type: 'sheet', sheet: null })}
    >
      <div className="ap-sheetgrid">
        {sheet.from === 'scan' && (
          <Alert tone="success" title={`Barcode ${food.barcode} matched`}>
            Simulated read. Check the portion before adding it to today.
          </Alert>
        )}

        <NumberField
          label={food.unit === 'piece' ? `How many ${food.pieceLabel ?? 'piece'}s?` : 'Portion'}
          unit={food.unit === 'piece' ? undefined : food.unit}
          value={amount}
          step={food.step}
          min={0}
          max={maxFor(food)}
          error={error}
          hint={
            error
              ? undefined
              : food.servingHint
                ? `${food.note} · ${food.servingHint}`
                : `${food.note} · per ${food.base} ${food.unit === 'piece' ? (food.pieceLabel ?? 'piece') : food.unit}: ${food.macros.p} P / ${food.macros.c} C / ${food.macros.f} F`
          }
          onChange={setAmount}
        />

        <MacroReadout
          macros={macros}
          targetKcal={day.targetKcal}
          macroTargets={day.macroTargets}
          caption={error ? 'Enter a portion' : portionLabel(food, amount)}
        />

        {!error && overBy > 0 && (
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

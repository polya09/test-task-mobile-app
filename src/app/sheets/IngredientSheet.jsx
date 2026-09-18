/**
 * The dish builder's two small sheets: pick an ingredient, and set its weight.
 *
 * They read the same catalogue and the same scaling as the Log screen and the
 * portion sheet, so an ingredient inside a dish and the same food logged on
 * its own produce identical numbers.
 */
import { useMemo, useState } from 'react'
import Sheet from '../parts/Sheet'
import { SearchField, NumberField } from '../../design-system/ui/Inputs'
import { Button } from '../../design-system/ui/Button'
import { ListGroup, ListRow } from '../../design-system/ui/DataDisplay'
import { StatePanel } from '../../design-system/ui/Feedback'
import { FOODS, FOOD_BY_ID } from '../data/foods'
import { kcal, nf, portionLabel, portionMacros } from '../nutrition'
import { useStore } from '../store'

const matches = (food, q) =>
  [food.name, food.brand, food.note, food.group].filter(Boolean).join(' ').toLowerCase().includes(q)

export function IngredientPickerSheet() {
  const { state, dispatch } = useStore()
  const [query, setQuery] = useState('')
  const trimmed = query.trim().toLowerCase()

  const results = useMemo(
    () => (trimmed === '' ? FOODS.slice(0, 8) : FOODS.filter((f) => matches(f, trimmed))),
    [trimmed],
  )

  const add = (food) => {
    dispatch({
      type: 'draft-patch',
      patch: { items: [...state.draft.items, { foodId: food.id, amount: food.defaultAmount }] },
    })
    dispatch({ type: 'sheet', sheet: null })
  }

  return (
    <Sheet
      title="Add an ingredient"
      primary="Done"
      secondary="Cancel"
      onPrimary={() => dispatch({ type: 'sheet', sheet: null })}
      onSecondary={() => dispatch({ type: 'sheet', sheet: null })}
      onClose={() => dispatch({ type: 'sheet', sheet: null })}
    >
      <div className="ap-sheetgrid">
        <SearchField
          label="Search ingredients"
          placeholder="Search ingredients"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClear={() => setQuery('')}
        />

        {results.length === 0 ? (
          <StatePanel
            tone="neutral"
            icon="search"
            title={`No ingredient called “${query.trim()}”`}
            text="Check the spelling, or pick the closest whole food in the catalogue."
          />
        ) : (
          <ListGroup>
            {results.map((food) => (
              <ListRow
                key={food.id}
                title={food.brand ? `${food.brand} ${food.name}` : food.name}
                meta={`${food.note} · ${portionLabel(food, food.defaultAmount)}`}
                value={kcal(portionMacros(food, food.defaultAmount))}
                unit="kcal"
                onClick={() => add(food)}
              />
            ))}
          </ListGroup>
        )}
      </div>
    </Sheet>
  )
}

export function IngredientEditSheet({ index }) {
  const { state, dispatch } = useStore()
  const item = state.draft?.items[index]
  const food = item ? FOOD_BY_ID[item.foodId] : null
  const [amount, setAmount] = useState(item?.amount ?? 0)

  if (!food) return null

  const max = food.unit === 'piece' ? 20 : 2000
  const invalid = amount === '' || Number(amount) < 1 || Number(amount) > max
  const macros = invalid ? { p: 0, c: 0, f: 0 } : portionMacros(food, amount)

  const close = () => dispatch({ type: 'sheet', sheet: null })

  const save = () => {
    if (invalid) return
    const items = state.draft.items.map((i, n) => (n === index ? { ...i, amount: Number(amount) } : i))
    dispatch({ type: 'draft-patch', patch: { items } })
    close()
  }

  const remove = () => {
    dispatch({
      type: 'draft-patch',
      patch: { items: state.draft.items.filter((_, n) => n !== index) },
    })
    close()
  }

  return (
    <Sheet
      title={food.name}
      primary={invalid ? 'Enter a weight' : `Save · ${nf.format(kcal(macros))} kcal`}
      secondary="Cancel"
      primaryDisabled={invalid}
      onPrimary={save}
      onSecondary={close}
      onClose={close}
    >
      <div className="ap-sheetgrid">
        <NumberField
          label={food.unit === 'piece' ? `How many ${food.pieceLabel ?? 'piece'}s?` : 'Weight in the dish'}
          unit={food.unit === 'piece' ? undefined : food.unit}
          value={amount}
          step={food.step}
          min={0}
          max={max}
          error={invalid ? `Enter an amount between 1 and ${nf.format(max)}.` : undefined}
          hint={invalid ? undefined : `${macros.p} g protein · ${macros.c} g carbs · ${macros.f} g fat`}
          onChange={setAmount}
        />

        <Button variant="danger" fullWidth onClick={remove}>
          Take out of the dish
        </Button>
      </div>
    </Sheet>
  )
}

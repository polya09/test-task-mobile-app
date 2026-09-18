/**
 * The day log: the live reference day, and the sample days behind it.
 *
 * Nothing here holds a calorie figure. A plan is a list of (food, amount) or
 * (dish, servings) pairs, and the same `portionMacros` / `dishMacrosFor` the
 * rest of the app uses turns it into the grams that get printed — so a past
 * day's ring, macro bars and list agree with each other exactly as today's do.
 *
 * Wednesday is deliberately left with no plan at all: a day you forgot to log
 * is a real state, and the Today screen has to have something to say about it.
 */
import { FOOD_BY_ID } from './foods'
import { dishMacrosFor, portionLabel, portionMacros } from '../nutrition'
import { REFERENCE_DATE, addDays } from '../dates'

export const SEED_DISH = {
  id: 'chicken-bowl',
  name: 'Chicken Bowl',
  servings: 1,
  items: [
    { foodId: 'chicken-breast', amount: 110 },
    { foodId: 'brown-rice', amount: 200 },
    { foodId: 'avocado', amount: 55 },
    { foodId: 'chickpeas', amount: 25 },
  ],
}

export const foodEntry = (id, foodId, amount, time) => {
  const food = FOOD_BY_ID[foodId]
  return {
    id,
    kind: 'food',
    foodId,
    amount,
    time,
    name: food.name,
    detail: portionLabel(food, amount),
    macros: portionMacros(food, amount),
  }
}

export const dishEntry = (id, dish, servings, time) => ({
  id,
  kind: 'dish',
  dishId: dish.id,
  servings,
  time,
  name: dish.name,
  detail: `${servings} serving${servings === 1 ? '' : 's'} · ${dish.items.length} ingredients`,
  macros: dishMacrosFor(dish, servings),
})

/**
 * Thursday 16 September — the live day. Scaling these five portions returns
 * 72 P / 135 C / 38 F = 1,170 kcal, the figure the design system documents.
 */
export const SEED_ENTRIES = [
  foodEntry('seed-oats', 'rolled-oats', 60, '07:20'),
  foodEntry('seed-yogurt', 'greek-yogurt', 150, '07:20'),
  foodEntry('seed-banana', 'banana', 118, '10:05'),
  dishEntry('seed-bowl', SEED_DISH, 1, '13:15'),
  foodEntry('seed-almonds', 'almonds', 30, '16:40'),
]

/** (food, grams, time) for each past day, newest concerns first. */
const PLANS = {
  /* Monday — a training day: two full meals and a recovery snack. */
  [addDays(REFERENCE_DATE, -3)]: [
    ['rolled-oats', 80, '07:10'],
    ['whole-milk', 200, '07:10'],
    ['greek-yogurt', 170, '10:20'],
    ['blueberries', 80, '10:20'],
    ['chicken-breast', 150, '13:00'],
    ['brown-rice', 200, '13:00'],
    ['broccoli', 150, '13:00'],
    ['almonds', 25, '16:30'],
    ['salmon-fillet', 130, '19:40'],
    ['sweet-potato', 200, '19:40'],
  ],
  /* Tuesday — a rest day, lighter and shorter. */
  [addDays(REFERENCE_DATE, -2)]: [
    ['wholemeal-bread', 2, '08:05'],
    ['egg', 2, '08:05'],
    ['avocado', 60, '08:05'],
    ['cottage-cheese', 200, '12:45'],
    ['banana', 118, '12:45'],
    ['lean-beef-mince', 150, '18:50'],
    ['white-rice', 180, '18:50'],
  ],
  /* Wednesday — nothing logged. */
  [addDays(REFERENCE_DATE, -1)]: [],

  /* The week before, so stepping back a week is not an empty screen. */
  [addDays(REFERENCE_DATE, -6)]: [
    ['rolled-oats', 60, '07:30'],
    ['whey-protein', 30, '07:30'],
    ['firm-tofu', 150, '19:00'],
    ['quinoa', 180, '19:00'],
    ['blueberries', 100, '21:05'],
  ],
  [addDays(REFERENCE_DATE, -5)]: [
    ['egg', 3, '09:30'],
    ['wholemeal-bread', 2, '09:30'],
    ['northline-protein-bar', 1, '14:00'],
    ['lean-beef-mince', 200, '19:30'],
    ['white-rice', 200, '19:30'],
    ['broccoli', 100, '19:30'],
    ['peanut-butter', 32, '21:10'],
  ],
}

/** Date key -> entries. The Chicken Bowl reappears on the Friday before. */
export const HISTORY = Object.fromEntries(
  Object.entries(PLANS).map(([date, plan]) => [
    date,
    plan.map(([foodId, amount, time], i) => foodEntry(`${date}-${i}`, foodId, amount, time)),
  ]),
)

HISTORY[addDays(REFERENCE_DATE, -6)].splice(
  2,
  0,
  dishEntry(`${addDays(REFERENCE_DATE, -6)}-bowl`, SEED_DISH, 1, '12:30'),
)

/**
 * The dates that actually have entries — the strip marks these with a dot, so
 * the empty Wednesday is deliberately not among them.
 */
export const LOGGED_DATES = new Set([
  REFERENCE_DATE,
  ...Object.entries(HISTORY)
    .filter(([, entries]) => entries.length > 0)
    .map(([date]) => date),
])

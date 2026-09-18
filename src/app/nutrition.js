/**
 * Every number the prototype shows passes through this file.
 *
 * The rule, inherited from Stage 3: no screen holds a calorie figure. A food
 * holds macros per a stated basis; a portion scales them; `round3` fixes the
 * grams that will actually be printed; and `kcal()` — the design system's one
 * Atwater function — turns exactly those printed grams into calories. A card,
 * a ring and a recipe detail therefore cannot disagree, because all three are
 * reading the same rounded macros.
 */
import { kcal, TARGET, nf } from '../design-system/data'
import { FOOD_BY_ID } from './data/foods'

export { kcal, nf }

export const EMPTY = { p: 0, c: 0, f: 0 }

/** Grams as printed: whole numbers, so the sum on screen is the sum computed. */
export const round3 = ({ p, c, f }) => ({
  p: Math.round(p),
  c: Math.round(c),
  f: Math.round(f),
})

export const addMacros = (a, b) => ({ p: a.p + b.p, c: a.c + b.c, f: a.f + b.f })

export const sumMacros = (list) => list.reduce((acc, m) => addMacros(acc, m), EMPTY)

export const scaleMacros = ({ p, c, f }, factor) => ({
  p: p * factor,
  c: c * factor,
  f: f * factor,
})

/**
 * The macros of `amount` units of a food, rounded to the grams the UI prints.
 * `food.base` is the amount `food.macros` describes — 100 g, 100 ml or 1 piece.
 */
export const portionMacros = (food, amount) =>
  round3(scaleMacros(food.macros, (Number(amount) || 0) / food.base))

/** "150 g", "250 ml", "2 slices" — how a portion is written everywhere. */
export function portionLabel(food, amount) {
  const n = Number(amount) || 0
  if (food.unit !== 'piece') return `${nf.format(n)} ${food.unit}`
  const word = food.pieceLabel ?? 'piece'
  return `${nf.format(n)} ${word}${n === 1 ? '' : 's'}`
}

/**
 * A dish is the sum of its ingredients, divided by the servings it makes.
 *
 * The sum is kept unrounded until the last step. Whole grams are not additive
 * — round each ingredient first and the error compounds — so a dish rounds
 * exactly once, at the serving, which is the thing that gets logged.
 */
const dishRaw = (items) =>
  sumMacros(
    items.map((i) => {
      const food = FOOD_BY_ID[i.foodId]
      return food ? scaleMacros(food.macros, (Number(i.amount) || 0) / food.base) : EMPTY
    }),
  )

export function dishPerServing(items, servings) {
  const n = Math.max(1, Number(servings) || 1)
  return round3(scaleMacros(dishRaw(items), 1 / n))
}

/** The macros of `servingsEaten` servings of a dish that makes `dish.servings`. */
export function dishMacrosFor(dish, servingsEaten = 1) {
  const makes = Math.max(1, Number(dish.servings) || 1)
  return round3(scaleMacros(dishRaw(dish.items), (Number(servingsEaten) || 1) / makes))
}

/** Macros for `servings` servings of a recipe, as printed. */
export const recipeServingMacros = (recipe, servings = 1) =>
  round3(scaleMacros(recipe.macros, Number(servings) || 1))

/* ------------------------------------------------------------------ *
 * Targets                                                             *
 * ------------------------------------------------------------------ */

/**
 * Macro split per goal. `cut` is tuned so that the default 2,000 kcal target
 * returns exactly the 150 P / 205 C / 62 F the design system documents.
 */
export const GOALS = [
  { id: 'cut', label: 'Cut', split: { p: 0.3, c: 0.41, f: 0.279 } },
  { id: 'maintain', label: 'Maintain', split: { p: 0.27, c: 0.45, f: 0.28 } },
  { id: 'build', label: 'Build', split: { p: 0.26, c: 0.49, f: 0.25 } },
]

export const GOAL_BY_ID = Object.fromEntries(GOALS.map((g) => [g.id, g]))

/** The macro grams a calorie target and a goal imply. */
export function macroTargets(kcalTarget, goalId) {
  const split = (GOAL_BY_ID[goalId] ?? GOALS[0]).split
  return {
    p: Math.round((kcalTarget * split.p) / 4),
    c: Math.round((kcalTarget * split.c) / 4),
    f: Math.round((kcalTarget * split.f) / 9),
  }
}

export const DEFAULT_TARGETS = {
  kcal: TARGET.kcal,
  goal: 'cut',
  diets: [],
}

/* ------------------------------------------------------------------ *
 * The day                                                             *
 * ------------------------------------------------------------------ */

/** Everything Today, the rings and the recipe fit test read from. */
export function daySummary(entries, targets) {
  const consumed = round3(sumMacros(entries.map((e) => e.macros)))
  const consumedKcal = kcal(consumed)
  const macros = macroTargets(targets.kcal, targets.goal)
  return {
    consumed,
    consumedKcal,
    targetKcal: targets.kcal,
    macroTargets: macros,
    remainingKcal: targets.kcal - consumedKcal,
    remaining: {
      p: macros.p - consumed.p,
      c: macros.c - consumed.c,
      f: macros.f - consumed.f,
    },
  }
}

/** The three rows every MacroBar group is built from, in P → C → F order. */
export function macroRows(consumed, targets) {
  return [
    {
      key: 'p',
      name: 'Protein',
      short: 'P',
      value: consumed.p,
      target: targets.p,
      colour: 'var(--ds-protein)',
      track: 'var(--ds-protein-track)',
    },
    {
      key: 'c',
      name: 'Carbs',
      short: 'C',
      value: consumed.c,
      target: targets.c,
      colour: 'var(--ds-carbs)',
      track: 'var(--ds-carbs-track)',
    },
    {
      key: 'f',
      name: 'Fat',
      short: 'F',
      value: consumed.f,
      target: targets.f,
      colour: 'var(--ds-fat)',
      track: 'var(--ds-fat-track)',
    },
  ]
}

/* ------------------------------------------------------------------ *
 * "Suitable for me" — the recipe fit test                             *
 * ------------------------------------------------------------------ */

const MACRO_NAME = { p: 'protein', c: 'carbohydrate', f: 'fat' }

/**
 * Three verdicts, and every one of them is a sentence, never a colour:
 *
 *   fits  — one serving is inside both the calories and the macros left today
 *   tight — inside the calories, but past one macro budget
 *   over  — past the calories left today
 *
 * The app reports the number; it never calls a recipe good or bad.
 */
export function recipeFit(recipe, day) {
  const energy = kcal(recipe.macros)
  const overBy = energy - day.remainingKcal

  if (overBy > 0) {
    return {
      status: 'over',
      tone: 'warning',
      energy,
      text: `${nf.format(overBy)} kcal over what's left today`,
    }
  }

  const strained = ['f', 'c', 'p']
    .map((k) => ({ key: k, over: recipe.macros[k] - day.remaining[k] }))
    .filter((m) => m.over > 0)
    .sort((a, b) => b.over - a.over)

  if (strained.length > 0) {
    const worst = strained[0]
    return {
      status: 'tight',
      tone: 'info',
      energy,
      text: `${nf.format(worst.over)} g over your remaining ${MACRO_NAME[worst.key]}`,
    }
  }

  return {
    status: 'fits',
    tone: 'success',
    energy,
    text: `Fits your remaining ${nf.format(day.remainingKcal)} kcal`,
  }
}

export const FIT_ORDER = { fits: 0, tight: 1, over: 2 }

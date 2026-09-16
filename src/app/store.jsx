/**
 * The prototype's single store.
 *
 * One reducer holds the day, the targets, the saved dishes and the navigation
 * position, so every screen reads the same numbers and a change made in a
 * sheet is visible on Today before the sheet has finished closing.
 *
 * Entries are stored with their macros already rounded to printed grams, which
 * is why the day total on Today is exactly the sum of the rows beneath it.
 */
import { createContext, useContext, useMemo, useReducer } from 'react'
import { FOOD_BY_ID } from './data/foods'
import {
  DEFAULT_TARGETS,
  dishMacrosFor,
  portionLabel,
  portionMacros,
  recipeServingMacros,
} from './nutrition'
import { RECIPE_BY_ID } from './data/recipes'

/* ---------------------------------------------------------------- *
 * Seed — the Stage 3 reference day, rebuilt from the catalogue.      *
 * Scaling these five portions returns 72 P / 135 C / 38 F, the       *
 * 1,170 kcal the design system documents.                            *
 * ---------------------------------------------------------------- */

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

const foodEntry = (id, foodId, amount, time) => {
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

const dishEntry = (id, dish, servings, time) => ({
  id,
  kind: 'dish',
  dishId: dish.id,
  servings,
  time,
  name: dish.name,
  detail: `${servings} serving${servings === 1 ? '' : 's'} · ${dish.items.length} ingredients`,
  macros: dishMacrosFor(dish, servings),
})

const SEED_ENTRIES = [
  foodEntry('seed-oats', 'rolled-oats', 60, '07:20'),
  foodEntry('seed-yogurt', 'greek-yogurt', 150, '07:20'),
  foodEntry('seed-banana', 'banana', 118, '10:05'),
  dishEntry('seed-bowl', SEED_DISH, 1, '13:15'),
  foodEntry('seed-almonds', 'almonds', 30, '16:40'),
]

/** A deterministic clock, so a walkthrough reads the same every time. */
const FIRST_LOG_MINUTES = 17 * 60 + 10
const clockAt = (count) => {
  const total = FIRST_LOG_MINUTES + count * 25
  const h = Math.floor(total / 60) % 24
  const m = total % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export const INITIAL = {
  targets: DEFAULT_TARGETS,
  entries: SEED_ENTRIES,
  dishes: [SEED_DISH],
  savedRecipes: ['grilled-chicken-salad'],
  logged: 0,

  tab: 'today',
  stack: [],
  sheet: null,
  toast: null,

  log: { query: '', mode: 'Products' },
  recipes: {
    query: '',
    view: 'For today',
    filters: { goal: 'Any goal', time: 'any', diets: [], fitsOnly: false },
  },
  scan: { status: 'idle', foodId: null, barcode: null, nextIndex: 0 },
  draft: null,
}

let uid = 0
const nextId = () => `e${++uid}`

function reducer(state, action) {
  switch (action.type) {
    /* ---- navigation ---- */
    case 'tab':
      return { ...state, tab: action.tab, stack: [], sheet: null }
    case 'push':
      return { ...state, stack: [...state.stack, action.screen], sheet: null }
    case 'pop':
      return { ...state, stack: state.stack.slice(0, -1), sheet: null }
    case 'sheet':
      return { ...state, sheet: action.sheet }
    case 'toast':
      return { ...state, toast: action.toast }

    /* ---- the day ---- */
    case 'add-entry': {
      const entry = { ...action.entry, id: nextId(), time: clockAt(state.logged) }
      return {
        ...state,
        entries: [...state.entries, entry],
        logged: state.logged + 1,
        sheet: null,
        stack: [],
        tab: 'today',
        toast: { title: action.toastTitle, entryId: entry.id },
      }
    }
    case 'update-entry':
      return {
        ...state,
        entries: state.entries.map((e) => (e.id === action.id ? { ...e, ...action.patch } : e)),
        sheet: null,
        toast: { title: action.toastTitle ?? 'Entry updated' },
      }
    case 'remove-entry':
      return {
        ...state,
        entries: state.entries.filter((e) => e.id !== action.id),
        sheet: null,
        toast: action.silent ? null : { title: `${action.name} removed` },
      }

    /* ---- screens ---- */
    case 'log':
      return { ...state, log: { ...state.log, ...action.patch } }
    case 'recipes':
      return { ...state, recipes: { ...state.recipes, ...action.patch } }
    case 'recipe-filters':
      return {
        ...state,
        recipes: { ...state.recipes, filters: { ...state.recipes.filters, ...action.patch } },
        sheet: null,
      }
    case 'save-recipe':
      return {
        ...state,
        savedRecipes: state.savedRecipes.includes(action.id)
          ? state.savedRecipes.filter((r) => r !== action.id)
          : [...state.savedRecipes, action.id],
      }

    /* ---- scan ---- */
    case 'scan':
      return { ...state, scan: { ...state.scan, ...action.patch } }

    /* ---- dish builder ---- */
    case 'draft':
      return { ...state, draft: action.draft, sheet: action.keepSheet ? state.sheet : null }
    case 'draft-patch':
      return { ...state, draft: { ...state.draft, ...action.patch } }
    case 'save-dish': {
      const dish = { ...action.dish, id: action.dish.id ?? `dish-${state.dishes.length + 1}` }
      const exists = state.dishes.some((d) => d.id === dish.id)
      return {
        ...state,
        dishes: exists ? state.dishes.map((d) => (d.id === dish.id ? dish : d)) : [...state.dishes, dish],
        draft: null,
      }
    }

    /* ---- targets ---- */
    case 'targets': {
      const targets = { ...state.targets, ...action.patch }
      // A dietary preference is a preference, so it carries to the recipe
      // filters rather than sitting on a settings screen doing nothing.
      const recipes =
        action.patch.diets === undefined
          ? state.recipes
          : { ...state.recipes, filters: { ...state.recipes.filters, diets: action.patch.diets } }
      return { ...state, targets, recipes }
    }

    case 'reset':
      return { ...INITIAL, entries: SEED_ENTRIES }

    default:
      return state
  }
}

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL)
  const value = useMemo(() => ({ state, dispatch }), [state])
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>')
  return ctx
}

/* ---------------------------------------------------------------- *
 * Entry builders — the three things that can end up on Today.        *
 * ---------------------------------------------------------------- */

export const buildFoodEntry = (food, amount) => ({
  kind: 'food',
  foodId: food.id,
  amount,
  name: food.brand ? `${food.brand} ${food.name}` : food.name,
  detail: portionLabel(food, amount),
  macros: portionMacros(food, amount),
})

export const buildDishEntry = (dish, servings) => ({
  kind: 'dish',
  dishId: dish.id,
  servings,
  name: dish.name,
  detail: `${servings} serving${servings === 1 ? '' : 's'} · ${dish.items.length} ingredients`,
  macros: dishMacrosFor(dish, servings),
})

export const buildRecipeEntry = (recipe, servings) => ({
  kind: 'recipe',
  recipeId: recipe.id,
  servings,
  name: recipe.name,
  detail: `${servings} serving${servings === 1 ? '' : 's'}`,
  macros: recipeServingMacros(recipe, servings),
})

export { RECIPE_BY_ID }

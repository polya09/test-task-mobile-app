/**
 * /app — the KALORA prototype.
 *
 * Five labelled destinations, two screens that push over them, and four
 * sheets. Nothing here re-styles a component: the screens arrange design
 * system parts and the store feeds them numbers.
 *
 * On a desktop the prototype sits in a device frame at the design system's
 * reference width; below 520 px the frame disappears and the app fills the
 * viewport, which is the width it was designed at in the first place.
 */
import { useEffect, useRef, useState } from 'react'
import { BottomNav } from '../design-system/ui/BottomNav'
import { Toast } from '../design-system/ui/Feedback'
import { Button } from '../design-system/ui/Button'
import { SegmentedControl } from '../design-system/ui/Selection'

import Today from './screens/Today'
import Log from './screens/Log'
import Scan from './screens/Scan'
import Recipes from './screens/Recipes'
import Targets from './screens/Targets'
import DishBuilder from './screens/DishBuilder'
import RecipeDetail from './screens/RecipeDetail'

import PortionSheet from './sheets/PortionSheet'
import ServingsSheet from './sheets/ServingsSheet'
import FiltersSheet from './sheets/FiltersSheet'
import { IngredientPickerSheet, IngredientEditSheet } from './sheets/IngredientSheet'

import { StoreProvider, useStore } from './store'

/** The design system's five destinations. "Profile" is the targets screen. */
const NAV = [
  { id: 'today', label: 'Today', icon: 'flame' },
  { id: 'log', label: 'Log', icon: 'plus' },
  { id: 'scan', label: 'Scan', icon: 'scan' },
  { id: 'recipes', label: 'Recipes', icon: 'recipe' },
  { id: 'profile', label: 'Targets', icon: 'profile' },
]

const TAB_TITLE = {
  today: 'Today',
  log: 'Add food',
  scan: 'Scan a product',
  recipes: 'Recipes',
  profile: 'Targets',
}

const TOAST_MS = 3200

function Screen() {
  const { state } = useStore()
  const top = state.stack[state.stack.length - 1]

  if (top?.screen === 'dish-builder') return <DishBuilder />
  if (top?.screen === 'recipe') return <RecipeDetail id={top.id} />

  switch (state.tab) {
    case 'log':
      return <Log />
    case 'scan':
      return <Scan />
    case 'recipes':
      return <Recipes />
    case 'profile':
      return <Targets />
    default:
      return <Today />
  }
}

function SheetLayer() {
  const { state } = useStore()
  const sheet = state.sheet
  if (!sheet) return null

  // A logged entry is edited in the units it was logged in: a food by weight,
  // a dish or a recipe by servings.
  if (sheet.type === 'entry') {
    const entry = state.entries.find((e) => e.id === sheet.entryId)
    if (!entry) return null
    return entry.kind === 'food' ? <PortionSheet sheet={sheet} /> : <ServingsSheet sheet={sheet} />
  }

  switch (sheet.type) {
    case 'portion':
      return <PortionSheet sheet={sheet} />
    case 'servings':
    case 'dish':
      return <ServingsSheet sheet={sheet} />
    case 'filters':
      return <FiltersSheet />
    case 'ingredient':
      return <IngredientPickerSheet />
    case 'ingredient-edit':
      return <IngredientEditSheet index={sheet.index} />
    default:
      return null
  }
}

function Viewport() {
  const { state, dispatch } = useStore()
  const scrollRef = useRef(null)
  const top = state.stack[state.stack.length - 1]
  const pushed = Boolean(top)
  const title = pushed ? (top.screen === 'recipe' ? 'Recipe' : 'Build a dish') : TAB_TITLE[state.tab]

  /* A pushed screen or a new tab starts at the top, the way a real one does. */
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [state.tab, state.stack.length, top?.id])

  /* Toasts are transient; the entry they refer to is not. */
  useEffect(() => {
    if (!state.toast) return undefined
    const timer = setTimeout(() => dispatch({ type: 'toast', toast: null }), TOAST_MS)
    return () => clearTimeout(timer)
  }, [state.toast, dispatch])

  return (
    <div className={`ap-viewport${state.sheet ? ' is-locked' : ''}`}>
      <p className="visually-hidden" role="status" aria-live="polite">
        {title}
      </p>

      <div className="ap-screen" ref={scrollRef}>
        <Screen />
      </div>

      {state.toast && (
        <div className={`ap-toastlayer${pushed ? ' ap-toastlayer--pushed' : ''}`}>
          <Toast
            tone="success"
            title={state.toast.title}
            action={state.toast.entryId ? 'Undo' : null}
            onAction={
              state.toast.entryId
                ? () =>
                    dispatch({
                      type: 'remove-entry',
                      id: state.toast.entryId,
                      name: 'Entry',
                      silent: true,
                    })
                : undefined
            }
          />
        </div>
      )}

      {!pushed && (
        <BottomNav
          items={NAV}
          active={state.tab}
          onChange={(tab) => dispatch({ type: 'tab', tab })}
        />
      )}

      <SheetLayer />
    </div>
  )
}

function Frame() {
  const { dispatch } = useStore()
  const [width, setWidth] = useState('390 px')

  return (
    <div className="ap-stage">
      <div className="ap-toolbar">
        <div className="ap-toolbar__group">
          <span className="ap-toolbar__label" id="ap-width">
            Width
          </span>
          <SegmentedControl
            options={['390 px', '430 px']}
            value={width}
            label="Device width"
            size="sm"
            onChange={setWidth}
          />
        </div>
        <div className="ap-toolbar__group">
          <Button variant="secondary" size="sm" onClick={() => dispatch({ type: 'reset' })}>
            Reset prototype
          </Button>
        </div>
        <p className="ap-toolbar__note">
          Interactive prototype. The day starts on the design system&rsquo;s reference day — 1,170 kcal
          logged of a 2,000 kcal target. Barcode scanning is simulated and labelled as such.
        </p>
      </div>

      <div className="ap-device" id="ap-device" tabIndex={-1} style={{ '--ap-device-w': width.replace(' ', '') }}>
        <Viewport />
      </div>
    </div>
  )
}

export default function AppPrototype() {
  return (
    <StoreProvider>
      <Frame />
    </StoreProvider>
  )
}

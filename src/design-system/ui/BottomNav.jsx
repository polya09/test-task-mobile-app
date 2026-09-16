/**
 * Bottom navigation — five destinations, every one labelled.
 *
 * The active item is marked three ways so it is never colour alone: a lime
 * pill behind the icon, a 600-weight label, and `aria-current="page"`.
 * Each item is a 56 px tall, ≥64 px wide target, well past the 44 px minimum.
 */
import { useState } from 'react'
import Icon from '../../branding/parts/Icons'

export const NAV_ITEMS = [
  { id: 'today', label: 'Today', icon: 'flame' },
  { id: 'log', label: 'Log', icon: 'plus' },
  { id: 'scan', label: 'Scan', icon: 'scan' },
  { id: 'recipes', label: 'Recipes', icon: 'recipe' },
  { id: 'profile', label: 'Profile', icon: 'profile' },
]

export function BottomNav({ active = 'today', onChange, items = NAV_ITEMS }) {
  const [internal, setInternal] = useState(active)
  const current = onChange ? active : internal
  const set = onChange ?? setInternal

  return (
    <nav className="ds-bottomnav" aria-label="Primary">
      {items.map((item) => {
        const isActive = current === item.id
        return (
          <button
            key={item.id}
            type="button"
            className="ds-bottomnav__item"
            aria-current={isActive ? 'page' : undefined}
            onClick={() => set(item.id)}
          >
            <span className="ds-bottomnav__pill">
              <Icon name={item.icon} size={24} stroke={isActive ? 2.3 : 2} />
            </span>
            <span className="ds-bottomnav__label">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

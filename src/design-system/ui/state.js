/**
 * Documented interaction states.
 *
 * A screenshot cannot hover. Every component therefore accepts `state`, which
 * adds an `.is-hover` / `.is-pressed` / `.is-focus` class that the CSS handles
 * in the same rule as the real pseudo-class. Nothing in the component library
 * styles a state twice.
 */
export const STATES = ['default', 'hover', 'pressed', 'focus', 'disabled', 'loading']

export function stateClass(state) {
  switch (state) {
    case 'hover':
      return 'is-hover'
    case 'pressed':
      return 'is-pressed'
    case 'focus':
      return 'is-focus'
    default:
      return null
  }
}

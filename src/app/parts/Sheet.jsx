/**
 * The overlay wrapper around the design system's bottom sheet.
 *
 * The sheet component itself is unchanged — this adds only the behaviour a
 * live modal needs and a documentation board does not: focus moves into the
 * sheet when it opens, Tab is trapped inside it, Escape closes it, and focus
 * returns to whatever opened it.
 */
import { useEffect, useRef } from 'react'
import { BottomSheet } from '../../design-system/ui/Feedback'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function Sheet({ onClose, children, ...rest }) {
  const sheetRef = useRef(null)
  const returnTo = useRef(null)

  useEffect(() => {
    returnTo.current = document.activeElement
    const node = sheetRef.current
    if (!node) return undefined

    // Land on the sheet itself rather than its first control, so a screen
    // reader announces the dialog's name before its contents.
    node.focus({ preventScroll: true })

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose?.()
        return
      }
      if (event.key !== 'Tab') return

      const items = [...node.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null)
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]

      if (event.shiftKey && (document.activeElement === first || document.activeElement === node)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    node.addEventListener('keydown', onKeyDown)
    return () => {
      node.removeEventListener('keydown', onKeyDown)
      returnTo.current?.focus?.({ preventScroll: true })
    }
  }, [onClose])

  return (
    <div className="ap-sheetlayer">
      <BottomSheet mode="overlay" onClose={onClose} sheetRef={sheetRef} {...rest}>
        {children}
      </BottomSheet>
    </div>
  )
}

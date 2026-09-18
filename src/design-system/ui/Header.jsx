/**
 * Screen header — one back affordance, one title, at most one trailing action.
 *
 * The markup and the `.ds-header` rules were already specified in the
 * Navigation section of the design system; this component is the same header
 * made reusable, so that screens do not each hand-roll it. Nothing about the
 * documented header changes: same 56 px height, same centred Heading 3 title,
 * same two 44 px targets.
 *
 * When there is no leading or trailing action, a 44 px spacer keeps the title
 * optically centred rather than letting it slide under the remaining button.
 */
import { IconButton } from './Button'

export function ScreenHeader({ title, onBack, backLabel = 'Back', action, id }) {
  return (
    <header className="ds-header">
      {onBack ? (
        <IconButton icon="back" label={backLabel} variant="tertiary" onClick={onBack} />
      ) : (
        <span className="ds-header__spacer" aria-hidden="true" />
      )}
      <h1 className="ds-header__title" id={id}>
        {title}
      </h1>
      {action ?? <span className="ds-header__spacer" aria-hidden="true" />}
    </header>
  )
}

export default ScreenHeader

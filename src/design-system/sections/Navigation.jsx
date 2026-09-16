/**
 * Navigation — the bottom bar and the in-row navigation affordances.
 */
import { Section, Block, Specimen, Spec, Callout, PhoneFrame, TokenRef } from '../docs/Primitives'
import { BottomNav, NAV_ITEMS } from '../ui/BottomNav'
import { SegmentedControl } from '../ui/Selection'
import { IconButton } from '../ui/Button'
import { ratio, INK, SURFACE } from '../data'

export default function Navigation() {
  return (
    <Section
      id="navigation"
      index="07"
      title="Navigation"
      lead="Five destinations, each with a written label. Icon-only navigation is not allowed anywhere in the product: a scan glyph and a recipe glyph are only obvious to the person who drew them."
    >
      <Block
        title="Bottom navigation"
        rule="The active destination is marked three ways — a lime pill, a heavier label, and aria-current — so it survives greyscale and colour-blind viewing."
      >
        <Specimen label="Bottom navigation — “Today” active" surface="paper" width={430}>
          <BottomNav active="today" />
        </Specimen>
        <div className="ds-row-specimens">
          <Specimen label="“Recipes” active" surface="paper" width={430}>
            <BottomNav active="recipes" />
          </Specimen>
        </div>
        <Spec
          rows={[
            ['Bar height', '64 px + safe-area inset'],
            ['Item', `${NAV_ITEMS.length} items, each ≥ 64 px wide × 56 px tall — past the 44 px minimum`],
            ['Icon', '24 px — --ds-icon-m; stroke thickens to 2.3 px when active'],
            ['Active pill', '44 × 28 px, radius pill, --ds-action fill, graphite glyph'],
            ['Label', 'Caption — Inter 12/16; weight 600 active, 500 inactive'],
            ['Inactive ink', `--ds-text-muted · ${ratio(INK.muted, SURFACE.surface)} on surface`],
            ['Surface', '--ds-surface with a 1 px --ds-border-subtle top edge'],
            ['Gap', '4 px icon → label — --ds-space-1'],
          ]}
        />
      </Block>

      <Block title="In-screen navigation" rule="A screen header carries one back affordance and at most one action.">
        <div className="ds-row-specimens">
          <Specimen label="Screen header" surface="surface" width={390}>
            <header className="ds-header">
              <IconButton icon="back" label="Back" variant="tertiary" />
              <h4 className="ds-header__title">Add food</h4>
              <IconButton icon="search" label="Search foods" variant="tertiary" />
            </header>
          </Specimen>
          <Specimen label="View switch inside a screen" surface="surface" width={390}>
            <SegmentedControl options={['Foods', 'Recipes', 'Saved']} label="Result type" />
          </Specimen>
        </div>
        <Spec
          rows={[
            ['Header height', '56 px, 8 px side padding so the 44 px targets sit flush to a 16 px margin'],
            ['Title', 'Heading 3 — Sora 600 22/28, centred, truncates with an ellipsis'],
            ['Actions', 'One leading, one trailing, both 44 × 44 px and labelled'],
          ]}
        />
      </Block>

      <Block title="At the reference width" rule="The bar is documented at 390 px, on the surface it actually sits on.">
        <PhoneFrame label="390 px reference — content ends 96 px above the bar" height={220}>
          <div className="ds-navdemo">
            <p className="ds-navdemo__copy">
              Screens reserve 96 px of bottom padding so the last card never hides behind the bar.
            </p>
            <BottomNav active="log" />
          </div>
        </PhoneFrame>
        <Callout tone="dont" title="Never">
          <p>
            Never drop the labels to fit a sixth destination, never let the active state rest on colour
            alone, and never float the bar over content without the reserved bottom padding.
          </p>
        </Callout>
      </Block>
    </Section>
  )
}

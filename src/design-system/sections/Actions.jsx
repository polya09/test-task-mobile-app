/**
 * Buttons and icon buttons, every variant in every documented state.
 */
import { Section, Block, Specimen, StateGrid, Spec, Callout, TokenRef } from '../docs/Primitives'
import { Button, IconButton, Spinner } from '../ui/Button'
import { ratio, INK, SURFACE } from '../data'

const STATES = [
  { key: 'default', label: 'Default' },
  { key: 'hover', label: 'Hover' },
  { key: 'pressed', label: 'Pressed' },
  { key: 'focus', label: 'Focused', note: '2 px deep lime ring, 2 px offset' },
  { key: 'disabled', label: 'Disabled', note: 'Not announced as an error' },
  { key: 'loading', label: 'Loading', note: 'aria-busy, label stays' },
]

function pass(s) {
  return {
    state: s.key,
    disabled: s.key === 'disabled',
    loading: s.key === 'loading',
  }
}

export default function Actions() {
  return (
    <Section
      id="buttons"
      index="04"
      title="Buttons"
      lead="Four kinds, one shape language. Primary is the only lime element on a screen; if two primaries appear together, one of them is wrong."
    >
      <Block
        title="Primary"
        rule="Lime fill, graphite ink. One per screen or sheet, for the single action the screen exists to perform."
      >
        <StateGrid states={STATES} columns={6}>
          {(s) => (
            <Button icon="plus" {...pass(s)}>
              Add food
            </Button>
          )}
        </StateGrid>
        <Spec
          rows={[
            ['Height', '44 px (md) — --ds-control-h-md · meets the touch minimum without padding'],
            ['Padding', '0 20 px, or 0 16 px when an icon leads'],
            ['Gap', '8 px icon → label — --ds-space-2'],
            ['Radius', '16 px — --ds-radius-m'],
            ['Type', 'Label — Inter 600 13/16, 0.02em'],
            ['Fill', '--ds-action → hover --ds-action-hover → pressed --ds-action-pressed'],
            ['Ink', `--ds-text-on-accent (graphite) · ${ratio(INK.graphite, SURFACE.lime)}`],
            ['Focus', '2 px --ds-focus ring at a 2 px offset — the border is unchanged, so there is no second ring'],
            ['Disabled', '--ds-surface-sunken fill, --ds-text-disabled ink, no shadow'],
          ]}
        />
      </Block>

      <Block
        title="Secondary"
        rule="Graphite outline on surface. The default choice for anything that is not the screen's one action."
      >
        <StateGrid states={STATES} columns={6}>
          {(s) => (
            <Button variant="secondary" {...pass(s)}>
              Edit target
            </Button>
          )}
        </StateGrid>
        <Spec
          rows={[
            ['Height', '44 px — --ds-control-h-md'],
            ['Border', '1 px --ds-border-strong → 2 px when hovered or pressed'],
            ['Fill', 'transparent → --ds-surface-sunken on hover → #e6e3db pressed'],
            ['Ink', `--ds-text-primary · ${ratio(INK.graphite, SURFACE.surface)}`],
            ['Radius', '16 px — --ds-radius-m'],
          ]}
        />
      </Block>

      <Block
        title="Tertiary / text"
        rule="No border, no fill at rest. Used inside cards, alerts and list rows where a boxed button would out-shout the content."
      >
        <StateGrid states={STATES} columns={6}>
          {(s) => (
            <Button variant="tertiary" {...pass(s)}>
              View details
            </Button>
          )}
        </StateGrid>
        <Spec
          rows={[
            ['Height', '44 px — hit area, though the ink box is smaller'],
            ['Padding', '0 12 px — --ds-space-3'],
            ['Hover', '--ds-action-quiet fill (lime tint), ink unchanged'],
            ['Ink', '--ds-text-primary; --ds-focus only when the action is destructive-adjacent'],
            ['Underline', 'None. The lime tint carries the affordance.'],
          ]}
        />
      </Block>

      <Block
        title="Icon button"
        rule="Always labelled for assistive technology, never for the eye alone in navigation. Reserved for repeated, self-evident actions inside a row or card."
      >
        <StateGrid states={STATES} columns={6}>
          {(s) => <IconButton icon="bookmark" label="Save recipe" {...pass(s)} />}
        </StateGrid>
        <Spec
          rows={[
            ['Size', '44 × 44 px — the touch minimum, exactly'],
            ['Icon', '24 px — --ds-icon-m, 2 px stroke'],
            ['Radius', '16 px — --ds-radius-m; pill when it sits on a photo'],
            ['Label', 'aria-label + title, always present'],
            ['Variants', 'Shares primary / secondary / tertiary fills'],
          ]}
        />
      </Block>

      <Block
        title="Sizes and width"
        rule="Three sizes. Small keeps a 44 px hit area by padding beyond its 36 px ink box; large is reserved for sheet footers."
      >
        <div className="ds-row-specimens">
          <Specimen label="Small — 36 px ink, 44 px target" surface="surface">
            <Button size="sm" icon="plus">
              Add
            </Button>
          </Specimen>
          <Specimen label="Medium — 44 px, the default" surface="surface">
            <Button icon="plus">Add food</Button>
          </Specimen>
          <Specimen label="Large — 52 px, sheet actions" surface="surface">
            <Button size="lg" icon="plus">
              Add to today
            </Button>
          </Specimen>
          <Specimen label="Full width — sheet and empty-state footers" surface="surface" width={320}>
            <Button fullWidth>Log breakfast</Button>
          </Specimen>
        </div>
      </Block>

      <Block
        title="Destructive"
        rule="Secondary geometry, danger ink, never a fill. A destructive action is never the lime primary — in a confirmation the safe choice keeps the primary."
      >
        <StateGrid states={STATES} columns={6}>
          {(s) => (
            <Button variant="danger" {...pass(s)}>
              Remove entry
            </Button>
          )}
        </StateGrid>
        <Spec
          rows={[
            ['Height', '44 px — --ds-control-h-md'],
            ['Border', '1 px --ds-danger-border → 2 px --ds-danger when hovered or pressed'],
            ['Ink', '--ds-danger-ink · 6.52:1 on surface'],
            ['Fill', 'transparent → --ds-danger-surface on hover'],
            ['Pairing', 'Always beside a lime primary that does the safe thing'],
          ]}
        />
      </Block>

      <Block title="Loading" rule="The label stays. A button that loses its label loses its width, and the layout jumps.">
        <div className="ds-row-specimens">
          <Specimen label="Primary, loading" surface="surface">
            <Button loading>Saving</Button>
          </Specimen>
          <Specimen label="Secondary, loading" surface="surface">
            <Button variant="secondary" loading>
              Syncing
            </Button>
          </Specimen>
          <Specimen label="Spinner, standalone" surface="surface">
            <Spinner size={24} label="Loading" />
          </Specimen>
        </div>
        <Callout tone="dont" title="Never">
          <p>
            Never replace the label with a spinner, never disable a button without saying why, and never
            use lime on anything but the primary action — a lime secondary reads as two primaries.
          </p>
        </Callout>
      </Block>
    </Section>
  )
}

/**
 * Alerts, toasts, the bottom sheet, and the five screen-level states.
 */
import { Section, Block, Specimen, Spec, Callout, PhoneFrame, TokenRef } from '../docs/Primitives'
import { Alert, Toast, BottomSheet, LoadingList, Skeleton, StatePanel } from '../ui/Feedback'
import { NumberField } from '../ui/Inputs'
import { SegmentedControl } from '../ui/Selection'
import { MacroBar } from '../ui/Progress'
import { FoodCard } from '../ui/Cards'
import { MACROS, FOOD, nf, CONSUMED_KCAL, REMAINING_KCAL, ratio, SURFACE } from '../data'

export default function Feedback() {
  return (
    <>
      <Section
        id="feedback"
        index="11"
        title="Messages and overlays"
        lead="Every message names its status in words and carries a distinct glyph, so nothing in the system depends on a viewer distinguishing lime from amber from coral."
      >
        <Block title="Alerts" rule="Inline, in the flow of the screen. They stay until the condition clears.">
          <div className="ds-stack">
            <Specimen label="Success" surface="surface" width={520}>
              <Alert tone="success" title="Breakfast logged">
                <span className="tnum">352 kcal added. {nf.format(REMAINING_KCAL)} kcal left today.</span>
              </Alert>
            </Specimen>
            <Specimen label="Warning" surface="surface" width={520}>
              <Alert tone="warning" title="Carbohydrates over target" action="Adjust dinner">
                <span className="tnum">228 g of a 205 g target. 23 g over.</span>
              </Alert>
            </Specimen>
            <Specimen label="Error" surface="surface" width={520}>
              <Alert tone="danger" title="Could not save this entry" action="Try again">
                Your connection dropped mid-save. Nothing was logged.
              </Alert>
            </Specimen>
            <Specimen label="Information" surface="surface" width={520}>
              <Alert tone="info" title="Targets update on Monday">
                Your goal changed to muscle gain, so next week&rsquo;s targets rise.
              </Alert>
            </Specimen>
          </div>
          <Spec
            rows={[
              ['Padding', '12 px 16 px — --ds-space-3 / --ds-space-4'],
              ['Radius', '12 px — --ds-radius-s'],
              ['Border', '1 px in the tone’s border token, uniform on all four sides'],
              ['Glyph', '20 px status icon in the tone’s ink, top-aligned with the title — with the title, it is what names the status'],
              ['Title', 'Body M — Inter 600 15/24, preceded by a screen-reader-only tone word'],
              ['Body', 'Body S — Inter 400 13/20'],
              ['Gap', '12 px glyph → body — --ds-space-3'],
              ['Role', 'role="alert" for errors, role="status" for everything else'],
            ]}
          />
        </Block>

        <Block title="Toasts" rule="Transient, one line, one action. They never carry the only copy of an important message.">
          <div className="ds-stack">
            <Specimen label="Confirmation with undo" surface="paper" width={440}>
              <Toast title="Greek Yogurt added" />
            </Specimen>
            <Specimen label="Warning" surface="paper" width={440}>
              <Toast tone="warning" title="Offline — saved locally" action="Retry" />
            </Specimen>
            <Specimen label="Error" surface="paper" width={440}>
              <Toast tone="danger" title="Could not sync" action="Retry" />
            </Specimen>
          </div>
          <Spec
            rows={[
              ['Surface', `--ds-surface-inverse, ink --ds-text-inverse · ${ratio(SURFACE.paper, SURFACE.graphite)}`],
              ['Height', '52 px, radius --ds-radius-m'],
              ['Shadow', '--ds-shadow-lg'],
              ['Position', 'Centred, 16 px above the bottom navigation'],
              ['Action', 'Lime text, 44 px tall hit area, right-aligned'],
              ['Duration', '4 s; 8 s when it carries an action'],
            ]}
          />
        </Block>

        <Block
          title="Bottom sheet"
          rule="The product's only modal. It keeps the screen behind it visible through a 48% graphite scrim, so the user never loses their place."
        >
          <div className="ds-row-specimens">
            <Specimen label="Add food sheet" surface="paper" width={420}>
              <BottomSheet title="Add Greek Yogurt" height={560}>
                <div className="ds-sheetbody">
                  <NumberField label="Serving" value={150} unit="g" step={10} />
                  <SegmentedControl options={['Breakfast', 'Lunch', 'Dinner']} label="Meal" />
                  <div className="ds-barstack">
                    {MACROS.map((m) => (
                      <MacroBar key={m.key} {...m} />
                    ))}
                  </div>
                </div>
              </BottomSheet>
            </Specimen>
            <Specimen label="Confirm sheet" surface="paper" width={420}>
              <BottomSheet title="Remove this entry?" primary="Remove" secondary="Keep" height={340} destructive>
                <p className="ds-sheettext">
                  Chicken Bowl, 523 kcal, will be removed from today. This cannot be undone.
                </p>
              </BottomSheet>
            </Specimen>
          </div>
          <Spec
            rows={[
              ['Radius', '24 px top corners — --ds-radius-l'],
              ['Padding', '16 px sides, 20 px bottom, 8 px above the grabber'],
              ['Grabber', '36 × 4 px, --ds-border-subtle, radius pill'],
              ['Scrim', 'rgba(28, 31, 35, 0.48) over the screen behind'],
              ['Shadow', '--ds-shadow-sheet, cast upward'],
              ['Footer', 'Two full-width buttons, 12 px gap, secondary first'],
              ['Destructive', 'The safe choice keeps the lime primary; the destructive action is outlined in --ds-danger-ink'],
              ['Max height', '88% of the viewport; the body scrolls, the footer does not'],
            ]}
          />
        </Block>
      </Section>

      <Section
        id="states"
        index="12"
        title="States"
        lead="Five states every list, screen and card has to be able to reach. They are designed here so that a screen never has to improvise one."
      >
        <Block title="Loading" rule="Skeletons match the shape of the content they replace, so nothing reflows when the data lands.">
          <div className="ds-row-specimens">
            <Specimen label="Skeleton list" surface="surface" width={400}>
              <LoadingList rows={3} />
            </Specimen>
            <Specimen label="Skeleton card" surface="surface" width={340}>
              <div className="ds-skeletoncard">
                <Skeleton w={140} h={22} />
                <Skeleton w="100%" h={8} radius="var(--ds-radius-xs)" />
                <Skeleton w="82%" h={8} radius="var(--ds-radius-xs)" />
                <Skeleton w="64%" h={8} radius="var(--ds-radius-xs)" />
              </div>
            </Specimen>
          </div>
          <Spec
            rows={[
              ['Fill', '--ds-surface-sunken, animated to #e8e5dd and back over 1.4 s'],
              ['Motion', 'Opacity only. Respects prefers-reduced-motion by holding still.'],
              ['Announcement', 'role="status" with a written "Loading foods…" for screen readers'],
            ]}
          />
        </Block>

        <Block title="Empty, success, warning and error" rule="Each one says what happened, what it means, and what to do next — in that order.">
          <div className="ds-cardgrid">
            <Specimen label="Empty" surface="surface" width={320}>
              <StatePanel
                icon="search"
                title="No foods match “quinoah”"
                text="Check the spelling, or add it as a custom food."
                action="Add custom food"
              />
            </Specimen>
            <Specimen label="Success" surface="surface" width={320}>
              <StatePanel
                tone="success"
                title="Day complete"
                text={`${nf.format(CONSUMED_KCAL)} kcal logged across 5 entries. Protein target met.`}
                action="View summary"
              />
            </Specimen>
            <Specimen label="Warning" surface="surface" width={320}>
              <StatePanel
                tone="warning"
                title="Two days unlogged"
                text="Weekly averages will be low until you fill in Tuesday and Wednesday."
                action="Fill in"
              />
            </Specimen>
            <Specimen label="Error" surface="surface" width={320}>
              <StatePanel
                tone="danger"
                title="Could not load foods"
                text="The food database did not respond. Your logged entries are safe."
                action="Try again"
              />
            </Specimen>
          </div>
          <Spec
            rows={[
              ['Art', '40 px glyph in a 72 px tinted circle — the tone’s surface token'],
              ['Title', 'Heading 3 — Sora 600 22/28, centred'],
              ['Text', 'Body M — Inter 400 15/24, --ds-text-secondary, max 34 characters per line'],
              ['Action', 'One button. Errors take secondary so the retry is not mistaken for a primary flow.'],
              ['Padding', '32 px — --ds-space-6'],
            ]}
          />
        </Block>

        <Block title="A state in place" rule="The same states, at the 390 px reference width, on the surfaces they actually occupy.">
          <div className="ds-row-specimens">
            <PhoneFrame label="Results — loaded">
              <div className="ds-screenstack">
                <FoodCard item={FOOD} />
                <Toast title="Greek Yogurt added" />
              </div>
            </PhoneFrame>
            <PhoneFrame label="Results — loading">
              <div className="ds-screenstack">
                <LoadingList rows={3} />
              </div>
            </PhoneFrame>
            <PhoneFrame label="Results — empty">
              <div className="ds-screenstack">
                <StatePanel
                  icon="search"
                  title="No results"
                  text="Try a shorter search, like “yogurt”."
                  action="Clear search"
                />
              </div>
            </PhoneFrame>
          </div>
          <Callout tone="do" title="Status never rests on colour">
            <p>
              Every state above carries three signals: a distinct glyph shape, a written status word, and
              a colour. Remove the colour and all four panels still read correctly — which is the test any
              new state has to pass before it enters the system.
            </p>
          </Callout>
        </Block>
      </Section>
    </>
  )
}

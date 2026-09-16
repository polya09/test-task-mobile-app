/**
 * Inputs and selection controls.
 */
import { Section, Block, Specimen, Spec, Callout, TokenRef } from '../docs/Primitives'
import { TextField, SearchField, NumberField, SelectField, TextArea } from '../ui/Inputs'
import { SegmentedControl, Tabs, FilterChip, Tag, Badge } from '../ui/Selection'
import { ratio, INK, SURFACE } from '../data'

const FIELD_STATES = [
  { key: 'default', label: 'Default', props: {} },
  { key: 'focus', label: 'Focused', props: { state: 'focus' } },
  { key: 'filled', label: 'Filled', props: { value: 'Greek Yogurt' } },
  {
    key: 'error',
    label: 'Error',
    props: { value: '', error: 'Enter a food name to continue.' },
  },
  { key: 'disabled', label: 'Disabled', props: { value: 'Greek Yogurt', disabled: true } },
]

export default function Forms() {
  return (
    <>
      <Section
        id="inputs"
        index="05"
        title="Inputs"
        lead="One field shell carries all five input types, so the label, helper text, error message and 44 px minimum height are defined once. Error state is never colour alone: the border thickens, an alert glyph appears and the problem is written out."
      >
        <Block title="Text field — all states" rule="Label above, helper below, 44 px control, 12 px radius.">
          <div className="ds-fieldgrid">
            {FIELD_STATES.map((s) => (
              <Specimen key={s.key} label={s.label} surface="surface">
                <TextField
                  label="Food name"
                  placeholder="e.g. Greek Yogurt"
                  hint={s.key === 'error' ? undefined : 'Search 40,000+ foods'}
                  {...s.props}
                />
              </Specimen>
            ))}
          </div>
          <Spec
            rows={[
              ['Control height', '44 px — --ds-control-h-md'],
              ['Padding', '0 12 px — --ds-space-3; 12 px 12 px for the textarea'],
              ['Radius', '12 px — --ds-radius-s'],
              ['Border', `1 px --ds-border-control (${ratio(INK.borderControl, SURFACE.surface)}) → 2 px --ds-border-strong on focus`],
              ['Focus ring', '3 px --ds-focus, 2 px offset — the same ring as every other control'],
              ['Label', 'Label — Inter 600 13/16, --ds-text-secondary, 8 px above the control'],
              ['Helper', 'Body S — Inter 400 13/20, --ds-text-muted, 6 px below'],
              ['Error', `2 px --ds-danger border, 16 px glyph + message in --ds-danger-ink (${ratio(INK.danger, SURFACE.dangerSurface)})`],
              ['Disabled', '--ds-surface-sunken fill, --ds-text-disabled ink, border --ds-border-subtle'],
            ]}
          />
        </Block>

        <Block title="Search" rule="Leading 20 px glyph, trailing clear button once there is something to clear.">
          <div className="ds-fieldgrid">
            <Specimen label="Default" surface="surface">
              <SearchField hint="Press Enter to search" />
            </Specimen>
            <Specimen label="Focused" surface="surface">
              <SearchField state="focus" hint="Press Enter to search" />
            </Specimen>
            <Specimen label="Filled, clearable" surface="surface">
              <SearchField value="chicken" hint="12 results" />
            </Specimen>
            <Specimen label="Disabled" surface="surface">
              <SearchField disabled hint="Offline — search unavailable" />
            </Specimen>
          </div>
          <Spec
            rows={[
              ['Lead icon', '20 px — --ds-icon-s, 12 px from the left edge'],
              ['Text inset', '40 px left, 44 px right when the clear button is shown'],
              ['Clear button', '44 × 44 px target, 20 px close glyph from the Stage 3 system set'],
            ]}
          />
        </Block>

        <Block
          title="Numeric input"
          rule="Stepper buttons flank a tabular value. Used for grams, servings and calorie targets — anything a thumb adjusts more often than it types."
        >
          <div className="ds-fieldgrid">
            <Specimen label="Default" surface="surface">
              <NumberField label="Serving" value={150} unit="g" step={10} hint="Steps of 10 g" />
            </Specimen>
            <Specimen label="Focused" surface="surface">
              <NumberField label="Serving" value={150} unit="g" step={10} state="focus" />
            </Specimen>
            <Specimen label="Error" surface="surface">
              <NumberField label="Serving" value={0} unit="g" step={10} error="Serving must be above 0 g." />
            </Specimen>
            <Specimen label="Disabled" surface="surface">
              <NumberField label="Daily target" value={2000} unit="kcal" step={25} disabled hint="Set by your goal" />
            </Specimen>
          </div>
          <Spec
            rows={[
              ['Overall height', '48 px — the one control taller than --ds-control-h-md'],
              ['Stepper button', '44 × 44 px each; the extra 4 px of shell is what the border costs'],
              ['Value', 'Number M — Sora 600 20/24, tabular'],
              ['Unit', '13 px Inter 500, --ds-text-muted, 4 px after the value'],
              ['Step', '10 g for servings, 25 kcal for targets, 1 for counts'],
            ]}
          />
        </Block>

        <Block title="Select and textarea" rule="Native controls, brand shell. No custom dropdown that a keyboard cannot reach.">
          <div className="ds-fieldgrid">
            <Specimen label="Select — default" surface="surface">
              <SelectField
                label="Goal"
                value="Muscle gain"
                options={['Cut', 'Maintain', 'Muscle gain']}
                hint="Sets your calorie and macro targets"
              />
            </Specimen>
            <Specimen label="Select — focused" surface="surface">
              <SelectField label="Goal" value="Cut" options={['Cut', 'Maintain', 'Muscle gain']} state="focus" />
            </Specimen>
            <Specimen label="Textarea — filled" surface="surface">
              <TextArea
                label="Note"
                value="Post-training meal. Felt light on carbs."
                hint="Optional, 200 characters"
              />
            </Specimen>
            <Specimen label="Textarea — error" surface="surface">
              <TextArea label="Note" value="" placeholder="Add a note" error="Note cannot be longer than 200 characters." />
            </Specimen>
          </div>
        </Block>

        <Callout tone="do" title="Field rules">
          <ul>
            <li>Label every field visibly. A placeholder is not a label.</li>
            <li>Helper text is set before the field is touched; the error replaces it, never stacks under it.</li>
            <li>Error text says what to do, not that something is invalid.</li>
            <li>
              Disabled fields keep their label at full contrast so the form is still readable — only the
              control dims.
            </li>
          </ul>
        </Callout>
      </Section>

      <Section
        id="selection"
        index="06"
        title="Selection"
        lead="Segmented controls switch a view. Tabs switch a dataset. Chips filter one. Tags and badges describe — they are never interactive."
      >
        <Block
          title="Segmented control"
          rule="Two to four options. The selected segment goes graphite, the one place inverse surface earns its keep at control scale."
        >
          <div className="ds-row-specimens">
            <Specimen label="Three options — default" surface="paper">
              <SegmentedControl options={['Day', 'Week', 'Month']} label="Range" />
            </Specimen>
            <Specimen label="Two options" surface="paper">
              <SegmentedControl options={['Foods', 'Recipes']} label="Result type" />
            </Specimen>
            <Specimen label="Small" surface="paper">
              <SegmentedControl options={['g', 'oz']} size="sm" label="Unit" />
            </Specimen>
          </div>
          <Spec
            rows={[
              ['Height', '44 px — --ds-control-h-md (36 px in small, inside a 44 px row)'],
              ['Track', '--ds-surface-sunken, 4 px inner padding, radius --ds-radius-m'],
              ['Selected', '--ds-surface-inverse fill, --ds-text-inverse ink, weight 600, radius 12 px'],
              ['Unselected', '--ds-text-secondary, weight 500'],
              ['Type', 'Label — Inter 13/16'],
              ['Min segment width', '72 px, so a two-letter option still clears the touch target'],
            ]}
          />
        </Block>

        <Block title="Tabs" rule="Underline indicator plus a weight change. Counts are tabular and sit inside the tab.">
          <Specimen label="Tabs with counts" surface="surface" width={520}>
            <Tabs
              items={[
                { id: 'all', label: 'All', count: 24 },
                { id: 'meals', label: 'Meals', count: 9 },
                { id: 'snacks', label: 'Snacks', count: 6 },
                { id: 'saved', label: 'Saved', count: 9 },
              ]}
            />
          </Specimen>
          <Spec
            rows={[
              ['Height', '48 px, with a 2 px indicator seated on the bottom edge'],
              ['Indicator', '2 px --ds-action, full tab width, radius 2 px'],
              ['Selected', '--ds-text-primary, weight 600'],
              ['Unselected', `--ds-text-muted, weight 500 (${ratio(INK.muted, SURFACE.surface)})`],
              ['Count', '--ds-surface-sunken pill, 11 px tabular, 6 px after the label'],
              ['Gap', '24 px between tabs — --ds-space-5'],
            ]}
          />
        </Block>

        <Block title="Filter chips" rule="Multi-select. Selected chips invert and gain a check glyph, so selection is shape and colour.">
          <Specimen label="Chip row — two selected" surface="paper" width={640}>
            <div className="ds-chiprow">
              <FilterChip selected>High protein</FilterChip>
              <FilterChip selected>Under 30 min</FilterChip>
              <FilterChip>Vegetarian</FilterChip>
              <FilterChip icon="timer">Quick</FilterChip>
              <FilterChip disabled>Gluten free</FilterChip>
            </div>
          </Specimen>
          <div className="ds-row-specimens">
            <Specimen label="Default" surface="paper">
              <FilterChip>Vegetarian</FilterChip>
            </Specimen>
            <Specimen label="Hover" surface="paper">
              <FilterChip state="hover">Vegetarian</FilterChip>
            </Specimen>
            <Specimen label="Selected" surface="paper">
              <FilterChip selected>Vegetarian</FilterChip>
            </Specimen>
            <Specimen label="Focused" surface="paper">
              <FilterChip state="focus">Vegetarian</FilterChip>
            </Specimen>
            <Specimen label="Disabled" surface="paper">
              <FilterChip disabled>Vegetarian</FilterChip>
            </Specimen>
          </div>
          <Spec
            rows={[
              ['Height', '36 px ink box inside a 44 px row — the row provides the touch target'],
              ['Padding', '0 14 px, 0 10 px when a glyph leads'],
              ['Radius', 'pill — --ds-radius-pill'],
              ['Rest', '--ds-surface fill, 1 px --ds-border-control'],
              ['Selected', '--ds-surface-inverse fill, --ds-text-inverse ink, 16 px check glyph'],
              ['Gap', '8 px between chips — --ds-space-2'],
            ]}
          />
        </Block>

        <Block title="Tags and badges" rule="Read-only. A tag describes content; a badge counts or flags it.">
          <div className="ds-row-specimens">
            <Specimen label="Macro tags — nutrition colours only" surface="surface">
              <div className="ds-chiprow">
                <Tag tone="macro" dot="var(--ds-protein)">
                  <span className="tnum">P 15 g</span>
                </Tag>
                <Tag tone="macro" dot="var(--ds-carbs)">
                  <span className="tnum">C 8 g</span>
                </Tag>
                <Tag tone="macro" dot="var(--ds-fat)">
                  <span className="tnum">F 3 g</span>
                </Tag>
              </div>
            </Specimen>
            <Specimen label="Descriptive tags" surface="surface">
              <div className="ds-chiprow">
                <Tag>Breakfast</Tag>
                <Tag>Verified</Tag>
                <Tag>Per 100 g</Tag>
              </div>
            </Specimen>
            <Specimen label="Badges — count and status" surface="surface">
              <div className="ds-chiprow">
                <Badge tone="neutral">
                  <span className="tnum">9</span>
                </Badge>
                <Badge tone="brand">Muscle gain</Badge>
                <Badge tone="success" icon>
                  Logged
                </Badge>
                <Badge tone="warning" icon>
                  Over
                </Badge>
                <Badge tone="danger" icon>
                  Failed
                </Badge>
              </div>
            </Specimen>
          </div>
          <Spec
            rows={[
              ['Tag height', '28 px, radius pill, 0 10 px padding'],
              ['Tag dot', '8 px circle, 6 px before the label — macro colours only'],
              ['Badge height', '22 px, radius --ds-radius-xs, 0 8 px padding'],
              ['Badge type', 'Caption — Inter 600 12/16'],
              ['Status badges', 'Always carry their 14 px glyph; the word is the status, not the fill'],
            ]}
          />
        </Block>
      </Section>
    </>
  )
}

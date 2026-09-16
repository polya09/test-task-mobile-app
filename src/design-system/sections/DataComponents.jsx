/**
 * Cards, progress components and list data — where the identity meets numbers.
 * Every figure on this page comes from src/design-system/data.js, so the
 * totals in a card and the totals in a ring can never disagree.
 */
import { Section, Block, Specimen, Spec, Callout, TokenRef, Table } from '../docs/Primitives'
import { FoodCard, RecipeCard, NutritionCard, DayCard, EmptyCard } from '../ui/Cards'
import { CalorieRing, MacroBar, GoalIndicator } from '../ui/Progress'
import { ListRow, ListGroup, Divider, Tooltip } from '../ui/DataDisplay'
import { IconButton } from '../ui/Button'
import { Badge } from '../ui/Selection'
import {
  LOGGED,
  MACROS,
  TARGET,
  CONSUMED,
  CONSUMED_KCAL,
  REMAINING_KCAL,
  FOOD,
  RECIPE,
  kcal,
  nf,
  ratio,
  INK,
  SURFACE,
} from '../data'
import { PHOTOS } from '../../branding/photos'

const OVER = [
  { key: 'p', name: 'Protein', short: 'P', value: 96, target: 150, colour: 'var(--ds-protein)', track: 'var(--ds-protein-track)' },
  { key: 'c', name: 'Carbs', short: 'C', value: 228, target: 205, colour: 'var(--ds-carbs)', track: 'var(--ds-carbs-track)' },
  { key: 'f', name: 'Fat', short: 'F', value: 62, target: 62, colour: 'var(--ds-fat)', track: 'var(--ds-fat-track)' },
]

export default function DataComponents() {
  return (
    <>
      <Section
        id="progress"
        index="08"
        title="Progress"
        lead="Three shapes for three questions. The Precision Ring answers “how much of today is gone?”. Macro bars answer “where did it go?”. The goal indicator answers “am I where I should be?”. All three state the number in text as well as in the shape."
      >
        <Block
          title="Precision Ring"
          rule="The brand mark, working. Clockwise from twelve o'clock, rounded cap, never more than a full turn — an over-target day is reported in words, not by a second lap."
        >
          <div className="ds-row-specimens">
            <Specimen label="Default — 180 px" note={`${nf.format(CONSUMED_KCAL)} of ${nf.format(TARGET.kcal)} kcal`} surface="surface">
              <CalorieRing value={CONSUMED_KCAL} target={TARGET.kcal} size={180} stroke={14} />
            </Specimen>
            <Specimen label="Compact — 120 px" surface="surface">
              <CalorieRing value={CONSUMED_KCAL} target={TARGET.kcal} size={120} stroke={11} />
            </Specimen>
            <Specimen label="Inline — 72 px, no caption" surface="surface">
              <CalorieRing value={523} target={2000} size={72} stroke={8} caption="Chicken Bowl" />
            </Specimen>
            <Specimen label="On graphite" surface="graphite">
              <CalorieRing value={CONSUMED_KCAL} target={TARGET.kcal} size={140} stroke={12} tone="dark" />
            </Specimen>
          </div>
          <Spec
            rows={[
              ['Geometry', '100-unit viewBox, stroke centreline at r = 41 — identical to the wordmark O'],
              ['Sizes', '72 / 120 / 148 / 180 px'],
              ['Stroke', '8 / 11 / 13 / 14 px — roughly 0.078 × diameter'],
              ['Track', '--ds-surface-sunken on light, rgba(paper, 0.24) on graphite'],
              ['Segment', '--ds-action, round cap, clockwise from 12 o’clock'],
              ['Value', 'Sora 700 tabular, centred — 0.215 × diameter, so it scales with the ring'],
              ['Unit', 'Inter 500, 0.075 × diameter, --ds-text-muted, 2 px under the value'],
              ['Caption', 'Body S — states the target and the percentage in words'],
            ]}
          />
        </Block>

        <Block
          title="Macro progress bars"
          rule="One bar per macronutrient, always in the order protein → carbohydrate → fat, always labelled with its value and target."
        >
          <div className="ds-row-specimens">
            <Specimen label="Under target — today" surface="surface" width={380}>
              <div className="ds-barstack">
                {MACROS.map((m) => (
                  <MacroBar key={m.key} {...m} />
                ))}
              </div>
            </Specimen>
            <Specimen label="One macro over target" note="Carbohydrate 228 / 205 g" surface="surface" width={380}>
              <div className="ds-barstack">
                {OVER.map((m) => (
                  <MacroBar key={m.key} {...m} />
                ))}
              </div>
            </Specimen>
          </div>
          <Spec
            rows={[
              ['Track', '8 px tall, radius --ds-radius-xs, tinted with the macro’s own track token'],
              ['Fill', 'Macro colour, radius --ds-radius-xs, clamped at 100%'],
              ['Key', '20 × 20 px rounded square, macro fill, graphite letter P / C / F'],
              ['Label', 'Body S — Inter 500 13/20, --ds-text-secondary'],
              ['Value', 'Body S tabular, “value / target unit”, --ds-text-primary'],
              ['Over target', 'Fill clamps; a warning glyph and “23 g over” are appended in text'],
              ['Gap', '12 px between bars — --ds-space-3; 6 px label → track'],
              ['ARIA', 'role="progressbar" with value, min, max and a written label'],
            ]}
          />
        </Block>

        <Block
          title="Goal indicator"
          rule="A target notch on a track. The status is written out and carries a glyph; the colour only reinforces it."
        >
          <div className="ds-row-specimens">
            <Specimen label="Under target" surface="surface" width={360}>
              <GoalIndicator label="Calories today" value={CONSUMED_KCAL} target={TARGET.kcal} unit="kcal" />
            </Specimen>
            <Specimen label="On target" surface="surface" width={360}>
              <GoalIndicator label="Calories today" value={1960} target={TARGET.kcal} unit="kcal" />
            </Specimen>
            <Specimen label="Over target" surface="surface" width={360}>
              <GoalIndicator label="Calories today" value={2310} target={TARGET.kcal} unit="kcal" />
            </Specimen>
            <Specimen label="Weekly protein" surface="surface" width={360}>
              <GoalIndicator label="Protein this week" value={892} target={1050} unit="g" />
            </Specimen>
          </div>
          <Spec
            rows={[
              ['Track', '10 px tall, --ds-surface-sunken, radius --ds-radius-xs'],
              ['Marker', '2 × 18 px graphite notch at the target position'],
              ['Tolerance', '±5% of target counts as “On target”'],
              ['Status', 'Glyph + words: “On target”, “310 kcal over”, “830 kcal to go”'],
              ['Colours', 'success / warning / info inks — never the macro palette'],
            ]}
          />
        </Block>
      </Section>

      <Section
        id="cards"
        index="09"
        title="Cards"
        lead="Five cards cover the product. All of them share one shell — 24 px radius, 16 px padding, 1 px subtle border, white surface, small shadow — so a new card type is a content decision, never a geometry decision."
      >
        <Block title="Food item" rule="Name, serving, energy, macro tags, one action. Nothing else fits, and nothing else is needed.">
          <div className="ds-cardgrid">
            <Specimen label="Default" surface="paper" width={380}>
              <FoodCard item={FOOD} />
            </Specimen>
            <Specimen label="Added — confirmation stays in the card" surface="paper" width={380}>
              <FoodCard item={FOOD} selected />
            </Specimen>
            <Specimen label="Larger entry" note={`${nf.format(kcal(LOGGED[3].macros))} kcal`} surface="paper" width={380}>
              <FoodCard item={LOGGED[3]} action="save" />
            </Specimen>
          </div>
          <Spec
            rows={[
              ['Padding', '16 px — --ds-space-4'],
              ['Radius', '24 px — --ds-radius-l (brand --k-radius-m)'],
              ['Border', '1 px --ds-border-subtle'],
              ['Shadow', '--ds-shadow-sm'],
              ['Name', 'Heading 3 — Sora 600 22/28'],
              ['Serving', 'Body S tabular, --ds-text-muted'],
              ['Energy', 'Number L — Sora 700 28/32 tabular, unit at 13 px'],
              ['Row gap', '12 px head → tags — --ds-space-3'],
              ['Action', '36 px small button, 44 px hit area'],
            ]}
          />
        </Block>

        <Block title="Recipe" rule="Thumbnail, title, three facts, protein figure, goal badge. The photograph is cropped in frame — never cut out and floated.">
          <div className="ds-cardgrid">
            <Specimen label="With photography" surface="paper" width={420}>
              <RecipeCard recipe={RECIPE} thumb={PHOTOS.recipeThumb} />
            </Specimen>
            <Specimen label="Without an image" surface="paper" width={420}>
              <RecipeCard recipe={{ ...RECIPE, name: 'Salmon & Greens', macros: { p: 38, c: 22, f: 24 }, minutes: 25 }} />
            </Specimen>
          </div>
          <Spec
            rows={[
              ['Thumb', '72 × 72 px, radius --ds-radius-s, object-fit cover'],
              ['Placeholder', '--ds-surface-sunken fill, 32 px glyph, same box'],
              ['Meta', 'Body S tabular with 16 px glyphs, 12 px gaps'],
              ['Footer', 'Divided by a 1 px --ds-border-subtle rule, 12 px above'],
              ['Protein', 'Number L; the goal badge sits opposite it'],
            ]}
          />
        </Block>

        <Block
          title="Nutrition summary and daily progress"
          rule="The day card is one of the three places graphite is used as a surface — it is the screen's anchor and earns the contrast."
        >
          <div className="ds-cardgrid">
            <Specimen label="Nutrition summary — light" surface="paper" width={420}>
              <NutritionCard />
            </Specimen>
            <Specimen label="Daily calorie progress — graphite" surface="paper" width={420}>
              <DayCard />
            </Specimen>
            <Specimen label="Daily calorie progress — light variant" surface="paper" width={420}>
              <DayCard tone="light" />
            </Specimen>
          </div>
          <Spec
            rows={[
              ['Day card padding', '20 px — between --ds-space-4 and --ds-space-5, the one card that needs the room'],
              ['Ring', '148 px, 13 px stroke'],
              ['Layout', 'Ring left, macro stack right, 20 px gap; stacks below 360 px'],
              ['Graphite variant', `--ds-surface-inverse, --ds-text-inverse ink at ${ratio(SURFACE.paper, SURFACE.graphite)}`],
              ['Figures', `${nf.format(CONSUMED_KCAL)} logged, ${nf.format(REMAINING_KCAL)} remaining, target ${nf.format(TARGET.kcal)}`],
            ]}
          />
          <Table head={['Item', 'Serving', 'P (g)', 'C (g)', 'F (g)', 'kcal']} dense>
            {LOGGED.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td className="tnum">{item.serving}</td>
                <td className="tnum">{item.macros.p}</td>
                <td className="tnum">{item.macros.c}</td>
                <td className="tnum">{item.macros.f}</td>
                <td className="tnum">{nf.format(kcal(item.macros))}</td>
              </tr>
            ))}
            <tr className="ds-table__total">
              <td>Total</td>
              <td>—</td>
              <td className="tnum">{CONSUMED.p}</td>
              <td className="tnum">{CONSUMED.c}</td>
              <td className="tnum">{CONSUMED.f}</td>
              <td className="tnum">{nf.format(CONSUMED_KCAL)}</td>
            </tr>
          </Table>
          <Callout tone="note" title="The numbers behind every specimen">
            <p className="tnum">
              4 kcal/g protein, 4 kcal/g carbohydrate, 9 kcal/g fat. {CONSUMED.p} P + {CONSUMED.c} C +{' '}
              {CONSUMED.f} F = {nf.format(CONSUMED.p * 4)} + {nf.format(CONSUMED.c * 4)} +{' '}
              {nf.format(CONSUMED.f * 9)} = {nf.format(CONSUMED_KCAL)} kcal, leaving{' '}
              {nf.format(REMAINING_KCAL)} kcal of the {nf.format(TARGET.kcal)} kcal target. The targets
              themselves total {nf.format(TARGET.p * 4 + TARGET.c * 4 + TARGET.f * 9)} kcal, rounded to{' '}
              {nf.format(TARGET.kcal)} — which is how the app states a goal.
            </p>
          </Callout>
        </Block>

        <Block title="Empty state card" rule="A shape, a sentence that says what will happen, and the action that makes it happen.">
          <div className="ds-cardgrid">
            <Specimen label="No foods logged" surface="paper" width={380}>
              <EmptyCard />
            </Specimen>
            <Specimen label="No saved recipes" surface="paper" width={380}>
              <EmptyCard
                icon="bookmark"
                title="Nothing saved yet"
                text="Save a recipe and it will wait for you here."
                action="Browse recipes"
              />
            </Specimen>
          </div>
        </Block>
      </Section>

      <Section
        id="lists"
        index="10"
        title="Lists, dividers and tooltips"
        lead="The list row is the densest component in the product, so it is also where the touch-target rule is tested: the row is 64 px tall and any control inside it keeps its own 44 px box."
      >
        <Block title="List rows" rule="Leading marker, title and meta, trailing figure. One tap target per row unless a trailing control is explicitly needed.">
          <Specimen label="Today's log" surface="surface" width={440}>
            <ListGroup label="Logged today">
              {LOGGED.map((item) => (
                <ListRow
                  key={item.id}
                  title={item.name}
                  meta={`${item.serving} · ${item.time}`}
                  value={kcal(item.macros)}
                  unit="kcal"
                  leading="flame"
                />
              ))}
            </ListGroup>
          </Specimen>
          <div className="ds-row-specimens">
            <Specimen label="Selectable row" surface="surface" width={400}>
              <ListGroup>
                <ListRow title="Greek Yogurt" meta="150 g" value={119} unit="kcal" onClick={() => {}} selected />
                <ListRow title="Rolled Oats" meta="60 g" value={233} unit="kcal" onClick={() => {}} />
              </ListGroup>
            </Specimen>
            <Specimen label="Row with a trailing control" surface="surface" width={400}>
              <ListGroup>
                <ListRow
                  title="Chicken Bowl"
                  meta="1 bowl · 13:15"
                  value={523}
                  unit="kcal"
                  leading="recipe"
                  trailing={<IconButton icon="bookmark" label="Save Chicken Bowl" variant="tertiary" />}
                />
              </ListGroup>
            </Specimen>
          </div>
          <Spec
            rows={[
              ['Height', '64 px minimum — comfortably past the 44 px touch target'],
              ['Padding', '12 px 16 px — --ds-space-3 / --ds-space-4'],
              ['Leading', '40 × 40 px tile, radius --ds-radius-s, --ds-surface-sunken, 20 px glyph'],
              ['Title', 'Body M — Inter 500 15/24'],
              ['Meta', 'Body S tabular, --ds-text-muted'],
              ['Value', 'Number M — Sora 600 20/24 tabular; unit 12 px muted'],
              ['Divider', '1 px --ds-border-subtle, inset 68 px to clear the leading tile'],
              ['Selected', '--ds-action-quiet fill, 2 px graphite left edge'],
            ]}
          />
        </Block>

        <Block title="Dividers" rule="One weight, one colour. A labelled divider replaces a heading only inside a scrolling list.">
          <div className="ds-row-specimens">
            <Specimen label="Full-bleed" surface="surface" width={320}>
              <div className="ds-dividerdemo">
                <span>Breakfast</span>
                <Divider />
                <span>Lunch</span>
              </div>
            </Specimen>
            <Specimen label="Inset — clears a 40 px leading tile" surface="surface" width={320}>
              <div className="ds-dividerdemo">
                <span>Greek Yogurt</span>
                <Divider inset />
                <span>Rolled Oats</span>
              </div>
            </Specimen>
            <Specimen label="Labelled" surface="surface" width={320}>
              <div className="ds-dividerdemo">
                <span>Chicken Bowl</span>
                <Divider label="16:40" />
                <span>Almonds</span>
              </div>
            </Specimen>
          </div>
        </Block>

        <Block title="Tooltips" rule="Graphite bubble, paper ink. Opens on focus and long-press, never on hover alone — hover does not exist on a phone.">
          <div className="ds-row-specimens">
            <Specimen label="Above" surface="paper">
              <div className="ds-tooltipdemo">
                <Tooltip text="Based on 4/4/9 kcal per gram" placement="top">
                  <Badge tone="neutral">
                    <span className="tnum">1,170 kcal</span>
                  </Badge>
                </Tooltip>
              </div>
            </Specimen>
            <Specimen label="Below" surface="paper">
              <div className="ds-tooltipdemo ds-tooltipdemo--tall">
                <Tooltip text="Target set by your goal" placement="bottom">
                  <Badge tone="brand">Muscle gain</Badge>
                </Tooltip>
              </div>
            </Specimen>
          </div>
          <Spec
            rows={[
              ['Surface', `--ds-surface-inverse, ink --ds-text-inverse · ${ratio(SURFACE.paper, SURFACE.graphite)}`],
              ['Padding', '8 px 12 px — --ds-space-2 / --ds-space-3'],
              ['Radius', '12 px — --ds-radius-s'],
              ['Type', 'Body S — Inter 400 13/20'],
              ['Max width', '240 px, then it wraps'],
              ['Offset', '8 px from the trigger, with a 6 px arrow'],
            ]}
          />
        </Block>
      </Section>
    </>
  )
}

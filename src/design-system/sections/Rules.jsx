/**
 * The closing section — the rules that are easier to state than to draw,
 * and the accessibility record for the page itself.
 */
import { Section, Block, Callout, Table, TokenRef, Specimen } from '../docs/Primitives'
import { Button } from '../ui/Button'
import { Tag, Badge } from '../ui/Selection'
import { MacroBar } from '../ui/Progress'
import { MACROS, MACRO_COLOURS, ratio, INK, SURFACE } from '../data'

const TARGETS = [
  ['Primary / secondary button (md)', '44 × 44', 'Height is the target'],
  ['Small button', '36 ink box', '44 × 44 — 4 px padding each side'],
  ['Icon button', '44 × 44', 'Exactly the minimum'],
  ['Filter chip', '36 ink box', '44 tall row, 8 px above and below'],
  ['Bottom nav item', '≥ 64 × 56', 'Well past the minimum'],
  ['List row', '≥ 64 tall', 'Full-width tap area'],
  ['Stepper button', '44 × 44', 'Both ends of the numeric field'],
  ['Tab', '48 tall', '24 px gaps keep neighbours apart'],
]

export default function Rules() {
  return (
    <Section
      id="rules"
      index="13"
      title="Rules"
      lead="The parts of the system that are easier to write down than to draw. A component that breaks one of these is not a variant — it is a mistake."
    >
      <Block title="Touch targets" rule="44 × 44 px is the floor, measured on the hit area, not the ink.">
        <Table head={['Component', 'Ink box (px)', 'Hit area']}>
          {TARGETS.map(([a, b, c]) => (
            <tr key={a}>
              <td>{a}</td>
              <td className="tnum">{b}</td>
              <td className="tnum">{c}</td>
            </tr>
          ))}
        </Table>
      </Block>

      <Block title="Colour use" rule="Three fences, and the system holds.">
        <div className="ds-do-dont">
          <Callout tone="do" title="Do">
            <ul>
              <li>Use lime for the one primary action, the active nav item and the brand mark.</li>
              <li>Use the macro trio only on nutrition data — bars, dots, legends, keys.</li>
              <li>
                Set graphite ink on lime, amber and blue. <TokenRef>--ds-text-on-accent</TokenRef> exists
                so nobody has to remember this.
              </li>
              <li>Pick text colours by role, not by hex.</li>
            </ul>
          </Callout>
          <Callout tone="dont" title="Don't">
            <ul>
              <li>Don&rsquo;t colour a warning with carbohydrate amber, or an info state with fat blue.</li>
              <li>Don&rsquo;t put white text on lime, amber or blue — it fails at every size.</li>
              <li>Don&rsquo;t use coral <TokenRef>--k-coral</TokenRef> for error text; it reads at {ratio(INK.coral, SURFACE.surface)} on white. Use <TokenRef>--ds-danger-ink</TokenRef>.</li>
              <li>Don&rsquo;t add a second lime element to a screen that already has a primary button.</li>
            </ul>
          </Callout>
        </div>

        <div className="ds-row-specimens">
          <Specimen label="Correct — status by glyph and word" surface="surface">
            <div className="ds-chiprow">
              <Badge tone="success" icon>
                Logged
              </Badge>
              <Badge tone="warning" icon>
                Over target
              </Badge>
              <Badge tone="danger" icon>
                Not saved
              </Badge>
            </div>
          </Specimen>
          <Specimen label="Correct — macro colours on data only" surface="surface" width={320}>
            <div className="ds-barstack">
              <MacroBar {...MACROS[1]} />
            </div>
          </Specimen>
          <Specimen label="Correct — one primary per group" surface="surface">
            <div className="ds-chiprow">
              <Button variant="secondary">Cancel</Button>
              <Button>Add to today</Button>
            </div>
          </Specimen>
        </div>
      </Block>

      <Block title="Copy" rule="Concise, factual, encouraging. Food is never called good, bad, clean, cheat or guilty.">
        <div className="ds-do-dont">
          <Callout tone="do" title="Write">
            <ul>
              <li className="tnum">&ldquo;830 kcal remaining.&rdquo;</li>
              <li className="tnum">&ldquo;23 g over your carbohydrate target.&rdquo;</li>
              <li>&ldquo;Add your first meal to see today&rsquo;s numbers.&rdquo;</li>
              <li>&ldquo;Check the spelling, or add it as a custom food.&rdquo;</li>
            </ul>
          </Callout>
          <Callout tone="dont" title="Not">
            <ul>
              <li>&ldquo;You blew your carbs today!&rdquo;</li>
              <li>&ldquo;Clean eating streak broken.&rdquo;</li>
              <li>&ldquo;Invalid input.&rdquo;</li>
              <li>&ldquo;Oops! Something went wrong.&rdquo;</li>
            </ul>
          </Callout>
        </div>
      </Block>

      <Block title="What this system does not do" rule="The stylescape rules out four things. The components inherit the ban.">
        <Callout tone="dont" title="Excluded by design">
          <ul>
            <li>
              <strong>Decorative gradients</strong> — every fill is flat. Depth comes from graphite
              shadows and one border weight.
            </li>
            <li>
              <strong>Glassmorphism</strong> — no blurred panels, no translucent cards over photography.
            </li>
            <li>
              <strong>Floating food cut-outs</strong> — a photograph is cropped in its frame, or it sits
              on a lit surface with a contact shadow. It never hovers.
            </li>
            <li>
              <strong>Unlabelled icon-only navigation</strong> — every destination carries a word.
            </li>
          </ul>
        </Callout>
      </Block>

      <Block title="Accessibility record" rule="Measured, not asserted.">
        <Table head={['Check', 'Result']}>
          <tr>
            <td>Body text on its real surface</td>
            <td className="tnum">
              Lowest pair {ratio(INK.muted, SURFACE.paper)} — muted on warm paper. AA pass.
            </td>
          </tr>
          <tr>
            <td>Ink on lime / amber / blue</td>
            <td className="tnum">
              {MACRO_COLOURS.map((m) => m.ratio).join(' / ')} — graphite only.
            </td>
          </tr>
          <tr>
            <td>Interactive boundaries</td>
            <td className="tnum">
              --ds-border-control at {ratio(INK.borderControl, SURFACE.surface)} — AA non-text pass.
            </td>
          </tr>
          <tr>
            <td>Focus ring</td>
            <td>
              2 px --ds-focus at {ratio(INK.deepLime, SURFACE.surface)}, 2 px offset, on every
              interactive element. One ring, never doubled with a border change.
            </td>
          </tr>
          <tr>
            <td>Status signalling</td>
            <td>Colour + distinct glyph + written word on every state.</td>
          </tr>
          <tr>
            <td>Touch targets</td>
            <td className="tnum">44 × 44 px minimum, verified per component above.</td>
          </tr>
          <tr>
            <td>Disabled controls</td>
            <td className="tnum">
              Exempt from 1.4.3, but --ds-text-disabled is still held at{' '}
              {ratio(INK.disabled, SURFACE.sunken)} on sunken so the label stays readable.
            </td>
          </tr>
          <tr>
            <td>Motion</td>
            <td>Opacity and transform only; held still under prefers-reduced-motion.</td>
          </tr>
        </Table>
      </Block>
    </Section>
  )
}

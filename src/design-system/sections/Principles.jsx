/**
 * The opening of the board — what the system is for, and the rules that hold
 * it together. Deliberately short: five principles, not a manifesto.
 */
import Wordmark from '../../branding/parts/Wordmark'
import { nf, TARGET, CONSUMED_KCAL } from '../data'

const PRINCIPLES = [
  {
    n: '01',
    title: 'Light first, graphite where it counts',
    text: 'Warm paper and white carry the product. Graphite is an ink, and a surface only three times: the day card, the tooltip and a selected segment. Contrast is a decision, not a default.',
  },
  {
    n: '02',
    title: 'Lime means act',
    text: 'Electric lime marks the brand, the one primary action on a screen, and the active destination. It never marks a status, a warning or a quantity of food.',
  },
  {
    n: '03',
    title: 'Macro colours are data, not decoration',
    text: 'Protein lime, carbohydrate amber and fat blue appear on nutrition data and nowhere else — never on a button, a badge, an alert or a divider.',
  },
  {
    n: '04',
    title: 'Numbers are the interface',
    text: 'Sora sets every figure that changes, in tabular form so a total never shifts width as it counts. The unit is always smaller and quieter than the value.',
  },
  {
    n: '05',
    title: 'Status is never colour alone',
    text: 'Every state pairs a colour with a distinct glyph and a written word. Every touch target clears 44 × 44 px. Every text pair clears WCAG AA against the surface it actually sits on.',
  },
]

const FACTS = [
  { k: 'Grid', v: '8 px' },
  { k: 'Touch minimum', v: '44 × 44 px' },
  { k: 'Contrast floor', v: 'WCAG AA' },
  { k: 'Type families', v: 'Sora + Inter' },
  { k: 'Reference width', v: '390 px' },
]

export default function Principles() {
  return (
    <section className="ds-hero" id="principles" aria-labelledby="principles-title">
      <div className="ds-hero__brand">
        <Wordmark width={300} />
        <p className="ds-hero__eyebrow">Stage 3 · Design system</p>
      </div>

      <div className="ds-hero__lead">
        <h1 className="ds-hero__title" id="principles-title">
          One system, built from the stylescape.
        </h1>
        <p className="ds-hero__text">
          This is the component library behind KALORA — the tokens, the controls and the states that the
          product screens are assembled from. Nothing here is a finished screen. Every colour, typeface and
          radius comes from the brand stylescape unchanged; this page only gives them roles, states and
          measurements.
        </p>
        <p className="ds-hero__text ds-hero__text--muted tnum">
          Every figure on this page belongs to one reference day: a 78 kg adult cutting on a{' '}
          {nf.format(TARGET.kcal)} kcal target, {nf.format(CONSUMED_KCAL)} kcal logged across five entries.
          The calories are computed from the macros, never typed in, so no two components can disagree.
        </p>
      </div>

      <ol className="ds-principles">
        {PRINCIPLES.map((p) => (
          <li className="ds-principle" key={p.n}>
            <span className="ds-principle__n tnum">{p.n}</span>
            <h2 className="ds-principle__title">{p.title}</h2>
            <p className="ds-principle__text">{p.text}</p>
          </li>
        ))}
      </ol>

      <dl className="ds-facts">
        {FACTS.map((f) => (
          <div className="ds-facts__item" key={f.k}>
            <dt>{f.k}</dt>
            <dd className="tnum">{f.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

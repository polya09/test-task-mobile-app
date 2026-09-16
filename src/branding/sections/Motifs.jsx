import PaceArc from '../parts/PaceArcs'
import { ConstructionStep, RingDerivation } from '../parts/RingConstruction'
import Icon, { ICON_NAMES } from '../parts/Icons'

const STEPS = [
  { step: 1, title: 'Grid', text: 'Outer 50, inner 32, square frame.' },
  { step: 2, title: 'Track', text: 'The full track stays in neutral.' },
  { step: 3, title: 'Segment', text: 'A 72% lime arc, clockwise from 12.' },
]

const ARCS = [
  { variant: 'nested', label: 'Nested progress' },
  { variant: 'speed', label: 'Speed lines' },
  { variant: 'sweep', label: 'Forward sweep' },
  { variant: 'comet', label: 'Lead arc' },
]

export function RingConstructionSection() {
  return (
    <div>
      <h2 className="sc-label">The Precision Ring</h2>

      <div className="rc-steps" style={{ marginTop: 30 }}>
        {STEPS.map((s) => (
          <figure className="rc-step" key={s.step} style={{ width: 140 }}>
            <ConstructionStep step={s.step} size={140} />
            <figcaption>
              <b>
                {s.step}. {s.title}
              </b>
              {s.text}
            </figcaption>
          </figure>
        ))}
      </div>

      <div style={{ marginTop: 36 }}>
        <RingDerivation size={300} />
        <p className="sc-caption" style={{ marginTop: 18 }}>
          One ring, four jobs: the letter O, the app icon, the calorie meter and the graphic language.
        </p>
      </div>
    </div>
  )
}

export function PaceArcsSection() {
  return (
    <div>
      <h2 className="sc-label">Pace Arcs</h2>
      <p className="sc-caption" style={{ marginTop: 14 }}>
        Cut from the ring. Used to mark motion — never as filler.
      </p>

      <div className="arc-grid" style={{ marginTop: 26 }}>
        {ARCS.map((a) => (
          <figure className="arc-tile" key={a.variant}>
            <PaceArc variant={a.variant} size={150} />
            <figcaption>{a.label}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

export function IconsSection() {
  return (
    <div>
      <h2 className="sc-label">Iconography</h2>
      <p className="sc-caption" style={{ marginTop: 14 }}>
        24 px grid · 2 px stroke · rounded caps and corners.
      </p>

      <div className="icon-grid" style={{ marginTop: 30 }}>
        {ICON_NAMES.map((name) => (
          <figure className="icon-cell" key={name}>
            <Icon name={name} size={72} stroke={2} title={`${name} icon`} />
            <figcaption>{name}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

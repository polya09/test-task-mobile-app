import Wordmark from '../parts/Wordmark'

const QUALITIES = ['Energetic', 'Precise', 'Focused', 'Modern', 'Motivating', 'Reliable', 'Approachable']

export default function Intro() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <p className="sc-eyebrow">Brand stylescape · Stage 02</p>

      <div style={{ marginTop: 40 }}>
        <Wordmark width={860} />
      </div>
      <p className="sc-caption" style={{ marginTop: 18 }}>
        Primary wordmark — graphite on warm paper. The O is the Precision Ring.
      </p>

      <h1 className="intro__tagline" style={{ marginTop: 52 }}>
        Fuel your goal.
      </h1>
      <p className="intro__support">Track smarter. Eat stronger.</p>

      <p className="sc-body" style={{ marginTop: 34, maxWidth: 780 }}>
        KALORA is a calorie and macronutrient calculator for adults aged 20–40 who train. Log a single
        product or a whole dish, read the numbers in seconds, then find recipes that fit the goal, the
        restrictions and the time actually left tonight.
      </p>

      <ul className="chips" style={{ marginTop: 44 }}>
        {QUALITIES.map((q, i) => (
          <li key={q} className={i === 0 ? 'chip chip--solid' : 'chip'}>
            {q}
          </li>
        ))}
      </ul>
    </div>
  )
}

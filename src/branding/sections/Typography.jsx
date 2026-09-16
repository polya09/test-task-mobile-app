const LABELS = ['Daily target', 'Remaining', 'Per 100 g', 'Cook time']

const MACROS = [
  { name: 'Protein', value: '150', dot: 'var(--k-protein)' },
  { name: 'Carbs', value: '205', dot: 'var(--k-carbs)' },
  { name: 'Fat', value: '62', dot: 'var(--k-fat)' },
]

export default function Typography() {
  return (
    <div>
      <h2 className="sc-label">Typography</h2>

      <p className="ty-specimen" style={{ marginTop: 22 }}>
        <span>
          <b>Sora</b> — headlines, hero numbers
        </span>
        <span>
          <b>Inter</b> — body, labels, controls
        </span>
      </p>

      <p className="ty-hero" style={{ marginTop: 26 }}>
        <span className="ty-hero__number tnum">2,000</span>
        <span className="ty-hero__unit">kcal</span>
        <span className="ty-hero__meta">
          Sora 700
          <br />
          tabular figures
        </span>
      </p>

      <h3 className="ty-headline" style={{ marginTop: 30 }}>
        Track smarter. Eat stronger.
      </h3>

      <p className="sc-body" style={{ marginTop: 26, maxWidth: 740 }}>
        Inter for labels, controls and supporting copy. Sora for the wordmark, headlines and every number
        that matters. Units stay small; changing values stay tabular.
      </p>

      <ul className="ty-labels" style={{ marginTop: 30 }}>
        {LABELS.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>

      <div className="ty-macros" style={{ marginTop: 32 }}>
        {MACROS.map((m) => (
          <div key={m.name}>
            <p className="ty-macro__name" style={{ '--dot': m.dot }}>
              {m.name}
            </p>
            <p className="ty-macro__value tnum">
              {m.value} <span>g</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Three interface fragments — deliberately not screens. They exist to prove the
 * identity survives contact with real data: ring, macro colours, tabular
 * numerals, graphite ink on lime.
 *
 * Values are internally consistent:
 *   1,240 kcal eaten of a 2,000 kcal target -> 760 kcal remaining.
 *   96 P + 118 C + 42 F = 1,234 kcal (rounded to 1,240 in the UI).
 *   Greek yogurt 15 P + 8 C + 3 F = 119 kcal (shown as 120).
 *   Chicken bowl 42 P + 55 C + 15 F = 523 kcal (shown as 520).
 */
import PrecisionRing from './PrecisionRing'
import Icon from './Icons'

const MACROS = [
  { name: 'Protein', value: 96, target: 150, colour: 'var(--k-protein)' },
  { name: 'Carbs', value: 118, target: 205, colour: 'var(--k-carbs)' },
  { name: 'Fat', value: 42, target: 62, colour: 'var(--k-fat)' },
]

export function CalorieProgressCard() {
  return (
    <article className="ui-card">
      <div className="ui-card__top">
        <span>Today</span>
        <span className="tnum">Target 2,000 kcal</span>
      </div>

      <div className="ui-progress">
        <PrecisionRing size={132} progress={0.62} track="var(--k-border)" />
        <div>
          <p className="ui-progress__number tnum">
            1,240 <span>kcal</span>
          </p>
          <p className="ui-progress__remaining tnum">760 kcal remaining</p>
        </div>
      </div>

      <div className="ui-macros">
        {MACROS.map((m) => (
          <div className="ui-macro" key={m.name}>
            <span className="ui-macro__name">{m.name}</span>
            <span className="ui-macro__track">
              <span
                className="ui-macro__fill"
                style={{ '--fill': m.colour, width: `${Math.round((m.value / m.target) * 100)}%` }}
              />
            </span>
            <span className="ui-macro__value tnum">
              {m.value} / {m.target} g
            </span>
          </div>
        ))}
      </div>
    </article>
  )
}

export function FoodResultCard() {
  return (
    <article className="ui-card">
      <div className="ui-food">
        <div className="ui-food__body">
          <h4 className="ui-food__name">Greek Yogurt</h4>
          <p className="ui-food__serving tnum">150 g</p>
        </div>
        <p className="ui-food__kcal tnum">
          120<span>kcal</span>
        </p>
      </div>

      <div className="ui-tags">
        <span className="ui-dot tnum" style={{ '--dot': 'var(--k-protein)' }}>
          P 15 g
        </span>
        <span className="ui-dot tnum" style={{ '--dot': 'var(--k-carbs)' }}>
          C 8 g
        </span>
        <span className="ui-dot tnum" style={{ '--dot': 'var(--k-fat)' }}>
          F 3 g
        </span>
        <span className="ui-add">
          <Icon name="plus" size={26} stroke={2.6} />
          Add
        </span>
      </div>
    </article>
  )
}

export function RecipeCard({ thumb }) {
  const cutout = thumb.fit === 'contain'
  return (
    <article className="ui-card">
      <div className="ui-recipe">
        <img
          className={cutout ? 'ui-recipe__thumb ui-recipe__thumb--cutout' : 'ui-recipe__thumb'}
          src={thumb.src}
          alt={thumb.alt}
          style={{ objectPosition: thumb.focus, objectFit: thumb.fit ?? 'cover' }}
        />
        <div>
          <h4 className="ui-recipe__name">High-Protein Chicken Bowl</h4>
          <p className="ui-recipe__meta tnum">
            <span>
              <Icon name="flame" size={26} /> 520 kcal
            </span>
            <span>
              <Icon name="timer" size={26} /> 32 min
            </span>
          </p>
        </div>
      </div>

      <div className="ui-recipe__foot">
        <p className="ui-recipe__protein tnum">
          42 g <span>protein</span>
        </p>
        <span className="ui-goal">Muscle gain</span>
      </div>
    </article>
  )
}

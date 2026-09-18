/**
 * A ring and three macro bars, side by side — the block that answers
 * "what does this portion actually come to?" in the portion and servings
 * sheets, and again at the top of the dish builder.
 *
 * Both halves read the same rounded macros, so the ring and the bars can
 * never state different things.
 */
import { CalorieRing, MacroBar } from '../../design-system/ui/Progress'
import { kcal, macroRows, nf } from '../nutrition'

export default function MacroReadout({ macros, targetKcal, macroTargets, size = 108, caption }) {
  const energy = kcal(macros)
  return (
    <div className="ap-portion">
      <div className="ap-portion__ring">
        <CalorieRing
          value={energy}
          target={targetKcal}
          size={size}
          stroke={10}
          caption={caption ?? `of ${nf.format(targetKcal)} kcal today`}
        />
      </div>
      <div className="ap-portion__bars">
        {macroRows(macros, macroTargets).map((m) => (
          <MacroBar key={m.key} {...m} />
        ))}
      </div>
    </div>
  )
}

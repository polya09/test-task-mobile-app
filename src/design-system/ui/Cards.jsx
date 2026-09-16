/**
 * Cards — the five the product actually needs.
 *
 *   FoodCard      — a single logged or searchable food
 *   RecipeCard    — a recipe result
 *   NutritionCard — the macro summary block
 *   DayCard       — the daily calorie progress card (ring + macros)
 *   EmptyCard     — the empty state a list falls back to
 *
 * All five share `ds-card`: 24 px radius, 16 px padding, 1 px subtle border,
 * white surface, small shadow. Nothing overrides those five values locally.
 */
import Icon from '../../branding/parts/Icons'
import { Button, IconButton } from './Button'
import { Tag, Badge } from './Selection'
import { CalorieRing, MacroBar } from './Progress'
import { StatusIcon } from './StatusIcon'
import { kcal, nf, MACROS, TARGET, CONSUMED_KCAL, REMAINING_KCAL } from '../data'

export function Card({ children, className = '', tone = 'light', as: Tag_ = 'article', ...rest }) {
  return (
    <Tag_
      className={['ds-card', tone === 'dark' && 'ds-card--dark', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </Tag_>
  )
}

export function FoodCard({ item, action = 'add', selected = false }) {
  const energy = kcal(item.macros)
  return (
    <Card className="ds-foodcard">
      <div className="ds-foodcard__row">
        <div className="ds-foodcard__body">
          <h4 className="ds-foodcard__name">{item.name}</h4>
          <p className="ds-foodcard__serving tnum">{item.serving}</p>
        </div>
        <p className="ds-foodcard__kcal tnum">
          {nf.format(energy)} <span>kcal</span>
        </p>
      </div>

      <div className="ds-foodcard__foot">
        <div className="ds-macrodots">
          <Tag tone="macro" dot="var(--ds-protein)">
            <span className="tnum">P {item.macros.p} g</span>
          </Tag>
          <Tag tone="macro" dot="var(--ds-carbs)">
            <span className="tnum">C {item.macros.c} g</span>
          </Tag>
          <Tag tone="macro" dot="var(--ds-fat)">
            <span className="tnum">F {item.macros.f} g</span>
          </Tag>
        </div>
        {action === 'add' ? (
          <Button size="sm" icon="plus">
            Add
          </Button>
        ) : (
          <IconButton icon="bookmark" label={`Save ${item.name}`} variant="tertiary" />
        )}
      </div>
      {selected && (
        <p className="ds-foodcard__flag">
          <StatusIcon tone="success" size={16} stroke={2.4} />
          Added to today
        </p>
      )}
    </Card>
  )
}

export function RecipeCard({ recipe, thumb }) {
  const energy = kcal(recipe.macros)
  return (
    <Card className="ds-recipecard">
      <div className="ds-recipecard__row">
        {thumb ? (
          <img
            className="ds-recipecard__thumb"
            src={thumb.src}
            alt=""
            style={{ objectFit: thumb.fit ?? 'cover', objectPosition: thumb.focus }}
          />
        ) : (
          <span className="ds-recipecard__thumb ds-recipecard__thumb--placeholder" aria-hidden="true">
            <Icon name="recipe" size={32} stroke={2} />
          </span>
        )}
        <div className="ds-recipecard__body">
          <h4 className="ds-recipecard__name">{recipe.name}</h4>
          <p className="ds-recipecard__meta tnum">
            <span>
              <Icon name="flame" size={16} stroke={2} />
              {nf.format(energy)} kcal
            </span>
            <span>
              <Icon name="timer" size={16} stroke={2} />
              {recipe.minutes} min
            </span>
            <span>Serves {recipe.serves}</span>
          </p>
        </div>
        <IconButton icon="bookmark" label={`Save ${recipe.name}`} variant="tertiary" />
      </div>

      <div className="ds-recipecard__foot">
        <p className="ds-recipecard__protein tnum">
          {recipe.macros.p} g <span>protein</span>
        </p>
        <Badge tone="brand">{recipe.goal}</Badge>
      </div>
    </Card>
  )
}

export function NutritionCard({ macros = MACROS, title = 'Macros today' }) {
  return (
    <Card className="ds-nutritioncard">
      <div className="ds-card__head">
        <h4 className="ds-card__title">{title}</h4>
        <span className="ds-card__meta tnum">{nf.format(CONSUMED_KCAL)} kcal logged</span>
      </div>
      <div className="ds-nutritioncard__bars">
        {macros.map((m) => (
          <MacroBar key={m.key} {...m} />
        ))}
      </div>
    </Card>
  )
}

export function DayCard({ tone = 'dark' }) {
  return (
    <Card tone={tone} className="ds-daycard">
      <div className="ds-card__head">
        <h4 className="ds-card__title">Today</h4>
        <span className="ds-card__meta tnum">Target {nf.format(TARGET.kcal)} kcal</span>
      </div>

      <div className="ds-daycard__ring">
        <CalorieRing
          value={CONSUMED_KCAL}
          target={TARGET.kcal}
          size={148}
          stroke={13}
          tone={tone}
          caption={`${nf.format(REMAINING_KCAL)} kcal remaining`}
        />
        <div className="ds-daycard__bars">
          {MACROS.map((m) => (
            <MacroBar key={m.key} {...m} />
          ))}
        </div>
      </div>
    </Card>
  )
}

export function EmptyCard({
  icon = 'recipe',
  title = 'No foods logged yet',
  text = 'Add your first meal to see calories and macros for today.',
  action = 'Log a food',
}) {
  return (
    <Card className="ds-empty">
      <span className="ds-empty__art" aria-hidden="true">
        <Icon name={icon} size={40} stroke={1.8} />
      </span>
      <h4 className="ds-empty__title">{title}</h4>
      <p className="ds-empty__text">{text}</p>
      <Button icon="plus">{action}</Button>
    </Card>
  )
}

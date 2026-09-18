/**
 * Recipe detail — enough to decide, and enough to cook.
 *
 * The verdict at the top is the same recipeFit() the card used, so opening a
 * recipe can never contradict the list it was opened from. Over-budget is
 * reported, not refused: the button still works, because the app states the
 * number and the person makes the decision.
 */
import Icon from '../../branding/parts/Icons'
import { ScreenHeader } from '../../design-system/ui/Header'
import { Button, IconButton } from '../../design-system/ui/Button'
import { Alert } from '../../design-system/ui/Feedback'
import { NutritionCard } from '../../design-system/ui/Cards'
import { GoalIndicator } from '../../design-system/ui/Progress'
import { ListGroup, ListRow } from '../../design-system/ui/DataDisplay'
import { Badge, Tag } from '../../design-system/ui/Selection'
import { RECIPE_BY_ID } from '../data/recipes'
import { daySummary, kcal, macroRows, nf, recipeFit } from '../nutrition'
import { useStore } from '../store'

export default function RecipeDetail({ id }) {
  const { state, dispatch } = useStore()
  const recipe = RECIPE_BY_ID[id]
  if (!recipe) return null

  const day = daySummary(state.entries, state.targets)
  const fit = recipeFit(recipe, day)
  const energy = kcal(recipe.macros)
  const saved = state.savedRecipes.includes(recipe.id)
  const after = day.consumedKcal + energy

  const back = () => dispatch({ type: 'pop' })

  return (
    <>
      {recipe.photo ? (
        <div className={`ap-hero${recipe.photo.surface ? ' ap-hero--surface' : ''}`}>
          <img
            className="ap-hero__img"
            src={recipe.photo.src}
            alt={recipe.photo.alt}
            style={{ objectPosition: recipe.photo.focus }}
          />
          <span className="ap-hero__back">
            <IconButton icon="back" label="Back to recipes" variant="tertiary" onClick={back} />
          </span>
        </div>
      ) : (
        <ScreenHeader
          title="Recipe"
          onBack={back}
          backLabel="Back to recipes"
          action={
            <IconButton
              icon="bookmark"
              label={saved ? 'Remove from saved' : 'Save this recipe'}
              variant="tertiary"
              aria-pressed={saved}
              className={saved ? 'is-saved' : undefined}
              onClick={() => dispatch({ type: 'save-recipe', id: recipe.id })}
            />
          }
        />
      )}

      <div className="ap-page ap-page--pushed">
        <div className="ap-titleblock">
          <h1 className="ap-title">{recipe.name}</h1>
          {recipe.photo && (
            <IconButton
              icon="bookmark"
              label={saved ? 'Remove from saved' : 'Save this recipe'}
              variant="tertiary"
              aria-pressed={saved}
              className={saved ? 'is-saved' : undefined}
              onClick={() => dispatch({ type: 'save-recipe', id: recipe.id })}
            />
          )}
        </div>

        <p className="ap-metarow">
          <span>
            <Icon name="flame" size={16} stroke={2} />
            {nf.format(energy)} kcal a serving
          </span>
          <span>
            <Icon name="timer" size={16} stroke={2} />
            {recipe.minutes} min
          </span>
          <span>Serves {recipe.serves}</span>
        </p>

        <p className="ap-lede">{recipe.summary}</p>

        <div className="ap-chiprow">
          <Badge tone="brand">{recipe.goal}</Badge>
          {recipe.diets.map((d) => (
            <Tag key={d}>{d}</Tag>
          ))}
        </div>

        <Alert
          tone={fit.status === 'fits' ? 'success' : fit.status === 'tight' ? 'info' : 'warning'}
          title={fit.text}
        >
          {fit.status === 'fits'
            ? `One serving is ${nf.format(energy)} kcal, and today has ${nf.format(day.remainingKcal)} kcal left.`
            : fit.status === 'tight'
              ? `One serving still sits inside the ${nf.format(day.remainingKcal)} kcal you have left today.`
              : 'You can still log it — the day is recorded as it happened.'}
        </Alert>

        <NutritionCard
          title="One serving"
          macros={macroRows(recipe.macros, day.macroTargets)}
          meta={`${nf.format(energy)} kcal`}
        />

        <GoalIndicator
          label="Today's total after this meal"
          value={after}
          target={day.targetKcal}
          max={Math.max(day.targetKcal, after) * 1.15}
        />

        <section className="ap-section" aria-labelledby="ap-ingredients">
          <h2 className="ap-section__title" id="ap-ingredients">
            Ingredients
          </h2>
          <ListGroup label={`Makes ${recipe.serves} servings`}>
            {recipe.ingredients.map((i) => (
              <ListRow key={i.name} title={i.name} value={i.amount} />
            ))}
          </ListGroup>
        </section>

        <section className="ap-section" aria-labelledby="ap-method">
          <h2 className="ap-section__title" id="ap-method">
            Method
          </h2>
          <ol className="ap-steps">
            {recipe.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
      </div>

      <div className="ap-commit">
        <div className="ap-commit__figure">
          <p className="ap-commit__value">{nf.format(energy)}</p>
          <p className="ap-commit__label">kcal / serving</p>
        </div>
        <Button
          icon="plus"
          onClick={() => dispatch({ type: 'sheet', sheet: { type: 'servings', recipeId: recipe.id } })}
        >
          Log this meal
        </Button>
      </div>
    </>
  )
}

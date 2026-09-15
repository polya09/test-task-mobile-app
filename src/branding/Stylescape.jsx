/**
 * KALORA stylescape — one composition, designed at 3840 x 2160 (16:9).
 *
 * The board reads left to right: brand introduction and wordmark, hero
 * photography and app icon, colour and type, the Precision Ring and its graphic
 * language, and finally the graphite panel where the identity meets real data.
 * Every child is placed in board pixels; the viewer only scales the whole thing.
 */
import Intro from './sections/Intro'
import Colour from './sections/Colour'
import Typography from './sections/Typography'
import { RingConstructionSection, PaceArcsSection, IconsSection } from './sections/Motifs'
import Wordmark from './parts/Wordmark'
import AppIcon from './parts/AppIcon'
import PaceArc from './parts/PaceArcs'
import { CalorieProgressCard, FoodResultCard, RecipeCard } from './parts/UiFragments'
import { PHOTOS } from './photos'

function Zone({ x, y, w, h, className = '', style, children, tag: Tag = 'div' }) {
  return (
    <Tag className={`zone ${className}`.trim()} style={{ left: x, top: y, width: w, height: h, ...style }}>
      {children}
    </Tag>
  )
}

function Photo({ photo, caption, tag = 'Photo placeholder', captionTop = false, className = '' }) {
  const classes = ['photo', photo.surface && 'photo--surface', className].filter(Boolean)
  return (
    <figure className={classes.join(' ')}>
      <img
        src={photo.src}
        alt={photo.alt}
        style={{ objectPosition: photo.focus, objectFit: photo.fit ?? 'cover' }}
      />
      {photo.placeholder && <span className="photo__tag">{tag}</span>}
      {caption && (
        <figcaption className={captionTop ? 'photo__caption photo__caption--top' : 'photo__caption'}>
          <strong>{caption.title}</strong>
          {caption.text}
        </figcaption>
      )}
    </figure>
  )
}

const ICON_SIZES = [
  { size: 220, label: '1024 px' },
  { size: 120, label: '180 px' },
  { size: 64, label: '60 px' },
]

export default function Stylescape() {
  return (
    <div className="board" id="stylescape">
      {/* ---------- Band A · brand introduction, wordmark, tagline ---------- */}
      <Zone x={140} y={150} w={860} tag="section">
        <Intro />
      </Zone>

      {/* Voice in use — bleeds off the left edge of the board */}
      <Zone x={0} y={1180} w={1000} h={320} tag="section">
        <div className="voiceblock">
          <p className="voiceblock__quote tnum">38 g protein to go.</p>
          <p className="voiceblock__note">Graphite ink on lime. Concise, factual, never a verdict.</p>
          <PaceArc variant="speed" size={210} tone="deep" className="voiceblock__arc" />
        </div>
      </Zone>

      {/* ---------- Photography direction — spans the bottom-left ---------- */}
      <Zone x={140} y={1536} w={1560} tag="header">
        <h2 className="sc-label">Photography direction</h2>
      </Zone>

      <Zone x={140} y={1600} w={860} h={560}>
        <Photo
          photo={PHOTOS.lifestyle}
          caption={{
            title: '45° lifestyle',
            text: 'Diverse people cooking, training or carrying groceries. Unposed, daylight, no gym floor.',
          }}
        />
      </Zone>

      <Zone x={1060} y={1600} w={305} h={260}>
        <Photo photo={PHOTOS.prep} tag="Placeholder" className="photo--round" />
      </Zone>
      <Zone x={1395} y={1600} w={305} h={260}>
        <Photo photo={PHOTOS.dish} tag="Placeholder" className="photo--round" />
      </Zone>

      <Zone x={1060} y={1900} w={640}>
        <ul className="photo-notes">
          <li>Natural daylight</li>
          <li>Stone, linen, light wood</li>
          <li>Top-down for meals</li>
          <li>45° for lifestyle</li>
          <li>Real serving sizes</li>
          <li>Visible ingredients</li>
          <li className="is-avoid">No floating cut-outs</li>
          <li className="is-avoid">No dark gym scenes</li>
        </ul>
      </Zone>

      {/* ---------- Band B · hero photography + app icon ---------- */}
      <Zone x={1060} y={0} w={640} h={1240}>
        <Photo
          photo={PHOTOS.hero}
          captionTop
          caption={{
            title: 'A well-lit training kitchen',
            text: 'Top-down, real portions, warm neutral surfaces. Not a clinic, not a gym floor.',
          }}
        />
      </Zone>

      {/* The app icon overlaps the hero frame — the one deliberate crossing on the left half */}
      <Zone x={1060} y={1130} w={640} h={270}>
        <div className="iconsizes">
          {ICON_SIZES.map((s) => (
            <figure key={s.size} style={{ width: s.size }}>
              <AppIcon size={s.size} title={`KALORA app icon at ${s.label}`} />
              <figcaption>{s.label}</figcaption>
            </figure>
          ))}
        </div>
      </Zone>

      <Zone x={1060} y={1435} w={640} tag="section">
        <h2 className="sc-label">App icon</h2>
        <p className="sc-caption" style={{ marginTop: 14 }}>
          The ring alone on graphite. The track holds down to 60 px.
        </p>
      </Zone>

      {/* ---------- Band C · colour + typography ---------- */}
      <Zone x={1760} y={150} w={760} tag="section">
        <Colour />
      </Zone>

      <Zone x={1760} y={1210} w={760} tag="section">
        <Typography />
      </Zone>

      {/* ---------- Band D · ring construction, pace arcs, icons ---------- */}
      <Zone x={2580} y={150} w={480} tag="section">
        <RingConstructionSection />
      </Zone>

      <Zone x={2580} y={980} w={480} tag="section">
        <PaceArcsSection />
      </Zone>

      <Zone x={2580} y={1650} w={480} tag="section">
        <IconsSection />
      </Zone>

      {/* ---------- Band E · graphite panel: reversed lockup, UI, voice ---------- */}
      <Zone x={3120} y={0} w={720} h={2160}>
        <div className="panel" />
      </Zone>

      <Zone x={3184} y={130} w={592}>
        <Wordmark width={520} tone="dark" />
        <p className="sc-caption sc-caption--dark" style={{ marginTop: 24 }}>
          Reversed lockup — light on graphite, lime segment unchanged.
        </p>
        <div className="panel__rule" style={{ marginTop: 40 }} />
      </Zone>

      <Zone x={3184} y={400} w={592} tag="header">
        <h2 className="sc-label sc-label--dark">Interface fragments</h2>
      </Zone>

      {/* The progress card steps off the panel — the anchor that closes the board */}
      <Zone x={3070} y={470} w={670}>
        <CalorieProgressCard />
      </Zone>

      <Zone x={3184} y={880} w={592}>
        <FoodResultCard />
      </Zone>

      <Zone x={3184} y={1130} w={592}>
        <RecipeCard thumb={PHOTOS.recipeThumb} />
      </Zone>

      <Zone x={3184} y={1500} w={592} tag="section">
        <h2 className="sc-label sc-label--dark">Voice &amp; tone</h2>

        <div className="voice-list" style={{ marginTop: 32 }}>
          <p className="voice-quote tnum">38 g protein to go.</p>
          <p className="voice-quote tnum">You’re 120 kcal over today. Tomorrow’s a new target.</p>
          <p className="voice-quote">Fuel your goal.</p>
        </div>

        <p className="voice-never" style={{ marginTop: 36 }}>
          <span>
            <b>Never</b> good, bad, clean, cheat or guilty. State the number, name the next step, stop.
          </span>
        </p>
      </Zone>
    </div>
  )
}

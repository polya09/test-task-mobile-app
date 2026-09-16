/**
 * Foundations — colour, type, spacing, geometry and grid.
 * Everything here reads straight from the tokens; nothing is retyped by hand
 * except the recorded contrast ratios, which are measurements, not values.
 */
import { Section, Block, Specimen, Spec, Table, TokenRef, Callout } from '../docs/Primitives'
import {
  BRAND_COLOURS,
  SEMANTIC_COLOURS,
  MACRO_COLOURS,
  TYPE_SCALE,
  SPACING,
  RADII,
  SHADOWS,
  ICON_SIZES,
  ratio,
  INK,
  SURFACE,
} from '../data'
import Icon, { ICON_NAMES } from '../../branding/parts/Icons'
import { StatusIcon, STATUS_TONES } from '../ui/StatusIcon'
import UiIcon, { UI_ICON_NAMES } from '../ui/UiIcons'

function Swatch({ hex, name, token, ink = 'graphite', tall = false }) {
  return (
    <div className={['ds-swatch', tall && 'ds-swatch--tall'].filter(Boolean).join(' ')}>
      <div
        className="ds-swatch__chip"
        style={{
          background: hex,
          color: ink === 'paper' ? 'var(--ds-text-inverse)' : 'var(--ds-text-primary)',
          borderColor: ['#FFFFFF', '#F7F5EF', '#E5E7E3'].includes(hex.toUpperCase())
            ? 'var(--ds-border-subtle)'
            : 'transparent',
        }}
      >
        <span className="ds-swatch__aa">Aa</span>
      </div>
      <p className="ds-swatch__name">{name}</p>
      <p className="ds-swatch__hex tnum">{hex}</p>
      <TokenRef>{token}</TokenRef>
    </div>
  )
}

export default function Foundations() {
  return (
    <>
      <Section
        id="colour"
        index="01"
        title="Colour"
        lead="Light surfaces carry the product. Graphite is an ink first and a surface only where the design needs maximum contrast — the day card, tooltips, the bottom navigation on scroll. Lime is reserved for brand, action and active states; it never marks status. The macro trio is reserved for nutrition data and appears nowhere else."
      >
        <Block
          title="Brand palette"
          rule="Eight values, unchanged from the stylescape. Graphite ink is the only ink allowed on lime, amber and blue."
        >
          <div className="ds-swatches">
            <Swatch hex="#C6F432" name="Electric lime" token="--k-lime" tall />
            <Swatch hex="#1C1F23" name="Graphite" token="--k-graphite" ink="paper" tall />
            <Swatch hex="#F7F5EF" name="Warm paper" token="--k-paper" tall />
            <Swatch hex="#FFFFFF" name="Surface" token="--k-surface" tall />
            <Swatch hex="#6B6F76" name="Muted" token="--k-muted" ink="paper" tall />
            <Swatch hex="#E5E7E3" name="Border" token="--k-border" tall />
            <Swatch hex="#557A00" name="Deep lime" token="--k-lime-deep" ink="paper" tall />
            <Swatch hex="#FF5A4E" name="Signal coral" token="--k-coral" tall />
          </div>

          <Table head={['Token', 'Hex', 'Role', 'Text pairing', 'Ratio']}>
            {BRAND_COLOURS.map((c) => (
              <tr key={c.token}>
                <td>
                  <TokenRef>{c.token}</TokenRef>
                </td>
                <td className="tnum">{c.hex}</td>
                <td>{c.role}</td>
                <td>{c.ink}</td>
                <td className="tnum">{c.ratio}</td>
              </tr>
            ))}
          </Table>
        </Block>

        <Block
          title="Semantic tokens"
          rule="Components never name a brand colour. They name a role, and the role resolves to a brand token."
        >
          <Table head={['Token', 'Hex', 'Role', 'On', 'Ratio']}>
            {SEMANTIC_COLOURS.map((c) => (
              <tr key={c.token}>
                <td>
                  <TokenRef>{c.token}</TokenRef>
                </td>
                <td className="tnum">{c.hex}</td>
                <td>{c.role}</td>
                <td>{c.on}</td>
                <td className="tnum">{c.ratio}</td>
              </tr>
            ))}
          </Table>

          <Callout tone="note" title="Why status does not reuse the macro palette">
            <p>
              Carbohydrate amber <TokenRef>--ds-carbs</TokenRef> and fat blue{' '}
              <TokenRef>--ds-fat</TokenRef> mean “this is a macronutrient”, everywhere, always. Status
              therefore gets its own ramp: success is deep lime darkened to{' '}
              <TokenRef>--ds-success-ink</TokenRef>, warning is a separate darker amber{' '}
              <TokenRef>--ds-warning-ink</TokenRef>, error is coral darkened for text, and information
              is neutral graphite rather than the fat blue it would otherwise borrow.
            </p>
          </Callout>
        </Block>

        <Block
          title="Nutrition palette"
          rule="Protein, carbohydrate, fat — fixed order, fixed hues, used for nutrition data only."
        >
          <div className="ds-swatches ds-swatches--macro">
            {MACRO_COLOURS.map((m) => (
              <div className="ds-macroswatch" key={m.token}>
                <div className="ds-macroswatch__chip" style={{ background: m.hex }}>
                  <span>{m.name[0]}</span>
                </div>
                <div>
                  <p className="ds-macroswatch__name">{m.name}</p>
                  <p className="ds-macroswatch__hex tnum">{m.hex}</p>
                  <TokenRef>{m.token}</TokenRef>
                  <p className="ds-macroswatch__ratio tnum">Graphite ink · {m.ratio}</p>
                </div>
              </div>
            ))}
          </div>
        </Block>

        <Block
          title="Surfaces"
          rule="Light is the default. Graphite appears three times in the whole product: the day card, the tooltip and a selected segment."
        >
          <div className="ds-surfacerow">
            {[
              { name: 'Canvas', token: '--ds-bg', bg: 'var(--ds-bg)', ink: 'var(--ds-text-primary)' },
              { name: 'Surface', token: '--ds-surface', bg: 'var(--ds-surface)', ink: 'var(--ds-text-primary)' },
              { name: 'Sunken', token: '--ds-surface-sunken', bg: 'var(--ds-surface-sunken)', ink: 'var(--ds-text-primary)' },
              { name: 'Inverse', token: '--ds-surface-inverse', bg: 'var(--ds-surface-inverse)', ink: 'var(--ds-text-inverse)' },
            ].map((s) => (
              <div className="ds-surfacetile" key={s.token} style={{ background: s.bg, color: s.ink }}>
                <p className="ds-surfacetile__name">{s.name}</p>
                <p className="ds-surfacetile__sample">1,170 kcal logged</p>
                <TokenRef>{s.token}</TokenRef>
              </div>
            ))}
          </div>
        </Block>
      </Section>

      <Section
        id="type"
        index="02"
        title="Typography"
        lead="Sora sets headings and every number that matters. Inter sets body copy, labels and controls. Changing figures are tabular, so a calorie total never shifts width as it counts up."
      >
        <Block title="Families" rule="Two families, no third. Both are self-hosted variable fonts.">
          <div className="ds-familyrow">
            <div className="ds-family">
              <p className="ds-family__sample ds-family__sample--display">Fuel your goal</p>
              <p className="ds-family__name">Sora</p>
              <p className="ds-family__use">
                Headings, hero numbers, the wordmark. Weights 600 and 700. <TokenRef>--k-font-display</TokenRef>
              </p>
            </div>
            <div className="ds-family">
              <p className="ds-family__sample ds-family__sample--text">
                Log a meal in seconds, then read the numbers.
              </p>
              <p className="ds-family__name">Inter</p>
              <p className="ds-family__use">
                Body, labels, controls, helper text. Weights 400, 500, 600. <TokenRef>--k-font-text</TokenRef>
              </p>
            </div>
          </div>
        </Block>

        <Block title="Scale" rule="Thirteen steps. Anything not on this list is not a type style.">
          <div className="ds-scale">
            {TYPE_SCALE.map((t) => (
              <div className="ds-scale__row" key={t.name}>
                <div className="ds-scale__meta">
                  <p className="ds-scale__name">{t.name}</p>
                  <p className="ds-scale__spec tnum">
                    {t.font} {t.weight} · {t.size}/{t.lh} · {t.tracking}
                  </p>
                  <p className="ds-scale__use">{t.use}</p>
                </div>
                <p
                  className={['ds-scale__sample', t.tnum && 'tnum'].filter(Boolean).join(' ')}
                  style={{
                    fontFamily: t.font === 'Sora' ? 'var(--k-font-display)' : 'var(--k-font-text)',
                    fontWeight: t.weight,
                    fontSize: t.size,
                    lineHeight: `${t.lh}px`,
                    letterSpacing: t.tracking,
                    textTransform: t.upper ? 'uppercase' : 'none',
                  }}
                >
                  {t.tnum ? '1,170 kcal' : t.upper ? 'Logged today' : 'Track smarter. Eat stronger.'}
                </p>
              </div>
            ))}
          </div>
        </Block>

        <Block
          title="Numbers"
          rule="Sora, tabular figures, unit set small and muted. The unit is never the same size as the value."
        >
          <Specimen label="Number treatment" note="Display / Number XL / Number L / Number M" surface="surface">
            <div className="ds-numrow">
              <p className="ds-num ds-num--display tnum">
                1,170 <span>kcal</span>
              </p>
              <p className="ds-num ds-num--xl tnum">
                830 <span>left</span>
              </p>
              <p className="ds-num ds-num--l tnum">
                72 <span>g</span>
              </p>
              <p className="ds-num ds-num--m tnum">
                523 <span>kcal</span>
              </p>
            </div>
          </Specimen>
          <Spec
            rows={[
              ['Family', 'Sora — --k-font-display'],
              ['Figures', 'font-variant-numeric: tabular-nums (.tnum)'],
              ['Unit', '0.42× the value size, weight 500, --ds-text-muted'],
              ['Gap', '6 px between value and unit (0.75 × --ds-space-2)'],
              ['Thousands', 'Grouped with a comma — Intl.NumberFormat("en-US")'],
            ]}
          />
        </Block>
      </Section>

      <Section
        id="space"
        index="03"
        title="Space, geometry and grid"
        lead="One 8 px grid, with a single 4 px half-step for icon-to-label gaps. Every padding, gap and inset in the library is a token from this list."
      >
        <Block title="Spacing scale" rule="8 px base. 4 px is the only sub-step and is never used for layout.">
          <div className="ds-spacescale">
            {SPACING.map((s) => (
              <div className="ds-spacescale__row" key={s.token}>
                <span className="ds-spacescale__bar" style={{ width: s.px }} />
                <span className="ds-spacescale__px tnum">{s.px}</span>
                <span className="ds-spacescale__step tnum">{s.step}</span>
                <TokenRef>{s.token}</TokenRef>
                <span className="ds-spacescale__use">{s.use}</span>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Radii" rule="Radius grows with the size of the surface: control 16, card 24, panel 40.">
          <div className="ds-radii">
            {RADII.map((r) => (
              <figure className="ds-radius" key={r.token}>
                <span className="ds-radius__box" style={{ borderRadius: r.px === 999 ? 999 : r.px }} />
                <figcaption>
                  <span className="ds-radius__px tnum">{r.px === 999 ? 'pill' : `${r.px} px`}</span>
                  <TokenRef>{r.token}</TokenRef>
                  <span className="ds-radius__use">{r.use}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Block>

        <Block title="Borders and elevation" rule="Graphite shadows only. No coloured glow, no gradient, no blur panel.">
          <div className="ds-elev">
            <figure className="ds-elev__cell">
              <span className="ds-elev__box" style={{ border: '1px solid var(--ds-border-subtle)' }} />
              <figcaption>
                <span>1 px subtle</span>
                <TokenRef>--ds-border-subtle</TokenRef>
                <span className="ds-elev__use">Dividers, card edge</span>
              </figcaption>
            </figure>
            <figure className="ds-elev__cell">
              <span className="ds-elev__box" style={{ border: '1px solid var(--ds-border-control)' }} />
              <figcaption>
                <span>1 px control</span>
                <TokenRef>--ds-border-control</TokenRef>
                <span className="ds-elev__use">Input edge · {ratio(INK.borderControl, SURFACE.surface)}</span>
              </figcaption>
            </figure>
            <figure className="ds-elev__cell">
              <span className="ds-elev__box" style={{ border: '2px solid var(--ds-border-strong)' }} />
              <figcaption>
                <span>2 px strong</span>
                <TokenRef>--ds-border-strong</TokenRef>
                <span className="ds-elev__use">Focused, selected</span>
              </figcaption>
            </figure>
            {SHADOWS.map((s) => (
              <figure className="ds-elev__cell" key={s.token}>
                <span className="ds-elev__box" style={{ boxShadow: `var(${s.token})`, background: 'var(--ds-surface)' }} />
                <figcaption>
                  <span>{s.label}</span>
                  <TokenRef>{s.token}</TokenRef>
                  <span className="ds-elev__use">{s.use}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Block>

        <Block
          title="Icon sizing"
          rule="Five sizes on the brand's 24 px grid. 24 px is the default; anything smaller keeps the stroke and loses detail, not weight."
        >
          <div className="ds-iconsizes">
            {ICON_SIZES.map((s) => (
              <figure className="ds-iconsize" key={s.token}>
                <span className="ds-iconsize__art">
                  <Icon name="flame" size={s.px} stroke={2} />
                </span>
                <figcaption>
                  <span className="tnum">{s.px} px</span>
                  <TokenRef>{s.token}</TokenRef>
                  <span className="ds-iconsize__use">{s.use}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Block>

        <Block
          title="Layout grid"
          rule="4 columns at phone width, 20 px margins, 16 px gutters. The grid scales to 8 columns from 600 px and 12 from 1024 px; the margins and gutter stay on the 8 px scale."
        >
          <Specimen label="Phone grid — 390 px reference" note="4 col · 20 px margin · 16 px gutter" surface="paper">
            <div className="ds-gridproof">
              <div className="ds-gridproof__cols" aria-hidden="true">
                {Array.from({ length: 4 }, (_, i) => (
                  <span key={i} />
                ))}
              </div>
              <div className="ds-gridproof__content">
                <p className="ds-gridproof__title">Today</p>
                <p className="ds-gridproof__body tnum">
                  A card spans all four columns. A pair of stats splits two and two.
                </p>
                <div className="ds-gridproof__pair">
                  <span className="tnum">1,170 kcal</span>
                  <span className="tnum">830 left</span>
                </div>
              </div>
            </div>
          </Specimen>
          <Spec
            rows={[
              ['Columns', '4 (≤599 px) · 8 (600–1023 px) · 12 (≥1024 px)'],
              ['Margin', '20 px — --ds-grid-margin'],
              ['Gutter', '16 px — --ds-grid-gutter · --ds-space-4'],
              ['Screen padding', '16 px sides, 24 px top, 96 px bottom (clears the bottom nav)'],
              ['Reference width', '390 px — --ds-phone-w'],
            ]}
          />
        </Block>

        <Block
          title="Icon set"
          rule="Original outline set on a 24 px grid, 2 px stroke, rounded caps and joins. Status glyphs are drawn to the same rules so a status is always a shape as well as a colour."
        >
          <p className="ds-iconset__group">Product</p>
          <div className="ds-iconset">
            {ICON_NAMES.map((name) => (
              <figure className="ds-iconcell" key={name}>
                <Icon name={name} size={24} stroke={2} title={`${name} icon`} />
                <figcaption>{name}</figcaption>
              </figure>
            ))}
          </div>

          <p className="ds-iconset__group">System — added in Stage 3, same grid and stroke</p>
          <div className="ds-iconset">
            {UI_ICON_NAMES.map((name) => (
              <figure className="ds-iconcell" key={name}>
                <UiIcon name={name} size={24} stroke={2} title={`${name} icon`} />
                <figcaption>{name}</figcaption>
              </figure>
            ))}
          </div>

          <p className="ds-iconset__group">Status</p>
          <div className="ds-iconset">
            {STATUS_TONES.map((tone) => (
              <figure className="ds-iconcell" key={tone}>
                <StatusIcon tone={tone} size={24} stroke={2} title={`${tone} icon`} />
                <figcaption>{tone}</figcaption>
              </figure>
            ))}
          </div>

          <p className="ds-iconset__group">Small-size variants — 24 px, 1.75 px stroke</p>
          <div className="ds-iconset">
            {['flame', 'recipe'].flatMap((name) => [
              <figure className="ds-iconcell" key={`${name}-full`}>
                <Icon name={name} size={24} stroke={1.75} title={`${name}, full detail`} />
                <figcaption>{name} · full</figcaption>
              </figure>,
              <figure className="ds-iconcell" key={`${name}-simple`}>
                <Icon name={name} size={24} stroke={1.75} detail="simple" title={`${name}, simplified`} />
                <figcaption>{name} · simple</figcaption>
              </figure>,
            ])}
          </div>

          <Callout tone="note" title="Why two glyphs carry a small-size variant">
            <p>
              Two of the eight product icons hold interior detail that reads at editorial sizes and
              turns to a blob at 24 px: the flame&rsquo;s inner flame, and the recipe bowl&rsquo;s three
              ingredient circles — at r 1.3–2.1 a 1.75 px stroke very nearly closes them. Measured as
              ink coverage on a 24 px box, that put recipe at three times the weight of the plus and
              made both glyphs read heavier than their neighbours in the bottom bar.
            </p>
            <p>
              <TokenRef>detail=&quot;simple&quot;</TokenRef> swaps in optically corrected drawings —
              the flame keeps the brand outline and drops its inner flame, the bowl narrows from 17.2
              to 14.4 units and its circles become two open steam strokes. Same grid, same stroke, same
              rounded caps and joins. The default is untouched, so every editorial use renders exactly
              as the stylescape drew it.
            </p>
          </Callout>
        </Block>
      </Section>
    </>
  )
}

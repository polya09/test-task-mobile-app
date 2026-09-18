/**
 * Scan — the shortest route to a specific packaged product's calories.
 *
 * There is no camera in a prototype, and pretending otherwise would be a lie
 * told in the user's own interface. The viewfinder is drawn honestly and the
 * trigger says what it is: a simulated read, standing in for a barcode.
 */
import { useEffect } from 'react'
import { ScreenHeader } from '../../design-system/ui/Header'
import { Button, Spinner } from '../../design-system/ui/Button'
import { StatePanel } from '../../design-system/ui/Feedback'
import { StatusIcon } from '../../design-system/ui/StatusIcon'
import { SCANNABLE, UNKNOWN_BARCODE, FOOD_BY_ID } from '../data/foods'
import { useStore } from '../store'

const READ_MS = 900

/** A fixed bar pattern, so the viewfinder is a drawing and not a random mess. */
const BARS = [3, 6, 3, 2, 8, 3, 4, 2, 6, 3, 2, 5, 3, 7, 2, 4]

export default function Scan() {
  const { state, dispatch } = useStore()
  const { status, foodId, barcode, nextIndex } = state.scan

  useEffect(() => {
    if (status !== 'reading') return undefined
    const timer = setTimeout(() => {
      if (barcode === UNKNOWN_BARCODE) {
        dispatch({ type: 'scan', patch: { status: 'notfound' } })
      } else {
        dispatch({ type: 'scan', patch: { status: 'found' } })
        dispatch({ type: 'sheet', sheet: { type: 'portion', foodId, from: 'scan' } })
      }
    }, READ_MS)
    return () => clearTimeout(timer)
  }, [status, barcode, foodId, dispatch])

  const simulateKnown = () => {
    const food = SCANNABLE[nextIndex % SCANNABLE.length]
    dispatch({
      type: 'scan',
      patch: {
        status: 'reading',
        foodId: food.id,
        barcode: food.barcode,
        nextIndex: (nextIndex + 1) % SCANNABLE.length,
      },
    })
  }

  const simulateUnknown = () =>
    dispatch({ type: 'scan', patch: { status: 'reading', foodId: null, barcode: UNKNOWN_BARCODE } })

  const reading = status === 'reading'
  const found = status === 'found' && foodId ? FOOD_BY_ID[foodId] : null

  return (
    <>
      <ScreenHeader title="Scan a product" />

      <div className="ap-page ap-page--flush">
        <div className="ap-scan">
          <div className="ap-viewfinder">
            <div className="ap-viewfinder__frame" />
            <div className="ap-viewfinder__bars" aria-hidden="true">
              {BARS.map((w, i) => (
                <span key={i} style={{ '--w': `${w}px` }} />
              ))}
            </div>
            <p className="ap-viewfinder__status" role="status">
              {reading ? (
                <>
                  <Spinner size={16} />
                  Reading barcode {barcode}…
                </>
              ) : status === 'notfound' ? (
                <>
                  <StatusIcon tone="warning" size={16} stroke={2.2} />
                  Barcode {barcode} not recognised
                </>
              ) : found ? (
                <>
                  <StatusIcon tone="success" size={16} stroke={2.2} />
                  {found.brand} {found.name}
                </>
              ) : (
                'Hold a barcode inside the frame'
              )}
            </p>
          </div>

          <p className="ap-simlabel">
            <StatusIcon tone="info" size={20} stroke={2.2} />
            <span>
              <strong>Simulated scan — prototype only.</strong>
              This build has no camera access. The buttons below stand in for a real barcode read so
              the rest of the flow can be walked end to end.
            </span>
          </p>

          {status === 'notfound' ? (
            <StatePanel
              tone="warning"
              title="No product matched that barcode"
              text="Nothing in the catalogue uses this code. Search for it by name instead, or build it as a dish."
              action="Search by name"
              onAction={() => dispatch({ type: 'tab', tab: 'log' })}
            />
          ) : (
            <div className="ap-stack">
              <Button icon="scan" fullWidth loading={reading} onClick={simulateKnown}>
                {reading ? 'Reading…' : 'Simulate scan'}
              </Button>
              <Button variant="secondary" fullWidth disabled={reading} onClick={simulateUnknown}>
                Simulate an unknown barcode
              </Button>
            </div>
          )}

          <p className="ap-hint">
            Simulate scan cycles through the {SCANNABLE.length} packaged products in the catalogue.
          </p>
        </div>
      </div>
    </>
  )
}

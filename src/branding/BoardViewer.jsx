/**
 * Responsive frame for a fixed-size board. The board is always laid out at its
 * designed pixel size and scaled as a whole, so the composition is identical on
 * a 4K monitor and on a phone. "Fit" shows the full 16:9 board; 50% and 100%
 * let the reviewer zoom in and pan.
 */
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

export const BOARD_W = 3840
export const BOARD_H = 2160
const PAD = 48 // .viewer__scroll horizontal padding

export default function BoardViewer({ children }) {
  const scrollRef = useRef(null)
  const [fit, setFit] = useState(0.25)
  const [mode, setMode] = useState('fit')

  const measure = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const w = Math.max(el.clientWidth - PAD, 200)
    const h = Math.max(el.clientHeight - PAD, 200)
    setFit(Math.min(w / BOARD_W, h / BOARD_H))
  }, [])

  useLayoutEffect(measure, [measure])

  useEffect(() => {
    const el = scrollRef.current
    if (!el || typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure)
      return () => window.removeEventListener('resize', measure)
    }
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [measure])

  const scale = mode === 'fit' ? fit : mode
  const percent = Math.round(scale * 100)

  const options = [
    { value: 'fit', label: 'Fit' },
    { value: 0.5, label: '50%' },
    { value: 1, label: '100%' },
  ]

  return (
    <div className="viewer">
      <div className="viewer__bar">
        <p className="viewer__meta">
          <strong>KALORA — Brand stylescape</strong>
          <span>Designed at 3840 × 2160 px · 16:9</span>
        </p>

        <div className="viewer__zoom">
          <span>Zoom</span>
          {options.map((o) => (
            <button
              key={o.label}
              type="button"
              className="viewer__btn"
              aria-pressed={mode === o.value}
              onClick={() => setMode(o.value)}
            >
              {o.label}
            </button>
          ))}
          <span className="tnum" aria-live="polite">
            {percent}%
          </span>
        </div>
      </div>

      <p className="viewer__hint">
        The board is one fixed composition. Choose <strong>Fit</strong> for the full 16:9 view, or zoom in
        and scroll to inspect the detail.
      </p>

      <div
        className="viewer__scroll"
        ref={scrollRef}
        tabIndex={0}
        role="region"
        aria-label="KALORA stylescape, scrollable and zoomable"
      >
        <div
          className="viewer__sizer"
          style={{ width: BOARD_W * scale, height: BOARD_H * scale }}
        >
          <div className="viewer__scaler" style={{ transform: `scale(${scale})` }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

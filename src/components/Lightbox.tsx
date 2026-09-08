import { useEffect, useState } from 'react'
import { ChevronRight, X } from '../icons'

type LightboxItem = { url: string; caption?: string | null }
type Props = {
  items: LightboxItem[]
  index: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function Lightbox({ items, index, onClose, onNavigate }: Props) {
  return <LightboxView key={index} items={items} index={index} onClose={onClose} onNavigate={onNavigate} />
}

function LightboxView({ items, index, onClose, onNavigate }: Props) {
  const [scale, setScale] = useState(1)
  const item = items[index]
  const count = items.length
  const hasPrev = index > 0
  const hasNext = index < items.length - 1

  const zoomIn = () => setScale((s) => Math.min(4, +(s + 0.5).toFixed(1)))
  const zoomOut = () => setScale((s) => Math.max(1, +(s - 0.5).toFixed(1)))

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft' && hasPrev) onNavigate(index - 1)
      else if (e.key === 'ArrowRight' && hasNext) onNavigate(index + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onNavigate, index, hasPrev, hasNext])

  if (!item) return null

  const pct = Math.round(scale * 100)

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-charcoal/95" onClick={onClose}>
      <div className="z-10 flex items-center justify-between px-5 py-3">
        <span className="text-xs text-silver/70">
          {index + 1} / {count}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              zoomOut()
            }}
            className="grid h-9 w-9 place-items-center rounded-full border border-silver/40 text-lg font-bold text-silver hover:border-amber hover:text-amber"
            aria-label="Zoom out"
          >
            −
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setScale(1)
            }}
            className="min-w-[52px] rounded-full border border-silver/40 px-3 py-1.5 text-xs font-bold text-silver hover:border-amber hover:text-amber"
            aria-label="Reset zoom"
          >
            {pct}%
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              zoomIn()
            }}
            className="grid h-9 w-9 place-items-center rounded-full border border-silver/40 text-lg font-bold text-silver hover:border-amber hover:text-amber"
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className="ml-2 grid h-9 w-9 place-items-center rounded-full border border-silver/40 text-silver hover:border-amber hover:text-amber"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="relative z-10 min-h-0 flex-1 overflow-auto">
        <div className="flex min-h-full w-full">
          <img
            src={item.url}
            alt={item.caption ?? 'Highlight photo'}
            onClick={(e) => {
              e.stopPropagation()
              setScale((s) => (s > 1 ? 1 : 2))
            }}
            className={scale === 1 ? 'm-auto max-h-[calc(100vh-180px)] max-w-full object-contain' : 'm-auto block'}
            style={scale > 1 ? { width: `${scale * 100}%` } : undefined}
          />
        </div>
      </div>

      {item.caption && (
        <div className="z-10 border-t border-slate/50 px-5 py-3 text-center text-sm text-silver">{item.caption}</div>
      )}

      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNavigate(index - 1)
          }}
          className="absolute left-4 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-silver/40 text-silver hover:border-amber hover:text-amber"
          aria-label="Previous photo"
        >
          <ChevronRight size={22} className="-scale-x-100" />
        </button>
      )}
      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNavigate(index + 1)
          }}
          className="absolute right-4 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-silver/40 text-silver hover:border-amber hover:text-amber"
          aria-label="Next photo"
        >
          <ChevronRight size={22} />
        </button>
      )}
    </div>
  )
}
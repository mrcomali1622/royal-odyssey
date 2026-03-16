import { useEffect } from 'react'

// Props: photos (array), currentIndex (number|null), onClose, onPrev, onNext
export default function ImageModal({ photos, currentIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    if (currentIndex === null) return
    const handler = (e) => {
      if (e.key === 'Escape')      onClose()
      if (e.key === 'ArrowLeft')   onPrev()
      if (e.key === 'ArrowRight')  onNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [currentIndex, onClose, onPrev, onNext])

  if (currentIndex === null) return null

  return (
    <div className="animate-fade-in"
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.93)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}>

      {/* Prev */}
      <button onClick={e => { e.stopPropagation(); onPrev() }}
        style={{ position: 'absolute', left: 20, background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', width: 48, height: 48, borderRadius: '50%', fontSize: 28, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        ‹
      </button>

      <img src={photos[currentIndex]} alt={`Photo ${currentIndex + 1}`}
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '82vw', maxHeight: '84vh', objectFit: 'contain', borderRadius: 8 }} />

      {/* Next */}
      <button onClick={e => { e.stopPropagation(); onNext() }}
        style={{ position: 'absolute', right: 20, background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', width: 48, height: 48, borderRadius: '50%', fontSize: 28, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        ›
      </button>

      {/* Close */}
      <button onClick={onClose}
        style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', width: 38, height: 38, borderRadius: '50%', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        ✕
      </button>

      {/* Counter */}
      <div style={{ position: 'absolute', bottom: 22, color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
        {currentIndex + 1} / {photos.length}
      </div>
    </div>
  )
}

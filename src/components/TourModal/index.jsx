import { useEffect } from 'react'

export default function TourModal({ tour, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className="animate-fade-in" onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div className="animate-scale-in" onClick={e => e.stopPropagation()}
        style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', width: '100%', maxWidth: 660, maxHeight: '90vh', overflowY: 'auto' }}>
        {/* Hero image */}
        <div style={{ position: 'relative' }}>
          <img src={tour.img} alt={tour.title} style={{ width: '100%', height: 270, objectFit: 'cover' }} />
          <button onClick={onClose}
            style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', width: 34, height: 34, borderRadius: '50%', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            ✕
          </button>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.72))', padding: '2rem 2rem 1.5rem' }}>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-accent)', fontWeight: 600, marginBottom: 4 }}>{tour.dest}</div>
            <h2 className="font-serif" style={{ fontSize: 26, color: '#fff', fontWeight: 700 }}>{tour.title}</h2>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '1.5rem 2rem 2rem' }}>
          {/* Stats */}
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', padding: '1rem', background: '#f8f5ef', borderRadius: 10, flexWrap: 'wrap' }}>
            {[['Duration', tour.dur], ['Price', `₹${Number(tour.price).toLocaleString()}`], ['Type', 'Group Tour']].map(([k, v]) => (
              <div key={k} style={{ textAlign: 'center', flex: 1, minWidth: 80 }}>
                <div style={{ fontSize: 11, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{k}</div>
                <div className={k === 'Price' ? 'font-serif' : ''} style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: k === 'Price' ? 19 : 14, marginTop: 4 }}>{v}</div>
              </div>
            ))}
          </div>

          <p style={{ color: 'var(--color-muted)', lineHeight: 1.85, marginBottom: '1.5rem', fontSize: 14.5 }}>{tour.desc}</p>

          {/* Itinerary */}
          <h4 className="font-serif" style={{ fontSize: 18, color: 'var(--color-primary)', marginBottom: '1rem', fontWeight: 600 }}>Itinerary</h4>
          {(tour.itinerary || []).map((day, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
              <div style={{ background: 'var(--color-accent)', color: 'var(--color-primary)', width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                {i + 1}
              </div>
              <div style={{ paddingTop: 3, color: '#333', fontSize: 14 }}>{day}</div>
            </div>
          ))}

          <a href={`https://wa.me/919876543210?text=Hi! I'm interested in the ${encodeURIComponent(tour.title)} package.`}
            target="_blank" rel="noopener noreferrer"
            style={{ display: 'block', marginTop: '1.5rem', width: '100%', background: 'var(--color-primary)', color: '#fff', border: 'none', padding: '13px', borderRadius: 10, fontSize: 14.5, fontWeight: 600, letterSpacing: 0.5, textAlign: 'center', textDecoration: 'none' }}>
            📱 Request Booking via WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

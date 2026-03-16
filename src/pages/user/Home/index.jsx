import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../../context/DataContext'
import TourCard from '../../../components/TourCard'
import TourModal from '../../../components/TourModal'

const STATS = [
  ['500+', 'Happy Travellers'],
  ['25+', 'Destinations'],
  ['14+', 'Years Experience'],
  ['4.9★', 'Avg Rating'],
]
const WHY = [
  ['🗺️', 'Expert Planning', 'Customized itineraries for every need'],
  ['🛡️', 'Safe Travel', '24/7 on-ground support'],
  ['💎', 'Premium Quality', 'Luxury experience at every step'],
  ['🤝', 'Trusted Agency', '1000+ delighted travellers'],
]

export default function Home() {
  const { tours } = useData()
  const [selected, setSelected] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    console.log(tours);

  }, [])

  return (
    <div className="animate-fade-up">
      {/* Hero */}
      <section style={{ position: 'relative', height: '88vh', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&q=80"
          alt="India" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(27,67,50,.88) 0%, rgba(27,67,50,.45) 55%, transparent 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 8%' }}>
          <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-accent)', fontWeight: 600, marginBottom: 18 }}>
            India's Premier Travel Experience
          </div>
          <h1 className="font-serif" style={{ fontSize: 'clamp(36px, 5.5vw, 68px)', color: '#fff', fontWeight: 700, lineHeight: 1.15, marginBottom: 20, maxWidth: 600 }}>
            Discover India's<br /><em>Magnificent</em> Wonders
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, lineHeight: 1.75, marginBottom: 34, maxWidth: 460 }}>
            Handcrafted journeys to India's most extraordinary destinations. From Himalayan peaks to tropical backwaters.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/catalog')}
              style={{ background: 'var(--color-accent)', color: 'var(--color-primary)', border: 'none', padding: '13px 30px', borderRadius: 8, fontSize: 14.5, fontWeight: 700, cursor: 'pointer', letterSpacing: '1px' }}>
              Explore Tours
            </button>
            <button onClick={() => navigate('/gallery')}
              style={{ background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.55)', padding: '13px 30px', borderRadius: 8, fontSize: 14.5, fontWeight: 600, cursor: 'pointer' }}>
              View Gallery
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div style={{ background: 'var(--color-primary)', padding: '1.75rem 4%', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '1rem' }}>
        {STATS.map(([n, l]) => (
          <div key={l} style={{ textAlign: 'center' }}>
            <div className="font-serif" style={{ fontSize: 34, color: 'var(--color-accent)', fontWeight: 700 }}>{n}</div>
            <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12.5, letterSpacing: '1px', marginTop: 3 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Popular Tours */}
      <section style={{ padding: '5rem 4%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.75rem' }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--color-accent)', fontWeight: 600, marginBottom: 10 }}>Our Packages</div>
          <h2 className="font-serif" style={{ fontSize: 40, color: 'var(--color-primary)', fontWeight: 700 }}>Popular Tours</h2>
          <div style={{ width: 56, height: 3, background: 'var(--color-accent)', margin: '14px auto 0' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '1.4rem' }}>
          {tours.slice(0, 3).map(t => <TourCard key={t.id} tour={t} onClick={setSelected} />)}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2.25rem' }}>
          <button onClick={() => navigate('/catalog')}
            style={{ background: 'transparent', color: 'var(--color-primary)', border: '2px solid var(--color-primary)', padding: '11px 34px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            View All Tours →
          </button>
        </div>
      </section>

      {/* About snippet */}
      <section style={{ background: '#f0ece3', padding: '5rem 4%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--color-accent)', fontWeight: 600, marginBottom: 10 }}>About Us</div>
          <h2 className="font-serif" style={{ fontSize: 38, color: 'var(--color-primary)', fontWeight: 700, lineHeight: 1.2, marginBottom: '1.5rem' }}>
            Journeys Crafted With Royal Care
          </h2>
          <p style={{ color: 'var(--color-muted)', lineHeight: 1.9, marginBottom: '1.5rem', fontSize: 14.5 }}>
            Since 2010, Royal Odyssey Tourism has been creating extraordinary travel experiences across India.
          </p>
          <button onClick={() => navigate('/about')}
            style={{ background: 'var(--color-primary)', color: '#fff', border: 'none', padding: '11px 26px', borderRadius: 8, fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}>
            Our Story →
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {WHY.map(([icon, title, sub]) => (
            <div key={title} style={{ background: '#fff', padding: '1.25rem', borderRadius: 12, border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: 26, marginBottom: 10 }}>{icon}</div>
              <div style={{ fontWeight: 600, color: 'var(--color-primary)', marginBottom: 4, fontSize: 13.5 }}>{title}</div>
              <div style={{ color: 'var(--color-muted)', fontSize: 12.5 }}>{sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--color-accent)', padding: '4rem 4%', textAlign: 'center' }}>
        <h2 className="font-serif" style={{ fontSize: 36, color: 'var(--color-primary)', fontWeight: 700, marginBottom: '.75rem' }}>
          Ready for Your Royal Adventure?
        </h2>
        <p style={{ color: 'rgba(27,67,50,0.75)', fontSize: 15, marginBottom: '1.75rem' }}>
          Contact us today and let us craft your perfect journey.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="tel:+919876543210"
            style={{ background: 'var(--color-primary)', color: '#fff', padding: '12px 32px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
            📞 +91 98765 43210
          </a>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
            style={{ background: 'transparent', color: 'var(--color-primary)', border: '2px solid var(--color-primary)', padding: '12px 32px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
            💬 WhatsApp Us
          </a>
        </div>
      </section>

      {selected && <TourModal tour={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

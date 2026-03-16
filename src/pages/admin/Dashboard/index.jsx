import { useNavigate } from 'react-router-dom'
import { TOURS, ALBUMS, ANNOUNCEMENTS } from '../../../data/mockData'

export default function Dashboard() {
  const navigate = useNavigate()
  const totalPhotos = ALBUMS.reduce((s, a) => s + a.photos.length, 0)

  const stats = [
    { icon: '🗺️', label: 'Total Tours',     value: TOURS.length,       path: '/admin/catalog' },
    { icon: '📷', label: 'Photo Albums',    value: ALBUMS.length,      path: '/admin/gallery' },
    { icon: '📢', label: 'Announcements',   value: ANNOUNCEMENTS.length, path: '/admin/announcement' },
    { icon: '🖼️', label: 'Total Photos',    value: totalPhotos,        path: '/admin/gallery' },
  ]

  const quickActions = [
    ['+ Add New Tour Package', '/admin/catalog'],
    ['+ Upload to Gallery',    '/admin/gallery'],
    ['+ Post Announcement',    '/admin/announcement'],
    ['+ Change Website Theme', '/admin/theme'],
  ]

  return (
    <div>
      <h1 className="font-serif" style={{ fontSize: 32, color: 'var(--color-primary)', fontWeight: 700, marginBottom: 4 }}>Dashboard</h1>
      <p style={{ color: 'var(--color-muted)', marginBottom: '2rem', fontSize: 14 }}>Welcome back, Admin. Here's your overview.</p>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1.25rem', marginBottom: '2.25rem' }}>
        {stats.map(({ icon, label, value, path }) => (
          <div key={label} onClick={() => navigate(path)}
            style={{ background: '#fff', borderRadius: 14, padding: '1.4rem', border: '1px solid var(--color-border)', cursor: 'pointer', transition: 'transform .2s, box-shadow .2s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,.08)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
            <div className="font-serif" style={{ fontSize: 30, fontWeight: 700, color: 'var(--color-primary)' }}>{value}</div>
            <div style={{ color: 'var(--color-muted)', fontSize: 12.5, marginTop: 3 }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        {/* Recent Tours */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '1.5rem', border: '1px solid var(--color-border)' }}>
          <h3 className="font-serif" style={{ fontSize: 19, color: 'var(--color-primary)', marginBottom: '1rem', fontWeight: 700 }}>Recent Tours</h3>
          {TOURS.slice(0, 4).map(t => (
            <div key={t.id} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 11, paddingBottom: 11, borderBottom: '1px solid var(--color-border)' }}>
              <img src={t.img} alt="" style={{ width: 46, height: 46, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 13.5, color: '#222', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.title}</div>
                <div style={{ fontSize: 12, color: 'var(--color-muted)' }}>{t.dest}</div>
              </div>
              <div style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: 13.5, flexShrink: 0 }}>₹{t.price.toLocaleString()}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '1.5rem', border: '1px solid var(--color-border)' }}>
          <h3 className="font-serif" style={{ fontSize: 19, color: 'var(--color-primary)', marginBottom: '1rem', fontWeight: 700 }}>Quick Actions</h3>
          {quickActions.map(([label, path]) => (
            <button key={label} onClick={() => navigate(path)}
              style={{ display: 'block', width: '100%', textAlign: 'left', background: '#f8f5ef', border: '1px solid var(--color-border)', padding: '11px 14px', borderRadius: 8, marginBottom: 9, fontSize: 13.5, color: 'var(--color-primary)', fontWeight: 500, cursor: 'pointer', transition: 'background .2s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#ede9df'}
              onMouseLeave={e => e.currentTarget.style.background = '#f8f5ef'}>
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

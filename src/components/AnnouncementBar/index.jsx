import { useData } from '../../context/DataContext'

export default function AnnouncementBar() {
  const { announcements } = useData()
  if (!announcements.length) return null
  const text = announcements.map(a => a.message).join('   ✦   ')
  return (
    <div style={{ background: 'var(--color-primary)', color: 'var(--color-accent)', padding: '9px 0', overflow: 'hidden', whiteSpace: 'nowrap', fontSize: 13, fontWeight: 500 }}>
      <span className="ticker-text">{text}</span>
    </div>
  )
}

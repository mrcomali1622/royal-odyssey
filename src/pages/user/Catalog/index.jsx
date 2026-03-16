import { useState } from 'react'
import { useData } from '../../../context/DataContext'
import TourCard from '../../../components/TourCard'
import TourModal from '../../../components/TourModal'

export default function Catalog() {
  const { tours } = useData()
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const destinations = ['All', ...new Set(tours.map(t => t.dest))]
  const filtered = tours.filter(t => {
    const matchDest = filter === 'All' || t.dest === filter
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
                        t.dest.toLowerCase().includes(search.toLowerCase())
    return matchDest && matchSearch
  })

  return (
    <div className="animate-fade-up" style={{ padding: '4rem 4%' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--color-accent)', fontWeight: 600, marginBottom: 10 }}>Explore</div>
        <h1 className="font-serif" style={{ fontSize: 46, color: 'var(--color-primary)', fontWeight: 700 }}>Tour Packages</h1>
        <div style={{ width: 56, height: 3, background: 'var(--color-accent)', margin: '14px auto 0' }} />
      </div>

      {/* Search */}
      <div style={{ maxWidth: 420, margin: '0 auto 1.75rem' }}>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍  Search tours or destinations..."
          style={{ width: '100%', padding: '11px 16px', border: '2px solid var(--color-border)', borderRadius: 30, fontSize: 14, outline: 'none', background: '#fff' }} />
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '.65rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
        {destinations.map(d => (
          <button key={d} onClick={() => setFilter(d)}
            style={{ background: filter === d ? 'var(--color-primary)' : 'transparent', color: filter === d ? '#fff' : 'var(--color-primary)', border: '2px solid var(--color-primary)', padding: '7px 18px', borderRadius: 24, fontSize: 12.5, fontWeight: 600, cursor: 'pointer', transition: 'all .2s' }}>
            {d}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-muted)', fontSize: 15 }}>
          No tours found. Try a different search or filter.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '1.4rem' }}>
          {filtered.map(t => <TourCard key={t.id} tour={t} onClick={setSelected} />)}
        </div>
      )}

      {selected && <TourModal tour={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

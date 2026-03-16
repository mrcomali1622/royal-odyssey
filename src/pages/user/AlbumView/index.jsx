import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useData } from '../../../context/DataContext'
import ImageModal from '../../../components/ImageModal'

export default function AlbumView() {
  const { albumId } = useParams()
  const navigate = useNavigate()
  const { albums } = useData()
  const [modalIndex, setModalIndex] = useState(null)

  const album = albums.find(a => a.id === Number(albumId))

  if (!album) return (
    <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--color-muted)' }}>
      Album not found.{' '}
      <button onClick={() => navigate('/gallery')}
        style={{ color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
        Back to Gallery
      </button>
    </div>
  )

  const prev = () => setModalIndex(i => (i - 1 + album.photos.length) % album.photos.length)
  const next = () => setModalIndex(i => (i + 1) % album.photos.length)

  return (
    <div className="animate-fade-up" style={{ padding: '3rem 4%' }}>
      <button onClick={() => navigate('/gallery')}
        style={{ background: 'transparent', border: 'none', color: 'var(--color-primary)', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 8, fontSize: 14.5, cursor: 'pointer' }}>
        ← Back to Gallery
      </button>
      <h1 className="font-serif" style={{ fontSize: 38, color: 'var(--color-primary)', fontWeight: 700, marginBottom: '2rem' }}>{album.name}</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {album.photos.map((photo, i) => (
          <div key={i} className="photo-grid-item" onClick={() => setModalIndex(i)}
            style={{ borderRadius: 10, overflow: 'hidden', aspectRatio: '4/3' }}>
            <img src={photo} alt={`${album.name} ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>
      <ImageModal photos={album.photos} currentIndex={modalIndex} onClose={() => setModalIndex(null)} onPrev={prev} onNext={next} />
    </div>
  )
}

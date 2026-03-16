import { useNavigate } from 'react-router-dom'

export default function AlbumCard({ album }) {
  const navigate = useNavigate()
  return (
    <div className="album-card" onClick={() => navigate(`/gallery/${album.id}`)}
      style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid var(--color-border)' }}>
      <div style={{ overflow: 'hidden', height: 220, position: 'relative' }}>
        <img src={album.cover} alt={album.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 35%, rgba(0,0,0,0.62))' }} />
        <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
          <h3 className="font-serif" style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>{album.name}</h3>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12.5 }}>{album.photos.length} photos</span>
        </div>
      </div>
    </div>
  )
}

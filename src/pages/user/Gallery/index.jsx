import { useData } from '../../../context/DataContext'
import AlbumCard from '../../../components/AlbumCard'

export default function Gallery() {
  const { albums } = useData()
  return (
    <div className="animate-fade-up" style={{ padding: '4rem 4%' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.75rem' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--color-accent)', fontWeight: 600, marginBottom: 10 }}>Visual Stories</div>
        <h1 className="font-serif" style={{ fontSize: 46, color: 'var(--color-primary)', fontWeight: 700 }}>Photo Gallery</h1>
        <div style={{ width: 56, height: 3, background: 'var(--color-accent)', margin: '14px auto 0' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.4rem' }}>
        {albums.map(album => <AlbumCard key={album.id} album={album} />)}
      </div>
    </div>
  )
}

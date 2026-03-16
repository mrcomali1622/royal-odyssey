import { useState } from 'react'
import { useData } from '../../../context/DataContext'

export default function ManageGallery() {
  const { albums, setAlbums } = useData()
  const [newName, setNewName] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [newUrl, setNewUrl] = useState('')

  const createAlbum = () => {
    if (!newName.trim()) return
    setAlbums(a => [...a, { id: Date.now(), name: newName.trim(), cover: '', photos: [] }])
    setNewName('')
  }

  const deleteAlbum = (id) => {
    if (!window.confirm('Delete this album and all its photos?')) return
    setAlbums(a => a.filter(x => x.id !== id))
    if (selectedId === id) setSelectedId(null)
  }

  const addPhoto = () => {
    if (!newUrl.trim() || !selectedId) return
    setAlbums(a => a.map(x =>
      x.id === selectedId
        ? { ...x, photos: [...x.photos, newUrl.trim()], cover: x.photos.length === 0 ? newUrl.trim() : x.cover }
        : x
    ))
    setNewUrl('')
  }

  const deletePhoto = (albumId, idx) =>
    setAlbums(a => a.map(x =>
      x.id === albumId ? { ...x, photos: x.photos.filter((_, i) => i !== idx) } : x
    ))

  const selected = albums.find(a => a.id === selectedId)

  return (
    <div>
      <h1 className="font-serif" style={{ fontSize: 30, color: 'var(--color-primary)', fontWeight: 700, marginBottom: '1.5rem' }}>Manage Gallery</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '1.4rem' }}>
        {/* Sidebar */}
        <div>
          <div style={{ background: '#fff', borderRadius: 14, padding: '1.4rem', border: '1px solid var(--color-border)', marginBottom: '1rem' }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--color-primary)', marginBottom: '1rem' }}>Create Album</div>
            <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Album name"
              onKeyDown={e => e.key === 'Enter' && createAlbum()}
              style={{ width: '100%', padding: '9px 12px', border: '1.5px solid var(--color-border)', borderRadius: 8, fontSize: 13.5, outline: 'none', marginBottom: 9 }} />
            <button onClick={createAlbum}
              style={{ width: '100%', background: 'var(--color-primary)', color: '#fff', border: 'none', padding: '9px', borderRadius: 8, fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}>
              + Create Album
            </button>
          </div>

          {albums.map(a => (
            <div key={a.id} onClick={() => setSelectedId(a.id)}
              style={{ background: selectedId === a.id ? 'rgba(212,175,55,0.08)' : '#fff', borderRadius: 10, padding: '11px', border: `1.5px solid ${selectedId === a.id ? 'var(--color-accent)' : 'var(--color-border)'}`, marginBottom: 7, cursor: 'pointer', transition: 'all .2s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13.5, color: 'var(--color-primary)' }}>{a.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--color-muted)' }}>{a.photos.length} photos</div>
                </div>
                <button onClick={e => { e.stopPropagation(); deleteAlbum(a.id) }}
                  style={{ background: 'transparent', border: 'none', color: '#c00', fontSize: 14, cursor: 'pointer' }}>🗑</button>
              </div>
            </div>
          ))}
        </div>

        {/* Photo panel */}
        <div>
          {!selected ? (
            <div style={{ background: '#fff', borderRadius: 14, padding: '3rem', textAlign: 'center', border: '1px solid var(--color-border)', color: 'var(--color-muted)', fontSize: 14 }}>
              Select an album to manage its photos
            </div>
          ) : (
            <div style={{ background: '#fff', borderRadius: 14, padding: '1.5rem', border: '1px solid var(--color-border)' }}>
              <h3 className="font-serif" style={{ fontSize: 20, color: 'var(--color-primary)', marginBottom: '1.25rem', fontWeight: 700 }}>{selected.name}</h3>
              <div style={{ display: 'flex', gap: 8, marginBottom: '1.4rem' }}>
                <input value={newUrl} onChange={e => setNewUrl(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addPhoto()}
                  placeholder="Photo URL (Unsplash, direct image link...)"
                  style={{ flex: 1, padding: '9px 12px', border: '1.5px solid var(--color-border)', borderRadius: 8, fontSize: 13.5, outline: 'none' }} />
                <button onClick={addPhoto}
                  style={{ background: 'var(--color-primary)', color: '#fff', border: 'none', padding: '9px 18px', borderRadius: 8, fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}>
                  Add
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '.75rem' }}>
                {selected.photos.map((p, i) => (
                  <div key={i} style={{ position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
                    <img src={p} alt="" style={{ width: '100%', aspectRatio: '1', objectFit: 'cover' }} />
                    <button onClick={() => deletePhoto(selected.id, i)}
                      style={{ position: 'absolute', top: 5, right: 5, background: 'rgba(204,0,0,0.85)', border: 'none', color: '#fff', width: 24, height: 24, borderRadius: '50%', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      ✕
                    </button>
                  </div>
                ))}
                {selected.photos.length === 0 && (
                  <div style={{ gridColumn: '1/-1', color: 'var(--color-muted)', textAlign: 'center', padding: '2rem', fontSize: 13 }}>
                    No photos yet. Add a URL above.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

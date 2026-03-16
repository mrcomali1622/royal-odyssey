import { useState } from 'react'
import { useData } from '../../../context/DataContext'

export default function ManageAnnouncement() {
  const { announcements: items, setAnnouncements: setItems } = useData()
  const [text, setText] = useState('')
  const [editId, setEditId] = useState(null)

  const save = () => {
    if (!text.trim()) return
    if (editId) {
      setItems(a => a.map(x => x.id === editId ? { ...x, message: text } : x))
    } else {
      setItems(a => [...a, { id: Date.now(), message: text, date: new Date().toISOString().split('T')[0] }])
    }
    setText('')
    setEditId(null)
  }

  const startEdit = (item) => { setText(item.message); setEditId(item.id) }
  const cancel = () => { setText(''); setEditId(null) }
  const del = (id) => { if (window.confirm('Delete this announcement?')) setItems(a => a.filter(x => x.id !== id)) }

  return (
    <div>
      <h1 className="font-serif" style={{ fontSize: 30, color: 'var(--color-primary)', fontWeight: 700, marginBottom: '1.5rem' }}>Announcements</h1>

      {/* Form */}
      <div style={{ background: '#fff', borderRadius: 14, padding: '1.5rem', border: '1px solid var(--color-border)', marginBottom: '1.75rem' }}>
        <div style={{ fontWeight: 700, fontSize: 14.5, color: 'var(--color-primary)', marginBottom: '1rem' }}>
          {editId ? 'Edit Announcement' : 'New Announcement'}
        </div>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={3}
          placeholder="Enter announcement text... (tip: start with an emoji 🎉)"
          style={{ width: '100%', padding: '11px', border: '1.5px solid var(--color-border)', borderRadius: 8, fontSize: 13.5, outline: 'none', resize: 'vertical', marginBottom: '1rem' }} />
        <div style={{ display: 'flex', gap: 9 }}>
          <button onClick={save}
            style={{ background: 'var(--color-primary)', color: '#fff', border: 'none', padding: '9px 22px', borderRadius: 8, fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}>
            {editId ? 'Update' : 'Post'}
          </button>
          {editId && (
            <button onClick={cancel}
              style={{ background: 'transparent', border: '1.5px solid var(--color-border)', padding: '9px 18px', borderRadius: 8, fontSize: 13.5, color: '#444', cursor: 'pointer' }}>
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div style={{ display: 'grid', gap: '1rem' }}>
        {items.map(item => (
          <div key={item.id} style={{ background: '#fff', borderRadius: 12, padding: '1.1rem', border: '1px solid var(--color-border)', display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ fontSize: 22, flexShrink: 0 }}>📢</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#222', fontSize: 13.5, marginBottom: 3 }}>{item.message}</div>
              <div style={{ fontSize: 12, color: 'var(--color-muted)' }}>{item.date}</div>
            </div>
            <div style={{ display: 'flex', gap: 7, flexShrink: 0 }}>
              <button onClick={() => startEdit(item)} style={{ background: '#f0f7ff', border: '1px solid #c0d4f0', color: '#1a5fa8', padding: '6px 13px', borderRadius: 8, fontSize: 12.5, cursor: 'pointer' }}>✏️ Edit</button>
              <button onClick={() => del(item.id)} style={{ background: '#fff0f0', border: '1px solid #fcc', color: '#c00', padding: '6px 13px', borderRadius: 8, fontSize: 12.5, cursor: 'pointer' }}>🗑 Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--color-muted)', padding: '2.5rem', background: '#fff', borderRadius: 12, border: '1px solid var(--color-border)', fontSize: 13.5 }}>
            No announcements yet.
          </div>
        )}
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useData } from '../../../context/DataContext'

const BLANK = { id: 0, title: '', dest: '', dur: '', price: '', desc: '', img: '', itinerary: [''] }

export default function ManageCatalog() {
  const { tours, setTours } = useData()
  const [form, setForm] = useState(BLANK)
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const openAdd = () => { setForm(BLANK); setEditId(null); setShowForm(true) }
  const openEdit = (t) => { setForm({ ...t, price: String(t.price) }); setEditId(t.id); setShowForm(true) }
  const cancel = () => { setShowForm(false); setEditId(null); setForm(BLANK) }

  const save = () => {
    if (!form.title.trim() || !form.price) return
    if (editId) {
      setTours(ts => ts.map(t => t.id === editId ? { ...form, id: editId, price: Number(form.price) } : t))
    } else {
      setTours(ts => [...ts, { ...form, id: Date.now(), price: Number(form.price) }])
    }
    cancel()
  }

  const del = (id) => { if (window.confirm('Delete this tour?')) setTours(ts => ts.filter(t => t.id !== id)) }

  const setDay = (i, val) => setForm(f => ({ ...f, itinerary: f.itinerary.map((d, j) => j === i ? val : d) }))
  const addDay = () => setForm(f => ({ ...f, itinerary: [...f.itinerary, ''] }))
  const removeDay = (i) => setForm(f => ({ ...f, itinerary: f.itinerary.filter((_, j) => j !== i) }))

  const Field = ({ k, label }) => (
    <div>
      <label style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--color-primary)', display: 'block', marginBottom: 5 }}>{label}</label>
      <input value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}
        style={{ width: '100%', padding: '9px 12px', border: '1.5px solid var(--color-border)', borderRadius: 8, fontSize: 13.5, outline: 'none' }} />
    </div>
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 className="font-serif" style={{ fontSize: 30, color: 'var(--color-primary)', fontWeight: 700 }}>Manage Catalog</h1>
        <button onClick={openAdd}
          style={{ background: 'var(--color-primary)', color: '#fff', border: 'none', padding: '9px 18px', borderRadius: 8, fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}>
          + Add Tour
        </button>
      </div>

      {showForm && (
        <div style={{ background: '#fff', borderRadius: 14, padding: '1.75rem', border: '1px solid var(--color-border)', marginBottom: '1.75rem' }}>
          <h3 className="font-serif" style={{ fontSize: 20, color: 'var(--color-primary)', marginBottom: '1.25rem', fontWeight: 700 }}>
            {editId ? 'Edit Tour' : 'Add New Tour'}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <Field k="title" label="Tour Title" />
            <Field k="dest"  label="Destination" />
            <Field k="dur"   label="Duration (e.g. 4 Days / 3 Nights)" />
            <Field k="price" label="Price (₹)" />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--color-primary)', display: 'block', marginBottom: 5 }}>Image URL</label>
            <input value={form.img} onChange={e => setForm(f => ({ ...f, img: e.target.value }))}
              placeholder="https://images.unsplash.com/..."
              style={{ width: '100%', padding: '9px 12px', border: '1.5px solid var(--color-border)', borderRadius: 8, fontSize: 13.5, outline: 'none' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--color-primary)', display: 'block', marginBottom: 5 }}>Description</label>
            <textarea value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} rows={2}
              style={{ width: '100%', padding: '9px 12px', border: '1.5px solid var(--color-border)', borderRadius: 8, fontSize: 13.5, outline: 'none', resize: 'vertical' }} />
          </div>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--color-primary)', display: 'block', marginBottom: 8 }}>Itinerary</label>
            {form.itinerary.map((day, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <input value={day} onChange={e => setDay(i, e.target.value)} placeholder={`Day ${i + 1}`}
                  style={{ flex: 1, padding: '9px 12px', border: '1.5px solid var(--color-border)', borderRadius: 8, fontSize: 13.5, outline: 'none' }} />
                <button onClick={() => removeDay(i)}
                  style={{ background: '#fff0f0', border: '1px solid #fcc', color: '#c00', padding: '8px 11px', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>✕</button>
              </div>
            ))}
            <button onClick={addDay}
              style={{ background: '#f8f5ef', border: '1px solid var(--color-border)', padding: '7px 14px', borderRadius: 8, fontSize: 12.5, color: 'var(--color-primary)', fontWeight: 500, cursor: 'pointer' }}>
              + Add Day
            </button>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={save}
              style={{ background: 'var(--color-primary)', color: '#fff', border: 'none', padding: '10px 26px', borderRadius: 8, fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}>
              {editId ? 'Update' : 'Add'} Tour
            </button>
            <button onClick={cancel}
              style={{ background: 'transparent', border: '1.5px solid var(--color-border)', padding: '10px 22px', borderRadius: 8, fontSize: 13.5, color: '#444', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gap: '1rem' }}>
        {tours.map(t => (
          <div key={t.id} style={{ background: '#fff', borderRadius: 12, padding: '1rem', border: '1px solid var(--color-border)', display: 'flex', gap: 14, alignItems: 'center' }}>
            <img src={t.img} alt="" style={{ width: 72, height: 54, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: 15 }}>{t.title}</div>
              <div style={{ color: 'var(--color-muted)', fontSize: 12.5, marginTop: 2 }}>{t.dest} · {t.dur} · ₹{Number(t.price).toLocaleString()}</div>
            </div>
            <div style={{ display: 'flex', gap: 7, flexShrink: 0 }}>
              <button onClick={() => openEdit(t)} style={{ background: '#f0f7ff', border: '1px solid #c0d4f0', color: '#1a5fa8', padding: '6px 13px', borderRadius: 8, fontSize: 12.5, cursor: 'pointer' }}>✏️ Edit</button>
              <button onClick={() => del(t.id)}   style={{ background: '#fff0f0', border: '1px solid #fcc', color: '#c00', padding: '6px 13px', borderRadius: 8, fontSize: 12.5, cursor: 'pointer' }}>🗑 Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

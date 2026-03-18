// admin/Dashboard/AdminDashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import styles from './AdminDashboard.module.css';

/* ——— Icons ——— */
const icons = {
  dashboard: '⬡', announcements: '📢', gallery: '🖼', catalogue: '🧳',
  reviews: '⭐', theme: '🎨', logout: '→', plus: '+', edit: '✎', trash: '✕',
  eye: '👁', eyeOff: '✕', check: '✓',
};

/* ——— Reusable Modal ——— */
function Modal({ title, onClose, children }) {
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <motion.div
        className={styles.modal}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>{title}</h3>
          <button className={styles.modalClose} onClick={onClose}>✕</button>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </motion.div>
    </div>
  );
}

/* ——— Stats Overview ——— */
function OverviewPanel({ tours, reviews, albums, announcements }) {
  const stats = [
    { label: 'Active Tours', value: tours.length, color: '#b8860b' },
    { label: 'Announcements', value: announcements.filter(a => a.active).length, color: '#1c3b5a' },
    { label: 'Album Photos', value: albums.reduce((s, a) => s + a.images.length, 0), color: '#8b0000' },
    { label: 'Total Reviews', value: reviews.length, color: '#2d6a4f' },
  ];
  return (
    <div>
      <h2 className={styles.panelTitle}>Dashboard Overview</h2>
      <div className={styles.statsGrid}>
        {stats.map(s => (
          <div key={s.label} className={styles.statCard} style={{ borderTop: `3px solid ${s.color}` }}>
            <div className={styles.statNum} style={{ color: s.color }}>{s.value}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>
      <div className={styles.quickInfo}>
        <p className={styles.quickInfoText}>Welcome back, <strong>Admin</strong>. Use the sidebar to manage all platform content.</p>
        <p className={styles.quickInfoText} style={{ marginTop: 8 }}>
          📊 {reviews.filter(r => r.visible).length} visible reviews · {tours.filter(t => t.offer).length} active offers
        </p>
      </div>
    </div>
  );
}

/* ——— Announcements Panel ——— */
function AnnouncementsPanel() {
  const { announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', subtitle: '', description: '', image: '', tag: 'NEW', type: 'announcement', date: '', active: true });

  const open = (ann = null) => {
    if (ann) { setEditing(ann); setForm({ ...ann }); } else { setEditing(null); setForm({ title: '', subtitle: '', description: '', image: '', tag: 'NEW', type: 'announcement', date: '', active: true }); }
    setShowForm(true);
  };

  const handleSave = () => {
    if (editing) { updateAnnouncement(editing.id, form); } else { addAnnouncement(form); }
    setShowForm(false);
  };

  return (
    <div>
      <div className={styles.panelTopBar}>
        <h2 className={styles.panelTitle}>Announcements</h2>
        <button className="btn btn-primary" onClick={() => open()}>+ Add New</button>
      </div>
      <div className={styles.itemList}>
        {announcements.map(ann => (
          <div key={ann.id} className={styles.listItem}>
            <div className={styles.listItemImg}>
              {ann.image && <img src={ann.image} alt={ann.title} />}
            </div>
            <div className={styles.listItemInfo}>
              <div className={styles.listItemTitle}>{ann.title}</div>
              <div className={styles.listItemSub}>{ann.type} · {ann.tag} · {ann.date}</div>
            </div>
            <div className={styles.listItemBadge}>
              <span className={`badge ${ann.active ? 'badge-gold' : 'badge-navy'}`}>{ann.active ? 'Active' : 'Hidden'}</span>
            </div>
            <div className={styles.listItemActions}>
              <button className={styles.actionBtn} onClick={() => updateAnnouncement(ann.id, { active: !ann.active })} title="Toggle">
                {ann.active ? icons.eye : icons.eyeOff}
              </button>
              <button className={styles.actionBtn} onClick={() => open(ann)} title="Edit">{icons.edit}</button>
              <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => deleteAnnouncement(ann.id)} title="Delete">{icons.trash}</button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showForm && (
          <Modal title={editing ? 'Edit Announcement' : 'New Announcement'} onClose={() => setShowForm(false)}>
            <div className="form-group"><label className="form-label">Title *</label><input className="form-input" value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} placeholder="Announcement title" /></div>
            <div className="form-group"><label className="form-label">Subtitle</label><input className="form-input" value={form.subtitle} onChange={e => setForm(f => ({...f, subtitle: e.target.value}))} placeholder="Short subtitle" /></div>
            <div className="form-group"><label className="form-label">Description</label><textarea className="form-input form-textarea" rows={3} value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} /></div>
            <div className="form-group"><label className="form-label">Image URL</label><input className="form-input" value={form.image} onChange={e => setForm(f => ({...f, image: e.target.value}))} placeholder="https://..." /></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label className="form-label">Tag</label>
                <select className="form-input" value={form.tag} onChange={e => setForm(f => ({...f, tag: e.target.value}))}>
                  {['NEW', 'HOT DEAL', 'UPCOMING EVENT', 'OFFER', 'ANNOUNCEMENT'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Type</label>
                <select className="form-input" value={form.type} onChange={e => setForm(f => ({...f, type: e.target.value}))}>
                  {['announcement', 'offer', 'event'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group"><label className="form-label">Date</label><input className="form-input" type="date" value={form.date} onChange={e => setForm(f => ({...f, date: e.target.value}))} /></div>
            <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <input type="checkbox" id="active" checked={form.active} onChange={e => setForm(f => ({...f, active: e.target.checked}))} />
              <label htmlFor="active" className="form-label" style={{ margin: 0 }}>Show in carousel</label>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={handleSave}>Save</button>
              <button className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ——— Gallery Panel ——— */
function GalleryPanel() {
  const { albums, addAlbum, deleteAlbum, addImageToAlbum, deleteImageFromAlbum } = useApp();
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [showAlbumForm, setShowAlbumForm] = useState(false);
  const [newAlbum, setNewAlbum] = useState({ title: '', coverImage: '', imageCount: 0 });
  const [newImgUrl, setNewImgUrl] = useState('');
  const [newImgCaption, setNewImgCaption] = useState('');

  const handleAddAlbum = () => {
    if (!newAlbum.title) return;
    addAlbum(newAlbum);
    setNewAlbum({ title: '', coverImage: '', imageCount: 0 });
    setShowAlbumForm(false);
  };

  const handleAddImage = () => {
    if (!newImgUrl || !selectedAlbum) return;
    addImageToAlbum(selectedAlbum.id, { src: newImgUrl, caption: newImgCaption });
    setNewImgUrl('');
    setNewImgCaption('');
  };

  const currentAlbum = selectedAlbum ? albums.find(a => a.id === selectedAlbum.id) : null;

  return (
    <div>
      <div className={styles.panelTopBar}>
        <h2 className={styles.panelTitle}>Gallery Management</h2>
        <div style={{ display: 'flex', gap: 10 }}>
          {currentAlbum && <button className="btn btn-outline" onClick={() => setSelectedAlbum(null)}>← Albums</button>}
          <button className="btn btn-primary" onClick={() => setShowAlbumForm(true)}>+ New Album</button>
        </div>
      </div>

      {!currentAlbum ? (
        <div className={styles.galleryAlbumGrid}>
          {albums.map(album => (
            <div key={album.id} className={styles.galleryAlbumCard}>
              <div className={styles.galleryAlbumImg}>
                {album.coverImage && <img src={album.coverImage} alt={album.title} />}
              </div>
              <div className={styles.galleryAlbumMeta}>
                <span className={styles.galleryAlbumTitle}>{album.title}</span>
                <span className={styles.galleryAlbumCount}>{album.images.length} images</span>
              </div>
              <div className={styles.galleryAlbumActions}>
                <button className="btn btn-outline" style={{ fontSize: '0.72rem', padding: '6px 14px' }} onClick={() => setSelectedAlbum(album)}>Manage</button>
                <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => deleteAlbum(album.id)}>{icons.trash}</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className={styles.addImgRow}>
            <input className="form-input" placeholder="Image URL" value={newImgUrl} onChange={e => setNewImgUrl(e.target.value)} style={{ flex: 2 }} />
            <input className="form-input" placeholder="Caption" value={newImgCaption} onChange={e => setNewImgCaption(e.target.value)} style={{ flex: 1 }} />
            <button className="btn btn-primary" onClick={handleAddImage}>Add Image</button>
          </div>
          <div className={styles.galleryImgGrid}>
            {currentAlbum.images.map(img => (
              <div key={img.id} className={styles.galleryImgCard}>
                <img src={img.src} alt={img.caption} />
                <div className={styles.galleryImgOverlay}>
                  <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => deleteImageFromAlbum(currentAlbum.id, img.id)}>{icons.trash}</button>
                </div>
                <p className={styles.galleryImgCaption}>{img.caption}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence>
        {showAlbumForm && (
          <Modal title="New Album" onClose={() => setShowAlbumForm(false)}>
            <div className="form-group"><label className="form-label">Album Title *</label><input className="form-input" value={newAlbum.title} onChange={e => setNewAlbum(a => ({...a, title: e.target.value}))} /></div>
            <div className="form-group"><label className="form-label">Cover Image URL</label><input className="form-input" value={newAlbum.coverImage} onChange={e => setNewAlbum(a => ({...a, coverImage: e.target.value}))} /></div>
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={handleAddAlbum}>Create Album</button>
              <button className="btn btn-outline" onClick={() => setShowAlbumForm(false)}>Cancel</button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ——— Catalogue Panel ——— */
function CataloguePanel() {
  const { tours, addTour, updateTour, deleteTour } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const emptyTour = { place: '', location: '', description: '', image: '', duration: 5, price: 20000, offer: '', offerExpiry: '', category: 'Nature', featured: false, itinerary: [], inclusions: [], exclusions: [], cancellationPolicy: '', priceBreakdown: [] };
  const [form, setForm] = useState(emptyTour);

  const open = (tour = null) => {
    if (tour) { setEditing(tour); setForm({ ...tour, offer: tour.offer || '' }); } else { setEditing(null); setForm(emptyTour); }
    setShowForm(true);
  };

  const handleSave = () => {
    const tourData = { ...form, offer: form.offer ? Number(form.offer) : null, price: Number(form.price), duration: Number(form.duration) };
    if (editing) { updateTour(editing.id, tourData); } else { addTour(tourData); }
    setShowForm(false);
  };

  return (
    <div>
      <div className={styles.panelTopBar}>
        <h2 className={styles.panelTitle}>Tour Packages</h2>
        <button className="btn btn-primary" onClick={() => open()}>+ Add Tour</button>
      </div>
      <div className={styles.itemList}>
        {tours.map(tour => (
          <div key={tour.id} className={styles.listItem}>
            <div className={styles.listItemImg}><img src={tour.image} alt={tour.place} /></div>
            <div className={styles.listItemInfo}>
              <div className={styles.listItemTitle}>{tour.place}</div>
              <div className={styles.listItemSub}>{tour.location} · {tour.duration} days · ₹{tour.price.toLocaleString()} {tour.offer ? `· ${tour.offer}% OFF` : ''}</div>
            </div>
            <div className={styles.listItemBadge}>
              <span className={`badge badge-gold`}>{tour.category}</span>
              {tour.featured && <span className="badge badge-ruby" style={{ marginLeft: 6 }}>Featured</span>}
            </div>
            <div className={styles.listItemActions}>
              <button className={styles.actionBtn} onClick={() => open(tour)}>{icons.edit}</button>
              <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => deleteTour(tour.id)}>{icons.trash}</button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showForm && (
          <Modal title={editing ? 'Edit Tour' : 'New Tour Package'} onClose={() => setShowForm(false)}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group"><label className="form-label">Place Name *</label><input className="form-input" value={form.place} onChange={e => setForm(f => ({...f, place: e.target.value}))} /></div>
              <div className="form-group"><label className="form-label">Location</label><input className="form-input" value={form.location} onChange={e => setForm(f => ({...f, location: e.target.value}))} /></div>
              <div className="form-group"><label className="form-label">Duration (days)</label><input className="form-input" type="number" min={1} value={form.duration} onChange={e => setForm(f => ({...f, duration: e.target.value}))} /></div>
              <div className="form-group"><label className="form-label">Base Price (₹)</label><input className="form-input" type="number" value={form.price} onChange={e => setForm(f => ({...f, price: e.target.value}))} /></div>
              <div className="form-group"><label className="form-label">Offer % (optional)</label><input className="form-input" type="number" min={0} max={100} value={form.offer} onChange={e => setForm(f => ({...f, offer: e.target.value}))} /></div>
              <div className="form-group"><label className="form-label">Offer Expiry</label><input className="form-input" type="date" value={form.offerExpiry || ''} onChange={e => setForm(f => ({...f, offerExpiry: e.target.value}))} /></div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-input" value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))}>
                  {['Nature', 'Heritage', 'Adventure', 'Beach', 'Spiritual'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group" style={{ justifyContent: 'flex-end' }}>
                <label className="form-label">Featured</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                  <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm(f => ({...f, featured: e.target.checked}))} />
                  <label htmlFor="featured" style={{ fontSize: '0.85rem' }}>Show as featured</label>
                </div>
              </div>
            </div>
            <div className="form-group"><label className="form-label">Image URL</label><input className="form-input" value={form.image} onChange={e => setForm(f => ({...f, image: e.target.value}))} /></div>
            <div className="form-group"><label className="form-label">Description</label><textarea className="form-input form-textarea" rows={3} value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} /></div>
            <div className="form-group"><label className="form-label">Cancellation Policy</label><textarea className="form-input form-textarea" rows={2} value={form.cancellationPolicy} onChange={e => setForm(f => ({...f, cancellationPolicy: e.target.value}))} /></div>
            <div className="form-group">
              <label className="form-label">Inclusions (comma separated)</label>
              <input className="form-input" value={Array.isArray(form.inclusions) ? form.inclusions.join(', ') : form.inclusions} onChange={e => setForm(f => ({...f, inclusions: e.target.value.split(',').map(s => s.trim())}))} />
            </div>
            <div className="form-group">
              <label className="form-label">Exclusions (comma separated)</label>
              <input className="form-input" value={Array.isArray(form.exclusions) ? form.exclusions.join(', ') : form.exclusions} onChange={e => setForm(f => ({...f, exclusions: e.target.value.split(',').map(s => s.trim())}))} />
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={handleSave}>Save Tour</button>
              <button className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ——— Reviews Panel ——— */
function ReviewsPanel() {
  const { reviews, deleteReview, toggleReviewVisibility } = useApp();
  return (
    <div>
      <h2 className={styles.panelTitle}>Review Moderation</h2>
      <p className={styles.panelDesc}>{reviews.length} total reviews · {reviews.filter(r => r.visible).length} visible</p>
      <div className={styles.itemList}>
        {reviews.map(r => (
          <div key={r.id} className={`${styles.listItem} ${!r.visible ? styles.hiddenItem : ''}`}>
            <div className={styles.reviewAvatar}>{r.name.charAt(0)}</div>
            <div className={styles.listItemInfo}>
              <div className={styles.listItemTitle}>{r.name} <span style={{ fontWeight: 400, color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>— {r.tour || 'General'}</span></div>
              <div className={styles.listItemSub}>{r.comment.slice(0, 90)}...</div>
              <div className={styles.listItemSub}>{r.date} · {'⭐'.repeat(r.rating || 5)}</div>
            </div>
            <div className={styles.listItemBadge}>
              <span className={`badge ${r.visible ? 'badge-gold' : 'badge-navy'}`}>{r.visible ? 'Visible' : 'Hidden'}</span>
            </div>
            <div className={styles.listItemActions}>
              <button className={styles.actionBtn} onClick={() => toggleReviewVisibility(r.id)} title="Toggle visibility">
                {r.visible ? icons.eye : icons.eyeOff}
              </button>
              <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => deleteReview(r.id)}>{icons.trash}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ——— Theme Panel ——— */
function ThemePanel() {
  const { theme, toggleTheme, primaryColor, setPrimaryColor } = useApp();
  const presets = ['#b8860b', '#d4a017', '#8b6508', '#1c3b5a', '#8b0000', '#2d6a4f', '#6b21a8', '#0f766e'];

  return (
    <div>
      <h2 className={styles.panelTitle}>Theme Configuration</h2>
      <div className={styles.themeGrid}>
        <div className={styles.themeCard}>
          <h4 className={styles.themeCardTitle}>Color Mode</h4>
          <div className={styles.modeRow}>
            <button className={`${styles.modeBtn} ${theme === 'light' ? styles.modeBtnActive : ''}`} onClick={() => theme !== 'light' && toggleTheme()}>
              ☀ Light Mode
            </button>
            <button className={`${styles.modeBtn} ${theme === 'dark' ? styles.modeBtnActive : ''}`} onClick={() => theme !== 'dark' && toggleTheme()}>
              🌙 Dark Mode
            </button>
          </div>
        </div>

        <div className={styles.themeCard}>
          <h4 className={styles.themeCardTitle}>Primary Accent Color</h4>
          <div className={styles.colorPresets}>
            {presets.map(c => (
              <button
                key={c}
                className={`${styles.colorDot} ${primaryColor === c ? styles.colorDotActive : ''}`}
                style={{ background: c }}
                onClick={() => setPrimaryColor(c)}
              />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16, alignItems: 'center' }}>
            <label className="form-label" style={{ margin: 0 }}>Custom:</label>
            <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} style={{ width: 44, height: 36, border: '1.5px solid var(--color-border)', borderRadius: 6, cursor: 'pointer' }} />
            <span style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{primaryColor}</span>
          </div>
          <div style={{ marginTop: 20, padding: 16, background: primaryColor, borderRadius: 8, color: '#fff', fontWeight: 600, fontSize: '0.85rem', textAlign: 'center' }}>
            Preview: This is your accent color
          </div>
        </div>
      </div>
    </div>
  );
}

/* ——— Main Dashboard ——— */
const tabs = [
  { key: 'overview', label: 'Overview', icon: icons.dashboard },
  { key: 'announcements', label: 'Announcements', icon: icons.announcements },
  { key: 'gallery', label: 'Gallery', icon: icons.gallery },
  { key: 'catalogue', label: 'Catalogue', icon: icons.catalogue },
  { key: 'reviews', label: 'Reviews', icon: icons.reviews },
  { key: 'theme', label: 'Theme', icon: icons.theme },
];

export default function AdminDashboard() {
  const { adminLogout, tours, reviews, albums, announcements } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const handleLogout = () => {
    adminLogout();
    navigate('/');
  };

  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <span className={styles.sidebarLogoIcon}>✦</span>
          <div>
            <div className={styles.sidebarLogoText}>Royal <em>Odyssey</em></div>
            <div className={styles.sidebarLogoSub}>Admin Panel</div>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`${styles.sidebarNavBtn} ${activeTab === tab.key ? styles.sidebarNavActive : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <span className={styles.sidebarNavIcon}>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className={styles.sidebarBottom}>
          <button className={styles.sidebarNavBtn} onClick={() => navigate('/')}>
            <span className={styles.sidebarNavIcon}>⊙</span>
            <span>View Site</span>
          </button>
          <button className={`${styles.sidebarNavBtn} ${styles.logoutBtn}`} onClick={handleLogout}>
            <span className={styles.sidebarNavIcon}>→</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.topBar}>
          <h1 className={styles.topBarTitle}>
            {tabs.find(t => t.key === activeTab)?.label}
          </h1>
          <div className={styles.topBarRight}>
            <span className={styles.adminBadge}>Administrator</span>
          </div>
        </div>

        <div className={styles.content}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === 'overview' && <OverviewPanel tours={tours} reviews={reviews} albums={albums} announcements={announcements} />}
              {activeTab === 'announcements' && <AnnouncementsPanel />}
              {activeTab === 'gallery' && <GalleryPanel />}
              {activeTab === 'catalogue' && <CataloguePanel />}
              {activeTab === 'reviews' && <ReviewsPanel />}
              {activeTab === 'theme' && <ThemePanel />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

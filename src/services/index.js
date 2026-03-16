import api from './api'

// ── Catalog ──────────────────────────────────────────────
export const catalogService = {
  getAll:    ()         => api.get('/tours'),
  getOne:    (id)       => api.get(`/tours/${id}`),
  create:    (data)     => api.post('/tours', data),
  update:    (id, data) => api.put(`/tours/${id}`, data),
  remove:    (id)       => api.delete(`/tours/${id}`),
}

// ── Gallery ───────────────────────────────────────────────
export const galleryService = {
  getAllAlbums:  ()              => api.get('/albums'),
  getAlbum:     (id)            => api.get(`/albums/${id}`),
  createAlbum:  (data)          => api.post('/albums', data),
  deleteAlbum:  (id)            => api.delete(`/albums/${id}`),
  addPhoto:     (albumId, url)  => api.post(`/albums/${albumId}/photos`, { url }),
  deletePhoto:  (albumId, idx)  => api.delete(`/albums/${albumId}/photos/${idx}`),
}

// ── Announcements ─────────────────────────────────────────
export const announcementService = {
  getAll:  ()         => api.get('/announcements'),
  create:  (data)     => api.post('/announcements', data),
  update:  (id, data) => api.put(`/announcements/${id}`, data),
  remove:  (id)       => api.delete(`/announcements/${id}`),
}

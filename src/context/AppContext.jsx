// context/AppContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  mockAnnouncements, mockTours, mockAlbums, mockReviews
} from '../services/mockData';

const AppContext = createContext(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
};

export const AppProvider = ({ children }) => {
  // ——— Theme ———
  const [theme, setTheme] = useState(() => localStorage.getItem('ro_theme') || 'light');
  const [primaryColor, setPrimaryColor] = useState(() => localStorage.getItem('ro_primary') || '#b8860b');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ro_theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', primaryColor);
    // Derive light/dark variants
    localStorage.setItem('ro_primary', primaryColor);
  }, [primaryColor]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  // ——— Admin Auth ———
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('ro_admin') === 'true');

  const adminLogin = (username, password) => {
    if (username === 'admin' && password === 'royal2024') {
      setIsAdmin(true);
      localStorage.setItem('ro_admin', 'true');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('ro_admin');
  };

  // ——— Data State ———
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [tours, setTours] = useState(mockTours);
  const [albums, setAlbums] = useState(mockAlbums);
  const [reviews, setReviews] = useState(mockReviews);

  // ——— Image Likes & Views (persisted) ———
  const [imageLikes, setImageLikes] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ro_likes') || '{}'); } catch { return {}; }
  });
  const [imageViews, setImageViews] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ro_views') || '{}'); } catch { return {}; }
  });

  const toggleLike = useCallback((imageId) => {
    setImageLikes(prev => {
      const updated = { ...prev, [imageId]: !prev[imageId] };
      localStorage.setItem('ro_likes', JSON.stringify(updated));
      return updated;
    });
    // Update albums image likes count
    setAlbums(prev => prev.map(album => ({
      ...album,
      images: album.images.map(img =>
        img.id === imageId
          ? { ...img, likes: img.likes + (imageLikes[imageId] ? -1 : 1) }
          : img
      )
    })));
  }, [imageLikes]);

  const incrementView = useCallback((imageId) => {
    if (!imageViews[imageId]) {
      setImageViews(prev => {
        const updated = { ...prev, [imageId]: true };
        localStorage.setItem('ro_views', JSON.stringify(updated));
        return updated;
      });
      setAlbums(prev => prev.map(album => ({
        ...album,
        images: album.images.map(img =>
          img.id === imageId ? { ...img, views: img.views + 1 } : img
        )
      })));
    }
  }, [imageViews]);

  // ——— Review Actions ———
  const addReview = (review) => {
    const newReview = { ...review, id: Date.now(), date: new Date().toISOString().split('T')[0], visible: true };
    setReviews(prev => [newReview, ...prev]);
  };

  const deleteReview = (id) => setReviews(prev => prev.filter(r => r.id !== id));
  const toggleReviewVisibility = (id) => setReviews(prev => prev.map(r => r.id === id ? { ...r, visible: !r.visible } : r));

  // ——— Announcement Actions ———
  const addAnnouncement = (ann) => setAnnouncements(prev => [{ ...ann, id: Date.now(), active: true }, ...prev]);
  const updateAnnouncement = (id, data) => setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, ...data } : a));
  const deleteAnnouncement = (id) => setAnnouncements(prev => prev.filter(a => a.id !== id));

  // ——— Tour Actions ———
  const addTour = (tour) => setTours(prev => [{ ...tour, id: Date.now(), createdAt: new Date().toISOString().split('T')[0] }, ...prev]);
  const updateTour = (id, data) => setTours(prev => prev.map(t => t.id === id ? { ...t, ...data } : t));
  const deleteTour = (id) => setTours(prev => prev.filter(t => t.id !== id));

  // ——— Album / Gallery Actions ———
  const addAlbum = (album) => setAlbums(prev => [...prev, { ...album, id: Date.now(), images: [] }]);
  const deleteAlbum = (id) => setAlbums(prev => prev.filter(a => a.id !== id));
  const addImageToAlbum = (albumId, image) => {
    setAlbums(prev => prev.map(a =>
      a.id === albumId
        ? { ...a, images: [...a.images, { ...image, id: Date.now(), likes: 0, views: 0 }], imageCount: a.images.length + 1 }
        : a
    ));
  };
  const deleteImageFromAlbum = (albumId, imageId) => {
    setAlbums(prev => prev.map(a =>
      a.id === albumId
        ? { ...a, images: a.images.filter(i => i.id !== imageId), imageCount: a.images.length - 1 }
        : a
    ));
  };

  const value = {
    theme, toggleTheme, primaryColor, setPrimaryColor,
    isAdmin, adminLogin, adminLogout,
    announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement,
    tours, addTour, updateTour, deleteTour,
    albums, addAlbum, deleteAlbum, addImageToAlbum, deleteImageFromAlbum,
    reviews, addReview, deleteReview, toggleReviewVisibility,
    imageLikes, imageViews, toggleLike, incrementView,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

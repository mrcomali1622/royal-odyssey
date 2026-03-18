// components/Gallery/ImageModal.jsx
import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import styles from './ImageModal.module.css';

const HeartFilled = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const HeartOutline = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const ChevLeft = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
);
const ChevRight = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
);

export default function ImageModal({ image, images, onClose, onNavigate }) {
  const { toggleLike, imageLikes } = useApp();
  const liked = imageLikes[image?.id];
  const currentIndex = images?.findIndex(i => i.id === image?.id) ?? -1;

  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(images[currentIndex - 1]);
    if (e.key === 'ArrowRight' && currentIndex < images.length - 1) onNavigate(images[currentIndex + 1]);
  }, [onClose, onNavigate, currentIndex, images]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  if (!image) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.modal}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Close */}
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>

          {/* Image */}
          <div className={styles.imageWrap}>
            <motion.img
              key={image.id}
              src={image.src}
              alt={image.caption}
              className={styles.image}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
            />
          </div>

          {/* Footer bar */}
          <div className={styles.bar}>
            <div className={styles.caption}>
              {image.caption && <p className={styles.captionText}>{image.caption}</p>}
              <div className={styles.stats}>
                <span className={styles.statItem}>
                  <EyeIcon /> {image.views}
                </span>
                <button
                  className={`${styles.likeBtn} ${liked ? styles.liked : ''}`}
                  onClick={() => toggleLike(image.id)}
                >
                  {liked ? <HeartFilled /> : <HeartOutline />}
                  <span>{image.likes + (liked ? 1 : 0)}</span>
                </button>
              </div>
            </div>

            {/* Navigation */}
            {images && images.length > 1 && (
              <div className={styles.nav}>
                <button
                  className={styles.navBtn}
                  onClick={() => currentIndex > 0 && onNavigate(images[currentIndex - 1])}
                  disabled={currentIndex === 0}
                >
                  <ChevLeft />
                </button>
                <span className={styles.navCount}>{currentIndex + 1} / {images.length}</span>
                <button
                  className={styles.navBtn}
                  onClick={() => currentIndex < images.length - 1 && onNavigate(images[currentIndex + 1])}
                  disabled={currentIndex === images.length - 1}
                >
                  <ChevRight />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

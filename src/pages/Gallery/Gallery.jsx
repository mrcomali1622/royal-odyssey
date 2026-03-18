// pages/Gallery/Gallery.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import ImageModal from '../../components/Gallery/ImageModal';
import { AlbumSkeleton } from '../../components/Common/LoadingSkeleton';
import styles from './Gallery.module.css';

const HeartFilled = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const HeartOutline = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);

function AlbumGrid({ albums, onSelect, loading }) {
  return (
    <div className={styles.albumGrid}>
      {loading
        ? Array(4).fill(0).map((_, i) => <AlbumSkeleton key={i} />)
        : albums.map((album, i) => (
          <motion.div
            key={album.id}
            className={styles.albumCard}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            onClick={() => onSelect(album)}
          >
            <div className={styles.albumImgWrap}>
              <img src={album.coverImage} alt={album.title} className={styles.albumImg} loading="lazy" />
              <div className={styles.albumOverlay}>
                <span className={styles.albumViewBtn}>View Album</span>
              </div>
            </div>
            <div className={styles.albumMeta}>
              <h3 className={styles.albumTitle}>{album.title}</h3>
              <span className={styles.albumCount}>{album.imageCount} Photos</span>
            </div>
          </motion.div>
        ))
      }
    </div>
  );
}

function ImageGrid({ album, onImageClick }) {
  const { toggleLike, imageLikes, incrementView } = useApp();

  const handleClick = (image) => {
    incrementView(image.id);
    onImageClick(image);
  };

  return (
    <div className={styles.imageGrid}>
      {album.images.map((img, i) => {
        const liked = imageLikes[img.id];
        return (
          <motion.div
            key={img.id}
            className={styles.imageCard}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.07, duration: 0.45 }}
          >
            <div className={styles.imageWrap} onClick={() => handleClick(img)}>
              <img src={img.src} alt={img.caption} className={styles.image} loading="lazy" />
              <div className={styles.imageOverlay}>
                <span className={styles.expandHint}>⤢ View</span>
              </div>
            </div>

            <div className={styles.imageBar}>
              <p className={styles.imageCaption}>{img.caption}</p>
              <div className={styles.imageActions}>
                <span className={styles.viewCount}>
                  <EyeIcon /> {img.views}
                </span>
                <button
                  className={`${styles.likeBtn} ${liked ? styles.liked : ''}`}
                  onClick={(e) => { e.stopPropagation(); toggleLike(img.id); }}
                >
                  {liked ? <HeartFilled /> : <HeartOutline />}
                  <span>{img.likes + (liked ? 1 : 0)}</span>
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function GalleryPage() {
  const { albums } = useApp();
  const [loading, setLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="page-wrapper">
      <div className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Visual Stories</span>
            <div className="gold-divider" style={{ marginTop: 12 }} />
            <h1 className={`display-lg ${styles.heroTitle}`} style={{ marginTop: 16 }}>
              Our <em>Gallery</em>
            </h1>
            <p className={styles.heroSubtitle}>
              A curated collection of moments captured across India's most breathtaking destinations.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <AnimatePresence mode="wait">
            {!selectedAlbum ? (
              <motion.div
                key="albums"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AlbumGrid albums={albums} onSelect={setSelectedAlbum} loading={loading} />
              </motion.div>
            ) : (
              <motion.div
                key="images"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className={styles.albumHeader}>
                  <button
                    className={styles.backBtn}
                    onClick={() => setSelectedAlbum(null)}
                  >
                    <BackIcon /> Back to Albums
                  </button>
                  <div>
                    <h2 className={styles.albumPageTitle}>{selectedAlbum.title}</h2>
                    <p className={styles.albumPageCount}>{selectedAlbum.images.length} photographs</p>
                  </div>
                </div>
                <ImageGrid
                  album={selectedAlbum}
                  onImageClick={setModalImage}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {modalImage && (
        <ImageModal
          image={modalImage}
          images={selectedAlbum?.images}
          onClose={() => setModalImage(null)}
          onNavigate={setModalImage}
        />
      )}
    </div>
  );
}

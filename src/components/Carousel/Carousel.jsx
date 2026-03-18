// components/Carousel/Carousel.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './Carousel.module.css';

const ChevronLeft = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
);
const ChevronRight = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
);

const tagColorMap = {
  'HOT DEAL': 'badge-ruby',
  'UPCOMING EVENT': 'badge-navy',
  'NEW': 'badge-gold',
  'OFFER': 'badge-ruby',
  'EVENT': 'badge-navy',
  'ANNOUNCEMENT': 'badge-gold',
};

const variants = {
  enter: (dir) => ({ x: dir > 0 ? '60%' : '-60%', opacity: 0, scale: 0.96 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir) => ({ x: dir > 0 ? '-60%' : '60%', opacity: 0, scale: 0.96 }),
};

export default function Carousel({ slides = [] }) {
  const [[index, direction], setIndex] = useState([0, 0]);
  const [paused, setPaused] = useState(false);

  const paginate = useCallback((dir) => {
    setIndex(([i]) => [(i + dir + slides.length) % slides.length, dir]);
  }, [slides.length]);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const timer = setInterval(() => paginate(1), 5500);
    return () => clearInterval(timer);
  }, [paused, paginate, slides.length]);

  if (!slides.length) return null;

  const slide = slides[index];

  return (
    <div
      className={styles.carousel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={index}
          className={styles.slide}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background Image */}
          <div className={styles.bgWrap}>
            <motion.img
              src={slide.image}
              alt={slide.title}
              className={styles.bgImg}
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 7, ease: 'linear' }}
            />
            <div className={styles.overlay} />
          </div>

          {/* Content */}
          <div className={styles.content}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className={styles.contentInner}
            >
              {slide.tag && (
                <span className={`badge ${tagColorMap[slide.tag] || 'badge-gold'} ${styles.tag}`}>
                  {slide.tag}
                </span>
              )}
              <h1 className={`display-xl ${styles.title}`}>{slide.title}</h1>
              <p className={styles.subtitle}>{slide.subtitle}</p>
              <p className={styles.description}>{slide.description}</p>
              <div className={styles.cta}>
                <Link to="/catalogue" className="btn btn-primary">Explore Tours</Link>
                <Link to="/about" className="btn btn-ghost">Learn More</Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => paginate(-1)} aria-label="Previous">
        <ChevronLeft />
      </button>
      <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => paginate(1)} aria-label="Next">
        <ChevronRight />
      </button>

      {/* Dots */}
      <div className={styles.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
            onClick={() => setIndex([i, i > index ? 1 : -1])}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      {!paused && (
        <motion.div
          key={`progress-${index}`}
          className={styles.progressBar}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 5.5, ease: 'linear' }}
        />
      )}
    </div>
  );
}

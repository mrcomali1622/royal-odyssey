// components/Cards/TourCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './TourCard.module.css';

const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
);
const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);

export default function TourCard({ tour, index = 0 }) {
  const navigate = useNavigate();
  const discountedPrice = tour.offer
    ? Math.round(tour.price * (1 - tour.offer / 100))
    : null;

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      onClick={() => navigate(`/catalogue/${tour.id}`)}
    >
      {/* Image */}
      <div className={styles.imageWrap}>
        <img src={tour.image} alt={tour.place} className={styles.image} loading="lazy" />
        <div className={styles.imageOverlay} />

        {/* Offer Badge */}
        {tour.offer && (
          <div className={styles.offerBadge}>
            <span>{tour.offer}% OFF</span>
          </div>
        )}

        {/* Category */}
        <span className={styles.category}>{tour.category}</span>
      </div>

      {/* Body */}
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <LocationIcon /> {tour.location}
          </span>
          <span className={styles.metaItem}>
            <CalendarIcon /> {tour.duration} Days
          </span>
        </div>

        <h3 className={styles.title}>{tour.place}</h3>
        <p className={styles.description}>{tour.description}</p>

        <div className={styles.footer}>
          <div className={styles.pricing}>
            {discountedPrice ? (
              <>
                <span className={styles.priceFinal}>₹{discountedPrice.toLocaleString()}</span>
                <span className={styles.priceOriginal}>₹{tour.price.toLocaleString()}</span>
              </>
            ) : (
              <span className={styles.priceFinal}>₹{tour.price.toLocaleString()}</span>
            )}
            <span className={styles.perPerson}>/ person</span>
          </div>

          <button className={`btn btn-primary ${styles.viewBtn}`}>
            View Details
          </button>
        </div>

        {tour.offerExpiry && tour.offer && (
          <p className={styles.expiry}>
            ⏳ Offer ends {new Date(tour.offerExpiry).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        )}
      </div>
    </motion.div>
  );
}

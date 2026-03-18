// components/Cards/ReviewCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import styles from './ReviewCard.module.css';

const StarIcon = ({ filled }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

export default function ReviewCard({ review, index = 0 }) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <div className={styles.quote}>"</div>
      <p className={styles.comment}>{review.comment}</p>

      <div className={styles.stars}>
        {[1,2,3,4,5].map(s => (
          <span key={s} className={s <= (review.rating || 5) ? styles.starFilled : styles.starEmpty}>
            <StarIcon filled={s <= (review.rating || 5)} />
          </span>
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.avatar}>
          {review.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className={styles.name}>{review.name}</p>
          {review.tour && <p className={styles.tour}>{review.tour}</p>}
          <p className={styles.date}>
            {new Date(review.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

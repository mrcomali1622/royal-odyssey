// components/Common/LoadingSkeleton.jsx
import React from 'react';
import styles from './LoadingSkeleton.module.css';

export function TourCardSkeleton() {
  return (
    <div className={styles.tourCard}>
      <div className={`${styles.img} skeleton`} />
      <div className={styles.body}>
        <div className={`${styles.line} ${styles.short} skeleton`} />
        <div className={`${styles.line} ${styles.full} skeleton`} />
        <div className={`${styles.line} ${styles.mid} skeleton`} />
        <div className={`${styles.line} ${styles.mid} skeleton`} />
        <div className={styles.footer}>
          <div className={`${styles.price} skeleton`} />
          <div className={`${styles.btn} skeleton`} />
        </div>
      </div>
    </div>
  );
}

export function AlbumSkeleton() {
  return (
    <div className={styles.album}>
      <div className={`${styles.albumImg} skeleton`} />
      <div className={`${styles.line} ${styles.mid} skeleton`} style={{ margin: '12px 8px 4px' }} />
    </div>
  );
}

export function ReviewSkeleton() {
  return (
    <div className={styles.review}>
      <div className={`${styles.line} ${styles.full} skeleton`} />
      <div className={`${styles.line} ${styles.full} skeleton`} />
      <div className={`${styles.line} ${styles.mid} skeleton`} />
      <div className={styles.avatarRow}>
        <div className={`${styles.avatar} skeleton`} />
        <div>
          <div className={`${styles.line} ${styles.short} skeleton`} />
          <div className={`${styles.line} ${styles.xshort} skeleton`} style={{ marginTop: 6 }} />
        </div>
      </div>
    </div>
  );
}

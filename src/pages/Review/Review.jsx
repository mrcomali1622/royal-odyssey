// pages/Review/Review.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import ReviewCard from '../../components/Cards/ReviewCard';
import styles from './Review.module.css';

const StarBtn = ({ filled, onClick }) => (
  <button type="button" onClick={onClick} className={`${styles.starBtn} ${filled ? styles.starFilled : ''}`}>
    <svg width="28" height="28" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  </button>
);

export default function ReviewPage() {
  const { reviews, addReview } = useApp();
  const [form, setForm] = useState({ name: '', email: '', phone: '', comment: '', rating: 5 });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const visibleReviews = reviews.filter(r => r.visible);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    addReview(form);
    setLoading(false);
    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', comment: '', rating: 5 });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <div className={styles.hero}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="section-label">Testimonials</span>
            <div className="gold-divider" style={{ marginTop: 12 }} />
            <h1 className={`display-lg ${styles.heroTitle}`} style={{ marginTop: 16 }}>
              Traveller <em>Reviews</em>
            </h1>
            <p className={styles.heroSub}>
              Real stories from real adventurers — unfiltered and from the heart.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div className={styles.layout}>
            {/* Reviews List */}
            <div className={styles.reviewsList}>
              <div className={styles.reviewsHeader}>
                <h2 className={styles.reviewsTitle}>
                  {visibleReviews.length} <em>Reviews</em>
                </h2>
                <div className={styles.avgRating}>
                  <span className={styles.avgNum}>5.0</span>
                  <div className={styles.stars}>
                    {[1,2,3,4,5].map(s => (
                      <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill="var(--color-primary)" stroke="var(--color-primary)" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    ))}
                  </div>
                  <span className={styles.avgLabel}>Average Rating</span>
                </div>
              </div>

              <div className={styles.reviewsGrid}>
                {visibleReviews.map((review, i) => (
                  <ReviewCard key={review.id} review={review} index={i} />
                ))}
              </div>
            </div>

            {/* Form */}
            <div className={styles.formCol}>
              <div className={styles.formCard}>
                <h3 className={styles.formTitle}>Share Your Experience</h3>
                <div className="gold-divider" style={{ marginBottom: 24 }} />

                {submitted && (
                  <div className={styles.successBanner}>
                    ✓ Thank you! Your review has been submitted.
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Rating *</label>
                    <div className={styles.ratingRow}>
                      {[1,2,3,4,5].map(s => (
                        <StarBtn
                          key={s}
                          filled={s <= form.rating}
                          onClick={() => setForm(f => ({ ...f, rating: s }))}
                        />
                      ))}
                      <span className={styles.ratingLabel}>{form.rating} / 5</span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input
                      className="form-input"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      className="form-input"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Review *</label>
                    <textarea
                      className="form-input form-textarea"
                      placeholder="Share your experience with Royal Odyssey..."
                      value={form.comment}
                      onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
                      required
                      rows={5}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Submit Review ✦'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

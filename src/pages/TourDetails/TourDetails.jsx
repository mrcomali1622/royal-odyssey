// pages/TourDetails/TourDetails.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import styles from './TourDetails.module.css';

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
);
const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);
const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
);

export default function TourDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tours } = useApp();
  const tour = tours.find(t => t.id === parseInt(id));
  const [activeTab, setActiveTab] = useState('itinerary');
  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', phone: '', date: '', people: 2, message: '' });
  const [inquirySent, setInquirySent] = useState(false);

  if (!tour) {
    return (
      <div className="page-wrapper flex-center" style={{ minHeight: '80vh', flexDirection: 'column', gap: 16 }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--color-text-muted)' }}>Tour not found</p>
        <button className="btn btn-primary" onClick={() => navigate('/catalogue')}>Browse Packages</button>
      </div>
    );
  }

  const discountedPrice = tour.offer ? Math.round(tour.price * (1 - tour.offer / 100)) : null;

  const handleInquiry = (e) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => setInquirySent(false), 4000);
    setInquiryForm({ name: '', email: '', phone: '', date: '', people: 2, message: '' });
  };

  const tabs = ['itinerary', 'pricing', 'inclusions', 'policy'];

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <div className={styles.hero}>
        <img src={tour.image} alt={tour.place} className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <div className="container">
            <button className={styles.backBtn} onClick={() => navigate('/catalogue')}>
              <BackIcon /> All Packages
            </button>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {tour.category && <span className={`badge badge-gold`} style={{ marginBottom: 16, display: 'inline-block' }}>{tour.category}</span>}
              <h1 className={`display-lg ${styles.heroTitle}`}>{tour.place}</h1>
              <p className={styles.heroLocation}>{tour.location}</p>
              <div className={styles.heroMeta}>
                <span>⊙ {tour.location}</span>
                <span>📅 {tour.duration} Days / {tour.duration - 1} Nights</span>
                {tour.offer && <span className={styles.heroDeal}>🏷 {tour.offer}% OFF</span>}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="section">
        <div className="container">
          <div className={styles.layout}>
            {/* Main Content */}
            <div className={styles.main}>
              {/* Description */}
              <div className={styles.descBlock}>
                <p className={styles.desc}>{tour.description}</p>
              </div>

              {/* Tabs */}
              <div className={styles.tabs}>
                {tabs.map(tab => (
                  <button
                    key={tab}
                    className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={styles.tabContent}
              >
                {/* Itinerary */}
                {activeTab === 'itinerary' && (
                  <div className={styles.itinerary}>
                    {tour.itinerary.map((day, i) => (
                      <motion.div
                        key={i}
                        className={styles.dayCard}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                      >
                        <div className={styles.dayNum}>
                          <span>Day</span>
                          <strong>{day.day}</strong>
                        </div>
                        <div className={styles.dayInfo}>
                          <h4 className={styles.dayTitle}>{day.title}</h4>
                          <p className={styles.dayDesc}>{day.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Pricing */}
                {activeTab === 'pricing' && (
                  <div className={styles.pricing}>
                    <div className={styles.priceTable}>
                      {tour.priceBreakdown.map((item, i) => (
                        <div key={i} className={styles.priceRow}>
                          <span className={styles.priceItem}>{item.item}</span>
                          <span className={styles.priceAmount}>₹{item.amount.toLocaleString()}</span>
                        </div>
                      ))}
                      <div className={`${styles.priceRow} ${styles.priceTotal}`}>
                        <span>Total (per person)</span>
                        <span>₹{tour.price.toLocaleString()}</span>
                      </div>
                      {tour.offer && (
                        <div className={`${styles.priceRow} ${styles.priceSaved}`}>
                          <span>You Save ({tour.offer}% Off)</span>
                          <span>- ₹{(tour.price - discountedPrice).toLocaleString()}</span>
                        </div>
                      )}
                      {discountedPrice && (
                        <div className={`${styles.priceRow} ${styles.priceFinal}`}>
                          <span>Final Price</span>
                          <span>₹{discountedPrice.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                    {tour.offerExpiry && (
                      <p className={styles.priceNote}>
                        ⏳ Offer valid until {new Date(tour.offerExpiry).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    )}
                  </div>
                )}

                {/* Inclusions */}
                {activeTab === 'inclusions' && (
                  <div className={styles.inExGrid}>
                    <div className={styles.inEx}>
                      <h4 className={styles.inExTitle} style={{ color: 'var(--color-primary)' }}>✦ Inclusions</h4>
                      <ul className={styles.inExList}>
                        {tour.inclusions.map((item, i) => (
                          <li key={i} className={styles.inExItem}>
                            <span className={styles.checkIcon}><CheckIcon /></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.inEx}>
                      <h4 className={styles.inExTitle} style={{ color: 'var(--color-accent)' }}>✕ Exclusions</h4>
                      <ul className={styles.inExList}>
                        {tour.exclusions.map((item, i) => (
                          <li key={i} className={styles.inExItem}>
                            <span className={styles.xIcon}><XIcon /></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Policy */}
                {activeTab === 'policy' && (
                  <div className={styles.policy}>
                    <h4 className={styles.policyTitle}>Cancellation & Return Policy</h4>
                    <p className={styles.policyText}>{tour.cancellationPolicy}</p>
                    <div className={styles.policyPoints}>
                      {[
                        'All cancellation requests must be submitted in writing.',
                        'Refunds are processed within 7–10 business days.',
                        'Tour date changes are subject to availability.',
                        'Force majeure events are handled on a case-by-case basis.',
                      ].map((p, i) => (
                        <div key={i} className={styles.policyPoint}>
                          <span className={styles.pointNum}>{i + 1}</span>
                          <p>{p}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className={styles.sidebar}>
              {/* Price Card */}
              <div className={styles.priceCard}>
                <div className={styles.priceCardHeader}>
                  {discountedPrice ? (
                    <>
                      <div className={styles.priceCardFinal}>₹{discountedPrice.toLocaleString()}</div>
                      <div className={styles.priceCardOrig}>₹{tour.price.toLocaleString()}</div>
                      <div className={`badge badge-ruby`} style={{ marginTop: 8, display: 'inline-block' }}>{tour.offer}% OFF</div>
                    </>
                  ) : (
                    <div className={styles.priceCardFinal}>₹{tour.price.toLocaleString()}</div>
                  )}
                  <div className={styles.priceCardPer}>per person</div>
                </div>

                <div className={styles.priceCardMeta}>
                  <div className={styles.priceMetaItem}>
                    <span className={styles.priceMetaLabel}>Duration</span>
                    <span className={styles.priceMetaValue}>{tour.duration} Days</span>
                  </div>
                  <div className={styles.priceMetaItem}>
                    <span className={styles.priceMetaLabel}>Category</span>
                    <span className={styles.priceMetaValue}>{tour.category}</span>
                  </div>
                </div>
              </div>

              {/* Inquiry Form */}
              <div className={styles.inquiryCard}>
                <h3 className={styles.inquiryTitle}>Book This Tour</h3>
                <div className="gold-divider" style={{ marginBottom: 20 }} />

                {inquirySent && (
                  <div style={{ background: 'rgba(0,120,0,0.1)', border: '1px solid rgba(0,120,0,0.3)', color: '#006400', padding: '10px 14px', borderRadius: 6, marginBottom: 16, fontSize: '0.85rem' }}>
                    ✓ Inquiry sent! We'll contact you within 24 hours.
                  </div>
                )}

                <form onSubmit={handleInquiry}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input className="form-input" type="text" placeholder="Your name" value={inquiryForm.name} onChange={e => setInquiryForm(f => ({ ...f, name: e.target.value }))} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input className="form-input" type="email" placeholder="your@email.com" value={inquiryForm.email} onChange={e => setInquiryForm(f => ({ ...f, email: e.target.value }))} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input className="form-input" type="tel" placeholder="+91 XXXXX XXXXX" value={inquiryForm.phone} onChange={e => setInquiryForm(f => ({ ...f, phone: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Preferred Date</label>
                    <input className="form-input" type="date" value={inquiryForm.date} onChange={e => setInquiryForm(f => ({ ...f, date: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">No. of Travellers</label>
                    <select className="form-input" value={inquiryForm.people} onChange={e => setInquiryForm(f => ({ ...f, people: e.target.value }))}>
                      {[1,2,3,4,5,6,8,10,15,20].map(n => <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Special Requests</label>
                    <textarea className="form-input form-textarea" rows={3} placeholder="Any special requirements?" value={inquiryForm.message} onChange={e => setInquiryForm(f => ({ ...f, message: e.target.value }))} />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Send Inquiry ✦
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

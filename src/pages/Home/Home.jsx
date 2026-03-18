// pages/Home/Home.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Carousel from '../../components/Carousel/Carousel';
import TourCard from '../../components/Cards/TourCard';
import ReviewCard from '../../components/Cards/ReviewCard';
import { TourCardSkeleton, ReviewSkeleton } from '../../components/Common/LoadingSkeleton';
import { useApp } from '../../context/AppContext';
import styles from './Home.module.css';

/* ——— Section Header Helper ——— */
function SectionHeader({ label, title, subtitle, center }) {
  return (
    <motion.div
      className={`section-header ${center ? 'text-center' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
    >
      <span className="section-label">{label}</span>
      <div className={`gold-divider ${center ? 'center' : ''}`} style={{ marginTop: 12 }} />
      <h2 className={`display-md ${styles.sectionTitle}`} style={{ marginTop: 16 }}>{title}</h2>
      {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
    </motion.div>
  );
}

/* ——— Contact Form ——— */
function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setStatus('success');
    setForm({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setStatus(null), 4000);
  };

  return (
    <section className={styles.contactSection} id="contact">
      <div className="container">
        <div className={styles.contactGrid}>
          {/* Info */}
          <motion.div
            className={styles.contactInfo}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Get in Touch</span>
            <div className="gold-divider" style={{ marginTop: 12 }} />
            <h2 className={`display-md ${styles.sectionTitle}`} style={{ marginTop: 16 }}>
              Plan Your<br /><em>Dream Journey</em>
            </h2>
            <p className={styles.contactDesc}>
              Our travel experts are ready to craft the perfect itinerary for you. Reach out and let the adventure begin.
            </p>
            <div className={styles.contactItems}>
              {[
                { icon: '✉', label: 'Email', value: 'info@royalodyssey.in' },
                { icon: '☎', label: 'Phone', value: '+91 98765 43210' },
                { icon: '⊙', label: 'Address', value: '42, Heritage Lane, Coimbatore, TN' },
                { icon: '🕐', label: 'Hours', value: 'Mon–Sat, 9 AM – 7 PM' },
              ].map(item => (
                <div key={item.label} className={styles.contactItem}>
                  <div className={styles.contactItemIcon}>{item.icon}</div>
                  <div>
                    <p className={styles.contactItemLabel}>{item.label}</p>
                    <p className={styles.contactItemValue}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className={styles.contactForm}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {status === 'success' && (
              <div className={styles.successMsg}>
                ✓ Message sent! We'll be in touch within 24 hours.
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className={styles.formRow}>
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
                <label className="form-label">Message *</label>
                <textarea
                  className="form-input form-textarea"
                  placeholder="Tell us about your dream trip..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  required
                  rows={5}
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                {loading ? 'Sending...' : 'Send Message ✦'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ——— Stack Cards Section ——— */
function StackCardsSection({ tours }) {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const featured = tours.filter(t => t.featured).slice(0, 3);

  if (!featured.length) return null;

  return (
    <section className={`section ${styles.stackSection}`}>
      <div className="container">
        <div className={styles.stackGrid}>
          {/* Left: Info */}
          <div className={styles.stackLeft}>
            <SectionHeader
              label="Featured Experiences"
              title={<>Journeys That<br /><em>Define You</em></>}
              subtitle="Handpicked for the discerning traveller — our signature experiences blend luxury, culture, and adventure."
            />
            <div className={styles.stackNav}>
              {featured.map((tour, i) => (
                <button
                  key={tour.id}
                  className={`${styles.stackNavBtn} ${i === activeIndex ? styles.stackNavActive : ''}`}
                  onClick={() => setActiveIndex(i)}
                >
                  <span className={styles.stackNavNum}>0{i + 1}</span>
                  <span className={styles.stackNavLabel}>{tour.place}</span>
                </button>
              ))}
            </div>
            <button
              className="btn btn-primary"
              style={{ marginTop: 32 }}
              onClick={() => navigate(`/catalogue/${featured[activeIndex]?.id}`)}
            >
              View This Tour
            </button>
          </div>

          {/* Right: Stack */}
          <div className={styles.stackRight}>
            <div className={styles.stackCards}>
              {featured.map((tour, i) => {
                const offset = i - activeIndex;
                const isActive = i === activeIndex;
                return (
                  <motion.div
                    key={tour.id}
                    className={styles.stackCard}
                    animate={{
                      x: isActive ? 0 : offset * 18,
                      y: isActive ? 0 : offset * 12,
                      scale: isActive ? 1 : 1 - Math.abs(offset) * 0.06,
                      zIndex: featured.length - Math.abs(offset),
                      opacity: isActive ? 1 : 0.6,
                    }}
                    transition={{ type: 'spring', damping: 22, stiffness: 200 }}
                    onClick={() => setActiveIndex(i)}
                    style={{ cursor: isActive ? 'default' : 'pointer' }}
                  >
                    <img src={tour.image} alt={tour.place} className={styles.stackImg} />
                    <div className={styles.stackOverlay} />
                    <div className={styles.stackInfo}>
                      <span className={`badge badge-gold ${styles.stackCategory}`}>{tour.category}</span>
                      <h3 className={styles.stackTitle}>{tour.place}</h3>
                      <p className={styles.stackLocation}>{tour.location}</p>
                      <div className={styles.stackMeta}>
                        <span>{tour.duration} Days</span>
                        <span>₹{(tour.offer ? Math.round(tour.price * (1 - tour.offer / 100)) : tour.price).toLocaleString()}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ——— Stats Banner ——— */
function StatsBanner() {
  const stats = [
    { value: '15+', label: 'Years Experience' },
    { value: '2400+', label: 'Happy Travellers' },
    { value: '80+', label: 'Tour Packages' },
    { value: '28', label: 'Destinations' },
  ];
  return (
    <div className={styles.statsBanner}>
      <div className="container">
        <div className={styles.statsGrid}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className={styles.statItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ——— Main Home Component ——— */
export default function Home() {
  const { announcements, tours, reviews } = useApp();
  const [loading, setLoading] = useState(true);
  const reviewsRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const visibleReviews = reviews.filter(r => r.visible);
  const recentTours = tours.slice(0, 6);

  // Horizontal scroll drag for reviews
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const isDragging = useRef(false);

  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - reviewsRef.current.offsetLeft;
    scrollLeft.current = reviewsRef.current.scrollLeft;
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    const x = e.pageX - reviewsRef.current.offsetLeft;
    reviewsRef.current.scrollLeft = scrollLeft.current - (x - startX.current);
  };
  const stopDrag = () => { isDragging.current = false; };

  return (
    <div>
      {/* Hero Carousel */}
      <Carousel slides={announcements.filter(a => a.active)} />

      {/* Stats */}
      <StatsBanner />

      {/* Featured Stack Cards */}
      {!loading && <StackCardsSection tours={tours} />}

      {/* Recent Tours Grid */}
      <section className={`section ${styles.toursSection}`}>
        <div className="container">
          <SectionHeader
            label="Our Packages"
            title={<>Explore Our<br /><em>Tour Collection</em></>}
            subtitle="From serene backwaters to Himalayan peaks — every journey is crafted with exceptional care."
          />
          <div className={styles.toursGrid}>
            {loading
              ? Array(6).fill(0).map((_, i) => <TourCardSkeleton key={i} />)
              : recentTours.map((tour, i) => <TourCard key={tour.id} tour={tour} index={i} />)
            }
          </div>
          <div className="text-center" style={{ marginTop: 48 }}>
            <Link to="/catalogue" className="btn btn-outline">
              View All Packages ✦
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className={`section ${styles.reviewsSection}`}>
        <div className="container">
          <SectionHeader
            label="Testimonials"
            title={<>Words From Our<br /><em>Travellers</em></>}
            center
          />
        </div>
        <div
          className={styles.reviewsScroll}
          ref={reviewsRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
        >
          <div className={styles.reviewsTrack}>
            {loading
              ? Array(4).fill(0).map((_, i) => <ReviewSkeleton key={i} />)
              : visibleReviews.map((r, i) => <ReviewCard key={r.id} review={r} index={i} />)
            }
          </div>
        </div>
        <div className="text-center" style={{ marginTop: 32 }}>
          <Link to="/review" className="btn btn-outline">Share Your Story</Link>
        </div>
      </section>

      {/* Contact */}
      <ContactSection />

      {/* Why Us */}
      <section className={`section ${styles.whySection}`}>
        <div className="container">
          <SectionHeader label="Why Royal Odyssey" title={<>The Difference<br /><em>We Deliver</em></>} center />
          <div className={styles.whyGrid}>
            {[
              { icon: '✦', title: 'Curated Luxury', desc: 'Every detail handpicked by our expert team — from premium stays to exclusive local experiences.' },
              { icon: '⊙', title: 'Local Expertise', desc: '15+ years building relationships with local guides, artisans, and hospitality partners.' },
              { icon: '✿', title: 'Personalised Journeys', desc: 'No two travellers are alike. We craft custom itineraries that reflect your desires.' },
              { icon: '⬡', title: '24/7 Support', desc: 'Our team is always reachable — before, during, and after your journey.' },
            ].map((w, i) => (
              <motion.div
                key={w.title}
                className={styles.whyCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className={styles.whyIcon}>{w.icon}</div>
                <h3 className={styles.whyTitle}>{w.title}</h3>
                <p className={styles.whyDesc}>{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

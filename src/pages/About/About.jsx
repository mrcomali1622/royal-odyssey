// pages/About/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './About.module.css';

const team = [
  { name: 'Arjun Krishnamurthy', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face', bio: '20+ years shaping luxury travel across India.' },
  { name: 'Meera Nair', role: 'Head of Operations', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face', bio: 'Logistics genius who ensures flawless journeys.' },
  { name: 'Vikram Patel', role: 'Lead Tour Designer', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face', bio: 'Crafts experiences that become lifelong memories.' },
  { name: 'Priya Sharma', role: 'Guest Relations', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face', bio: 'Ensures every traveller feels like royalty.' },
];

const services = [
  { icon: '✈', title: 'Custom Tour Design', desc: 'Bespoke itineraries crafted around your interests, pace, and budget.' },
  { icon: '⬡', title: 'Luxury Accommodations', desc: 'Handpicked palace hotels, boutique properties, and wilderness retreats.' },
  { icon: '⊙', title: 'Expert Local Guides', desc: 'Passionate storytellers who bring history, culture, and nature to life.' },
  { icon: '✿', title: 'Adventure Experiences', desc: 'Treks, safaris, water sports — we design your thrill, safely.' },
  { icon: '✦', title: 'Cultural Immersion', desc: 'Cooking classes, village stays, craft workshops, and festival access.' },
  { icon: '⬟', title: 'Corporate & Groups', desc: 'Bespoke MICE tours, team retreats, and large group management.' },
];

export default function About() {
  return (
    <div className="page-wrapper">
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroImgWrap}>
          <img src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&q=80" alt="Royal Odyssey" className={styles.heroImg} />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent}>
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <span className="section-label" style={{ color: 'var(--color-primary)' }}>Our Story</span>
              <div className="gold-divider" style={{ marginTop: 12 }} />
              <h1 className={`display-lg ${styles.heroTitle}`} style={{ marginTop: 16 }}>
                About <em>Royal Odyssey</em>
              </h1>
              <p className={styles.heroSub}>
                Since 2010, we have been turning wanderlust into extraordinary experiences across the breathtaking landscapes of India.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <section className="section">
        <div className="container">
          <div className={styles.storyGrid}>
            <motion.div
              className={styles.storyLeft}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="section-label">Who We Are</span>
              <div className="gold-divider" style={{ marginTop: 12 }} />
              <h2 className={`display-md ${styles.storyTitle}`} style={{ marginTop: 16 }}>
                Curators of<br /><em>Unforgettable Journeys</em>
              </h2>
              <p className={styles.storyText}>
                Royal Odyssey Tourism was born from a simple belief: travel should be transformative. Founded in Coimbatore in 2010 by passionate traveller Arjun Krishnamurthy, we started with a single houseboat in Kerala and a dream to show the world India's most magnificent corners.
              </p>
              <p className={styles.storyText}>
                Today, we have taken over 2,400 travellers across 28 destinations — from the golden deserts of Rajasthan to the emerald Himalayan foothills. Every journey we craft is infused with deep local knowledge, authentic connections, and meticulous attention to detail.
              </p>
              <div className={styles.storyStats}>
                {[['15+', 'Years'], ['2400+', 'Travellers'], ['28', 'Destinations'], ['98%', 'Satisfaction']].map(([v, l]) => (
                  <div key={l} className={styles.storyStat}>
                    <span className={styles.storyStatVal}>{v}</span>
                    <span className={styles.storyStatLbl}>{l}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              className={styles.storyRight}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className={styles.imgCollage}>
                <img src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80" alt="Kerala" className={styles.collageImg1} />
                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" alt="Himalayas" className={styles.collageImg2} />
                <img src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&q=80" alt="Beach" className={styles.collageImg3} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className={`section ${styles.vmSection}`}>
        <div className="container">
          <div className={styles.vmGrid}>
            {[
              {
                icon: '◎',
                heading: 'Our Vision',
                text: 'To be India\'s most loved travel company — one that creates journeys so profound, they change how our travellers see the world and themselves.'
              },
              {
                icon: '✦',
                heading: 'Our Mission',
                text: 'To craft bespoke travel experiences that blend luxury, authenticity, and sustainability — supporting local communities while delivering unmatched hospitality.'
              },
              {
                icon: '⬡',
                heading: 'Our Values',
                text: 'Integrity in every promise. Passion in every plan. Respect for every culture. Responsibility towards every destination we take you to.'
              },
            ].map((item, i) => (
              <motion.div
                key={item.heading}
                className={styles.vmCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.55 }}
              >
                <div className={styles.vmIcon}>{item.icon}</div>
                <h3 className={styles.vmHeading}>{item.heading}</h3>
                <div className="gold-divider" />
                <p className={styles.vmText}>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="container">
          <motion.div
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">What We Offer</span>
            <div className="gold-divider center" style={{ marginTop: 12 }} />
            <h2 className={`display-md`} style={{ marginTop: 16 }}>Our <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>Services</em></h2>
          </motion.div>
          <div className={styles.servicesGrid}>
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                className={styles.serviceCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div className={styles.serviceIcon}>{s.icon}</div>
                <h4 className={styles.serviceTitle}>{s.title}</h4>
                <p className={styles.serviceDesc}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className={`section ${styles.teamSection}`}>
        <div className="container">
          <motion.div
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">The People</span>
            <div className="gold-divider center" style={{ marginTop: 12 }} />
            <h2 className={`display-md`} style={{ marginTop: 16 }}>Meet the <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>Team</em></h2>
          </motion.div>
          <div className={styles.teamGrid}>
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                className={styles.teamCard}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
              >
                <div className={styles.teamImgWrap}>
                  <img src={member.img} alt={member.name} className={styles.teamImg} />
                </div>
                <h4 className={styles.teamName}>{member.name}</h4>
                <p className={styles.teamRole}>{member.role}</p>
                <p className={styles.teamBio}>{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <motion.div
            className={styles.ctaBox}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className={`display-md ${styles.ctaTitle}`}>Ready for Your <em>Odyssey?</em></h2>
            <p className={styles.ctaText}>Let us craft the journey of a lifetime, tailored entirely to you.</p>
            <div className={styles.ctaBtns}>
              <Link to="/catalogue" className="btn btn-primary">Browse Tours ✦</Link>
              <Link to="/#contact" className="btn btn-ghost">Contact Us</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

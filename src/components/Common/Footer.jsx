// components/Common/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const socialLinks = [
  { label: 'Instagram', href: '#', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
  )},
  { label: 'Facebook', href: '#', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  )},
  { label: 'YouTube', href: '#', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
  )},
  { label: 'WhatsApp', href: '#', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
  )},
];

const footerLinks = {
  'Explore': [
    { to: '/', label: 'Home' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/catalogue', label: 'Tour Packages' },
    { to: '/about', label: 'About Us' },
  ],
  'Support': [
    { to: '/review', label: 'Reviews' },
    { to: '/#contact', label: 'Contact Us' },
    { to: '#', label: 'Terms & Conditions' },
    { to: '#', label: 'Privacy Policy' },
  ],
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className="container">
          <div className={styles.grid}>
            {/* Brand */}
            <div className={styles.brand}>
              <div className={styles.logo}>
                <span className={styles.logoIcon}>✦</span>
                <span className={styles.logoText}>Royal <em>Odyssey</em></span>
              </div>
              <p className={styles.tagline}>
                Crafting extraordinary journeys across the wonders of India since 2010. Every trip is a story waiting to be told.
              </p>
              <div className={styles.socials}>
                {socialLinks.map(s => (
                  <a key={s.label} href={s.href} className={styles.socialBtn} aria-label={s.label} target="_blank" rel="noopener noreferrer">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading} className={styles.linkGroup}>
                <h4 className={styles.linkHeading}>{heading}</h4>
                <ul className={styles.links}>
                  {links.map(link => (
                    <li key={link.label}>
                      <Link to={link.to} className={styles.link}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact */}
            <div className={styles.linkGroup}>
              <h4 className={styles.linkHeading}>Contact</h4>
              <ul className={styles.contactList}>
                <li>
                  <span className={styles.contactIcon}>✉</span>
                  <a href="mailto:info@royalodyssey.in" className={styles.link}>info@royalodyssey.in</a>
                </li>
                <li>
                  <span className={styles.contactIcon}>☎</span>
                  <a href="tel:+919876543210" className={styles.link}>+91 98765 43210</a>
                </li>
                <li>
                  <span className={styles.contactIcon}>⊙</span>
                  <span className={styles.contactText}>42, Heritage Lane, Coimbatore, Tamil Nadu 641001</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomInner}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} Royal Odyssey Tourism. All rights reserved.
            </p>
            <p className={styles.credit}>
              Crafted with <span style={{ color: 'var(--color-accent)' }}>♥</span> for wanderers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

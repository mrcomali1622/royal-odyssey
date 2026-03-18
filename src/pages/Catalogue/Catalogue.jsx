// pages/Catalogue/Catalogue.jsx
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import TourCard from '../../components/Cards/TourCard';
import styles from './Catalogue.module.css';

const categories = ['All', 'Nature', 'Heritage', 'Adventure', 'Beach', 'Spiritual'];

export default function Catalogue() {
  const { tours } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [priceMax, setPriceMax] = useState(100000);

  const filtered = useMemo(() => {
    let list = [...tours];
    if (activeCategory !== 'All') list = list.filter(t => t.category === activeCategory);
    if (search.trim()) list = list.filter(t =>
      t.place.toLowerCase().includes(search.toLowerCase()) ||
      t.location.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
    );
    list = list.filter(t => (t.offer ? Math.round(t.price * (1 - t.offer / 100)) : t.price) <= priceMax);

    switch (sortBy) {
      case 'price-asc': return list.sort((a, b) => a.price - b.price);
      case 'price-desc': return list.sort((a, b) => b.price - a.price);
      case 'duration': return list.sort((a, b) => b.duration - a.duration);
      case 'newest':
      default: return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  }, [tours, activeCategory, search, sortBy, priceMax]);

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <div className={styles.hero}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="section-label">Tour Packages</span>
            <div className="gold-divider" style={{ marginTop: 12 }} />
            <h1 className={`display-lg ${styles.heroTitle}`} style={{ marginTop: 16 }}>
              Our <em>Catalogue</em>
            </h1>
            <p className={styles.heroSubtitle}>
              Discover {tours.length}+ handcrafted journeys across India's most magnificent landscapes.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="section">
        <div className="container">
          {/* Filters */}
          <div className={styles.filters}>
            {/* Search */}
            <div className={styles.searchWrap}>
              <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input
                className={`form-input ${styles.searchInput}`}
                type="text"
                placeholder="Search destinations..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            {/* Sort */}
            <select
              className={`form-input ${styles.sortSelect}`}
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="duration">Duration: Longest</option>
            </select>
          </div>

          {/* Categories */}
          <div className={styles.categories}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`${styles.catBtn} ${activeCategory === cat ? styles.catActive : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Price filter */}
          <div className={styles.priceFilter}>
            <label className={styles.priceLabel}>
              Budget: up to ₹{priceMax.toLocaleString()}
            </label>
            <input
              type="range"
              min={10000}
              max={100000}
              step={1000}
              value={priceMax}
              onChange={e => setPriceMax(Number(e.target.value))}
              className={styles.priceRange}
            />
          </div>

          {/* Results count */}
          <div className={styles.resultsCount}>
            <span>{filtered.length} {filtered.length === 1 ? 'package' : 'packages'} found</span>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <motion.div
              className={styles.empty}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className={styles.emptyIcon}>✦</p>
              <h3>No tours found</h3>
              <p>Try adjusting your filters or search term.</p>
              <button className="btn btn-outline" onClick={() => { setActiveCategory('All'); setSearch(''); setPriceMax(100000); }}>
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <div className={styles.grid}>
              {filtered.map((tour, i) => (
                <TourCard key={tour.id} tour={tour} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

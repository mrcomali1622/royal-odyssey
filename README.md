# Royal Odyssey Tourism 🏛✦

A full-featured, production-grade tourism web application built with React.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start

# 3. Open in browser
http://localhost:3000
```

---

## 🔐 Admin Access

| Field    | Value       |
|----------|-------------|
| Username | `admin`     |
| Password | `royal2024` |

Navigate to `/admin` or click the **Admin** button in the navbar.

---

## 🗂 Project Structure

```
src/
├── components/
│   ├── Navbar/          # Sticky responsive navbar
│   ├── Carousel/        # Framer Motion auto-sliding carousel
│   ├── Gallery/         # Image modal with fullscreen view
│   ├── Cards/           # TourCard, ReviewCard components
│   └── Common/          # Footer, ScrollToTop, LoadingSkeleton
│
├── pages/
│   ├── Home/            # Landing page with all sections
│   ├── Gallery/         # Album grid + image viewer
│   ├── Catalogue/       # Tour package list with filters
│   ├── TourDetails/     # Full tour info + inquiry form
│   ├── Review/          # Reviews + submission form
│   └── About/           # Company info, team, services
│
├── admin/
│   ├── Login/           # Admin login page
│   └── Dashboard/       # Full admin control panel
│
├── context/
│   └── AppContext.jsx   # Global state (theme, data, auth)
│
├── services/
│   └── mockData.js      # Mock API data (backend-ready shape)
│
├── styles/
│   └── global.css       # CSS variables + global styles
│
└── App.jsx              # Router + layout setup
```

---

## 🌐 Pages & Features

### Public
| Route | Description |
|-------|-------------|
| `/` | Home — Carousel, Stack Cards, Reviews, Contact |
| `/gallery` | Album grid → image grid → fullscreen modal |
| `/catalogue` | Tour packages with search, filter, sort |
| `/catalogue/:id` | Tour detail — itinerary, pricing, inquiry |
| `/review` | All reviews + submission form |
| `/about` | Company info, vision, team, services |

### Admin
| Route | Description |
|-------|-------------|
| `/admin` | Login page |
| `/admin/dashboard` | Full dashboard with all management panels |

---

## ⚙️ Admin Dashboard Panels

- **Overview** — Stats (tours, reviews, photos, announcements)
- **Announcements** — Add / Edit / Delete / Toggle carousel slides
- **Gallery** — Create albums, add/delete images
- **Catalogue** — Full CRUD for tour packages (price, offer, itinerary, inclusions)
- **Reviews** — View all, hide/show, delete
- **Theme** — Toggle dark/light mode, change primary accent colour

---

## 🎨 Design System

- **Display font**: Cormorant Garamond (serif, elegant)
- **Body font**: Jost (clean, modern)
- **Aesthetic**: Luxury editorial — jewel tones, gold accents
- **Theme**: Full dark/light mode via CSS variables
- **Animations**: Framer Motion throughout (carousel, cards, modals, page transitions)

---

## 🔧 Tech Stack

| Tool | Usage |
|------|-------|
| React 18 | UI framework |
| React Router v6 | Client-side routing |
| Framer Motion | Animations & transitions |
| Context API | Global state management |
| CSS Modules | Component-scoped styles |
| Google Fonts | Cormorant Garamond + Jost |

---

## 🔌 Backend Integration

The `services/mockData.js` file exports both raw data arrays and an `api` object with async functions that simulate real HTTP calls. To connect a real backend:

1. Replace functions in `api` object with `fetch()` / `axios` calls
2. Keep the same data shapes — components depend on the field names
3. Update `AppContext.jsx` to use the async `api.*` methods instead of direct state

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|-----------|--------|
| `> 1200px` | Full desktop grid |
| `1024px` | Compact desktop |
| `768px` | Tablet — stacked layouts |
| `480px` | Mobile — single column |

---

## 💡 Image Like & View System

- Likes and views are tracked per image using `localStorage`
- Toggling a like updates the album image's like count in real time
- First view of each image increments view count (tracked in `localStorage`)
- Full admin reset possible by clearing `ro_likes` / `ro_views` from localStorage

---

© 2026 Royal Odyssey Tourism. Built with ♥

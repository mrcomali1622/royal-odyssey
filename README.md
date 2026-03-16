# Royal Odyssey Tourism — React App

A full-featured tourism website with user-facing pages and a protected admin panel.

## Tech Stack

- **React 18** + **Vite**
- **React Router v6** — file-based routing
- **Tailwind CSS** — utility styling
- **Framer Motion** — animations (optional, pre-installed)
- **Axios** — API calls

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build
```

App runs at: **http://localhost:5173**

---

## Project Structure

```
src/
├── assets/            # Images & icons
├── components/        # Reusable UI components
│   ├── Navbar/
│   ├── Footer/
│   ├── AnnouncementBar/
│   ├── TourCard/
│   ├── TourModal/
│   ├── AlbumCard/
│   ├── ImageModal/
│   └── ThemeSwitcher/
├── context/
│   ├── AuthContext.jsx   # Admin auth state
│   └── ThemeContext.jsx  # Site-wide theme (CSS vars)
├── data/
│   └── mockData.js       # Sample tours, albums, announcements
├── layouts/
│   ├── UserLayout/       # Navbar + Footer wrapper
│   └── AdminLayout/      # Sidebar + TopBar wrapper
├── pages/
│   ├── user/
│   │   ├── Home/
│   │   ├── Gallery/
│   │   ├── AlbumView/
│   │   ├── Catalog/
│   │   └── About/
│   └── admin/
│       ├── Login/
│       ├── Dashboard/
│       ├── ManageCatalog/
│       ├── ManageGallery/
│       ├── ManageAnnouncement/
│       └── ThemeConfig/
├── routes/
│   └── AppRoutes.jsx
└── services/
    ├── api.js            # Axios instance
    └── index.js          # catalogService, galleryService, announcementService
```

---

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/gallery` | Gallery (album grid) |
| `/gallery/:albumId` | Album photo grid |
| `/catalog` | Tour packages |
| `/about` | About Us |
| `/admin/login` | Admin login |
| `/admin/dashboard` | Admin dashboard |
| `/admin/catalog` | Manage tours |
| `/admin/gallery` | Manage albums & photos |
| `/admin/announcement` | Manage announcements |
| `/admin/theme` | Theme configuration |

---

## Admin Login

| Field | Value |
|-------|-------|
| Email | admin@royalodyssey.in |
| Password | admin123 |

> To connect a real backend, update `VITE_API_URL` in `.env` and swap the mock data in pages with calls from `src/services/index.js`.

---

## Environment Variables

Create a `.env` file in the root:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Connecting a Backend

The services layer (`src/services/index.js`) is already wired up with Axios. To connect a Node/Express + MongoDB backend:

1. Build REST endpoints matching the service calls
2. Set `VITE_API_URL` in `.env`
3. Replace mock data in each page with `useEffect` + service calls
4. Replace the hardcoded login in `AuthContext` with `api.post('/auth/login')`

---

## Theme System

The site uses CSS custom properties for theming:

```css
--color-primary   /* main brand color */
--color-accent    /* gold / highlight color */
--color-bg        /* page background */
```

Changing these via `ThemeContext.setTheme()` updates the entire site instantly. 6 presets + custom color pickers are available in `/admin/theme`.

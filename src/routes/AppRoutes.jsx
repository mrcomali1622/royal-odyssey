import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

import UserLayout from '../layouts/UserLayout'
import AdminLayout from '../layouts/AdminLayout'

import Home from '../pages/user/Home'
import Gallery from '../pages/user/Gallery'
import AlbumView from '../pages/user/AlbumView'
import Catalog from '../pages/user/Catalog'
import About from '../pages/user/About'

import Login from '../pages/admin/Login'
import Dashboard from '../pages/admin/Dashboard'
import ManageCatalog from '../pages/admin/ManageCatalog'
import ManageGallery from '../pages/admin/ManageGallery'
import ManageAnnouncement from '../pages/admin/ManageAnnouncement'
import ThemeConfig from '../pages/admin/ThemeConfig'

function ProtectedRoute({ children }) {
  const { isAdmin } = useAuth()
  return isAdmin ? children : <Navigate to="/admin/login" replace />
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* User Routes */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="gallery/:albumId" element={<AlbumView />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="about" element={<About />} />
      </Route>

      {/* Admin Login (no layout) */}
      <Route path="/admin/login" element={<Login />} />

      {/* Admin Protected Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="catalog" element={<ManageCatalog />} />
        <Route path="gallery" element={<ManageGallery />} />
        <Route path="announcement" element={<ManageAnnouncement />} />
        <Route path="theme" element={<ThemeConfig />} />
      </Route>
    </Routes>
  )
}

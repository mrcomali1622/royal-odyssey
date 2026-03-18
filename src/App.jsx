// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Common/Footer';
import { ScrollRestorer, ScrollToTopButton } from './components/Common/ScrollToTop';

import Home from './pages/Home/Home';
import GalleryPage from './pages/Gallery/Gallery';
import Catalogue from './pages/Catalogue/Catalogue';
import TourDetails from './pages/TourDetails/TourDetails';
import ReviewPage from './pages/Review/Review';
import About from './pages/About/About';
import AdminLogin from './admin/Login/AdminLogin';
import AdminDashboard from './admin/Dashboard/AdminDashboard';

import './styles/global.css';

/* Protected route for admin */
function AdminRoute({ children }) {
  const { isAdmin } = useApp();
  return isAdmin ? children : <Navigate to="/admin" replace />;
}

/* Public layout (navbar + footer) */
function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}

/* Admin layout (no navbar/footer) */
function AdminLayout({ children }) {
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <>
      <ScrollRestorer />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/gallery" element={<PublicLayout><GalleryPage /></PublicLayout>} />
        <Route path="/catalogue" element={<PublicLayout><Catalogue /></PublicLayout>} />
        <Route path="/catalogue/:id" element={<PublicLayout><TourDetails /></PublicLayout>} />
        <Route path="/review" element={<PublicLayout><ReviewPage /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout><AdminLogin /></AdminLayout>} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <AdminRoute><AdminDashboard /></AdminRoute>
            </AdminLayout>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}

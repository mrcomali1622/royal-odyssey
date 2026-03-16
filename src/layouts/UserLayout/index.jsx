import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import AnnouncementBar from '../../components/AnnouncementBar'
import { Outlet } from 'react-router-dom'

export default function UserLayout({ announcements, children }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-bg)' }}>
      <AnnouncementBar announcements={announcements} />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'

const sidebarItems = [
  { path: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
  { path: '/admin/catalog', icon: '📦', label: 'Manage Catalog' },
  { path: '/admin/gallery', icon: '🖼️', label: 'Manage Gallery' },
  { path: '/admin/announcement', icon: '📢', label: 'Announcements' },
  { path: '/admin/theme', icon: '🎨', label: 'Theme Config' },
]

export default function AdminLayout({ children }) {
  const navigate = useNavigate()
  const current = window.location.pathname

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      <Navbar />
      <div className="flex" style={{ minHeight: 'calc(100vh - 64px)' }}>
        <aside className="w-56 shrink-0 border-r border-black/10 bg-white py-4">
          {sidebarItems.map(({ path, icon, label }) => (
            <div key={path} onClick={() => navigate(path)}
              className="flex cursor-pointer items-center gap-3 px-5 py-3 text-sm font-medium transition-all"
              style={{
                color: current === path ? 'var(--color-accent)' : '#444',
                background: current === path ? 'rgba(212,175,55,0.08)' : 'transparent',
                borderRight: current === path ? '3px solid var(--color-accent)' : '3px solid transparent',
              }}>
              <span className="text-base">{icon}</span>
              {label}
            </div>
          ))}
          <div className="mx-4 my-2 h-px bg-black/8" />
          <div onClick={() => navigate('/')}
            className="flex cursor-pointer items-center gap-3 px-5 py-3 text-sm font-medium text-gray-500 transition hover:text-gray-800"
            style={{ borderRight: '3px solid transparent' }}>
            <span className="text-base">🌐</span> View Website
          </div>
        </aside>
        <main className="flex-1 overflow-y-auto p-9" style={{ background: '#f8f5ef', maxHeight: 'calc(100vh - 64px)' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

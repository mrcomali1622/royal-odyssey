import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const { isAdmin, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const isAdminPage = location.pathname.startsWith('/admin')

  if (isAdminPage) {
    return (
      <nav className="sticky top-0 z-50 flex h-16 items-center justify-between px-8"
        style={{ background: 'var(--color-primary)' }}>
        <span className="font-display text-xl font-bold" style={{ color: 'var(--color-accent)' }}>
          Royal Odyssey · Admin
        </span>
        {isAdmin && (
          <button onClick={() => { logout(); navigate('/') }}
            className="rounded-lg border border-white/30 px-4 py-2 text-sm text-white hover:bg-white/10 transition">
            ⬅ Logout
          </button>
        )}
      </nav>
    )
  }

  const links = [['Home', '/'], ['Gallery', '/gallery'], ['Catalog', '/catalog'], ['About', '/about']]
  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-black/10 px-[4%]"
      style={{ background: 'rgba(250,247,240,0.96)', backdropFilter: 'blur(14px)' }}>
      <Link to="/" className="font-display text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
        Royal <span style={{ color: 'var(--color-accent)' }}>Odyssey</span>
      </Link>
      <div className="flex items-center gap-7">
        {links.map(([label, path]) => (
          <Link key={path} to={path}
            className="text-sm font-medium tracking-wide transition-colors"
            style={{ color: location.pathname === path ? 'var(--color-primary)' : '#555' }}>
            {label}
          </Link>
        ))}
        <Link to="/admin/login"
          className="rounded-lg px-5 py-2 text-sm font-semibold text-white"
          style={{ background: 'var(--color-primary)' }}>
          Admin
        </Link>
      </div>
    </nav>
  )
}

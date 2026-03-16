import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('admin@royalodyssey.in')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = () => {
    const ok = login(email, password)
    if (ok) navigate('/admin/dashboard')
    else setError('Invalid email or password.')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ background: '#fff', borderRadius: 20, padding: '2.75rem', width: '100%', maxWidth: 400, textAlign: 'center' }}>
        <div className="font-serif" style={{ fontSize: 26, color: 'var(--color-primary)', fontWeight: 700, marginBottom: 6 }}>Royal Odyssey</div>
        <div style={{ color: 'var(--color-muted)', fontSize: 13.5, marginBottom: '2.25rem' }}>Admin Panel Login</div>

        {error && (
          <div style={{ background: '#fff3f3', border: '1px solid #fcc', color: '#c00', padding: '9px 12px', borderRadius: 8, marginBottom: '1rem', fontSize: 13, textAlign: 'left' }}>
            {error}
          </div>
        )}

        {[['Email', email, setEmail, 'email'], ['Password', password, setPassword, 'password']].map(([label, val, setter, type]) => (
          <div key={label} style={{ marginBottom: '1rem', textAlign: 'left' }}>
            <label style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--color-primary)', display: 'block', marginBottom: 5 }}>{label}</label>
            <input value={val} onChange={e => setter(e.target.value)} type={type}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              style={{ width: '100%', padding: '10px 13px', border: '1.5px solid var(--color-border)', borderRadius: 8, fontSize: 14, outline: 'none' }} />
          </div>
        ))}

        <button onClick={handleLogin}
          style={{ width: '100%', background: 'var(--color-primary)', color: '#fff', border: 'none', padding: '12px', borderRadius: 8, fontSize: 14.5, fontWeight: 700, marginTop: 4, cursor: 'pointer' }}>
          Login to Admin Panel
        </button>

        <button onClick={() => navigate('/')}
          style={{ marginTop: '1rem', background: 'transparent', border: 'none', color: 'var(--color-muted)', fontSize: 13, cursor: 'pointer' }}>
          ← Back to Website
        </button>

        <div style={{ marginTop: '1.5rem', padding: '10px', background: '#f8f5ef', borderRadius: 8, fontSize: 12, color: 'var(--color-muted)' }}>
          Demo: admin@royalodyssey.in / admin123
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useTheme } from '../../../context/ThemeContext'
import ThemeSwitcher, { PRESETS } from '../../../components/ThemeSwitcher'

export default function ThemeConfig() {
  const { theme, setTheme } = useTheme()
  const [custom, setCustom] = useState({ ...theme })

  const apply = () => setTheme({ ...custom, name: 'Custom' })

  return (
    <div>
      <h1 className="font-serif" style={{ fontSize: 30, color: 'var(--color-primary)', fontWeight: 700, marginBottom: '1.5rem' }}>Theme Configuration</h1>

      {/* Presets */}
      <div style={{ background: '#fff', borderRadius: 14, padding: '1.75rem', border: '1px solid var(--color-border)', marginBottom: '1.4rem' }}>
        <div style={{ fontWeight: 700, fontSize: 14.5, color: 'var(--color-primary)', marginBottom: '1.25rem' }}>Quick Presets</div>
        <ThemeSwitcher />
      </div>

      {/* Custom */}
      <div style={{ background: '#fff', borderRadius: 14, padding: '1.75rem', border: '1px solid var(--color-border)' }}>
        <div style={{ fontWeight: 700, fontSize: 14.5, color: 'var(--color-primary)', marginBottom: '1.25rem' }}>Custom Colors</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
          {[['Primary Color', 'primary'], ['Accent Color', 'accent'], ['Background', 'bg']].map(([label, key]) => (
            <div key={key}>
              <label style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--color-primary)', display: 'block', marginBottom: 7 }}>{label}</label>
              <div style={{ display: 'flex', gap: 9, alignItems: 'center' }}>
                <input type="color" value={custom[key]} onChange={e => setCustom(c => ({ ...c, [key]: e.target.value }))}
                  style={{ width: 44, height: 38, border: '1.5px solid var(--color-border)', borderRadius: 7, cursor: 'pointer', padding: 2 }} />
                <input value={custom[key]} onChange={e => setCustom(c => ({ ...c, [key]: e.target.value }))}
                  style={{ flex: 1, padding: '8px 11px', border: '1.5px solid var(--color-border)', borderRadius: 7, fontSize: 13, outline: 'none', fontFamily: 'monospace' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Preview swatch */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '1rem', background: '#f8f5ef', borderRadius: 10, marginBottom: '1.25rem' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: custom.primary }} />
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: custom.accent }} />
          <div style={{ width: 80, height: 32, borderRadius: 6, background: custom.bg, border: '1px solid var(--color-border)' }} />
          <span style={{ fontSize: 13, color: 'var(--color-muted)' }}>Live preview</span>
        </div>

        <button onClick={apply}
          style={{ background: 'var(--color-primary)', color: '#fff', border: 'none', padding: '11px 30px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          Apply Custom Theme
        </button>
      </div>
    </div>
  )
}

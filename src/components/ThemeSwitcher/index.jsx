import { useTheme } from '../../context/ThemeContext'

const PRESETS = [
  { name: 'Royal Forest',  primary: '#1B4332', accent: '#D4AF37', bg: '#FAF7F0' },
  { name: 'Ocean Voyage',  primary: '#1A3C5E', accent: '#F4A261', bg: '#F0F8FF' },
  { name: 'Desert Gold',   primary: '#7C3F00', accent: '#FFD166', bg: '#FFF8F0' },
  { name: 'Midnight Sky',  primary: '#0D1B2A', accent: '#4CC9F0', bg: '#F0F4F8' },
  { name: 'Rose Garden',   primary: '#7B2D3A', accent: '#F4A0B5', bg: '#FFF5F7' },
  { name: 'Slate Modern',  primary: '#2D3A4A', accent: '#64CCC5', bg: '#F5F7FA' },
]

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px,1fr))', gap: '1rem' }}>
      {PRESETS.map(preset => (
        <div key={preset.name} onClick={() => setTheme(preset)}
          style={{ borderRadius: 12, overflow: 'hidden', cursor: 'pointer', border: `2px solid ${theme.name === preset.name ? 'var(--color-accent)' : 'var(--color-border)'}`, transition: 'border-color .2s' }}>
          <div style={{ height: 56, background: preset.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 26, height: 26, borderRadius: '50%', background: preset.accent }} />
          </div>
          <div style={{ padding: '8px 10px', background: preset.bg }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: preset.primary }}>{preset.name}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export { PRESETS }

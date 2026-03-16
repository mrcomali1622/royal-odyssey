import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="px-[4%] pt-12 pb-6" style={{ background: 'var(--color-primary)', color: '#fff' }}>
      <div className="grid grid-cols-3 gap-12 mb-8">
        <div>
          <div className="font-display text-2xl font-bold mb-3" style={{ color: 'var(--color-accent)' }}>Royal Odyssey</div>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            Crafting unforgettable journeys across India's most magnificent destinations since 2010.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest mb-4 font-semibold" style={{ color: 'var(--color-accent)' }}>Navigation</div>
          {[['Home', '/'], ['Gallery', '/gallery'], ['Catalog', '/catalog'], ['About', '/about']].map(([l, p]) => (
            <Link key={p} to={p} className="block text-white/60 hover:text-white mb-2 text-sm transition-colors">{l}</Link>
          ))}
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest mb-4 font-semibold" style={{ color: 'var(--color-accent)' }}>Contact</div>
          <div className="text-white/60 text-sm leading-loose">
            <div>📍 123 Heritage Lane, Kochi</div>
            <div>📞 +91 98765 43210</div>
            <div>✉️ hello@royalodyssey.in</div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 pt-5 text-center text-white/30 text-xs">
        © 2024 Royal Odyssey Tourism. All rights reserved.
      </div>
    </footer>
  )
}

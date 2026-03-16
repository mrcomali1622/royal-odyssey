export default function About() {
  return (
    <div className="animate-fade-up">
      {/* Hero */}
      <div style={{ background: 'var(--color-primary)', padding: '5rem 4%', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, right: -100, width: 320, height: 320, borderRadius: '50%', background: 'rgba(212,175,55,0.08)' }} />
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--color-accent)', fontWeight: 600, marginBottom: 14 }}>About Us</div>
        <h1 className="font-serif" style={{ fontSize: 'clamp(36px,5vw,58px)', color: '#fff', fontWeight: 700, maxWidth: 560, lineHeight: 1.15 }}>
          Crafting India's Most <em>Royal</em> Journeys
        </h1>
      </div>

      {/* Story */}
      <section style={{ padding: '5rem 4%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <div>
          <h2 className="font-serif" style={{ fontSize: 34, color: 'var(--color-primary)', fontWeight: 700, marginBottom: '1.5rem' }}>Our Story</h2>
          <p style={{ color: 'var(--color-muted)', lineHeight: 1.9, marginBottom: '1rem', fontSize: 14.5 }}>
            Founded in 2010 by passionate travellers, Royal Odyssey Tourism was born out of a deep love for India's incredible diversity. We believed that travel should be more than just sightseeing — it should be a transformative experience.
          </p>
          <p style={{ color: 'var(--color-muted)', lineHeight: 1.9, fontSize: 14.5 }}>
            From the snow-capped peaks of the Himalayas to the tranquil backwaters of Kerala, we've been guiding travellers through India's most magnificent corners for over 14 years.
          </p>
        </div>
        <img src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=700&q=80"
          alt="About Royal Odyssey" style={{ width: '100%', height: 360, objectFit: 'cover', borderRadius: 16 }} />
      </section>

      {/* Values */}
      <section style={{ background: '#f0ece3', padding: '4rem 4%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.75rem' }}>
          {[
            ['🎯', 'Our Mission',  'To create seamless, enriching travel experiences that connect people to India\'s rich culture, history, and natural beauty.'],
            ['🔭', 'Our Vision',   'To become India\'s most trusted and celebrated travel brand, known for excellence, authenticity, and heart.'],
            ['✨', 'Our Values',   'Integrity, excellence, and genuine care in every interaction. We treat every traveller as family.'],
            ['🌐', 'Our Reach',   'Operating across 25+ destinations in India with a dedicated team of 50+ travel experts.'],
          ].map(([icon, title, text]) => (
            <div key={title} style={{ background: '#fff', padding: '1.75rem', borderRadius: 14, border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: 32, marginBottom: 14 }}>{icon}</div>
              <h3 className="font-serif" style={{ fontSize: 21, color: 'var(--color-primary)', fontWeight: 700, marginBottom: 10 }}>{title}</h3>
              <p style={{ color: 'var(--color-muted)', lineHeight: 1.8, fontSize: 13.5 }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section style={{ background: 'var(--color-primary)', padding: '4rem 4%' }}>
        <h2 className="font-serif" style={{ fontSize: 34, fontWeight: 700, marginBottom: '2rem', color: 'var(--color-accent)' }}>Get In Touch</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          {[
            ['📍', 'Address', '123 Heritage Lane\nFort Kochi, Kerala – 682001'],
            ['📞', 'Phone',   '+91 98765 43210\n+91 98765 43211'],
            ['✉️', 'Email',   'hello@royalodyssey.in\ninfo@royalodyssey.in'],
            ['🕐', 'Hours',   'Mon–Sat: 9AM – 7PM\nSunday: 10AM – 4PM'],
          ].map(([icon, label, content]) => (
            <div key={label}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
              <div style={{ fontWeight: 600, color: 'var(--color-accent)', marginBottom: 7, textTransform: 'uppercase', fontSize: 11, letterSpacing: '1.5px' }}>{label}</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13.5, lineHeight: 1.9, whiteSpace: 'pre-line' }}>{content}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default function TourCard({ tour, onClick }) {
  return (
    <div onClick={() => onClick(tour)}
      className="group cursor-pointer rounded-2xl overflow-hidden border border-black/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="overflow-hidden h-52">
        <img src={tour.img} alt={tour.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <div className="text-[10px] uppercase tracking-[2px] font-semibold mb-1" style={{ color: 'var(--color-accent)' }}>
          {tour.dest}
        </div>
        <h3 className="font-display text-xl font-semibold mb-3 leading-snug" style={{ color: 'var(--color-primary)' }}>
          {tour.title}
        </h3>
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs text-gray-500">⏱ {tour.dur}</span>
          <span className="font-display text-xl font-bold" style={{ color: 'var(--color-primary)' }}>
            ₹{tour.price.toLocaleString()}
          </span>
        </div>
        <button className="w-full py-2.5 rounded-lg text-sm font-semibold text-white tracking-wide transition hover:opacity-90"
          style={{ background: 'var(--color-primary)' }}>
          View Details →
        </button>
      </div>
    </div>
  )
}

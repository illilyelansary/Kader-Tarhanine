import { bio, members, timeline } from '@/data/band.js'
import liveMicro from '@/assets/photos/kader-live-micro.jpg'

export default function Biographie() {
  return (
    <section id="biographie" className="py-20 sm:py-28">
      <div className="wrap">
        <h2 className="section-title text-night">Biographie</h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5 text-[1.0625rem] leading-relaxed max-w-[68ch]">
            {bio.map((p, i) => (
              <p key={i} className={i === 0 ? 'text-xl text-ink' : 'text-ink/85'}>{p}</p>
            ))}
          </div>
          <figure>
            <img src={liveMicro} alt="Kader Tarhanine chantant sur scène, guitare électrique" loading="lazy" className="aspect-[4/5] w-full rounded-lg object-cover" />
            <figcaption className="mt-2 text-sm text-mute">Sur scène, tournée européenne 2025</figcaption>
          </figure>
        </div>

        {/* Repères */}
        <div className="mt-20">
          <h3 className="font-display text-4xl font-bold text-night">Repères</h3>
          <ol className="mt-8 border-l-2 border-dye/25">
            {timeline.map((t) => (
              <li key={t.year} className="relative grid gap-1 pb-7 pl-8 sm:grid-cols-[6rem_1fr] sm:gap-6">
                <span aria-hidden="true" className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-dye" />
                <span className="font-display text-3xl font-extrabold leading-none text-dye">{t.year}</span>
                <span className="text-ink/85">{t.text}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Groupe */}
        <div className="mt-16">
          <h3 className="font-display text-4xl font-bold text-night">Le groupe</h3>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {members.map((m) => (
              <li key={m.name}>
                <img src={m.photo} alt={m.name} loading="lazy" className="aspect-square w-full rounded-lg object-cover" />
                <p className="mt-3 font-display text-2xl font-bold leading-tight text-night">{m.name}</p>
                <p className="text-mute">{m.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

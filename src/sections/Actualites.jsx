import Ext from '@/components/Ext.jsx'
import { news, socialProfiles } from '@/data/news.js'
import { formatDay } from '@/lib/dates.js'

export default function Actualites() {
  return (
    <section id="actualites" className="py-20 sm:py-28">
      <div className="wrap grid gap-14 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <h2 className="section-title text-night">Actualités</h2>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {news.map((n) => {
              const internal = n.href.startsWith('#')
              const Link = internal ? 'a' : Ext
              return (
                <li key={n.date + n.platform} className="grid gap-2 py-5 sm:grid-cols-[9rem_1fr]">
                  <div>
                    <p className="text-sm text-mute">{formatDay(n.date)}</p>
                    <span className="tag mt-1">{n.platform}</span>
                  </div>
                  <div>
                    <p className="text-lg">{n.text}</p>
                    <Link href={n.href} className="mt-1 inline-block font-semibold text-dye underline-offset-4 hover:underline">{n.cta}</Link>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-4xl font-bold text-night lg:mt-4">Suivre l'artiste</h3>
          <ul className="mt-8 space-y-3">
            {socialProfiles.map((s) => (
              <li key={s.platform + s.handle}>
                <Ext href={s.href} className="flex items-center justify-between rounded-lg border border-line bg-white px-5 py-4 transition-colors hover:border-dye">
                  <span>
                    <span className="block font-semibold">{s.platform}</span>
                    <span className="block text-sm text-mute">{s.handle}</span>
                  </span>
                  {s.followers && (
                    <span className="text-right">
                      <span className="block font-display text-3xl font-extrabold leading-none text-dye">{s.followers}</span>
                      <span className="block text-xs text-mute">abonnés</span>
                    </span>
                  )}
                </Ext>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

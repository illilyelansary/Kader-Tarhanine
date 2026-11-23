import { useMemo } from 'react'
import { Play } from 'lucide-react'
import portrait from '@/assets/photos/kader-portrait-studio.jpg'
import { concerts } from '@/data/concerts.js'
import { links } from '@/data/links.js'
import { formatRange, isOngoing, isOver, parseDate } from '@/lib/dates.js'
import Ext from '@/components/Ext.jsx'

export default function Hero() {
  const next = useMemo(
    () => concerts.filter((c) => !isOver(c)).sort((a, b) => parseDate(a.date) - parseDate(b.date))[0],
    []
  )

  return (
    <section id="accueil" className="relative overflow-hidden bg-night text-white">
      {/* trame de dunes discrète */}
      <svg aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-48 lg:block w-full text-night-2" preserveAspectRatio="none" viewBox="0 0 1440 200">
        <path fill="currentColor" d="M0 140 C 240 60 420 60 640 120 S 1060 200 1440 90 L1440 200 L0 200 Z" />
      </svg>

      <div className="wrap relative grid min-h-[100svh] items-center gap-10 pb-16 pt-28 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:pt-20">
        <div>
          <p className="rise text-lg text-saffron">Blues touareg, du Sahara aux scènes du monde</p>
          <h1 className="rise rise-2 mt-4 font-display font-black uppercase leading-[0.82] text-[clamp(3.6rem,19vw,7.5rem)] lg:text-[clamp(5rem,8.4vw,9rem)]">
            Kader<br />Tarhanine
          </h1>
          <p className="rise rise-3 mt-6 max-w-xl text-lg text-white/80">
            Guitares électriques, poésie tamasheq et rythmes nomades : la voix de la jeunesse saharienne,
            entre le Mali, le Niger et l'Algérie.
          </p>

          {next && (
            <a href="#tournee" className="rise rise-3 group mt-8 flex max-w-xl items-center gap-5 border-l-4 border-saffron py-1 pl-5">
              <span>
                <span className="block text-sm text-white/60">{isOngoing(next) ? 'En ce moment' : 'Prochain concert'}</span>
                <span className="block font-display text-3xl font-bold group-hover:text-saffron">
                  {next.city}, {formatRange(next, false)}
                </span>
                <span className="block text-white/70">{next.title}</span>
              </span>
            </a>
          )}

          <div className="rise rise-3 mt-8 flex flex-wrap gap-3">
            <a href="#tournee" className="btn btn-saffron">Voir la tournée</a>
            <Ext href={links.spotify} className="btn btn-ghost-light">
              <Play size={16} aria-hidden="true" /> Écouter sur Spotify
            </Ext>
          </div>
        </div>

        <figure className="rise rise-2 relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="overflow-hidden rounded-t-[999px] bg-white">
            <img
              src={portrait}
              alt="Kader Tarhanine en tenue touarègue, guitare à la main"
              className="aspect-[4/5] w-full object-cover object-top"
              fetchpriority="high"
            />
          </div>
        </figure>
      </div>
    </section>
  )
}

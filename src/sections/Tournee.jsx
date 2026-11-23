import { useCallback, useMemo, useState } from 'react'
import { Bell, MapPin, ChevronDown } from 'lucide-react'
import BandsintownWidget from '@/components/BandsintownWidget.jsx'
import Ext from '@/components/Ext.jsx'
import { concerts } from '@/data/concerts.js'
import { links } from '@/data/links.js'
import { formatRange, formatShort, isOngoing, isOver, parseDate } from '@/lib/dates.js'

function UpcomingFallback({ list }) {
  if (list.length === 0) {
    return (
      <p className="text-white/80">
        Aucune date annoncée pour le moment. Suivez l'artiste sur Bandsintown pour être prévenu de la prochaine.
      </p>
    )
  }
  return (
    <ol className="divide-y divide-white/10">
      {list.map((c) => {
        const d = formatShort(c.date)
        return (
          <li key={`${c.date}-${c.city}`} className="grid grid-cols-[4.5rem_1fr] gap-4 py-5 sm:grid-cols-[5.5rem_1fr_auto] sm:items-center">
            <div className="font-display leading-none text-saffron">
              <span className="block text-5xl font-extrabold">{d.day}</span>
              <span className="block text-xl font-semibold">{d.month}{c.endDate ? ` → ${formatShort(c.endDate).day}` : ''}</span>
            </div>
            <div>
              <p className="font-display text-3xl font-bold">
                {c.city}
                {isOngoing(c) && <span className="ml-3 align-middle font-sans text-xs font-semibold text-night bg-saffron rounded-full px-2 py-0.5">En cours</span>}
              </p>
              <p className="text-white/75">{c.title}, {c.country}</p>
              {c.note && <p className="text-sm text-white/55">{c.note}</p>}
            </div>
            {c.url && (
              <Ext href={c.url} className="btn btn-saffron col-start-2 justify-self-start sm:col-start-3">Billets</Ext>
            )}
          </li>
        )
      })}
    </ol>
  )
}

export default function Tournee() {
  const [widgetFailed, setWidgetFailed] = useState(false)
  const onFail = useCallback(() => setWidgetFailed(true), [])

  const { upcoming, pastByYear } = useMemo(() => {
    const up = concerts.filter((c) => !isOver(c)).sort((a, b) => parseDate(a.date) - parseDate(b.date))
    const past = concerts.filter((c) => isOver(c)).sort((a, b) => parseDate(b.date) - parseDate(a.date))
    const groups = new Map()
    past.forEach((c) => {
      const y = c.date.slice(0, 4)
      if (!groups.has(y)) groups.set(y, [])
      groups.get(y).push(c)
    })
    return { upcoming: up, pastByYear: [...groups.entries()] }
  }, [])

  const tourName = upcoming.find((c) => c.tour)?.tour

  return (
    <section id="tournee" className="bg-night-2 py-20 text-white sm:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="section-title">Tournée</h2>
          {tourName && <p className="mt-3 font-display text-3xl font-semibold text-saffron">{tourName}</p>}
          <p className="mt-5 text-white/75">
            Les dates sont mises à jour en direct depuis Bandsintown et apparaissent aussi sur Spotify
            et Apple Music. Organisateurs et festivals : écrivez au booking.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Ext href={links.bandsintown} className="btn btn-saffron">
              <Bell size={16} aria-hidden="true" /> Être alerté des nouvelles dates
            </Ext>
            <a href="#contact" className="btn btn-ghost-light">Booking</a>
          </div>
        </div>

        <div>
          {!widgetFailed && <BandsintownWidget onFail={onFail} />}
          {widgetFailed && <UpcomingFallback list={upcoming} />}
          {upcoming.length > 0 && <p className="mt-6 text-white/60">D'autres dates à venir.</p>}

          <details className="group mt-12 border-t border-white/15 pt-6">
            <summary className="flex cursor-pointer list-none items-center justify-between font-display text-3xl font-bold hover:text-saffron">
              Concerts passés
              <ChevronDown className="transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="mt-6 space-y-8">
              {pastByYear.map(([year, list]) => (
                <div key={year}>
                  <h3 className="font-display text-2xl font-bold text-saffron">{year}</h3>
                  <ul className="mt-2 divide-y divide-white/10">
                    {list.map((c) => (
                      <li key={`${c.date}-${c.city}`} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3">
                        <span>
                          <span className="font-semibold">{c.title}</span>
                          <span className="flex items-center gap-1.5 text-sm text-white/65">
                            <MapPin size={13} aria-hidden="true" /> {c.city}, {c.country}
                          </span>
                        </span>
                        <span className="text-sm text-white/65">
                          {formatRange(c)}
                          {c.url && <>, <Ext href={c.url} className="underline hover:text-saffron">source</Ext></>}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>
        </div>
      </div>
    </section>
  )
}

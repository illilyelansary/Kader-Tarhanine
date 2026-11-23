import React, { useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { MapPin, ExternalLink, Clock, Ticket } from 'lucide-react'

/**
 * Concerts & festivals
 * - date    : jour du concert (AAAA-MM-JJ), ou premier jour d'un festival
 * - endDate : (facultatif) dernier jour d'un festival sur plusieurs jours
 * - tour    : (facultatif) nom de la tournée, pour regrouper les dates
 * - url     : (facultatif) page de l'événement ou billetterie
 * Les dates passent automatiquement de « Prochains concerts » à « Passés »
 * le lendemain du dernier jour.
 */
const TOURNEE_AUTOMNE = 'Tournée Automne 2026'

const events = [
  // ── Tournée Automne 2026 (Essakane Production) ──
  {
    date: '2026-11-22', endDate: '2026-11-24',
    title: 'World Culture Festival',
    city: 'Karachi', country: 'Pakistan',
    tour: TOURNEE_AUTOMNE
  },
  {
    date: '2026-11-26',
    title: 'Moods',
    city: 'Zurich', country: 'Suisse',
    tour: TOURNEE_AUTOMNE
  },
  {
    date: '2026-11-27',
    title: 'Festival Africolor — Salle Jacques Brel',
    city: 'Pantin (Paris)', country: 'France',
    tour: TOURNEE_AUTOMNE
  },
  {
    date: '2026-11-28',
    title: 'Le Singe',
    city: 'Bienne (Biel)', country: 'Suisse',
    tour: TOURNEE_AUTOMNE
  },
  {
    date: '2026-12-01',
    title: 'Import Export',
    city: 'Munich', country: 'Allemagne',
    note: 'Portes 19:00 • Concert 21:15 — Schwere-Reiter-Str. 2h, 80636 München',
    tour: TOURNEE_AUTOMNE
  },
  {
    date: '2026-12-03',
    title: 'Mixtape',
    city: 'Sofia', country: 'Bulgarie',
    tour: TOURNEE_AUTOMNE
  },
  {
    date: '2026-12-07',
    title: 'Divadlo Dobeška',
    city: 'Prague', country: 'Tchéquie',
    tour: TOURNEE_AUTOMNE
  },
  {
    date: '2026-12-21',
    title: 'Blues Désert Festival',
    city: 'Djanet', country: 'Algérie',
    tour: TOURNEE_AUTOMNE
  },
  {
    date: '2026-12-25', endDate: '2026-12-27',
    title: 'Festival International des Arts et de la Culture',
    city: 'Ain Farba', country: 'Mauritanie',
    tour: TOURNEE_AUTOMNE
  },

  // ── 2025 ──
  {
    date: '2025-08-09',
    title: 'African Beats Festival',
    city: 'Kawęczyn (Varsovie)', country: 'Pologne',
    note: 'Concert à 18:00',
    url: 'https://africanbeats.pl/kader-tarhanine/'
  },
  {
    date: '2025-08-02',
    title: 'Expo Osaka 2025 — Journée du Mali',
    city: 'Osaka', country: 'Japon',
    note: 'Show Journée nationale du Mali',
    url: 'https://maliactu.net/expo-universelle-osaka-2025-mali-a-lhonneur-avec-une-journee-speciale/'
  },
  {
    date: '2025-07-27',
    title: 'Sfinks Mixed',
    city: 'Boechout', country: 'Belgique',
    note: 'Concert',
    url: 'https://avanzert.com/concert/kader-tarhanine-sfinks-festival-2025-07-27/'
  },
  {
    date: '2025-07-06',
    title: 'Rudolstadt Festival',
    city: 'Rudolstadt', country: 'Allemagne',
    note: 'Show festival',
    url: 'https://www.rudolstadt-festival.de/en/program/artistdetail/kader-tarhanine.html'
  },

  // ── 2024 ──
  {
    date: '2024-07-27',
    title: "Théâtre de l'Orangerie",
    city: 'Genève', country: 'Suisse',
    note: 'Concert',
    url: 'https://leprogramme.ch/concerts/kader-tarhanine'
  },
  {
    date: '2024-07-06',
    title: 'Festival Tunis sur Seine',
    city: 'Aubervilliers (Paris)', country: 'France',
    note: 'Festival',
    url: 'https://www.fnactickets.com/ticket-evenement/musique-electronique-ktyb-kader-tarhanine-benboo-man67324-lt.htm'
  },
  {
    date: '2024-07-04',
    title: 'Roskilde Festival',
    city: 'Roskilde', country: 'Danemark',
    note: 'GAIA Stage',
    url: 'https://www.setlist.fm/setlist/kader-tarhanine/2024/dyrskuepladsen-roskilde-denmark-1357d1a1.html'
  },
  {
    date: '2024-07-02',
    title: 'Sala Upload',
    city: 'Barcelone', country: 'Espagne',
    note: 'Concert',
    url: 'https://dice.fm/event/ry2wvy-kader-tarhanine-2nd-jul-sala-upload-barcelona-tickets?lng=fr'
  },
  {
    date: '2024-06-30',
    title: 'Rotterdam Bluegrass Festival',
    city: 'Rotterdam', country: 'Pays-Bas',
    note: 'Festival',
    url: 'https://www.setlist.fm/setlist/kader-tarhanine/2024/noordplein-rotterdam-netherlands-6b5782ee.html'
  }
]

// « AAAA-MM-JJ » lu en heure locale (new Date('AAAA-MM-JJ') lit en UTC
// et peut afficher la veille selon le fuseau du visiteur).
const parseDate = (iso) => {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

const formatDate = (iso) =>
  parseDate(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

const formatRange = (e) => {
  if (!e.endDate) return formatDate(e.date)
  const start = parseDate(e.date)
  const end = parseDate(e.endDate)
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${start.getDate()}–${formatDate(e.endDate)}`
  }
  return `${start.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })} – ${formatDate(e.endDate)}`
}

const openLink = (url) => window.open(url, '_blank', 'noopener,noreferrer')

function EventItem({ e, accent, linkLabel, today }) {
  const ongoing = parseDate(e.date) <= today && parseDate(e.endDate || e.date) >= today
  return (
    <div className={`border-l-4 ${accent} pl-6`}>
      <h4 className="font-semibold text-lg flex flex-wrap items-center gap-2">
        {e.title}
        {ongoing && (
          <span className="text-xs font-semibold uppercase tracking-wide bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
            En cours
          </span>
        )}
      </h4>
      <p className="text-gray-600 flex items-center mt-2">
        <MapPin size={16} className="mr-2 shrink-0" />
        {e.city}, {e.country} • {formatRange(e)}
      </p>
      {e.note && (
        <p className="text-sm text-gray-500 mt-1 flex items-start">
          <Clock size={14} className="mr-2 mt-0.5 shrink-0" />
          {e.note}
        </p>
      )}
      {e.url && (
        <div className="mt-3">
          <Button size="sm" variant="outline" onClick={() => openLink(e.url)}>
            {linkLabel} <ExternalLink size={14} className="ml-1" />
          </Button>
        </div>
      )}
    </div>
  )
}

export default function Concerts() {
  const today = useMemo(() => new Date(new Date().toDateString()), [])

  const { upcoming, past } = useMemo(() => {
    const isOver = (e) => parseDate(e.endDate || e.date) < today
    const up = events.filter(e => !isOver(e))
      .sort((a, b) => parseDate(a.date) - parseDate(b.date)) // le plus proche d'abord
    const pa = events.filter(isOver)
      .sort((a, b) => parseDate(b.date) - parseDate(a.date)) // le plus récent d'abord
    return { upcoming: up, past: pa }
  }, [today])

  // Regroupe les prochaines dates par tournée (les dates hors tournée restent à part)
  const groups = useMemo(() => {
    const map = new Map()
    upcoming.forEach(e => {
      const key = e.tour || ''
      if (!map.has(key)) map.set(key, [])
      map.get(key).push(e)
    })
    return [...map.entries()]
  }, [upcoming])

  return (
    <section id="concerts" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 tuareg-blue">Concerts & Tournées</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* À venir */}
            <div className="hover-lift">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 desert-orange">Prochains concerts</h3>

                  {upcoming.length === 0 && (
                    <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-800">
                      Aucune date publique annoncée pour le moment. Revenez bientôt !
                    </div>
                  )}

                  {groups.map(([tour, list]) => (
                    <div key={tour || 'hors-tournee'} className="mb-8 last:mb-0">
                      {tour && (
                        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-white">
                          <p className="flex items-center text-lg font-bold">
                            <Ticket size={20} className="mr-2" /> {tour}
                          </p>
                          <p className="text-sm text-white/90 mt-1">
                            {list.length} date{list.length > 1 ? 's' : ''} • Essakane Production présente
                          </p>
                        </div>
                      )}
                      <div className="space-y-6">
                        {list.map((e) => (
                          <EventItem key={`${e.date}-${e.city}`} e={e} accent="border-orange-500" linkLabel="Billets & infos" today={today} />
                        ))}
                      </div>
                    </div>
                  ))}

                  {upcoming.length > 0 && (
                    <p className="text-sm text-gray-500 mt-6 italic">D'autres dates à venir !</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Récents & passés */}
            <div className="hover-lift">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 desert-orange">Concerts & festivals passés</h3>
                  <div className="space-y-6">
                    {past.map((e) => (
                      <EventItem key={`${e.date}-${e.city}`} e={e} accent="border-blue-500" linkLabel="Voir la source" today={today} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

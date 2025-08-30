import React, { useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { MapPin, ExternalLink } from 'lucide-react'

/**
 * Données concerts/festivals (mêmes que précédemment)
 * NB : Aucune date future confirmée au 30/08/2025 → "Prochains concerts" affiche un message.
 */
const events = [
  // 2025 (passés récents)
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

  // 2024
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

const openLink = (url) => window.open(url, '_blank', 'noopener,noreferrer')
const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })

export default function Concerts() {
  // Séparation & tri : du plus récent au plus ancien (passés), et du plus proche au plus lointain (si des futurs existaient)
  const { upcoming, past } = useMemo(() => {
    const todayMidnight = new Date(new Date().toDateString())
    const up = events.filter(e => new Date(e.date) >= todayMidnight)
                     .sort((a, b) => new Date(b.date) - new Date(a.date))
    const pa = events.filter(e => new Date(e.date) < todayMidnight)
                     .sort((a, b) => new Date(b.date) - new Date(a.date))
    return { upcoming: up, past: pa }
  }, [])

  return (
    <section id="concerts" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 tuareg-blue">Concerts & Festivals</h2>

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

                  {upcoming.length > 0 && (
                    <div className="space-y-6">
                      {upcoming.map((e, idx) => (
                        <div key={idx} className="border-l-4 border-orange-500 pl-6">
                          <h4 className="font-semibold text-lg">{e.title}</h4>
                          <p className="text-gray-600 flex items-center mt-2">
                            <MapPin size={16} className="mr-2" />
                            {e.city}, {e.country} • {formatDate(e.date)}
                          </p>
                          {e.note && <p className="text-sm text-gray-500 mt-1">{e.note}</p>}
                          {e.url && (
                            <div className="mt-3">
                              <Button size="sm" variant="outline" onClick={() => openLink(e.url)}>
                                Détails <ExternalLink size={14} className="ml-1" />
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Récents & passés */}
            <div className="hover-lift">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 desert-orange">Festivals récents & passés</h3>
                  <div className="space-y-6">
                    {past.map((e, idx) => (
                      <div key={idx} className="border-l-4 border-blue-500 pl-6">
                        <h4 className="font-semibold text-lg">{e.title}</h4>
                        <p className="text-gray-600 flex items-center mt-2">
                          <MapPin size={16} className="mr-2" />
                          {e.city}, {e.country} • {formatDate(e.date)}
                        </p>
                        {e.note && <p className="text-sm text-gray-500 mt-1">{e.note}</p>}
                        {e.url && (
                          <div className="mt-3">
                            <Button size="sm" variant="outline" onClick={() => openLink(e.url)}>
                              Voir la source <ExternalLink size={14} className="ml-1" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Listes triées du plus récent au plus ancien (passés), et du plus proche au plus lointain (si des dates à venir existent).
          </p>
        </div>
      </div>
    </section>
  )
}

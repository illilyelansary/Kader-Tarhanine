import React, { useMemo, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Play, Youtube, ExternalLink, Star, ChevronDown, ChevronUp } from 'lucide-react'

const openLink = (url) => window.open(url, '_blank', 'noopener,noreferrer')

// Singles / Clips (déjà ordonnés du plus récent au plus ancien)
const singles = [
  { title: 'la la la (H MED 45 ft. Kader Tarhanine)', meta: 'Collaboration • 2025', youtube: 'https://www.youtube.com/watch?v=-RQ7DgMvtic' },
  { title: 'Zain Assahra (feat. Mouna Dendenni)', meta: 'Single • 2024', youtube: 'https://www.youtube.com/watch?v=PyFJuUKZUh4' },
  { title: 'Aliad Idja Ehane', meta: 'Single • 2024', youtube: 'https://www.youtube.com/watch?v=AOtoOIzTUl8' },
  { title: 'Meddane Taknassam (feat. Bombino)', meta: 'Single • 2024', youtube: 'https://www.youtube.com/watch?v=ALch4yaE7_g' },
  { title: 'Inizdiam', meta: 'Clip • 2023', youtube: 'https://www.youtube.com/watch?v=X_ClhuYqbsM' },
  { title: 'Algamra Leila', meta: 'Clip • 2019', youtube: 'https://www.youtube.com/watch?v=Sp0Fn4VI1yQ' },
  { title: 'Imanine', meta: 'Clip (Ikewane) • 2019', youtube: 'https://www.youtube.com/watch?v=WJbYL1Zu_0Q' },
  { title: 'Tarhanine (feat. Sidiki Diabaté)', meta: 'Collaboration • 2018', youtube: 'https://www.youtube.com/watch?v=pM7sdSJtDgU' }
]

// ----------- Mises en avant : liste + état courant -----------
const featuredReleases = [
  {
    date: '2025-08',
    artist: 'Kader Tarhanine',
    title: 'Ahegh Akal dagh warlegh tinnah',
    context: 'Rad Fyah Studio — Live Session',
    url: 'https://www.youtube.com/watch?v=jr5eMSLPKuo',
    youtubeId: 'jr5eMSLPKuo'
  },
  {
    date: '2025-07',
    artist: 'H MED 45 ft. Kader Tarhanine',
    title: 'la la la',
    context: 'Collaboration',
    url: 'https://www.youtube.com/watch?v=-RQ7DgMvtic',
    youtubeId: '-RQ7DgMvtic'
  },
  {
    date: '2024-11',
    artist: 'Kader Tarhanine ft. Mouna Dendenni',
    title: 'Zain Assahra',
    context: 'Single',
    url: 'https://www.youtube.com/watch?v=PyFJuUKZUh4',
    youtubeId: 'PyFJuUKZUh4'
  },
  {
    date: '2024-09',
    artist: 'Kader Tarhanine',
    title: 'Aliad Idja Ehane',
    context: 'Single',
    url: 'https://www.youtube.com/watch?v=AOtoOIzTUl8',
    youtubeId: 'AOtoOIzTUl8'
  },
  {
    date: '2024-06',
    artist: 'Kader Tarhanine ft. Bombino',
    title: 'Meddane Taknassam',
    context: 'Single',
    url: 'https://www.youtube.com/watch?v=ALch4yaE7_g',
    youtubeId: 'ALch4yaE7_g'
  },
  {
    date: '2023-04',
    artist: 'Kader Tarhanine',
    title: 'Inizdiam',
    context: 'Clip',
    url: 'https://www.youtube.com/watch?v=X_ClhuYqbsM',
    youtubeId: 'X_ClhuYqbsM'
  },
]

const monthLabel = (isoYYYYMM) => {
  const [y, m] = isoYYYYMM.split('-').map(Number)
  return new Date(y, (m || 1) - 1, 1).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
}

export default function Musique({ onGotoVideos }) {
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0)
  const currentFeatured = featuredReleases[currentFeaturedIndex]
  const [archiveOpen, setArchiveOpen] = useState(true)

  return (
    <section id="musique" className="py-20 bg-gradient-to-r from-amber-100 to-orange-100">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 tuareg-blue">Musique</h2>

          {/* Fenêtre nouvelle sortie */}
          <Card className="mb-4 hover-lift">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <span className="inline-flex items-center text-xs uppercase tracking-wide px-3 py-1 rounded-full bg-orange-100 text-orange-700 mb-3">
                    <Star size={14} className="mr-1" /> Nouveau — {monthLabel(currentFeatured.date)}
                  </span>
                  <h3 className="text-2xl font-bold tuareg-blue">
                    {currentFeatured.artist} — {currentFeatured.title}
                  </h3>
                  <p className="text-gray-700 mt-1">{currentFeatured.context}</p>

                  <div className="mt-4 flex gap-3">
                    <Button className="bg-red-600 hover:bg-red-700" onClick={() => openLink(currentFeatured.url)}>
                      <Youtube size={18} className="mr-2" />
                      Regarder sur YouTube
                    </Button>
                    <Button variant="outline" onClick={onGotoVideos}>
                      Plus de vidéos
                    </Button>
                  </div>
                </div>

                {/* Lecteur YouTube responsive */}
                <div className="w-full md:w-[520px]">
                  <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden shadow">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${currentFeatured.youtubeId}`}
                      title={`${currentFeatured.artist} - ${currentFeatured.title}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Archive des mises en avant */}
          <Card className="mb-12 hover-lift">
            <CardContent className="p-4 md:p-5">
              <div className="flex items-center justify-between">
                <div className="font-semibold tuareg-blue">Archive des mises en avant</div>
                <button
                  onClick={() => setArchiveOpen((v) => !v)}
                  className="inline-flex items-center text-sm text-slate-600 hover:text-slate-800"
                  aria-expanded={archiveOpen}
                >
                  {archiveOpen ? <>Réduire <ChevronUp size={16} className="ml-1" /></> : <>Développer <ChevronDown size={16} className="ml-1" /></>}
                </button>
              </div>

              {archiveOpen && (
                <div className="mt-4">
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {featuredReleases.map((r, idx) => {
                      const isActive = idx === currentFeaturedIndex
                      return (
                        <button
                          key={`${r.youtubeId}-${idx}`}
                          onClick={() => setCurrentFeaturedIndex(idx)}
                          className={`shrink-0 text-left px-4 py-3 rounded-xl border transition-all ${
                            isActive
                              ? 'bg-white border-orange-300 shadow text-orange-700'
                              : 'bg-white/60 border-slate-200 hover:bg-white'
                          }`}
                          title={`${r.artist} — ${r.title}`}
                        >
                          <div className="text-xs text-slate-500">{monthLabel(r.date)}</div>
                          <div className="font-medium whitespace-nowrap max-w-[220px] overflow-hidden text-ellipsis">
                            {r.artist} — {r.title}
                          </div>
                          <div className="text-xs text-slate-500 whitespace-nowrap max-w-[220px] overflow-hidden text-ellipsis">
                            {r.context}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Albums */}
            <Card className="hover-lift">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 desert-orange">Albums</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                    <div>
                      <h4 className="font-semibold">Ikewane</h4>
                      <p className="text-gray-600">Album • 2019</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-orange-600 hover:bg-orange-700"
                        onClick={() => openLink('https://open.spotify.com/intl-fr/album/4khQAqdVbydwxkGmCTixu7')}
                        aria-label="Écouter Ikewane sur Spotify"
                      >
                        <Play size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openLink('https://music.apple.com/fr/artist/kader-tarhanine/1391675149')}
                        aria-label="Voir sur Apple Music"
                      >
                        Apple
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                    <div>
                      <h4 className="font-semibold">Tenere</h4>
                      <p className="text-gray-600">Album • 2017</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-orange-600 hover:bg-orange-700"
                        onClick={() => openLink('https://open.spotify.com/intl-fr/album/3M1ibb7qJILS8kiI5rXTl3')}
                        aria-label="Écouter Tenere sur Spotify"
                      >
                        <Play size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openLink('https://music.apple.com/fr/artist/kader-tarhanine/1391675149')}
                        aria-label="Voir sur Apple Music"
                      >
                        Apple
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Singles / Clips */}
            <Card className="hover-lift">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 desert-orange">Singles / Clips</h3>
                <div className="space-y-4">
                  {singles.map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                      <div>
                        <h4 className="font-semibold">{s.title}</h4>
                        <p className="text-gray-600">{s.meta}</p>
                      </div>
                      <div className="flex gap-2">
                        {s.youtube && (
                          <Button
                            size="sm"
                            className="bg-red-600 hover:bg-red-700"
                            onClick={() => openLink(s.youtube)}
                            aria-label={`Voir ${s.title} sur YouTube`}
                          >
                            <Youtube size={16} />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Plateformes */}
          <div className="text-center mt-12">
            <h3 className="text-2xl font-bold mb-6 tuareg-blue">Écouter sur les plateformes</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://open.spotify.com/intl-fr/artist/7Et5H8GXkBE3F2nFolwyPV"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-lg font-medium transition-all inline-flex items-center"
              >
                Spotify <ExternalLink size={16} className="ml-2" />
              </a>
              <a
                href="https://music.apple.com/fr/artist/kader-tarhanine/1391675149"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-full text-lg font-medium transition-all inline-flex items-center"
              >
                Apple Music <ExternalLink size={16} className="ml-2" />
              </a>
              <a
                href="https://www.youtube.com/@EssakaneProduction"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full text-lg font-medium transition-all inline-flex items-center"
              >
                YouTube Music <ExternalLink size={16} className="ml-2" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

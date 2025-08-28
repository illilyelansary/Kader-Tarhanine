// src/components/Videos.jsx
import React, { useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Play, Youtube, ExternalLink } from 'lucide-react'

/* -------------------- Helpers YouTube -------------------- */
const getYouTubeId = (url = '') => {
  // Gère: https://www.youtube.com/watch?v=ID, https://youtu.be/ID, shorts
  const match =
    url.match(/(?:youtube\.com.*[?&]v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/) ||
    url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/) ||
    url.match(/youtube\.com\/live\/([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
}

const getYouTubeThumb = (id, quality = 'max') => {
  const file = quality === 'max' ? 'maxresdefault.jpg' : 'hqdefault.jpg'
  return `https://img.youtube.com/vi/${id}/${file}`
}

const getClipThumb = (item) => {
  const id = getYouTubeId(item.url)
  if (id) return getYouTubeThumb(id, 'max')
  return item.thumbnail || 'https://via.placeholder.com/480x270/f97316/ffffff?text=Video'
}

const handleThumbError = (e) => {
  const src = e.currentTarget.getAttribute('src') || ''
  if (src.includes('maxresdefault')) {
    e.currentTarget.setAttribute('src', src.replace('maxresdefault.jpg', 'hqdefault.jpg'))
  } else {
    e.currentTarget.setAttribute('src', 'https://via.placeholder.com/480x270/f97316/ffffff?text=Video')
  }
}

/* -------------------- Helpers Concerts -------------------- */
const handleConcertThumbError = (e) => {
  const src = e.currentTarget.getAttribute('src') || ''
  if (src.includes('maxresdefault')) {
    e.currentTarget.setAttribute('src', src.replace('maxresdefault.jpg', 'hqdefault.jpg'))
  } else {
    e.currentTarget.setAttribute('src', 'https://via.placeholder.com/640x360/f97316/ffffff?text=Concert+Live')
  }
}

const getConcertThumb = (item) => {
  const id = getYouTubeId(item.url)
  if (id) return getYouTubeThumb(id, 'max')
  return item.thumbnail || 'https://via.placeholder.com/640x360/f97316/ffffff?text=Concert+Live'
}

// "DD.MM.YYYY" -> Date (supporte aussi "YYYY" fallback)
const parseDate = (d = '') => {
  if (!d) return null
  if (/^\d{4}$/.test(d)) return new Date(parseInt(d, 10), 0, 1)
  const [dd, mm, yyyy] = d.split('.').map((x) => parseInt(x, 10))
  if (!dd || !mm || !yyyy) return null
  return new Date(yyyy, mm - 1, dd)
}

/* -------------------- Données -------------------- */
const Videos = () => {
  /* CLIPS OFFICIELS — tu peux compléter si besoin */
  const clips = [
    {
      id: 'clip-1',
      title: 'Al Gamra Leila',
      year: '2019',
      url: 'https://www.youtube.com/watch?v=Sp0Fn4VI1yQ',
      views: 'Clip officiel',
    },
    {
      id: 'clip-2',
      title: 'Zain Assahra (feat. MOUNA DENDENNI)',
      year: '2024',
      url: 'https://www.youtube.com/watch?v=PyFJuUKZUh4',
      views: 'Clip officiel',
    },
    {
      id: 'clip-3',
      title: 'Tarhanine (feat. Sidiki Diabaté)',
      year: '2018',
      url: 'https://www.youtube.com/watch?v=pM7sdSJtDgU',
      views: 'Collaboration',
    },
    {
      id: 'clip-4',
      title: 'H MED 45 - la la la ft. KADER TARHANINE',
      year: '2025',
      url: 'https://www.youtube.com/watch?v=-RQ7DgMvtic',
      views: 'Nouveau',
    },
    {
      id: 'clip-5',
      title: 'Inizdiam',
      year: '2023',
      url: 'https://www.youtube.com/watch?v=X_ClhuYqbsM',
      views: 'Mélodie',
    },
    {
      id: 'clip-6',
      title: 'Imanine',
      year: '2019',
      url: 'https://www.youtube.com/watch?v=WJbYL1Zu_0Q',
      views: 'Clip Officiel de Ikewane',
    },
  ]

  /* ======== CONCERTS — URLs YouTube fournies ======== */
  // Entrée brute, par année avec toutes les URLs
  const concertsByYear = {
    2018: [
      'https://www.youtube.com/watch?v=P7JQ50A2hzw',
      'https://www.youtube.com/watch?v=-XeXI2l3uCI',
      'https://www.youtube.com/watch?v=aBDoLCCEO1A',
      'https://www.youtube.com/watch?v=i9dQmXE1FW0',
    ],
    2019: [
      'https://www.youtube.com/watch?v=8-ipFo9Cv0Y',
      'https://www.youtube.com/watch?v=Cz0stNeSv4A',
      'https://www.youtube.com/watch?v=43Oh-jlCfDE',
    ],
    2020: [
      'https://www.youtube.com/watch?v=ldGu37g6Q6w',
      'https://www.youtube.com/watch?v=JVVMKxFw0xY',
    ],
    2021: [
      'https://www.youtube.com/watch?v=Ih14h8y_TFE',
      'https://www.youtube.com/watch?v=x8EasewmEq8',
    ],
    2022: [
      'https://www.youtube.com/watch?v=p6SrI9zu-ZQ',
      'https://www.youtube.com/watch?v=3PO3aH0sse8',
      'https://www.youtube.com/watch?v=pUaDaOq7pA0',
      'https://www.youtube.com/watch?v=QlowuQy40Rw',
    ],
    2023: [
      'https://www.youtube.com/watch?v=AhivVaNpDyU',
      'https://www.youtube.com/watch?v=x75MKprzUcw',
      'https://www.youtube.com/watch?v=HQXdD8hRovY',
      'https://www.youtube.com/watch?v=MbTA3PKPI8U',
      'https://www.youtube.com/watch?v=lPG9HQBdmGI',
    ],
    2024: [
      'https://www.youtube.com/watch?v=xOQ69T4uFRU',
      'https://www.youtube.com/watch?v=cVLRB2a9D1E',
      'https://www.youtube.com/watch?v=CEmZdbQUueU',
      'https://www.youtube.com/watch?v=xEu0KJrFXQE',
      'https://www.youtube.com/watch?v=tB3ZpMkRnSM',
      'https://www.youtube.com/live/PSQUVoUoyYE',
    ],
    2025: [
      'https://www.youtube.com/watch?v=msRbmRgY6mc',
      'https://www.youtube.com/watch?v=hRZc0j_IYpw',
      'https://www.youtube.com/watch?v=73fLfq8hYSM',
      'https://www.youtube.com/watch?v=19Z8WbEIi9c',
      'https://www.youtube.com/watch?v=BrpyDEAWAAg',
      'https://www.youtube.com/watch?v=2c9RY-8Vd4Y',
      'https://www.youtube.com/watch?v=wctG2ujPsg4',
      'https://www.youtube.com/watch?v=njanaBpmVzA',
      'https://www.youtube.com/watch?v=0uzf_sofWmU',
      'https://www.youtube.com/watch?v=v3ke6Ay7bcM',
      'https://www.youtube.com/watch?v=m_BZd3DFywA',
    ],
  }

  // Bonus (YouTube seulement ; Dailymotion ignoré)
  const bonus = [
    'https://www.youtube.com/watch?v=HIEXKQNbxmU',
    'https://www.youtube.com/watch?v=Dqlj0scphdo',
  ]

  // On “aplati” les concerts et on génère des dates techniques DD.MM.YYYY
  const concerts = useMemo(() => {
    const rows = []
    const years = Object.keys(concertsByYear).map((y) => parseInt(y, 10)).sort((a, b) => a - b)

    years.forEach((year) => {
      const urls = concertsByYear[year].filter((u) => u.includes('youtube.com') || u.includes('youtu.be'))
      // Pour garder l'ordre d'entrée dans l'année, on incrémente le mois
      urls.forEach((url, idx) => {
        const month = String(Math.min(idx + 1, 12)).padStart(2, '0') // 01..12
        const day = '01'
        const id = getYouTubeId(url)
        rows.push({
          id: `c-${year}-${idx}`,
          title: `Concert Live — ${year}`,
          location: '—',
          date: `${day}.${month}.${year}`,
          url,
          // miniatures automatiques si ID ok
          thumbnail: id ? getYouTubeThumb(id, 'max') : undefined,
        })
      })
    })

    // Tri global chronologique (ancien -> récent)
    rows.sort((a, b) => (parseDate(a.date)?.getTime() ?? 0) - (parseDate(b.date)?.getTime() ?? 0))
    return rows
  }, [])

  const openVideo = (url) => window.open(url, '_blank', 'noopener,noreferrer')

  return (
    <section id="videos" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 tuareg-blue">Vidéos</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez les clips officiels et les performances live de Kader Tarhanine lors de ses concerts et festivals.
            </p>
          </div>

          {/* Clips Officiels */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 desert-orange">Clips Officiels</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {clips.map((clip) => {
                const thumb = getClipThumb(clip)
                return (
                  <Card
                    key={clip.id}
                    className="overflow-hidden hover-lift group cursor-pointer"
                    onClick={() => openVideo(clip.url)}
                  >
                    <div className="relative">
                      <img
                        src={thumb}
                        alt={clip.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={handleThumbError}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-orange-600 rounded-full p-4">
                          <Play size={24} className="text-white ml-1" />
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                        {clip.year}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-lg mb-2 line-clamp-2">{clip.title}</h4>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{clip.views}</span>
                        <Youtube size={16} />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Concerts Live - ordre chronologique */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 desert-orange">Concerts Live (chronologique)</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {concerts.map((concert) => {
                const thumb = getConcertThumb(concert)
                return (
                  <Card
                    key={concert.id}
                    className="overflow-hidden hover-lift group cursor-pointer"
                    onClick={() => openVideo(concert.url)}
                  >
                    <div className="relative">
                      <img
                        src={thumb}
                        alt={concert.title}
                        className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={handleConcertThumbError}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-orange-600 rounded-full p-4">
                          <Play size={32} className="text-white ml-1" />
                        </div>
                      </div>
                      <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        LIVE
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-xl mb-2">{concert.title}</h4>
                      <div className="flex items-center justify-between text-gray-600">
                        <span className="font-medium">{concert.location}</span>
                        <span>{concert.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Bonus */}
          {bonus.length > 0 && (
            <div>
              <h3 className="text-3xl font-bold mb-8 tuareg-blue">Bonus</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {bonus.map((url, i) => {
                  const id = getYouTubeId(url)
                  const thumb = id ? getYouTubeThumb(id, 'max') : 'https://via.placeholder.com/480x270/f97316/ffffff?text=Video'
                  return (
                    <Card
                      key={`bonus-${i}`}
                      className="overflow-hidden hover-lift group cursor-pointer"
                      onClick={() => openVideo(url)}
                    >
                      <div className="relative">
                        <img
                          src={thumb}
                          alt="Bonus"
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={handleThumbError}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-orange-600 rounded-full p-4">
                            <Play size={24} className="text-white ml-1" />
                          </div>
                        </div>
                        <div className="absolute top-4 right-4 bg-slate-800 text-white px-2 py-1 rounded text-xs font-medium">
                          Bonus
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-lg mb-2">Performance</h4>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Chaîne officielle</span>
                          <Youtube size={16} />
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}

          <div className="text-center mt-12">
            <Button
              onClick={() => window.open('https://www.youtube.com/@EssakaneProduction', '_blank', 'noopener,noreferrer')}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg rounded-full hover-lift"
            >
              <Youtube className="mr-2" size={20} />
              Voir toutes les vidéos sur YouTube
              <ExternalLink className="ml-2" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Videos

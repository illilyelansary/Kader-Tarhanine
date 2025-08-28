// src/components/Videos.jsx
import React, { useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Play, Youtube, ExternalLink, MapPin } from 'lucide-react'

/* ---------- Helpers ---------- */
const getYouTubeId = (url = '') => {
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

const getConcertThumb = (item) => {
  const id = getYouTubeId(item.url)
  if (id) return getYouTubeThumb(id, 'max')
  return item.thumbnail || 'https://via.placeholder.com/640x360/f97316/ffffff?text=Concert+Live'
}

const handleThumbError = (e) => {
  const src = e.currentTarget.getAttribute('src') || ''
  if (src.includes('maxresdefault')) {
    e.currentTarget.setAttribute('src', src.replace('maxresdefault.jpg', 'hqdefault.jpg'))
  } else {
    e.currentTarget.setAttribute('src', 'https://via.placeholder.com/640x360/f97316/ffffff?text=Concert+Live')
  }
}

const parseDate = (d = '') => {
  if (!d) return null
  if (/^\d{4}$/.test(d)) return new Date(parseInt(d, 10), 0, 1)
  const [dd, mm, yyyy] = d.split('.').map((x) => parseInt(x, 10))
  if (!dd || !mm || !yyyy) return null
  return new Date(yyyy, mm - 1, dd)
}

/* ---------- Data ---------- */
const concertsByYear = {
  2018: [
    {
      url: 'https://www.youtube.com/watch?v=P7JQ50A2hzw',
      title: 'Concert Live 2018',
      location: 'Algérie',
    },
    {
      url: 'https://www.youtube.com/watch?v=-XeXI2l3uCI',
      title: 'Festival 2018',
      location: 'Mali',
    },
    {
      url: 'https://www.youtube.com/watch?v=aBDoLCCEO1A',
      title: 'Concert Sahara',
      location: 'Niger',
    },
    {
      url: 'https://www.youtube.com/watch?v=i9dQmXE1FW0',
      title: 'Live 2018',
      location: 'Burkina Faso',
    },
  ],
  2019: [
    {
      url: 'https://www.youtube.com/watch?v=8-ipFo9Cv0Y',
      title: 'Concert Live',
      location: 'Maroc',
    },
    {
      url: 'https://www.youtube.com/watch?v=Cz0stNeSv4A',
      title: 'Festival 2019',
      location: 'Algérie',
    },
    {
      url: 'https://www.youtube.com/watch?v=43Oh-jlCfDE',
      title: 'Concert Touareg',
      location: 'Mali',
    },
  ],
  2020: [
    {
      url: 'https://www.youtube.com/watch?v=ldGu37g6Q6w',
      title: 'Concert Live 2020',
      location: 'Algérie',
    },
    {
      url: 'https://www.youtube.com/watch?v=JVVMKxFw0xY',
      title: 'Festival Touareg',
      location: 'Mali',
    },
  ],
  2021: [
    {
      url: 'https://www.youtube.com/watch?v=Ih14h8y_TFE',
      title: 'Concert Sahara',
      location: 'Niger',
    },
    {
      url: 'https://www.youtube.com/watch?v=x8EasewmEq8',
      title: 'Festival 2021',
      location: 'Burkina Faso',
    },
  ],
  2022: [
    {
      url: 'https://www.youtube.com/watch?v=p6SrI9zu-ZQ',
      title: 'Concert International',
      location: 'Maroc',
    },
    {
      url: 'https://www.youtube.com/watch?v=3PO3aH0sse8',
      title: 'Festival Live',
      location: 'France',
    },
    {
      url: 'https://www.youtube.com/watch?v=pUaDaOq7pA0',
      title: 'Concert Sahara 2022',
      location: 'Algérie',
    },
    {
      url: 'https://www.youtube.com/watch?v=QlowuQy40Rw',
      title: 'Festival Nomade',
      location: 'Niger',
    },
  ],
  2023: [
    {
      url: 'https://www.youtube.com/watch?v=AhivVaNpDyU',
      title: 'Festival 2023',
      location: 'Danemark',
    },
    {
      url: 'https://www.youtube.com/watch?v=x75MKprzUcw',
      title: 'Concert 2023',
      location: 'Hollande',
    },
    {
      url: 'https://www.youtube.com/watch?v=HQXdD8hRovY',
      title: 'Live Performance',
      location: 'Allemagne',
    },
    {
      url: 'https://www.youtube.com/watch?v=MbTA3PKPI8U',
      title: 'Festival Sahara',
      location: 'Maroc',
    },
    {
      url: 'https://www.youtube.com/watch?v=lPG9HQBdmGI',
      title: 'Concert Touareg',
      location: 'Mali',
    },
  ],
  2024: [
    {
      url: 'https://www.youtube.com/watch?v=xOQ69T4uFRU',
      title: 'Rotterdam Bluegrass Festival',
      location: 'Pays-Bas',
    },
    {
      url: 'https://www.youtube.com/watch?v=cVLRB2a9D1E',
      title: 'Concert Sahara',
      location: 'France',
    },
    {
      url: 'https://www.youtube.com/watch?v=CEmZdbQUueU',
      title: 'Roskilde Festival',
      location: 'Danemark',
    },
    {
      url: 'https://www.youtube.com/watch?v=xEu0KJrFXQE',
      title: 'Festival Nomade',
      location: 'Espagne',
    },
    {
      url: 'https://www.youtube.com/watch?v=tB3ZpMkRnSM',
      title: 'Concert Live',
      location: 'Italie',
    },
    {
      url: 'https://www.youtube.com/live/PSQUVoUoyYE',
      title: 'Festival Live',
      location: 'Japon',
    },
  ],
  2025: [
    {
      url: 'https://www.youtube.com/watch?v=msRbmRgY6mc',
      title: 'Concert Sahara 2025',
      location: 'Algérie',
    },
    {
      url: 'https://www.youtube.com/watch?v=hRZc0j_IYpw',
      title: 'Sfinks Mixed Festival',
      location: 'Belgique',
    },
    {
      url: 'https://www.youtube.com/watch?v=73fLfq8hYSM',
      title: 'Concert Live',
      location: 'Maroc',
    },
    {
      url: 'https://www.youtube.com/watch?v=19Z8WbEIi9c',
      title: 'Festival International',
      location: 'France',
    },
    {
      url: 'https://www.youtube.com/watch?v=BrpyDEAWAAg',
      title: 'Concert Touareg',
      location: 'Niger',
    },
    {
      url: 'https://www.youtube.com/watch?v=2c9RY-8Vd4Y',
      title: 'Festival Sahara',
      location: 'Mali',
    },
    {
      url: 'https://www.youtube.com/watch?v=wctG2ujPsg4',
      title: 'Concert Nomade',
      location: 'Maroc',
    },
    {
      url: 'https://www.youtube.com/watch?v=njanaBpmVzA',
      title: 'Festival Live',
      location: 'Tunisie',
    },
    {
      url: 'https://www.youtube.com/watch?v=0uzf_sofWmU',
      title: 'Concert International',
      location: 'Espagne',
    },
    {
      url: 'https://www.youtube.com/watch?v=v3ke6Ay7bcM',
      title: 'Festival 2025',
      location: 'Italie',
    },
    {
      url: 'https://www.youtube.com/watch?v=m_BZd3DFywA',
      title: 'Concert Sahara',
      location: 'Allemagne',
    },
  ],
}

/* ---------- Component ---------- */
const Videos = () => {
  const concerts = useMemo(() => {
    const rows = []
    const years = Object.keys(concertsByYear).map((y) => parseInt(y, 10)).sort((a, b) => a - b)

    years.forEach((year) => {
      concertsByYear[year].forEach((c, idx) => {
        rows.push({
          id: `c-${year}-${idx}`,
          year,
          ...c,
        })
      })
    })

    return rows
  }, [])

  const openVideo = (url) => window.open(url, '_blank', 'noopener,noreferrer')

  return (
    <section id="videos" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-12 tuareg-blue text-center">Vidéos</h2>

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
                      onError={handleThumbError}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-orange-600 rounded-full p-4">
                        <Play size={32} className="text-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {concert.year}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-xl mb-2">{concert.title}</h4>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin size={14} className="mr-2" />
                      <span>{concert.location}</span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Videos

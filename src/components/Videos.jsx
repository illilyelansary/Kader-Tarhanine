import React from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Play, Youtube, ExternalLink } from 'lucide-react'

const getYouTubeId = (url = '') => {
  // Gère: https://www.youtube.com/watch?v=ID, https://youtu.be/ID, y compris paramètres
  const match =
    url.match(/(?:youtube\.com.*[?&]v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/) ||
    url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
}

const getYouTubeThumb = (id, quality = 'max') => {
  // quality: 'max' | 'hq'
  const file = quality === 'max' ? 'maxresdefault.jpg' : 'hqdefault.jpg'
  return `https://img.youtube.com/vi/${id}/${file}`
}

const getClipThumb = (item) => {
  const id = getYouTubeId(item.url)
  if (id) return getYouTubeThumb(id, 'max')
  // Non-YouTube: on garde la miniature fournie si présente
  return item.thumbnail || 'https://via.placeholder.com/480x270/f97316/ffffff?text=Video'
}

const handleThumbError = (e) => {
  // Si maxres indisponible → tenter hqdefault, sinon placeholder
  const src = e.currentTarget.getAttribute('src') || ''
  if (src.includes('maxresdefault')) {
    const hq = src.replace('maxresdefault.jpg', 'hqdefault.jpg')
    e.currentTarget.setAttribute('src', hq)
  } else {
    e.currentTarget.setAttribute('src', 'https://via.placeholder.com/480x270/f97316/ffffff?text=Video')
  }
}

const handleConcertThumbError = (e) => {
  const src = e.currentTarget.getAttribute('src') || ''
  if (src.includes('maxresdefault')) {
    const hq = src.replace('maxresdefault.jpg', 'hqdefault.jpg')
    e.currentTarget.setAttribute('src', hq)
  } else {
    e.currentTarget.setAttribute('src', 'https://via.placeholder.com/640x360/f97316/ffffff?text=Concert+Live')
  }
}

const getConcertThumb = (item) => {
  const id = getYouTubeId(item.url)
  if (id) return getYouTubeThumb(id, 'max')
  return item.thumbnail || 'https://via.placeholder.com/640x360/f97316/ffffff?text=Concert+Live'
}

const Videos = () => {
  const clips = [
    {
      id: 1,
      title: 'Al Gamra Leila',
      year: '2023',
      url: 'https://www.youtube.com/watch?v=Sp0Fn4VI1yQ',
      // thumbnail laissé possible mais ignoré si URL YouTube (on génère automatiquement)
      thumbnail: 'https://sl.bing.net/b1E4EBzFyyy',
      views: '+12.1M vues',
    },
    {
      id: 2,
      title: 'Zain Assahra (feat. MOUNA DENDENNI)',
      year: '2024',
      url: 'https://www.youtube.com/watch?v=Oe--JnLzEx0',
      thumbnail: 'https://img.youtube.com/vi/Oe--JnLzEx0/maxresdefault.jpg',
      views: '4.1M vues',
    },
    {
      id: 3,
      title: 'Tarhanine (feat. Sidiki Diabaté)',
      year: '2018',
      url: 'https://artsandculture.google.com/asset/official-music-video-of-tarhanine-by-kader-tarhanine-and-sidiki-diabat%C3%A9-88-production/FwF7hPoseNgE-g?hl=en',
      // Non-YouTube → on utilisera cette miniature si fournie, sinon placeholder
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      views: 'Collaboration',
    },
    {
      id: 4,
      title: 'H MED 45 - la la la ft. KADER TARHANINE',
      year: '2025',
      url: 'https://www.youtube.com/watch?v=-RQ7DgMvtic',
      thumbnail: 'https://img.youtube.com/vi/-RQ7DgMvtic/maxresdefault.jpg',
      views: 'Nouveau',
    },
  ]

  const concerts = [
    {
      id: 1,
      title: 'Roskilde Festival 2024',
      location: 'Danemark',
      date: '04.07.2024',
      url: 'https://www.youtube.com/watch?v=CEmZdbQUueU',
      thumbnail: 'https://img.youtube.com/vi/CEmZdbQUueU/maxresdefault.jpg',
    },
    {
      id: 2,
      title: 'Rotterdam Bluegrass Festival',
      location: 'Hollande',
      date: '30.06.2024',
      url: 'https://www.youtube.com/watch?v=xOQ69T4uFRU',
      thumbnail: 'https://img.youtube.com/vi/xOQ69T4uFRU/maxresdefault.jpg',
    },
    {
      id: 3,
      title: 'Rudolstadt Festival 2025',
      location: 'Allemagne',
      date: '06.07.2025',
      url: 'https://www.youtube.com/watch?v=7SORkXHJHeg',
      thumbnail: 'https://img.youtube.com/vi/7SORkXHJHeg/maxresdefault.jpg',
    },
    {
      id: 4,
      title: 'Sfinks Mixed 2025',
      location: 'Belgique',
      date: '27.07.2025',
      url: 'https://www.youtube.com/watch?v=hRZc0j_IYpw',
      thumbnail: 'https://img.youtube.com/vi/hRZc0j_IYpw/maxresdefault.jpg',
    },
  ]

  const openVideo = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

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

          {/* Concerts Live */}
          <div>
            <h3 className="text-3xl font-bold mb-8 desert-orange">Concerts Live</h3>
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

          <div className="text-center mt-12">
            <Button
              onClick={() => window.open('https://www.youtube.com/@kadertarhanineofficial3970', '_blank')}
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

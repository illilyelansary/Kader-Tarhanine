// src/components/Videos.jsx
import React from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Play, Youtube, ExternalLink, MapPin, Film } from 'lucide-react'

/** Helpers YouTube */
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

const handleThumbError = (e) => {
  const src = e.currentTarget.getAttribute('src') || ''
  if (src.includes('maxresdefault')) {
    e.currentTarget.setAttribute('src', src.replace('maxresdefault.jpg', 'hqdefault.jpg'))
  } else {
    e.currentTarget.setAttribute('src', 'https://via.placeholder.com/640x360/f97316/ffffff?text=Video')
  }
}

/** === CLIPS OFFICIELS (ordre chronologique) === */
const clips = [
  // 2018
  {
    year: 2018,
    title: 'Tarhanine (feat. Sidiki Diabaté)',
    url: 'https://www.youtube.com/watch?v=pM7sdSJtDgU',
    note: 'Collaboration'
  },
  // 2019
  {
    year: 2019,
    title: 'Algamra Leila',
    url: 'https://www.youtube.com/watch?v=Sp0Fn4VI1yQ',
    note: 'Clip'
  },
  {
    year: 2019,
    title: 'Imanine (Ikewane)',
    url: 'https://www.youtube.com/watch?v=WJbYL1Zu_0Q',
    note: 'Clip'
  },
  // 2023
  {
    year: 2023,
    title: 'Inizdiam',
    url: 'https://www.youtube.com/watch?v=X_ClhuYqbsM',
    note: 'Clip'
  },
  // 2024
  {
    year: 2024,
    title: 'Zain Assahra (feat. Mouna Dendenni)',
    url: 'https://www.youtube.com/watch?v=PyFJuUKZUh4',
    note: 'Single'
  },
  {
    year: 2024,
    title: 'Aliad Idja Ehane',
    url: 'https://www.youtube.com/watch?v=PyFJuUKZUh4',
    note: 'Single'
  },
  {
    year: 2024,
    title: 'Meddane Taknassam (feat. Bombino)',
    url: 'https://www.youtube.com/watch?v=PyFJuUKZUh4',
    note: 'Single'
  },
  // 2025 (collab)
  {
    year: 2025,
    title: 'la la la (H MED 45 ft. Kader Tarhanine)',
    url: 'https://www.youtube.com/watch?v=-RQ7DgMvtic',
    note: 'Collaboration'
  }
]

/** === CONCERTS / FESTIVALS (avec légendes corrigées) === */
const concerts = [
  /* === 2018 === */
  { year: 2018, title: 'Festival des Nomades', location: "M’Hamid El Ghizlane, Maroc", url: 'https://www.youtube.com/watch?v=P7JQ50A2hzw' },
  { year: 2018, title: 'Concert au Centre Culturel Algérien', location: 'Paris, France', url: 'https://www.youtube.com/watch?v=-XeXI2l3uCI' },
  { year: 2018, title: 'Mela Festival', location: 'Norvège', url: 'https://www.youtube.com/watch?v=aBDoLCCEO1A' },
  { year: 2018, title: '“Talyat” – International Nomads Festival', location: 'Maroc', url: 'https://www.youtube.com/watch?v=i9dQmXE1FW0' },

  /* === 2019 === */
  { year: 2019, title: 'Festival Oued Eddahab', location: 'Dakhla, Maroc', url: 'https://www.youtube.com/watch?v=8-ipFo9Cv0Y' },
  { year: 2019, title: 'Concert avec le groupe Tartit', location: 'Bamako, Mali', url: 'https://www.youtube.com/watch?v=Cz0stNeSv4A' },
  { year: 2019, title: 'Concert à Paris', location: 'France', url: 'https://www.youtube.com/watch?v=43Oh-jlCfDE' },

  /* === 2020 === */
  { year: 2020, title: 'Festival AG’Na', location: 'Koulikoro, Mali', url: 'https://www.youtube.com/watch?v=ldGu37g6Q6w' },
  { year: 2020, title: 'Concert – Tous ensemble contre le COVID', location: 'Mali', url: 'https://www.youtube.com/watch?v=JVVMKxFw0xY' },

  /* === 2021 === */
  { year: 2021, title: 'Concert Live in Dubai', location: 'Émirats arabes unis', url: 'https://www.youtube.com/watch?v=Ih14h8y_TFE' },
  { year: 2021, title: 'Concert à Bamako', location: 'Mali', url: 'https://www.youtube.com/watch?v=x8EasewmEq8' },

  /* === 2022 === */
  { year: 2022, title: 'Concert à Bamako', location: 'Mali — 24 sept. 2022', url: 'https://www.youtube.com/watch?v=p6SrI9zu-ZQ' },
  { year: 2022, title: 'Mali Magic – Timbuktu Renaissance (Concert)', location: 'Mali', url: 'https://www.youtube.com/watch?v=3PO3aH0sse8' },
  { year: 2022, title: 'Concert à Oran', location: 'Algérie', url: 'https://www.youtube.com/watch?v=pUaDaOq7pA0' },
  { year: 2022, title: 'Festival Agna – avec Warda', location: 'Mali', url: 'https://www.youtube.com/watch?v=QlowuQy40Rw' },

  /* === 2023 === */
  { year: 2023, title: 'Festival sur le Niger', location: 'Ségou, Mali', url: 'https://www.youtube.com/watch?v=AhivVaNpDyU' },
  { year: 2023, title: 'Afrika Festival Hertme — “Tenere”', location: 'Pays-Bas', url: 'https://www.youtube.com/watch?v=x75MKprzUcw' },
  { year: 2023, title: 'Afrika Festival Hertme — “Tartit Anarha”', location: 'Pays-Bas', url: 'https://www.youtube.com/watch?v=HQXdD8hRovY' },
  { year: 2023, title: 'Festival Ali Farka Touré', location: 'Mali', url: 'https://www.youtube.com/watch?v=MbTA3PKPI8U' },
  { year: 2023, title: 'Sfinks Mixed Festival', location: 'Boechout, Belgique', url: 'https://www.youtube.com/watch?v=lPG9HQBdmGI' },

  /* === 2024 === */
  { year: 2024, title: 'Rotterdam Bluegrass Festival — 30 juin', location: 'Pays-Bas', url: 'https://www.youtube.com/watch?v=xOQ69T4uFRU' },
  { year: 2024, title: 'Concert à la Sala Upload — 02 juillet', location: 'Barcelone, Espagne', url: 'https://www.youtube.com/watch?v=cVLRB2a9D1E' },
  { year: 2024, title: 'Roskilde Festival — GAIA Stage — 04 juillet', location: 'Danemark', url: 'https://www.youtube.com/watch?v=CEmZdbQUueU' },
  { year: 2024, title: 'Festival culturel Ogobagna', location: 'Bamako, Mali', url: 'https://www.youtube.com/watch?v=xEu0KJrFXQE' },
  { year: 2024, title: 'Festival du Nord', location: 'Bamako, Mali', url: 'https://www.youtube.com/watch?v=tB3ZpMkRnSM' },
  { year: 2024, title: 'Festival sur le Niger — Live', location: 'Ségou, Mali', url: 'https://www.youtube.com/live/PSQUVoUoyYE' },

  /* === 2025 === */
  { year: 2025, title: 'Rudolstadt-Festival — 06 juillet', location: 'Allemagne', url: 'https://www.youtube.com/watch?v=msRbmRgY6mc' },
  { year: 2025, title: 'Sfinks Mixed Festival', location: 'Boechout, Belgique', url: 'https://www.youtube.com/watch?v=hRZc0j_IYpw' },
  { year: 2025, title: 'Musica Mundo Festival', location: 'Amersfoort, Pays-Bas', url: 'https://www.youtube.com/watch?v=73fLfq8hYSM' },
  { year: 2025, title: 'Rudolstadt-Festival — autre captation', location: 'Allemagne', url: 'https://www.youtube.com/watch?v=19Z8WbEIi9c' },
  { year: 2025, title: 'Sfinks Mixed Festival — autre angle', location: 'Belgique', url: 'https://www.youtube.com/watch?v=BrpyDEAWAAg' },
  { year: 2025, title: 'World Stage Concert', location: 'Palanga, Lituanie', url: 'https://www.youtube.com/watch?v=2c9RY-8Vd4Y' },
  { year: 2025, title: 'Soirée diaspora touareg', location: 'Europe', url: 'https://www.youtube.com/watch?v=wctG2ujPsg4' },
  { year: 2025, title: 'Rencontre diaspora touareg', location: 'Maghreb', url: 'https://www.youtube.com/watch?v=njanaBpmVzA' },
  { year: 2025, title: 'Expo 2020 Dubaï (captation)', location: 'Émirats/Asie', url: 'https://www.youtube.com/watch?v=m_BZd3DFywA' },

  /* Compléments (hors chronologie stricte / autres années liées) */
  { year: 2017, title: 'Concert dans un camp de réfugiés', location: 'Mauritanie', url: 'https://www.youtube.com/watch?v=0uzf_sofWmU' },
  { year: 2022, title: 'Concert Mauritanie (reportage)', location: 'Mauritanie', url: 'https://www.youtube.com/watch?v=v3ke6Ay7bcM' },
  { year: 2022, title: 'Expo 2020 Dubaï (autre lien)', location: 'Émirats arabes unis', url: 'https://www.youtube.com/watch?v=CC2GrFMiJUA&t=48s' }
]

/** Tri chronologique (du plus ancien au plus récent) */
clips.sort((a, b) => a.year - b.year)
concerts.sort((a, b) => a.year - b.year)

const Videos = () => {
  const openVideo = (url) => window.open(url, '_blank', 'noopener,noreferrer')

  return (
    <section id="videos" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* CLIPS OFFICIELS */}
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold tuareg-blue">Vidéos</h2>
            <p className="text-lg text-gray-600 mt-3 flex items-center justify-center gap-2">
              <Film size={18} /> Clips officiels
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {clips.map((clip, idx) => {
              const id = getYouTubeId(clip.url)
              const thumb = id ? getYouTubeThumb(id, 'max') : 'https://via.placeholder.com/480x270/f97316/ffffff?text=Clip'
              return (
                <Card
                  key={`clip-${idx}`}
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
                      <div className="bg-orange-600 rounded-full p-3">
                        <Play size={22} className="text-white ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                      {clip.year}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-lg line-clamp-2">{clip.title}</h4>
                    <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
                      <span>{clip.note}</span>
                      <Youtube size={16} />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* VIDÉOS DE CONCERTS */}
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold desert-orange">Concerts & Festivals</h3>
            <p className="text-gray-600 mt-2">Captations live triées par année</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {concerts.map((concert, idx) => {
              const id = getYouTubeId(concert.url)
              const thumb = id ? getYouTubeThumb(id, 'max') : 'https://via.placeholder.com/640x360/f97316/ffffff?text=Concert+Live'
              return (
                <Card
                  key={`concert-${idx}`}
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

          <div className="text-center mt-12">
            <Button
              onClick={() => window.open('https://www.youtube.com/@EssakaneProduction', '_blank')}
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

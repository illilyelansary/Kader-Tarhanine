// src/App.jsx
import React, { useState, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import {
  Music,
  Play,
  Calendar,
  MapPin,
  Instagram,
  Youtube,
  Mail,
  Guitar,
  Camera,
  Video,
  Users,
  Menu as MenuIcon,
  X,
  ExternalLink
} from 'lucide-react'
import Gallery from './components/Gallery.jsx'
import Videos from './components/Videos.jsx'
import SocialFeeds from './components/SocialFeeds.jsx'
import './App.css'

// Images locales
import kaderPhoto from './assets/4enTSMYZjml8.jpg'
import desertLandscape from './assets/mH0NU1PYe0fM.jpg'
import tuaregMusicians from './assets/sgxiVNQXFkDF.jpg'

function App() {
  const [activeSection, setActiveSection] = useState('accueil')
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Gère l’ancre #hash au rechargement / lien direct
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const target = document.getElementById(hash.replace('#', ''))
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' })
          setActiveSection(hash.replace('#', ''))
        }, 120)
      }
    }
  }, [])

  const navigation = [
    { id: 'accueil', label: 'Accueil', icon: Music },
    { id: 'apropos', label: 'À propos', icon: Guitar },
    { id: 'musique', label: 'Musique', icon: Play },
    { id: 'concerts', label: 'Concerts', icon: Calendar },
    { id: 'galerie', label: 'Galerie', icon: Camera },
    { id: 'videos', label: 'Vidéos', icon: Video },
    { id: 'reseaux-sociaux', label: 'Réseaux', icon: Users },
    { id: 'contact', label: 'Contact', icon: Mail }
  ]

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileOpen(false)
      window.history.replaceState(null, '', `#${sectionId}`)
    }
  }

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

  /**
   * CONCERTS & FESTIVALS — Données (2024 → 2025)
   * Chaque entrée = { date: 'YYYY-MM-DD', title, city, country, note?, url? }
   * NB : Aucune date future confirmée au 28/08/2025 → "Prochains concerts" affiche un message.
   */
  const events = [
    // ——— 2025 (passés récents) ———
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

    // ——— 2024 ———
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

  // Séparation & tri : du plus récent au plus ancien dans chaque bloc
  const { upcoming, past } = useMemo(() => {
    const todayMidnight = new Date(new Date().toDateString())
    const up = events.filter(e => new Date(e.date) >= todayMidnight)
                     .sort((a, b) => new Date(b.date) - new Date(a.date)) // futur proche → futur lointain
    const pa = events.filter(e => new Date(e.date) < todayMidnight)
                     .sort((a, b) => new Date(b.date) - new Date(a.date)) // récent → ancien
    return { upcoming: up, past: pa }
  }, [events])

  // Formateur de date lisible (ex: 27 juillet 2025)
  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-effect shadow-lg' : 'bg-transparent'}`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a
              href="#accueil"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('accueil')
              }}
              className="text-2xl font-bold tuareg-blue"
            >
              Kader Tarhanine
            </a>

            {/* Desktop */}
            <div className="hidden lg:flex space-x-6">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/20 text-sm ${
                      activeSection === item.id ? 'bg-white/30 text-orange-600' : 'text-slate-700'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Mobile hamburger */}
            <div className="lg:hidden">
              <button
                aria-label="Ouvrir le menu"
                onClick={() => setMobileOpen((v) => !v)}
                className="p-2 rounded-lg hover:bg-white/20 text-slate-800"
              >
                {mobileOpen ? <X size={28} /> : <MenuIcon size={28} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Drawer Mobile plein écran */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/80 to-black/60 backdrop-blur-md"
            onClick={() => setMobileOpen(false)}
          />
          {/* contenu */}
          <div className="relative z-10 h-full w-full flex flex-col items-center justify-between py-10">
            <div className="w-full flex items-center justify-between px-6">
              <div className="text-white/90 text-lg font-semibold">Menu</div>
              <button
                aria-label="Fermer le menu"
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg text-white/90 hover:bg-white/10"
              >
                <X size={28} />
              </button>
            </div>

            <div className="flex-1 w-full flex flex-col items-center justify-center space-y-3 px-6">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full max-w-sm flex items-center justify-between px-5 py-3 rounded-xl border transition-all duration-200
                      ${isActive ? 'bg-white/15 border-white/30 text-orange-300' : 'bg-white/10 border-white/20 text-white'}
                    `}
                  >
                    <span className="flex items-center space-x-3">
                      <Icon size={18} />
                      <span className="text-base font-medium">{item.label}</span>
                    </span>
                    <span className="text-white/70">#{item.id}</span>
                  </button>
                )
              })}
            </div>

            {/* Liens sociaux officiels */}
            <div className="w-full px-6">
              <div className="max-w-sm mx-auto grid grid-cols-3 gap-3">
                <a
                  href="https://www.youtube.com/@EssakaneProduction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-red-600/90 hover:bg-red-600 text-white"
                >
                  <Youtube size={18} />
                  <span className="text-sm">YouTube</span>
                </a>
                <a
                  href="https://www.instagram.com/kadertarhanine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-pink-600/90 hover:bg-pink-600 text-white"
                >
                  <Instagram size={18} />
                  <span className="text-sm">Instagram</span>
                </a>
                <a
                  href="mailto:contact@kadertarhanine.com"
                  className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-slate-700/90 hover:bg-slate-700 text-white"
                >
                  <Mail size={18} />
                  <span className="text-sm">Email</span>
                </a>
              </div>
              <p className="text-center text-white/60 text-xs mt-4">Suivez l’artiste • Liens officiels</p>
            </div>
          </div>
        </div>
      )}

      {/* HERO */}
      <section id="accueil" className="hero-section flex items-center justify-center relative pt-24">
        <div
          className="absolute inset-0 parallax-bg opacity-30"
          style={{ backgroundImage: `url(${desertLandscape})` }}
        />
        <div className="hero-overlay" />
        <div className="relative z-10 text-center text-white px-6 py-20">
          <img
            src={kaderPhoto}
            alt="Kader Tarhanine"
            className="w-48 h-48 md:w-64 md:h-64 rounded-full mx-auto mt-6 mb-8 object-cover border-4 border-white/30 shadow-2xl"
          />
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4">Kader Tarhanine</h1>
          <p className="text-xl md:text-2xl lg:text-3xl mb-8">Prince du Desert Blues</p>
          <p className="text-base md:text-lg lg:text-xl mb-12 max-w-2xl mx-auto opacity-90">
            Artiste Touareg moderne alliant traditions sahariennes et sonorités rock contemporaines.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => scrollToSection('musique')}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg rounded-full hover-lift"
            >
              <Play className="mr-2" size={20} /> Écouter ma musique
            </Button>
            <Button
              onClick={() => scrollToSection('concerts')}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3 text-lg rounded-full hover-lift"
            >
              <Calendar className="mr-2" size={20} /> Voir les concerts
            </Button>
          </div>
        </div>
      </section>

      {/* A PROPOS — encadré simple, propre */}
      <section id="apropos" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-16 tuareg-blue">À propos</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 p-6 rounded-2xl border border-amber-200 bg-white shadow-sm">
                <h3 className="text-3xl font-semibold desert-orange">L'artiste le plus écouté du Sahara</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Né en 1989 à Borj Moctar (Algérie), Kader Tarhanine (Abd Elkadir Sabou) incarne la nouvelle génération
                  de la musique touarègue. Ses racines nomades du Sahara (Mali/Algérie/Niger) se ressentent dans chaque note.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Leader du groupe éponyme, souvent associé à Afous d’Afous, il est une voix phare pour la jeunesse saharienne,
                  unissant modernité, poésie et talent naturel.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Sa musique marie rythmes traditionnels et tonalités rock sur des paroles poétiques sahéliennes et arabophones,
                  créant un pont vivant entre tradition et modernité.
                </p>
              </div>
              <div className="relative">
                <img
                  src={tuaregMusicians}
                  alt="Musiciens Touaregs"
                  className="rounded-xl shadow-2xl hover-lift"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 desert-gradient rounded-full opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MUSIQUE — Albums + Singles (liens YouTube/plateformes) */}
      <section id="musique" className="py-20 bg-gradient-to-r from-amber-100 to-orange-100">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-16 tuareg-blue">Musique</h2>
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

      {/* CONCERTS & FESTIVALS — version enrichie */}
      <section id="concerts" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-16 tuareg-blue">Concerts & Festivals</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* À venir */}
              <Card className="hover-lift">
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

              {/* Récents & passés */}
              <Card className="hover-lift">
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

            {/* Légende tri */}
            <p className="text-center text-sm text-gray-500 mt-6">
              Listes triées du plus récent au plus ancien (passés), et du plus proche au plus lointain (si des dates à venir existent).
            </p>
          </div>
        </div>
      </section>

      {/* GALERIE */}
      <Gallery />

      {/* VIDEOS (concerts + clips gérés dans le composant) */}
      <Videos />

      {/* RÉSEAUX SOCIAUX */}
      <section id="reseaux-sociaux">
        <SocialFeeds />
      </section>

      {/* CONTACT + BOOKING */}
      <section id="contact" className="py-20 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-12">Contact & Booking</h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="space-y-2">
                <Youtube size={48} className="mx-auto text-red-500" />
                <h3 className="text-xl font-semibold">YouTube</h3>
                <a
                  href="https://www.youtube.com/@EssakaneProduction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 underline inline-flex items-center justify-center"
                >
                  Essakane Production <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
              <div className="space-y-2">
                <Instagram size={48} className="mx-auto text-pink-500" />
                <h3 className="text-xl font-semibold">Instagram</h3>
                <a
                  href="https://www.instagram.com/kadertarhanine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 underline inline-flex items-center justify-center"
                >
                  @kadertarhanine <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
              <div className="space-y-2">
                <Mail size={48} className="mx-auto text-blue-500" />
                <h3 className="text-xl font-semibold">Booking</h3>
                <a href="mailto:booking@kadertarhanine.com" className="text-gray-300 underline">
                  booking@kadertarhanine.com
                </a>
              </div>
            </div>

            <p className="text-lg text-gray-300 mb-8">
              Pour les demandes de booking, collaborations ou informations.
            </p>
            <a
              href="mailto:contact@kadertarhanine.com?subject=Booking%20/%20Collaboration%20-%20Kader%20Tarhanine"
              className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg rounded-full hover-lift"
            >
              <Mail className="mr-2" size={20} />
              Nous contacter
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">© 2025 Kader Tarhanine. Tous droits réservés.</p>
          <p className="text-gray-500 mt-2">Prince du Desert Blues • Musique Touarègue Moderne</p>
        </div>
      </footer>
    </div>
  )
}

export default App

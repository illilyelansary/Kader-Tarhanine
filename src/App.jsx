import React, { useState, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import {
  Music, Play, Calendar, MapPin, Instagram, Youtube, Mail,
  Guitar, Camera, Video, Users
} from 'lucide-react'
import Gallery from './components/Gallery.jsx'
import Videos from './components/Videos.jsx'
import SocialFeeds from './components/SocialFeeds.jsx'
import './App.css'

// Images
import kaderPhoto from './assets/4enTSMYZjml8.jpg'
import desertLandscape from './assets/mH0NU1PYe0fM.jpg'
import tuaregMusicians from './assets/sgxiVNQXFkDF.jpg'

function App() {
  const [activeSection, setActiveSection] = useState('accueil')
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Scroll state (nav shadow)
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Deep link support (#hash)
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const id = hash.replace('#', '')
      const target = document.getElementById(id)
      if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 100)
    }
  }, [])

  // Nav items
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
    setMobileOpen(false)
    const el = document.getElementById(sectionId)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const openLink = (url) => window.open(url, '_blank', 'noopener,noreferrer')

  // ===== Liens Artiste / Albums
  const LINKS = {
    artist: {
      spotify: 'https://open.spotify.com/intl-fr/artist/7Et5H8GXkBE3F2nFolwyPV?si=Qi4y6vPwRoC54CcOiggnIA',
      apple:   'https://music.apple.com/fr/artist/kader-tarhanine/1391675149',
      youtube: 'https://music.youtube.com/channel/UC-4rv6cdUGPcdfy6GwSVVnw'
    },
    albums: {
      Ikewane: 'https://open.spotify.com/intl-fr/album/4khQAqdVbydwxkGmCTixu7?si=32VisFb8SQK7QlOjd7Dz3A',
      Tenere:  'https://open.spotify.com/intl-fr/album/3M1ibb7qJILS8kiI5rXTl3?si=dyIauVB7S9i1XlmUANrCYQ'
    }
  }

  // ===== Singles officiels (YouTube / Essakane Production) — triés du plus récent au plus ancien
  // Ajoute/ajuste les dates si tu publies de nouveaux singles
  const SINGLES = [
    { title: 'Aliad Idja Ehane', date: '2024-09-01', url: 'https://www.youtube.com/watch?v=AOtoOIzTUl8', note: 'Audio officiel' },
    { title: 'Zain Assahra (feat. Mouna Dendenni)', date: '2024-03-01', url: 'https://www.youtube.com/watch?v=PyFJuUKZUh4', note: 'Clip officiel' },
    { title: 'Meddane Taknassam', date: '2024-01-01', url: 'https://www.youtube.com/watch?v=ALch4yaE7_g', note: 'Audio officiel' },
    { title: 'Inizdiam', date: '2023-02-01', url: 'https://www.youtube.com/watch?v=X_ClhuYqbsM', note: 'Clip officiel' },
    { title: 'Algamra Leila', date: '2019-08-23', url: 'https://www.youtube.com/watch?v=Sp0Fn4VI1yQ', note: 'Clip officiel' },
    { title: 'Imanine', date: '2019-01-01', url: 'https://www.youtube.com/watch?v=WJbYL1Zu_0Q', note: 'Clip officiel' },
    { title: 'Tarhanine (feat. Sidiki Diabaté)', date: '2018-04-30', url: 'https://www.youtube.com/watch?v=pM7sdSJtDgU', note: 'Clip officiel' }
  ].sort((a, b) => new Date(b.date) - new Date(a.date))

  // ===== Events (concerts & festivals)
  const EVENTS = [
    { title: 'Expo Osaka 2025', city: 'Osaka', country: 'Japon', dateISO: '2025-08-02', kind: 'concert' },
    { title: 'African Beats Festival', city: 'Varsovie', country: 'Pologne', dateISO: '2025-08-09', kind: 'festival' },
    { title: 'Sfinks Mixed', city: 'Anvers', country: 'Belgique', dateISO: '2025-07-27', kind: 'festival' },
    { title: 'Rudolstadt Festival', city: 'Rudolstadt', country: 'Allemagne', dateISO: '2025-07-06', kind: 'festival' },
    { title: 'Rotterdam Bluegrass Festival', city: 'Rotterdam', country: 'Pays-Bas', dateISO: '2024-06-30', kind: 'festival' },
    { title: 'Roskilde Festival', city: 'Roskilde', country: 'Danemark', dateISO: '2024-07-04', kind: 'festival' },
    { title: 'Oslo World Festival', city: 'Oslo', country: 'Norvège', dateISO: '2023-11-01', kind: 'festival' },
    { title: 'Timitar Festival', city: 'Agadir', country: 'Maroc', dateISO: null, kind: 'festival' },
    { title: 'Festival of World Sacred Music', city: 'Fès', country: 'Maroc', dateISO: null, kind: 'festival' }
  ]

  const today = useMemo(() => {
    const t = new Date()
    return new Date(t.getFullYear(), t.getMonth(), t.getDate())
  }, [])

  const parseISO = (iso) => (iso ? new Date(iso + 'T00:00:00') : null)
  const isUpcoming = (ev) => {
    const d = parseISO(ev.dateISO)
    if (!d) return false
    return d.getTime() >= today.getTime()
  }
  const fmtDate = (iso) => {
    if (!iso) return ''
    try {
      const d = parseISO(iso)
      return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(d)
    } catch {
      return iso
    }
  }
  const compareAscByDate = (a, b) => {
    const da = parseISO(a.dateISO)
    const db = parseISO(b.dateISO)
    if (!da && !db) return a.title.localeCompare(b.title)
    if (!da) return 1
    if (!db) return -1
    return da.getTime() - db.getTime()
  }
  const compareDescByDate = (a, b) => -compareAscByDate(a, b)

  const { upcomingEvents, pastEvents } = useMemo(() => {
    const up = [], past = []
    for (const ev of EVENTS) (isUpcoming(ev) ? up : past).push(ev)
    up.sort(compareAscByDate)
    past.sort(compareDescByDate)
    return { upcomingEvents: up, pastEvents: past }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [EVENTS, today])

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* ================= NAVIGATION (Desktop + Mobile Drawer sombre) ================= */}
      <nav className={'fixed top-0 w-full z-[120] transition-all duration-300 ' + (isScrolled ? 'glass-effect shadow-lg' : 'glass-effect')}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo / Brand */}
            <a
              href="#accueil"
              onClick={(e) => { e.preventDefault(); scrollToSection('accueil') }}
              className="text-2xl font-bold tuareg-blue"
            >
              Kader Tarhanine
            </a>

            {/* Desktop menu */}
            <div className="hidden lg:flex space-x-6">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.id
                return (
                  <a
                    key={item.id}
                    href={'#' + item.id}
                    onClick={(e) => { e.preventDefault(); scrollToSection(item.id) }}
                    className={
                      'flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/20 text-sm ' +
                      (isActive ? 'bg-white/30 text-orange-600' : 'text-slate-700')
                    }
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </a>
                )
              })}
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label="Ouvrir le menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/60"
            >
              {!mobileOpen ? (
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Overlay for drawer */}
        <div
          className={
            'lg:hidden fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm transition-opacity ' +
            (mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')
          }
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer panel (SOMBRE + LISIBLE) */}
        <div
          className={
            'lg:hidden fixed top-0 right-0 z-[110] h-full w-[80%] max-w-xs ' +
            'bg-slate-900/95 backdrop-blur-xl text-white shadow-2xl border-l border-slate-800 ' +
            'transition-transform duration-300 ' +
            (mobileOpen ? 'translate-x-0' : 'translate-x-full')
          }
          role="dialog"
          aria-modal="true"
        >
          <div className="p-4 border-b border-slate-700 flex items-center justify-between">
            <span className="text-lg font-semibold">Menu</span>
            <button
              aria-label="Fermer le menu"
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-md hover:bg-slate-800"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="p-4">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={'#' + item.id}
                      onClick={(e) => { e.preventDefault(); scrollToSection(item.id) }}
                      className={
                        'flex items-center gap-3 rounded-lg px-4 py-3 transition ' +
                        (isActive ? 'bg-orange-600 text-white' : 'hover:bg-slate-800')
                      }
                    >
                      <Icon size={18} />
                      <span className="text-base">{item.label}</span>
                    </a>
                  </li>
                )
              })}
            </ul>

            {/* Quick CTAs */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <a
                href="#musique"
                onClick={(e) => { e.preventDefault(); scrollToSection('musique') }}
                className="text-center rounded-full bg-orange-600 text-white px-4 py-3 text-sm font-medium hover:bg-orange-700"
              >
                Écouter
              </a>
              <a
                href="#concerts"
                onClick={(e) => { e.preventDefault(); scrollToSection('concerts') }}
                className="text-center rounded-full border border-slate-600 text-white px-4 py-3 text-sm font-medium hover:bg-slate-800"
              >
                Concerts
              </a>
            </div>

            {/* Social links */}
            <div className="mt-8 flex items-center gap-5 px-4 text-white/90">
              <a
                href="https://www.youtube.com/@kadertarhanine"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
                aria-label="YouTube"
              >
                <Youtube size={22} />
              </a>
              <a
                href="https://www.instagram.com/kadertarhanine"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
                aria-label="Instagram"
              >
                <Instagram size={22} />
              </a>
              <a
                href="mailto:contact@kadertarhanine.com"
                className="hover:text-white"
                aria-label="Email"
              >
                <Mail size={22} />
              </a>
            </div>
          </nav>
        </div>
      </nav>
      {/* ================= /NAV ================= */}

      {/* ================= HERO ================= */}
      <section id="accueil" className="hero-section flex items-center justify-center relative pt-20">
        <div className="absolute inset-0 parallax-bg opacity-30" style={{ backgroundImage: `url(${desertLandscape})` }} />
        <div className="hero-overlay" />
        <div className="relative z-10 text-center text-white px-6 py-20">
          <img
            src={kaderPhoto}
            alt="Kader Tarhanine"
            className="w-48 h-48 md:w-64 md:h-64 rounded-full mx-auto mt-4 mb-8 object-cover border-4 border-white/30 shadow-2xl"
          />
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4">Kader Tarhanine</h1>
          <p className="text-xl md:text-2xl lg:text-3xl mb-8">Prince du Desert Blues</p>
          <p className="text-base md:text-lg lg:text-xl mb-12 max-w-2xl mx-auto opacity-90">
            Artiste Tuareg moderne alliant traditions sahariennes et sonorités rock contemporaines
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => scrollToSection('musique')} className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg rounded-full hover-lift">
              <Play className="mr-2" size={20} /> Écouter ma musique
            </Button>
            <Button onClick={() => scrollToSection('concerts')} variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3 text-lg rounded-full hover-lift">
              <Calendar className="mr-2" size={20} /> Voir les concerts
            </Button>
          </div>
        </div>
      </section>

      {/* ================= À PROPOS (encadré moderne + motifs musique) ================= */}
      <section id="apropos" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-12 tuareg-blue">À propos</h2>

            <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl border border-amber-200">
              {/* motif musical discret en fond (SVG data-uri) */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none bg-[length:20px_20px]"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 4v10.2a2.8 2.8 0 1 0 1.6 2.6V8.5H17V4H6z' stroke='%23E67E22' stroke-width='1.2'/%3E%3C/svg%3E\")"
                }}
              />

              {/* bandeau dégradé fin en haut */}
              <div className="h-2 w-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400" />

              <div className="relative p-8 md:p-12">
                <div className="grid md:grid-cols-5 gap-10 items-center">
                  <div className="md:col-span-3">
                    <h3 className="text-3xl md:text-4xl font-extrabold mb-4 text-slate-800">
                      L'artiste le plus écouté du Sahara
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                      Né en 1989 à Borj Moctar en Algérie, Kader Tarhanine (né Abd Elkadir Sabou) incarne la
                      nouvelle génération de la musique touarègue. Ses origines nomades du désert saharien
                      (Ménaka, Mali) transparaissent dans chaque note de sa guitare.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                      Leader du groupe éponyme (souvent associé à Afous d'Afous), il est devenu l'une des
                      références de la jeunesse du Sahara, alliant modernité et identité.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Sa musique marie rythmes traditionnels et tonalités rock, portée par des paroles poétiques
                      en tamasheq et en arabe — un trait d’union entre tradition et modernité.
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <div className="relative rounded-xl overflow-hidden shadow-2xl">
                      <img
                        src={tuaregMusicians}
                        alt="Musiciens Tuareg"
                        className="w-full h-64 object-cover"
                      />
                      {/* coins décorés */}
                      <div className="absolute top-2 left-2">
                        <div className="rounded-full bg-white/90 shadow p-2">
                          <Music size={18} className="text-orange-600" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2">
                        <div className="rounded-full bg-white/90 shadow p-2">
                          <Music size={18} className="text-orange-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* bas d'encadré : petite ligne décorative */}
                <div className="mt-10 flex items-center gap-2 text-orange-600/80">
                  <span className="h-[2px] w-12 bg-orange-500 rounded-full" />
                  <span className="text-sm tracking-wide">Desert Blues • Tamasheq • Moderne</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MUSIQUE ================= */}
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
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700" onClick={() => openLink(LINKS.albums.Ikewane)}>
                        <Play size={16} />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                      <div>
                        <h4 className="font-semibold">Tenere</h4>
                        <p className="text-gray-600">Album • 2017</p>
                      </div>
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700" onClick={() => openLink(LINKS.albums.Tenere)}>
                        <Play size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Singles dynamiques (Essakane Production) */}
              <Card className="hover-lift">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 desert-orange">Singles</h3>
                  <div className="space-y-4">
                    {SINGLES.map((s) => (
                      <div key={s.title} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                        <div>
                          <h4 className="font-semibold">{s.title}</h4>
                          <p className="text-gray-600">
                            Single • {new Date(s.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' })}
                          </p>
                          {s.note && <p className="text-xs text-gray-500 mt-1">{s.note}</p>}
                        </div>
                        <Button
                          size="sm"
                          className="bg-orange-600 hover:bg-orange-700"
                          onClick={() => openLink(s.url)}
                          aria-label={`Lire ${s.title} sur YouTube`}
                          title="Ouvrir sur YouTube"
                        >
                          <Play size={16} />
                        </Button>
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
                <a href={LINKS.artist.spotify} target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-lg font-medium transition-all">Spotify</a>
                <a href={LINKS.artist.apple}   target="_blank" rel="noopener noreferrer" className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-full text-lg font-medium transition-all">Apple Music</a>
                <a href={LINKS.artist.youtube} target="_blank" rel="noopener noreferrer" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full text-lg font-medium transition-all">YouTube Music</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONCERTS & FESTIVALS ================= */}
      <section id="concerts" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-16 tuareg-blue">Concerts & Festivals</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* À venir */}
              <Card className="hover-lift">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 desert-orange">À venir</h3>
                  {upcomingEvents.length === 0 && (
                    <p className="text-gray-600 text-center">Nouvelles dates bientôt annoncées.</p>
                  )}
                  {upcomingEvents.map((ev, i) => (
                    <div key={ev.title + '-' + i} className="border-l-4 border-orange-500 pl-6 mb-6">
                      <h4 className="font-semibold text-lg">{ev.title}</h4>
                      <p className="text-gray-600 flex items-center mt-2">
                        <MapPin size={16} className="mr-2" />
                        {ev.city}{ev.country ? ', ' + ev.country : ''}{ev.dateISO ? ' • ' + fmtDate(ev.dateISO) : ''}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Passés / récents */}
              <Card className="hover-lift">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 desert-orange">Passés / récents</h3>
                  {pastEvents.map((ev, i) => (
                    <div key={ev.title + '-' + i} className="border-l-4 border-blue-500 pl-6 mb-6">
                      <h4 className="font-semibold text-lg">{ev.title}</h4>
                      <p className="text-gray-600 flex items-center mt-2">
                        <MapPin size={16} className="mr-2" />
                        {ev.city}{ev.country ? ', ' + ev.country : ''}{ev.dateISO ? ' • ' + fmtDate(ev.dateISO) : ''}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ================= GALERIE (slider + miniatures) ================= */}
      <Gallery
        id="galerie"
        images={[
          { src: desertLandscape, alt: 'Désert saharien' },
          { src: kaderPhoto, alt: 'Portrait Kader Tarhanine' },
          { src: tuaregMusicians, alt: 'Musiciens touaregs' },
        ]}
        autoplayInterval={3000}
        heightClass="h-[60vh]"
      />

      {/* ================= VIDÉOS ================= */}
      <Videos />

      {/* ================= RÉSEAUX SOCIAUX ================= */}
      <SocialFeeds />

      {/* ================= CONTACT ================= */}
      <section id="contact" className="py-20 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-12">Contact</h2>

            <div className="grid md:grid-cols-2 gap-12 mb-12 text-left">
              {/* Booking */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-orange-400">Booking</h3>
                <p className="text-gray-300">Pour les demandes de concerts et tournées</p>
                <a href="mailto:booking@kadertarhanine.com" className="text-lg text-orange-300 hover:underline">
                  booking@kadertarhanine.com
                </a>
              </div>

              {/* Management / Contact général */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-orange-400">Management</h3>
                <p className="text-gray-300">Pour les collaborations, médias et infos générales</p>
                <a href="mailto:contact@kadertarhanine.com" className="text-lg text-orange-300 hover:underline">
                  contact@kadertarhanine.com
                </a>
              </div>
            </div>

            {/* CTA cliquable */}
            <a
              href="mailto:contact@kadertarhanine.com"
              className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg rounded-full hover-lift transition-all"
            >
              <Mail className="mr-2" size={20} />
              Nous contacter
            </a>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">© 2025 Kader Tarhanine. Tous droits réservés.</p>
          <p className="text-gray-500 mt-2">Prince du Desert Blues • Musique Tuareg Moderne</p>
        </div>
      </footer>
    </div>
  )
}

export default App

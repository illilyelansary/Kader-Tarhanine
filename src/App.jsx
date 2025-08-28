import React, { useState, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Music, Play, Calendar, MapPin, Instagram, Youtube, Mail, Guitar, Camera, Video, Users } from 'lucide-react'
import Gallery from './components/Gallery.jsx'
import Videos from './components/Videos.jsx'
import SocialFeeds from './components/SocialFeeds.jsx'
import './App.css'

// Import des images
import kaderPhoto from './assets/4enTSMYZjml8.jpg'
import desertLandscape from './assets/mH0NU1PYe0fM.jpg'
import tuaregMusicians from './assets/sgxiVNQXFkDF.jpg'

function App() {
  const [activeSection, setActiveSection] = useState('accueil')
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false) // ⬅️ AJOUT

  // --- NAV scroll state
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // --- Deep-link (#hash -> scroll)
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const target = document.getElementById(hash.replace('#', ''))
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [])

  // --- Navigation items
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
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  const openLink = (url) => window.open(url, '_blank')

  // ========= MUSIQUE : liens plateformes =========
  const LINKS = {
    artist: {
      spotify: 'https://open.spotify.com/intl-fr/artist/7Et5H8GXkBE3F2nFolwyPV?si=Qi4y6vPwRoC54CcOiggnIA',
      apple:   'https://music.apple.com/fr/artist/kader-tarhanine/1391675149',
      youtube: 'https://music.youtube.com/channel/UC-4rv6cdUGPcdfy6GwSVVnw'
    },
    albums: {
      Ikewane: 'https://open.spotify.com/intl-fr/album/4khQAqdVbydwxkGmCTixu7?si=32VisFb8SQK7QlOjd7Dz3A',
      Tenere:  'https://open.spotify.com/intl-fr/album/3M1ibb7qJILS8kiI5rXTl3?si=dyIauVB7S9i1XlmUANrCYQ'
    },
    singles: {
      // Remplace ces URL YouTube/Spotify par les liens officiels exacts si besoin
      'Aliad Idja Ehane': 'https://www.youtube.com/watch?v=xxxxxxxxxxx',
      'Meddane Taknassam (feat. Bombino)': 'https://www.youtube.com/watch?v=yyyyyyyyyyy'
    }
  }

  // ========= CONCERTS & FESTIVALS : données + tri auto =========
  // NOTE: format dateISO = 'YYYY-MM-DD' (UTC)
  const EVENTS = [
    // Proposés comme "Prochains" (mais seront reclassés automatiquement si la date est passée)
    { title: 'Expo Osaka 2025', city: 'Osaka', country: 'Japon', dateISO: '2025-08-02', note: 'Expo', kind: 'concert' },
    { title: 'African Beats Festival', city: 'Varsovie', country: 'Pologne', dateISO: '2025-08-09', note: 'Festival', kind: 'festival' },
    { title: 'Sfinks Mixed', city: 'Anvers', country: 'Belgique', dateISO: '2025-07-27', note: 'Festival', kind: 'festival' },

    // Festivals / concerts passés (avec dates connues)
    { title: 'Rudolstadt Festival', city: 'Rudolstadt', country: 'Allemagne', dateISO: '2025-07-06', note: 'Festival', kind: 'festival' },
    { title: 'Rotterdam Bluegrass Festival', city: 'Rotterdam', country: 'Pays-Bas', dateISO: '2024-06-30', note: 'Festival', kind: 'festival' },
    { title: 'Roskilde Festival', city: 'Roskilde', country: 'Danemark', dateISO: '2024-07-04', note: 'Festival', kind: 'festival' },
    { title: 'Oslo World Festival', city: 'Oslo', country: 'Norvège', dateISO: '2023-11-01', note: 'Festival', kind: 'festival' },

    // Anciens sans date précise -> seront rangés dans "Passés"
    { title: 'Timitar Festival', city: 'Agadir', country: 'Maroc', dateISO: null, note: 'Festival', kind: 'festival' },
    { title: 'Festival of World Sacred Music', city: 'Fès', country: 'Maroc', dateISO: null, note: 'Festival', kind: 'festival' },
  ]

  // Date "aujourd'hui" : on l'utilise pour splitter passé / futur
  // (Le fuseau du navigateur sera utilisé. C’est acceptable pour un tri simple.)
  const today = useMemo(() => new Date(), [])

  // Helpers
  const parseISO = (iso) => (iso ? new Date(iso + 'T00:00:00Z') : null)

  const compareAsc = (a, b) => {
    const da = parseISO(a.dateISO)
    const db = parseISO(b.dateISO)
    if (!da && !db) return a.title.localeCompare(b.title)
    if (!da) return 1
    if (!db) return -1
    return da - db
  }
  const compareDesc = (a, b) => -compareAsc(a, b)

  const isUpcoming = (ev) => {
    const d = parseISO(ev.dateISO)
    if (!d) return false // sans date => classé comme passé/récent
    // Si la date >= aujourd'hui (minuit), on considère à venir
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return d >= todayMidnight
  }

  const { upcomingEvents, pastEvents } = useMemo(() => {
    const upcoming = []
    const past = []
    for (const ev of EVENTS) {
      if (isUpcoming(ev)) upcoming.push(ev)
      else past.push(ev)
    }
    // Tri : à venir (date la plus proche en premier), passés (plus récent en premier)
    upcoming.sort(compareAsc)
    past.sort(compareDesc)
    return { upcomingEvents: upcoming, pastEvents: past }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [EVENTS])

  // Format date FR
  const fmtDate = (iso) => {
    if (!iso) return '' // pas de date précise
    try {
      const d = parseISO(iso)
      return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(d)
    } catch {
      return iso
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Navigation */}
<nav
  className={`fixed top-0 w-full z-[100] transition-all duration-300 glass-effect ${
    isScrolled ? 'shadow-lg' : ''
  }`}
>
  <div className="container mx-auto px-6 py-4">
    <div className="flex items-center justify-between">
      {/* Branding */}
      <a
        href="#accueil"
        onClick={() => {
          setActiveSection('accueil')
          setMobileOpen(false)
        }}
        className="text-2xl font-bold tuareg-blue"
      >
        Kader Tarhanine
      </a>

      {/* Menu desktop */}
      <div className="hidden lg:flex space-x-6">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/20 text-sm ${
                activeSection === item.id ? 'bg-white/30 text-orange-600' : 'text-slate-700'
              }`}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </a>
          )
        })}
      </div>

      {/* Bouton hamburger (mobile) */}
      <button
        type="button"
        aria-label="Ouvrir le menu"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((v) => !v)}
        className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/60"
      >
        {/* Icône burger / croix en SVG pour ne pas dépendre d’un autre pkg */}
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

  {/* Overlay (clic pour fermer) */}
  <div
    className={`lg:hidden fixed inset-0 bg-black/40 transition-opacity ${
      mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
    }`}
    onClick={() => setMobileOpen(false)}
  />

  {/* Panneau mobile */}
  <div
    className={`lg:hidden fixed top-0 right-0 h-full w-[80%] max-w-xs bg-white shadow-2xl z-[110] transition-transform duration-300
      ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
    role="dialog"
    aria-modal="true"
  >
    <div className="p-4 border-b flex items-center justify-between">
      <span className="text-lg font-semibold tuareg-blue">Menu</span>
      <button
        aria-label="Fermer le menu"
        onClick={() => setMobileOpen(false)}
        className="p-2 rounded-md hover:bg-slate-100"
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
                href={`#${item.id}`}
                onClick={() => {
                  setActiveSection(item.id)
                  setMobileOpen(false)
                }}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                  isActive
                    ? 'bg-orange-50 text-orange-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon size={18} />
                <span className="text-base">{item.label}</span>
              </a>
            </li>
          )
        })}
      </ul>

      {/* CTA rapides en bas du panneau */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <a
          href="#musique"
          onClick={() => setMobileOpen(false)}
          className="text-center rounded-full bg-orange-600 text-white px-4 py-3 text-sm font-medium hover:bg-orange-700"
        >
          Écouter
        </a>
        <a
          href="#concerts"
          onClick={() => setMobileOpen(false)}
          className="text-center rounded-full border border-slate-300 text-slate-700 px-4 py-3 text-sm font-medium hover:bg-slate-50"
        >
          Concerts
        </a>
      </div>

      {/* Liens sociaux (optionnel) */}
      <div className="mt-8 flex items-center gap-4 px-4 text-slate-600">
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">
          <Youtube size={22} />
        </a>
        <a href="https://www.instagram.com/kadertarhanine" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">
          <Instagram size={22} />
        </a>
        <a href="mailto:contact@kadertarhanine.com" className="hover:text-slate-900">
          <Mail size={22} />
        </a>
      </div>
    </nav>
  </div>
</nav>

      {/* Section Hero */}
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

      {/* Section À propos */}
      <section id="apropos" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-16 tuareg-blue">À propos</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl font-semibold desert-orange">L'artiste le plus écouté du Sahara</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Né en 1989 à Borj Moctar en Algérie, Kader Tarhanine (né Abd Elkadir Sabou) incarne la nouvelle génération
                  de la musique Touaregue. Ses origines nomades du légendaire désert du Sahara du Mali (Ménaka) transparaissent dans
                  chaque note de sa guitare.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Leader du groupe du même nom (souvent appelé Afous d'Afous), il est devenu l'un des artistes les plus suivis
                  par les jeunes du Sahara, incarnant la nouveauté de style, la jeunesse et le talent naturel.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Sa musique allie les rythmes traditionnels aux tonalités rock sur des paroles poétiques
                  sahéliennes et arabophones, créant un pont unique entre tradition et modernité.
                </p>
              </div>
              <div className="relative">
                <img src={tuaregMusicians} alt="Musiciens Tuareg" className="rounded-lg shadow-2xl hover-lift" />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 desert-gradient rounded-full opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Musique */}
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
                      <Button
                        size="sm"
                        className="bg-orange-600 hover:bg-orange-700"
                        onClick={() => openLink(LINKS.albums.Ikewane)}
                        aria-label="Écouter Ikewane sur Spotify"
                        title="Écouter sur Spotify"
                      >
                        <Play size={16} />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                      <div>
                        <h4 className="font-semibold">Tenere</h4>
                        <p className="text-gray-600">Album • 2017</p>
                      </div>
                      <Button
                        size="sm"
                        className="bg-orange-600 hover:bg-orange-700"
                        onClick={() => openLink(LINKS.albums.Tenere)}
                        aria-label="Écouter Tenere sur Spotify"
                        title="Écouter sur Spotify"
                      >
                        <Play size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Singles */}
              <Card className="hover-lift">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 desert-orange">Singles Récents</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                      <div>
                        <h4 className="font-semibold">Aliad Idja Ehane</h4>
                        <p className="text-gray-600">Single • 2024</p>
                      </div>
                      <Button
                        size="sm"
                        className="bg-orange-600 hover:bg-orange-700"
                        onClick={() => openLink(LINKS.singles['Aliad Idja Ehane'])}
                        aria-label="Lire Aliad Idja Ehane"
                        title="Lire sur YouTube"
                      >
                        <Play size={16} />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                      <div>
                        <h4 className="font-semibold">Meddane Taknassam (feat. Bombino)</h4>
                        <p className="text-gray-600">Single • 2024</p>
                      </div>
                      <Button
                        size="sm"
                        className="bg-orange-600 hover:bg-orange-700"
                        onClick={() => openLink(LINKS.singles['Meddane Taknassam (feat. Bombino)'])}
                        aria-label="Lire Meddane Taknassam"
                        title="Lire sur YouTube"
                      >
                        <Play size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Plateformes */}
            <div className="text-center mt-12">
              <h3 className="text-2xl font-bold mb-6 tuareg-blue">Écouter sur les plateformes</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={LINKS.artist.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-lg font-medium transition-all"
                >
                  Spotify
                </a>
                <a
                  href={LINKS.artist.apple}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-full text-lg font-medium transition-all"
                >
                  Apple Music
                </a>
                <a
                  href={LINKS.artist.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full text-lg font-medium transition-all"
                >
                  YouTube Music
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Concerts & Festivals */}
      <section id="concerts" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-16 tuareg-blue">Concerts & Festivals</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* À VENIR */}
              <Card className="hover-lift">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 desert-orange">À venir</h3>
                  {upcomingEvents.length === 0 && (
                    <p className="text-gray-600 text-center">Nouvelles dates bientôt annoncées.</p>
                  )}
                  {upcomingEvents.map((ev, i) => (
                    <div key={`${ev.title}-${i}`} className="border-l-4 border-orange-500 pl-6 mb-6">
                      <h4 className="font-semibold text-lg">{ev.title}</h4>
                      <p className="text-gray-600 flex items-center mt-2">
                        <MapPin size={16} className="mr-2" />
                        {ev.city}{ev.country ? `, ${ev.country}` : ''}{ev.dateISO ? ` • ${fmtDate(ev.dateISO)}` : ''}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* PASSÉS / RÉCENTS */}
              <Card className="hover-lift">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 desert-orange">Passés / récents</h3>
                  {pastEvents.map((ev, i) => (
                    <div key={`${ev.title}-${i}`} className="border-l-4 border-blue-500 pl-6 mb-6">
                      <h4 className="font-semibold text-lg">{ev.title}</h4>
                      <p className="text-gray-600 flex items-center mt-2">
                        <MapPin size={16} className="mr-2" />
                        {ev.city}{ev.country ? `, ${ev.country}` : ''}{ev.dateISO ? ` • ${fmtDate(ev.dateISO)}` : ''}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Section Galerie */}
      <Gallery />

      {/* Section Vidéos */}
      <Videos />

      {/* Section Réseaux sociaux */}
      <SocialFeeds />

     {/* Section Contact */}
<section id="contact" className="py-20 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-5xl font-bold mb-12">Contact</h2>

    <div className="grid md:grid-cols-2 gap-12 mb-12">
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

    {/* Bouton cliquable */}
    <a
      href="mailto:contact@kadertarhanine.com"
      className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg rounded-full hover-lift transition-all"
    >
      <Mail className="mr-2" size={20} />
      Nous contacter
    </a>
  </div>
</section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">© 2025 Kader Tarhanine. Tous droits réservés.</p>
          <p className="text-gray-500 mt-2">Prince du Desert Blues • Musique Touareg Moderne</p>
        </div>
      </footer>
    </div>
  )
}

export default App

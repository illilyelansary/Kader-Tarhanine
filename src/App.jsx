import React, { useState, useEffect } from 'react'
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass-effect shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold tuareg-blue">
              Kader Tarhanine
            </div>
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
            {/* Menu mobile */}
            <div className="lg:hidden">
              <Button variant="ghost" size="sm">
                <Music size={20} />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Section Hero - Image ajustée plus bas */}
      <section id="accueil" className="hero-section flex items-center justify-center relative pt-20">
        <div 
          className="absolute inset-0 parallax-bg opacity-30"
          style={{ backgroundImage: `url(${desertLandscape})` }}
        />
        <div className="hero-overlay" />
        <div className="relative z-10 text-center text-white px-6 py-20">
          <div className="fade-in">
            <img 
              src={kaderPhoto} 
              alt="Kader Tarhanine" 
              className="w-48 h-48 md:w-64 md:h-64 rounded-full mx-auto mb-8 object-cover border-4 border-white/30 shadow-2xl"
            />
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4 slide-in-left">
              Kader Tarhanine
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl mb-8 slide-in-right">
              Prince du Desert Blues
            </p>
            <p className="text-base md:text-lg lg:text-xl mb-12 max-w-2xl mx-auto opacity-90">
              Artiste Tuareg moderne alliant traditions sahariennes et sonorités rock contemporaines
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => scrollToSection('musique')}
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg rounded-full hover-lift"
              >
                <Play className="mr-2" size={20} />
                Écouter ma musique
              </Button>
              <Button 
                onClick={() => scrollToSection('concerts')}
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3 text-lg rounded-full hover-lift"
              >
                <Calendar className="mr-2" size={20} />
                Voir les concerts
              </Button>
            </div>
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
                  Né en 1989 à Borj El Moctar en Algérie, Kader Tarhanine (né Kader Sabou) incarne la nouvelle génération 
                  de la musique Tuareg. Ses origines nomades du légendaire désert du Sahara du Mali transparaissent dans 
                  chaque note de sa guitare.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Leader du groupe Afous d'Afous de Tamanrasset, il est devenu l'un des artistes les plus suivis 
                  par les jeunes du Sahara, incarnant la nouveauté de style, la jeunesse et le talent naturel.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Sa musique allie les rythmes traditionnels aux tonalités rock sur des paroles poétiques 
                  sahéliennes et arabophones, créant un pont unique entre tradition et modernité.
                </p>
              </div>
              <div className="relative">
                <img 
                  src={tuaregMusicians} 
                  alt="Musiciens Tuareg" 
                  className="rounded-lg shadow-2xl hover-lift"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 desert-gradient rounded-full opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Musique - Enrichie */}
      <section id="musique" className="py-20 bg-gradient-to-r from-amber-100 to-orange-100">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-16 tuareg-blue">Musique</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="hover-lift">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 desert-orange">Albums</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                      <div>
                        <h4 className="font-semibold">Ikewane (Racines)</h4>
                        <p className="text-gray-600">Album • 2019 • 13 titres</p>
                        <p className="text-sm text-gray-500">Enregistré au studio Moffou de Salif Keïta</p>
                      </div>
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        <Play size={16} />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                      <div>
                        <h4 className="font-semibold">Tenere</h4>
                        <p className="text-gray-600">Album • 2017</p>
                      </div>
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        <Play size={16} />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                      <div>
                        <h4 className="font-semibold">Alboum Kader Tarhanin</h4>
                        <p className="text-gray-600">Album • 2015</p>
                      </div>
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        <Play size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 desert-orange">Singles Récents</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                      <div>
                        <h4 className="font-semibold">Aliad Idja Ehane</h4>
                        <p className="text-gray-600">Single • 2024</p>
                      </div>
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        <Play size={16} />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                      <div>
                        <h4 className="font-semibold">Meddane Taknassam (feat. Bombino)</h4>
                        <p className="text-gray-600">Single • 2024</p>
                      </div>
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        <Play size={16} />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                      <div>
                        <h4 className="font-semibold">Zain Assahra (feat. MOUNA DENDENNI)</h4>
                        <p className="text-gray-600">Single • 2023</p>
                      </div>
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        <Play size={16} />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                      <div>
                        <h4 className="font-semibold">Algamra Leila</h4>
                        <p className="text-gray-600">Single • 2019</p>
                      </div>
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        <Play size={16} />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                      <div>
                        <h4 className="font-semibold">Tarhanine (feat. Sidiki Diabaté)</h4>
                        <p className="text-gray-600">Single • 2018</p>
                      </div>
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        <Play size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <h3 className="text-2xl font-bold mb-6 tuareg-blue">Écouter sur les plateformes</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Spotify
                </Button>
                <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                  Apple Music
                </Button>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  YouTube Music
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Concerts - Enrichie */}
      <section id="concerts" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-16 tuareg-blue">Concerts & Festivals</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="hover-lift">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 desert-orange">Prochaines Dates 2025</h3>
                  <div className="space-y-6">
                    <div className="border-l-4 border-orange-500 pl-6">
                      <h4 className="font-semibold text-lg">African Beats Festival</h4>
                      <p className="text-gray-600 flex items-center mt-2">
                        <MapPin size={16} className="mr-2" />
                        Varsovie, Pologne • 9 août 2025
                      </p>
                    </div>
                    <div className="border-l-4 border-orange-500 pl-6">
                      <h4 className="font-semibold text-lg">Osaka Festival</h4>
                      <p className="text-gray-600 flex items-center mt-2">
                        <MapPin size={16} className="mr-2" />
                        Osaka, Japon • 2-5 août 2025
                      </p>
                    </div>
                    <div className="border-l-4 border-orange-500 pl-6">
                      <h4 className="font-semibold text-lg">Sfinks Mixed</h4>
                      <p className="text-gray-600 flex items-center mt-2">
                        <MapPin size={16} className="mr-2" />
                        Belgique • 27 juillet 2025
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 desert-orange">Festivals Récents</h3>
                  <div className="space-y-6">
                    <div className="border-l-4 border-blue-500 pl-6">
                      <h4 className="font-semibold text-lg">Rudolstadt Festival</h4>
                      <p className="text-gray-600 flex items-center mt-2">
                        <MapPin size={16} className="mr-2" />
                        Allemagne • 6 juillet 2025
                      </p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-6">
                      <h4 className="font-semibold text-lg">Rotterdam Bluegrass Festival</h4>
                      <p className="text-gray-600 flex items-center mt-2">
                        <MapPin size={16} className="mr-2" />
                        Hollande • 30 juin 2024
                      </p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-6">
                      <h4 className="font-semibold text-lg">Roskilde Festival</h4>
                      <p className="text-gray-600 flex items-center mt-2">
                        <MapPin size={16} className="mr-2" />
                        Danemark • 4 juillet 2024
                      </p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-6">
                      <h4 className="font-semibold text-lg">Oslo World Festival</h4>
                      <p className="text-gray-600 flex items-center mt-2">
                        <MapPin size={16} className="mr-2" />
                        Norvège • 2023
                      </p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-6">
                      <h4 className="font-semibold text-lg">Timitar Festival</h4>
                      <p className="text-gray-600 flex items-center mt-2">
                        <MapPin size={16} className="mr-2" />
                        Agadir, Maroc
                      </p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-6">
                      <h4 className="font-semibold text-lg">Festival of World Sacred Music</h4>
                      <p className="text-gray-600 flex items-center mt-2">
                        <MapPin size={16} className="mr-2" />
                        Fès, Maroc
                      </p>
                    </div>
                  </div>
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

      {/* Section Réseaux Sociaux */}
      <SocialFeeds />

      {/* Section Contact */}
      <section id="contact" className="py-20 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-16">Contact</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="space-y-4">
                <Youtube size={48} className="mx-auto text-red-500" />
                <h3 className="text-xl font-semibold">YouTube</h3>
                <p className="text-gray-300">Kader Tarhanine Official</p>
                <p className="text-sm text-gray-400">144K abonnés</p>
              </div>
              <div className="space-y-4">
                <Instagram size={48} className="mx-auto text-pink-500" />
                <h3 className="text-xl font-semibold">Instagram</h3>
                <p className="text-gray-300">@kadertarhanine</p>
                <p className="text-sm text-gray-400">105K abonnés</p>
              </div>
              <div className="space-y-4">
                <Mail size={48} className="mx-auto text-blue-500" />
                <h3 className="text-xl font-semibold">Booking</h3>
                <p className="text-gray-300">contact@kadertarhanine.com</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-lg text-gray-300 mb-8">
                Pour les demandes de booking, collaborations ou informations
              </p>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg rounded-full hover-lift">
                <Mail className="mr-2" size={20} />
                Nous contacter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2025 Kader Tarhanine. Tous droits réservés.
          </p>
          <p className="text-gray-500 mt-2">
            Prince du Desert Blues • Musique Tuareg Moderne
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App


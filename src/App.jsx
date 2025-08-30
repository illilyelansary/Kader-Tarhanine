// src/App.jsx
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import {
  Music, Play, Calendar, MapPin, Instagram, Youtube, Mail,
  Guitar, Camera, Video, Users, Menu as MenuIcon, X
} from 'lucide-react'
import './App.css'

// Sections découpées
import Hero from './sections/Hero.jsx'
import Apropos from './sections/Apropos.jsx'
import Musique from './sections/Musique.jsx'
import Concerts from './sections/Concerts.jsx'

// ⬇️ Ces trois imports pointent désormais vers /sections
import Gallery from './sections/Gallery.jsx'
import Videos from './sections/Videos.jsx'
import SocialFeeds from './sections/SocialFeeds.jsx'

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-effect shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a
              href="#accueil"
              onClick={(e) => { e.preventDefault(); scrollToSection('accueil') }}
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
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/80 to-black/60 backdrop-blur-md"
            onClick={() => setMobileOpen(false)}
          />
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

      {/* SECTIONS */}
      <Hero onGotoMusique={() => scrollToSection('musique')} onGotoConcerts={() => scrollToSection('concerts')} />

      <Apropos />

      <Musique onGotoVideos={() => scrollToSection('videos')} />

      <Concerts />

      {/* Galerie */}
      <Gallery />

      {/* Vidéos (tri déjà géré à l’intérieur) */}
      <Videos sort="desc" />

      {/* Réseaux sociaux */}
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
                  Essakane Production
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
                  @kadertarhanine
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

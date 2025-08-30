import React from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Play, Calendar } from 'lucide-react'
import kaderPhoto from '@/assets/4enTSMYZjml8.jpg'
import desertLandscape from '@/assets/mH0NU1PYe0fM.jpg'

export default function Hero({ onGotoMusique, onGotoConcerts }) {
  return (
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
            onClick={onGotoMusique}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg rounded-full hover-lift"
          >
            <Play className="mr-2" size={20} /> Écouter ma musique
          </Button>
          <Button
            onClick={onGotoConcerts}
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3 text-lg rounded-full hover-lift"
          >
            <Calendar className="mr-2" size={20} /> Voir les concerts
          </Button>
        </div>
      </div>
    </section>
  )
}

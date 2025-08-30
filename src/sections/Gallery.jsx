import React, { useEffect, useMemo, useRef, useState } from 'react'
import { MapPin, Camera } from 'lucide-react'
import { Card } from '@/components/ui/card.jsx'

// === Import des images de la galerie (tes chemins existants) ===
import concertImage1 from '/images/gallery/ymXNb0Apm9Pj.jpeg'
import concertImage2 from '/images/gallery/SWwTzx3D789s.jpg'
import concertImage3 from '/images/gallery/iMh5SQp5wcdF.jpg'
import concertImage4 from '/images/gallery/IBXZopS5LH7X.jpg'
import portraitImage from '/images/gallery/XX5EkhpUYTUj.jpg'

/**
 * Galerie à slider continu + miniatures
 * - Autoplay (boucle)
 * - Swipe mobile
 * - Flèches de navigation
 * - Miniatures cliquables synchronisées
 */
export default function Gallery() {
  // ====== Données d’origine conservées ======
  const galleryImages = [
    {
      id: 1,
      src: concertImage1,
      title: 'Kader Tarhanine Tour 2025',
      location: 'Europe',
      type: 'concert',
    },
    {
      id: 2,
      src: concertImage2,
      title: 'Extraits Concerts Kader Tarhanine',
      location: 'Festival',
      type: 'concert',
    },
    {
      id: 3,
      src: concertImage3,
      title: 'Rotterdam Bluegrass Festival 2024',
      location: 'Hollande',
      type: 'festival',
    },
    {
      id: 4,
      src: concertImage4,
      title: 'Rotterdam Bluegrass Festival 2024',
      location: 'Hollande',
      type: 'festival',
    },
    {
      id: 5,
      src: portraitImage,
      title: 'Portrait Officiel',
      location: 'Studio',
      type: 'portrait',
    },
  ]

  // ====== Config ======
  const autoplayInterval = 3500 // ms
  const heightClass = 'h-[60vh]' // hauteur du slider principal

  // ====== État du slider ======
  const [index, setIndex] = useState(1) // commence à 1 (à cause des clones)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const autoplayRef = useRef(null)
  const touchStartX = useRef(0)
  const deltaX = useRef(0)

  const base = galleryImages
  const hasImages = base && base.length > 0

  // Piste avec clones (infini)
  const track = useMemo(() => {
    if (!hasImages) return []
    const first = base[0]
    const last = base[base.length - 1]
    return [last, ...base, first]
  }, [hasImages, base])

  // ====== Autoplay ======
  useEffect(() => {
    if (track.length <= 1) return
    startAutoplay()
    return stopAutoplay
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track.length])

  const startAutoplay = () => {
    stopAutoplay()
    autoplayRef.current = setInterval(() => {
      goTo(index + 1)
    }, autoplayInterval)
  }

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
      autoplayRef.current = null
    }
  }

  const goTo = (next) => {
    setIsTransitioning(true)
    setIndex(next)
  }

  // Gestion de la boucle (retour invisible quand on est sur les clones)
  useEffect(() => {
    if (index === track.length - 1) {
      // clone de fin -> revenir au 1er réel
      const t = setTimeout(() => {
        setIsTransitioning(false)
        setIndex(1)
      }, 320)
      return () => clearTimeout(t)
    }
    if (index === 0) {
      // clone de début -> revenir au dernier réel
      const t = setTimeout(() => {
        setIsTransitioning(false)
        setIndex(track.length - 2)
      }, 320)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setIsTransitioning(true), 30)
    return () => clearTimeout(t)
  }, [index, track.length])

  // ====== Swipe mobile ======
  const onTouchStart = (e) => {
    stopAutoplay()
    touchStartX.current = e.touches[0].clientX
    deltaX.current = 0
  }
  const onTouchMove = (e) => {
    deltaX.current = e.touches[0].clientX - touchStartX.current
  }
  const onTouchEnd = () => {
    const threshold = 50
    if (deltaX.current > threshold) goTo(index - 1)
    else if (deltaX.current < -threshold) goTo(index + 1)
    startAutoplay()
  }

  const translate = `translateX(-${index * 100}%)`

  const selectFromThumb = (i) => {
    stopAutoplay()
    setIsTransitioning(true)
    setIndex(i + 1) // +1 à cause du clone en tête
    startAutoplay()
  }

  const badgeClass = (t) =>
    t === 'concert'
      ? 'bg-orange-500 text-white'
      : t === 'festival'
      ? 'bg-blue-600 text-white'
      : 'bg-purple-600 text-white'

  return (
    <section id="galerie" className="py-20 bg-gradient-to-r from-amber-50 to-orange-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-5xl font-bold mb-6 tuareg-blue">Galerie</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez les moments marquants de la carrière de Kader Tarhanine à travers ces images de concerts, festivals et portraits.
            </p>
          </div>

          {/* ====== SLIDER PRINCIPAL ====== */}
          <Card className="overflow-hidden rounded-2xl shadow-xl border border-amber-200">
            <div
              className={`relative w-full ${heightClass} bg-slate-100`}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {/* PISTE */}
              <div
                className="flex w-full h-full"
                style={{
                  transform: translate,
                  transition: isTransitioning ? 'transform 0.38s ease-in-out' : 'none',
                }}
              >
                {track.map((img, idx) => (
                  <div key={idx} className="min-w-full h-full relative">
                    <img
                      src={img.src}
                      alt={img.title || `Slide ${idx}`}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />

                    {/* Overlay dégradé bas + infos */}
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 to-transparent rounded-b-2xl" />
                      <div className="relative text-white">
                        <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium mb-2 ${badgeClass(img.type)}`}>
                          {img.type === 'concert' ? 'Concert' : img.type === 'festival' ? 'Festival' : 'Portrait'}
                        </div>
                        <h3 className="font-semibold text-lg leading-tight">{img.title}</h3>
                        {img.location && (
                          <div className="flex items-center text-sm text-white/90 mt-1">
                            <MapPin size={14} className="mr-1" />
                            {img.location}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Flèches */}
              {hasImages && base.length > 1 && (
                <>
                  <button
                    aria-label="Précédent"
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white p-2 hover:bg-black/60"
                    onClick={() => {
                      stopAutoplay()
                      goTo(index - 1)
                      startAutoplay()
                    }}
                  >
                    ‹
                  </button>
                  <button
                    aria-label="Suivant"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white p-2 hover:bg-black/60"
                    onClick={() => {
                      stopAutoplay()
                      goTo(index + 1)
                      startAutoplay()
                    }}
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* ====== MINIATURES ====== */}
            {hasImages && base.length > 1 && (
              <div className="bg-white px-4 py-3">
                <div className="flex gap-3 overflow-x-auto no-scrollbar">
                  {base.map((img, i) => {
                    const isActive =
                      index === i + 1 ||
                      (index === 0 && i === base.length - 1) ||
                      (index === track.length - 1 && i === 0)
                    return (
                      <button
                        key={img.id || i}
                        className={
                          'relative shrink-0 w-24 h-16 rounded-lg overflow-hidden ring-1 transition ' +
                          (isActive ? 'ring-orange-500' : 'ring-slate-200 hover:ring-slate-300')
                        }
                        onClick={() => selectFromThumb(i)}
                        aria-label={`Aller à l’image ${i + 1}`}
                      >
                        <img
                          src={img.src}
                          alt={img.title || `Miniature ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {isActive && <span className="absolute inset-0 ring-2 ring-orange-500 rounded-lg pointer-events-none" />}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </Card>

          {/* Note sous la galerie */}
          <div className="text-center mt-10">
            <div className="inline-flex items-center justify-center gap-2 text-gray-600">
              <Camera size={20} />
              <span>Plus de photos disponibles sur nos réseaux sociaux</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

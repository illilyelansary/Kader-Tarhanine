import React from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Camera, MapPin } from 'lucide-react'

// Import des images de la galerie
import concertImage1 from '/images/gallery/ymXNb0Apm9Pj.jpeg'
import concertImage2 from '/images/gallery/SWwTzx3D789s.jpg'
import concertImage3 from '/images/gallery/iMh5SQp5wcdF.jpg'
import concertImage4 from '/images/gallery/IBXZopS5LH7X.jpg'
import portraitImage from '/images/gallery/XX5EkhpUYTUj.jpg'

const Gallery = () => {
  const galleryImages = [
    {
      id: 1,
      src: concertImage1,
      title: "Kader Tarhanine Tour 2025",
      location: "Europe",
      type: "concert"
    },
    {
      id: 2,
      src: concertImage2,
      title: "Extraits Concerts Kader Tarhanine",
      location: "Festival",
      type: "concert"
    },
    {
      id: 3,
      src: concertImage3,
      title: "Rotterdam Bluegrass Festival 2024",
      location: "Hollande",
      type: "festival"
    },
    {
      id: 4,
      src: concertImage4,
      title: "Rotterdam Bluegrass Festival 2024",
      location: "Hollande",
      type: "festival"
    },
    {
      id: 5,
      src: portraitImage,
      title: "Portrait Officiel",
      location: "Studio",
      type: "portrait"
    }
  ]

  return (
    <section id="galerie" className="py-20 bg-gradient-to-r from-amber-50 to-orange-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 tuareg-blue">Galerie</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez les moments marquants de la carrière de Kader Tarhanine à travers ces images de concerts, festivals et portraits.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((image) => (
              <Card key={image.id} className="overflow-hidden hover-lift group">
                <div className="relative">
                  <img 
                    src={image.src} 
                    alt={image.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-semibold text-lg mb-2">{image.title}</h3>
                    <div className="flex items-center text-sm">
                      <MapPin size={14} className="mr-1" />
                      {image.location}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      image.type === 'concert' ? 'bg-orange-500 text-white' :
                      image.type === 'festival' ? 'bg-blue-500 text-white' :
                      'bg-purple-500 text-white'
                    }`}>
                      {image.type === 'concert' ? 'Concert' :
                       image.type === 'festival' ? 'Festival' : 'Portrait'}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Camera size={20} />
              <span>Plus de photos disponibles sur nos réseaux sociaux</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Gallery


import React from 'react'
import tuaregMusicians from '@/assets/sgxiVNQXFkDF.jpg'

// Photos des membres (mets tes fichiers dans /assets/members)
import abdElkadirPhoto from '@/assets/members/abd-elkadir.jpg'
import mohammedZenaniPhoto from '@/assets/members/mohammed-zenani.jpg'
import mohamedAlhousseiniPhoto from '@/assets/members/mohamed-alhousseini.jpg'
import drissaKonePhoto from '@/assets/members/drissa-kone.jpg'

const bandMembers = [
  { name: 'Abd Elkadir SABOU', role: 'Guitare & Voix Lead', photo: abdElkadirPhoto },
  { name: 'Mohammed Zenani', role: 'Guitare rythmique & Voix', photo: mohammedZenaniPhoto },
  { name: 'Mohamed Alhousseini', role: 'Percussions (Batterie / Djembé / Calebasse)', photo: mohamedAlhousseiniPhoto },
  { name: 'Drissa Koné', role: 'Guitare Basse', photo: drissaKonePhoto },
]

const getInitials = (fullName) => {
  if (!fullName) return '?'
  const parts = fullName.trim().split(/\s+/)
  const first = parts[0]?.[0] || ''
  const last = parts[parts.length - 1]?.[0] || ''
  return (first + last).toUpperCase()
}

export default function Apropos() {
  return (
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

              {/* Encadré membres du groupe */}
              <div className="mt-10">
                <h4 className="text-2xl font-semibold mb-6 tuareg-blue">Membres du groupe</h4>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {bandMembers.map((m, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center text-center p-4 bg-amber-50 rounded-2xl shadow-sm hover-lift"
                    >
                      {m.photo ? (
                        <img
                          src={m.photo}
                          alt={m.name}
                          className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white shadow"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full mb-4 border-4 border-white shadow flex items-center justify-center desert-gradient text-white text-xl font-bold">
                          {getInitials(m.name)}
                        </div>
                      )}
                      <div className="space-y-1">
                        <h5 className="font-semibold text-base">{m.name}</h5>
                        <p className="text-sm text-gray-600">{m.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
  )
}

import { Mail } from 'lucide-react'
import Ext from '@/components/Ext.jsx'
import { emails, links } from '@/data/links.js'

const all = [
  ['Spotify', links.spotify], ['Apple Music', links.appleMusic], ['Bandcamp', links.bandcamp],
  ['YouTube', links.youtubeOfficial], ['Instagram', links.instagram], ['Facebook', links.facebook],
  ['TikTok', links.tiktok], ['X', links.x], ['Bandsintown', links.bandsintown],
]

export default function Contact() {
  return (
    <section id="contact" className="bg-dye py-20 text-white sm:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="section-title">Contact et booking</h2>
          <p className="mt-5 max-w-lg text-white/85">
            Concerts, festivals, collaborations, presse : l'équipe d'Essakane Production vous répond.
          </p>
        </div>

        <div className="space-y-6">
          <a href={`mailto:${emails.booking}?subject=Booking%20Kader%20Tarhanine`} className="group block border-b border-white/25 pb-5">
            <span className="block text-white/70">Booking et programmation</span>
            <span className="block break-all font-display text-3xl font-bold group-hover:text-saffron sm:text-4xl">{emails.booking}</span>
          </a>
          <a href={`mailto:${emails.contact}?subject=Contact%20Kader%20Tarhanine`} className="group block border-b border-white/25 pb-5">
            <span className="block text-white/70">Presse, partenariats et informations</span>
            <span className="block break-all font-display text-3xl font-bold group-hover:text-saffron sm:text-4xl">{emails.contact}</span>
          </a>
          <a href={`mailto:${emails.booking}?subject=Booking%20%2F%20Collaboration%20-%20Kader%20Tarhanine`} className="btn btn-saffron">
            <Mail size={18} aria-hidden="true" /> Écrire au booking
          </a>
        </div>

        <ul className="flex flex-wrap gap-2 lg:col-span-2">
          {all.map(([label, href]) => (
            <li key={label}>
              <Ext href={href} className="chip border-white/30 hover:bg-white/10">{label}</Ext>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

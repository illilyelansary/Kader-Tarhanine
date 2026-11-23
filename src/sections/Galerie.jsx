import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Modal from '@/components/Modal.jsx'
import Ext from '@/components/Ext.jsx'
import { photos } from '@/data/gallery.js'
import { links } from '@/data/links.js'

export default function Galerie() {
  const [open, setOpen] = useState(null)
  const go = (step) => setOpen((i) => (i + step + photos.length) % photos.length)

  return (
    <section id="galerie" className="bg-night py-20 text-white sm:py-28">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="section-title">Galerie</h2>
          <Ext href={links.instagram} className="btn btn-ghost-light">Plus de photos sur Instagram</Ext>
        </div>

        <ul className="mt-10 grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[14rem] md:grid-cols-4">
          {photos.map((p, i) => (
            <li key={p.title + i} className={i === 0 ? 'col-span-2 row-span-2' : ''}>
              <button type="button" onClick={() => setOpen(i)} className="group relative block h-full w-full overflow-hidden rounded-lg" aria-label={`Agrandir : ${p.title}`}>
                <img src={p.src} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/85 to-transparent p-3 pt-10 text-left">
                  <span className="block text-sm font-semibold">{p.title}</span>
                  <span className="block text-xs text-white/70">{p.place}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {open !== null && (
        <Modal label={photos[open].title} onClose={() => setOpen(null)}>
          <div className="relative">
            <img src={photos[open].src} alt={photos[open].title} className="mx-auto max-h-[80vh] rounded-lg object-contain" />
            <button type="button" onClick={() => go(-1)} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-night/70 p-2" aria-label="Photo précédente"><ChevronLeft /></button>
            <button type="button" onClick={() => go(1)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-night/70 p-2" aria-label="Photo suivante"><ChevronRight /></button>
          </div>
          <p className="mt-3 text-center text-white">{photos[open].title}, {photos[open].place}</p>
        </Modal>
      )}
    </section>
  )
}

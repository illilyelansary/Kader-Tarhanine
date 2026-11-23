import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const NAV = [
  { id: 'tournee', label: 'Tournée' },
  { id: 'musique', label: 'Musique' },
  { id: 'videos', label: 'Vidéos' },
  { id: 'biographie', label: 'Biographie' },
  { id: 'galerie', label: 'Galerie' },
  { id: 'actualites', label: 'Actualités' },
  { id: 'contact', label: 'Contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Met en évidence la rubrique visible
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled || open ? 'bg-night/95 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.08)]' : 'bg-transparent'
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between text-white">
        <a href="#accueil" className="font-display text-2xl font-extrabold tracking-wide" onClick={() => setOpen(false)}>
          Kader Tarhanine
        </a>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  aria-current={active === n.id ? 'true' : undefined}
                  className={`rounded-full px-3 py-1.5 text-[0.95rem] transition-colors hover:text-saffron ${
                    active === n.id ? 'text-saffron' : 'text-white/85'
                  }`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#tournee" className="btn btn-saffron hidden lg:inline-flex">Billets</a>

        <button
          type="button"
          className="lg:hidden rounded-full p-2 hover:bg-white/10"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <nav id="menu-mobile" aria-label="Menu" className="lg:hidden h-[calc(100dvh-4rem)] overflow-y-auto bg-night px-5 pb-10 pt-4">
          <ul className="space-y-1">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-display text-4xl font-bold text-white hover:text-saffron"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#tournee" onClick={() => setOpen(false)} className="btn btn-saffron mt-8">Voir les dates et billets</a>
        </nav>
      )}
    </header>
  )
}

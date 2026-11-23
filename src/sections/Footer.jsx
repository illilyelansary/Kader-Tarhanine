export default function Footer() {
  return (
    <footer className="bg-night py-10 text-white/60">
      <div className="wrap flex flex-wrap items-center justify-between gap-4 text-sm">
        <p>© {new Date().getFullYear()} Kader Tarhanine. Tous droits réservés.</p>
        <p>Prince du desert blues, musique touarègue moderne. Production : Essakane Production.</p>
      </div>
    </footer>
  )
}

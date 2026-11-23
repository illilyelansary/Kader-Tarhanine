import Header from './components/Header.jsx'
import Hero from './sections/Hero.jsx'
import Tournee from './sections/Tournee.jsx'
import Musique from './sections/Musique.jsx'
import Videos from './sections/Videos.jsx'
import Biographie from './sections/Biographie.jsx'
import Galerie from './sections/Galerie.jsx'
import Actualites from './sections/Actualites.jsx'
import Contact from './sections/Contact.jsx'
import Footer from './sections/Footer.jsx'

export default function App() {
  return (
    <>
      <a href="#tournee" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-saffron focus:px-4 focus:py-2 focus:text-night">
        Aller au contenu
      </a>
      <Header />
      <main>
        <Hero />
        <Tournee />
        <Musique />
        <Videos />
        <Biographie />
        <Galerie />
        <Actualites />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

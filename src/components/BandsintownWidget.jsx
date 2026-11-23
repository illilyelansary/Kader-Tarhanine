import { useEffect, useRef, useState } from 'react'
import { BANDSINTOWN_ARTIST_ID } from '@/data/links.js'

/**
 * Widget officiel Bandsintown : affiche en direct les dates publiées sur la
 * page Bandsintown de l'artiste (les mêmes que sur Spotify et Apple Music).
 * Si le widget ne se charge pas (bloqueur de publicité, réseau lent…),
 * `onFail` est appelé et le site affiche la liste locale à la place.
 */
const SCRIPT_SRC = 'https://widgetv3.bandsintown.com/main.min.js'
const TIMEOUT_MS = 10000

export default function BandsintownWidget({ onFail }) {
  const ref = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let done = false
    const el = ref.current
    const observer = new MutationObserver(() => {
      if (!done && el?.querySelector('.bit-widget, iframe, [class*="bit-"]:not(.bit-widget-initializer)')) {
        done = true
        setLoaded(true)
        observer.disconnect()
      }
    })
    if (el) observer.observe(el, { childList: true, subtree: true })

    const fail = () => {
      if (done) return
      done = true
      observer.disconnect()
      onFail?.()
    }

    if (!document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
      const s = document.createElement('script')
      s.src = SCRIPT_SRC
      s.charset = 'utf-8'
      s.async = true
      s.onerror = fail
      document.body.appendChild(s)
    }
    const timer = setTimeout(fail, TIMEOUT_MS)
    return () => { clearTimeout(timer); observer.disconnect() }
  }, [onFail])

  return (
    <div ref={ref} className="bandsintown-widget" aria-live="polite">
      {!loaded && <p className="text-white/60">Chargement des dates…</p>}
      <a
        className="bit-widget-initializer"
        data-artist-name={`id_${BANDSINTOWN_ARTIST_ID}`}
        data-language="fr"
        data-display-local-dates="false"
        data-display-past-dates="false"
        data-auto-style="false"
        data-text-color="#FFFFFF"
        data-link-color="#E0A526"
        data-link-text-color="#12163A"
        data-background-color="rgba(0,0,0,0)"
        data-popup-background-color="#FFFFFF"
        data-separator-color="rgba(255,255,255,0.15)"
        data-display-limit="30"
        data-display-start-time="true"
        data-display-lineup="false"
        data-display-play-my-city="false"
        data-display-logo="false"
        data-app-id="js_www.kadertarhanine.com"
      />
    </div>
  )
}

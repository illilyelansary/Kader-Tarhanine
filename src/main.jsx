import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App.jsx'

// Anciennes ancres de l'ancien site → nouvelles rubriques (liens et QR codes déjà partagés)
const OLD_ANCHORS = { '#concerts': '#tournee', '#apropos': '#biographie', '#reseaux-sociaux': '#actualites' }
if (OLD_ANCHORS[window.location.hash]) {
  window.history.replaceState(null, '', OLD_ANCHORS[window.location.hash])
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

import { links } from './links.js'

// Actualités, de la plus récente à la plus ancienne
export const news = [
  { date: '2026-11-23', platform: 'Site', text: "Les dates de la Tournée Automne 2026 sont en ligne, aussi sur Spotify, Apple Music et Bandsintown.", href: '#tournee', cta: 'Voir les dates' },
  { date: '2026-10-01', platform: 'Sortie', text: '« Talyat », nouveau single de Céline Lachemot et Kader Tarhanine, est disponible.', href: links.appleMusic, cta: 'Écouter' },
  { date: '2026-07-09', platform: 'Concert', text: 'Kader Tarhanine au Festival au Désert de Florence, au Parco delle Cascine.', href: links.facebook, cta: 'Voir sur Facebook' },
  { date: '2026-06-26', platform: 'Concert', text: "Soirée blues touareg au Festival d'Été du Cabaret Sauvage, à Paris, avec Bombino.", href: 'https://www.cabaretsauvage.com/work/festival-dete-bombino-i-kader-tarhanine', cta: "Voir l'événement" },
  { date: '2025-08-05', platform: 'Facebook', text: 'Kader Tarhanine jouera à l’African Beats Festival le 9 août à 18 h.', href: links.facebook, cta: 'Voir sur Facebook' },
  { date: '2025-07-06', platform: 'YouTube', text: '« Asahra », captation au Rudolstadt Festival en Allemagne.', href: 'https://www.youtube.com/watch?v=7SORkXHJHeg', cta: 'Regarder' },
  { date: '2025-06-08', platform: 'Instagram', text: 'Eid Mubarak depuis le cœur du Sahara : عيدكم مبارك من قلب الصحراء', href: links.instagram, cta: 'Voir sur Instagram' },
]

// Réseaux (nombres d'abonnés relevés en 2025, à mettre à jour si besoin)
export const socialProfiles = [
  { platform: 'Instagram', handle: '@kadertarhanine', followers: '105 K', href: links.instagram },
  { platform: 'YouTube', handle: 'Kader Tarhanine Official', followers: '144 K', href: links.youtubeOfficial },
  { platform: 'Facebook', handle: 'Kader Tarhanine Officiel', followers: '27 K', href: links.facebook },
  { platform: 'TikTok', handle: '@kadertarhanine', href: links.tiktok },
  { platform: 'YouTube', handle: 'Essakane Production', href: links.youtubeEssakane },
  { platform: 'X', handle: '@essakaneprod', href: links.x },
]

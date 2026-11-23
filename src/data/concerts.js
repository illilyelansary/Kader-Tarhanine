/**
 * Concerts & festivals
 * - date    : jour du concert (AAAA-MM-JJ), ou premier jour d'un festival
 * - endDate : (facultatif) dernier jour d'un festival sur plusieurs jours
 * - tour    : (facultatif) nom de la tournée
 * - url     : (facultatif) page de l'événement ou billetterie
 *
 * Les prochaines dates s'affichent en direct depuis Bandsintown (synchronisées
 * avec Spotify). Cette liste sert de secours si Bandsintown ne répond pas,
 * alimente l'annonce « Prochain concert » de l'accueil et l'archive des
 * concerts passés. Une date passe d'elle-même dans l'archive le lendemain.
 */
export const TOURNEE_AUTOMNE = 'Tournée Automne 2026'

export const concerts = [
  // ── Tournée Automne 2026 (Essakane Production) ──
  { date: '2026-11-22', endDate: '2026-11-24', title: 'World Culture Festival', city: 'Karachi', country: 'Pakistan', tour: TOURNEE_AUTOMNE },
  { date: '2026-11-26', title: 'Moods', city: 'Zurich', country: 'Suisse', tour: TOURNEE_AUTOMNE },
  { date: '2026-11-27', title: 'Festival Africolor, Salle Jacques Brel', city: 'Pantin (Paris)', country: 'France', note: '20 h 30, avec Baraka', tour: TOURNEE_AUTOMNE },
  { date: '2026-11-28', title: 'Le Singe', city: 'Bienne (Biel)', country: 'Suisse', tour: TOURNEE_AUTOMNE },
  { date: '2026-12-01', title: 'Import Export', city: 'Munich', country: 'Allemagne', note: 'Portes 19 h 00, concert 21 h 15. Schwere-Reiter-Str. 2h, 80636 München', tour: TOURNEE_AUTOMNE },
  { date: '2026-12-03', title: 'Mixtape', city: 'Sofia', country: 'Bulgarie', tour: TOURNEE_AUTOMNE },
  { date: '2026-12-07', title: 'Divadlo Dobeška', city: 'Prague', country: 'Tchéquie', tour: TOURNEE_AUTOMNE },
  { date: '2026-12-21', title: 'Blues Désert Festival', city: 'Djanet', country: 'Algérie', tour: TOURNEE_AUTOMNE },
  { date: '2026-12-25', endDate: '2026-12-27', title: 'Festival International des Arts et de la Culture', city: 'Ain Farba', country: 'Mauritanie', tour: TOURNEE_AUTOMNE },

  // ── 2026 ──
  { date: '2026-07-09', title: 'Festival au Désert, Ultravox', city: 'Florence', country: 'Italie', note: 'Prato della Tinaia, entrée libre' },
  { date: '2026-07-04', title: "Wassa'n Africa Festival", city: 'Launac', country: 'France' },
  { date: '2026-06-26', title: "Festival d'Été du Cabaret Sauvage, avec Bombino", city: 'Paris', country: 'France', url: 'https://www.cabaretsauvage.com/work/festival-dete-bombino-i-kader-tarhanine' },
  { date: '2026-01-16', title: 'Cabaret Sauvage, avec Caméléon', city: 'Paris', country: 'France' },

  // ── 2025 ──
  { date: '2025-08-09', title: 'African Beats Festival', city: 'Kawęczyn (Varsovie)', country: 'Pologne', note: 'Concert à 18 h', url: 'https://africanbeats.pl/kader-tarhanine/' },
  { date: '2025-08-02', title: 'Expo Osaka 2025, Journée du Mali', city: 'Osaka', country: 'Japon', note: 'Show de la Journée nationale du Mali', url: 'https://maliactu.net/expo-universelle-osaka-2025-mali-a-lhonneur-avec-une-journee-speciale/' },
  { date: '2025-07-27', title: 'Sfinks Mixed', city: 'Boechout', country: 'Belgique', url: 'https://avanzert.com/concert/kader-tarhanine-sfinks-festival-2025-07-27/' },
  { date: '2025-07-06', title: 'Rudolstadt Festival', city: 'Rudolstadt', country: 'Allemagne', url: 'https://www.rudolstadt-festival.de/en/program/artistdetail/kader-tarhanine.html' },

  // ── 2024 ──
  { date: '2024-08-02', title: 'Siberian Summer Festival', city: 'Trogen', country: 'Suisse' },
  { date: '2024-07-27', title: "Théâtre de l'Orangerie", city: 'Genève', country: 'Suisse', url: 'https://leprogramme.ch/concerts/kader-tarhanine' },
  { date: '2024-07-06', title: 'Festival Tunis sur Seine', city: 'Aubervilliers (Paris)', country: 'France', url: 'https://www.fnactickets.com/ticket-evenement/musique-electronique-ktyb-kader-tarhanine-benboo-man67324-lt.htm' },
  { date: '2024-07-04', title: 'Roskilde Festival', city: 'Roskilde', country: 'Danemark', note: 'Scène GAIA', url: 'https://www.setlist.fm/setlist/kader-tarhanine/2024/dyrskuepladsen-roskilde-denmark-1357d1a1.html' },
  { date: '2024-07-02', title: 'Sala Upload', city: 'Barcelone', country: 'Espagne', url: 'https://dice.fm/event/ry2wvy-kader-tarhanine-2nd-jul-sala-upload-barcelona-tickets?lng=fr' },
  { date: '2024-06-30', title: 'Rotterdam Bluegrass Festival', city: 'Rotterdam', country: 'Pays-Bas', url: 'https://www.setlist.fm/setlist/kader-tarhanine/2024/noordplein-rotterdam-netherlands-6b5782ee.html' },
]

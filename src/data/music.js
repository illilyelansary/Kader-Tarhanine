import { links } from './links.js'

// Mises en avant (la première est affichée par défaut). youtubeId facultatif.
export const featured = [
  {
    date: '2026-10', artist: 'Céline Lachemot & Kader Tarhanine', title: 'Talyat',
    context: 'Single', listenUrl: links.appleMusic,
  },
  {
    date: '2025-08', artist: 'Kader Tarhanine', title: 'Ahegh Akal Dagh Warlegh Tinnah',
    context: 'Rad Fyah Studio, live session', youtubeId: 'jr5eMSLPKuo',
  },
  {
    date: '2025-07', artist: 'H MED 45 ft. Kader Tarhanine', title: 'la la la',
    context: 'Collaboration', youtubeId: '-RQ7DgMvtic',
  },
  {
    date: '2024-11', artist: 'Kader Tarhanine ft. Mouna Dendenni', title: 'Zain Assahra',
    context: 'Single', youtubeId: 'PyFJuUKZUh4',
  },
  {
    date: '2024-09', artist: 'Kader Tarhanine', title: 'Aliad Idja Ehane',
    context: 'Single', youtubeId: 'AOtoOIzTUl8',
  },
  {
    date: '2024-06', artist: 'Kader Tarhanine ft. Bombino', title: 'Meddane Taknassam',
    context: 'Single', youtubeId: 'ALch4yaE7_g',
  },
  {
    date: '2023-04', artist: 'Kader Tarhanine', title: 'Inizdiam',
    context: 'Clip', youtubeId: 'X_ClhuYqbsM',
  },
]

export const albums = [
  {
    title: 'Ikewane', year: 2019,
    spotify: 'https://open.spotify.com/album/4khQAqdVbydwxkGmCTixu7',
    apple: links.appleMusic,
  },
  {
    title: 'Tenere', year: 2017,
    spotify: 'https://open.spotify.com/album/3M1ibb7qJILS8kiI5rXTl3',
    apple: links.appleMusic,
    note: 'Avec « Wiyad Hallen » et « Nak Amahah »',
  },
]

// Singles et clips, du plus récent au plus ancien
export const singles = [
  { title: 'Talyat', with: 'avec Céline Lachemot', kind: 'Single', year: 2026, url: links.appleMusic },
  { title: 'Ahegh Akal Dagh Warlegh Tinnah', kind: 'Single, live session', year: 2025, youtube: 'https://www.youtube.com/watch?v=jr5eMSLPKuo' },
  { title: 'la la la', with: 'H MED 45 ft. Kader Tarhanine', kind: 'Collaboration', year: 2025, youtube: 'https://www.youtube.com/watch?v=-RQ7DgMvtic' },
  { title: 'Zain Assahra', with: 'feat. Mouna Dendenni', kind: 'Single', year: 2024, youtube: 'https://www.youtube.com/watch?v=PyFJuUKZUh4' },
  { title: 'Aliad Idja Ehane', kind: 'Single', year: 2024, youtube: 'https://www.youtube.com/watch?v=AOtoOIzTUl8' },
  { title: 'Meddane Taknassam', with: 'feat. Bombino', kind: 'Single', year: 2024, youtube: 'https://www.youtube.com/watch?v=ALch4yaE7_g' },
  { title: 'Inizdiam', kind: 'Clip', year: 2023, youtube: 'https://www.youtube.com/watch?v=X_ClhuYqbsM' },
  { title: 'Algamra Leila', kind: 'Single (2019), clip (2023)', year: 2023, youtube: 'https://www.youtube.com/watch?v=Sp0Fn4VI1yQ' },
  { title: 'Imanine', with: 'extrait de Ikewane', kind: 'Clip', year: 2019, youtube: 'https://www.youtube.com/watch?v=WJbYL1Zu_0Q' },
  { title: 'Tarhanine', with: 'feat. Sidiki Diabaté', kind: 'Collaboration', year: 2018, youtube: 'https://www.youtube.com/watch?v=pM7sdSJtDgU' },
]

// Participations sur les titres d'autres artistes
export const appearsOn = [
  { title: 'Bandiya (Special Version)', artist: 'Hamzo Bryn feat. Kader Tarhanine & Warda Hemed Vall' },
  { title: 'la la la', artist: 'H MED 45 ft. Kader Tarhanine' },
]

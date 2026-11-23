# Site officiel de Kader Tarhanine

Site React + Vite, déployé automatiquement sur Netlify à chaque envoi (push) sur GitHub.

## Mettre à jour le contenu

Tout le contenu est rangé dans `src/data/`. Pas besoin de toucher au reste du code.

| Fichier | Contenu |
|---|---|
| `src/data/links.js` | Liens officiels (Spotify, Instagram…), adresses e-mail, identifiant Bandsintown |
| `src/data/concerts.js` | Dates de concerts (secours si Bandsintown ne répond pas, et archive des concerts passés) |
| `src/data/music.js` | Sorties à la une, albums, singles, participations |
| `src/data/videos.js` | Clips officiels et vidéos de concerts (liens YouTube) |
| `src/data/band.js` | Biographie, repères chronologiques, membres du groupe |
| `src/data/gallery.js` | Photos de la galerie |
| `src/data/news.js` | Actualités et réseaux sociaux |

Les **prochaines dates de concert** s'affichent en direct depuis Bandsintown
(page de l'artiste n° 15546944) : il suffit de les ajouter sur Bandsintown for Artists.
Pensez quand même à les recopier dans `concerts.js` pour l'archive et l'annonce de l'accueil.

## Photos

Les photos sont dans `src/assets/photos/` et `src/assets/band/`. Pour en ajouter une :
copiez le fichier (JPG, 1600 px de large maximum), puis ajoutez-le dans `src/data/gallery.js`.

## Tester sur son ordinateur (facultatif)

```
pnpm install
pnpm dev
```

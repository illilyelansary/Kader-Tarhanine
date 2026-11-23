import { useState } from 'react'
import { Play, Youtube, Disc3 } from 'lucide-react'
import Ext from '@/components/Ext.jsx'
import { VideoPlayer } from '@/components/Modal.jsx'
import { featured, albums, singles, appearsOn } from '@/data/music.js'
import { listenPlatforms } from '@/data/links.js'
import { monthLabel } from '@/lib/dates.js'

export default function Musique() {
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(false)
  const f = featured[current]

  const select = (i) => { setCurrent(i); setPlaying(false) }

  return (
    <section id="musique" className="py-20 sm:py-28">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="section-title text-night">Musique</h2>
          <div className="flex flex-wrap gap-2">
            {listenPlatforms.map((p) => (
              <Ext key={p.label} href={p.href} className="btn btn-ghost">{p.label}</Ext>
            ))}
          </div>
        </div>

        {/* Sortie mise en avant */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.35fr] lg:items-center">
          <div>
            <p className="text-dye font-semibold">À la une, {monthLabel(f.date)}</p>
            <h3 className="mt-2 font-display text-5xl font-extrabold text-night sm:text-6xl">{f.title}</h3>
            <p className="mt-2 text-lg">{f.artist}</p>
            <p className="text-mute">{f.context}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {f.youtubeId && !playing && (
                <button type="button" className="btn btn-dye" onClick={() => setPlaying(true)}>
                  <Play size={16} aria-hidden="true" /> Lancer la vidéo
                </button>
              )}
              {f.youtubeId && (
                <Ext href={`https://www.youtube.com/watch?v=${f.youtubeId}`} className="btn btn-ghost">
                  <Youtube size={16} aria-hidden="true" /> Sur YouTube
                </Ext>
              )}
              {f.listenUrl && <Ext href={f.listenUrl} className="btn btn-dye">Écouter</Ext>}
            </div>
          </div>

          <div>
            {f.youtubeId ? (
              playing ? (
                <VideoPlayer id={f.youtubeId} title={`${f.artist}, ${f.title}`} />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  className="group relative block aspect-video w-full overflow-hidden rounded-lg bg-night"
                  aria-label={`Lire ${f.title}`}
                >
                  <img src={`https://i.ytimg.com/vi/${f.youtubeId}/hqdefault.jpg`} alt="" className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100" />
                  <span className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-saffron text-night">
                    <Play size={28} className="ml-1" aria-hidden="true" />
                  </span>
                </button>
              )
            ) : (
              <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-night text-white">
                <div className="text-center">
                  <Disc3 size={56} className="mx-auto text-saffron" aria-hidden="true" />
                  <p className="mt-3 font-display text-4xl font-bold">{f.title}</p>
                  <p className="text-white/70">Disponible sur les plateformes</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sélecteur des mises en avant */}
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Sorties récentes">
          {featured.map((r, i) => (
            <button
              key={`${r.title}-${i}`}
              type="button"
              role="tab"
              aria-selected={i === current}
              onClick={() => select(i)}
              className={`shrink-0 rounded-lg border px-4 py-2.5 text-left transition-colors ${
                i === current ? 'border-dye bg-dye text-white' : 'border-line bg-white hover:border-dye'
              }`}
            >
              <span className={`block text-xs ${i === current ? 'text-white/75' : 'text-mute'}`}>{monthLabel(r.date)}</span>
              <span className="block max-w-[14rem] truncate font-semibold">{r.title}</span>
            </button>
          ))}
        </div>

        {/* Discographie */}
        <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <h3 className="font-display text-4xl font-bold text-night">Albums</h3>
            <ul className="mt-6 space-y-4">
              {albums.map((a) => (
                <li key={a.title} className="rounded-lg bg-night p-6 text-white">
                  <p className="font-display text-5xl font-extrabold">{a.title}</p>
                  <p className="text-saffron">Album, {a.year}</p>
                  {a.note && <p className="mt-1 text-sm text-white/70">{a.note}</p>}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Ext href={a.spotify} className="btn btn-saffron">Spotify</Ext>
                    <Ext href={a.apple} className="btn btn-ghost-light">Apple Music</Ext>
                  </div>
                </li>
              ))}
            </ul>

            <h3 className="mt-12 font-display text-3xl font-bold text-night">Apparaît aussi sur</h3>
            <ul className="mt-4 space-y-3">
              {appearsOn.map((s) => (
                <li key={s.title}>
                  <p className="font-semibold">{s.title}</p>
                  <p className="text-sm text-mute">{s.artist}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-4xl font-bold text-night">Singles et clips</h3>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {singles.map((s) => (
                <li key={s.title} className="grid grid-cols-[3.5rem_1fr_auto] items-center gap-4 py-4">
                  <span className="font-display text-2xl font-bold text-dye">{s.year}</span>
                  <span>
                    <span className="block font-semibold">{s.title}</span>
                    <span className="block text-sm text-mute">{[s.with, s.kind].filter(Boolean).join(', ')}</span>
                  </span>
                  {s.youtube ? (
                    <Ext href={s.youtube} className="rounded-full p-2 text-mute hover:bg-dye/10 hover:text-dye" aria-label={`Regarder ${s.title} sur YouTube`}>
                      <Youtube size={20} />
                    </Ext>
                  ) : s.url ? (
                    <Ext href={s.url} className="rounded-full p-2 text-mute hover:bg-dye/10 hover:text-dye" aria-label={`Écouter ${s.title}`}>
                      <Play size={20} />
                    </Ext>
                  ) : <span />}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

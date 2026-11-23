import { useMemo, useState } from 'react'
import { Play, Youtube } from 'lucide-react'
import Modal, { VideoPlayer } from '@/components/Modal.jsx'
import Ext from '@/components/Ext.jsx'
import { clips, lives } from '@/data/videos.js'
import { links } from '@/data/links.js'
import { youtubeId, youtubeThumb } from '@/lib/youtube.js'

const sortKey = (v) => v.date || `${v.year}-00-00`
const byRecent = (a, b) => sortKey(b).localeCompare(sortKey(a))

function VideoCard({ v, onPlay, large }) {
  const id = youtubeId(v.url)
  return (
    <li>
      <button type="button" onClick={() => onPlay({ id, title: v.title, url: v.url })} className="group block w-full text-left">
        <span className="relative block aspect-video overflow-hidden rounded-lg bg-night">
          {id && (
            <img
              src={youtubeThumb(id)}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
          )}
          <span className="absolute left-3 top-3 rounded-full bg-night/80 px-2.5 py-0.5 text-xs font-semibold text-white">{v.year}</span>
          <span className={`absolute bottom-3 right-3 flex items-center justify-center rounded-full bg-saffron text-night ${large ? 'h-12 w-12' : 'h-10 w-10'}`}>
            <Play size={large ? 22 : 18} className="ml-0.5" aria-hidden="true" />
          </span>
        </span>
        <span className="mt-3 block font-semibold leading-snug group-hover:text-dye">{v.title}</span>
        <span className="block text-sm text-mute">{v.note || v.location}</span>
      </button>
    </li>
  )
}

export default function Videos() {
  const [tab, setTab] = useState('clips')
  const [year, setYear] = useState('tout')
  const [playing, setPlaying] = useState(null)

  const clipItems = useMemo(() => [...clips].sort(byRecent), [])
  const liveItems = useMemo(() => [...lives].sort(byRecent), [])
  const years = useMemo(() => [...new Set(liveItems.map((v) => v.year))], [liveItems])
  const shownLives = year === 'tout' ? liveItems : liveItems.filter((v) => v.year === year)

  return (
    <section id="videos" className="bg-white py-20 sm:py-28">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="section-title text-night">Vidéos</h2>
          <div className="flex gap-2" role="tablist" aria-label="Type de vidéos">
            {[
              ['clips', `Clips (${clips.length})`],
              ['lives', `Concerts (${lives.length})`],
            ].map(([k, label]) => (
              <button
                key={k}
                type="button"
                role="tab"
                aria-selected={tab === k}
                onClick={() => setTab(k)}
                className={`chip ${tab === k ? 'border-dye bg-dye text-white' : 'border-line hover:border-dye'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {tab === 'clips' && (
          <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {clipItems.map((v, i) => <VideoCard key={v.url} v={v} onPlay={setPlaying} large={i === 0} />)}
          </ul>
        )}

        {tab === 'lives' && (
          <>
            <div className="mt-8 flex flex-wrap gap-2" aria-label="Filtrer par année">
              {['tout', ...years].map((y) => (
                <button
                  key={y}
                  type="button"
                  aria-pressed={year === y}
                  onClick={() => setYear(y)}
                  className={`chip ${year === y ? 'border-night bg-night text-white' : 'border-line hover:border-night'}`}
                >
                  {y === 'tout' ? 'Toutes les années' : y}
                </button>
              ))}
            </div>
            <ul className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {shownLives.map((v) => <VideoCard key={v.url} v={v} onPlay={setPlaying} />)}
            </ul>
          </>
        )}

        <div className="mt-14 flex flex-wrap gap-3">
          <Ext href={links.youtubeOfficial} className="btn btn-dye"><Youtube size={18} aria-hidden="true" /> Chaîne officielle</Ext>
          <Ext href={links.youtubeEssakane} className="btn btn-ghost">Essakane Production sur YouTube</Ext>
        </div>
      </div>

      {playing && (
        <Modal label={playing.title} onClose={() => setPlaying(null)}>
          {playing.id ? (
            <VideoPlayer id={playing.id} title={playing.title} />
          ) : (
            <Ext href={playing.url} className="btn btn-saffron">Ouvrir la vidéo</Ext>
          )}
          <p className="mt-3 text-white">{playing.title}</p>
        </Modal>
      )}
    </section>
  )
}

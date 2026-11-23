// « AAAA-MM-JJ » lu en heure locale (new Date('AAAA-MM-JJ') lirait en UTC).
export const parseDate = (iso) => {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, (m || 1) - 1, d || 1)
}

export const today = () => new Date(new Date().toDateString())

export const formatDay = (iso, withYear = true) =>
  parseDate(iso).toLocaleDateString('fr-FR', withYear
    ? { day: 'numeric', month: 'long', year: 'numeric' }
    : { day: 'numeric', month: 'long' })

export const formatShort = (iso) => {
  const d = parseDate(iso)
  return {
    day: d.getDate(),
    month: d.toLocaleDateString('fr-FR', { month: 'short' }).replace('.', ''),
  }
}

export const formatRange = (e, withYear = true) => {
  if (!e.endDate) return formatDay(e.date, withYear)
  const s = parseDate(e.date)
  const t = parseDate(e.endDate)
  if (s.getMonth() === t.getMonth()) return `${s.getDate()}–${formatDay(e.endDate, withYear)}`
  return `${formatDay(e.date, false)} – ${formatDay(e.endDate, withYear)}`
}

export const monthLabel = (yyyymm) => formatDay(`${yyyymm}-01`).replace(/^1er |^1 /, '')

export const isOver = (e, ref = today()) => parseDate(e.endDate || e.date) < ref
export const isOngoing = (e, ref = today()) =>
  parseDate(e.date) <= ref && parseDate(e.endDate || e.date) >= ref

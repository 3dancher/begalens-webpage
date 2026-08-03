import { useEffect, useRef, useState } from 'react'
import useInView from '../hooks/useInView'
import { Eyebrow, Lead, Reveal, SectionTitle } from './ui'

const KBO = '0407742369'

// One real company file, in the language an analyst would read the summary
// in. Shapes match what the application streams back per document: date,
// primary subject, title, tldr summary. Five rows, not the file's full seven,
// so the section makes its point without turning into a long scroll.
const publications = [
  {
    date: '12/03/2024',
    subject: 'capital & shares',
    title: 'Capital increase',
    tldr: 'Capital increase of €50,000 through a contribution in kind of software licences.',
  },
  {
    date: '04/11/2023',
    subject: 'directors & mandates',
    title: 'Director appointment',
    tldr: 'Lieve Mostrey appointed as independent director for a six-year term.',
  },
  {
    date: '21/06/2023',
    subject: 'articles of association',
    title: 'Amendment to the articles',
    tldr: 'Articles of association updated to the Belgian Code of Companies and Associations.',
  },
  {
    date: '08/09/2022',
    subject: 'identity & registered office',
    title: 'Registered office relocation',
    tldr: 'Registered office moved to the Brussels-Capital Region.',
  },
  {
    date: '17/02/2021',
    subject: 'restructuring',
    title: 'Merger by acquisition',
    tldr: 'Acquisition of a subsidiary by merger, with transfer of all assets and liabilities.',
  },
]

const PHASES = ['idle', 'typing', 'submit', 'run']
const rank = (p) => PHASES.indexOf(p)

// Each row resolves from downloading to read when it reaches the reading line,
// so the run advances at the speed the reader scrolls rather than on a timer.
function useStreamOnScroll(rowCount, armed, run) {
  const rowsRef = useRef([])
  const [read, setRead] = useState(() => new Set())

  useEffect(() => {
    setRead(new Set())
  }, [run])

  useEffect(() => {
    if (!armed) return
    const rows = rowsRef.current.slice(0, rowCount).filter(Boolean)
    if (rows.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        const landed = []
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          landed.push(Number(entry.target.dataset.index))
          io.unobserve(entry.target)
        }
        if (landed.length === 0) return
        setRead((prev) => {
          const next = new Set(prev)
          for (const i of landed) next.add(i)
          return next
        })
      },
      { threshold: 0.5, rootMargin: '0px 0px -16% 0px' },
    )
    rows.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [rowCount, armed, run])

  return [rowsRef, read]
}

function CalendarIcon({ className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M8 7V3m8 4V3M7 11h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z" />
    </svg>
  )
}

// The document tile from the application's publication card.
function DocTile() {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-ink to-[#2f4458] text-white shadow-sm transition-all duration-300 group-hover:from-ing group-hover:to-ing-deep">
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M19.5 14.25V6a2.25 2.25 0 0 0-2.25-2.25H9A2.25 2.25 0 0 0 6.75 6v12A2.25 2.25 0 0 0 9 20.25h5.25" />
        <path d="m16.5 21 4.5-4.5m0 0L16.5 12m4.5 4.5H12" />
      </svg>
    </div>
  )
}

function PublicationCard({ pub }) {
  return (
    <article className="app-fade-up group min-h-32 cursor-pointer rounded-2xl border border-line bg-white/85 p-4 transition-shadow hover:shadow-[0_10px_30px_-14px_rgba(15,23,42,0.28)] sm:p-5">
      <div className="flex items-start gap-4">
        <DocTile />
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas px-2.5 py-1 text-xs font-bold text-ink-soft">
              <CalendarIcon className="h-3.5 w-3.5 text-ink-mute" />
              {pub.date}
            </span>
            <span className="app-badge rounded-full px-2.5 py-1 text-xs font-bold lowercase">
              {pub.subject}
            </span>
            <span className="ml-auto hidden items-center rounded-full border border-line bg-canvas px-2.5 py-1 text-xs text-ink-mute transition-colors group-hover:border-ing/25 group-hover:bg-ing-tint group-hover:text-ing-deep sm:inline-flex">
              View PDF →
            </span>
          </div>
          <h4 className="truncate text-base font-bold text-ink">{pub.title}</h4>
          <p className="mt-1 line-clamp-2 text-sm leading-6 text-ink-soft">{pub.tldr}</p>
        </div>
      </div>
    </article>
  )
}

// The document is still being pulled down and read. Holds the card's footprint
// so the rows below never shuffle as results land.
function DownloadingRow({ pub }) {
  return (
    <div className="min-h-32 rounded-2xl border border-line bg-white/60 p-4 sm:p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-line bg-white">
          <span className="app-loader h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas px-2.5 py-1 text-xs font-bold text-ink-mute">
              <CalendarIcon className="h-3.5 w-3.5" />
              {pub.date}
            </span>
            <span className="h-6 w-28 rounded-full bg-shade" />
          </div>
          <span className="mt-1 block text-sm font-bold text-ink-mute">Downloading PDF…</span>
          <span className="mt-2.5 block h-3 w-full max-w-md rounded-full bg-shade/70" />
        </div>
      </div>
    </div>
  )
}

function StepLabel({ n, title, className = '' }) {
  return (
    <div className={`flex items-baseline gap-3 ${className}`}>
      <span className="font-mono text-[11px] font-bold tracking-[0.14em] text-ing">{n}</span>
      <span className="text-sm font-bold text-ink">{title}</span>
    </div>
  )
}

function Stage() {
  const [stageRef, inView] = useInView({ threshold: 0.25 })
  const [phase, setPhase] = useState('idle')
  const [typed, setTyped] = useState('')
  const [run, setRun] = useState(0)

  const reached = (p) => rank(phase) >= rank(p)
  const [rowsRef, read] = useStreamOnScroll(publications.length, reached('run'), run)

  useEffect(() => {
    if (!inView) return

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      setTyped(KBO)
      setPhase('run')
      return
    }

    const timers = []
    const at = (ms, fn) => timers.push(setTimeout(fn, ms))

    setTyped('')
    setPhase('typing')

    KBO.split('').forEach((_, i) => at(200 + i * 62, () => setTyped(KBO.slice(0, i + 1))))
    const typedAt = 200 + KBO.length * 62

    at(typedAt + 260, () => setPhase('submit'))
    at(typedAt + 700, () => setPhase('run'))

    return () => timers.forEach(clearTimeout)
  }, [inView, run])

  const total = publications.length
  const streaming = reached('submit') && read.size < total

  return (
    <div ref={stageRef} className="relative">
      {/* 01 the application's search element, held to the left */}
      <div className="lg:w-[52%]">
        <Reveal variant="rise">
          <div className="flex items-baseline justify-between gap-4">
            <StepLabel n="01" title="Enter the company number" />
            <button
              type="button"
              onClick={() => setRun((r) => r + 1)}
              className="rounded-md px-2 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink-mute transition-colors hover:bg-white hover:text-ink"
            >
              Replay
            </button>
          </div>

          <div className="app-card mt-3 rounded-[20px] p-5">
            <span className="mb-2 block text-sm font-bold text-ink">Company number (KBO)</span>
            <div
              className="app-input flex items-center gap-3 rounded-2xl border border-line bg-white/85 px-4 py-3"
              data-active={reached('typing') && !reached('submit')}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 shrink-0 text-ink-mute"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M3.75 5.25h16.5m-16.5 6h16.5m-16.5 6h10.5" />
              </svg>
              <span className="text-base text-ink sm:text-lg">
                {typed || <span className="text-ink-mute">Enter KBO (e.g., 0420968320)</span>}
                {reached('typing') && !reached('submit') ? (
                  <span className="caret text-ing">|</span>
                ) : null}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <span
                className={`app-btn inline-flex items-center justify-center rounded-2xl px-8 py-3.5 font-bold text-white ${
                  phase === 'submit' ? 'is-pressed' : ''
                }`}
                data-busy={streaming}
              >
                {streaming ? 'Connecting…' : 'Analyze'}
              </span>

              {/* The application's run status. It clears when the run is done,
                  rather than posting a completion time. */}
              <span
                className={`animate-pulse text-sm font-bold text-ing-deep transition-opacity duration-500 ${
                  streaming ? 'opacity-100' : 'opacity-0'
                }`}
              >
                Downloading publications… {read.size} of {total}
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* The diagonal that hands off from the search element to the results */}
      <Reveal variant="fade" className="relative hidden h-24 lg:block">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full text-ing/45"
          aria-hidden
        >
          <line
            x1="52"
            y1="0"
            x2="33"
            y2="100"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            className="diag-draw"
          />
        </svg>
      </Reveal>

      {/* 02 the application's publication history, offset down and across. The
          note sits in the left column and sticks, so it stays with the reader
          for the whole length of the list. */}
      {/* Default stretch alignment, so the aside column is as tall as the list
          and its sticky note actually has room to travel. */}
      <div className="mt-10 lg:mt-0 lg:flex lg:gap-10">
        <Reveal variant="fade" className="hidden lg:block lg:w-[32%] lg:shrink-0">
          <div className="sticky top-32">
            <StepLabel n="02" title="Publications arrive as you read down the file" />
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Five documents, five readers. The run takes as long as the slowest publication, not
              the sum of all of them, so the file fills in while you are still reading the top of
              it.
            </p>
          </div>
        </Reveal>

        <Reveal variant="rise" className="lg:min-w-0 lg:flex-1">
          <StepLabel
            n="02"
            title="Publications arrive as you read down the file"
            className="lg:hidden"
          />

          <div className="app-card mt-3 rounded-[20px] p-4 sm:p-5 lg:mt-0">
            <div className="mb-4 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
              <div>
                <span className="mb-2 inline-flex rounded-full bg-shade px-3 py-1 text-xs font-bold text-ink-soft">
                  Traceability
                </span>
                <h3 className="text-xl font-bold text-ink">Publication History</h3>
              </div>
              <span
                className={`shrink-0 rounded-xl border border-line bg-white px-3 py-1.5 text-xs font-bold text-ink-soft shadow-sm transition-opacity duration-300 ${
                  read.size > 0 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {read.size} document{read.size === 1 ? '' : 's'}
              </span>
            </div>

            <ul className="space-y-3">
              {publications.map((pub, i) => (
                <li
                  key={pub.date}
                  ref={(el) => (rowsRef.current[i] = el)}
                  data-index={i}
                >
                  {read.has(i) ? (
                    <PublicationCard pub={pub} />
                  ) : (
                    <DownloadingRow pub={pub} />
                  )}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-ink-mute lg:hidden">
            Five documents, five readers. The run takes as long as the slowest publication, not
            the sum of all of them.
          </p>
        </Reveal>
      </div>
    </div>
  )
}

export default function Flow() {
  // No overflow-hidden on the section: it would create a scroll box and kill
  // the sticky note in the results column.
  return (
    <section id="flow" className="app-canvas relative border-y border-line py-24 sm:py-32">
      <div aria-hidden className="app-grid pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <Reveal variant="fade">
            <Eyebrow>One input</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <SectionTitle className="mt-5">
              One number.
              <br />
              Every publication.
            </SectionTitle>
          </Reveal>
          <Reveal delay={140}>
            <Lead className="mt-6">
              The official portal makes you search, open a filing, read it, go back, and start
              over. BeGaLens takes the company number once. Every publication filed under it is
              pulled in and read at the same time, and each summary arrives with the business
              topic already attached.
            </Lead>
          </Reveal>
        </div>

        <div className="mt-14 sm:mt-16">
          <Stage />
        </div>
      </div>
    </section>
  )
}

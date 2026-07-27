import { useEffect, useRef } from 'react'

const categories = [
  { title: 'Bestuur & Mandaten', desc: 'Appointments, resignations and mandates of directors and daily-management officers.' },
  { title: 'Kapitaal & Aandelen', desc: 'Capital increases and decreases, share issuances, transfers and shareholder changes.' },
  { title: 'Herstructurering', desc: 'Mergers, demergers, contributions and other restructuring operations.' },
  { title: 'Oprichting', desc: 'Incorporations and the founding details of newly registered entities.' },
  { title: 'Einde & Verheffing', desc: 'Dissolutions, closures and the winding-up of companies.' },
  { title: 'Identiteit & Maantschappelijke Zetel', desc: 'Company name, legal form and registered-office relocations.' },
  { title: 'Maatschappelijk doel', desc: 'Changes to the corporate purpose and scope of activities.' },
  { title: 'Statuten & Signing powers', desc: 'Amendments to the articles of association and who can legally sign.' },
]

// Scroll distance (vh) dedicated to each card. Card 0's slot is a hold (no slide-in
// needed, it's the first thing shown); cards 1..N-1 each slide up over that budget.
const CARD_VH = 100

function ScreenshotPlaceholder() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className="h-10 w-10 text-slate-300">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.6-3.6a2 2 0 0 0-2.8 0L6 20" />
      </svg>
    </div>
  )
}

export default function BusinessCards() {
  const stageRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    let raf = 0

    const slides = categories.length - 1 // card 0 never slides, so only N-1 transitions exist

    const update = () => {
      const vh = window.innerHeight
      const total = stage.offsetHeight - vh
      const raw = total > 0 ? -stage.getBoundingClientRect().top / total : 0
      const progress = Math.min(Math.max(raw, 0), 1) * slides

      cardsRef.current.forEach((el, i) => {
        if (!el) return
        if (i === 0) return // always in place, base layer
        const local = Math.min(Math.max(progress - (i - 1), 0), 1)
        el.style.transform = `translate3d(0, ${Math.round((1 - local) * vh)}px, 0)`
      })
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id="categories" className="relative bg-slate-50">
      {/* Pinned stage: heading + cards lock in place together; scroll only drives which card is on top */}
      <div ref={stageRef} className="relative" style={{ height: `${CARD_VH * (categories.length - 1)}vh` }}>
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden px-4 pt-24 sm:px-6 sm:pt-28">
          <div className="reveal mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium text-orange-600">Structured extraction</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Every filing, decoded by category
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              BeGaLens classifies each business topic into the categories that matter to analysts.
            </p>
          </div>

          <div className="relative mt-10 flex-1">
            {categories.map((c, i) => (
              <article
                key={c.title}
                ref={(el) => (cardsRef.current[i] = el)}
                className="absolute inset-x-0 top-0 mx-auto flex h-[39vh] max-h-[300px] w-full max-w-5xl flex-col overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-md shadow-slate-900/5 will-change-transform sm:flex-row"
              >
                <div className="flex flex-col justify-center gap-4 p-8 sm:w-[42%] sm:shrink-0 sm:p-12">
                  <span className="text-sm font-medium tabular-nums text-slate-400">
                    {String(i + 1).padStart(2, '0')} / {categories.length}
                  </span>
                  <h3 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{c.title}</h3>
                  <p className="text-base leading-relaxed text-slate-500 sm:text-lg">{c.desc}</p>
                </div>
                <div className="flex flex-1 p-4 sm:p-6 sm:pl-0">
                  <ScreenshotPlaceholder />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useRef } from 'react'
import bestuurMandatenImg from '../../category-screenshots/Bestuur-mandaten.png'
import eindeVereffeningImg from '../../category-screenshots/Einde-Vereffening.png'
import herstructureringImg from '../../category-screenshots/Herstructurering.png'
import identiteitMaatschappelijkeZetelImg from '../../category-screenshots/Identiteit-Maatschappelijke-Zetel.png'
import kapitaalAandelenImg from '../../category-screenshots/Kapitaal-aandelen.png'
import maatschappelijkDoelImg from '../../category-screenshots/Maatschappelijk-Doel.png'
import oprichtingImg from '../../category-screenshots/Oprichting.png'
import statutenImg from '../../category-screenshots/Statuten.png'

const categories = [
  {
    title: 'Bestuur & Mandaten',
    desc: 'Appointments, resignations and mandates of directors and daily-management officers.',
    image: bestuurMandatenImg,
  },
  {
    title: 'Kapitaal & Aandelen',
    desc: 'Capital increases and decreases, share issuances, transfers and shareholder changes.',
    image: kapitaalAandelenImg,
  },
  {
    title: 'Herstructurering',
    desc: 'Mergers, demergers, contributions and other restructuring operations.',
    image: herstructureringImg,
  },
  {
    title: 'Oprichting',
    desc: 'Incorporations and the founding details of newly registered entities.',
    image: oprichtingImg,
  },
  {
    title: 'Einde & Verheffing',
    desc: 'Dissolutions, closures and the winding-up of companies.',
    image: eindeVereffeningImg,
  },
  {
    title: 'Identiteit & Maantschappelijke Zetel',
    desc: 'Company name, legal form and registered-office relocations.',
    image: identiteitMaatschappelijkeZetelImg,
  },
  {
    title: 'Maatschappelijk doel',
    desc: 'Changes to the corporate purpose and scope of activities.',
    image: maatschappelijkDoelImg,
  },
  {
    title: 'Statuten & Signing powers',
    desc: 'Amendments to the articles of association and who can legally sign.',
    image: statutenImg,
  },
]

// Scroll distance (vh) dedicated to each card. Card 0's slot is a hold (no slide-in
// needed, it's the first thing shown); cards 1..N-1 each slide up over that budget.
const CARD_VH = 100

function ScreenshotPreview({ src, alt }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-transparent p-[2px]">
      <img src={src} alt={alt} className="max-h-full max-w-full rounded-[13px] object-contain object-center" />
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
                className="absolute inset-x-0 top-0 mx-auto flex h-[50vh] max-h-[430px] w-full max-w-6xl flex-col overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-md shadow-slate-900/5 will-change-transform sm:flex-row"
              >
                <div className="flex flex-col justify-center gap-4 p-8 sm:w-[36%] sm:shrink-0 sm:p-12">
                  <span className="text-sm font-medium tabular-nums text-slate-400">
                    {String(i + 1).padStart(2, '0')} / {categories.length}
                  </span>
                  <h3 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{c.title}</h3>
                  <p className="text-base leading-relaxed text-slate-500 sm:text-lg">{c.desc}</p>
                </div>
                <div className="flex flex-1 overflow-hidden border-t border-slate-100 p-3 sm:border-t-0 sm:border-l sm:p-5">
                  <ScreenshotPreview src={c.image} alt={`${c.title} category preview`} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

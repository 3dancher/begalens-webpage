import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import useInView from '../hooks/useInView'
import { ArticlesBody, CardShell, IdentityBody, MandatesBody } from './appCards'
import { Eyebrow, Lead, Reveal, SectionTitle } from './ui'

// Three passages of one real publication and the card each one produces. The
// source document stays in the language it was filed in (Dutch, here); the
// cards are the summary, so they render in the analyst's chosen language
// (English, same as the rest of the page) rather than mirroring the source.
// The document itself is abstracted: the Volet B masthead and the field block
// are fixed furniture on every filing, the body below them is free format, so
// it is drawn as bars except where a passage is actually being pointed at.
const links = [
  {
    id: 'identity',
    title: 'Identity & Registered Office',
    body: (
      <IdentityBody
        data={{
          fields: [
            { label: 'Name', value: 'ING BELGIË' },
            {
              label: 'Registered Office',
              value: 'Marnixlaan 24, 1000 Brussels',
              note: 'Company no. 0403.200.393',
            },
            { label: 'Legal Form', value: 'Public limited company (SA)' },
          ],
        }}
      />
    ),
  },
  {
    id: 'articles',
    title: 'Articles of Association',
    body: (
      <ArticlesBody
        data={{
          chips: ['CSA compliant', 'Consolidated'],
          rulesLabel: 'Deviating rules:',
          rules: ['The company is represented by two directors acting jointly.'],
        }}
      />
    ),
  },
  {
    id: 'mandates',
    title: 'Directors & Mandates',
    body: (
      <MandatesBody
        data={{
          rows: [
            {
              action: 'IN',
              name: 'Person 1',
              detail: 'Signing authority up to €250,000,000 · joint signature',
            },
            {
              action: 'IN',
              name: 'Person 2',
              detail: 'Signing authority up to €100,000,000 · joint signature',
            },
            {
              action: 'OUT',
              name: 'Previous signing authority list',
              detail: 'Superseded as of publication date',
            },
          ],
        }}
      />
    ),
  },
]

const MS_PER_LINK = 2900

function Bar({ w = 'w-full' }) {
  return <span className={`block h-1.5 rounded-full bg-ink-mute/20 ${w}`} />
}

function Field({ label, value, muted = false }) {
  return (
    <div className="flex gap-2">
      <span className="w-[42%] shrink-0 text-right text-[10px] leading-4 text-ink-mute">
        {label}
      </span>
      <span
        className={`text-[10px] leading-4 ${muted ? 'text-ink-mute' : 'font-bold text-ink'}`}
      >
        {value}
      </span>
    </div>
  )
}

// Wraps whichever slice of the document is currently being pointed at.
function Passage({ innerRef, active, children }) {
  return (
    <div
      ref={innerRef}
      className={`-mx-1.5 rounded-md px-1.5 py-1 transition-colors duration-500 ${
        active ? 'bg-ing-tint ring-1 ring-inset ring-ing/30' : 'ring-1 ring-inset ring-transparent'
      }`}
    >
      {children}
    </div>
  )
}

function PublicationDoc({ active, passageRefs }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white shadow-[0_16px_44px_-26px_rgba(15,23,42,0.45)]">
      <div className="flex gap-2 p-4 sm:p-5">
        {/* The rotated Staatsblad spine, present on every published page */}
        <span
          className="shrink-0 self-stretch text-[8px] leading-none tracking-wide text-ink-mute"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Bijlagen bij het Belgisch Staatsblad
        </span>

        <div className="min-w-0 flex-1">
          <div className="text-right text-[8px] text-ink-mute">Mod PDF 19.01</div>

          {/* Masthead */}
          <div className="mt-1 flex items-start gap-2">
            <span className="rounded bg-shade px-1.5 py-0.5 text-[10px] font-bold text-ink-soft">
              Luik B
            </span>
            <span className="text-[10px] font-bold leading-4 text-ink">
              Afschrift te publiceren in de bijlagen bij het Belgisch Staatsblad
              <br />
              na neerlegging van de akte ter griffie
            </span>
          </div>

          {/* Reserved block, reference number, deposit stamp */}
          <div className="mt-3 flex items-stretch gap-2">
            {/* Dropped on narrow screens, where three fixed boxes cannot fit */}
            <span className="hidden w-16 shrink-0 items-center justify-center rounded border border-line px-1 text-center text-[8px] leading-tight text-ink-mute sm:flex">
              Voorbehouden aan het Belgisch Staatsblad
            </span>
            <span className="flex flex-1 items-center justify-center font-mono text-[11px] font-bold tracking-wider text-ink">
              *26340587*
            </span>
            <span className="flex w-24 shrink-0 flex-col justify-center gap-0.5 rounded border border-line px-2 py-1.5 text-[8px] leading-tight sm:w-28">
              <span className="text-ink">Neergelegd</span>
              <span className="font-bold text-ink">26-06-2026</span>
              <span className="text-right text-ink-mute">Griffie</span>
            </span>
          </div>

          {/* Field block: identical on every filing */}
          <div className="mt-3 space-y-2 rounded border border-dashed border-line p-3">
            <Passage innerRef={(el) => (passageRefs.current[0] = el)} active={active === 0}>
              <div className="space-y-0.5">
                <Field label="Ondernemingsnummer:" value="0403200393" />
                <Field label="Naam (voluit):" value="ING BELGIË" />
                <Field label="Rechtsvorm:" value="Naamloze vennootschap" muted />
                <Field label="Adres van de zetel:" value="Marnixlaan 24, 1000 Brussel" muted />
              </div>
            </Passage>

            <Passage innerRef={(el) => (passageRefs.current[1] = el)} active={active === 1}>
              <Field
                label="Voorwerp van de akte:"
                value="STATUTEN (VERTALING, COÖRDINATIE, ANDERE WIJZIGINGEN)"
              />
            </Passage>

            {/* Free-format body */}
            <div className="space-y-1.5 pt-1">
              <Bar />
              <Bar w="w-[88%]" />
              <Bar w="w-[64%]" />
            </div>

            <Passage innerRef={(el) => (passageRefs.current[2] = el)} active={active === 2}>
              <p className="text-[10px] font-bold leading-4 text-ink">1) Algemene volmacht</p>
              <p className="mt-0.5 text-[10px] leading-4 text-ink-soft">
                De personen vermeld onder Categorie 1 krijgen volmacht om, samen met een andere
                bevoegde persoon, documenten te ondertekenen die de Vennootschap verbinden tot een
                maximumbedrag van € 250.000.000.
              </p>
            </Passage>

            <div className="space-y-1.5 pt-1">
              <Bar w="w-[92%]" />
              <Bar w="w-[76%]" />
              <Bar w="w-[40%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ExtractedCard({ innerRef, link, active }) {
  return (
    <CardShell
      innerRef={innerRef}
      title={link.title}
      titleClassName={`transition-colors duration-500 ${active ? 'text-ing-deep' : 'text-ink-mute'}`}
      className={`transition-all duration-500 ${
        active
          ? 'border-ing/40 shadow-[0_14px_36px_-20px_rgba(255,98,0,0.6)] ring-2 ring-ing/15'
          : 'border-line shadow-sm'
      }`}
    >
      {link.body}
    </CardShell>
  )
}

// Measures where the live passage and its card actually sit, then draws a curve
// between them. Measured rather than hardcoded because both ends move with text
// wrapping and viewport width.
function LinkedView() {
  const [viewRef, inView] = useInView({ threshold: 0.25 })
  const containerRef = useRef(null)
  const passageRefs = useRef([])
  const cardRefs = useRef([])
  const [geo, setGeo] = useState(null)
  const [active, setActive] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      const container = containerRef.current
      if (!container) return
      const base = container.getBoundingClientRect()
      if (base.width === 0) return

      const centre = (el) => {
        if (!el) return null
        const r = el.getBoundingClientRect()
        return { y: r.top - base.top + r.height / 2, right: r.right - base.left, left: r.left - base.left }
      }

      const from = passageRefs.current.map(centre)
      const to = cardRefs.current.map(centre)
      if (from.some((p) => !p) || to.some((p) => !p)) return

      setGeo({ w: base.width, h: base.height, from, to })
    }

    measure()
    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  useEffect(() => {
    if (!inView) return
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const id = setInterval(() => setActive((i) => (i + 1) % links.length), MS_PER_LINK)
    return () => clearInterval(id)
  }, [inView])

  const a = geo?.from[active]
  const b = geo?.to[active]
  // Horizontal control points, so the curve leaves and enters level with its ends
  const bend = a && b ? Math.max(48, (b.left - a.right) * 0.55) : 0

  return (
    <div ref={viewRef}>
      <div ref={containerRef} className="relative grid gap-6 lg:grid-cols-2 lg:gap-20">
        <PublicationDoc active={active} passageRefs={passageRefs} />

        <div className="space-y-4">
          {links.map((link, i) => (
            <ExtractedCard
              key={link.id}
              innerRef={(el) => (cardRefs.current[i] = el)}
              link={link}
              active={i === active}
            />
          ))}
        </div>

        {geo && a && b ? (
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
            viewBox={`0 0 ${geo.w} ${geo.h}`}
            fill="none"
          >
            <g key={active} className="text-ing">
              <path
                pathLength="1"
                d={`M ${a.right} ${a.y} C ${a.right + bend} ${a.y}, ${b.left - bend} ${b.y}, ${b.left} ${b.y}`}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="link-draw"
              />
              <circle cx={a.right} cy={a.y} r="3.5" fill="currentColor" className="link-dot" />
              <circle
                cx={b.left}
                cy={b.y}
                r="3.5"
                fill="currentColor"
                className="link-dot"
                style={{ animationDelay: '600ms' }}
              />
            </g>
          </svg>
        ) : null}
      </div>
    </div>
  )
}

export default function Traceability() {
  return (
    <section id="traceability" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <Reveal variant="fade">
              <Eyebrow>Human in the loop</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <SectionTitle className="mt-5">
                The model reads.
                <br />
                You decide.
              </SectionTitle>
            </Reveal>
            <Reveal delay={140}>
              <Lead className="mt-6">
                Open a publication and it stays open beside its summary. Every extracted event
                points at the passage it came from, so you read both, confirm what holds, and
                correct what does not. Nothing here is a verdict.
              </Lead>
            </Reveal>
          </div>

          <Reveal variant="left" delay={200} className="shrink-0 rounded-2xl bg-canvas p-5 lg:w-72">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink-mute">
              Four-eyed principle
            </span>
            <p className="mt-2 text-[15px] leading-relaxed text-ink">
              The model is the first pair of eyes. It never gets to be the only pair.
            </p>
          </Reveal>
        </div>

        <Reveal variant="fade" delay={80} className="mt-14 sm:mt-16">
          <LinkedView />
        </Reveal>
      </div>
    </section>
  )
}

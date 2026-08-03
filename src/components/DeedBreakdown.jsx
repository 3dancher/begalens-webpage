import { useState } from 'react'
import { ArticlesBody, CapitalBody, CardShell, MandatesBody } from './appCards'
import { Reveal } from './ui'

// One notarial deed, broken into the separate business events it actually
// contains. Card layouts are the application's own (cards.html); only the
// language of the extracted text changes. IN / OUT / RENEWED stay as they are,
// because the product treats them as status tokens rather than prose.

const languages = [
  { code: 'NL', name: 'Nederlands' },
  { code: 'FR', name: 'Français' },
  { code: 'DE', name: 'Deutsch' },
  { code: 'EN', name: 'English' },
]

const content = {
  NL: {
    mandates: {
      title: 'Bestuur & Mandaten',
      rows: [
        { action: 'IN', name: 'Lieve Mostrey', detail: 'Onafhankelijk Bestuurder · 6 jaar' },
        { action: 'OUT', name: 'Michel Tilmant', detail: 'Bestuurder · Beëindiging mandaat' },
        {
          action: 'RENEWED',
          name: 'ACME CONSULTING BV',
          suffix: '(Vertegenwoordiger: John Doe)',
          detail: 'Zaakvoerder · 4 jaar',
        },
      ],
    },
    capital: {
      title: 'Kapitaal & Aandelen',
      heading: 'Kapitaalverhoging',
      changeLabel: 'Wijziging:',
      changeValue: '€ +50.000,00',
      totalLabel: 'Nieuw Totaal Kapitaal:',
      totalValue: '€ 250.000,00',
      shares: 'Totaal aandelen: 10000',
      note: 'Kapitaalverhoging door inbreng in natura van softwarelicenties.',
    },
    articles: {
      title: 'Statuten',
      chips: ['WVV/CSA Compliant', 'Gecoördineerd'],
      rulesLabel: 'Afwijkende regels:',
      rules: [
        'De vennootschap wordt vertegenwoordigd door twee bestuurders die gezamenlijk handelen.',
        'Overdracht van aandelen is onderworpen aan de instemming van minstens 75% van de stemgerechtigde effecten.',
      ],
    },
  },
  FR: {
    mandates: {
      title: 'Administration & Mandats',
      rows: [
        { action: 'IN', name: 'Lieve Mostrey', detail: 'Administrateur indépendant · 6 ans' },
        { action: 'OUT', name: 'Michel Tilmant', detail: 'Administrateur · Fin de mandat' },
        {
          action: 'RENEWED',
          name: 'ACME CONSULTING BV',
          suffix: '(Représentant : John Doe)',
          detail: 'Gérant · 4 ans',
        },
      ],
    },
    capital: {
      title: 'Capital & Actions',
      heading: 'Augmentation de capital',
      changeLabel: 'Modification :',
      changeValue: '€ +50.000,00',
      totalLabel: 'Nouveau capital total :',
      totalValue: '€ 250.000,00',
      shares: 'Total des actions : 10000',
      note: 'Augmentation de capital par apport en nature de licences logicielles.',
    },
    articles: {
      title: 'Statuts',
      chips: ['Conforme au CSA', 'Coordonnés'],
      rulesLabel: 'Règles dérogatoires :',
      rules: [
        'La société est représentée par deux administrateurs agissant conjointement.',
        "La cession d'actions est soumise à l'accord d'au moins 75 % des titres avec droit de vote.",
      ],
    },
  },
  DE: {
    mandates: {
      title: 'Verwaltung & Mandate',
      rows: [
        { action: 'IN', name: 'Lieve Mostrey', detail: 'Unabhängiger Verwalter · 6 Jahre' },
        { action: 'OUT', name: 'Michel Tilmant', detail: 'Verwalter · Beendigung des Mandats' },
        {
          action: 'RENEWED',
          name: 'ACME CONSULTING BV',
          suffix: '(Vertreter: John Doe)',
          detail: 'Geschäftsführer · 4 Jahre',
        },
      ],
    },
    capital: {
      title: 'Kapital & Anteile',
      heading: 'Kapitalerhöhung',
      changeLabel: 'Änderung:',
      changeValue: '€ +50.000,00',
      totalLabel: 'Neues Gesamtkapital:',
      totalValue: '€ 250.000,00',
      shares: 'Anteile insgesamt: 10000',
      note: 'Kapitalerhöhung durch Sacheinlage von Softwarelizenzen.',
    },
    articles: {
      title: 'Satzung',
      chips: ['GGV-konform', 'Koordiniert'],
      rulesLabel: 'Abweichende Regeln:',
      rules: [
        'Die Gesellschaft wird durch zwei gemeinsam handelnde Verwalter vertreten.',
        'Die Übertragung von Anteilen bedarf der Zustimmung von mindestens 75 % der stimmberechtigten Wertpapiere.',
      ],
    },
  },
  EN: {
    mandates: {
      title: 'Directors & Mandates',
      rows: [
        { action: 'IN', name: 'Lieve Mostrey', detail: 'Independent Director · 6 years' },
        { action: 'OUT', name: 'Michel Tilmant', detail: 'Director · End of mandate' },
        {
          action: 'RENEWED',
          name: 'ACME CONSULTING BV',
          suffix: '(Representative: John Doe)',
          detail: 'Managing Director · 4 years',
        },
      ],
    },
    capital: {
      title: 'Capital & Shares',
      heading: 'Capital increase',
      changeLabel: 'Change:',
      changeValue: '€ +50,000.00',
      totalLabel: 'New Total Capital:',
      totalValue: '€ 250,000.00',
      shares: 'Total shares: 10000',
      note: 'Capital increase through a contribution in kind of software licences.',
    },
    articles: {
      title: 'Articles of Association',
      chips: ['CSA Compliant', 'Consolidated'],
      rulesLabel: 'Deviating rules:',
      rules: [
        'The company is represented by two directors acting jointly.',
        'Share transfers require the approval of at least 75% of the voting securities.',
      ],
    },
  },
}

// The cards overlap horizontally, so each connector runs between points that
// sit inside both cards' spans rather than between their corners.
function Connector({ from, to }) {
  return (
    <Reveal variant="fade" className="relative hidden h-12 lg:block">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full text-ing/45"
        aria-hidden
      >
        <line
          x1={from}
          y1="0"
          x2={to}
          y2="100"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className="diag-draw"
        />
      </svg>
    </Reveal>
  )
}

// `children` is the section copy. It shares this component's grid so the cards
// sit beside the argument they are making rather than in a block below it.
export default function DeedBreakdown({ children }) {
  // The page is primarily English, so the demo opens in English; NL/FR/DE
  // remain one click away to make the point that the source can be any of them.
  const [code, setCode] = useState('EN')
  const active = content[code]

  const cards = [
    { key: 'mandates', offset: '', body: <MandatesBody data={active.mandates} />, title: active.mandates.title },
    { key: 'capital', offset: 'lg:ml-[8%]', body: <CapitalBody data={active.capital} />, title: active.capital.title },
    { key: 'articles', offset: 'lg:ml-[16%]', body: <ArticlesBody data={active.articles} />, title: active.articles.title },
  ]

  return (
    <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-12">
      {/* Copy and the language control that drives the cards */}
      <div className="lg:col-span-5">
        {children}

        <Reveal variant="fade" delay={240} className="mt-9 border-t border-line pt-6">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink-mute">
            One deed · 12/03/2024 · 3 events extracted
          </span>
          {/* The source title stays in the language it was filed in */}
          <h3 className="mt-1.5 text-lg font-bold text-ink">Buitengewone algemene vergadering</h3>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-xs text-ink-mute">Summary language</span>
            <div className="flex gap-1" role="group" aria-label="Summary language">
              {languages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setCode(l.code)}
                  aria-pressed={l.code === code}
                  title={l.name}
                  className={`rounded-lg px-2.5 py-1 font-mono text-xs font-bold tracking-wider transition-colors ${
                    l.code === code
                      ? 'bg-ing text-white'
                      : 'bg-white text-ink-mute ring-1 ring-inset ring-line hover:text-ink'
                  }`}
                >
                  {l.code}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-ink-mute">
            <svg
              viewBox="0 0 24 24"
              className="mt-0.5 h-3.5 w-3.5 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M14 3v5h5" />
              <path d="M19 8v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7Z" />
            </svg>
            Only the summary changes language. The published deed keeps the wording and the
            language it was filed in.
          </p>
        </Reveal>
      </div>

      {/* Cascade */}
      <div className="space-y-5 lg:col-span-7 lg:space-y-0">
        {cards.map((card, i) => (
          <div key={card.key}>
            {i > 0 ? <Connector from={i === 1 ? 34 : 42} to={i === 1 ? 50 : 58} /> : null}
            <Reveal variant="rise" delay={i * 90} className={`lg:w-[84%] ${card.offset}`}>
              <div key={code} className="swap-in" style={{ animationDelay: `${i * 70}ms` }}>
                <CardShell title={card.title} className="border-line shadow-[0_10px_30px_-18px_rgba(15,23,42,0.35)]">
                  {card.body}
                </CardShell>
              </div>
            </Reveal>
          </div>
        ))}
      </div>
    </div>
  )
}

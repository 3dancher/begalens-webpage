const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }

function TimelineVisual() {
  const events = [
    ['2024', 'Kapitaalverhoging'],
    ['2023', 'Benoeming bestuurder'],
    ['2021', 'Statutenwijziging'],
    ['2018', 'Oprichting'],
  ]
  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
      <div className="relative space-y-4 pl-5">
        <span className="absolute left-[3px] top-1 bottom-1 w-px bg-slate-200" />
        {events.map(([year, label]) => (
          <div key={year} className="relative flex items-center gap-3 text-sm">
            <span className="absolute -left-5 h-1.5 w-1.5 rounded-full bg-orange-500" />
            <span className="w-10 shrink-0 tabular-nums text-slate-600">{year}</span>
            <span className="text-slate-700">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Card({ className = '', delay = 0, children }) {
  return (
    <div
      className={`reveal rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function HowItWorks() {
  return (
    <section id="how" className="bg-slate-50 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal max-w-2xl">
          <p className="text-sm font-medium text-orange-600">How it works</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            From portal maze to clear picture
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            The Belgian Gazette holds the answers, buried across scattered filings in three languages. BeGaLens
            turns that maze into a searchable, business-level picture you and the model read together.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* A — overview / how it works */}
          <Card className="sm:col-span-2 lg:col-span-2" delay={0}>
            <div className="flex items-center gap-2 text-orange-600">
              <svg viewBox="0 0 24 24" {...S} className="h-5 w-5"><path d="M3 12h4l3 8 4-16 3 8h4" /></svg>
              <span className="text-xs font-semibold uppercase tracking-wider">One timeline, not a maze</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              Every publication for a company, in one view
            </h3>
            <p className="mt-3 max-w-xl leading-relaxed text-slate-600">
              The official portal makes you click through filing after filing. BeGaLens pulls every publication
              into a single chronological overview.
            </p>
            <TimelineVisual />
          </Card>

          {/* B — accuracy */}
          <Card delay={80}>
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">Model accuracy</p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-5xl font-semibold tracking-tight text-slate-900">87.30</span>
              <span className="text-2xl font-semibold text-slate-500">%</span>
            </div>
            <p className="mt-1 text-sm text-slate-500">LegalBench · Gemini 3.1 Pro</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              LegalBench scores legal reasoning across 160+ expert-built tasks. At 87.30%, the model reads and
              interprets filings at the level of a trained legal professional.
            </p>
          </Card>

          {/* C — four-eyed principle */}
          <Card delay={160}>
            <div className="flex items-center gap-2 text-orange-600">
              <svg viewBox="0 0 24 24" {...S} className="h-5 w-5"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="2.5" /></svg>
              <span className="text-xs font-semibold uppercase tracking-wider">Four-eyed principle</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-900">Four eyes, always</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              The model reads, summarizes and flags, you review and decide. Every conclusion is a collaboration
              between the analyst and AI, never the model on its own.
            </p>
          </Card>

          {/* D — multilingual */}
          <Card delay={240}>
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">Multilingual</p>
            <div className="mt-4 flex gap-2">
              {['NL', 'FR', 'DE'].map((l) => (
                <span key={l} className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700 ring-1 ring-inset ring-slate-200">
                  {l}
                </span>
              ))}
            </div>
            <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-900">Dutch, French &amp; German</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Belgian filings arrive in all three languages. BeGaLens reads each natively and hands you one
              consistent insight, no translation guesswork.
            </p>
          </Card>

          {/* E — impact metrics */}
          <Card delay={320}>
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">Impact</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <div className="text-4xl font-semibold tracking-tight text-slate-900">4×</div>
                <div className="mt-1 text-sm text-slate-500">faster investigations</div>
              </div>
              <div>
                <div className="text-4xl font-semibold tracking-tight text-slate-900">+300%</div>
                <div className="mt-1 text-sm text-slate-500">throughput</div>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate-600">
              Lower operational costs and fewer errors from navigating dense legal documents by hand.
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}

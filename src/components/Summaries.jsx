import DeedBreakdown from './DeedBreakdown'
import { Eyebrow, Lead, Reveal, SectionTitle } from './ui'

export default function Summaries() {
  return (
    <section id="summaries" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <DeedBreakdown>
          <Reveal variant="fade">
            <Eyebrow>Summaries</Eyebrow>
          </Reveal>

          <Reveal delay={80}>
            <SectionTitle className="mt-5">
              Legal language in.
              <br />
              Business events out.
            </SectionTitle>
          </Reveal>

          <Reveal delay={140}>
            <Lead className="mt-6">
              One publication rarely says one thing. A single deed can raise capital, appoint a
              director and rewrite the articles, all in the same notarial prose. BeGaLens pulls
              those threads apart and writes each one as its own short, concrete event.
            </Lead>
          </Reveal>

          <Reveal delay={200}>
            <Lead className="mt-5">
              Those deeds arrive in Dutch, French and sometimes German. Pick the language you work
              in, and start investigating.
            </Lead>
          </Reveal>
        </DeedBreakdown>
      </div>
    </section>
  )
}

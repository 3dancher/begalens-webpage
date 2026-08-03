import { Reveal, ScreenshotFrame } from './ui'
import heroScreenshot from '../../temp_screenshot_hero.png'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      {/* Backdrop: graph paper fading out downwards, with a warm wash behind the frame */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-paper fade-bottom absolute inset-0" />
        <div className="absolute -right-40 -top-40 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(255,98,0,0.10),transparent_62%)]" />
        <div className="absolute -left-56 top-24 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(20,38,58,0.05),transparent_65%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Copy */}
          <div className="lg:col-span-6">
            <Reveal
              as="h1"
              delay={0}
              className="text-[2.6rem] leading-[1.04] text-ink sm:text-5xl lg:text-[3.35rem]"
            >
              Investigating publications,
              <br />
              at a{' '}
              <span className="relative inline-block whitespace-nowrap">
                larger scale
                <span
                  aria-hidden
                  className="rule-draw absolute -bottom-1 left-0 h-[5px] w-full rounded-full bg-ing/85"
                  style={{ '--rv-delay': '680ms' }}
                />
              </span>
            </Reveal>

            <Reveal
              as="p"
              delay={210}
              className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft"
            >
              BeGaLens pulls every Belgian Official Gazette publication filed under a company
              number, analyses them all at once, and hands back the business events that changed
              the company. No more opening filings one at a time to find out what happened.
            </Reveal>

            <Reveal delay={300} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#access"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-ing px-6 py-3.5 text-[15px] font-bold text-white shadow-[0_10px_28px_-12px_rgba(255,98,0,0.85)] transition-colors hover:bg-ing-deep"
              >
                Request access
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h13m-5-6 6 6-6 6" />
                </svg>
              </a>
              <a
                href="#flow"
                className="inline-flex items-center justify-center rounded-full border border-line bg-white px-6 py-3.5 text-[15px] font-bold text-ink transition-colors hover:border-ink-mute/50 hover:bg-canvas"
              >
                See how it works
              </a>
            </Reveal>

            <Reveal as="p" variant="fade" delay={380} className="mt-6 text-sm text-ink-mute">
              Built inside ING, for the analysts who read these filings for a living.
            </Reveal>
          </div>

          {/* Application screenshot, bleeding past the right edge */}
          <div className="lg:col-span-6">
            <Reveal variant="rise" delay={260} className="relative lg:-mr-20 xl:-mr-32">
              <ScreenshotFrame aspect="1671 / 895" url="begalens.ing.net">
                <img
                  src={heroScreenshot}
                  alt="BeGaLens analysis view for a single company number"
                  className="h-full w-full object-cover object-top"
                />
              </ScreenshotFrame>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

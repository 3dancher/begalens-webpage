import ingLogo from '../../ing-logo.png'
import { Reveal } from './ui'

export default function Footer() {
  return (
    <footer>
      {/* Closing call to action */}
      <section id="access" className="bg-ink px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal as="h2" className="text-3xl leading-[1.12] text-white sm:text-[2.6rem]">
            Stop reading gazettes.
            <br />
            Start reading the business.
          </Reveal>

          <Reveal as="p" delay={100} className="mx-auto mt-6 max-w-xl text-lg text-white/65">
            One company number, every publication behind it, and a summary you can trace back to
            the page it came from.
          </Reveal>

          <Reveal delay={180} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#top"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ing px-6 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-ing-deep sm:w-auto"
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
              className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              Walk through a run
            </a>
          </Reveal>
        </div>
      </section>

      <div className="border-t border-line bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-ink-mute sm:flex-row">
          <div className="flex items-center gap-2">
            <img src={ingLogo} alt="" className="h-6 w-6 object-contain" />
            <span className="font-heading font-bold text-ink">BeGaLens</span>
          </div>
          <p className="text-center text-xs">
            Sourced from Belgisch Staatsblad · Moniteur belge · KBO / BCE
          </p>
          <p className="text-xs">© {new Date().getFullYear()} BeGaLens</p>
        </div>
      </div>
    </footer>
  )
}

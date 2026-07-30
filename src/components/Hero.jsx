import PixelBlast from './PixelBlast'
import heroScreenshot from '../../temp_screenshot_hero.png'

function MockResult() {
  return (
    <div className="reveal relative mx-auto mt-16 w-full max-w-4xl">
      {/* soft glow behind the card */}
      <div className="absolute -inset-x-8 -top-8 bottom-0 -z-10 rounded-[2rem] bg-gradient-to-b from-orange-400/30 via-sky-100/30 to-transparent blur-2xl" />
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
        {/* window bar */}
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="ml-3 rounded-md bg-white px-3 py-1 text-xs text-slate-400 ring-1 ring-slate-200">
            begalens.ing.com
          </span>
        </div>

        <div className="aspect-[16/9] overflow-hidden bg-slate-50">
          <img
            src={heroScreenshot}
            alt="BeGaLens application preview"
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-20 sm:pt-44">
      {/* pixel background: white base with orange pixels (sits above the white, below the text) */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-white">
        <PixelBlast
          color="#fff4e3"
          pixelSize={5}
          patternScale={3}
          patternDensity={1.2}
          speed={3}
          edgeFade={0.25}
          enableRipples={false}
          transparent
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <h1 className="reveal mx-auto mt-6 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl">
          Investigating Belgian Gazette
          <br className="hidden sm:block" /> Publications{' '}
          <span className="bg-gradient-to-r from-orange-600 to-orange-300 bg-clip-text text-transparent">
            made easier.
          </span>
        </h1>

        <p className="reveal mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
          BeGaLens turns dense Belgian Gazette filings into clear, business-level summaries powered by large
          language models. Find the signal in every publication in seconds, not minutes.
        </p>

        <div className="reveal mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#" className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-slate-900/10 transition-colors hover:bg-slate-700 sm:w-auto">
            Request access
          </a>
          <a href="#categories" className="w-full rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 sm:w-auto">
            See what we extract
          </a>
        </div>

        <MockResult />
      </div>
    </section>
  )
}

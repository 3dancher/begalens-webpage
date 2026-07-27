export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      {/* CTA band */}
      <div className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="reveal mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Stop reading gazettes. Start reading insights.
        </h2>
        <div className="reveal mt-8">
          <a href="#" className="inline-block rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-slate-900/10 transition-colors hover:bg-slate-700">
            Request access
          </a>
        </div>
      </div>

      <div className="border-t border-slate-100">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-slate-500 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-slate-900 text-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-3.5 w-3.5"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
            </span>
            <span className="font-medium text-slate-700">BeGaLens</span>
          </div>
          <p className="text-center text-xs text-slate-400">
            Structured from official sources · Belgisch Staatsblad · Moniteur belge · KBO / BCE
          </p>
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} BeGaLens</p>
        </div>
      </div>
    </footer>
  )
}

import { useEffect, useState } from 'react'
import ingLogo from '../../ing-logo.png'

const links = [
  { label: 'Summaries', href: '#summaries' },
  { label: 'How it works', href: '#flow' },
  { label: 'Traceability', href: '#traceability' },
]

export default function Navbar() {
  const [lifted, setLifted] = useState(false)

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`flex w-full max-w-5xl items-center justify-between rounded-full border py-2 pl-2 pr-2 backdrop-blur-xl transition-all duration-300 ${
          lifted
            ? 'border-line bg-white/85 shadow-[0_8px_30px_-14px_rgba(20,38,58,0.35)]'
            : 'border-line/70 bg-white/60 shadow-none'
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5 pl-1.5">
          <img src={ingLogo} alt="" className="h-8 w-8 object-contain" />
          <span className="font-heading text-[15px] font-bold tracking-tight text-ink">
            BeGa<span className="text-ing">Lens</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 text-sm text-ink-soft md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="transition-colors hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <a
            href="#access"
            className="hidden rounded-full px-4 py-2 text-sm text-ink-soft transition-colors hover:text-ink sm:block"
          >
            Sign in
          </a>
          <a
            href="#access"
            className="rounded-full bg-ing px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-ing-deep"
          >
            Request access
          </a>
        </div>
      </nav>
    </header>
  )
}

import ingLogo from '../../ing-logo.png'

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5 pl-1.5">
      <img src={ingLogo} alt="ING logo" className="h-8 w-8 object-contain" />
      <span className="text-[15px] font-semibold tracking-tight">
        BeGa<span className="text-orange-500">Lens</span>
      </span>
    </a>
  )
}

const links = [
  { label: 'Categories', href: '#categories' },
  { label: 'How it works', href: '#how' },

]

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav className="flex w-full max-w-5xl items-center justify-between rounded-full border border-slate-200/80 bg-white/70 py-2 pl-2 pr-2 shadow-sm shadow-slate-900/5 backdrop-blur-xl">
        <Logo />
        <ul className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="transition-colors hover:text-slate-900">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1">
          <a href="#" className="hidden rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 sm:block">
            Sign in
          </a>
          <a href="#" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700">
            Request access
          </a>
        </div>
      </nav>
    </header>
  )
}

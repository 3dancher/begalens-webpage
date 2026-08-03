// Shared primitives: the reveal wrapper, section eyebrows, and the grey frames
// that hold real application screenshots once they land.

export function Reveal({
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  className = '',
  style,
  children,
  ...rest
}) {
  return (
    <Tag
      data-reveal={variant}
      className={className}
      style={{ '--rv-delay': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function Eyebrow({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-md bg-ing-tint px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ing-deep ${className}`}
    >
      {children}
    </span>
  )
}

export function SectionTitle({ children, className = '' }) {
  return (
    <h2 className={`text-3xl leading-[1.1] text-ink sm:text-4xl lg:text-[2.7rem] ${className}`}>
      {children}
    </h2>
  )
}

export function Lead({ children, className = '' }) {
  return <p className={`text-[1.0625rem] leading-relaxed text-ink-soft ${className}`}>{children}</p>
}

function WindowBar({ url }) {
  return (
    <div className="flex items-center gap-1.5 border-b border-line bg-canvas px-4 py-3">
      <span className="h-2.5 w-2.5 rounded-full bg-shade ring-1 ring-inset ring-line" />
      <span className="h-2.5 w-2.5 rounded-full bg-shade ring-1 ring-inset ring-line" />
      <span className="h-2.5 w-2.5 rounded-full bg-shade ring-1 ring-inset ring-line" />
      {url ? (
        <span className="ml-3 truncate rounded-md border border-line bg-white px-2.5 py-1 font-mono text-[11px] text-ink-mute">
          {url}
        </span>
      ) : null}
    </div>
  )
}

// Empty slot for an application screenshot. Reads as a deliberate reservation
// rather than a broken image: hatched fill, dashed outline, named caption.
export function ScreenshotSlot({ caption, note, className = '' }) {
  return (
    <div className={`placeholder-hatch relative h-full w-full bg-shade ${className}`}>
      <div className="absolute inset-3 flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-ink-mute/35 bg-white/45 px-4 text-center backdrop-blur-[1px] sm:inset-4">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-ink-mute" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="16" rx="2.5" />
          <path d="m3 16 5-4 4 3 3-2.5 6 4.5" />
          <circle cx="8.75" cy="9.25" r="1.25" />
        </svg>
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink-mute">
          {caption}
        </span>
        {note ? <span className="max-w-[26ch] text-xs leading-snug text-ink-mute/80">{note}</span> : null}
      </div>
    </div>
  )
}

export function ScreenshotFrame({
  caption,
  note,
  aspect = '16 / 10',
  url = 'begalens.ing.net',
  chrome = true,
  className = '',
  children,
}) {
  return (
    <div
      className={`panel-shadow overflow-hidden rounded-2xl border border-line bg-white ${className}`}
    >
      {chrome ? <WindowBar url={url} /> : null}
      <div className="relative" style={{ aspectRatio: aspect }}>
        {children ?? <ScreenshotSlot caption={caption} note={note} />}
      </div>
    </div>
  )
}

import { Fragment } from 'react'

// The application's own topic card designs, ported from cards.html. Shared by
// the deed breakdown and the traceability view so both show the real thing.

export function CardShell({ title, titleClassName = 'text-ink-mute', className = '', innerRef, children }) {
  return (
    <div ref={innerRef} className={`rounded-xl border bg-white p-4 ${className}`}>
      <h4
        className={`mb-2.5 border-b border-line pb-2 text-[10px] font-bold uppercase tracking-[0.13em] ${titleClassName}`}
      >
        {title}
      </h4>
      {children}
    </div>
  )
}

const actionTone = {
  IN: 'border-emerald-200 bg-emerald-100 text-emerald-700',
  OUT: 'border-red-200 bg-red-100 text-red-700',
  RENEWED: 'border-blue-200 bg-blue-100 text-blue-700',
}

export function MandatesBody({ data }) {
  return (
    <div className="space-y-2.5">
      {data.rows.map((row) => (
        <div key={row.name} className="flex items-start gap-2.5">
          <span
            className={`mt-0.5 shrink-0 rounded border px-1.5 py-0.5 text-[9px] font-bold uppercase ${actionTone[row.action]}`}
          >
            {row.action}
          </span>
          <div className="min-w-0">
            <span className="text-[15px] font-bold text-ink">{row.name}</span>
            {row.suffix ? <span className="text-[13px] text-ink-mute"> {row.suffix}</span> : null}
            <p className="text-[13px] text-ink-mute">{row.detail}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function CapitalBody({ data }) {
  return (
    <>
      <p className="mb-1.5 text-[15px] font-bold text-ink">{data.heading}</p>
      <p className="text-[13px] text-ink-soft">
        <strong className="font-bold text-ink">{data.changeLabel}</strong> {data.changeValue}
      </p>
      <p className="mt-0.5 text-[13px] font-bold text-ink">
        {data.totalLabel} {data.totalValue}
      </p>
      <p className="text-[13px] text-ink-mute">{data.shares}</p>
      <p className="mt-2.5 text-[13px] italic leading-snug text-ink-mute">{data.note}</p>
    </>
  )
}

// The source card colours its compliance chip green and its coordination chip
// indigo, in that order.
const chipTone = [
  'border-emerald-200 bg-emerald-50 text-emerald-700',
  'border-indigo-200 bg-indigo-50 text-indigo-700',
]

export function ArticlesBody({ data }) {
  return (
    <>
      <div className="mb-2.5 flex flex-wrap gap-1.5">
        {data.chips.map((chip, i) => (
          <span
            key={chip}
            className={`rounded border px-1.5 py-0.5 text-[11px] font-bold ${
              chipTone[Math.min(i, chipTone.length - 1)]
            }`}
          >
            ✓ {chip}
          </span>
        ))}
      </div>
      <p className="mb-1 text-[13px] font-bold text-ink-soft">{data.rulesLabel}</p>
      <ul className="ml-4 list-disc space-y-1 text-[13px] leading-snug text-ink-soft">
        {data.rules.map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ul>
    </>
  )
}

export function IdentityBody({ data }) {
  return (
    <div className="space-y-2.5">
      {data.fields.map((field, i) => (
        <Fragment key={field.label}>
          {i > 0 ? <hr className="border-line" /> : null}
          <div>
            <span className="mb-0.5 block text-[10px] font-bold uppercase tracking-[0.12em] text-ink-mute">
              {field.label}
            </span>
            <p className="text-[15px] font-bold text-ink">{field.value}</p>
            {field.note ? <p className="mt-0.5 text-[11px] text-ink-mute">{field.note}</p> : null}
          </div>
        </Fragment>
      ))}
    </div>
  )
}

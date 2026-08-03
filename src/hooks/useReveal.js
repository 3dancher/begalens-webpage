import { useEffect } from 'react'

const REVEALED = 'is-in'
const SWEEP_MS = 120

// Scroll-reveal for everything tagged `data-reveal`.
//
// An IntersectionObserver does the normal work. A sweep backs it up for the
// cases where the observer never gets to report: an anchor jump straight past a
// section, the browser restoring a deep scroll position on reload, or a tab that
// was throttled while offscreen. Without it those elements sit at opacity 0
// forever, which reads as a blank page. The sweep is deliberately timer based
// rather than rAF based, because the situations it exists for are exactly the
// ones where frames are not being delivered. It tears itself down once nothing
// is left to reveal.
export default function useReveal() {
  useEffect(() => {
    const pending = new Set()
    let timer = 0

    const reveal = (el) => {
      pending.delete(el)
      el.classList.add(REVEALED)
      io.unobserve(el)
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) reveal(entry.target)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' },
    )

    // Anything whose top edge has already passed this line should be showing.
    const sweep = () => {
      timer = 0
      const limit = window.innerHeight * 0.9
      for (const el of [...pending]) {
        if (el.getBoundingClientRect().top < limit) reveal(el)
      }
      if (pending.size === 0) stopSweep()
    }

    const queueSweep = () => {
      if (timer) return
      timer = setTimeout(sweep, SWEEP_MS)
    }

    const stopSweep = () => {
      window.removeEventListener('scroll', queueSweep)
      window.removeEventListener('resize', queueSweep)
      window.removeEventListener('pageshow', queueSweep)
    }

    const scan = () => {
      for (const el of document.querySelectorAll(`[data-reveal]:not(.${REVEALED})`)) {
        if (pending.has(el)) continue
        pending.add(el)
        io.observe(el)
      }
    }

    scan()
    window.addEventListener('scroll', queueSweep, { passive: true })
    window.addEventListener('resize', queueSweep)
    window.addEventListener('pageshow', queueSweep)
    queueSweep()

    // Sections that mount or swap children later still get picked up.
    const mo = new MutationObserver(() => {
      scan()
      queueSweep()
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      mo.disconnect()
      io.disconnect()
      stopSweep()
      clearTimeout(timer)
    }
  }, [])
}

import { useEffect } from 'react'

// One IntersectionObserver for every element tagged `.reveal`.
// Adds `.is-visible` once, then stops watching it. No deps.
export default function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

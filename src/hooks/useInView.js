import { useEffect, useRef, useState } from 'react'

// Fires once when the element crosses into view, so a section can start its
// sequence at the moment the reader actually arrives at it.
//
// Falls back to a cheap position check for the cases an observer cannot cover:
// a deep scroll position restored on reload, or a tab that was throttled while
// offscreen. Otherwise the sequence would sit frozen at frame zero.
export default function useInView({ threshold = 0.35, rootMargin = '0px 0px -12% 0px' } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    let timer = 0
    const done = () => {
      io.disconnect()
      clearTimeout(timer)
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
      setInView(true)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) done()
      },
      { threshold, rootMargin },
    )
    io.observe(el)

    const check = () => {
      if (timer) return
      timer = setTimeout(() => {
        timer = 0
        if (el.getBoundingClientRect().top < window.innerHeight * 0.75) done()
      }, 120)
    }
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    check()

    return () => {
      io.disconnect()
      clearTimeout(timer)
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [threshold, rootMargin])

  return [ref, inView]
}

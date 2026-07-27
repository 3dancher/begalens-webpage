# begalens-webpage

Landing page for **BeGaLens** (Belgian Gazette Lens) — a SaaS that turns dense Belgian Gazette
(Belgisch Staatsblad / Moniteur belge) filings into clear, business-level summaries using LLMs.

## Stack

- React 19 + Vite 6
- Tailwind CSS v4 (via `@tailwindcss/vite` — no `tailwind.config` needed)
- Inter (Google Fonts)
- `three` + `postprocessing` for the PixelBlast hero background

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

```bash
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Structure

```
src/
  App.jsx                    composition + scroll-reveal hook
  index.css                  Tailwind v4 entry, Inter, reveal animations
  hooks/useReveal.js         IntersectionObserver fade-up (no animation lib)
  components/
    Navbar.jsx               floating pill nav
    Hero.jsx                 headline + PixelBlast background + app screenshot slot
    PixelBlast.jsx           WebGL pixel background (React Bits)
    HowItWorks.jsx           bento: overview, accuracy, four-eyed principle, multilingual, impact
    BusinessCards.jsx        pinned scroll-stack of the 8 publication categories
    Footer.jsx               CTA band + sources
```

## Notes

- `src/main.jsx` intentionally omits React `StrictMode`: the PixelBlast WebGL component is not
  StrictMode-safe and its dev-only double-mount leaves the canvas stuck at a 1px drawing buffer.
- The hero and category cards contain blank placeholders where real app screenshots go.
- Figures shown on the page (LegalBench score, 2× / +150% metrics) are placeholders pending
  verification.

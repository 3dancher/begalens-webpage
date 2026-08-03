# begalens-webpage

Landing page for **BeGaLens** (Belgian Gazette Lens), a tool that pulls every Belgian Official
Gazette (Belgisch Staatsblad / Moniteur belge) publication filed under a company number, analyses
them in parallel, and returns traceable business summaries.

## Stack

- React 19 + Vite 6
- Tailwind CSS v4 (via `@tailwindcss/vite`, no `tailwind.config` needed)
- ING Display + ING Me, self-hosted from `fonts/`. No webfont CDN.

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

## Page structure

The page tells one story in four beats, each with its own section:

```
src/
  App.jsx                    composition + the reveal hook
  index.css                  Tailwind v4 entry, ING fonts, design tokens, animations
  hooks/
    useReveal.js             scroll-reveal for [data-reveal], with a sweep fallback
    useInView.js             one-shot in-view trigger for the flow diagram
  components/
    ui.jsx                   Reveal, Eyebrow, SectionTitle, screenshot frames and slots
    Navbar.jsx               floating pill nav, lifts on scroll
    Hero.jsx                 1. scale: decades of filings read in one pass
    Summaries.jsx            2. dense legal text to clear business events, in NL/FR/DE/EN
    Flow.jsx                 3. one KBO/BCE number, every publication, read in parallel
    Traceability.jsx         4. human in the loop, source beside summary
    Footer.jsx               closing CTA on ink + source line
```

## Design notes

- **Colours** are declared as Tailwind v4 theme tokens in `index.css`: `ing` / `ing-deep` /
  `ing-tint` for the ING orange accent, and `ink` / `ink-soft` / `ink-mute` / `line` / `canvas` /
  `shade` for the navy-tinted neutrals that match the application's own typography.
- **Animation** is one system: elements carry `data-reveal="up|fade|left|right|rise"` and an
  optional `--rv-delay` for stagger. `useReveal` flips them to `.is-in` once. Everything collapses
  to a no-op under `prefers-reduced-motion`.
- **`useReveal` has a sweep fallback** on top of its IntersectionObserver. Anchor jumps, restored
  deep scroll positions, and throttled background tabs can all leave the observer with nothing to
  report, and those elements would otherwise sit at `opacity: 0` forever. The sweep is timer based
  rather than rAF based on purpose, because those are exactly the cases where frames stop arriving.
- **The flow demo** in `Flow.jsx` is built from the real application's own elements, rebuilt rather
  than copied: the KBO search field with its capability chips and gradient Analyze button, the run
  timer, and the Publication History list with its date pill, subject badge and document counter.
  The matching surface treatments live in `index.css` under "Application surfaces" (`.app-canvas`,
  `.app-card`, `.app-btn`, `.app-input`, `.app-badge`, `.app-loader`, `.app-fade-up`), ported from
  `application-styling/styles.css` but re-pointed at the page's own `--color-ing`, so one orange
  runs across the landing page and the embedded product UI.
- **The demo's sequence** is half timed, half scrolled. When the section reaches the viewport the
  number types itself and the button goes to "Connecting…". From there every publication row starts
  as a "Downloading PDF…" placeholder with its own spinner (five at once, which is the parallel
  beat) and resolves into a real result card when *that row* reaches the reading line, so the run
  advances at whatever pace the reader scrolls. `useStreamOnScroll` in `Flow.jsx` does this with one
  IntersectionObserver over the rows. There is a Replay control beside step 01.
- **The two elements sit diagonally**: the search element held left, the results offset down and
  across, with a drawn diagonal handing off between them. The step-02 note sits in the left column
  and sticks, so it stays with the reader for the full length of the list.
- **Two layout constraints hold that together.** The results column uses default stretch alignment
  so the aside column is as tall as the list and its sticky note has room to travel, and the section
  must not carry `overflow-hidden`, which would create a scroll box and kill the sticky. Rows keep a
  `min-h-32` in both states so nothing shuffles as placeholders resolve.

## Application screenshots

Every place a real screenshot goes is a grey slot, sized and positioned for the shot that belongs
there:

| Where | Component | Aspect | What goes in |
| --- | --- | --- | --- |
| Hero | `ScreenshotFrame` | 16:10 | Currently `temp_screenshot_hero.png`, cropped to fill |

To swap the image, pass a different one as `children` of `ScreenshotFrame`; omitting `children`
falls back to a labelled grey slot.

The other three sections need no screenshot, because they rebuild the interface in live markup
instead: the flow demo in `Flow.jsx`, the deed breakdown in `DeedBreakdown.jsx`, and the linked
document view in `Traceability.jsx`.

`appCards.jsx` holds the application's real topic card designs, ported from `cards.html`: the
shell, plus a body per topic shape (mandates with IN/OUT/RENEWED rows, capital, articles with
compliance chips, identity with labelled fields). Both the deed breakdown and the traceability view
render from it, so there is one copy of each card design rather than a lookalike per section.

`Traceability.jsx` draws an abstracted Volet B publication: the masthead, the reference number, the
deposit stamp, the rotated Staatsblad spine and the field block are fixed furniture on every
filing, so they are drawn literally; the body below them is free format, so it is drawn as bars
except where a passage is being pointed at. A loop cycles through three passages, highlighting each
one and curving a link to the card it produced. Both ends are measured at runtime with a
`ResizeObserver` rather than hardcoded, because they move with text wrapping and viewport width;
the path carries `pathLength="1"` so a single keyframe draws it whatever the real distance is. The
link is hidden below `lg`, where the two panes stack and the paired highlight carries the point on
its own.

`DeedBreakdown.jsx` carries the section's actual argument: one deed is not one thing. It shows a
single publication broken into three separate events (mandates, capital, articles), stepped
diagonally rather than stacked, so the three read as siblings out of one source. It takes the
section copy as `children` and puts it in its own left column, so the cards sit beside the argument
they are making instead of in a block below it. All three switch language together through
NL/FR/DE/EN. `IN` / `OUT` / `RENEWED` stay untranslated, because the product treats them as status
tokens rather than prose, and the source deed's own title stays in the language it was filed in.

`category-screenshots/` and `temp_screenshot_hero*.png` are currently unused by the page. The
category names still appear, as the subject badges on the publication cards in `Flow.jsx`.

`application-styling/` holds a copy of the application's own `index.html` and `styles.css`, and
`cards.html` its card catalogue. Those are the references for the flow demo and the topic cards;
keep them in step when the product's UI changes.

## Numbers on the page

`Flow.jsx` shows 5 publications rather than the real file's full 7, so the section does not turn
into a long scroll; it is a trimmed subset, not a different number claimed as real. The page does
not otherwise state benchmark figures (run time, topic count) as headline numbers.

## Language

The site is primarily English, so every demo defaults to English: `DeedBreakdown.jsx` opens on the
`EN` tab, and the extracted cards in `Traceability.jsx` are written in English outright rather than
through a switcher. Two things stay in their source language on purpose: `Flow.jsx`'s KBO/BCE
company-number field (a Belgian identifier, not prose), and the abstracted publication in
`Traceability.jsx`, which is drawn fully in Dutch, since a real filing is never a French/Dutch mix
inside one document, it is one or the other. The point that a summary's language is independent of
the source's is made explicitly by the Dutch document sitting next to English cards, and separately
by `DeedBreakdown.jsx`'s NL/FR/DE/EN switcher.

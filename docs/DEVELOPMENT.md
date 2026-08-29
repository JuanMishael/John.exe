# Development

Notes for working on John.exe. The README is the front door; this is the workshop.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Layout

```
src/
  app/
    layout.tsx             fonts, metadata, pre-hydration theme script
    page.tsx               home — hero, featured work, about teaser, contact
    about/page.tsx         bio, skills, photography
    projects/page.tsx      project index
    projects/[slug]/       case study, statically generated per project
    globals.css            palette, both themes, every shared class
  components/              Nav, Footer, Terminal, ProjectCard, PhotoFrame, Settings
  lib/
    projects.ts            project data + getProject()
    audio.ts               synthesised blips + chiptune
public/icons/              12×12 pixel SVGs, used as CSS masks
```

## Ground rules

**Everything is static.** No database, no API routes, no fetching. Content lives in
`src/lib/projects.ts`; `generateStaticParams()` prerenders every case study at build
time. The whole site is HTML + JS on a CDN.

**Zero runtime dependencies** beyond Next and React. Before reaching for a package,
check whether the platform already does it — most of this site is proof that it does.

**Server components by default.** Only four files are `"use client"`: `Settings`,
`Terminal`, `PhotoFrame`, and anything that touches audio or `localStorage`. Keep it
that way — if a component doesn't need state or events, it stays on the server.

**Styling is plain CSS.** Shared visual language (buttons, panels, tabs, the window
chrome) lives in `globals.css` as classes. One-off layout — grid columns, spacing,
sizes specific to a single page — stays inline as a `style` prop. No CSS framework,
no CSS-in-JS.

## The pixel system

Everything hangs off `--px` (4px). Change it and the whole UI gets chunkier.

- **Outlines** aren't borders. `--edge` is four hard box-shadows (up/down/left/right),
  which leaves the corners notched — that's the pixel-art look, and it lets whatever
  is behind show through at the corners.
- **Bevel recipe** for anything clickable: `--edge` for the outline, a light `inset`
  shadow on top, a dark one on the bottom, and on `:active` flip the insets and
  `translateY(--px)`. `.btn` and `.nav-btn` already do this — reuse them.
- **Margins of `--px`** on shadow-outlined elements, or the outline collides with its
  neighbour.
- **Icons** are painted as CSS masks so they take `currentColor` and follow both
  themes. Sizes must be multiples of the 12-unit viewBox (12, 24, 36) — anything else
  lands rect edges on fractional pixels and softens them. Add one: drop the SVG in
  `public/icons/`, add `.icon-name { --icon: url(/icons/name.svg) }`.
- **Fonts** — `.pixel` is Press Start 2P (headings only, it's unreadable in paragraphs);
  everything else is VT323 at 18–22px.

## Theming

Two ramps, both defined as custom properties at the top of `globals.css`: `:root` is
cream/light, `[data-theme="dusk"]` is dark. Nothing else in the codebase knows a colour
value — always go through a variable.

The toggle lives in `Settings`, writes `localStorage.theme`, and sets the attribute on
`<html>`. An inline script in `layout.tsx` re-applies it before first paint, so there's
no flash of the wrong theme. If you add a colour, add it to **both** ramps.

## Audio

`src/lib/audio.ts` synthesises everything through the Web Audio API — no files to host.
Two things to know if you touch it:

- **Schedule ahead of `currentTime`.** A note scheduled at exactly `currentTime` lands
  in a render quantum the context already passed, and is silently dropped. Everything
  uses a small lookahead.
- **The chiptune uses a lookahead scheduler**, not one `setTimeout` per note — timers
  drift audibly. `tick()` queues the next ~250ms onto the audio clock and only uses the
  timer to top up.

Music can't autoplay; it starts on the first click of the session (wired up in
`Settings`), and the same global click handler is what blips every button.

## The terminal

`Terminal` has two modes. `Demo` is the idle typing animation; pressing Enter anywhere
on the page (or clicking the hint bar) swaps in `Shell`, the interactive one. `exit`
swaps back — remounting `Demo`, which is what resets its timers. Navigating to another
page unmounts the whole thing, so the hero is always back to the animation on return.

The window dots are real: green maximises the frame into a centred overlay (`.term-max`
plus a backdrop), yellow restores, Esc and a backdrop click also restore. Red is
decorative, so it's a `<span>` rather than a focusable no-op button. Maximising takes the
frame out of the hero grid — the column is sized in `fr`, so nothing beside it moves.

Adding a command is one `case` in `run()`, or one entry in `REPLIES` if the output is
static text. `open <slug>` is the only one that navigates; it reads `PROJECTS`, so new
projects are openable the moment they're added to the data file.

## Adding a project

Append an entry to `PROJECTS` in [`src/lib/projects.ts`](../src/lib/projects.ts). The card
on `/projects`, the featured slot on the home page (first three), and the case-study
page at `/projects/<slug>` all come from it — nothing else to wire up.

Case studies render four panels in a fixed order: **problem → role → challenge →
outcome**. Keep each to a couple of sentences; the layout assumes short.

## Ideas

Not built yet, in rough order of "worth it".

- **Konami code easter egg.** A `keydown` listener comparing against the sequence, then
  do something silly — flip the palette, rain sprites, unlock a hidden nav tab. ~20 lines,
  no dependencies.
- **A small retro game.** Canvas 2D, one `requestAnimationFrame` loop, arrow keys. Snake
  or Pong is a couple hundred lines and reuses `audio.ts` for the blips. Put it behind
  the easter egg rather than in the nav, so finding it is the reward. No game engine —
  a physics library for Pong is how a portfolio ends up with a 300KB bundle.
- **Real screenshots** in case studies, replacing the striped `SCREENSHOT.PNG`
  placeholder. Use `next/image`.
- **Photography grid** on `/about` — same story, the striped tiles are placeholders.

### Tech worth adding (and not)

The static-with-no-deps setup is the right default and none of the ideas above break it.
Things that would actually earn their keep, when the need is real:

- **`next/image`** — already installed, use it the moment real photos land.
- **View Transitions API** — native, no package, gives page changes a CRT-style wipe.
- **`localStorage` for game state** — high scores, "easter eggs found: 2/5". Same
  pattern the theme toggle already uses.

Skip: a CMS (seven projects in a TS file is fine), a state manager, an animation
library, a database. If a visitor-facing feature ever needs a server — a guestbook, a
global high-score board — that's the point to add one route handler, not before.

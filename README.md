# John.exe

Personal portfolio for **John Calimoso** — full-stack developer.
Home, about, and a projects section with per-project case-study pages.

## Theme

An 8-bit / pixel-art interface, built on the Pixel Button Kit palette:

- **Type** — `Press Start 2P` for headings, `VT323` for body (both via `next/font`)
- **Chrome** — 4px pixel grid, notched outlines drawn with hard box-shadows instead of borders, scanline overlay
- **Two themes** — cream *light* and `data-theme="dusk"` dark, toggled in the settings dialog and remembered in `localStorage` (applied pre-hydration by an inline script, so no flash)
- **Sound** — square-wave UI blips and a looping chiptune, synthesised in the Web Audio API. No audio files.
- **Settings** — native `<dialog>` for the theme switch and SFX / music volume

## Tech stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript |
| Styling | Plain CSS with custom properties — no CSS framework |
| Audio | Web Audio API |
| Deps | Zero runtime dependencies beyond Next/React |

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run lint
```

## Layout

```
src/
  app/
    page.tsx               home — hero, featured work, about teaser, contact
    about/                 bio, skills, photography
    projects/              index + [slug] case studies
    globals.css            palette, pixel primitives, both themes
  components/              Nav, Footer, Terminal, ProjectCard, PhotoFrame, Settings
  lib/
    projects.ts            project data
    audio.ts               synthesised blips + chiptune
```

Project content lives in [`src/lib/projects.ts`](src/lib/projects.ts) — add an entry and its card and case-study page appear automatically.

## Contact

[Email](mailto:johnmishaelparcal@gmail.com) · [LinkedIn](https://www.linkedin.com/in/john-mishael-calimoso-148abb257/) · [GitHub](https://github.com/JuanMishael) · [Unsplash](https://unsplash.com/@juan_ito)

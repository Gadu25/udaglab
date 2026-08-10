# UdagLab.com — Homepage Design

**Date:** 2026-08-10
**Status:** Approved (v1)

## Overview

UdagLab.com is the root-domain brand hub for Alexander Udag's hobby and
experiment projects. It is a single-page catalog that links out to every
project (any URL the owner sets per project). It is intentionally separate
from the personal portfolio (`alexander.udaglab.com`) and from Megome
(`megome.udaglab.com`).

The framing: *"UdagLab — where ideas become experiments."*

## Goals

- Give `udaglab.com` (the root domain) a distinct identity as a "lab" brand.
- Act as a living catalog/index of all hobby and experiment projects.
- Remain lightweight, static, and easy to maintain.
- Stay flexible: each project record points at any external URL.

## Non-Goals (v1)

- No blog pages. The experiment log/changelog absorbs short content for now.
- No integration with the Megome API. Project data lives in a local file.
- No user accounts, CMS, or database.

## Tech Stack

- Nuxt 3 + Vue 3 (same as `portfolio-v2`)
- SCSS for styling
- Space Grotesk font, monospace accents for status/lab motifs
- Static generation via `nuxt generate`
- Deployed to Vercel

## Design Language

Dark, lab/terminal-inspired aesthetic:
- Dark background with subtle grid/scanline motifs
- Neon/soft accent color for highlights and status LEDs
- Monospace labels for statuses and meta data
- Cards laid out on a "lab bench" grid

## Page Structure (single page, top to bottom)

1. **Header / Nav** — UdagLab wordmark, anchor links (Projects, Experiments,
   About), social icons.
2. **Hero** — tagline "where ideas become experiments" + short intro line.
3. **About / Intro** — 2-3 sentences defining what UdagLab is.
4. **Project Catalog** — card grid. Each card shows:
   - Name
   - One-line description
   - Tech tags
   - Status badge (Live / Beta / Stale / Experiment)
   - Link-out button to the record's `url`
5. **Filters + Search** — client-side filtering by status, tech/category tag,
   plus a free-text search box. Works statically (client-side filtering over
   local data).
6. **Experiment Log / Changelog** — newest-first feed of dated entries
   ("Added CatchThemAll", "Project X updated"). Keeps the site alive without
   a full blog.
7. **Link Status Indicators** — subtle dot per project card indicating
   whether the linked URL is reachable (up / down / unknown). Computed at
   build time (see Implementation Notes).
8. **Footer** — socials, copyright.

## Data Model

### `data/projects.js`
Array of project objects:

```js
{
  name: 'CatchThemAll',
  description: 'One-line description',
  url: 'https://...',           // any URL, owner-provided
  tech: ['Nuxt', 'Tailwind'],   // tags, used for filtering
  status: 'live',               // live | beta | stale | experiment
  category: 'web-app',          // web-app | tool | game | experiment | website
  addedAt: '2026-01-01',
  updatedAt: '2026-02-01',
  githubUrl: 'https://...'      // optional
}
```

### `data/changelog.js`
Array of changelog entries:

```js
{
  date: '2026-02-01',
  title: 'Added API-Hub',
  body: 'Short note about what changed.',
  project: 'API-Hub'            // optional reference to a project name
}
```

## Implementation Notes

- Static generation (`nuxt generate`); no runtime server required in prod.
- Filters/search are pure client-side over the local data arrays.
- Link status is computed at build time: a small pre-build step ("nuxt
  generate" hooks or a build script) performs a HEAD request per project URL
  and bakes up/down/unknown results into the generated page as a
  `statuses.json` data file. Browser-side runtime checks are NOT used —
  cross-origin HEAD requests are blocked by CORS in browsers. Unknown =
  unreachable/timeout.
- Reuse layout, typography, and component conventions from `portfolio-v2`
  for visual consistency.

## Error Handling

- Status check failures/timeouts → badge shows "unknown", never a hard error.
- Empty filter/search results → empty-state message "No experiments match
  your filter."
- Missing `url` on a project → card renders without link-out (no broken
  anchor).

## Testing

- Filtering by status, category, and search term returns expected subsets
  and an empty state when nothing matches.
- Unknown status handling for unreachable URLs.
- Changelog renders newest-first.
- Build runs clean with `nuxt build`/`nuxt generate`.

## Future Ideas (explicitly deferred)

- Full blog section (changelog is shaped so posts can be absorbed later).
- Powering the catalog from the Megome API (dogfooding) once Megome is
  stable.
# UdagLab.com

The home of Alexander Udag's hobby projects and experiments.

**Live at [udaglab.com](https://udaglab.com/)**

## Tech Stack

- Framework: Nuxt 3 + Vue 3
- Language: TypeScript
- Styling: SCSS
- Font: Space Grotesk
- Testing: Vitest
- Deployment: Vercel

## What's Inside

- Project catalog with search, status/category filters, and link-status indicators
- Experiments changelog
- Dark lab-inspired theme

## Getting Started

```bash
npm install
npm run dev
```

The site runs at http://localhost:3000.

## Tests

```bash
npm test
```

## How Link Statuses Work

At build time, a `build:before` hook runs a HEAD (with GET fallback) request
against every project URL and writes `public/statuses.json`, which the page
reads statically. Unreachable or rejected URLs report `unknown`; the build
never fails because of a down link.

Replace the projects in `data/projects.js` and the changelog entries in
`data/changelog.js` with your own.
# Agent Notes for UdagLab

## Project

Single Nuxt 3 (Vue 3 + TypeScript) site for udaglab.com, deployed to Vercel.

## Commands

```bash
npm install          # postinstall runs `nuxt prepare`
npm run dev          # http://localhost:3000
npm run build        # production build
npm run generate     # static build
npm test             # vitest run (node env)
```

## Architecture

- Data is authored, not fetched: projects live in `data/projects.js`, changelog in `data/changelog.js`.
- Content is rendered through `pages/index.vue` and components under `components/{card,common,sections}/`.
- Shared logic: `utils/` (pure helpers), `composables/` (Vue state), `types/project.ts` (TypeScript types).
- Server-only helper `server/utils/checkSiteStatuses.ts` is used by a build hook.

## Build Hook: Link Statuses

`nuxt.config.ts` runs `checkSiteStatuses` on the `build:before` hook:

- Probes every `url` in `data/projects.js` via HEAD, falling back to GET.
- Writes results to `public/statuses.json`.
- Failures are logged as warnings; the build never fails because of a down link.

`public/statuses.json` is read at runtime in `composables/useSiteStatuses.ts`.

## Component Auto-Import

Components in `~/components` are auto-imported with `pathPrefix: false` — use `<CardProject />`, not `<ComponentsCardProject />`.

## Testing

- Vitest runs in `node` environment (`vitest.config.ts`).
- Tests live in `tests/` and import from the source files directly.
- `fetch` is stubbed in tests for `checkSiteStatuses`.

## Style

- Global SCSS entry: `assets/css/main.scss`.
- Font loaded from Google Fonts: Space Grotesk.
- Favicon/apple-touch-icon expected at `public/images/app-icon.png`.

## Gotchas

- `tsconfig.json` extends `.nuxt/tsconfig.json`; `.nuxt` is generated after `npm install` / `nuxt prepare`.
- `public/statuses.json` is generated during build and should not be committed.

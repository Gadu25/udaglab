# UdagLab.com Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build udaglab.com — a dark, lab-themed single-page brand hub cataloging Alexander Udag's hobby/experiment projects with filtering, a changelog, and build-time link-status indicators.

**Architecture:** Nuxt 3 static site (`nuxt generate`) in `/home/alex/my/udaglab`. Project data lives in `data/*.js`. Pure logic (filtering, sorting, link-status classification) lives in `utils/*.ts` and `server/utils/*.ts`, unit-tested with Vitest. Link statuses are computed at build time by a `build:before` hook that HEAD/GET-checks each project URL and writes `public/statuses.json`, which the page fetches statically with an `unknown` fallback.

**Tech Stack:** Nuxt 3 + Vue 3, TypeScript, SCSS (BEM partials mirroring `portfolio-v2`), Space Grotesk (+ system monospace stack for status accents), Vitest, Vercel deployment.

## Global Constraints

- Working directory: `/home/alex/my/udaglab`. All paths below are relative to it unless absolute.
- Node >= 20, `nuxt@^3.13.0`, `vue`, `vue-router`, `sass@^1.80.2`, `typescript`, `vitest@^2`.
- No extra UI/component libraries — hand-rolled SCSS only.
- No code comments unless the task text shows one.
- Follow `portfolio-v2` conventions: SCSS partials imported in `assets/css/main.scss`, BEM naming (`block__element--modifier`), semantic color CSS variables (`--background-color`, `--surface-color`, `--text-color`, `--secondary-text-color`, `--border-color`, plus a lab accent `--accent-color`), components under `components/`, composables under `composables/`, plain data exports in `data/`.
- Dark-only lab theme: near-black background, neon accent, monospace labels for statuses.
- Data model (from spec): `Project` and `ChangelogEntry` shapes as defined in Task 2. Utilities import types/siblings with relative paths so Vitest runs without Nuxt aliases.

---

### Task 1: Scaffold Nuxt 3 project that builds

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `.gitignore`
- Create: `nuxt.config.ts`
- Create: `assets/css/main.scss`
- Create: `assets/css/abstracts/_variables.scss`
- Create: `assets/css/base/_typography.scss`
- Create: `assets/css/themes/_colors.scss`
- Create: `layouts/default.vue`
- Create: `pages/index.vue`

**Interfaces:**
- Consumes: nothing (first task).
- Produces: a running Nuxt skeleton with theme SCSS; `pages/index.vue` renders a placeholder heading so the build can be verified.

- [ ] **Step 1: Write the package manifest**

Create `package.json`:

```json
{
  "name": "udaglab",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "test": "vitest run",
    "postinstall": "nuxt prepare"
  },
  "dependencies": {
    "nuxt": "^3.13.0",
    "vue": "^3.4.0",
    "vue-router": "^4.4.0"
  },
  "devDependencies": {
    "sass": "^1.80.2",
    "typescript": "^5.5.0",
    "vitest": "^2.1.0"
  }
}
```

- [ ] **Step 2: Write config files**

Create `tsconfig.json`:

```json
{
  "extends": "./.nuxt/tsconfig.json"
}
```

Create `.gitignore`:

```
node_modules
.nuxt
.output
.data
dist
.env
*.log
public/statuses.json
```

- [ ] **Step 3: Write nuxt.config.ts with the dark theme head**

Create `nuxt.config.ts`:

```ts
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-01',
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
  css: ['~/assets/css/main.scss'],
  app: {
    head: {
      title: 'UdagLab',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'UTF-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'author', content: 'Alexander Udag' },
        { name: 'description', content: 'UdagLab — where ideas become experiments.' },
        { name: 'keywords', content: 'UdagLab, projects, experiments, web developer, Alexander Udag' },
        { name: 'theme-color', content: '#0a0a0a' },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap',
        },
      ],
    },
  },
})
```

- [ ] **Step 4: Write theme SCSS partials**

Create `assets/css/abstracts/_variables.scss`:

```scss
// Spacing
$space-xs: 4px;
$space-sm: 8px;
$space-md: 16px;
$space-lg: 24px;
$space-xl: 40px;
$space-2xl: 64px;
$space-3xl: 96px;

// Border radius
$radius-sm: 6px;
$radius-md: 12px;
$radius-lg: 20px;
$radius-full: 9999px;

// Transitions
$transition-fast: 0.15s ease;
$transition-base: 0.25s ease;
$transition-slow: 0.4s ease;

// Breakpoints
$bp-mobile: 480px;
$bp-narrow: 650px;
$bp-tablet: 768px;
$bp-desktop: 1024px;
$bp-wide: 1200px;

// Layout
$max-width: 1100px;
$nav-height: 60px;
```

Create `assets/css/base/_typography.scss`:

```scss
$font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
$font-mono: ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace;

$font-size-2xs: 0.6875rem;
$font-size-xs: 0.75rem;
$font-size-sm: 0.875rem;
$font-size-base: 1rem;
$font-size-md: 1.125rem;
$font-size-lg: 1.5rem;
$font-size-xl: 2rem;
$font-size-2xl: 2.5rem;
$font-size-3xl: 3.5rem;
$font-size-4xl: 4.5rem;

$font-weight-light: 300;
$font-weight-normal: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;

body {
  font-family: $font-family;
  font-size: $font-size-base;
  font-weight: $font-weight-normal;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  text-decoration: none;
  color: inherit;
  transition: color $transition-base;
}

p {
  line-height: 1.7;
  font-size: $font-size-sm;
  color: var(--text-color);
}

h1 {
  font-size: $font-size-4xl;
  font-weight: $font-weight-semibold;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

h2 {
  font-size: $font-size-2xl;
  font-weight: $font-weight-semibold;
  letter-spacing: -0.02em;
}

h3 {
  font-size: $font-size-lg;
  font-weight: $font-weight-medium;
  letter-spacing: -0.01em;
}

h4 {
  font-size: $font-size-base;
  font-weight: $font-weight-medium;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

small {
  font-size: $font-size-sm;
  color: var(--secondary-text-color);
}

strong {
  font-weight: $font-weight-semibold;
}

.text-secondary {
  color: var(--secondary-text-color);
}

@media screen and (max-width: $bp-mobile) {
  h1 {
    font-size: $font-size-3xl;
  }

  h2 {
    font-size: $font-size-lg;
  }

  h3 {
    font-size: $font-size-lg;
  }

  h4 {
    font-size: $font-size-base;
  }

  p {
    font-size: $font-size-sm;
  }

  small {
    font-size: $font-size-xs;
  }
}
```

Create `assets/css/themes/_colors.scss` (lab dark theme only):

```scss
:root {
  --background-color: #0a0a0a;
  --surface-color: #141414;
  --surface-hover: #1c1c1c;
  --text-color: #e5e7eb;
  --secondary-text-color: #9ca3af;
  --border-color: #2a2a2a;
  --accent-color: #22d3ee;
  --accent-dim: rgba(34, 211, 238, 0.12);
  --status-up: #22c55e;
  --status-down: #ef4444;
  --status-unknown: #6b7280;
}
```

Create `assets/css/main.scss`:

```scss
@import './abstracts/variables';
@import './base/typography';
@import './themes/colors';

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  transition: background-color $transition-slow, color $transition-slow;
  background-color: var(--background-color);
  background-image: radial-gradient(circle at 50% 0%, rgba(34, 211, 238, 0.06), transparent 40%);
  color: var(--text-color);
  overflow-x: hidden;
  min-height: 100vh;
}

::selection {
  background-color: var(--accent-dim);
  color: var(--text-color);
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}
```

- [ ] **Step 5: Write the layout and placeholder page**

Create `layouts/default.vue`:

```vue
<template>
  <div class="layout">
    <Navigation />
    <main class="layout__main">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>
```

Note: `layouts/default.vue` references `Navigation` and `Footer`, which are fully implemented in Task 4. Create minimal placeholder versions now so this task's build stays green (as shown below), and Task 4 will replace them.

```vue
<template>
  <nav class="nav">
    <div class="nav__container">
      <a class="nav__brand" href="/">UdagLab</a>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border-color);
}

.nav__container {
  max-width: $max-width;
  margin: 0 auto;
  padding: 0 $space-lg;
  height: $nav-height;
  display: flex;
  align-items: center;
}

.nav__brand {
  font-weight: $font-weight-semibold;
  letter-spacing: -0.01em;
}
</style>
```

Create `layouts/Footer.vue`:

```vue
<template>
  <footer class="footer">
    <div class="footer__container">
      <small>&copy; {{ year }} UdagLab — Alexander Udag</small>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  border-top: 1px solid var(--border-color);
  padding: $space-xl 0;
}

.footer__container {
  max-width: $max-width;
  margin: 0 auto;
  padding: 0 $space-lg;
  display: flex;
  justify-content: center;
}
</style>
```

Note: Nuxt provides auto-import for SCSS variables only when imported into the stylesheet; inside `<style scoped>` the `$max-width`/`$space-*`/`$font-weight-*` partials are not automatically available. To keep this task green, replace the scoped vars with the literal values for now (e.g. `max-width: 1100px; padding: 0 24px;`). Task 4 converts these to a global SCSS import.

Create `pages/index.vue`:

```vue
<template>
  <div class="index">
    <HeroSection />
  </div>
</template>
```

(Step 5-note: `HeroSection` is built in Task 5; until then create a placeholder `components/sections/HeroSection.vue`:

```vue
<template>
  <section class="hero">
    <h1>UdagLab</h1>
  </section>
</template>
```

)

- [ ] **Step 6: Install and verify the build**

Run:

```bash
npm install
```

Expected: install completes (runs `nuxt prepare` via postinstall). Then:

```bash
npm run build
```

Expected: build succeeds; Nuxt emits `.output`.

Note: the `<style scoped>` blocks above reference SCSS variables (`$max-width`, `$space-lg`, `$font-weight-semibold`) that are not imported into scoped styles. Before building, replace those variable references in both scoped styles with literal values: `max-width: 1100px`, `padding: 0 24px`, `font-weight: 600`. Task 4 removes these scoped styles in favor of global partials.

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "feat: scaffold nuxt app with lab theme"
```

---

### Task 2: Types + data + pure filter/sort utilities (TDD)

**Files:**
- Create: `types/project.ts`
- Create: `data/projects.js`
- Create: `data/changelog.js`
- Create: `utils/filterProjects.ts`
- Create: `utils/sortChangelog.ts`
- Test: `tests/filterProjects.test.ts`
- Test: `tests/sortChangelog.test.ts`
- Create: `vitest.config.ts`
- Modify: `package.json` (no change — `test` script exists)

**Interfaces:**
- Consumes: nothing (own types/data).
- Produces:
  - `types/project.ts`: `ProjectStatus = 'live' | 'beta' | 'stale' | 'experiment'`, `ProjectCategory = 'web-app' | 'tool' | 'game' | 'experiment' | 'website'`, `LinkStatus = 'up' | 'down' | 'unknown'`, interfaces `Project` and `ChangelogEntry`.
  - `data/projects.js` → default export `Array<Project>` (used as `~/data/projects`).
  - `data/changelog.js` → default export `Array<ChangelogEntry>` (used as `~/data/changelog`).
  - `utils/filterProjects.ts`: `filterProjects(projects: Project[], filters: ProjectFilters): Project[]` with `ProjectFilters = { query?: string; status?: ProjectStatus | 'all'; category?: ProjectCategory | 'all' }`.
  - `utils/sortChangelog.ts`: `sortChangelogNewestFirst(entries: ChangelogEntry[]): ChangelogEntry[]`.

- [ ] **Step 1: Write types**

Create `types/project.ts`:

```ts
export type ProjectStatus = 'live' | 'beta' | 'stale' | 'experiment'
export type ProjectCategory = 'web-app' | 'tool' | 'game' | 'experiment' | 'website'
export type LinkStatus = 'up' | 'down' | 'unknown'

export interface Project {
  name: string
  description: string
  url: string
  tech: string[]
  status: ProjectStatus
  category: ProjectCategory
  addedAt: string
  updatedAt: string
  githubUrl?: string
}

export interface ChangelogEntry {
  date: string
  title: string
  body: string
  project?: string
}
```

- [ ] **Step 2: Write the failing filter test**

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
  },
})
```

Create `tests/filterProjects.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { filterProjects } from '../utils/filterProjects'
import type { Project } from '../types/project'

const base: Project[] = [
  {
    name: 'API-Hub',
    description: 'Integrates multiple public APIs',
    url: 'https://api-hub-seven.vercel.app/',
    tech: ['Nuxt', 'Tailwind', 'Sass'],
    status: 'stale',
    category: 'web-app',
    addedAt: '2024-06-01',
    updatedAt: '2024-07-15',
  },
  {
    name: 'CatchThemAll',
    description: 'Pokemon-themed catching app',
    url: 'https://catch-them-all-eta.vercel.app/',
    tech: ['Nuxt', 'Tailwind', 'Sass'],
    status: 'beta',
    category: 'web-app',
    addedAt: '2024-07-01',
    updatedAt: '2024-08-10',
  },
  {
    name: 'Passkeep',
    description: 'A secure password manager',
    url: 'https://passkeep-five.vercel.app/',
    tech: ['Next.js', 'Tailwind', 'Firebase'],
    status: 'live',
    category: 'tool',
    addedAt: '2024-05-01',
    updatedAt: '2024-08-01',
  },
]

describe('filterProjects', () => {
  it('returns all projects when no filters are supplied', () => {
    expect(filterProjects(base, {})).toHaveLength(3)
  })

  it('filters by status', () => {
    expect(filterProjects(base, { status: 'live' }).map((p) => p.name)).toEqual(['Passkeep'])
    expect(filterProjects(base, { status: 'all' })).toHaveLength(3)
  })

  it('filters by category', () => {
    expect(filterProjects(base, { category: 'tool' }).map((p) => p.name)).toEqual(['Passkeep'])
  })

  it('filters by query across name, tech, and description (case-insensitive)', () => {
    expect(filterProjects(base, { query: 'nuxt' }).map((p) => p.name)).toEqual(['API-Hub', 'CatchThemAll'])
    expect(filterProjects(base, { query: 'PASSKEEP' }).map((p) => p.name)).toEqual(['Passkeep'])
    expect(filterProjects(base, { query: 'firebase' }).map((p) => p.name)).toEqual(['Passkeep'])
  })

  it('combines status + category + query filters', () => {
    expect(filterProjects(base, { status: 'stale', category: 'web-app', query: 'api' })).toHaveLength(1)
  })

  it('returns an empty array when nothing matches', () => {
    expect(filterProjects(base, { query: 'zzz' })).toHaveLength(0)
  })

  it('does not mutate the input array', () => {
    const copy = [...base]
    filterProjects(base, { status: 'stale' })
    expect(base).toEqual(copy)
  })
})
```

- [ ] **Step 3: Run the filter test to verify it fails**

Run: `npx vitest run tests/filterProjects.test.ts`
Expected: FAIL — module `../utils/filterProjects` not found.

- [ ] **Step 4: Write the failing sort test**

Create `tests/sortChangelog.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { sortChangelogNewestFirst } from '../utils/sortChangelog'
import type { ChangelogEntry } from '../types/project'

const entries: ChangelogEntry[] = [
  { date: '2026-02-01', title: 'Added API-Hub', body: 'New entry.' },
  { date: '2026-01-15', title: 'Updated Passkeep', body: 'Polished UI.' },
  { date: '2026-03-01', title: 'CatchThemAll released', body: 'Beta.' },
]

describe('sortChangelogNewestFirst', () => {
  it('sorts entries newest-first by date', () => {
    expect(sortChangelogNewestFirst(entries).map((e) => e.title)).toEqual([
      'CatchThemAll released',
      'Added API-Hub',
      'Updated Passkeep',
    ])
  })

  it('does not mutate the input array', () => {
    const copy = [...entries]
    sortChangelogNewestFirst(entries)
    expect(entries).toEqual(copy)
  })
})
```

- [ ] **Step 5: Run the sort test to verify it fails**

Run: `npx vitest run tests/sortChangelog.test.ts`
Expected: FAIL — module `../utils/sortChangelog` not found.

- [ ] **Step 6: Implement the utilities**

Create `utils/filterProjects.ts`:

```ts
import type { Project, ProjectCategory, ProjectStatus } from '../types/project'

export interface ProjectFilters {
  query?: string
  status?: ProjectStatus | 'all'
  category?: ProjectCategory | 'all'
}

export function filterProjects(projects: Project[], filters: ProjectFilters): Project[] {
  const term = (filters.query ?? '').trim().toLowerCase()
  return projects.filter((project) => {
    if (filters.status && filters.status !== 'all' && project.status !== filters.status) return false
    if (filters.category && filters.category !== 'all' && project.category !== filters.category) return false
    if (!term) return true
    const haystack = [project.name, project.description, project.category, project.status, ...project.tech]
      .join(' ')
      .toLowerCase()
    return haystack.includes(term)
  })
}
```

Create `utils/sortChangelog.ts`:

```ts
import type { ChangelogEntry } from '../types/project'

export function sortChangelogNewestFirst(entries: ChangelogEntry[]): ChangelogEntry[] {
  return [...entries].sort((a, b) => +new Date(b.date) - +new Date(a.date))
}
```

- [ ] **Step 7: Run all tests to verify they pass**

Run: `npm test`
Expected: PASS — 10 tests (8 filter + 2 sort).

- [ ] **Step 8: Write the seed data**

Create `data/projects.js`:

```js
export default [
  {
    name: 'CatchThemAll',
    description: 'A Pokemon-themed web app for browsing, searching, and catching the whole collection with smooth custom animations.',
    url: 'https://catch-them-all-eta.vercel.app/',
    tech: ['Nuxt', 'Tailwind', 'Sass'],
    status: 'beta',
    category: 'web-app',
    addedAt: '2024-07-01',
    updatedAt: '2025-03-14',
    githubUrl: 'https://github.com/Gadu25/catchThemAll',
  },
  {
    name: 'API-Hub',
    description: 'A web app integrating multiple public APIs — weather, news, photos, countries, jokes, exchange rates, and more.',
    url: 'https://api-hub-seven.vercel.app/',
    tech: ['Nuxt', 'Tailwind', 'Sass'],
    status: 'stale',
    category: 'web-app',
    addedAt: '2024-06-01',
    updatedAt: '2025-02-20',
    githubUrl: 'https://github.com/Gadu25/api-hub',
  },
  {
    name: 'Passkeep',
    description: 'A secure, cloud-synced password manager focused on simplicity, with encryption and Firebase authentication.',
    url: 'https://passkeep-five.vercel.app/',
    tech: ['Next.js', 'Tailwind', 'Firebase'],
    status: 'live',
    category: 'tool',
    addedAt: '2024-05-01',
    updatedAt: '2025-04-02',
  },
  {
    name: 'Mojito Cocktail',
    description: 'A playful animation experiment exploring GSAP motion effects and creative transitions in React.',
    url: 'https://mojito-cocktail-fe7xggurx-alexanders-projects-91906c70.vercel.app/',
    tech: ['React', 'TypeScript', 'Tailwind', 'GSAP'],
    status: 'experiment',
    category: 'web-app',
    addedAt: '2024-08-01',
    updatedAt: '2025-01-11',
    githubUrl: 'https://github.com/Gadu25/gsap-mojito-cocktail',
  },
  {
    name: 'GEP Website',
    description: 'The official website of the Geodetic Engineers of the Philippines, built on WordPress with custom post types and galleries.',
    url: 'https://nationalgep.org',
    tech: ['WordPress', 'PHP', 'SCSS', 'JavaScript'],
    status: 'live',
    category: 'website',
    addedAt: '2024-09-01',
    updatedAt: '2025-03-01',
  },
]
```

Create `data/changelog.js`:

```js
export default [
  {
    date: '2026-08-10',
    title: 'UdagLab goes live',
    body: 'Launched the lab homepage to catalog everything I tinker with.',
  },
  {
    date: '2026-07-19',
    title: 'CatchThemAll in beta',
    body: 'Smoothed the animations and shipped the beta build.',
    project: 'CatchThemAll',
  },
  {
    date: '2026-06-30',
    title: 'Archive: API-Hub',
    body: 'Marked as stale — dependencies out of date, fun while it lasted.',
    project: 'API-Hub',
  },
]
```

- [ ] **Step 9: Verify tests still pass with data present**

Run: `npm test`
Expected: PASS.

- [ ] **Step 10: Commit**

```bash
git add .
git commit -m "feat: add types, data, and pure filter/sort utilities"
```

---

### Task 3: Build-time link status checking (TDD)

**Files:**
- Create: `utils/classifyStatus.ts`
- Create: `server/utils/checkSiteStatuses.ts`
- Test: `tests/classifyStatus.test.ts`
- Test: `tests/checkSiteStatuses.test.ts`
- Modify: `nuxt.config.ts` (add `build:before` hook writing `public/statuses.json`)
- Create: `public/.gitkeep` (so `public/` exists)

**Interfaces:**
- Consumes: `LinkStatus` type from `types/project.ts`; `Project[]` from `data/projects.js` (in the hook).
- Produces:
  - `utils/classifyStatus.ts`: `classifyStatus(ok: boolean | null): LinkStatus`.
  - `server/utils/checkSiteStatuses.ts`: `checkSiteStatuses(urls: string[]): Promise<Record<string, LinkStatus>>`.
  - `public/statuses.json`: generated file mapping project URL → `LinkStatus`.

- [ ] **Step 1: Write the failing classifyStatus test**

Create `tests/classifyStatus.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { classifyStatus } from '../utils/classifyStatus'

describe('classifyStatus', () => {
  it('maps true to up', () => {
    expect(classifyStatus(true)).toBe('up')
  })

  it('maps false to down', () => {
    expect(classifyStatus(false)).toBe('down')
  })

  it('maps null to unknown', () => {
    expect(classifyStatus(null)).toBe('unknown')
  })
})
```

- [ ] **Step 2: Run the classifyStatus test to verify it fails**

Run: `npx vitest run tests/classifyStatus.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Write the failing checkSiteStatuses test**

Create `tests/checkSiteStatuses.test.ts`:

```ts
import { afterEach, describe, it, expect, vi } from 'vitest'
import { checkSiteStatuses } from '../server/utils/checkSiteStatuses'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('checkSiteStatuses', () => {
  it('returns up for a reachable url', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true })))
    const result = await checkSiteStatuses(['https://example.com'])
    expect(result).toEqual({ 'https://example.com': 'up' })
  })

  it('returns down for a responding but non-ok url', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: false })))
    const result = await checkSiteStatuses(['https://example.com'])
    expect(result).toEqual({ 'https://example.com': 'down' })
  })

  it('returns unknown when fetch throws', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('network down') }))
    const result = await checkSiteStatuses(['https://example.com'])
    expect(result).toEqual({ 'https://example.com': 'unknown' })
  })

  it('keeps a result per url', async () => {
    const mock = vi.fn(async () => ({ ok: true }))
    vi.stubGlobal('fetch', mock)
    const result = await checkSiteStatuses(['https://a.com', 'https://b.com'])
    expect(Object.keys(result)).toHaveLength(2)
    expect(mock).toHaveBeenCalledTimes(2)
  })
})
```

- [ ] **Step 4: Run the checkSiteStatuses test to verify it fails**

Run: `npx vitest run tests/checkSiteStatuses.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 5: Implement the utilities**

Create `utils/classifyStatus.ts`:

```ts
import type { LinkStatus } from '../types/project'

export function classifyStatus(ok: boolean | null): LinkStatus {
  return ok === true ? 'up' : ok === false ? 'down' : 'unknown'
}
```

Create `server/utils/checkSiteStatuses.ts`:

```ts
import { classifyStatus } from '../../utils/classifyStatus'
import type { LinkStatus } from '../../types/project'

const TIMEOUT_MS = 5000
const REQUEST_HEADERS = { 'User-Agent': 'UdagLab-StatusBot/1.0' }

async function probe(url: string): Promise<boolean | null> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    let res = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: controller.signal, headers: REQUEST_HEADERS })
    if (!res.ok) {
      res = await fetch(url, { method: 'GET', redirect: 'follow', signal: controller.signal, headers: REQUEST_HEADERS })
    }
    return res.ok
  } catch {
    return null
  } finally {
    clearTimeout(timeout)
  }
}

export async function checkSiteStatuses(urls: string[]): Promise<Record<string, LinkStatus>> {
  const result: Record<string, LinkStatus> = {}
  await Promise.all(
    urls.map(async (url) => {
      result[url] = classifyStatus(await probe(url))
    }),
  )
  return result
}
```

Note: the test calls `fetch` with a single arg; the implementation passes options too. `vi.stubGlobal` mocks ignore extra args, so assertions still hold (`mock` called once per URL).

- [ ] **Step 6: Run all status tests to verify they pass**

Run: `npx vitest run tests/classifyStatus.test.ts tests/checkSiteStatuses.test.ts`
Expected: PASS — 7 tests.

- [ ] **Step 7: Wire the build hook into nuxt.config.ts**

Modify `nuxt.config.ts` — replace the file with:

```ts
// https://nuxt.com/docs/api/configuration/nuxt-config
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { checkSiteStatuses } from './server/utils/checkSiteStatuses'
import projects from './data/projects'

export default defineNuxtConfig({
  compatibilityDate: '2024-07-01',
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
  css: ['~/assets/css/main.scss'],
  app: {
    head: {
      title: 'UdagLab',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'UTF-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'author', content: 'Alexander Udag' },
        { name: 'description', content: 'UdagLab — where ideas become experiments.' },
        { name: 'keywords', content: 'UdagLab, projects, experiments, web developer, Alexander Udag' },
        { name: 'theme-color', content: '#0a0a0a' },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap',
        },
      ],
    },
  },
  hooks: {
    'build:before': async () => {
      const urls = projects.filter((p) => p.url).map((p) => p.url)
      try {
        const statuses = await checkSiteStatuses(urls)
        writeFileSync(resolve(process.cwd(), 'public/statuses.json'), JSON.stringify(statuses, null, 2))
        console.log(`[udaglab-status] checked ${urls.length} links`)
      } catch (err) {
        console.warn('[udaglab-status] check failed; continuing without statuses', err)
      }
    },
  },
})
```

Create `public/.gitkeep` (empty file).

- [ ] **Step 8: Verify the build hook runs**

Run: `npm run build`
Expected: build succeeds; log line `[udaglab-status] checked 5 links`; `public/statuses.json` created with 5 entries.

(If the network blocks outbound requests, the hook catches and logs a warning; `public/statuses.json` may be absent — acceptable, the page falls back to `unknown`.)

- [ ] **Step 9: Commit**

```bash
git add .
git commit -m "feat: compute link statuses at build time"
```

---

### Task 4: Layout, navigation, footer, and composables

**Files:**
- Modify: `layouts/default.vue` (import SCSS partial globally; expand)
- Modify: `layouts/Navigation.vue` (real nav: brand + anchors + GitHub link; global SCSS import)
- Modify: `layouts/Footer.vue` (socials + copyright; global SCSS import)
- Create: `assets/css/layout/_navigation.scss`
- Create: `assets/css/layout/_footer.scss`
- Modify: `assets/css/main.scss` (import layout partials)
- Create: `composables/useSiteStatuses.ts`
- Create: `composables/useProjectFilter.ts`

**Interfaces:**
- Consumes: `LinkStatus` from types; `filterProjects` from `utils/filterProjects`.
- Produces:
  - `composables/useSiteStatuses.ts`: `useSiteStatuses(): { statuses: Ref<Record<string, LinkStatus>> }` — reads `/statuses.json` via `useFetch` with `default: () => ({})` and `ignoreResponseError: true`.
  - `composables/useProjectFilter.ts`: `useProjectFilter(projects: Ref<Project[]>): { query, status, category, results, categories, hasActiveFilter, clearFilters }` where `query`/`status`/`category` are writable refs and `results` is `ComputedRef<Project[]>`.

- [ ] **Step 1: Write the composables**

Create `composables/useSiteStatuses.ts`:

```ts
import type { LinkStatus } from '../types/project'

export const useSiteStatuses = () => {
  const { data } = useFetch<Record<string, LinkStatus>>('/statuses.json', {
    default: () => ({}),
    ignoreResponseError: true,
  })
  return { statuses: data }
}
```

Create `composables/useProjectFilter.ts`:

```ts
import { computed, ref } from 'vue'
import type { Project, ProjectCategory, ProjectStatus } from '../types/project'
import { filterProjects } from '../utils/filterProjects'

export const useProjectFilter = (projects: Ref<Project[]>) => {
  const query = ref('')
  const status = ref<ProjectStatus | 'all'>('all')
  const category = ref<ProjectCategory | 'all'>('all')

  const results = computed(() =>
    filterProjects(projects.value, {
      query: query.value,
      status: status.value,
      category: category.value,
    }),
  )

  const categories = computed<ProjectCategory[]>(() =>
    Array.from(new Set(projects.value.map((p) => p.category))),
  )

  const hasActiveFilter = computed(
    () => query.value.trim() !== '' || status.value !== 'all' || category.value !== 'all',
  )

  const clearFilters = () => {
    query.value = ''
    status.value = 'all'
    category.value = 'all'
  }

  return { query, status, category, results, categories, hasActiveFilter, clearFilters }
}
```

- [ ] **Step 2: Rewrite the layouts using global SCSS**

Modify `layouts/default.vue`:

```vue
<template>
  <div class="layout">
    <Navigation />
    <main class="layout__main">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>
```

Modify `layouts/Navigation.vue` (remove scoped style):

```vue
<template>
  <nav class="nav">
    <div class="nav__container">
      <a class="nav__brand" href="/">UdagLab</a>
      <div class="nav__links">
        <a class="nav__link" href="#projects">Projects</a>
        <a class="nav__link" href="#experiments">Experiments</a>
        <a class="nav__link" href="#about">About</a>
        <a class="nav__link nav__link--social" href="https://github.com/Gadu25" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </div>
    </div>
  </nav>
</template>
```

Modify `layouts/Footer.vue` (remove scoped style):

```vue
<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__links">
        <a href="https://alexander.udaglab.com" target="_blank" rel="noopener noreferrer">Portfolio</a>
        <a href="https://github.com/Gadu25" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://megome.udaglab.com" target="_blank" rel="noopener noreferrer">Megome</a>
      </div>
      <small class="footer__copy">&copy; {{ year }} UdagLab — Alexander Udag</small>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>
```

- [ ] **Step 3: Write the layout SCSS partials**

Create `assets/css/layout/_navigation.scss`:

```scss
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border-color);

  &__container {
    max-width: $max-width;
    margin: 0 auto;
    padding: 0 $space-lg;
    height: $nav-height;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__brand {
    font-weight: $font-weight-semibold;
    letter-spacing: -0.01em;
    color: var(--text-color);
  }

  &__links {
    display: flex;
    gap: $space-lg;
    align-items: center;
  }

  &__link {
    font-size: $font-size-sm;
    color: var(--secondary-text-color);
    transition: color $transition-base;

    &:hover {
      color: var(--accent-color);
    }

    &--social {
      color: var(--accent-color);
    }
  }
}

@media screen and (max-width: $bp-mobile) {
  .nav__links {
    gap: $space-md;
  }
}
```

Create `assets/css/layout/_footer.scss`:

```scss
.footer {
  border-top: 1px solid var(--border-color);
  padding: $space-2xl 0;

  &__container {
    max-width: $max-width;
    margin: 0 auto;
    padding: 0 $space-lg;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-md;
  }

  &__links {
    display: flex;
    gap: $space-xl;
  }

  a {
    font-size: $font-size-sm;
    color: var(--secondary-text-color);
    transition: color $transition-base;

    &:hover {
      color: var(--accent-color);
    }
  }

  &__copy {
    color: var(--secondary-text-color);
  }
}
```

Modify `assets/css/main.scss` — add layout imports after the themes import:

```scss
@import './abstracts/variables';
@import './base/typography';
@import './themes/colors';

@import './layout/navigation';
@import './layout/footer';
```

- [ ] **Step 4: Verify build + tests**

Run: `npm run build`
Expected: SUCCESS.
Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add navigation, footer, and site composables"
```

---

### Task 5: Hero and About sections

**Files:**
- Create: `components/sections/HeroSection.vue` (replace placeholder)
- Create: `components/sections/AboutSection.vue`
- Create: `assets/css/layout/_hero.scss`
- Create: `assets/css/layout/_about.scss`
- Modify: `assets/css/main.scss`
- Modify: `pages/index.vue`

**Interfaces:**
- Consumes: nothing new (static content).
- Produces: `HeroSection.vue` — hero with monospace tagline "where ideas become experiments"; `AboutSection.vue` — 2-3 sentence intro with `id="about"`.

- [ ] **Step 1: Write the component markup**

Modify `components/sections/HeroSection.vue`:

```vue
<template>
  <section class="hero">
    <div class="hero__container">
      <p class="hero__eyebrow">&gt; init lab</p>
      <h1 class="hero__title">
        where ideas
        <span class="hero__accent">become</span>
        experiments
      </h1>
      <p class="hero__subtitle">
        UdagLab is the home of everything Alexander Udag tinkers with — hobby apps, tools, and half-baked
        prototypes, catalogued in one place.
      </p>
      <a class="hero__cta" href="#projects">Browse experiments &darr;</a>
    </div>
  </section>
</template>
```

Create `components/sections/AboutSection.vue`:

```vue
<template>
  <section id="about" class="about">
    <div class="about__container">
      <h4 class="text-secondary">About</h4>
      <p class="about__body">
        UdagLab is a playground, not a portfolio. Each project here is an experiment — some became real
        products, some fizzled out, and all of them taught me something worth keeping. They run on whatever
        stack felt fun at the time: Nuxt, Next, React, Go, WordPress, and more.
      </p>
      <p class="about__body">
        If you want the polished version of me, that lives over at the portfolio. This is the messy workbench.
      </p>
    </div>
  </section>
</template>
```

- [ ] **Step 2: Write the section SCSS**

Create `assets/css/layout/_hero.scss`:

```scss
.hero {
  min-height: 70vh;
  display: flex;
  align-items: center;

  &__container {
    max-width: $max-width;
    margin: 0 auto;
    padding: $space-3xl $space-lg;
    display: flex;
    flex-direction: column;
    gap: $space-lg;
  }

  &__eyebrow {
    font-family: $font-mono;
    font-size: $font-size-sm;
    color: var(--secondary-text-color);
  }

  &__title {
    max-width: 12ch;
  }

  &__accent {
    color: var(--accent-color);
  }

  &__subtitle {
    max-width: 60ch;
    color: var(--secondary-text-color);
  }

  &__cta {
    display: inline-block;
    width: fit-content;
    padding: $space-sm $space-lg;
    border: 1px solid var(--accent-color);
    border-radius: $radius-full;
    color: var(--accent-color);
    font-size: $font-size-sm;
    transition: background-color $transition-base, color $transition-base;

    &:hover {
      background: var(--accent-color);
      color: var(--background-color);
    }
  }
}
```

Create `assets/css/layout/_about.scss`:

```scss
.about {
  padding: $space-2xl 0;
  border-top: 1px solid var(--border-color);

  &__container {
    max-width: $max-width;
    margin: 0 auto;
    padding: 0 $space-lg;
    display: flex;
    flex-direction: column;
    gap: $space-md;
  }

  &__body {
    max-width: 70ch;
    color: var(--secondary-text-color);
  }
}
```

Modify `assets/css/main.scss` — add:

```scss
@import './layout/hero';
@import './layout/about';
```

- [ ] **Step 3: Assemble the page**

Modify `pages/index.vue`:

```vue
<template>
  <div class="index">
    <HeroSection />
    <AboutSection />
  </div>
</template>
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: SUCCESS.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add hero and about sections"
```

---

### Task 6: Project catalog — filters, search, cards, status indicators

**Files:**
- Create: `components/common/StatusBadge.vue`
- Create: `components/common/StatusDot.vue`
- Create: `components/common/FilterBar.vue`
- Create: `components/card/ProjectCard.vue`
- Create: `components/sections/ProjectsSection.vue`
- Create: `assets/css/components/_status.scss`
- Create: `assets/css/components/_filter-bar.scss`
- Create: `assets/css/components/_project-card.scss`
- Create: `assets/css/layout/_projects.scss`
- Modify: `assets/css/main.scss`
- Modify: `pages/index.vue`

**Interfaces:**
- Consumes: `useProjectFilter(projects: Ref<Project[]>)`, `useSiteStatuses()`, `Project`/`ProjectStatus`/`ProjectCategory`/`LinkStatus` types, `data/projects.js`, `data/changelog.js` (changelog in Task 7).
- Produces:
  - `StatusBadge.vue` — props `{ status: ProjectStatus }`, renders a colored badge.
  - `StatusDot.vue` — props `{ status: LinkStatus }`, renders `<span class="status-dot" :class="'status-dot--' + status" :title="status">`.
  - `FilterBar.vue` — `v-model` props `query`/`status`/`category`, props `categories: ProjectCategory[]`, `statuses: ProjectStatus[]`, `resultCount: number`.
  - `ProjectCard.vue` — props `{ project: Project; linkStatus?: LinkStatus }`.
  - `ProjectsSection.vue` — `id="projects"`, list + empty state.

- [ ] **Step 1: Write the status components**

Create `components/common/StatusBadge.vue`:

```vue
<template>
  <span class="status-badge" :class="`status-badge--${status}`">{{ label }}</span>
</template>

<script setup lang="ts">
import type { ProjectStatus } from '~/types/project'

const props = defineProps<{
  status: ProjectStatus
}>()

const labels: Record<ProjectStatus, string> = {
  live: 'Live',
  beta: 'Beta',
  stale: 'Stale',
  experiment: 'Experiment',
}

const label = computed(() => labels[props.status])
</script>
```

Create `components/common/StatusDot.vue`:

```vue
<template>
  <span class="status-dot" :class="`status-dot--${status}`" :title="`link ${status}`" />
</template>

<script setup lang="ts">
import type { LinkStatus } from '~/types/project'

defineProps<{
  status: LinkStatus
}>()
</script>
```

- [ ] **Step 2: Write the FilterBar**

Create `components/common/FilterBar.vue`:

```vue
<template>
  <div class="filter-bar">
    <div class="filter-bar__search">
      <input
        v-model="query"
        class="filter-bar__input"
        type="text"
        placeholder="Search by name, tech, or keyword..."
        aria-label="Search projects"
      />
    </div>

    <div class="filter-bar__group">
      <span class="filter-bar__label">Status</span>
      <button
        v-for="option in ['all', ...props.statuses]"
        :key="option"
        class="filter-bar__chip"
        :class="{ 'filter-bar__chip--active': status === option }"
        type="button"
        @click="status = option"
      >
        {{ option }}
      </button>
    </div>

    <div class="filter-bar__group">
      <span class="filter-bar__label">Category</span>
      <button
        v-for="option in ['all', ...props.categories]"
        :key="option"
        class="filter-bar__chip"
        :class="{ 'filter-bar__chip--active': category === option }"
        type="button"
        @click="category = option"
      >
        {{ option }}
      </button>
    </div>

    <small class="filter-bar__count">{{ resultCount }} {{ resultCount === 1 ? 'experiment' : 'experiments' }}</small>
  </div>
</template>

<script setup lang="ts">
import type { ProjectCategory, ProjectStatus } from '~/types/project'

const query = defineModel<string>('query', { default: '' })
const status = defineModel<ProjectStatus | 'all'>('status', { default: 'all' })
const category = defineModel<ProjectCategory | 'all'>('category', { default: 'all' })

const props = defineProps<{
  categories: ProjectCategory[]
  statuses: ProjectStatus[]
  resultCount: number
}>()
</script>
```

Note: in the template, bind the status/category chip loops to `['all', ...props.statuses]` and `['all', ...props.categories]` respectively (do not use `statusOptions`/`categoryOptions`).

- [ ] **Step 3: Write the ProjectCard**

Create `components/card/ProjectCard.vue`:

```vue
<template>
  <article class="project-card">
    <div class="project-card__head">
      <div class="project-card__status-line">
        <StatusDot :status="linkStatus ?? 'unknown'" />
      </div>
      <StatusBadge :status="project.status" />
    </div>

    <h3 class="project-card__title">{{ project.name }}</h3>
    <p class="project-card__desc">{{ project.description }}</p>

    <ul class="project-card__tech">
      <li v-for="tech in project.tech" :key="tech" class="project-card__tech-item">
        <small>{{ tech }}</small>
      </li>
    </ul>

    <div class="project-card__actions">
      <a
        v-if="project.url"
        class="project-card__link"
        :href="project.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open &rarr;
      </a>
      <a
        v-if="project.githubUrl"
        class="project-card__gh"
        :href="project.githubUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        <small>code</small>
      </a>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { LinkStatus, Project } from '~/types/project'

defineProps<{
  project: Project
  linkStatus?: LinkStatus
}>()
</script>
```

- [ ] **Step 4: Write the ProjectsSection**

Create `components/sections/ProjectsSection.vue`:

```vue
<template>
  <section id="projects" class="projects">
    <div class="projects__container">
      <h2 class="projects__title">Projects</h2>
      <FilterBar
        v-model:query="query"
        v-model:status="status"
        v-model:category="category"
        :categories="categories"
        :statuses="statusOptions"
        :result-count="results.length"
      />

      <template v-if="results.length > 0">
        <div class="projects__grid">
          <ProjectCard
            v-for="project in results"
            :key="project.name"
            :project="project"
            :link-status="statusOf(project.url)"
          />
        </div>
      </template>
      <p v-else class="projects__empty">No experiments match your filter.</p>

      <button v-if="hasActiveFilter" class="projects__clear" type="button" @click="clearFilters">
        Clear filters
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import projectsData from '~/data/projects'
import type { LinkStatus, Project, ProjectStatus } from '~/types/project'

const projects = ref<Project[]>(projectsData as Project[])
const statusOptions: ProjectStatus[] = ['live', 'beta', 'stale', 'experiment']

const { query, status, category, results, categories, hasActiveFilter, clearFilters } = useProjectFilter(projects)
const { statuses } = useSiteStatuses()

const statusOf = (url: string): LinkStatus => statuses.value[url] ?? 'unknown'
</script>
```

- [ ] **Step 5: Write the SCSS partials**

Create `assets/css/components/_status.scss`:

```scss
.status-badge {
  font-family: $font-mono;
  font-size: $font-size-2xs;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 2px $space-sm;
  border-radius: $radius-full;
  border: 1px solid var(--border-color);

  &--live {
    color: var(--status-up);
    border-color: var(--status-up);
  }

  &--beta {
    color: #f59e0b;
    border-color: #f59e0b;
  }

  &--stale {
    color: var(--status-unknown);
    border-color: var(--status-unknown);
  }

  &--experiment {
    color: #a855f7;
    border-color: #a855f7;
  }
}

.status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: $radius-full;

  &--up {
    background: var(--status-up);
  }

  &--down {
    background: var(--status-down);
  }

  &--unknown {
    background: var(--status-unknown);
  }
}
```

Create `assets/css/components/_filter-bar.scss`:

```scss
.filter-bar {
  display: flex;
  flex-direction: column;
  gap: $space-md;
  padding: $space-lg 0;

  &__input {
    width: 100%;
    padding: $space-sm $space-md;
    background: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: $radius-sm;
    color: var(--text-color);
    font-family: $font-mono;
    font-size: $font-size-sm;
    transition: border-color $transition-base;

    &:focus {
      outline: none;
      border-color: var(--accent-color);
    }

    &::placeholder {
      color: var(--secondary-text-color);
    }
  }

  &__group {
    display: flex;
    flex-wrap: wrap;
    gap: $space-sm;
    align-items: center;
  }

  &__label {
    font-family: $font-mono;
    font-size: $font-size-2xs;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--secondary-text-color);
  }

  &__chip {
    font-size: $font-size-xs;
    padding: $space-xs $space-md;
    border-radius: $radius-full;
    border: 1px solid var(--border-color);
    background: transparent;
    color: var(--secondary-text-color);
    cursor: pointer;
    transition: border-color $transition-base, color $transition-base;

    &:hover {
      border-color: var(--accent-color);
      color: var(--accent-color);
    }

    &--active {
      border-color: var(--accent-color);
      color: var(--accent-color);
      background: var(--accent-dim);
    }
  }

  &__count {
    color: var(--secondary-text-color);
  }
}
```

Create `assets/css/components/_project-card.scss`:

```scss
.project-card {
  display: flex;
  flex-direction: column;
  gap: $space-md;
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: $radius-md;
  padding: $space-lg;
  transition: border-color $transition-base, transform $transition-base;

  &:hover {
    border-color: var(--accent-color);
    transform: translateY(-2px);
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: $space-sm;
  }

  &__status-line {
    display: flex;
    gap: $space-xs;
    margin-right: auto;
  }

  &__title {
    font-size: $font-size-md;
  }

  &__desc {
    color: var(--secondary-text-color);
  }

  &__tech {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: $space-xs;
  }

  &__tech-item {
    border: 1px solid var(--border-color);
    border-radius: $radius-full;
    padding: 2px $space-sm;

    small {
      color: var(--secondary-text-color);
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: $space-md;
    margin-top: auto;
  }

  &__link {
    font-size: $font-size-sm;
    color: var(--accent-color);
    transition: opacity $transition-base;

    &:hover {
      opacity: 0.8;
    }
  }

  &__gh {
    color: var(--secondary-text-color);

    &:hover {
      color: var(--text-color);
    }
  }
}
```

Create `assets/css/layout/_projects.scss`:

```scss
.projects {
  padding: $space-2xl 0;
  border-top: 1px solid var(--border-color);

  &__container {
    max-width: $max-width;
    margin: 0 auto;
    padding: 0 $space-lg;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: $space-lg;
  }

  &__empty {
    text-align: center;
    color: var(--secondary-text-color);
    padding: $space-2xl 0;
  }

  &__clear {
    margin-top: $space-lg;
    font-size: $font-size-xs;
    padding: $space-xs $space-md;
    border-radius: $radius-full;
    border: 1px solid var(--border-color);
    background: transparent;
    color: var(--secondary-text-color);
    cursor: pointer;
    transition: border-color $transition-base, color $transition-base;

    &:hover {
      border-color: var(--accent-color);
      color: var(--accent-color);
    }
  }
}
```

Modify `assets/css/main.scss` — add:

```scss
@import './components/status';
@import './components/filter-bar';
@import './components/project-card';

@import './layout/projects';
```

- [ ] **Step 6: Add the section to the page**

Modify `pages/index.vue`:

```vue
<template>
  <div class="index">
    <HeroSection />
    <AboutSection />
    <ProjectsSection />
  </div>
</template>
```

- [ ] **Step 7: Verify build + tests**

Run: `npm run build`
Expected: SUCCESS.
Run: `npm test`
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add .
git commit -m "feat: add project catalog with search, filters, and status indicators"
```

---

### Task 7: Experiment log / changelog section

**Files:**
- Create: `components/sections/ChangelogSection.vue`
- Create: `assets/css/layout/_changelog.scss`
- Modify: `assets/css/main.scss`
- Modify: `pages/index.vue`

**Interfaces:**
- Consumes: `data/changelog.js`, `sortChangelogNewestFirst` from `utils/sortChangelog`.
- Produces: `ChangelogSection.vue` — `id="experiments"`, latest-first dated list.

- [ ] **Step 1: Write the component**

Create `components/sections/ChangelogSection.vue`:

```vue
<template>
  <section id="experiments" class="changelog">
    <div class="changelog__container">
      <h2 class="changelog__title">Experiments log</h2>
      <ol class="changelog__list">
        <li v-for="entry in entries" :key="entry.title" class="changelog__item">
          <time class="changelog__date" :datetime="entry.date">{{ formatDate(entry.date) }}</time>
          <div class="changelog__content">
            <h3 class="changelog__heading">{{ entry.title }}</h3>
            <p class="changelog__body">{{ entry.body }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import changelogData from '~/data/changelog'
import type { ChangelogEntry } from '~/types/project'
import { sortChangelogNewestFirst } from '~/utils/sortChangelog'

const entries = sortChangelogNewestFirst(changelogData as ChangelogEntry[])

const formatDate = (date: string): string => {
  const [year, month, day] = date.split('-').map(Number)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[month - 1]} ${day}, ${year}`
}
</script>
```

- [ ] **Step 2: Write the changelog SCSS**

Create `assets/css/layout/_changelog.scss`:

```scss
.changelog {
  padding: $space-2xl 0;
  border-top: 1px solid var(--border-color);

  &__container {
    max-width: $max-width;
    margin: 0 auto;
    padding: 0 $space-lg;
  }

  &__list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: $space-lg;
    margin-top: $space-xl;
  }

  &__item {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: $space-lg;
    padding-bottom: $space-lg;
    border-bottom: 1px solid var(--border-color);
  }

  &__date {
    font-family: $font-mono;
    font-size: $font-size-xs;
    color: var(--secondary-text-color);
    padding-top: 2px;
  }

  &__heading {
    font-size: $font-size-md;
  }

  &__body {
    color: var(--secondary-text-color);
    margin-top: 2px;
  }
}

@media screen and (max-width: $bp-mobile) {
  .changelog__item {
    grid-template-columns: 1fr;
    gap: $space-xs;
  }
}
```

Modify `assets/css/main.scss` — add:

```scss
@import './layout/changelog';
```

- [ ] **Step 3: Add the section to the page**

Modify `pages/index.vue`:

```vue
<template>
  <div class="index">
    <HeroSection />
    <AboutSection />
    <ProjectsSection />
    <ChangelogSection />
  </div>
</template>
```

- [ ] **Step 4: Verify build + tests**

Run: `npm run build`
Expected: SUCCESS.
Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add experiments changelog section"
```

---

### Task 8: SEO meta, README, final verification

**Files:**
- Modify: `pages/index.vue` (add `useSeoMeta` + `useHead`)
- Create: `README.md`
- Modify: `nuxt.config.ts` (OG meta + favicon link)

**Interfaces:**
- Consumes: everything above.
- Produces: final site.

- [ ] **Step 1: Add SEO meta to the page**

Modify `pages/index.vue` — replace `<script>` (currently absent) with:

```vue
<script setup lang="ts">
useSeoMeta({
  title: 'UdagLab',
  description: 'UdagLab — where ideas become experiments.',
  ogTitle: 'UdagLab',
  ogDescription: 'The home of Alexander Udag\u2019s hobby projects and experiments.',
  ogUrl: 'https://udaglab.com/',
  twitterTitle: 'UdagLab',
  twitterDescription: 'Where ideas become experiments.',
  twitterCard: 'summary',
})

useHead({
  htmlAttrs: { lang: 'en' },
})
</script>
```

- [ ] **Step 2: Add OG meta in nuxt.config.ts**

Modify the `head` in `nuxt.config.ts` — append to `meta`:

```ts
        { property: 'og:title', content: 'UdagLab' },
        { property: 'og:description', content: 'UdagLab — where ideas become experiments.' },
        { property: 'og:url', content: 'https://udaglab.com/' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary' },
```

- [ ] **Step 3: Write the README**

Create `README.md`:

```markdown
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
```

- [ ] **Step 4: Final verification**

Run: `npm test`
Expected: PASS (all unit tests).
Run: `npm run build`
Expected: SUCCESS.
Run: `npm run generate`
Expected: SUCCESS; verify `public/statuses.json` exists (unless network blocked) and `.output/public/index.html` contains "where ideas".

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "docs: add README and seo meta; final verification"
```

---

## Self-Review Notes

- Spec coverage: hero/about (Tasks 5), catalog + filters/search + status indicators (Task 6), changelog (Task 7), error handling (Task 6 empty state, Task 3 unknown status, ProjectCard missing-url guard built in), static gen (config Task 1, verified Task 8), build-time statuses (Task 3).
- Placeholder scan: no TBD/TODO; the FilterBar has a "use this final version" note because the first block in the plan is an explicit rejected draft — the implementer MUST use the final version shown.
- Type consistency: `filterProjects(projects, filters)`, `sortChangelogNewestFirst(entries)`, `classifyStatus(ok)`, `checkSiteStatuses(urls)`, `useProjectFilter(ref)` returning `{ query, status, category, results, categories, hasActiveFilter, clearFilters }`, `useSiteStatuses()` returning `{ statuses }` are referenced identically in consumer tasks.
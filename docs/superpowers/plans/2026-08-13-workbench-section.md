# Workbench Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new "Workbench" section to the UdagLab homepage that describes the author's terminal-first, Linux-based workflow and the tools used to build projects.

**Architecture:** A single presentational Vue section component is created and inserted between the existing About and Projects sections. Styles live in a dedicated SCSS partial to match the existing section conventions. A nav link is added to the sticky header.

**Tech Stack:** Nuxt 3, Vue 3, TypeScript, SCSS, Vitest (node env).

## Global Constraints

- Match existing section spacing, border treatment, and color variables.
- Use `pathPrefix: false` component auto-imports — no manual component imports in pages.
- Keep content static and authored; no runtime data fetching.
- Do not commit generated files (`.nuxt`, `.output`, `public/statuses.json`).
- The site uses `npm run build` and `npm run generate` for production; `npm test` runs Vitest.

---

## File Structure

| File | Purpose |
|------|---------|
| `components/sections/WorkbenchSection.vue` | New section component with intro paragraph and tool list. |
| `assets/css/layout/_workbench.scss` | Section-specific styles matching existing layout partials. |
| `assets/css/main.scss` | Import the new SCSS partial. |
| `pages/index.vue` | Insert `<WorkbenchSection />` between `<AboutSection />` and `<ProjectsSection />`. |
| `layouts/Navigation.vue` | Add anchor link `#workbench`. |

---

### Task 1: Create the WorkbenchSection component

**Files:**
- Create: `components/sections/WorkbenchSection.vue`

**Interfaces:**
- Consumes: nothing (static content)
- Produces: `<WorkbenchSection />` component, auto-imported by Nuxt

- [ ] **Step 1: Write the component**

```vue
<template>
  <section id="workbench" class="workbench">
    <div class="workbench__container">
      <h2 class="workbench__title">Workbench</h2>
      <p class="workbench__body">
        I build everything from the terminal on Linux — not to flex, I just prefer it
        that way. No GUI IDE, no mouse-heavy workflow. Neovim is my editor, Opencode
        is the AI I pair with, and herdr keeps my terminal sessions organized.
      </p>
      <dl class="workbench__tools">
        <div class="workbench__tool">
          <dt>Linux + terminal</dt>
          <dd>My whole workflow lives in the shell. Fast, keyboard-driven, and exactly the way I like it.</dd>
        </div>
        <div class="workbench__tool">
          <dt>Neovim</dt>
          <dd>Where all the actual typing happens.</dd>
        </div>
        <div class="workbench__tool">
          <dt>Opencode</dt>
          <dd>The AI assistant I bounce ideas off and write code with.</dd>
        </div>
        <div class="workbench__tool">
          <dt>herdr</dt>
          <dd>An AI-driven terminal multiplexer built on top of tmux.</dd>
        </div>
      </dl>
    </div>
  </section>
</template>
```

- [ ] **Step 2: Verify file exists and syntax is valid**

Run:
```bash
ls -la components/sections/WorkbenchSection.vue
```

Expected: file exists and contains the template above.

- [ ] **Step 3: Commit**

```bash
git add components/sections/WorkbenchSection.vue
git commit -m "feat: add WorkbenchSection component"
```

---

### Task 2: Add styles for the Workbench section

**Files:**
- Create: `assets/css/layout/_workbench.scss`
- Modify: `assets/css/main.scss`

**Interfaces:**
- Consumes: existing SCSS variables (`$space-*`, `$max-width`, `$radius-md`, `$font-weight-semibold`, CSS custom properties)
- Produces: `.workbench` BEM block

- [ ] **Step 1: Write the SCSS partial**

```scss
.workbench {
  padding: $space-2xl 0;
  border-top: 1px solid var(--border-color);

  &__container {
    max-width: $max-width;
    margin: 0 auto;
    padding: 0 $space-lg;
    display: flex;
    flex-direction: column;
    gap: $space-lg;
  }

  &__body {
    max-width: 70ch;
    color: var(--secondary-text-color);
  }

  &__tools {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: $space-lg;
  }

  &__tool {
    padding: $space-md;
    border: 1px solid var(--border-color);
    border-radius: $radius-md;

    dt {
      font-weight: $font-weight-semibold;
    }

    dd {
      color: var(--secondary-text-color);
      margin-top: $space-xs;
    }
  }
}
```

- [ ] **Step 2: Import the partial in main.scss**

Modify `assets/css/main.scss` to add the import after `_about.scss`:

```scss
@import './layout/about';
@import './layout/workbench'; // NEW
@import './layout/projects';
```

- [ ] **Step 3: Verify SCSS compiles**

Run:
```bash
npm run build
```

Expected: build completes without SCSS or Vue errors.

- [ ] **Step 4: Commit**

```bash
git add assets/css/layout/_workbench.scss assets/css/main.scss
git commit -m "feat: add workbench section styles"
```

---

### Task 3: Wire the section into the homepage

**Files:**
- Modify: `pages/index.vue`

**Interfaces:**
- Consumes: `<WorkbenchSection />` (auto-imported)
- Produces: updated homepage template

- [ ] **Step 1: Insert the component between About and Projects**

```vue
<template>
  <div class="index">
    <HeroSection />
    <AboutSection />
    <WorkbenchSection />
    <ProjectsSection />
  </div>
</template>
```

- [ ] **Step 2: Verify the homepage renders**

Run:
```bash
npm run build
```

Expected: build succeeds and the generated HTML contains the workbench intro text.

Run:
```bash
grep -o "I build everything from the terminal" .output/public/index.html
```

Expected: one match.

- [ ] **Step 3: Commit**

```bash
git add pages/index.vue
git commit -m "feat: place workbench section on homepage"
```

---

### Task 4: Add navigation link

**Files:**
- Modify: `layouts/Navigation.vue`

**Interfaces:**
- Consumes: `#workbench` anchor
- Produces: clickable nav link

- [ ] **Step 1: Add the Workbench link**

Update the nav links to:

```vue
<div class="nav__links">
  <a class="nav__link" href="#projects">Projects</a>
  <a class="nav__link" href="#about">About</a>
  <a class="nav__link" href="#workbench">Workbench</a>
  <a class="nav__link nav__link--social" href="https://github.com/Gadu25" target="_blank" rel="noopener noreferrer">
    GitHub
  </a>
</div>
```

Order can be adjusted for visual balance; keep it consistent with the page flow.

- [ ] **Step 2: Verify the link appears in generated output**

Run:
```bash
npm run generate
grep -o 'href="#workbench"' .output/public/index.html | wc -l
```

Expected: at least one match.

- [ ] **Step 3: Commit**

```bash
git add layouts/Navigation.vue
git commit -m "feat: add workbench nav link"
```

---

### Task 5: Final verification

**Files:**
- None (verification only)

- [ ] **Step 1: Run tests**

```bash
npm test
```

Expected: all existing tests pass; no new failures.

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: build exits with code 0.

- [ ] **Step 3: Check responsive layout (manual)**

Run dev server if needed:
```bash
npm run dev
```

Open `http://localhost:3000`, scroll to the Workbench section, and confirm:
- Section appears between About and Projects.
- Four tool cards render in a responsive grid.
- On narrow widths the cards stack to a single column.
- Nav link scrolls smoothly to `#workbench`.

- [ ] **Step 4: Commit any remaining changes**

```bash
git status
# If clean, no commit needed. Otherwise commit.
```

---

## Self-Review

- **Spec coverage:** Every requirement from `2026-08-13-workbench-section-design.md` is covered: placement, content, component, styles, nav link, and testing.
- **Placeholder scan:** No TBD, TODO, or vague instructions. All code is provided.
- **Type consistency:** No new types or cross-task interfaces beyond the static component.
# UdagLab.com — Workbench Section Design

**Date:** 2026-08-13
**Status:** Pending review

## Overview

Add a new "Workbench" section to the UdagLab homepage that explains *where and
how* Alexander builds his projects. The section should feel personal and
terminal-flavored without being a brag or a sterile tech-spec sheet. It connects
the "messy workbench" metaphor already used in the About section to the actual
tools behind the projects.

## Goals

- Give visitors a behind-the-scenes sense of the author's workflow.
- Reinforce the terminal-first, Linux-first, keyboard-driven identity of the lab.
- Keep the tone humble and practical ("I just prefer it this way").
- Provide light, practical value by naming the tools so curious visitors can
  look them up.

## Non-Goals

- Not a detailed tutorial or setup guide.
- Not a comparison or endorsement of tools.
- No hardware, dotfiles, or OS-distro details unless explicitly requested later.
- No screenshots or terminal graphics for this version.

## Placement

Insert the new section **between About and Projects** in `pages/index.vue`:

```vue
<template>
  <div class="index">
    <HeroSection />
    <AboutSection />
    <WorkbenchSection /> <!-- new -->
    <ProjectsSection />
  </div>
</template>
```

This creates a natural narrative flow:
1. **Hero** — what this site is.
2. **About** — the mindset ("playground, not portfolio").
3. **Workbench** — the actual tools and workflow.
4. **Projects** — the results of that workflow.

## Content

### Section title

**Workbench**

Matches the "messy workbench" wording in About and keeps the lab/terminal
vibe.

### Intro paragraph

> I build everything from the terminal on Linux — not to flex, I just prefer it
> that way. No GUI IDE, no mouse-heavy workflow. Neovim is my editor, Opencode
> is the AI I pair with, and herdr keeps my terminal sessions organized.

### Tool list

Rendered as a compact definition list (term + one-line description):

| Tool | Description |
|------|-------------|
| **Linux + terminal** | My whole workflow lives in the shell. Fast, keyboard-driven, and exactly the way I like it. |
| **Neovim** | Where all the actual typing happens. |
| **Opencode** | The AI assistant I bounce ideas off and write code with. |
| **herdr** | An AI-driven terminal multiplexer built on top of tmux. |

## Component Structure

Create `components/sections/WorkbenchSection.vue`:

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

## Styling

Create `assets/css/layout/_workbench.scss` and import it in
`assets/css/main.scss` after `_about.scss`:

```scss
@import './layout/workbench';
```

Style should be consistent with existing sections:

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

Visual treatment:
- Same section padding and border-top as About, Projects, and Changelog.
- Tool items are bordered cards (similar to project cards but simpler).
- Responsive grid collapses to a single column on narrow viewports via
  `auto-fill`.

## Navigation Update

Add an anchor link in `layouts/Navigation.vue` so the section is reachable from
the sticky nav:

```vue
<a class="nav__link" href="#workbench">Workbench</a>
```

Place it between About and Projects to match the page order, or after Projects
if nav space is tight.

## Testing

- `npm run build` completes without errors.
- The new section renders between About and Projects.
- Nav link scrolls to `#workbench`.
- Responsive layout works from mobile to desktop widths.
- No new TypeScript or lint errors.

## Future Ideas (deferred)

- Add external links for each tool (Neovim, Opencode, herdr).
- Add a terminal-styled ASCII or animated prompt decoration.
- Expand into a dedicated `/uses` page if the list grows.
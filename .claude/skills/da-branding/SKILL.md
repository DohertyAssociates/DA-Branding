---
name: da-branding
description: Apply Doherty Associates (DA) branding when building or styling any UI. Use this skill whenever working on frontend code in a DA project — creating or editing React components, pages, forms, dialogs, tables, dashboards or charts; scaffolding a new app's frontend; restyling or theming; picking colours or fonts; or when the user mentions branding, house style, the design system, the @da registry, @doherty-associates/ui, or making an app consistent with other DA apps. Also use it when asked to migrate an app onto the shared component library.
---

# Doherty Associates branding

All DA applications share one branding system. It lives in
**github.com/DohertyAssociates/DA-Branding** and is consumed two ways:

| Route | How | When |
|---|---|---|
| **shadcn registry** (components copied into the app) | `@da` namespace → `https://dohertyassociates.github.io/DA-Branding/r/{name}.json` | Default for most apps; apps own the copied code |
| **npm package** | `npm install github:DohertyAssociates/DA-Branding` → import from `@doherty-associates/ui` | Apps that should track one shared version |

Check which route the app already uses (a `@da` entry in `components.json`,
or `@doherty-associates/ui` in `package.json`) and stay on it. Browse what
exists before building anything: `npx shadcn@latest list @da` (73 items) or
the visual catalogue at https://dohertyassociates.github.io/DA-Branding/ .
There is a local checkout at `C:\repos\DA-Branding` on the primary dev
machine; otherwise use the GitHub repo.

## Setting up an app that isn't connected yet

Prerequisites: React 18/19, Tailwind CSS v4 (`@tailwindcss/vite`), a `@/*`
path alias in tsconfig + vite config, and a `components.json`
(`npx shadcn@latest init`). Then:

```bash
npx shadcn@latest registry add @da=https://dohertyassociates.github.io/DA-Branding/r/{name}.json
npx shadcn@latest add @da/theme        # brand variables, palettes, Work Sans
npx shadcn@latest add @da/button @da/card ...   # whatever the app needs
```

After adding `@da/theme`, import the font once in the app entry file:
`import "@fontsource-variable/work-sans"`. On the npm route instead:
`@import "tailwindcss";` then `@import "@doherty-associates/ui/styles.css";`
in the app CSS.

## Non-negotiable styling rules

- **Never hardcode brand colours.** No `#AE1065`, `#AE4966`, `bg-[#...]`,
  inline `style={{ color: ... }}` or local `const BRAND` values. Use semantic
  classes (`bg-primary`, `text-muted-foreground`, `border-border`,
  `bg-destructive`, `bg-success`/`bg-warning`/`bg-info`) or the brand
  palettes (`bg-brand-{50..950}`, `bg-da-yellow`, `bg-da-plum`). In non-CSS
  code (docx/xlsx exporters, chart configs) import constants from
  `@doherty-associates/ui/tokens` (or `@da/tokens` on the registry route).
- **Never hand-roll primitives that exist.** Buttons, inputs, selects,
  checkboxes, dialogs, drawers, dropdowns, tooltips, tabs, tables, badges,
  alerts, toasts, spinners, steppers, empty states — all exist, themed and
  accessible. `confirm()` → `AlertDialog`; `window.prompt()` → `Dialog` +
  `Input`; success flashes → `toast()` from sonner.
- **Typography**: Work Sans everywhere (the theme provides it; Arial is the
  guideline fallback). Headings sentence case.
- **Colour balance** (brand guidelines): magenta and yellow are the
  primaries; plum is a secondary used sparingly — at most ~25% of a page.
- **Dark mode is free**: wrap the app in `ThemeProvider` and use
  `ModeToggle`; every token has a dark variant. Don't invent dark styles.

Signature brand pieces when composing headers/login screens: `DohertyIcon`
(the multi-strand "D", currentColor), `BrandMark` (icon + product name
lockup), `BrandAngle` (the 60° device, use sparingly).

## When a needed component doesn't exist

Decide where it lives (full detail: CONTRIBUTING.md in the DA-Branding repo):

1. **Brand-generic** (a second DA app could plausibly use it — a tag input,
   file-drop zone, KPI tile): build it **in DA-Branding**
   (`src/components/da/`), following its CONTRIBUTING.md checklist (tokens
   only, `cn()` + CVA, export + `registry.base.json` entry + demo + version
   bump), open a **PR** — merging to main deploys the registry — then
   consume it in the app like any other `@da` item.
2. **App-specific** (domain logic — a SharePoint tree, a report wizard
   step): build it **in the app**, composed from `@da` primitives and theme
   tokens.
3. **Unsure**: build in the app first; promote to DA-Branding when a second
   app wants it (rule of two). When promoting, the app afterwards deletes
   its local copy and installs the published `@da` item — never keep both.

## Deeper references (read when relevant)

- **MIGRATION.md** (repo root) — full old-pattern → component mapping table
  and per-app notes for dandp, labelwizard, MetadataUpdater, resilience.
- **CONTRIBUTING.md** (repo root) — governance, promotion workflow, the
  add-a-component checklist.
- **README.md** (repo root) — theming details (oklch tokens, radius scale),
  full component list, both consumption routes.
- Raw URLs work without a checkout, e.g.
  `https://raw.githubusercontent.com/DohertyAssociates/DA-Branding/main/MIGRATION.md`

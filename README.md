# @doherty-associates/ui

Doherty Associates' shared branding and UI component library, built on
[shadcn/ui](https://ui.shadcn.com), Radix and Tailwind CSS v4.

Everything is themed from the **Doherty Associates Brand Identity Guidelines**
(V14, Dec 2022 — the PDF in this repo):

| Token | Value | Guideline role |
|---|---|---|
| Magenta | `#AE1065` | Primary — buttons, links, focus rings, icon |
| Yellow | `#FFCC00` | Primary — highlights, chart accents |
| Black / White | `#000000` / `#FFFFFF` | Primary |
| Plum | `#670639` | Secondary — sparingly (≤25% of a page) |
| Font | Work Sans (variable) | Fallback: Arial |

## Preview the components

```bash
npm install
npm run dev        # opens the demo/showcase app
```

## Install in an app

The package isn't on npmjs. Install from GitHub or a local checkout (the
`prepare` script builds `dist/` automatically on git installs):

```bash
npm install github:DohertyAssociates/DA-Branding   # from the public GitHub repo
# or
npm install file:../DA-Branding          # local checkout
```

Requirements: React 18/19, Tailwind CSS v4 (`@tailwindcss/vite`).

**1. Import the theme** in your app CSS (e.g. `src/index.css`):

```css
@import "tailwindcss";
@import "@doherty-associates/ui/styles.css";
```

That single import brings in the Work Sans webfont, all brand colour
variables (light + dark), the shadcn semantic tokens, and tells Tailwind to
scan the packaged components for utility classes.

**2. Use components:**

```tsx
import { Button, Card, CardContent, BrandMark } from "@doherty-associates/ui"

<BrandMark appName="Discover & Protect" />
<Button>Save</Button>
<Button variant="destructive">Delete</Button>
```

**3. Brand tokens outside CSS** (docx/xlsx exporters, emails, chart configs):

```ts
import { brandColors, fonts, chartPalette } from "@doherty-associates/ui/tokens"

brandColors.magenta   // "#AE1065"
fonts.document        // "Arial" — for docx where Work Sans may be missing
```

**4. Brand assets:** `@doherty-associates/ui/assets/doherty-icon.svg` and
`assets/favicon.svg` (copy into `public/`), or render the icon as a component:

```tsx
import { DohertyIcon } from "@doherty-associates/ui"
<DohertyIcon className="h-8 text-primary" />
```

## What's included

**shadcn/ui components (Doherty-themed) — the complete registry set:**
accordion, alert, alert-dialog, aspect-ratio, attachment, avatar, badge,
breadcrumb, bubble, button, button-group, calendar, card, carousel, chart,
checkbox, collapsible, command, context-menu, dialog, direction, drawer,
dropdown-menu, empty, field, form, hover-card, input, input-group, input-otp,
item, kbd, label, marker, menubar, message, message-scroller, native-select,
navigation-menu, pagination, popover, progress, radio-group, resizable,
scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner
(toasts), spinner, switch, table, tabs, textarea, toggle, toggle-group,
tooltip.

(Combobox, Date Picker and Data Table on the shadcn site are composition
patterns, not installable components: Combobox = Popover + Command,
Date Picker = Popover + Calendar, and Data Table is provided here as the
`DataTable` component below. Toast is deprecated upstream in favour of
sonner.)

**DA components:**

| Component | Purpose |
|---|---|
| `DohertyIcon` | Official multi-strand "D" icon, `currentColor` |
| `BrandMark` | App-header lockup (icon + product name + tagline) |
| `BrandAngle` | The 60° angle supporting graphic |
| `PageHeader` | Page title + description + actions |
| `EmptyState` | Icon + heading + description + CTA (composes shadcn `Empty`) |
| `StatusDot` | RAG/status dot (success/warning/danger/info/neutral/brand) |
| `Stepper` | Numbered wizard stepper with progress line |
| `DataTable` | Sortable/paginated table on TanStack Table |
| `ThemeProvider` / `useTheme` | Light/dark/system theming for Vite apps (localStorage + `.dark` class) |
| `ModeToggle` | Light/Dark/System dropdown switcher |

**Extra Tailwind utilities** from the theme:

- Brand palettes: `bg-brand-{50..950}` (magenta), `bg-da-yellow-{50..900}`,
  `bg-da-plum-{50..900}`, plus `bg-brand`, `bg-da-yellow`, `bg-da-plum`
- Semantic status colours: `bg-success`, `bg-warning`, `bg-info` (+`-foreground`)
- Dark mode via the `.dark` class on `<html>` — wrap the app in
  `<ThemeProvider>` and drop in `<ModeToggle />`

## Theming

The theme follows [shadcn's theming convention](https://ui.shadcn.com/docs/theming):

- Semantic `background`/`foreground` CSS variable pairs in **oklch**, defined
  on `:root` and overridden in `.dark`, exposed to Tailwind via `@theme inline`
- The full token set: background, card, popover, primary, secondary, muted,
  accent, destructive, border, input, ring, chart-1…5, sidebar-* and radius —
  plus DA extensions success/warning/info
- Radius scale derived from a single `--radius` (0.5rem) via the documented
  multipliers (sm 0.6× → 4xl 2.6×)
- The raw brand palette (`brand-*`, `da-yellow-*`, `da-plum-*`) intentionally
  stays in hex — those are the exact guideline values
- To re-skin an app (or white-label a customer portal), override the CSS
  variables after the theme import — no component changes needed

## Distribution route 2: the @da shadcn registry

This repo is a full [shadcn registry](https://ui.shadcn.com/docs/registry):
every ui component, the DA components, the theme, the `use-mobile` hook and
the brand tokens are published as registry items — **73 items** total.
Components are *copied into* the consuming app (shadcn's model), with npm
dependencies pinned to tested versions and imports rewritten to the
consumer's own aliases.

**Hosting:** the registry deploys automatically to GitHub Pages — the
workflow in `.github/workflows/deploy.yml` builds and publishes on every push
to `main`. The same site hosts the visual component catalogue at its root.

> Registry URL: `https://dohertyassociates.github.io/DA-Branding/r/{name}.json`
> Catalogue:    `https://dohertyassociates.github.io/DA-Branding/`
> 

For local development, `npm run dev` serves the same thing at
`http://localhost:5173/r/{name}.json`. To build by hand:

```bash
npm run build:registry   # registry.base.json + generator -> public/r/*.json
```

**Consume in an app** — register the namespace once:

```bash
npx shadcn@latest registry add @da=https://dohertyassociates.github.io/DA-Branding/r/{name}.json
```

(or add `"registries": { "@da": "https://dohertyassociates.github.io/DA-Branding/r/{name}.json" }`
to `components.json`), then:

```bash
npx shadcn@latest add @da/theme        # brand vars, palettes, font, status colours
npx shadcn@latest add @da/button @da/card @da/stepper @da/data-table
npx shadcn@latest list @da             # browse everything
```

`@da/theme` merges the brand CSS variables into the app's CSS, adds the
`brand-*`/`da-yellow-*`/`da-plum-*` palettes and success/warning/info tokens,
and installs the Work Sans font package (import it once in your entry file:
`import "@fontsource-variable/work-sans"`).

**Which route to use?** npm (route 1) keeps every app on one shared version —
prefer it for the DA product apps. The registry (route 2) suits apps that
need to own/customise their component code, or partial adoption.

Registry maintenance lives in `scripts/`: `build-registry.mjs` generates
`registry.json` from `registry.base.json` (handwritten DA items) plus every
`src/components/ui/*.tsx`, auto-detecting dependencies from imports;
`postprocess-registry.mjs` rewrites relative imports to `@/` aliases in the
built JSON.

## Development

- `npm run dev` — demo app
- `npm run typecheck` — TS check for lib + demo
- `npm run build` — compile library to `dist/` + build registry to `r/`
- After adding new shadcn components (`npx shadcn@latest add <name>`), run
  `node scripts/fix-imports.mjs` to convert `@/` aliases to relative imports,
  and export the component from `src/index.ts`.

See `MIGRATION.md` for the per-app migration playbook, and `CONTRIBUTING.md`
for governance: where new components live (this repo vs the consuming app)
and how to add shared components.

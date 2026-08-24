# Migration playbook

How to move each DA application onto `@doherty-associates/ui`. This file is
written to be handed to a Claude Code session opened in the target repo
("update the UI based on what's available in @doherty-associates/ui").

## Why (state of the world, Aug 2026)

All four apps are React + Vite + Tailwind v4 + TypeScript + lucide-react with
**no component library** — every button/card/dialog is hand-rolled. Branding
drift found in the audit:

- `#AE1065` hardcoded ~200+ times (inline `style={{}}`, `bg-[#AE1065]`, local
  `const BRAND` consts) instead of tokens
- **labelwizard's wizard app uses the wrong primary**: `#AE4966` (131×) —
  the brand magenta is `#AE1065`
- Work Sans (the brand font) only loaded in labelwizard; everywhere else
  silently falls back to system fonts
- Inconsistent hover-darks: `#8B0D51`, `#8D0D51`, `#8E0D52`, `#8d3a51` all in
  use for the same purpose (token: `brand-700` / `--primary` states)
- Native `confirm()` / `window.prompt()` for destructive actions
- No toasts anywhere; errors live in ad-hoc coloured boxes
- Near-zero ARIA — the Radix primitives in this package fix that for free

## Two distribution routes

- **npm package (default)** — `npm install file:../DA-Branding`; apps import
  components. One shared version everywhere. The steps below assume this.
- **shadcn registry** — components are *copied into* the app:
  `npx shadcn@latest registry add @da=http://localhost:5173/r/{name}.json`
  (DA-Branding's `npm run dev` must be serving, or use wherever `public/r`
  is hosted), then `npx shadcn@latest add @da/theme @da/button …`.
  Use when an app needs to own/customise the component code. The mapping
  table below applies identically — the component names are the same.

## Standard migration steps (every app)

1. **Install**: `npm install file:../DA-Branding` (or the git/feed URL).
2. **Theme**: replace the app's `@theme` block in `src/index.css` with:
   ```css
   @import "tailwindcss";
   @import "@doherty-associates/ui/styles.css";
   ```
   Delete local `--color-primary`/`--color-brand*` definitions and any
   `@fontsource` imports (the package brings Work Sans).
3. **Kill hardcoded brand hexes**: replace `#AE1065`/`#AE4966`/`#8B0D51` etc.
   with token classes (`bg-primary`, `text-primary`, `hover:bg-brand-700`,
   `focus-visible:ring-primary`) or, in non-CSS code, with
   `import { brandColors } from "@doherty-associates/ui/tokens"`.
4. **Swap primitives** (find → replace with package component):
   | Current pattern | Replace with |
   |---|---|
   | `bg-brand-600 text-white rounded-md hover:...` buttons | `<Button>` |
   | `bg-gray-100 text-gray-700` buttons | `<Button variant="secondary">` |
   | Text/cancel buttons | `<Button variant="ghost">` |
   | Red delete buttons | `<Button variant="destructive">` |
   | Icon-only `p-1 text-gray-400` buttons | `<Button variant="ghost" size="icon">` |
   | `bg-white rounded-lg shadow-sm border` + header div | `<Card>`/`<CardHeader>`/`<CardContent>` |
   | `<input>` with border/focus classes | `<Input>` (+ `<Label>`) |
   | Native `<select>` | `<Select>` |
   | Native checkbox / fake div-checkbox | `<Checkbox>` |
   | `border-b-2` underline tab bars | `<Tabs>` |
   | `px-2 py-1 text-xs bg-X-100 text-X-700 rounded` pills | `<Badge>` |
   | `bg-red-50 border-red-200 p-4` boxes (and green/amber/blue) | `<Alert>` / `toast()` from sonner |
   | `fixed inset-0 bg-black/50` modals | `<Dialog>` |
   | `confirm()` before delete | `<AlertDialog>` |
   | `window.prompt()` | `<Dialog>` + `<Input>` |
   | Hand-rolled slide-over drawers | `<Sheet>` |
   | Hamburger/actions dropdown with outside-click hacks | `<DropdownMenu>` |
   | `title="..."` attributes | `<Tooltip>` |
   | `Loader2 animate-spin` / border spinners | `<Spinner>` (size via className, e.g. `className="size-6"`) |
   | Search input with positioned icon | `<InputGroup>` + `<InputGroupAddon>` |
   | Native `<select>` kept native | `<NativeSelect>` (or `<Select>` for the Radix version) |
   | Label + input + help/error text stacks | `<Field>` family |
   | Segmented/grouped buttons | `<ButtonGroup>` |
   | Keyboard hints in help pages | `<Kbd>` |
   | `w-full bg-gray-200 rounded-full h-*` bars | `<Progress>` |
   | Centered icon + heading + CTA blocks | `<EmptyState>` |
   | `w-2 h-2 rounded-full bg-green-400` dots | `<StatusDot>` |
   | Raw `<table>` with `bg-gray-50` thead | `<Table>` or `<DataTable>` |
   | Custom numbered-step wizard rails | `<Stepper>` |
   | Header icon + app name | `<BrandMark appName="…" />` |
5. **Success flashes / setTimeout messages** → `toast.success()` (mount
   `<Toaster richColors />` once in the app root).
   **Dark mode (optional but free):** wrap the app root in `<ThemeProvider>`
   and add `<ModeToggle />` to the header — every token has a dark variant.
6. **Favicon/logo**: copy `assets/favicon.svg` from the package into
   `public/`, reference it in `index.html`; use `<DohertyIcon>`/`<BrandMark>`
   in headers and login screens.
7. Keep domain components (trees, wizards, report steps) — restyle their
   *internals* with package primitives; don't try to genericise them.
8. **Need something that doesn't exist?** See CONTRIBUTING.md in DA-Branding:
   brand-generic → build it there and consume it; app-specific → build it in
   the app from registry primitives and tokens. Rule of two for grey areas.

## Per-app notes

### dandp (`C:\repos\dandp`) — DiscoverAndProtect.Frontend
- 191 hardcoded `#AE1065` occurrences, mostly inline `style={{}}` — highest
  token cleanup volume. `#8B0D51`/`#8D0D51` hover-darks → `brand-700`.
- ~35 alert boxes → `<Alert>`; delete-confirm modals in AllowedUsersPage →
  `<AlertDialog>`; introduce sonner (no toasts today).
- `StepperNavigation.tsx` → package `<Stepper>`.
- `utils/reportGenerator.ts`, `utils/htmlDashboardExporter.ts`,
  `utils/permissionsExport.ts`, `StorageTrendCard.tsx` each declare local
  `BRAND` consts → `brandColors`/`chartPalette` from `/tokens`.
- `DiscoverAndProtect.Worker/frontend` looks like an abandoned duplicate of
  the main frontend — confirm and delete rather than migrate.
- No logo assets at all; favicon reference in index.html is broken (`/vite.svg`
  missing) — fix with package favicon.
- Keep bespoke: permissions trees, report wizard steps (dedupe the two
  divergent copies in CustomerDetailPage/ScanDetailPage while you're there),
  UsageChart (recolour via `chartPalette`).

### labelwizard (`C:\repos\labelwizard`) — two apps
- **frontend (wizard): the primary is the wrong colour.** Replace all 131
  `#AE4966` (and `#8d3a51`, `#7a2f48`, `#FDE8ED`, `#F4C6D2`) with brand
  tokens — visual change is intended and correct per the guidelines.
- `common/Card.tsx` → `<Card>`; `common/Drawer.tsx` + the duplicate drawer in
  `CustomSITManager` → `<Sheet>`; `common/FormActions` → `<Button>` pairs;
  `SitPickerModal` → `<Dialog>` + `<Command>` + `<Checkbox>`;
  `LocationPicker` → `<Checkbox>`/`<RadioGroup>`.
- Wizard actions dropdown (duplicated desktop/mobile) → `<DropdownMenu>`;
  "Reset to defaults?" → `<AlertDialog>`; import modal → `<Dialog>`;
  export success flash → sonner.
- `StepperNavigation.tsx` → package `<Stepper>`.
- The triplicated input class string → `<Input>`.
- **status-web**: `DataTable.tsx` → package `<DataTable>`; `LabelPill`/
  `OutcomeBadge` → `<Badge>`; `window.prompt` rename → `<Dialog>`;
  `TenantSwitcher` → `<Select>`. Its `#AE1065` consts → tokens.
- Both apps already load Work Sans via @fontsource — remove those imports
  (package provides the variable font).

### MetadataUpdater (`C:\repos\MetadataUpdater`) — MetadataUpdater.Frontend
- Cleanest migration; its `--color-brand-*` scale matches the package's
  `brand-*` — delete the local `@theme` block entirely.
- ~14 primary buttons, ~12 inputs, ~10 cards, tab bar in CustomerPage,
  4 native `confirm()` calls → `<AlertDialog>`, `title=` tooltips →
  `<Tooltip>`, ContentTypeHub expand rows → `<Accordion>`/`<Collapsible>`,
  ApplyContentTypes fake checkboxes → `<Checkbox>`.
- Inline `style={{ color: '#AE1065' }}` in Layout.tsx → `text-primary`;
  replace the Sparkles-icon header with `<BrandMark appName="SharePoint Data Enricher" />`.
- `DashboardPage.tsx` is unrouted dead code — confirm before migrating.
- Keep bespoke: SiteTreeView (restyle internals), consent-error panel
  (→ `<Alert>` shell).

### resilience (`C:\repos\resilience`) — frontend only (see scoping note)
- Smallest React surface (~1.6k lines, zero form inputs). Add package, swap
  the 9 inline `#AE1065` styles, `ui/Tooltip.tsx` → package `<Tooltip>`,
  Navigation dropdown → `<DropdownMenu>`, cards → `<Card>`, spinners/error
  boxes → `<Spinner>`/`<Alert>`.
- `StatusDot`/`TrafficLight` duplicate `getStatusColor` → package
  `<StatusDot>` (keep TrafficLight bespoke, recolour via tokens).
- `DashboardHeader` references Work Sans but never loads it — fixed
  automatically by the theme import.
- Delete `src/App.css` (dead Vite scaffolding).
- **Out of scope for this package**: the three iframe'd report HTML templates
  (~4k lines, own blue palette) and the FastAPI/Jinja admin (Bootstrap/Tabler
  + Tailwind CDN). If wanted later: a plain-CSS brand variables file could be
  added to the package for those surfaces to `@import`.

## Suggested prompt for each app's Claude session

> Migrate this app's UI to `@doherty-associates/ui` (installed from
> `file:../DA-Branding`). Follow `MIGRATION.md` in that repo: import the
> theme CSS, remove all hardcoded brand hex values in favour of tokens,
> and replace hand-rolled primitives with the package components listed in
> the mapping table. Work page by page; keep domain components but restyle
> their internals. Verify with the dev server after each page.

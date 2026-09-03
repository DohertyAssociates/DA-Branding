# Contributing & governance

How components flow between this repo and the applications that consume it.
Written to be followed by developers and by Claude Code sessions working in
consumer apps.

## The flow is one-way

This repo **publishes**; apps **consume**. The shadcn registry copies code
into an app — nothing is ever written back automatically. New shared
components are added *here* by hand (see below), rebuilt, and then pulled by
apps.

Updates: when a component changes here, consumer apps re-sync with
`npx shadcn@latest add @da/<name> --overwrite` (registry route) or by bumping
the package (npm route). If an app has locally modified a copied component,
`--overwrite` will discard those edits — promote the modification here
instead, or accept the divergence knowingly.

## Where does a new component live?

Ask: **would a second DA application plausibly use this?**

| Kind of thing | Lives | Examples |
|---|---|---|
| Brand-generic primitive or pattern | **This repo** (`src/components/da/`) | tag input, file-drop zone, KPI stat tile, confirmation pattern |
| Domain/app-specific | **The app** | SharePoint permission tree, report wizard steps, licence selector |
| Not sure yet | **The app first** — promote here when a second app needs it (rule of two) | |

Domain components staying in an app must still be *composed from* registry
primitives and tokens: shadcn/DA components inside, semantic Tailwind classes
(`bg-primary`, `text-muted-foreground`, `bg-brand-600`), never hardcoded hex
values, never hand-rolled buttons/inputs/dialogs.

## Promoting a component from an app into the registry

When an app has built something (per the rules above: composed from @da
primitives, theme tokens only) and it turns out to be reusable:

1. Branch this repo (`git checkout -b add/<component-name>`).
2. Copy the component into `src/components/da/<kebab-name>.tsx`; strip
   app-specific logic — that stays in the app as a thin wrapper around the
   promoted component.
3. Follow "Adding a shared component" below (exports, registry.base.json,
   demo, build, version bump).
4. Push the branch and open a PR. **Merging to `main` is releasing** — the
   GitHub Pages workflow redeploys the registry on every push to main — so
   PRs get a brand/API review before merge (keep `main` branch-protected).
5. After merge (~1 min to deploy), the originating app deletes its local
   copy and consumes the shared one: `npx shadcn@latest add @da/<name>`
   (or via the npm package). Do not keep the private copy — that recreates
   the drift this repo exists to prevent.

Note: registry consumers always receive the latest version — there is no
per-app pinning on the registry route. Additive changes (new components,
new variants) are safe any time; breaking changes to an existing component
must be coordinated with the consuming apps like any API change.

## Adding a shared component to this repo

1. Create it in `src/components/da/<kebab-name>.tsx`:
   - style with semantic tokens (`bg-primary`, `border-border`, `bg-success`)
     or brand palette utilities (`bg-brand-600`, `text-da-plum`) — **no raw
     hex values**; if a colour is missing, add it to
     `src/styles/doherty.css` (and `registry.base.json` theme item) instead
   - use `cn()` for class merging and `class-variance-authority` for variants
   - build interactive behaviour on the existing ui primitives (Radix-based)
     rather than hand-rolling focus/keyboard/ARIA handling
   - use **relative imports** (`../../lib/utils`, `../ui/button`) — the
     registry build rewrites them to `@/` aliases automatically
   - follow the brand guidelines PDF: Work Sans, sentence-case headings,
     magenta/yellow as primaries, plum sparingly (≤25% of a page)
2. Export it from `src/index.ts` (npm consumers).
3. Add an item for it in `registry.base.json` (registry consumers) — name,
   type `registry:component`, title, description, files. Dependencies are
   auto-detected from its imports at build time.
4. Showcase it in the demo (`demo/sections/`) so it's visible in the catalogue.
5. `npm run build` (rebuilds `dist/` and `public/r/`), and `npm run typecheck`.
6. Bump the `version` in `package.json` (semver) and commit.

Consumer apps then pick it up with `npx shadcn@latest add @da/<name>` or an
npm update.

## Prompt to give a consumer app's Claude session

> Our shared branding lives in the `@da` shadcn registry
> (`npx shadcn@latest registry add @da=https://dohertyassociates.github.io/DA-Branding/r/{name}.json`;
> browse with `npx shadcn@latest list @da`) and the `@doherty-associates/ui`
> npm package (`npm install github:DohertyAssociates/DA-Branding`, or the local
> checkout at `C:\repos\DA-Branding`). Use what's there. If you need a component that
> doesn't exist: if it's brand-generic and reusable, create it in
> `C:\repos\DA-Branding` following its CONTRIBUTING.md and consume it from
> there; if it's specific to this application, build it in this app but
> compose it from registry primitives and theme tokens — never hardcode
> brand colours or hand-roll primitives the registry already provides.
> If an app-built component later proves reusable, promote it via a PR to
> DA-Branding (see "Promoting a component" in its CONTRIBUTING.md), then
> replace the app's local copy with the published @da item.

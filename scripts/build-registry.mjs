// Generates registry.json per https://ui.shadcn.com/docs/registry:
//  - starts from the handwritten items in registry.base.json (theme + DA components)
//  - appends every src/components/ui/*.tsx as a registry:ui item
//  - appends the use-mobile hook and the brand tokens lib
//  - auto-detects npm `dependencies` from each file's imports
//  - auto-detects `registryDependencies` from internal relative imports
//    ("@da/<name>" for our own items, "utils" for the shared cn helper)
// Run via `npm run build:registry` (which then runs `shadcn build`).
import { readdirSync, readFileSync, writeFileSync } from "node:fs"
import { basename, join } from "node:path"

const root = process.cwd()
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"))
const base = JSON.parse(readFileSync(join(root, "registry.base.json"), "utf8"))

const NPM_DEPS = new Set(Object.keys(pkg.dependencies ?? {}))
// Provided by the consumer app itself.
const IGNORE = new Set(["react", "react-dom"])

function analyse(filePath) {
  const src = readFileSync(filePath, "utf8")
  const deps = new Set()
  const registryDeps = new Set()
  for (const match of src.matchAll(/from\s+["']([^"']+)["']/g)) {
    const spec = match[1]
    if (spec.startsWith(".")) {
      if (spec.includes("lib/utils")) registryDeps.add("utils")
      else if (spec.includes("hooks/use-mobile")) registryDeps.add("@da/use-mobile")
      else registryDeps.add("@da/" + basename(spec))
      continue
    }
    const pkgName = spec.startsWith("@")
      ? spec.split("/").slice(0, 2).join("/")
      : spec.split("/")[0]
    if (IGNORE.has(pkgName)) continue
    // Pin to this package's tested version range so consumers never pull a
    // breaking major (e.g. @tanstack/react-table v9 vs the v8 API we use).
    if (NPM_DEPS.has(pkgName))
      deps.add(`${pkgName}@${pkg.dependencies[pkgName]}`)
  }
  return {
    dependencies: [...deps].sort(),
    registryDependencies: [...registryDeps].sort(),
  }
}

function item(name, type, title, description, files, extra = {}) {
  const merged = { dependencies: new Set(), registryDependencies: new Set() }
  for (const f of files) {
    const a = analyse(join(root, f.path))
    a.dependencies.forEach((d) => merged.dependencies.add(d))
    a.registryDependencies.forEach((d) => merged.registryDependencies.add(d))
  }
  // An item never depends on itself.
  merged.registryDependencies.delete("@da/" + name)
  const out = { name, type, title, description, files, ...extra }
  if (merged.dependencies.size) out.dependencies = [...merged.dependencies].sort()
  if (merged.registryDependencies.size)
    out.registryDependencies = [...merged.registryDependencies].sort()
  return out
}

const titleCase = (s) =>
  s.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ")

// --- ui components -------------------------------------------------------
const uiDir = join(root, "src", "components", "ui")
const uiItems = readdirSync(uiDir)
  .filter((f) => f.endsWith(".tsx"))
  .map((f) => {
    const name = f.replace(/\.tsx$/, "")
    return item(
      name,
      "registry:ui",
      titleCase(name),
      `${titleCase(name)} component, themed for Doherty Associates.`,
      [{ path: `src/components/ui/${f}`, type: "registry:ui" }]
    )
  })

// --- hook + tokens lib ----------------------------------------------------
const hookItem = item(
  "use-mobile",
  "registry:hook",
  "Use Mobile",
  "Hook that reports whether the viewport is below the mobile breakpoint.",
  [{ path: "src/hooks/use-mobile.ts", type: "registry:hook" }]
)

const tokensItem = item(
  "tokens",
  "registry:lib",
  "Brand Tokens",
  "Doherty Associates brand colours and fonts as plain JS constants, for docx/xlsx exporters and chart configs.",
  [
    {
      path: "src/tokens/index.ts",
      type: "registry:lib",
      target: "lib/da-tokens.ts",
    },
  ]
)

// --- DA components from registry.base.json --------------------------------
// Re-analyse their files so dependencies stay in sync with the source, but
// keep their handwritten titles/descriptions/cssVars.
const baseItems = base.items.map((it) => {
  if (!it.files?.length) return it // e.g. the theme item (cssVars only)
  const analysed = item(
    it.name,
    it.type,
    it.title,
    it.description,
    it.files,
    it.cssVars ? { cssVars: it.cssVars } : {}
  )
  return analysed
})

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "da",
  homepage: base.homepage ?? "https://doherty.co.uk",
  items: [...baseItems, ...uiItems, hookItem, tokensItem],
}

writeFileSync(join(root, "registry.json"), JSON.stringify(registry, null, 2))
console.log(
  `build-registry: wrote registry.json with ${registry.items.length} items ` +
    `(${baseItems.length} DA + ${uiItems.length} ui + hook + tokens)`
)

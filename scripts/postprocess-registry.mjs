// Rewrites relative imports to "@/" alias imports inside the BUILT registry
// JSON (public/r/*.json), per the shadcn registry convention. The shadcn CLI
// rewrites "@/..." to each consumer's own aliases at install time; relative
// imports would break because registry targets don't mirror this repo's
// src/components/da nesting. Source files are untouched (the npm build
// needs their relative imports).
import { readdirSync, readFileSync, writeFileSync } from "node:fs"
import { join, posix, dirname } from "node:path"

const R = join(process.cwd(), "public", "r")

// Maps a source-file-relative import to the consumer's "@/" path.
function rewrite(sourcePath, spec) {
  // sourcePath e.g. "src/components/da/data-table.tsx"
  const srcRelDir = posix.dirname(sourcePath.replaceAll("\\", "/")).replace(/^src\//, "")
  let resolved = posix.normalize(posix.join(srcRelDir, spec))
  // DA components install at the consumer's components/ root, not components/da/
  resolved = resolved.replace(/^components\/da\//, "components/")
  // tokens lib installs as lib/da-tokens
  resolved = resolved.replace(/^tokens(\/index)?$/, "lib/da-tokens")
  return "@/" + resolved
}

let files = 0
let rewrites = 0
for (const entry of readdirSync(R)) {
  if (!entry.endsWith(".json") || entry === "registry.json") continue
  const path = join(R, entry)
  const item = JSON.parse(readFileSync(path, "utf8"))
  let changed = false
  for (const file of item.files ?? []) {
    if (!file.content) continue
    const updated = file.content.replace(
      /(from\s+["'])(\.\.?\/[^"']+)(["'])/g,
      (_m, pre, spec, post) => {
        rewrites++
        return pre + rewrite(file.path, spec) + post
      }
    )
    if (updated !== file.content) {
      file.content = updated
      changed = true
    }
  }
  if (changed) {
    writeFileSync(path, JSON.stringify(item, null, 2))
    files++
  }
}
console.log(`postprocess-registry: rewrote ${rewrites} import(s) in ${files} item file(s)`)

// Rewrites shadcn's "@/..." alias imports to relative paths so the library
// can be compiled with plain tsc and consumed from node_modules.
// Run automatically as part of `npm run build:lib`; safe to re-run any time
// (e.g. after `npx shadcn add <component>` pulls in new files).
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs"
import { join, relative, dirname, posix } from "node:path"

const SRC = join(process.cwd(), "src")

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) yield* walk(full)
    else if (/\.(ts|tsx)$/.test(entry)) yield full
  }
}

let changed = 0
for (const file of walk(SRC)) {
  const original = readFileSync(file, "utf8")
  const updated = original.replace(
    /(["'])@\/([^"']+)\1/g,
    (_match, quote, target) => {
      let rel = posix.join(
        ...relative(dirname(file), join(SRC, target)).split(/[\\/]/)
      )
      if (!rel.startsWith(".")) rel = "./" + rel
      return `${quote}${rel}${quote}`
    }
  )
  if (updated !== original) {
    writeFileSync(file, updated)
    changed++
  }
}
console.log(`fix-imports: rewrote ${changed} file(s)`)

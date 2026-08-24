// Copies non-TS build artifacts into dist/ after tsc:
//  - the brand theme CSS (exported as "@doherty-associates/ui/styles.css")
import { copyFileSync, mkdirSync } from "node:fs"
import { join } from "node:path"

const root = process.cwd()
mkdirSync(join(root, "dist"), { recursive: true })
copyFileSync(
  join(root, "src", "styles", "doherty.css"),
  join(root, "dist", "doherty.css")
)
console.log("copy-assets: dist/doherty.css written")

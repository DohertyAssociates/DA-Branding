// Publishes the registry catalog alongside the built items so
// `shadcn list @da` / `shadcn search @da` can discover them
// (catalog URL convention: <base>/r/registry.json).
import { copyFileSync } from "node:fs"

copyFileSync("registry.json", "public/r/registry.json")
console.log("copy-registry-index: public/r/registry.json written")

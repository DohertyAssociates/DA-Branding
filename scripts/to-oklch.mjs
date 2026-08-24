// One-off: converts hex colours to oklch() inside the :root and .dark blocks
// of src/styles/doherty.css, per https://ui.shadcn.com/docs/theming.
// Exact sRGB -> OKLab -> OKLCH math (Björn Ottosson's reference constants).
import { readFileSync, writeFileSync } from "node:fs"

const FILE = "src/styles/doherty.css"

function hexToOklch(hex) {
  const n = hex.replace("#", "")
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255)
  const lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  const [lr, lg, lb] = [lin(r), lin(g), lin(b)]
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb)
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb)
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb)
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
  const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  const C = Math.sqrt(a * a + bb * bb)
  let H = (Math.atan2(bb, a) * 180) / Math.PI
  if (H < 0) H += 360
  const fmt = (v, d) => Number(v.toFixed(d))
  return C < 0.0002
    ? `oklch(${fmt(L, 4)} 0 0)`
    : `oklch(${fmt(L, 4)} ${fmt(C, 4)} ${fmt(H, 2)})`
}

const css = readFileSync(FILE, "utf8")
const start = css.indexOf(":root {")
const end = css.indexOf("@theme inline")
if (start === -1 || end === -1) throw new Error("markers not found")

const head = css.slice(0, start)
const body = css.slice(start, end)
const tail = css.slice(end)

const converted = body.replace(/#([0-9a-fA-F]{6})\b/g, (m) => hexToOklch(m))
writeFileSync(FILE, head + converted + tail)
console.log("converted :root/.dark hex values to oklch")

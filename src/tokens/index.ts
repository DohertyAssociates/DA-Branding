/**
 * Doherty Associates brand tokens as plain JavaScript constants.
 *
 * Use these anywhere CSS variables can't reach: docx/xlsx report generators,
 * standalone HTML exporters, emails, chart configs rendered off-DOM, etc.
 *
 * Source: "Doherty Associates Brand Identity Guidelines" (V14, Dec 2022).
 */

/** Guideline primary colours. */
export const brandColors = {
  /** Pantone 227c */
  magenta: "#AE1065",
  /** Pantone 116c */
  yellow: "#FFCC00",
  black: "#000000",
  white: "#FFFFFF",
  /** Pantone 222 — secondary; use sparingly (max ~25% of a page) */
  plum: "#670639",
} as const

/** Derived magenta tint scale (600 = exact brand hex). */
export const magentaScale = {
  50: "#FDF2F8",
  100: "#FCE7F0",
  200: "#FBCFE1",
  300: "#F8A8C9",
  400: "#F272A6",
  500: "#D63384",
  600: "#AE1065",
  700: "#8F0D53",
  800: "#760C46",
  900: "#630D3C",
  950: "#3D0623",
} as const

/** Derived yellow tint scale (500 = exact brand hex). */
export const yellowScale = {
  50: "#FFFBE6",
  100: "#FFF5BF",
  200: "#FFEA80",
  300: "#FFDF40",
  400: "#FFD51A",
  500: "#FFCC00",
  600: "#D9AD00",
  700: "#B38F00",
  800: "#8C7000",
  900: "#665200",
} as const

/** Derived plum tint scale (600 = exact brand hex). */
export const plumScale = {
  50: "#F9EDF3",
  100: "#F2D8E4",
  200: "#E3AEC7",
  300: "#CF7FA5",
  400: "#A94C77",
  500: "#870F4D",
  600: "#670639",
  700: "#57052F",
  800: "#470427",
  900: "#38031F",
} as const

/**
 * Brand font stack (guidelines: Work Sans; Arial when Work Sans is
 * unavailable). For docx exports use `fonts.document`.
 */
export const fonts = {
  /** CSS font-family stack */
  sans: '"Work Sans Variable", "Work Sans", Arial, Helvetica, sans-serif',
  /** Primary brand typeface name */
  primary: "Work Sans",
  /** Guideline fallback — use in docx/xlsx where Work Sans may not be installed */
  document: "Arial",
} as const

/** Ordered categorical palette for charts (brand primaries first). */
export const chartPalette = [
  brandColors.magenta,
  brandColors.yellow,
  brandColors.plum,
  magentaScale[400],
  "#737373",
] as const

/** Convenience aliases matching the CSS custom properties. */
export const semanticColors = {
  primary: brandColors.magenta,
  primaryDark: magentaScale[700],
  destructive: "#DC2626",
  success: "#15803D",
  warning: "#B45309",
  info: "#1D4ED8",
} as const

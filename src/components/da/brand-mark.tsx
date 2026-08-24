import * as React from "react"

import { cn } from "../../lib/utils"
import { DohertyIcon } from "./doherty-icon"

interface BrandMarkProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Product/application name shown next to the icon (e.g. "Discover & Protect"). */
  appName?: string
  /** Optional smaller line under the app name. */
  tagline?: string
  /** Icon height. */
  size?: "sm" | "md" | "lg"
}

const iconSizes = { sm: "h-6", md: "h-8", lg: "h-12" }
const nameSizes = { sm: "text-base", md: "text-lg", lg: "text-2xl" }

/**
 * Standard app-header lockup: the Doherty icon plus the product name in
 * Work Sans. Use it in navbars, login screens and splash pages so every
 * DA application identifies itself the same way.
 *
 *   <BrandMark appName="Discover & Protect" />
 *   <BrandMark appName="Bulk Labeller" tagline="Doherty Associates" size="lg" />
 */
export function BrandMark({
  appName,
  tagline,
  size = "md",
  className,
  ...props
}: BrandMarkProps) {
  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
      <DohertyIcon className={cn(iconSizes[size], "w-auto shrink-0 text-primary")} />
      {(appName || tagline) && (
        <div className="flex flex-col justify-center">
          {appName && (
            <span className={cn("font-bold leading-tight text-foreground", nameSizes[size])}>
              {appName}
            </span>
          )}
          {tagline && (
            <span className="text-xs font-medium leading-tight text-muted-foreground">
              {tagline}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

import * as React from "react"

import { cn } from "../../lib/utils"
import { DohertyIcon } from "./doherty-icon"

/**
 * Login / splash screen: magenta background, the outline Doherty mark a shade
 * darker bleeding off the left edge (the artwork is cut there), content right of
 * centre on wide screens. Put a BrandSplashPanel inside.
 *
 *   <BrandSplash>
 *     <BrandSplashPanel>
 *       <BrandMark appName="SmartPath" size="lg" className="justify-center" />
 *       ...sign-in form or button
 *     </BrandSplashPanel>
 *   </BrandSplash>
 */
export function BrandSplash({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative flex min-h-screen items-center justify-center overflow-hidden bg-primary px-4 lg:justify-end lg:pr-[10vw]",
        className
      )}
      {...props}
    >
      <DohertyIcon className="pointer-events-none absolute top-1/2 left-0 h-[95vh] w-auto -translate-y-1/2 text-black/[0.07]" />
      <div className="relative w-full max-w-md">{children}</div>
    </div>
  )
}

/** Pale brand panel for BrandSplash content (dark mode: card colour). */
export function BrandSplashPanel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-lg bg-brand-50 p-8 text-center shadow-2xl dark:bg-card", className)}
      {...props}
    />
  )
}

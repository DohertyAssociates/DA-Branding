import * as React from "react"

import { cn } from "../../lib/utils"

interface BrandAngleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Direction of the diagonal. */
  direction?: "left" | "right"
  /** Colour of the band; defaults to brand magenta. */
  tone?: "magenta" | "yellow" | "plum" | "black"
}

const tones = {
  magenta: "bg-primary",
  yellow: "bg-da-yellow",
  plum: "bg-da-plum",
  black: "bg-black",
}

/**
 * The "60° angle" supporting graphic from the brand guidelines — a
 * diagonal band echoing the angle in the Doherty icon. Use sparingly to
 * add dynamism to hero sections, login screens and report headers.
 *
 *   <div className="relative h-40 overflow-hidden">
 *     <BrandAngle className="absolute inset-y-0 right-0 w-24" />
 *   </div>
 */
export function BrandAngle({
  direction = "right",
  tone = "magenta",
  className,
  ...props
}: BrandAngleProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none",
        tones[tone],
        direction === "right" ? "-skew-x-[30deg]" : "skew-x-[30deg]",
        className
      )}
      {...props}
    />
  )
}

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const statusDotVariants = cva("inline-block shrink-0 rounded-full", {
  variants: {
    status: {
      success: "bg-success",
      warning: "bg-warning",
      danger: "bg-destructive",
      info: "bg-info",
      neutral: "bg-muted-foreground/40",
      brand: "bg-primary",
    },
    size: {
      sm: "size-2",
      md: "size-2.5",
      lg: "size-3",
    },
  },
  defaultVariants: { status: "neutral", size: "md" },
})

interface StatusDotProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusDotVariants> {
  /** Optional text label rendered next to the dot. */
  label?: string
}

/**
 * RAG/status indicator dot. Replaces the hand-rolled `w-2 h-2 rounded-full`
 * dots and duplicated `getStatusColor` maps across DA apps.
 */
export function StatusDot({
  status,
  size,
  label,
  className,
  ...props
}: StatusDotProps) {
  const dot = (
    <span
      className={cn(statusDotVariants({ status, size }), className)}
      aria-hidden={label ? undefined : true}
      {...props}
    />
  )
  if (!label) return dot
  return (
    <span className="inline-flex items-center gap-2 text-sm text-foreground">
      {dot}
      {label}
    </span>
  )
}

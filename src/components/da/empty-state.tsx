import * as React from "react"
import type { LucideIcon } from "lucide-react"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty"

interface EmptyStateProps extends React.ComponentProps<typeof Empty> {
  /** Lucide icon shown above the title. */
  icon?: LucideIcon
  title: string
  description?: string
  /** Call-to-action, usually a <Button>. */
  action?: React.ReactNode
}

/**
 * Convenience wrapper over the shadcn Empty primitives: centred icon,
 * heading, description and optional CTA in one prop-driven component.
 * Replaces the ~10 hand-rolled empty-state blocks across DA apps.
 * For custom layouts, compose Empty/EmptyHeader/EmptyMedia/... directly.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <Empty className={className} {...props}>
      <EmptyHeader>
        {Icon && (
          <EmptyMedia variant="icon">
            <Icon />
          </EmptyMedia>
        )}
        <EmptyTitle>{title}</EmptyTitle>
        {description && <EmptyDescription>{description}</EmptyDescription>}
      </EmptyHeader>
      {action && <EmptyContent>{action}</EmptyContent>}
    </Empty>
  )
}

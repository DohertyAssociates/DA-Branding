import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

// brand: white card, soft shadow, magenta header band (title bold Work Sans, light secondary text, labels and
// white-outline buttons inside the band)
const BAND = "[&_[data-slot=card-header]]"
const cardVariants = cva("flex flex-col text-card-foreground", {
  variants: {
    variant: {
      default: "gap-6 rounded-xl border bg-card py-6 shadow-sm",
      brand: [
        "overflow-hidden rounded-lg bg-card shadow-md",
        "[&>[data-slot=card-header]]:bg-primary [&>[data-slot=card-header]]:py-4 [&>[data-slot=card-header]]:text-primary-foreground",
        "[&>[data-slot=card-content]]:py-5 [&>[data-slot=card-footer]]:pb-5",
        "[&_[data-slot=card-title]]:text-lg [&_[data-slot=card-title]]:font-bold",
        `${BAND}_[data-slot=card-description]:text-primary-foreground/85 ${BAND}_label:text-primary-foreground/85`,
        `${BAND}_.text-muted-foreground:text-primary-foreground/85`,
        `${BAND}_[data-slot=button]:border ${BAND}_[data-slot=button]:border-primary-foreground/70`,
        `${BAND}_[data-slot=button]:bg-transparent ${BAND}_[data-slot=button]:text-primary-foreground`,
        `${BAND}_[data-slot=button]:shadow-none ${BAND}_[data-slot=button]:hover:bg-primary-foreground/15`,
      ].join(" "),
    },
  },
  defaultVariants: { variant: "default" },
})

function Card({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      data-variant={variant ?? "default"}
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  cardVariants,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}

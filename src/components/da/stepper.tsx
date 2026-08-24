import * as React from "react"
import { Check, ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "../../lib/utils"

export interface StepperStep {
  /** Unique id for the step. */
  id: string
  /** Label shown under the step circle. */
  label: string
  /** Steps that are not yet available (e.g. licence-gated) render dimmed and unclickable. */
  disabled?: boolean
}

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: StepperStep[]
  /** Index of the current step. */
  currentStep: number
  /** Called when the user clicks a step circle or the prev/next chevrons. */
  onStepChange?: (index: number) => void
  /** Show previous/next chevron buttons at each end. */
  showArrows?: boolean
  size?: "sm" | "md" | "lg"
}

const circleSizes = {
  sm: "size-7 text-xs",
  md: "size-9 text-sm",
  lg: "size-11 text-base",
}
const labelSizes = { sm: "text-[11px]", md: "text-xs", lg: "text-sm" }

/**
 * Numbered wizard stepper with progress line — the shared replacement for
 * the bespoke StepperNavigation components in Discover & Protect and
 * Label Wizard. Completed steps show a tick; the current step is
 * highlighted in brand magenta.
 */
export function Stepper({
  steps,
  currentStep,
  onStepChange,
  showArrows = false,
  size = "md",
  className,
  ...props
}: StepperProps) {
  const canGo = (index: number) =>
    index >= 0 && index < steps.length && !steps[index]?.disabled

  return (
    <div className={cn("flex w-full items-center gap-2", className)} {...props}>
      {showArrows && (
        <button
          type="button"
          aria-label="Previous step"
          disabled={!canGo(currentStep - 1)}
          onClick={() => onStepChange?.(currentStep - 1)}
          className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronLeft className="size-5" />
        </button>
      )}

      <ol className="flex flex-1 items-start">
        {steps.map((step, index) => {
          const isComplete = index < currentStep
          const isCurrent = index === currentStep
          const isLast = index === steps.length - 1
          return (
            <li key={step.id} className={cn("flex items-start", !isLast && "flex-1")}>
              <div className="flex flex-col items-center gap-1.5">
                <button
                  type="button"
                  aria-current={isCurrent ? "step" : undefined}
                  disabled={step.disabled || !onStepChange}
                  onClick={() => onStepChange?.(index)}
                  className={cn(
                    "flex items-center justify-center rounded-full border-2 font-semibold transition-colors",
                    circleSizes[size],
                    isCurrent &&
                      "border-primary bg-primary text-primary-foreground",
                    isComplete &&
                      "border-primary bg-primary/10 text-primary hover:bg-primary/20",
                    !isCurrent &&
                      !isComplete &&
                      "border-border bg-background text-muted-foreground",
                    step.disabled && "opacity-40",
                    onStepChange && !step.disabled && "cursor-pointer"
                  )}
                >
                  {isComplete ? <Check className="size-4" /> : index + 1}
                </button>
                <span
                  className={cn(
                    "max-w-24 text-center leading-tight",
                    labelSizes[size],
                    isCurrent ? "font-semibold text-foreground" : "text-muted-foreground",
                    step.disabled && "opacity-40"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {!isLast && (
                <div
                  aria-hidden="true"
                  className={cn(
                    "mx-2 mt-[calc(var(--stepper-circle,2.25rem)/2)] h-0.5 flex-1 rounded",
                    index < currentStep ? "bg-primary" : "bg-border"
                  )}
                  style={
                    {
                      "--stepper-circle":
                        size === "sm" ? "1.75rem" : size === "lg" ? "2.75rem" : "2.25rem",
                    } as React.CSSProperties
                  }
                />
              )}
            </li>
          )
        })}
      </ol>

      {showArrows && (
        <button
          type="button"
          aria-label="Next step"
          disabled={!canGo(currentStep + 1)}
          onClick={() => onStepChange?.(currentStep + 1)}
          className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronRight className="size-5" />
        </button>
      )}
    </div>
  )
}

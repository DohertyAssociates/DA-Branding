import * as React from "react"
import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { BrandAngle } from "@/components/da/brand-angle"
import { BrandMark } from "@/components/da/brand-mark"
import { DohertyIcon } from "@/components/da/doherty-icon"
import { Stepper } from "@/components/da/stepper"
import { Section, Block } from "../section"

const swatches = [
  { name: "Magenta #AE1065", cls: "bg-brand-600", fg: "text-white" },
  { name: "Yellow #FFCC00", cls: "bg-da-yellow", fg: "text-black" },
  { name: "Plum #670639", cls: "bg-da-plum", fg: "text-white" },
  { name: "Black", cls: "bg-black", fg: "text-white" },
  { name: "White", cls: "bg-white border", fg: "text-black" },
]

export function BrandSection() {
  const [step, setStep] = React.useState(1)
  return (
    <Section id="brand" title="Brand">
      <Card>
        <CardHeader>
          <CardTitle>Primary colours</CardTitle>
          <CardDescription>
            From the Brand Identity Guidelines. Plum is secondary — use sparingly (≤25% of a page).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {swatches.map((s) => (
              <div
                key={s.name}
                className={`flex h-20 items-end rounded-lg p-2 text-xs font-medium ${s.cls} ${s.fg}`}
              >
                {s.name}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Identity components</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2">
          <Block label="Doherty Icon (currentColor)">
            <div className="flex items-center gap-4">
              <DohertyIcon className="h-10 text-primary" />
              <DohertyIcon className="h-10 text-da-yellow" />
              <DohertyIcon className="h-10 text-foreground" />
            </div>
          </Block>
          <Block label="Brand Mark">
            <BrandMark appName="Discover & Protect" tagline="Doherty Associates" />
          </Block>
          <Block label="Brand Angle (60° device)" className="sm:col-span-2">
            <div className="relative h-24 overflow-hidden rounded-lg border">
              <BrandAngle className="absolute inset-y-0 right-8 w-16 opacity-90" />
              <BrandAngle tone="yellow" className="absolute inset-y-0 -right-2 w-10 opacity-90" />
              <div className="flex h-full items-center px-6 font-bold">
                Combined Expertise
              </div>
            </div>
          </Block>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Delete</Button>
          <Button disabled>
            <Spinner /> Working…
          </Button>
          <Button variant="outline" size="icon" aria-label="Delete">
            <Trash2 />
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Wizard Stepper (DA)</CardTitle>
        </CardHeader>
        <CardContent>
          <Stepper
            steps={[
              { id: "labels", label: "Labels" },
              { id: "policies", label: "Policies" },
              { id: "sites", label: "Sites" },
              { id: "review", label: "Review", disabled: true },
            ]}
            currentStep={step}
            onStepChange={setStep}
            showArrows
          />
        </CardContent>
      </Card>
    </Section>
  )
}

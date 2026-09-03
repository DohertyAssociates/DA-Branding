import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { BrandAngle } from "@/components/da/brand-angle"
import { BrandMark } from "@/components/da/brand-mark"
import { ModeToggle } from "@/components/da/mode-toggle"
import { PageHeader } from "@/components/da/page-header"
import { ThemeProvider } from "@/components/da/theme-provider"

import pkg from "../package.json"
import { BrandSection } from "./sections/brand"
import { FormsSection } from "./sections/forms"
import { DisplaySection } from "./sections/display"
import { OverlaysSection } from "./sections/overlays"
import { NavigationSection } from "./sections/navigation"
import { DataSection } from "./sections/data"
import { ChatSection } from "./sections/chat"

const nav = [
  ["#brand", "Brand"],
  ["#forms", "Forms"],
  ["#display", "Display"],
  ["#overlays", "Overlays"],
  ["#navigation", "Navigation"],
  ["#data", "Data"],
  ["#chat", "Chat"],
] as const

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground">
          <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
            <div className="relative overflow-hidden">
              <BrandAngle className="absolute -right-10 inset-y-0 w-40 opacity-10" />
              <BrandAngle tone="yellow" className="absolute -right-28 inset-y-0 w-24 opacity-20" />
              <div className="relative mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
                <BrandMark appName="Doherty Associates UI" tagline="Shared branding package" />
                <div className="flex items-center gap-1">
                  <nav className="mr-2 hidden gap-1 md:flex">
                    {nav.map(([href, label]) => (
                      <a
                        key={href}
                        href={href}
                        className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        {label}
                      </a>
                    ))}
                  </nav>
                  <ModeToggle />
                </div>
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-5xl space-y-14 px-6 py-10">
            <PageHeader
              title="Component catalogue"
              description="The complete shadcn/ui set plus Doherty Associates brand components, all themed from the Brand Identity Guidelines — Work Sans, Magenta, Yellow and Plum."
            />
            <BrandSection />
            <FormsSection />
            <DisplaySection />
            <OverlaysSection />
            <NavigationSection />
            <DataSection />
            <ChatSection />
          </main>

          <footer className="border-t py-6 text-center text-xs text-muted-foreground">
            Doherty Associates — Combined Expertise · v{pkg.version}
          </footer>
          <Toaster richColors />
        </div>
      </TooltipProvider>
    </ThemeProvider>
  )
}

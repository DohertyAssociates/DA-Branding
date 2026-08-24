import { Clock, FileText, FolderOpen, Plus, Server, Trash2 } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { DohertyIcon } from "@/components/da/doherty-icon"
import { EmptyState } from "@/components/da/empty-state"
import { StatusDot } from "@/components/da/status-dot"
import { Section, Block } from "../section"

export function DisplaySection() {
  return (
    <Section id="display" title="Display & feedback">
      <Card>
        <CardHeader>
          <CardTitle>Badges, status & identity</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2">
          <Block label="Badge">
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Failed</Badge>
              <Badge className="bg-da-yellow text-black">Highlight</Badge>
              <Badge className="bg-da-plum text-white">Plum</Badge>
            </div>
          </Block>
          <Block label="Status Dot (DA)">
            <div className="flex flex-wrap gap-4">
              <StatusDot status="success" label="Healthy" />
              <StatusDot status="warning" label="Degraded" />
              <StatusDot status="danger" label="Down" />
              <StatusDot status="neutral" label="Not assessed" />
            </div>
          </Block>
          <Block label="Avatar">
            <div className="flex gap-2">
              <Avatar>
                <AvatarFallback>CC</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">DA</AvatarFallback>
              </Avatar>
            </div>
          </Block>
          <Block label="Kbd">
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              Open the command palette with
              <KbdGroup>
                <Kbd>Ctrl</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            </p>
          </Block>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alerts & loading</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <Alert>
            <DohertyIcon className="size-4" />
            <AlertTitle>Combined Expertise</AlertTitle>
            <AlertDescription>Default informational alert using the brand icon.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>Scan failed</AlertTitle>
            <AlertDescription>
              The tenant could not be reached. Check admin consent and try again.
            </AlertDescription>
          </Alert>
          <div className="flex flex-wrap items-center gap-8">
            <Block label="Spinner">
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Spinner className="size-5" /> Loading sites…
              </span>
            </Block>
            <Block label="Progress">
              <Progress value={64} className="w-56" />
            </Block>
            <Block label="Skeleton">
              <div className="space-y-2">
                <Skeleton className="h-4 w-56" />
                <Skeleton className="h-4 w-40" />
              </div>
            </Block>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Structure</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2">
          <Block label="Accordion">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="a">
                <AccordionTrigger>What does the scan include?</AccordionTrigger>
                <AccordionContent>Sites, libraries, permissions and sharing links.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="b">
                <AccordionTrigger>How long does it take?</AccordionTrigger>
                <AccordionContent>Typically 10–30 minutes per tenant.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </Block>
          <Block label="Collapsible">
            <Collapsible className="w-full rounded-lg border px-4 py-2">
              <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium">
                Advanced options <Plus className="size-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pb-2 text-sm text-muted-foreground">
                Batch size, retry policy, throttling.
              </CollapsibleContent>
            </Collapsible>
          </Block>
          <Block label="Separator">
            <div className="flex h-6 items-center gap-4 text-sm">
              <span>Sites</span>
              <Separator orientation="vertical" />
              <span>Libraries</span>
              <Separator orientation="vertical" />
              <span>Columns</span>
            </div>
          </Block>
          <Block label="Aspect Ratio (16:9)">
            <AspectRatio ratio={16 / 9} className="flex items-center justify-center rounded-lg bg-muted">
              <DohertyIcon className="h-12 text-primary" />
            </AspectRatio>
          </Block>
          <Block label="Item">
            <ItemGroup className="rounded-lg border">
              <Item>
                <ItemMedia variant="icon">
                  <Server />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Finance site</ItemTitle>
                  <ItemDescription>12,840 files · last scanned yesterday</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Button variant="ghost" size="icon-sm" aria-label="Delete">
                    <Trash2 />
                  </Button>
                </ItemActions>
              </Item>
            </ItemGroup>
          </Block>
          <Block label="Marker">
            <div className="w-full space-y-3">
              <Marker variant="separator">
                <MarkerIcon>
                  <Clock />
                </MarkerIcon>
                <MarkerContent>Yesterday</MarkerContent>
              </Marker>
              <Marker variant="border">
                <MarkerIcon>
                  <FileText />
                </MarkerIcon>
                <MarkerContent>4 files reprocessed</MarkerContent>
              </Marker>
            </div>
          </Block>
          <Block label="Scroll Area">
            <ScrollArea className="h-28 w-full rounded-lg border p-3 text-sm">
              {Array.from({ length: 12 }, (_, i) => (
                <p key={i} className="py-1">
                  Document library {i + 1}
                </p>
              ))}
            </ScrollArea>
          </Block>
          <Block label="Carousel">
            <Carousel className="mx-10 w-[calc(100%-5rem)]">
              <CarouselContent>
                {[1, 2, 3, 4, 5].map((n) => (
                  <CarouselItem key={n} className="basis-1/2">
                    <div className="flex h-24 items-center justify-center rounded-lg border bg-muted/40 text-2xl font-bold text-primary">
                      {n}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </Block>
          <Block label="Tooltip">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Delete">
                  <Trash2 />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete customer</TooltipContent>
            </Tooltip>
          </Block>
          <Block label="Hover Card">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link">@doherty-associates</Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-72">
                <div className="flex gap-3">
                  <DohertyIcon className="h-10 text-primary" />
                  <div className="text-sm">
                    <p className="font-semibold">Doherty Associates</p>
                    <p className="text-muted-foreground">
                      IT consultancy — London & Kuala Lumpur, est. 1991.
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </Block>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Empty states</CardTitle>
          <CardDescription>
            `EmptyState` (DA convenience wrapper) composes the shadcn Empty primitives.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={FolderOpen}
            title="No customers yet"
            description="Add your first customer to start scanning their tenant."
            action={
              <Button>
                <Plus /> Add customer
              </Button>
            }
          />
        </CardContent>
      </Card>
    </Section>
  )
}

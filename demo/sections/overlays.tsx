import { Copy, Scissors, Search, Trash2 } from "lucide-react"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Section, Block } from "../section"

export function OverlaysSection() {
  return (
    <Section id="overlays" title="Overlays & menus">
      <Card>
        <CardHeader>
          <CardTitle>Dialogs, sheets & drawers</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Rename run</DialogTitle>
                <DialogDescription>Replaces window.prompt().</DialogDescription>
              </DialogHeader>
              <Input placeholder="Run name" />
              <DialogFooter>
                <Button>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Alert Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this customer?</AlertDialogTitle>
                <AlertDialogDescription>
                  Replaces confirm(). This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Sheet (side panel)</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit label</SheetTitle>
                <SheetDescription>Replaces the hand-rolled slide-overs.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Drawer (bottom)</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Scan options</DrawerTitle>
                <DrawerDescription>Mobile-friendly bottom drawer (vaul).</DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Start scan</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <Button
            variant="outline"
            onClick={() => toast.success("Saved", { description: "All changes stored." })}
          >
            Toast (sonner)
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Menus & popovers</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2">
          <Block label="Dropdown Menu">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Actions</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Run actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Search /> Inspect
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                  <Trash2 /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Block>
          <Block label="Popover">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Filter</Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 text-sm">
                Popover content — filters, quick settings, hints.
              </PopoverContent>
            </Popover>
          </Block>
          <Block label="Context Menu (right-click)">
            <ContextMenu>
              <ContextMenuTrigger className="flex h-24 w-full items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
                Right-click here
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>
                  <Copy /> Copy
                </ContextMenuItem>
                <ContextMenuItem>
                  <Scissors /> Cut
                </ContextMenuItem>
                <ContextMenuItem variant="destructive">
                  <Trash2 /> Delete
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </Block>
          <Block label="Menubar">
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>New scan</MenubarItem>
                  <MenubarItem>Export report</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Exit</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Help</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Documentation</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </Block>
        </CardContent>
      </Card>
    </Section>
  )
}

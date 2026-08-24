import * as React from "react"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { Bold, CalendarIcon, Check, ChevronsUpDown, Italic, Search, Underline } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"
import { Section, Block } from "../section"

const sites = [
  { value: "finance", label: "Finance" },
  { value: "legal", label: "Legal" },
  { value: "hr", label: "HR" },
  { value: "projects", label: "Projects" },
]

function ComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-56 justify-between">
          {value ? sites.find((s) => s.value === value)?.label : "Select site…"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0">
        <Command>
          <CommandInput placeholder="Search sites…" />
          <CommandList>
            <CommandEmpty>No site found.</CommandEmpty>
            <CommandGroup>
              {sites.map((s) => (
                <CommandItem
                  key={s.value}
                  value={s.value}
                  onSelect={(v) => {
                    setValue(v === value ? "" : v)
                    setOpen(false)
                  }}
                >
                  <Check className={cn(value === s.value ? "opacity-100" : "opacity-0")} />
                  {s.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-56 justify-start font-normal">
          <CalendarIcon />
          {date ? format(date, "PPP") : <span className="text-muted-foreground">Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  )
}

function RhfFormDemo() {
  const form = useForm({ defaultValues: { email: "" } })
  return (
    <Form {...form}>
      <form
        className="max-w-sm space-y-4"
        onSubmit={form.handleSubmit(() => {})}
      >
        <FormField
          control={form.control}
          name="email"
          rules={{ required: "Email is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@doherty.co.uk" {...field} />
              </FormControl>
              <FormDescription>react-hook-form + Form components.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="sm">
          Submit
        </Button>
      </form>
    </Form>
  )
}

export function FormsSection() {
  return (
    <Section id="forms" title="Forms & inputs">
      <Card>
        <CardHeader>
          <CardTitle>Inputs</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2">
          <Block label="Input + Label">
            <div className="grid gap-2">
              <Label htmlFor="f-name">Customer name</Label>
              <Input id="f-name" placeholder="Contoso Ltd" />
            </div>
          </Block>
          <Block label="Input Group">
            <InputGroup>
              <InputGroupInput placeholder="Search sites…" />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>
          </Block>
          <Block label="Textarea">
            <Textarea placeholder="Notes…" />
          </Block>
          <Block label="Input OTP">
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </Block>
          <Block label="Select (Radix)">
            <Select>
              <SelectTrigger className="w-56">
                <SelectValue placeholder="Support tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="essential">Essential</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="premier">Premier</SelectItem>
              </SelectContent>
            </Select>
          </Block>
          <Block label="Native Select">
            <NativeSelect className="w-56">
              <NativeSelectOption value="uk">United Kingdom</NativeSelectOption>
              <NativeSelectOption value="my">Malaysia</NativeSelectOption>
            </NativeSelect>
          </Block>
          <Block label="Combobox (Popover + Command)">
            <ComboboxDemo />
          </Block>
          <Block label="Date Picker (Popover + Calendar)">
            <DatePickerDemo />
          </Block>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Choices & toggles</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2">
          <Block label="Checkbox">
            <div className="flex items-center gap-2">
              <Checkbox id="f-active" defaultChecked />
              <Label htmlFor="f-active">Active</Label>
            </div>
          </Block>
          <Block label="Switch">
            <div className="flex items-center gap-2">
              <Switch id="f-autofill" />
              <Label htmlFor="f-autofill">Enable AI autofill</Label>
            </div>
          </Block>
          <Block label="Radio Group">
            <RadioGroup defaultValue="all" className="flex gap-6">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="all" id="r-all" />
                <Label htmlFor="r-all">All sites</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="selected" id="r-sel" />
                <Label htmlFor="r-sel">Selected sites</Label>
              </div>
            </RadioGroup>
          </Block>
          <Block label="Slider">
            <Slider defaultValue={[80]} max={100} step={5} className="w-56" />
          </Block>
          <Block label="Toggle">
            <Toggle aria-label="Bold">
              <Bold />
            </Toggle>
          </Block>
          <Block label="Toggle Group">
            <ToggleGroup type="multiple" variant="outline">
              <ToggleGroupItem value="bold" aria-label="Bold">
                <Bold />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Italic">
                <Italic />
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" aria-label="Underline">
                <Underline />
              </ToggleGroupItem>
            </ToggleGroup>
          </Block>
          <Block label="Button Group">
            <ButtonGroup>
              <Button variant="outline">Day</Button>
              <Button variant="outline">Week</Button>
              <Button variant="outline">Month</Button>
            </ButtonGroup>
          </Block>
          <Block label="Calendar (inline)">
            <Calendar mode="single" className="rounded-lg border" />
          </Block>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Field & Form</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-8 sm:grid-cols-2">
          <Block label="Field family (layout without a form library)">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="fl-tenant">Tenant ID</FieldLabel>
                <Input id="fl-tenant" placeholder="contoso.onmicrosoft.com" />
                <FieldDescription>The Entra tenant to scan.</FieldDescription>
              </Field>
            </FieldGroup>
          </Block>
          <Block label="Form (react-hook-form)">
            <RhfFormDemo />
          </Block>
        </CardContent>
      </Card>
    </Section>
  )
}

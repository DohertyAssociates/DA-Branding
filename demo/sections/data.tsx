import type { ColumnDef } from "@tanstack/react-table"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { toast } from "sonner"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTable } from "@/components/da/data-table"
import { StatusDot } from "@/components/da/status-dot"
import { Section, Block } from "../section"

interface ScanRow {
  site: string
  files: number
  status: "Complete" | "Running" | "Failed"
}

const scanRows: ScanRow[] = [
  { site: "Finance", files: 12840, status: "Complete" },
  { site: "Legal", files: 8322, status: "Running" },
  { site: "HR", files: 951, status: "Failed" },
  { site: "Projects", files: 44012, status: "Complete" },
]

const scanColumns: ColumnDef<ScanRow>[] = [
  { accessorKey: "site", header: "Site" },
  {
    accessorKey: "files",
    header: "Files",
    cell: ({ row }) => row.original.files.toLocaleString(),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const s = row.original.status
      return (
        <StatusDot
          status={s === "Complete" ? "success" : s === "Running" ? "info" : "danger"}
          label={s}
        />
      )
    },
  },
]

const chartData = [
  { month: "Apr", scanned: 186, labelled: 80 },
  { month: "May", scanned: 305, labelled: 200 },
  { month: "Jun", scanned: 237, labelled: 120 },
  { month: "Jul", scanned: 273, labelled: 190 },
  { month: "Aug", scanned: 309, labelled: 230 },
]

const chartConfig = {
  scanned: { label: "Scanned", color: "var(--chart-1)" },
  labelled: { label: "Labelled", color: "var(--chart-2)" },
} satisfies ChartConfig

export function DataSection() {
  return (
    <Section id="data" title="Data">
      <Card>
        <CardHeader>
          <CardTitle>Tables</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-8">
          <Block label="Table (plain)">
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Label</TableHead>
                    <TableHead>Scope</TableHead>
                    <TableHead className="text-right">Files</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Confidential</TableCell>
                    <TableCell>Tenant</TableCell>
                    <TableCell className="text-right">4,210</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Highly Confidential</TableCell>
                    <TableCell>Finance, Legal</TableCell>
                    <TableCell className="text-right">1,032</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Block>
          <Block label="DataTable (DA — sortable, TanStack)">
            <DataTable columns={scanColumns} data={scanRows} onRowClick={(r) => toast(r.site)} />
          </Block>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Chart (brand palette)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="scanned" fill="var(--color-scanned)" radius={4} />
              <Bar dataKey="labelled" fill="var(--color-labelled)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </Section>
  )
}

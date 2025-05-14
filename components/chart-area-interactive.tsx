"use client"

import * as React from "react"
import { BarChartIcon } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("30d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardTitle>Bookings & Revenue Trend</CardTitle>
        <CardDescription>
          <span className="@[540px]/card:block hidden">Visualizing booking patterns and revenue generation</span>
          <span className="@[540px]/card:hidden">Booking and revenue data</span>
        </CardDescription>
        <div className="absolute right-4 top-4">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="@[767px]/card:flex hidden"
          >
            <ToggleGroupItem value="7d" className="h-8 px-2.5">
              Last 7 Days
            </ToggleGroupItem>
            <ToggleGroupItem value="30d" className="h-8 px-2.5">
              Last 30 Days
            </ToggleGroupItem>
            <ToggleGroupItem value="90d" className="h-8 px-2.5">
              Last 3 Months
            </ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="@[767px]/card:hidden flex w-40" aria-label="Select a time range">
              <SelectValue placeholder="Last 30 Days" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="7d" className="rounded-lg">
                Last 7 Days
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 Days
              </SelectItem>
              <SelectItem value="90d" className="rounded-lg">
                Last 3 Months
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <div className="aspect-[3/1] w-full min-h-[250px] rounded-md border border-dashed bg-muted/50 flex flex-col items-center justify-center p-6 text-muted-foreground">
          <BarChartIcon className="h-10 w-10 mb-2" />
          <div className="text-sm font-medium">Bookings & Revenue Chart</div>
          <div className="text-xs">Data will render here from the bookings table</div>

          {/* X-axis labels */}
          <div className="w-full mt-6 flex justify-between px-4">
            <div className="text-xs">Jun 1</div>
            <div className="text-xs">Jun 5</div>
            <div className="text-xs">Jun 10</div>
            <div className="text-xs">Jun 15</div>
            <div className="text-xs">Jun 20</div>
            <div className="text-xs">Jun 25</div>
            <div className="text-xs">Jun 30</div>
          </div>

          {/* Y-axis label */}
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import * as React from "react"
import { BarChartIcon } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { Card, CardContent } from "@/components/ui/card"
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
    <Card className="px-4 lg:px-6">
      <div className="flex flex-col space-y-1 py-2">
        <h3 className="text-lg font-semibold text-gray-900">Bookings & Revenue Trend</h3>
        <p className="text-sm text-gray-600">
          <span className="@[540px]/card:block hidden">Visualizing booking patterns and revenue generation</span>
          <span className="@[540px]/card:hidden">Booking and revenue data</span>
        </p>
      </div>
      <div className="absolute right-4 top-4">
        <ToggleGroup
          type="single"
          value={timeRange}
          onValueChange={setTimeRange}
          variant="outline"
          className="@[767px]/card:flex hidden"
        >
          <ToggleGroupItem
            value="7d"
            className="h-8 px-2.5 border-gray-200 data-[state=on]:bg-gray-100 data-[state=on]:text-gray-900"
          >
            Last 7 Days
          </ToggleGroupItem>
          <ToggleGroupItem
            value="30d"
            className="h-8 px-2.5 border-gray-200 data-[state=on]:bg-gray-100 data-[state=on]:text-gray-900"
          >
            Last 30 Days
          </ToggleGroupItem>
          <ToggleGroupItem
            value="90d"
            className="h-8 px-2.5 border-gray-200 data-[state=on]:bg-gray-100 data-[state=on]:text-gray-900"
          >
            Last 3 Months
          </ToggleGroupItem>
        </ToggleGroup>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="@[767px]/card:hidden flex w-40 border-gray-200" aria-label="Select a time range">
            <SelectValue placeholder="Last 30 Days" />
          </SelectTrigger>
          <SelectContent className="rounded-lg">
            <SelectItem value="7d" className="rounded-md">
              Last 7 Days
            </SelectItem>
            <SelectItem value="30d" className="rounded-md">
              Last 30 Days
            </SelectItem>
            <SelectItem value="90d" className="rounded-md">
              Last 3 Months
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <CardContent className="px-0 pt-4">
        <div className="aspect-[3/1] w-full min-h-[250px] rounded-md border border-gray-100 bg-gray-50 flex flex-col items-center justify-center p-6 text-gray-500">
          <BarChartIcon className="h-10 w-10 mb-2 text-gray-400" />
          <div className="text-sm font-medium text-gray-700">Bookings & Revenue Chart</div>
          <div className="text-xs text-gray-500">Data will render here from the bookings table</div>

          {/* X-axis labels */}
          <div className="w-full mt-6 flex justify-between px-4">
            <div className="text-xs text-gray-500">Jun 1</div>
            <div className="text-xs text-gray-500">Jun 5</div>
            <div className="text-xs text-gray-500">Jun 10</div>
            <div className="text-xs text-gray-500">Jun 15</div>
            <div className="text-xs text-gray-500">Jun 20</div>
            <div className="text-xs text-gray-500">Jun 25</div>
            <div className="text-xs text-gray-500">Jun 30</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

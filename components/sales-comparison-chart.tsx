"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

// Sample data for the chart - current month vs last month
const generateSalesData = () => {
  const data = []

  // Generate data for the last 3 months
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()

  // Start date is 3 months ago
  const startDate = new Date(currentYear, currentMonth - 2, 1)

  // Loop through each day from start date to today
  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    const date = new Date(d)

    // Generate realistic looking data with weekly patterns
    const dayOfWeek = date.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

    // Base values with some randomness
    const baseCurrentSales = isWeekend ? 1200 + Math.random() * 800 : 800 + Math.random() * 400
    const baseLastSales = isWeekend ? 1000 + Math.random() * 700 : 700 + Math.random() * 350

    // Add some peaks and valleys
    const currentMonth = Math.round(baseCurrentSales * (1 + Math.sin(date.getDate() / 5) * 0.2))
    const lastMonth = Math.round(baseLastSales * (1 + Math.sin(date.getDate() / 5) * 0.2))

    data.push({
      date: date.toISOString().split("T")[0],
      currentMonth,
      lastMonth,
    })
  }

  return data
}

const salesData = generateSalesData()

const chartConfig = {
  currentMonth: {
    label: "This Month",
    color: "hsl(346, 70%, 70%)", // Grey-pink color
  },
  lastMonth: {
    label: "Last Month",
    color: "hsl(200, 70%, 70%)", // Grey-light blue color
  },
} satisfies ChartConfig

export function SalesComparisonChart() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("30d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = salesData.filter((item) => {
    const date = new Date(item.date)
    const today = new Date()
    let daysToSubtract = 90

    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }

    const startDate = new Date(today)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardTitle>Sales Comparison</CardTitle>
        <CardDescription>
          <span className="@[540px]/card:block hidden">This month vs last month</span>
          <span className="@[540px]/card:hidden">Monthly comparison</span>
        </CardDescription>
        <div className="absolute right-4 top-4">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="@[767px]/card:flex hidden"
          >
            <ToggleGroupItem value="90d" className="h-8 px-2.5">
              Last 3 months
            </ToggleGroupItem>
            <ToggleGroupItem value="30d" className="h-8 px-2.5">
              Last 30 days
            </ToggleGroupItem>
            <ToggleGroupItem value="7d" className="h-8 px-2.5">
              Last 7 days
            </ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="@[767px]/card:hidden flex w-40" aria-label="Select a time range">
              <SelectValue placeholder="Last 30 days" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillCurrentMonth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(346, 70%, 70%)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(346, 70%, 70%)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillLastMonth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(200, 70%, 70%)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(200, 70%, 70%)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            {/* Added strokeWidth for thicker lines */}
            <Area
              dataKey="lastMonth"
              type="monotone"
              fill="url(#fillLastMonth)"
              stroke="hsl(200, 70%, 70%)"
              strokeWidth={3}
              fillOpacity={0.6}
            />
            <Area
              dataKey="currentMonth"
              type="monotone"
              fill="url(#fillCurrentMonth)"
              stroke="hsl(346, 70%, 70%)"
              strokeWidth={3}
              fillOpacity={0.6}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

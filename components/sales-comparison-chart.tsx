"use client"

import { useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

// Sample data for the chart - using the same structure as the example
const salesData = [
  { date: "2024-06-01", currentMonth: 1200, lastMonth: 950 },
  { date: "2024-06-03", currentMonth: 1050, lastMonth: 880 },
  { date: "2024-06-05", currentMonth: 1350, lastMonth: 1100 },
  { date: "2024-06-07", currentMonth: 1500, lastMonth: 1250 },
  { date: "2024-06-09", currentMonth: 1100, lastMonth: 950 },
  { date: "2024-06-11", currentMonth: 1300, lastMonth: 1050 },
  { date: "2024-06-13", currentMonth: 1600, lastMonth: 1300 },
  { date: "2024-06-15", currentMonth: 1400, lastMonth: 1150 },
  { date: "2024-06-17", currentMonth: 1200, lastMonth: 1000 },
  { date: "2024-06-19", currentMonth: 1500, lastMonth: 1200 },
  { date: "2024-06-21", currentMonth: 1700, lastMonth: 1400 },
  { date: "2024-06-23", currentMonth: 1600, lastMonth: 1300 },
  { date: "2024-06-25", currentMonth: 1400, lastMonth: 1150 },
  { date: "2024-06-27", currentMonth: 1300, lastMonth: 1100 },
  { date: "2024-06-30", currentMonth: 1500, lastMonth: 1250 },
]

// Chart configuration
const chartConfig = {
  currentMonth: {
    label: "This Month",
    color: "hsl(346, 84%, 81%)", // Salmon/pink color
  },
  lastMonth: {
    label: "Last Month",
    color: "hsl(172, 67%, 73%)", // Teal/mint color
  },
}

export function SalesComparisonChart() {
  const [timeRange, setTimeRange] = useState("30d")

  // Filter data based on selected time range
  const getFilteredData = () => {
    switch (timeRange) {
      case "7d":
        return salesData.slice(-5) // Last 5 data points for 7 days view
      case "30d":
        return salesData // All data for 30 days view
      case "3m":
      default:
        return salesData
    }
  }

  const filteredData = getFilteredData()

  return (
    <Card className="overflow-hidden mb-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-medium">Sales Comparison</CardTitle>
          <CardDescription>This month vs last month</CardDescription>
        </div>
        <ToggleGroup type="single" value={timeRange} onValueChange={(value) => value && setTimeRange(value)}>
          <ToggleGroupItem value="3m" aria-label="Last 3 months" className="text-xs">
            Last 3 months
          </ToggleGroupItem>
          <ToggleGroupItem value="30d" aria-label="Last 30 days" className="text-xs">
            Last 30 days
          </ToggleGroupItem>
          <ToggleGroupItem value="7d" aria-label="Last 7 days" className="text-xs">
            Last 7 days
          </ToggleGroupItem>
        </ToggleGroup>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillCurrentMonth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(346, 84%, 81%)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(346, 84%, 81%)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillLastMonth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(172, 67%, 73%)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(172, 67%, 73%)" stopOpacity={0.1} />
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
                return `Jun ${date.getDate()}`
              }}
            />
            <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} width={60} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    const date = new Date(value)
                    return `Jun ${date.getDate()}`
                  }}
                  formatter={(value) => [`$${value}`, ""]}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="lastMonth"
              type="natural"
              fill="url(#fillLastMonth)"
              stroke="var(--color-lastMonth)"
              stackId="a"
            />
            <Area
              dataKey="currentMonth"
              type="natural"
              fill="url(#fillCurrentMonth)"
              stroke="var(--color-currentMonth)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
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
    <div className="bg-gray-50 rounded-lg p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm font-medium">This month vs last month</div>
        <ToggleGroup type="single" value={timeRange} onValueChange={(value) => value && setTimeRange(value)}>
          <ToggleGroupItem
            value="3m"
            aria-label="Last 3 months"
            className="text-xs border-gray-200 data-[state=on]:bg-gray-100 data-[state=on]:text-gray-900"
          >
            3M
          </ToggleGroupItem>
          <ToggleGroupItem
            value="30d"
            aria-label="Last 30 days"
            className="text-xs border-gray-200 data-[state=on]:bg-gray-100 data-[state=on]:text-gray-900"
          >
            30D
          </ToggleGroupItem>
          <ToggleGroupItem
            value="7d"
            aria-label="Last 7 days"
            className="text-xs border-gray-200 data-[state=on]:bg-gray-100 data-[state=on]:text-gray-900"
          >
            7D
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="overflow-hidden flex-grow">
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
            <CartesianGrid vertical={false} stroke="#f1f1f1" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              stroke="#9ca3af"
              tickFormatter={(value) => {
                const date = new Date(value)
                return `Jun ${date.getDate()}`
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
              width={60}
              stroke="#9ca3af"
            />
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
              strokeWidth={2}
              stackId="a"
            />
            <Area
              dataKey="currentMonth"
              type="natural"
              fill="url(#fillCurrentMonth)"
              stroke="var(--color-currentMonth)"
              strokeWidth={2}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </div>
      <div className="mt-3 pt-3 border-t border-gray-200">
        <button className="text-xs text-blue-600 w-full flex items-center justify-center">
          View detailed sales report
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

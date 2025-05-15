"use client"

import { useState } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

// Sample data for the chart
const generateSalesData = () => {
  const currentMonth = []
  const lastMonth = []

  for (let i = 1; i <= 30; i++) {
    // Generate some realistic looking data with weekly patterns
    const dayOfWeek = i % 7
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

    // Base values with some randomness
    const baseCurrentSales = isWeekend ? 1200 + Math.random() * 800 : 800 + Math.random() * 400
    const baseLastSales = isWeekend ? 1000 + Math.random() * 700 : 700 + Math.random() * 350

    // Add some peaks and valleys
    const currentSales = Math.round(baseCurrentSales * (1 + Math.sin(i / 5) * 0.2))
    const lastSales = Math.round(baseLastSales * (1 + Math.sin(i / 5) * 0.2))

    currentMonth.push({
      day: i,
      date: `Jun ${i}`,
      sales: currentSales,
    })

    lastMonth.push({
      day: i,
      date: `May ${i}`,
      sales: lastSales,
    })
  }

  // Combine the data for the chart
  const combinedData = currentMonth.map((current, index) => ({
    date: current.date,
    currentMonth: current.sales,
    lastMonth: lastMonth[index].sales,
  }))

  return combinedData
}

const salesData = generateSalesData()

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
        return salesData.slice(-7)
      case "30d":
        return salesData
      case "3m":
      default:
        return salesData
    }
  }

  const filteredData = getFilteredData()

  return (
    <Card className="overflow-hidden">
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
      <CardContent className="p-0">
        <div className="h-[300px] w-full px-4 pb-6 pt-2">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <defs>
                  <linearGradient id="colorCurrentMonth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(346, 84%, 81%)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(346, 84%, 81%)" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorLastMonth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(172, 67%, 73%)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(172, 67%, 73%)" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => value.split(" ")[1]} // Only show the day number
                  interval={2} // Show every 3rd day
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${value}`}
                  domain={[0, "dataMax + 200"]} // Add some padding at the top
                  width={60} // Give more space for the dollar amounts
                />
                <ChartTooltip content={<ChartTooltipContent />} formatter={(value) => [`$${value}`, ""]} />
                <Area
                  type="monotone"
                  dataKey="currentMonth"
                  stroke="hsl(346, 84%, 81%)"
                  strokeWidth={2}
                  fillOpacity={0.6}
                  fill="url(#colorCurrentMonth)"
                  activeDot={{ r: 6 }}
                />
                <Area
                  type="monotone"
                  dataKey="lastMonth"
                  stroke="hsl(172, 67%, 73%)"
                  strokeWidth={2}
                  fillOpacity={0.6}
                  fill="url(#colorLastMonth)"
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

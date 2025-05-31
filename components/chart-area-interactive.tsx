"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-01", desktop: 165, mobile: 220 },
  { date: "2024-05-02", desktop: 293, mobile: 310 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
  { date: "2024-05-04", desktop: 385, mobile: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  { date: "2024-05-07", desktop: 388, mobile: 300 },
  { date: "2024-05-08", desktop: 149, mobile: 210 },
  { date: "2024-05-09", desktop: 227, mobile: 180 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-11", desktop: 335, mobile: 270 },
  { date: "2024-05-12", desktop: 197, mobile: 240 },
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  { date: "2024-05-14", desktop: 448, mobile: 490 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-16", desktop: 338, mobile: 400 },
  { date: "2024-05-17", desktop: 499, mobile: 420 },
  { date: "2024-05-18", desktop: 315, mobile: 350 },
  { date: "2024-05-19", desktop: 235, mobile: 180 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-05-21", desktop: 82, mobile: 140 },
  { date: "2024-05-22", desktop: 81, mobile: 120 },
  { date: "2024-05-23", desktop: 252, mobile: 290 },
  { date: "2024-05-24", desktop: 294, mobile: 220 },
  { date: "2024-05-25", desktop: 201, mobile: 250 },
  { date: "2024-05-26", desktop: 213, mobile: 170 },
  { date: "2024-05-27", desktop: 420, mobile: 460 },
  { date: "2024-05-28", desktop: 233, mobile: 190 },
  { date: "2024-05-29", desktop: 78, mobile: 130 },
  { date: "2024-05-30", desktop: 340, mobile: 280 },
  { date: "2024-05-31", desktop: 178, mobile: 230 },
  { date: "2024-06-01", desktop: 178, mobile: 200 },
  { date: "2024-06-02", desktop: 470, mobile: 410 },
  { date: "2024-06-03", desktop: 103, mobile: 160 },
  { date: "2024-06-04", desktop: 439, mobile: 380 },
  { date: "2024-06-05", desktop: 88, mobile: 140 },
  { date: "2024-06-06", desktop: 294, mobile: 250 },
  { date: "2024-06-07", desktop: 323, mobile: 370 },
  { date: "2024-06-08", desktop: 385, mobile: 320 },
  { date: "2024-06-09", desktop: 438, mobile: 480 },
  { date: "2024-06-10", desktop: 155, mobile: 200 },
  { date: "2024-06-11", desktop: 92, mobile: 150 },
  { date: "2024-06-12", desktop: 492, mobile: 420 },
  { date: "2024-06-13", desktop: 81, mobile: 130 },
  { date: "2024-06-14", desktop: 426, mobile: 380 },
  { date: "2024-06-15", desktop: 307, mobile: 350 },
  { date: "2024-06-16", desktop: 371, mobile: 310 },
  { date: "2024-06-17", desktop: 475, mobile: 520 },
  { date: "2024-06-18", desktop: 107, mobile: 170 },
  { date: "2024-06-19", desktop: 341, mobile: 290 },
  { date: "2024-06-20", desktop: 408, mobile: 450 },
  { date: "2024-06-21", desktop: 169, mobile: 210 },
  { date: "2024-06-22", desktop: 317, mobile: 270 },
  { date: "2024-06-23", desktop: 480, mobile: 530 },
  { date: "2024-06-24", desktop: 132, mobile: 180 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-26", desktop: 434, mobile: 380 },
  { date: "2024-06-27", desktop: 448, mobile: 490 },
  { date: "2024-06-28", desktop: 149, mobile: 200 },
  { date: "2024-06-29", desktop: 103, mobile: 160 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "#3b82f6", // Blue
  },
  mobile: {
    label: "Mobile",
    color: "#f97316", // Orange
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("30d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardTitle>Total Visitors</CardTitle>
        <CardDescription>
          <span className="@[540px]/card:block hidden">Total for the last 3 months</span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
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
            <SelectTrigger className="@[767px]/card:hidden flex w-40" aria-label="Select a value">
              <SelectValue placeholder="Last 3 months" />
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
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={1.0} />
                <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
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
            <Area dataKey="mobile" type="natural" fill="url(#fillMobile)" stroke="var(--color-mobile)" stackId="a" />
            <Area dataKey="desktop" type="natural" fill="url(#fillDesktop)" stroke="var(--color-desktop)" stackId="a" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export function ChartAreaTicketsRevenue() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("30d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const chartData = [
    { date: "2024-04-01", tickets: 145, revenue: 2175000 },
    { date: "2024-04-02", tickets: 98, revenue: 1470000 },
    { date: "2024-04-03", tickets: 87, revenue: 1305000 },
    { date: "2024-04-04", tickets: 165, revenue: 2475000 },
    { date: "2024-04-05", tickets: 134, revenue: 2010000 },
    { date: "2024-04-06", tickets: 156, revenue: 2340000 },
    { date: "2024-04-07", tickets: 123, revenue: 1845000 },
    { date: "2024-04-08", tickets: 189, revenue: 2835000 },
    { date: "2024-04-09", tickets: 76, revenue: 1140000 },
    { date: "2024-04-10", tickets: 167, revenue: 2505000 },
    { date: "2024-04-11", tickets: 178, revenue: 2670000 },
    { date: "2024-04-12", tickets: 145, revenue: 2175000 },
    { date: "2024-04-13", tickets: 198, revenue: 2970000 },
    { date: "2024-04-14", tickets: 89, revenue: 1335000 },
    { date: "2024-04-15", tickets: 112, revenue: 1680000 },
    { date: "2024-04-16", tickets: 134, revenue: 2010000 },
    { date: "2024-04-17", tickets: 234, revenue: 3510000 },
    { date: "2024-04-18", tickets: 187, revenue: 2805000 },
    { date: "2024-04-19", tickets: 156, revenue: 2340000 },
    { date: "2024-04-20", tickets: 67, revenue: 1005000 },
    { date: "2024-04-21", tickets: 123, revenue: 1845000 },
    { date: "2024-04-22", tickets: 145, revenue: 2175000 },
    { date: "2024-04-23", tickets: 98, revenue: 1470000 },
    { date: "2024-04-24", tickets: 212, revenue: 3180000 },
    { date: "2024-04-25", tickets: 167, revenue: 2505000 },
    { date: "2024-04-26", tickets: 54, revenue: 810000 },
    { date: "2024-04-27", tickets: 245, revenue: 3675000 },
    { date: "2024-04-28", tickets: 89, revenue: 1335000 },
    { date: "2024-04-29", tickets: 178, revenue: 2670000 },
    { date: "2024-04-30", tickets: 267, revenue: 4005000 },
    { date: "2024-05-01", tickets: 123, revenue: 1845000 },
    { date: "2024-05-02", tickets: 189, revenue: 2835000 },
    { date: "2024-05-03", tickets: 156, revenue: 2340000 },
    { date: "2024-05-04", tickets: 234, revenue: 3510000 },
    { date: "2024-05-05", tickets: 298, revenue: 4470000 },
    { date: "2024-05-06", tickets: 345, revenue: 5175000 },
    { date: "2024-05-07", tickets: 212, revenue: 3180000 },
    { date: "2024-05-08", tickets: 98, revenue: 1470000 },
    { date: "2024-05-09", tickets: 134, revenue: 2010000 },
    { date: "2024-05-10", tickets: 178, revenue: 2670000 },
    { date: "2024-05-11", tickets: 167, revenue: 2505000 },
    { date: "2024-05-12", tickets: 145, revenue: 2175000 },
    { date: "2024-05-13", tickets: 89, revenue: 1335000 },
    { date: "2024-05-14", tickets: 387, revenue: 5805000 },
    { date: "2024-05-15", tickets: 298, revenue: 4470000 },
    { date: "2024-05-16", tickets: 234, revenue: 3510000 },
    { date: "2024-05-17", tickets: 456, revenue: 6840000 },
    { date: "2024-05-18", tickets: 189, revenue: 2835000 },
    { date: "2024-05-19", tickets: 123, revenue: 1845000 },
    { date: "2024-05-20", tickets: 145, revenue: 2175000 },
    { date: "2024-05-21", tickets: 76, revenue: 1140000 },
    { date: "2024-05-22", tickets: 87, revenue: 1305000 },
    { date: "2024-05-23", tickets: 167, revenue: 2505000 },
    { date: "2024-05-24", tickets: 156, revenue: 2340000 },
    { date: "2024-05-25", tickets: 134, revenue: 2010000 },
    { date: "2024-05-26", tickets: 98, revenue: 1470000 },
    { date: "2024-05-27", tickets: 345, revenue: 5175000 },
    { date: "2024-05-28", tickets: 156, revenue: 2340000 },
    { date: "2024-05-29", tickets: 67, revenue: 1005000 },
    { date: "2024-05-30", tickets: 234, revenue: 3510000 },
    { date: "2024-05-31", tickets: 134, revenue: 2010000 },
    { date: "2024-06-01", tickets: 145, revenue: 2175000 },
    { date: "2024-06-02", tickets: 456, revenue: 6840000 },
    { date: "2024-06-03", tickets: 89, revenue: 1335000 },
    { date: "2024-06-04", tickets: 387, revenue: 5805000 },
    { date: "2024-06-05", tickets: 54, revenue: 810000 },
    { date: "2024-06-06", tickets: 167, revenue: 2505000 },
    { date: "2024-06-07", tickets: 234, revenue: 3510000 },
    { date: "2024-06-08", tickets: 298, revenue: 4470000 },
    { date: "2024-06-09", tickets: 567, revenue: 8505000 },
    { date: "2024-06-10", tickets: 123, revenue: 1845000 },
    { date: "2024-06-11", tickets: 89, revenue: 1335000 },
    { date: "2024-06-12", tickets: 678, revenue: 10170000 },
    { date: "2024-06-13", tickets: 76, revenue: 1140000 },
    { date: "2024-06-14", tickets: 456, revenue: 6840000 },
    { date: "2024-06-15", tickets: 298, revenue: 4470000 },
    { date: "2024-06-16", tickets: 345, revenue: 5175000 },
    { date: "2024-06-17", tickets: 789, revenue: 11835000 },
    { date: "2024-06-18", tickets: 98, revenue: 1470000 },
    { date: "2024-06-19", tickets: 234, revenue: 3510000 },
    { date: "2024-06-20", tickets: 567, revenue: 8505000 },
    { date: "2024-06-21", tickets: 134, revenue: 2010000 },
    { date: "2024-06-22", tickets: 298, revenue: 4470000 },
    { date: "2024-06-23", tickets: 823, revenue: 12345000 },
    { date: "2024-06-24", tickets: 89, revenue: 1335000 },
    { date: "2024-06-25", tickets: 123, revenue: 1845000 },
    { date: "2024-06-26", tickets: 456, revenue: 6840000 },
    { date: "2024-06-27", tickets: 678, revenue: 10170000 },
    { date: "2024-06-28", tickets: 134, revenue: 2010000 },
    { date: "2024-06-29", tickets: 87, revenue: 1305000 },
    { date: "2024-06-30", tickets: 567, revenue: 8505000 },
  ]

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  const chartConfig = {
    performance: {
      label: "Performance",
    },
    tickets: {
      label: "Tickets Sold",
      color: "#3b82f6", // Blue
    },
    revenue: {
      label: "Revenue (¥)",
      color: "#f97316", // Orange
    },
  } satisfies ChartConfig

  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardTitle>Tickets & Revenue Performance</CardTitle>
        <CardDescription>Total tickets sold and revenue for the last 3 months</CardDescription>
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
            <SelectTrigger className="@[767px]/card:hidden flex w-40" aria-label="Select a value">
              <SelectValue placeholder="Last 3 months" />
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
              <linearGradient id="fillTickets" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={1.0} />
                <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
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
            <Area dataKey="revenue" type="natural" fill="url(#fillRevenue)" stroke="var(--color-mobile)" stackId="a" />
            <Area dataKey="tickets" type="natural" fill="url(#fillTickets)" stroke="var(--color-desktop)" stackId="a" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

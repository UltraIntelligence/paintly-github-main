"use client"

import { ArrowDownIcon, ArrowUpIcon, TrendingDown, TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface StatisticCardProps {
  label: string
  value: string
  change: string
  trend: "up" | "down"
  chartData: Array<{ day: string; value: number }>
}

export function StatisticCard({ label, value, change, trend, chartData }: StatisticCardProps) {
  // Transform data for the chart
  const formattedData = chartData.map((item) => ({
    label: item.day,
    value: item.value,
  }))

  const chartConfig = {
    value: {
      label: label,
      color: "hsl(var(--chart-1))",
    },
    label: {
      color: "hsl(var(--background))",
    },
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-1 mb-3">
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <div className="flex items-center space-x-1">
            <div
              className={`
                inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium
                ${trend === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
              `}
            >
              {trend === "up" ? <ArrowUpIcon className="h-3 w-3 mr-1" /> : <ArrowDownIcon className="h-3 w-3 mr-1" />}
              {change}
            </div>
            <span className="text-xs text-gray-500">compared to last week</span>
          </div>
        </div>

        <div className="h-24">
          <ChartContainer config={chartConfig} className="h-full">
            <BarChart data={formattedData} layout="vertical" margin={{ top: 0, right: 16, bottom: 0, left: 0 }}>
              <CartesianGrid horizontal={false} vertical={false} />
              <YAxis dataKey="label" type="category" hide />
              <XAxis type="number" hide />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill="var(--color-value)" radius={4} barSize={18}>
                <LabelList
                  dataKey="label"
                  position="insideLeft"
                  offset={8}
                  className="fill-[--color-label] text-xs"
                  fontSize={10}
                />
                <LabelList
                  dataKey="value"
                  position="right"
                  offset={8}
                  className="fill-foreground text-xs"
                  fontSize={10}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>

        <div className="flex items-center gap-1 text-xs mt-2 text-muted-foreground">
          {trend === "up" ? (
            <>
              <TrendingUp className="h-3 w-3" />
              <span>Trending up this week</span>
            </>
          ) : (
            <>
              <TrendingDown className="h-3 w-3" />
              <span>Trending down this week</span>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

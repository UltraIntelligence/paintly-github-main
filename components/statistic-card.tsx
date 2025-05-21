"use client"

import { ArrowDownIcon, ArrowUpIcon, TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Card, CardContent } from "@/components/ui/card"
import { type ChartConfig, ChartContainer } from "@/components/ui/chart"

interface StatisticCardProps {
  label: string
  value: string
  change: string
  trend: "up" | "down"
  chartData: { day: string; value: number }[]
}

export function StatisticCard({ label, value, change, trend, chartData }: StatisticCardProps) {
  const chartConfig = {
    value: {
      label: label,
      color: "hsl(var(--primary))",
    },
    label: {
      color: "hsl(var(--background))",
    },
  } satisfies ChartConfig

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-1">
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

        <div className="mt-3 h-24">
          <ChartContainer config={chartConfig}>
            <BarChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} barSize={6}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.2} />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => value.slice(0, 1)}
              />
              <YAxis hide domain={[0, "dataMax"]} />
              <Bar
                dataKey="value"
                fill="var(--color-value)"
                radius={[2, 2, 0, 0]}
                className="opacity-80 hover:opacity-100 transition-opacity"
              />
            </BarChart>
          </ChartContainer>
        </div>

        <div className="mt-2 flex items-center gap-1 text-xs">
          <TrendingUp className={`h-3 w-3 ${trend === "up" ? "text-green-500" : "text-red-500"}`} />
          <span className="font-medium">{trend === "up" ? "Trending up" : "Trending down"} this week</span>
        </div>
      </CardContent>
    </Card>
  )
}

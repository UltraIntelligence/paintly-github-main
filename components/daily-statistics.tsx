"use client"

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { BarChart, Bar, ResponsiveContainer, Tooltip, type TooltipProps } from "recharts"

// Sample data for the daily statistics
const dailyStats = [
  {
    label: "Sales Value",
    value: "¥958,000",
    change: "+5.6%",
    trend: "up",
    chartData: [
      { day: "Mon", value: 65 },
      { day: "Tue", value: 72 },
      { day: "Wed", value: 84 },
      { day: "Thu", value: 78 },
      { day: "Fri", value: 82 },
      { day: "Sat", value: 90 },
      { day: "Sun", value: 95 },
    ],
  },
  {
    label: "Number of Orders",
    value: "423",
    change: "+8.6%",
    trend: "up",
    chartData: [
      { day: "Mon", value: 42 },
      { day: "Tue", value: 38 },
      { day: "Wed", value: 45 },
      { day: "Thu", value: 50 },
      { day: "Fri", value: 47 },
      { day: "Sat", value: 52 },
      { day: "Sun", value: 42 },
    ],
  },
  {
    label: "Storefront Views",
    value: "4,224",
    change: "+12.5%",
    trend: "up",
    chartData: [
      { day: "Mon", value: 320 },
      { day: "Tue", value: 380 },
      { day: "Wed", value: 420 },
      { day: "Thu", value: 390 },
      { day: "Fri", value: 450 },
      { day: "Sat", value: 480 },
      { day: "Sun", value: 422 },
    ],
  },
  {
    label: "Booking Views",
    value: "3,221",
    change: "-3%",
    trend: "down",
    chartData: [
      { day: "Mon", value: 350 },
      { day: "Tue", value: 320 },
      { day: "Wed", value: 310 },
      { day: "Thu", value: 290 },
      { day: "Fri", value: 305 },
      { day: "Sat", value: 315 },
      { day: "Sun", value: 322 },
    ],
  },
]

// Custom tooltip component for the charts
const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md text-xs">
        <p className="font-medium">{`${label}: ${payload[0].value}`}</p>
      </div>
    )
  }
  return null
}

export function DailyStatistics() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Daily Statistics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dailyStats.map((stat, index) => (
          <Card key={index} className="bg-gray-50 p-4 flex flex-col justify-between h-full">
            {/* Top section with text data */}
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
              <div className="flex items-center mt-1">
                <div
                  className={`
                    inline-flex items-center text-xs font-medium
                    ${stat.trend === "up" ? "text-green-600" : "text-red-600"}
                  `}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpIcon className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-3 w-3 mr-1" />
                  )}
                  {stat.change}
                </div>
                <span className="text-xs text-gray-500 ml-1">compared to last week</span>
              </div>
            </div>

            {/* Bottom section with interactive chart */}
            <div className="h-16 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stat.chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="value"
                    fill={
                      index === dailyStats.length - 1 && stat.trend === "down"
                        ? "#f87171" // Red for negative trend in last item
                        : "#93c5fd"
                    } // Blue for all others
                    radius={[2, 2, 0, 0]}
                    activeBar={{ fill: "#3b82f6" }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

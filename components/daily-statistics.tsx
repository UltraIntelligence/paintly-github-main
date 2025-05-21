"use client"

import { StatisticCard } from "./statistic-card"

// Sample data for the daily statistics
const dailyStats = [
  {
    label: "Sales Value",
    value: "¥958,000",
    change: "+5.6%",
    trend: "up" as const,
    chartData: [
      { day: "Mon", value: 650 },
      { day: "Tue", value: 720 },
      { day: "Wed", value: 840 },
      { day: "Thu", value: 780 },
      { day: "Fri", value: 820 },
      { day: "Sat", value: 900 },
      { day: "Sun", value: 950 },
    ],
  },
  {
    label: "Number of Orders",
    value: "423",
    change: "+8.6%",
    trend: "up" as const,
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
    trend: "up" as const,
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
    trend: "down" as const,
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

export function DailyStatistics() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Daily Statistics</h2>
        <span className="text-sm text-gray-500">Today</span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dailyStats.map((stat, index) => (
          <StatisticCard
            key={index}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            chartData={stat.chartData}
          />
        ))}
      </div>
    </div>
  )
}

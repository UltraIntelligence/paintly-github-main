"use client"

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

// Sample data for the daily statistics
const dailyStats = [
  {
    label: "Sales Value",
    value: "¥958,000",
    change: "+5.6%",
    trend: "up",
    chartData: [65, 72, 84, 78, 82, 90, 95], // Last 7 days data
  },
  {
    label: "Number of Orders",
    value: "423",
    change: "+8.6%",
    trend: "up",
    chartData: [42, 38, 45, 50, 47, 52, 42], // Last 7 days data
  },
  {
    label: "Storefront Views",
    value: "4,224",
    change: "+12.5%",
    trend: "up",
    chartData: [320, 380, 420, 390, 450, 480, 422], // Last 7 days data
  },
  {
    label: "Booking Views",
    value: "3,221",
    change: "-3%",
    trend: "down",
    chartData: [350, 320, 310, 290, 305, 315, 322], // Last 7 days data
  },
]

export function DailyStatistics() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Daily Statistics</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dailyStats.map((stat, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex flex-col space-y-1">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center space-x-1">
                  <div
                    className={`
                      inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium
                      ${stat.trend === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
                    `}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUpIcon className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownIcon className="h-3 w-3 mr-1" />
                    )}
                    {stat.change}
                  </div>
                  <span className="text-xs text-gray-500">compared to last week</span>
                </div>
              </div>
              <div className="mt-3 h-10 flex items-end space-x-1">
                {stat.chartData.map((value, i) => (
                  <div
                    key={i}
                    className={`w-full h-${Math.max(1, Math.floor((value / Math.max(...stat.chartData)) * 10))} 
                    ${i === stat.chartData.length - 1 ? "bg-primary" : "bg-primary/30"} rounded-sm`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

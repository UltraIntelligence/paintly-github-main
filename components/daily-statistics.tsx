"use client"

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

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
    <div>
      <h3 className="text-lg font-semibold mb-3">Daily Statistics</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {dailyStats.map((stat, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
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
            <div className="mt-3 h-10 flex items-end space-x-1">
              {stat.chartData.map((value, i) => (
                <div
                  key={i}
                  className={`w-full h-${Math.max(1, Math.floor((value / Math.max(...stat.chartData)) * 10))} 
                  ${i === stat.chartData.length - 1 ? "bg-blue-500" : "bg-blue-300"} rounded-sm`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

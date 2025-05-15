"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PerformanceData {
  timesScheduled: number
  avgAttendance: {
    count: number
    capacity: number
    percentage: number
  }
  totalRevenue: number
}

interface EventPerformanceProps {
  performance: PerformanceData
}

export function EventPerformance({ performance }: EventPerformanceProps) {
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Times Scheduled</p>
            <p className="text-2xl font-semibold">{performance.timesScheduled}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Avg Attendance</p>
            <p className="text-2xl font-semibold">
              {performance.avgAttendance.count}/{performance.avgAttendance.capacity}
              <span className="text-sm text-gray-500 ml-1">({performance.avgAttendance.percentage}%)</span>
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-2xl font-semibold">{formatCurrency(performance.totalRevenue)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

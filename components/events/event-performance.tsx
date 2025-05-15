"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart } from "@tremor/react"
import { BarList } from "@tremor/react"

interface PerformanceData {
  timesScheduled: number
  avgAttendance: {
    count: number
    capacity: number
    percentage: number
  }
  totalRevenue: number
  popularityTrend: {
    month: string
    value: number
  }[]
}

interface TopLocation {
  id: string
  name: string
  count: number
  percentage: number
}

interface TopInstructor {
  id: string
  name: string
  count: number
  rating: number
}

interface EventPerformanceProps {
  performance: PerformanceData
  topLocations: TopLocation[]
  topInstructors: TopInstructor[]
}

export function EventPerformance({ performance, topLocations, topInstructors }: EventPerformanceProps) {
  // Format the locations data for the bar list
  const locationData = topLocations.map((location) => ({
    name: location.name,
    value: location.count,
  }))

  // Format the instructors data for the bar list
  const instructorData = topInstructors.map((instructor) => ({
    name: instructor.name,
    value: instructor.count,
    icon: () => (
      <div className="flex items-center">
        <span className="ml-1 text-xs text-gray-500">{instructor.rating.toFixed(1)}★</span>
      </div>
    ),
  }))

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

        <div>
          <p className="text-sm font-medium mb-2">Popularity Trend</p>
          <LineChart
            className="h-32"
            data={performance.popularityTrend}
            index="month"
            categories={["value"]}
            colors={["blue"]}
            showLegend={false}
            showXAxis={true}
            showYAxis={false}
            showGridLines={false}
            valueFormatter={(value) => `${value} events`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium mb-2">Top Locations</p>
            <BarList data={locationData} valueFormatter={(value) => `${value} events`} className="mt-2" />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Top Instructors</p>
            <BarList data={instructorData} valueFormatter={(value) => `${value} events`} className="mt-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

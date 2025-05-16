import { getLocationStats } from "./location-data"
import { Card, CardContent } from "@/components/ui/card"

export function LocationStatsOverview() {
  const stats = getLocationStats()

  // Mock data for the comprehensive stats card
  const topStudios = [
    { name: "Shibuya Studio", utilization: 92, capacity: 120, events: 42, trend: "up" },
    { name: "Roppongi Studio", utilization: 87, capacity: 80, events: 38, trend: "up" },
    { name: "Shinjuku Studio", utilization: 76, capacity: 100, events: 32, trend: "down" },
    { name: "Ginza Studio", utilization: 68, capacity: 60, events: 24, trend: "stable" },
  ]

  const weekdayAttendance = [
    { day: "Monday", percentage: 72 },
    { day: "Tuesday", percentage: 68 },
    { day: "Wednesday", percentage: 75 },
    { day: "Thursday", percentage: 82 },
    { day: "Friday", percentage: 88 },
    { day: "Saturday", percentage: 95 },
    { day: "Sunday", percentage: 90 },
  ]

  const peakHours = [
    { time: "10:00 - 12:00", utilization: 65 },
    { time: "12:00 - 14:00", utilization: 72 },
    { time: "14:00 - 16:00", utilization: 78 },
    { time: "16:00 - 18:00", utilization: 85 },
    { time: "18:00 - 20:00", utilization: 92 },
    { time: "20:00 - 22:00", utilization: 76 },
  ]

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-6">
          {/* Header with title */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">Location Performance</h2>
              <p className="text-sm text-gray-500">Comprehensive overview of all studios</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Last updated: Today</span>
            </div>
          </div>

          {/* Primary metrics grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500 font-medium">Total Locations</p>
              <p className="text-2xl font-bold">{stats.totalLocations}</p>
              <p className="text-xs text-gray-500 mt-1">Across all regions</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500 font-medium">Total Capacity</p>
              <p className="text-2xl font-bold">{stats.totalCapacity} seats</p>
              <p className="text-xs text-gray-500 mt-1">Maximum capacity</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500 font-medium">Average Utilization</p>
              <p className="text-2xl font-bold">{stats.averageUtilization}%</p>
              <p className="text-xs text-green-600 mt-1">↑ 4% from last month</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500 font-medium">Events This Month</p>
              <p className="text-2xl font-bold">{stats.eventsThisMonth}</p>
              <p className="text-xs text-green-600 mt-1">↑ 12 from last month</p>
            </div>
          </div>

          {/* Top performing studios */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Top Performing Studios</h3>
            <div className="space-y-3">
              {topStudios.map((studio, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center">
                    <div
                      className={`w-2 h-10 rounded-full mr-3 ${
                        studio.utilization > 85
                          ? "bg-green-500"
                          : studio.utilization > 70
                            ? "bg-amber-500"
                            : "bg-red-500"
                      }`}
                    ></div>
                    <div>
                      <p className="font-medium">{studio.name}</p>
                      <p className="text-xs text-gray-500">
                        {studio.capacity} seats • {studio.events} events
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="font-bold text-lg">{studio.utilization}%</p>
                    <span className="ml-2">
                      {studio.trend === "up" ? (
                        <span className="text-green-600">↑</span>
                      ) : studio.trend === "down" ? (
                        <span className="text-red-600">↓</span>
                      ) : (
                        <span className="text-gray-600">→</span>
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attendance metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Attendance Metrics</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Average Attendance</p>
                    <p className="text-2xl font-bold">82%</p>
                  </div>
                  <div className="text-green-600 text-sm font-medium">↑ 3% from last month</div>
                </div>

                <p className="text-sm font-medium mb-2">Attendance by Day</p>
                <div className="space-y-2">
                  {weekdayAttendance.map((day, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-xs w-20">{day.day}</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${day.percentage}%` }}></div>
                      </div>
                      <span className="text-xs ml-2 w-8">{day.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Peak hours */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Peak Hours</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-3">Utilization by Time of Day</p>
                <div className="space-y-2">
                  {peakHours.map((hour, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-xs w-24">{hour.time}</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            hour.utilization > 85
                              ? "bg-green-500"
                              : hour.utilization > 70
                                ? "bg-blue-500"
                                : "bg-gray-400"
                          }`}
                          style={{ width: `${hour.utilization}%` }}
                        ></div>
                      </div>
                      <span className="text-xs ml-2 w-8">{hour.utilization}%</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">Peak time: 18:00 - 20:00 with 92% utilization</p>
              </div>
            </div>
          </div>

          {/* Revenue and utilization */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Revenue & Utilization</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Revenue per Sq. Ft.</p>
                <p className="text-2xl font-bold">¥2,450</p>
                <p className="text-xs text-green-600 mt-1">↑ 8% from last quarter</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Avg. Event Duration</p>
                <p className="text-2xl font-bold">2.4 hrs</p>
                <p className="text-xs text-gray-500 mt-1">Across all studios</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Maintenance Cost</p>
                <p className="text-2xl font-bold">¥345K</p>
                <p className="text-xs text-red-600 mt-1">↑ 5% from last quarter</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

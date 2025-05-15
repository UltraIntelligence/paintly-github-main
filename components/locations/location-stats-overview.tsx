import { getLocationStats } from "./location-data"
import { Card, CardContent } from "@/components/ui/card"

export function LocationStatsOverview() {
  const stats = getLocationStats()

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-gray-500">Total Locations</p>
            <p className="text-2xl font-semibold">{stats.totalLocations}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-gray-500">Total Capacity</p>
            <p className="text-2xl font-semibold">{stats.totalCapacity} seats</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-gray-500">Average Utilization</p>
            <p className="text-2xl font-semibold">{stats.averageUtilization}%</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-gray-500">Events This Month</p>
            <p className="text-2xl font-semibold">{stats.eventsThisMonth}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

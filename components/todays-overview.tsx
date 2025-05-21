import { Card, CardContent } from "@/components/ui/card"
import { DailyStatistics } from "./daily-statistics"
import { TodaysEvents } from "./todays-events"
import { ActivityFeed } from "./activity-feed"

export function TodaysOverview() {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-6">
          {/* Header with title */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">Today's Overview</h2>
              <p className="text-sm text-gray-500">Real-time metrics and activities</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Last updated: Just now</span>
            </div>
          </div>

          {/* Daily Statistics */}
          <DailyStatistics />

          {/* Today's Events and Activity Feed side by side */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-3">Today's Events</h3>
              <div className="h-[calc(100%-2rem)]">
                <TodaysEvents />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Latest Activity</h3>
              <div className="h-[calc(100%-2rem)]">
                <ActivityFeed />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

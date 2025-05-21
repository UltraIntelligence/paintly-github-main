import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DailyStatistics } from "./daily-statistics"
import { TodaysEvents } from "./todays-events"
import { ActivityFeed } from "./activity-feed"

export function TodaysOverview() {
  return (
    <Card className="border-2 border-gray-100">
      <CardHeader className="bg-gray-50/50 pb-3">
        <CardTitle className="text-xl font-medium">Today's Overview</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-3">Daily Statistics</h3>
              <DailyStatistics />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">Today's Events</h3>
              <TodaysEvents />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Latest Activity</h3>
            <ActivityFeed />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

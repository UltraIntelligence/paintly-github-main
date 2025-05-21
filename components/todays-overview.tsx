import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DailyStatistics } from "./daily-statistics"
import { TodaysEvents } from "./todays-events"
import { ActivityFeed } from "./activity-feed"

export function TodaysOverview() {
  return (
    <Card className="border-2 border-gray-200">
      <CardHeader className="border-b border-gray-100 bg-gray-50">
        <CardTitle className="text-xl font-semibold text-gray-900">Today's Overview</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="space-y-4">
          <DailyStatistics />
          <TodaysEvents />

          <div className="pt-2">
            <ActivityFeed />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

import { Card, CardContent } from "@/components/ui/card"
import { TodaysEvents } from "./todays-events"
import { ActivityFeed } from "./activity-feed"
import { DailyStatistics } from "./daily-statistics"

export function TodaysOverview() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Today's Overview</h2>
        <p className="text-muted-foreground">Quick summary of today's events, statistics, and activity.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-2 lg:col-span-3">
          <CardContent className="p-0">
            <div className="p-6 pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Daily Statistics</h3>
                  <p className="text-sm text-gray-500">Overview of today's key metrics</p>
                </div>
              </div>
            </div>
            <DailyStatistics />
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-4">
          <CardContent className="p-0">
            <div className="p-6 pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Today's Events</h3>
                  <p className="text-sm text-gray-500">Schedule for May 21, 2025</p>
                </div>
              </div>
            </div>
            <div className="px-6 pb-6">
              <TodaysEvents />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3">
          <CardContent className="p-0">
            <div className="p-6 pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Latest Activity</h3>
                  <p className="text-sm text-gray-500">Recent bookings and interactions</p>
                </div>
              </div>
            </div>
            <div className="px-6 pb-6">
              <ActivityFeed />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

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
      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Daily Statistics - full width on mobile, 8/12 on desktop */}
          <div className="lg:col-span-8 space-y-6">
            <section>
              <h3 className="text-lg font-medium mb-4">Daily Statistics</h3>
              <DailyStatistics hideTitle />
            </section>

            <section>
              <h3 className="text-lg font-medium mb-4">Today's Events</h3>
              <TodaysEvents hideTitle />
            </section>
          </div>

          {/* Latest Activity - full width on mobile, 4/12 on desktop */}
          <div className="lg:col-span-4">
            <section>
              <h3 className="text-lg font-medium mb-4">Latest Activity</h3>
              <ActivityFeed hideTitle />
            </section>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

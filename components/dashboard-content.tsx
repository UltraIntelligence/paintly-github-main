import { Card, CardContent } from "@/components/ui/card"
import { SalesComparisonChart } from "./sales-comparison-chart"
import { WeeklyEvents } from "./weekly-events"
import { TodaysOverview } from "./todays-overview"
import { NotificationBanner } from "./notification-banner"

export function DashboardContent() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <NotificationBanner />
      <TodaysOverview />

      {/* Weekly Performance */}
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex flex-col space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Weekly Performance</h2>
                <p className="text-sm text-gray-500">Events and sales metrics for this week</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Week of May 20 - May 26</span>
              </div>
            </div>

            {/* Weekly Events and Sales Comparison side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Weekly Events</h3>
                <div className="h-[calc(100%-2rem)]">
                  <WeeklyEvents />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Sales Comparison</h3>
                <div className="h-[calc(100%-2rem)]">
                  <SalesComparisonChart />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="w-full">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-6">
              <div>
                <h2 className="text-xl font-bold">Most Popular Events</h2>
                <p className="text-sm text-gray-500">Top performing events in the last 30 days</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center">
                    <div className="w-2 h-10 rounded-full mr-3 bg-blue-500"></div>
                    <div>
                      <p className="font-medium">Starry Night Recreation</p>
                      <p className="text-xs text-gray-500">58 Bookings • 97% capacity</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="font-bold text-lg">¥348K</p>
                    <span className="ml-2 text-green-600">↑</span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center">
                    <div className="w-2 h-10 rounded-full mr-3 bg-blue-500"></div>
                    <div>
                      <p className="font-medium">Cherry Blossoms by the River</p>
                      <p className="text-xs text-gray-500">45 Bookings • 90% capacity</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="font-bold text-lg">¥270K</p>
                    <span className="ml-2 text-green-600">↑</span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center">
                    <div className="w-2 h-10 rounded-full mr-3 bg-blue-500"></div>
                    <div>
                      <p className="font-medium">Kids Safari Adventure</p>
                      <p className="text-xs text-gray-500">32 Bookings • 80% capacity</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="font-bold text-lg">¥192K</p>
                    <span className="ml-2 text-gray-600">→</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-6">
              <div>
                <h2 className="text-xl font-bold">Busiest Upcoming Days</h2>
                <p className="text-sm text-gray-500">Highest booking rates in the next 14 days</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center">
                    <div className="w-2 h-10 rounded-full mr-3 bg-green-500"></div>
                    <div>
                      <p className="font-medium">Saturday, May 25th</p>
                      <p className="text-xs text-gray-500">12 events • 95% booked</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="font-bold text-lg">95%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center">
                    <div className="w-2 h-10 rounded-full mr-3 bg-green-500"></div>
                    <div>
                      <p className="font-medium">Friday, May 24th</p>
                      <p className="text-xs text-gray-500">10 events • 80% booked</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="font-bold text-lg">80%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center">
                    <div className="w-2 h-10 rounded-full mr-3 bg-amber-500"></div>
                    <div>
                      <p className="font-medium">Sunday, May 26th</p>
                      <p className="text-xs text-gray-500">8 events • 70% booked</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="font-bold text-lg">70%</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <h3 className="text-sm font-medium mb-2">Booking Trend</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-xs w-24">Weekdays</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                    <span className="text-xs ml-2 w-8">65%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs w-24">Weekends</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                    <span className="text-xs ml-2 w-8">92%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

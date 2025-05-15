import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function TopPerformerLists() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 lg:px-6 pb-6">
      <Card>
        <div className="pb-2">
          <h3 className="text-lg font-semibold text-gray-900">Most Popular Events (Last 30 Days)</h3>
        </div>
        <CardContent className="p-0">
          <ol className="space-y-4">
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-700">
                  1
                </span>
                <span className="text-sm font-medium text-gray-900">Starry Night Recreation</span>
              </div>
              <span className="text-sm text-gray-600">58 Bookings</span>
            </li>
            <Separator className="bg-gray-100" />
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-700">
                  2
                </span>
                <span className="text-sm font-medium text-gray-900">Cherry Blossoms by the River</span>
              </div>
              <span className="text-sm text-gray-600">45 Bookings</span>
            </li>
            <Separator className="bg-gray-100" />
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-700">
                  3
                </span>
                <span className="text-sm font-medium text-gray-900">Kids Safari Adventure</span>
              </div>
              <span className="text-sm text-gray-600">32 Bookings</span>
            </li>
          </ol>
        </CardContent>
      </Card>

      <Card>
        <div className="pb-2">
          <h3 className="text-lg font-semibold text-gray-900">Busiest Upcoming Days (Next 14 Days)</h3>
        </div>
        <CardContent className="p-0">
          <ol className="space-y-4">
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-700">
                  1
                </span>
                <span className="text-sm font-medium text-gray-900">Saturday, May 25th</span>
              </div>
              <span className="text-sm font-medium text-green-700">95% Booked</span>
            </li>
            <Separator className="bg-gray-100" />
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-700">
                  2
                </span>
                <span className="text-sm font-medium text-gray-900">Friday, May 24th</span>
              </div>
              <span className="text-sm font-medium text-green-700">80% Booked</span>
            </li>
            <Separator className="bg-gray-100" />
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-700">
                  3
                </span>
                <span className="text-sm font-medium text-gray-900">Sunday, May 26th</span>
              </div>
              <span className="text-sm font-medium text-green-700">70% Booked</span>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}

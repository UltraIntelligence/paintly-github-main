import { ArrowUpIcon } from "lucide-react"
import Link from "next/link"

export function EventStatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 mb-4">
      {/* Quick Overview - full width */}
      <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
        {/* Title Area */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900">Events Overview</h2>
          <p className="text-sm text-gray-500">Comprehensive snapshot of all event templates</p>
        </div>

        <div className="flex items-start justify-between">
          <div className="w-full">
            {/* Top Event highlight */}
            <div className="mt-3 mb-4 border-l-4 border-blue-500 bg-blue-50 p-3 rounded-r-md">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Top Event: Sunset Beach Painting</h4>
                  <p className="text-sm text-gray-600">32 bookings | ¥420,000 revenue</p>
                </div>
                <div className="flex items-center">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 mr-2">
                    <ArrowUpIcon className="mr-1 h-3 w-3" />
                    +15%
                  </span>
                  <Link href="/events/schedule" className="text-blue-600 text-sm hover:underline">
                    Schedule More
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-500">Active Events</p>
                <p className="text-lg font-semibold">42</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Avg Utilization</p>
                <p className="text-lg font-semibold">68%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">New This Month</p>
                <p className="text-lg font-semibold">3</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Revenue</p>
                <p className="text-lg font-semibold">¥1.2M</p>
              </div>
            </div>

            {/* Additional stats in the extended card */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-500">Avg Attendance</p>
                <p className="text-lg font-semibold">76%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Templates</p>
                <p className="text-lg font-semibold">12</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Instructor Count</p>
                <p className="text-lg font-semibold">18</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Locations</p>
                <p className="text-lg font-semibold">5</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="h-8 w-full">
            <div className="flex h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div className="h-full w-[45%] bg-blue-500"></div>
              <div className="h-full w-[30%] bg-green-500"></div>
              <div className="h-full w-[25%] bg-purple-500"></div>
            </div>
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>Regular (45%)</span>
              <span>Family (30%)</span>
              <span>Corporate (25%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

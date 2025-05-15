import { ArrowUpIcon, CalendarIcon, BarChart2Icon, AlertTriangleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function EventStatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      {/* This Month's Top Event */}
      <div className="bg-white border border-gray-100 rounded-lg p-4 hover:border-gray-200 transition-colors">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="relative h-10 w-10 flex-shrink-0 bg-gray-100 rounded-md">
              {/* Replaced image with a colored div to avoid loading issues */}
              <div className="absolute inset-0 bg-blue-100 rounded-md"></div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Sunset Beach Painting</h3>
              <p className="text-sm text-gray-600">32 bookings | ¥420,000 revenue</p>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center">
            <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
              <ArrowUpIcon className="mr-1 h-3 w-3" />
              +15%
            </span>
          </div>
          <Link href="/events/schedule" className="text-blue-600 text-sm hover:underline">
            Schedule More
          </Link>
        </div>
      </div>

      {/* Events Needing Attention */}
      <div className="bg-white border border-gray-100 rounded-lg p-4 hover:border-gray-200 transition-colors">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-yellow-100">
              <AlertTriangleIcon className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-900">Events Needing Attention</h3>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">3 events</span>
              </div>
              <p className="text-sm text-gray-600">Low bookings this month</p>
            </div>
          </div>
        </div>
        <div className="mt-3 space-y-1">
          <p className="text-sm text-gray-800">• Kids Watercolor Adventure</p>
          <p className="text-sm text-gray-800">• Winter Landscape</p>
          <div className="flex justify-end">
            <Link href="/events/attention" className="text-blue-600 text-sm hover:underline">
              View All
            </Link>
          </div>
        </div>
      </div>

      {/* Seasonal Reminders */}
      <div className="bg-white border border-gray-100 rounded-lg p-4 hover:border-gray-200 transition-colors">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-100">
              <CalendarIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Activate Winter Collection</h3>
              <p className="text-sm text-gray-600">5 events ready for December</p>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-800">In 12 days</span>
          <Button variant="outline" size="sm">
            Activate Now
          </Button>
        </div>
      </div>

      {/* Quick Overview */}
      <div className="bg-white border border-gray-100 rounded-lg p-4 hover:border-gray-200 transition-colors">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-gray-900">Quick Overview</h3>
            <div className="mt-2 grid grid-cols-3 gap-2">
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
            </div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100">
            <BarChart2Icon className="h-5 w-5 text-gray-600" />
          </div>
        </div>
        <div className="mt-3">
          <div className="h-8 w-full">
            <div className="flex h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div className="h-full w-[45%] bg-blue-500"></div>
              <div className="h-full w-[30%] bg-green-500"></div>
              <div className="h-full w-[25%] bg-purple-500"></div>
            </div>
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>Regular</span>
              <span>Family</span>
              <span>Corporate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

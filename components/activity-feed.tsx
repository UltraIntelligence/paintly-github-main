import { ActivityItem } from "./activity-item"
import { Button } from "@/components/ui/button"
import { ChevronRightIcon } from "lucide-react"

// Sample activity data
const activities = [
  {
    type: "booking" as const,
    title: "1 spot booked",
    time: "2 mins ago",
    event: "Family Fun Creative Canvas - Heart",
  },
  {
    type: "declined" as const,
    title: "Card Declined",
    time: "5 mins ago",
    event: "Family Fun Creative Canvas - Heart",
  },
  {
    type: "declined" as const,
    title: "Card Declined",
    time: "8 mins ago",
    event: "Family Fun Creative Canvas - Heart",
  },
  {
    type: "booking" as const,
    title: "2 spots booked",
    time: "15 mins ago",
    event: "Kids Play Date Special Event",
  },
  {
    type: "review" as const,
    title: "New Positive Review",
    time: "1 hour ago",
    event: "Family Fun Creative Canvas - Heart",
  },
  {
    type: "view" as const,
    title: "Event Page Viewed",
    time: "2 hours ago",
    event: "Watercolor Workshop - Beginners",
  },
  {
    type: "refund" as const,
    title: "Refund Processed",
    time: "3 hours ago",
    event: "Abstract Art Exploration",
  },
]

export function ActivityFeed() {
  return (
    <div className="bg-gray-50 rounded-lg p-4 h-full flex flex-col">
      <div className="flex-grow overflow-hidden">
        <div className="h-[280px] overflow-y-auto">
          {activities.map((activity, index) => (
            <ActivityItem
              key={index}
              type={activity.type}
              title={activity.title}
              time={activity.time}
              event={activity.event}
            />
          ))}
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-gray-200">
        <Button variant="ghost" size="sm" className="text-xs text-blue-600 h-7 px-2 w-full justify-center">
          View all activity
          <ChevronRightIcon className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

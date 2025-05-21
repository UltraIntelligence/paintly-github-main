import { Circle } from "lucide-react"
import { cn } from "@/lib/utils"

type ActivityType = "booking" | "declined" | "review" | "view" | "refund"

interface ActivityItemProps {
  type: ActivityType
  title: string
  time: string
  event: string
}

export function ActivityItem({ type, title, time, event }: ActivityItemProps) {
  const getIconColor = (type: ActivityType) => {
    switch (type) {
      case "booking":
        return "text-green-500 bg-green-50"
      case "declined":
        return "text-red-500 bg-red-50"
      case "review":
        return "text-purple-500 bg-purple-50"
      case "view":
        return "text-blue-500 bg-blue-50"
      case "refund":
        return "text-amber-500 bg-amber-50"
      default:
        return "text-gray-500 bg-gray-50"
    }
  }

  const getIcon = (type: ActivityType) => {
    return <Circle className="h-3 w-3" />
  }

  return (
    <div className="flex items-start space-x-3 py-3">
      <div className={cn("p-1.5 rounded-full", getIconColor(type))}>{getIcon(type)}</div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{title}</p>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <p className="text-xs text-gray-500">{event}</p>
      </div>
    </div>
  )
}

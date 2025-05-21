import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, CheckCircle, AlertCircle, Calendar } from "lucide-react"

const activities = [
  {
    type: "booked",
    icon: CheckCircle,
    iconColor: "text-green-500",
    iconBg: "bg-green-100",
    message: "Event booked",
    time: "2 mins ago",
    detail: "Family Fun Creative Canvas - Heart",
  },
  {
    type: "declined",
    icon: AlertCircle,
    iconColor: "text-red-500",
    iconBg: "bg-red-100",
    message: "Card Declined",
    time: "5 mins ago",
    detail: "Family Fun Creative Canvas - Heart",
  },
  {
    type: "booked",
    icon: CheckCircle,
    iconColor: "text-green-500",
    iconBg: "bg-green-100",
    message: "Event booked",
    time: "10 mins ago",
    detail: "Family Fun Creative Canvas - Heart",
  },
  {
    type: "review",
    icon: Calendar,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-100",
    message: "New Portfolio Review",
    time: "1 hour ago",
    detail: "Family Fun Creative Canvas - Heart",
  },
]

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
        <h3 className="text-lg font-semibold text-gray-900">Last Activity</h3>
        <Button variant="ghost" size="sm" className="text-sm text-gray-500 hover:text-gray-900">
          View all <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start">
              <div className={`rounded-full p-2 ${activity.iconBg} mr-3`}>
                <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900">{activity.message}</span>
                  <span className="text-xs text-gray-500 ml-2">{activity.time}</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{activity.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

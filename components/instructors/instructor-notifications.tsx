import { AlertCircleIcon, BellIcon, ClockIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function InstructorNotifications() {
  const notifications = [
    {
      icon: BellIcon,
      title: "New availability submissions",
      description: "3 instructors have submitted their availability for next month. Review and approve.",
      type: "warning",
    },
    {
      icon: AlertCircleIcon,
      title: "Missing Availability",
      description: "4 instructors have not submitted their availability for next month.",
      type: "error",
    },
    {
      icon: ClockIcon,
      title: "Instructor Reviews",
      description: "15 new student reviews need to be approved before publishing.",
      type: "info",
    },
  ]

  return (
    <div className="space-y-4 px-4 lg:px-6">
      {notifications.map((notification, index) => (
        <Card
          key={index}
          className={
            notification.type === "warning"
              ? "border-yellow-100 bg-yellow-50"
              : notification.type === "error"
                ? "border-red-100 bg-red-50"
                : "border-blue-100 bg-blue-50"
          }
        >
          <CardContent className="p-0 flex items-start gap-3">
            <notification.icon
              className={`h-5 w-5 mt-0.5 ${
                notification.type === "warning"
                  ? "text-yellow-700"
                  : notification.type === "error"
                    ? "text-red-700"
                    : "text-blue-700"
              }`}
            />
            <div>
              <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
              <p className="text-sm text-gray-600">{notification.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

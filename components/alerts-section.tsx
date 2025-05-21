import { AlertCircleIcon, BellIcon, ClockIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function AlertsSection() {
  const alerts = [
    {
      icon: BellIcon,
      title: "New staff availability submitted",
      description: "Instructor Maria Garcia has submitted availability for June. Review and approve.",
      type: "warning",
    },
    {
      icon: AlertCircleIcon,
      title: "Scheduling Conflicts",
      description: "2 scheduling conflicts detected for next week. Review and resolve.",
      type: "error",
    },
    {
      icon: ClockIcon,
      title: "Pending Staff Availability",
      description: "3 instructors have not submitted their availability for next month.",
      type: "info",
    },
  ]

  return (
    <div className="space-y-4 px-4 lg:px-6">
      {alerts.map((alert, index) => (
        <Card
          key={index}
          className={
            alert.type === "warning"
              ? "border-yellow-100 bg-yellow-50"
              : alert.type === "error"
                ? "border-red-100 bg-red-50"
                : "border-blue-100 bg-blue-50"
          }
        >
          <CardContent className="p-0 flex items-start gap-3">
            <alert.icon
              className={`h-5 w-5 mt-0.5 ${
                alert.type === "warning" ? "text-yellow-700" : alert.type === "error" ? "text-red-700" : "text-blue-700"
              }`}
            />
            <div>
              <h4 className="text-sm font-medium text-gray-900">{alert.title}</h4>
              <p className="text-sm text-gray-600">{alert.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

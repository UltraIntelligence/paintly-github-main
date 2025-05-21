"use client"

import { AlertCircleIcon, BellIcon, ClockIcon, X } from "lucide-react"
import { useState } from "react"
import { Card } from "@/components/ui/card"

export function AlertsSection() {
  const initialAlerts = [
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

  const [alerts, setAlerts] = useState(initialAlerts)

  const dismissAlert = (index: number) => {
    setAlerts(alerts.filter((_, i) => i !== index))
  }

  if (alerts.length === 0) {
    return null
  }

  return (
    <div className="space-y-3 mb-6">
      {alerts.map((alert, index) => (
        <Card
          key={index}
          className={`p-4 flex items-start gap-3 relative ${
            alert.type === "warning"
              ? "bg-amber-50 border-amber-100"
              : alert.type === "error"
                ? "bg-red-50 border-red-100"
                : "bg-blue-50 border-blue-100"
          }`}
        >
          <div
            className={`rounded-full p-1.5 ${
              alert.type === "warning" ? "bg-amber-100" : alert.type === "error" ? "bg-red-100" : "bg-blue-100"
            }`}
          >
            <alert.icon
              className={`h-4 w-4 ${
                alert.type === "warning" ? "text-amber-600" : alert.type === "error" ? "text-red-600" : "text-blue-600"
              }`}
            />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-card-foreground">{alert.title}</h4>
            <p className="text-sm text-muted-foreground">{alert.description}</p>
          </div>
          <button
            onClick={() => dismissAlert(index)}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        </Card>
      ))}
    </div>
  )
}

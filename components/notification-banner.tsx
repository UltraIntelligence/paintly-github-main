"use client"

import { useState, useEffect } from "react"
import { X, AlertCircle, Bell, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type Notification = {
  id: string
  icon: typeof Bell | typeof AlertCircle | typeof Clock
  title: string
  description: string
  type: "warning" | "error" | "info"
}

export function NotificationBanner() {
  // Define our notifications
  const notifications: Notification[] = [
    {
      id: "staff-availability",
      icon: Bell,
      title: "New staff availability submitted",
      description: "Instructor Maria Garcia has submitted availability for June. Review and approve.",
      type: "warning",
    },
    {
      id: "scheduling-conflicts",
      icon: AlertCircle,
      title: "Scheduling Conflicts",
      description: "2 scheduling conflicts detected for next week. Review and resolve.",
      type: "error",
    },
    {
      id: "pending-availability",
      icon: Clock,
      title: "Pending Staff Availability",
      description: "3 instructors have not submitted their availability for next month.",
      type: "info",
    },
  ]

  // State to track which notifications have been dismissed
  const [dismissedNotifications, setDismissedNotifications] = useState<Record<string, boolean>>({})
  const [activeNotificationIndex, setActiveNotificationIndex] = useState(0)

  // Load dismissed notifications from localStorage on component mount
  useEffect(() => {
    const savedDismissed = localStorage.getItem("dismissedNotifications")
    if (savedDismissed) {
      setDismissedNotifications(JSON.parse(savedDismissed))
    }
  }, [])

  // Filter out dismissed notifications
  const activeNotifications = notifications.filter((notification) => !dismissedNotifications[notification.id])

  // If all notifications are dismissed, don't render anything
  if (activeNotifications.length === 0) {
    return null
  }

  const currentNotification = activeNotifications[activeNotificationIndex]

  // Handle dismissing a notification
  const dismissNotification = (id: string) => {
    const newDismissed = { ...dismissedNotifications, [id]: true }
    setDismissedNotifications(newDismissed)
    localStorage.setItem("dismissedNotifications", JSON.stringify(newDismissed))

    // If we dismissed the last notification in the list, go back to the first one
    if (activeNotificationIndex >= activeNotifications.length - 1) {
      setActiveNotificationIndex(0)
    }
  }

  // Handle cycling through notifications
  const nextNotification = () => {
    setActiveNotificationIndex((prev) => (prev < activeNotifications.length - 1 ? prev + 1 : 0))
  }

  return (
    <Card
      className={`mb-4 overflow-hidden border-l-4 ${
        currentNotification.type === "warning"
          ? "border-l-yellow-500 bg-yellow-50"
          : currentNotification.type === "error"
            ? "border-l-red-500 bg-red-50"
            : "border-l-blue-500 bg-blue-50"
      }`}
    >
      <div className="relative flex items-center justify-between p-4">
        <div className="flex items-start gap-3">
          <currentNotification.icon
            className={`h-5 w-5 mt-0.5 ${
              currentNotification.type === "warning"
                ? "text-yellow-700"
                : currentNotification.type === "error"
                  ? "text-red-700"
                  : "text-blue-700"
            }`}
          />
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-900">{currentNotification.title}</h4>
            <p className="text-sm text-gray-600">{currentNotification.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeNotifications.length > 1 && (
            <div className="flex items-center gap-1 mr-2">
              <span className="text-xs text-gray-500">
                {activeNotificationIndex + 1}/{activeNotifications.length}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={nextNotification}
                aria-label="Next notification"
              >
                <span className="sr-only">Next</span>
                <span aria-hidden="true">›</span>
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => dismissNotification(currentNotification.id)}
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Dismiss</span>
          </Button>
        </div>
      </div>
    </Card>
  )
}

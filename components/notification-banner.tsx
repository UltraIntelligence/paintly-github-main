"use client"

import { useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight, AlertTriangle, AlertCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

type NotificationType = "warning" | "error" | "info"

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
}

export function NotificationBanner() {
  // Define our notifications
  const notifications: Notification[] = [
    {
      id: "staff-availability",
      type: "info",
      title: "New staff availability submitted",
      message: "Instructor Maria Garcia has submitted availability for June. Review and approve.",
    },
    {
      id: "scheduling-conflicts",
      type: "error",
      title: "Scheduling Conflicts",
      message: "2 scheduling conflicts detected for next week. Review and resolve.",
    },
    {
      id: "pending-availability",
      type: "warning",
      title: "Pending Staff Availability",
      message: "3 instructors have not submitted their availability for next month.",
    },
  ]

  // State for tracking dismissed notifications and current notification index
  const [dismissedNotifications, setDismissedNotifications] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  // Load dismissed notifications from localStorage on component mount
  useEffect(() => {
    const storedDismissed = localStorage.getItem("dismissedNotifications")
    if (storedDismissed) {
      setDismissedNotifications(JSON.parse(storedDismissed))
    }
  }, [])

  // Filter out dismissed notifications
  const activeNotifications = notifications.filter((notification) => !dismissedNotifications.includes(notification.id))

  // If no active notifications, don't render the banner
  if (activeNotifications.length === 0) {
    return null
  }

  // Ensure currentIndex is within bounds
  const safeCurrentIndex = Math.min(currentIndex, activeNotifications.length - 1)
  const currentNotification = activeNotifications[safeCurrentIndex]

  // Function to dismiss a notification
  const dismissNotification = (id: string) => {
    const newDismissed = [...dismissedNotifications, id]
    setDismissedNotifications(newDismissed)
    localStorage.setItem("dismissedNotifications", JSON.stringify(newDismissed))

    // If we dismissed the last notification at the current index, go to previous notification
    if (safeCurrentIndex >= activeNotifications.length - 1 && safeCurrentIndex > 0) {
      setCurrentIndex(safeCurrentIndex - 1)
    }
  }

  // Get the appropriate icon based on notification type
  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-6 w-6" />
      case "error":
        return <AlertCircle className="h-6 w-6" />
      case "info":
      default:
        return <Info className="h-6 w-6" />
    }
  }

  // Get the appropriate color classes based on notification type
  const getColorClasses = (type: NotificationType) => {
    switch (type) {
      case "warning":
        return "border-amber-500 bg-amber-50 text-amber-800"
      case "error":
        return "border-red-500 bg-red-50 text-red-800"
      case "info":
      default:
        return "border-blue-500 bg-blue-50 text-blue-800"
    }
  }

  return (
    <div
      className={`relative mb-6 rounded-md border-l-[6px] p-5 shadow-md ${getColorClasses(currentNotification.type)}`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">{getIcon(currentNotification.type)}</div>
          <div className="ml-4">
            <h3 className="text-base font-bold">{currentNotification.title}</h3>
            <div className="mt-1 text-sm font-medium">{currentNotification.message}</div>
          </div>
        </div>
        <div className="ml-4 flex-shrink-0 flex items-center">
          {activeNotifications.length > 1 && (
            <div className="flex items-center mr-4 text-sm bg-white bg-opacity-50 px-3 py-1 rounded-full">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full hover:bg-white hover:bg-opacity-70"
                onClick={() =>
                  setCurrentIndex((safeCurrentIndex - 1 + activeNotifications.length) % activeNotifications.length)
                }
                aria-label="Previous notification"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="mx-2 font-medium">
                {safeCurrentIndex + 1}/{activeNotifications.length}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full hover:bg-white hover:bg-opacity-70"
                onClick={() => setCurrentIndex((safeCurrentIndex + 1) % activeNotifications.length)}
                aria-label="Next notification"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-white bg-opacity-50 hover:bg-opacity-70"
            onClick={() => dismissNotification(currentNotification.id)}
            aria-label="Dismiss notification"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

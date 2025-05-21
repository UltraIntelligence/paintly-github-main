"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AlertCircleIcon, BellIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

type NotificationType = "warning" | "error" | "info"

interface Notification {
  id: string
  icon: React.ElementType
  title: string
  description: string
  type: NotificationType
}

export function NotificationBanner() {
  const notifications: Notification[] = [
    {
      id: "new-availability",
      icon: BellIcon,
      title: "New staff availability submitted",
      description: "Instructor Maria Garcia has submitted availability for June. Review and approve.",
      type: "warning",
    },
    {
      id: "scheduling-conflicts",
      icon: AlertCircleIcon,
      title: "Scheduling Conflicts",
      description: "2 scheduling conflicts detected for next week. Review and resolve.",
      type: "error",
    },
    {
      id: "pending-availability",
      icon: ClockIcon,
      title: "Pending Staff Availability",
      description: "3 instructors have not submitted their availability for next month.",
      type: "info",
    },
  ]

  const [dismissedNotifications, setDismissedNotifications] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  // Load dismissed notifications from localStorage on component mount
  useEffect(() => {
    const savedDismissed = localStorage.getItem("dismissedNotifications")
    if (savedDismissed) {
      setDismissedNotifications(JSON.parse(savedDismissed))
    }
  }, [])

  // Filter out dismissed notifications
  const activeNotifications = notifications.filter((notification) => !dismissedNotifications.includes(notification.id))

  // If there are no active notifications, don't render the banner
  if (activeNotifications.length === 0) {
    return null
  }

  // Ensure currentIndex is within bounds
  const safeIndex = Math.min(currentIndex, activeNotifications.length - 1)
  const currentNotification = activeNotifications[safeIndex]

  // Handle dismissing a notification
  const dismissNotification = (id: string) => {
    const newDismissed = [...dismissedNotifications, id]
    setDismissedNotifications(newDismissed)
    localStorage.setItem("dismissedNotifications", JSON.stringify(newDismissed))

    // If we dismissed the current notification and it was the last one, go to previous
    if (safeIndex >= activeNotifications.length - 1 && safeIndex > 0) {
      setCurrentIndex(safeIndex - 1)
    }
  }

  // Get background and border colors based on notification type
  const getTypeStyles = (type: NotificationType) => {
    switch (type) {
      case "warning":
        return "border-yellow-400 bg-yellow-50"
      case "error":
        return "border-red-400 bg-red-50"
      case "info":
        return "border-blue-400 bg-blue-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  // Get icon color based on notification type
  const getIconColor = (type: NotificationType) => {
    switch (type) {
      case "warning":
        return "text-yellow-700"
      case "error":
        return "text-red-700"
      case "info":
        return "text-blue-700"
      default:
        return "text-gray-700"
    }
  }

  return (
    <div className={`mb-4 rounded-md border-l-4 p-4 ${getTypeStyles(currentNotification.type)}`} role="alert">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className={`mt-0.5 ${getIconColor(currentNotification.type)}`}>
            <currentNotification.icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">{currentNotification.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{currentNotification.description}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {activeNotifications.length > 1 && (
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 rounded-full p-0"
                onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev))}
                disabled={safeIndex === 0}
                aria-label="Previous notification"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>

              <span className="text-xs text-gray-500">
                {safeIndex + 1}/{activeNotifications.length}
              </span>

              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 rounded-full p-0"
                onClick={() => setCurrentIndex((prev) => (prev < activeNotifications.length - 1 ? prev + 1 : prev))}
                disabled={safeIndex === activeNotifications.length - 1}
                aria-label="Next notification"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 rounded-full p-0"
            onClick={() => dismissNotification(currentNotification.id)}
            aria-label="Dismiss notification"
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

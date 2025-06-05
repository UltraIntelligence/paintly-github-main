"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, User } from "lucide-react"

// Update the PaintlyEventCardProps interface to include date
interface PaintlyEventCardProps {
  title: string
  titleJp?: string
  subtitle: string
  participants: { current: number; capacity: number }
  time: string
  date: string // Add date prop
  location: string
  instructor?: string
  status?: "Live" | "Scheduled" | "Completed"
  onAction?: () => void
  actionText?: string
  image?: string
}

// Update the function parameters to include date
export function PaintlyEventCard({
  title,
  titleJp,
  subtitle,
  participants,
  time,
  date,
  location,
  instructor,
  status = "Scheduled",
  onAction,
  actionText = "View Details",
  image,
}: PaintlyEventCardProps) {
  const progressPercentage = Math.round((participants.current / participants.capacity) * 100)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-red-500 text-white"
      case "Completed":
        return "bg-gray-500 text-white"
      default:
        return "bg-blue-500 text-white"
    }
  }

  const getProgressColor = (percentage: number) => {
    if (percentage < 60) return "bg-red-500"
    if (percentage <= 90) return "bg-yellow-500"
    return "bg-green-500"
  }

  // Format date to display "Today", "Tomorrow", or the formatted date
  const formatDate = (dateString: string) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const eventDate = new Date(dateString)
    eventDate.setHours(0, 0, 0, 0)

    if (eventDate.getTime() === today.getTime()) {
      return "Today"
    } else if (eventDate.getTime() === tomorrow.getTime()) {
      return "Tomorrow"
    } else {
      // Format as "May 19, 2025"
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    }
  }

  return (
    <Card className="group hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-gray-300 mb-4">
      <CardContent className="p-6">
        <div className="flex items-start gap-6">
          {/* Left: Event Image */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
              <img src="/placeholder.svg?height=96&width=96" alt={title} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Center: Event Details */}
          <div className="flex-1 min-w-0 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900 truncate">{title}</h3>
                  {status && <Badge className={`text-xs px-2 py-0.5 ${getStatusColor(status)}`}>{status}</Badge>}
                </div>
                {titleJp && <p className="text-sm text-gray-500">{titleJp}</p>}
                <p className="text-sm text-gray-600">{subtitle}</p>
              </div>

              {/* Action Button - Moved to right side */}
              {onAction && (
                <Button variant="outline" size="sm" onClick={onAction} className="whitespace-nowrap ml-4">
                  {actionText}
                </Button>
              )}
            </div>

            {/* Metadata */}
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>
                  {formatDate(date)} • {time}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{location}</span>
              </div>
              {instructor && (
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  <span className="truncate">{instructor}</span>
                </div>
              )}
            </div>

            {/* Horizontal Progress Bar */}
            <div className="w-full">
              <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                <span>Participants</span>
                <span className="font-medium">
                  {participants.current}/{participants.capacity} ({progressPercentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full transition-all duration-300 ${getProgressColor(progressPercentage)}`}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

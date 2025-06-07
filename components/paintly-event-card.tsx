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
  onViewDetails?: () => void // Add this line
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
  onViewDetails, // Add this line
}: PaintlyEventCardProps) {
  const progressPercentage = Math.round((participants.current / participants.capacity) * 100)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-red-500 text-white shadow-lg shadow-red-500/25"
      case "Completed":
        return "bg-gray-500 text-white shadow-lg shadow-gray-500/25"
      default:
        return "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
    }
  }

  const getProgressColor = (percentage: number) => {
    if (percentage < 60) return "bg-gradient-to-r from-red-400 to-red-500"
    if (percentage <= 90) return "bg-gradient-to-r from-yellow-400 to-yellow-500"
    return "bg-gradient-to-r from-green-400 to-green-500"
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
    <Card className="neu-card neu-hover border-0 bg-background/50 backdrop-blur-sm transition-all duration-300">
      <CardContent className="p-8">
        <div className="flex items-start gap-8">
          {/* Left: Event Image */}
          <div className="flex-shrink-0">
            <div className="w-28 h-28 neu-inset rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
              <img src="/placeholder.svg?height=112&width=112" alt={title} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Center: Event Details */}
          <div className="flex-1 min-w-0 space-y-5">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-lg text-foreground truncate">{title}</h3>
                  {status && (
                    <Badge className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(status)}`}>
                      {status}
                    </Badge>
                  )}
                </div>
                {titleJp && <p className="text-sm text-muted-foreground font-medium">{titleJp}</p>}
                <p className="text-sm text-foreground/70">{subtitle}</p>
              </div>

              {/* Action Button - Moved to right side */}
              {(onViewDetails || onAction) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onViewDetails || onAction}
                  className="neu-button whitespace-nowrap ml-6 h-10 px-4 font-medium"
                >
                  View Details
                </Button>
              )}
            </div>

            {/* Metadata */}
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="neu-flat p-1.5 rounded-lg">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="font-medium">
                  {formatDate(date)} • {time}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="neu-flat p-1.5 rounded-lg">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="truncate font-medium">{location}</span>
              </div>
              {instructor && (
                <div className="flex items-center gap-2">
                  <div className="neu-flat p-1.5 rounded-lg">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="truncate font-medium">{instructor}</span>
                </div>
              )}
            </div>

            {/* Horizontal Progress Bar */}
            <div className="w-full">
              <div className="flex justify-between text-xs text-muted-foreground mb-3">
                <span className="font-medium">Participants</span>
                <span className="font-semibold">
                  {participants.current}/{participants.capacity} ({progressPercentage}%)
                </span>
              </div>
              <div className="w-full neu-inset rounded-full h-3 p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${getProgressColor(progressPercentage)} shadow-sm`}
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

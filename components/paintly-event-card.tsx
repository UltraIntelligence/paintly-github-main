"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, User } from "lucide-react"

interface PaintlyEventCardProps {
  title: string
  titleJp?: string
  subtitle: string
  participants: { current: number; capacity: number }
  time: string
  location: string
  instructor?: string
  status?: "Live" | "Scheduled" | "Completed"
  onAction?: () => void
  actionText?: string
  image?: string
}

export function PaintlyEventCard({
  title,
  titleJp,
  subtitle,
  participants,
  time,
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

  return (
    <Card className="group hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-gray-300 mb-4">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Left: Event Image */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
              <img src="/placeholder.svg?height=80&width=80" alt={title} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Center: Event Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">{title}</h3>
                  {status && <Badge className={`text-xs px-2 py-0.5 ${getStatusColor(status)}`}>{status}</Badge>}
                </div>
                {titleJp && <p className="text-sm text-gray-500 mb-1">{titleJp}</p>}
                <p className="text-sm text-gray-600 mb-2">{subtitle}</p>
              </div>

              {/* Action Button - Moved to right side */}
              {onAction && (
                <Button variant="outline" size="sm" onClick={onAction} className="whitespace-nowrap ml-4">
                  {actionText}
                </Button>
              )}
            </div>

            {/* Metadata */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{time}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{location}</span>
              </div>
              {instructor && (
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span className="truncate">{instructor}</span>
                </div>
              )}
            </div>

            {/* Horizontal Progress Bar */}
            <div className="w-full">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Participants</span>
                <span className="font-medium">
                  {participants.current}/{participants.capacity} ({progressPercentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(progressPercentage)}`}
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

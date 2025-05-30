"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Helper function to parse capacity string like "8/12"
export function parseCapacity(capacityString: string): { current: number; total: number } {
  const [current, total] = capacityString.split("/").map(Number)
  return { current, total }
}

export interface EventCardProps {
  event: {
    id: number | string
    title: string
    subtitle?: string // Optional subtitle (e.g. English title)
    time?: string
    location?: string
    capacity: string
    status?: string
    instructor?: string
    instructorAvatar?: string
    instructorInitials?: string
    image?: string
    price?: string
    actionLabel?: string
    actionStatus?: "none" | "pending" | "success" | "error"
    onClick?: () => void
    onAction?: () => void
  }
  variant?: "default" | "compact" | "detailed"
  className?: string
}

export function EventCard({ event, variant = "default", className = "" }: EventCardProps) {
  const [actionStatus, setActionStatus] = useState<"none" | "pending" | "success" | "error">(
    event.actionStatus || "none",
  )

  const { current, total } = parseCapacity(event.capacity)
  const progressPercentage = (current / total) * 100

  const getProgressColor = () => {
    if (progressPercentage >= 100) return "bg-red-500"
    if (progressPercentage >= 80) return "bg-amber-500"
    return "bg-green-500"
  }

  const getStatusBadge = () => {
    if (!event.status) return null

    if (event.status === "Live") {
      return <Badge className="text-xs px-2 py-1 bg-blue-500 text-white animate-pulse">Live</Badge>
    }

    if (event.status === "Sold Out") {
      return <Badge className="text-xs px-2 py-1 bg-red-500 text-white">Sold Out</Badge>
    }

    return null
  }

  const handleAction = async () => {
    if (actionStatus === "pending" || !event.onAction) return

    setActionStatus("pending")
    try {
      await event.onAction()
      setActionStatus("success")
    } catch (error) {
      setActionStatus("error")
    }
  }

  // Generate subtitle if not provided
  const subtitle =
    event.subtitle ||
    (event.title.includes("Van Gogh")
      ? "Van Gogh Starry Night"
      : event.title.includes("モネ")
        ? "Monet Water Lilies"
        : event.title.includes("ポーリング")
          ? "Paint Pouring"
          : event.title.includes("北斎")
            ? "Hokusai Great Wave"
            : event.title.includes("マネ")
              ? "Manet's Roses & Tulips"
              : event.title.includes("モロッコ")
                ? "Morocco Blue Stairs"
                : event.title.includes("ポップアート")
                  ? "Pop-Art Paint Your Pet"
                  : "Art Class")

  return (
    <div
      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200 ${className}`}
      onClick={event.onClick}
    >
      <div className="flex items-start gap-4">
        {/* Event Image */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
            <img
              src={
                event.image ||
                `/placeholder.svg?height=80&width=80&query=${encodeURIComponent(event.title) || "/placeholder.svg"}`
              }
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Event Details */}
        <div className="flex-1 min-w-0">
          {/* Title and Status Row */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-base font-semibold text-gray-900 truncate">{event.title}</h4>
                {getStatusBadge()}
              </div>
              <p className="text-sm text-gray-600 truncate mb-2">{subtitle}</p>
            </div>

            {/* Percentage indicator */}
            <div className="flex-shrink-0 ml-4">
              <span className="text-xs text-gray-500">{Math.round(progressPercentage)}% full</span>
            </div>
          </div>

          {/* Participants count */}
          <div className="mb-3">
            <span className="text-sm font-medium text-gray-700">
              {current}/{total} participants
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor()}`}
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
          </div>

          {/* Time, Location, and Action */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              {event.time && (
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gray-600" />
                  </div>
                  <span>{event.time}</span>
                </div>
              )}
              {event.location && (
                <div className="flex items-center gap-1">
                  <span>{event.location}</span>
                </div>
              )}
              {event.instructor && !event.instructorAvatar && (
                <div className="flex items-center gap-1">
                  <span>{event.instructor}</span>
                </div>
              )}
              {event.instructor && event.instructorAvatar && (
                <div className="flex items-center gap-1">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={event.instructorAvatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                      {event.instructorInitials || event.instructor.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{event.instructor}</span>
                </div>
              )}
            </div>

            {/* Action Button or Status */}
            {event.actionLabel && (
              <div className="ml-auto">
                <Button
                  size="sm"
                  variant={actionStatus === "success" ? "outline" : "default"}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAction()
                  }}
                  disabled={actionStatus === "pending"}
                  className={actionStatus === "success" ? "text-green-600 border-green-600" : ""}
                >
                  {actionStatus === "pending"
                    ? "Processing..."
                    : actionStatus === "success"
                      ? "Done"
                      : actionStatus === "error"
                        ? "Try Again"
                        : event.actionLabel}
                </Button>
              </div>
            )}

            {/* Price Display */}
            {event.price && variant === "detailed" && (
              <div className="ml-auto">
                <span className="font-medium text-gray-900">{event.price}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

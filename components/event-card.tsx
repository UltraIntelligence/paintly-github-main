"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type React from "react"

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
  context?: "dashboard" | "instructor" | "location" // Add context prop
}

export function EventCard({ event, variant = "default", className = "", context = "dashboard" }: EventCardProps) {
  const [actionStatus, setActionStatus] = useState<"none" | "pending" | "success" | "error">(
    event.actionStatus || "none",
  )

  const { current, total } =
    typeof event.capacity === "string" && event.capacity.includes("/")
      ? parseCapacity(event.capacity)
      : { current: 0, total: 0 }

  const progressPercentage = total > 0 ? (current / total) * 100 : 0

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

  const handleAction = async (e: React.MouseEvent) => {
    e.stopPropagation() // Always stop propagation

    if (actionStatus === "pending" || !event.onAction) return

    setActionStatus("pending")
    try {
      await event.onAction()
      setActionStatus("success")

      // Reset success state after 2 seconds
      setTimeout(() => {
        if (actionStatus === "success") {
          setActionStatus("none")
        }
      }, 2000)
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
      className={`p-3 sm:p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200 ${
        context === "instructor" ? "border-b border-gray-100 last:border-0" : ""
      } ${className}`}
      onClick={event.onClick}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Event Image */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
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
            <div className="flex-1 min-w-0 pr-2">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h4 className="text-sm sm:text-base font-semibold text-gray-900 truncate">{event.title}</h4>
                {getStatusBadge()}
              </div>
              <p className="text-xs sm:text-sm text-gray-600 truncate mb-2">{subtitle}</p>
            </div>

            {/* Percentage indicator */}
            <div className="flex-shrink-0">
              <span className="text-xs text-gray-500">{Math.round(progressPercentage)}% full</span>
            </div>
          </div>

          {/* Participants count */}
          <div className="mb-2 sm:mb-3">
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              {current}/{total} participants
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mb-2 sm:mb-3">
            <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
              <div
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${getProgressColor()}`}
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
          </div>

          {/* Time, Location, and Action */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 flex-wrap">
              {event.time && (
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gray-300 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-600" />
                  </div>
                  <span className="whitespace-nowrap">{event.time}</span>
                </div>
              )}
              {event.location && (
                <div className="flex items-center gap-1">
                  <span className="whitespace-nowrap">{event.location}</span>
                </div>
              )}
              {event.instructor && !event.instructorAvatar && (
                <div className="flex items-center gap-1">
                  <span className="whitespace-nowrap">{event.instructor}</span>
                </div>
              )}
              {event.instructor && event.instructorAvatar && (
                <div className="flex items-center gap-1">
                  <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                    <AvatarImage src={event.instructorAvatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                      {event.instructorInitials || event.instructor.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="whitespace-nowrap">{event.instructor}</span>
                </div>
              )}
            </div>

            {/* Price Display */}
            {event.price && variant === "detailed" && (
              <div className="flex-shrink-0">
                <span className="font-medium text-gray-900 text-sm sm:text-base">{event.price}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

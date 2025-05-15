"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MoreHorizontal, Bookmark, Copy, Archive } from "lucide-react"

import type { Event } from "./event-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Regular":
        return "bg-gray-100 text-gray-800"
      case "Family Friendly":
        return "bg-green-100 text-green-800"
      case "Corporate":
        return "bg-purple-100 text-purple-800"
      case "Seasonal":
        return "bg-orange-100 text-orange-800"
      case "Archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card
      className={`overflow-hidden transition-all duration-200 ${event.isTemplate ? "border-blue-200" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="p-0 relative">
        <div className="relative aspect-video">
          {/* Replace Image component with a colored div */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg"
            style={{
              backgroundImage: `linear-gradient(to bottom right, ${
                event.category === "Regular"
                  ? "#f3f4f6, #e5e7eb"
                  : event.category === "Family Friendly"
                    ? "#d1fae5, #a7f3d0"
                    : event.category === "Corporate"
                      ? "#ede9fe, #ddd6fe"
                      : event.category === "Seasonal"
                        ? "#ffedd5, #fed7aa"
                        : "#f3f4f6, #e5e7eb"
              })`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-medium">
              {event.title}
            </div>
          </div>
          <Badge className={`absolute top-2 right-2 ${getCategoryColor(event.category)}`}>{event.category}</Badge>
          {event.isTemplate && (
            <div className="absolute top-2 left-2 flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs">
              <Bookmark className="h-3 w-3" />
              <span>Template</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
        <div className="text-sm text-gray-600 mb-2">
          {event.duration} • {event.price}
        </div>
        <div className="text-xs text-gray-500 space-y-1">
          <div>Scheduled {event.scheduledCount} times</div>
          <div>Avg {event.averageAttendance} attendees</div>
          {event.category === "Seasonal" && (
            <div className="flex items-center mt-2">
              <span className={`h-2 w-2 rounded-full mr-2 ${event.isActive ? "bg-green-500" : "bg-gray-400"}`}></span>
              <span className="text-xs">
                {event.isActive ? "Active" : event.activatesIn ? `Activates in ${event.activatesIn}` : "Inactive"}
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-3 bg-gray-50 border-t border-gray-100 flex justify-between">
        <Button variant="outline" size="sm" effect="gooeyLeft" onClick={() => router.push(`/events/${event.id}`)}>
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          effect="gooeyLeft"
          onClick={() => router.push(`/events/${event.id}/schedule`)}
        >
          Quick Schedule
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => router.push(`/events/${event.id}/duplicate`)}
            >
              <Copy className="h-4 w-4" />
              <span>Duplicate</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => router.push(`/events/${event.id}/template`)}
            >
              <Bookmark className="h-4 w-4" />
              <span>Use as Template</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2 cursor-pointer text-red-600"
              onClick={() => router.push(`/events/${event.id}/archive`)}
            >
              <Archive className="h-4 w-4" />
              <span>Archive</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  )
}

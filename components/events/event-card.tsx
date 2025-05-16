"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MoreHorizontal, Bookmark, Copy, Archive } from "lucide-react"

import type { Event } from "./event-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

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

  const getGradientColors = (category: string) => {
    switch (category) {
      case "Regular":
        return "#f3f4f6, #e5e7eb"
      case "Family Friendly":
        return "#d1fae5, #a7f3d0"
      case "Corporate":
        return "#ede9fe, #ddd6fe"
      case "Seasonal":
        return "#ffedd5, #fed7aa"
      default:
        return "#f3f4f6, #e5e7eb"
    }
  }

  return (
    <Card
      className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Square Image at Top */}
      <div className="relative aspect-square w-full">
        <div
          className="absolute inset-0 bg-gradient-to-br rounded-t-lg"
          style={{
            backgroundImage: `linear-gradient(to bottom right, ${getGradientColors(event.category)})`,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-medium">
            {event.title}
          </div>
        </div>
        <Badge className={`absolute top-2 left-2 ${getCategoryColor(event.category)}`}>{event.category}</Badge>

        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white"
              >
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
        </div>
      </div>

      <CardContent className="flex-1 p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{event.title}</h3>
        <div className="text-sm text-gray-600 mb-3">
          {event.duration} • {event.price}
        </div>

        <Separator className="my-3 bg-gray-100" />

        <div className="grid grid-cols-2 gap-2 text-center">
          <div>
            <div className="text-xs text-gray-500">Scheduled</div>
            <div className="mt-1 text-sm font-medium text-gray-900">{event.scheduledCount} times</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Avg. Attendance</div>
            <div className="mt-1 text-sm font-medium text-gray-900">{event.averageAttendance}</div>
          </div>
        </div>

        {event.category === "Seasonal" && (
          <div className="flex items-center justify-center mt-3">
            <span className={`h-2 w-2 rounded-full mr-2 ${event.isActive ? "bg-green-500" : "bg-gray-400"}`}></span>
            <span className="text-xs text-gray-500">
              {event.isActive ? "Active" : event.activatesIn ? `Activates in ${event.activatesIn}` : "Inactive"}
            </span>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between gap-2 bg-gray-50 px-4 py-3 mt-auto">
        <Button
          effect="gooeyLeft"
          size="sm"
          className="flex-1 bg-black text-white hover:bg-black/80"
          onClick={() => router.push(`/events/${event.id}`)}
        >
          Edit
        </Button>
        <Button
          effect="gooeyLeft"
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => router.push(`/events/${event.id}/schedule`)}
        >
          Quick Schedule
        </Button>
      </CardFooter>
    </Card>
  )
}

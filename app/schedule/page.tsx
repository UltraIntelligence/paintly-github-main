"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeftIcon, ChevronRightIcon, UsersIcon, AlertTriangleIcon, PlusIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const locations = [
  { id: "all", name: "All", count: 12 },
  { id: "daikanyama", name: "Daikanyama", count: 3 },
  { id: "catstreet", name: "Cat Street", count: 4 },
  { id: "ginza", name: "Ginza", count: 3 },
  { id: "yokohama", name: "Yokohama", count: 2 },
]

const viewTypes = [
  { id: "month", name: "Month" },
  { id: "week", name: "Week" },
  { id: "list", name: "List" },
]

const timeSlots = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
  "10:00 PM",
]

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const dates = ["19", "20", "21", "22", "23", "24", "25"]

const instructors = [
  { id: "yuki", name: "Yuki Tanaka", avatar: "/placeholder.svg?height=32&width=32", initials: "YT", specialty: "kids" },
  { id: "naomi", name: "Naomi", avatar: "/placeholder.svg?height=32&width=32", initials: "N", specialty: "master" },
  { id: "luci", name: "Luci", avatar: "/placeholder.svg?height=32&width=32", initials: "L", specialty: "pouring" },
  { id: "daria", name: "Daria", avatar: "/placeholder.svg?height=32&width=32", initials: "D", specialty: "evening" },
]

const scheduledEvents = [
  {
    id: 1,
    title: "モネ 睡蓮",
    titleEn: "Monet Water Lilies",
    instructor: instructors[0],
    participants: { current: 8, max: 12 },
    status: "Starting in 2 hours",
    day: 0,
    startTime: 6,
    duration: 2,
    location: "Ginza",
  },
  {
    id: 2,
    title: "ゴッホ 星月夜",
    titleEn: "Van Gogh Starry Night",
    instructor: instructors[1],
    participants: { current: 10, max: 12 },
    status: "Active",
    day: 1,
    startTime: 7,
    duration: 2,
    location: "Daikanyama",
  },
  {
    id: 3,
    title: "F6 たらし込みポーリングアート",
    titleEn: "Paint Pouring",
    instructor: instructors[2],
    participants: { current: 6, max: 10 },
    status: "Live",
    day: 2,
    startTime: 6,
    duration: 2,
    location: "Cat Street",
  },
]

// Mock availability data
const getSlotAvailability = (day: number, timeIndex: number) => {
  // Mock logic for demonstration
  if (
    scheduledEvents.some(
      (event) => event.day === day && timeIndex >= event.startTime && timeIndex < event.startTime + event.duration,
    )
  ) {
    return null // Slot has scheduled event
  }

  if (Math.random() > 0.7) return "unavailable"
  if (Math.random() > 0.5) return "constrained"
  return "available"
}

const getAvailableInstructors = (day: number, timeIndex: number) => {
  const availability = getSlotAvailability(day, timeIndex)
  if (availability === "unavailable") return []
  if (availability === "constrained") return [instructors[0]]

  const count = Math.floor(Math.random() * 4) + 1
  return instructors.slice(0, count)
}

export default function SchedulePage() {
  const [activeLocation, setActiveLocation] = useState("all")
  const [activeView, setActiveView] = useState("week")
  const [selectedSlot, setSelectedSlot] = useState<{ day: number; time: number } | null>(null)

  const handleSlotClick = (day: number, timeIndex: number) => {
    const availability = getSlotAvailability(day, timeIndex)
    if (availability !== "unavailable") {
      setSelectedSlot({ day, time: timeIndex })
    }
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
      </div>

      {/* Location Tabs */}
      <div className="flex space-x-1 rounded-lg bg-muted p-1">
        {locations.map((location) => (
          <button
            key={location.id}
            onClick={() => setActiveLocation(location.id)}
            className={cn(
              "flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              activeLocation === location.id
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <span>{location.name}</span>
            <Badge variant="secondary" className="ml-1">
              {location.count}
            </Badge>
          </button>
        ))}
      </div>

      {/* View Toggle and Date Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-1 rounded-lg bg-muted p-1">
          {viewTypes.map((view) => (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id)}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                activeView === view.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {view.name}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">May 19-25, 2025</span>
          <Button variant="outline" size="sm">
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Week View Calendar */}
      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-8 border-b">
            <div className="p-4 border-r bg-muted/50"></div>
            {days.map((day, index) => (
              <div key={day} className="p-4 text-center border-r last:border-r-0">
                <div className="font-medium">{day}</div>
                <div className="text-sm text-muted-foreground">{dates[index]}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-8">
            {/* Time column */}
            <div className="border-r bg-muted/50">
              {timeSlots.map((time) => (
                <div key={time} className="h-16 p-2 border-b text-sm text-muted-foreground flex items-center">
                  {time}
                </div>
              ))}
            </div>

            {/* Day columns */}
            {days.map((day, dayIndex) => (
              <div key={day} className="border-r last:border-r-0">
                {timeSlots.map((time, timeIndex) => {
                  const scheduledEvent = scheduledEvents.find(
                    (event) =>
                      event.day === dayIndex &&
                      timeIndex >= event.startTime &&
                      timeIndex < event.startTime + event.duration,
                  )

                  if (scheduledEvent && timeIndex === scheduledEvent.startTime) {
                    return (
                      <div
                        key={`${day}-${time}`}
                        className={`relative border-b bg-blue-50 border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors`}
                        style={{ height: `${scheduledEvent.duration * 64}px` }}
                        onClick={() => console.log("Event clicked:", scheduledEvent)}
                      >
                        <div className="p-2 h-full">
                          <div className="text-xs font-medium text-blue-900 mb-1">{scheduledEvent.title}</div>
                          <div className="text-xs text-blue-700 mb-2">{scheduledEvent.titleEn}</div>
                          <div className="flex items-center space-x-1 mb-1">
                            <Avatar className="h-4 w-4">
                              <AvatarImage src={scheduledEvent.instructor.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="text-xs">{scheduledEvent.instructor.initials}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-blue-700">{scheduledEvent.instructor.name}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                              <UsersIcon className="h-3 w-3 text-blue-600" />
                              <span className="text-xs text-blue-700">
                                {scheduledEvent.participants.current}/{scheduledEvent.participants.max}
                              </span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {scheduledEvent.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )
                  }

                  if (scheduledEvent && timeIndex > scheduledEvent.startTime) {
                    return null // Skip slots covered by multi-hour events
                  }

                  const availability = getSlotAvailability(dayIndex, timeIndex)
                  const availableInstructors = getAvailableInstructors(dayIndex, timeIndex)

                  return (
                    <div
                      key={`${day}-${time}`}
                      className={cn(
                        "h-16 border-b relative transition-colors",
                        availability === "available" && "bg-green-50 hover:bg-green-100 cursor-pointer",
                        availability === "constrained" && "bg-amber-50 hover:bg-amber-100 cursor-pointer",
                        availability === "unavailable" && "bg-gray-50 cursor-not-allowed",
                      )}
                      onClick={() => handleSlotClick(dayIndex, timeIndex)}
                    >
                      {availability === "available" && (
                        <div className="absolute bottom-1 right-1 flex items-center space-x-1">
                          {availableInstructors.slice(0, 3).map((instructor) => (
                            <Avatar key={instructor.id} className="h-6 w-6">
                              <AvatarImage src={instructor.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="text-xs">{instructor.initials}</AvatarFallback>
                            </Avatar>
                          ))}
                          {availableInstructors.length > 3 && (
                            <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-xs text-gray-600">+{availableInstructors.length - 3}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {availability === "constrained" && (
                        <div className="absolute bottom-1 right-1 flex items-center space-x-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={availableInstructors[0]?.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-xs">{availableInstructors[0]?.initials}</AvatarFallback>
                          </Avatar>
                          <AlertTriangleIcon className="h-3 w-3 text-amber-600" />
                        </div>
                      )}

                      {availability === "unavailable" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs text-gray-400">No instructors</span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scheduling Modal (placeholder) */}
      {selectedSlot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-96">
            <CardHeader>
              <CardTitle>Schedule Event</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {days[selectedSlot.day]} at {timeSlots[selectedSlot.time]}
              </p>
              <div className="flex space-x-2">
                <Button className="flex-1">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Schedule Event
                </Button>
                <Button variant="outline" onClick={() => setSelectedSlot(null)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

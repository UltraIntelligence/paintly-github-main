"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, AlertCircle, Users, CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScheduleNewEventDialog } from "./schedule-new-event-dialog"

// Mock data for locations
const locations = [
  { id: "shibuya", name: "Shibuya Studio", color: "border-blue-400" },
  { id: "roppongi", name: "Roppongi Studio", color: "border-green-400" },
  { id: "shinjuku", name: "Shinjuku Studio", color: "border-purple-400" },
]

// Mock data for scheduled events - Updated to 2 hours duration
const scheduledEvents = [
  {
    id: "event1",
    title: "Sunset Beach Painting",
    titleJp: "夕日のビーチペインティング",
    instructor: "Akira Tanaka",
    location: "shibuya",
    day: 1, // Monday
    startTime: 15, // 3 PM
    duration: 2, // 2 hours
    bookings: 18,
    capacity: 25,
    isSoldOut: false,
    hasConflict: false,
    image: "gradient-1",
  },
  {
    id: "event2",
    title: "Kids Watercolor Adventure",
    titleJp: "子供の水彩冒険",
    instructor: "Yuki Sato",
    location: "roppongi",
    day: 2, // Tuesday
    startTime: 12, // 12 PM
    duration: 2, // 2 hours
    bookings: 15,
    capacity: 15,
    isSoldOut: true,
    hasConflict: false,
    image: "gradient-2",
  },
  {
    id: "event3",
    title: "Abstract Acrylic Workshop",
    titleJp: "抽象的なアクリルワークショップ",
    instructor: "Mei Yamamoto",
    location: "shinjuku",
    day: 4, // Thursday
    startTime: 18, // 6 PM
    duration: 2, // 2 hours
    bookings: 12,
    capacity: 20,
    isSoldOut: false,
    hasConflict: true,
    image: "gradient-5",
  },
]

// Helper function to get the day name
const getDayName = (dayIndex: number) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  return days[dayIndex - 1]
}

// Helper function to format time
const formatTime = (hour: number) => {
  const period = hour >= 12 ? "PM" : "AM"
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12
  return `${formattedHour}:00 ${period}`
}

// Helper function to get current week dates
const getCurrentWeekDates = () => {
  const today = new Date()
  const day = today.getDay() // 0 is Sunday, 1 is Monday, etc.
  const diff = today.getDate() - day + (day === 0 ? -6 : 1) // Adjust when day is Sunday

  return Array(7)
    .fill(null)
    .map((_, i) => {
      const date = new Date(today)
      date.setDate(diff + i)
      return date
    })
}

export function SchedulingCalendar() {
  const [selectedLocations, setSelectedLocations] = useState<string[]>(locations.map((loc) => loc.id))
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<{ day: number; time: number; location: string } | null>(null)

  const weekDates = getCurrentWeekDates()
  const timeSlots = Array.from({ length: 13 }, (_, i) => i + 9) // 9 AM to 9 PM

  // Base height for a single time slot (60 minutes)
  const BASE_SLOT_HEIGHT = 80 // in pixels

  const toggleLocation = (locationId: string) => {
    if (selectedLocations.includes(locationId)) {
      setSelectedLocations(selectedLocations.filter((id) => id !== locationId))
    } else {
      setSelectedLocations([...selectedLocations, locationId])
    }
  }

  const handleCellClick = (day: number, time: number, location: string) => {
    setSelectedSlot({ day, time, location })
    setIsDialogOpen(true)
  }

  const isSlotOccupied = (day: number, time: number, location: string) => {
    return scheduledEvents.some(
      (event) =>
        event.day === day &&
        event.location === location &&
        event.startTime <= time &&
        time < event.startTime + event.duration,
    )
  }

  const getEventForSlot = (day: number, time: number, location: string) => {
    return scheduledEvents.find(
      (event) =>
        event.day === day &&
        event.location === location &&
        event.startTime <= time &&
        time < event.startTime + event.duration,
    )
  }

  const isStartOfEvent = (day: number, time: number, location: string) => {
    const event = scheduledEvents.find(
      (event) => event.day === day && event.location === location && event.startTime === time,
    )
    return !!event
  }

  // Helper to get event time range
  const getEventTimeRange = (event: any) => {
    const startHour = event.startTime
    const endHour = event.startTime + event.duration
    return `${formatTime(startHour)} - ${formatTime(endHour)}`
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Comprehensive Stats Overview Section */}
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex flex-col space-y-6">
            {/* Header with title and date selector */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-xl font-bold">Scheduling Overview</h2>
                <p className="text-sm text-gray-500">Performance metrics and insights</p>
              </div>
              <div className="flex items-center space-x-2 mt-2 md:mt-0">
                <Button variant="outline" size="sm" className="text-xs">
                  This Week
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  This Month
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                  Custom
                </Button>
              </div>
            </div>

            {/* Main stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Classes Today */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 font-medium">Classes Today</p>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold">8</p>
                  <span className="text-xs text-green-600 flex items-center">
                    +2
                    <svg className="h-3 w-3 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Classes This Week */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 font-medium">Classes This Week</p>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold">42</p>
                  <span className="text-xs text-green-600 flex items-center">
                    +5
                    <svg className="h-3 w-3 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Classes This Month */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 font-medium">Classes This Month</p>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold">156</p>
                  <span className="text-xs text-green-600 flex items-center">
                    +12
                    <svg className="h-3 w-3 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Average Capacity */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 font-medium">Average Capacity</p>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold">85%</p>
                  <span className="text-xs text-red-600 flex items-center">
                    -3%
                    <svg className="h-3 w-3 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            {/* Secondary stats section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Top Performing Classes */}
              <div className="bg-white border rounded-lg p-3">
                <p className="text-xs text-gray-500 font-medium mb-2">Top Performing Classes</p>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span className="text-xs">Sunset Beach Painting</span>
                    <span className="text-xs font-medium text-green-600">98% capacity</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-xs">Abstract Acrylic Workshop</span>
                    <span className="text-xs font-medium text-green-600">95% capacity</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-xs">Kids Watercolor Adventure</span>
                    <span className="text-xs font-medium text-green-600">92% capacity</span>
                  </li>
                </ul>
              </div>

              {/* Underperforming Classes */}
              <div className="bg-white border rounded-lg p-3">
                <p className="text-xs text-gray-500 font-medium mb-2">Underperforming Classes</p>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span className="text-xs">Advanced Oil Painting</span>
                    <span className="text-xs font-medium text-red-600">45% capacity</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-xs">Morning Sketching</span>
                    <span className="text-xs font-medium text-red-600">52% capacity</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-xs">Digital Art Basics</span>
                    <span className="text-xs font-medium text-red-600">58% capacity</span>
                  </li>
                </ul>
              </div>

              {/* Performance by Time & Instructor */}
              <div className="bg-white border rounded-lg p-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-2">Best Time Slot</p>
                    <p className="text-sm font-medium">6:00 PM - 8:00 PM</p>
                    <p className="text-xs text-gray-500">92% avg. capacity</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-2">Top Instructor</p>
                    <p className="text-sm font-medium">Akira Tanaka</p>
                    <p className="text-xs text-gray-500">96% avg. capacity</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Studio comparison */}
            <div className="bg-white border rounded-lg p-4">
              <p className="text-xs text-gray-500 font-medium mb-3">Studio Performance</p>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs">Shibuya Studio</span>
                    <span className="text-xs font-medium">88%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "88%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs">Roppongi Studio</span>
                    <span className="text-xs font-medium">76%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "76%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs">Shinjuku Studio</span>
                    <span className="text-xs font-medium">64%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: "64%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Calendar Grid */}
      <div className="flex-1 overflow-x-auto">
        <div className="min-w-[900px]">
          {/* Calendar Header */}
          <div className="grid grid-cols-8 gap-3 mb-3">
            <div className="h-20 flex items-end justify-center p-3 font-medium text-sm text-gray-500 bg-gray-50 rounded-md">
              Time / Day
            </div>
            {Array.from({ length: 7 }, (_, i) => i + 1).map((day) => (
              <div
                key={day}
                className="h-20 flex flex-col items-center justify-center p-3 font-medium bg-gray-50 rounded-md"
              >
                <div className="text-sm text-gray-500">{getDayName(day)}</div>
                <div className="text-2xl">{weekDates[day - 1].getDate()}</div>
                <div className="text-xs text-gray-500">
                  {weekDates[day - 1].toLocaleString("default", { month: "short" })}
                </div>
              </div>
            ))}
          </div>

          {/* Calendar Body */}
          {selectedLocations.map((locationId) => {
            const location = locations.find((loc) => loc.id === locationId)

            return (
              <div key={locationId} className="mb-8">
                {/* Location Header */}
                <div className="grid grid-cols-8 gap-3 mb-3">
                  <div
                    className={`col-span-8 p-3 font-medium text-lg ${location?.color.replace("border", "bg")} bg-opacity-20 rounded-md`}
                  >
                    {location?.name}
                  </div>
                </div>

                {/* Calendar Grid Container with Relative Positioning */}
                <div className="relative">
                  {/* Time Slots Grid - This creates the base grid structure */}
                  {timeSlots.map((time) => (
                    <div key={`${locationId}-${time}`} className="grid grid-cols-8 gap-3 mb-3">
                      {/* Time Label */}
                      <div
                        className="flex items-center justify-center p-3 font-medium text-sm text-gray-500 bg-gray-50 rounded-md"
                        style={{ height: `${BASE_SLOT_HEIGHT}px` }}
                      >
                        {formatTime(time)}
                      </div>

                      {/* Day Cells - Always render all cells */}
                      {Array.from({ length: 7 }, (_, i) => i + 1).map((day) => {
                        const isOccupied = isSlotOccupied(day, time, locationId)

                        // Always render the base grid cell
                        return (
                          <div
                            key={`${locationId}-${time}-${day}`}
                            className={cn(
                              "relative rounded-md border transition-all border-dashed border-gray-200 hover:border-gray-400",
                              isOccupied ? "opacity-0" : "cursor-pointer", // Make occupied cells invisible but keep their space
                            )}
                            style={{ height: `${BASE_SLOT_HEIGHT}px` }}
                            onClick={() => !isOccupied && handleCellClick(day, time, locationId)}
                          >
                            {!isOccupied && (
                              <div className="h-full flex items-center justify-center">
                                <Plus className="h-5 w-5 text-gray-400" />
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  ))}

                  {/* Events Layer - Positioned absolutely over the grid */}
                  {scheduledEvents
                    .filter((event) => event.location === locationId)
                    .map((event) => {
                      // Calculate position based on day and time
                      const dayIndex = event.day - 1 // 0-based index
                      const timeIndex = event.startTime - timeSlots[0] // 0-based index from first time slot

                      // Calculate left position (day column)
                      // First column is time labels, so add 1 to dayIndex
                      const leftPosition = `calc((100% / 8) * ${dayIndex + 1} + ${dayIndex * 12}px)`

                      // Calculate top position (time row)
                      const topPosition = timeIndex * (BASE_SLOT_HEIGHT + 12) // height + gap

                      // Calculate height based on duration
                      const height = event.duration * BASE_SLOT_HEIGHT + (event.duration - 1) * 12 // height + gaps between

                      return (
                        <div
                          key={`event-${event.id}`}
                          className={cn(
                            "absolute rounded-md border transition-all cursor-move overflow-hidden",
                            `${location?.color}`,
                            event.isSoldOut && "border-yellow-400",
                          )}
                          style={{
                            top: `${topPosition}px`,
                            left: leftPosition,
                            width: `calc((100% / 8) - 12px)`, // Adjust for gap
                            height: `${height}px`,
                            zIndex: 10,
                          }}
                        >
                          <div className="h-full p-3 flex flex-col">
                            {/* Event Content - Reduced text size and spacing */}
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1 min-w-0 mr-2">
                                <h4 className="font-medium text-sm truncate">{event.title}</h4>
                                <p className="text-xs text-gray-600 truncate">{event.titleJp}</p>
                              </div>

                              {/* Event Image - Smaller size */}
                              <div
                                className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0"
                                style={{
                                  backgroundImage:
                                    event.image === "gradient-1"
                                      ? "linear-gradient(to bottom right, #60a5fa, #7c3aed)"
                                      : event.image === "gradient-2"
                                        ? "linear-gradient(to bottom right, #34d399, #3b82f6)"
                                        : "linear-gradient(to bottom right, #f87171, #ec4899)",
                                }}
                              />
                            </div>

                            {/* Time Range - Smaller text */}
                            <div className="text-xs text-gray-600 mb-2">{getEventTimeRange(event)}</div>

                            {/* Instructor - Smaller text and icon */}
                            <div className="flex items-center mt-1">
                              <CalendarIcon className="h-3 w-3 mr-1 text-gray-500 flex-shrink-0" />
                              <span className="text-xs truncate">{event.instructor}</span>
                            </div>

                            {/* Capacity - Smaller text and icon */}
                            <div className="flex items-center mt-1">
                              <Users className="h-3 w-3 mr-1 text-gray-500 flex-shrink-0" />
                              <span
                                className={cn(
                                  "text-xs font-medium",
                                  event.isSoldOut ? "text-yellow-600" : "",
                                  event.bookings === event.capacity ? "text-green-600" : "",
                                )}
                              >
                                {event.bookings}/{event.capacity}
                              </span>
                              {event.isSoldOut && (
                                <span className="ml-1 text-[10px] bg-yellow-100 text-yellow-800 px-1 py-0.5 rounded">
                                  Sold Out
                                </span>
                              )}
                            </div>

                            {/* Conflict Indicator - Smaller */}
                            {event.hasConflict && (
                              <div className="absolute bottom-2 right-2 bg-red-100 rounded-full p-0.5">
                                <AlertCircle className="h-3 w-3 text-red-500" />
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Schedule New Event Dialog */}
      <ScheduleNewEventDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} selectedSlot={selectedSlot} />
    </div>
  )
}

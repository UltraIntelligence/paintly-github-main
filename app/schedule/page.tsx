"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThemeProvider } from "../../components/theme-provider"
import { AppSidebar } from "../../components/app-sidebar"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { motion, AnimatePresence } from "framer-motion"

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: {
    duration: typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.4,
    ease: [0.4, 0.0, 0.2, 1],
  },
}

// Sample data
const instructors = [
  { id: 1, name: "Yuki Tanaka", initials: "YT", color: "bg-blue-500", specialty: "kids" },
  { id: 2, name: "Naomi", initials: "N", color: "bg-purple-500", specialty: "master" },
  { id: 3, name: "Luci", initials: "L", color: "bg-green-500", specialty: "pouring" },
  { id: 4, name: "Daria", initials: "D", color: "bg-pink-500", specialty: "evening" },
  { id: 5, name: "Hiroshi Sato", initials: "HS", color: "bg-indigo-500", specialty: "master" },
]

const scheduledEvents = [
  {
    id: 1,
    title: "モネ 睡蓮 Monet Water Lilies",
    instructor: "Yuki Tanaka",
    participants: "8/12",
    status: "Starting in 2 hours",
    day: 0, // Monday
    startHour: 6, // 6 PM
    duration: 2,
    location: "Artbar Ginza",
  },
  {
    id: 2,
    title: "ゴッホ 星月夜 Van Gogh Starry Night",
    instructor: "Naomi",
    participants: "12/15",
    status: "Live",
    day: 1, // Tuesday
    startHour: 7, // 7 PM
    duration: 2,
    location: "Artbar Daikanyama",
  },
  {
    id: 3,
    title: "F6 たらし込みポーリングアート Paint Pouring",
    instructor: "Luci",
    participants: "6/10",
    status: "Active",
    day: 2, // Wednesday
    startHour: 6, // 6 PM
    duration: 2,
    location: "Artbar Cat Street",
  },
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
]

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const shortDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

// Helper function to get availability for a time slot
const getSlotAvailability = (day: number, hour: number) => {
  // Check if there's a scheduled event
  const hasEvent = scheduledEvents.some(
    (event) => event.day === day && hour >= event.startHour && hour < event.startHour + event.duration,
  )

  if (hasEvent) return null

  // Mock availability logic
  if (hour < 2 || hour > 9) return "unavailable" // Before 2 PM or after 9 PM
  if ((day === 0 && hour === 5) || (day === 1 && hour === 8)) return "constrained"
  return "available"
}

// Helper function to get available instructors for a slot
const getAvailableInstructors = (day: number, hour: number) => {
  const availability = getSlotAvailability(day, hour)
  if (availability === "unavailable") return []
  if (availability === "constrained") return [instructors[0]] // Only Yuki

  // Return different instructors based on time
  if (hour < 4) return instructors.slice(0, 2) // Morning: Yuki, Naomi
  if (hour < 7) return instructors.slice(0, 4) // Afternoon: Most available
  return instructors.slice(1, 4) // Evening: Naomi, Luci, Daria
}

function InstructorAvatar({ instructor, size = "sm" }: { instructor: (typeof instructors)[0]; size?: "sm" | "xs" }) {
  const sizeClasses = size === "xs" ? "w-6 h-6 text-xs" : "w-8 h-8 text-sm"

  return (
    <div
      className={`${instructor.color} ${sizeClasses} rounded-full flex items-center justify-center text-white font-medium`}
    >
      {instructor.initials}
    </div>
  )
}

function TimeSlot({
  day,
  hour,
  availability,
  availableInstructors,
}: {
  day: number
  hour: number
  availability: string | null
  availableInstructors: typeof instructors
}) {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)

  if (availability === null) return null // Slot has scheduled event

  const bgColor = {
    available: "bg-green-50 hover:bg-green-100 border-green-200",
    constrained: "bg-amber-50 hover:bg-amber-100 border-amber-200",
    unavailable: "bg-gray-50 border-gray-200 cursor-not-allowed",
  }[availability]

  const isClickable = availability !== "unavailable"

  return (
    <Dialog open={isScheduleModalOpen} onOpenChange={setIsScheduleModalOpen}>
      <DialogTrigger asChild disabled={!isClickable}>
        <div
          className={`${bgColor} border rounded-lg p-2 h-16 relative group transition-colors ${isClickable ? "cursor-pointer" : ""}`}
        >
          {availability === "unavailable" ? (
            <div className="text-xs text-gray-400 text-center mt-2">No instructors</div>
          ) : (
            <div className="flex justify-end items-end h-full">
              <div className="flex -space-x-1">
                {availableInstructors.slice(0, 3).map((instructor) => (
                  <InstructorAvatar key={instructor.id} instructor={instructor} />
                ))}
                {availableInstructors.length > 3 && (
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-medium">
                    +{availableInstructors.length - 3}
                  </div>
                )}
              </div>
            </div>
          )}
          {isClickable && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Plus className="w-4 h-4 text-gray-600" />
            </div>
          )}
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule Event</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            {days[day]} at {timeSlots[hour]}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Template</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monet">モネ 睡蓮 Monet Water Lilies</SelectItem>
                <SelectItem value="vangogh">ゴッホ 星月夜 Van Gogh Starry Night</SelectItem>
                <SelectItem value="pouring">F6 たらし込みポーリングアート Paint Pouring</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Instructor</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select instructor" />
              </SelectTrigger>
              <SelectContent>
                {availableInstructors.map((instructor) => (
                  <SelectItem key={instructor.id} value={instructor.name}>
                    {instructor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Duration</label>
            <Select defaultValue="2">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 hour</SelectItem>
                <SelectItem value="2">2 hours</SelectItem>
                <SelectItem value="3">3 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700">Schedule Event</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function EventCard({ event }: { event: (typeof scheduledEvents)[0] }) {
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const instructor = instructors.find((i) => i.name === event.instructor)

  const statusColors = {
    Live: "bg-blue-500 text-white animate-pulse",
    "Starting in 2 hours": "bg-green-100 text-green-700",
    Active: "bg-gray-100 text-gray-700",
  }

  return (
    <Dialog open={isEventModalOpen} onOpenChange={setIsEventModalOpen}>
      <DialogTrigger asChild>
        <div
          className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-32"
          style={{ gridRow: `span ${event.duration}` }}
        >
          <div className="space-y-2">
            <h4 className="text-sm font-medium line-clamp-2">{event.title}</h4>

            <div className="flex items-center gap-2">
              {instructor && <InstructorAvatar instructor={instructor} size="xs" />}
              <span className="text-xs text-gray-600">{event.instructor}</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Users className="w-3 h-3" />
              <span>{event.participants}</span>
            </div>

            <Badge className={`text-xs px-2 py-1 ${statusColors[event.status as keyof typeof statusColors]}`}>
              {event.status}
            </Badge>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {instructor && <InstructorAvatar instructor={instructor} />}
            <div>
              <div className="font-medium">{event.instructor}</div>
              <div className="text-sm text-gray-500">{event.location}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-500">Participants</div>
              <div className="font-medium">{event.participants}</div>
            </div>
            <div>
              <div className="text-gray-500">Status</div>
              <Badge className={statusColors[event.status as keyof typeof statusColors]}>{event.status}</Badge>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              Edit Event
            </Button>
            <Button variant="outline" className="flex-1">
              View Bookings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function SchedulePage() {
  const [activeLocation, setActiveLocation] = useState("All")
  const [activeView, setActiveView] = useState("Week")

  const getLocationCount = (location: string) => {
    if (location === "All") return scheduledEvents.length
    return scheduledEvents.filter((event) => event.location.includes(location)).length
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="dashboard-theme">
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <AnimatePresence mode="wait">
            <motion.div key="schedule" className="flex flex-1 flex-col" {...pageTransition}>
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  <div className="px-4 lg:px-6">
                    {/* Header */}
                    <div className="space-y-4 mb-8">
                      <h1 className="text-2xl font-bold">Schedule</h1>

                      {/* Controls */}
                      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                        {/* Location Tabs */}
                        <Tabs value={activeLocation} onValueChange={setActiveLocation} className="w-auto">
                          <TabsList>
                            <TabsTrigger value="All" className="gap-1">
                              All{" "}
                              <Badge
                                variant="secondary"
                                className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30"
                              >
                                {getLocationCount("All")}
                              </Badge>
                            </TabsTrigger>
                            <TabsTrigger value="Daikanyama" className="gap-1">
                              Daikanyama{" "}
                              <Badge
                                variant="secondary"
                                className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30"
                              >
                                {getLocationCount("Daikanyama")}
                              </Badge>
                            </TabsTrigger>
                            <TabsTrigger value="Cat Street" className="gap-1">
                              Cat Street{" "}
                              <Badge
                                variant="secondary"
                                className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30"
                              >
                                {getLocationCount("Cat Street")}
                              </Badge>
                            </TabsTrigger>
                            <TabsTrigger value="Ginza" className="gap-1">
                              Ginza{" "}
                              <Badge
                                variant="secondary"
                                className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30"
                              >
                                {getLocationCount("Ginza")}
                              </Badge>
                            </TabsTrigger>
                            <TabsTrigger value="Yokohama" className="gap-1">
                              Yokohama{" "}
                              <Badge
                                variant="secondary"
                                className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30"
                              >
                                0
                              </Badge>
                            </TabsTrigger>
                          </TabsList>
                        </Tabs>

                        {/* View Toggle and Date Navigation */}
                        <div className="flex items-center gap-4">
                          <Tabs value={activeView} onValueChange={setActiveView}>
                            <TabsList>
                              <TabsTrigger value="Month">Month</TabsTrigger>
                              <TabsTrigger value="Week">Week</TabsTrigger>
                              <TabsTrigger value="List">List</TabsTrigger>
                            </TabsList>
                          </Tabs>

                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <span className="text-sm font-medium px-3">May 19-25, 2025</span>
                            <Button variant="outline" size="sm">
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Week View Calendar */}
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                      {/* Calendar Header */}
                      <div className="grid grid-cols-8 border-b border-gray-200">
                        <div className="p-3 text-sm font-medium text-gray-500">Time</div>
                        {days.map((day, index) => (
                          <div key={day} className="p-3 text-sm font-medium text-center border-l border-gray-200">
                            <div className="hidden sm:block">{day}</div>
                            <div className="sm:hidden">{shortDays[index]}</div>
                            <div className="text-xs text-gray-400 mt-1">May {19 + index}</div>
                          </div>
                        ))}
                      </div>

                      {/* Calendar Grid */}
                      <div className="grid grid-cols-8">
                        {timeSlots.map((time, hourIndex) => (
                          <div key={time} className="contents">
                            {/* Time Label */}
                            <div className="p-3 text-sm text-gray-500 border-b border-gray-200 bg-gray-50">{time}</div>

                            {/* Day Columns */}
                            {days.map((_, dayIndex) => {
                              const scheduledEvent = scheduledEvents.find(
                                (event) =>
                                  event.day === dayIndex &&
                                  hourIndex >= event.startHour &&
                                  hourIndex < event.startHour + event.duration,
                              )

                              const isEventStart = scheduledEvent && hourIndex === scheduledEvent.startHour
                              const availability = getSlotAvailability(dayIndex, hourIndex)
                              const availableInstructors = getAvailableInstructors(dayIndex, hourIndex)

                              return (
                                <div
                                  key={`${dayIndex}-${hourIndex}`}
                                  className="border-l border-b border-gray-200 relative"
                                >
                                  {isEventStart ? (
                                    <div className="absolute inset-0 p-1">
                                      <EventCard event={scheduledEvent} />
                                    </div>
                                  ) : !scheduledEvent ? (
                                    <TimeSlot
                                      day={dayIndex}
                                      hour={hourIndex}
                                      availability={availability}
                                      availableInstructors={availableInstructors}
                                    />
                                  ) : (
                                    <div className="h-16" /> // Empty space for multi-hour events
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="mt-6 flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-50 border border-green-200 rounded"></div>
                        <span>Available</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-amber-50 border border-amber-200 rounded"></div>
                        <span>Constrained</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-50 border border-gray-200 rounded"></div>
                        <span>Unavailable</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-white border border-gray-200 rounded shadow-sm"></div>
                        <span>Scheduled Event</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}

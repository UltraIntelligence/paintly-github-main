"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Calendar, List, Grid3X3, Clock } from "lucide-react"
import { ThemeProvider } from "../../components/theme-provider"
import { AppSidebar } from "../../components/app-sidebar"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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
  { id: 1, name: "Yuki Tanaka", avatar: "/placeholder.svg?height=32&width=32", specialty: "kids", initials: "YT" },
  { id: 2, name: "Naomi", avatar: "/placeholder.svg?height=32&width=32", specialty: "master", initials: "N" },
  { id: 3, name: "Luci", avatar: "/placeholder.svg?height=32&width=32", specialty: "pouring", initials: "L" },
  { id: 4, name: "Daria", avatar: "/placeholder.svg?height=32&width=32", specialty: "evening", initials: "D" },
]

const locations = [
  { id: "all", name: "All", count: 12 },
  { id: "daikanyama", name: "Daikanyama", count: 3 },
  { id: "catstreet", name: "Cat Street", count: 4 },
  { id: "ginza", name: "Ginza", count: 2 },
  { id: "yokohama", name: "Yokohama", count: 3 },
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
const dates = ["20", "21", "22", "23", "24", "25", "26"]

// Sample schedule data
const scheduledEvents = [
  {
    id: 1,
    day: 0, // Monday
    time: 8, // 6:00 PM
    duration: 2,
    title: "モネ 睡蓮",
    titleEn: "Monet Water Lilies",
    instructor: instructors[0],
    participants: { current: 8, max: 12 },
    status: "Starting in 2 hours",
    location: "ginza",
  },
  {
    id: 2,
    day: 1, // Tuesday
    time: 9, // 7:00 PM
    duration: 2,
    title: "ゴッホ 星月夜",
    titleEn: "Van Gogh Starry Night",
    instructor: instructors[1],
    participants: { current: 6, max: 10 },
    status: "Active",
    location: "daikanyama",
  },
  {
    id: 3,
    day: 2, // Wednesday
    time: 8, // 6:00 PM
    duration: 2,
    title: "F6 たらし込みポーリングアート",
    titleEn: "Paint Pouring",
    instructor: instructors[2],
    participants: { current: 4, max: 8 },
    status: "Live",
    location: "catstreet",
  },
]

// Availability data
const availability = {
  // day, time -> { type: 'available' | 'constrained' | 'unavailable', instructors: [] }
  "0-6": { type: "available", instructors: [instructors[0], instructors[1], instructors[2]] },
  "0-7": { type: "available", instructors: [instructors[0], instructors[1]] },
  "0-10": { type: "constrained", instructors: [instructors[0]] },
  "1-5": { type: "available", instructors: [instructors[1], instructors[2]] },
  "1-6": { type: "available", instructors: [instructors[0], instructors[1], instructors[2], instructors[3]] },
  "2-4": { type: "available", instructors: [instructors[2]] },
  "2-5": { type: "constrained", instructors: [instructors[2]] },
  "3-7": { type: "available", instructors: [instructors[0], instructors[1]] },
  "4-6": { type: "available", instructors: [instructors[1], instructors[3]] },
  "5-8": { type: "available", instructors: [instructors[0], instructors[2]] },
  "6-9": { type: "available", instructors: [instructors[1], instructors[3]] },
}

function ScheduleModal({ day, time, onClose }: { day: number; time: number; onClose: () => void }) {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Schedule Event</DialogTitle>
        <DialogDescription>
          {days[day]} at {timeSlots[time]}
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Template</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monet">モネ 睡蓮 Monet Water Lilies</SelectItem>
              <SelectItem value="vangogh">ゴッホ 星月夜 Van Gogh Starry Night</SelectItem>
              <SelectItem value="pouring">F6 Paint Pouring</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium">Instructor</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select instructor" />
            </SelectTrigger>
            <SelectContent>
              {instructors.map((instructor) => (
                <SelectItem key={instructor.id} value={instructor.id.toString()}>
                  {instructor.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button onClick={onClose} variant="outline" className="flex-1">
            Cancel
          </Button>
          <Button className="flex-1 bg-[#3b82f6] hover:bg-[#2563eb]">Schedule Event</Button>
        </div>
      </div>
    </DialogContent>
  )
}

function TimeSlot({
  day,
  time,
  availability,
  scheduledEvent,
  onSchedule,
}: {
  day: number
  time: number
  availability?: { type: string; instructors: any[] }
  scheduledEvent?: any
  onSchedule: (day: number, time: number) => void
}) {
  const key = `${day}-${time}`
  const slotAvailability = availability || { type: "unavailable", instructors: [] }

  if (scheduledEvent) {
    return (
      <div className="relative h-16 border border-gray-200">
        <Card className="h-full w-full rounded-none border-0 bg-white shadow-sm">
          <CardContent className="p-2 h-full">
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="text-xs font-medium text-gray-900 leading-tight">{scheduledEvent.title}</div>
                <div className="text-xs text-gray-600 leading-tight">{scheduledEvent.titleEn}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Avatar className="h-4 w-4">
                    <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                      {scheduledEvent.instructor.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-gray-600">{scheduledEvent.instructor.name}</span>
                </div>
                <div className="text-xs text-gray-500">
                  {scheduledEvent.participants.current}/{scheduledEvent.participants.max}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const bgColor = {
    available: "bg-green-50 hover:bg-green-100",
    constrained: "bg-amber-50 hover:bg-amber-100",
    unavailable: "bg-gray-50",
  }[slotAvailability.type]

  const borderColor = {
    available: "border-green-200 hover:border-green-300",
    constrained: "border-amber-200 hover:border-amber-300",
    unavailable: "border-gray-200",
  }[slotAvailability.type]

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`relative h-16 border cursor-pointer transition-colors ${bgColor} ${borderColor} ${
              slotAvailability.type === "unavailable" ? "cursor-not-allowed" : ""
            }`}
            onClick={() => slotAvailability.type !== "unavailable" && onSchedule(day, time)}
          >
            {slotAvailability.type === "available" && slotAvailability.instructors.length > 0 && (
              <div className="absolute bottom-1 right-1 flex items-center gap-1">
                {slotAvailability.instructors.slice(0, 3).map((instructor, idx) => (
                  <Avatar key={instructor.id} className="h-6 w-6">
                    <AvatarFallback className="text-xs bg-blue-100 text-blue-700">{instructor.initials}</AvatarFallback>
                  </Avatar>
                ))}
                {slotAvailability.instructors.length > 3 && (
                  <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xs text-gray-600">+{slotAvailability.instructors.length - 3}</span>
                  </div>
                )}
              </div>
            )}
            {slotAvailability.type === "constrained" && slotAvailability.instructors.length > 0 && (
              <div className="absolute bottom-1 right-1">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs bg-amber-100 text-amber-700">
                    {slotAvailability.instructors[0].initials}
                  </AvatarFallback>
                </Avatar>
              </div>
            )}
            {slotAvailability.type === "unavailable" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs text-gray-400">No instructors</span>
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          {slotAvailability.type === "available" && (
            <div>
              <p className="font-medium">Available instructors:</p>
              {slotAvailability.instructors.map((instructor) => (
                <p key={instructor.id} className="text-sm">
                  {instructor.name}
                </p>
              ))}
            </div>
          )}
          {slotAvailability.type === "constrained" && (
            <div>
              <p className="font-medium text-amber-600">Constrained availability</p>
              <p className="text-sm">{slotAvailability.instructors[0]?.name} available but back-to-back classes</p>
            </div>
          )}
          {slotAvailability.type === "unavailable" && <p>No instructors available</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default function SchedulePage() {
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedView, setSelectedView] = useState("week")
  const [scheduleModal, setScheduleModal] = useState<{ day: number; time: number } | null>(null)

  const handleSchedule = (day: number, time: number) => {
    setScheduleModal({ day, time })
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
                  {/* Header Section */}
                  <div className="px-4 lg:px-6">
                    <div className="flex flex-col gap-4">
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
                      </div>

                      {/* Location Tabs */}
                      <Tabs value={selectedLocation} onValueChange={setSelectedLocation}>
                        <TabsList className="grid w-full grid-cols-5">
                          {locations.map((location) => (
                            <TabsTrigger key={location.id} value={location.id} className="relative">
                              {location.name}
                              {location.count > 0 && (
                                <Badge variant="secondary" className="ml-1 h-4 px-1 text-xs">
                                  {location.count}
                                </Badge>
                              )}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                      </Tabs>

                      {/* View Toggle and Date Navigation */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant={selectedView === "month" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedView("month")}
                          >
                            <Calendar className="h-4 w-4 mr-1" />
                            Month
                          </Button>
                          <Button
                            variant={selectedView === "week" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedView("week")}
                            className={selectedView === "week" ? "bg-[#3b82f6] hover:bg-[#2563eb]" : ""}
                          >
                            <Grid3X3 className="h-4 w-4 mr-1" />
                            Week
                          </Button>
                          <Button
                            variant={selectedView === "list" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedView("list")}
                          >
                            <List className="h-4 w-4 mr-1" />
                            List
                          </Button>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <span className="text-sm font-medium">May 19-25, 2025</span>
                          <Button variant="outline" size="sm">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Week View Calendar */}
                  <div className="px-4 lg:px-6">
                    <Card>
                      <CardContent className="p-0">
                        <div className="grid grid-cols-8 border-b">
                          <div className="p-3 border-r bg-gray-50">
                            <Clock className="h-4 w-4 text-gray-500" />
                          </div>
                          {days.map((day, index) => (
                            <div key={day} className="p-3 text-center border-r last:border-r-0 bg-gray-50">
                              <div className="text-sm font-medium text-gray-900">{day}</div>
                              <div className="text-xs text-gray-500">May {dates[index]}</div>
                            </div>
                          ))}
                        </div>

                        {timeSlots.map((time, timeIndex) => (
                          <div key={time} className="grid grid-cols-8 border-b last:border-b-0">
                            <div className="p-3 border-r bg-gray-50 text-sm text-gray-600 font-medium">{time}</div>
                            {days.map((day, dayIndex) => {
                              const scheduledEvent = scheduledEvents.find(
                                (event) => event.day === dayIndex && event.time === timeIndex,
                              )
                              const availabilityKey = `${dayIndex}-${timeIndex}`
                              const slotAvailability = availability[availabilityKey]

                              return (
                                <div key={`${day}-${time}`} className="border-r last:border-r-0">
                                  <TimeSlot
                                    day={dayIndex}
                                    time={timeIndex}
                                    availability={slotAvailability}
                                    scheduledEvent={scheduledEvent}
                                    onSchedule={handleSchedule}
                                  />
                                </div>
                              )
                            })}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </SidebarInset>

        {/* Schedule Modal */}
        <Dialog open={!!scheduleModal} onOpenChange={() => setScheduleModal(null)}>
          {scheduleModal && (
            <ScheduleModal day={scheduleModal.day} time={scheduleModal.time} onClose={() => setScheduleModal(null)} />
          )}
        </Dialog>
      </SidebarProvider>
    </ThemeProvider>
  )
}

"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Calendar, List, Grid3X3, Clock, Users, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeProvider } from "../../components/theme-provider"
import { AppSidebar } from "../../components/app-sidebar"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: {
    duration: typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.4,
    ease: [0.4, 0.0, 0.2, 1],
  },
}

// Sample data with exact specifications
const locations = [
  { id: "all", name: "All", count: 3 },
  { id: "daikanyama", name: "Daikanyama", count: 1 },
  { id: "catstreet", name: "Cat Street", count: 1 },
  { id: "ginza", name: "Ginza", count: 1 },
  { id: "yokohama", name: "Yokohama", count: 0 },
]

const instructors = [
  {
    id: "yuki",
    name: "Yuki Tanaka",
    initials: "YT",
    specialty: "kids",
    specialtyColor: "#3b82f6",
    avatar: "/placeholder.svg?height=32&width=32&text=YT",
  },
  {
    id: "naomi",
    name: "Naomi",
    initials: "N",
    specialty: "master",
    specialtyColor: "#8b5cf6",
    avatar: "/placeholder.svg?height=32&width=32&text=N",
  },
  {
    id: "luci",
    name: "Luci",
    initials: "L",
    specialty: "pouring",
    specialtyColor: "#10b981",
    avatar: "/placeholder.svg?height=32&width=32&text=L",
  },
  {
    id: "daria",
    name: "Daria",
    initials: "D",
    specialty: "evening",
    specialtyColor: "#f59e0b",
    avatar: "/placeholder.svg?height=32&width=32&text=D",
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

const scheduledEvents = [
  {
    id: 1,
    title: "モネ 睡蓮",
    titleEn: "Monet Water Lilies",
    instructor: "yuki",
    participants: { current: 8, max: 12 },
    status: "Starting in 2 hours",
    day: 0, // Monday
    startHour: 8, // 6:00 PM (index 8)
    duration: 2,
    location: "ginza",
  },
  {
    id: 2,
    title: "ゴッホ 星月夜",
    titleEn: "Van Gogh Starry Night",
    instructor: "naomi",
    participants: { current: 10, max: 12 },
    status: "Active",
    day: 1, // Tuesday
    startHour: 9, // 7:00 PM (index 9)
    duration: 2,
    location: "daikanyama",
  },
  {
    id: 3,
    title: "F6 たらし込みポーリングアート",
    titleEn: "Paint Pouring",
    instructor: "luci",
    participants: { current: 6, max: 10 },
    status: "Live",
    day: 2, // Wednesday
    startHour: 8, // 6:00 PM (index 8)
    duration: 2,
    location: "catstreet",
  },
]

// Availability data structure
const availability = {
  0: {
    // Monday
    0: { type: "available", instructors: ["yuki", "naomi"] },
    1: { type: "available", instructors: ["yuki", "naomi", "luci"] },
    2: { type: "available", instructors: ["naomi", "luci"] },
    3: { type: "available", instructors: ["naomi", "luci", "daria"] },
    4: { type: "available", instructors: ["yuki", "naomi", "luci", "daria"] },
    5: { type: "constrained", instructors: ["yuki"], warning: "Back-to-back classes" },
    6: { type: "available", instructors: ["yuki", "naomi", "luci"] },
    7: { type: "available", instructors: ["yuki", "naomi"] },
    8: { type: "scheduled" }, // Monet class
    9: { type: "scheduled" },
    10: { type: "constrained", instructors: ["daria"], warning: "Late evening preference" },
    11: { type: "unavailable" },
  },
  1: {
    // Tuesday
    0: { type: "available", instructors: ["naomi", "luci"] },
    1: { type: "available", instructors: ["yuki", "naomi", "luci"] },
    2: { type: "available", instructors: ["yuki", "luci"] },
    3: { type: "available", instructors: ["yuki", "naomi", "luci"] },
    4: { type: "available", instructors: ["naomi", "luci", "daria"] },
    5: { type: "available", instructors: ["yuki", "naomi"] },
    6: { type: "constrained", instructors: ["luci"], warning: "Equipment setup required" },
    7: { type: "available", instructors: ["yuki", "naomi", "luci"] },
    8: { type: "available", instructors: ["yuki", "luci"] },
    9: { type: "scheduled" }, // Van Gogh class
    10: { type: "scheduled" },
    11: { type: "unavailable" },
  },
  2: {
    // Wednesday
    0: { type: "available", instructors: ["yuki", "naomi"] },
    1: { type: "available", instructors: ["naomi", "luci"] },
    2: { type: "available", instructors: ["yuki", "naomi", "luci"] },
    3: { type: "available", instructors: ["naomi", "luci", "daria"] },
    4: { type: "available", instructors: ["yuki", "naomi", "daria"] },
    5: { type: "available", instructors: ["yuki", "naomi", "luci"] },
    6: { type: "available", instructors: ["naomi", "daria"] },
    7: { type: "constrained", instructors: ["yuki"], warning: "Limited availability" },
    8: { type: "scheduled" }, // Paint Pouring class
    9: { type: "scheduled" },
    10: { type: "available", instructors: ["yuki", "naomi"] },
    11: { type: "unavailable" },
  },
  // Thursday-Sunday with similar patterns
  3: {
    0: { type: "available", instructors: ["yuki", "naomi", "luci"] },
    1: { type: "available", instructors: ["naomi", "luci"] },
    2: { type: "available", instructors: ["yuki", "luci", "daria"] },
    3: { type: "available", instructors: ["yuki", "naomi", "luci", "daria"] },
    4: { type: "available", instructors: ["naomi", "luci"] },
    5: { type: "available", instructors: ["yuki", "naomi"] },
    6: { type: "available", instructors: ["yuki", "naomi", "luci"] },
    7: { type: "available", instructors: ["naomi", "luci", "daria"] },
    8: { type: "available", instructors: ["yuki", "daria"] },
    9: { type: "available", instructors: ["naomi", "luci"] },
    10: { type: "constrained", instructors: ["daria"], warning: "Late evening preference" },
    11: { type: "unavailable" },
  },
  4: {
    0: { type: "available", instructors: ["yuki", "naomi"] },
    1: { type: "available", instructors: ["naomi", "luci", "daria"] },
    2: { type: "available", instructors: ["yuki", "luci"] },
    3: { type: "available", instructors: ["yuki", "naomi", "luci"] },
    4: { type: "available", instructors: ["naomi", "luci", "daria"] },
    5: { type: "available", instructors: ["yuki", "naomi", "luci"] },
    6: { type: "available", instructors: ["yuki", "naomi", "daria"] },
    7: { type: "available", instructors: ["naomi", "luci", "daria"] },
    8: { type: "available", instructors: ["yuki", "naomi", "luci", "daria"] },
    9: { type: "available", instructors: ["naomi", "luci", "daria"] },
    10: { type: "available", instructors: ["daria"] },
    11: { type: "unavailable" },
  },
  5: {
    0: { type: "available", instructors: ["yuki", "naomi", "luci"] },
    1: { type: "available", instructors: ["yuki", "naomi", "luci", "daria"] },
    2: { type: "available", instructors: ["naomi", "luci", "daria"] },
    3: { type: "available", instructors: ["yuki", "naomi", "luci", "daria"] },
    4: { type: "available", instructors: ["yuki", "naomi", "luci", "daria"] },
    5: { type: "available", instructors: ["yuki", "naomi", "luci"] },
    6: { type: "available", instructors: ["yuki", "naomi", "luci", "daria"] },
    7: { type: "available", instructors: ["yuki", "naomi", "luci", "daria"] },
    8: { type: "available", instructors: ["yuki", "naomi", "luci", "daria"] },
    9: { type: "available", instructors: ["naomi", "luci", "daria"] },
    10: { type: "available", instructors: ["naomi", "daria"] },
    11: { type: "unavailable" },
  },
  6: {
    0: { type: "available", instructors: ["yuki", "luci"] },
    1: { type: "available", instructors: ["yuki", "naomi", "luci"] },
    2: { type: "available", instructors: ["naomi", "luci", "daria"] },
    3: { type: "available", instructors: ["yuki", "naomi", "luci", "daria"] },
    4: { type: "available", instructors: ["yuki", "naomi", "daria"] },
    5: { type: "available", instructors: ["yuki", "naomi", "luci"] },
    6: { type: "available", instructors: ["yuki", "naomi", "luci", "daria"] },
    7: { type: "available", instructors: ["yuki", "naomi", "luci", "daria"] },
    8: { type: "available", instructors: ["yuki", "naomi", "luci"] },
    9: { type: "available", instructors: ["naomi", "luci", "daria"] },
    10: { type: "available", instructors: ["luci", "daria"] },
    11: { type: "unavailable" },
  },
}

function ScheduleContent() {
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedView, setSelectedView] = useState("week")
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<{ day: number; hour: number } | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<(typeof scheduledEvents)[0] | null>(null)

  const getSlotData = (dayIndex: number, hourIndex: number) => {
    return availability[dayIndex]?.[hourIndex] || { type: "unavailable" }
  }

  const getInstructor = (instructorId: string) => {
    return instructors.find((i) => i.id === instructorId)
  }

  const handleSlotClick = (dayIndex: number, hourIndex: number) => {
    const slotData = getSlotData(dayIndex, hourIndex)
    if (slotData.type === "available" || slotData.type === "constrained") {
      setSelectedSlot({ day: dayIndex, hour: hourIndex })
      setIsScheduleModalOpen(true)
    }
  }

  const handleEventClick = (event: (typeof scheduledEvents)[0]) => {
    setSelectedEvent(event)
    setIsEventModalOpen(true)
  }

  const renderTimeSlot = (dayIndex: number, hourIndex: number) => {
    const slotData = getSlotData(dayIndex, hourIndex)
    const scheduledEvent = scheduledEvents.find(
      (event) => event.day === dayIndex && hourIndex >= event.startHour && hourIndex < event.startHour + event.duration,
    )

    // Render scheduled event
    if (scheduledEvent && hourIndex === scheduledEvent.startHour) {
      const instructor = getInstructor(scheduledEvent.instructor)
      const statusColors = {
        Live: "bg-blue-500 text-white animate-pulse",
        Active: "bg-green-100 text-green-700",
        "Starting in 2 hours": "bg-amber-100 text-amber-700",
      }

      return (
        <div
          key={`${dayIndex}-${hourIndex}`}
          className="relative border-l border-gray-200 cursor-pointer"
          style={{ height: `${scheduledEvent.duration * 64}px` }}
          onClick={() => handleEventClick(scheduledEvent)}
        >
          <Card className="absolute inset-1 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-3 h-full flex flex-col justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">{scheduledEvent.title}</div>
                <div className="text-xs text-gray-600 mb-2 line-clamp-1">{scheduledEvent.titleEn}</div>
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={instructor?.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                      {instructor?.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-gray-700 truncate">{instructor?.name}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Users className="h-3 w-3" />
                  <span>
                    {scheduledEvent.participants.current}/{scheduledEvent.participants.max}
                  </span>
                </div>
                <Badge
                  className={`text-xs px-2 py-1 ${statusColors[scheduledEvent.status as keyof typeof statusColors] || "bg-gray-100 text-gray-700"}`}
                >
                  {scheduledEvent.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    // Skip rendering for continuation of multi-hour events
    if (scheduledEvent && hourIndex > scheduledEvent.startHour) {
      return <div key={`${dayIndex}-${hourIndex}`} className="h-16 border-l border-gray-200" />
    }

    // Render availability slots
    let bgColor = "bg-gray-50"
    let borderColor = "border-gray-200"
    let cursor = "cursor-not-allowed"
    let content = null

    if (slotData.type === "available") {
      bgColor = "bg-green-50 hover:bg-green-100"
      borderColor = "border-green-200"
      cursor = "cursor-pointer"

      const availableInstructors = slotData.instructors?.map((id) => getInstructor(id)).filter(Boolean) || []

      content = (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute bottom-1 right-1 flex items-center gap-1">
                {availableInstructors.slice(0, 3).map((instructor) => (
                  <div key={instructor.id} className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={instructor.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                        {instructor.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-white"
                      style={{ backgroundColor: instructor.specialtyColor }}
                    />
                  </div>
                ))}
                {availableInstructors.length > 3 && (
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600">
                    +{availableInstructors.length - 3}
                  </div>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-sm">
                <div className="font-medium mb-1">Available Instructors:</div>
                {availableInstructors.map((instructor) => (
                  <div key={instructor.id} className="text-xs">
                    {instructor.name} - {instructor.specialty}
                  </div>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    } else if (slotData.type === "constrained") {
      bgColor = "bg-amber-50 hover:bg-amber-100"
      borderColor = "border-amber-200"
      cursor = "cursor-pointer"

      const constrainedInstructor = getInstructor(slotData.instructors?.[0] || "")

      content = (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute bottom-1 right-1 flex items-center gap-1">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={constrainedInstructor?.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs bg-amber-100 text-amber-700">
                      {constrainedInstructor?.initials}
                    </AvatarFallback>
                  </Avatar>
                  <AlertTriangle className="absolute -top-1 -right-1 h-4 w-4 text-amber-500 bg-white rounded-full p-0.5" />
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-sm">
                <div className="font-medium">{constrainedInstructor?.name}</div>
                <div className="text-xs text-amber-600">{slotData.warning}</div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    } else {
      content = (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs text-gray-400">No instructors</span>
        </div>
      )
    }

    return (
      <div
        key={`${dayIndex}-${hourIndex}`}
        className={`relative h-16 border-l ${borderColor} ${bgColor} ${cursor} transition-all duration-200`}
        onClick={() => handleSlotClick(dayIndex, hourIndex)}
      >
        {content}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
          {/* Location Tabs */}
          <Tabs value={selectedLocation} onValueChange={setSelectedLocation} className="w-full lg:w-auto">
            <TabsList className="grid w-full grid-cols-5 lg:w-auto">
              {locations.map((location) => (
                <TabsTrigger key={location.id} value={location.id} className="flex items-center gap-2">
                  {location.name}
                  {location.count > 0 && (
                    <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                      {location.count}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-4">
            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant={selectedView === "month" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedView("month")}
                className="flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                Month
              </Button>
              <Button
                variant={selectedView === "week" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedView("week")}
                className="flex items-center gap-2"
                style={{ backgroundColor: selectedView === "week" ? "#3b82f6" : undefined }}
              >
                <Grid3X3 className="h-4 w-4" />
                Week
              </Button>
              <Button
                variant={selectedView === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedView("list")}
                className="flex items-center gap-2"
              >
                <List className="h-4 w-4" />
                List
              </Button>
            </div>

            {/* Date Navigation */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium px-4">May 19-25, 2025</span>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <Card className="overflow-hidden mb-6">
          <CardContent className="p-0">
            {/* Header */}
            <div className="grid grid-cols-8 border-b">
              <div className="p-4 bg-gray-50 border-r flex items-center justify-center">
                <Clock className="h-4 w-4 text-gray-500" />
              </div>
              {days.map((day, index) => (
                <div key={day} className="p-4 bg-gray-50 text-center border-r last:border-r-0">
                  <div className="font-medium text-gray-900">{shortDays[index]}</div>
                  <div className="text-sm text-gray-500">May {19 + index}</div>
                </div>
              ))}
            </div>

            {/* Time slots */}
            {timeSlots.map((time, hourIndex) => (
              <div key={time} className="grid grid-cols-8 border-b last:border-b-0">
                {/* Time label */}
                <div className="p-4 bg-gray-50 border-r text-sm text-gray-600 flex items-center">{time}</div>
                {/* Day slots */}
                {days.map((_, dayIndex) => renderTimeSlot(dayIndex, hourIndex))}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Legend */}
        <div className="flex flex-wrap gap-6 text-sm">
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

      {/* Schedule Event Modal */}
      <Dialog open={isScheduleModalOpen} onOpenChange={setIsScheduleModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Schedule Event for {selectedSlot && days[selectedSlot.day]} at{" "}
              {selectedSlot && timeSlots[selectedSlot.hour]}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Template</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monet">モネ 睡蓮 / Monet Water Lilies</SelectItem>
                  <SelectItem value="vangogh">ゴッホ 星月夜 / Van Gogh Starry Night</SelectItem>
                  <SelectItem value="pouring">F6 たらし込みポーリングアート / Paint Pouring</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Instructor</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select an instructor" />
                </SelectTrigger>
                <SelectContent>
                  {instructors.map((instructor) => (
                    <SelectItem key={instructor.id} value={instructor.id}>
                      {instructor.name} - {instructor.specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
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
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsScheduleModalOpen(false)}>
                Cancel
              </Button>
              <Button style={{ backgroundColor: "#3b82f6" }} className="text-white hover:bg-blue-700">
                Schedule Event
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Event Detail Modal */}
      <Dialog open={isEventModalOpen} onOpenChange={setIsEventModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedEvent?.title} / {selectedEvent?.titleEn}
            </DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={getInstructor(selectedEvent.instructor)?.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{getInstructor(selectedEvent.instructor)?.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{getInstructor(selectedEvent.instructor)?.name}</div>
                  <div className="text-sm text-gray-500">{selectedEvent.location}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-500">Participants</div>
                  <div className="font-medium">
                    {selectedEvent.participants.current}/{selectedEvent.participants.max}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">Status</div>
                  <Badge variant="secondary">{selectedEvent.status}</Badge>
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
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function SchedulePage() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="dashboard-theme">
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <AnimatePresence mode="wait">
            <motion.div key="schedule" className="flex flex-1 flex-col" {...pageTransition}>
              <div className="@container/main flex flex-1 flex-col gap-2">
                <ScheduleContent />
              </div>
            </motion.div>
          </AnimatePresence>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}

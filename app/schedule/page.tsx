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

// Sample data
const locations = [
  { id: "all", name: "All", count: 12 },
  { id: "daikanyama", name: "Daikanyama", count: 4 },
  { id: "catstreet", name: "Cat Street", count: 3 },
  { id: "ginza", name: "Ginza", count: 3 },
  { id: "yokohama", name: "Yokohama", count: 2 },
]

const instructors = [
  { id: "yuki", name: "Yuki Tanaka", avatar: "/placeholder.svg?height=32&width=32", specialty: "kids", initials: "YT" },
  { id: "naomi", name: "Naomi", avatar: "/placeholder.svg?height=32&width=32", specialty: "master", initials: "N" },
  { id: "luci", name: "Luci", avatar: "/placeholder.svg?height=32&width=32", specialty: "pouring", initials: "L" },
  { id: "daria", name: "Daria", avatar: "/placeholder.svg?height=32&width=32", specialty: "evening", initials: "D" },
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

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const fullDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const scheduledEvents = [
  {
    id: 1,
    day: 0, // Monday
    time: 8, // 6:00 PM
    duration: 2,
    title: "モネ 睡蓮",
    titleEn: "Monet Water Lilies",
    instructor: "yuki",
    participants: { current: 8, max: 12 },
    location: "ginza",
    status: "Starting in 2 hours",
  },
  {
    id: 2,
    day: 1, // Tuesday
    time: 9, // 7:00 PM
    duration: 2,
    title: "ゴッホ 星月夜",
    titleEn: "Van Gogh Starry Night",
    instructor: "naomi",
    participants: { current: 6, max: 10 },
    location: "daikanyama",
    status: "Active",
  },
  {
    id: 3,
    day: 2, // Wednesday
    time: 8, // 6:00 PM
    duration: 2,
    title: "F6 たらし込みポーリングアート",
    titleEn: "Paint Pouring",
    instructor: "luci",
    participants: { current: 12, max: 12 },
    location: "catstreet",
    status: "Full",
  },
]

// Availability data - which instructors are available at each time slot
const availability = {
  // Monday
  0: {
    6: { type: "available", instructors: ["yuki", "naomi", "luci"] },
    7: { type: "available", instructors: ["yuki", "naomi"] },
    8: { type: "scheduled" }, // Monet class
    9: { type: "scheduled" },
    10: { type: "constrained", instructors: ["daria"], warning: "Back-to-back classes" },
    11: { type: "unavailable" },
  },
  // Tuesday
  1: {
    6: { type: "available", instructors: ["yuki", "luci", "daria"] },
    7: { type: "available", instructors: ["yuki", "luci"] },
    8: { type: "constrained", instructors: ["yuki"], warning: "Limited availability" },
    9: { type: "scheduled" }, // Van Gogh class
    10: { type: "scheduled" },
    11: { type: "unavailable" },
  },
  // Wednesday
  2: {
    6: { type: "available", instructors: ["naomi", "daria"] },
    7: { type: "available", instructors: ["naomi", "daria", "yuki"] },
    8: { type: "scheduled" }, // Paint Pouring class
    9: { type: "scheduled" },
    10: { type: "available", instructors: ["yuki", "naomi"] },
    11: { type: "unavailable" },
  },
  // Thursday-Sunday (similar pattern)
  3: {
    6: { type: "available", instructors: ["yuki", "naomi", "luci", "daria"] },
    7: { type: "available", instructors: ["yuki", "naomi", "luci"] },
    8: { type: "available", instructors: ["yuki", "naomi"] },
    9: { type: "constrained", instructors: ["luci"], warning: "Equipment setup required" },
    10: { type: "available", instructors: ["daria"] },
    11: { type: "unavailable" },
  },
  4: {
    6: { type: "available", instructors: ["yuki", "naomi", "luci"] },
    7: { type: "available", instructors: ["yuki", "naomi", "luci", "daria"] },
    8: { type: "available", instructors: ["naomi", "luci", "daria"] },
    9: { type: "available", instructors: ["naomi", "luci"] },
    10: { type: "constrained", instructors: ["yuki"], warning: "Late evening preference" },
    11: { type: "unavailable" },
  },
  5: {
    6: { type: "available", instructors: ["yuki", "naomi", "luci", "daria"] },
    7: { type: "available", instructors: ["yuki", "naomi", "luci", "daria"] },
    8: { type: "available", instructors: ["yuki", "naomi", "luci"] },
    9: { type: "available", instructors: ["yuki", "naomi", "daria"] },
    10: { type: "available", instructors: ["naomi", "daria"] },
    11: { type: "unavailable" },
  },
  6: {
    6: { type: "available", instructors: ["yuki", "luci", "daria"] },
    7: { type: "available", instructors: ["yuki", "naomi", "luci", "daria"] },
    8: { type: "available", instructors: ["yuki", "naomi", "luci", "daria"] },
    9: { type: "available", instructors: ["yuki", "naomi", "luci"] },
    10: { type: "available", instructors: ["naomi", "luci"] },
    11: { type: "unavailable" },
  },
}

export default function SchedulePage() {
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedView, setSelectedView] = useState("week")
  const [selectedDate, setSelectedDate] = useState("May 19-25, 2025")
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<{ day: number; time: number } | null>(null)

  const getSlotData = (dayIndex: number, timeIndex: number) => {
    return availability[dayIndex]?.[timeIndex + 6] || { type: "unavailable" }
  }

  const getScheduledEvent = (dayIndex: number, timeIndex: number) => {
    return scheduledEvents.find(
      (event) => event.day === dayIndex && timeIndex >= event.time && timeIndex < event.time + event.duration,
    )
  }

  const getInstructor = (instructorId: string) => {
    return instructors.find((i) => i.id === instructorId)
  }

  const handleSlotClick = (dayIndex: number, timeIndex: number) => {
    const slotData = getSlotData(dayIndex, timeIndex)
    if (slotData.type === "available" || slotData.type === "constrained") {
      setSelectedSlot({ day: dayIndex, time: timeIndex })
      setIsScheduleModalOpen(true)
    }
  }

  const renderTimeSlot = (dayIndex: number, timeIndex: number) => {
    const slotData = getSlotData(dayIndex, timeIndex)
    const scheduledEvent = getScheduledEvent(dayIndex, timeIndex)

    if (scheduledEvent) {
      const instructor = getInstructor(scheduledEvent.instructor)
      const isFirstSlot = timeIndex === scheduledEvent.time

      if (!isFirstSlot) {
        return <div key={`${dayIndex}-${timeIndex}`} className="h-16 border-l border-gray-200" />
      }

      return (
        <div
          key={`${dayIndex}-${timeIndex}`}
          className={`relative border-l border-gray-200 transition-all duration-400 ease-in-out`}
          style={{ height: `${scheduledEvent.duration * 64}px` }}
        >
          <Card className="absolute inset-1 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
            <CardContent className="p-3 h-full flex flex-col justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900 mb-1">{scheduledEvent.title}</div>
                <div className="text-xs text-gray-600 mb-2">{scheduledEvent.titleEn}</div>
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={instructor?.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                      {instructor?.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-gray-700">{instructor?.name}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Users className="h-3 w-3" />
                  <span>
                    {scheduledEvent.participants.current}/{scheduledEvent.participants.max}
                  </span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {scheduledEvent.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    let bgColor = "bg-gray-50"
    let borderColor = "border-gray-200"
    let cursor = "cursor-not-allowed"
    let content = null

    if (slotData.type === "available") {
      bgColor = "bg-green-50 hover:bg-green-100"
      borderColor = "border-green-200"
      cursor = "cursor-pointer"
      content = (
        <div className="absolute bottom-1 right-1 flex items-center gap-1">
          {slotData.instructors?.slice(0, 3).map((instructorId, index) => {
            const instructor = getInstructor(instructorId)
            return (
              <Avatar key={instructorId} className="h-6 w-6">
                <AvatarImage src={instructor?.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-xs bg-blue-100 text-blue-700">{instructor?.initials}</AvatarFallback>
              </Avatar>
            )
          })}
          {slotData.instructors && slotData.instructors.length > 3 && (
            <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600">
              +{slotData.instructors.length - 3}
            </div>
          )}
        </div>
      )
    } else if (slotData.type === "constrained") {
      bgColor = "bg-amber-50 hover:bg-amber-100"
      borderColor = "border-amber-200"
      cursor = "cursor-pointer"
      content = (
        <div className="absolute bottom-1 right-1 flex items-center gap-1">
          {slotData.instructors?.map((instructorId) => {
            const instructor = getInstructor(instructorId)
            return (
              <div key={instructorId} className="relative">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={instructor?.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xs bg-amber-100 text-amber-700">
                    {instructor?.initials}
                  </AvatarFallback>
                </Avatar>
                <AlertTriangle className="absolute -top-1 -right-1 h-3 w-3 text-amber-500" />
              </div>
            )
          })}
        </div>
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
        key={`${dayIndex}-${timeIndex}`}
        className={`relative h-16 border-l ${borderColor} ${bgColor} ${cursor} transition-all duration-200`}
        onClick={() => handleSlotClick(dayIndex, timeIndex)}
      >
        {content}
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6 transition-all duration-400 ease-in-out">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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
              className="flex items-center gap-2 bg-[#3b82f6] text-white hover:bg-[#2563eb]"
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
            <span className="text-sm font-medium px-4">{selectedDate}</span>
            <Button variant="outline" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-8 border-b">
            {/* Time column header */}
            <div className="p-4 bg-gray-50 border-r">
              <Clock className="h-4 w-4 text-gray-500" />
            </div>
            {/* Day headers */}
            {days.map((day, index) => (
              <div key={day} className="p-4 bg-gray-50 text-center border-r last:border-r-0">
                <div className="font-medium text-gray-900">{day}</div>
                <div className="text-sm text-gray-500">May {19 + index}</div>
              </div>
            ))}
          </div>

          {/* Time slots */}
          {timeSlots.map((time, timeIndex) => (
            <div key={time} className="grid grid-cols-8 border-b last:border-b-0">
              {/* Time label */}
              <div className="p-4 bg-gray-50 border-r text-sm text-gray-600 flex items-center">{time}</div>
              {/* Day slots */}
              {days.map((_, dayIndex) => renderTimeSlot(dayIndex, timeIndex))}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Schedule Modal */}
      <Dialog open={isScheduleModalOpen} onOpenChange={setIsScheduleModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Schedule Event for {selectedSlot && fullDays[selectedSlot.day]}{" "}
              {selectedSlot && timeSlots[selectedSlot.time]}
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
                      {instructor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsScheduleModalOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-[#3b82f6] hover:bg-[#2563eb]">Schedule Event</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

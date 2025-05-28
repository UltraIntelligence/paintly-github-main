"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Calendar, List, Grid3X3, Clock, Users, AlertTriangle, Search } from "lucide-react"
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
import { Input } from "@/components/ui/input"

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
    templateId: "monet", // Add this
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
    templateId: "vangogh", // Add this
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
    templateId: "pouring", // Add this
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

// Template data with duration and specialization requirements
const templates = [
  {
    id: "monet",
    japaneseTitle: "モネ 睡蓮",
    englishTitle: "Monet Water Lilies",
    duration: 2,
    canvas: "F6",
    difficulty: "Beginner",
    category: "Master Artists",
    specialization: ["master", "general"],
    image: "/placeholder.svg?height=80&width=80&query=monet water lilies",
  },
  {
    id: "vangogh",
    japaneseTitle: "ゴッホ 星月夜",
    englishTitle: "Van Gogh Starry Night",
    duration: 2.5,
    canvas: "F10",
    difficulty: "Advanced",
    category: "Master Artists",
    specialization: ["master"],
    image: "/placeholder.svg?height=80&width=80&query=van gogh starry night",
  },
  {
    id: "pouring",
    japaneseTitle: "F6 たらし込みポーリングアート",
    englishTitle: "Paint Pouring",
    duration: 2,
    canvas: "30cm Round",
    difficulty: "Beginner",
    category: "Paint Pouring",
    specialization: ["pouring"],
    image: "/placeholder.svg?height=80&width=80&query=paint pouring fluid art",
  },
  {
    id: "kids-chameleon",
    japaneseTitle: "キッズ カメレオン",
    englishTitle: "Kids Chameleon",
    duration: 1.5,
    canvas: "25cm Round",
    difficulty: "Kids",
    category: "Kids Only",
    specialization: ["kids"],
    image: "/placeholder.svg?height=80&width=80&query=kids chameleon painting",
  },
  {
    id: "sunflowers",
    japaneseTitle: "花瓶のひまわり",
    englishTitle: "Sunflowers Vase",
    duration: 2,
    canvas: "F6",
    difficulty: "Intermediate",
    category: "All",
    specialization: ["general", "master"],
    image: "/placeholder.svg?height=80&width=80&query=sunflowers vase painting",
  },
]

function ScheduleContent() {
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedView, setSelectedView] = useState("week")
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [isEventDetailModalOpen, setIsEventDetailModalOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<{ day: number; hour: number; availableHours: number } | null>(null)
  const [selectedEventDetail, setSelectedEventDetail] = useState<(typeof scheduledEvents)[0] | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [selectedInstructor, setSelectedInstructor] = useState("")
  const [selectedDuration, setSelectedDuration] = useState("")

  const getSlotData = (dayIndex: number, hourIndex: number) => {
    return availability[dayIndex]?.[hourIndex] || { type: "unavailable" }
  }

  const getInstructor = (instructorId: string) => {
    return instructors.find((i) => i.id === instructorId)
  }

  const handleSlotClick = (dayIndex: number, hourIndex: number) => {
    const slotData = getSlotData(dayIndex, hourIndex)
    if (slotData.type === "available" || slotData.type === "constrained") {
      const availableHours = getAvailableHours(dayIndex, hourIndex)
      setSelectedSlot({ day: dayIndex, hour: hourIndex, availableHours })
      setSelectedTemplate("")
      setSelectedInstructor("")
      setSelectedDuration("")
      setIsScheduleModalOpen(true)
    }
  }

  const handleEventClick = (event: (typeof scheduledEvents)[0]) => {
    setSelectedEventDetail(event)
    setIsEventDetailModalOpen(true)
  }

  const handleScheduleEvent = () => {
    if (selectedTemplate && selectedInstructor && selectedSlot) {
      // Here you would typically make an API call to schedule the event
      console.log("Scheduling event:", {
        template: selectedTemplate,
        instructor: selectedInstructor,
        day: selectedSlot.day,
        hour: selectedSlot.hour,
        duration: selectedDuration,
      })

      setIsScheduleModalOpen(false)
      // Show success toast (you can implement this with a toast library)
      alert("Event scheduled successfully!")
    }
  }

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId)
    const template = templates.find((t) => t.id === templateId)
    if (template) {
      setSelectedDuration(template.duration.toString())
    }
  }

  const renderTimeSlot = (dayIndex: number, hourIndex: number) => {
    const slotData = getSlotData(dayIndex, hourIndex)
    const scheduledEvent = scheduledEvents.find(
      (event) => event.day === dayIndex && hourIndex >= event.startHour && hourIndex < event.startHour + event.duration,
    )

    // Render scheduled event (only at start hour)
    if (scheduledEvent && hourIndex === scheduledEvent.startHour) {
      const instructor = getInstructor(scheduledEvent.instructor)

      return (
        <div
          key={`${dayIndex}-${hourIndex}`}
          className="relative border-l border-gray-200 cursor-pointer"
          style={{
            gridRow: `span ${scheduledEvent.duration}`,
            height: `${scheduledEvent.duration * 80}px`,
          }}
          onClick={() => handleEventClick(scheduledEvent)}
        >
          <Card className="absolute inset-1 bg-white shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer h-[calc(100%-8px)]">
            <CardContent className="p-3 h-full flex flex-col justify-between group">
              <div>
                <div className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">{scheduledEvent.title}</div>
                <div className="text-xs text-gray-600 mb-2 line-clamp-1">{scheduledEvent.titleEn}</div>
                {/* Only show Live status badge */}
                {scheduledEvent.status === "Live" && (
                  <Badge className="text-xs px-2 py-1 bg-blue-500 text-white animate-pulse">Live</Badge>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Users className="h-3 w-3" />
                  <span>
                    {scheduledEvent.participants.current}/{scheduledEvent.participants.max}
                  </span>
                </div>
                {/* Instructor avatar with tooltip */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={instructor?.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                          {instructor?.initials}
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                      <span className="text-sm">{instructor?.name}</span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    // Skip rendering for continuation of multi-hour events
    if (
      scheduledEvent &&
      hourIndex > scheduledEvent.startHour &&
      hourIndex < scheduledEvent.startHour + scheduledEvent.duration
    ) {
      return null // Don't render anything for spanned slots
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
              <div className="absolute bottom-1 right-1 flex items-center gap-1 z-10">
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
              <div className="absolute bottom-1 right-1 flex items-center gap-1 z-10">
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
        className={`relative border-l ${borderColor} ${cursor} transition-all duration-200 hover:shadow-sm hover:border-green-300 min-h-[80px]`}
        onClick={() => handleSlotClick(dayIndex, hourIndex)}
      >
        <div className={`absolute inset-0 ${bgColor}`}>{content}</div>
      </div>
    )
  }

  // Helper function to get available hours from a time slot
  const getAvailableHours = (dayIndex: number, startHour: number) => {
    let hours = 0
    for (let i = startHour; i < timeSlots.length; i++) {
      const slotData = getSlotData(dayIndex, i)
      if (slotData.type === "available" || slotData.type === "constrained") {
        hours++
      } else {
        break
      }
    }
    return hours
  }

  // Filter templates based on available time and instructor specializations
  const getFilteredTemplates = (availableHours: number, availableInstructors: string[]) => {
    const instructorSpecializations = availableInstructors.map((id) => {
      const instructor = getInstructor(id)
      return instructor?.specialty || "general"
    })

    return templates.filter((template) => {
      // Duration filter
      const durationFits = template.duration <= availableHours

      // Specialization filter
      const hasRequiredSpecialization = template.specialization.some(
        (spec) => instructorSpecializations.includes(spec) || spec === "general",
      )

      return durationFits && hasRequiredSpecialization
    })
  }

  // Get available instructors for a template
  const getAvailableInstructorsForTemplate = (template: (typeof templates)[0], availableInstructorIds: string[]) => {
    return availableInstructorIds
      .filter((id) => {
        const instructor = getInstructor(id)
        return instructor && template.specialization.includes(instructor.specialty)
      })
      .map((id) => getInstructor(id))
      .filter(Boolean)
  }

  // Add this helper function after getAvailableInstructorsForTemplate
  const getDateLabel = (dayIndex) => {
    const today = new Date()
    const eventDate = new Date(today)
    eventDate.setDate(today.getDate() + dayIndex)

    if (dayIndex === 0) return "Today"
    if (dayIndex === 1) return "Tomorrow"
    return eventDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  }

  // Transform events for list view
  const eventsByDate = scheduledEvents
    .sort((a, b) => {
      if (a.day !== b.day) return a.day - b.day
      return a.startHour - b.startHour
    })
    .reduce((groups, event) => {
      const dateKey = `${event.day}`
      if (!groups[dateKey]) groups[dateKey] = []
      groups[dateKey].push(event)
      return groups
    }, {})

  // Generate next 7 days for empty state
  const next7Days = Array.from({ length: 7 }, (_, i) => i)

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-6">
          {/* Top row - Search, Location Dropdown, and Location Tabs */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search events..." className="pl-10" />
            </div>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.id} value={location.id}>
                    {location.name} {location.count > 0 && `(${location.count})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Tabs value={selectedLocation} onValueChange={setSelectedLocation} className="w-auto">
              <TabsList>
                {locations.map((location) => (
                  <TabsTrigger value={location.id} key={location.id} className="gap-1">
                    {location.name}{" "}
                    {location.count > 0 && (
                      <Badge
                        variant="secondary"
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30"
                      >
                        {location.count}
                      </Badge>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Bottom row - View Controls and Date Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            {/* Left side - View Toggle */}
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

            {/* Right side - Date Navigation */}
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

        {/* Calendar Grid - Week View */}
        {selectedView === "week" && (
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

              {/* Time slots with proper grid structure for spanning */}
              <div className="grid grid-cols-8" style={{ gridTemplateRows: `repeat(${timeSlots.length}, 80px)` }}>
                {/* Render all time labels first */}
                {timeSlots.map((time, hourIndex) => (
                  <div
                    key={`time-${hourIndex}`}
                    className="p-4 bg-gray-50 border-r border-b text-sm text-gray-600 flex items-center"
                    style={{ gridColumn: 1, gridRow: hourIndex + 1 }}
                  >
                    {time}
                  </div>
                ))}

                {/* Render all day slots with proper grid positioning */}
                {days.map((_, dayIndex) =>
                  timeSlots.map((_, hourIndex) => {
                    const slot = renderTimeSlot(dayIndex, hourIndex)
                    return slot ? (
                      <div
                        key={`${dayIndex}-${hourIndex}`}
                        style={{
                          gridColumn: dayIndex + 2,
                          gridRow: slot.props?.style?.gridRow || hourIndex + 1,
                        }}
                        className="border-b border-gray-200"
                      >
                        {slot}
                      </div>
                    ) : null
                  }),
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* List View */}
        {selectedView === "list" && (
          <Card className="overflow-hidden mb-6">
            <CardContent className="p-0">
              {Object.keys(eventsByDate).length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {next7Days.map((dayIndex) => {
                    const dayEvents = eventsByDate[dayIndex] || []
                    const dateLabel = getDateLabel(dayIndex)

                    return (
                      <div key={dayIndex}>
                        {/* Date Header */}
                        <div className="sticky top-0 bg-gray-50 px-6 py-3 border-b border-gray-200 z-10">
                          <h3 className="text-sm font-medium text-gray-900">{dateLabel}</h3>
                          <p className="text-xs text-gray-500">May {19 + dayIndex}, 2025</p>
                        </div>

                        {/* Events for this day */}
                        {dayEvents.length > 0 ? (
                          <div className="divide-y divide-gray-100">
                            {dayEvents.map((event) => {
                              const instructor = getInstructor(event.instructor)
                              const startTime = timeSlots[event.startHour]
                              const endTime =
                                timeSlots[event.startHour + event.duration] ||
                                `${Number.parseInt(timeSlots[event.startHour].split(":")[0]) + event.duration}:${timeSlots[event.startHour].split(":")[1]}`

                              // Find matching template for image
                              const matchingTemplate = templates.find(
                                (template) =>
                                  template.japaneseTitle === event.title ||
                                  template.englishTitle === event.titleEn ||
                                  template.id === event.templateId,
                              )

                              // Calculate progress percentage and color
                              const progressPercentage = (event.participants.current / event.participants.max) * 100
                              const getProgressColor = () => {
                                if (progressPercentage >= 100) return "bg-red-500"
                                if (progressPercentage >= 80) return "bg-amber-500"
                                return "bg-green-500"
                              }

                              return (
                                <div
                                  key={event.id}
                                  className="p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                                  onClick={() => handleEventClick(event)}
                                >
                                  <div className="flex items-start gap-4">
                                    {/* Event Image */}
                                    <div className="flex-shrink-0">
                                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                                        <img
                                          src={
                                            matchingTemplate?.image ||
                                            `/placeholder.svg?height=80&width=80&query=${encodeURIComponent(event.titleEn || event.title)}`
                                          }
                                          alt={event.titleEn || event.title}
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
                                            <h4 className="text-base font-semibold text-gray-900 truncate">
                                              {event.title}
                                            </h4>
                                            {event.status === "Live" && (
                                              <Badge className="text-xs px-2 py-1 bg-blue-500 text-white animate-pulse">
                                                Live
                                              </Badge>
                                            )}
                                          </div>
                                          <p className="text-sm text-gray-600 truncate mb-2">{event.titleEn}</p>
                                        </div>

                                        {/* Instructor Avatar */}
                                        <div className="flex-shrink-0 ml-4">
                                          <TooltipProvider>
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <Avatar className="h-10 w-10">
                                                  <AvatarImage src={instructor?.avatar || "/placeholder.svg"} />
                                                  <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                                                    {instructor?.initials}
                                                  </AvatarFallback>
                                                </Avatar>
                                              </TooltipTrigger>
                                              <TooltipContent>
                                                <span className="text-sm">{instructor?.name}</span>
                                              </TooltipContent>
                                            </Tooltip>
                                          </TooltipProvider>
                                        </div>
                                      </div>

                                      {/* Progress Bar */}
                                      <div className="mb-3">
                                        <div className="flex items-center justify-between mb-1">
                                          <span className="text-sm font-medium text-gray-700">
                                            {event.participants.current}/{event.participants.max} participants
                                          </span>
                                          <span className="text-xs text-gray-500">
                                            {Math.round(progressPercentage)}% full
                                          </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                          <div
                                            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor()}`}
                                            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                                          />
                                        </div>
                                      </div>

                                      {/* Time and Location Info */}
                                      <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                          <Clock className="h-4 w-4" />
                                          <span>
                                            {startTime} - {endTime}
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <span>Artbar {event.location}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        ) : (
                          <div className="p-8 text-center">
                            <Calendar className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">No events scheduled</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">No events scheduled</p>
                  <p className="text-sm text-gray-500 mb-4">Start by creating your first event</p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">Schedule Event</Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

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
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Schedule Event</DialogTitle>
            <p className="text-sm text-gray-600">
              {selectedSlot &&
                `${days[selectedSlot.day]}, May ${19 + selectedSlot.day} at ${timeSlots[selectedSlot.hour]}`}
            </p>
          </DialogHeader>

          {selectedSlot && (
            <div className="space-y-6">
              {/* Template Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Template Selection</label>
                <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose template..." />
                  </SelectTrigger>
                  <SelectContent>
                    {getFilteredTemplates(
                      selectedSlot.availableHours,
                      getSlotData(selectedSlot.day, selectedSlot.hour).instructors || [],
                    ).map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.japaneseTitle} | {template.englishTitle}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Selected Template Preview */}
              {selectedTemplate && (
                <div className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center gap-3">
                    <img
                      src={templates.find((t) => t.id === selectedTemplate)?.image || "/placeholder.svg"}
                      alt="Template preview"
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-medium">
                        {templates.find((t) => t.id === selectedTemplate)?.japaneseTitle} |{" "}
                        {templates.find((t) => t.id === selectedTemplate)?.englishTitle}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Duration: {templates.find((t) => t.id === selectedTemplate)?.duration} hours | Canvas:{" "}
                        {templates.find((t) => t.id === selectedTemplate)?.canvas} | Difficulty:{" "}
                        {templates.find((t) => t.id === selectedTemplate)?.difficulty}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Instructor Assignment */}
              {selectedTemplate && (
                <div className="space-y-3">
                  <label className="text-sm font-medium">Instructor Assignment</label>
                  <Select value={selectedInstructor} onValueChange={setSelectedInstructor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose instructor..." />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableInstructorsForTemplate(
                        templates.find((t) => t.id === selectedTemplate)!,
                        getSlotData(selectedSlot.day, selectedSlot.hour).instructors || [],
                      ).map((instructor) => (
                        <SelectItem key={instructor.id} value={instructor.id}>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: instructor.specialtyColor }}
                            />
                            {instructor.name} ({instructor.specialty} specialist)
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Location */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Location</label>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm">{locations.find((l) => l.id === selectedLocation)?.name} Studio</p>
                </div>
              </div>

              {/* Time Duration */}
              {selectedTemplate && (
                <div className="space-y-3">
                  <label className="text-sm font-medium">Time Duration</label>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm">
                      {timeSlots[selectedSlot.hour]} -{" "}
                      {timeSlots[selectedSlot.hour + Math.floor(Number.parseFloat(selectedDuration))] ||
                        `${Number.parseInt(timeSlots[selectedSlot.hour].split(":")[0]) + Math.floor(Number.parseFloat(selectedDuration))}:${timeSlots[selectedSlot.hour].split(":")[1]}`}
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsScheduleModalOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button
                  onClick={handleScheduleEvent}
                  disabled={!selectedTemplate || !selectedInstructor}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Schedule Event
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Event Details Modal */}
      <Dialog open={isEventDetailModalOpen} onOpenChange={setIsEventDetailModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Event Details</DialogTitle>
          </DialogHeader>

          {selectedEventDetail && (
            <div className="space-y-6">
              {/* Event Title */}
              <div>
                <h3 className="text-lg font-semibold">
                  {selectedEventDetail.title} | {selectedEventDetail.titleEn}
                </h3>
              </div>

              {/* Status and Basic Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      selectedEventDetail.status === "Live"
                        ? "bg-blue-500 text-white animate-pulse"
                        : selectedEventDetail.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                    }
                  >
                    {selectedEventDetail.status}
                  </Badge>
                </div>

                <div className="text-sm space-y-1">
                  <p>
                    <span className="font-medium">Time:</span> {days[selectedEventDetail.day]}, May{" "}
                    {19 + selectedEventDetail.day} • {timeSlots[selectedEventDetail.startHour]}-
                    {timeSlots[selectedEventDetail.startHour + selectedEventDetail.duration]}
                  </p>
                  <p>
                    <span className="font-medium">Location:</span> Artbar {selectedEventDetail.location}
                  </p>
                  <p>
                    <span className="font-medium">Instructor:</span>{" "}
                    {getInstructor(selectedEventDetail.instructor)?.name}
                  </p>
                </div>
              </div>

              {/* Bookings */}
              <div className="space-y-3">
                <div>
                  <p className="font-medium">
                    Bookings: {selectedEventDetail.participants.current}/{selectedEventDetail.participants.max}{" "}
                    participants
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm">
                      View All Bookings
                    </Button>
                    <Button variant="outline" size="sm">
                      Add Walk-in
                    </Button>
                  </div>
                </div>
              </div>

              {/* Materials Included */}
              <div className="space-y-3">
                <h4 className="font-medium">Materials Included:</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Canvas (F6 size)</li>
                  <li>• Acrylic paints</li>
                  <li>• Brushes and palette</li>
                  <li>• Apron</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 pt-4">
                <Button variant="outline" size="sm">
                  Edit Event
                </Button>
                <Button variant="outline" size="sm">
                  Reschedule
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  Cancel Event
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEventDetailModalOpen(false)}
                  className="ml-auto"
                >
                  Close
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

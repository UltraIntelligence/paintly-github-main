"use client"

import { useState, useEffect } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  List,
  Grid3X3,
  Clock,
  Users,
  AlertTriangle,
  Search,
  Plus,
} from "lucide-react"
import { TrendingUp, DollarSign, ClockIcon, Star } from "lucide-react"
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
    image: "/placeholder.svg?height=80&width=80",
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
    image: "/placeholder.svg?height=80&width=80",
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
    image: "/placeholder.svg?height=80&width=80",
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
    image: "/placeholder.svg?height=80&width=80",
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
    image: "/placeholder.svg?height=80&width=80",
  },
]

// Location color mapping
const locationColors = {
  daikanyama: "#3B82F6",
  ginza: "#10B981",
  catstreet: "#F59E0B",
  yokohama: "#8B5CF6",
}

// Intelligent scheduling suggestions data
const schedulingSuggestions = [
  {
    id: "vangogh-fridays",
    template: {
      id: "vangogh",
      japaneseTitle: "ゴッホ 星月夜",
      englishTitle: "Van Gogh Starry Night",
      image: "/placeholder.svg?height=120&width=120",
      category: "Master Artists",
    },
    metrics: {
      successRate: 95,
      avgDaysToSell: 2.1,
      avgRevenue: 2800,
      demandLevel: "High",
      trending: true,
    },
    suggestion: {
      title: "Van Gogh Fridays at 7PM",
      description: "Sold out 3 weeks running • Next 4 Fridays available",
      suggestedDates: [
        { date: "May 30", time: "7:00 PM", available: true },
        { date: "Jun 6", time: "7:00 PM", available: true },
        { date: "Jun 13", time: "7:00 PM", available: true },
        { date: "Jun 20", time: "7:00 PM", available: true },
      ],
      instructor: "Naomi",
      instructorAvailable: true,
    },
    smartPreview: "Schedule for: May 30, Jun 6, Jun 13, Jun 20\nInstructor: Naomi available all dates",
  },
  {
    id: "monet-weekends",
    template: {
      id: "monet",
      japaneseTitle: "モネ 睡蓮",
      englishTitle: "Monet Water Lilies",
      image: "/placeholder.svg?height=120&width=120",
      category: "Master Artists",
    },
    metrics: {
      successRate: 88,
      avgDaysToSell: 3.2,
      avgRevenue: 2400,
      demandLevel: "High",
      trending: false,
    },
    suggestion: {
      title: "Weekend Monet Sessions",
      description: "Perfect for beginners • Saturday afternoons performing well",
      suggestedDates: [
        { date: "May 31", time: "2:00 PM", available: true },
        { date: "Jun 7", time: "2:00 PM", available: true },
        { date: "Jun 14", time: "2:00 PM", available: true },
      ],
      instructor: "Yuki Tanaka",
      instructorAvailable: true,
    },
    smartPreview: "Schedule for: May 31, Jun 7, Jun 14\nInstructor: Yuki Tanaka available all dates",
  },
  {
    id: "pouring-thursdays",
    template: {
      id: "pouring",
      japaneseTitle: "F6 たらし込みポーリングアート",
      englishTitle: "Paint Pouring",
      image: "/placeholder.svg?height=120&width=120",
      category: "Paint Pouring",
    },
    metrics: {
      successRate: 92,
      avgDaysToSell: 1.8,
      avgRevenue: 2200,
      demandLevel: "Very High",
      trending: true,
    },
    suggestion: {
      title: "Thursday Evening Pouring",
      description: "Fastest selling class • Young professionals love this slot",
      suggestedDates: [
        { date: "May 29", time: "6:30 PM", available: true },
        { date: "Jun 5", time: "6:30 PM", available: true },
        { date: "Jun 12", time: "6:30 PM", available: true },
        { date: "Jun 19", time: "6:30 PM", available: true },
      ],
      instructor: "Luci",
      instructorAvailable: true,
    },
    smartPreview: "Schedule for: May 29, Jun 5, Jun 12, Jun 19\nInstructor: Luci available all dates",
  },
  // Add 3 more dummy cards
  {
    id: "kids-chameleon-tuesdays",
    template: {
      id: "kids-chameleon",
      japaneseTitle: "キッズ カメレオン",
      englishTitle: "Kids Chameleon",
      image: "/placeholder.svg?height=120&width=120",
      category: "Kids Only",
    },
    metrics: {
      successRate: 97,
      avgDaysToSell: 1.5,
      avgRevenue: 1800,
      demandLevel: "Very High",
      trending: true,
    },
    suggestion: {
      title: "Tuesday Kids Chameleon",
      description: "Perfect for after-school • Consistently sells out",
      suggestedDates: [
        { date: "May 27", time: "4:00 PM", available: true },
        { date: "Jun 3", time: "4:00 PM", available: true },
        { date: "Jun 10", time: "4:00 PM", available: true },
      ],
      instructor: "Yuki Tanaka",
      instructorAvailable: true,
    },
    smartPreview: "Schedule for: May 27, Jun 3, Jun 10\nInstructor: Yuki Tanaka available all dates",
  },
  {
    id: "sunflowers-weekends",
    template: {
      id: "sunflowers",
      japaneseTitle: "花瓶のひまわり",
      englishTitle: "Sunflowers Vase",
      image: "/placeholder.svg?height=120&width=120",
      category: "All",
    },
    metrics: {
      successRate: 85,
      avgDaysToSell: 3.5,
      avgRevenue: 2100,
      demandLevel: "Medium",
      trending: false,
    },
    suggestion: {
      title: "Sunday Sunflowers",
      description: "Popular with families • Relaxed weekend atmosphere",
      suggestedDates: [
        { date: "Jun 1", time: "1:00 PM", available: true },
        { date: "Jun 8", time: "1:00 PM", available: true },
        { date: "Jun 15", time: "1:00 PM", available: true },
      ],
      instructor: "Naomi",
      instructorAvailable: true,
    },
    smartPreview: "Schedule for: Jun 1, Jun 8, Jun 15\nInstructor: Naomi available all dates",
  },
  {
    id: "evening-masterclass",
    template: {
      id: "vangogh",
      japaneseTitle: "夜のマスタークラス",
      englishTitle: "Evening Masterclass",
      image: "/placeholder.svg?height=120&width=120",
      category: "Master Artists",
    },
    metrics: {
      successRate: 90,
      avgDaysToSell: 2.8,
      avgRevenue: 3200,
      demandLevel: "High",
      trending: true,
    },
    suggestion: {
      title: "Wednesday Evening Masterclass",
      description: "Premium experience • Wine included • High revenue",
      suggestedDates: [
        { date: "May 28", time: "7:30 PM", available: true },
        { date: "Jun 4", time: "7:30 PM", available: true },
        { date: "Jun 11", time: "7:30 PM", available: true },
      ],
      instructor: "Daria",
      instructorAvailable: true,
    },
    smartPreview: "Schedule for: May 28, Jun 4, Jun 11\nInstructor: Daria available all dates",
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
  const [suggestions, setSuggestions] = useState(schedulingSuggestions)
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationDirection, setAnimationDirection] = useState<"left" | "right" | null>(null)
  const [isSuggestionsCollapsed, setIsSuggestionsCollapsed] = useState(false)

  // Force list view on mobile
  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 768) {
        // md breakpoint
        setSelectedView("list")
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

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

  const handleAcceptSuggestion = (suggestionId: string) => {
    setAnimationDirection("left")
    setIsAnimating(true)

    // Simulate scheduling the suggested sessions
    setTimeout(() => {
      setSuggestions((prev) => prev.filter((s) => s.id !== suggestionId))
      setCurrentSuggestionIndex((prev) => Math.max(0, prev - 1))
      setIsAnimating(false)
      setAnimationDirection(null)

      // Show success message
      alert("Sessions scheduled successfully!")
    }, 350)
  }

  const handleDismissSuggestion = (suggestionId: string) => {
    setAnimationDirection("right")
    setIsAnimating(true)

    setTimeout(() => {
      setSuggestions((prev) => prev.filter((s) => s.id !== suggestionId))
      setCurrentSuggestionIndex((prev) => Math.max(0, prev - 1))
      setIsAnimating(false)
      setAnimationDirection(null)
    }, 350)
  }

  const handleDragEnd = (event, info, suggestionId: string) => {
    const threshold = 100
    const velocity = info.velocity.x
    const offset = info.offset.x

    if (Math.abs(velocity) > 500 || Math.abs(offset) > threshold) {
      if (offset > 0) {
        // Swiped right - accept
        handleAcceptSuggestion(suggestionId)
      } else {
        // Swiped left - dismiss
        handleDismissSuggestion(suggestionId)
      }
    }
  }

  const prevSuggestion = () => {
    setCurrentSuggestionIndex((prevIndex) => Math.max(0, prevIndex - 1))
  }

  const nextSuggestion = () => {
    setCurrentSuggestionIndex((prevIndex) => Math.min(suggestions.length - 1, prevIndex + 1))
  }

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
            {/* Left side - View Toggle - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-2">
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

            {/* Right side - Date Navigation - Hidden on mobile when in list view */}
            {selectedView !== "month" && (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium px-4">May 19-25, 2025</span>
                <Button variant="outline" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Intelligent Scheduling Suggestions - Always visible across all views */}
        {suggestions.length > 0 ? (
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSuggestionsCollapsed(!isSuggestionsCollapsed)}
                  className="h-7 px-3 text-xs font-medium border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  {isSuggestionsCollapsed ? "Show" : "Hide"}
                </Button>
                <h3 className="text-lg font-semibold text-gray-900">Scheduling Suggestions</h3>
              </div>
              {!isSuggestionsCollapsed && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>
                    {currentSuggestionIndex + 1} of {suggestions.length}
                  </span>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={prevSuggestion}
                      disabled={currentSuggestionIndex === 0}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextSuggestion}
                      disabled={currentSuggestionIndex === suggestions.length - 1}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Suggestion Cards Stream - Only show when not collapsed */}
            <AnimatePresence>
              {!isSuggestionsCollapsed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden"
                >
                  <div className="flex gap-3">
                    {suggestions.map((suggestion, index) => {
                      const isActive = index === currentSuggestionIndex
                      const isVisible = index >= currentSuggestionIndex && index < currentSuggestionIndex + 5

                      if (!isVisible) return null

                      return (
                        <motion.div
                          key={suggestion.id}
                          initial={{ x: 300, opacity: 0, scale: 0.9 }}
                          animate={{
                            x: 0,
                            opacity: isActive ? 1 : 0.5,
                            scale: isActive ? 1 : 0.95,
                            transition: { duration: 0.4, ease: [0.4, 0.0, 0.2, 1] },
                          }}
                          exit={{
                            x: animationDirection === "left" ? -300 : animationDirection === "right" ? 300 : 0,
                            opacity: 0,
                            scale: 0.8,
                            transition: { duration: 0.35, ease: [0.4, 0.0, 0.2, 1] },
                          }}
                          drag={isActive ? "x" : false}
                          dragConstraints={{ left: -150, right: 150 }}
                          dragElastic={0.2}
                          onDragEnd={(event, info) => handleDragEnd(event, info, suggestion.id)}
                          whileDrag={{
                            scale: 1.05,
                            rotate: (info) => info.offset.x * 0.1,
                            transition: { duration: 0.1 },
                          }}
                          className={`flex-shrink-0 transition-all duration-300 ${
                            isActive ? "w-80 cursor-grab active:cursor-grabbing" : "w-80 pointer-events-none"
                          }`}
                        >
                          <Card
                            className={`bg-white shadow-sm transition-all duration-200 border ${
                              isActive ? "border-blue-200 hover:shadow-md" : "border-gray-200 bg-gray-50"
                            }`}
                          >
                            <CardContent className="p-4">
                              {/* Header with Accept/Dismiss buttons */}
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                                    <img
                                      src={suggestion.template.image || "/placeholder.svg"}
                                      alt={suggestion.template.englishTitle}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-1 mb-1">
                                      <Badge variant="outline" className="text-xs px-1 py-0.5">
                                        {suggestion.metrics.successRate}%
                                      </Badge>
                                      {suggestion.metrics.trending && (
                                        <Badge className="text-xs px-1 py-0.5 bg-blue-100 text-blue-700">
                                          <TrendingUp className="h-2 w-2 mr-0.5" />
                                          Hot
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Main Content */}
                              <div className="space-y-3">
                                <div>
                                  <h4 className="text-sm font-semibold text-gray-900 mb-1">
                                    {suggestion.suggestion.title}
                                  </h4>
                                  <p className="text-xs text-gray-600 line-clamp-2">
                                    {suggestion.suggestion.description}
                                  </p>
                                </div>

                                {/* Metrics Row */}
                                <div className="flex items-center gap-2 text-xs">
                                  <div className="flex items-center gap-0.5 text-green-600">
                                    <Star className="h-3 w-3" />
                                    <span>{suggestion.metrics.successRate}%</span>
                                  </div>
                                  <div className="flex items-center gap-0.5 text-blue-600">
                                    <ClockIcon className="h-3 w-3" />
                                    <span>{suggestion.metrics.avgDaysToSell}d</span>
                                  </div>
                                  <div className="flex items-center gap-0.5 text-purple-600">
                                    <DollarSign className="h-3 w-3" />
                                    <span>¥{(suggestion.metrics.avgRevenue / 1000).toFixed(1)}K</span>
                                  </div>
                                </div>

                                {/* Smart Preview */}
                                <div className="bg-gray-50 rounded p-2">
                                  <div className="text-xs font-medium text-gray-700 mb-1">SMART PREVIEW:</div>
                                  <div className="text-xs text-gray-600 line-clamp-2">{suggestion.smartPreview}</div>
                                </div>

                                {/* Action Buttons */}
                                {isActive && (
                                  <div className="flex gap-2 pt-1">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleDismissSuggestion(suggestion.id)}
                                      className="flex-1 text-xs h-7"
                                    >
                                      Not Now
                                    </Button>
                                    <Button
                                      onClick={() => handleAcceptSuggestion(suggestion.id)}
                                      size="sm"
                                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs h-7"
                                    >
                                      Schedule {suggestion.suggestion.suggestedDates.length}
                                    </Button>
                                  </div>
                                )}

                                {/* Swipe Hint for Mobile */}
                                {isActive && (
                                  <div className="text-center pt-2 md:hidden">
                                    <p className="text-xs text-gray-400">← Swipe to dismiss • Swipe to accept →</p>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <AnimatePresence>
            {suggestions.length === 0 && (
              <motion.div
                initial={{ height: "auto", opacity: 1 }}
                animate={{ height: 0, opacity: 0 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden"
              >
                <div className="h-0"></div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Calendar Grid - Month View - Hidden on mobile */}
        {selectedView === "month" && (
          <div className="hidden md:block">
            <div className="space-y-6">
              {/* Standard Month Calendar */}
              <Card className="overflow-hidden transition-all duration-700 ease-in-out">
                <CardContent className="p-0">
                  {/* Month Header */}
                  <div className="flex items-center justify-between p-4 border-b bg-gray-50">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Handle previous month navigation
                          console.log("Previous month")
                        }}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <h2 className="text-lg font-semibold">May 2025</h2>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Handle next month navigation
                          console.log("Next month")
                        }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Today
                      </Button>
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Go to Date
                      </Button>
                    </div>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7">
                    {/* Day Headers */}
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div
                        key={day}
                        className="p-3 text-center text-sm font-medium text-gray-500 bg-gray-50 border-b border-r last:border-r-0"
                      >
                        {day}
                      </div>
                    ))}

                    {/* Calendar Days */}
                    {Array.from({ length: 35 }, (_, index) => {
                      // Calculate the actual date for this cell
                      const startDate = new Date(2025, 4, 1) // May 1, 2025
                      const firstDayOfWeek = startDate.getDay() // 0 = Sunday
                      const dayNumber = index - firstDayOfWeek + 1
                      const currentDate = new Date(2025, 4, dayNumber)
                      const isCurrentMonth = dayNumber > 0 && dayNumber <= 31
                      const isCurrentDay = isCurrentMonth && dayNumber === 19 // May 19 as current day

                      // Get events for this day
                      const dayEvents = scheduledEvents.filter((event) => {
                        const eventDate = 19 + event.day // Convert day index to actual date
                        return isCurrentMonth && dayNumber === eventDate
                      })

                      // Get availability data for this day
                      const dayIndex = (dayNumber - 19) % 7 // Convert to our 0-6 day system
                      const hasAvailability = dayIndex >= 0 && dayIndex < 7 && availability[dayIndex]

                      return (
                        <div
                          key={index}
                          className={`${
                            suggestions.length === 0 || isSuggestionsCollapsed
                              ? "min-h-[180px] lg:min-h-[200px]"
                              : "min-h-[120px]"
                          } border-b border-r last:border-r-0 p-3 transition-all duration-700 ease-in-out ${
                            !isCurrentMonth
                              ? "bg-gray-50 text-gray-400"
                              : isCurrentDay
                                ? "bg-blue-50 border-blue-200"
                                : "bg-white hover:bg-gray-50"
                          } cursor-pointer`}
                          onClick={() => {
                            if (isCurrentMonth && hasAvailability) {
                              // Handle day click for scheduling
                              console.log(`Clicked on day ${dayNumber}`)
                            }
                          }}
                        >
                          {/* Date Number */}
                          <div className="flex items-center justify-between mb-3">
                            <span
                              className={`text-sm font-medium ${
                                isCurrentDay ? "text-blue-600" : isCurrentMonth ? "text-gray-900" : "text-gray-400"
                              }`}
                            >
                              {isCurrentMonth ? dayNumber : ""}
                            </span>

                            {/* Availability Indicator */}
                            {isCurrentMonth && hasAvailability && (
                              <div className="flex items-center gap-1">
                                {Object.values(availability[dayIndex] || {}).some(
                                  (slot: any) => slot.type === "available",
                                ) && <div className="w-2 h-2 rounded-full bg-green-400" title="Available slots" />}
                                {Object.values(availability[dayIndex] || {}).some(
                                  (slot: any) => slot.type === "constrained",
                                ) && <div className="w-2 h-2 rounded-full bg-amber-400" title="Limited availability" />}
                                {Object.values(availability[dayIndex] || {}).some(
                                  (slot: any) => slot.type === "scheduled",
                                ) && <div className="w-2 h-2 rounded-full bg-blue-500" title="Scheduled events" />}
                              </div>
                            )}
                          </div>

                          {/* Events for this day - Location Color Bars */}
                          {isCurrentMonth && dayEvents.length > 0 && (
                            <div className="space-y-1">
                              {dayEvents.slice(0, 3).map((event, index) => {
                                const locationColor = locationColors[event.location] || "#6B7280"
                                return (
                                  <div
                                    key={event.id}
                                    className="h-2 rounded-sm transition-opacity duration-200 hover:opacity-80 cursor-pointer"
                                    style={{
                                      backgroundColor: locationColor,
                                      opacity: dayEvents.length > 1 ? 0.8 : 1,
                                    }}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleEventClick(event)
                                    }}
                                    title={`${event.title} - ${event.location} - ${timeSlots[event.startHour]}`}
                                  />
                                )
                              })}

                              {/* Show "more events" indicator */}
                              {dayEvents.length > 3 && (
                                <div className="text-xs text-gray-500 text-center py-0.5">
                                  +{dayEvents.length - 3} more
                                </div>
                              )}
                            </div>
                          )}

                          {/* Empty state for available days */}
                          {isCurrentMonth && dayEvents.length === 0 && hasAvailability && (
                            <div
                              className={`flex flex-col items-center justify-center ${
                                suggestions.length === 0 || isSuggestionsCollapsed ? "h-32" : "h-20"
                              } text-gray-400 transition-all duration-700`}
                            >
                              <div
                                className={`${
                                  suggestions.length === 0 || isSuggestionsCollapsed ? "w-8 h-8" : "w-6 h-6"
                                } rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center mb-2`}
                              >
                                <Plus
                                  className={`${suggestions.length === 0 || isSuggestionsCollapsed ? "w-4 h-4" : "w-3 h-3"}`}
                                />
                              </div>
                              <span
                                className={`${suggestions.length === 0 || isSuggestionsCollapsed ? "text-sm" : "text-xs"}`}
                              >
                                Available
                              </span>
                              {suggestions.length === 0 ||
                                (isSuggestionsCollapsed && (
                                  <span className="text-xs text-gray-400 mt-1">Click to schedule</span>
                                ))}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Month View Legend */}
                  <div className="p-4 border-t bg-gray-50">
                    <div className="flex flex-wrap gap-4 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-blue-50 border border-blue-200"></div>
                        <span>Today</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        <span>Available</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                        <span>Limited</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span>Scheduled</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                        <span>Live Event</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Calendar Grid - Week View - Hidden on mobile */}
        {selectedView === "week" && (
          <div className="hidden md:block">
            <Card className="overflow-hidden mb-6 mt-2">
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
          </div>
        )}

        {/* List View */}
        {selectedView === "list" && (
          <Card className="overflow-hidden mb-6 mt-2">
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

"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AvatarFallback } from "@/components/ui/avatar"
import { AvatarImage } from "@/components/ui/avatar"
import { Avatar } from "@/components/ui/avatar"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Calendar, List, Grid3X3, Clock, Users, AlertTriangle, Search } from "lucide-react"
import { TrendingUp, DollarSign, ClockIcon, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeProvider } from "../../components/theme-provider"
import { AppSidebar } from "../../components/app-sidebar"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { EventDetailsModal } from "../../components/event-details-modal"

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
  { id: "all", name: "All Locations", count: 7 },
  { id: "daikanyama", name: "Daikanyama", count: 1 },
  { id: "catstreet", name: "Cat Street", count: 1 },
  { id: "ginza", name: "Ginza", count: 1 },
  { id: "yokohama", name: "Yokohama", count: 0 },
  { id: "osaka", name: "Osaka", count: 2 },
  { id: "okinawa", name: "Okinawa", count: 1 },
  { id: "fukuoka", name: "Fukuoka", count: 1 },
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
  osaka: "#EC4899",
  okinawa: "#22D3EE",
  fukuoka: "#A855F7",
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
  const [selectedInstructorModal, setSelectedInstructorModal] = useState("")
  const [selectedDuration, setSelectedDuration] = useState("")
  const [suggestions, setSuggestions] = useState(schedulingSuggestions)
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationDirection, setAnimationDirection] = useState<"left" | "right" | null>(null)
  const [isSuggestionsCollapsed, setIsSuggestionsCollapsed] = useState(false)
  const [selectedInstructor, setSelectedInstructor] = useState("all")
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [pendingSuggestion, setPendingSuggestion] = useState<(typeof suggestions)[0] | null>(null)

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
      setSelectedInstructorModal("")
      setSelectedDuration("")
      setIsScheduleModalOpen(true)
    }
  }

  const handleEventClick = (event: (typeof scheduledEvents)[0]) => {
    setSelectedEventDetail(event)
    setIsEventDetailModalOpen(true)
  }

  const handleScheduleEvent = () => {
    if (selectedTemplate && selectedInstructorModal && selectedSlot) {
      // Here you would typically make an API call to schedule the event
      console.log("Scheduling event:", {
        template: selectedTemplate,
        instructor: selectedInstructorModal,
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

  // Filter events based on selected location and instructor
  const getFilteredEvents = () => {
    return scheduledEvents.filter((event) => {
      const matchesLocation = selectedLocation === "all" || event.location === selectedLocation
      const matchesInstructor = selectedInstructor === "all" || event.instructor === selectedInstructor
      return matchesLocation && matchesInstructor
    })
  }

  const renderTimeSlot = (dayIndex: number, hourIndex: number) => {
    const slotData = getSlotData(dayIndex, hourIndex)
    const filteredEvents = getFilteredEvents()
    const scheduledEvent = filteredEvents.find(
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

  // Helper function to calculate week dates
  const getCurrentWeekDates = () => {
    const today = new Date()
    const startDate = new Date(today)
    startDate.setDate(today.getDate() + currentWeekOffset * 7)

    const endDate = new Date(startDate)
    endDate.setDate(startDate.getDate() + 6)

    return {
      start: startDate,
      end: endDate,
      label: `${startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}-${endDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}, ${startDate.getFullYear()}`,
    }
  }

  // Transform events for list view
  const filteredEvents = getFilteredEvents()
  const eventsByDate = filteredEvents
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
    const suggestion = suggestions.find((s) => s.id === suggestionId)
    if (suggestion) {
      setPendingSuggestion(suggestion)
      setIsConfirmDialogOpen(true)
    }
  }

  const confirmAcceptSuggestion = () => {
    if (pendingSuggestion) {
      setAnimationDirection("left")
      setIsAnimating(true)

      // Simulate scheduling the suggested sessions
      setTimeout(() => {
        setSuggestions((prev) => prev.filter((s) => s.id !== pendingSuggestion.id))
        setCurrentSuggestionIndex((prev) => Math.max(0, prev - 1))
        setIsAnimating(false)
        setAnimationDirection(null)
        setIsConfirmDialogOpen(false)
        setPendingSuggestion(null)
      }, 350)
    }
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
          {/* Top row - Search and Location Dropdown */}
          {/* Top row - Search, Location Dropdown, and Instructor Dropdown */}
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

            <Select value={selectedInstructor} onValueChange={setSelectedInstructor}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="All Instructors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Instructors</SelectItem>
                {instructors.map((instructor) => (
                  <SelectItem key={instructor.id} value={instructor.id}>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: instructor.specialtyColor }} />
                      {instructor.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Bottom row - View Controls and Date Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            {/* Left side - View Toggle - Hidden on mobile */}
            <div className="flex items-center gap-2">
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

              {/* Today Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentWeekOffset(0)}
                className="flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                Today
              </Button>
            </div>

            {/* Right side - Date Navigation - Hidden on mobile when in list view */}
            {selectedView !== "month" && (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setCurrentWeekOffset((prev) => prev - 1)}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium px-4">{getCurrentWeekDates().label}</span>
                <Button variant="outline" size="sm" onClick={() => setCurrentWeekOffset((prev) => prev + 1)}>
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
                      const filteredEvents = getFilteredEvents()
                      const dayEvents = filteredEvents.filter((event) => {
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
                                ) &&
                                  dayEvents.length > 0 && (
                                    <div className="w-2 h-2 rounded-full bg-blue-500" title="Scheduled events" />
                                  )}
                              </div>
                            )}
                          </div>

                          {/* Events for this day */}
                          {isCurrentMonth && (
                            <div className="space-y-1">
                              {dayEvents.slice(0, 3).map((event) => {
                                const instructor = getInstructor(event.instructor)
                                return (
                                  <div
                                    key={event.id}
                                    className="text-xs p-1.5 rounded bg-blue-100 text-blue-800 truncate hover:bg-blue-200 transition-colors"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleEventClick(event)
                                    }}
                                  >
                                    <div className="font-medium truncate">{event.title}</div>
                                    <div className="text-blue-600 truncate">
                                      {timeSlots[event.startHour]} • {instructor?.name}
                                    </div>
                                  </div>
                                )
                              })}
                              {dayEvents.length > 3 && (
                                <div className="text-xs text-gray-500 text-center py-1">
                                  +{dayEvents.length - 3} more
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Calendar Grid - Week View - Hidden on mobile */}
        {selectedView === "week" && (
          <div className="hidden md:block">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                {/* Week Header */}
                <div className="grid grid-cols-8 border-b bg-gray-50">
                  <div className="p-4 border-r">
                    <span className="text-sm font-medium text-gray-500">Time</span>
                  </div>
                  {days.map((day, index) => (
                    <div key={day} className="p-4 border-r last:border-r-0 text-center">
                      <div className="text-sm font-medium text-gray-900">{shortDays[index]}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(Date.now() + (index + currentWeekOffset * 7) * 24 * 60 * 60 * 1000).getDate()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Time Grid */}
                <div className="grid grid-cols-8 divide-x">
                  {/* Time Labels Column */}
                  <div className="divide-y">
                    {timeSlots.map((time, index) => (
                      <div key={time} className="h-20 flex items-center justify-end pr-4 text-sm text-gray-500">
                        {time}
                      </div>
                    ))}
                  </div>

                  {/* Days Columns */}
                  {days.map((day, dayIndex) => (
                    <div key={day} className="divide-y">
                      {timeSlots.map((time, hourIndex) => renderTimeSlot(dayIndex, hourIndex))}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* List View - Always visible on mobile, optional on desktop */}
        {selectedView === "list" && (
          <div className="space-y-6">
            {Object.keys(eventsByDate).length > 0 ? (
              Object.entries(eventsByDate).map(([dayIndex, dayEvents]) => (
                <div key={dayIndex}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {getDateLabel(Number.parseInt(dayIndex))}
                  </h3>
                  <div className="space-y-3">
                    {(dayEvents as any[]).map((event) => {
                      const instructor = getInstructor(event.instructor)
                      const template = templates.find((t) => t.id === event.templateId)

                      return (
                        <Card
                          key={event.id}
                          className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.01]"
                          onClick={() => handleEventClick(event)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              {/* Event Image */}
                              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                                <img
                                  src={template?.image || "/placeholder.svg?height=64&width=64"}
                                  alt={event.titleEn}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              {/* Event Details */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h4 className="text-base font-semibold text-gray-900 mb-1">{event.title}</h4>
                                    <p className="text-sm text-gray-600">{event.titleEn}</p>
                                  </div>
                                  {event.status === "Live" && (
                                    <Badge className="bg-blue-500 text-white animate-pulse">Live</Badge>
                                  )}
                                </div>

                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{timeSlots[event.startHour]}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Users className="h-4 w-4" />
                                    <span>
                                      {event.participants.current}/{event.participants.max}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                      <AvatarImage src={instructor?.avatar || "/placeholder.svg"} />
                                      <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                                        {instructor?.initials}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span>{instructor?.name}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No events scheduled</h3>
                <p className="text-gray-600 mb-6">Get started by scheduling your first event</p>
                <div className="space-y-4">
                  {next7Days.map((dayIndex) => (
                    <div key={dayIndex} className="text-left">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">{getDateLabel(dayIndex)}</h4>
                      <div className="text-sm text-gray-500 pl-4">No events scheduled</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Schedule Event Modal */}
      <Dialog open={isScheduleModalOpen} onOpenChange={setIsScheduleModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule New Event</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {selectedSlot && (
              <>
                {/* Time Slot Info */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-blue-900 mb-1">Selected Time Slot</div>
                  <div className="text-blue-700">
                    {days[selectedSlot.day]} at {timeSlots[selectedSlot.hour]}
                  </div>
                  <div className="text-xs text-blue-600 mt-1">Up to {selectedSlot.availableHours} hours available</div>
                </div>

                {/* Template Selection */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Select Template</label>
                  <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a template..." />
                    </SelectTrigger>
                    <SelectContent>
                      {getFilteredTemplates(
                        selectedSlot.availableHours,
                        getSlotData(selectedSlot.day, selectedSlot.hour).instructors || [],
                      ).map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          <div className="flex items-center gap-3">
                            <img
                              src={template.image || "/placeholder.svg"}
                              alt={template.englishTitle}
                              className="w-8 h-8 rounded object-cover"
                            />
                            <div>
                              <div className="font-medium">{template.japaneseTitle}</div>
                              <div className="text-xs text-gray-500">
                                {template.englishTitle} • {template.duration}h • {template.difficulty}
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Instructor Selection */}
                {selectedTemplate && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Select Instructor</label>
                    <Select value={selectedInstructorModal} onValueChange={setSelectedInstructorModal}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose an instructor..." />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableInstructorsForTemplate(
                          templates.find((t) => t.id === selectedTemplate)!,
                          getSlotData(selectedSlot.day, selectedSlot.hour).instructors || [],
                        ).map((instructor) => (
                          <SelectItem key={instructor.id} value={instructor.id}>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={instructor.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                                  {instructor.initials}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{instructor.name}</div>
                                <div className="text-xs text-gray-500 capitalize">
                                  {instructor.specialty} specialist
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Duration Display */}
                {selectedTemplate && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Duration</label>
                    <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700">{selectedDuration} hours</div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsScheduleModalOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button
                    onClick={handleScheduleEvent}
                    disabled={!selectedTemplate || !selectedInstructorModal}
                    className="flex-1"
                  >
                    Schedule Event
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Event Details Modal */}
      <EventDetailsModal
        event={selectedEventDetail}
        isOpen={isEventDetailModalOpen}
        onClose={() => setIsEventDetailModalOpen(false)}
      />

      {/* Confirmation Dialog for Accepting Suggestions */}
      <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Schedule Suggested Sessions?</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingSuggestion && (
                <div className="space-y-3">
                  <p>
                    This will schedule <strong>{pendingSuggestion.suggestion.suggestedDates.length} sessions</strong> of{" "}
                    <strong>{pendingSuggestion.suggestion.title}</strong>:
                  </p>
                  <div className="bg-gray-50 rounded p-3 text-sm">
                    {pendingSuggestion.suggestion.suggestedDates.map((date, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{date.date}</span>
                        <span>{date.time}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    Instructor: <strong>{pendingSuggestion.suggestion.instructor}</strong>
                  </p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmAcceptSuggestion}>Schedule Sessions</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default function SchedulePage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <SiteHeader />
          <motion.main {...pageTransition} className="flex-1 overflow-auto">
            <ScheduleContent />
          </motion.main>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}

"use client"

import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Plus, Download, Upload, Users, MoreHorizontal, Check, Mail } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import {
  Calendar,
  Clock,
  CalendarClock,
  Users2,
  Briefcase,
  CheckCircle2,
  CalendarDays,
  SearchIcon,
  DownloadIcon,
} from "lucide-react"
import ReactConfetti from "react-confetti"

import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.2 },
}

const instructorsData = [
  {
    id: 1,
    name: { japanese: "キャシー・トンプソン", english: "Cathy Thompson" },
    photo: "/images/cathy-avatar.png",
    artwork: "/placeholder.svg?height=240&width=320",
    artStyle: "Leadership",
    role: "CEO & Founder",
    roleBadgeColor: "bg-yellow-100 text-yellow-800",
    languages: ["English", "Japanese"],
    specialties: ["Business strategy", "Team leadership"],
    locations: ["All Locations"],
    availability: "available",
    bio: "Passionate visionary who founded Artbar Tokyo to make art accessible to everyone.",
    phone: "+81 90-1234-5678",
    hasClassesToday: false,
    topClasses: [
      { name: "Executive Leadership", bookingRate: 92, selloutFrequency: "7/10 times" },
      { name: "Business Strategy", bookingRate: 88, selloutFrequency: "6/10 times" },
    ],
    bookingPerformance: [90, 85, 92, 88, 95, 80, 87],
    availabilityStatus: "Approved for December",
  },
  {
    id: 2,
    name: { japanese: "ナオミ", english: "Naomi" },
    photo: "/placeholder.svg?height=60&width=60",
    artwork: "/placeholder.svg?height=240&width=320",
    artStyle: "Abstract",
    role: "Marketing Director",
    roleBadgeColor: "bg-blue-100 text-blue-800",
    languages: ["English", "Japanese"],
    specialties: ["Abstract art", "Marketing strategy"],
    locations: ["Daikanyama", "Ginza"],
    availability: "available",
    bio: "Creative marketing professional with an eye for trends and abstract expression.",
    phone: "+81 90-2345-6789",
    hasClassesToday: true,
    topClasses: [
      { name: "Abstract Painting Basics", bookingRate: 95, selloutFrequency: "9/10 times" },
      { name: "Wine & Paint Fridays", bookingRate: 100, selloutFrequency: "Sold out 8/10 times" },
      { name: "Color Theory Workshop", bookingRate: 85, selloutFrequency: "5/10 times" },
    ],
    bookingPerformance: [85, 92, 78, 95, 88, 76, 90],
    availabilityStatus: "Pending for January",
    todaysClasses: [
      {
        time: "2:30 PM - 4:00 PM",
        title: "Abstract Painting Basics",
        location: "Ginza Studio",
        students: [
          {
            name: "Yuki Tanaka",
            checked: false,
            paymentStatus: "Paid",
            groupSize: 1,
            notes: "",
            ticketNumber: "123456",
            ticketVerified: false,
          },
          {
            name: "Carly Doe",
            checked: false,
            paymentStatus: "Paid",
            groupSize: 5,
            notes: "Birthday celebration",
            ticketNumber: "234567",
            ticketVerified: false,
          },
          {
            name: "Hiroshi Yamamoto",
            checked: false,
            paymentStatus: "Pending",
            groupSize: 2,
            notes: "Vegetarian snacks only",
            ticketNumber: "345678",
            ticketVerified: false,
          },
          {
            name: "Emma Wilson",
            checked: false,
            paymentStatus: "Paid",
            groupSize: 1,
            notes: "VIP member",
            ticketNumber: "456789",
            ticketVerified: false,
          },
        ],
      },
      {
        time: "5:00 PM - 6:30 PM",
        title: "Color Theory Workshop",
        location: "Daikanyama Studio",
        students: [
          {
            name: "Akira Sato",
            checked: false,
            paymentStatus: "Paid",
            groupSize: 1,
            notes: "",
            ticketNumber: "890123",
            ticketVerified: false,
          },
          {
            name: "Lisa Chen",
            checked: false,
            groupSize: 2,
            paymentStatus: "Paid",
            notes: "",
            ticketNumber: "901234",
            ticketVerified: false,
          },
          {
            name: "David Kim",
            checked: false,
            paymentStatus: "Pending",
            groupSize: 1,
            notes: "Allergic to nuts",
            ticketNumber: "012345",
            ticketVerified: false,
          },
          {
            name: "Mei Wong",
            checked: false,
            paymentStatus: "Paid",
            groupSize: 1,
            notes: "VIP member",
            ticketNumber: "123450",
            ticketVerified: false,
          },
          {
            name: "Takashi Mori",
            checked: false,
            paymentStatus: "Paid",
            groupSize: 3,
            notes: "Needs accessible seating",
            ticketNumber: "567890",
            ticketVerified: false,
          },
          {
            name: "Sarah Johnson",
            checked: false,
            paymentStatus: "Paid",
            groupSize: 1,
            notes: "",
            ticketNumber: "678901",
            ticketVerified: false,
          },
          {
            name: "Ken Watanabe",
            checked: false,
            paymentStatus: "Paid",
            groupSize: 2,
            notes: "First-time visitors",
            ticketNumber: "789012",
            ticketVerified: false,
          },
          {
            name: "Yumi Nakamura",
            checked: false,
            paymentStatus: "Paid",
            groupSize: 1,
            notes: "",
            ticketNumber: "234567",
            ticketVerified: false,
          },
          {
            name: "John Smith",
            checked: false,
            paymentStatus: "Paid",
            groupSize: 2,
            notes: "Anniversary celebration",
            ticketNumber: "345678",
            ticketVerified: false,
          },
          {
            name: "Hana Suzuki",
            checked: false,
            paymentStatus: "Pending",
            groupSize: 1,
            notes: "",
            ticketNumber: "456789",
            ticketVerified: false,
          },
          {
            name: "Michael Brown",
            checked: false,
            paymentStatus: "Paid",
            groupSize: 1,
            notes: "",
            ticketNumber: "567890",
            ticketVerified: false,
          },
          {
            name: "Emi Tanaka",
            checked: false,
            paymentStatus: "Paid",
            groupSize: 1,
            notes: "First timer",
            ticketNumber: "678901",
            ticketVerified: false,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: { japanese: "ルーシー", english: "Luci" },
    photo: "/placeholder.svg?height=60&width=60",
    artwork: "/placeholder.svg?height=240&width=320",
    artStyle: "Fantasy",
    role: "Senior Instructor",
    roleBadgeColor: "bg-green-100 text-green-800",
    languages: ["English", "Japanese", "Chinese"],
    specialties: ["Fantasy style", "Character design"],
    locations: ["Cat Street", "Yokohama"],
    availability: "available",
    bio: "Brings soft, dreamy fantasy style that transports you to colorful worlds.",
    phone: "+81 90-3456-7890",
    hasClassesToday: true,
    topClasses: [
      { name: "Fantasy Landscapes", bookingRate: 90, selloutFrequency: "8/10 times" },
      { name: "Character Design", bookingRate: 85, selloutFrequency: "6/10 times" },
    ],
    bookingPerformance: [80, 85, 90, 88, 92, 78, 85],
    availabilityStatus: "Approved for December",
  },
  {
    id: 4,
    name: { japanese: "モモ", english: "Momo" },
    photo: "/placeholder.svg?height=60&width=60",
    artwork: "/placeholder.svg?height=240&width=320",
    artStyle: "Abstract",
    role: "Art Instructor",
    roleBadgeColor: "bg-purple-100 text-purple-800",
    languages: ["English", "Japanese"],
    specialties: ["Dot technique", "Color theory"],
    locations: ["Daikanyama", "Ginza"],
    availability: "limited",
    bio: "Musashino Art University graduate with expertise in mesmerizing dot techniques.",
    phone: "+81 90-4567-8901",
  },
  {
    id: 5,
    name: { japanese: "ナナコ", english: "Nanako" },
    photo: "/placeholder.svg?height=60&width=60",
    artwork: "/placeholder.svg?height=240&width=320",
    artStyle: "Traditional",
    role: "Traditional Art Instructor",
    roleBadgeColor: "bg-green-100 text-green-800",
    languages: ["Japanese", "English"],
    specialties: ["Japanese painting", "Calligraphy"],
    locations: ["Ginza", "Daikanyama"],
    availability: "available",
    bio: "Specializes in calming Japanese painting techniques with delicate color work.",
    phone: "+81 90-5678-9012",
  },
  {
    id: 6,
    name: { japanese: "アイカ", english: "Aika" },
    photo: "/placeholder.svg?height=60&width=60",
    artwork: "/placeholder.svg?height=240&width=320",
    artStyle: "Natural",
    role: "Oil Painting Specialist",
    roleBadgeColor: "bg-purple-100 text-purple-800",
    languages: ["Japanese", "English"],
    specialties: ["Oil painting", "Portrait painting"],
    locations: ["Cat Street", "Yokohama"],
    availability: "available",
    bio: "Gentle soul who creates soft, natural elements that bring peace and tranquility.",
    phone: "+81 90-6789-0123",
  },
  {
    id: 7,
    name: { japanese: "キヨエ", english: "Kiyoe" },
    photo: "/placeholder.svg?height=60&width=60",
    artwork: "/placeholder.svg?height=240&width=320",
    artStyle: "Ceramics",
    role: "Pottery Instructor",
    roleBadgeColor: "bg-purple-100 text-purple-800",
    languages: ["English", "Japanese"],
    specialties: ["Pottery", "Kids classes"],
    locations: ["All Locations"],
    availability: "available",
    bio: "Calming soul who finds peace in working with clay and sharing that tranquility.",
    phone: "+81 90-7890-1234",
  },
  {
    id: 8,
    name: { japanese: "ミチ・キム", english: "Michi Kim" },
    photo: "/placeholder.svg?height=60&width=60",
    artwork: "/placeholder.svg?height=240&width=320",
    artStyle: "Kids Art",
    role: "Kids Art Specialist",
    roleBadgeColor: "bg-purple-100 text-purple-800",
    languages: ["Korean", "English", "Japanese"],
    specialties: ["Kids art", "Art therapy"],
    locations: ["Daikanyama", "Cat Street"],
    availability: "available",
    bio: "Energetic and playful instructor who brings joy and laughter to every class.",
    phone: "+81 90-8901-2345",
  },
  {
    id: 9,
    name: { japanese: "ユウキ", english: "Yuki" },
    photo: "/placeholder.svg?height=60&width=60",
    artwork: "/placeholder.svg?height=240&width=320",
    artStyle: "Watercolor",
    role: "Watercolor Instructor",
    roleBadgeColor: "bg-purple-100 text-purple-800",
    languages: ["Japanese", "English"],
    specialties: ["Watercolor", "Botanical art"],
    locations: ["Ginza", "Yokohama"],
    availability: "unavailable",
    bio: "Delicate watercolor specialist focusing on botanical and landscape subjects.",
    phone: "+81 90-9012-3456",
  },
  {
    id: 10,
    name: { japanese: "タケシ", english: "Takeshi" },
    photo: "/placeholder.svg?height=60&width=60",
    artwork: "/placeholder.svg?height=240&width=320",
    artStyle: "Street Art",
    role: "Street Art Instructor",
    roleBadgeColor: "bg-purple-100 text-purple-800",
    languages: ["Japanese", "English"],
    specialties: ["Street art", "Urban culture"],
    locations: ["Cat Street"],
    availability: "limited",
    bio: "Contemporary street artist bringing urban culture into the studio.",
    phone: "+81 90-0123-4567",
  },
]

const locations = ["All Locations", "Daikanyama", "Ginza", "Cat Street", "Yokohama"]
const availabilityOptions = ["All Status", "Available", "Limited", "Unavailable"]

function InstructorsContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [selectedAvailability, setSelectedAvailability] = useState("All Status")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedInstructor, setSelectedInstructor] = useState<(typeof instructorsData)[0] | null>(null)
  const [showCheckInDialog, setShowCheckInDialog] = useState(false)
  const [showAvailabilityDialog, setShowAvailabilityDialog] = useState(false)
  const [availabilityMonth, setAvailabilityMonth] = useState<string>("January")
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<Set<string>>(new Set())
  const [isManagerView, setIsManagerView] = useState(false) // Toggle between instructor/manager view
  const [checkInSearchTerm, setCheckInSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState<number>(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  // Update window size for confetti
  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    updateWindowSize()
    window.addEventListener("resize", updateWindowSize)

    return () => window.removeEventListener("resize", updateWindowSize)
  }, [])

  // Handle confetti display
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [showConfetti])

  const [bookingPerformanceData, setBookingPerformanceData] = useState({
    monthlyTrends: [60, 75, 80, 90, 85, 95],
    peakTimes: ["10 AM - 12 PM", "2 PM - 4 PM"],
    classTypePerformance: [
      { type: "Abstract", bookingRate: 88 },
      { type: "Watercolor", bookingRate: 76 },
      { type: "Oil Painting", bookingRate: 92 },
    ],
  })

  const filteredInstructors = useMemo(() => {
    return instructorsData.filter((instructor) => {
      const matchesSearch =
        searchTerm === "" ||
        instructor.name.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
        instructor.name.japanese.includes(searchTerm) ||
        instructor.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesLocation =
        selectedLocation === "All Locations" ||
        instructor.locations.includes(selectedLocation) ||
        instructor.locations.includes("All Locations")

      const matchesAvailability =
        selectedAvailability === "All Status" || instructor.availability === selectedAvailability.toLowerCase()

      const matchesTab =
        activeTab === "all" ||
        (activeTab === "active" && instructor.availability !== "unavailable") ||
        (activeTab === "inactive" && instructor.availability === "unavailable") ||
        (activeTab === "new" && instructor.id > 8)

      return matchesSearch && matchesLocation && matchesAvailability && matchesTab
    })
  }, [searchTerm, selectedLocation, selectedAvailability, activeTab])

  const getAvailabilityBadgeColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-100 text-green-700"
      case "limited":
        return "bg-amber-100 text-amber-700"
      case "unavailable":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case "available":
        return "Available"
      case "limited":
        return "Limited"
      case "unavailable":
        return "Unavailable"
      default:
        return "Available"
    }
  }

  const getRoleBadgeColor = (role: string) => {
    if (role.includes("CEO") || role.includes("Director")) {
      return "bg-yellow-100 text-yellow-700"
    } else if (role.includes("Senior")) {
      return "bg-blue-100 text-blue-700"
    } else {
      return "bg-purple-100 text-purple-700"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    return status === "Paid" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
  }

  const handleCheckInClick = () => {
    if (selectedInstructor?.hasClassesToday) {
      setShowCheckInDialog(true)
    }
  }

  const handleAvailabilityClick = () => {
    setIsManagerView(false) // Default to instructor view
    setSelectedTimeSlots(new Set()) // Reset selection
    setShowAvailabilityDialog(true)
  }

  const handleCheckInStudent = (classIndex: number, studentIndex: number) => {
    if (selectedInstructor && selectedInstructor.todaysClasses) {
      const updatedInstructor = { ...selectedInstructor }
      updatedInstructor.todaysClasses[0].students[studentIndex].checked =
        !updatedInstructor.todaysClasses[0].students[studentIndex].checked

      // Check if all students are now checked in (use first class only)
      const allCheckedIn = updatedInstructor.todaysClasses[0].students.every((student) => student.checked)
      if (allCheckedIn && updatedInstructor.todaysClasses[0].students[studentIndex].checked) {
        setShowConfetti(true)
      }

      setSelectedInstructor(updatedInstructor)
    }
  }

  const handleVerifyTicket = (classIndex: number, studentIndex: number) => {
    if (selectedInstructor && selectedInstructor.todaysClasses) {
      const updatedInstructor = { ...selectedInstructor }
      updatedInstructor.todaysClasses[classIndex].students[studentIndex].ticketVerified = true
      setSelectedInstructor(updatedInstructor)
    }
  }

  const handleVerifyAllTickets = (classIndex: number) => {
    if (selectedInstructor && selectedInstructor.todaysClasses) {
      const updatedInstructor = { ...selectedInstructor }
      updatedInstructor.todaysClasses[0].students.forEach((student) => (student.ticketVerified = true))
      setSelectedInstructor(updatedInstructor)
    }
  }

  const getTicketVerificationColor = (verified: boolean) => {
    return verified ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
  }

  const filteredStudents =
    selectedInstructor?.todaysClasses?.[0]?.students.filter((student) =>
      student.name.toLowerCase().includes(checkInSearchTerm.toLowerCase()),
    ) || []

  const checkedInCount = selectedInstructor?.todaysClasses?.[0]?.students.filter((s) => s.checked).length || 0
  const totalStudents = selectedInstructor?.todaysClasses?.[0]?.students.length || 0
  const checkedInPercentage = totalStudents > 0 ? (checkedInCount / totalStudents) * 100 : 0

  // Calculate check-in modal height based on student count
  const getCheckInModalHeight = () => {
    if (!filteredStudents.length) return "40vh"
    if (filteredStudents.length <= 4) return "40vh"
    if (filteredStudents.length <= 8) return "55vh"
    return "75vh"
  }

  // Generate calendar days for availability
  const generateCalendarDays = () => {
    const days = []
    const daysInMonth = 31 // Simplified for January

    for (let i = 1; i <= daysInMonth; i++) {
      const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i % 7]
      days.push({
        day: i,
        dayOfWeek,
        timeBlocks: [
          { time: "9 AM - 12 PM", id: `${i}-morning` },
          { time: "12 PM - 3 PM", id: `${i}-afternoon` },
          { time: "3 PM - 6 PM", id: `${i}-evening` },
          { time: "6 PM - 9 PM", id: `${i}-night` },
        ],
      })
    }

    return days
  }

  const handleTimeBlockClick = (blockId: string) => {
    if (isManagerView) return // Manager view is read-only

    setSelectedTimeSlots((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(blockId)) {
        newSet.delete(blockId)
      } else {
        newSet.add(blockId)
      }
      return newSet
    })
  }

  const getTimeBlockStyle = (blockId: string) => {
    const isSelected = selectedTimeSlots.has(blockId)

    if (isManagerView) {
      // Manager view - show instructor's submitted availability
      const isAvailable = Math.random() > 0.4 // Simulated instructor selection
      return isAvailable
        ? "bg-green-100 text-green-700 border-green-200 cursor-default"
        : "bg-gray-100 text-gray-500 border-gray-200 cursor-default"
    }

    // Instructor view - interactive selection
    return isSelected
      ? "bg-green-500 text-white border-green-600 cursor-pointer hover:bg-green-600 transition-all duration-150 transform active:scale-95"
      : "bg-gray-100 text-gray-700 border-gray-300 cursor-pointer hover:bg-gray-200 transition-all duration-150 transform active:scale-95"
  }

  const calendarDays = useMemo(() => generateCalendarDays(), [])

  const handleQuickSelect = (type: string) => {
    if (isManagerView) return

    const newSet = new Set<string>()

    calendarDays.forEach((day) => {
      day.timeBlocks.forEach((block) => {
        switch (type) {
          case "weekends":
            if (day.dayOfWeek === "Sat" || day.dayOfWeek === "Sun") {
              newSet.add(block.id)
            }
            break
          case "evenings":
            if (block.time.includes("6 PM") || block.time.includes("3 PM")) {
              newSet.add(block.id)
            }
            break
          case "all":
            newSet.add(block.id)
            break
          case "clear":
            // newSet remains empty
            break
        }
      })
    })

    setSelectedTimeSlots(newSet)
  }

  const selectedCount = selectedTimeSlots.size
  const totalSlots = calendarDays.length * 4

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
      {/* Confetti overlay */}
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.2}
          style={{ position: "fixed", top: 0, left: 0, zIndex: 1000 }}
        />
      )}

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search instructors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {availabilityOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row ml-auto">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Instructor
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Instructors</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="new">New Applicants</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredInstructors.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No instructors found</h3>
              <p className="text-muted-foreground mb-4">
                No instructors match your current search and filter criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedLocation("All Locations")
                  setSelectedAvailability("All Status")
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {filteredInstructors.map((instructor) => (
                <motion.div
                  key={instructor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="group overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col h-full">
                    {/* Image Section */}
                    <div className="relative overflow-hidden">
                      <AspectRatio ratio={4 / 3} className="w-full">
                        <div className="bg-gray-100 w-full h-full group-hover:scale-105 transition-transform duration-300">
                          <img
                            src={instructor.artwork || "/placeholder.svg"}
                            alt={`Artwork by ${instructor.name.english}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </AspectRatio>
                      <Badge
                        className={`absolute top-2 right-2 text-xs px-2 py-1 ${getAvailabilityBadgeColor(
                          instructor.availability,
                        )}`}
                      >
                        {getAvailabilityText(instructor.availability)}
                      </Badge>
                    </div>

                    {/* Content Section */}
                    <CardContent className="flex-1 p-5 flex flex-col">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-10 w-10 border-2 border-background">
                          <AvatarImage src={instructor.photo || "/placeholder.svg"} alt={instructor.name.english} />
                          <AvatarFallback>
                            {instructor.name.english
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <h3 className="font-semibold text-gray-900 text-base leading-tight line-clamp-1">
                            {instructor.name.japanese}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-1">{instructor.name.english}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <Badge
                          variant="outline"
                          className={`text-xs px-2 py-0.5 border ${getRoleBadgeColor(instructor.role)}`}
                        >
                          {instructor.role}
                        </Badge>
                        {instructor.languages.slice(0, 1).map((language) => (
                          <Badge
                            key={language}
                            variant="outline"
                            className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 border-blue-200"
                          >
                            {language}
                          </Badge>
                        ))}
                      </div>

                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{instructor.bio}</p>

                      <div className="text-xs text-gray-500 mt-auto">
                        {instructor.locations
                          .filter((loc) => loc !== "All Locations")
                          .slice(0, 2)
                          .join(", ")}
                      </div>
                    </CardContent>

                    {/* Actions Section - Fixed at bottom */}
                    <div className="p-5 pt-0 border-t border-gray-100 bg-gray-50">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="default"
                          className="flex-1 text-xs"
                          onClick={() => setSelectedInstructor(instructor)}
                        >
                          View Details
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline" className="px-2">
                              <MoreHorizontal className="h-3.5 w-3.5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="text-sm">Schedule</DropdownMenuItem>
                            <DropdownMenuItem className="text-sm">Edit Profile</DropdownMenuItem>
                            <DropdownMenuItem className="text-sm text-red-600">Deactivate</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Instructor Detail Modal */}
      <Dialog open={selectedInstructor !== null} onOpenChange={(open) => !open && setSelectedInstructor(null)}>
        {selectedInstructor && (
          <DialogContent
            className="max-w-4xl max-h-[95vh] overflow-y-auto"
            style={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              borderRadius: "12px",
            }}
          >
            <DialogHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-background">
                  <AvatarImage
                    src={selectedInstructor.photo || "/placeholder.svg"}
                    alt={selectedInstructor.name.english}
                  />
                  <AvatarFallback>
                    {selectedInstructor.name.english
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <DialogTitle className="text-xl">{selectedInstructor.name.english}</DialogTitle>
                  <DialogDescription className="text-sm">
                    {selectedInstructor.role} • {selectedInstructor.languages.join(", ")}
                  </DialogDescription>
                </div>
                <Badge className={`ml-auto ${getAvailabilityBadgeColor(selectedInstructor.availability)}`}>
                  {getAvailabilityText(selectedInstructor.availability)}
                </Badge>
              </div>
            </DialogHeader>

            {/* Dashboard Content */}
            <div className="mt-6 space-y-6">
              {/* Today's Status */}
              <div>
                <h3 className="text-lg font-medium mb-3">Today's Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-blue-500 mr-2" />
                        <h4 className="font-medium">Next Class</h4>
                      </div>
                      {selectedInstructor.hasClassesToday ? (
                        <>
                          <p className="text-2xl font-bold mt-2">2:30 PM</p>
                          <p className="text-sm text-muted-foreground">Abstract Painting - Ginza</p>
                        </>
                      ) : (
                        <>
                          <p className="text-lg font-medium mt-2">No classes today</p>
                          <p className="text-sm text-muted-foreground">Next class: Tomorrow, 10:00 AM</p>
                        </>
                      )}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center">
                        <Users2 className="h-5 w-5 text-green-500 mr-2" />
                        <h4 className="font-medium">Students Today</h4>
                      </div>
                      {selectedInstructor.hasClassesToday ? (
                        <>
                          <p className="text-2xl font-bold mt-2">
                            {selectedInstructor.todaysClasses?.reduce((acc, cls) => acc + cls.students.length, 0) || 0}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {selectedInstructor.todaysClasses?.length || 0} classes scheduled
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-lg font-medium mt-2">0</p>
                          <p className="text-sm text-muted-foreground">No classes scheduled</p>
                        </>
                      )}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center">
                        <Briefcase className="h-5 w-5 text-purple-500 mr-2" />
                        <h4 className="font-medium">Hours Today</h4>
                      </div>
                      {selectedInstructor.hasClassesToday ? (
                        <>
                          <p className="text-2xl font-bold mt-2">4.5</p>
                          <p className="text-sm text-muted-foreground">9:00 AM - 6:00 PM</p>
                        </>
                      ) : (
                        <>
                          <p className="text-lg font-medium mt-2">0</p>
                          <p className="text-sm text-muted-foreground">Off today</p>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Schedule */}
              <div>
                <h3 className="text-lg font-medium mb-3">Upcoming Schedule</h3>
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {selectedInstructor.hasClassesToday ? (
                        [
                          {
                            time: "2:30 PM - 4:00 PM",
                            title: "Abstract Painting Basics",
                            location: "Ginza Studio",
                            students: 8,
                            status: "Confirmed",
                          },
                          {
                            time: "5:00 PM - 6:30 PM",
                            title: "Color Theory Workshop",
                            location: "Daikanyama Studio",
                            students: 4,
                            status: "Confirmed",
                          },
                          {
                            time: "Tomorrow, 10:00 AM",
                            title: "Marketing Team Meeting",
                            location: "Online",
                            students: 0,
                            status: "Internal",
                          },
                        ].map((event, i) => (
                          <div key={i} className="flex items-center p-2 hover:bg-muted rounded-md">
                            <div className="mr-4 flex-shrink-0">
                              <CalendarClock className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm">{event.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {event.time} • {event.location}
                              </p>
                            </div>
                            <Badge variant={event.status === "Internal" ? "outline" : "default"} className="ml-2">
                              {event.status === "Internal" ? "Internal" : `${event.students} Students`}
                            </Badge>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center justify-center py-6">
                          <div className="text-center">
                            <Calendar className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                            <p className="font-medium">No classes scheduled today</p>
                            <p className="text-sm text-muted-foreground mt-1">Next class is tomorrow at 10:00 AM</p>
                            <Button variant="outline" className="mt-4" size="sm">
                              Request Classes
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                    <Button variant="outline" className="w-full mt-4" size="sm">
                      View Full Schedule
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-lg font-medium mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    className="h-auto flex-col py-4 px-2"
                    onClick={() => window.open("/schedule", "_blank")}
                  >
                    <Calendar className="h-5 w-5 mb-1" />
                    <span className="text-xs">Schedule Class</span>
                  </Button>
                  <Button variant="outline" className="h-auto flex-col py-4 px-2" onClick={handleAvailabilityClick}>
                    <CalendarDays className="h-5 w-5 mb-1" />
                    <span className="text-xs">Availability</span>
                  </Button>
                  <Button
                    variant={selectedInstructor.hasClassesToday ? "default" : "outline"}
                    className="h-auto flex-col py-4 px-2"
                    onClick={handleCheckInClick}
                    disabled={!selectedInstructor.hasClassesToday}
                  >
                    <CheckCircle2 className="h-5 w-5 mb-1" />
                    <span className="text-xs">Check In</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto flex-col py-4 px-2"
                    onClick={() =>
                      window.open(
                        `mailto:${selectedInstructor.name.english.toLowerCase().replace(" ", "")}@artbar.co.jp`,
                      )
                    }
                  >
                    <Mail className="h-5 w-5 mb-1" />
                    <span className="text-xs">Email</span>
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Check-In Dialog */}
      <Dialog open={showCheckInDialog} onOpenChange={setShowCheckInDialog}>
        {selectedInstructor && selectedInstructor.todaysClasses && (
          <DialogContent
            className="max-w-4xl"
            style={{
              maxHeight: "85vh",
              height: `${Math.min(85, Math.max(40, 25 + filteredStudents.length * 5.5 + 15))}vh`,
              boxShadow: "0 22px 45px -10px rgba(0, 0, 0, 0.22)",
              borderRadius: "13px",
              backdropFilter: "blur(5px)",
            }}
          >
            <DialogHeader>
              <DialogTitle>Class Check-In: {selectedInstructor.todaysClasses[0].title}</DialogTitle>
              <DialogDescription>
                {selectedInstructor.todaysClasses[0].time} • {selectedInstructor.todaysClasses[0].location}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 flex-1 flex flex-col">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>Check-in progress</span>
                  <span className="text-green-600">
                    {checkedInCount} of {totalStudents} checked in
                  </span>
                </div>
                <Progress value={checkedInPercentage} className="h-2" />
              </div>

              {/* Search */}
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search attendees..."
                  value={checkInSearchTerm}
                  onChange={(e) => setCheckInSearchTerm(e.target.value)}
                  className="pl-10 h-10 text-sm rounded-lg"
                  style={{
                    fontSize: "16px", // Prevents zoom on iOS
                  }}
                />
              </div>

              {/* Attendee List */}
              <Card className="flex-1 overflow-hidden">
                <ScrollArea className="h-full" style={{ scrollBehavior: "smooth" }}>
                  <div className="divide-y divide-gray-100">
                    {filteredStudents.map((student, i) => (
                      <div
                        key={i}
                        className={`
                relative min-h-[64px] p-3 cursor-pointer 
                transition-all duration-200 ease-out
                active:scale-[0.98] active:bg-gray-100
                hover:bg-gray-50
                ${student.checked ? "bg-green-50 border-l-4 border-l-green-500" : "bg-white hover:bg-gray-50"}
              `}
                        onClick={() => handleCheckInStudent(0, i)}
                        style={{
                          touchAction: "manipulation",
                          WebkitTapHighlightColor: "transparent",
                        }}
                      >
                        <div className="flex items-center justify-between">
                          {/* Left side: Name + Guest count */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-bold text-base text-gray-900 truncate">{student.name}</p>
                              {student.groupSize > 1 && (
                                <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-blue-500 rounded-full">
                                  +{student.groupSize - 1}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">#{student.ticketNumber}</p>
                          </div>

                          {/* Right side: Check status */}
                          <div className="flex items-center gap-3">
                            {student.checked ? (
                              <>
                                <Check className="h-5 w-5 text-green-600" />
                                <span className="text-sm font-semibold text-green-700">Checked</span>
                              </>
                            ) : (
                              <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-2 rounded-lg">
                                Tap to Check
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Hidden details - only show if there are notes or payment issues */}
                        {(student.notes || student.paymentStatus === "Pending") && (
                          <div className="mt-2 pt-2 border-t border-gray-100">
                            {student.paymentStatus === "Pending" && (
                              <div className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-md inline-block mr-2">
                                Payment Pending
                              </div>
                            )}
                            {student.notes && (
                              <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-md inline-block">
                                {student.notes}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Empty State */}
                    {filteredStudents.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                        <Users className="h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No attendees found</h3>
                        <p className="text-gray-500">
                          {checkInSearchTerm ? "Try adjusting your search" : "No students registered for this class"}
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </Card>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row justify-between gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCheckInDialog(false)}
                  className="min-h-[44px] sm:min-h-auto order-2 sm:order-1"
                >
                  Close
                </Button>
                <div className="flex gap-2 order-1 sm:order-2">
                  <Button variant="outline" size="sm" className="flex-1 sm:flex-none min-h-[44px] sm:min-h-auto">
                    <DownloadIcon className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                  <Button size="sm" className="flex-1 sm:flex-none min-h-[44px] sm:min-h-auto">
                    Save Data
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Availability Dialog */}
      <Dialog open={showAvailabilityDialog} onOpenChange={setShowAvailabilityDialog}>
        <DialogContent
          className="max-w-4xl overflow-y-auto"
          style={{
            height: "85vh",
            boxShadow: "0 22px 45px -10px rgba(0, 0, 0, 0.22)",
            borderRadius: "13px",
            backdropFilter: "blur(5px)",
          }}
        >
          <DialogHeader>
            <div>
              <DialogTitle>{isManagerView ? "Review Availability" : "Set Your Availability"}</DialogTitle>
              <DialogDescription>
                {isManagerView
                  ? `Review ${selectedInstructor?.name.english}'s availability for ${availabilityMonth}`
                  : `Select your available time slots for ${availabilityMonth}`}
              </DialogDescription>
            </div>
            {selectedInstructor && (
              <Badge variant="outline" className="w-fit">
                Status: {selectedInstructor.availabilityStatus}
              </Badge>
            )}
          </DialogHeader>

          <div className="space-y-4 flex-1 flex flex-col">
            {/* Month Selector */}
            <Select value={availabilityMonth} onValueChange={setAvailabilityMonth}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {["January", "February", "March", "April"].map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Progress and Quick Actions - Instructor View Only */}
            {!isManagerView && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Selected time slots</span>
                  <span className="font-medium">
                    {selectedCount} of {totalSlots} slots
                  </span>
                </div>
                <Progress value={(selectedCount / totalSlots) * 100} className="h-2" />

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleQuickSelect("weekends")}>
                    Select Weekends
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleQuickSelect("evenings")}>
                    Select Evenings
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleQuickSelect("all")}>
                    Select All
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleQuickSelect("clear")}>
                    Clear All
                  </Button>
                </div>
              </div>
            )}

            {/* Legend */}
            <div className="flex items-center gap-4 text-sm p-3 bg-muted rounded-lg">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-green-500 mr-2"></div>
                <span>{isManagerView ? "Available (Instructor Selected)" : "Available"}</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-gray-300 mr-2"></div>
                <span>{isManagerView ? "Not Available" : "Not Available"}</span>
              </div>
            </div>

            {/* Calendar */}
            <Card className="flex-1 overflow-hidden">
              <ScrollArea className="h-full" style={{ scrollBehavior: "smooth" }}>
                <div className="space-y-4 p-4">
                  {calendarDays.map((day) => (
                    <div key={day.day} className="border-b pb-4 last:border-0">
                      <div className="font-medium mb-3 text-sm">
                        {day.dayOfWeek}, {availabilityMonth} {day.day}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {day.timeBlocks.map((block) => (
                          <div
                            key={block.id}
                            className={`
                              border rounded-lg p-3 text-sm font-medium text-center min-h-[44px] flex items-center justify-center
                              ${getTimeBlockStyle(block.id)}
                              ${!isManagerView ? "select-none" : ""}
                            `}
                            onClick={() => handleTimeBlockClick(block.id)}
                            style={{
                              WebkitTapHighlightColor: "transparent",
                              touchAction: "manipulation",
                            }}
                          >
                            {block.time}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-between pt-4 border-t">
              <Button variant="outline" onClick={() => setShowAvailabilityDialog(false)}>
                {isManagerView ? "Close" : "Cancel"}
              </Button>

              <div className="flex gap-2">
                {/* Move instructor view toggle here */}
                <Button variant="outline" size="sm" onClick={() => setIsManagerView(!isManagerView)}>
                  {isManagerView ? "Instructor View" : "Manager View"}
                </Button>

                {isManagerView ? (
                  <>
                    <Button variant="outline" className="text-red-600 hover:text-red-700">
                      Decline
                    </Button>
                    <Button variant="outline">Request Edit</Button>
                    <Button>Approve</Button>
                  </>
                ) : (
                  <Button disabled={selectedCount === 0}>
                    Submit for Approval
                    {selectedCount > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {selectedCount}
                      </Badge>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function InstructorsPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <AnimatePresence mode="wait">
            <motion.div key="instructors" {...pageTransition} className="flex-1">
              <InstructorsContent />
            </motion.div>
          </AnimatePresence>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}

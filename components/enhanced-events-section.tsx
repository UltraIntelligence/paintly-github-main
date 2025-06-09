"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PaintlyEventCard } from "./paintly-event-card"
import { CalendarIcon, SearchIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface Event {
  id: number
  title: string
  titleJp?: string
  subtitle: string
  participants: { current: number; capacity: number }
  date: string
  time: string
  location: string
  instructor: string
  status: "Live" | "Scheduled" | "Completed"
  actionText: string
  isPublished: boolean
}

interface EnhancedEventsSectionProps {
  onEventClick?: (event: any) => void
}

// Extended sample data with more events
const allEvents: Event[] = [
  {
    id: 1,
    title: "Picasso Self-Portrait",
    titleJp: "ピカソ自画像",
    subtitle: "Cubist portrait techniques",
    participants: { current: 4, capacity: 10 },
    date: "2025-06-05",
    time: "2:30-4:30 PM",
    location: "Artbar Daikanyama",
    instructor: "Naomi",
    status: "Scheduled",
    actionText: "View Details",
    isPublished: true,
  },
  {
    id: 2,
    title: "Abstract Painting Basics",
    titleJp: "抽象画基礎",
    subtitle: "Contemporary abstract methods",
    participants: { current: 11, capacity: 12 },
    date: "2025-06-05",
    time: "5:00-7:00 PM",
    location: "Artbar Cat Street",
    instructor: "Momo",
    status: "Scheduled",
    actionText: "View Details",
    isPublished: true,
  },
  {
    id: 3,
    title: "モネ睡蓮 Monet Water Lilies",
    titleJp: "モネの睡蓮ワークショップ",
    subtitle: "Impressionist watercolor techniques",
    participants: { current: 8, capacity: 12 },
    date: "2025-06-05",
    time: "6:00-8:00 PM",
    location: "Artbar Ginza",
    instructor: "Yuki Tanaka",
    status: "Scheduled",
    actionText: "View Details",
    isPublished: true,
  },
  {
    id: 4,
    title: "ゴッホ星月夜 Van Gogh Starry Night",
    titleJp: "ゴッホの星月夜",
    subtitle: "Post-impressionist oil painting",
    participants: { current: 15, capacity: 16 },
    date: "2025-06-05",
    time: "7:30-9:30 PM",
    location: "Artbar Shibuya",
    instructor: "Hiroshi Sato",
    status: "Live",
    actionText: "Join Now",
    isPublished: true,
  },
  {
    id: 5,
    title: "Ukiyo-e Printmaking",
    titleJp: "浮世絵版画",
    subtitle: "Traditional Japanese woodblock printing",
    participants: { current: 6, capacity: 8 },
    date: "2025-06-06",
    time: "10:00 AM-12:00 PM",
    location: "Artbar Yokohama",
    instructor: "Kenji Yamada",
    status: "Scheduled",
    actionText: "View Details",
    isPublished: true,
  },
  {
    id: 6,
    title: "Frida Kahlo Self-Portrait",
    titleJp: "フリーダ・カーロの自画像",
    subtitle: "Surrealist self-portraiture",
    participants: { current: 10, capacity: 12 },
    date: "2025-06-06",
    time: "3:00-5:00 PM",
    location: "Artbar Ginza",
    instructor: "Akari Suzuki",
    status: "Scheduled",
    actionText: "Register",
    isPublished: true,
  },
  {
    id: 7,
    title: "Hokusai Great Wave Workshop",
    titleJp: "北斎の大波ワークショップ",
    subtitle: "Traditional Japanese woodblock printing",
    participants: { current: 7, capacity: 15 },
    date: "2025-06-07",
    time: "1:00-4:00 PM",
    location: "Artbar Yokohama",
    instructor: "Takashi Murakami",
    status: "Scheduled",
    actionText: "View Details",
    isPublished: true,
  },
  {
    id: 8,
    title: "Watercolor Landscapes",
    titleJp: "水彩風景画",
    subtitle: "Plein air watercolor techniques",
    participants: { current: 5, capacity: 10 },
    date: "2025-06-07",
    time: "9:00-11:00 AM",
    location: "Artbar Daikanyama",
    instructor: "Naomi",
    status: "Scheduled",
    actionText: "View Details",
    isPublished: true,
  },
  {
    id: 9,
    title: "Digital Art Fundamentals",
    titleJp: "デジタルアート基礎",
    subtitle: "Introduction to digital painting",
    participants: { current: 12, capacity: 15 },
    date: "2025-06-08",
    time: "2:00-4:00 PM",
    location: "Artbar Cat Street",
    instructor: "Momo",
    status: "Scheduled",
    actionText: "View Details",
    isPublished: true,
  },
  {
    id: 10,
    title: "Oil Painting Masterclass",
    titleJp: "油絵マスタークラス",
    subtitle: "Advanced oil painting techniques",
    participants: { current: 8, capacity: 10 },
    date: "2025-06-08",
    time: "6:00-8:00 PM",
    location: "Artbar Shibuya",
    instructor: "Hiroshi Sato",
    status: "Scheduled",
    actionText: "View Details",
    isPublished: true,
  },
  {
    id: 11,
    title: "Acrylic Pour Painting",
    titleJp: "アクリル流し絵",
    subtitle: "Fluid art techniques",
    participants: { current: 14, capacity: 16 },
    date: "2025-06-09",
    time: "11:00 AM-1:00 PM",
    location: "Artbar Ginza",
    instructor: "Yuki Tanaka",
    status: "Scheduled",
    actionText: "View Details",
    isPublished: true,
  },
  {
    id: 12,
    title: "Portrait Drawing Workshop",
    titleJp: "肖像画ワークショップ",
    subtitle: "Charcoal and graphite techniques",
    participants: { current: 6, capacity: 12 },
    date: "2025-06-09",
    time: "4:00-6:00 PM",
    location: "Artbar Yokohama",
    instructor: "Kenji Yamada",
    status: "Scheduled",
    actionText: "View Details",
    isPublished: true,
  },
  {
    id: 13,
    title: "Mixed Media Collage",
    titleJp: "ミックスメディアコラージュ",
    subtitle: "Contemporary mixed media art",
    participants: { current: 9, capacity: 14 },
    date: "2025-06-10",
    time: "10:00 AM-12:00 PM",
    location: "Artbar Daikanyama",
    instructor: "Akari Suzuki",
    status: "Scheduled",
    actionText: "View Details",
    isPublished: true,
  },
  {
    id: 14,
    title: "Calligraphy & Ink Painting",
    titleJp: "書道と水墨画",
    subtitle: "Traditional Japanese ink techniques",
    participants: { current: 4, capacity: 8 },
    date: "2025-06-10",
    time: "2:00-4:00 PM",
    location: "Artbar Cat Street",
    instructor: "Takashi Murakami",
    status: "Scheduled",
    actionText: "View Details",
    isPublished: true,
  },
  {
    id: 15,
    title: "Sculpture Workshop",
    titleJp: "彫刻ワークショップ",
    subtitle: "Clay modeling and sculpting",
    participants: { current: 7, capacity: 10 },
    date: "2025-06-11",
    time: "1:00-3:00 PM",
    location: "Artbar Shibuya",
    instructor: "Momo",
    status: "Scheduled",
    actionText: "View Details",
    isPublished: true,
  },
]

const locations = [
  "All Locations",
  "Artbar Daikanyama",
  "Artbar Cat Street",
  "Artbar Ginza",
  "Artbar Shibuya",
  "Artbar Yokohama",
]

const instructors = [
  "All Instructors",
  "Naomi",
  "Momo",
  "Yuki Tanaka",
  "Hiroshi Sato",
  "Kenji Yamada",
  "Akari Suzuki",
  "Takashi Murakami",
]

const statuses = ["All Statuses", "Live", "Scheduled", "Completed"]

export function EnhancedEventsSection({ onEventClick }: EnhancedEventsSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [selectedInstructor, setSelectedInstructor] = useState("All Instructors")
  const [selectedStatus, setSelectedStatus] = useState("All Statuses")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState(1)
  const [eventsPerPage, setEventsPerPage] = useState(10)

  // Filter events based on all criteria
  const filteredEvents = useMemo(() => {
    return allEvents.filter((event) => {
      // Only show published events
      if (!event.isPublished) return false

      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.titleJp?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())

      // Location filter
      const matchesLocation = selectedLocation === "All Locations" || event.location === selectedLocation

      // Instructor filter
      const matchesInstructor = selectedInstructor === "All Instructors" || event.instructor === selectedInstructor

      // Status filter
      const matchesStatus = selectedStatus === "All Statuses" || event.status === selectedStatus

      // Date filter
      const matchesDate = !selectedDate || event.date === format(selectedDate, "yyyy-MM-dd")

      return matchesSearch && matchesLocation && matchesInstructor && matchesStatus && matchesDate
    })
  }, [searchQuery, selectedLocation, selectedInstructor, selectedStatus, selectedDate])

  // Pagination logic
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage)
  const startIndex = (currentPage - 1) * eventsPerPage
  const endIndex = startIndex + eventsPerPage
  const currentEvents = filteredEvents.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  const handleFilterChange = () => {
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedLocation("All Locations")
    setSelectedInstructor("All Instructors")
    setSelectedStatus("All Statuses")
    setSelectedDate(undefined)
    setCurrentPage(1)
  }

  return (
    <div className="px-4 lg:px-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="mb-1">Upcoming Events</CardTitle>
              <CardDescription>
                Manage your scheduled painting workshops ({filteredEvents.length} events found)
              </CardDescription>
            </div>
            <Button variant="outline" onClick={clearFilters} className="h-9">
              Clear Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters Row */}
          <div className="flex flex-wrap gap-3 mb-6 items-center">
            {/* Search */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search events..."
                className="w-[200px] lg:w-[250px] pl-9 h-9"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  handleFilterChange()
                }}
              />
            </div>

            {/* Today Quick Filter Button */}
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3"
              onClick={() => {
                const today = new Date()
                setSelectedDate(today)
                handleFilterChange()
              }}
            >
              Today
            </Button>

            {/* Location Filter */}
            <Select
              value={selectedLocation}
              onValueChange={(value) => {
                setSelectedLocation(value)
                handleFilterChange()
              }}
            >
              <SelectTrigger className="w-[160px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Instructor Filter */}
            <Select
              value={selectedInstructor}
              onValueChange={(value) => {
                setSelectedInstructor(value)
                handleFilterChange()
              }}
            >
              <SelectTrigger className="w-[160px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {instructors.map((instructor) => (
                  <SelectItem key={instructor} value={instructor}>
                    {instructor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select
              value={selectedStatus}
              onValueChange={(value) => {
                setSelectedStatus(value)
                handleFilterChange()
              }}
            >
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Date Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[200px] h-9 justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date)
                    handleFilterChange()
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Events List */}
          <div className="space-y-4 mb-6">
            {currentEvents.length > 0 ? (
              currentEvents.map((event) => (
                <PaintlyEventCard
                  key={event.id}
                  title={event.title}
                  titleJp={event.titleJp}
                  subtitle={event.subtitle}
                  participants={event.participants}
                  time={event.time}
                  date={event.date}
                  location={event.location}
                  instructor={event.instructor}
                  status={event.status}
                  actionText={event.actionText}
                  onViewDetails={() => onEventClick?.(event)}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No events found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {filteredEvents.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Events per page:</span>
                <Select
                  value={eventsPerPage.toString()}
                  onValueChange={(value) => {
                    setEventsPerPage(Number(value))
                    setCurrentPage(1)
                  }}
                >
                  <SelectTrigger className="w-[70px] h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredEvents.length)} of {filteredEvents.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                  Previous
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="w-8 h-8"
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

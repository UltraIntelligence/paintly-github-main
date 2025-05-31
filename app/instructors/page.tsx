"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Plus, Users, MoreHorizontal, Star, MapPin, Clock } from "lucide-react"

import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useFavorites } from "@/hooks/use-favorites"
import { FavoriteButton } from "@/components/favorite-button"

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.2 },
}

const instructorsData = [
  {
    id: 1,
    name: { japanese: "田中 美咲", english: "Misaki Tanaka" },
    photo: "/placeholder.svg?height=240&width=320",
    specialties: ["Watercolor", "Abstract Art", "Beginner Classes"],
    experience: "5 years",
    rating: 4.9,
    totalClasses: 342,
    availability: "available",
    location: "Ginza",
    languages: ["Japanese", "English"],
    bio: "Specializes in watercolor techniques and helping beginners discover their artistic voice.",
    nextAvailable: "Today 2:00 PM",
    hourlyRate: "¥4,500",
  },
  {
    id: 2,
    name: { japanese: "佐藤 健太", english: "Kenta Sato" },
    photo: "/placeholder.svg?height=240&width=320",
    specialties: ["Oil Painting", "Portrait", "Advanced Techniques"],
    experience: "8 years",
    rating: 4.8,
    totalClasses: 567,
    availability: "busy",
    location: "Daikanyama",
    languages: ["Japanese"],
    bio: "Master of classical oil painting techniques with expertise in portraiture.",
    nextAvailable: "Tomorrow 10:00 AM",
    hourlyRate: "¥6,000",
  },
  {
    id: 3,
    name: { japanese: "山田 さくら", english: "Sakura Yamada" },
    photo: "/placeholder.svg?height=240&width=320",
    specialties: ["Kids Classes", "Acrylic", "Fun Projects"],
    experience: "3 years",
    rating: 4.7,
    totalClasses: 189,
    availability: "available",
    location: "Cat Street",
    languages: ["Japanese", "English"],
    bio: "Energetic instructor who makes art fun and accessible for children of all ages.",
    nextAvailable: "Today 4:00 PM",
    hourlyRate: "¥3,800",
  },
  {
    id: 4,
    name: { japanese: "鈴木 大輔", english: "Daisuke Suzuki" },
    photo: "/placeholder.svg?height=240&width=320",
    specialties: ["Modern Art", "Mixed Media", "Corporate Events"],
    experience: "6 years",
    rating: 4.6,
    totalClasses: 298,
    availability: "limited",
    location: "Yokohama",
    languages: ["Japanese", "English", "Korean"],
    bio: "Contemporary artist specializing in mixed media and corporate team building events.",
    nextAvailable: "Friday 1:00 PM",
    hourlyRate: "¥5,200",
  },
  {
    id: 5,
    name: { japanese: "高橋 愛", english: "Ai Takahashi" },
    photo: "/placeholder.svg?height=240&width=320",
    specialties: ["Calligraphy", "Traditional Art", "Cultural Classes"],
    experience: "12 years",
    rating: 4.9,
    totalClasses: 756,
    availability: "available",
    location: "Ginza",
    languages: ["Japanese", "English", "Chinese"],
    bio: "Traditional Japanese art master with deep knowledge of cultural techniques.",
    nextAvailable: "Today 6:00 PM",
    hourlyRate: "¥7,500",
  },
  {
    id: 6,
    name: { japanese: "中村 翔", english: "Sho Nakamura" },
    photo: "/placeholder.svg?height=240&width=320",
    specialties: ["Street Art", "Graffiti", "Youth Programs"],
    experience: "4 years",
    rating: 4.5,
    totalClasses: 156,
    availability: "busy",
    location: "Cat Street",
    languages: ["Japanese", "English"],
    bio: "Street artist bringing urban art culture to traditional painting classes.",
    nextAvailable: "Monday 3:00 PM",
    hourlyRate: "¥4,200",
  },
]

const locations = ["All Locations", "Ginza", "Daikanyama", "Cat Street", "Yokohama"]
const availabilityOptions = ["All Availability", "Available", "Limited", "Busy"]

function InstructorsContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [selectedAvailability, setSelectedAvailability] = useState("All Availability")
  const [activeTab, setActiveTab] = useState("all")

  const { toggleFavorite, isFavorite, favorites } = useFavorites("instructors")

  const filteredInstructors = useMemo(() => {
    return instructorsData.filter((instructor) => {
      const matchesSearch =
        searchTerm === "" ||
        instructor.name.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
        instructor.name.japanese.includes(searchTerm) ||
        instructor.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesLocation = selectedLocation === "All Locations" || instructor.location === selectedLocation

      const availabilityMap: Record<string, string> = {
        available: "Available",
        limited: "Limited",
        busy: "Busy",
      }

      const matchesAvailability =
        selectedAvailability === "All Availability" || availabilityMap[instructor.availability] === selectedAvailability

      const matchesTab =
        activeTab === "all" ||
        (activeTab === "available" && instructor.availability === "available") ||
        (activeTab === "experienced" && Number.parseInt(instructor.experience) >= 5) ||
        (activeTab === "favorites" && isFavorite(instructor.id))

      return matchesSearch && matchesLocation && matchesAvailability && matchesTab
    })
  }, [searchTerm, selectedLocation, selectedAvailability, activeTab, isFavorite, favorites])

  const getAvailabilityBadgeColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-100 text-green-700"
      case "limited":
        return "bg-amber-100 text-amber-700"
      case "busy":
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
      case "busy":
        return "Busy"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
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
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Availability" />
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
          <TabsTrigger value="available">Available Now</TabsTrigger>
          <TabsTrigger value="experienced">Experienced</TabsTrigger>
          <TabsTrigger value="favorites">
            Favorites{" "}
            {favorites.size > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                {favorites.size}
              </Badge>
            )}
          </TabsTrigger>
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
                  setSelectedAvailability("All Availability")
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
                            src={instructor.photo || "/placeholder.svg"}
                            alt={`${instructor.name.english} instructor`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </AspectRatio>
                      <Badge
                        className={`absolute top-2 left-2 text-xs px-2 py-1 ${getAvailabilityBadgeColor(instructor.availability)}`}
                      >
                        {getAvailabilityText(instructor.availability)}
                      </Badge>
                      <FavoriteButton
                        isFavorite={isFavorite(instructor.id)}
                        onToggle={() => toggleFavorite(instructor.id)}
                      />
                    </div>

                    {/* Content Section */}
                    <CardContent className="flex-1 p-5 flex flex-col">
                      <div className="space-y-1 mb-3">
                        <h3 className="font-semibold text-gray-900 text-base leading-tight line-clamp-1">
                          {instructor.name.japanese}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-1">{instructor.name.english}</p>
                      </div>

                      <div className="flex items-center text-xs text-gray-500 mb-3">
                        <Star className="h-3.5 w-3.5 mr-1.5 text-amber-500 fill-current" />
                        {instructor.rating}
                        <span className="mx-2">•</span>
                        {instructor.totalClasses} classes
                      </div>

                      <div className="flex items-center text-xs text-gray-500 mb-3">
                        <MapPin className="h-3.5 w-3.5 mr-1.5" />
                        {instructor.location}
                        <Clock className="h-3.5 w-3.5 ml-3 mr-1.5" />
                        {instructor.experience}
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {instructor.specialties.slice(0, 2).map((specialty, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 border-blue-200"
                          >
                            {specialty}
                          </Badge>
                        ))}
                        {instructor.specialties.length > 2 && (
                          <Badge variant="outline" className="text-xs px-2 py-0.5">
                            +{instructor.specialties.length - 2}
                          </Badge>
                        )}
                      </div>

                      <div className="text-xs text-gray-500 mt-auto">Next: {instructor.nextAvailable}</div>
                    </CardContent>

                    {/* Actions Section - Fixed at bottom */}
                    <div className="p-5 pt-0 border-t border-gray-100 bg-gray-50">
                      <div className="flex gap-2">
                        <Button size="sm" variant="default" className="flex-1 text-xs">
                          Schedule
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 text-xs">
                          Profile
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline" className="px-2">
                              <MoreHorizontal className="h-3.5 w-3.5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="text-sm">View Details</DropdownMenuItem>
                            <DropdownMenuItem className="text-sm">Message</DropdownMenuItem>
                            <DropdownMenuItem className="text-sm">View Schedule</DropdownMenuItem>
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

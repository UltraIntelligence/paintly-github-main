"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Plus, Download, Upload, Users, CheckCircle2, XCircle, AlertCircle, Phone, MapPin } from "lucide-react"

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
    artwork: "/placeholder.svg?height=120&width=240&query=golden textured business art",
    artStyle: "Leadership",
    role: "CEO & Founder",
    roleBadgeColor: "bg-yellow-100 text-yellow-800",
    languages: ["English", "Japanese"],
    specialties: ["Business strategy", "Team leadership"],
    locations: ["All Locations"],
    availability: "available",
    bio: "Passionate visionary who founded Artbar Tokyo to make art accessible to everyone.",
    phone: "+81 90-1234-5678",
  },
  {
    id: 2,
    name: { japanese: "ナオミ", english: "Naomi" },
    photo: "/placeholder.svg?height=60&width=60&query=japanese woman artist",
    artwork: "/placeholder.svg?height=120&width=240&query=abstract paint pouring colorful",
    artStyle: "Abstract",
    role: "Marketing Director",
    roleBadgeColor: "bg-blue-100 text-blue-800",
    languages: ["English", "Japanese"],
    specialties: ["Abstract art", "Marketing strategy"],
    locations: ["Daikanyama", "Ginza"],
    availability: "available",
    bio: "Creative marketing professional with an eye for trends and abstract expression.",
    phone: "+81 90-2345-6789",
  },
  {
    id: 3,
    name: { japanese: "ルーシー", english: "Luci" },
    photo: "/placeholder.svg?height=60&width=60&query=emily carr graduate artist",
    artwork: "/placeholder.svg?height=120&width=240&query=fantasy landscape dreamy colors",
    artStyle: "Fantasy",
    role: "Senior Instructor",
    roleBadgeColor: "bg-green-100 text-green-800",
    languages: ["English", "Japanese", "Chinese"],
    specialties: ["Fantasy style", "Character design"],
    locations: ["Cat Street", "Yokohama"],
    availability: "available",
    bio: "Brings soft, dreamy fantasy style that transports you to colorful worlds.",
    phone: "+81 90-3456-7890",
  },
  {
    id: 4,
    name: { japanese: "モモ", english: "Momo" },
    photo: "/placeholder.svg?height=60&width=60&query=musashino art university graduate",
    artwork: "/placeholder.svg?height=120&width=240&query=abstract dot technique colorful patterns",
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
    photo: "/placeholder.svg?height=60&width=60&query=japanese painting specialist",
    artwork: "/placeholder.svg?height=120&width=240&query=traditional japanese painting delicate",
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
    photo: "/placeholder.svg?height=60&width=60&query=oil painting artist soft colors",
    artwork: "/placeholder.svg?height=120&width=240&query=soft natural elements oil painting",
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
    photo: "/placeholder.svg?height=60&width=60&query=pottery specialist temple university",
    artwork: "/placeholder.svg?height=120&width=240&query=pottery ceramics handmade",
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
    photo: "/placeholder.svg?height=60&width=60&query=korean kids art specialist",
    artwork: "/placeholder.svg?height=120&width=240&query=bright colorful kids art playful",
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
    photo: "/placeholder.svg?height=60&width=60&query=watercolor artist",
    artwork: "/placeholder.svg?height=120&width=240&query=delicate watercolor botanical",
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
    photo: "/placeholder.svg?height=60&width=60&query=street art graffiti artist",
    artwork: "/placeholder.svg?height=120&width=240&query=urban street art graffiti style",
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

  const getAvailabilityIcon = (availability: string) => {
    switch (availability) {
      case "available":
        return <CheckCircle2 className="h-3 w-3 text-green-500" />
      case "limited":
        return <AlertCircle className="h-3 w-3 text-amber-500" />
      case "unavailable":
        return <XCircle className="h-3 w-3 text-red-500" />
      default:
        return <CheckCircle2 className="h-3 w-3 text-green-500" />
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

  const getLanguageBadgeColor = (language: string) => {
    switch (language) {
      case "English":
        return "bg-blue-500"
      case "Japanese":
        return "bg-emerald-500"
      case "Chinese":
        return "bg-violet-500"
      case "Korean":
        return "bg-amber-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Header */}

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {filteredInstructors.map((instructor) => (
                <motion.div
                  key={instructor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="group cursor-pointer overflow-hidden border-0 bg-muted/50 hover:bg-background hover:shadow-md transition-all duration-200">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={instructor.artwork || "/placeholder.svg?height=120&width=240&query=abstract art"}
                        alt={`Artwork by ${instructor.name.english}`}
                        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      {/* Header with photo and name */}
                      <div className="flex items-start gap-3 mb-3">
                        <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                          <AvatarImage
                            src={instructor.photo || "/placeholder.svg"}
                            alt={`Profile photo of ${instructor.name.english}`}
                          />
                          <AvatarFallback className="text-sm font-medium bg-muted">
                            {instructor.name.english
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm leading-tight mb-1 truncate">
                            {instructor.name.japanese}
                          </h3>
                          <p className="text-xs text-muted-foreground truncate">{instructor.name.english}</p>
                          <Badge
                            variant="secondary"
                            className={`mt-1 text-xs px-2 py-0.5 ${instructor.roleBadgeColor}`}
                          >
                            {instructor.role}
                          </Badge>
                        </div>
                      </div>

                      {/* Languages */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {instructor.languages.slice(0, 3).map((language) => (
                          <Badge
                            key={language}
                            className={`text-xs px-2 py-0.5 text-white ${getLanguageBadgeColor(language)}`}
                          >
                            {language}
                          </Badge>
                        ))}
                        {instructor.languages.length > 3 && (
                          <Badge variant="outline" className="text-xs px-2 py-0.5">
                            +{instructor.languages.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* Specialties */}
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {instructor.specialties.join(", ")}
                      </p>

                      {/* Bio */}
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{instructor.bio}</p>

                      {/* Availability and Contact */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {getAvailabilityIcon(instructor.availability)}
                          <span className="text-xs font-medium">{getAvailabilityText(instructor.availability)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          <span className="truncate">{instructor.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">
                            {instructor.locations.filter((loc) => loc !== "All Locations").join(", ")}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" className="flex-1 h-8 text-xs">
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 h-8 text-xs">
                          Schedule
                        </Button>
                      </div>
                    </CardContent>
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
        <AppSidebar />
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

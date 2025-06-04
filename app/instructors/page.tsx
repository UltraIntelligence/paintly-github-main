"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Plus, Users, MoreHorizontal, Star, MapPin, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

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
import { FeaturedSection, FeaturedCard } from "@/components/featured-section"

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.2 },
}

const instructorsData = [
  {
    id: "cathy",
    numericId: 1,
    name: { japanese: "キャシー・トンプソン", english: "Cathy Thompson" },
    photo: "/placeholder.svg?height=240&width=320",
    specialties: ["CEO", "Leadership", "Studio Management"],
    experience: "10+ years",
    rating: 4.9,
    totalClasses: 0,
    availability: "limited",
    location: "Ginza",
    languages: ["English", "Japanese"],
    bio: "Artbar TokyoのCEOとして、Artbarを常に快適でクリエイティビティを発揮できる場所にするため奮闘しています。",
    nextAvailable: "By appointment",
    hourlyRate: "¥8,000",
    education: "CEO Artbar Tokyo",
    role: "CEO",
  },
  {
    id: "naomi",
    numericId: 2,
    name: { japanese: "ナオミ", english: "Naomi" },
    photo: "/placeholder.svg?height=240&width=320",
    specialties: ["Marketing", "Abstract Art", "Trendy Sessions"],
    experience: "6 years",
    rating: 4.8,
    totalClasses: 425,
    availability: "available",
    location: "Daikanyama",
    languages: ["English", "Japanese"],
    bio: "インストラクターとArtbarのマーケティングディレクターを兼務。明るくてフレンドリーな先生で、セッションを楽しく盛り上げてくれます。",
    nextAvailable: "Today 2:00 PM",
    hourlyRate: "¥5,500",
    education: "Otis College of Art and Design (BFA) Fine Art & Product Design",
    role: "Marketing Director & Instructor",
  },
  {
    id: "luci",
    numericId: 3,
    name: { japanese: "ルシファ・パン", english: "Luci" },
    photo: "/placeholder.svg?height=240&width=320",
    specialties: ["Fantasy Art", "Colorful Paintings", "Dreamy Style"],
    experience: "4 years",
    rating: 4.7,
    totalClasses: 298,
    availability: "available",
    location: "Cat Street",
    languages: ["English", "Japanese", "Chinese"],
    bio: "ファンタジーの世界へ迷い込んだ様な柔らかくてカラフルなスタイルを得意としています！",
    nextAvailable: "Today 4:00 PM",
    hourlyRate: "¥4,800",
    education: "Emily Carr University of Art + Design, Waseda University",
    role: "Instructor",
  },
  {
    id: "momo",
    numericId: 4,
    name: { japanese: "モモ", english: "Momo" },
    photo: "/placeholder.svg?height=240&width=320",
    specialties: ["Abstract Art", "Dot Technique", "Color Theory"],
    experience: "7 years",
    rating: 4.9,
    totalClasses: 567,
    availability: "available",
    location: "Ginza",
    languages: ["English", "Japanese"],
    bio: "現役のアーティストとして国内外で活躍する経験豊富な講師です。専門は抽象画で、独自のドット技法を持っています。",
    nextAvailable: "Tomorrow 10:00 AM",
    hourlyRate: "¥6,200",
    education: "武蔵野美術大学基礎デザイン学科",
    role: "Professional Artist & Instructor",
  },
  {
    id: "nanako",
    numericId: 5,
    name: { japanese: "ナナコ", english: "Nanako" },
    photo: "/placeholder.svg?height=240&width=320",
    specialties: ["Japanese Painting", "Acrylic", "Color Mixing"],
    experience: "3 years",
    rating: 4.6,
    totalClasses: 189,
    availability: "available",
    location: "Yokohama",
    languages: ["Japanese"],
    bio: "日本画、アクリル画を中心に作品づくりをしており、繊細な色づくりを得意とし、指導ができます。",
    nextAvailable: "Today 6:00 PM",
    hourlyRate: "¥4,200",
    education: "武蔵野美術大学 日本画学科",
    role: "Instructor",
  },
  {
    id: "aika",
    numericId: 6,
    name: { japanese: "あいか", english: "Aika" },
    photo: "/placeholder.svg?height=240&width=320",
    specialties: ["Oil Painting", "Tapestry Art", "Natural Elements"],
    experience: "5 years",
    rating: 4.7,
    totalClasses: 234,
    availability: "limited",
    location: "Daikanyama",
    languages: ["Japanese"],
    bio: "自然の要素からインスピレーションを得た、とてもソフトでカラフルなスタイル。大きなタペストリーの絵を描きます！",
    nextAvailable: "Friday 2:00 PM",
    hourlyRate: "¥5,800",
    education: "武蔵野美術大学大学院造形研究科油絵コース",
    role: "Instructor",
  },
  {
    id: "kiyoe",
    numericId: 7,
    name: { japanese: "清恵", english: "Kiyoe" },
    photo: "/placeholder.svg?height=240&width=320",
    specialties: ["Pottery", "Ceramics", "Kids Classes"],
    experience: "8 years",
    rating: 4.8,
    totalClasses: 445,
    availability: "available",
    location: "Cat Street",
    languages: ["English", "Japanese"],
    bio: "陶芸を専門としていてコップやお皿など素敵な焼き物をたくさん作っている先生です！とっても穏やかで優しい雰囲気。",
    nextAvailable: "Today 3:00 PM",
    hourlyRate: "¥4,500",
    education: "Temple University (Associate degree)",
    role: "Pottery Specialist",
  },
  {
    id: "michi-kim",
    numericId: 8,
    name: { japanese: "Michi Kim", english: "Michi Kim" },
    photo: "/placeholder.svg?height=240&width=320",
    specialties: ["Kids Classes", "Fun Art", "Children's Art"],
    experience: "4 years",
    rating: 4.9,
    totalClasses: 312,
    availability: "available",
    location: "Ginza",
    languages: ["English", "Japanese", "Korean"],
    bio: "Artbarのキッズセッションの多くでたくさんのかわいい絵を描いています！明るくエネルギッシュな雰囲気で子供たちを笑顔に。",
    nextAvailable: "Today 1:00 PM",
    hourlyRate: "¥4,000",
    education: "Kyoto University of Art and Design, University of Regina",
    role: "Kids Specialist",
  },
  {
    id: "fuyou",
    numericId: 9,
    name: { japanese: "長嶋 芙蓉", english: "Fuyou Nagashima" },
    photo: "/placeholder.svg?height=240&width=320",
    specialties: ["Ink Painting", "Calligraphy", "Traditional Art"],
    experience: "9 years",
    rating: 4.8,
    totalClasses: 398,
    availability: "limited",
    location: "Yokohama",
    languages: ["Japanese"],
    bio: "水墨画を専門としており、広告やプロダクトへの作品提供など長年のキャリアをお持ちの先生です。",
    nextAvailable: "Monday 11:00 AM",
    hourlyRate: "¥6,800",
    education: "水墨画家千葉玄象に師事",
    role: "Ink Painting Master",
  },
  {
    id: "sakura",
    numericId: 10,
    name: { japanese: "さくら", english: "Sakura" },
    photo: "/placeholder.svg?height=240&width=320",
    specialties: ["Japanese Painting", "Animal Art", "3D Art"],
    experience: "5 years",
    rating: 4.7,
    totalClasses: 267,
    availability: "available",
    location: "Daikanyama",
    languages: ["English", "Japanese", "German"],
    bio: "日本画を専門としていますが、アクリル絵の具を使った立体表現も行うマルチスタイルアーティストです。",
    nextAvailable: "Tomorrow 2:00 PM",
    hourlyRate: "¥5,200",
    education: "筑波大学芸術専門学群、東京藝術大学院",
    role: "Multi-Style Artist",
  },
  {
    id: "daria",
    numericId: 11,
    name: { japanese: "Daria", english: "Daria" },
    photo: "/placeholder.svg?height=240&width=320",
    specialties: ["Illustration", "Experimental Art", "Mixed Media"],
    experience: "6 years",
    rating: 4.6,
    totalClasses: 198,
    availability: "available",
    location: "Cat Street",
    languages: ["English", "Japanese", "Italian"],
    bio: "フィレンツェで絵画を学んだイタリア人アーティスト。オネアリスティックなスタイルのイラストレーターで、さまざまな素材や技法を試すのが好き。",
    nextAvailable: "Today 5:00 PM",
    hourlyRate: "¥5,500",
    education: "Leon Battista Alberti (Florence), Ca' Foscari University (Venice)",
    role: "Illustrator",
  },
  {
    id: "rie",
    numericId: 12,
    name: { japanese: "Rie", english: "Rie" },
    photo: "/placeholder.svg?height=240&width=320",
    specialties: ["Alcohol Ink Art", "Resin Art", "Art Therapy"],
    experience: "4 years",
    rating: 4.8,
    totalClasses: 156,
    availability: "available",
    location: "Ginza",
    languages: ["English", "Japanese"],
    bio: "アルコールインクアートとレジンアートを専門とする先生です。アートと心理学を組み合わせたワークショップも開催。",
    nextAvailable: "Tomorrow 3:00 PM",
    hourlyRate: "¥4,800",
    education: "Art Therapy Specialist",
    role: "Alcohol Ink & Resin Specialist",
  },
  {
    id: "ken",
    numericId: 13,
    name: { japanese: "田中 健", english: "Ken Tanaka" },
    photo: "/placeholder.svg?height=240&width=320",
    specialties: ["Pen Drawing", "Detailed Art", "Illustration"],
    experience: "7 years",
    rating: 4.7,
    totalClasses: 289,
    availability: "limited",
    location: "Yokohama",
    languages: ["English", "Japanese"],
    bio: "ペンを使ったドローイングを得意とします。アートだけではなくあらゆる事に精通しているのでお話をしているだけでもとっても楽しい先生です。",
    nextAvailable: "Wednesday 1:00 PM",
    hourlyRate: "¥5,000",
    education: "Professional Illustrator",
    role: "Pen Drawing Specialist",
  },
  {
    id: "uka",
    numericId: 14,
    name: { japanese: "ユカ", english: "Uka" },
    photo: "/placeholder.svg?height=240&width=320",
    specialties: ["Children's Books", "Oil Painting", "Illustration"],
    experience: "8 years",
    rating: 4.9,
    totalClasses: 378,
    availability: "available",
    location: "Daikanyama",
    languages: ["English", "Japanese"],
    bio: "アメリカのニューヨークにある大学でイラストレーションを専攻。油とアクリルが得意で、絵本を作っています。",
    nextAvailable: "Today 11:00 AM",
    hourlyRate: "¥5,800",
    education: "Syracuse University (BFA Illustration), Finger Lakes Community College",
    role: "Children's Book Author & Illustrator",
  },
  {
    id: "akiko",
    numericId: 15,
    name: { japanese: "アキコ", english: "Akiko" },
    photo: "/placeholder.svg?height=240&width=320",
    specialties: ["Japanese Painting", "Colorful Art", "Illustration"],
    experience: "5 years",
    rating: 4.6,
    totalClasses: 234,
    availability: "available",
    location: "Cat Street",
    languages: ["English", "Japanese"],
    bio: "カラフルでワクワクする作品を作るのが得意です。模写をする事が大好きで、模写から学ぶ事の大切さも心得ています。",
    nextAvailable: "Tomorrow 4:00 PM",
    hourlyRate: "¥4,500",
    education: "武蔵野美術大学 日本画学科",
    role: "Instructor",
  },
  {
    id: "minako",
    numericId: 16,
    name: { japanese: "ミナコ", english: "Minako" },
    photo: "/placeholder.svg?height=240&width=320",
    specialties: ["Printmaking", "Graphic Design", "Kids Classes"],
    experience: "12 years",
    rating: 4.9,
    totalClasses: 567,
    availability: "limited",
    location: "Ginza",
    languages: ["English", "Japanese"],
    bio: "パッケージデザイナー、グラフィックデザイナー、イラストレーター、ジュエリーメーカーとして活躍した後、現在は版画家兼アートエデュケーター。",
    nextAvailable: "Next week",
    hourlyRate: "¥7,200",
    education: "Kingston University (MA Illustration), 武蔵野美術大学視覚伝達デザイン学科",
    role: "Printmaker & Art Educator",
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
  const router = useRouter()

  // Get favorited instructors for Featured section
  const featuredInstructors = useMemo(() => {
    return instructorsData.filter((instructor) => isFavorite(instructor.numericId)).slice(0, 6)
  }, [isFavorite, favorites])

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
        (activeTab === "favorites" && isFavorite(instructor.numericId))

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

  const handleViewDetails = (instructorId: string) => {
    router.push(`/instructors/${instructorId}`)
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
      {/* Featured Section */}
      <FeaturedSection
        title="Featured"
        subtitle="Your preferred instructors"
        isEmpty={featuredInstructors.length === 0}
      >
        {featuredInstructors.map((instructor) => (
          <FeaturedCard key={instructor.id}>
            <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
              {/* Large Image Section */}
              <div className="relative overflow-hidden h-56">
                <div className="bg-gray-100 w-full h-full group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={instructor.photo || "/placeholder.svg"}
                    alt={`${instructor.name.english} instructor`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <Badge
                  className={`absolute top-3 left-3 text-xs px-2 py-1 ${getAvailabilityBadgeColor(instructor.availability)}`}
                >
                  {getAvailabilityText(instructor.availability)}
                </Badge>
                <FavoriteButton
                  isFavorite={isFavorite(instructor.numericId)}
                  onToggle={() => toggleFavorite(instructor.numericId)}
                />
              </div>

              {/* Content Section */}
              <CardContent className="p-5">
                <div className="space-y-1 mb-3">
                  {/* Only the main title is larger */}
                  <h3 className="font-bold text-base text-gray-900 leading-tight">{instructor.name.japanese}</h3>
                  {/* Subtitle same size as regular cards */}
                  <p className="text-sm text-gray-600">{instructor.name.english}</p>
                  {/* Bio same size as regular cards */}
                  <p className="text-sm text-gray-500 line-clamp-2 mt-2">{instructor.bio}</p>
                </div>

                {/* Specialties same size as regular cards */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {instructor.specialties.slice(0, 3).map((specialty, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 border-blue-200"
                    >
                      {specialty}
                    </Badge>
                  ))}
                  {instructor.specialties.length > 3 && (
                    <Badge variant="outline" className="text-xs px-2 py-0.5">
                      +{instructor.specialties.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Metadata same size as regular cards */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-xs text-gray-500">
                    <Star className="h-3.5 w-3.5 mr-1.5 text-amber-500 fill-current" />
                    {instructor.rating} • {instructor.totalClasses} classes
                  </div>
                  <div className="text-xs font-medium text-gray-700">{instructor.hourlyRate}</div>
                </div>

                {/* Actions Section */}
                <div className="flex gap-2">
                  <Button size="sm" variant="default" className="flex-1 text-xs">
                    Schedule
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-xs"
                    onClick={() => handleViewDetails(instructor.id)}
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
                      <DropdownMenuItem className="text-sm">Message</DropdownMenuItem>
                      <DropdownMenuItem className="text-sm">Edit Profile</DropdownMenuItem>
                      <DropdownMenuItem className="text-sm">View Full Schedule</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          </FeaturedCard>
        ))}
      </FeaturedSection>

      {/* All Instructors Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">All Instructors</h2>
          <p className="text-gray-600">Browse and manage your complete instructor team</p>
        </div>

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
                          isFavorite={isFavorite(instructor.numericId)}
                          onToggle={() => toggleFavorite(instructor.numericId)}
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

                        <div className="text-xs text-gray-500 mt-auto mb-4">Next: {instructor.nextAvailable}</div>

                        {/* Actions Section */}
                        <div className="flex gap-2">
                          <Button size="sm" variant="default" className="flex-1 text-xs">
                            Schedule
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 text-xs"
                            onClick={() => handleViewDetails(instructor.id)}
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
                              <DropdownMenuItem className="text-sm">Message</DropdownMenuItem>
                              <DropdownMenuItem className="text-sm">Edit Profile</DropdownMenuItem>
                              <DropdownMenuItem className="text-sm">View Full Schedule</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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
    </div>
  )
}

export default function InstructorsPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SidebarProvider defaultOpen={false}>
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

"use client"

import { useState } from "react"
import { Search, MoreHorizontal, Clock, Square, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ThemeProvider } from "../../components/theme-provider"
import { AppSidebar } from "../../components/app-sidebar"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { motion, AnimatePresence } from "framer-motion"
import { useFavorites } from "@/hooks/use-favorites"
import { FavoriteButton } from "@/components/favorite-button"

const templatesData = [
  {
    id: 1,
    japaneseTitle: "モネ 睡蓮",
    englishTitle: "Monet Water Lilies",
    duration: "2 hours",
    canvas: "F6",
    difficulty: "Intermediate",
    category: "Master Artists",
    scheduled: "12x this month",
    popular: true,
  },
  {
    id: 2,
    japaneseTitle: "たらし込みアート",
    englishTitle: "Paint Pouring",
    duration: "2 hours",
    canvas: "30cm Round",
    difficulty: "Beginner",
    category: "Paint Pouring",
    scheduled: "8x this month",
    popular: false,
  },
  {
    id: 3,
    japaneseTitle: "キッズ カメレオン",
    englishTitle: "Kids Chameleon",
    duration: "2 hours",
    canvas: "30cm Round",
    difficulty: "Kids",
    category: "Kids Only",
    scheduled: "5x this month",
    popular: false,
  },
  {
    id: 4,
    japaneseTitle: "ピカソ自画像",
    englishTitle: "Picasso Self-Portrait",
    duration: "2.5 hours",
    canvas: "F6",
    difficulty: "Advanced",
    category: "Master Artists",
    scheduled: "3x this month",
    popular: false,
  },
  {
    id: 5,
    japaneseTitle: "東京タワー",
    englishTitle: "Tokyo Tower",
    duration: "2 hours",
    canvas: "F6",
    difficulty: "Intermediate",
    category: "Seasonal",
    scheduled: "6x this month",
    popular: false,
  },
  {
    id: 6,
    japaneseTitle: "ゴッホ星月夜",
    englishTitle: "Van Gogh Starry Night",
    duration: "2.5 hours",
    canvas: "F10",
    difficulty: "Advanced",
    category: "Master Artists",
    scheduled: "4x this month",
    popular: true,
  },
  {
    id: 7,
    japaneseTitle: "キッズ ナマケモノ",
    englishTitle: "Kids Sloth",
    duration: "1.5 hours",
    canvas: "25cm Round",
    difficulty: "Kids",
    category: "Kids Only",
    scheduled: "7x this month",
    popular: false,
  },
  {
    id: 8,
    japaneseTitle: "花瓶のひまわり",
    englishTitle: "Sunflowers Vase",
    duration: "2 hours",
    canvas: "F6",
    difficulty: "Intermediate",
    category: "All",
    scheduled: "9x this month",
    popular: false,
  },
  {
    id: 9,
    japaneseTitle: "アルコールインク",
    englishTitle: "Alcohol Ink Art",
    duration: "2 hours",
    canvas: "30cm Round",
    difficulty: "Intermediate",
    category: "Paint Pouring",
    scheduled: "11x this month",
    popular: true,
  },
  {
    id: 10,
    japaneseTitle: "マティス 赤い室内",
    englishTitle: "Matisse Red Room",
    duration: "2.5 hours",
    canvas: "F10",
    difficulty: "Advanced",
    category: "Master Artists",
    scheduled: "2x this month",
    popular: false,
  },
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-emerald-100 text-emerald-700"
    case "Intermediate":
      return "bg-amber-100 text-amber-700"
    case "Advanced":
      return "bg-rose-100 text-rose-700"
    case "Kids":
      return "bg-purple-100 text-purple-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: {
    duration: typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.4,
    ease: [0.4, 0.0, 0.2, 1],
  },
}

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [activeCategory, setActiveCategory] = useState("All")

  const { toggleFavorite, isFavorite, favorites } = useFavorites("templates")

  // Ensure templates is always an array
  const templates = templatesData || []

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.japaneseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.englishTitle.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "All" || template.category === activeCategory
    const matchesFavorites = activeCategory !== "Favorites" || isFavorite(template.id)
    return matchesSearch && matchesCategory && matchesFavorites
  })

  const getCategoryCount = (category: string) => {
    if (category === "All") return templates.length
    if (category === "Favorites") return favorites.size
    return templates.filter((template) => template.category === category).length
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="dashboard-theme">
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <AnimatePresence mode="wait">
            <motion.div key="templates" className="flex flex-1 flex-col" {...pageTransition}>
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  <div className="px-4 lg:px-6">
                    {/* Filters */}
                    <div className="space-y-4 mb-8">
                      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
                        <div className="relative flex-1 max-w-sm">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            placeholder="Search templates..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                          <SelectTrigger className="w-full sm:w-[200px]">
                            <SelectValue placeholder="All Locations" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Locations</SelectItem>
                            <SelectItem value="ginza">Artbar Ginza</SelectItem>
                            <SelectItem value="daikanyama">Artbar Daikanyama</SelectItem>
                            <SelectItem value="catstreet">Artbar Cat Street</SelectItem>
                            <SelectItem value="yokohama">Artbar Yokohama</SelectItem>
                          </SelectContent>
                        </Select>

                        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-auto">
                          <TabsList>
                            <TabsTrigger value="All" className="gap-1">
                              All{" "}
                              <Badge
                                variant="secondary"
                                className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30"
                              >
                                {getCategoryCount("All")}
                              </Badge>
                            </TabsTrigger>
                            <TabsTrigger value="Favorites" className="gap-1">
                              Favorites{" "}
                              <Badge
                                variant="secondary"
                                className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30"
                              >
                                {getCategoryCount("Favorites")}
                              </Badge>
                            </TabsTrigger>
                            <TabsTrigger value="Kids Only" className="gap-1">
                              Kids Only{" "}
                              <Badge
                                variant="secondary"
                                className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30"
                              >
                                {getCategoryCount("Kids Only")}
                              </Badge>
                            </TabsTrigger>
                            <TabsTrigger value="Master Artists" className="gap-1">
                              Master Artists{" "}
                              <Badge
                                variant="secondary"
                                className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30"
                              >
                                {getCategoryCount("Master Artists")}
                              </Badge>
                            </TabsTrigger>
                            <TabsTrigger value="Paint Pouring" className="gap-1">
                              Paint Pouring{" "}
                              <Badge
                                variant="secondary"
                                className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30"
                              >
                                {getCategoryCount("Paint Pouring")}
                              </Badge>
                            </TabsTrigger>
                            <TabsTrigger value="Seasonal" className="gap-1">
                              Seasonal{" "}
                              <Badge
                                variant="secondary"
                                className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30"
                              >
                                {getCategoryCount("Seasonal")}
                              </Badge>
                            </TabsTrigger>
                          </TabsList>
                        </Tabs>

                        <div className="flex gap-2 ml-auto">
                          <Button size="sm" variant="outline">
                            Import
                          </Button>
                          <Button size="sm">Add Template</Button>
                        </div>
                      </div>
                    </div>

                    {/* Template Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                      {filteredTemplates.map((template) => (
                        <Card
                          key={template.id}
                          className="group overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col h-full"
                        >
                          {/* Image Section */}
                          <div className="relative overflow-hidden">
                            <AspectRatio ratio={4 / 3} className="w-full">
                              <div className="bg-gray-100 w-full h-full group-hover:scale-105 transition-transform duration-300">
                                <img
                                  src={`/placeholder.svg?height=240&width=320&query=${encodeURIComponent(template.englishTitle + " " + template.category + " art painting")}`}
                                  alt={`${template.englishTitle} template`}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            </AspectRatio>
                            {template.popular && (
                              <Badge className="absolute top-2 left-2 bg-orange-100 text-orange-700 text-xs px-2 py-1">
                                Popular
                              </Badge>
                            )}
                            <FavoriteButton
                              isFavorite={isFavorite(template.id)}
                              onToggle={() => toggleFavorite(template.id)}
                            />
                          </div>

                          {/* Content Section */}
                          <CardContent className="flex-1 p-5 flex flex-col">
                            <div className="space-y-1 mb-3">
                              <h3 className="font-semibold text-gray-900 text-base leading-tight line-clamp-1">
                                {template.japaneseTitle}
                              </h3>
                              <p className="text-sm text-gray-600 line-clamp-1">{template.englishTitle}</p>
                            </div>

                            <div className="flex items-center text-xs text-gray-500 mb-3">
                              <Clock className="h-3.5 w-3.5 mr-1.5" />
                              {template.duration}
                              <Square className="h-3.5 w-3.5 ml-3 mr-1.5" />
                              {template.canvas}
                            </div>

                            <div className="flex flex-wrap gap-1.5 mb-3">
                              <Badge
                                variant="outline"
                                className={`text-xs px-2 py-0.5 border ${getDifficultyColor(template.difficulty)}`}
                              >
                                {template.difficulty}
                              </Badge>
                              <Badge
                                variant="outline"
                                className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 border-blue-200"
                              >
                                {template.category}
                              </Badge>
                            </div>

                            <div className="flex items-center text-xs text-gray-500 mt-auto">
                              <Award className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
                              Used {template.scheduled}
                            </div>
                          </CardContent>

                          {/* Actions Section - Fixed at bottom */}
                          <div className="p-5 pt-0 border-t border-gray-100 bg-gray-50">
                            <div className="flex gap-2">
                              <Button size="sm" variant="default" className="flex-1 text-xs">
                                Schedule
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1 text-xs">
                                Edit
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button size="sm" variant="outline" className="px-2">
                                    <MoreHorizontal className="h-3.5 w-3.5" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem className="text-sm">View Details</DropdownMenuItem>
                                  <DropdownMenuItem className="text-sm">Duplicate</DropdownMenuItem>
                                  <DropdownMenuItem className="text-sm text-red-600">Archive</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>

                    {filteredTemplates.length === 0 && (
                      <div className="text-center py-12">
                        <div className="text-gray-400 text-sm">No templates found matching your criteria.</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}

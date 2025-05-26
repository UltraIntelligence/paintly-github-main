"use client"

import { useState } from "react"
import { Search, PlusCircle, MoreHorizontal } from "lucide-react"
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

const templates = [
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
  }
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

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.japaneseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.englishTitle.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "All" || template.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <ThemeProvider defaultTheme="light" storageKey="dashboard-theme">
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="px-4 lg:px-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <h1 className="text-2xl font-bold text-gray-900">Templates</h1>
                      <Badge variant="secondary" className="text-sm">{filteredTemplates.length}</Badge>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create New Template
                    </Button>
                  </div>

                  {/* Filters */}
                  <div className="space-y-4 mb-8">
                    <div className="flex flex-col sm:flex-row gap-4">
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
                    </div>

                    <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
                      <TabsList className="grid w-full grid-cols-5 bg-gray-50">
                        <TabsTrigger value="All" className="data-[state=active]:bg-white">All</TabsTrigger>
                        <TabsTrigger value="Kids Only" className="data-[state=active]:bg-white">Kids Only</TabsTrigger>
                        <TabsTrigger value="Master Artists" className="data-[state=active]:bg-white">Master Artists</TabsTrigger>
                        <TabsTrigger value="Paint Pouring" className="data-[state=active]:bg-white">Paint Pouring</TabsTrigger>
                        <TabsTrigger value="Seasonal" className="data-[state=active]:bg-white">Seasonal</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  {/* Template Cards Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredTemplates.map((template) => (
                      <Card key={template.id} className="group hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-gray-300">
                        {/* Image Section */}
                        <div className="relative">
                          <AspectRatio ratio={1} className="w-full">
                            <div className="bg-gradient-to-br from-blue-50 to-purple-50 w-full h-full flex items-center justify-center rounded-t-lg border-b border-gray-100">
                              <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center text-2xl">
                                🎨
                              </div>
                            </div>
                          </AspectRatio>
                          {template.popular && (
                            <Badge className="absolute top-2 right-2 bg-orange-100 text-orange-700 text-xs px-2 py-1">
                              Popular
                            </Badge>
                          )}
                        </div>

                        {/* Content Section */}
                        <CardContent className="p-4 space-y-3">
                          <div className="space-y-1">
                            <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-1">
                              {template.japaneseTitle}
                            </h3>
                            <p className="text-xs text-gray-600 line-clamp-1">
                              {template.englishTitle}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            <Badge variant="outline" className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 border-blue-200">
                              {template.duration}
                            </Badge>
                            <Badge variant="outline" className="text-xs px-2 py-0.5 bg-green-50 text-green-700 border-green-200">
                              {template.canvas}
                            </Badge>
                            <Badge variant="outline" className={`text-xs px-2 py-0.5 border ${getDifficultyColor(template.difficulty)}`}>
                              {template.difficulty}
                            </Badge>
                          </div>

                          <p className="text-xs text-gray-500">
                            Used {template.scheduled}
                          </p>

                          {/* Actions Section */}
                          <div className="flex gap-2 pt-2">
                            <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs">
                              Schedule This
                            </Button>
                            <Button size="sm" variant="outline" className="text-xs">
                              Edit
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="outline" className="px-2">
                                  <MoreHorizontal className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem className="text-sm">View Details</DropdownMenuItem>
                                <DropdownMenuItem className="text-sm">Duplicate</DropdownMenuItem>
                                <DropdownMenuItem className="text-sm text-red-600">Archive</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardContent>
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
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}

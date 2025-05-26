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

const templates = [
  {
    id: 1,
    japaneseTitle: "モネ 睡蓮",
    englishTitle: "Monet Water Lilies",
    duration: "2 hours",
    canvas: "F6",
    difficulty: "Intermediate",
    category: "Master Artists",
    scheduled: "Scheduled 12x this month",
  },
  {
    id: 2,
    japaneseTitle: "たらし込みアート",
    englishTitle: "Paint Pouring",
    duration: "2 hours",
    canvas: "30cm Round",
    difficulty: "Beginner",
    category: "Paint Pouring",
    scheduled: "Scheduled 8x this month",
  },
  {
    id: 3,
    japaneseTitle: "キッズ カメレオン",
    englishTitle: "Kids Chameleon",
    duration: "2 hours",
    canvas: "30cm Round",
    difficulty: "Kids",
    category: "Kids Only",
    scheduled: "Scheduled 5x this month",
  },
  {
    id: 4,
    japaneseTitle: "ピカソ自画像",
    englishTitle: "Picasso Self-Portrait",
    duration: "2.5 hours",
    canvas: "F6",
    difficulty: "Advanced",
    category: "Master Artists",
    scheduled: "Scheduled 3x this month",
  },
  {
    id: 5,
    japaneseTitle: "東京タワー",
    englishTitle: "Tokyo Tower",
    duration: "2 hours",
    canvas: "F6",
    difficulty: "Intermediate",
    category: "Seasonal",
    scheduled: "Scheduled 6x this month",
  },
  {
    id: 6,
    japaneseTitle: "ゴッホ星月夜",
    englishTitle: "Van Gogh Starry Night",
    duration: "2.5 hours",
    canvas: "F10",
    difficulty: "Advanced",
    category: "Master Artists",
    scheduled: "Scheduled 4x this month",
  },
  {
    id: 7,
    japaneseTitle: "キッズ ナマケモノ",
    englishTitle: "Kids Sloth",
    duration: "1.5 hours",
    canvas: "25cm Round",
    difficulty: "Kids",
    category: "Kids Only",
    scheduled: "Scheduled 7x this month",
  },
  {
    id: 8,
    japaneseTitle: "花瓶のひまわり",
    englishTitle: "Sunflowers Vase",
    duration: "2 hours",
    canvas: "F6",
    difficulty: "Intermediate",
    category: "All",
    scheduled: "Scheduled 9x this month",
  },
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-green-100 text-green-800"
    case "Intermediate":
      return "bg-yellow-100 text-yellow-800"
    case "Advanced":
      return "bg-red-100 text-red-800"
    case "Kids":
      return "bg-purple-100 text-purple-800"
    default:
      return "bg-gray-100 text-gray-800"
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
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-gray-200 pb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Templates</h1>
          <Badge className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">(24)</Badge>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Create New Template
        </Button>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="ginza">Artbar Ginza</SelectItem>
              <SelectItem value="daikanyama">Artbar Daikanyama</SelectItem>
              <SelectItem value="catstreet">Artbar Cat Street</SelectItem>
              <SelectItem value="yokohama">Artbar Yokohama</SelectItem>
              <SelectItem value="shinjuku">SPACES Shinjuku</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="Kids Only">Kids Only</TabsTrigger>
            <TabsTrigger value="Master Artists">Master Artists</TabsTrigger>
            <TabsTrigger value="Paint Pouring">Paint Pouring</TabsTrigger>
            <TabsTrigger value="Seasonal">Seasonal</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Template Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="w-full hover:shadow-lg transition-shadow duration-200">
            {/* Image Section */}
            <AspectRatio ratio={1} className="w-full">
              <div className="bg-gray-200 rounded-t-lg w-full h-full flex items-center justify-center text-4xl">🎨</div>
            </AspectRatio>

            {/* Content Section */}
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{template.japaneseTitle}</h3>
              <p className="text-sm text-gray-500 mb-3">{template.englishTitle}</p>

              <div className="flex gap-2 mb-2 flex-wrap">
                <Badge className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{template.duration}</Badge>
                <Badge className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">{template.canvas}</Badge>
                <Badge className={`px-2 py-1 rounded text-xs ${getDifficultyColor(template.difficulty)}`}>
                  {template.difficulty}
                </Badge>
              </div>

              <p className="text-xs text-gray-400 mb-4">{template.scheduled}</p>

              {/* Actions Section */}
              <div className="border-t border-gray-100 pt-4 -mx-4 px-4">
                <div className="flex gap-2 justify-between">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm flex-1">
                    Schedule This
                  </Button>
                  <Button
                    variant="outline"
                    className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-3 py-2 rounded text-sm"
                  >
                    Edit
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="px-2">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem>Archive</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

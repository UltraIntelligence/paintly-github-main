"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PlusCircle, Search, MoreHorizontal } from "lucide-react"

const templates = [
  {
    id: 1,
    titleJa: "モネ 睡蓮",
    titleEn: "Monet Water Lilies",
    duration: "2 hours",
    canvas: "F6",
    difficulty: "Intermediate",
    usage: "Scheduled 12x this month",
    category: "Master Artists",
  },
  {
    id: 2,
    titleJa: "たらし込みアート",
    titleEn: "Paint Pouring",
    duration: "2 hours",
    canvas: "30cm Round",
    difficulty: "Beginner",
    usage: "Scheduled 8x this month",
    category: "Paint Pouring",
  },
  {
    id: 3,
    titleJa: "キッズ カメレオン",
    titleEn: "Kids Chameleon",
    duration: "2 hours",
    canvas: "30cm Round",
    difficulty: "Kids",
    usage: "Scheduled 5x this month",
    category: "Kids Only",
  },
  {
    id: 4,
    titleJa: "ピカソ自画像",
    titleEn: "Picasso Self-Portrait",
    duration: "2.5 hours",
    canvas: "F6",
    difficulty: "Advanced",
    usage: "Scheduled 3x this month",
    category: "Master Artists",
  },
  {
    id: 5,
    titleJa: "東京タワー",
    titleEn: "Tokyo Tower",
    duration: "2 hours",
    canvas: "F6",
    difficulty: "Intermediate",
    usage: "Scheduled 6x this month",
    category: "Seasonal",
  },
  {
    id: 6,
    titleJa: "ゴッホ星月夜",
    titleEn: "Van Gogh Starry Night",
    duration: "2.5 hours",
    canvas: "F10",
    difficulty: "Advanced",
    usage: "Scheduled 4x this month",
    category: "Master Artists",
  },
  {
    id: 7,
    titleJa: "キッズ ナマケモノ",
    titleEn: "Kids Sloth",
    duration: "1.5 hours",
    canvas: "25cm Round",
    difficulty: "Kids",
    usage: "Scheduled 7x this month",
    category: "Kids Only",
  },
  {
    id: 8,
    titleJa: "花瓶のひまわり",
    titleEn: "Sunflowers Vase",
    duration: "2 hours",
    canvas: "F6",
    difficulty: "Intermediate",
    usage: "Scheduled 9x this month",
    category: "All",
  },
]

function TemplateCard({ template }: { template: (typeof templates)[0] }) {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        <AspectRatio ratio={1}>
          <div className="bg-gray-200 rounded-t-lg w-full h-full flex items-center justify-center">
            <span className="text-4xl">🎨</span>
          </div>
        </AspectRatio>
      </div>

      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{template.titleJa}</h3>
        <p className="text-sm text-gray-500 mb-3">{template.titleEn}</p>

        <div className="flex gap-2 mb-2">
          <Badge className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{template.duration}</Badge>
          <Badge className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">{template.canvas}</Badge>
          <Badge className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">{template.difficulty}</Badge>
        </div>

        <p className="text-xs text-gray-400 mb-4">{template.usage}</p>
      </CardContent>

      <div className="p-4 pt-0 border-t border-gray-100">
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
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
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
    </Card>
  )
}

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.titleJa.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.titleEn.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "All" || template.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="h-16 flex justify-between items-center border-b border-gray-200 pb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Templates</h1>
          <Badge className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">24</Badge>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Create New Template
        </Button>
      </div>

      {/* Filter Section */}
      <div className="mt-6 space-y-4">
        {/* Top row - Search and Location */}
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
            </SelectContent>
          </Select>
        </div>

        {/* Bottom row - Category Tabs */}
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

      {/* Main Content Grid */}
      <div className="mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No templates found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

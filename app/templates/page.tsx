"use client"

import { useState } from "react"
import { Search, PlusCircle, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const templates = [
  {
    id: 1,
    titleJa: "モネ 睡蓮",
    titleEn: "Monet Water Lilies",
    canvasSize: "F6",
    duration: "2 hours",
    difficulty: "Intermediate",
    category: "Master Artists",
    scheduledCount: 12,
    isPopular: true,
  },
  {
    id: 2,
    titleJa: "F6 たらし込みポーリングアート",
    titleEn: "Paint Pouring Fluid Art",
    canvasSize: "F6",
    duration: "2 hours",
    difficulty: "Beginner",
    category: "Paint Pouring",
    scheduledCount: 8,
    isPopular: false,
  },
  {
    id: 3,
    titleJa: "Kids Only カメレオン",
    titleEn: "Rainbow Chameleon",
    canvasSize: "30cm Round",
    duration: "2 hours",
    difficulty: "Beginner",
    category: "Kids Only",
    scheduledCount: 15,
    isPopular: false,
  },
  {
    id: 4,
    titleJa: "ピカソのスタイルで自画像",
    titleEn: "Picasso Self-Portrait",
    canvasSize: "F6",
    duration: "2 hours",
    difficulty: "Advanced",
    category: "Master Artists",
    scheduledCount: 3,
    isPopular: false,
  },
  {
    id: 5,
    titleJa: "さくら東京タワー",
    titleEn: "Sakura Tokyo Tower",
    canvasSize: "F6",
    duration: "2 hours",
    difficulty: "Intermediate",
    category: "Seasonal",
    scheduledCount: 22,
    isPopular: true,
  },
  {
    id: 6,
    titleJa: "40cm 丸いキャンバス たらし込みアート",
    titleEn: "40cm Round Paint Pouring",
    canvasSize: "40cm Round",
    duration: "2 hours",
    difficulty: "Beginner",
    category: "Paint Pouring",
    scheduledCount: 6,
    isPopular: false,
  },
  {
    id: 7,
    titleJa: "アンリ・マティスの赤い室内",
    titleEn: "Matisse Red Room",
    canvasSize: "F10",
    duration: "2.5 hours",
    difficulty: "Advanced",
    category: "Master Artists",
    scheduledCount: 4,
    isPopular: false,
  },
  {
    id: 8,
    titleJa: "キッズ 甘えん坊ナマケモノ",
    titleEn: "Kids Sloth",
    canvasSize: "30cm Round",
    duration: "2 hours",
    difficulty: "Beginner",
    category: "Kids Only",
    scheduledCount: 11,
    isPopular: false,
  },
  {
    id: 9,
    titleJa: "ゴッホのカフェテラス",
    titleEn: "Van Gogh Cafe Terrace",
    canvasSize: "F6",
    duration: "2 hours",
    difficulty: "Advanced",
    category: "Master Artists",
    scheduledCount: 7,
    isPopular: false,
  },
  {
    id: 10,
    titleJa: "ミモザの花瓶",
    titleEn: "Mimosa Vase",
    canvasSize: "F6",
    duration: "2 hours",
    difficulty: "Intermediate",
    category: "Seasonal",
    scheduledCount: 9,
    isPopular: false,
  },
  {
    id: 11,
    titleJa: "夕暮れ時の東京タワー",
    titleEn: "Tokyo Tower at Sunset",
    canvasSize: "F6",
    duration: "2 hours",
    difficulty: "Intermediate",
    category: "All",
    scheduledCount: 14,
    isPopular: false,
  },
  {
    id: 12,
    titleJa: "アルコールインクアート",
    titleEn: "Alcohol Ink Art",
    canvasSize: "30cm Round",
    duration: "2 hours",
    difficulty: "Intermediate",
    category: "All",
    scheduledCount: 5,
    isPopular: false,
  },
  {
    id: 13,
    titleJa: "YOKOHAMA Kids Only アフタヌーンティー",
    titleEn: "Afternoon Tea",
    canvasSize: "25cm Round",
    duration: "2 hours",
    difficulty: "Beginner",
    category: "Kids Only",
    scheduledCount: 8,
    isPopular: false,
  },
  {
    id: 14,
    titleJa: "張り子招き猫",
    titleEn: "Lucky Cat Paper Mâché",
    canvasSize: "Special",
    duration: "2 hours",
    difficulty: "Intermediate",
    category: "All",
    scheduledCount: 6,
    isPopular: false,
  },
  {
    id: 15,
    titleJa: "擬似ステンドグラス",
    titleEn: "Faux Stained Glass",
    canvasSize: "F6",
    duration: "2 hours",
    difficulty: "Beginner",
    category: "All",
    scheduledCount: 10,
    isPopular: false,
  },
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "Intermediate":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "Advanced":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Kids Only":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    case "Master Artists":
      return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300"
    case "Paint Pouring":
      return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300"
    case "Seasonal":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedCanvasSize, setSelectedCanvasSize] = useState("all")

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.titleJa.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.titleEn.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory
    const matchesCanvasSize = selectedCanvasSize === "all" || template.canvasSize === selectedCanvasSize

    return matchesSearch && matchesCategory && matchesCanvasSize
  })

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Templates ({templates.length})</h1>
        <Button className="bg-[#1414f5] hover:bg-[#1010d4]">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Template
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:space-x-4 lg:space-y-0">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Location Select */}
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="w-[200px]">
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

        {/* Canvas Size Select */}
        <Select value={selectedCanvasSize} onValueChange={setSelectedCanvasSize}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Sizes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sizes</SelectItem>
            <SelectItem value="F6">F6</SelectItem>
            <SelectItem value="F10">F10</SelectItem>
            <SelectItem value="F12">F12</SelectItem>
            <SelectItem value="30cm Round">30cm Round</SelectItem>
            <SelectItem value="40cm Round">40cm Round</SelectItem>
            <SelectItem value="25cm Round">25cm Round</SelectItem>
            <SelectItem value="Special">Special</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="All">All</TabsTrigger>
          <TabsTrigger value="Kids Only">Kids Only</TabsTrigger>
          <TabsTrigger value="Master Artists">Master Artists</TabsTrigger>
          <TabsTrigger value="Paint Pouring">Paint Pouring</TabsTrigger>
          <TabsTrigger value="Seasonal">Seasonal</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Templates Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
              <AspectRatio ratio={4 / 3}>
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-t-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <div className="text-4xl mb-2">🎨</div>
                    <div className="text-sm">Template Preview</div>
                  </div>
                </div>
              </AspectRatio>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <h3 className="text-lg font-semibold">{template.titleJa}</h3>
                  <p className="text-sm text-muted-foreground">{template.titleEn}</p>
                </div>

                {/* Metadata Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800"
                  >
                    {template.duration}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800"
                  >
                    {template.canvasSize}
                  </Badge>
                  <Badge className={getDifficultyColor(template.difficulty)}>{template.difficulty}</Badge>
                  {template.category !== "All" && (
                    <Badge className={getCategoryColor(template.category)}>{template.category}</Badge>
                  )}
                  {template.isPopular && (
                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                      Popular
                    </Badge>
                  )}
                </div>

                {/* Usage Stats */}
                <p className="text-sm text-muted-foreground">Scheduled {template.scheduledCount} times this month</p>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <Button size="sm" className="bg-[#1414f5] hover:bg-[#1010d4] flex-1">
                    Schedule This
                  </Button>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="outline" className="px-2">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Archive</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold mb-2">No templates found</h3>
            <p>Try adjusting your search criteria or create a new template.</p>
          </div>
        </div>
      )}
    </div>
  )
}

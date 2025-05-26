"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

const templateData = [
  {
    id: 1,
    titleJa: "モネ 睡蓮",
    titleEn: "Monet Water Lilies",
    duration: "2 hours",
    canvas: "F6",
    difficulty: "Intermediate",
    usage: "Scheduled 12x this month",
    category: "masters",
  },
  {
    id: 2,
    titleJa: "たらし込みアート",
    titleEn: "Paint Pouring",
    duration: "2 hours",
    canvas: "30cm Round",
    difficulty: "Beginner",
    usage: "Scheduled 8x this month",
    category: "pouring",
  },
  {
    id: 3,
    titleJa: "キッズ カメレオン",
    titleEn: "Kids Chameleon",
    duration: "2 hours",
    canvas: "30cm Round",
    difficulty: "Kids",
    usage: "Scheduled 5x this month",
    category: "kids",
  },
  {
    id: 4,
    titleJa: "ピカソ自画像",
    titleEn: "Picasso Self-Portrait",
    duration: "2.5 hours",
    canvas: "F6",
    difficulty: "Advanced",
    usage: "Scheduled 3x this month",
    category: "masters",
  },
  {
    id: 5,
    titleJa: "東京タワー",
    titleEn: "Tokyo Tower",
    duration: "2 hours",
    canvas: "F6",
    difficulty: "Intermediate",
    usage: "Scheduled 6x this month",
    category: "seasonal",
  },
  {
    id: 6,
    titleJa: "ゴッホ星月夜",
    titleEn: "Van Gogh Starry Night",
    duration: "2.5 hours",
    canvas: "F10",
    difficulty: "Advanced",
    usage: "Scheduled 4x this month",
    category: "masters",
  },
  {
    id: 7,
    titleJa: "キッズ ナマケモノ",
    titleEn: "Kids Sloth",
    duration: "1.5 hours",
    canvas: "25cm Round",
    difficulty: "Kids",
    usage: "Scheduled 7x this month",
    category: "kids",
  },
  {
    id: 8,
    titleJa: "花瓶のひまわり",
    titleEn: "Sunflowers Vase",
    duration: "2 hours",
    canvas: "F6",
    difficulty: "Intermediate",
    usage: "Scheduled 9x this month",
    category: "seasonal",
  },
]

function TemplateCard({ template }: { template: (typeof templateData)[0] }) {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-200">
      {/* Section 1 - Image */}
      <AspectRatio ratio={1}>
        <div className="bg-gray-200 rounded-t-lg w-full h-full flex items-center justify-center">
          <span className="text-4xl">🎨</span>
        </div>
      </AspectRatio>

      {/* Section 2 - Content */}
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{template.titleJa}</h3>
        <p className="text-sm text-gray-500 mb-3">{template.titleEn}</p>

        <div className="flex gap-2 mb-2">
          <Badge className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs hover:bg-blue-100">
            {template.duration}
          </Badge>
          <Badge className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs hover:bg-green-100">
            {template.canvas}
          </Badge>
          <Badge className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs hover:bg-purple-100">
            {template.difficulty}
          </Badge>
        </div>

        <p className="text-xs text-gray-400">{template.usage}</p>
      </CardContent>

      {/* Section 3 - Actions */}
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
    </Card>
  )
}

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Header Section */}
      <div className="h-16 flex justify-between items-center border-b border-gray-200">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Templates</h1>
          <Badge className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm hover:bg-gray-100">(24)</Badge>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Create New Template
        </Button>
      </div>

      {/* Filter Section */}
      <div className="mt-6 space-y-4">
        {/* Top Row - Search and Location */}
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

        {/* Bottom Row - Category Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="kids">Kids Only</TabsTrigger>
            <TabsTrigger value="masters">Master Artists</TabsTrigger>
            <TabsTrigger value="pouring">Paint Pouring</TabsTrigger>
            <TabsTrigger value="seasonal">Seasonal</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-8">
            {/* Main Content Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {templateData.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="kids" className="mt-8">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {templateData
                .filter((t) => t.category === "kids")
                .map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="masters" className="mt-8">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {templateData
                .filter((t) => t.category === "masters")
                .map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="pouring" className="mt-8">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {templateData
                .filter((t) => t.category === "pouring")
                .map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="seasonal" className="mt-8">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {templateData
                .filter((t) => t.category === "seasonal")
                .map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

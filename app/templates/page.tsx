"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Search } from "lucide-react"

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
              {/* Template cards will go here */}
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                Template Card 1
              </div>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                Template Card 2
              </div>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                Template Card 3
              </div>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                Template Card 4
              </div>
            </div>
          </TabsContent>

          <TabsContent value="kids" className="mt-8">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                Kids Template 1
              </div>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                Kids Template 2
              </div>
            </div>
          </TabsContent>

          <TabsContent value="masters" className="mt-8">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                Master Artist Template 1
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pouring" className="mt-8">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                Paint Pouring Template 1
              </div>
            </div>
          </TabsContent>

          <TabsContent value="seasonal" className="mt-8">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                Seasonal Template 1
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

"use client"

import * as React from "react"
import { Search, Calendar, Users, MapPin, FileText, Clock, User } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SearchResult {
  id: string
  title: string
  type: "template" | "event" | "instructor" | "location" | "user"
  description?: string
  url: string
  metadata?: {
    date?: string
    location?: string
    instructor?: string
    category?: string
  }
}

// Mock data - in a real app, this would come from your API
const mockSearchData: SearchResult[] = [
  {
    id: "1",
    title: "Sunset Landscape Painting",
    type: "template",
    description: "Beautiful sunset landscape perfect for beginners",
    url: "/templates/sunset-landscape",
    metadata: { category: "Landscape" },
  },
  {
    id: "2",
    title: "Abstract Art Workshop",
    type: "event",
    description: "Scheduled event for next week",
    url: "/schedule/abstract-workshop",
    metadata: { date: "Dec 15, 2024", location: "Ginza Studio", instructor: "Sarah Chen" },
  },
  {
    id: "3",
    title: "Sarah Chen",
    type: "instructor",
    description: "Master Artist specializing in Abstract and Modern art",
    url: "/instructors/sarah-chen",
    metadata: { category: "Abstract, Modern" },
  },
  {
    id: "4",
    title: "Ginza Studio",
    type: "location",
    description: "Premium downtown location with 30 seats",
    url: "/locations/ginza",
    metadata: { category: "Premium" },
  },
  {
    id: "5",
    title: "Watercolor Basics",
    type: "template",
    description: "Introduction to watercolor techniques",
    url: "/templates/watercolor-basics",
    metadata: { category: "Beginner" },
  },
  {
    id: "6",
    title: "Holiday Paint & Sip",
    type: "event",
    description: "Special holiday themed event",
    url: "/schedule/holiday-paint-sip",
    metadata: { date: "Dec 20, 2024", location: "Daikanyama Studio", instructor: "Mike Johnson" },
  },
  {
    id: "7",
    title: "Mike Johnson",
    type: "instructor",
    description: "Certified instructor with 5+ years experience",
    url: "/instructors/mike-johnson",
    metadata: { category: "Traditional, Landscape" },
  },
  {
    id: "8",
    title: "Cat Street Studio",
    type: "location",
    description: "Cozy studio in trendy Harajuku area",
    url: "/locations/cat-street",
    metadata: { category: "Boutique" },
  },
]

const getTypeIcon = (type: SearchResult["type"]) => {
  switch (type) {
    case "template":
      return <FileText className="h-4 w-4" />
    case "event":
      return <Calendar className="h-4 w-4" />
    case "instructor":
      return <User className="h-4 w-4" />
    case "location":
      return <MapPin className="h-4 w-4" />
    case "user":
      return <Users className="h-4 w-4" />
    default:
      return <Search className="h-4 w-4" />
  }
}

const getTypeBadgeColor = (type: SearchResult["type"]) => {
  switch (type) {
    case "template":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100"
    case "event":
      return "bg-green-100 text-green-800 hover:bg-green-100"
    case "instructor":
      return "bg-purple-100 text-purple-800 hover:bg-purple-100"
    case "location":
      return "bg-orange-100 text-orange-800 hover:bg-orange-100"
    case "user":
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }
}

interface GlobalSearchModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GlobalSearchModal({ open, onOpenChange }: GlobalSearchModalProps) {
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<SearchResult[]>([])

  // Simulate search functionality
  React.useEffect(() => {
    if (query.trim() === "") {
      setResults([])
      return
    }

    const filteredResults = mockSearchData.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase()) ||
        item.metadata?.category?.toLowerCase().includes(query.toLowerCase()) ||
        item.metadata?.instructor?.toLowerCase().includes(query.toLowerCase()) ||
        item.metadata?.location?.toLowerCase().includes(query.toLowerCase()),
    )

    setResults(filteredResults)
  }, [query])

  const handleResultClick = (result: SearchResult) => {
    // In a real app, you would navigate to the result URL
    console.log("Navigate to:", result.url)
    onOpenChange(false)
    setQuery("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onOpenChange(false)
      setQuery("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates, events, instructors, locations..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10"
              autoFocus
            />
          </div>

          {query.trim() !== "" && (
            <ScrollArea className="max-h-[400px]">
              <div className="space-y-2">
                {results.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No results found for "{query}"</p>
                  </div>
                ) : (
                  results.map((result) => (
                    <div
                      key={result.id}
                      className="p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => handleResultClick(result)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{getTypeIcon(result.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-sm truncate">{result.title}</h4>
                            <Badge variant="secondary" className={`text-xs ${getTypeBadgeColor(result.type)}`}>
                              {result.type}
                            </Badge>
                          </div>
                          {result.description && (
                            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{result.description}</p>
                          )}
                          {result.metadata && (
                            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                              {result.metadata.date && (
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {result.metadata.date}
                                </span>
                              )}
                              {result.metadata.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {result.metadata.location}
                                </span>
                              )}
                              {result.metadata.instructor && (
                                <span className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  {result.metadata.instructor}
                                </span>
                              )}
                              {result.metadata.category && <span>{result.metadata.category}</span>}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          )}

          {query.trim() === "" && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Start typing to search across templates, events, instructors, and locations</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

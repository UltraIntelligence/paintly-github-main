"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

interface Event {
  id: string
  title: string
  titleEn: string
  instructor: string
  date: string
  startTime: string
  endTime: string
  location: string
  duration: string
  difficulty: string
  canvasSize: string
  price: number
  capacity: number
  booked: number
  rating: number
  popularity: string
  category: string
  image: string
  status: string
}

interface CustomerEventCardProps {
  event: Event
  isFavorite: boolean
  onFavoriteToggle: (eventId: string) => void
  onEventClick: (event: Event) => void
}

export function CustomerEventCard({ event, isFavorite, onFavoriteToggle, onEventClick }: CustomerEventCardProps) {
  const getStatusBadge = (status: string, booked: number, capacity: number) => {
    switch (status) {
      case "sold-out":
        return <Badge className="bg-red-500 text-white text-xs px-2 py-1 rounded-lg">SOLD OUT</Badge>
      case "few-spots":
        return <Badge className="bg-orange-500 text-white text-xs px-2 py-1 rounded-lg">FEW SPOTS</Badge>
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const month = date.toLocaleDateString("en-US", { month: "short" })
    const day = date.getDate()
    return `${month} ${day}`
  }

  return (
    <Card
      className="group cursor-pointer border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white rounded-2xl overflow-hidden"
      onClick={() => onEventClick(event)}
    >
      <CardContent className="p-0">
        <div className="relative aspect-square">
          <img
            src={event.image || "/placeholder.svg"}
            alt={event.titleEn}
            className="w-full h-full object-cover rounded-lg"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onFavoriteToggle(event.id)
            }}
            className="absolute top-2 right-2 w-8 h-8 p-0 bg-white/90 hover:bg-white rounded-full shadow-sm"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </Button>
          <div className="absolute bottom-2 left-2">
            <Badge className="bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-lg">
              {formatDate(event.date).toUpperCase()}
            </Badge>
          </div>
        </div>
        <div className="p-3">
          <h3 className="text-sm font-bold text-gray-900 leading-tight mb-1 truncate">{event.title}</h3>
          <p className="text-xs text-gray-500 mb-2">with {event.instructor}</p>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">{event.startTime}</span>
            <span className="font-extrabold text-gray-900">¥{event.price.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

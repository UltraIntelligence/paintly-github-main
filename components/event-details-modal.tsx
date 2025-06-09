"use client"

import { useState } from "react"
import { format } from "date-fns"
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UsersIcon,
  PencilIcon,
  CalendarDaysIcon,
  XIcon,
  CheckIcon,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"

// Mock data for instructors
const instructors = {
  naomi: {
    name: "Naomi",
    avatar: "/images/cathy-avatar.png",
    specialty: "Watercolor & Impressionism",
    experience: "5 years",
  },
  momo: {
    name: "Momo",
    avatar: "/images/cathy-avatar.png",
    specialty: "Abstract & Contemporary",
    experience: "7 years",
  },
  yuki: {
    name: "Yuki Tanaka",
    avatar: "/images/cathy-avatar.png",
    specialty: "Traditional Japanese & Watercolor",
    experience: "10 years",
  },
  hiroshi: {
    name: "Hiroshi Sato",
    avatar: "/images/cathy-avatar.png",
    specialty: "Oil Painting & Post-Impressionism",
    experience: "8 years",
  },
}

// Mock data for locations
const locations = {
  daikanyama: {
    name: "Daikanyama",
    address: "1-2-3 Daikanyama, Shibuya-ku, Tokyo",
    capacity: 16,
  },
  catstreet: {
    name: "Cat Street",
    address: "4-5-6 Cat Street, Shibuya-ku, Tokyo",
    capacity: 12,
  },
  ginza: {
    name: "Ginza",
    address: "7-8-9 Ginza, Chuo-ku, Tokyo",
    capacity: 20,
  },
  shibuya: {
    name: "Shibuya",
    address: "10-11-12 Shibuya, Shibuya-ku, Tokyo",
    capacity: 18,
  },
  yokohama: {
    name: "Yokohama",
    address: "13-14-15 Minato Mirai, Yokohama-shi, Kanagawa",
    capacity: 14,
  },
}

// Helper function to get day name
const getDayName = (day: number) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  return days[day]
}

// Helper function to format time
const formatTime = (hour: number) => {
  const ampm = hour >= 12 ? "PM" : "AM"
  const formattedHour = hour % 12 || 12
  return `${formattedHour}:00 ${ampm}`
}

interface EventDetailsModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  event: any
}

export function EventDetailsModal({ isOpen, onOpenChange, event }: EventDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false)

  if (!event) return null

  const instructor = instructors[event.instructor] || instructors.naomi
  const location = locations[event.location] || locations.daikanyama

  // Calculate event date (mock data)
  const today = new Date()
  const eventDate = new Date(today)
  eventDate.setDate(today.getDate() + (event.day || 0))

  // Calculate event time
  const startTime = formatTime(event.startHour || 9)
  const endTime = formatTime((event.startHour || 9) + (event.duration || 2))

  // Calculate attendance percentage
  const attendancePercentage = Math.round((event.participants.current / event.participants.max) * 100)

  // Status styling
  const getStatusStyles = () => {
    switch (event.status) {
      case "Live":
        return "bg-green-100 text-green-800 border-green-300 animate-pulse"
      case "Scheduled":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "Completed":
        return "bg-gray-100 text-gray-800 border-gray-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden font-sans">
        <DialogHeader className="px-6 pt-6 pb-2">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold">{event.title}</DialogTitle>
              <DialogDescription className="text-base mt-1">{event.titleEn}</DialogDescription>
            </div>
          </div>

          <div className="flex items-center mt-4 text-sm text-muted-foreground">
            <CalendarIcon className="w-4 h-4 mr-2" />
            <span className="font-medium">{format(eventDate, "EEEE, MMMM d, yyyy")}</span>
            <span className="mx-2">•</span>
            <ClockIcon className="w-4 h-4 mr-2" />
            <span>
              {startTime} - {endTime}
            </span>
            <span className="mx-2">•</span>
            <span>{event.duration} hours</span>
          </div>
        </DialogHeader>

        <div className="px-6 py-4 grid gap-6">
          {/* Event Preview Card */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-md bg-blue-100 flex items-center justify-center">
                  <img
                    src={`/placeholder.svg?height=64&width=64&query=${encodeURIComponent(event.title)}`}
                    alt={event.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{event.titleEn}</p>
                  <div className="flex items-center mt-1 text-sm">
                    <MapPinIcon className="w-3.5 h-3.5 mr-1 text-muted-foreground" />
                    <span className="text-muted-foreground">{location.name}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instructor Section */}
          <div>
            <h3 className="text-sm font-medium mb-3">Instructor</h3>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={instructor.avatar || "/placeholder.svg"} alt={instructor.name} />
                    <AvatarFallback>{instructor.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{instructor.name}</p>
                    <p className="text-sm text-muted-foreground">{instructor.specialty}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Participants Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium">Participants</h3>
              <span className="text-sm text-muted-foreground">
                {event.participants.current}/{event.participants.max} spots filled
              </span>
            </div>
            <Progress value={attendancePercentage} className="h-2" />
            <div className="flex justify-between mt-2">
              <Button variant="outline" size="sm" className="text-xs h-8">
                <UsersIcon className="w-3.5 h-3.5 mr-1" />
                Manage Participants
              </Button>
              <Button variant="outline" size="sm" className="text-xs h-8">
                <CheckIcon className="w-3.5 h-3.5 mr-1" />
                Check In
              </Button>
            </div>
          </div>

          {/* Event Information */}
          <div>
            <h3 className="text-sm font-medium mb-3">Event Information</h3>
            <div className="grid grid-cols-2 gap-3">
              <Card>
                <CardContent className="p-3">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Location</span>
                    <span className="font-medium">{location.name}</span>
                    <span className="text-xs text-muted-foreground mt-1">{location.address}</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Session</span>
                    <span className="font-medium">{event.duration} hours</span>
                    <span className="text-xs text-muted-foreground mt-1">
                      {startTime} - {endTime}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Materials Section */}
          <div>
            <h3 className="text-sm font-medium mb-3">Materials Included</h3>
            <Card>
              <CardContent className="p-4">
                <ul className="text-sm space-y-2">
                  <li className="flex items-center">
                    <CheckIcon className="w-4 h-4 mr-2 text-green-500" />
                    Canvas (16" x 20")
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-4 h-4 mr-2 text-green-500" />
                    Acrylic Paint Set
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-4 h-4 mr-2 text-green-500" />
                    Brushes & Palette
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-4 h-4 mr-2 text-green-500" />
                    Apron & Easel
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t">
          <div className="flex justify-between w-full">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              <XIcon className="w-4 h-4 mr-2" />
              Close
            </Button>
            <div className="flex gap-2">
              <Button variant="outline">
                <CalendarDaysIcon className="w-4 h-4 mr-2" />
                Reschedule
              </Button>
              <Button>
                <PencilIcon className="w-4 h-4 mr-2" />
                Edit Event
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

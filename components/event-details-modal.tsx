"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface EventDetailsModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  event: {
    id: number
    title: string
    titleEn?: string
    instructor: string
    participants: { current: number; max: number }
    status: string
    day: number
    startHour: number
    duration: number
    location: string
  } | null
}

// Helper data - this should ideally come from your data layer
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const timeSlots = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
]

const instructors = [
  { id: "yuki", name: "Yuki Tanaka" },
  { id: "naomi", name: "Naomi" },
  { id: "luci", name: "Luci" },
  { id: "daria", name: "Daria" },
]

export function EventDetailsModal({ isOpen, onOpenChange, event }: EventDetailsModalProps) {
  if (!event) return null

  const instructor = instructors.find((i) => i.id === event.instructor)
  const startTime = timeSlots[event.startHour]
  const endTime =
    timeSlots[event.startHour + event.duration] ||
    `${Number.parseInt(timeSlots[event.startHour].split(":")[0]) + event.duration}:${timeSlots[event.startHour].split(":")[1]}`

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Event Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Event Title */}
          <div>
            <h3 className="text-lg font-semibold">
              {event.title}
              {event.titleEn && ` | ${event.titleEn}`}
            </h3>
          </div>

          {/* Status and Basic Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge
                className={
                  event.status === "Live"
                    ? "bg-blue-500 text-white animate-pulse"
                    : event.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : event.status === "Starting in 2 hours"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-amber-100 text-amber-700"
                }
              >
                {event.status}
              </Badge>
            </div>

            <div className="text-sm space-y-1">
              <div>
                <span className="font-medium">Time:</span> {days[event.day]}, May {19 + event.day} • {startTime}-
                {endTime}
              </div>
              <div>
                <span className="font-medium">Location:</span> Artbar {event.location}
              </div>
              <div>
                <span className="font-medium">Instructor:</span> {instructor?.name}
              </div>
            </div>
          </div>

          {/* Bookings */}
          <div className="space-y-3">
            <div>
              <div className="font-medium">
                Bookings: {event.participants.current}/{event.participants.max} participants
              </div>
              <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm">
                  View All Bookings
                </Button>
                <Button variant="outline" size="sm">
                  Add Walk-in
                </Button>
              </div>
            </div>
          </div>

          {/* Materials Included */}
          <div className="space-y-3">
            <h4 className="font-medium">Materials Included:</h4>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>• Canvas (F6 size)</li>
              <li>• Acrylic paints</li>
              <li>• Brushes and palette</li>
              <li>• Apron</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 pt-4">
            <Button variant="outline" size="sm">
              Edit Event
            </Button>
            <Button variant="outline" size="sm">
              Reschedule
            </Button>
            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
              Cancel Event
            </Button>
            <Button variant="outline" size="sm" onClick={() => onOpenChange(false)} className="ml-auto">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

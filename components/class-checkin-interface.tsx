"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, X } from "lucide-react"

interface Attendee {
  id: string
  name: string
  memberNumber: string
  age?: number
  notes: string[]
  specialTags: Array<{
    text: string
    type: "birthday" | "payment" | "dietary" | "vip" | "age"
    color?: string
  }>
  checkedIn: boolean
}

interface ClassCheckinInterfaceProps {
  className: string
  time: string
  location: string
  attendees: Attendee[]
  onCheckIn: (attendeeId: string) => void
  onClose?: () => void
  onSave?: () => void
}

export function ClassCheckinInterface({
  className,
  time,
  location,
  attendees,
  onCheckIn,
  onClose,
  onSave,
}: ClassCheckinInterfaceProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter attendees based on search query
  const filteredAttendees = attendees.filter(
    (attendee) =>
      attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) || attendee.memberNumber.includes(searchQuery),
  )

  const checkedInCount = attendees.filter((a) => a.checkedIn).length
  const totalCount = attendees.length

  const getTagColor = (type: string) => {
    switch (type) {
      case "birthday":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "payment":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "dietary":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "vip":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "age":
        return "bg-blue-500 text-white"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <Card className="w-full">
      {/* Header */}
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold">Class Check-In: {className}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {time} • {location}
            </p>
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Check-in progress</span>
          <span className="text-sm font-medium text-green-600">
            {checkedInCount} of {totalCount} checked in
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search attendees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>
      </CardHeader>

      {/* Attendee List */}
      <CardContent className="space-y-3">
        {filteredAttendees.map((attendee) => (
          <div
            key={attendee.id}
            className={`flex items-center justify-between p-4 border rounded-lg transition-all ${
              attendee.checkedIn ? "bg-gray-50 opacity-75" : "bg-white hover:bg-gray-50"
            }`}
          >
            {/* Attendee Info */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className={`font-medium ${attendee.checkedIn ? "text-gray-500" : "text-gray-900"}`}>
                  {attendee.name}
                </h4>
                {/* Age Badge */}
                {attendee.age && (
                  <Badge className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">+{attendee.age}</Badge>
                )}
              </div>

              <p className={`text-sm ${attendee.checkedIn ? "text-gray-400" : "text-muted-foreground"}`}>
                #{attendee.memberNumber}
              </p>

              {/* Special Tags */}
              {attendee.specialTags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {attendee.specialTags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className={`text-xs ${getTagColor(tag.type)} ${attendee.checkedIn ? "opacity-50" : ""}`}
                    >
                      {tag.text}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Check-in Button */}
            <Button
              variant={attendee.checkedIn ? "default" : "outline"}
              size="sm"
              onClick={() => onCheckIn(attendee.id)}
              className={`ml-4 min-w-[100px] h-10 ${
                attendee.checkedIn ? "bg-green-600 hover:bg-green-700 text-white" : "border-gray-300 hover:bg-gray-50"
              }`}
              disabled={attendee.checkedIn}
            >
              {attendee.checkedIn ? "Checked In" : "Tap to Check"}
            </Button>
          </div>
        ))}

        {filteredAttendees.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No attendees found matching "{searchQuery}"</p>
          </div>
        )}
      </CardContent>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between p-6 border-t bg-gray-50">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <div className="flex gap-2">
          <Button onClick={onSave} className="bg-black text-white hover:bg-gray-800">
            Save Data
          </Button>
        </div>
      </div>
    </Card>
  )
}

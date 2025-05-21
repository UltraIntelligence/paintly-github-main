"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample data for weekly events
const weeklyEventsData = [
  {
    day: "Today",
    date: "May 21",
    events: [
      {
        id: 1,
        title: "Family Fun Creative Canvas - Heart",
        time: "10:30 AM - 12:30 PM",
        booked: 21,
        capacity: 23,
        image: "/placeholder-3uwps.png",
      },
      {
        id: 2,
        title: "Family Fun Creative Canvas - Heart Pillow",
        time: "2:00 PM - 4:00 PM",
        booked: 18,
        capacity: 20,
        image: "/placeholder-ai4dk.png",
      },
    ],
  },
  {
    day: "Tomorrow",
    date: "May 22",
    events: [
      {
        id: 3,
        title: "Private Play Date Space Rental",
        time: "9:00 AM - 11:00 AM",
        booked: 8,
        capacity: 15,
        image: "/placeholder-okv7u.png",
      },
    ],
  },
  {
    day: "Wednesday",
    date: "May 23",
    events: [
      {
        id: 4,
        title: "Watercolor Landscapes",
        time: "1:00 PM - 3:30 PM",
        booked: 12,
        capacity: 15,
        image: "/placeholder-n76wq.png",
      },
      {
        id: 5,
        title: "Kids Pottery Class",
        time: "4:00 PM - 5:30 PM",
        booked: 10,
        capacity: 10,
        image: "/placeholder-tp709.png",
      },
    ],
  },
  {
    day: "Thursday",
    date: "May 24",
    events: [
      {
        id: 6,
        title: "Adult Acrylic Painting",
        time: "6:00 PM - 8:30 PM",
        booked: 7,
        capacity: 20,
        image: "/placeholder-tcgvz.png",
      },
    ],
  },
]

export function WeeklyEvents() {
  // Calculate total events
  const totalEvents = weeklyEventsData.reduce((sum, day) => sum + day.events.length, 0)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">{totalEvents} events this week</CardTitle>
        <a href="#" className="text-sm text-primary hover:underline">
          View all
        </a>
      </CardHeader>
      <CardContent>
        <div className="max-h-[400px] overflow-auto pr-1">
          {weeklyEventsData.map((day) => (
            <div key={day.day} className="mb-4">
              <h3 className="mb-2 font-medium">
                {day.day}, {day.date}
              </h3>
              <div className="space-y-3">
                {day.events.map((event) => {
                  const bookingPercentage = Math.round((event.booked / event.capacity) * 100)
                  let statusColor = "text-red-500"
                  let bgColor = "bg-red-500"

                  if (bookingPercentage >= 40 && bookingPercentage < 70) {
                    statusColor = "text-yellow-500"
                    bgColor = "bg-yellow-500"
                  } else if (bookingPercentage >= 70) {
                    statusColor = "text-green-500"
                    bgColor = "bg-green-500"
                  }

                  const isFullyBooked = event.booked === event.capacity

                  return (
                    <div key={event.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-md">
                          <img
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <div className="flex flex-col text-sm text-muted-foreground sm:flex-row sm:gap-2">
                            <span>{event.time}</span>
                            <span className="hidden sm:inline">•</span>
                            <span>
                              {event.booked} of {event.capacity} booked
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center">
                        {isFullyBooked ? (
                          <Check className="h-6 w-6 text-green-500" />
                        ) : (
                          <div className="relative h-10 w-10">
                            <Circle className="h-10 w-10 stroke-[0.5] text-muted-foreground/30" />
                            <svg className="absolute inset-0" viewBox="0 0 100 100" width="40" height="40">
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="none"
                                stroke={bgColor}
                                strokeWidth="8"
                                strokeDasharray={`${bookingPercentage * 2.51} 251`}
                                strokeLinecap="round"
                                transform="rotate(-90 50 50)"
                              />
                            </svg>
                            <span
                              className={cn(
                                "absolute inset-0 flex items-center justify-center text-xs font-medium",
                                statusColor,
                              )}
                            >
                              {bookingPercentage}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

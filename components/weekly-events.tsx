import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

const events = [
  {
    day: "Today",
    date: "May 1",
    events: [
      {
        title: "Family Fun Creative Canvas - Heart",
        time: "3:00 PM - 5:00 PM",
        booked: 5,
        capacity: 10,
        percentComplete: 50,
      },
      {
        title: "Family Fun Creative Canvas - Heart Flare",
        time: "6:00 PM - 8:00 PM",
        booked: 12,
        capacity: 15,
        percentComplete: 80,
      },
    ],
  },
  {
    day: "Tomorrow",
    date: "May 2",
    events: [
      {
        title: "Private Play Date Special Rental",
        time: "10:00 AM - 12:00 PM",
        booked: 8,
        capacity: 10,
        percentComplete: 80,
      },
    ],
  },
]

export function WeeklyEvents() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
        <h3 className="text-lg font-semibold text-gray-900">18 events this week</h3>
        <Button variant="ghost" size="sm" className="text-sm text-gray-500 hover:text-gray-900">
          View all <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-6">
          {events.map((day, dayIndex) => (
            <div key={dayIndex}>
              <div className="flex items-center mb-2">
                <h4 className="text-sm font-medium text-gray-900">{day.day}</h4>
                <span className="text-xs text-gray-500 ml-1">• {day.date}</span>
              </div>
              <div className="space-y-3">
                {day.events.map((event, eventIndex) => (
                  <div key={eventIndex} className="flex items-center bg-gray-50 rounded-lg p-3">
                    <div className="bg-blue-100 rounded-lg w-10 h-10 flex items-center justify-center mr-3">
                      <span className="text-blue-600 text-xs font-medium">FC</span>
                    </div>
                    <div className="flex-1">
                      <h5 className="text-sm font-medium text-gray-900">{event.title}</h5>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <span>{event.time}</span>
                        <span className="mx-1">•</span>
                        <span>
                          {event.booked} of {event.capacity} booked
                        </span>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-gray-100">
                      <span className="text-xs font-medium text-gray-900">{event.percentComplete}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

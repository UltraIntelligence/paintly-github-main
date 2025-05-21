import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
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
        image: "gradient-1",
      },
      {
        id: 2,
        title: "Family Fun Creative Canvas - Heart Pillow",
        time: "2:00 PM - 4:00 PM",
        booked: 18,
        capacity: 20,
        image: "gradient-2",
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
        image: "gradient-3",
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
        image: "gradient-4",
      },
      {
        id: 5,
        title: "Kids Pottery Class",
        time: "4:00 PM - 5:30 PM",
        booked: 10,
        capacity: 10,
        image: "gradient-5",
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
        image: "gradient-6",
      },
    ],
  },
]

// Function to generate gradient background for event images
const getGradientStyle = (gradientType: string) => {
  const gradients = {
    "gradient-1": "bg-gradient-to-br from-blue-400 to-indigo-600",
    "gradient-2": "bg-gradient-to-br from-pink-400 to-rose-600",
    "gradient-3": "bg-gradient-to-br from-amber-400 to-orange-600",
    "gradient-4": "bg-gradient-to-br from-emerald-400 to-green-600",
    "gradient-5": "bg-gradient-to-br from-purple-400 to-violet-600",
    "gradient-6": "bg-gradient-to-br from-red-400 to-rose-600",
    "gradient-7": "bg-gradient-to-br from-cyan-400 to-blue-600",
    "gradient-8": "bg-gradient-to-br from-yellow-400 to-amber-600",
  }

  return gradients[gradientType as keyof typeof gradients] || "bg-gray-200"
}

export function WeeklyEvents() {
  // Calculate total events
  const totalEvents = weeklyEventsData.reduce((sum, day) => sum + day.events.length, 0)

  return (
    <div className="bg-gray-50 rounded-lg p-4 h-full flex flex-col">
      <div className="overflow-hidden flex-grow">
        <div className="h-[300px] overflow-y-auto pr-2 -mr-2">
          <Table>
            <TableHeader className="sticky top-0 bg-gray-50 z-10">
              <TableRow className="border-b border-gray-200">
                <TableHead className="w-[80px] text-xs text-gray-500">Event</TableHead>
                <TableHead className="text-xs text-gray-500">Details</TableHead>
                <TableHead className="hidden md:table-cell text-xs text-gray-500">Day</TableHead>
                <TableHead className="text-right text-xs text-gray-500">Capacity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {weeklyEventsData.flatMap((dayData) =>
                dayData.events.map((event) => {
                  const bookingPercentage = Math.round((event.booked / event.capacity) * 100)
                  const isFullyBooked = event.booked === event.capacity

                  return (
                    <TableRow key={event.id} className="border-b border-gray-200">
                      <TableCell className="align-top py-3">
                        <div className="flex flex-col items-center space-y-1">
                          <div className={`w-12 h-12 rounded-md ${getGradientStyle(event.image)}`}></div>
                          <span className="text-xs text-gray-500 whitespace-nowrap">{event.time.split(" - ")[0]}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm font-medium text-gray-900">
                        <div>{event.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{event.time}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-gray-600">
                        <span className="font-medium">{dayData.day}</span>
                        <span className="text-xs text-gray-500 block">{dayData.date}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={isFullyBooked ? "destructive" : "outline"}
                          className={
                            isFullyBooked
                              ? "bg-red-100 text-red-700 hover:bg-red-100 hover:text-red-700"
                              : bookingPercentage > 80
                                ? "bg-amber-100 text-amber-700 hover:bg-amber-100 hover:text-amber-700"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-100 hover:text-gray-700"
                          }
                        >
                          {event.booked}/{event.capacity}
                        </Badge>
                        <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className={cn(
                              "h-1.5 rounded-full",
                              isFullyBooked ? "bg-red-500" : bookingPercentage > 80 ? "bg-amber-500" : "bg-blue-500",
                            )}
                            style={{ width: `${bookingPercentage}%` }}
                          ></div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                }),
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-gray-200">
        <button className="text-xs text-blue-600 w-full flex items-center justify-center">
          View all upcoming events
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

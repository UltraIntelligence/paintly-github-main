import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Expanded sample data for today's events
const todaysEvents = [
  {
    time: "8:30 AM",
    name: "Beginner Sketching",
    instructor: "David Lee",
    location: "Studio C",
    booked: 8,
    capacity: 12,
    image: "gradient-1",
  },
  {
    time: "10:00 AM",
    name: "Morning Watercolor",
    instructor: "Sarah Chen",
    location: "Studio A",
    booked: 12,
    capacity: 15,
    image: "gradient-2",
  },
  {
    time: "11:30 AM",
    name: "Portrait Drawing",
    instructor: "Michael Johnson",
    location: "Studio B",
    booked: 10,
    capacity: 15,
    image: "gradient-3",
  },
  {
    time: "1:00 PM",
    name: "Lunch & Learn: Art History",
    instructor: "Emily Rodriguez",
    location: "Lecture Hall",
    booked: 25,
    capacity: 30,
    image: "gradient-4",
  },
  {
    time: "2:00 PM",
    name: "Abstract Acrylics",
    instructor: "James Wilson",
    location: "Studio B",
    booked: 18,
    capacity: 20,
    image: "gradient-5",
  },
  {
    time: "3:30 PM",
    name: "Kids Craft Corner",
    instructor: "Lisa Thompson",
    location: "Children's Studio",
    booked: 15,
    capacity: 15,
    image: "gradient-6",
  },
  {
    time: "4:45 PM",
    name: "Digital Art Basics",
    instructor: "Alex Kim",
    location: "Tech Lab",
    booked: 12,
    capacity: 16,
    image: "gradient-7",
  },
  {
    time: "5:30 PM",
    name: "Sculpture Workshop",
    instructor: "Robert Chen",
    location: "Sculpture Garden",
    booked: 8,
    capacity: 10,
    image: "gradient-8",
  },
  {
    time: "6:30 PM",
    name: "Evening Wine & Paint",
    instructor: "Maria Garcia",
    location: "Main Gallery",
    booked: 24,
    capacity: 24,
    image: "gradient-1",
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

export function TodaysEvents() {
  return (
    <div className="bg-gray-50 rounded-lg p-4 h-full flex flex-col">
      <div className="overflow-hidden flex-grow">
        <div className="h-[280px] overflow-y-auto pr-2 -mr-2">
          <Table>
            <TableHeader className="sticky top-0 bg-gray-50 z-10">
              <TableRow className="border-b border-gray-200">
                <TableHead className="w-[80px] text-xs text-gray-500">Event</TableHead>
                <TableHead className="text-xs text-gray-500">Details</TableHead>
                <TableHead className="hidden md:table-cell text-xs text-gray-500">Instructor</TableHead>
                <TableHead className="hidden md:table-cell text-xs text-gray-500">Location</TableHead>
                <TableHead className="text-right text-xs text-gray-500">Capacity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {todaysEvents.map((event) => (
                <TableRow key={`${event.time}-${event.name}`} className="border-b border-gray-200">
                  <TableCell className="align-top py-2">
                    <div className="flex flex-col items-center space-y-1">
                      <div className={`w-12 h-12 rounded-md ${getGradientStyle(event.image)}`}></div>
                      <span className="text-xs text-gray-500 whitespace-nowrap">{event.time}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-gray-900">{event.name}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-gray-600">{event.instructor}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-gray-600">{event.location}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={event.booked === event.capacity ? "destructive" : "outline"}
                      className={
                        event.booked === event.capacity
                          ? "bg-red-100 text-red-700 hover:bg-red-100 hover:text-red-700"
                          : event.booked / event.capacity > 0.8
                            ? "bg-amber-100 text-amber-700 hover:bg-amber-100 hover:text-amber-700"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-100 hover:text-gray-700"
                      }
                    >
                      {event.booked}/{event.capacity}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-gray-200">
        <button className="text-xs text-blue-600 w-full flex items-center justify-center">
          View all events
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

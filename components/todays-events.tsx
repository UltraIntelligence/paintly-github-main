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
  },
  {
    time: "10:00 AM",
    name: "Morning Watercolor",
    instructor: "Sarah Chen",
    location: "Studio A",
    booked: 12,
    capacity: 15,
  },
  {
    time: "11:30 AM",
    name: "Portrait Drawing",
    instructor: "Michael Johnson",
    location: "Studio B",
    booked: 10,
    capacity: 15,
  },
  {
    time: "1:00 PM",
    name: "Lunch & Learn: Art History",
    instructor: "Emily Rodriguez",
    location: "Lecture Hall",
    booked: 25,
    capacity: 30,
  },
  {
    time: "2:00 PM",
    name: "Abstract Acrylics",
    instructor: "James Wilson",
    location: "Studio B",
    booked: 18,
    capacity: 20,
  },
  {
    time: "3:30 PM",
    name: "Kids Craft Corner",
    instructor: "Lisa Thompson",
    location: "Children's Studio",
    booked: 15,
    capacity: 15,
  },
  {
    time: "4:45 PM",
    name: "Digital Art Basics",
    instructor: "Alex Kim",
    location: "Tech Lab",
    booked: 12,
    capacity: 16,
  },
  {
    time: "5:30 PM",
    name: "Sculpture Workshop",
    instructor: "Robert Chen",
    location: "Sculpture Garden",
    booked: 8,
    capacity: 10,
  },
  {
    time: "6:30 PM",
    name: "Evening Wine & Paint",
    instructor: "Maria Garcia",
    location: "Main Gallery",
    booked: 24,
    capacity: 24,
  },
]

export function TodaysEvents() {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="overflow-hidden">
        <div className="max-h-[320px] overflow-y-auto pr-2 -mr-2">
          <Table>
            <TableHeader className="sticky top-0 bg-gray-50 z-10">
              <TableRow className="border-b border-gray-200">
                <TableHead className="w-[100px] text-xs text-gray-500">Time</TableHead>
                <TableHead className="text-xs text-gray-500">Event</TableHead>
                <TableHead className="hidden md:table-cell text-xs text-gray-500">Instructor</TableHead>
                <TableHead className="hidden md:table-cell text-xs text-gray-500">Location</TableHead>
                <TableHead className="text-right text-xs text-gray-500">Capacity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {todaysEvents.map((event) => (
                <TableRow key={`${event.time}-${event.name}`} className="border-b border-gray-200">
                  <TableCell className="text-sm text-gray-600">{event.time}</TableCell>
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
    </div>
  )
}

import { CalendarDaysIcon } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Sample data for today's events
const todaysEvents = [
  {
    time: "10:00 AM",
    name: "Morning Watercolor",
    instructor: "Sarah Chen",
    location: "Studio A",
    booked: 12,
    capacity: 15,
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
    time: "6:30 PM",
    name: "Evening Wine & Paint",
    instructor: "Maria Garcia",
    location: "Main Gallery",
    booked: 24,
    capacity: 24,
  },
]

interface TodaysEventsProps {
  hideTitle?: boolean
}

export function TodaysEvents({ hideTitle = false }: TodaysEventsProps) {
  return (
    <div>
      {!hideTitle && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Today's Events</h3>
          <CalendarDaysIcon className="h-4 w-4 text-gray-500" />
        </div>
      )}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-xs text-gray-500">Time</TableHead>
                <TableHead className="text-xs text-gray-500">Event</TableHead>
                <TableHead className="hidden md:table-cell text-xs text-gray-500">Instructor</TableHead>
                <TableHead className="hidden md:table-cell text-xs text-gray-500">Location</TableHead>
                <TableHead className="text-right text-xs text-gray-500">Capacity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {todaysEvents.map((event) => (
                <TableRow key={`${event.time}-${event.name}`} className="border-b border-gray-100">
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

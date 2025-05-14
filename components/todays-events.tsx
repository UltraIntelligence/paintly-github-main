import { CalendarDaysIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

export function TodaysEvents() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Today's Events</CardTitle>
        <CalendarDaysIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Time</TableHead>
              <TableHead>Event</TableHead>
              <TableHead className="hidden md:table-cell">Instructor</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead className="text-right">Capacity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todaysEvents.map((event) => (
              <TableRow key={`${event.time}-${event.name}`}>
                <TableCell className="text-muted-foreground">{event.time}</TableCell>
                <TableCell className="font-medium">{event.name}</TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">{event.instructor}</TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">{event.location}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={event.booked === event.capacity ? "destructive" : "outline"} className="ml-auto">
                    {event.booked}/{event.capacity}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

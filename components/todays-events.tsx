import { CalendarDaysIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
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
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">Today's Events</h2>
            <p className="text-sm text-muted-foreground">Schedule for today</p>
          </div>
          <CalendarDaysIcon className="h-5 w-5 text-primary" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-xs">Time</TableHead>
              <TableHead className="text-xs">Event</TableHead>
              <TableHead className="hidden md:table-cell text-xs">Instructor</TableHead>
              <TableHead className="hidden md:table-cell text-xs">Location</TableHead>
              <TableHead className="text-right text-xs">Capacity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todaysEvents.map((event) => (
              <TableRow key={`${event.time}-${event.name}`}>
                <TableCell className="text-sm">{event.time}</TableCell>
                <TableCell className="text-sm font-medium">{event.name}</TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{event.instructor}</TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{event.location}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant={event.booked === event.capacity ? "destructive" : "outline"}
                    className={
                      event.booked === event.capacity
                        ? "bg-red-100 text-red-700 hover:bg-red-100 hover:text-red-700"
                        : "bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground"
                    }
                  >
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

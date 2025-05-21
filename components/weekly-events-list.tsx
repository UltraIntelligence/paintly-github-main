import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface EventProps {
  name: string
  time: string
  booked: number
  capacity: number
  percentage: number
  day: string
}

function EventItem({ name, time, booked, capacity, percentage, day }: EventProps) {
  return (
    <div className="space-y-2 py-3">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium">{name}</h4>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{time}</span>
            <span>•</span>
            <span>
              {booked} of {capacity} booked
            </span>
          </div>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
          {percentage}%
        </div>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-primary/10">
        <div className="h-full bg-primary" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  )
}

export function WeeklyEventsList() {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const formatDay = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">18 events this week</CardTitle>
        <Button variant="ghost" size="sm" className="gap-1">
          View all <ChevronRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="max-h-[400px] overflow-auto">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Today, {formatDay(today)}</h3>
          <EventItem
            name="Family Fun Creative Canvas - Heart"
            time="2:00 PM - 3:30 PM"
            booked={5}
            capacity={10}
            percentage={50}
            day="Today"
          />
          <EventItem
            name="Family Fun Creative Canvas - Heart Flare"
            time="4:00 PM - 5:30 PM"
            booked={7}
            capacity={12}
            percentage={58}
            day="Today"
          />
        </div>

        <div className="mt-4 space-y-1">
          <h3 className="text-sm font-medium">Tomorrow, {formatDay(tomorrow)}</h3>
          <EventItem
            name="Private Play Date Special Rental"
            time="10:00 AM - 12:00 PM"
            booked={8}
            capacity={8}
            percentage={100}
            day="Tomorrow"
          />
          <EventItem
            name="Sunset Beach Scene"
            time="6:00 PM - 8:00 PM"
            booked={12}
            capacity={15}
            percentage={80}
            day="Tomorrow"
          />
          <EventItem
            name="Kids Safari Adventure"
            time="3:30 PM - 5:00 PM"
            booked={6}
            capacity={12}
            percentage={50}
            day="Tomorrow"
          />
        </div>
      </CardContent>
    </Card>
  )
}

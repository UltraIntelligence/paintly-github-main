import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRightIcon } from "lucide-react"

interface EventCardProps {
  name: string
  time: string
  booked: number
  capacity: number
  percentage: number
  day?: string
}

function EventCard({ name, time, booked, capacity, percentage, day }: EventCardProps) {
  return (
    <div className="flex flex-col space-y-2 py-3">
      {day && (
        <div className="flex items-center gap-2 mb-1">
          <p className="text-sm font-medium">{day}</p>
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="font-medium">{name}</p>
          <div className="flex flex-col text-sm text-muted-foreground">
            <span>{time}</span>
            <span>
              {booked} of {capacity} booked
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xs font-medium text-primary">{percentage}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function WeeklyEvents() {
  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">18 events this week</CardTitle>
        <Button variant="ghost" size="sm" className="gap-1 text-primary hover:text-primary/80">
          View all
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 max-h-[320px] overflow-y-auto pr-2">
          <p className="text-sm font-medium text-muted-foreground mb-2">Today, May 21</p>
          <EventCard
            name="Family Fun Creative Canvas - Heart"
            time="2:00 PM - 4:00 PM"
            booked={5}
            capacity={10}
            percentage={50}
          />
          <EventCard
            name="Family Fun Creative Canvas - Heart Flare"
            time="5:00 PM - 7:00 PM"
            booked={12}
            capacity={15}
            percentage={80}
          />
          <p className="text-sm font-medium text-muted-foreground mt-4 mb-2">Tomorrow, May 22</p>
          <EventCard
            name="Private Play Date Special Rental"
            time="10:00 AM - 12:00 PM"
            booked={8}
            capacity={12}
            percentage={66}
          />
          <EventCard
            name="Watercolor Basics Workshop"
            time="1:00 PM - 3:00 PM"
            booked={6}
            capacity={8}
            percentage={75}
          />
          <EventCard name="Evening Paint & Sip" time="7:00 PM - 9:00 PM" booked={15} capacity={20} percentage={75} />
        </div>
      </CardContent>
    </Card>
  )
}

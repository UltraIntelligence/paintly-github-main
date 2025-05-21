import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, CheckCircle, AlertCircle, CreditCard, Calendar } from "lucide-react"

interface ActivityProps {
  type: "booked" | "declined" | "review" | "reminder"
  description: string
  time: string
  event?: string
}

function ActivityItem({ type, description, time, event }: ActivityProps) {
  const getIcon = () => {
    switch (type) {
      case "booked":
        return <CheckCircle className="h-5 w-5 text-emerald-500" />
      case "declined":
        return <CreditCard className="h-5 w-5 text-rose-500" />
      case "review":
        return <Calendar className="h-5 w-5 text-amber-500" />
      case "reminder":
        return <AlertCircle className="h-5 w-5 text-blue-500" />
    }
  }

  return (
    <div className="flex items-start gap-3 py-3">
      <div className="mt-0.5">{getIcon()}</div>
      <div className="space-y-1">
        <p className="font-medium">{description}</p>
        <div className="flex flex-col text-sm text-muted-foreground">
          <span>{time}</span>
          {event && <span>{event}</span>}
        </div>
      </div>
    </div>
  )
}

export function ActivityFeed() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Last Activity</CardTitle>
        <Button variant="ghost" size="sm" className="gap-1">
          View all <ChevronRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="max-h-[400px] overflow-auto">
        <div className="space-y-1">
          <ActivityItem
            type="booked"
            description="Event booked"
            time="2 mins ago"
            event="Family Fun Creative Canvas - Heart"
          />
          <ActivityItem
            type="declined"
            description="Card Declined"
            time="7 mins ago"
            event="Family Fun Creative Canvas - Heart"
          />
          <ActivityItem type="booked" description="Event booked" time="15 mins ago" event="Kids Safari Adventure" />
          <ActivityItem
            type="review"
            description="New Positive Review"
            time="1 hour ago"
            event="Family Fun Creative Canvas - Heart"
          />
          <ActivityItem
            type="reminder"
            description="Payment reminder sent"
            time="2 hours ago"
            event="Private Play Date Special Rental"
          />
          <ActivityItem type="booked" description="Event booked" time="3 hours ago" event="Sunset Beach Scene" />
        </div>
      </CardContent>
    </Card>
  )
}

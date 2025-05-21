import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRightIcon, CheckCircleIcon, XCircleIcon, EyeIcon, StarIcon } from "lucide-react"

interface ActivityItemProps {
  type: "booked" | "declined" | "review" | "viewed"
  description: string
  time: string
  event: string
}

function ActivityItem({ type, description, time, event }: ActivityItemProps) {
  const getIconClass = () => {
    switch (type) {
      case "booked":
        return "text-chart-1"
      case "declined":
        return "text-destructive"
      case "review":
        return "text-chart-4"
      case "viewed":
        return "text-chart-2"
    }
  }

  const getIcon = () => {
    switch (type) {
      case "booked":
        return <CheckCircleIcon className={`h-5 w-5 ${getIconClass()}`} />
      case "declined":
        return <XCircleIcon className={`h-5 w-5 ${getIconClass()}`} />
      case "review":
        return <StarIcon className={`h-5 w-5 ${getIconClass()}`} />
      case "viewed":
        return <EyeIcon className={`h-5 w-5 ${getIconClass()}`} />
    }
  }

  return (
    <div className="flex items-start gap-3 py-3">
      <div className="mt-0.5">{getIcon()}</div>
      <div className="space-y-1">
        <p className="font-medium">{description}</p>
        <p className="text-sm text-muted-foreground">{time}</p>
        <p className="text-sm text-muted-foreground">{event}</p>
      </div>
    </div>
  )
}

export function ActivityFeed() {
  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Last Activity</CardTitle>
        <Button variant="ghost" size="sm" className="gap-1 text-primary hover:text-primary/80">
          View all
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 max-h-[320px] overflow-y-auto pr-2">
          <ActivityItem
            type="booked"
            description="Event booked"
            time="2 mins ago"
            event="Family Fun Creative Canvas - Heart"
          />
          <ActivityItem
            type="declined"
            description="Card Declined"
            time="5 mins ago"
            event="Family Fun Creative Canvas - Heart"
          />
          <ActivityItem
            type="booked"
            description="Event booked"
            time="10 mins ago"
            event="Family Fun Creative Canvas - Heart"
          />
          <ActivityItem
            type="booked"
            description="Event booked"
            time="15 mins ago"
            event="Family Fun Creative Canvas - Heart"
          />
          <ActivityItem
            type="review"
            description="New Positive Review"
            time="1 hour ago"
            event="Family Fun Creative Canvas - Heart"
          />
        </div>
      </CardContent>
    </Card>
  )
}

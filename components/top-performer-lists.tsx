import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function TopPerformerLists() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 lg:px-6 pb-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Most Popular Events (Last 30 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-4">
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                  1
                </span>
                <span className="text-sm font-medium">Starry Night Recreation</span>
              </div>
              <span className="text-sm text-muted-foreground">58 Bookings</span>
            </li>
            <Separator />
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                  2
                </span>
                <span className="text-sm font-medium">Cherry Blossoms by the River</span>
              </div>
              <span className="text-sm text-muted-foreground">45 Bookings</span>
            </li>
            <Separator />
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                  3
                </span>
                <span className="text-sm font-medium">Kids Safari Adventure</span>
              </div>
              <span className="text-sm text-muted-foreground">32 Bookings</span>
            </li>
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Busiest Upcoming Days (Next 14 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-4">
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                  1
                </span>
                <span className="text-sm font-medium">Saturday, May 25th</span>
              </div>
              <span className="text-sm font-medium text-primary">95% Booked</span>
            </li>
            <Separator />
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                  2
                </span>
                <span className="text-sm font-medium">Friday, May 24th</span>
              </div>
              <span className="text-sm font-medium text-primary">80% Booked</span>
            </li>
            <Separator />
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                  3
                </span>
                <span className="text-sm font-medium">Sunday, May 26th</span>
              </div>
              <span className="text-sm font-medium text-primary">70% Booked</span>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}

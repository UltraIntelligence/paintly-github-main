import { TrendingUpIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ThisWeekStats() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card className="@container/card">
        <CardHeader className="relative pb-2">
          <CardDescription>Total Bookings</CardDescription>
          <CardTitle className="text-2xl font-semibold">78</CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +15%
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="text-xs text-muted-foreground">Compared to previous week</CardContent>
      </Card>

      <Card className="@container/card">
        <CardHeader className="relative pb-2">
          <CardDescription>Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold">$4,250</CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +8%
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="text-xs text-muted-foreground">Compared to previous week</CardContent>
      </Card>

      <Card className="@container/card">
        <CardHeader className="relative pb-2">
          <CardDescription>New Customers</CardDescription>
          <CardTitle className="text-2xl font-semibold">23</CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +12%
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="text-xs text-muted-foreground">First-time bookings this week</CardContent>
      </Card>
    </div>
  )
}

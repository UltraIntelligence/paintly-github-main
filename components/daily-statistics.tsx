import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: string
  change: string
  isPositive: boolean
}

function StatCard({ title, value, change, isPositive }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-2xl font-bold">{value}</p>
            <p className={`text-xs ${isPositive ? "text-green-500" : "text-red-500"}`}>
              {isPositive ? "↑" : "↓"} {change} compared to yesterday
            </p>
          </div>
          <div className="h-16 w-12 flex items-end">
            {/* Simple vertical bar chart */}
            <div className="w-2 h-8 bg-primary/20 rounded-t-sm mx-0.5"></div>
            <div className="w-2 h-10 bg-primary/30 rounded-t-sm mx-0.5"></div>
            <div className="w-2 h-6 bg-primary/20 rounded-t-sm mx-0.5"></div>
            <div className="w-2 h-12 bg-primary/40 rounded-t-sm mx-0.5"></div>
            <div className="w-2 h-16 bg-primary rounded-t-sm mx-0.5"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function DailyStatistics() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Daily Statistics</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Sales Value" value="$3,560.00" change="5.65%" isPositive={true} />
        <StatCard title="Number of Orders" value="423" change="3.65%" isPositive={true} />
        <StatCard title="Storefront Views" value="4,224" change="9.25%" isPositive={true} />
        <StatCard title="Booking Views" value="1,245" change="2.15%" isPositive={false} />
      </div>
    </div>
  )
}

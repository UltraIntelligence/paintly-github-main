import { ArrowUpIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function ThisWeekStats() {
  // Sample metrics data
  const metrics = [
    {
      label: "Total Bookings",
      value: "78",
      change: "+15%",
      description: "Compared to previous week",
      trend: "up",
    },
    {
      label: "Revenue",
      value: "$4,250",
      change: "+8%",
      description: "Compared to previous week",
      trend: "up",
    },
    {
      label: "New Customers",
      value: "23",
      change: "+12%",
      description: "First-time bookings this week",
      trend: "up",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 lg:px-6">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardContent className="p-0">
            <div className="flex flex-col space-y-1">
              <p className="text-xs text-gray-500">{metric.label}</p>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>

              <div className="flex items-center space-x-1">
                <div className="inline-flex items-center px-1.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-700">
                  <ArrowUpIcon className="h-3 w-3 mr-1" />
                  {metric.change}
                </div>
              </div>

              <p className="text-sm text-gray-600">{metric.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

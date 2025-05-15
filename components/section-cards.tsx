import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

export function SectionCards() {
  // Sample metrics data
  const metrics = [
    {
      label: "Upcoming Bookings",
      value: "78 Tickets",
      change: "+15%",
      description: "¥351,000 Est. Revenue",
      trend: "up",
    },
    {
      label: "Revenue",
      value: "¥1,250,000",
      change: "-5%",
      description: "Target: ¥1,500,000",
      trend: "down",
    },
    {
      label: "Avg Class Occupancy",
      value: "72%",
      change: "+7%",
      description: "vs 65% previous",
      trend: "up",
    },
    {
      label: "New Inquiries",
      value: "5",
      change: "New",
      description: "Corporate event inquiries",
      trend: "neutral",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 lg:px-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="shadow-lg">
          <CardContent className="p-0">
            <div className="flex flex-col space-y-1">
              <p className="text-xs text-gray-500">{metric.label}</p>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>

              <div className="flex items-center space-x-1">
                <div
                  className={`
                    inline-flex items-center px-1.5 py-0.5 rounded-full text-sm font-medium
                    ${
                      metric.trend === "up"
                        ? "bg-green-100 text-green-700"
                        : metric.trend === "down"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                    }
                  `}
                >
                  {metric.trend === "up" && <ArrowUpIcon className="h-3 w-3 mr-1" />}
                  {metric.trend === "down" && <ArrowDownIcon className="h-3 w-3 mr-1" />}
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

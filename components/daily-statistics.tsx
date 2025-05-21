import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpIcon } from "lucide-react"

const statistics = [
  {
    label: "Sales Value",
    value: "$3,560.00",
    change: "+5.65%",
    trend: "up",
  },
  {
    label: "Number of Orders",
    value: "423",
    change: "+3.85%",
    trend: "up",
  },
  {
    label: "Storefront Views",
    value: "4,224",
    change: "+7.65%",
    trend: "up",
  },
  {
    label: "Booking Views",
    value: "1,245",
    change: "+2.15%",
    trend: "up",
  },
]

export function DailyStatistics() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Daily Statistics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statistics.map((stat, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-1">
                    <ArrowUpIcon className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-xs font-medium text-green-600">{stat.change}</span>
                    <span className="text-xs text-gray-500 ml-1">vs yesterday</span>
                  </div>
                </div>
                <div className="h-12 w-6 flex items-end">
                  <div className="w-2 h-8 bg-blue-100 rounded-sm relative overflow-hidden">
                    <div className="absolute bottom-0 w-full bg-blue-500 rounded-sm" style={{ height: "60%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

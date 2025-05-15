import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

// Sample metrics data
const metrics = [
  {
    label: "Total Revenue",
    value: "$45,231",
    change: "+12.5%",
    description: "Compared to last month",
    trend: "up",
  },
  {
    label: "New Customers",
    value: "2,845",
    change: "+18.2%",
    description: "Compared to last month",
    trend: "up",
  },
  {
    label: "Active Sessions",
    value: "16,273",
    change: "-3.1%",
    description: "Compared to last month",
    trend: "down",
  },
  {
    label: "Conversion Rate",
    value: "3.2%",
    change: "0.0%",
    description: "Compared to last month",
    trend: "neutral",
  },
]

export function MinimalistMetricCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white border border-gray-100 rounded-lg p-4">
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
        </div>
      ))}
    </div>
  )
}

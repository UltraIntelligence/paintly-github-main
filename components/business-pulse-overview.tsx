import {
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarIcon,
  AlertTriangleIcon,
  ActivityIcon,
  DollarSignIcon,
  BarChart3Icon,
  PieChartIcon,
  CheckCircleIcon,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function BusinessPulseOverview() {
  // This would typically come from your API or data source
  const businessData = {
    today: {
      date: new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }),
      events: {
        total: 12,
        completed: 5,
        upcoming: 7,
        trend: "up",
        percentage: "+20%",
      },
      attendance: {
        expected: 186,
        actual: 92,
        rate: "89%",
        trend: "up",
        percentage: "+5%",
      },
      revenue: {
        expected: 4250,
        actual: 2180,
        trend: "up",
        percentage: "+12%",
      },
      highlights: [
        { text: "Pottery workshop at 2PM is fully booked", type: "positive" },
        { text: "Yoga class at 6PM has 3 spots remaining", type: "warning" },
      ],
    },
    tomorrow: {
      date: new Date(Date.now() + 86400000).toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      }),
      events: {
        total: 14,
        booked: 11,
        trend: "up",
        percentage: "+16%",
      },
      attendance: {
        expected: 210,
        bookedSeats: 178,
        rate: "85%",
        trend: "neutral",
        percentage: "0%",
      },
      revenue: {
        projected: 4680,
        trend: "up",
        percentage: "+10%",
      },
      highlights: [
        { text: "Photography class needs instructor confirmation", type: "warning" },
        { text: "Evening painting session is trending on social", type: "positive" },
      ],
    },
    thisWeek: {
      events: {
        total: 78,
        booked: 65,
        trend: "up",
        percentage: "+15%",
      },
      topPerforming: "Pottery Workshop (98% booked)",
      attendance: {
        average: "87%",
        trend: "up",
        percentage: "+3%",
      },
      revenue: {
        projected: 28750,
        trend: "up",
        percentage: "+8%",
      },
      alerts: [
        { text: "Instructor Sarah unavailable on Friday", type: "warning" },
        { text: "Downtown location maintenance on Saturday", type: "warning" },
        { text: "New summer program launch next week", type: "info" },
      ],
    },
  }

  const renderTrend = (trend, percentage) => (
    <div className="flex items-center">
      <div
        className={`
          inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
          ${
            trend === "up"
              ? "bg-green-100 text-green-700"
              : trend === "down"
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-700"
          }
        `}
      >
        {trend === "up" && <ArrowUpIcon className="h-3 w-3 mr-1" />}
        {trend === "down" && <ArrowDownIcon className="h-3 w-3 mr-1" />}
        {percentage}
      </div>
    </div>
  )

  const renderHighlight = (highlight) => (
    <div
      key={highlight.text}
      className={`flex items-center text-xs mt-2 p-2 rounded-lg ${
        highlight.type === "positive"
          ? "bg-green-50 text-green-700"
          : highlight.type === "warning"
            ? "bg-amber-50 text-amber-700"
            : "bg-blue-50 text-blue-700"
      }`}
    >
      {highlight.type === "positive" && <CheckCircleIcon className="h-4 w-4 mr-2 flex-shrink-0" />}
      {highlight.type === "warning" && <AlertTriangleIcon className="h-4 w-4 mr-2 flex-shrink-0" />}
      {highlight.type === "info" && <CalendarIcon className="h-4 w-4 mr-2 flex-shrink-0" />}
      {highlight.text}
    </div>
  )

  // Function to render the circular progress indicator
  const renderCircularProgress = (percentage, size = 60) => {
    const strokeWidth = 6
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const offset = circumference - (Number.parseFloat(percentage) / 100) * circumference

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#3b82f6"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-blue-600">
          {percentage}
        </div>
      </div>
    )
  }

  return (
    <div className="mb-8">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">Business Pulse</h2>
        <p className="text-sm text-gray-500">Real-time overview of your business performance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Overview */}
        <Card className="overflow-hidden border-0 shadow-lg">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ActivityIcon className="h-5 w-5 mr-2 text-white" />
                <h3 className="font-bold text-white">Today</h3>
              </div>
              <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">{businessData.today.date}</span>
            </div>
          </div>

          <CardContent className="p-5">
            <div className="grid grid-cols-3 gap-4 mb-5">
              <div className="flex flex-col items-center justify-center">
                <div className="bg-blue-50 rounded-full p-3 mb-2">
                  <CalendarIcon className="h-6 w-6 text-blue-500" />
                </div>
                <span className="text-2xl font-bold text-gray-800">{businessData.today.events.total}</span>
                <span className="text-xs text-gray-500">Events</span>
                <div className="flex items-center mt-1 text-xs">
                  <span className="text-green-600 font-medium">{businessData.today.events.completed} done</span>
                  <span className="mx-1">•</span>
                  <span className="text-blue-600 font-medium">{businessData.today.events.upcoming} to go</span>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="mb-2">
                  {renderCircularProgress(businessData.today.attendance.rate.replace("%", ""))}
                </div>
                <span className="text-xs text-gray-500">Attendance</span>
                {renderTrend(businessData.today.attendance.trend, businessData.today.attendance.percentage)}
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="bg-green-50 rounded-full p-3 mb-2">
                  <DollarSignIcon className="h-6 w-6 text-green-500" />
                </div>
                <span className="text-2xl font-bold text-gray-800">${businessData.today.revenue.actual}</span>
                <span className="text-xs text-gray-500">Revenue</span>
                {renderTrend(businessData.today.revenue.trend, businessData.today.revenue.percentage)}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Today's Highlights</h4>
              {businessData.today.highlights.map((highlight) => renderHighlight(highlight))}
            </div>
          </CardContent>
        </Card>

        {/* Tomorrow's Outlook */}
        <Card className="overflow-hidden border-0 shadow-lg">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BarChart3Icon className="h-5 w-5 mr-2 text-white" />
                <h3 className="font-bold text-white">Tomorrow</h3>
              </div>
              <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">
                {businessData.tomorrow.date}
              </span>
            </div>
          </div>

          <CardContent className="p-5">
            <div className="grid grid-cols-3 gap-4 mb-5">
              <div className="flex flex-col items-center justify-center">
                <div className="bg-purple-50 rounded-full p-3 mb-2">
                  <CalendarIcon className="h-6 w-6 text-purple-500" />
                </div>
                <span className="text-2xl font-bold text-gray-800">{businessData.tomorrow.events.total}</span>
                <span className="text-xs text-gray-500">Events</span>
                <div className="mt-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
                  {businessData.tomorrow.events.booked} booked
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="mb-2">
                  {renderCircularProgress(businessData.tomorrow.attendance.rate.replace("%", ""))}
                </div>
                <span className="text-xs text-gray-500">Bookings</span>
                {renderTrend(businessData.tomorrow.attendance.trend, businessData.tomorrow.attendance.percentage)}
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="bg-green-50 rounded-full p-3 mb-2">
                  <DollarSignIcon className="h-6 w-6 text-green-500" />
                </div>
                <span className="text-2xl font-bold text-gray-800">${businessData.tomorrow.revenue.projected}</span>
                <span className="text-xs text-gray-500">Projected</span>
                {renderTrend(businessData.tomorrow.revenue.trend, businessData.tomorrow.revenue.percentage)}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tomorrow's Outlook</h4>
              {businessData.tomorrow.highlights.map((highlight) => renderHighlight(highlight))}
            </div>
          </CardContent>
        </Card>

        {/* This Week's Forecast */}
        <Card className="overflow-hidden border-0 shadow-lg">
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <PieChartIcon className="h-5 w-5 mr-2 text-white" />
                <h3 className="font-bold text-white">This Week</h3>
              </div>
              <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">Next 7 days</span>
            </div>
          </div>

          <CardContent className="p-5">
            <div className="grid grid-cols-3 gap-4 mb-5">
              <div className="flex flex-col items-center justify-center">
                <div className="bg-indigo-50 rounded-full p-3 mb-2">
                  <CalendarIcon className="h-6 w-6 text-indigo-500" />
                </div>
                <span className="text-2xl font-bold text-gray-800">{businessData.thisWeek.events.total}</span>
                <span className="text-xs text-gray-500">Total Events</span>
                {renderTrend(businessData.thisWeek.events.trend, businessData.thisWeek.events.percentage)}
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="mb-2">
                  {renderCircularProgress(businessData.thisWeek.attendance.average.replace("%", ""))}
                </div>
                <span className="text-xs text-gray-500">Avg. Attendance</span>
                {renderTrend(businessData.thisWeek.attendance.trend, businessData.thisWeek.attendance.percentage)}
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="bg-green-50 rounded-full p-3 mb-2">
                  <DollarSignIcon className="h-6 w-6 text-green-500" />
                </div>
                <span className="text-2xl font-bold text-gray-800">
                  ${(businessData.thisWeek.revenue.projected / 1000).toFixed(1)}k
                </span>
                <span className="text-xs text-gray-500">Projected</span>
                {renderTrend(businessData.thisWeek.revenue.trend, businessData.thisWeek.revenue.percentage)}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Upcoming Alerts</h4>
              {businessData.thisWeek.alerts.map((alert) => renderHighlight(alert))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

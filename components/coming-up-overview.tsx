import {
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarIcon,
  ClockIcon,
  DollarSignIcon,
  BarChart3Icon,
  AlertTriangleIcon,
  UsersIcon,
  MapPinIcon,
  TrendingUpIcon,
  InfoIcon,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function ComingUpOverview() {
  // This would typically come from your API or data source
  const upcomingData = {
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
      featuredClasses: [
        {
          id: 1,
          title: "Photography Basics",
          time: "10:00 AM - 12:00 PM",
          location: "Studio B",
          instructor: "David Chen",
          attendees: 8,
          capacity: 10,
          status: "open",
        },
        {
          id: 2,
          title: "Evening Painting",
          time: "6:30 PM - 8:30 PM",
          location: "Studio A",
          instructor: "Maria Garcia",
          attendees: 12,
          capacity: 12,
          status: "full",
        },
        {
          id: 3,
          title: "Yoga Flow",
          time: "7:00 AM - 8:00 AM",
          location: "Studio C",
          instructor: "Sarah Johnson",
          attendees: 7,
          capacity: 12,
          status: "open",
        },
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
      upcomingMilestones: [
        {
          id: 1,
          title: "Weekend Workshop Marathon",
          date: "Saturday, May 25th",
          description: "10 workshops across all studios, 95% booked",
          type: "event",
        },
        {
          id: 2,
          title: "New Summer Program Launch",
          date: "Next Monday",
          description: "Promotional materials ready for distribution",
          type: "launch",
        },
        {
          id: 3,
          title: "Quarterly Instructor Meeting",
          date: "Friday, May 24th",
          description: "Review performance and upcoming schedule",
          type: "meeting",
        },
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
      {highlight.type === "positive" && <TrendingUpIcon className="h-4 w-4 mr-2 flex-shrink-0" />}
      {highlight.type === "warning" && <AlertTriangleIcon className="h-4 w-4 mr-2 flex-shrink-0" />}
      {highlight.type === "info" && <InfoIcon className="h-4 w-4 mr-2 flex-shrink-0" />}
      {highlight.text}
    </div>
  )

  const renderClassStatus = (status, attendees, capacity) => {
    if (status === "full") {
      return <div className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">Fully Booked</div>
    } else {
      const spotsLeft = capacity - attendees
      return (
        <div className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
          {spotsLeft} {spotsLeft === 1 ? "spot" : "spots"} left
        </div>
      )
    }
  }

  const renderMilestoneIcon = (type) => {
    switch (type) {
      case "event":
        return <CalendarIcon className="h-5 w-5 text-primary" />
      case "launch":
        return <TrendingUpIcon className="h-5 w-5 text-green-500" />
      case "meeting":
        return <UsersIcon className="h-5 w-5 text-primary" />
      default:
        return <InfoIcon className="h-5 w-5 text-muted-foreground" />
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Tomorrow's Overview */}
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Tomorrow</h2>
              <p className="text-sm text-muted-foreground">{upcomingData.tomorrow.date}</p>
            </div>
            <CalendarIcon className="h-5 w-5 text-primary" />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-accent rounded-lg p-4 text-center">
              <div className="bg-primary/10 rounded-full p-3 mb-2 mx-auto w-12 h-12 flex items-center justify-center">
                <CalendarIcon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-lg font-bold">{upcomingData.tomorrow.events.total}</span>
              <div className="flex flex-col items-center">
                <span className="text-xs text-muted-foreground">Classes</span>
                <span className="text-xs text-primary">{upcomingData.tomorrow.events.booked} booked</span>
              </div>
            </div>

            <div className="bg-accent rounded-lg p-4 text-center">
              <div className="bg-primary/10 rounded-full p-3 mb-2 mx-auto w-12 h-12 flex items-center justify-center">
                <UsersIcon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-lg font-bold">{upcomingData.tomorrow.attendance.rate}</span>
              <div className="flex flex-col items-center">
                <span className="text-xs text-muted-foreground">Booking Rate</span>
                <span className="text-xs text-primary">{upcomingData.tomorrow.attendance.bookedSeats} seats</span>
              </div>
            </div>

            <div className="bg-accent rounded-lg p-4 text-center">
              <div className="bg-green-50 rounded-full p-3 mb-2 mx-auto w-12 h-12 flex items-center justify-center">
                <DollarSignIcon className="h-5 w-5 text-green-500" />
              </div>
              <span className="text-lg font-bold">${upcomingData.tomorrow.revenue.projected}</span>
              <div className="flex flex-col items-center">
                <span className="text-xs text-muted-foreground">Projected</span>
                {renderTrend(upcomingData.tomorrow.revenue.trend, upcomingData.tomorrow.revenue.percentage)}
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-3">Featured Classes Tomorrow</h3>
            <div className="space-y-3">
              {upcomingData.tomorrow.featuredClasses.map((classItem) => (
                <div key={classItem.id} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <div>
                    <h5 className="font-medium">{classItem.title}</h5>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <ClockIcon className="h-3 w-3 mr-1" />
                      <span className="mr-3">{classItem.time}</span>
                      <MapPinIcon className="h-3 w-3 mr-1" />
                      <span>{classItem.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-xs text-muted-foreground mr-3">
                      {classItem.attendees}/{classItem.capacity}
                    </div>
                    {renderClassStatus(classItem.status, classItem.attendees, classItem.capacity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Notes</h4>
            {upcomingData.tomorrow.highlights.map((highlight) => renderHighlight(highlight))}
          </div>
        </CardContent>
      </Card>

      {/* This Week's Overview */}
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">This Week</h2>
              <p className="text-sm text-muted-foreground">Next 7 days</p>
            </div>
            <BarChart3Icon className="h-5 w-5 text-primary" />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-accent rounded-lg p-4 text-center">
              <div className="bg-primary/10 rounded-full p-3 mb-2 mx-auto w-12 h-12 flex items-center justify-center">
                <CalendarIcon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-lg font-bold">{upcomingData.thisWeek.events.total}</span>
              <div className="flex flex-col items-center">
                <span className="text-xs text-muted-foreground">Total Events</span>
                {renderTrend(upcomingData.thisWeek.events.trend, upcomingData.thisWeek.events.percentage)}
              </div>
            </div>

            <div className="bg-accent rounded-lg p-4 text-center">
              <div className="bg-primary/10 rounded-full p-3 mb-2 mx-auto w-12 h-12 flex items-center justify-center">
                <UsersIcon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-lg font-bold">{upcomingData.thisWeek.attendance.average}</span>
              <div className="flex flex-col items-center">
                <span className="text-xs text-muted-foreground">Avg. Attendance</span>
                {renderTrend(upcomingData.thisWeek.attendance.trend, upcomingData.thisWeek.attendance.percentage)}
              </div>
            </div>

            <div className="bg-accent rounded-lg p-4 text-center">
              <div className="bg-green-50 rounded-full p-3 mb-2 mx-auto w-12 h-12 flex items-center justify-center">
                <DollarSignIcon className="h-5 w-5 text-green-500" />
              </div>
              <span className="text-lg font-bold">${(upcomingData.thisWeek.revenue.projected / 1000).toFixed(1)}k</span>
              <div className="flex flex-col items-center">
                <span className="text-xs text-muted-foreground">Projected</span>
                {renderTrend(upcomingData.thisWeek.revenue.trend, upcomingData.thisWeek.revenue.percentage)}
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-3">Upcoming Milestones</h3>
            <div className="space-y-3">
              {upcomingData.thisWeek.upcomingMilestones.map((milestone) => (
                <div key={milestone.id} className="flex p-3 bg-accent rounded-lg">
                  <div className="bg-primary/10 p-2 rounded-md mr-3 h-fit">{renderMilestoneIcon(milestone.type)}</div>
                  <div>
                    <h5 className="font-medium">{milestone.title}</h5>
                    <div className="text-xs text-muted-foreground mt-1">{milestone.date}</div>
                    <div className="text-xs text-muted-foreground mt-1">{milestone.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Alerts</h4>
            {upcomingData.thisWeek.alerts.map((alert) => renderHighlight(alert))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

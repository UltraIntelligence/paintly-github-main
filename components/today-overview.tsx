import {
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  DollarSignIcon,
  ActivityIcon,
  UsersIcon,
  MapPinIcon,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function TodayOverview() {
  // This would typically come from your API or data source
  const todayData = {
    date: new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }),
    summary: {
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
    },
    upcomingClasses: [
      {
        id: 1,
        title: "Pottery Workshop",
        time: "2:00 PM - 4:00 PM",
        location: "Studio A",
        instructor: "Maria Garcia",
        attendees: 12,
        capacity: 12,
        status: "full",
      },
      {
        id: 2,
        title: "Watercolor Basics",
        time: "3:30 PM - 5:30 PM",
        location: "Studio B",
        instructor: "James Wilson",
        attendees: 8,
        capacity: 10,
        status: "open",
      },
      {
        id: 3,
        title: "Yoga for Beginners",
        time: "6:00 PM - 7:00 PM",
        location: "Studio C",
        instructor: "Sarah Johnson",
        attendees: 9,
        capacity: 12,
        status: "open",
      },
      {
        id: 4,
        title: "Advanced Acrylics",
        time: "7:30 PM - 9:30 PM",
        location: "Studio A",
        instructor: "David Chen",
        attendees: 6,
        capacity: 8,
        status: "open",
      },
    ],
    completedClasses: [
      {
        id: 5,
        title: "Morning Meditation",
        time: "7:00 AM - 8:00 AM",
        location: "Studio C",
        instructor: "Lisa Patel",
        attendees: 10,
        capacity: 12,
        status: "completed",
      },
      {
        id: 6,
        title: "Kids Art Adventure",
        time: "10:00 AM - 11:30 AM",
        location: "Studio B",
        instructor: "Robert Taylor",
        attendees: 15,
        capacity: 15,
        status: "completed",
      },
      {
        id: 7,
        title: "Lunch & Learn: Color Theory",
        time: "12:00 PM - 1:00 PM",
        location: "Studio A",
        instructor: "Maria Garcia",
        attendees: 8,
        capacity: 10,
        status: "completed",
      },
    ],
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
            stroke="var(--primary)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-primary">
          {percentage}
        </div>
      </div>
    )
  }

  const renderClassStatus = (status, attendees, capacity) => {
    if (status === "completed") {
      return (
        <div className="flex items-center">
          <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1" />
          <span className="text-xs text-muted-foreground">Completed</span>
        </div>
      )
    } else if (status === "full") {
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
      {/* Today's Summary */}
      <Card className="w-full lg:col-span-1">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Today's Summary</h2>
              <p className="text-sm text-muted-foreground">Daily activity overview</p>
            </div>
            <ActivityIcon className="h-5 w-5 text-primary" />
          </div>

          <div className="space-y-6">
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm font-medium">Events</span>
                </div>
                <span className="text-xl font-bold">{todayData.summary.events.total}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircleIcon className="h-3 w-3 mr-1 text-green-500" />
                  <span>{todayData.summary.events.completed} completed</span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="h-3 w-3 mr-1 text-primary" />
                  <span>{todayData.summary.events.upcoming} upcoming</span>
                </div>
                {renderTrend(todayData.summary.events.trend, todayData.summary.events.percentage)}
              </div>
            </div>

            <Separator />

            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <UsersIcon className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm font-medium">Attendance</span>
                </div>
                <div className="flex items-center">
                  {renderCircularProgress(todayData.summary.attendance.rate.replace("%", ""), 40)}
                </div>
              </div>
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>
                  {todayData.summary.attendance.actual} of {todayData.summary.attendance.expected} expected
                </span>
                {renderTrend(todayData.summary.attendance.trend, todayData.summary.attendance.percentage)}
              </div>
            </div>

            <Separator />

            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <DollarSignIcon className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-sm font-medium">Revenue</span>
                </div>
                <span className="text-xl font-bold">${todayData.summary.revenue.actual}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>${todayData.summary.revenue.expected} projected</span>
                {renderTrend(todayData.summary.revenue.trend, todayData.summary.revenue.percentage)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Classes */}
      <Card className="w-full lg:col-span-3">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Today's Classes</h2>
              <p className="text-sm text-muted-foreground">
                {todayData.upcomingClasses.length} upcoming • {todayData.completedClasses.length} completed
              </p>
            </div>
            <CalendarIcon className="h-5 w-5 text-primary" />
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Upcoming Classes</h3>
            <div className="space-y-3">
              {todayData.upcomingClasses.map((classItem) => (
                <div key={classItem.id} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <div className="flex items-start">
                    <div className="bg-primary/10 text-primary p-2 rounded-md mr-3">
                      <ClockIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h5 className="font-medium">{classItem.title}</h5>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <ClockIcon className="h-3 w-3 mr-1" />
                        <span className="mr-3">{classItem.time}</span>
                        <MapPinIcon className="h-3 w-3 mr-1" />
                        <span className="mr-3">{classItem.location}</span>
                        <UsersIcon className="h-3 w-3 mr-1" />
                        <span>{classItem.instructor}</span>
                      </div>
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

          <Separator className="my-4" />

          <div>
            <h3 className="text-lg font-semibold mb-3">Completed Classes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {todayData.completedClasses.map((classItem) => (
                <div key={classItem.id} className="p-3 bg-accent rounded-lg">
                  <div className="flex justify-between items-start">
                    <h5 className="font-medium">{classItem.title}</h5>
                    <CheckCircleIcon className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <ClockIcon className="h-3 w-3 mr-1" />
                    <span>{classItem.time}</span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <UsersIcon className="h-3 w-3 mr-1" />
                    <span>
                      {classItem.attendees}/{classItem.capacity} attended
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

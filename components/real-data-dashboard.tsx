"use client"

import { useDashboardData } from "@/hooks/use-dashboard-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, MapPin, TrendingUp } from "lucide-react"

export function RealDataDashboard() {
  const { data, loading, error } = useDashboardData()

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-red-600">Error loading dashboard data: {error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Locations</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.totalLocations}</div>
            <p className="text-xs text-muted-foreground">Active studio locations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.totalEvents}</div>
            <p className="text-xs text-muted-foreground">Available for booking</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.totalStaff}</div>
            <p className="text-xs text-muted-foreground">Instructors & admins</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Bookings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.totalBookings}</div>
            <p className="text-xs text-muted-foreground">Last 10 bookings</p>
          </CardContent>
        </Card>
      </div>

      {/* Locations Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Studio Locations ({data.locations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.locations.map((location: any) => (
              <div key={location.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{location.name}</h3>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Active
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{location.city}</p>
                <p className="text-xs text-gray-500">{location.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events ({data.events.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.events.slice(0, 5).map((event: any) => (
              <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{event.title}</h4>
                  <p className="text-sm text-gray-600">
                    {new Date(event.start_time).toLocaleDateString()} at{" "}
                    {new Date(event.start_time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">¥{event.price}</Badge>
                  <p className="text-xs text-gray-500 mt-1">{event.capacity} spots</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Staff Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Members ({data.staff.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.staff.map((member: any) => (
              <div key={member.user_id} className="border rounded-lg p-4">
                <h4 className="font-medium">{member.full_name_override || "Staff Member"}</h4>
                <div className="flex gap-2 mt-2">
                  {member.is_instructor && <Badge variant="outline">Instructor</Badge>}
                  {member.is_admin && <Badge variant="outline">Admin</Badge>}
                  {member.is_location_manager && <Badge variant="outline">Manager</Badge>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

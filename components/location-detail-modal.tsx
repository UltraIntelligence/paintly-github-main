"use client"

import { useState } from "react"
import { ArrowLeft, TrendingUp, Package, Tag, Phone, Calendar } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { EventCard } from "@/components/event-card"

interface LocationDetailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  location: {
    id: number
    name: { japanese: string; english: string }
    photo: string
    address: { japanese: string; english: string }
    access: { japanese: string; english: string }
    status: string
    type: string
    capacity: number
    features: string[]
    openingHours: string
    phone: string
    website: string
  }
}

// Mock data for the selected location
const getLocationData = (locationId: number) => ({
  dailyTarget: 60000,
  currentRevenue: 47500,
  yesterdayRevenue: 42500,
  eventsToday: 3,
  ticketsSold: 42,
  ticketsRemaining: 18,
  activeInstructors: 2,
  standbyInstructors: 1,
  weeklyRevenue: 156000,
  weeklyChange: 12,
})

// Chart data for 6 months revenue
const chartData = [
  { month: "January", revenue: 186000 },
  { month: "February", revenue: 305000 },
  { month: "March", revenue: 237000 },
  { month: "April", revenue: 173000 },
  { month: "May", revenue: 209000 },
  { month: "June", revenue: 214000 },
  { month: "July", revenue: 298000 },
  { month: "August", revenue: 342000 },
  { month: "September", revenue: 267000 },
  { month: "October", revenue: 189000 },
  { month: "November", revenue: 234000 },
  { month: "December", revenue: 278000 },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#3B82F6",
  },
} satisfies ChartConfig

// Today's events data
const todaysEvents = [
  {
    id: 1,
    title: { japanese: "抽象画の基礎", english: "Abstract Art Basics" },
    time: "14:30",
    booked: 18,
    capacity: 20,
    revenue: 15500,
    instructor: "Naomi",
    instructorPhoto: "/placeholder.svg?height=40&width=40",
    status: "selling_fast",
    actionNeeded: false,
  },
  {
    id: 2,
    title: { japanese: "水彩画入門", english: "Watercolor Introduction" },
    time: "17:00",
    booked: 15,
    capacity: 20,
    revenue: 12000,
    instructor: "Luci",
    instructorPhoto: "/placeholder.svg?height=40&width=40",
    status: "optimal",
    actionNeeded: false,
  },
  {
    id: 3,
    title: { japanese: "夜景ペインティング", english: "Night Scene Painting" },
    time: "19:30",
    booked: 12,
    capacity: 20,
    revenue: 20000,
    instructor: "Takashi",
    instructorPhoto: "/placeholder.svg?height=40&width=40",
    status: "low_attendance",
    actionNeeded: true,
  },
]

export function LocationDetailModal({ open, onOpenChange, location }: LocationDetailModalProps) {
  const [actionTaken, setActionTaken] = useState<Record<string, boolean>>({})
  const [showSuccessMessage, setShowSuccessMessage] = useState<Record<string, boolean>>({})

  const locationData = getLocationData(location.id)

  const handleAction = (actionId: string, message: string) => {
    setActionTaken((prev) => ({ ...prev, [actionId]: true }))
    setShowSuccessMessage((prev) => ({ ...prev, [actionId]: true }))

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage((prev) => ({ ...prev, [actionId]: false }))
    }, 3000)
  }

  // Get revenue status color
  const getRevenueStatusColor = (current: number, target: number) => {
    const percentage = (current / target) * 100
    if (percentage >= 90) return "text-green-600"
    if (percentage >= 70) return "text-amber-600"
    return "text-red-600"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full max-h-[95vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-0">
          <Button variant="ghost" size="sm" className="w-fit" onClick={() => onOpenChange(false)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Locations
          </Button>
        </DialogHeader>

        <div className="overflow-y-auto" style={{ maxHeight: "calc(95vh - 120px)" }}>
          {/* Header Section */}
          <div className="px-6 pb-4">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-full md:w-64 h-48 rounded-lg overflow-hidden">
                <img
                  src={location.photo || "/placeholder.svg"}
                  alt={location.name.english}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold">{location.name.japanese}</h1>
                  <h2 className="text-lg text-muted-foreground">{location.name.english}</h2>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge
                    className={
                      location.status === "active" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                    }
                  >
                    {location.status === "active" ? "Active" : location.status}
                  </Badge>
                  <Badge
                    className={
                      location.type === "flagship"
                        ? "bg-yellow-100 text-yellow-700"
                        : location.type === "premium"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                    }
                  >
                    {location.type.charAt(0).toUpperCase() + location.type.slice(1)}
                  </Badge>
                  <Badge variant="outline">Capacity: {location.capacity}</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* PRIMARY FOCUS - Today's Revenue Card */}
          <div className="px-6 mb-6">
            <Card className="border-2 border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-medium text-gray-500 mb-1">Today's Revenue</h2>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">¥{locationData.currentRevenue.toLocaleString()}</span>
                      <span
                        className={`text-lg ${getRevenueStatusColor(
                          locationData.currentRevenue,
                          locationData.dailyTarget,
                        )}`}
                      >
                        {Math.round((locationData.currentRevenue / locationData.dailyTarget) * 100)}% of target
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-sm">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-green-600">
                        +
                        {Math.round(
                          ((locationData.currentRevenue - locationData.yesterdayRevenue) /
                            locationData.yesterdayRevenue) *
                            100,
                        )}
                        % vs yesterday
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 md:gap-8">
                    <div>
                      <p className="text-sm text-gray-500">Events Today</p>
                      <p className="text-2xl font-semibold">{locationData.eventsToday}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tickets Sold</p>
                      <p className="text-2xl font-semibold">
                        {locationData.ticketsSold}/{locationData.ticketsSold + locationData.ticketsRemaining}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Active Staff</p>
                      <p className="text-2xl font-semibold">{locationData.activeInstructors}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Daily Target: ¥{locationData.dailyTarget.toLocaleString()}</span>
                    <span>{Math.round((locationData.currentRevenue / locationData.dailyTarget) * 100)}%</span>
                  </div>
                  <Progress value={(locationData.currentRevenue / locationData.dailyTarget) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Today's Events Section - Using EventCard Component */}
          <div className="px-6 mb-6">
            <h2 className="text-lg font-semibold mb-3">Today's Events</h2>
            <div className="space-y-3">
              {todaysEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={{
                    id: event.id.toString(),
                    title: event.title.japanese,
                    subtitle: event.title.english,
                    time: event.time,
                    capacity: `${event.booked}/${event.capacity}`,
                    status:
                      event.status === "selling_fast"
                        ? "Selling Fast"
                        : event.status === "optimal"
                          ? "Optimal"
                          : event.status === "low_attendance"
                            ? "Low Attendance"
                            : event.status,
                    instructor: event.instructor,
                    instructorAvatar: event.instructorPhoto,
                    price: `¥${event.revenue.toLocaleString()}`,
                    actionLabel: event.actionNeeded ? "Send Promotion" : undefined,
                    onAction: event.actionNeeded
                      ? () => handleAction(`promo-${event.id}`, "Promotion sent")
                      : undefined,
                    actionStatus: actionTaken[`promo-${event.id}`] ? "success" : "none",
                  }}
                  variant="detailed"
                  className="border rounded-lg"
                />
              ))}
            </div>
          </div>

          {/* Revenue Performance Chart */}
          <div className="px-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Performance</CardTitle>
                <CardDescription>12-month revenue overview for this location</CardDescription>
              </CardHeader>
              <CardContent className="px-2 sm:p-6">
                <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                  <AreaChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                      left: 12,
                      right: 12,
                      top: 12,
                      bottom: 12,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" hideLabel />} />
                    <defs>
                      <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <Area
                      dataKey="revenue"
                      type="natural"
                      fill="url(#fillRevenue)"
                      fillOpacity={0.4}
                      stroke="#3B82F6"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                  Trending up by {locationData.weeklyChange}% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">Showing total revenue for the last 12 months</div>
              </CardFooter>
            </Card>
          </div>

          {/* CONTEXTUAL RECOMMENDATIONS */}
          <div className="px-6 mb-8">
            <h2 className="text-lg font-semibold mb-3">Recommended Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button variant="outline" className="justify-start h-auto py-2.5 px-4">
                <Tag className="mr-2 h-4 w-4 text-amber-600" />
                <div className="text-left">
                  <p className="font-medium">Send 15% discount for Night Scene Painting</p>
                  <p className="text-xs text-muted-foreground">Target: 24 customers who booked similar classes</p>
                </div>
              </Button>

              <Button variant="outline" className="justify-start h-auto py-2.5 px-4">
                <Package className="mr-2 h-4 w-4 text-red-600" />
                <div className="text-left">
                  <p className="font-medium">Restock canvas inventory</p>
                  <p className="text-xs text-muted-foreground">Current: 15 remaining, Need: 30 for weekend</p>
                </div>
              </Button>

              <Button variant="outline" className="justify-start h-auto py-2.5 px-4">
                <Calendar className="mr-2 h-4 w-4 text-blue-600" />
                <div className="text-left">
                  <p className="font-medium">Schedule extra class with Naomi</p>
                  <p className="text-xs text-muted-foreground">High demand slot: Thursday 6-8PM</p>
                </div>
              </Button>

              <Button variant="outline" className="justify-start h-auto py-2.5 px-4">
                <Phone className="mr-2 h-4 w-4 text-green-600" />
                <div className="text-left">
                  <p className="font-medium">Contact customers on waitlist</p>
                  <p className="text-xs text-muted-foreground">8 customers waiting for Abstract Art class</p>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

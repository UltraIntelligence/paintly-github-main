"use client"

import { useState } from "react"
import { TrendingUp, Package, Tag, Phone, Calendar, Users, Target, DollarSign } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, Line } from "recharts"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { EventCard } from "@/components/event-card"
import { StatusCard } from "@/components/status-card"

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.2 },
}

// Mock location data for Daikanyama
const location = {
  id: 1,
  name: { japanese: "アートバー代官山", english: "Artbar Daikanyama" },
  photo: "/placeholder.svg?height=240&width=320",
  address: {
    japanese: "〒150-0034 東京都渋谷区代官山町 7-2",
    english: "7-2 Daikanyamachō, Shibuya, Tōkyō 150-0034",
  },
  access: {
    japanese: "代官山駅から徒歩5分 | 恵比寿駅から徒歩5分",
    english: "5-minute walk from Daikanyama Station | 8-minute walk from Ebisu Station",
  },
  status: "active",
  type: "flagship",
  capacity: 45,
  features: ["Private Events", "Outdoor Space", "Wheelchair Access"],
  openingHours: "11:00 - 21:00",
  phone: "+81 3-1234-5678",
  website: "artbar.co.jp/daikanyama",
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

// Chart data for 6 months revenue with targets and previous year comparison
const chartData = [
  { month: "January", revenue: 186000, target: 180000, lastYear: 165000 },
  { month: "February", revenue: 305000, target: 180000, lastYear: 280000 },
  { month: "March", revenue: 237000, target: 180000, lastYear: 220000 },
  { month: "April", revenue: 173000, target: 180000, lastYear: 190000 },
  { month: "May", revenue: 209000, target: 180000, lastYear: 195000 },
  { month: "June", revenue: 214000, target: 180000, lastYear: 200000 },
  { month: "July", revenue: 298000, target: 180000, lastYear: 275000 },
  { month: "August", revenue: 342000, target: 180000, lastYear: 320000 },
  { month: "September", revenue: 267000, target: 180000, lastYear: 245000 },
  { month: "October", revenue: 189000, target: 180000, lastYear: 175000 },
  { month: "November", revenue: 234000, target: 180000, lastYear: 210000 },
  { month: "December", revenue: 278000, target: 180000, lastYear: 255000 },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#3B82F6",
  },
  target: {
    label: "Target",
    color: "#EF4444",
  },
  lastYear: {
    label: "Last Year",
    color: "#10B981",
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

function LocationDashboardContent() {
  const router = useRouter()
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

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        <div className="w-full h-48 sm:h-64 lg:w-40 lg:h-40 rounded-none lg:rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={location.photo || "/placeholder.svg"}
            alt={location.name.english}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 px-4 lg:px-0">
          <div className="flex flex-col lg:flex-row lg:items-center gap-2 mb-4">
            <h1 className="text-3xl font-bold">{location.name.japanese}</h1>
            <h2 className="text-xl text-muted-foreground">{location.name.english}</h2>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <Badge
              className={location.status === "active" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground mb-1">Address</p>
              <p>{location.address.english}</p>
              <p>{location.address.japanese}</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Access</p>
              <p>{location.access.english}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Status */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Today's Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatusCard
            icon={DollarSign}
            iconColor="text-blue-500"
            title="Today's Revenue"
            value={`¥${locationData.currentRevenue.toLocaleString()}`}
            subtitle={`${Math.round((locationData.currentRevenue / locationData.dailyTarget) * 100)}% of target`}
          />
          <StatusCard
            icon={Target}
            iconColor="text-green-500"
            title="Events Today"
            value={locationData.eventsToday.toString()}
            subtitle={`${locationData.ticketsSold}/${locationData.ticketsSold + locationData.ticketsRemaining} tickets sold`}
          />
          <StatusCard
            icon={Users}
            iconColor="text-purple-500"
            title="Active Staff"
            value={locationData.activeInstructors.toString()}
            subtitle={`${locationData.standbyInstructors} on standby`}
          />
        </div>
      </div>

      {/* Today's Events Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Today's Events</h2>
        <div className="space-y-4">
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
                onAction: event.actionNeeded ? () => handleAction(`promo-${event.id}`, "Promotion sent") : undefined,
                actionStatus: actionTaken[`promo-${event.id}`] ? "success" : "none",
              }}
              variant="detailed"
              className="border rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* Revenue Performance Chart */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Revenue Performance</CardTitle>
            <CardDescription>
              12-month revenue overview with monthly target (¥180,000) and last year comparison
            </CardDescription>
          </CardHeader>
          <CardContent className="px-2 sm:p-6">
            <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
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
                <Line
                  dataKey="target"
                  type="natural"
                  stroke="#EF4444"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
                <Line
                  dataKey="lastYear"
                  type="natural"
                  stroke="#10B981"
                  strokeWidth={1.5}
                  strokeOpacity={0.7}
                  dot={false}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Trending up by {locationData.weeklyChange}% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span>• Current: 19% above target</span>
              <span>• vs Last Year: +9% average</span>
            </div>
            <div className="leading-none text-muted-foreground">Showing total revenue for the last 12 months</div>
          </CardFooter>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Button variant="outline" className="h-auto flex-col py-6 px-4">
            <Tag className="h-6 w-6 mb-2" />
            <span className="text-sm">Send Promotion</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col py-6 px-4">
            <Package className="h-6 w-6 mb-2" />
            <span className="text-sm">Manage Inventory</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col py-6 px-4">
            <Calendar className="h-6 w-6 mb-2" />
            <span className="text-sm">Schedule Class</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col py-6 px-4">
            <Phone className="h-6 w-6 mb-2" />
            <span className="text-sm">Contact Waitlist</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function LocationDashboardPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <motion.div key="location-dashboard" {...pageTransition} className="flex-1">
            <LocationDashboardContent />
          </motion.div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}

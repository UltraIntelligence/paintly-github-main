"use client"

import { useState } from "react"
import { Package, Calendar, Users, Target, DollarSign } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EventCard } from "@/components/event-card"
import { StatusCard } from "@/components/status-card"
import { ChartAreaTicketsRevenue } from "@/components/chart-area-interactive"

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
        <ChartAreaTicketsRevenue />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            className="h-auto flex-col py-6 px-4 bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => router.push("/schedule?location=daikanyama")}
          >
            <Calendar className="h-6 w-6 mb-2" />
            <span className="text-sm">Schedule Class</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto flex-col py-6 px-4"
            onClick={() =>
              window.open(
                "mailto:naomi@artbar.co.jp,luci@artbar.co.jp,takashi@artbar.co.jp?subject=Today's Schedule - Daikanyama&body=Hi team,%0A%0ARegarding today's classes at Daikanyama location...",
                "_blank",
              )
            }
          >
            <Users className="h-6 w-6 mb-2" />
            <span className="text-sm">Message Today's Staff</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto flex-col py-6 px-4"
            onClick={() => {
              const csvData =
                "Event,Time,Instructor,Booked,Capacity,Revenue\nAbstract Art Basics,14:30,Naomi,18,20,¥15500\nWatercolor Introduction,17:00,Luci,15,20,¥12000\nNight Scene Painting,19:30,Takashi,12,20,¥20000"
              const blob = new Blob([csvData], { type: "text/csv" })
              const url = window.URL.createObjectURL(blob)
              const a = document.createElement("a")
              a.href = url
              a.download = `daikanyama-events-${new Date().toISOString().split("T")[0]}.csv`
              a.click()
              window.URL.revokeObjectURL(url)
            }}
          >
            <Package className="h-6 w-6 mb-2" />
            <span className="text-sm">Export Event Data</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto flex-col py-6 px-4"
            onClick={() => router.push("/schedule?filter=daikanyama")}
          >
            <Calendar className="h-6 w-6 mb-2" />
            <span className="text-sm">View Full Schedule</span>
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

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
import { StatusCard } from "@/components/status-card"
import { ChartAreaTicketsRevenue } from "@/components/chart-area-interactive"

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.2 },
}

// Mock location data for Osaka
const location = {
  id: 5,
  name: { japanese: "アートバー大阪", english: "Artbar Osaka" },
  photo: "/placeholder.svg?height=240&width=320",
  address: {
    japanese: "〒530-0001 大阪府大阪市北区梅田 1-11-4",
    english: "1-11-4 Umeda, Kita-ku, Osaka, Osaka 530-0001",
  },
  access: {
    japanese: "大阪駅から徒歩5分 | 梅田駅から徒歩3分",
    english: "5-minute walk from Osaka Station | 3-minute walk from Umeda Station",
  },
  status: "under_construction",
  type: "premium",
  capacity: 50,
  features: ["City Views", "Private Events", "VIP Lounge", "Wheelchair Access"],
  openingHours: "Opening Soon",
  phone: "+81 6-5678-9012",
  website: "artbar.co.jp/osaka",
}

// Mock data for the selected location
const getLocationData = (locationId: number) => ({
  dailyTarget: 0,
  currentRevenue: 0,
  yesterdayRevenue: 0,
  eventsToday: 0,
  ticketsSold: 0,
  ticketsRemaining: 0,
  activeInstructors: 0,
  standbyInstructors: 3,
  weeklyRevenue: 0,
  weeklyChange: 0,
})

// Today's events data (empty for under construction)
const todaysEvents: any[] = []

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
              {location.status === "active" ? "Active" : "Under Construction"}
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

      {/* Construction Status */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2 text-amber-800">Location Under Construction</h3>
        <p className="text-amber-700 mb-4">
          This location is currently under construction. Expected opening: Spring 2024
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatusCard
            icon={DollarSign}
            iconColor="text-gray-400"
            title="Today's Revenue"
            value="¥0"
            subtitle="Opening soon"
          />
          <StatusCard
            icon={Target}
            iconColor="text-gray-400"
            title="Events Today"
            value="0"
            subtitle="No events scheduled"
          />
          <StatusCard
            icon={Users}
            iconColor="text-amber-500"
            title="Staff Preparing"
            value={locationData.standbyInstructors.toString()}
            subtitle="Training in progress"
          />
        </div>
      </div>

      {/* Today's Events Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Today's Events</h2>
        <div className="text-center py-12 text-muted-foreground">
          <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No events scheduled - Location under construction</p>
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
          <Button disabled className="h-auto flex-col py-6 px-4 bg-gray-300 text-gray-500 cursor-not-allowed">
            <Calendar className="h-6 w-6 mb-2" />
            <span className="text-sm">Schedule Class</span>
          </Button>
          <Button disabled variant="outline" className="h-auto flex-col py-6 px-4 cursor-not-allowed">
            <Users className="h-6 w-6 mb-2" />
            <span className="text-sm">Message Staff</span>
          </Button>
          <Button disabled variant="outline" className="h-auto flex-col py-6 px-4 cursor-not-allowed">
            <Package className="h-6 w-6 mb-2" />
            <span className="text-sm">Export Data</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto flex-col py-6 px-4"
            onClick={() => router.push("/schedule?filter=osaka")}
          >
            <Calendar className="h-6 w-6 mb-2" />
            <span className="text-sm">View Construction Updates</span>
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

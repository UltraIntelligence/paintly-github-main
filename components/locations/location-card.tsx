"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import type { Location } from "./location-data"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LocationBusyHours } from "./location-busy-hours"

interface LocationCardProps {
  location: Location
}

export function LocationCard({ location }: LocationCardProps) {
  const router = useRouter()

  const statusColors = {
    open: "bg-green-500",
    closed: "bg-red-500",
    maintenance: "bg-yellow-500",
  }

  const statusText = {
    open: "Open",
    closed: "Closed",
    maintenance: "Maintenance",
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative h-20 w-30 min-w-[120px] rounded-md overflow-hidden">
          <Image src={location.photo || "/placeholder.svg"} alt={location.name} fill className="object-cover" />
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-lg">{location.name}</h3>
          <p className="text-sm text-gray-600">{location.address}</p>
          <Badge variant="secondary" className="mt-1">
            {location.capacity} seats
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${statusColors[location.status]}`} />
          <span className="text-sm font-medium">{statusText[location.status]}</span>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Events</span>
            <span className="font-medium">{location.stats.events}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Revenue</span>
            <span className="font-medium">¥{location.stats.revenue.toLocaleString()}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Utilization</span>
            <span className="font-medium">{location.stats.utilization}%</span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Avg Attendance</span>
            <span className="font-medium">
              {location.stats.avgAttendance}/{location.capacity}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <LocationBusyHours />
        </div>
      </CardContent>

      <CardFooter className="p-3 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-2">
        <Button
          className="bg-black text-white hover:bg-black/80"
          effect="gooeyLeft"
          onClick={() => router.push(`/locations/${location.id}/schedule`)}
        >
          View Schedule
        </Button>

        <Button variant="outline" effect="gooeyLeft" onClick={() => router.push(`/locations/${location.id}/edit`)}>
          Edit Details
        </Button>

        <Button variant="outline" effect="gooeyLeft" onClick={() => router.push(`/locations/${location.id}/events`)}>
          View Events
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Generate Report</DropdownMenuItem>
            <DropdownMenuItem>Change Status</DropdownMenuItem>
            <DropdownMenuItem>Manage Equipment</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Close Location</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  )
}

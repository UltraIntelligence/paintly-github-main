"use client"

import { StatusCard } from "./status-card"
import { CalendarDaysIcon, UsersIcon, TrendingUpIcon, DollarSignIcon } from "lucide-react"

export function SectionCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatusCard
        icon={CalendarDaysIcon}
        iconColor="text-blue-600"
        title="Today's Events"
        value="8"
        subtitle="3 starting soon"
      />
      <StatusCard
        icon={UsersIcon}
        iconColor="text-green-600"
        title="Total Participants"
        value="156"
        subtitle="+12% from last week"
      />
      <StatusCard
        icon={TrendingUpIcon}
        iconColor="text-purple-600"
        title="Booking Rate"
        value="87%"
        subtitle="+5% from last month"
      />
      <StatusCard
        icon={DollarSignIcon}
        iconColor="text-orange-600"
        title="Revenue Today"
        value="¥89,400"
        subtitle="+18% from yesterday"
      />
    </div>
  )
}

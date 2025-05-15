export type LocationStatus = "open" | "closed" | "maintenance"

export interface Location {
  id: string
  name: string
  address: string
  capacity: number
  status: LocationStatus
  photo: string
  stats: {
    events: number
    revenue: number
    utilization: number
    avgAttendance: number
  }
}

export const locations: Location[] = [
  {
    id: "loc1",
    name: "Shibuya Studio",
    address: "1-2-3 Shibuya, Tokyo",
    capacity: 25,
    status: "open",
    photo: "/placeholder-3uwps.png",
    stats: {
      events: 42,
      revenue: 125000,
      utilization: 78,
      avgAttendance: 18,
    },
  },
  {
    id: "loc2",
    name: "Shinjuku Workshop",
    address: "4-5-6 Shinjuku, Tokyo",
    capacity: 30,
    status: "open",
    photo: "/placeholder-ai4dk.png",
    stats: {
      events: 38,
      revenue: 142000,
      utilization: 82,
      avgAttendance: 24,
    },
  },
  {
    id: "loc3",
    name: "Roppongi Gallery",
    address: "7-8-9 Roppongi, Tokyo",
    capacity: 40,
    status: "maintenance",
    photo: "/placeholder-okv7u.png",
    stats: {
      events: 12,
      revenue: 45000,
      utilization: 35,
      avgAttendance: 15,
    },
  },
  {
    id: "loc4",
    name: "Harajuku Space",
    address: "10-11-12 Harajuku, Tokyo",
    capacity: 20,
    status: "closed",
    photo: "/placeholder-n76wq.png",
    stats: {
      events: 0,
      revenue: 0,
      utilization: 0,
      avgAttendance: 0,
    },
  },
]

export const getLocationStats = () => {
  const totalLocations = locations.length
  const totalCapacity = locations.reduce((sum, loc) => sum + loc.capacity, 0)

  const totalUtilization = locations.reduce((sum, loc) => sum + loc.stats.utilization, 0)
  const averageUtilization = Math.round(totalUtilization / totalLocations)

  const eventsThisMonth = locations.reduce((sum, loc) => sum + loc.stats.events, 0)

  return {
    totalLocations,
    totalCapacity,
    averageUtilization,
    eventsThisMonth,
  }
}

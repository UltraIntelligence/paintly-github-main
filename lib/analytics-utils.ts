// Analytics utilities for tracking redemption patterns and staff performance

export interface RedemptionEvent {
  id: string
  certificateCode: string
  certificateId: string
  certificateValue: number
  staffId: string
  staffName: string
  locationId: string
  locationName: string
  redemptionDate: string
  redemptionTime: string
  customerName: string
  customerEmail: string
  certificateType: string
  notes?: string
  deviceType: "mobile" | "desktop"
  scanMethod: "qr" | "manual"
}

export interface StaffPerformance {
  staffId: string
  staffName: string
  totalRedemptions: number
  totalValue: number
  averageRedemptionTime: number
  redemptionsByDay: Record<string, number>
  redemptionsByHour: Record<string, number>
  certificateTypes: Record<string, number>
  customerSatisfaction: number
  efficiency: number
}

export interface RedemptionPattern {
  date: string
  totalRedemptions: number
  totalValue: number
  peakHours: string[]
  popularCertificateTypes: string[]
  averageRedemptionTime: number
  locationBreakdown: Record<string, number>
}

// Mock data for demonstration
export const mockRedemptionEvents: RedemptionEvent[] = [
  {
    id: "r1",
    certificateCode: "ART-A1B2-C3D4",
    certificateId: "gc1",
    certificateValue: 5000,
    staffId: "staff1",
    staffName: "Momo Tanaka",
    locationId: "loc1",
    locationName: "Artbar Ginza",
    redemptionDate: "2024-01-15",
    redemptionTime: "14:30",
    customerName: "Tanaka Yuki",
    customerEmail: "tanaka.yuki@example.com",
    certificateType: "Standard",
    notes: "Customer very satisfied with service",
    deviceType: "mobile",
    scanMethod: "qr",
  },
  {
    id: "r2",
    certificateCode: "ART-E5F6-G7H8",
    certificateId: "gc2",
    certificateValue: 10000,
    staffId: "staff2",
    staffName: "Naomi Sato",
    locationId: "loc2",
    locationName: "Artbar Daikanyama",
    redemptionDate: "2024-01-15",
    redemptionTime: "16:45",
    customerName: "Suzuki Haruto",
    customerEmail: "suzuki.haruto@example.com",
    certificateType: "Premium",
    deviceType: "desktop",
    scanMethod: "manual",
  },
  {
    id: "r3",
    certificateCode: "ART-I9J0-K1L2",
    certificateId: "gc3",
    certificateValue: 25000,
    staffId: "staff1",
    staffName: "Momo Tanaka",
    locationId: "loc1",
    locationName: "Artbar Ginza",
    redemptionDate: "2024-01-16",
    redemptionTime: "11:15",
    customerName: "Watanabe Akira",
    customerEmail: "watanabe.akira@example.com",
    certificateType: "Group",
    notes: "Group booking for 6 people",
    deviceType: "mobile",
    scanMethod: "qr",
  },
  {
    id: "r4",
    certificateCode: "ART-M3N4-O5P6",
    certificateId: "gc4",
    certificateValue: 50000,
    staffId: "staff3",
    staffName: "Daria Kim",
    locationId: "loc3",
    locationName: "Artbar Cat Street",
    redemptionDate: "2024-01-16",
    redemptionTime: "13:20",
    customerName: "Yamamoto Corp",
    customerEmail: "hr@yamamoto-corp.co.jp",
    certificateType: "Corporate",
    notes: "Corporate team building event",
    deviceType: "desktop",
    scanMethod: "manual",
  },
]

export function calculateStaffPerformance(events: RedemptionEvent[]): StaffPerformance[] {
  const staffMap = new Map<string, RedemptionEvent[]>()

  // Group events by staff
  events.forEach((event) => {
    if (!staffMap.has(event.staffId)) {
      staffMap.set(event.staffId, [])
    }
    staffMap.get(event.staffId)!.push(event)
  })

  return Array.from(staffMap.entries()).map(([staffId, staffEvents]) => {
    const totalRedemptions = staffEvents.length
    const totalValue = staffEvents.reduce((sum, event) => sum + event.certificateValue, 0)

    // Calculate redemptions by day
    const redemptionsByDay: Record<string, number> = {}
    staffEvents.forEach((event) => {
      redemptionsByDay[event.redemptionDate] = (redemptionsByDay[event.redemptionDate] || 0) + 1
    })

    // Calculate redemptions by hour
    const redemptionsByHour: Record<string, number> = {}
    staffEvents.forEach((event) => {
      const hour = event.redemptionTime.split(":")[0]
      redemptionsByHour[hour] = (redemptionsByHour[hour] || 0) + 1
    })

    // Calculate certificate types
    const certificateTypes: Record<string, number> = {}
    staffEvents.forEach((event) => {
      certificateTypes[event.certificateType] = (certificateTypes[event.certificateType] || 0) + 1
    })

    return {
      staffId,
      staffName: staffEvents[0].staffName,
      totalRedemptions,
      totalValue,
      averageRedemptionTime: 2.5, // Mock average time in minutes
      redemptionsByDay,
      redemptionsByHour,
      certificateTypes,
      customerSatisfaction: 4.8, // Mock satisfaction score
      efficiency: Math.min(100, (totalRedemptions / 10) * 100), // Mock efficiency score
    }
  })
}

export function calculateRedemptionPatterns(events: RedemptionEvent[]): RedemptionPattern[] {
  const dateMap = new Map<string, RedemptionEvent[]>()

  // Group events by date
  events.forEach((event) => {
    if (!dateMap.has(event.redemptionDate)) {
      dateMap.set(event.redemptionDate, [])
    }
    dateMap.get(event.redemptionDate)!.push(event)
  })

  return Array.from(dateMap.entries()).map(([date, dayEvents]) => {
    const totalRedemptions = dayEvents.length
    const totalValue = dayEvents.reduce((sum, event) => sum + event.certificateValue, 0)

    // Find peak hours
    const hourCounts: Record<string, number> = {}
    dayEvents.forEach((event) => {
      const hour = event.redemptionTime.split(":")[0]
      hourCounts[hour] = (hourCounts[hour] || 0) + 1
    })
    const peakHours = Object.entries(hourCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([hour]) => `${hour}:00`)

    // Popular certificate types
    const typeCounts: Record<string, number> = {}
    dayEvents.forEach((event) => {
      typeCounts[event.certificateType] = (typeCounts[event.certificateType] || 0) + 1
    })
    const popularCertificateTypes = Object.entries(typeCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([type]) => type)

    // Location breakdown
    const locationBreakdown: Record<string, number> = {}
    dayEvents.forEach((event) => {
      locationBreakdown[event.locationName] = (locationBreakdown[event.locationName] || 0) + 1
    })

    return {
      date,
      totalRedemptions,
      totalValue,
      peakHours,
      popularCertificateTypes,
      averageRedemptionTime: 2.3, // Mock average time
      locationBreakdown,
    }
  })
}

export function getTopPerformers(
  performances: StaffPerformance[],
  metric: "redemptions" | "value" | "efficiency" = "redemptions",
) {
  return performances
    .sort((a, b) => {
      switch (metric) {
        case "redemptions":
          return b.totalRedemptions - a.totalRedemptions
        case "value":
          return b.totalValue - a.totalValue
        case "efficiency":
          return b.efficiency - a.efficiency
        default:
          return 0
      }
    })
    .slice(0, 5)
}

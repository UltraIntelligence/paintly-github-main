export type EventCategory = "Regular" | "Family Friendly" | "Corporate" | "Seasonal" | "Archived"

export interface Event {
  id: string
  title: string
  image: string
  category: EventCategory
  isTemplate: boolean
  duration: string
  price: string
  scheduledCount: number
  averageAttendance: string
  isActive?: boolean
  activatesIn?: string
  lastModified: Date
}

export const eventData: Event[] = [
  {
    id: "1",
    title: "Sunset Beach Painting",
    image: "gradient-1", // Changed to gradient identifier
    category: "Regular",
    isTemplate: false,
    duration: "2 hours",
    price: "¥4,500",
    scheduledCount: 24,
    averageAttendance: "18/25",
    isActive: true,
    lastModified: new Date("2023-04-15"),
  },
  {
    id: "2",
    title: "Kids Watercolor Adventure",
    image: "gradient-2", // Changed to gradient identifier
    category: "Family Friendly",
    isTemplate: true,
    duration: "1.5 hours",
    price: "¥3,200",
    scheduledCount: 18,
    averageAttendance: "15/20",
    isActive: true,
    lastModified: new Date("2023-05-02"),
  },
  {
    id: "3",
    title: "Team Building Art Session",
    image: "gradient-3", // Changed to gradient identifier
    category: "Corporate",
    isTemplate: false,
    duration: "3 hours",
    price: "¥6,500/person",
    scheduledCount: 12,
    averageAttendance: "22/25",
    isActive: true,
    lastModified: new Date("2023-03-28"),
  },
  {
    id: "4",
    title: "Cherry Blossom Special",
    image: "gradient-4", // Changed to gradient identifier
    category: "Seasonal",
    isTemplate: false,
    duration: "2.5 hours",
    price: "¥5,000",
    scheduledCount: 8,
    averageAttendance: "24/25",
    isActive: false,
    activatesIn: "2 weeks",
    lastModified: new Date("2023-02-10"),
  },
  {
    id: "5",
    title: "Abstract Acrylic Workshop",
    image: "gradient-5", // Changed to gradient identifier
    category: "Regular",
    isTemplate: true,
    duration: "2 hours",
    price: "¥4,800",
    scheduledCount: 16,
    averageAttendance: "16/20",
    isActive: true,
    lastModified: new Date("2023-04-22"),
  },
  {
    id: "6",
    title: "Corporate Team Mural",
    image: "gradient-6", // Changed to gradient identifier
    category: "Corporate",
    isTemplate: true,
    duration: "4 hours",
    price: "¥8,000/person",
    scheduledCount: 6,
    averageAttendance: "18/20",
    isActive: true,
    lastModified: new Date("2023-05-15"),
  },
  {
    id: "7",
    title: "Family Portrait Session",
    image: "gradient-7", // Changed to gradient identifier
    category: "Family Friendly",
    isTemplate: false,
    duration: "2 hours",
    price: "¥5,500",
    scheduledCount: 14,
    averageAttendance: "12/15",
    isActive: true,
    lastModified: new Date("2023-03-05"),
  },
  {
    id: "8",
    title: "Winter Landscape",
    image: "gradient-8", // Changed to gradient identifier
    category: "Seasonal",
    isTemplate: false,
    duration: "2 hours",
    price: "¥4,500",
    scheduledCount: 0,
    averageAttendance: "0/0",
    isActive: false,
    activatesIn: "3 months",
    lastModified: new Date("2023-01-20"),
  },
]

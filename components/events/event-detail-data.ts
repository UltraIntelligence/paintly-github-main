export interface EventDetail {
  id: string
  name: {
    en: string
    jp: string
  }
  description: {
    en: string
    jp: string
  }
  image: string
  category: string
  duration: number
  skillLevel: "beginner" | "intermediate" | "advanced"
  isTemplate: boolean
  performance: {
    timesScheduled: number
    avgAttendance: {
      count: number
      capacity: number
      percentage: number
    }
    totalRevenue: number
    popularityTrend: {
      month: string
      value: number
    }[]
  }
  topLocations: {
    id: string
    name: string
    count: number
    percentage: number
  }[]
  topInstructors: {
    id: string
    name: string
    count: number
    rating: number
  }[]
  variations: {
    id: string
    name: string
    description: string
  }[]
  seasonal: {
    isActive: boolean
    startDate: string
    endDate: string
    repeatAnnually: boolean
  }
  pricing: {
    regular: number
    member: number
    group: number
    special: {
      price: number
      startDate: string
      endDate: string
      description: string
    }[]
  }
  requirements: {
    minParticipants: number
    maxParticipants: number
    ageRestriction: {
      min: number
      max: number | null
    }
    prerequisites: string[]
  }
  materials: string[]
  specialInstructions: string
  internalNotes: string
  templateUsage: {
    id: string
    name: string
    date: string
    location: string
    instructor: string
  }[]
}

export const eventDetailData: EventDetail = {
  id: "evt-001",
  name: {
    en: "Abstract Acrylic Painting Workshop",
    jp: "抽象的なアクリル画ワークショップ",
  },
  description: {
    en: "Explore the world of abstract art through acrylic painting techniques. This workshop is designed for all skill levels and will guide you through creating your own abstract masterpiece.",
    jp: "アクリル画のテクニックを通じて抽象芸術の世界を探索しましょう。このワークショップはすべてのスキルレベルを対象としており、あなた自身の抽象的な傑作を作成するためのガイドを提供します。",
  },
  image: "/abstract-acrylic.png",
  category: "Art & Creativity",
  duration: 120,
  skillLevel: "beginner",
  isTemplate: true,
  performance: {
    timesScheduled: 42,
    avgAttendance: {
      count: 18,
      capacity: 25,
      percentage: 72,
    },
    totalRevenue: 525000,
    popularityTrend: [
      { month: "Jan", value: 3 },
      { month: "Feb", value: 5 },
      { month: "Mar", value: 4 },
      { month: "Apr", value: 6 },
      { month: "May", value: 8 },
      { month: "Jun", value: 7 },
      { month: "Jul", value: 9 },
    ],
  },
  topLocations: [
    { id: "loc-001", name: "Downtown Studio", count: 15, percentage: 36 },
    { id: "loc-002", name: "Riverside Gallery", count: 12, percentage: 29 },
    { id: "loc-003", name: "Creative Hub", count: 8, percentage: 19 },
    { id: "loc-004", name: "Art Center", count: 7, percentage: 16 },
  ],
  topInstructors: [
    { id: "ins-001", name: "Yuki Tanaka", count: 18, rating: 4.8 },
    { id: "ins-002", name: "Mei Yamamoto", count: 12, rating: 4.7 },
    { id: "ins-003", name: "Hiroshi Sato", count: 8, rating: 4.9 },
    { id: "ins-004", name: "Akiko Nakamura", count: 4, rating: 4.6 },
  ],
  variations: [
    {
      id: "var-001",
      name: "Abstract Acrylic for Beginners",
      description: "A simplified version for complete beginners",
    },
    { id: "var-002", name: "Advanced Abstract Techniques", description: "For those with some painting experience" },
    { id: "var-003", name: "Abstract Landscape Focus", description: "Creating abstract landscapes with acrylics" },
  ],
  seasonal: {
    isActive: true,
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    repeatAnnually: true,
  },
  pricing: {
    regular: 15000,
    member: 12000,
    group: 10000,
    special: [
      {
        price: 8000,
        startDate: "2023-07-01",
        endDate: "2023-07-15",
        description: "Summer Special",
      },
    ],
  },
  requirements: {
    minParticipants: 5,
    maxParticipants: 25,
    ageRestriction: {
      min: 12,
      max: null,
    },
    prerequisites: ["None - all skill levels welcome"],
  },
  materials: [
    "Acrylic paints (provided)",
    "Canvas (provided)",
    "Brushes (provided)",
    "Apron or old shirt (not provided)",
    "Notebook for sketching ideas (optional)",
  ],
  specialInstructions:
    "Please arrive 10 minutes early to set up your workspace. Wear clothes that can get paint on them.",
  internalNotes: "This is one of our most popular workshops. Consider adding more sessions during peak seasons.",
  templateUsage: [
    {
      id: "evt-101",
      name: "Summer Abstract Workshop",
      date: "2023-06-15",
      location: "Downtown Studio",
      instructor: "Yuki Tanaka",
    },
    {
      id: "evt-102",
      name: "Abstract Art for Beginners",
      date: "2023-06-22",
      location: "Riverside Gallery",
      instructor: "Mei Yamamoto",
    },
    {
      id: "evt-103",
      name: "Abstract Painting Night",
      date: "2023-07-05",
      location: "Creative Hub",
      instructor: "Hiroshi Sato",
    },
    {
      id: "evt-104",
      name: "Abstract Expressions",
      date: "2023-07-12",
      location: "Art Center",
      instructor: "Akiko Nakamura",
    },
  ],
}

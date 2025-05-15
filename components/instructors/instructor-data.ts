// Sample instructor data
export type Instructor = {
  id: string
  name: string
  photo: string
  role: string[]
  languages: { code: string; name: string }[]
  specialties: string[]
  availability: {
    thisMonth: "Submitted" | "Pending" | "Missing"
    nextMonth: "Submitted" | "Pending" | "Missing"
    lastUpdated: string
  }
  stats: {
    classesThisMonth: number
    averageAttendance: string
    rating: number
  }
}

export const instructors: Instructor[] = [
  {
    id: "1",
    name: "Yuki Tanaka",
    photo: "/placeholder-3uwps.png",
    role: ["Senior Instructor"],
    languages: [
      { code: "EN", name: "English" },
      { code: "JP", name: "Japanese" },
    ],
    specialties: ["Watercolor", "Abstract", "Traditional Japanese"],
    availability: {
      thisMonth: "Submitted",
      nextMonth: "Submitted",
      lastUpdated: "2 days ago",
    },
    stats: {
      classesThisMonth: 18,
      averageAttendance: "14/15",
      rating: 4.9,
    },
  },
  {
    id: "2",
    name: "Michael Chen",
    photo: "/placeholder-ai4dk.png",
    role: ["Senior Instructor", "Curriculum Developer"],
    languages: [
      { code: "EN", name: "English" },
      { code: "CN", name: "Chinese" },
    ],
    specialties: ["Acrylic", "Landscape", "Portrait"],
    availability: {
      thisMonth: "Submitted",
      nextMonth: "Pending",
      lastUpdated: "5 days ago",
    },
    stats: {
      classesThisMonth: 15,
      averageAttendance: "13/15",
      rating: 4.8,
    },
  },
  {
    id: "3",
    name: "Sofia Rodriguez",
    photo: "/placeholder-okv7u.png",
    role: ["Part-time"],
    languages: [
      { code: "EN", name: "English" },
      { code: "ES", name: "Spanish" },
    ],
    specialties: ["Oil Painting", "Kids Classes", "Mixed Media"],
    availability: {
      thisMonth: "Submitted",
      nextMonth: "Missing",
      lastUpdated: "10 days ago",
    },
    stats: {
      classesThisMonth: 8,
      averageAttendance: "12/15",
      rating: 4.7,
    },
  },
  {
    id: "4",
    name: "James Wilson",
    photo: "/placeholder-n76wq.png",
    role: ["Full-time"],
    languages: [{ code: "EN", name: "English" }],
    specialties: ["Abstract", "Modern Art", "Wine & Paint"],
    availability: {
      thisMonth: "Submitted",
      nextMonth: "Submitted",
      lastUpdated: "1 day ago",
    },
    stats: {
      classesThisMonth: 16,
      averageAttendance: "14/15",
      rating: 4.6,
    },
  },
  {
    id: "5",
    name: "Aisha Patel",
    photo: "/placeholder-tp709.png",
    role: ["Part-time", "Guest Artist"],
    languages: [
      { code: "EN", name: "English" },
      { code: "HI", name: "Hindi" },
    ],
    specialties: ["Mandala Art", "Cultural Fusion", "Textile Art"],
    availability: {
      thisMonth: "Pending",
      nextMonth: "Missing",
      lastUpdated: "8 days ago",
    },
    stats: {
      classesThisMonth: 6,
      averageAttendance: "13/15",
      rating: 4.9,
    },
  },
  {
    id: "6",
    name: "David Kim",
    photo: "/placeholder.svg?height=200&width=200&query=portrait%20of%20korean%20male%20art%20instructor",
    role: ["Full-time"],
    languages: [
      { code: "EN", name: "English" },
      { code: "KO", name: "Korean" },
    ],
    specialties: ["Digital Art", "Illustration", "Character Design"],
    availability: {
      thisMonth: "Submitted",
      nextMonth: "Pending",
      lastUpdated: "3 days ago",
    },
    stats: {
      classesThisMonth: 14,
      averageAttendance: "12/15",
      rating: 4.7,
    },
  },
  {
    id: "7",
    name: "Emma Davis",
    photo: "/placeholder.svg?height=200&width=200&query=portrait%20of%20female%20art%20teacher",
    role: ["Part-time"],
    languages: [
      { code: "EN", name: "English" },
      { code: "FR", name: "French" },
    ],
    specialties: ["Impressionist", "Plein Air", "Beginners"],
    availability: {
      thisMonth: "Missing",
      nextMonth: "Missing",
      lastUpdated: "15 days ago",
    },
    stats: {
      classesThisMonth: 4,
      averageAttendance: "10/15",
      rating: 4.5,
    },
  },
  {
    id: "8",
    name: "Raj Mehta",
    photo: "/placeholder.svg?height=200&width=200&query=portrait%20of%20indian%20male%20art%20instructor",
    role: ["Senior Instructor"],
    languages: [
      { code: "EN", name: "English" },
      { code: "HI", name: "Hindi" },
    ],
    specialties: ["Sculpture", "Pottery", "3D Art"],
    availability: {
      thisMonth: "Submitted",
      nextMonth: "Submitted",
      lastUpdated: "4 days ago",
    },
    stats: {
      classesThisMonth: 12,
      averageAttendance: "11/15",
      rating: 4.8,
    },
  },
  {
    id: "9",
    name: "Maria Garcia",
    photo: "/placeholder.svg?height=200&width=200&query=portrait%20of%20latina%20art%20teacher",
    role: ["Full-time", "Workshop Leader"],
    languages: [
      { code: "EN", name: "English" },
      { code: "ES", name: "Spanish" },
    ],
    specialties: ["Folk Art", "Cultural Heritage", "Community Projects"],
    availability: {
      thisMonth: "Submitted",
      nextMonth: "Pending",
      lastUpdated: "6 days ago",
    },
    stats: {
      classesThisMonth: 10,
      averageAttendance: "15/15",
      rating: 4.9,
    },
  },
  {
    id: "10",
    name: "Thomas Wilson",
    photo: "/placeholder-ai4dk.png",
    role: ["Part-time"],
    languages: [{ code: "EN", name: "English" }],
    specialties: ["Charcoal", "Figure Drawing", "Sketching"],
    availability: {
      thisMonth: "Pending",
      nextMonth: "Missing",
      lastUpdated: "9 days ago",
    },
    stats: {
      classesThisMonth: 7,
      averageAttendance: "12/15",
      rating: 4.6,
    },
  },
  {
    id: "11",
    name: "Olivia Johnson",
    photo: "/placeholder.svg?height=200&width=200&query=portrait%20of%20female%20art%20teacher",
    role: ["Full-time"],
    languages: [{ code: "EN", name: "English" }],
    specialties: ["Mixed Media", "Collage", "Experimental"],
    availability: {
      thisMonth: "Submitted",
      nextMonth: "Submitted",
      lastUpdated: "2 days ago",
    },
    stats: {
      classesThisMonth: 14,
      averageAttendance: "13/15",
      rating: 4.7,
    },
  },
  {
    id: "12",
    name: "Hiroshi Yamamoto",
    photo: "/placeholder.svg?height=200&width=200&query=portrait%20of%20japanese%20male%20art%20instructor",
    role: ["Guest Artist", "Part-time"],
    languages: [
      { code: "EN", name: "English" },
      { code: "JP", name: "Japanese" },
    ],
    specialties: ["Sumi-e", "Calligraphy", "Traditional Arts"],
    availability: {
      thisMonth: "Missing",
      nextMonth: "Pending",
      lastUpdated: "12 days ago",
    },
    stats: {
      classesThisMonth: 5,
      averageAttendance: "14/15",
      rating: 4.9,
    },
  },
]

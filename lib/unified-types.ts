// lib/unified-types.ts

// Unified models that bridge database and UI
export interface UnifiedTemplate {
  id: string
  title: string // English title
  titleJp: string // Japanese title
  duration: number
  canvas: string
  difficulty: string
  category: string
  specialization: string[]
  image: string
  materials?: string[]
  description?: string
  descriptionJp?: string
}

export interface UnifiedInstructor {
  id: string
  name: string
  nameJp?: string
  specialty: string
  avatar: string
  initials: string
  bio?: string
  bioJp?: string
  languages: string[]
  isActive: boolean
}

export interface UnifiedLocation {
  id: string
  name: string
  nameJp?: string
  address?: string
  addressJp?: string
  capacity: number
  isActive: boolean
}

export interface UnifiedEvent {
  id: string
  template: UnifiedTemplate
  instructor: UnifiedInstructor
  location: UnifiedLocation
  startTime: Date
  endTime: Date
  capacity: number
  currentParticipants: number
  status: "scheduled" | "in-progress" | "completed" | "cancelled"
}

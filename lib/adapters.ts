// lib/adapters.ts

import type { Event, Staff, Location } from "./supabase"
import type { UnifiedEvent, UnifiedTemplate, UnifiedInstructor, UnifiedLocation } from "./unified-types"

/**
 * Adapts database event, staff, and location models to a unified event model
 */
export function adaptDatabaseToUnifiedEvent(
  dbEvent: Event,
  dbStaff: Staff,
  dbLocation: Location,
  templateData: Partial<UnifiedTemplate> = {},
): UnifiedEvent {
  // Create unified template from event data and template data
  const template: UnifiedTemplate = {
    id: dbEvent.master_event_type_id,
    title: dbEvent.title,
    titleJp: dbEvent.title_jp || "",
    description: dbEvent.description || undefined,
    descriptionJp: dbEvent.description_jp || undefined,
    image: dbEvent.featured_image_url || "/placeholder.svg?height=80&width=80",
    // Default values for fields not in the database
    duration: templateData.duration || 2,
    canvas: templateData.canvas || "Standard",
    difficulty: templateData.difficulty || "Beginner",
    category: templateData.category || "General",
    specialization: templateData.specialization || ["general"],
    materials: templateData.materials,
  }

  // Create unified instructor from staff data
  const instructor: UnifiedInstructor = {
    id: dbStaff.user_id,
    name: dbStaff.full_name_override || "Unknown Instructor",
    nameJp: undefined, // Not available in database model
    specialty: "general", // Default value
    avatar: dbStaff.photo_url || "/placeholder.svg?height=32&width=32",
    initials: getInitials(dbStaff.full_name_override || "UI"),
    bio: dbStaff.bio || undefined,
    bioJp: dbStaff.bio_jp || undefined,
    languages: ["English"], // Default value
    isActive: dbStaff.is_active,
  }

  // Create unified location from location data
  const location: UnifiedLocation = {
    id: dbLocation.id,
    name: dbLocation.name,
    nameJp: dbLocation.name_jp || undefined,
    address: dbLocation.street_address || undefined,
    addressJp: dbLocation.street_address_jp || undefined,
    capacity: dbEvent.capacity,
    isActive: dbLocation.is_active,
  }

  // Create unified event
  return {
    id: dbEvent.id,
    template,
    instructor,
    location,
    startTime: new Date(dbEvent.start_time),
    endTime: new Date(dbEvent.end_time),
    capacity: dbEvent.capacity,
    currentParticipants: 0, // Not available in database model
    status: dbEvent.is_published ? "scheduled" : "cancelled",
  }
}

/**
 * Adapts a unified event model back to database event model
 */
export function adaptUnifiedToDatabase(unifiedEvent: UnifiedEvent): Event {
  return {
    id: unifiedEvent.id,
    business_id: "", // This would need to be provided separately
    master_event_type_id: unifiedEvent.template.id,
    event_category_id: "", // This would need to be provided separately
    location_id: unifiedEvent.location.id,
    title: unifiedEvent.template.title,
    title_jp: unifiedEvent.template.titleJp,
    description: unifiedEvent.template.description || null,
    description_jp: unifiedEvent.template.descriptionJp || null,
    featured_image_url: unifiedEvent.template.image || null,
    price: 0, // This would need to be provided separately
    capacity: unifiedEvent.capacity,
    start_time: unifiedEvent.startTime.toISOString(),
    end_time: unifiedEvent.endTime.toISOString(),
    is_published: unifiedEvent.status !== "cancelled",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}

/**
 * Helper function to get initials from a name
 */
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)
}

/**
 * Adapts database location to unified location model
 */
export function adaptLocationToUnified(dbLocation: Location): UnifiedLocation {
  return {
    id: dbLocation.id,
    name: dbLocation.name,
    nameJp: dbLocation.name_jp || undefined,
    address: dbLocation.street_address || undefined,
    addressJp: dbLocation.street_address_jp || undefined,
    capacity: 20, // Default value since not in location model
    isActive: dbLocation.is_active,
  }
}

/**
 * Adapts database staff to unified instructor model
 */
export function adaptStaffToUnified(dbStaff: Staff): UnifiedInstructor {
  return {
    id: dbStaff.user_id,
    name: dbStaff.full_name_override || "Unknown Instructor",
    nameJp: undefined, // Not available in database model
    specialty: "general", // Default value
    avatar: dbStaff.photo_url || "/placeholder.svg?height=32&width=32",
    initials: getInitials(dbStaff.full_name_override || "UI"),
    bio: dbStaff.bio || undefined,
    bioJp: dbStaff.bio_jp || undefined,
    languages: ["English"], // Default value
    isActive: dbStaff.is_active,
  }
}
